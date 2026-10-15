import { RULES, canonicalHero } from '../shared/catalog';
import { startPlayPhase, setupCharacterHp } from './phaseLogic';
import { advanceDyingAsker } from './combatLogic';
import { resolvePendingAction } from './cardLogic';
import { prepareHeroTurn, judgeWithHeroes, queueDamageSkills, expireHeroResponse, botHeroAction, startLordSkill } from './heroLogic';
import type { GameRoom, AttackDescriptor } from './types';
export function attachRoomLifecycle(room:GameRoom,clock:any,broadcast:()=>void):void {
  room._schedule=(callback:()=>void,ms:number)=>clock.setTimeout(callback,ms);
  room._prepareTurn=(player:any,done:()=>void)=>prepareHeroTurn(room,player,done);
  room._judgeCard=(player:any,drawn:any,reason:any,done:any)=>judgeWithHeroes(room,player,drawn,reason,done);
  room._afterDamage=(player:any,source:any,card:any,_damage:number,attack?:AttackDescriptor)=>queueDamageSkills(room,player,source,card,attack);
  room._botHeroAction=(player:any)=>botHeroAction(room,player);
  room._botLordResponse=(player:any,_required:string)=>startLordSkill(room,player,{});
  clock.setInterval(()=>{
    if(room._disposed||room.status==='ENDED')return;
    if(room.status==='DRAFTING'&&room.draftDeadline&&Date.now()>=room.draftDeadline){
      for(const p of Object.values(room.players)){if(p.isAlive&&!p.character&&p.characterChoices?.length){p.character=canonicalHero(p.characterChoices[0].id);setupCharacterHp(p,room.turnOrder.length);}}
      if(Object.values(room.players).filter(p=>p.isAlive).every(p=>p.character))startPlayPhase(room);else broadcast();return;
    }
    const p=room.pendingAction;if(!p)return;
    if(!p.timeoutAt)p.timeoutAt=Date.now()+RULES.reactionMs;
    if(Date.now()<p.timeoutAt)return;
    if(p.type==='DYING'){advanceDyingAsker(room);return;}
    if(p.type==='LUO_RIVER'){room.pendingAction=null;p.resume?.();broadcast();return;}
    if(expireHeroResponse(room))return;
    resolvePendingAction(room,p);
  },250);
}
