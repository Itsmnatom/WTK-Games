import * as THREE from 'three';

/** Small deterministic, static textures. Canvas work happens once at scene creation. */
function paint(width:number,height:number,draw:(ctx:CanvasRenderingContext2D)=>void):THREE.CanvasTexture {
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext('2d');if(ctx)draw(ctx);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  texture.minFilter=texture.magFilter=THREE.NearestFilter;texture.generateMipmaps=false;return texture;
}
function random(seed=419):()=>number {let value=seed;return ()=>{value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296;};}
export function courtyardTextures():Record<'wood'|'map'|'contact'|'glow',THREE.CanvasTexture> {
  const rng=random();
  const wood=paint(256,256,c=>{
    c.fillStyle='#493026';c.fillRect(0,0,256,256);
    for(let plank=0;plank<8;plank++){
      const y=plank*32;c.fillStyle=plank%2?'#57392a':'#60412d';c.fillRect(0,y,256,31);
      for(let i=0;i<20;i++){c.strokeStyle=i%3?'#6e4b34':'#352a25';c.lineWidth=1;const line=y+2+rng()*27;c.beginPath();c.moveTo(0,line);c.bezierCurveTo(75,line-4+rng()*8,170,line+4-rng()*8,256,line);c.stroke();}
      c.fillStyle='#261f1b';c.fillRect(0,y,256,1);
    }
    for(let i=0;i<450;i++){c.fillStyle=i%2?'#a1774530':'#231c2430';c.fillRect(rng()*256,rng()*256,1+rng()*9,1);}
  });
  const map=paint(768,448,c=>{
    c.fillStyle='#b49a66';c.fillRect(0,0,768,448);
    for(let i=0;i<11000;i++){c.fillStyle=i%2?'#3b48200c':'#fff0c40d';c.fillRect(rng()*768,rng()*448,2,2);}
    c.strokeStyle='#786240';c.lineWidth=2;c.strokeRect(12,12,744,424);c.strokeRect(19,19,730,410);
    c.strokeStyle='#7b8053';c.lineWidth=2;
    for(let i=0;i<14;i++){const x=40+rng()*670,y=35+rng()*355;c.beginPath();c.moveTo(x-20,y+20);c.lineTo(x,y-16);c.lineTo(x+27,y+20);c.moveTo(x-9,y+1);c.lineTo(x,y-16);c.lineTo(x+10,y+4);c.stroke();}
    c.strokeStyle='#466e6b';c.lineWidth=12;c.beginPath();c.moveTo(0,305);c.bezierCurveTo(160,180,260,385,410,237);c.bezierCurveTo(550,90,610,220,768,80);c.stroke();
    c.strokeStyle='#7f9c87';c.lineWidth=3;c.stroke();
    c.strokeStyle='#765c3b';c.lineWidth=2;c.setLineDash([8,6]);c.beginPath();c.moveTo(75,100);c.lineTo(218,176);c.lineTo(421,100);c.lineTo(660,315);c.stroke();c.setLineDash([]);
    for(const [x,y,color] of [[115,115,'#743e35'],[385,180,'#3b546a'],[622,322,'#3e624a']] as [number,number,string][]){c.fillStyle=color;c.fillRect(x-8,y-8,16,16);c.strokeStyle=color;c.beginPath();c.arc(x,y,17,0,Math.PI*2);c.stroke();}
    c.strokeStyle='#776447';c.lineWidth=1;c.beginPath();c.moveTo(385,20);c.lineTo(385,428);c.moveTo(20,222);c.lineTo(748,222);c.stroke();
    c.fillStyle='#82673c';c.fillRect(29,29,42,2);c.fillRect(29,29,2,42);c.fillRect(697,377,42,2);c.fillRect(737,337,2,42);
  });
  const contact=paint(64,64,c=>{const g=c.createRadialGradient(32,32,3,32,32,31);g.addColorStop(0,'#050d14b0');g.addColorStop(.5,'#050d1450');g.addColorStop(1,'#050d1400');c.fillStyle=g;c.fillRect(0,0,64,64);});
  const glow=paint(64,64,c=>{const g=c.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'#ffe1a2b0');g.addColorStop(.3,'#efae5640');g.addColorStop(1,'#f0a44100');c.fillStyle=g;c.fillRect(0,0,64,64);});
  return {wood,map,contact,glow};
}
