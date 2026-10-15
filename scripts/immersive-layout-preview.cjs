'use strict';
// Static public-state presentation fixture. No server, socket or gameplay commands.
const fs=require('fs'),path=require('path'),net=require('net'),{spawn}=require('child_process'),puppeteer=require('puppeteer');
const {CARDS,HEROES}=require('../dist/shared/catalog.js');
const root=path.resolve(__dirname,'..'),output=path.join(root,'artifacts/immersive');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));let server,browser;
function snapshot(seats){
  const ids=Array.from({length:seats},(_,i)=>'p'+i),cards=Array.from({length:8},(_,i)=>{const def=CARDS[[0,1,2,5,6,8,12,14][i]];return{id:'card'+i,name:def.id,type:def.kind,suit:['HEART','SPADE','CLUB','DIAMOND'][i%4],rank:i+1};});
  return{roomId:'PREVIEW',status:'PLAYING',ruleset:'EXPERIMENTAL',mode:'ONLINE',players:Object.fromEntries(ids.map((id,i)=>[id,{id,name:i?'ผู้เล่น '+i:'คุณ',character:HEROES[i===0?14:i].id,role:i?'UNKNOWN':'LORD',hp:i%3===0?3:4,maxHp:4,hand:i?null:cards,handCount:i?4:cards.length,isAlive:true,isBot:false,isHost:!i,isDisconnected:false,isChained:i===2,wineActive:false,equipment:{weapon:null,armor:null,offensiveHorse:null,defensiveHorse:null,treasure:null},delayedKitZone:[],strategy:i===0?'MUSTER':'OFFENSIVE',strategyUsed:false}])),turnOrder:ids,currentTurnPlayerId:'p0',currentPhase:'PLAY',pendingAction:null,bumperHarvestCards:[],chat:[],winnerRole:null,winnerText:null,deckCount:122,discardCount:18};
}
async function main(){
  fs.mkdirSync(output,{recursive:true});const port=await new Promise(resolve=>{const s=net.createServer();s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});});
  server=spawn(process.execPath,[path.join(root,'node_modules/vite/bin/vite.js'),'--config','client/vite.config.mts','--port',String(port),'--strictPort'],{cwd:root,windowsHide:true,stdio:'ignore'});
  for(let i=0;i<60;i++){try{if((await fetch(`http://127.0.0.1:${port}/pixel/`)).ok)break;}catch{}await sleep(100);}
  browser=await puppeteer.launch({headless:true,args:['--enable-unsafe-swiftshader']});const report=[];
  for(const config of [{id:'desktop',width:1440,height:900,seats:6},{id:'portrait',width:390,height:844,seats:10},{id:'landscape',width:844,height:390,seats:10}]){
    const state=snapshot(config.seats),errors=[],page=await browser.newPage();await page.setViewport({...config,deviceScaleFactor:1});page.on('pageerror',e=>errors.push(String(e)));
    await page.setRequestInterception(true);page.on('request',request=>{const url=new URL(request.url());
      if(request.isNavigationRequest())return request.respond({status:200,contentType:'text/html',body:fs.readFileSync(path.join(root,'client/index.html'),'utf8').replace('src="/src/main.ts"','src="/pixel/src/main.ts"')});
      if(url.pathname.endsWith('/src/connection.ts'))return request.respond({status:200,contentType:'application/javascript',body:`export class GameConnection{static saved(){return null}constructor(){window.presentationFixture={show:(mode,count=8)=>{const state=${JSON.stringify(state)};const hand=state.players.p0.hand;state.players.p0.hand=Array.from({length:count},(_,i)=>({...hand[i%hand.length],id:'card'+i}));state.players.p0.handCount=count;if(mode==='guanxing')state.pendingAction={type:'GUANXING',targetPlayerId:'p0',cards:hand.slice(0,5),timeoutAt:Date.now()+20000};if(mode==='waiting')state.currentTurnPlayerId='p1';if(mode==='reaction')state.pendingAction={type:'WAITING_FOR_DODGE',targetPlayerId:'p0',attackerId:'p1',timeoutAt:Date.now()+20000};if(mode==='ended'){state.status='ENDED';state.winnerRole='LORD';state.winnerText='ฝ่ายเจ้าเมืองชนะ'}this.onState?.(state);},event:(type,data)=>this.onEvent?.(type,data)};}async connect(){this.onIdentity?.({roomId:'PREVIEW',playerId:'p0'});window.presentationFixture.show('play')}send(){}async leave(){}}`});
      if(/^\/(art|fonts)\//.test(url.pathname)){const file=path.resolve(root,'public','.'+decodeURIComponent(url.pathname));if(file.startsWith(path.join(root,'public')+path.sep)&&fs.existsSync(file))return request.respond({status:200,contentType:file.endsWith('.png')?'image/png':file.endsWith('.ttf')?'font/ttf':file.endsWith('.svg')?'image/svg+xml':'text/css',body:fs.readFileSync(file)});}
      return request.continue();
    });
    await page.goto(`http://127.0.0.1:${port}/room/PREVIEW?name=Preview`,{waitUntil:'networkidle0'});await page.waitForSelector('.immersive-board');await sleep(1200);
    for(const [mode,count] of [['play',4],['play',8],['play',14],['waiting',4],['reaction',8],['guanxing',1],['waiting',1]]){
      await page.evaluate(({mode,count})=>window.presentationFixture.show(mode,count),{mode,count});await sleep(450);
      const layout=await page.evaluate(()=>{const rect=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};};return{viewport:[innerWidth,innerHeight],documentWidth:document.documentElement.scrollWidth,stage:rect('.board-stage'),hand:rect('.hand-dock'),actions:rect('.action-dock'),navigation:rect('.immersive-navigation'),handScrollWidth:document.querySelector('.hand-scroll').scrollWidth,seats:[...document.querySelectorAll('.seat')].map(el=>({id:el.dataset.player,x:el.getBoundingClientRect().x,y:el.getBoundingClientRect().y,width:el.offsetWidth,height:el.offsetHeight})),buttons:[...document.querySelectorAll('.immersive-navigation button,.action-dock button')].map(el=>({action:el.dataset.action,visible:!!el.getClientRects().length,width:el.offsetWidth,height:el.offsetHeight}))};});
      const cards=await page.evaluate(()=>{const viewport=document.querySelector('.hand-scroll').getBoundingClientRect();return [...document.querySelectorAll('#hand .hand-card')].map(el=>{const r=el.getBoundingClientRect();return {top:r.top-viewport.top,bottom:viewport.bottom-r.bottom};});});
      let interaction=null;
      if(mode==='play'&&count===8){
        const skillReused=await page.evaluate(async()=>{const node=document.querySelector('#skill-buttons button');window.presentationFixture.show('play',8);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return node===document.querySelector('#skill-buttons button');});
        await page.evaluate(()=>document.querySelector('#hand .hand-card').click());await sleep(250);
        const selectedFits=await page.evaluate(()=>{const r=document.querySelector('#hand .selected').getBoundingClientRect(),v=document.querySelector('.hand-scroll').getBoundingClientRect();return r.top>=v.top-.5&&r.bottom<=v.bottom+.5;});
        await page.click('[data-action=inspect-selected]');
        const inspectorOpen=await page.evaluate(()=>!!document.querySelector('dialog[open] .hand-card'));
        await page.evaluate(()=>document.querySelector('dialog[open]').close());interaction={skillReused,selectedFits,inspectorOpen};
      }
      let workspace=null;
      if(mode==='guanxing'){
        workspace=await page.evaluate(()=>{const dock=document.querySelector('.action-dock'),r=dock.getBoundingClientRect(),list=document.querySelector('.guanxing-list'),items=[...list.querySelectorAll('.guanxing-item')];return {expanded:document.querySelector('.immersive-board').classList.contains('has-card-workspace'),cardCount:items.length,verticalFit:items.every(el=>{const b=el.getBoundingClientRect();return b.top>=r.top&&b.bottom<=r.bottom;}),confirmVisible:(()=>{const b=document.querySelector('[data-action=guan-confirm]').getBoundingClientRect();return b.top>=r.top&&b.bottom<=r.bottom;})()};});
        await page.evaluate(()=>document.querySelector('[data-action=guan-bottom]').click());await sleep(100);
        workspace.moveToBottom=await page.evaluate(()=>document.querySelectorAll('.guanxing-position.is-bottom').length===1);
      }
      if(mode==='waiting'&&count===1)workspace=await page.evaluate(()=>({collapsed:!document.querySelector('.immersive-board').classList.contains('has-card-workspace')}));
      report.push({config,mode,count,errors,layout,cards,interaction,workspace});await page.screenshot({path:path.join(output,config.id+'-'+mode+'-'+count+'.png')});
    }
    await page.close();
  }
  fs.writeFileSync(path.join(output,'layout.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report.map(r=>({viewport:r.config.id,mode:r.mode,count:r.count,interaction:r.interaction,workspace:r.workspace,clipped:r.cards.some(c=>c.top<-.5||c.bottom<-.5),errors:r.errors,stage:r.layout.stage,overflow:r.layout.documentWidth>r.config.width})),null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();if(server)server.kill();});
