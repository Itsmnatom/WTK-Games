import { STRATEGIES } from '../../shared/experimental';
import type { RoomSnapshot } from '../../shared/protocol';
import { esc, btn } from './ui';

export const planName=(id:string)=>STRATEGIES.find(s=>s.id===id)?.name||'';
export function strategyDraft(state:RoomSnapshot,myId:string):string {
  const player=state.players[myId];
  return `<main class="draft-page strategy-page"><div class="draft-heading"><div class="eyebrow">โหมดทดลอง · เลือกแผนลับก่อนเปิดพร้อมกัน</div><h1>เตรียมกลยุทธ์ของคุณ</h1><p>เลือกซ้ำกันได้ ทุกแผนใช้ได้หนึ่งครั้งต่อแมตช์</p><p>เลือกแล้ว ${Object.values(state.players).filter(p=>p.strategyReady).length}/${state.turnOrder.length} คน</p><div class="draft-timer">เหลือ <strong data-deadline="${state.strategyDeadline}"></strong> วินาที</div></div><div class="strategy-grid">${STRATEGIES.map(s=>`<article class="strategy-card ${player?.strategyChoice===s.id?'selected':''}"><span class="eyebrow">${s.timing}</span><h2>${s.name}</h2><p>${s.description}</p>${btn('choose-plan',player?.strategyChoice===s.id?'เลือกแล้ว':player?.strategyChoice?'รอเปิดพร้อมกัน':'เลือกแผน','primary',`data-plan="${s.id}" ${player?.strategyChoice?'disabled':''}`)}</article>`).join('')}</div><p class="draft-hint">หมดเวลา 30 วินาที เลือกจัดทัพอัตโนมัติ · แผนเปิดเผยเมื่อทุกคนพร้อม</p></main>`;
}
export function experimentalHud(state:RoomSnapshot,myId:string):string {
  if(state.ruleset!=='EXPERIMENTAL')return `<div class="experiment-summary"><span>มาตรฐาน · 13 ขุนพล</span><span>แผนกลยุทธ์อยู่ในโหมดทดลอง</span>${btn('experimental-help','วิธีเข้าโหมดทดลอง','tiny')}</div>`;
  const player=state.players[myId];
  const active=state.status==='PLAYING'&&player?.isAlive&&!state.pendingAction&&state.currentPhase==='PLAY'&&state.currentTurnPlayerId===myId;
  const plan=STRATEGIES.find(s=>s.id===player?.strategy);
  return `<div class="experiment-summary"><span class="experiment-label">ทดลอง · 19 ขุนพล</span>${plan?`<span title="${esc(plan.description)}">${plan.name} · ${player.strategyUsed?'ใช้แล้ว':'ยังไม่ใช้'}</span>`:''}<div class="experiment-buttons">${plan&&plan.id!=='SUPPLY'?btn('plan-use','ใช้'+plan.name,'tiny',!active||player.strategyUsed?'disabled':''):''}${!player?.isAlive?btn('spectator','แชตผู้ชม','tiny'):''}</div></div>`;
}
export function spectatorPanel():string {
  return `<h2>ผู้ชมหลังการศึก</h2><p>เห็นเฉพาะข้อมูลสาธารณะ แชตนี้ส่งถึงผู้ตายเท่านั้น ผู้เล่นที่ยังมีชีวิตจะไม่ได้รับข้อความ</p><div id="spectator-messages" class="event-history" aria-live="polite"></div><form id="spectator-form"><label for="spectator-text">ข้อความถึงผู้ชม</label><input id="spectator-text" maxlength="240" autocomplete="off"><button class="button primary" type="submit">ส่งข้อความ</button></form>`;
}
export function updateSpectatorChat(state:RoomSnapshot):void {
  const node=document.querySelector('#spectator-messages');if(!node)return;
  const html=(state.spectatorChat||[]).slice(-40).map((m:{sender:string;text:string;time:string})=>`<div><small>${esc(m.time)} · ${esc(m.sender)}</small><p>${esc(m.text)}</p></div>`).join('')||'<p>ยังไม่มีข้อความ</p>';
  if(node.innerHTML!==html)node.innerHTML=html;
}
