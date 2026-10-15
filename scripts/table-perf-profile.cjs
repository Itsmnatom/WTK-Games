'use strict';
// Presentation-only profiling. No game assertions or product hooks.
const fs = require('fs');
const os = require('os');
const path = require('path');
const net = require('net');
const crypto = require('crypto');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const { encode } = require('@colyseus/schema');
const msgpack = require('../node_modules/colyseus.js/lib/msgpack');
const workspace = path.resolve(__dirname, '..');
const label = process.argv[2] || 'before';
if (!/^[a-z0-9-]+$/.test(label)) throw new Error('Use a plain artifact label');
const output = path.join(workspace, 'artifacts/performance');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let server, browser, logs = '';

function instrumentation() {
  const nativeRAF = requestAnimationFrame.bind(window), contexts = [], sockets = [];
  let enabled = false, start = performance.now(), draws = 0, clears = [], appRAF = 0, appRAFMs = 0, observerRAF = [], sizes = 0, tasks = [];
  let probePrevious = 0;
  const board = gl => !!gl.canvas.closest?.('#board-scene');
  const framebuffers = new WeakMap();
  const seenPrototypes = new Set();
  for (const Context of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
    if (!Context || seenPrototypes.has(Context.prototype)) continue;
    const proto = Context.prototype; seenPrototypes.add(proto);
    for (const method of ['drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced']) {
      const original = proto[method]; if (!original) continue;
      proto[method] = function(...args) { if (enabled && board(this)) draws++; return original.apply(this,args); };
    }
    const bind = proto.bindFramebuffer;
    proto.bindFramebuffer = function(target, framebuffer) { if(target === this.FRAMEBUFFER || target === this.DRAW_FRAMEBUFFER) framebuffers.set(this,framebuffer); return bind.call(this,target,framebuffer); };
    const clear = proto.clear;
    proto.clear = function(mask) { if(enabled && board(this) && !framebuffers.get(this) && (mask & this.COLOR_BUFFER_BIT)) clears.push(performance.now()); return clear.call(this,mask); };
  }
  const getContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(type,...args) {
    const gl = getContext.call(this,type,...args);
    if(gl && /^webgl/.test(type) && !contexts.some(item=>item.gl===gl)) {
      const ext=gl.getExtension('WEBGL_debug_renderer_info');
      contexts.push({gl,renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),vendor:ext?gl.getParameter(ext.UNMASKED_VENDOR_WEBGL):gl.getParameter(gl.VENDOR),version:gl.getParameter(gl.VERSION)});
    }
    return gl;
  };
  for(const key of ['width','height']) {
    const descriptor=Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,key);
    Object.defineProperty(HTMLCanvasElement.prototype,key,{...descriptor,set(value){if(enabled&&this.closest?.('#board-scene'))sizes++;return descriptor.set.call(this,value);}});
  }
  window.requestAnimationFrame = callback => nativeRAF(timestamp=>{const began=performance.now();if(enabled)appRAF++;try{callback(timestamp);}finally{if(enabled)appRAFMs+=performance.now()-began;}});
  function probe(time){if(enabled&&probePrevious)observerRAF.push(time-probePrevious);probePrevious=time;nativeRAF(probe);} nativeRAF(probe);
  try{new PerformanceObserver(list=>{if(enabled)for(const entry of list.getEntries())tasks.push({start:entry.startTime,duration:entry.duration});}).observe({entryTypes:['longtask']});}catch{}
  const NativeWebSocket=window.WebSocket;
  window.WebSocket=new Proxy(NativeWebSocket,{construct(target,args){const socket=Reflect.construct(target,args);sockets.push(socket);return socket;}});
  window.__tablePerf={
    reset(){draws=0;clears=[];appRAF=0;appRAFMs=0;observerRAF=[];sizes=0;tasks=[];probePrevious=0;start=performance.now();enabled=true;},
    read(){enabled=false;return {durationMs:performance.now()-start,drawCalls:draws,renderFrameTimestamps:clears.map(value=>value-start),appRAFCallbacks:appRAF,appRAFCallbackMs:appRAFMs,observerFrameIntervals:observerRAF,canvasDimensionWrites:sizes,longTasks:tasks,visibility:document.visibilityState,contexts:contexts.filter(item=>board(item.gl)).map(({gl,...info})=>({...info,width:gl.drawingBufferWidth,height:gl.drawingBufferHeight})),seatIds:[...document.querySelectorAll('.seat[data-player]')].map(element=>element.dataset.player)};},
    dispatch(bytes){const socket=sockets.findLast(item=>item.readyState===1);if(!socket)throw new Error('No open presentation connection');socket.dispatchEvent(new MessageEvent('message',{data:new Uint8Array(bytes).buffer}));},
  };
  localStorage.setItem('wtk.feedback',JSON.stringify({volume:0,muted:true}));
  localStorage.setItem('wtk.effectsReduced','false');
}
function packet(type,payload){const prefix=[13];encode.string(prefix,type);return [...prefix,...new Uint8Array(msgpack.encode(payload))];}
function percentile(values,fraction){if(!values.length)return null;const sorted=[...values].sort((a,b)=>a-b);return sorted[Math.min(sorted.length-1,Math.floor(sorted.length*fraction))];}
function summarize(raw,begin,end){
  const a=Object.fromEntries(begin.metrics.map(item=>[item.name,item.value])),b=Object.fromEntries(end.metrics.map(item=>[item.name,item.value]));
  const cpu={};for(const key of ['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration','LayoutCount','RecalcStyleCount'])cpu[key]=(b[key]||0)-(a[key]||0);
  const intervals=raw.renderFrameTimestamps.slice(1).map((value,index)=>value-raw.renderFrameTimestamps[index]);
  return {...raw,summary:{screenRenders:raw.renderFrameTimestamps.length,screenRendersPerSecond:raw.renderFrameTimestamps.length/raw.durationMs*1000,drawCallsPerSecond:raw.drawCalls/raw.durationMs*1000,renderIntervalP50:percentile(intervals,.5),renderIntervalP95:percentile(intervals,.95),observerRAFIntervalP50:percentile(raw.observerFrameIntervals,.5),observerRAFIntervalP95:percentile(raw.observerFrameIntervals,.95),longTaskCount:raw.longTasks.length,longTaskMs:raw.longTasks.reduce((sum,task)=>sum+task.duration,0),rendererMainThreadBusyRatio:cpu.TaskDuration/(raw.durationMs/1000),jsHeapStart:a.JSHeapUsedSize,jsHeapEnd:b.JSHeapUsedSize,cpuDeltas:cpu},cdpMetrics:{begin,end}};
}
async function main(){
  fs.mkdirSync(output,{recursive:true});
  const port=await new Promise((resolve,reject)=>{const probe=net.createServer();probe.once('error',reject);probe.listen(0,'127.0.0.1',()=>{const port=probe.address().port;probe.close(()=>resolve(port));});});
  const temporaryDirectory=fs.mkdtempSync(path.join(os.tmpdir(),'wtk-table-perf-'));fs.mkdirSync(path.join(temporaryDirectory,'db'));
  server=spawn(process.execPath,[path.join(workspace,'dist/colyseus_server.js')],{cwd:temporaryDirectory,env:{...process.env,PORT:String(port),NODE_ENV:'test',NO_COLOR:'1'},stdio:['ignore','pipe','pipe'],windowsHide:true});
  await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Profiling server boot timeout: '+logs)),10000);const onData=data=>{logs+=String(data);if(logs.includes('http://localhost:'+port)){clearTimeout(timer);resolve();}};server.stdout.on('data',onData);server.stderr.on('data',onData);server.once('error',reject);});
  browser=await puppeteer.launch({headless:true,args:['--enable-unsafe-swiftshader'],ignoreDefaultArgs:['--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows']});
  const index=fs.readFileSync(path.join(workspace,'public/pixel/index.html'),'utf8'),entry=(index.match(/src="([^"]+\.js)"/)||[])[1];
  const report={label,capturedAt:new Date().toISOString(),method:'External pre-document WebGL default-framebuffer color clear count is a per-scene rendered-frame proxy; observer RAF measures browser callback opportunity, not scene FPS. Synthetic public presentation packets pass through the real shipped Colyseus SDK/feedback/scene handler, without changing game state. CDP TaskDuration is renderer main-thread busy time, not OS CPU or GPU utilization. Audio muted; full FX selected. No game correctness assertions.',bundle:{entry,sha256:entry?crypto.createHash('sha256').update(fs.readFileSync(path.join(workspace,'public',entry))).digest('hex'):null},environment:{node:process.version,browser:await browser.version(),browserArgs:browser.process().spawnargs,temporaryDirectory},cases:[]};
  for(const config of [{id:'desktop-6',seats:6,width:1440,height:900,isMobile:false,hasTouch:false,deviceScaleFactor:1},{id:'mobile-10',seats:10,width:390,height:844,isMobile:true,hasTouch:true,deviceScaleFactor:1}]){
    const page=await browser.newPage();await page.setViewport(config);await page.evaluateOnNewDocument(instrumentation);const errors=[];page.on('pageerror',error=>errors.push(String(error)));const cdp=await page.createCDPSession();await cdp.send('Performance.enable');
    await page.goto(`http://127.0.0.1:${port}/room?action=create&mode=BOT&players=${config.seats}&test=true`,{waitUntil:'networkidle0'});await page.waitForSelector('.draft-card',{timeout:15000});await page.click('.draft-card');await page.waitForSelector('#board-scene canvas',{timeout:15000});await delay(2500);
    const seatIds=await page.$$eval('.seat[data-player]',elements=>elements.map(element=>element.dataset.player));
    const result={config,seatIds,errors,phases:{}};
    async function measure(name,work){const begin=await cdp.send('Performance.getMetrics');await page.evaluate(()=>window.__tablePerf.reset());if(work)await work();else await delay(7000);const raw=await page.evaluate(()=>window.__tablePerf.read());const end=await cdp.send('Performance.getMetrics');result.phases[name]=summarize(raw,begin,end);console.log(label,config.id,name,JSON.stringify(result.phases[name].summary));}
    await measure('idle');
    const workload=[];
    for(let sequence=0;sequence<8;sequence++){
      const source=seatIds[sequence%seatIds.length],target=seatIds[(sequence+1)%seatIds.length],name=['SLASH','FIRE_ATTACK','THUNDER_ATTACK','ARROW_BARRAGE'][sequence%4],id=`performance-${config.id}-${sequence}`;
      const targets=name==='ARROW_BARRAGE'?seatIds.filter(value=>value!==source):[target];
      workload.push({atMs:sequence*850,type:'card_played',payload:{eventId:id,playId:id,playerId:source,cardName:name,kind:'PLAY',targetId:target,targetIds:targets,card:{id:'presentation-'+sequence,name,suit:'HEART',rank:7,type:name==='SLASH'||name==='THUNDER_ATTACK'?'BASIC':'KIT'}}});
      workload.push({atMs:sequence*850+400,type:'damage_log',payload:{eventId:id+'-impact',attackerId:source,targetId:target,damage:1,cardName:name,damageType:name==='FIRE_ATTACK'?'FIRE':name==='THUNDER_ATTACK'?'THUNDER':'NORMAL',hp:3,maxHp:4}});
    }
    // Reuse the saved public packets for the final comparison. Initial Lord
    // selection rotates DOM seat order randomly, while room-local p2..pN IDs
    // remain stable; rebuilding from that order would change actors/paths.
    const baselinePath=path.join(output,'before.json');
    if(label==='after'&&fs.existsSync(baselinePath)){
      const baselineCase=JSON.parse(fs.readFileSync(baselinePath,'utf8')).cases.find(item=>item.config.id===config.id);
      if(baselineCase?.syntheticWorkload){
        const ids=new Set(seatIds);
        if(baselineCase.syntheticWorkload.some(event=>[event.payload.playerId,event.payload.attackerId,event.payload.targetId,...(event.payload.targetIds||[])].filter(Boolean).some(id=>!ids.has(id))))throw new Error('Baseline presentation actors unavailable in this profile fixture');
        workload.splice(0,workload.length,...baselineCase.syntheticWorkload);
      }
    }
    result.syntheticWorkload=workload;
    await measure('active',async()=>{const start=Date.now();for(const event of workload){await delay(Math.max(0,start+event.atMs-Date.now()));await page.evaluate(bytes=>window.__tablePerf.dispatch(bytes),packet(event.type,event.payload));}await delay(Math.max(0,start+7000-Date.now()));});
    await delay(2000);
    const foreground=await browser.newPage();await foreground.goto('about:blank');await foreground.bringToFront();await delay(100);
    result.hiddenVisibility=await page.evaluate(()=>document.visibilityState);
    await measure('hidden');
    await foreground.close();await page.close();report.cases.push(result);
    fs.writeFileSync(path.join(output,label+'.json'),JSON.stringify(report,null,2));
  }
  fs.writeFileSync(path.join(output,label+'.server.log'),logs);
  console.log('CAPTURED',path.join(output,label+'.json'));
}
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();if(server)server.kill();});
