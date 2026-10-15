import { hasCharacter, drawCards, endPlayerTurn } from './phaseLogic';
import { schedule, deadline } from './runtime';
import { emitCardPlay } from './presentationEvents';
import type { GameRoom, Player, Card, DamageType, AttackDescriptor } from './types';
import { experimental, publicFriendly } from './experimental';

export function checkGameOver(room: GameRoom): boolean {
  if(room.status==='ENDED')return true;
  const players=Object.values(room.players),lord=players.find(p=>p.role==='LORD');
  if(!lord)return false;
  const alive=players.filter(p=>p.isAlive);
  if(!lord.isAlive){room.status='ENDED';room.winnerRole=alive.length===1&&alive[0].role==='RENEGADE'?'RENEGADE':'REBEL';}
  else if(!alive.some(p=>p.role==='REBEL'||p.role==='RENEGADE')){room.status='ENDED';room.winnerRole='LORD';}
  else return false;
  room.winnerText=room.winnerRole==='LORD'?'เจ้าเมืองและผู้ภักดีปราบกบฏสำเร็จ':room.winnerRole==='RENEGADE'?'คนทรยศเป็นผู้รอดชีวิตคนสุดท้าย':'ฝ่ายกบฏโค่นเจ้าเมืองสำเร็จ';
  room.endedAt=Date.now();
  room.pendingAction=null;room._actionContinuation=null;room._turnContinuation=null;room._postDamageQueue=[];
  return true;
}
function adjustedDamage(target:Player,damage:number,card:Card|null,attacker:Player|null,type:DamageType,attack?:AttackDescriptor):number {
  const effectName=attack?.name||card?.effectName||card?.name;
  const slash=['SLASH','THUNDER_ATTACK'].includes(effectName || '');
  const color=attack?.color||(card?['SPADE','CLUB'].includes(card.suit)?'BLACK':'RED':'COLORLESS');
  const ignore=slash&&attacker?.equipment?.weapon?.name==='BLUE_STEEL_SWORD';
  const armor=ignore?null:target.equipment?.armor?.name;
  if(armor==='NIO_SHIELD'&&slash&&color==='BLACK')return 0;
  if(armor==='RATTAN_ARMOR'){
    if(type==='FIRE')damage+=1;
    else if(type==='NORMAL'&&['SLASH','ARROW_BARRAGE','BARBARIAN_INVASION'].includes(effectName || ''))return 0;
  }
  return armor==='SILVER_LION_HELMET'?Math.min(1,damage):damage;
}
export function dealDamage(room:GameRoom,targetId:string,damage:number,card:Card|null,attackerId:string|null,type:DamageType='NORMAL',attack?:AttackDescriptor):void {
  const first=room.players[targetId];if(!first?.isAlive||damage<=0)return;
  const attacker=attackerId?room.players[attackerId]:null;
  const initial=adjustedDamage(first,damage,card,attacker,type,attack);if(!initial)return;
  const victims=[first];
  if(first.isChained&&type!=='NORMAL'){
    const start=room.turnOrder.indexOf(targetId);
    for(let offset=1;offset<room.turnOrder.length;offset++){const p=room.players[room.turnOrder[(start+offset)%room.turnOrder.length]];if(p?.isAlive&&p.isChained)victims.push(p);}
    victims.forEach(p=>p.isChained=false);
  }
  const dying:string[]=[];
  for(const victim of victims){
    const dealt=victim===first?initial:adjustedDamage(victim,initial,card,attacker,type,attack);if(dealt<=0)continue;
    victim.hp-=dealt;
    if(experimental(room)){victim.experimentDamageTaken=(victim.experimentDamageTaken||0)+dealt;if(attacker)attacker.experimentDamageDealt=(attacker.experimentDamageDealt||0)+dealt;}
    room._emitAll?.('damage_log',{targetId:victim.id,attackerId,damage:dealt,cardName:attack?.name||card?.name||null,hp:victim.hp,maxHp:victim.maxHp,damageType:type});
    room.chat?.push({sender:'System',text: `${victim.name} เสีย ${dealt} HP`,time:new Date().toLocaleTimeString('th-TH')});
    if(room._afterDamage)room._afterDamage(victim,attackerId,card,dealt,attack);
    else {
      if(hasCharacter(victim,'CAO_CAO'))for(const id of new Set(attack?.materialCardIds||(card?[card.id]:[]))){const index=room.discardPile.findIndex(c=>c.id===id);if(index>=0)victim.hand.push(room.discardPile.splice(index,1)[0]);}
      if(hasCharacter(victim,'SIMA_YI')&&attacker?.hand.length)victim.hand.push(attacker.hand.splice(Math.floor(Math.random()*attacker.hand.length),1)[0]);
    }
    if(victim.hp<=0)dying.push(victim.id);
  }
  if(attacker?.equipment?.weapon?.name==='KIRIN_BOW'&&['SLASH','THUNDER_ATTACK'].includes(attack?.name||card?.effectName||card?.name||'')){
    const slot=first.equipment.offensiveHorse?'offensiveHorse':first.equipment.defensiveHorse?'defensiveHorse':null;
    if(slot){room.discardPile.push(first.equipment[slot] as Card);first.equipment[slot]=null;}
  }
  room.dyingQueue ||= [];
  for(const id of dying){if(room.pendingAction?.type==='DYING'&&room.pendingAction.targetPlayerId===id)continue;if(!room.dyingQueue.some((q:any)=>q.dyingPlayerId===id))room.dyingQueue.push({dyingPlayerId:id,attackerId});}
  if(room.pendingAction?.type!=='DYING'&&room.dyingQueue.length){const next=room.dyingQueue.shift();startDyingPhase(room,next.dyingPlayerId,next.attackerId);}
  else {room._broadcastFn?.();if(!room.pendingAction)resumeAfterAttack(room);}
}
export function startDyingPhase(room:GameRoom,targetId:string,attackerId:string|null=null):void {
  const target=room.players[targetId];if(!target?.isAlive||target.hp>0)return;
  if(room.pendingAction?.type==='DYING'){
    room.dyingQueue ||= [];if(!room.dyingQueue.some((q:any)=>q.dyingPlayerId===targetId)&&room.pendingAction.targetPlayerId!==targetId)room.dyingQueue.push({dyingPlayerId:targetId,attackerId});return;
  }
  room.pendingAction={type:'DYING',targetPlayerId:targetId,attackerId,peachNeeded:1-target.hp,currentAskerIdx:room.turnOrder.indexOf(targetId),timeoutAt:deadline(room)};
  room._broadcastFn?.();checkDyingAskerBot(room);
}
export function checkDyingAskerBot(room:GameRoom):void {
  const pending=room.pendingAction;if(pending?.type!=='DYING')return;
  const askerId=room.turnOrder[pending.currentAskerIdx],asker=room.players[askerId];
  if(!asker?.isAlive){advanceDyingAsker(room);return;}
  const expectedDeadline=pending.timeoutAt,expectedIndex=pending.currentAskerIdx;
  if(asker.isBot)schedule(room,()=>{
    if(room.pendingAction!==pending||pending.currentAskerIdx!==expectedIndex)return;
    const target=room.players[pending.targetPlayerId!];
    const friendly=experimental(room)?publicFriendly(room,asker,target):askerId===target.id||['LORD','LOYALIST'].includes(asker.role)&&target.role==='LORD'||asker.role==='REBEL'&&target.role==='REBEL';
    const index=asker.hand.findIndex(c=>canRescue(room,asker,target,c));
    if(!friendly||index<0){advanceDyingAsker(room);return;}
    rescueDying(room,askerId,asker.hand[index].id);
  },700);
  else schedule(room,()=>{if(room.pendingAction===pending&&pending.currentAskerIdx===expectedIndex&&pending.timeoutAt===expectedDeadline)advanceDyingAsker(room);},Math.max(0,Number(expectedDeadline)-Date.now()));
}
export function rescueDying(room:GameRoom,askerId:string,cardId?:string):boolean {
  const p=room.pendingAction;if(p?.type!=='DYING'||room.turnOrder[p.currentAskerIdx]!==askerId)return false;
  const asker=room.players[askerId],target=room.players[p.targetPlayerId!];
  if(!asker?.isAlive||!target?.isAlive)return false;
  const index=asker.hand.findIndex(c=>(!cardId||c.id===cardId)&&canRescue(room,asker,target,c));if(index<0)return false;
  const card=asker.hand.splice(index,1)[0];room.discardPile.push(card);
  const effective=card.name==='WINE'?card:{...card,name:'PEACH'};
  emitCardPlay(room, askerId, card, { cardName:effective.name,kind: 'RESPONSE', targetId: target.id,skillId:card.name!==effective.name?'JIJIU':undefined });
  const {healAmount}=require('./heroLogic');target.hp=Math.min(target.maxHp,target.hp+healAmount(target,asker,effective));p.peachNeeded=1-target.hp;
  if(target.hp>=1){room.pendingAction=null;room._broadcastFn?.();resumeAfterAttack(room);}
  else {p.timeoutAt=deadline(room);room._broadcastFn?.();checkDyingAskerBot(room);}
  return true;
}
export function killPlayer(room:GameRoom,id:string,killerId:string|null=null):void {
  const player=room.players[id];if(!player?.isAlive)return;
  player.isAlive=false;player.hp=0;player.isChained=false;
  room.discardPile.push(...player.hand,...(player.delayedKitZone||[]));player.hand=[];player.delayedKitZone=[];
  for(const slot of Object.keys(player.equipment||{})){const c=player.equipment[slot];if(c&&typeof c==='object')room.discardPile.push(c);player.equipment[slot]=null;}
  if(killerId&&room.players[killerId]?.isAlive){const killer=room.players[killerId];if(player.role==='REBEL')killer.hand.push(...drawCards(room,3));else if(killer.role==='LORD'&&player.role==='LOYALIST'){room.discardPile.push(...killer.hand);killer.hand=[];for(const slot of Object.keys(killer.equipment)){const c=killer.equipment[slot];if(c&&typeof c==='object')room.discardPile.push(c);killer.equipment[slot]=null;}}}
  room.chat?.push({sender:'System',text:`${player.name} เสียชีวิต`,time:new Date().toLocaleTimeString('th-TH')});
  const active=room.turnOrder[room.currentTurnIndex]===id;
  const pending=room.pendingAction;
  const interrupted=pending&&(pending.targetPlayerId===id||pending.type==='WAITING_FOR_SLASH_DUEL'&&
    [pending.sourcePlayerId,pending.targetPlayerId,pending.currentPlayerToSlash].includes(id))?pending:null;
  if(interrupted)room.pendingAction=null;
  room.dyingQueue=(room.dyingQueue||[]).filter((q:any)=>q.dyingPlayerId!==id);
  if(checkGameOver(room)){room._broadcastFn?.();return;}
  if(active){room._turnContinuation=null;room._actionContinuation=null;room._endTurnAfterDying=true;}
  if(interrupted?.resume)interrupted.resume({accept:false,disconnect:true});
  resumeAfterAttack(room);
  room._broadcastFn?.();
}
export function advanceDyingAsker(room:GameRoom):void {
  const pending=room.pendingAction;if(pending?.type!=='DYING')return;
  const start=room.turnOrder.indexOf(pending.targetPlayerId!);
  do{pending.currentAskerIdx=(pending.currentAskerIdx+1)%room.turnOrder.length;}while(pending.currentAskerIdx!==start&&!room.players[room.turnOrder[pending.currentAskerIdx]]?.isAlive);
  if(pending.currentAskerIdx===start){room.pendingAction=null;killPlayer(room,pending.targetPlayerId!,pending.attackerId||null);}
  else {pending.timeoutAt=deadline(room);room._broadcastFn?.();checkDyingAskerBot(room);}
}
export function resumeAfterAttack(room:GameRoom):void {
  if(room.status!=='PLAYING'||room.pendingAction)return;
  while(room.dyingQueue?.length){const next=room.dyingQueue.shift();const p=room.players[next.dyingPlayerId];if(p?.isAlive&&p.hp<=0){startDyingPhase(room,p.id,next.attackerId);return;}}
  if(room._postDamageQueue?.length){const work=room._postDamageQueue.shift();work(()=>resumeAfterAttack(room));return;}
  if(room._endTurnAfterDying){room._endTurnAfterDying=false;endPlayerTurn(room);return;}
  if(room._actionContinuation){const next=room._actionContinuation;room._actionContinuation=null;next();return;}
  if(room._turnContinuation){const next=room._turnContinuation;room._turnContinuation=null;next();return;}
  const player=room.players[room.turnOrder[room.currentTurnIndex]];
  if(player?.isBot&&!room._botResumeScheduled){room._botResumeScheduled=true;schedule(room,()=>{room._botResumeScheduled=false;if(!room.pendingAction&&room.currentPhase==='PLAY'){const{runBotTurn}=require('./botAI');runBotTurn(room,player.id);}},900);}
}
export function getCardById(room:GameRoom,id:string|null|undefined):Card|null {
  if(!id)return null;
  for(const p of Object.values(room.players)){const c=p.hand?.find(c=>c.id===id);if(c)return c;}
  return room.discardPile.find(c=>c.id===id)||null;
}
export function canRescue(room:GameRoom,asker:Player,target:Player,card:Card):boolean {
  return card.name==='PEACH'||asker.id===target.id&&card.name==='WINE'||hasCharacter(asker,'HUA_TUO')&&room.turnOrder[room.currentTurnIndex]!==asker.id&&['HEART','DIAMOND'].includes(card.suit);
}
