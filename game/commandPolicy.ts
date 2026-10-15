import type { GameRoom } from './types';
const HOST=new Set(['start_game','add_bot','remove_bot']);
const PLAY=new Set(['use_card','end_turn','use_sun_quan_skill','use_liu_bei_skill','use_huang_gai_skill','use_diao_chan_skill','use_zhou_yu_skill','use_serpent_spear']);
const RESPONSES=new Set(['resolve_pending','hero_response','play_negate','pass_negate','use_peach_dying','pick_bumper_card','trigger_luo_river','skip_luo_river','resolve_borrowed_sword','resolve_fire_reveal','resolve_fire_match','resolve_yinyang_choice','resolve_weapon_skill']);
export function validateCommand(room:GameRoom,sessionId:string,name:string,data:any):string|null {
  const player=Object.values(room.players).find(p=>p.socketId===sessionId);
  if(!player)return 'ไม่พบผู้เล่นในห้อง';
  if(data!==undefined&&(data===null||typeof data!=='object'||Array.isArray(data)))return 'รูปแบบคำสั่งไม่ถูกต้อง';
  if(name==='start_game'&&data?.totalPlayers!==undefined&&(!Number.isInteger(data.totalPlayers)||data.totalPlayers<4||data.totalPlayers>10))return 'จำนวนผู้เล่นต้องเป็นจำนวนเต็มตั้งแต่ 4 ถึง 10';
  if(HOST.has(name)&&room.hostSocketId!==sessionId)return 'เฉพาะโฮสต์เท่านั้นที่จัดการห้องได้';
  if(PLAY.has(name)&&(room.status!=='PLAYING'||room.turnOrder[room.currentTurnIndex]!==player.id||!player.isAlive||room.currentPhase!=='PLAY'||room.pendingAction))return 'รอเทิร์นเล่นของคุณและให้การตอบโต้ก่อนหน้าเสร็จก่อน';
  if(name==='end_turn'&&room.pendingAction)return 'ยังมีการตอบโต้ที่ต้องดำเนินการ';
  if(RESPONSES.has(name)&&room.pendingAction?.timeoutAt&&Date.now()>=room.pendingAction.timeoutAt)return 'หมดเวลาตอบโต้แล้ว';
  for(const field of ['cardIds','topIds','bottomIds','targetPlayerIds']){
    const value=data?.[field];if(value!==undefined&&(!Array.isArray(value)||value.length>(field==='targetPlayerIds'?3:176)||value.some((v:any)=>typeof v!=='string'||v.length>80)||new Set(value).size!==value.length))return 'รายการการ์ดไม่ถูกต้องหรือซ้ำกัน';
  }
  for(const field of ['cardId','targetCardId','targetPlayerId','secondaryTargetId','characterId','slot','playAs','guess'])if(data?.[field]!==undefined&&(typeof data[field]!=='string'||data[field].length>100))return 'ข้อมูลคำสั่งไม่ถูกต้อง';
  return null;
}
