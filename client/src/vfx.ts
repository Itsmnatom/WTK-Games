import * as THREE from 'three';

/**
 * GPU-driven particle layer for table effects.
 *
 * - One instanced geometry draw contains the particle effects on the table.
 * - Motion is evaluated in the vertex shader from (origin, velocity, drag, gravity, age),
 *   so there is no per-frame CPU simulation, no GSAP tween and no per-particle allocation.
 * - Spawning writes into a fixed ring buffer; only the touched range is re-uploaded.
 * - Premultiplied normal blending preserves matte ink instead of additive glare.
 *
 * New effects are data: add a Recipe to RECIPES and call gen(). Presentation only.
 */

export const K = { WASH: 0, STROKE: 1, DROP: 2, CIRCLE: 3, FLOOR: 4, SEAL: 5, SLASH: 6, BOLT: 7 } as const;
export const INK = { black:'#192125', red:'#b44535', gold:'#c7a45e', paper:'#eadcb8', fire:'#b96532', thunder:'#608b8e', heal:'#76916a' } as const;
export type InkFamily = 'attack'|'defend'|'heal'|'wine'|'fire'|'thunder'|'steal'|'break'|'draw'|'duel'|'chain'|'negate'|'delayed'|'equip'|'arrows'|'invasion'|'garden'|'harvest';
export type V3 = { x: number; y: number; z: number };
export type Rgb = [number, number, number];
type Shape = 'point' | 'ring' | 'disc' | 'column' | 'cone';

export interface Layer {
  kind: number;
  n: number;                 // base count; scaled by quality
  min?: number;              // floor at lowest quality (default 1)
  shape?: Shape;             // spawn distribution + velocity direction
  radius?: number;           // spawn radius (ring/disc/column)
  h?: number;                // spawn height offset from the anchor (FLOOR kinds sit on the table instead)
  speed?: [number, number];  // initial speed (world units / s)
  up?: number;               // extra vertical velocity
  spread?: number;           // cone width
  life: [number, number];
  size: [number, number];    // start half-extent
  grow?: number;             // end size = start * grow
  colors: string[];
  end?: string;              // colour at end of life
  tint?: boolean;            // use GenOpts.color instead of colors
  drag?: number;
  gravity?: number;          // + falls, - rises
  alpha?: number;
  add?: number;              // 1 additive glow, 0 normal blend
  stretch?: number;          // streak length multiplier
  spin?: number;             // max rotation speed (rad/s)
  stagger?: number;          // spread spawn times over N seconds
  delay?: number;            // start offset in seconds
  phase?: [number, number];  // orientation range in turns (ARC)
}
export type Recipe = Layer[];
export interface GenOpts { scale?: number; color?: string; count?: number; delay?: number }

interface PSpec {
  x: number; y: number; z: number; vx?: number; vy?: number; vz?: number;
  life: number; delay?: number; s0: number; s1?: number; drag?: number; gravity?: number;
  c0: Rgb; c1?: Rgb; alpha?: number; kind: number; add?: number; stretch?: number; phase?: number; spin?: number;
}

const colorCache = new Map<string, Rgb>();
export function rgb(hex: string): Rgb {
  let value = colorCache.get(hex);
  if (!value) { const c = new THREE.Color(hex); value = [c.r, c.g, c.b]; colorCache.set(hex, value); }
  return value;
}
const rnd = (a: number, b: number): number => a + Math.random() * (b - a);
const TAU = Math.PI * 2;
const FLOOR_Y = 1.64;

