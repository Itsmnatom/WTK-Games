import * as THREE from 'three';
import { gsap } from 'gsap';
import { CARD_BY_ID, HEROES, HERO_BY_ID, FACTIONS, canonicalHero } from '../../shared/catalog';
import { courtyardTextures } from './scene-textures';
import type { RoomSnapshot } from '../../shared/protocol';

export interface SceneLayout {
  seats: Record<string, { x: number; y: number }>;
  table: { left: number; top: number; width: number; height: number };
  center: { x: number; y: number };
}
type Effect = { group: THREE.Group; timeline: gsap.core.Timeline; cleanup?:()=>void };

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
  setEffectsReduced(reduced: boolean): void { if(this.reduced === reduced)return; this.reduced = reduced; for (const effect of [...this.effects]) this.release(effect); this.draw(); }
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
    const duration=action==='DEATH' ? .85 : .6,effect=this.effect(duration);if(!effect)return;
    const pose=token.userData.pose as THREE.Group;pose.position.set(0,0,0);pose.rotation.set(0,0,0);pose.scale.setScalar(1);
    this.heroEffects.set(id,effect);
    effect.cleanup=()=>{if(this.heroEffects.get(id)===effect){this.heroEffects.delete(id);this.restHero(id);}};
    if(action==='DEATH'){
      effect.timeline.to(pose.rotation,{z:-1.35,duration:.6,ease:'power2.in'},0);
      effect.timeline.to(pose.position,{y:-.65,duration:.6,ease:'power2.in'},0);
      effect.timeline.to(pose.scale,{x:.82,y:.82,z:.82,duration:.6},0);
    }else if(action==='HURT'){
      effect.timeline.to(pose.position,{x:-.16,duration:.06},0).to(pose.position,{x:.13,duration:.07}).to(pose.position,{x:-.07,duration:.08}).to(pose.position,{x:0,duration:.14});
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
    const hero=HERO_BY_ID[canonicalHero(this.state?.players[playerId]?.character)],source=this.origin(playerId),color=hero?FACTIONS[hero.faction].color:'#d8b775';
    const effect=this.effect(1.05);if(!effect)return;
    this.flash(source,color,2.2);
    const halo=this.fxMesh(this.cachedGeometry('signature-seal',()=>new THREE.RingGeometry(.94,1.02,8)),color,.9);
    halo.position.copy(source);halo.quaternion.copy(this.camera.quaternion);effect.group.add(halo);
    effect.timeline.fromTo(halo.scale,{x:.55,y:.55,z:.55},{x:1.6,y:1.6,z:1.6,duration:.65,ease:'power2.out'},0);
    effect.timeline.to(halo.rotation,{z:halo.rotation.z+.5,duration:.7},0);effect.timeline.to(halo.material,{opacity:0,duration:.3},.6);
    const scholar=['ZHUGE_LIANG','SIMA_YI','GUO_JIA','HUANG_YUEYING'].includes(hero?.id||'');
    const count=this.qualityTier===2?4:scholar?8:6;
    for(let i=0;i<count;i++){
      const angle=i/count*Math.PI*2,piece=this.fxMesh(this.boxGeometry(.08,scholar ? .08 : .22,.035),i%2?'#f2d7a2':color,.9);
      piece.position.copy(source);piece.quaternion.copy(this.camera.quaternion);effect.group.add(piece);
      effect.timeline.to(piece.position,{x:source.x+Math.cos(angle)*1.35,y:source.y+Math.sin(angle)*1.2,z:source.z,duration:.6,ease:'power2.out'},0);
      effect.timeline.to(piece.material,{opacity:0,duration:.3},.55);
    }
    if(['HUA_TUO','LIU_BEI'].includes(hero?.id||''))this.ring(source,'#9bd6b0',1.1);
    else if(['GUAN_YU','ZHANG_FEI','ZHAO_YUN','LV_BU','ZHANG_LIAO'].includes(hero?.id||''))this.slash(source,color,1.45);
    else if(['ZHOU_YU','HUANG_GAI','GAN_NING'].includes(hero?.id||''))this.sparks(source,'#f5ae68',9,1.3,.65);
    for(const target of targets)if(target!==playerId)this.trail(source,this.origin(target),color,.8,.42);
  }
  private effect(duration: number): Effect | null {
    if (!this.renderer || this.disposed || document.hidden) return null;
    const limit = this.mobile || this.width < 600 ? 9 : 18;
    if (this.effects.size >= limit) this.release(this.effects.values().next().value!);
    const effect: Effect = { group: new THREE.Group(), timeline: gsap.timeline() };
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
    const effect = this.effect(reduced ? .55 : .85); if (!effect) return;
    const ring = this.fxMesh(this.cachedGeometry(`ring:${size}`, () => new THREE.RingGeometry(size * .82, size, 8)), color, .85); ring.rotation.x = -Math.PI / 2; ring.position.copy(point); effect.group.add(ring);
    if (!reduced) effect.timeline.fromTo(ring.scale, { x: .5, y: .5, z: .5 }, { x: 1.8, y: 1.8, z: 1.8, duration: .65, ease: 'power2.out' }, 0);
    effect.timeline.to(ring.material, { opacity: 0, duration: .25 }, reduced ? .3 : .6);
  }
  private flash(point:THREE.Vector3,color:string,size=1):void {
    const effect=this.effect(.42);if(!effect)return;
    const material=new THREE.MeshBasicMaterial({map:this.surfaces.glow,color,transparent:true,opacity:.7,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false});
    const mesh=new THREE.Mesh(this.cachedGeometry('flash-plane',()=>new THREE.PlaneGeometry(2,2)),material);
    mesh.position.copy(point);mesh.quaternion.copy(this.camera.quaternion);mesh.scale.setScalar(size);effect.group.add(mesh);
    effect.timeline.fromTo(mesh.scale,{x:size*.6,y:size*.6,z:size*.6},{x:size,y:size,z:size,duration:.2},0);
    effect.timeline.to(material,{opacity:0,duration:.3},.08);
  }
  private sparks(point: THREE.Vector3, color: string, count = 12, spread = 1, duration = .65): void {
    const effect = this.effect(duration + .05); if (!effect) return;
    const density = Math.min(count, this.qualityTier === 2 ? 4 : this.qualityTier === 1 || this.mobile || this.width < 600 ? 7 : 13);
    for (let i = 0; i < density; i++) {
      const angle = i / density * Math.PI * 2, spark = this.fxMesh(this.boxGeometry(.09, .09, .09), color); spark.position.copy(point); effect.group.add(spark);
      effect.timeline.to(spark.position, { x: point.x + Math.sin(angle) * spread, y: point.y + .35 + (i % 3) * .22, z: point.z + Math.cos(angle) * spread, duration, ease: 'power2.out' }, 0);
      effect.timeline.to(spark.scale, { x: .1, y: .1, z: .1, duration: duration * .55 }, duration * .4);
      effect.timeline.to(spark.material, { opacity: 0, duration: duration * .5 }, duration * .5);
    }
  }
  private trail(from: THREE.Vector3, to: THREE.Vector3, color: string, arc = .8, duration = .38): void {
    const effect = this.effect(duration + .4); if (!effect) return;
    const mid = from.clone().lerp(to, .5); mid.y += arc;
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to), geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24)); geometry.setDrawRange(0, 1);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: .95, depthWrite: false }); effect.group.add(new THREE.Line(geometry, material));
    const head = this.fxMesh(this.boxGeometry(.14, .14, .14), color); head.position.copy(from); effect.group.add(head);
    const progress = { value: 0 };
    effect.timeline.to(progress, { value: 1, duration, ease: 'power2.in', onUpdate: () => { geometry.setDrawRange(0, Math.max(2, Math.ceil(progress.value * 25))); head.position.copy(curve.getPoint(progress.value)); } }, 0);
    effect.timeline.to(material, { opacity: 0, duration: .3 }, duration); effect.timeline.to(head.scale, { x: 0, y: 0, z: 0, duration: .18 }, duration);
  }
  private slash(point: THREE.Vector3,color='#f2e4bb',scale=1): void {
    const effect = this.effect(.48); if (!effect) return;
    const arc = this.fxMesh(this.cachedGeometry('slash', () => new THREE.RingGeometry(.48, .67, 9, 1, .15, Math.PI * 1.45)), color); arc.position.copy(point); arc.quaternion.copy(this.camera.quaternion);arc.scale.setScalar(scale); effect.group.add(arc);
    effect.timeline.fromTo(arc.rotation, { z: -.65 }, { z: .55, duration: .22, ease: 'power3.out' }, 0); effect.timeline.to(arc.material, { opacity: 0, duration: .2 }, .23);
    const echo=this.fxMesh(this.cachedGeometry('slash-echo',()=>new THREE.RingGeometry(.67,.73,12,1,.1,Math.PI*1.15)),color,.45);
    echo.position.copy(point);echo.quaternion.copy(this.camera.quaternion);echo.scale.setScalar(scale);effect.group.add(echo);
    effect.timeline.to(echo.rotation,{z:echo.rotation.z+.55,duration:.32},0);effect.timeline.to(echo.material,{opacity:0,duration:.28},.1);
  }
  private thunder(point: THREE.Vector3): void {
    const effect = this.effect(.6); if (!effect) return;
    for (const [offset, color] of [[0, '#d3f9ff'], [.55, '#64b6d4']] as [number, string][]) {
      const geometry = this.cachedGeometry(`thunder:${offset}`, () => {
        const points = [new THREE.Vector3(offset, 3, 0), new THREE.Vector3(.23, 2.2, 0), new THREE.Vector3(-.26, 1.55, 0), new THREE.Vector3(.12, .8, 0), new THREE.Vector3()];
        return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 18, offset ? .035 : .065, 4, false);
      });
      const bolt = this.fxMesh(geometry, color); bolt.position.copy(point);
      effect.group.add(bolt); effect.timeline.to(bolt.material, { opacity: 0, duration: .3 }, .13);
    }
    this.flash(point,'#85d9ff',1.2);this.sparks(point, '#b6f3ff', 13, .95, .5); this.ring(point, '#88cbd5', .7);
  }
  private fire(point: THREE.Vector3): void {
    const effect = this.effect(.8); if (!effect) return;
    const count = this.qualityTier === 2 ? 3 : this.mobile || this.qualityTier === 1 ? 4 : 7;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const flame = this.fxMesh(this.boxGeometry(.24, .65, .24), i % 2 ? '#ffd08b' : '#ef8a45', .9);
      flame.position.copy(point).add(new THREE.Vector3(Math.sin(angle) * .35, .18, Math.cos(angle) * .35));
      effect.group.add(flame);
      effect.timeline.fromTo(flame.scale, { x: .6, y: .25, z: .6 }, { x: .4, y: 1.5 + i % 2, z: .4, duration: .55, ease: 'power2.out' }, 0);
      effect.timeline.to(flame.position, { y: point.y + .8, duration: .55 }, 0);
      effect.timeline.to(flame.material, { opacity: 0, duration: .35 }, .3);
    }
    this.flash(point,'#ff9960',1.2);this.sparks(point, '#ffbb64', 13, 1.05, .65); this.ring(point, '#ed8559', .85);
  }
  private damageLabel(point: THREE.Vector3, damage: number, targetId?: string): void {
    if (!Number.isFinite(damage) || damage <= 0) return;
    const effect = this.effect(.95); if (!effect) return;
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
    const label = new THREE.Sprite(material); this.sharedGeometries.add(label.geometry); label.position.copy(labelPoint); label.scale.set(1.25, .75, 1); effect.group.add(label);
    if (!this.reduced) effect.timeline.to(label.position, { y: label.position.y + .55, duration: .75, ease: 'power2.out' }, 0);
    effect.timeline.to(material, { opacity: 0, duration: .2 }, .72);
  }
  private shield(point: THREE.Vector3, color = '#9acfd3'): void {
    const effect = this.effect(.68); if (!effect) return;
    const outline = this.fxMesh(this.cachedGeometry('shield', () => new THREE.RingGeometry(.56, .63, 6)), color, .95); outline.position.copy(point); outline.quaternion.copy(this.camera.quaternion); effect.group.add(outline);
    effect.timeline.fromTo(outline.scale, { x: .7, y: .7, z: .7 }, { x: 1.35, y: 1.35, z: 1.35, duration: .35 }, 0); effect.timeline.to(outline.material, { opacity: 0, duration: .28 }, .35); this.sparks(point, color, 7, .5, .45);
  }
  private flyingCard(data: any): void {
    const source = this.origin(data.playerId), center = this.atScreen(this.geometry.center.x, this.geometry.center.y, 1.85), effect = this.effect(1.05); if (!effect) return;
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
    effect.timeline.to(material, { opacity: 0, duration: .25 }, .75); effect.timeline.to(body.material, { opacity: 0, duration: .25 }, .75);
  }
  /** Receive only accepted events; actual impacts stay per victim. */
  event(type: string, data: any): void {
    if (!data || !this.renderer || this.disposed || document.hidden) return;
    const name = String(data.cardName || data.skillId || '');
    const defensivePlay = type === 'card_played' && (name === 'DODGE' || name === 'NEGATE');
    const targetId = defensivePlay ? data.playerId : data.targetId || data.targetPlayerId || data.playerId, target = this.origin(targetId);
    if(type==='damage_log')this.animateHero(targetId,'HURT');
    else if(type==='death')this.animateHero(targetId,'DEATH');
    else if(type==='card_played')this.animateHero(data.playerId,['SLASH','THUNDER_ATTACK','DUEL','FIRE_ATTACK'].includes(name)||data.kind==='SKILL'?'ATTACK':'READY',data.targetId||data.targetIds?.[0]);
    if (this.reduced) { this.ring(target, type === 'damage_log' ? '#e59471' : ['PEACH', 'PEACH_GARDEN'].includes(name) ? '#9cdbc1' : '#e6c282', .65, true); if(type === 'damage_log')this.damageLabel(target, Number(data.damage), targetId); return; }
    if (type === 'damage_log') {
      if (data.damageType === 'THUNDER') this.thunder(target);
      else if (data.damageType === 'FIRE') this.fire(target);
      else { this.slash(target);this.flash(target,'#ffe0a5',.65); this.sparks(target, '#d7b176', 8, .7, .4); }
      if(Number(data.hp)<=0){this.ring(target,'#d6a35c',1.2);this.flash(target,'#f2bf73',1.65);}
      this.damageLabel(target, Number(data.damage), targetId); return;
    }
    if (type === 'judgement_result') { this.shield(target, data.isSuccess ? '#abd9b4' : '#d29b76'); return; }
    if (['death', 'dying', 'victory', 'acquire', 'turn', 'prompt'].includes(type)) {
      this.ring(target, type === 'victory' ? '#f5d391' : type === 'acquire' ? '#a4cbbc' : '#dd8e74', type === 'victory' ? 1.65 : .75);
      if (['death', 'dying', 'victory'].includes(type)) this.sparks(target, type === 'victory' ? '#ecc983' : '#c79471', 12, type==='victory'?2.2:.8, .6);
      if(type==='victory'){this.flash(target,'#ffe6a0',2.5);this.ring(target,'#a2c4b3',1.1);}
      return;
    }
    if (type !== 'card_played') return;
    if (data.kind !== 'SKILL') this.flyingCard(data);
    const source = this.origin(data.playerId), targetIds: string[] = data.targetIds?.length ? data.targetIds : data.targetId ? [data.targetId] : [], targets = targetIds.length ? targetIds.map(id => this.origin(id)) : [source];
    if (name === 'NEGATE') { this.ring(source, '#b39dda', 1); this.shield(source, '#c6b1e5'); return; }
    if (name === 'DODGE' || data.kind === 'RESPONSE' && !['SLASH', 'THUNDER_ATTACK', 'PEACH', 'WINE'].includes(name)) { this.shield(source); return; }
    if (['PEACH', 'PEACH_GARDEN', 'WINE'].includes(name)) { for (const point of targets) this.ring(point, '#a5daba', .8); return; }
    if (data.kind === 'SKILL') { this.heroSignature(data.playerId,targetIds);return; }
    const fire = name === 'FIRE_ATTACK', thunder = name === 'THUNDER_ATTACK' || name === 'LIGHTNING', color = fire ? '#ffb15f' : thunder ? '#89d7e5' : name === 'SLASH' ? '#e4d3ab' : '#adb8df';
    for (const point of targets) if (point.distanceTo(source) > .1) this.trail(source, point, color, fire ? 1.4 : .65);
    if (fire) this.sparks(source, '#df9e61', 9, .65, .5); else if (thunder) this.ring(source, '#86bdce', .6); else if (CARD_BY_ID[name]?.kind === 'EQUIPMENT') this.shield(source, '#d3ba83'); else if (name !== 'SLASH') this.ring(source, '#b9bbd6', .65);
  }
  private draw(): void {
    this.dirty = true;
    if (this.renderer && !this.disposed && !document.hidden && !this.frame) this.frame = requestAnimationFrame(this.loop);
  }
  private loop = (now: number): void => {
    this.frame = 0; if (this.disposed || document.hidden || !this.renderer) return;
    const interval = 1000 / 60, elapsed = now - this.last;
    if (!this.last || elapsed >= interval - .5) {
      const animating = this.effects.size > 0;
      if (this.dirty || animating) {
        this.dirty = false;
        this.last = !this.last || elapsed < interval ? now : now - elapsed % interval;
        const start = performance.now(); this.renderer.render(this.scene, this.camera); const cost = performance.now() - start;
        if (animating) { const cadence = this.cadenceAt ? now - this.cadenceAt : 0; this.cadenceAt = now; this.sampleQuality(cost, cadence, now); }
        else this.cadenceAt = 0;
      }
    }
    if (this.dirty || this.effects.size) { if (!this.frame) this.frame = requestAnimationFrame(this.loop); }
    else this.last = this.cadenceAt = 0;
  };
  dispose(): void {
    if (this.disposed) return; this.disposed = true; cancelAnimationFrame(this.frame); this.resize.disconnect(); document.removeEventListener('visibilitychange', this.onVisibility);
    for (const effect of [...this.effects]) this.release(effect);
    const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
    this.scene.traverse(object => { if (object instanceof THREE.InstancedMesh) object.dispose(); const mesh = object as THREE.Mesh; if (mesh.geometry) geometries.add(mesh.geometry); if (mesh.material) for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) materials.add(material); });
    geometries.add(this.cube); for (const geometry of this.sharedGeometries) geometries.add(geometry); for (const material of this.materials.values()) materials.add(material);
    for (const geometry of geometries) geometry.dispose(); for (const material of materials) material.dispose(); for (const texture of this.textures) texture.dispose();
    for (const object of this.scene.children) if (object instanceof THREE.Light && 'shadow' in object) (object as THREE.DirectionalLight).shadow?.dispose();
    this.renderer?.dispose(); this.renderer?.domElement.remove(); this.players.clear();this.heroEffects.clear(); this.materials.clear(); this.textures.clear(); this.sharedGeometries.clear(); this.effectGeometry.clear(); this.damageTextures.clear(); this.onLayout = undefined;
  }
}
