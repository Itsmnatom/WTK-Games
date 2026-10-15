import '@fontsource/noto-sans-thai/400.css';
import '@fontsource/noto-sans-thai/500.css';
import '@fontsource/noto-sans-thai/700.css';
import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CARDS,CARD_BY_ID,HEROES,HERO_BY_ID,FACTIONS,ROLES,canonicalHero,RULES } from '../../shared/catalog';
import type { RoomSnapshot,GameCard,PublicPlayer,ConnectionIdentity } from '../../shared/protocol';
import { GameConnection } from './connection';
import { CourtyardScene } from './scene';
import { TableFeedback, type AcceptedPlay, type FeedbackSettings } from './feedback';
import { esc,icon,btn,art,portrait,cardMarkup,publicCardMarkup,opponentBacks,distance,canUseAs,responder,roleMarkup,suit } from './ui';

gsap.registerPlugin(ScrollTrigger);
const root=document.querySelector<HTMLElement>('#app')!,dialog=document.querySelector<HTMLDialogElement>('#inspector')!;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let state:RoomSnapshot|null=null,myId='',connection:GameConnection|null=null,scene:CourtyardScene|null=null,screen='',status='เชื่อมต่อแล้ว',isAdmin=false;
let playerCount=6,selected=new Set<string>(),targets:string[]=[],skill='',playAs='',pendingKey='',autoStarted=false;
let guanTop:string[]=[],guanBottom:string[]=[],zone='HAND';
let effectsReduced=(()=>{try{const saved=localStorage.getItem('wtk.effectsReduced');return saved==='true'?true:saved==='false'?false:reduce;}catch{return reduce;}})();
let recentPlays:AcceptedPlay[]=[],feedbackSettings:FeedbackSettings={volume:0.35,muted:false,unlocked:false};
const feedback=new TableFeedback({
  onPlay:play=>{recentPlays=[play,...recentPlays.filter(previous=>previous.key!==play.key)].slice(0,4);render();},
  onCue:(cue,data)=>{if(['dying','death','victory','acquire','turn','prompt'].includes(cue))scene?.event(cue,data);},
  onSettings:settings=>{const changed=settings.muted!==feedbackSettings.muted||settings.volume!==feedbackSettings.volume;feedbackSettings=settings;if(changed&&!document.hidden)updateFeedbackControls();},
});
feedbackSettings=feedback.getSettings();
const handNodes=new Map<string,HTMLElement>(),seatNodes=new Map<string,HTMLElement>();
const renderKeys=new Map<string,string>(),viewNodes=new Map<string,HTMLElement>(),markupKeys=new WeakMap<HTMLElement,string>();
let renderFrame=0,handViewportWidth=0,handGeometryDirty=true,handResize:ResizeObserver|null=null;
let clockTimer:ReturnType<typeof setTimeout>|undefined,clockNodes:HTMLElement[]=[];
function view<T extends HTMLElement=HTMLElement>(id:string):T {
  let node=viewNodes.get(id);if(!node){node=document.getElementById(id)!;viewNodes.set(id,node);}return node as T;
}
function changed(region:string,input:unknown):boolean {
  const key=typeof input==='string'?input:JSON.stringify(input);
  if(renderKeys.get(region)===key)return false;renderKeys.set(region,key);return true;
}
function setMarkup(node:Element,markup:string):void {if(markupKeys.get(node as HTMLElement)===markup)return;markupKeys.set(node as HTMLElement,markup);node.innerHTML=markup;}
function setText(node:HTMLElement,value:string):void {if(node.textContent!==value)node.textContent=value;}
const params=new URLSearchParams(location.search);
const me=()=>state?.players[myId];
const mine=(id:string)=>me()?.hand?.find(c=>c.id===id)||Object.values(me()?.equipment||{}).find(c=>c?.id===id);
const phaseName=(phase:string)=>({START:'เริ่มเทิร์น',PREPARATION:'เตรียมการ',JUDGEMENT:'พิจารณา',DRAW:'จั่วการ์ด',PLAY:'เล่นการ์ด',DISCARD:'ทิ้งการ์ด'} as Record<string,string>)[phase]||phase;
function notify(message:string):void {const n=document.createElement('div');n.className='notification';n.textContent=message;document.querySelector('#notifications')!.append(n);setTimeout(()=>n.remove(),5000);}
function inspect(content:string):void {document.querySelector('#inspector-content')!.innerHTML=btn('close',icon('close'),'icon-button','aria-label="ปิดรายละเอียด"')+content;if(!dialog.open)dialog.showModal();}
function closeDialog():void {dialog.close();}
const nav=(game=false)=>`<header class="navigation ${game?'game-navigation':''}"><a class="brand" href="/lobby" ${game?'data-action="leave"':''}><span class="brand-seal">三</span><span>WTK<span class="brand-sub">PIXEL KINGDOMS</span></span></a><nav aria-label="เมนูหลัก">${game?`<span class="connection-state" id="connection-state">${esc(status)}</span>${btn('log',icon('chat'),'icon-button table-log','aria-label="เปิดบันทึกเหตุการณ์"')}${btn('sound-settings',icon(feedbackSettings.muted?'muted':'sound'),'icon-button sound-control','aria-label="ตั้งค่าเสียงและเอฟเฟกต์"')}${btn('copy',icon('copy'),'icon-button','aria-label="คัดลอกรหัสห้อง"')}${btn('catalog',icon('book'),'icon-button','aria-label="คลังการ์ดและขุนพล"')}${btn('leave',icon('back'),'icon-button','aria-label="ออกจากห้อง"')}${isAdmin?btn('sandbox',icon('settings'),'icon-button','aria-label="สนามทดสอบ"'):''}`:`${btn('heroes','ขุนพล','text-button')}${btn('rules','วิธีเล่น','text-button')}${btn('leaderboard','อันดับ','text-button')}`}</nav></header>`;
function showLobby():void {
  scene?.dispose();screen='HOME';handNodes.clear();seatNodes.clear();
  const saved=GameConnection.saved();
  root.innerHTML=`${nav()}<main class="home"><section class="home-hero"><div class="hero-copy"><div class="eyebrow">WAR OF THREE KINGDOMS</div><h1>หนึ่งแผ่นดิน<br><span>หลายชะตา</span></h1><p class="hero-description">ทุกการ์ดมีเดิมพัน ทุกพันธมิตรมีความลับ<br>เลือกขุนพล แล้วเขียนตำนานสามก๊กของคุณ</p><div class="hero-actions">${btn('quick-bot',`${icon('play')} เล่นกับบอท`,'primary')}${btn('focus-online',`${icon('users')} เล่นกับเพื่อน`,'secondary')}</div>${saved?`<button class="resume-link" data-action="reconnect">กลับสู่ห้อง ${esc(saved.roomId)} ${icon('arrow')}</button>`:''}</div><div class="hero-world"><img class="courtyard-art" src="/art/courtyard.png" alt="ลานวังสามก๊กยามค่ำในรูปแบบ pixel art"><div id="lobby-scene" class="lobby-scene"></div><span class="world-caption">ลานวัง · ก่อนเริ่มศึก</span></div></section><section class="play-section" id="play"><div class="section-heading"><h2>เลือกสนามของคุณ</h2><p>วางแผนอย่างเต็มที่ เล่นกับคนรู้ใจ หรือฝึกกลยุทธ์กับบอท</p></div><div class="profile-field"><label for="nickname">ชื่อผู้เล่น</label><input id="nickname" name="nickname" maxlength="20" autocomplete="nickname" value="${esc(localStorage.getItem('wtk.name')||'')}" placeholder="ชื่อที่ใช้ในสนาม"><span>บทบาทของคุณจะเป็นความลับ</span></div><div class="mode-grid"><article class="mode-panel"><div class="mode-emblem">策</div><div><h3>ฝึกกลยุทธ์</h3><p>เริ่มศึกกับบอท เลือกขุนพลและเรียนรู้จากทุกเทิร์น</p></div><label for="player-count">จำนวนผู้เล่นรวมคุณ</label><div class="seat-picker">${btn('count-down','−','step-button','aria-label="ลดจำนวนผู้เล่น"')}<output id="player-count">6 คน</output>${btn('count-up','+','step-button','aria-label="เพิ่มจำนวนผู้เล่น"')}</div>${btn('bot',`${icon('play')} เริ่มเกมกับบอท`,'primary wide')}</article><article class="mode-panel" id="online-panel"><div class="mode-emblem">盟</div><div><h3>รวมพลกับเพื่อน</h3><p>สร้างห้องส่วนตัว หรือเข้าร่วมด้วยรหัสจากโฮสต์</p></div><label for="room-code">รหัสห้อง</label><input id="room-code" autocomplete="off" placeholder="วางรหัสห้องที่นี่"><div class="online-buttons">${btn('create',`สร้างห้อง ${icon('arrow')}`,'primary')}${btn('join','เข้าร่วม','secondary')}</div></article></div></section><section class="hero-gallery" id="hero-gallery"><div class="section-heading"><h2>ขุนพลต่างฝีมือ<br><span>ชะตาที่คุณเลือกได้</span></h2><p>13 ขุนพล สี่ก๊ก และทักษะที่เปลี่ยนเกมได้</p></div><div class="portrait-carousel">${HEROES.map(h=>`<button class="hero-mini" data-action="hero-info" data-hero="${h.id}" style="--faction:${FACTIONS[h.faction].color}">${portrait(h.id)}<span>${h.name}</span><small>${FACTIONS[h.faction].seal} ${FACTIONS[h.faction].name}</small></button>`).join('')}</div></section><section class="learn-section"><div class="learn-heading"><h2>อ่านเกมให้ขาด</h2><p class="reveal-text">บทบาทของคุณกำหนดเป้าหมาย แต่การ์ดบนมือคือทางเลือก โจมตี ป้องกัน และช่วยชีวิตในจังหวะที่ใช่</p>${btn('rules','เปิดคู่มือการเล่น '+icon('arrow'),'secondary')}</div><div class="rule-accordions">${['LORD','LOYALIST','REBEL','RENEGADE'].map(r=>`<details><summary>${roleMarkup(r)}<span>${ROLES[r].name}</span><span class="plus">+</span></summary><p>${ROLES[r].goal}</p></details>`).join('')}</div></section><div class="faction-marquee" aria-hidden="true">${Array.from({length:3},()=>Object.values(FACTIONS).map(f=>`<span>${f.seal} ${f.name}</span>`).join('')).join('')}</div><footer class="home-footer"><h2>ตำนานบทต่อไป<br>เริ่มที่การ์ดใบแรก</h2>${btn('quick-bot','เข้าสู่ลานวัง '+icon('arrow'),'primary')}<span>WTK · Pixel Kingdoms</span></footer></main>`;
  scene=new CourtyardScene(document.querySelector('#lobby-scene')!,true);
  if(!reduce){gsap.from('.hero-copy > *',{opacity:0,y:20,duration:0.8,stagger:0.12,ease:'power2.out'});gsap.from('.courtyard-art',{opacity:0,scale:1.04,duration:1.3});const media=gsap.matchMedia();media.add('(min-width: 1000px)',()=>{ScrollTrigger.create({trigger:'.learn-section',start:'top 140px',end:'bottom 70%',pin:'.learn-heading',pinSpacing:false});gsap.fromTo('.reveal-text',{opacity:0.25},{opacity:1,scrollTrigger:{trigger:'.learn-section',start:'top 80%',end:'top 20%',scrub:true}});});}
}
function nameInput():string {const input=document.querySelector<HTMLInputElement>('#nickname');const name=(input?.value||localStorage.getItem('wtk.name')||'').trim();if(!name){notify('กรุณาระบุชื่อผู้เล่น');input?.focus();return '';}localStorage.setItem('wtk.name',name);return name;}
function enter(action:string,mode='ONLINE',roomId=''):void {const name=nameInput();if(!name)return;const url=new URL(roomId?'/room/'+encodeURIComponent(roomId):'/room',location.origin);url.search=new URLSearchParams({action,mode,name,players:String(playerCount)}).toString();location.assign(url);}
function canonicalRoomUrl(identity:ConnectionIdentity):void {
  const url=new URL(location.href);url.pathname='/room/'+encodeURIComponent(identity.roomId);
  url.searchParams.set('action','reconnect');url.searchParams.set('playerId',identity.playerId);
  history.replaceState(history.state,'',url.pathname+url.search+url.hash);
  params.set('action','reconnect');params.set('playerId',identity.playerId);
}
function resetSelection():void {selected.clear();targets=[];skill='';playAs='';zone='HAND';}
function ensureScreen(next:string,content:()=>string):void {if(screen===next)return;scene?.dispose();scene=null;handResize?.disconnect();handResize=null;handViewportWidth=0;handGeometryDirty=true;handNodes.clear();seatNodes.clear();renderKeys.clear();viewNodes.clear();root.innerHTML=content();screen=next;}
function render():void {
  if(screen==='HOME'||document.hidden||renderFrame)return;
  renderFrame=requestAnimationFrame(()=>{renderFrame=0;flushRender();});
}
function flushRender():void {
  if(!state){ensureScreen('CONNECTING',()=>`${nav(true)}<main class="connecting"><div class="brand-seal">三</div><h1>กำลังเข้าสู่ลานวัง</h1><p>${esc(status)}</p>${btn('leave','กลับหน้าหลัก','secondary')}</main>`);return;}
  if(state.status==='LOBBY')renderWaiting();else if(state.status==='DRAFTING')renderDraft();else renderBoard();
  refreshClocks();
}
function renderWaiting():void {
  ensureScreen('WAITING',()=>`${nav(true)}<main class="waiting-page"><div class="waiting-art"></div><section class="waiting-panel"><div class="eyebrow">รวมพลก่อนศึก</div><h1>ห้องพักผู้เล่น</h1><p>ส่งรหัสนี้ให้เพื่อน แล้วเริ่มศึกเมื่อพร้อม</p><button class="room-code" data-action="copy" id="waiting-code"></button><div id="waiting-players"></div><div id="waiting-actions"></div></section></main>`);
  document.querySelector('#waiting-code')!.textContent=state!.roomId;
  document.querySelector('#waiting-players')!.innerHTML=state!.turnOrder.map(id=>{const p=state!.players[id];return `<div class="waiting-player"><span class="player-initial">${esc(p.name.slice(0,1))}</span><span>${esc(p.name)}</span><small>${p.isHost?'โฮสต์':p.isBot?'บอท':'พร้อมเข้าศึก'}</small></div>`;}).join('');
  document.querySelector('#waiting-actions')!.innerHTML=me()?.isHost?`<div class="host-controls">${btn('add-bot','เพิ่มบอท','secondary',''+(state!.turnOrder.length>=10?'disabled':''))}${btn('remove-bot','ลบบอท','secondary')}</div>${btn('start','เริ่มเลือกขุนพล '+icon('arrow'),'primary wide',state!.mode==='ONLINE'&&state!.turnOrder.length<4?'disabled':'')}<p class="helper">เริ่มได้เมื่อมีผู้เล่นและบอทรวมอย่างน้อย 4 คน</p>`:'<p class="helper">กำลังรอโฮสต์เริ่มเกม</p>';
}
function renderDraft():void {
  ensureScreen('DRAFT',()=>`${nav(true)}<main class="draft-page"><div class="draft-heading"><div class="eyebrow">เลือกชะตาของคุณ</div><h1>นำทัพด้วยขุนพลคนไหน</h1><p id="draft-role"></p><div class="draft-timer">เลือกภายใน <strong data-deadline=""></strong> วินาที</div></div><div id="draft-choices" class="draft-choices"></div><p class="draft-hint">เมื่อหมดเวลา จะเลือกขุนพลตัวแรกให้ • บทบาทของผู้อื่นยังเป็นความลับ</p></main>`);
  const player=me();if(!player)return;
  setMarkup(document.querySelector('#draft-role')!,`${roleMarkup(player.role)} ${esc(ROLES[player.role]?.name)} · ${esc(ROLES[player.role]?.goal)}`);
  document.querySelector('[data-deadline]')!.setAttribute('data-deadline',String(state!.draftDeadline||0));
  document.querySelector('#draft-choices')!.innerHTML=player.character?`<div class="chosen-hero">${portrait(player.character)}<h2>${esc(HERO_BY_ID[canonicalHero(player.character)]?.name)}</h2><p>เลือกแล้ว กำลังรอผู้เล่นอื่น</p></div>`:(player.characterChoices||[]).map(choice=>{const h=HERO_BY_ID[canonicalHero(choice.id)];return `<button class="draft-card" data-action="draft" data-hero="${esc(choice.id)}" style="--faction:${FACTIONS[h?.faction||'QUN'].color}">${portrait(choice.id)}<div class="draft-card-copy"><small>${FACTIONS[h?.faction||'QUN'].seal} ${FACTIONS[h?.faction||'QUN'].name} · ${h?.hp} HP</small><h2>${esc(h?.name||choice.name)}</h2><span class="hero-english">${esc(h?.english)}</span><p>${esc(h?.skills)}</p><span class="draft-choose">เลือกขุนพล ${icon('arrow')}</span></div></button>`;}).join('');
}
function renderBoard():void {
  const fresh=screen!=='BOARD';
  ensureScreen('BOARD',()=>`${nav(true)}<main class="board-page"><div class="board-top"><div><span id="phase-label"></span><strong id="turn-label"></strong></div><div class="pile-stats"><span>จั่ว <b id="deck-count"></b></span><span>ทิ้ง <b id="discard-count"></b></span><span id="board-room"></span></div></div><section class="board-stage" aria-label="โต๊ะการศึก"><div id="board-scene" class="board-scene"></div><section id="center-play" class="center-play" aria-label="การ์ดที่เล่นกลางโต๊ะ"><div id="recent-plays"></div></section><div id="seats" class="seats" aria-label="ผู้เล่นรอบโต๊ะ"></div><div class="self-summary" id="self-summary"></div>${btn('log',icon('chat'),'log-toggle icon-button','aria-label="เปิดบันทึกเหตุการณ์"')}</section><section class="hand-dock" aria-label="การ์ดและคำสั่งของคุณ"><div class="action-dock" id="action-dock" aria-live="polite"></div><div class="hand-heading"><div><strong>มือของคุณ</strong> <span id="hand-count"></span><span id="selection-label"></span></div><div id="skill-buttons"></div></div><div class="hand-scroll"><div id="hand" class="hand" role="group" aria-label="เลือกการ์ดบนมือ"></div></div></section><aside id="ended-panel" class="ended-panel" hidden></aside></main>`);
  const board=document.querySelector<HTMLElement>('.board-page')!;
  board.dataset.seatCount=String(state!.turnOrder.length);
  board.classList.toggle('many-seats',state!.turnOrder.length>=8);
  board.classList.toggle('reduced-effects',effectsReduced);
  if(fresh){scene=new CourtyardScene(document.querySelector('#board-scene')!);scene.onLayout=applySceneLayout;}
  scene?.setEffectsReduced(effectsReduced);
  scene?.update(state!,myId);
  document.querySelector('#phase-label')!.textContent=phaseName(state!.currentPhase);
  document.querySelector('#turn-label')!.textContent=state!.status==='ENDED'?'การศึกสิ้นสุด':state!.currentTurnPlayerId===myId?'เทิร์นของคุณ':`เทิร์นของ ${state!.players[state!.currentTurnPlayerId]?.name||'…'}`;
  document.querySelector('#deck-count')!.textContent=String(state!.deckCount??0);document.querySelector('#discard-count')!.textContent=String(state!.discardCount??0);document.querySelector('#board-room')!.textContent=state!.roomId;
  renderSeats();renderSelf();renderHand();renderActions();renderSkills();renderPlayedCards();
  applySceneLayout(scene!.layout());updateFeedbackControls();
  const ended=document.querySelector<HTMLElement>('#ended-panel')!;ended.hidden=state!.status!=='ENDED';
  if(!ended.hidden)ended.innerHTML=`<div class="winner-seal">${ROLES[state!.winnerRole||'UNKNOWN']?.seal}</div><h1>${esc(state!.winnerText||'จบการศึก')}</h1><p>เปิดเผยบทบาทแล้ว ดูการตัดสินใจของแต่ละฝ่ายและเริ่มตำนานบทใหม่</p>${btn('leave','กลับหน้าหลัก '+icon('arrow'),'primary')}`;
}
function applySceneLayout(layout:ReturnType<CourtyardScene['layout']>):void {
  if(screen!=='BOARD')return;
  if(!changed('scene-layout',[layout,seatNodes.size]))return;
  for(const [id,position]of Object.entries(layout.seats)){const seat=seatNodes.get(id);if(seat){seat.style.setProperty('--seat-x',`${position.x*100}%`);seat.style.setProperty('--seat-y',`${position.y*100}%`);}}
  const center=document.querySelector<HTMLElement>('#center-play');if(center){center.style.setProperty('--center-x',`${layout.center.x*100}%`);center.style.setProperty('--center-y',`${layout.center.y*100}%`);}
  const stage=document.querySelector<HTMLElement>('.board-stage');if(stage){stage.dataset.tableLeft=String(layout.table.left);stage.dataset.tableTop=String(layout.table.top);stage.dataset.tableWidth=String(layout.table.width);stage.dataset.tableHeight=String(layout.table.height);}
}
const skillNames:Record<string,string>={ZHIHENG:'ผลัดการ์ด',RENDE:'ปันสุข',KUROU:'โบยตนเอง',LIJIAN:'บ่วงเสน่หา',FANJIAN:'บ่มเพลิง',HUJIA:'องครักษ์',JIJIANG:'ระดมพล',JIANXIONG:'มหาอุปราช',FANKUI:'ป้อนกลับ',GUICAI:'เปลี่ยนชะตา',GUANXING:'ดูดาว',LUOSHEN:'ลั่วเสิน',BIYUE:'งามล่มเมือง',YINGZI:'สง่างาม'};
function renderPlayedCards():void {
  const container=document.querySelector<HTMLElement>('#recent-plays');if(!container)return;
  if(!changed('played-cards',[recentPlays,recentPlays.map(p=>[state?.players[p.playerId]?.name,state?.players[p.playerId]?.character,p.targetIds.map(id=>state?.players[id]?.name)])]))return;
  if(!recentPlays.length){setMarkup(container,'<div class="table-seal" aria-hidden="true">三</div><p class="table-empty">สนามการศึก</p>');return;}
  const newest=recentPlays[0],actor=state?.players[newest.playerId];
  const targetNames=newest.targetIds.map(id=>state?.players[id]?.name).filter(Boolean);
  setMarkup(container,`<div class="played-cards">${recentPlays.slice(0,4).reverse().map((play,index,array)=>{
    const latest=index===array.length-1,player=state?.players[play.playerId],extra=`data-play="${esc(play.key)}"`;
    const face=play.kind==='SKILL'||play.skillId?`<button type="button" class="skill-play" data-action="public-play" ${extra} aria-label="ดูสกิล ${esc(skillNames[play.skillId||'']||play.cardName)}">${portrait(player?.character||'')}<span>${esc(skillNames[play.skillId||'']||'สกิลขุนพล')}</span></button>`:publicCardMarkup(play.cardName,play.card,extra);
    return `<div class="played-entry ${latest?'newest':'previous'}" style="--play-order:${index}">${face}</div>`;
  }).join('')}</div><div class="play-context" aria-live="polite"><strong>${esc(actor?.name||'ผู้เล่น')}${targetNames.length?' <span class="play-arrow">→</span> '+esc(targetNames.join(', ')):''}</strong><span>${esc(newest.skillId?skillNames[newest.skillId]||'สกิลขุนพล':CARD_BY_ID[newest.cardName]?.name||newest.cardName)}${newest.kind==='RESPONSE'?' · ตอบโต้':''}</span></div>`);
}
function updateFeedbackControls():void {
  document.querySelectorAll<HTMLElement>('.sound-control').forEach(button=>{setMarkup(button,icon(feedbackSettings.muted?'muted':'sound'));button.setAttribute('aria-label',feedbackSettings.muted?'ตั้งค่าเสียง ขณะนี้ปิดเสียง':'ตั้งค่าเสียงและเอฟเฟกต์');});
  const mute=document.querySelector<HTMLButtonElement>('[data-action="mute"]');if(mute){mute.textContent=feedbackSettings.muted?'เปิดเสียง':'ปิดเสียง';mute.setAttribute('aria-pressed',String(feedbackSettings.muted));}
  const volume=document.querySelector<HTMLInputElement>('#sound-volume');if(volume)volume.value=String(Math.round(feedbackSettings.volume*100));
  const output=document.querySelector('#volume-value');if(output)output.textContent=`${Math.round(feedbackSettings.volume*100)}%`;
  const reduced=document.querySelector<HTMLButtonElement>('[data-action="reduce-fx"]');if(reduced){reduced.textContent=effectsReduced?'เอฟเฟกต์แบบเรียบ':'เอฟเฟกต์เต็ม';reduced.setAttribute('aria-pressed',String(effectsReduced));}
}
function feedbackDialog():void {
  feedbackSettings=feedback.getSettings();
  inspect(`<h2>เสียงและเอฟเฟกต์</h2><div class="feedback-settings"><label for="sound-volume">ความดัง <output id="volume-value">${Math.round(feedbackSettings.volume*100)}%</output></label><input id="sound-volume" type="range" min="0" max="100" value="${Math.round(feedbackSettings.volume*100)}"><div class="settings-buttons">${btn('mute',feedbackSettings.muted?'เปิดเสียง':'ปิดเสียง','secondary',`aria-pressed="${feedbackSettings.muted}"`)}${btn('preview-sound','ลองเสียง','primary')}</div><label>การเคลื่อนไหว</label>${btn('reduce-fx',effectsReduced?'เอฟเฟกต์แบบเรียบ':'เอฟเฟกต์เต็ม','secondary',`aria-pressed="${effectsReduced}"`)}<p>การ์ดและสถานะกลางโต๊ะยังแสดงครบในทุกโหมด</p></div>`);
}
function targetAllowed(p:PublicPlayer):boolean {
  if(!state||!me()||!p.isAlive)return false;
  const card=mine([...selected][0]),name=playAs||card?.name||'';
  if(skill==='RENDE')return p.id!==myId;
  if(skill==='LIJIAN')return p.id!==myId&&HERO_BY_ID[canonicalHero(p.character)]?.gender==='MALE';
  if(skill==='FANJIAN')return p.id!==myId;
  if(skill==='JIJIANG'||skill==='SPEAR'||['SLASH','THUNDER_ATTACK'].includes(name))return p.id!==myId&&distance(state,myId,p.id)<=(me()!.equipment.weapon?.range||CARD_BY_ID[me()!.equipment.weapon?.name||'']?.range||1)&&!(canonicalHero(p.character)==='ZHUGE_LIANG'&&!p.handCount);
  if(name==='IRON_CHAIN')return true;
  if(name==='BORROWED_SWORD'){if(!targets.length)return p.id!==myId&&!!p.equipment.weapon;const a=targets[0];return p.id!==a&&distance(state,a,p.id)<=(state.players[a].equipment.weapon?.range||CARD_BY_ID[state.players[a].equipment.weapon?.name||'']?.range||1);}
  if(['STEAL','SABOTAGE'].includes(name))return p.id!==myId&&(p.handCount>0||Object.values(p.equipment).some(Boolean)||p.delayedKitZone.length>0)&&(name!=='STEAL'||distance(state,myId,p.id)<=1);
  if(name==='FIRE_ATTACK')return p.id!==myId&&p.handCount>0;
  if(name==='STARVATION')return p.id!==myId&&distance(state,myId,p.id)<=1&&!p.delayedKitZone.some(c=>c.name===name);
  if(name==='ACEDIA')return p.id!==myId&&!p.delayedKitZone.some(c=>c.name===name);
  if(name==='DUEL')return p.id!==myId&&!(canonicalHero(p.character)==='ZHUGE_LIANG'&&!p.handCount);
  return false;
}
function renderSeats():void {
  const container=document.querySelector('#seats')!,order=state!.turnOrder.filter(id=>id!==myId),count=order.length;
  for(const[id,node]of seatNodes)if(!order.includes(id)){node.remove();seatNodes.delete(id);}
  order.forEach((id,index)=>{const p=state!.players[id];const h=HERO_BY_ID[canonicalHero(p.character)];let node=seatNodes.get(id);if(!node){node=document.createElement('button');node.setAttribute('type','button');node.dataset.action='target';node.dataset.player=id;container.append(node);seatNodes.set(id,node);}const a=(200+140*(index/Math.max(1,count-1)))*Math.PI/180;
    node.className=`seat ${targets.includes(id)?'target-selected':''} ${targetAllowed(p)?'legal-target':''} ${state!.currentTurnPlayerId===id?'active-turn':''} ${!p.isAlive?'dead':''}`;
    node.style.setProperty('--faction',FACTIONS[h?.faction||'QUN'].color);
    setMarkup(node,`<span class="seat-face">${portrait(p.character)}${roleMarkup(p.role)}</span><span class="seat-copy"><span class="seat-name">${esc(h?.name||p.name)}</span><span class="seat-health"><b>${Math.max(0,p.hp)}</b><span>/${p.maxHp}</span> <small>${p.handCount} ใบ</small></span><span class="seat-player">${esc(p.name)}</span><span class="seat-tags"><span>ระยะ ${distance(state!,myId,id)}</span>${p.isChained?'<span>โซ่</span>':''}${p.isDisconnected?'<span>หลุด</span>':''}</span></span>${opponentBacks(p.handCount)}`);
    node.setAttribute('aria-label',`${p.name} ${h?.name||''} ${p.hp}/${p.maxHp} HP ระยะ ${distance(state!,myId,id)} ${p.isAlive?'':'เสียชีวิต'}`);
  });
}
function renderSelf():void {
  const p=me();if(!p)return;const h=HERO_BY_ID[canonicalHero(p.character)];
  setMarkup(document.querySelector('#self-summary')!,`<button class="self-portrait" data-action="hero-info" data-hero="${canonicalHero(p.character)}" aria-label="ดูขุนพลของคุณ ${esc(h?.name)}">${portrait(p.character)}</button><div class="self-copy"><div class="self-name">${esc(h?.name)} ${roleMarkup(p.role)} <span class="self-health">${Math.max(0,p.hp)} <small>/ ${p.maxHp} HP</small></span></div><span class="self-status">${p.wineActive?'สุรา · ':''}${p.isChained?'ล่ามโซ่ · ':''}${state!.currentTurnPlayerId===myId?'เทิร์นของคุณ':'ขุนพลของคุณ'}</span><div class="equipment-row">${Object.entries(p.equipment).map(([,c])=>c?`<button class="equipment-chip ${selected.has(c.id)?'selected':''}" data-action="equipment" data-card="${esc(c.id)}" title="${esc(CARD_BY_ID[c.name]?.description)}">${esc(CARD_BY_ID[c.name]?.name||c.name)}</button>`:'').join('')}${p.delayedKitZone.map(c=>`<span class="delayed-chip">${esc(CARD_BY_ID[c.name]?.name)}</span>`).join('')}</div></div>`);
}
function renderHand():void {
  const container=document.querySelector<HTMLElement>('#hand')!,cards=me()?.hand||[];
  if(changed('hand-order',cards.map(c=>c.id)))handGeometryDirty=true;
  for(const[id,node]of handNodes)if(!cards.some(c=>c.id===id)){node.remove();handNodes.delete(id);selected.delete(id);}
  for(const card of cards){let node=handNodes.get(card.id);if(!node){const wrapper=document.createElement('div');wrapper.innerHTML=cardMarkup(card);node=wrapper.firstElementChild as HTMLElement;handNodes.set(card.id,node);container.append(node);if(!effectsReduced)gsap.fromTo(node,{opacity:0},{opacity:1,duration:0.3,clearProps:'opacity'});}node.classList.toggle('selected',selected.has(card.id));node.setAttribute('aria-pressed',String(selected.has(card.id)));}
  container.classList.toggle('empty-hand',cards.length===0);if(!cards.length)container.setAttribute('data-empty','ยังไม่มีการ์ดบนมือ');else container.removeAttribute('data-empty');
  document.querySelector('#hand-count')!.textContent=`${cards.length} ใบ`;
  const selection=mine([...selected][0]);document.querySelector('#selection-label')!.textContent=selection?' · '+(CARD_BY_ID[playAs||selection.name]?.name||selection.name):'';
  layoutHand();
}
function layoutHand():void {
  const container=document.querySelector<HTMLElement>('#hand'),scroll=document.querySelector<HTMLElement>('.hand-scroll');if(!container||!scroll)return;
  if(!handResize){handResize=new ResizeObserver(entries=>{const width=entries[0]?.contentRect.width||0;if(width!==handViewportWidth){handViewportWidth=width;handGeometryDirty=true;render();}});handResize.observe(scroll);}
  if(!handGeometryDirty)return;handGeometryDirty=false;
  const nodes=Array.from(container.querySelectorAll<HTMLElement>('.hand-card')),count=nodes.length;
  const short=innerHeight<=600&&innerWidth>innerHeight,mobile=innerWidth<=700;
  const width=short?68:mobile?82:100,step=short?48:mobile?(count<=5?62:48):(count<=7?78:62),spread=Math.max(0,(count-1)*step)+width;
  const viewport=handViewportWidth||scroll.clientWidth;container.style.width=`${Math.max(viewport-12,spread+32)}px`;
  nodes.forEach((node,index)=>{const offset=index-(count-1)/2,ratio=count>1?offset/((count-1)/2):0;node.style.setProperty('--fan-x',`${offset*step}px`);node.style.setProperty('--fan-y',`${Math.abs(ratio)*(short?4:11)}px`);node.style.setProperty('--fan-angle',`${ratio*(short?6:9)}deg`);node.style.setProperty('--fan-layer',String(index+1));});
}
function renderSkills():void {
  const p=me(),container=document.querySelector('#skill-buttons')!;if(!p)return;
  const active=state!.currentTurnPlayerId===myId&&state!.currentPhase==='PLAY'&&!state!.pendingAction&&p.isAlive;
  const h=canonicalHero(p.character);const choices=h==='SUN_QUAN'?[['ZHIHENG','ผลัดการ์ด',p.skillResignationUsed]]:h==='LIU_BEI'?[['RENDE','ปันสุข',false]]:h==='DIAO_CHAN'?[['LIJIAN','บ่วงเสน่หา',p.skillDiaoChanUsed]]:h==='ZHOU_YU'?[['FANJIAN','บ่มเพลิง',p.skillZhouYuUsed]]:h==='HUANG_GAI'?[['KUROU','โบยตนเอง',false]]:[];
  if(p.equipment.weapon?.name==='SERPENT_SPEAR')choices.push(['SPEAR','ทวนอสรพิษ',false]);if(h==='LIU_BEI'&&p.role==='LORD')choices.push(['JIJIANG','ระดมพล',false]);
  container.innerHTML=(Object.values(p.equipment).some(Boolean)?btn('own-equipment','อุปกรณ์','skill-button'):'')+choices.map(([id,label,used])=>btn('skill',String(label),'skill-button '+(skill===id?'selected':''),`data-skill="${id}" ${!active||used?'disabled':''}`)).join('')+btn('inspect-selected',icon('eye'),'icon-button','aria-label="ดูการ์ดที่เลือก" '+(!selected.size?'disabled':''));
}
function requiredTargets():number {if(['LIJIAN'].includes(skill))return 2;if(['RENDE','FANJIAN','SPEAR','JIJIANG'].includes(skill))return 1;const card=mine([...selected][0]);const name=playAs||card?.name;if(name==='BORROWED_SWORD')return 2;if(name==='IRON_CHAIN')return 1;return ['SLASH','THUNDER_ATTACK','STEAL','SABOTAGE','DUEL','ACEDIA','STARVATION','FIRE_ATTACK'].includes(name||'')?1:0;}
function maximumTargets():number {const player=me(),id=[...selected][0],name=playAs||mine(id)?.name;if(['SLASH','THUNDER_ATTACK'].includes(name||'')&&player?.equipment.weapon?.name==='SKY_PIERCING_HALBERD'&&player.hand?.length===1&&player.hand[0].id===id)return 3;return name==='IRON_CHAIN'||skill==='LIJIAN'||name==='BORROWED_SWORD'?2:requiredTargets();}
function frostDiscardCount():number {
  const pending=state?.pendingAction,target=pending?.type==='WAITING_FOR_FROST_DISCARD'?state?.players[pending.targetPlayerId]:null;
  return target?Math.min(2,target.handCount+Object.values(target.equipment).filter(Boolean).length):0;
}
function isFrostChoice(id:string):boolean {
  const pending=state?.pendingAction,target=pending?.type==='WAITING_FOR_FROST_DISCARD'?state?.players[pending.targetPlayerId]:null;
  if(!target)return false;
  if(/^hand_\d+$/.test(id))return Number(id.slice(5))<target.handCount;
  return Object.values(target.equipment).some(card=>card?.id===id);
}
function renderActions():void {
  const p=me(),dock=document.querySelector('#action-dock')!;if(!p)return;
  const pending=state!.pendingAction;
  if(pending){renderReaction();return;}
  if(!p.isAlive){dock.innerHTML='<div class="action-description"><strong>คุณเสียชีวิตแล้ว</strong><span>ชมการศึกต่อได้ บทบาทของคุณถูกเปิดเผยแล้ว</span></div>';return;}
  if(state!.currentTurnPlayerId!==myId){setMarkup(dock,`<div class="action-description"><strong>รอจังหวะของคุณ</strong><span>ตรวจการ์ดและสถานะผู้เล่นได้ระหว่างรอ</span></div>`);return;}
  if(state!.currentPhase==='DISCARD'){const need=Math.max(0,p.handCount-p.hp-(p.equipment.treasure?.name==='WOODEN_CART'?1:0));setMarkup(dock,`<div class="action-description"><strong>เลือกทิ้ง ${need} ใบ</strong><span>เลือกแล้ว ${selected.size} ใบ · เก็บได้ ${p.hp+(p.equipment.treasure?.name==='WOODEN_CART'?1:0)} ใบ</span></div>${btn('discard','ยืนยันทิ้งการ์ด','primary',selected.size!==need?'disabled':'')}`);return;}
  const card=mine([...selected][0]),def=CARD_BY_ID[playAs||card?.name||''];const wanted=requiredTargets(),chain=!skill&&!playAs&&card?.name==='IRON_CHAIN';
  const enough=skill==='ZHIHENG'?selected.size>0:skill==='RENDE'?selected.size>0&&targets.length===1:skill==='SPEAR'?selected.size===2&&targets.length===1:skill==='JIJIANG'?targets.length===1:selected.size===1&&targets.length>=wanted;
  setMarkup(dock,`<div class="action-description"><strong>${esc(skill?({ZHIHENG:'ผลัดการ์ด',RENDE:'ปันสุข',LIJIAN:'บ่วงเสน่หา',FANJIAN:'บ่มเพลิง',SPEAR:'ทวนอสรพิษ',JIJIANG:'ระดมพล'} as Record<string,string>)[skill]:def?.name||'เลือกการ์ดเพื่อเริ่มวางแผน')}</strong><span>${chain?targets.length?`เชื่อมโซ่ ${targets.length}/2 เป้าหมาย · ${targets.map(id=>esc(state!.players[id]?.name)).join(', ')}`:'เลือก 1–2 เป้าหมายเพื่อเชื่อมโซ่ หรือทิ้งเพื่อจั่ว 1 ใบ':wanted?`เลือกเป้าหมาย ${targets.length}/${wanted} · ${targets.map(id=>esc(state!.players[id]?.name)).join(', ')}`:def?.description||'ไม่มีเวลาจำกัดสำหรับการคิดในเทิร์นของคุณ'}</span></div><div class="dock-buttons">${card&&canonicalHero(p.character)==='GUAN_YU'&&['HEART','DIAMOND'].includes(card.suit)||card&&canonicalHero(p.character)==='ZHAO_YUN'&&card.name==='DODGE'?btn('convert',playAs?'ใช้ตามการ์ด':'แปลงเป็นโจมตี','secondary'):''}${chain?btn('recast','ทิ้งเพื่อจั่ว 1 ใบ','secondary',targets.length?'disabled':''):''}${btn('submit',`${skill?'ใช้สกิล':chain?'เชื่อมโซ่':'เล่นการ์ด'} ${icon('arrow')}`,'primary',!enough?'disabled':'')}${btn('cancel','ยกเลิก','secondary',!selected.size&&!skill?'disabled':'')}${btn('end','จบเทิร์น','secondary')}</div>`);
}
function renderReaction():void {
  const pending=state!.pendingAction!,p=me()!,dock=document.querySelector('#action-dock')!;
  const owner=responder(state!),isNegate=pending.type==='WAITING_FOR_NEGATE';
  const eligible=isNegate?p.isAlive&&p.hand?.some(c=>c.name==='NEGATE')&&!(state!.negatePassedPlayers||[]).includes(myId)&&!(pending.sourcePlayerId===myId&&(state!.actionChain?.length||0)<2):owner===myId;
  const clock=`<span class="response-clock"><b data-deadline="${pending.timeoutAt||0}"></b>s</span>`;
  if(!eligible){setMarkup(dock,`<div class="action-description"><strong>${isNegate?'หน้าต่างไร้ข้อกังขา':`รอ ${esc(state!.players[owner||'']?.name||'ผู้เล่น')}`}</strong><span>กำลังดำเนินการตอบโต้</span></div>${clock}`);return;}
  let title='ตอบโต้การ์ด',description='เลือกการ์ดบนมือ แล้วกดยืนยัน',content='',buttons='';
  const selectedCard=mine([...selected][0]);
  if(pending.type==='GUANXING'){
    title='ดูดาว · จัดเรียงกองไพ่';description='เรียงจากซ้ายไปขวา ใบซ้ายสุดจะถูกจั่วก่อน';
    content=`<div class="guanxing-list">${[...guanTop,...guanBottom].map(id=>{const c=pending.cards?.find((c:GameCard)=>c.id===id);return c?`<div class="guanxing-item">${cardMarkup(c,'guan-select')}<div>${btn('guan-up','←','tiny','data-card="'+id+'" aria-label="เลื่อนขึ้นในลำดับ"')}${btn('guan-bottom',guanBottom.includes(id)?'ขึ้นกอง':'ใต้กอง','tiny',`data-card="${id}"`)}</div></div>`:'';}).join('')}</div>`;buttons=btn('guan-confirm','ยืนยันลำดับ','primary');
  }else if(pending.type==='FANJIAN'){title='บ่มเพลิง · ทายดอกไพ่';description='คุณจะได้รับการ์ด ถ้าทายผิดเสีย 1 HP';buttons=['SPADE','HEART','CLUB','DIAMOND'].map(s=>btn('guess',suit(s),'suit-button',`data-suit="${s}" aria-label="ทาย ${s}"`)).join('');
  }else if(pending.type==='DAMAGE_SKILL'){title=pending.skill==='JIANXIONG'?'มหาอุปราช · รับการ์ดที่ทำดาเมจ':'ป้อนกลับ · หยิบการ์ด';description='เลือกใช้สกิลหรือผ่านโดยไม่เสียการ์ด';if(pending.skill==='FANKUI'){const source=state!.players[pending.sourcePlayerId];content=`<div class="zone-options">${btn('damage-zone','มือแบบสุ่ม','secondary',`data-zone="hand"`)}${Object.entries(source?.equipment||{}).filter(([,c])=>c).map(([slot,c])=>btn('damage-zone',esc(CARD_BY_ID[c!.name]?.name),'secondary',`data-zone="${slot}"`)).join('')}</div>`;}buttons=btn('hero-accept','ใช้สกิล','primary')+btn('pass','ผ่าน','secondary');
  }else if(pending.type==='GUICAI'){title='เปลี่ยนชะตา · แทนไพ่พิจารณา';description=`ไพ่ปัจจุบัน ${CARD_BY_ID[pending.judgeCard?.name]?.name||''} ${suit(pending.judgeCard?.suit)} เลือกการ์ดบนมือเพื่อแทน`;buttons=btn('respond','แทนไพ่พิจารณา','primary',!selectedCard?'disabled':'')+btn('pass','ผ่าน','secondary');
  }else if(pending.type==='LORD_SKILL'){title=pending.skill==='HUJIA'?'องครักษ์ · เจ้าเมืองขอหลบหลีก':'ระดมพล · เจ้าเมืองขอโจมตี';description='การช่วยเหลือจะใช้การ์ดของคุณหนึ่งใบ';buttons=btn('respond','ช่วยเจ้าเมือง','primary',!selectedCard||!canUseAs(p,selectedCard,pending.requestType)?'disabled':'')+btn('pass','ผ่าน','secondary');
  }else if(pending.type==='LUO_RIVER'){title='ลั่วเสิน · เปิดไพ่พิจารณา';description='รับการ์ดดำ จนพบแดงหรือเลือกหยุด';buttons=btn('luo-draw','เปิดไพ่','primary')+btn('pass','หยุด','secondary');
  }else if(pending.type==='DYING'){title=`กู้ชีพ ${state!.players[pending.targetPlayerId]?.name}`;description=`ต้องการ ${pending.peachNeeded} HP · ใช้สวนท้อ${pending.targetPlayerId===myId?' หรือสุราช่วยตนเอง':''}`;const rescue=p.hand?.find(c=>c.name==='PEACH'||pending.targetPlayerId===myId&&c.name==='WINE');buttons=btn('rescue','ช่วยชีวิต','primary',!rescue?'disabled':'')+btn('pass','ผ่าน','secondary');
  }else if(isNegate){title='ไร้ข้อกังขา · สวนกลยุทธ์';description=`สายโซ่ ${state!.actionChain?.length||1} ขั้น · เล่นเพื่อสลับผลการยกเลิก`;const negate=p.hand?.find(c=>c.name==='NEGATE');buttons=btn('negate','ใช้ไร้ข้อกังขา','primary',!negate?'disabled':'')+btn('pass','ผ่าน','secondary');
  }else if(pending.type==='WAITING_FOR_BUMPER_PICK'){title='เลือกการ์ดจากการเก็บเกี่ยว';description='เลือกหนึ่งใบเพื่อรับขึ้นมือ';content=`<div class="reaction-cards">${state!.bumperHarvestCards.map(c=>cardMarkup(c,'harvest')).join('')}</div>`;
  }else if(pending.type==='WAITING_FOR_FIRE_REVEAL'){title='โจมตีเพลิง · เปิดการ์ด';description='เลือกหนึ่งใบให้ผู้ร่ายเห็นดอกไพ่ การ์ดยังอยู่บนมือ';buttons=btn('respond','เปิดการ์ดที่เลือก','primary',!selectedCard?'disabled':'');
  }else if(pending.type==='WAITING_FOR_FIRE_MATCH'){title='โจมตีเพลิง · ทิ้งดอกเดียวกัน';description=`ทิ้ง ${suit(pending.requiredSuit)} เพื่อทำดาเมจไฟ 1`;buttons=btn('respond','ทิ้งและโจมตี','primary',selectedCard?.suit!==pending.requiredSuit?'disabled':'')+btn('pass','ผ่าน','secondary');
  }else if(pending.type==='WAITING_FOR_YINYANG_CHOICE'){title='กระบี่หยินหยาง';description='ทิ้งการ์ดหนึ่งใบ หรือให้ผู้โจมตีจั่วหนึ่งใบ';buttons=btn('respond','ทิ้งใบที่เลือก','primary',!selectedCard?'disabled':'')+btn('pass','ให้ผู้โจมตีจั่ว','secondary');
  }else if(['WAITING_FOR_GREEN_DRAGON','WAITING_FOR_AXE_DISCARD','WAITING_FOR_TRIDENT_DISCARD','WAITING_FOR_FROST_DISCARD'].includes(pending.type)){
    title='ความสามารถอาวุธ';
    const frost=pending.type==='WAITING_FOR_FROST_DISCARD',needed=frost?frostDiscardCount():pending.type==='WAITING_FOR_AXE_DISCARD'?2:1;
    description=frost?needed?`สละดาเมจเพื่อทำลายการ์ดเป้าหมาย ${needed} ใบ`:'เป้าหมายไม่มีการ์ดให้ทำลาย เลือกผ่านเพื่อทำดาเมจตามปกติ':`เลือก ${needed} ใบ เพื่อใช้ความสามารถ`;
    if(frost){
      const target=state!.players[pending.targetPlayerId],handChoices=[...selected].filter(id=>id.startsWith('hand_')).length;
      content=`<div class="zone-options">${btn('frost-hand',`มือแบบสุ่ม (${handChoices}/${target?.handCount||0})`,'secondary',!target?.handCount||handChoices>=target.handCount||selected.size>=needed?'disabled':'')}${Object.values(target?.equipment||{}).filter(Boolean).map(card=>btn('frost-card',`${selected.has(card!.id)?'✓ ':''}${esc(CARD_BY_ID[card!.name]?.name)}`,'secondary',`data-card="${esc(card!.id)}" aria-pressed="${selected.has(card!.id)}" ${selected.size>=needed&&!selected.has(card!.id)?'disabled':''}`)).join('')}${btn('frost-clear','ล้างที่เลือก','secondary',selected.size?'':'disabled')}<span>เลือก ${selected.size}/${needed}</span></div>`;
    }
    buttons=btn('respond','ใช้ความสามารถ','primary',needed===0||selected.size!==needed?'disabled':'')+btn('pass','ผ่าน','secondary');
  }else{
    const required=pending.type==='WAITING_FOR_SLASH_DUEL'||pending.type==='WAITING_FOR_BORROW_SLASH'||pending.type==='WAITING_FOR_AOE'&&pending.aoeType==='BARBARIAN_INVASION'?'SLASH':'DODGE';
    title=pending.type==='WAITING_FOR_BORROW_SLASH'?'ยืมดาบ · โจมตีหรือมอบอาวุธ':required==='SLASH'?'ใช้โจมตีเพื่อตอบโต้':'ใช้หลบหลีกเพื่อป้องกัน';description=`ต้องการ ${pending.slashNeeded||pending.dodgeNeeded||1} ใบ · เลือกการ์ดที่ใช้แทนได้`;
    buttons=btn('respond',required==='SLASH'?'ใช้โจมตี':'หลบหลีก','primary',!selectedCard||!canUseAs(p,selectedCard,required)?'disabled':'')+btn('pass',pending.type==='WAITING_FOR_BORROW_SLASH'?'มอบอาวุธ':'ยอมรับผล','secondary');
    const dodgeAttack=pending.type==='WAITING_FOR_DODGE',arrowBarrage=pending.type==='WAITING_FOR_AOE'&&pending.aoeType==='ARROW_BARRAGE';
    const ignoresArmor=dodgeAttack&&state!.players[pending.sourcePlayerId]?.equipment.weapon?.name==='BLUE_STEEL_SWORD';
    if(required==='DODGE'&&(dodgeAttack||arrowBarrage)&&!ignoresArmor&&p.equipment.armor?.name==='EIGHT_TRIGRAMS_FORMATION'&&!pending.eightTrigramsUsed)buttons+=btn('trigrams','พิจารณาเกราะ','secondary');
    if(p.role==='LORD'&&(canonicalHero(p.character)==='CAO_CAO'&&required==='DODGE'||canonicalHero(p.character)==='LIU_BEI'&&required==='SLASH'))buttons+=btn('lord-react','ขอความช่วยเหลือ','secondary');
  }
  setMarkup(dock,`<div class="reaction-main"><div class="action-description"><strong>${esc(title)}</strong><span>${esc(description)}</span></div>${clock}<div class="dock-buttons">${buttons}</div></div>${content}`);
}
function send(command:string,data:any={}):void {connection?.send(command,data);resetSelection();render();}
function submit():void {
  const ids=[...selected],card=mine(ids[0]),data:any={cardId:ids[0],cardIds:ids,targetPlayerId:targets[0],secondaryTargetId:targets[1],targetPlayerIds:targets,targetZone:zone,playAs:playAs||undefined};
  if(skill){const command=({ZHIHENG:'use_sun_quan_skill',RENDE:'use_liu_bei_skill',LIJIAN:'use_diao_chan_skill',FANJIAN:'use_zhou_yu_skill',SPEAR:'use_serpent_spear',JIJIANG:'use_lord_skill'} as Record<string,string>)[skill];send(command,data);return;}
  if(!card)return;
  if(['STEAL','SABOTAGE'].includes(card.name)){const target=state!.players[targets[0]];const zones=[['HAND','มือแบบสุ่ม',target.handCount>0],['WEAPON','อาวุธ',target.equipment.weapon],['ARMOR','เกราะ',target.equipment.armor],['OFF_HORSE','ม้าบุก',target.equipment.offensiveHorse],['DEF_HORSE','ม้าหมอบ',target.equipment.defensiveHorse],['TREASURE','สมบัติ',target.equipment.treasure]];inspect(`<h2>เลือกเขตของ ${esc(target.name)}</h2><div class="zone-options">${zones.filter(z=>z[2]).map(z=>btn('choose-zone',String(z[1]),'secondary',`data-zone="${z[0]}"`)).join('')}${target.delayedKitZone.map(c=>btn('choose-zone',esc(CARD_BY_ID[c.name]?.name),'secondary',`data-zone="DELAYED" data-card="${esc(c.id)}"`)).join('')}</div>`);return;}
  send('use_card',data);
}
function recastChain():void {
  const player=me(),card=player?.hand?.find(c=>c.id===[...selected][0]);
  if(!state||state.status!=='PLAYING'||state.currentTurnPlayerId!==myId||state.currentPhase!=='PLAY'||state.pendingAction||!player?.isAlive||skill||playAs||targets.length||selected.size!==1||card?.name!=='IRON_CHAIN')return;
  send('use_card',{cardId:card.id});
}
function respond():void {
  const p=state?.pendingAction,cardId=[...selected][0];if(!p)return;
  if(p.type==='WAITING_FOR_FROST_DISCARD'&&(!frostDiscardCount()||selected.size!==frostDiscardCount()||[...selected].some(id=>!isFrostChoice(id))))return;
  if(['GUICAI','LORD_SKILL'].includes(p.type))send('hero_response',{accept:true,cardId});
  else if(p.type==='WAITING_FOR_BORROW_SLASH')send('resolve_borrowed_sword',{cardId});
  else if(p.type==='WAITING_FOR_FIRE_REVEAL')send('resolve_fire_reveal',{cardId});
  else if(p.type==='WAITING_FOR_FIRE_MATCH')send('resolve_fire_match',{cardId});
  else if(p.type==='WAITING_FOR_YINYANG_CHOICE')send('resolve_yinyang_choice',{action:'DISCARD',cardId});
  else if(p.type.startsWith('WAITING_FOR_')&&['GREEN_DRAGON','AXE_DISCARD','TRIDENT_DISCARD','FROST_DISCARD'].some(t=>p.type.endsWith(t)))send('resolve_weapon_skill',{accept:true,cardId,cardIds:[...selected]});
  else send('resolve_pending',{response:'USE_CARD',cardId});
}
function pass():void {const p=state?.pendingAction;if(!p)return;const type=p.type;if(type==='DYING')send('use_peach_dying',{usePeach:false});else if(type==='WAITING_FOR_NEGATE')send('pass_negate');else if(type==='LUO_RIVER')send('skip_luo_river');else if(type==='WAITING_FOR_BORROW_SLASH')send('resolve_borrowed_sword',{});else if(type==='WAITING_FOR_FIRE_MATCH')send('resolve_fire_match',{cancel:true});else if(type==='WAITING_FOR_YINYANG_CHOICE')send('resolve_yinyang_choice',{action:'DRAW'});else if(['GUANXING','GUICAI','FANJIAN','LORD_SKILL','DAMAGE_SKILL'].includes(type))send('hero_response',{accept:false});else if(['WAITING_FOR_GREEN_DRAGON','WAITING_FOR_AXE_DISCARD','WAITING_FOR_TRIDENT_DISCARD','WAITING_FOR_FROST_DISCARD'].includes(type))send('resolve_weapon_skill',{accept:false});else send('resolve_pending',{response:'PASS'});}
function heroInfo(id:string):void {const h=HERO_BY_ID[canonicalHero(id)];if(!h)return;inspect(`<article class="hero-detail">${portrait(h.id)}<small>${FACTIONS[h.faction].seal} ${FACTIONS[h.faction].name} · ${h.hp} HP</small><h2>${h.name}</h2><span>${h.english}</span><p>${h.skills.split('|').map(esc).join('<br><br>')}</p></article>`);}
function cardInfo(card:GameCard):void {const c=CARD_BY_ID[card.name];inspect(`<article class="card-detail">${cardMarkup(card,'noop')}<h2>${esc(c?.name)}</h2><p>${esc(c?.description)}</p><small>${suit(card.suit)} ${card.rank} ${c?.range?'· ระยะ '+c.range:''}</small></article>`);}
function catalog(heroes=false):void {inspect(`<h2>${heroes?'คลังขุนพล':'คลังการ์ดและขุนพล'}</h2><div class="catalog-tabs">${btn('catalog','41 ชนิดการ์ด','secondary')}${btn('heroes','13 ขุนพล','secondary')}${btn('rules','กติกา','secondary')}</div><div class="catalog-grid">${heroes?HEROES.map(h=>`<button data-action="hero-info" data-hero="${h.id}" class="catalog-hero">${portrait(h.id)}<strong>${h.name}</strong><small>${h.hp} HP · ${FACTIONS[h.faction].name}</small></button>`).join(''):CARDS.map(c=>`<div class="catalog-card"><div class="card-art" ${art(c.art)}></div><strong>${c.name}</strong><p>${c.description}</p><small>${c.count} ใบในสำรับ</small></div>`).join('')}</div>`);}
function rules():void {inspect(`<article class="rules-copy"><h2>คู่มือสามก๊ก</h2><p>เลือกขุนพลและรับบทบาทลับ เจ้าเมืองเปิดเผยตัวตั้งแต่เริ่ม คนอื่นเปิดเมื่อเสียชีวิตหรือจบเกม</p>${['LORD','LOYALIST','REBEL','RENEGADE'].map(r=>`<div>${roleMarkup(r)}<strong>${ROLES[r].name}</strong><p>${ROLES[r].goal}</p></div>`).join('')}<h3>จังหวะหนึ่งเทิร์น</h3><p>เตรียมการ → พิจารณา → จั่วสองใบ → เล่นการ์ด → ทิ้งให้เหลือเท่ากับ HP → ส่งต่อเทิร์น ใช้โจมตีได้หนึ่งครั้ง ยกเว้นสกิลหรืออาวุธที่อนุญาต</p><h3>การตอบโต้</h3><p>มีเวลา 20 วินาที หากหมดเวลาถือว่าผ่าน ระบบไม่ใช้การ์ดแทนคุณ เทิร์นเล่นไม่จำกัดเวลา เลือกขุนพลภายใน 90 วินาที</p><h3>ภาวะใกล้ตาย</h3><p>ต้องฟื้นให้ถึง 1 HP ใช้สวนท้อช่วยผู้อื่นหรือใช้สุราช่วยตนเอง ขุนพลที่เชื่อมต่อหลุดมีเวลา 45 วินาทีในการกลับมา หลังจากนั้นถือว่าเสียชีวิต</p><h3>ระยะและล่ามโซ่</h3><p>นับระยะตามผู้เล่นที่ยังมีชีวิต ม้าบุกลดระยะ ม้าหมอบเพิ่มระยะ อาวุธกำหนดระยะโจมตี ดาเมจธาตุจะส่งต่อผู้เล่นที่ล่ามโซ่และกู้ชีพตามคิว</p><p class="helper">สำรับ 176 ใบ / 41 ชนิด · เป้าหมายแมตช์ 30–45 นาที ระยะเวลาจริงขึ้นกับผู้เล่น</p></article>`);}
function sandbox():void {if(!isAdmin)return;inspect(`<h2>สนามทดสอบ</h2><div class="sandbox-controls"><label>ผู้เล่น<select id="admin-player">${state!.turnOrder.map(id=>`<option value="${id}">${esc(state!.players[id].name)}</option>`).join('')}</select></label><label>การ์ด<select id="admin-card">${CARDS.map(c=>`<option value="${c.id}">${c.name}</option>`).join('')}</select></label>${btn('admin-spawn','เพิ่มการ์ด','primary')}<label>ขุนพล<select id="admin-hero">${HEROES.map(h=>`<option value="${h.id}">${h.name}</option>`).join('')}</select></label>${btn('admin-hero','เปลี่ยนขุนพล','secondary')}<label>HP<input id="admin-hp" type="number" value="4" min="0" max="20"></label>${btn('admin-hp','ตั้ง HP','secondary')}${btn('admin-ai',state!.isBotPassive?'เปิดบอท AI':'หยุดบอท AI','secondary')}${btn('admin-pass','ให้บอทผ่านเทิร์น','secondary')}</div>`);}
document.addEventListener('click',async event=>{
  const button=(event.target as HTMLElement).closest<HTMLElement>('[data-action]');if(!button||button.hasAttribute('disabled'))return;
  const action=button.dataset.action!,cardId=button.dataset.card;
  if(action==='sound-settings'){feedbackDialog();return;}
  if(action==='mute'){feedback.toggleMute();return;}
  if(action==='preview-sound'){await feedback.unlock();feedback.preview();return;}
  if(action==='reduce-fx'){effectsReduced=!effectsReduced;try{localStorage.setItem('wtk.effectsReduced',String(effectsReduced));}catch{}scene?.setEffectsReduced(effectsReduced);document.querySelector('.board-page')?.classList.toggle('reduced-effects',effectsReduced);updateFeedbackControls();return;}
  if(action==='public-play'){
    const play=recentPlays.find(p=>p.key===button.dataset.play);if(!play)return;
    const player=state?.players[play.playerId];
    if(play.skillId||play.kind==='SKILL'){inspect(`<article class="hero-detail">${portrait(player?.character||'')}<small>${esc(player?.name)}</small><h2>${esc(skillNames[play.skillId||'']||'สกิลขุนพล')}</h2><p>${esc(HERO_BY_ID[canonicalHero(player?.character)]?.skills||'')}</p></article>`);}
    else {const def=CARD_BY_ID[play.cardName];inspect(`<article class="card-detail">${publicCardMarkup(play.cardName,play.card)}<h2>${esc(def?.name||play.cardName)}</h2><p>${esc(def?.description||'')}</p>${play.card&&play.card.name!==play.cardName?`<p>ใช้ ${esc(CARD_BY_ID[play.card.name]?.name||play.card.name)} แทน ${esc(def?.name||play.cardName)}</p>`:''}<small>${esc(player?.name||'ผู้เล่น')} เล่นการ์ดนี้แล้ว</small></article>`);}
    return;
  }
  if(action==='leave'){
    event.preventDefault();
    try{void connection?.leave();}finally{location.assign('/lobby');}
    return;
  }
  if(action==='close'){closeDialog();return;}if(action==='rules'){rules();return;}if(action==='heroes'){catalog(true);return;}if(action==='catalog'){catalog();return;}if(action==='hero-info'){heroInfo(button.dataset.hero!);return;}
  if(action==='leaderboard'){try{const data=await(await fetch('/api/leaderboard')).json();inspect(`<h2>ตารางอันดับ</h2><div class="leaderboard">${(data.data||[]).map((p:any,i:number)=>`<div><b>${i+1}</b><span>${esc(p.name)}</span><span>${p.wins} ชนะ · ${p.exp} EXP</span></div>`).join('')||'<p>ยังไม่มีประวัติการศึก</p>'}</div>`);}catch{notify('โหลดอันดับไม่สำเร็จ');}return;}
  if(action==='reconnect'){location.assign('/room/'+encodeURIComponent(GameConnection.saved()!.roomId)+'?action=reconnect');return;}
  if(action==='focus-online'){document.querySelector('#online-panel')?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});document.querySelector<HTMLInputElement>('#room-code')?.focus();return;}
  if(action==='count-down'||action==='count-up'){playerCount=Math.max(4,Math.min(10,playerCount+(action==='count-up'?1:-1)));document.querySelector('#player-count')!.textContent=`${playerCount} คน`;return;}
  if(action==='bot'||action==='quick-bot'){enter('create','BOT');return;}if(action==='create'){enter('create');return;}if(action==='join'){const code=document.querySelector<HTMLInputElement>('#room-code')!.value.trim();if(!code){notify('กรุณาระบุรหัสห้อง');return;}enter('join','ONLINE',code);return;}
  if(action==='copy'){try{await navigator.clipboard.writeText(state!.roomId);notify('คัดลอกรหัสห้องแล้ว');}catch{notify('รหัสห้อง: '+state!.roomId);}return;}
  if(action==='add-bot'){send('add_bot');return;}if(action==='remove-bot'){send('remove_bot');return;}if(action==='start'){send('start_game',{totalPlayers:Number(params.get('players')||6)});return;}if(action==='draft'){send('choose_character',{characterId:button.dataset.hero});return;}
  if(action==='log'){inspect(`<h2>บันทึกการศึก</h2><div class="event-history">${(state?.chat||[]).slice(-80).reverse().map(e=>`<div><small>${esc(e.time)} · ${esc(e.sender)}</small><p>${esc(e.text)}</p></div>`).join('')||'<p>ยังไม่มีเหตุการณ์</p>'}</div>`);return;}
  if(action==='sandbox'){sandbox();return;}
  if(action.startsWith('admin-')){const id=document.querySelector<HTMLSelectElement>('#admin-player')!.value;if(action==='admin-spawn')connection?.send('admin_spawn_card',{targetPlayerId:id,cardName:document.querySelector<HTMLSelectElement>('#admin-card')!.value});if(action==='admin-hero')connection?.send('admin_change_hero',{targetPlayerId:id,characterId:document.querySelector<HTMLSelectElement>('#admin-hero')!.value});if(action==='admin-hp')connection?.send('admin_set_hp',{targetPlayerId:id,hp:Number(document.querySelector<HTMLInputElement>('#admin-hp')!.value)});if(action==='admin-ai')connection?.send('admin_toggle_bot_ai',{isPassive:!state!.isBotPassive});if(action==='admin-pass')connection?.send('admin_bot_pass_turn');closeDialog();return;}
  if(action==='own-equipment'){inspect(`<h2>อุปกรณ์ของคุณ</h2><div class="reaction-cards">${Object.values(me()?.equipment||{}).filter(Boolean).map(c=>cardMarkup(c!,'equipment')).join('')}</div><p class="helper">เลือกอุปกรณ์เพื่อดูรายละเอียด ใช้การ์ดแดงแทนโจมตีได้เมื่อเป็นกวนอู หรือเลือกทิ้งร่วมกับการ์ดบนมือได้ตามสกิล</p>`);return;}
  if(action==='inspect-selected'){const c=mine([...selected][0]);if(c)cardInfo(c);return;}
  if(action==='equipment'){const c=mine(cardId!);if(!c)return;if(state?.pendingAction?.type==='WAITING_FOR_FROST_DISCARD'){cardInfo(c);return;}const red=['HEART','DIAMOND'].includes(c.suit);if(skill==='ZHIHENG'||state?.pendingAction?.type==='WAITING_FOR_AXE_DISCARD'||state?.pendingAction?.type==='WAITING_FOR_TRIDENT_DISCARD'||canonicalHero(me()?.character)==='GUAN_YU'&&red){selected.has(c.id)?selected.delete(c.id):selected.add(c.id);if(!skill&&!state?.pendingAction){selected=new Set([c.id]);playAs='SLASH';}render();}else cardInfo(c);return;}
  if(action==='card'){if(state?.pendingAction?.type==='WAITING_FOR_FROST_DISCARD')return;const multi=['ZHIHENG','RENDE','SPEAR'].includes(skill)||state?.currentPhase==='DISCARD'||['WAITING_FOR_AXE_DISCARD','WAITING_FOR_TRIDENT_DISCARD'].includes(state?.pendingAction?.type||'');if(multi)selected.has(cardId!)?selected.delete(cardId!):selected.add(cardId!);else {const same=selected.has(cardId!);selected.clear();if(!same)selected.add(cardId!);}if(!state?.pendingAction)targets=[];render();return;}
  if(action==='target'){const id=button.dataset.player!;if(!selected.size&&!skill){const p=state!.players[id];inspect(`<h2>${esc(p.name)}</h2>${portrait(p.character)}<p>${esc(HERO_BY_ID[canonicalHero(p.character)]?.skills)}</p><p>${p.hp}/${p.maxHp} HP · ${p.handCount} ใบ · ${esc(ROLES[p.role]?.name)}</p><div class="zone-options">${Object.values(p.equipment).filter(Boolean).map(c=>`<span>${esc(CARD_BY_ID[c!.name]?.name)}</span>`).join('')}</div>`);return;}if(targets.includes(id)){targets=targets.filter(t=>t!==id);render();return;}if(!targetAllowed(state!.players[id])){notify('เป้าหมายนี้ใช้กับการ์ดหรือสกิลที่เลือกไม่ได้');return;}if(targets.includes(id))targets=targets.filter(t=>t!==id);else {const max=maximumTargets();if(targets.length>=max)targets=[];targets.push(id);}render();return;}
  if(action==='skill'){resetSelection();skill=button.dataset.skill!;if(skill==='KUROU'){send('use_huang_gai_skill');return;}render();return;}
  if(action==='convert'){playAs=playAs?'':'SLASH';targets=[];render();return;}if(action==='cancel'){resetSelection();render();return;}if(action==='submit'){submit();return;}if(action==='recast'){recastChain();return;}if(action==='end'){send('end_turn');return;}if(action==='discard'){send('discard_cards',{cardIds:[...selected]});return;}
  if(action==='choose-zone'){zone=button.dataset.zone!;closeDialog();const ids=[...selected];send('use_card',{cardId:ids[0],targetPlayerId:targets[0],targetZone:zone,targetCardId:cardId});return;}
  if(action==='respond'){respond();return;}if(action==='pass'){pass();return;}if(action==='luo-draw'){send('trigger_luo_river');return;}
  if(action==='rescue'){const c=me()?.hand?.find(c=>c.name==='PEACH'||state?.pendingAction?.targetPlayerId===myId&&c.name==='WINE');send('use_peach_dying',{usePeach:true,cardId:c?.id});return;}
  if(action==='negate'){send('play_negate',{cardId:me()?.hand?.find(c=>c.name==='NEGATE')?.id});return;}if(action==='trigrams'){send('resolve_pending',{response:'EIGHT_TRIGRAMS'});return;}if(action==='lord-react'){send('use_lord_skill');return;}
  if(action==='harvest'){send('pick_bumper_card',{cardId});return;}if(action==='guess'){send('hero_response',{guess:button.dataset.suit});return;}if(action==='hero-accept'){send('hero_response',{accept:true,slot:zone==='HAND'?'hand':zone});return;}if(action==='damage-zone'){zone=button.dataset.zone!;notify('เลือกเขตแล้ว');return;}
  if(action==='guan-up'){const array=guanTop.includes(cardId!)?guanTop:guanBottom,i=array.indexOf(cardId!);if(i>0)[array[i-1],array[i]]=[array[i],array[i-1]];render();return;}if(action==='guan-bottom'){if(guanTop.includes(cardId!)){guanTop=guanTop.filter(id=>id!==cardId);guanBottom.push(cardId!);}else{guanBottom=guanBottom.filter(id=>id!==cardId);guanTop.push(cardId!);}render();return;}if(action==='guan-confirm'){send('hero_response',{topIds:guanTop,bottomIds:guanBottom});return;}
  if(action==='frost-clear'){if(state?.pendingAction?.type!=='WAITING_FOR_FROST_DISCARD')return;selected.clear();render();return;}
  if(action==='frost-card'){if(!isFrostChoice(cardId!))return;if(selected.has(cardId!))selected.delete(cardId!);else if(selected.size<frostDiscardCount())selected.add(cardId!);render();return;}
  if(action==='frost-hand'){const p=state?.pendingAction;if(p?.type!=='WAITING_FOR_FROST_DISCARD')return;const target=state!.players[p.targetPlayerId],used=[...selected].filter(id=>id.startsWith('hand_')).length;if(!target||selected.size>=frostDiscardCount()||used>=target.handCount)return;let n=0;while(selected.has('hand_'+n))n++;selected.add('hand_'+n);render();return;}
});
document.addEventListener('contextmenu',event=>{const card=(event.target as HTMLElement).closest<HTMLElement>('[data-action="card"]');if(card){event.preventDefault();const c=mine(card.dataset.card!);if(c)cardInfo(c);}});
document.addEventListener('pointerdown',()=>{void feedback.unlock();},{passive:true});
document.addEventListener('input',event=>{const input=event.target as HTMLInputElement;if(input.id==='sound-volume')feedback.setVolume(Number(input.value)/100);});
document.addEventListener('keydown',event=>{
  void feedback.unlock();
  if(event.key==='Escape'&&!dialog.open){resetSelection();render();return;}
  const card=(event.target as HTMLElement).closest<HTMLElement>('#hand .hand-card');
  if(card&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();const nodes=Array.from(document.querySelectorAll<HTMLElement>('#hand .hand-card')),index=nodes.indexOf(card),next=nodes[(index+(event.key==='ArrowRight'?1:-1)+nodes.length)%nodes.length];next?.focus();next?.scrollIntoView({block:'nearest',inline:'nearest'});}
});
window.addEventListener('resize',()=>{handGeometryDirty=true;render();});
function refreshClocks():void {
  if(clockTimer!==undefined)clearTimeout(clockTimer);clockTimer=undefined;
  clockNodes=Array.from(document.querySelectorAll<HTMLElement>('[data-deadline]'));
  updateClocks();
}
function updateClocks():void {
  clockTimer=undefined;if(document.hidden)return;
  const now=Date.now();let next=Infinity;
  for(const node of clockNodes){if(!node.isConnected)continue;const deadline=Number(node.dataset.deadline)||0,remaining=Math.max(0,deadline-now),seconds=Math.ceil(remaining/1000);setText(node,String(seconds));if(remaining>0)next=Math.min(next,remaining-(seconds-1)*1000+5);}
  if(Number.isFinite(next))clockTimer=setTimeout(updateClocks,Math.max(20,next));
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(renderFrame)cancelAnimationFrame(renderFrame);renderFrame=0;if(clockTimer!==undefined)clearTimeout(clockTimer);clockTimer=undefined;}else{render();refreshClocks();}});
async function boot():Promise<void>{
  const isRoom=/^\/(room|app|test)(\/|$)/.test(location.pathname);if(!isRoom){showLobby();return;}
  const sandboxMode=params.get('test')==='true'||location.pathname==='/test';const name=sandboxMode?'Admin':params.get('name')||GameConnection.saved()?.name||localStorage.getItem('wtk.name')||'นักรบ';
  const id=decodeURIComponent(location.pathname.split('/')[2]||''),action=params.get('action')||'join',savedPlayerId=params.get('playerId')||'';
  const shouldAutoStart=action==='create'&&(params.get('mode')==='BOT'||sandboxMode);
  connection=new GameConnection(name);connection.onStatus=value=>{if(value.includes('หลุด')||value.includes('กำลังเชื่อมต่อ'))feedback.resetBaseline();status=value;const el=document.querySelector('#connection-state');if(el)el.textContent=value;};
  connection.onIdentity=identity=>{myId=identity.playerId;canonicalRoomUrl(identity);if(!autoStarted&&shouldAutoStart){autoStarted=true;connection?.send('start_game',{totalPlayers:Number(params.get('players')||6)});}render();};
  connection.onState=snapshot=>{if(state&&state.roomId!==snapshot.roomId){recentPlays=[];feedback.resetBaseline();}state=snapshot;feedback.observeSnapshot(state,myId);const p=state.pendingAction;const key=p?`${p.type}:${responder(state)}:${p.timeoutAt}`:'';if(key!==pendingKey){pendingKey=key;selected.clear();targets=[];skill='';playAs='';guanTop=p?.cards?.map((c:GameCard)=>c.id)||[];guanBottom=[];}for(const id of selected)if(!mine(id)&&!isFrostChoice(id))selected.delete(id);render();};
  connection.onEvent=(type,data)=>{if(type==='game_error'){notify(data.message||'คำสั่งไม่สำเร็จ');return;}if(type==='admin_auth_status'&&data.isAdmin){isAdmin=true;const navEl=document.querySelector('.navigation nav');if(navEl&&!navEl.querySelector('[data-action="sandbox"]'))navEl.insertAdjacentHTML('beforeend',btn('sandbox',icon('settings'),'icon-button','aria-label="สนามทดสอบ"'));return;}if(feedback.event(type,data))scene?.event(type,data);};
  render();
  try{await connection.connect(action,id,params.get('mode')||'ONLINE',sandboxMode,savedPlayerId);}catch{const message='ไม่พบห้อง ห้องเริ่มเกมแล้ว หรือช่วง reconnect หมดแล้ว';const element=document.querySelector('.connecting p');if(element)element.textContent=message;else notify(message);}
}
window.addEventListener('pagehide',()=>{if(renderFrame)cancelAnimationFrame(renderFrame);if(clockTimer!==undefined)clearTimeout(clockTimer);handResize?.disconnect();scene?.dispose();feedback.dispose();});
void boot();