const VERT = /* glsl */`
attribute vec4 aStart; // xyz origin, w spawn time
attribute vec4 aVel;   // xyz velocity (BOLT: segment vector), w life
attribute vec4 aShape; // size0, size1, drag, gravity
attribute vec4 aColA;  // rgb start, alpha
attribute vec4 aColB;  // rgb end, kind
attribute vec4 aMisc;  // stretch, phase, additive, spin
uniform float uTime;
varying vec2 vP;
varying vec4 vCol;
varying vec4 vInfo;
void main() {
  float life = aVel.w;
  float age = uTime - aStart.w;
  if (life <= 0. || age < 0. || age >= life) { gl_Position = vec4(2., 2., 2., 1.); return; }
  float k = age / life;
  float kind = floor(aColB.w + .5);
  float drag = aShape.z;
  float travel = drag > .001 ? (1. - exp(-drag * age)) / drag : age;
  vec3 pos = aStart.xyz + aVel.xyz * travel;
  pos.y -= .5 * aShape.w * age * age;
  if (kind > 6.5) pos = aStart.xyz;
  bool eased = (kind > 2.5 && kind < 4.5) || (kind > 5.5 && kind < 6.5);
  float ease = eased ? 1. - pow(1. - k, 3.) : k;
  float size = mix(aShape.x, aShape.y, ease);
  vec2 c = position.xy;
  vec4 mv = modelViewMatrix * vec4(pos, 1.);
  if (kind > 6.5) {
    vec4 mv1 = modelViewMatrix * vec4(pos + aVel.xyz, 1.);
    vec2 d = mv1.xy - mv.xy;
    vec2 dir = d / max(length(d), 1e-4);
    mv.xy = mix(mv.xy, mv1.xy, c.x * .5 + .5) + vec2(-dir.y, dir.x) * c.y * size;
  } else if (kind > 3.5 && kind < 4.5) {
    mv = modelViewMatrix * vec4(pos + vec3(c.x, 0., c.y) * size, 1.);
  } else if (kind > .5 && kind < 1.5) {
    vec3 vel = aVel.xyz * exp(-drag * age);
    vel.y -= aShape.w * age;
    vec2 sv = (modelViewMatrix * vec4(vel, 0.)).xy;
    float sl = length(sv);
    vec2 dir = sl > 1e-3 ? sv / sl : vec2(1., 0.);
    float stretch = aMisc.x * (1. + sl * .16);
    mv.xy += dir * c.x * size * stretch + vec2(-dir.y, dir.x) * c.y * size;
  } else {
    float a = aMisc.y * 6.28318 + aMisc.w * age;
    float cs = cos(a), sn = sin(a);
    mv.xy += vec2(cs * c.x - sn * c.y, sn * c.x + cs * c.y) * size;
  }
  gl_Position = projectionMatrix * mv;
  vP = c;
  vCol = vec4(mix(aColA.rgb, aColB.rgb, smoothstep(0., 1., k)), aColA.a);
  vInfo = vec4(k, kind, aMisc.y, aMisc.z);
}`;

const FRAG = /* glsl */`
varying vec2 vP;
varying vec4 vCol;
varying vec4 vInfo;
float grain(vec2 p) {
  vec3 q=fract(vec3(floor(p).xyx)*.1031);
  q+=dot(q,q.yzx+33.33);
  return fract((q.x+q.y)*q.z);
}
float stroke(vec2 p,vec2 a,vec2 b,float w) {
  vec2 d=b-a;float h=clamp(dot(p-a,d)/max(dot(d,d),.0001),0.,1.);
  return 1.-smoothstep(w,w+.025,length(p-a-d*h));
}
void main() {
  float k = vInfo.x, kind = vInfo.y, add = vInfo.w;
  vec2 p = vP;
  // Dry-brush quads have broad empty margins. Reject before the grain/glyph work.
  if (kind > .5 && kind < 1.5 && abs(p.y) > .5) discard;
  if (kind > 6.5 && abs(p.y) > .75) discard;
  float r = length(p);
  float a = 0.;
  float grit=grain(p*43.+vInfo.z*19.);
  float fin = smoothstep(0., .035, k),fade=1.-smoothstep(.48,1.,k);
  if (kind < .5) {
    float theta=atan(p.y,p.x),edge=.63+.09*sin(theta*7.+vInfo.z*13.)+.07*sin(theta*13.);
    a=(1.-smoothstep(edge-.07,edge+.05+grit*.08,r))*mix(.55,.85,grit)*fin*fade;
  } else if (kind < 1.5) {
    float taper=pow(max(0.,1.-abs(p.x)),.55),width=(.10+.14*taper)*(1.+.24*sin(p.x*29.+vInfo.z*21.));
    a=(1.-smoothstep(width,width+.055,abs(p.y)))*(1.-smoothstep(.87,1.,abs(p.x)));
    a*=step(.13,grain(vec2(p.x*65.,p.y*120.)+vInfo.z*23.))*fin*fade;
  } else if (kind < 2.5) {
    float edge=.58+.12*sin(atan(p.y,p.x)*5.+vInfo.z*17.);
    a=(1.-smoothstep(edge-.04,edge+.06,r))*mix(.65,1.,grit)*fade;
  } else if (kind < 4.5) {
    float angle=atan(p.y,p.x),width=.04+.065*(.5+.5*sin(angle+vInfo.z*6.));
    float ring=1.-smoothstep(width,width+.025+grit*.025,abs(r-.79-.02*sin(angle*11.)));
    float reveal=smoothstep(-3.1416,-3.0+k*7.,angle);
    a=ring*(1.-reveal)*step(.1,grit)*fin*fade;
  } else if (kind < 5.5) {
    vec2 q=abs(p);float box=max(q.x,q.y),border=1.-smoothstep(.045,.085+grit*.035,abs(box-.79));
    float glyph=stroke(p,vec2(-.38,.12),vec2(0.,.47),.055)+stroke(p,vec2(0.,.47),vec2(.38,.12),.055);
    glyph+=stroke(p,vec2(-.22,.06),vec2(.22,.06),.05)+stroke(p,vec2(-.3,-.13),vec2(.27,-.13),.055);
    glyph+=stroke(p,vec2(.27,-.13),vec2(.02,-.34),.05)+stroke(p,vec2(-.04,-.23),vec2(.1,-.48),.05);
    a=max(border,min(1.,glyph))*step(.14,grit)*fin*fade;
  } else if (kind < 6.5) {
    float d2=length(p-vec2(.29,0.));
    float crescent=(1.-smoothstep(.89,.96+grit*.04,r))*smoothstep(.77,.85,d2);
    float reveal=smoothstep(0.,.2,p.y-(1.-clamp(k*5.,0.,1.)*2.));
    a=crescent*reveal*step(.17,grain(p*vec2(80.,35.)+vInfo.z*29.))*fade;
  } else {
    float width=.42+.10*sin(p.x*23.+vInfo.z*17.);
    a=(1.-smoothstep(width,width+.12+grit*.12,abs(p.y)))*fin*fade;
  }
  a *= vCol.a;
  if (a < .003) discard;
  vec3 col = vCol.rgb;
  col = linearToOutputTexel(vec4(col, 1.)).rgb;
  gl_FragColor = vec4(col * a, a * (1. - add));
}`;

