import * as THREE from 'three';
import { gsap } from 'gsap';
import { CARD_BY_ID, HEROES, HERO_BY_ID, FACTIONS, canonicalHero } from '../../shared/catalog';
import { courtyardTextures } from './scene-textures';
import { VFX, INK, type InkFamily } from './vfx';
import type { RoomSnapshot } from '../../shared/protocol';

export interface SceneLayout {
  seats: Record<string, { x: number; y: number }>;
  table: { left: number; top: number; width: number; height: number };
  center: { x: number; y: number };
}
type Effect = { group: THREE.Group; timeline: gsap.core.Timeline; priority:number; cleanup?:()=>void };

const CARD_FAMILIES:Record<string,InkFamily>={SLASH:'attack',DODGE:'defend',PEACH:'heal',WINE:'wine',THUNDER_ATTACK:'thunder',STEAL:'steal',SABOTAGE:'break',EX_NIHILO:'draw',DUEL:'duel',BARBARIAN_INVASION:'invasion',ARROW_BARRAGE:'arrows',PEACH_GARDEN:'garden',IRON_CHAIN:'chain',FIRE_ATTACK:'fire',NEGATE:'negate',BUMPER_HARVEST:'harvest',BORROWED_SWORD:'steal',LIGHTNING:'thunder',ACEDIA:'delayed',STARVATION:'delayed'};
const GROUP_CARDS=new Set(['ARROW_BARRAGE','BARBARIAN_INVASION','PEACH_GARDEN','BUMPER_HARVEST']);
export const INK_STYLE_BY_CARD:Readonly<Record<string,{family:InkFamily;group:boolean}>>=Object.freeze(Object.fromEntries(Object.values(CARD_BY_ID).map(card=>[card.id,{family:card.kind==='EQUIPMENT'?'equip':CARD_FAMILIES[card.id],group:GROUP_CARDS.has(card.id)}])));

const PIXEL_GLYPHS:Record<string,string[]>={
      heal:['00011000','00011000','11111111','11111111','00011000','00011000'],
      chain:['01110000','11011000','10001100','11011011','01101101','00011011','00001110'],
      steal:['0011100','0100010','0000010','0001110','0011000','0110000','1100000'],
      break:['1000001','0100010','0010100','0001000','0010100','0100010','1000001'],
      draw:['11111000','10001000','10111111','10100001','11100101','00100001','00111111'],
      delayed:['1111111','0100010','0010100','0001000','0011100','0111110','1111111'],
      duel:['11000011','01100110','00111100','00011000','00111100','01011010','10000001'],
      arrows:['0101010','1111111','0101010','0101010','0101010','0101010','0101010'],
      banner:['1111100','1010110','1111100','1000000','1000000','1000000','1000000'],
      harvest:['0010000','1010100','0111000','1010100','0111000','0010000','0010000'],
      negate:['0011100','0100010','1001011','1010101','1101001','0100010','0011100'],
      shield:['1111111','1000001','1001001','1001001','0101010','0011100','0001000']
    };

