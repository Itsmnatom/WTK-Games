import { Client, Room } from 'colyseus.js';
import type { RoomSnapshot, ConnectionIdentity } from '../../shared/protocol';
export interface SavedSession extends ConnectionIdentity {token:string;name:string}
export class GameConnection {
  room:Room|null=null;
  identity:ConnectionIdentity|null=null;
  private disposed=false;
  private reconnecting=false;
  onState:(state:RoomSnapshot)=>void=()=>{};
  onIdentity:(identity:ConnectionIdentity)=>void=()=>{};
  onEvent:(type:string,data:any)=>void=()=>{};
  onStatus:(status:string)=>void=()=>{};
  private client=new Client(import.meta.env.DEV ? 'ws://localhost:3001' : `${location.protocol==='https:'?'wss:':'ws:'}//${location.host}`);
  constructor(private name:string){}
  static saved():SavedSession|null {try{const s=JSON.parse(localStorage.getItem('wtk.session')||'null');return s?.token&&s?.roomId?s:null;}catch{return null;}}
  async connect(action:string,roomId:string,mode:string,sandbox=false,playerId=''):Promise<void> {
    this.onStatus('กำลังเชื่อมต่อ');
    try {
      let room:Room;
      if(action==='reconnect'){
        const saved=GameConnection.saved();
        if(!saved||!roomId||saved.roomId!==roomId||playerId&&saved.playerId!==playerId)throw new Error('ไม่พบการเชื่อมต่อเดิมของผู้เล่นในห้องนี้');
        if(typeof saved.token!=='string'||saved.token.split(':')[0]!==roomId)throw new Error('ข้อมูลเชื่อมต่อเดิมไม่ตรงกับห้องนี้');
        room=await this.client.reconnect(saved.token);
      }else if(action==='join')room=await this.client.joinById(roomId,{playerName:this.name});
      else room=await this.client.create('wtk_room',{playerName:this.name,mode,sandbox,_action:'create'});
      this.bind(room);
    } catch(error){if(this.disposed)return;this.onStatus('เชื่อมต่อไม่สำเร็จ');this.onEvent('game_error',{message:(error as Error).message||'ไม่พบห้องหรือห้องเริ่มเกมแล้ว'});throw error;}
  }
  private bind(room:Room):void {
    if(this.disposed){void this.closeRoom(room);return;}
    this.room=room;this.reconnecting=false;this.onStatus('เชื่อมต่อแล้ว');
    room.onMessage('*',(messageType,data:any)=>{
      if(this.disposed)return;
      const type=String(messageType);
      if(['room_created','room_joined','reconnect_success'].includes(type)){
        this.identity={roomId:data.roomId||room.id,playerId:data.playerId};
        try{localStorage.setItem('wtk.session',JSON.stringify({...this.identity,token:room.reconnectionToken,name:this.name}));}catch{ /* Optional persistence cannot interrupt the joined room. */ }
        this.onIdentity(this.identity);
      } else if(type==='room_state_update')this.onState(data);
      else this.onEvent(type,data);
    });
    room.onError((_code:number,message?:string)=>{if(!this.disposed)this.onEvent('game_error',{message:message||'การเชื่อมต่อมีปัญหา'});});
    room.onLeave((code:number)=>{if(this.room!==room)return;this.room=null;if(!this.disposed&&code!==1000)this.reconnect(room.reconnectionToken);});
    room.send('request_state',{});
  }
  private async reconnect(token:string):Promise<void> {
    if(this.reconnecting||this.disposed)return;this.reconnecting=true;const until=Date.now()+45_000;
    this.onStatus('สัญญาณหลุด กำลังกลับเข้าห้องเดิม');
    while(!this.disposed&&Date.now()<until){try{this.bind(await this.client.reconnect(token));return;}catch{await new Promise(resolve=>setTimeout(resolve,1500));}}
    if(this.disposed)return;
    this.reconnecting=false;localStorage.removeItem('wtk.session');this.onStatus('หมดช่วง reconnect');this.onEvent('game_error',{message:'กลับเข้าห้องไม่ทัน 45 วินาที ผู้เล่นของคุณถูกนับว่าเสียชีวิต'});
  }
  send(command:string,data:any={}):void {if(this.disposed)return;if(!this.room||this.reconnecting){this.onEvent('game_error',{message:'รอการเชื่อมต่อกลับมาก่อน'});return;}this.room.send(command,data);}
  leave():Promise<void>{
    if(this.disposed)return Promise.resolve();
    this.disposed=true;this.reconnecting=false;
    const room=this.room;this.room=null;this.identity=null;
    try{localStorage.removeItem('wtk.session');}catch{ /* Storage cannot block leaving the table. */ }
    return room?this.closeRoom(room):Promise.resolve();
  }
  private closeRoom(room:Room):Promise<void>{
    return new Promise(resolve=>{
      let finished=false,timer:ReturnType<typeof setTimeout>|undefined;
      const finish=()=>{if(finished)return;finished=true;if(timer!==undefined)clearTimeout(timer);try{room.connection?.close();}catch{}resolve();};
      // SDK leave waits for a future close event, which may already have happened.
      timer=setTimeout(finish,500);
      try{if(!room.connection?.isOpen){finish();return;}void room.leave(true).then(finish,finish);}catch{finish();}
    });
  }
}