const ATTRIBUTES = ['aStart', 'aVel', 'aShape', 'aColA', 'aColB', 'aMisc'] as const;

/** Fixed-capacity ring buffer of GPU-simulated particles. */
export class ParticleLayer {
  readonly mesh: THREE.Mesh;
  private geometry = new THREE.InstancedBufferGeometry();
  private material: THREE.ShaderMaterial;
  private data: Float32Array[] = [];
  private attributes: THREE.InstancedBufferAttribute[] = [];
  private head = 0;
  private high = 0;
  private dirtyLow = Infinity;
  private dirtyHigh = -1;
  private liveUntil = 0;
  private readonly origin = performance.now();

  constructor(readonly capacity: number) {
    const quad = new THREE.BufferGeometry();
    quad.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]), 3));
    quad.setIndex([0, 1, 2, 0, 2, 3]);
    this.geometry.index = quad.index; this.geometry.setAttribute('position', quad.getAttribute('position'));
    for (const name of ATTRIBUTES) {
      const array = new Float32Array(capacity * 4), attribute = new THREE.InstancedBufferAttribute(array, 4);
      attribute.setUsage(THREE.DynamicDrawUsage); this.geometry.setAttribute(name, attribute);
      this.data.push(array); this.attributes.push(attribute);
    }
    this.geometry.instanceCount = 0;
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms: { uTime: { value: 0 } },
      transparent: true, depthTest: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide,
      blending: THREE.CustomBlending, blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false; this.mesh.renderOrder = 1;
  }
  now(timestamp = performance.now()): number { return (timestamp - this.origin) / 1000; }
  put(s: PSpec): void {
    // Start a fresh batch after idle, rather than submitting the previous high-water mark.
    if (this.now() >= this.liveUntil) { this.head = this.high = 0; }
    const i = this.head; this.head = (i + 1) % this.capacity; if (i + 1 > this.high) this.high = i + 1;
    const delay=Math.max(0,Math.min(.4,s.delay||0)),life=Math.max(.05,Math.min(s.life,.98-delay));
    const [a, b, c, d, e, f] = this.data, o = i * 4, start = this.now() + delay, c1 = s.c1 || s.c0;
    a[o] = s.x; a[o + 1] = s.y; a[o + 2] = s.z; a[o + 3] = start;
    b[o] = s.vx || 0; b[o + 1] = s.vy || 0; b[o + 2] = s.vz || 0; b[o + 3] = life;
    c[o] = s.s0; c[o + 1] = s.s1 ?? s.s0; c[o + 2] = s.drag || 0; c[o + 3] = s.gravity || 0;
    d[o] = s.c0[0]; d[o + 1] = s.c0[1]; d[o + 2] = s.c0[2]; d[o + 3] = s.alpha ?? 1;
    e[o] = c1[0]; e[o + 1] = c1[1]; e[o + 2] = c1[2]; e[o + 3] = s.kind;
    f[o] = s.stretch ?? 1; f[o + 1] = s.phase ?? Math.random(); f[o + 2] = s.add ?? 1; f[o + 3] = s.spin || 0;
    if (i < this.dirtyLow) this.dirtyLow = i; if (i > this.dirtyHigh) this.dirtyHigh = i;
    const end = start + life; if (end > this.liveUntil) this.liveUntil = end;
  }
  isLive(timestamp: number): boolean { return this.now(timestamp) < this.liveUntil; }
  /** Sync the clock and upload only the slots written since the last frame. */
  update(timestamp: number): void {
    this.material.uniforms.uTime.value = this.now(timestamp);
    this.mesh.visible = this.isLive(timestamp);
    if (this.dirtyHigh < 0) return;
    const start = this.dirtyLow * 4, count = (this.dirtyHigh - this.dirtyLow + 1) * 4;
    for (const attribute of this.attributes) { attribute.clearUpdateRanges(); attribute.addUpdateRange(start, count); attribute.needsUpdate = true; }
    this.geometry.instanceCount = this.high; this.dirtyLow = Infinity; this.dirtyHigh = -1;
  }
  clear(): void {
    this.liveUntil = 0; this.head = this.high = this.geometry.instanceCount = 0;
    this.mesh.visible = false; this.dirtyLow = Infinity; this.dirtyHigh = -1;
  }
  dispose(): void { this.mesh.removeFromParent(); this.geometry.dispose(); this.material.dispose(); }
}