/** Presentation only: public snapshots and events never mutate game state. */
export class CourtyardScene {
  onLayout?: (layout: SceneLayout) => void;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-14, 14, 10, -10, .1, 120);
  private world = new THREE.Group();
  private scenery = new THREE.Group();
  private table = new THREE.Group();
  private players = new Map<string, THREE.Group>();
  private heroEffects = new Map<string,Effect>();
  private vfx: VFX | null = null;
  private vfxLive = false;
  private heroAtlas: THREE.Texture | null = null;
  private surfaces = courtyardTextures();
  private cube = new THREE.BoxGeometry(1, 1, 1);
  private materials = new Map<string, THREE.MeshStandardMaterial>();
  private effects = new Set<Effect>();
  private textures = new Set<THREE.Texture>();
  private sharedGeometries = new Set<THREE.BufferGeometry>();
  private effectGeometry = new Map<string, THREE.BufferGeometry>();
  private damageTextures = new Map<number, THREE.Texture>();
  private resize: ResizeObserver;
  private frame = 0;
  private last = 0;
  private dirty = false;
  private cadenceAt = 0;
  private width = 0;
  private height = 0;
  private fitKey = '';
  private stateKey = '';
  private qualityTier: 0 | 1 | 2 = 0;
  private qualityFrames = 0;
  private qualityCost = 0;
  private qualityLate = 0;
  private heavyWindows = 0;
  private lightWindows = 0;
  private qualityChangedAt = 0;
  private moon: THREE.DirectionalLight | null = null;
  private disposed = false;
  private reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private mobile = matchMedia('(pointer: coarse)').matches;
  private cardBack: THREE.Texture | null = null;
  private cardAtlas: THREE.Texture | null = null;
  private state: RoomSnapshot | null = null;
  private viewer = '';
  private geometry: SceneLayout = { seats: {}, table: { left: .1, top: .2, width: .8, height: .6 }, center: { x: .5, y: .5 } };
  private layoutKey = '';
  private onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(this.frame); this.frame = 0;
      this.last = this.cadenceAt = 0;
      this.qualityFrames = this.qualityCost = this.qualityLate = this.heavyWindows = this.lightWindows = 0;
      for (const effect of [...this.effects]) this.release(effect);
      this.vfx?.clear();
    } else { this.last = this.cadenceAt = 0; this.draw(); }
  };

  constructor(private host: HTMLElement, private showcase = false) {
    const cores = navigator.hardwareConcurrency || 0, memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 0;
    this.qualityTier = cores > 0 && cores <= 2 || memory > 0 && memory <= 2 ? 2 : this.mobile || cores > 0 && cores <= 4 || memory > 0 && memory <= 4 ? 1 : 0;
    this.qualityChangedAt = performance.now();
    this.resize = new ResizeObserver(() => this.fit());
    this.scene.add(this.world); this.world.add(this.scenery, this.table);
    for(const texture of Object.values(this.surfaces))this.textures.add(texture);
    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.shadowMap.autoUpdate = false;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.applyQuality();
      this.renderer.domElement.setAttribute('aria-hidden', 'true');
      this.renderer.domElement.style.pointerEvents = 'none';
      this.host.append(this.renderer.domElement);
      this.scene.add(new THREE.HemisphereLight('#95b2cd', '#171d27', 1.15));
      const moon = new THREE.DirectionalLight('#a8c9eb', 1.8);
      this.moon = moon;
      moon.position.set(-8, 17, 8); moon.castShadow = !this.mobile;
      moon.shadow.mapSize.set(1024, 1024);
      moon.shadow.camera.left = moon.shadow.camera.bottom = -17;
      moon.shadow.camera.right = moon.shadow.camera.top = 17;
      this.scene.add(moon);
      const lantern = new THREE.PointLight('#ffbf75', 54, 26, 1.8);
      lantern.position.set(0, 5, -3); this.scene.add(lantern);
      this.vfx=new VFX(this.world,this.mobile);this.vfx.setQuality(this.qualityTier);this.vfx.onSpawn=()=>this.draw();
      this.build(); this.resize.observe(host);
      document.addEventListener('visibilitychange', this.onVisibility);
      this.fit();
    } catch {
      cancelAnimationFrame(this.frame); this.frame = 0;
      this.host.classList.add('scene-fallback');
      this.renderer?.domElement.remove(); this.renderer?.dispose(); this.renderer = null;
      this.resize.observe(host); this.fit();
    }
  }

  private mat(color: string, emissive = false): THREE.MeshStandardMaterial {
    const key = color + (emissive ? '-light' : '');
    if (!this.materials.has(key)) this.materials.set(key, new THREE.MeshStandardMaterial({
      color, roughness: .92, metalness: emissive ? 0 : .12, flatShading: true,
      emissive: emissive ? color : '#000000', emissiveIntensity: emissive ? 1.1 : 0,
    }));
    return this.materials.get(key)!;
  }
  private block(x: number, y: number, z: number, w: number, h: number, d: number, color: string, parent: THREE.Group): THREE.Mesh {
    const mesh = new THREE.Mesh(this.cube, this.mat(color));
    mesh.position.set(x, y, z); mesh.scale.set(w, h, d);
    mesh.castShadow = mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  private batchBlocks(parent: THREE.Group): void {
    const batches = new Map<THREE.Material, THREE.Mesh[]>();
    for (const child of parent.children) {
      if (!(child instanceof THREE.Mesh) || child instanceof THREE.InstancedMesh || child.geometry !== this.cube || Array.isArray(child.material)) continue;
      const batch = batches.get(child.material) || []; batch.push(child); batches.set(child.material, batch);
    }
    for (const [material, blocks] of batches) {
      if (blocks.length < 2) continue;
      const batch = new THREE.InstancedMesh(this.cube, material, blocks.length);
      blocks.forEach((block, index) => { block.updateMatrix(); batch.setMatrixAt(index, block.matrix); parent.remove(block); });
      batch.castShadow = batch.receiveShadow = true; batch.computeBoundingSphere(); parent.add(batch);
    }
  }
  private cachedGeometry(key: string, create: () => THREE.BufferGeometry): THREE.BufferGeometry {
    let geometry = this.effectGeometry.get(key);
    if (!geometry) { geometry = create(); this.effectGeometry.set(key, geometry); this.sharedGeometries.add(geometry); }
    return geometry;
  }
  private boxGeometry(w: number, h: number, d: number): THREE.BufferGeometry {
    return this.cachedGeometry(`box:${w}:${h}:${d}`, () => new THREE.BoxGeometry(w, h, d));
  }
  private shadowChanged(): void { if (this.renderer?.shadowMap.enabled) this.renderer.shadowMap.needsUpdate = true; }
  private applyQuality(): void {
    if (!this.renderer) return;
    this.vfx?.setQuality(this.qualityTier);
    const ratio = Math.min(devicePixelRatio || 1, this.qualityTier === 2 ? .75 : this.qualityTier === 1 || this.mobile ? 1 : 1.25);
    if (this.renderer.getPixelRatio() !== ratio) this.renderer.setPixelRatio(ratio);
    const shadows = !this.mobile && this.qualityTier === 0;
    if (this.renderer.shadowMap.enabled !== shadows) {
      this.renderer.shadowMap.enabled = shadows;
      if (!shadows && this.moon?.shadow.map) { this.moon.shadow.map.dispose(); this.moon.shadow.map = null; }
      const materials = new Set<THREE.Material>(this.materials.values());
      this.scene.traverse(object => { const material = (object as THREE.Mesh).material; if (Array.isArray(material)) material.forEach(item => materials.add(item)); else if (material) materials.add(material); });
      for (const material of materials) if (material instanceof THREE.MeshStandardMaterial) material.needsUpdate = true;
      this.shadowChanged();
    }
    this.draw();
  }
  private sampleQuality(cost: number, cadence: number, now: number): void {
    if (!cadence) return;
    this.qualityCost += cost; this.qualityLate += cadence > 24 ? 1 : 0;
    if (++this.qualityFrames < 60) return;
    const costAverage = this.qualityCost / this.qualityFrames, lateRate = this.qualityLate / this.qualityFrames;
    this.heavyWindows = costAverage > 10 || lateRate > .25 ? this.heavyWindows + 1 : 0;
    this.lightWindows = costAverage < 5 && lateRate < .05 ? this.lightWindows + 1 : 0;
    this.qualityFrames = this.qualityCost = this.qualityLate = 0;
    // CPU submission time and observed cadence are heuristics, not GPU utilization.
    if (this.heavyWindows >= 2 && this.qualityTier < 2 && now - this.qualityChangedAt > 4000) {
      this.qualityTier = (this.qualityTier + 1) as 1 | 2;
    } else if (this.lightWindows >= 6 && this.qualityTier > 0 && now - this.qualityChangedAt > 12000) {
      this.qualityTier = (this.qualityTier - 1) as 0 | 1;
    } else return;
    this.heavyWindows = this.lightWindows = 0; this.qualityChangedAt = now; this.applyQuality();
  }
  private loadTexture(path: string, done: (texture: THREE.Texture) => void): void {
    new THREE.TextureLoader().load(path, texture => {
      if (this.disposed) { texture.dispose(); return; }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = texture.magFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;
      this.textures.add(texture); done(texture); this.draw();
    }, undefined, () => {});
  }
  private surface(parent:THREE.Group,width:number,height:number,texture:THREE.Texture,x:number,y:number,z:number,unlit=false,opacity=1):THREE.Mesh {
    const material=unlit?new THREE.MeshBasicMaterial({map:texture,transparent:true,opacity,depthWrite:false,toneMapped:false}):new THREE.MeshStandardMaterial({map:texture,roughness:.94,metalness:0,transparent:opacity<1,opacity});
    const mesh=new THREE.Mesh(this.cachedGeometry(`surface:${width}:${height}`,()=>new THREE.PlaneGeometry(width,height)),material);
    mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);mesh.receiveShadow=!unlit;parent.add(mesh);return mesh;
  }
  private build(): void {
    this.block(0, -.3, 0, 25, .5, 23, '#14272b', this.scenery);
    const tiles = new THREE.InstancedMesh(this.cube, this.mat('#263c40'), 168);
    const matrix = new THREE.Matrix4(); let index = 0;
    for (let x = -10; x < 11; x += 1.5) for (let z = -9; z < 9; z += 1.5) {
      if (index === 168) break;
      matrix.compose(new THREE.Vector3(x, -.03, z), new THREE.Quaternion(), new THREE.Vector3(1.4, .05, 1.4));
      tiles.setMatrixAt(index++, matrix);
    }
    tiles.count = index; tiles.receiveShadow = true; this.scenery.add(tiles);
    this.block(0, .05, -9, 17, .3, 3.5, '#59635a', this.scenery);
    for (const x of [-7, -3.5, 0, 3.5, 7]) this.block(x, 1.9, -10, .3, 3.8, .3, '#6c4336', this.scenery);
    for (let level = 0; level < 5; level++) this.block(0, 3.9 + level * .22, -10, 18 - level * 2, .25, 4 - level * .55, level % 2 ? '#233c48' : '#31525a', this.scenery);
    for (const x of [-10, 10]) for (const z of [-6, 6]) {
      this.block(x, .9, z, .36, 1.8, .36, '#4d4535', this.scenery);
      this.block(x, 2.1, z, 1.6, 1, 1.7, '#23453c', this.scenery);
      this.block(x - .25, 2.8, z, 1.2, .5, 1.3, '#335d4c', this.scenery);
    }
    for (const x of [-8.4, 8.4]) for (const z of [-5.3, 5.3]) {
      this.block(x, .9, z, .16, 1.8, .16, '#7c563b', this.scenery);
      this.block(x, 1.95, z, .65, .75, .65, '#dea457', this.scenery).material = this.mat('#edb865', true);
      this.block(x, 2.36, z, .85, .12, .85, '#513d2e', this.scenery);
      this.block(x, 1.52, z, .85, .12, .85, '#513d2e', this.scenery);
      this.surface(this.scenery,4.4,4.4,this.surfaces.glow,x,.04,z,true,.65);
    }
    for (const x of [-5.3, 5.3]) for (const z of [-2.8, 2.8]) {
      this.block(x, .91, z, .65, .38, .65, '#4d3129', this.table);
      this.block(x, .74, z, .87, .12, .87, '#a97943', this.table);
    }
    this.block(0, 1.17, 0, 13.2, .46, 7.8, '#62432e', this.table);
    this.block(0, 1.41, 0, 13.35, .08, 7.95, '#ad854a', this.table);
    this.block(0, 1.47, 0, 13.05, .06, 7.65, '#59412f', this.table);
    this.surface(this.table,12.95,7.55,this.surfaces.wood,0,1.512,0);
    this.block(0,1.533,0,9.6,.025,5.85,'#756647',this.table);
    this.surface(this.table,9.5,5.75,this.surfaces.map,0,1.551,0);
    this.surface(this.table,1.5,1.6,this.surfaces.contact,-1.1,1.575,-.25,true,.7);
    for(const x of [-4.85,4.85])this.block(x,1.58,0,.10,.10,5.9,'#86643c',this.table);
    // Static map weights, bronze brackets and supply markers stay cheap to render.
    for(const x of [-5.9,5.9])for(const z of [-3.25,3.25]){
      this.block(x,1.57,z,.55,.08,.20,'#b99858',this.table);
      this.block(x,1.58,z,.20,.08,.55,'#b99858',this.table);
    }
    for(const [x,z,color] of [[-3.6,-1.25,'#86453c'],[3.4,1.5,'#4a6c63'],[2.8,-1.6,'#4d627d']] as [number,number,string][]){
      this.block(x,1.63,z,.25,.12,.25,color,this.table);
      this.block(x,1.83,z,.035,.43,.035,'#97774c',this.table);
      this.block(x+.11,1.94,z,.23,.18,.025,color,this.table);
    }
    for (const x of [-6.43, 6.43]) for (const z of [-3.65, 3.65]) this.block(x, 1.57, z, .4, .07, .4, '#e6be75', this.table);
    for (const z of [-3.79, 3.79]) for (let x = -5.8; x <= 5.8; x += .65) this.block(x, 1.58, z, .24, .06, .11, '#cda362', this.table);
    for (let i = 0; i < 7; i++) this.block(-1.1, 1.61 + i * .028, -.25, .75, .028, 1.06, i === 6 ? '#9b713d' : '#decdaa', this.table);
    this.loadTexture('/art/card-back.png', texture => {
      this.cardBack = texture;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(.73, 1.02), new THREE.MeshStandardMaterial({ map: texture, roughness: 1 }));
      face.rotation.x = -Math.PI / 2; face.position.set(-1.1, 1.81, -.25); this.table.add(face);
    });
    this.loadTexture('/art/cards-atlas.png', texture => { this.cardAtlas = texture; });
    this.loadTexture('/art/heroes-standing-atlas.png',texture=>{
      this.heroAtlas=texture;
      for(const group of this.players.values()){
        const sprite=group.userData.sprite as THREE.Mesh<THREE.PlaneGeometry,THREE.MeshBasicMaterial>;
        sprite.material.map=texture;sprite.material.color.set(this.state?.players[group.userData.playerId]?.isAlive===false?'#718087':'#ffffff');sprite.material.needsUpdate=true;sprite.visible=true;
      }
    });
    this.batchBlocks(this.scenery); this.batchBlocks(this.table); this.shadowChanged();
    if (this.showcase) for (let i = 0; i < 6; i++) {
      const token = this.createToken('show-' + i, ['#b6373a', '#365aa4', '#327353', '#be893c'][i % 4],HEROES[i].id);
      const angle = i / 6 * Math.PI * 2; token.position.set(Math.sin(angle) * 7.6, 0, Math.cos(angle) * 5.1);
      (token.userData.billboard as THREE.Group).quaternion.copy(this.camera.quaternion);
    }
  }
  private heroGeometry(heroId:string):THREE.PlaneGeometry {
    const index=HERO_BY_ID[canonicalHero(heroId)]?.art||0;
    return this.cachedGeometry(`hero:${index}`,()=>{
      // Guo Jia's atlas cell contains the edge of Zhang Liao's cloak on its left.
      // Trim the sampled region and its geometry together to preserve sprite proportions.
      const inset=.008,left=canonicalHero(heroId)==='GUO_JIA'?.14:inset,right=1-inset;
      const plane=new THREE.PlaneGeometry(1.7*(right-left)/(1-2*inset),2.05),uv=plane.getAttribute('uv'),col=index%4,row=Math.floor(index/4);
      plane.translate(1.7*(left-inset)/(2*(1-2*inset)),0,0);
      for(let i=0;i<uv.count;i++)uv.setXY(i,(col+left+uv.getX(i)*(right-left))/4,1-(row+1-inset-uv.getY(i)*(1-2*inset))/5);
      return plane;
    }) as THREE.PlaneGeometry;
  }
  private createToken(id: string, color: string,heroId='CAO_CAO'): THREE.Group {
    const group = new THREE.Group();
    const contact=this.surface(group,1.65,1.4,this.surfaces.contact,0,.035,0,true,.9);
    this.block(0,.15,0,1.03,.18,.83,'#242e32',group);
    this.block(0,.255,0,.97,.035,.77,'#a48750',group);
    this.block(0,.295,0,.87,.055,.67,'#3b4545',group);
    const aura=this.fxMesh(this.cachedGeometry('hero-aura',()=>new THREE.RingGeometry(.51,.55,16)),color,.8);
    aura.rotation.x=-Math.PI/2;aura.position.y=.34;aura.visible=false;group.add(aura);
    const billboard=new THREE.Group(),pose=new THREE.Group();billboard.position.y=1.30;billboard.quaternion.copy(this.camera.quaternion);billboard.add(pose);group.add(billboard);
    const sprite=new THREE.Mesh(this.heroGeometry(heroId),new THREE.MeshBasicMaterial({map:this.heroAtlas,transparent:true,alphaTest:.25,depthWrite:false,side:THREE.DoubleSide,color:this.heroAtlas?'#ffffff':color}));
    sprite.renderOrder=2;pose.add(sprite);
    sprite.visible=!!this.heroAtlas;
    group.userData={playerId:id,heroId,pose,sprite,billboard,aura,ownedMaterials:[contact.material,aura.material,sprite.material]};
    this.world.add(group); this.players.set(id, group); return group;
  }
  update(state: RoomSnapshot, myId?: string): void {
    const previous=this.state,oldTurn=previous?.currentTurnPlayerId;
    this.state = state; if (myId) this.viewer = myId;
    const key = JSON.stringify([this.viewer, state.currentTurnPlayerId, state.turnOrder.map(id => [id, canonicalHero(state.players[id]?.character), state.players[id]?.isAlive])]);
    if (key === this.stateKey) return; this.stateKey = key;
    for (const [id, group] of this.players) if (!state.turnOrder.includes(id) || !state.players[id]) {
      const poseEffect=this.heroEffects.get(id);if(poseEffect)this.release(poseEffect);
      for(const material of group.userData.ownedMaterials||[])material.dispose();
      this.world.remove(group); this.players.delete(id);
    }
    for (const id of state.turnOrder) {
      const player = state.players[id]; if (!player) continue;
      const hero = HERO_BY_ID[canonicalHero(player.character)], color = hero ? FACTIONS[hero.faction].color : '#6b7671';
      let token = this.players.get(id); if (!token) token = this.createToken(id, color,hero?.id);
      if(token.userData.heroId!==hero?.id){token.userData.heroId=hero?.id;(token.userData.sprite as THREE.Mesh).geometry=this.heroGeometry(hero?.id||'CAO_CAO');}
      (token.userData.sprite as THREE.Mesh<THREE.PlaneGeometry,THREE.MeshBasicMaterial>).material.color.set(player.isAlive?'#ffffff':'#718087');
      (token.userData.aura as THREE.Mesh).visible=player.isAlive&&state.currentTurnPlayerId===id;
      if(!this.heroEffects.has(id))this.restHero(id);
      token.scale.setScalar(this.tokenScale(id));
    }
    this.fit(); this.shadowChanged(); this.draw();
    for(const id of state.turnOrder)if(previous?.players[id]?.isAlive&&!state.players[id]?.isAlive)this.animateHero(id,'DEATH');
    if(oldTurn!==state.currentTurnPlayerId&&state.status==='PLAYING')this.animateHero(state.currentTurnPlayerId,'READY');
  }
  layout(): SceneLayout { return this.geometry; }
  setViewPlayerId(id: string): void { if (id === this.viewer) return; this.viewer = id; this.fit(); }
  setEffectsReduced(reduced: boolean): void { if(this.reduced === reduced)return; this.reduced = reduced; for (const effect of [...this.effects]) this.release(effect);if(reduced)this.vfx?.clear(); this.draw(); }
  private seatLayout(w: number, h: number): Record<string, { x: number; y: number }> {
    if (!this.state) return {};
    const order = this.state.turnOrder.filter(id => this.state!.players[id]);
    const viewer = order.includes(this.viewer) ? this.viewer : order[0], start = order.indexOf(viewer);
    const ids = [...order.slice(start), ...order.slice(0, start)], opponents = ids.length - 1;
    const topCount = opponents >= 7 ? (opponents % 2 ? 3 : 2) : (opponents % 2 ? 1 : 2);
    const sideCount = Math.max(0, (opponents - topCount) / 2), short = h < 250, portrait = w < 600 && !short;
    const sideX = short ? .095 : portrait ? .13 : .115;
    const topY = short ? Math.min(.18, 25 / h) : portrait ? .075 : .09;
    const topXs = topCount === 1 ? [.5] : topCount === 2 ? (short ? [.37, .63] : [.32, .68]) : (short ? [.32, .5, .68] : [.16, .5, .84]);
    const sideYs = sideCount === 1 ? [.47] : sideCount === 2 ? [.34, .7] : short ? [.18, .5, .82] : [.3, .51, .72];
    const anchors = [{ x: .5, y: short ? .86 : .9 }];
    for (const y of [...sideYs.slice(0, sideCount)].reverse()) anchors.push({ x: sideX, y });
    for (const x of topXs.slice(0, Math.min(topCount, opponents))) anchors.push({ x, y: topY });
    for (const y of sideYs.slice(0, sideCount)) anchors.push({ x: 1 - sideX, y });
    return Object.fromEntries(ids.map((id, index) => [id, anchors[index] || { x: .5, y: .5 }]));
  }
  private atScreen(x: number, y: number, elevation = .7): THREE.Vector3 {
    const ray = new THREE.Raycaster(); ray.setFromCamera(new THREE.Vector2(x * 2 - 1, 1 - y * 2), this.camera);
    return ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -elevation), new THREE.Vector3()) || new THREE.Vector3();
  }
  private tokenScale(id: string): number {
    return (this.height < 250 ? .32 : this.width < 600 ? .7 : .76) * (this.state?.currentTurnPlayerId === id ? 1.1 : 1);
  }
  private fit(): void {
    if (this.disposed) return;
    const w = this.host.clientWidth, h = Math.max(1, this.host.clientHeight); if (!w) return;
    const inputKey = JSON.stringify([w, h, this.viewer, this.state?.turnOrder.filter(id => this.state!.players[id])]);
    if (inputKey === this.fitKey) return; this.fitKey = inputKey;
    const resized = this.width !== w || this.height !== h;
    this.width = w; this.height = h;
    const short = h < 250 && !this.showcase, pitch = this.showcase ? .78 : short ? .18 : w < 600 ? .76 : .62;
    if (resized) {
      this.camera.position.set(0, 1.23 + Math.sin(pitch) * 34, Math.cos(pitch) * 34); this.camera.lookAt(0, 1.23, 0); this.camera.updateMatrixWorld();
      const box = this.showcase ? new THREE.Box3(new THREE.Vector3(-11, -.5, -12), new THREE.Vector3(11, 5.2, 8)) : new THREE.Box3(new THREE.Vector3(-6.75, .67, -4.05), new THREE.Vector3(6.75, 1.83, 4.05));
      const corners: THREE.Vector3[] = [];
      for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) corners.push(new THREE.Vector3(x, y, z));
      const view = corners.map(point => point.clone().applyMatrix4(this.camera.matrixWorldInverse));
      const minX = Math.min(...view.map(p => p.x)), maxX = Math.max(...view.map(p => p.x)), minY = Math.min(...view.map(p => p.y)), maxY = Math.max(...view.map(p => p.y));
      const aspect = w / h, padding = this.showcase ? 1.08 : short ? 1.09 : 1.18;
      const width = Math.max((maxX - minX) * padding, (maxY - minY) * padding * aspect), height = width / aspect, cy = (minY + maxY) / 2;
      this.camera.left = -width / 2; this.camera.right = width / 2; this.camera.top = cy + height / 2; this.camera.bottom = cy - height / 2; this.camera.updateProjectionMatrix();
      this.renderer?.setSize(w, h); this.scenery.visible = this.showcase || !short;
      const projected = corners.map(point => point.clone().project(this.camera));
      const left = (Math.min(...projected.map(p => p.x)) + 1) / 2, right = (Math.max(...projected.map(p => p.x)) + 1) / 2;
      const top = (1 - Math.max(...projected.map(p => p.y))) / 2, bottom = (1 - Math.min(...projected.map(p => p.y))) / 2;
      this.geometry = { seats: {}, table: { left, top, width: right - left, height: bottom - top }, center: { x: .5, y: short ? .65 : .5 } };
    }
    this.geometry.seats = this.seatLayout(w, h);
    if (this.state) for (const [id, anchor] of Object.entries(this.geometry.seats)) {
      const token = this.players.get(id); if (!token) continue;
      // Miniature bases rest on the tabletop; HUD anchors remain independently readable.
      const side=anchor.x<.145||anchor.x>.855;
      const x=side?(anchor.x<.5?-5.55:5.55):id===this.viewer?0:(anchor.x-.5)*10.5;
      const z=side?THREE.MathUtils.clamp((anchor.y-.5)/(short ? .32 : .21)*2.2,-2.4,2.4):id===this.viewer?3.15:-2.95;
      token.scale.setScalar(this.tokenScale(id));token.position.set(x,1.59,z);token.rotation.y=0;
      (token.userData.billboard as THREE.Group).quaternion.copy(this.camera.quaternion);
    }
    if(this.showcase)for(const token of this.players.values())(token.userData.billboard as THREE.Group).quaternion.copy(this.camera.quaternion);
    const key = JSON.stringify([w, h, this.geometry]);
    if (key !== this.layoutKey) { this.layoutKey = key; this.host.dataset.tableBounds = JSON.stringify(this.geometry.table); this.onLayout?.(this.geometry); }
    this.shadowChanged(); this.draw();
  }
  private origin(id?: string): THREE.Vector3 {
    const token=id?this.players.get(id):null;if(token)return token.position.clone().add(new THREE.Vector3(0,1.2*token.scale.y,0));
    const anchor = id ? this.geometry.seats[id] : null;
    return anchor ? this.atScreen(anchor.x, anchor.y, 1.8) : this.atScreen(.5, .5, 1.8);
  }
  private restHero(id:string):void {
    const token=this.players.get(id);if(!token)return;
    const pose=token.userData.pose as THREE.Group,dead=this.state?.players[id]?.isAlive===false;
    pose.position.set(0,dead?-.65:0,0);pose.rotation.set(0,0,dead?-1.35:0);pose.scale.setScalar(dead ? .82 : 1);
  }
  private animateHero(id:string,action:'READY'|'ATTACK'|'HURT'|'DEATH',targetId?:string):void {
    const token=this.players.get(id);if(!token)return;
    const prior=this.heroEffects.get(id);if(prior)this.release(prior);
    if(this.reduced){this.restHero(id);return;}
    const duration=action==='DEATH' ? .85 : .6,effect=this.effect(duration,action==='DEATH'?2:1);if(!effect)return;
    const pose=token.userData.pose as THREE.Group;pose.position.set(0,0,0);pose.rotation.set(0,0,0);pose.scale.setScalar(1);
    this.heroEffects.set(id,effect);
    effect.cleanup=()=>{if(this.heroEffects.get(id)===effect){this.heroEffects.delete(id);this.restHero(id);}};
    if(action==='DEATH'){
      effect.timeline.to(pose.rotation,{z:-1.35,duration:.6,ease:'power2.in'},0);
      effect.timeline.to(pose.position,{y:-.65,duration:.6,ease:'power2.in'},0);
      effect.timeline.to(pose.scale,{x:.82,y:.82,z:.82,duration:.6},0);
    }else if(action==='HURT'){
      effect.timeline.to(pose.position,{x:-.16,duration:.06},0).to(pose.position,{x:.13,duration:.07},.06).to(pose.position,{x:-.07,duration:.08},.13).to(pose.position,{x:0,duration:.14},.21);
      effect.timeline.to(pose.rotation,{z:.1,duration:.1},0).to(pose.rotation,{z:0,duration:.2},.18);
    }else if(action==='ATTACK'){
      const direction=(this.geometry.seats[targetId||'']?.x||.5)>=(this.geometry.seats[id]?.x||.5)?1:-1;
      effect.timeline.to(pose.position,{x:direction*.28,y:.09,duration:.15,ease:'power2.in'},0).to(pose.position,{x:0,y:0,duration:.28,ease:'power2.out'},.22);
      effect.timeline.to(pose.rotation,{z:-direction*.09,duration:.15},0).to(pose.rotation,{z:0,duration:.25},.22);
    }else{
      effect.timeline.to(pose.position,{y:.11,duration:.2,ease:'power2.out'},0).to(pose.position,{y:0,duration:.3},.23);
    }
  }
  private heroSignature(playerId:string,targets:string[]):void {
    const hero=HERO_BY_ID[canonicalHero(this.state?.players[playerId]?.character)],source=this.origin(playerId);
    const scholar=['ZHUGE_LIANG','SIMA_YI','GUO_JIA','HUANG_YUEYING'].includes(hero?.id||'');
    this.vfx?.sigil(source,INK.gold,scholar);
    if(['GUAN_YU','ZHANG_FEI','ZHAO_YUN','LV_BU','ZHANG_LIAO'].includes(hero?.id||''))this.slash(source,INK.black,1.25);
    for(const id of targets)if(id!==playerId)this.trail(source,this.origin(id),INK.gold,.65,.34);
  }
  private effect(duration: number,priority=0): Effect | null {
    if (!this.renderer || this.disposed || document.hidden) return null;
    const limit = this.qualityTier===2?10:this.mobile || this.width < 600 ? 14 : 22;
    if (this.effects.size >= limit){
      let victim:Effect|undefined;
      for(const candidate of this.effects)if(!victim||candidate.priority<victim.priority)victim=candidate;
      if(!victim||victim.priority>priority)return null;
      this.release(victim);
    }
    const effect: Effect = { group: new THREE.Group(), timeline: gsap.timeline(),priority };
    this.world.add(effect.group); this.effects.add(effect); effect.timeline.call(() => this.release(effect), [], duration); this.draw(); return effect;
  }
  private release(effect: Effect): void {
    if (!this.effects.delete(effect)) return;
    effect.cleanup?.();
    effect.timeline.kill(); this.world.remove(effect.group);
    effect.group.traverse(object => {
      const mesh = object as THREE.Mesh; if (mesh.geometry && !this.sharedGeometries.has(mesh.geometry)) mesh.geometry.dispose();
      for (const material of Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : []) {
        const texture = (material as THREE.MeshBasicMaterial).map; if (texture && !this.textures.has(texture)) texture.dispose(); material.dispose();
      }
    }); this.draw();
  }
  private fxMesh(geometry: THREE.BufferGeometry, color: string, opacity = 1): THREE.Mesh {
    return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide }));
  }
  private ring(point: THREE.Vector3, color: string, size = .7, reduced = false): void {
    if(!reduced&&this.vfx){this.vfx.ring(point,color,size);return;}
    const effect = this.effect(reduced ? .55 : .85); if (!effect) return;
    const ring = this.fxMesh(this.cachedGeometry(`ring:${size}`, () => new THREE.RingGeometry(size * .82, size, 8)), color, .85); ring.rotation.x = -Math.PI / 2; ring.position.copy(point); effect.group.add(ring);
    if (!reduced) effect.timeline.fromTo(ring.scale, { x: .5, y: .5, z: .5 }, { x: 1.8, y: 1.8, z: 1.8, duration: .65, ease: 'power2.out' }, 0);
    effect.timeline.to(ring.material, { opacity: 0, duration: .25 }, reduced ? .3 : .6);
  }
  private flash(point:THREE.Vector3,color:string,size=1):void {this.vfx?.flash(point,color,size);}
  private sparks(point: THREE.Vector3, color: string, count = 12, spread = 1, duration = .65): void {
    this.vfx?.sparks(point,color,count,spread,duration);
  }
  private trail(from: THREE.Vector3, to: THREE.Vector3, color: string, arc = .8, duration = .38): void {
    this.vfx?.trail(from,to,color,arc,duration);
  }
  private slash(point: THREE.Vector3,color='#f2e4bb',scale=1): void {
    this.vfx?.slash(point,color,scale);
  }
  private thunder(point: THREE.Vector3): void {
    this.vfx?.thunder(point);
  }
  private fire(point: THREE.Vector3): void {
    this.vfx?.fire(point);
  }
  private damageLabel(point: THREE.Vector3, damage: number, targetId?: string): void {
    if (!Number.isFinite(damage) || damage <= 0) return;
    const effect = this.effect(.95,3); if (!effect) return;
    const value = Math.min(99, Math.round(damage));
    let texture = this.damageTextures.get(value);
    if (!texture) {
      const canvas = document.createElement('canvas'); canvas.width = 160; canvas.height = 96;
      const context = canvas.getContext('2d'); if (!context) { this.release(effect); return; }
      context.font = 'bold 70px sans-serif'; context.textAlign = 'center'; context.textBaseline = 'middle';
      context.lineWidth = 7; context.strokeStyle = '#15252a'; context.fillStyle = '#ffe4b4';
      context.strokeText('-' + value, 80, 48); context.fillText('-' + value, 80, 48);
      texture = new THREE.CanvasTexture(canvas); texture.minFilter = texture.magFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;
      if (value >= 1 && value <= 9) { this.damageTextures.set(value, texture); this.textures.add(texture); }
    }
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false });
    const anchor = targetId ? this.geometry.seats[targetId] : null;
    const labelPoint = anchor ? this.atScreen(Math.max(.04,Math.min(.96,anchor.x + (anchor.x >= .5 ? -1 : 1)*(this.host.clientWidth<900?62:90)/this.host.clientWidth)), anchor.y + .04, 1.8) : point;
    const label = new THREE.Sprite(material);label.renderOrder=30; this.sharedGeometries.add(label.geometry); label.position.copy(labelPoint); label.scale.set(1.25, .75, 1); effect.group.add(label);
    if (!this.reduced) effect.timeline.to(label.position, { y: label.position.y + .55, duration: .75, ease: 'power2.out' }, 0);
    effect.timeline.to(material, { opacity: 0, duration: .2 }, .72);
  }
  private shield(point:THREE.Vector3,color:string=INK.gold):void {this.vfx?.shield(point,color);}
  /** Small cached pixel silhouettes distinguish tactics without covering the table. */
  private glyph(point:THREE.Vector3,kind:string,color:string):void {
    const rows=PIXEL_GLYPHS[kind];if(!rows)return;
    const effect=this.effect(.6);if(!effect)return;
    const geometry=this.cachedGeometry('glyph:'+kind,()=>{
      const vertices:number[]=[],indices:number[]=[],step=.075;
      rows.forEach((row,y)=>[...row].forEach((pixel,x)=>{if(pixel!=='1')return;const n=vertices.length/3,l=(x-row.length/2)*step,t=(rows.length/2-y)*step;
        vertices.push(l,t,0,l+step,t,0,l+step,t-step,0,l,t-step,0);indices.push(n,n+1,n+2,n,n+2,n+3);
      }));
      const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setIndex(indices);return g;
    });
    const icon=this.fxMesh(geometry,kind==='heal'?INK.heal:INK.red,.85);icon.position.copy(point);icon.position.y+=.55;icon.quaternion.copy(this.camera.quaternion);effect.group.add(icon);
    effect.timeline.fromTo(icon.scale,{x:.6,y:.6,z:.6},{x:1,y:1,z:1,duration:.16,ease:'back.out(1.5)'},0);
    effect.timeline.to(icon.position,{y:icon.position.y+.22,duration:.55},0);effect.timeline.to(icon.material,{opacity:0,duration:.2},.35);
  }
  private heal(point:THREE.Vector3):void {this.vfx?.heal(point);}
  private flyingCard(data: any): void {
    const source = this.origin(data.playerId), center = this.atScreen(this.geometry.center.x, this.geometry.center.y, 1.85), effect = this.effect(.85,1); if (!effect) return;
    const group = new THREE.Group(); group.position.copy(source); effect.group.add(group);
    const landingShadow=this.surface(effect.group,1.15,1.5,this.surfaces.contact,center.x,1.57,center.z,true,0);
    effect.timeline.to(landingShadow.material,{opacity:.65,duration:.18},.35);effect.timeline.to(landingShadow.material,{opacity:0,duration:.25},.75);
    const body = this.fxMesh(this.boxGeometry(.72, .035, 1.02), '#efdfb4'); group.add(body);
    let texture = this.cardBack, geometry = this.cachedGeometry('card-back', () => new THREE.PlaneGeometry(.7, 1)); const definition = data.card && CARD_BY_ID[data.card.name];
    if (definition && this.cardAtlas) {
      texture = this.cardAtlas;
      geometry = this.cachedGeometry(`card:${definition.art}`, () => {
        const plane = new THREE.PlaneGeometry(.7, 1), uv = plane.getAttribute('uv'), index = definition.art, row = Math.floor(index / 7), cols = row === 4 ? 8 : 7, column = row === 4 ? (index === 34 ? 7 : index - 28) : index % 7;
        for (let i = 0; i < uv.count; i++) uv.setXY(i, (column + uv.getX(i)) / cols, 1 - (row + 1) / 6 + uv.getY(i) / 6);
        return plane;
      });
    }
    const material = new THREE.MeshBasicMaterial({ map: texture, color: texture ? '#ffffff' : '#bf9e66', side: THREE.DoubleSide, transparent: true, depthWrite: false });
    const face = new THREE.Mesh(geometry, material); face.rotation.x = -Math.PI / 2; face.position.y = .03; group.add(face); group.rotation.y = -.5;
    effect.timeline.to(group.position, { x: center.x, y: center.y, z: center.z, duration: .48, ease: 'power2.out' }, 0); effect.timeline.to(group.rotation, { y: .06, duration: .48 }, 0);
    effect.timeline.fromTo(group.scale, { x: .65, y: .65, z: .65 }, { x: 1.1, y: 1.1, z: 1.1, duration: .48 }, 0); effect.timeline.to(group.scale, { x: .95, y: .95, z: .95, duration: .12 }, .48);
    effect.timeline.to(material, { opacity: 0, duration: .2 }, .62); effect.timeline.to(body.material, { opacity: 0, duration: .2 }, .62);
  }
  /** Public accepted events only. Casts never fabricate hits or delay responses. */
  event(type:string,data:any):void {
    if(!data||!this.renderer||this.disposed||document.hidden)return;
    const name=String(data.cardName||data.skillId||''),defensive=type==='card_played'&&['DODGE','NEGATE'].includes(name);
    const targetId=defensive?data.playerId:data.targetId||data.targetPlayerId||data.playerId,target=this.origin(targetId);
    if(type==='damage_log')this.animateHero(targetId,'HURT');
    else if(type==='death')this.animateHero(targetId,'DEATH');
    else if(type==='card_played')this.animateHero(data.playerId,['SLASH','THUNDER_ATTACK','DUEL','FIRE_ATTACK'].includes(name)||data.kind==='SKILL'?'ATTACK':'READY',data.targetId||data.targetIds?.[0]);
    if(this.reduced){
      this.ring(target,type==='damage_log'?INK.red:['PEACH','PEACH_GARDEN'].includes(name)?INK.heal:INK.gold,.65,true);
      if(type==='damage_log')this.damageLabel(target,Number(data.damage),targetId);
      return;
    }
    if(type==='damage_log'){
      this.vfx?.impact(target,String(data.damageType||'NORMAL'));
      this.damageLabel(target,Number(data.damage),targetId);return;
    }
    if(type==='judgement_result'){this.vfx?.shield(target,data.isSuccess?INK.gold:INK.red);return;}
    if(type==='victory'){this.vfx?.victory(new THREE.Vector3(1.35,2,0));return;}
    if(type==='death'){this.vfx?.death(target);return;}
    if(type==='dying'){this.vfx?.dying(target);return;}
    if(['acquire','turn','prompt'].includes(type)){this.vfx?.ping(target,INK.gold);return;}
    if(type!=='card_played')return;
    const source=this.origin(data.playerId),targetIds:string[]=data.targetIds?.length?data.targetIds:data.targetId?[data.targetId]:[];
    if(data.kind==='SKILL'){
      this.heroSignature(data.playerId,targetIds);
      if(['QINGNANG','PLAN_SUPPLY','JIJIU'].includes(data.skillId))for(const point of targetIds.length?targetIds.map(id=>this.origin(id)):[source])this.heal(point);
      return;
    }
    this.flyingCard(data);
    const style=INK_STYLE_BY_CARD[name];if(!style)return;
    // Group cards own exactly one central cast. Real impacts arrive per victim.
    const castPoint=style.group?new THREE.Vector3(1.35,1.95,0):source;
    this.vfx?.cast(castPoint,style.family,style.group);
    if(style.group){this.trail(source,castPoint,INK.gold,.65,.3);return;}
    if(name==='NEGATE'){this.vfx?.negate(source);return;}
    if(name==='DODGE'){this.shield(source);return;}
    const points=targetIds.length?targetIds.map(id=>this.origin(id)):[source];
    if(name==='PEACH'||name==='WINE'&&data.kind==='RESPONSE'){for(const point of points)this.heal(point);return;}
    if(name==='WINE'){this.glyph(source,'banner',INK.gold);return;}
    for(const point of points)if(point.distanceTo(source)>.1)this.trail(source,point,INK.gold,.7,.34);
    const glyph=name==='IRON_CHAIN'?'chain':name==='STEAL'||name==='BORROWED_SWORD'?'steal':name==='SABOTAGE'?'break':name==='DUEL'?'duel':name==='EX_NIHILO'?'draw':CARD_BY_ID[name]?.kind==='DELAYED'?'delayed':style.family==='equip'?'shield':'';
    if(glyph)for(const point of points)this.glyph(point,glyph,INK.red);
  }
  private draw(): void {
    this.dirty = true;
    if (this.renderer && !this.disposed && !document.hidden && !this.frame) this.frame = requestAnimationFrame(this.loop);
  }
  private loop = (now: number): void => {
    this.frame = 0; if (this.disposed || document.hidden || !this.renderer) return;
    const interval = 1000 / 60, elapsed = now - this.last;
    const live=this.vfx?.isLive(now)??false;
    if(this.vfxLive&&!live)this.dirty=true;this.vfxLive=live;
    if (!this.last || elapsed >= interval - .5) {
      const animating = this.effects.size > 0||live;
      if (this.dirty || animating) {
        this.dirty = false;
        this.last = !this.last || elapsed < interval ? now : now - elapsed % interval;
        this.vfx?.update(now);
        const start = performance.now(); this.renderer.render(this.scene, this.camera); const cost = performance.now() - start;
        if (animating) { const cadence = this.cadenceAt ? now - this.cadenceAt : 0; this.cadenceAt = now; this.sampleQuality(cost, cadence, now); }
        else this.cadenceAt = 0;
      }
    }
    if (this.dirty || this.effects.size||live) { if (!this.frame) this.frame = requestAnimationFrame(this.loop); }
    else this.last = this.cadenceAt = 0;
  };
  dispose(): void {
    if (this.disposed) return; this.disposed = true; cancelAnimationFrame(this.frame); this.resize.disconnect(); document.removeEventListener('visibilitychange', this.onVisibility);
    for (const effect of [...this.effects]) this.release(effect);
    this.vfx?.dispose();this.vfx=null;
    const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
    this.scene.traverse(object => { if (object instanceof THREE.InstancedMesh) object.dispose(); const mesh = object as THREE.Mesh; if (mesh.geometry) geometries.add(mesh.geometry); if (mesh.material) for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) materials.add(material); });
    geometries.add(this.cube); for (const geometry of this.sharedGeometries) geometries.add(geometry); for (const material of this.materials.values()) materials.add(material);
    for (const geometry of geometries) geometry.dispose(); for (const material of materials) material.dispose(); for (const texture of this.textures) texture.dispose();
    for (const object of this.scene.children) if (object instanceof THREE.Light && 'shadow' in object) (object as THREE.DirectionalLight).shadow?.dispose();
    this.renderer?.dispose(); this.renderer?.domElement.remove(); this.players.clear();this.heroEffects.clear(); this.materials.clear(); this.textures.clear(); this.sharedGeometries.clear(); this.effectGeometry.clear(); this.damageTextures.clear(); this.onLayout = undefined;
  }
}
