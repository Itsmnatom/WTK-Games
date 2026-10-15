import { canonicalHero } from '../shared/catalog';
import { calculateDistance, drawCards, hasCharacter } from './phaseLogic';
import { prompt, removeOwnedCard } from './heroLogic';
import { resumeAfterAttack } from './combatLogic';
import { emitHeroSkill } from './presentationEvents';
import { deadline, schedule } from './runtime';
import { experimental, publicFriendly } from './experimental';
import type { Card, GameRoom, Player } from './types';

export function drawWithHeroes(room:GameRoom,player:Player,done:()=>void):void {
  const generation=room._turnGeneration;
  const current=()=>room.status==='PLAYING'&&player.isAlive&&room._turnGeneration===generation&&room.turnOrder[room.currentTurnIndex]===player.id;
  const normal=()=>{
    if(!current())return;
    if(canonicalHero(player.character)==='ZHANG_LIAO'&&Object.values(room.players).some(p=>p.isAlive&&p.id!==player.id&&p.hand.length)) {
      prompt(room,{type:'ZHANG_LIAO_DRAW',targetPlayerId:player.id},data=>{
        if(!current()){room.pendingAction=null;resumeAfterAttack(room);return;}
        const ids:unknown=data.targetPlayerIds;
        if(data.accept&&Array.isArray(ids)&&ids.length>0&&ids.length<=2&&new Set(ids).size===ids.length&&ids.every(id=>typeof id==='string'&&id!==player.id&&room.players[id]?.isAlive&&room.players[id].hand.length)) {
          for(const id of ids as string[]){const target=room.players[id];player.hand.push(target.hand.splice(Math.floor(Math.random()*target.hand.length),1)[0]);}
          emitHeroSkill(room,player.id,'TUXI',ids as string[]);
        }else player.hand.push(...drawCards(room,2));
        room.pendingAction=null;done();
      });return;
    }
    player.hand.push(...drawCards(room,hasCharacter(player,'ZHOU_YU')?3:2));
    if(hasCharacter(player,'ZHOU_YU'))emitHeroSkill(room,player.id,'YINGZI');done();
  };
  if(experimental(room)&&player.strategy==='SUPPLY'&&!player.strategyUsed&&player.hp<player.maxHp) {
    prompt(room,{type:'SUPPLY_PLAN',targetPlayerId:player.id},data=>{
      room.pendingAction=null;if(!current()){resumeAfterAttack(room);return;}
      if(data.accept){player.strategyUsed=true;player.hp=Math.min(player.maxHp,player.hp+1);emitHeroSkill(room,player.id,'PLAN_SUPPLY');done();}else normal();
    });
  }else normal();
}
export function expandedDamageSkills(room:GameRoom,player:Player,damage:number):void {
  if(canonicalHero(player.character)!=='GUO_JIA')return;
  room._postDamageQueue ||= [];
  for(let point=0;point<damage;point++)room._postDamageQueue.push((done:()=>void)=>{
    if(!player.isAlive)return done();
    prompt(room,{type:'GUO_JIA_ACCEPT',targetPlayerId:player.id},data=>{
      room.pendingAction=null;if(!data.accept||!player.isAlive){done();return;}
      const cards=drawCards(room,2);if(!cards.length){done();return;}
      emitHeroSkill(room,player.id,'YIJI');
      prompt(room,{type:'GUO_JIA_DISTRIBUTE',targetPlayerId:player.id,cards},response=>{
        const assignments=response.allocations;
        const valid=Array.isArray(assignments)&&assignments.length===cards.length&&new Set(assignments.map(a=>a?.cardId)).size===cards.length&&assignments.every(a=>a&&cards.some(c=>c.id===a.cardId)&&room.players[a.playerId]?.isAlive);
        for(const card of cards){const recipient=valid?room.players[assignments.find(a=>a.cardId===card.id).playerId]:player;
          if(recipient.isAlive)recipient.hand.push(card);else room.discardPile.push(card);}
        room.pendingAction=null;done();room._broadcastFn?.();
      });
    });
  });
}
/** Claim is resolved after judgment result, before continuing the suspended action. */
export function claimJudgment(room:GameRoom,player:Player,card:Card,done:()=>void):void {
  if(canonicalHero(player.character)!=='GUO_JIA'||!player.isAlive){done();return;}
  const suspended=room.pendingAction;
  const index=room.discardPile.findIndex(c=>c.id===card.id);if(index<0){done();return;}
  // Reserve the public judgment card so a reshuffle cannot reuse it during the prompt.
  const held=room.discardPile.splice(index,1)[0];
  prompt(room,{type:'GUO_JIA_JUDGE',targetPlayerId:player.id,judgeCard:held},data=>{
    if(data.accept&&player.isAlive){player.hand.push(held);emitHeroSkill(room,player.id,'TIANDU');}else room.discardPile.push(held);
    if(!player.isAlive){room.pendingAction=null;resumeAfterAttack(room);return;}
    room.pendingAction=suspended;if(suspended)suspended.timeoutAt=deadline(room);done();
  });
}
export function queueTacticDraw(room:GameRoom,playerId:string):void {
  const player=room.players[playerId];if(canonicalHero(player?.character)!=='HUANG_YUEYING')return;
  room._postDamageQueue ||= [];
  room._postDamageQueue.push((done:()=>void)=>{
    if(!player.isAlive)return done();
    prompt(room,{type:'HUANG_DRAW',targetPlayerId:player.id},data=>{
      room.pendingAction=null;if(data.accept&&player.isAlive){player.hand.push(...drawCards(room,1));emitHeroSkill(room,player.id,'JIZHI');}done();room._broadcastFn?.();
    });
  });
}
export function qingnang(room:GameRoom,player:Player,data:any):boolean {
  const target=room.players[data.targetPlayerId];
  if(canonicalHero(player.character)!=='HUA_TUO'||player.skillQingnangUsed||!target?.isAlive||target.hp>=target.maxHp)return false;
  const cost=removeOwnedCard(room,player,data.cardId,false);if(!cost)return false;
  room.discardPile.push(cost);player.skillQingnangUsed=true;target.hp=Math.min(target.maxHp,target.hp+1);
  emitHeroSkill(room,player.id,'QINGNANG',[target.id]);room._broadcastFn?.();return true;
}
export function validRedirect(room:GameRoom,player:Player,target:Player,sourceId:string,costId?:string):boolean {
  if(!target?.isAlive||target.id===player.id||target.id===sourceId||hasCharacter(target,'ZHUGE_LIANG')&&!target.hand.length)return false;
  const costSlot=Object.keys(player.equipment).find(slot=>(player.equipment[slot] as Card)?.id===costId);
  const adjusted=costSlot?{...player,equipment:{...player.equipment,[costSlot]:null}}:player;
  const local={...room,players:{...room.players,[player.id]:adjusted}};
  return calculateDistance(local,player.id,target.id)<=(adjusted.equipment.weapon?.range||1);
}
export function offerRedirection(room:GameRoom):boolean {
  const attack=room.pendingAction;
  if(attack?.type!=='WAITING_FOR_DODGE'||attack.redirectChecked)return false;
  attack.redirectChecked=true;
  const player=room.players[attack.targetPlayerId!];
  if(!player?.isAlive||canonicalHero(player.character)!=='DA_QIAO'||attack.redirectedBy?.includes(player.id)||!player.hand.length&&!Object.values(player.equipment).some(Boolean))return false;
  prompt(room,{type:'DA_QIAO_REDIRECT',targetPlayerId:player.id,sourcePlayerId:attack.sourcePlayerId,attackSourceId:attack.sourcePlayerId},data=>{
    if(!room.players[attack.sourcePlayerId!]?.isAlive){room.pendingAction=null;resumeAfterAttack(room);room._broadcastFn?.();return;}
    const target=room.players[data.targetPlayerId];
    const held=player.hand.find(c=>c.id===data.cardId)||Object.values(player.equipment).find(c=>(c as Card)?.id===data.cardId);
    if(player.isAlive&&data.accept&&held&&validRedirect(room,player,target,attack.sourcePlayerId!,data.cardId)) {
      const cost=removeOwnedCard(room,player,data.cardId)!;room.discardPile.push(cost);
      attack.redirectedBy=[...(attack.redirectedBy||[]),player.id];attack.targetPlayerId=target.id;attack.redirectChecked=false;attack.eightTrigramsUsed=false;
      emitHeroSkill(room,player.id,'LIULI',[target.id]);
    }
    room.pendingAction=room.players[attack.targetPlayerId!]?.isAlive?attack:null;
    if(!room.pendingAction){resumeAfterAttack(room);return;}
    attack.timeoutAt=deadline(room);room._broadcastFn?.();
    if(room.pendingAction===attack&&room.players[attack.targetPlayerId!]?.isBot)schedule(room,()=>{if(room.pendingAction===attack){const {handleBotDodge}=require('./botAI');handleBotDodge(room,attack.targetPlayerId,attack.damage);}},600);
  });return true;
}
export function expandedBotAction(room:GameRoom,bot:Player):boolean {
  if(canonicalHero(bot.character)==='HUA_TUO'&&!bot.skillQingnangUsed&&bot.hand.length){
    const injured=Object.values(room.players).find(p=>p.isAlive&&p.hp<p.maxHp&&(p.id===bot.id||publicFriendly(room,bot,p)));
    if(injured)return qingnang(room,bot,{cardId:bot.hand[bot.hand.length-1].id,targetPlayerId:injured.id});
  }
  return false;
}
