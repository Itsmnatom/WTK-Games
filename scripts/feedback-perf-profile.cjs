'use strict';
// Isolated presentation benchmark: no room, WebSocket, bot or match is created.
const fs=require('fs'),path=require('path'),net=require('net'),{spawn,execFileSync}=require('child_process');
const puppeteer=require('puppeteer');
const root=path.resolve(__dirname,'..'),label=process.argv[2]||'before';
if(!/^[a-z0-9-]+$/.test(label))throw Error('Invalid label');
const output=path.join(root,'artifacts/performance/feedback');
const baseline=process.argv.includes('--baseline');
const baselineRef='5b3224bc448a5589e314781d2fa6bd21e41841e5';
let moduleRoot='/pixel/src/';
if(baseline){
  const snapshot=path.join(root,'scratch/feedback-baseline');
  for(const file of ['client/src/scene.ts','client/src/scene-textures.ts','client/src/feedback.ts','shared/catalog.ts','shared/protocol.ts']){
    const target=path.join(snapshot,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,execFileSync('git',['show',baselineRef+':'+file],{cwd:root}));
  }
  moduleRoot='/pixel/@fs/'+path.join(snapshot,'client/src/').replaceAll('\\','/');
}

const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let server,browser;
function instrument(){
  let enabled=false,frames=0,draws=0,nodes=0,rafMs=0;const intervals=[];let last=0;
  const nativeRAF=window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame=fn=>nativeRAF(t=>{const start=performance.now();try{fn(t);}finally{if(enabled)rafMs+=performance.now()-start;}});
  const proto=WebGL2RenderingContext.prototype,clear=proto.clear;
  proto.clear=function(mask){if(enabled&&(mask&this.COLOR_BUFFER_BIT)&&!this.getParameter(this.FRAMEBUFFER_BINDING)){frames++;const t=performance.now();if(last)intervals.push(t-last);last=t;}return clear.call(this,mask);};
  for(const key of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']){const original=proto[key];proto[key]=function(...args){if(enabled)draws++;return original.apply(this,args);};}
  for(const key of ['createGain','createBufferSource','createOscillator','createBiquadFilter','createStereoPanner']){const original=AudioContext.prototype[key];AudioContext.prototype[key]=function(...args){if(enabled)nodes++;return original.apply(this,args);};}
  window.meter={start(){enabled=true;frames=draws=nodes=rafMs=0;last=0;intervals.length=0;this.at=performance.now();},stop(){enabled=false;return{durationMs:performance.now()-this.at,frames,draws,audioNodes:nodes,rafMs,intervals:[...intervals]};}};
}
const html=`<!doctype html><style>body{margin:0;background:#112027}#board-scene{width:100vw;height:100vh}button{position:fixed;top:0}</style><div id="board-scene"></div><button id="unlock">Audio</button><script type="module">
import * as sceneModule from '/pixel/src/scene.ts';import {TableFeedback} from '/pixel/src/feedback.ts';const {CourtyardScene}=sceneModule;
const scene=new CourtyardScene(document.querySelector('#board-scene'));const feedback=new TableFeedback();
const ids=Array.from({length:Number(new URLSearchParams(location.search).get('seats'))},(_,i)=>'p'+i);
const heroes=['GUO_JIA','CAO_CAO','GUAN_YU','ZHUGE_LIANG','ZHOU_YU','HUA_TUO','GAN_NING','ZHANG_LIAO','DA_QIAO','LIU_BEI'];
const players=Object.fromEntries(ids.map((id,i)=>[id,{id,name:id,character:heroes[i],isAlive:true,hp:4,maxHp:4,hand:[],equipment:{}}]));
scene.update({roomId:'presentation-only',status:'PLAYING',mode:'BOT',players,turnOrder:ids,currentTurnPlayerId:ids[0],currentPhase:'PLAY',pendingAction:null},ids[0]);
window.fixture={scene,feedback,ids,styles:sceneModule.INK_STYLE_BY_CARD,accepted:0,dispatch(type,data){if(feedback.event(type,data)){this.accepted++;scene.event(type,data);}},async unlock(){await feedback.unlock();},dispose(){scene.dispose();feedback.dispose();}};
document.querySelector('#unlock').onclick=()=>window.fixture.unlock();window.ready=true;
</script>`;
async function main(){
  fs.mkdirSync(output,{recursive:true});
  const port=await new Promise(resolve=>{const s=net.createServer();s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});});
  server=spawn(process.execPath,[path.join(root,'node_modules/vite/bin/vite.js'),'--config','client/vite.config.mts','--port',String(port),'--strictPort'],{cwd:root,windowsHide:true,stdio:'ignore'});
  for(let i=0;i<60;i++){try{if((await fetch(`http://127.0.0.1:${port}/pixel/`)).ok)break;}catch{}await sleep(100);}
  browser=await puppeteer.launch({headless:true,args:['--autoplay-policy=no-user-gesture-required','--enable-unsafe-swiftshader'],ignoreDefaultArgs:['--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows']});
  const report={label,capturedAt:new Date().toISOString(),browser:await browser.version(),baselineSource:baseline?baselineRef:null,method:'Warmed isolated Vite source fixture, same events and scene dimensions; no rooms/matches. Audio enabled after gesture and warmed. CDP TaskDuration is renderer main-thread work, not OS CPU/GPU use. Mobile is desktop touch emulation.',cases:[]};
  for(const config of [{id:'desktop-6',width:1440,height:660,seats:6,isMobile:false,hasTouch:false},{id:'portrait-10',width:390,height:500,seats:10,isMobile:true,hasTouch:true}]){
    const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',message=>{if(message.type()==='error'&&/WebGLProgram|Shader Error|VALIDATE_STATUS/.test(message.text()))errors.push(message.text());});await page.setViewport({...config,deviceScaleFactor:1});
    await page.evaluateOnNewDocument(instrument);await page.setRequestInterception(true);
    page.on('request',request=>{const url=new URL(request.url());if(request.isNavigationRequest())return request.respond({status:200,contentType:'text/html',body:html.replaceAll('/pixel/src/',moduleRoot)});if(/^\/(art|fonts)\//.test(url.pathname)){const file=path.resolve(root,'public','.'+decodeURIComponent(url.pathname));if(file.startsWith(path.join(root,'public')+path.sep)&&fs.existsSync(file))return request.respond({status:200,contentType:file.endsWith('.png')?'image/png':'text/css',body:fs.readFileSync(file)});}return request.continue();});
    const cdp=await page.createCDPSession();await cdp.send('Performance.enable');
    await page.goto(`http://127.0.0.1:${port}/pixel/?seats=${config.seats}`,{waitUntil:'networkidle0'});await page.waitForFunction(()=>window.ready);await page.click('#unlock');
    const cues=['card','slash','fire-cast','thunder-cast','spell','equipment','defend','negate','heal','impact','fire-hit','thunder-hit','acquire','skill','judgment-good','judgment-bad','dying','death','victory','prompt','turn'];
    await page.evaluate(async cues=>{await window.fixture.unlock();for(const cue of cues)window.fixture.feedback.preview(cue);},cues);await sleep(1600);
    const result={config,errors,phases:{}};
    async function measure(name,work){const before=await cdp.send('Performance.getMetrics');await page.evaluate(()=>window.meter.start());await work();const raw=await page.evaluate(()=>window.meter.stop()),after=await cdp.send('Performance.getMetrics');const a=Object.fromEntries(before.metrics.map(m=>[m.name,m.value])),b=Object.fromEntries(after.metrics.map(m=>[m.name,m.value]));const sorted=raw.intervals.sort((a,b)=>a-b);delete raw.intervals;result.phases[name]={...raw,rendersPerSecond:raw.frames/raw.durationMs*1000,drawsPerFrame:raw.frames?raw.draws/raw.frames:0,renderIntervalP50:sorted[Math.floor(sorted.length*.5)]||null,renderIntervalP95:sorted[Math.floor(sorted.length*.95)]||null,mainThreadBusyRatio:(b.TaskDuration-a.TaskDuration)/(raw.durationMs/1000),heapDelta:b.JSHeapUsedSize-a.JSHeapUsedSize};}
    const replay=async()=>{await page.evaluate(()=>window.fixture.round=(window.fixture.round||0)+1);const start=Date.now();for(let i=0;i<10;i++){await sleep(Math.max(0,start+i*500-Date.now()));await page.evaluate(i=>{const f=window.fixture,source=f.ids[i%f.ids.length],target=f.ids[(i+1)%f.ids.length],name=['SLASH','FIRE_ATTACK','THUNDER_ATTACK','IRON_CHAIN','STEAL','NEGATE','PEACH','ARROW_BARRAGE','DUEL','SABOTAGE'][i],skill=i===8?'TUXI':undefined;f.dispatch('card_played',{eventId:'cast'+f.round+':'+i,playId:'cast'+f.round+':'+i,playerId:source,cardName:skill?'SKILL':name,skillId:skill,kind:skill?'SKILL':'PLAY',targetId:target,targetIds:name==='ARROW_BARRAGE'?f.ids.filter(id=>id!==source):[target],...(!skill?{card:{id:'c'+i,name,suit:'HEART',rank:7,type:['SLASH','THUNDER_ATTACK','PEACH'].includes(name)?'BASIC':'KIT'}}:{})});if(i%3===0)for(const id of f.ids.slice(0,3))f.dispatch('damage_log',{eventId:'hit'+f.round+':'+i+id,attackerId:source,targetId:id,damage:1,damageType:i===3?'FIRE':i===6?'THUNDER':'NORMAL',hp:3});},i);}await sleep(Math.max(0,start+6000-Date.now()));};
    await replay();await sleep(1400);await page.evaluate(()=>window.fixture.accepted=0);
    await measure('idle',()=>sleep(1200));await measure('active',replay);
    await sleep(1400);await measure('settled',()=>sleep(1000));
    result.resources=await page.evaluate(()=>{const f=window.fixture;return{effects:f.scene.effects.size,pooledSparks:f.scene.sparkPool?.length||0,voices:f.feedback.voices.size,audioCues:f.feedback.buffers?.size||0,audioBytes:[...(f.feedback.buffers?.values()||[])].reduce((sum,b)=>sum+b.length*b.numberOfChannels*4,0)};});
    result.accepted=await page.evaluate(()=>window.fixture.accepted);result.renderer=await page.evaluate(()=>{const gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);});
    const foreground=await browser.newPage();await foreground.goto('about:blank');await foreground.bringToFront();await sleep(100);result.visibility=await page.evaluate(()=>document.visibilityState);await measure('hidden',()=>sleep(800));result.hiddenAudioState=await page.evaluate(()=>window.fixture.feedback.context?.state);await foreground.close();
    if(!baseline&&process.argv.includes('--inspect')){
      await page.bringToFront();
      result.skillAcceptance=await page.evaluate(()=>Object.fromEntries(['TUXI','YIJI','TIANDU','JIZHI','QINGNANG','LIULI','JIJIU','PLAN_MUSTER','PLAN_OFFENSIVE','PLAN_SUPPLY'].map(skillId=>[skillId,window.fixture.feedback.event('card_played',{eventId:'inspect-'+skillId,playId:'inspect-'+skillId,playerId:'p0',cardName:'SKILL',skillId,kind:'SKILL',targetIds:['p1']})])));
      await sleep(1300);
      if(config.id==='desktop-6')for(const family of ['FIRE','THUNDER','HEAL']){
        await page.evaluate(family=>{const f=window.fixture,name=family==='HEAL'?'PEACH':family==='FIRE'?'FIRE_ATTACK':'THUNDER_ATTACK';f.scene.event('card_played',{playerId:'p1',cardName:name,kind:'PLAY',targetId:'p2',targetIds:['p2'],card:{id:'preview',name,suit:'HEART',rank:7,type:name==='FIRE_ATTACK'?'KIT':'BASIC'}});},family);
        await sleep(150);if(family!=='HEAL')await page.evaluate(family=>window.fixture.scene.event('damage_log',{targetId:'p2',damage:1,damageType:family,hp:3}),family);
        await sleep(180);await page.screenshot({path:path.join(output,label+'-'+family.toLowerCase()+'.png')});await sleep(1100);
      }
      if(process.argv.includes('--ink')){
        result.ink=await page.evaluate(()=>{
          const f=window.fixture,vfx=f.scene.vfx,cast=vfx.cast.bind(vfx),calls=[];vfx.cast=(at,family,group)=>{calls.push({family,group});cast(at,family,group);};
          for(const [name,style] of Object.entries(f.styles||{}))f.dispatch('card_played',{eventId:'coverage-'+name,playId:'coverage-'+name,playerId:'p0',cardName:name,kind:'PLAY',targetId:'p1',targetIds:style.group?f.ids.slice(1):['p1'],card:{id:name,name,type:style.family==='equip'?'EQUIPMENT':'KIT',rank:7,suit:'HEART'}});
          vfx.cast=cast;
          return{styles:Object.keys(f.styles||{}).length,castCalls:calls.length,groupCasts:calls.filter(c=>c.group).map(c=>c.family),invalidStyles:Object.entries(f.styles||{}).filter(([,s])=>!s.family).map(([name])=>name)};
        });
        await sleep(1200);
        result.ink.damageLabels=await page.evaluate(()=>{const f=window.fixture;for(const targetId of f.ids)f.scene.event('damage_log',{targetId,damage:1,damageType:'NORMAL',hp:3});return [...f.scene.effects].filter(effect=>effect.priority===3).length;});
        await sleep(1200);
        result.ink.settled=await page.evaluate(()=>({effects:window.fixture.scene.effects.size,particlesLive:window.fixture.scene.vfx.isLive(performance.now())}));
        if(config.id==='desktop-6')for(const name of ['SLASH','ARROW_BARRAGE','SABOTAGE']){
          await page.evaluate(name=>{const f=window.fixture;f.dispatch('card_played',{eventId:'preview-'+name,playId:'preview-'+name,playerId:'p0',cardName:name,kind:'PLAY',targetId:'p1',targetIds:name==='ARROW_BARRAGE'?f.ids.slice(1):['p1'],card:{id:name,name,type:name==='SLASH'?'BASIC':'KIT',rank:7,suit:'HEART'}});},name);
          await sleep(240);await page.screenshot({path:path.join(output,label+'-'+name.toLowerCase()+'.png')});await sleep(1100);
        }
      }
      await page.evaluate(()=>window.fixture.scene.setEffectsReduced(true));
      await page.evaluate(()=>window.fixture.scene.event('damage_log',{targetId:'p1',damage:2,damageType:'THUNDER',hp:2}));await sleep(1300);
      result.reducedSettled=await page.evaluate(()=>window.fixture.scene.effects.size);
    }
    await page.evaluate(()=>window.fixture.dispose());result.disposed=await page.evaluate(()=>({effects:window.fixture.scene.effects.size,voices:window.fixture.feedback.voices.size,pooledSparks:window.fixture.scene.sparkPool?.length||0,audioCues:window.fixture.feedback.buffers?.size||0}));await page.close();report.cases.push(result);fs.writeFileSync(path.join(output,label+'.json'),JSON.stringify(report,null,2));console.log(config.id,JSON.stringify(result));
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();if(server)server.kill();});