// Matte ink recipes: silhouette, dry-brush accent and vermilion seal.
const drops=(color:string,n=10):Layer=>({kind:K.DROP,n,min:3,shape:'point',speed:[1.1,3.1],up:.35,life:[.45,.8],size:[.035,.11],grow:.55,gravity:3,drag:3.2,colors:[color],add:0,alpha:.9,spin:1.2});
const seal=(color:string=INK.red,size=.6):Layer=>({kind:K.SEAL,n:1,life:[.72,.72],size:[size,size],grow:1.06,colors:[color],add:0,alpha:.95,phase:[-.025,.025]});
const circle=(color:string=INK.gold,size=.4,grow=3):Layer=>({kind:K.FLOOR,n:1,life:[.82,.82],size:[size,size],grow,colors:[color],add:0,alpha:.85});
const wash=(color:string=INK.black,size=.6):Layer=>({kind:K.WASH,n:1,life:[.65,.65],size:[size,size],grow:1.3,colors:[color],add:0,alpha:.6});
export const RECIPES:Record<string,Recipe>={
  hit:[wash(),drops(INK.black,13),{...drops(INK.red,5),size:[.035,.07]},circle(INK.gold,.23,2.4)],
  fire:[wash(INK.black,.65),{kind:K.STROKE,n:7,min:3,shape:'column',radius:.32,h:-.45,speed:[.9,1.7],life:[.45,.75],size:[.15,.25],grow:.6,stretch:2.1,colors:[INK.black,INK.fire],gravity:-.3,drag:1.5,add:0,alpha:.9,stagger:.08},drops(INK.fire,7),circle(INK.red,.25,2.7)],
  thunderGround:[wash(INK.black,.5),drops(INK.thunder,8),{...drops(INK.gold,5),life:[.35,.6]},circle(INK.gold,.25,2.7)],
  heal:[circle(INK.heal,.3,3),{...seal(INK.red,.35),h:.2},{kind:K.STROKE,n:7,min:3,shape:'disc',radius:.5,h:-.55,speed:[.65,1.1],life:[.5,.8],size:[.11,.18],grow:.4,colors:[INK.heal,INK.gold],stretch:1.2,drag:1.5,add:0,alpha:.8}],
  shield:[{kind:K.CIRCLE,n:1,life:[.7,.7],size:[.6,.6],grow:1.5,colors:[INK.black],add:0,alpha:.9},seal(INK.red,.48),drops(INK.gold,6)],
  negate:[{kind:K.CIRCLE,n:1,life:[.7,.7],size:[.85,.85],grow:.55,colors:[INK.black],add:0,alpha:.9},seal(INK.red,.58),{...drops(INK.red,9),speed:[1.8,3.1]}],
  sigil:[seal(INK.red,.92),circle(INK.gold,.4,3.4),{...drops(INK.black,14),speed:[1.4,3.7]},drops(INK.gold,7)],
  death:[wash(INK.black,.75),drops(INK.red,10),{...circle(INK.black,.4,3),alpha:.65}],
  dying:[circle(INK.red,.35,2.8),{...seal(INK.red,.5),alpha:.7}],
  victory:[seal(INK.red,1.1),circle(INK.gold,.5,4.2),{...drops(INK.gold,24),speed:[1.6,4.2],life:[.55,.92],size:[.05,.13]},wash(INK.black,.8)],
  ping:[circle(INK.gold,.22,2.3),drops(INK.gold,4)],
  cardLand:[{...circle(INK.black,.2,2.5),delay:.42},{...drops(INK.gold,5),delay:.4,life:[.25,.5],speed:[.7,1.4]}],
  equip:[seal(INK.red,.55),circle(INK.gold,.3,2.9),drops(INK.black,9)],
  spell:[seal(INK.red,.58),wash(INK.black,.45),drops(INK.gold,7)],
};
export class VFX {
  onSpawn?:()=>void;
  private layer:ParticleLayer;
  private density=1;
  constructor(parent:THREE.Object3D,mobile=false){this.layer=new ParticleLayer(mobile?768:1536);parent.add(this.layer.mesh);}
  setQuality(tier:0|1|2):void{this.density=tier===2?.36:tier===1?.62:1;}
  isLive(timestamp:number):boolean{return this.layer.isLive(timestamp);}
  update(timestamp:number):void{this.layer.update(timestamp);}
  clear():void{this.layer.clear();}
  dispose():void{this.layer.dispose();}
  private kick():void{this.onSpawn?.();}
  private n(count:number,min=1):number{return Math.max(min,Math.round(count*this.density));}
  gen(recipe:Recipe,at:V3,o:GenOpts={}):void{
    const scale=o.scale??1;
    for(const layer of recipe){
      const count=this.n(layer.n*(o.count??1),layer.min??1),shape=layer.shape??'point';
      const palette=(layer.tint&&o.color?[o.color]:layer.colors).map(rgb),end=layer.end?rgb(layer.end):undefined;
      for(let i=0;i<count;i++){
        const angle=shape==='ring'?i/count*TAU+rnd(-.15,.15):rnd(0,TAU),cos=Math.cos(angle),sin=Math.sin(angle);
        const speed=rnd(layer.speed?.[0]??0,layer.speed?.[1]??0)*scale,radius=(layer.radius??.4)*scale;
        let x=at.x,y=layer.kind===K.FLOOR?FLOOR_Y+(layer.h??0):at.y+(layer.h??0)*scale,z=at.z,vx=0,vy=layer.up??0,vz=0;
        if(shape==='ring'){x+=cos*radius;z+=sin*radius;vx=cos*speed;vz=sin*speed;}
        else if(shape==='disc'){const r=Math.sqrt(Math.random())*radius;x+=cos*r;z+=sin*r;vx=cos*.12;vz=sin*.12;vy+=speed;}
        else if(shape==='column'){const r=Math.random()*radius;x+=cos*r;z+=sin*r;vx=rnd(-.15,.15);vz=rnd(-.15,.15);vy+=speed;}
        else if(shape==='cone'){vx=cos*(layer.spread??.7)*speed;vz=sin*(layer.spread??.7)*speed;vy+=speed;}
        else{vx=cos*speed;vy+=rnd(-.2,.9)*speed;vz=sin*speed*.5;}
        const size=rnd(layer.size[0],layer.size[1])*scale;
        this.layer.put({x,y,z,vx,vy,vz,life:rnd(layer.life[0],layer.life[1]),delay:(o.delay??0)+(layer.delay??0)+(layer.stagger?Math.random()*layer.stagger:0),s0:size,s1:size*(layer.grow??1),drag:layer.drag,gravity:layer.gravity,c0:palette[(Math.random()*palette.length)|0],c1:end,alpha:layer.alpha??.85,kind:layer.kind,add:0,stretch:layer.stretch,phase:layer.phase?rnd(...layer.phase):undefined,spin:layer.spin?rnd(-layer.spin,layer.spin):0});
      }
    }
    this.kick();
  }
  /** A single emphatic cast, irrespective of the number of affected players. */
  cast(at:V3,family:InkFamily,group=false):void{
    const accent=family==='fire'?INK.fire:family==='thunder'?INK.thunder:family==='heal'||family==='garden'?INK.heal:INK.gold;
    const beside={x:at.x+.72,y:at.y+.25,z:at.z};
    this.gen([seal(INK.red,group?.95:.5),{...wash(INK.black,group?.75:.42),alpha:.3},drops(accent,group?14:8)],group?at:beside);
    if(group){
      this.gen([circle(INK.black,.45,4),{...circle(accent,.4,3.7),delay:.08}],at);
      if(family==='arrows'||family==='invasion')for(let i=0;i<this.n(8,4);i++){
        const angle=i/this.n(8,4)*TAU,from={x:at.x+Math.cos(angle)*.5,y:FLOOR_Y+.05,z:at.z+Math.sin(angle)*.5},to={x:at.x+Math.cos(angle)*1.8,y:FLOOR_Y+.05,z:at.z+Math.sin(angle)*1.1};
        this.chain([from,to],i*.025,.5,family==='arrows'?.027:.055,rgb(INK.black),rgb(accent),.85);
      }
    }else if(family==='attack'||family==='duel')this.slash(beside,INK.black,.75);
    else if(family==='fire')this.fire(beside);
    else if(family==='thunder')this.thunder(beside);
    else if(family==='equip')this.gen([circle(INK.gold,.22,2.5)],at);
    else if(family==='chain')for(let i=0;i<3;i++)this.gen([{kind:K.CIRCLE,n:1,life:[.75,.75],size:[.28,.28],grow:1.15,colors:[i===1?INK.gold:INK.black],add:0,alpha:.9}],{x:beside.x+(i-1)*.36,y:beside.y,z:beside.z});
    else if(family==='draw')for(let i=0;i<2;i++)this.gen([{...seal(i?INK.gold:INK.black,.36),delay:i*.07}],{x:beside.x+(i? .22:-.22),y:beside.y+(i?.15:-.08),z:beside.z});
    else if(family==='steal'){
      const hook=[[-.42,.25],[.06,.42],[.4,.2],[.22,-.2],[-.04,-.12]].map(([x,y])=>({x:beside.x+x,y:beside.y+y,z:beside.z}));
      this.chain(hook,.03,.68,.045,rgb(INK.black),rgb(INK.gold),.9);
    }else if(family==='break'||family==='delayed'){
      const lines=family==='break'?[[[-.4,-.35],[.4,.35]],[[-.4,.35],[.4,-.35]]]:[[[-.35,.4],[.35,.4]],[[.35,.4],[-.35,-.4]],[[-.35,-.4],[.35,-.4]],[[.35,-.4],[-.35,.4]]];
      for(const line of lines)this.chain(line.map(([x,y])=>({x:beside.x+x,y:beside.y+y,z:beside.z})),.02,.68,.042,rgb(INK.black),rgb(INK.gold),.9);
    }
  }
  hit(at:V3,scale=1):void{this.gen(RECIPES.hit,at,{scale});}
  impact(at:V3,element='NORMAL'):void{
    const color=element==='FIRE'?INK.fire:element==='THUNDER'?INK.thunder:INK.red;
    this.gen([wash(INK.black,.47),drops(INK.black,9),{...drops(color,5),speed:[1.4,2.4],life:[.35,.6]}],at);
    this.slash(at,INK.black,.75);
  }
  slash(at:V3,color:string=INK.black,scale=1):void{
    this.gen([{kind:K.SLASH,n:1,life:[.65,.65],size:[.95,.95],grow:1.22,colors:[INK.black],add:0,phase:[-.08,.08],alpha:.92},{kind:K.SLASH,n:1,delay:.06,life:[.6,.6],size:[1.05,1.05],grow:1.12,colors:[color===INK.black?INK.gold:color],add:0,phase:[-.08,.08],alpha:.65},drops(INK.black,8)],at,{scale});
  }
  flash(at:V3,_color:string,size=1):void{this.gen([{...wash(INK.black,size*.5),alpha:.35}],at);}
  sparks(at:V3,_color:string,count=12,spread=1,duration=.65):void{this.gen([{...drops(INK.black,count),speed:[spread*1.1,spread*2.8],life:[Math.min(.5,duration),Math.min(.85,duration+.1)]},{...drops(INK.gold,Math.ceil(count/3)),life:[.4,.65]}],at);}
  ring(at:V3,color:string=INK.gold,size=.7):void{this.gen([circle(color===INK.heal?INK.heal:INK.gold,size*.45,3),{...circle(INK.black,size*.4,3.2),delay:.06,alpha:.5}],at);}
  ping(at:V3,_color:string):void{this.gen(RECIPES.ping,at);}
  fire(at:V3):void{this.gen(RECIPES.fire,at);}
  heal(at:V3,_color:string=INK.heal):void{this.gen(RECIPES.heal,at);}
  shield(at:V3,_color:string=INK.gold):void{this.gen(RECIPES.shield,at);}
  negate(at:V3):void{this.gen(RECIPES.negate,at);}
  sigil(at:V3,_color:string=INK.gold,scholar=false):void{this.gen(RECIPES.sigil,{x:at.x+.85,y:at.y+.2,z:at.z},{scale:scholar?.95:1});}
  equip(at:V3):void{this.gen(RECIPES.equip,at);}
  spell(at:V3,_color:string=INK.gold):void{this.gen(RECIPES.spell,at);}
  death(at:V3):void{this.gen(RECIPES.death,at);}
  dying(at:V3):void{this.gen(RECIPES.dying,at);}
  victory(at:V3):void{this.gen(RECIPES.victory,at);}
  cardLand(at:V3):void{this.gen(RECIPES.cardLand,at);}
  thunder(at:V3):void{
    const top={x:at.x+rnd(-.25,.25),y:at.y+1.65,z:at.z},ink=rgb(INK.black),accent=rgb(INK.thunder),gold=rgb(INK.gold);
    for(let strike=0;strike<(this.density<.5?1:2);strike++){
      const path=this.jag(top,at,3,.3),delay=strike*.08;
      this.chain(path,delay,.48,.055,ink,ink,.9);this.chain(path,delay+.025,.4,.018,accent,gold,.8);
      if(strike===0){const from=path[3],branch=this.jag(from,{x:from.x+.6,y:from.y-.55,z:from.z},2,.15);this.chain(branch,.05,.45,.027,ink,accent,.8);}
    }
    this.gen(RECIPES.thunderGround,at);this.kick();
  }
  /** Pre-timed dry-brush segments, with no per-frame CPU curve work. */
  trail(from:V3,to:V3,_color:string,arc=.8,duration=.38):void{
    const count=this.n(14,7),ink=rgb(INK.black),gold=rgb(INK.gold),path:V3[]=[];
    for(let i=0;i<count;i++){
      const u=i/(count-1),q=1-u;path.push({x:q*q*from.x+2*q*u*(from.x+to.x)/2+u*u*to.x,y:q*q*from.y+2*q*u*((from.y+to.y)/2+arc)+u*u*to.y,z:q*q*from.z+2*q*u*(from.z+to.z)/2+u*u*to.z});
      if(i){this.chain([path[i-1],path[i]],u*duration,.36,.038,ink,ink,.85);if(i%3===0)this.chain([path[i-1],path[i]],u*duration+.02,.3,.012,gold,gold,.8);}
    }
    this.kick();
  }
  private jag(a:V3,b:V3,levels:number,amplitude:number):V3[]{
    let points:V3[]=[a,b];
    for(let level=0;level<levels;level++){
      const next:V3[]=[points[0]];
      for(let i=1;i<points.length;i++){const p=points[i-1],q=points[i],k=amplitude/2**level;next.push({x:(p.x+q.x)/2+rnd(-k,k),y:(p.y+q.y)/2,z:(p.z+q.z)/2+rnd(-k,k)*.4},q);}points=next;
    }
    return points;
  }
  private chain(path:V3[],delay:number,life:number,width:number,c0:Rgb,c1:Rgb,alpha:number):void{
    for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i];this.layer.put({x:a.x,y:a.y,z:a.z,vx:b.x-a.x,vy:b.y-a.y,vz:b.z-a.z,delay,life,s0:width,c0,c1,alpha,kind:K.BOLT,phase:Math.random(),add:0});}
  }
}
