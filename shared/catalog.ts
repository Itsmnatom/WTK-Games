export type CardKind = 'BASIC' | 'KIT' | 'DELAYED' | 'EQUIPMENT';
export type Faction = 'WEI' | 'SHU' | 'WU' | 'QUN';
export interface CardDefinition { id: string; name: string; description: string; kind: CardKind; count: number; range?: number; slot?: string; art: number }
export interface HeroDefinition { id: string; name: string; english: string; faction: Faction; hp: number; gender: 'MALE' | 'FEMALE'; skills: string; art: number }
const card = (id: string, name: string, description: string, kind: CardKind, count: number, range?: number, slot?: string): Omit<CardDefinition, 'art'> => ({ id, name, description, kind, count, range, slot });
export const CARDS: CardDefinition[] = [
  card('SLASH','โจมตี','โจมตีหนึ่งเป้าหมายในระยะ ใช้ได้หนึ่งครั้งต่อเทิร์น เป้าหมายใช้หลบหลีกเพื่อป้องกัน','BASIC',36),
  card('DODGE','หลบหลีก','ตอบโต้การโจมตีหรือธนูหมื่นดอกเพื่อป้องกันความเสียหาย','BASIC',24),
  card('PEACH','สวนท้อ','ฟื้นฟู 1 HP ให้ตนเอง หรือช่วยผู้เล่นที่กำลังใกล้ตาย','BASIC',12),
  card('WINE','สุรา','เพิ่มความเสียหายโจมตีครั้งถัดไป 1 หรือช่วยตนเองเมื่อใกล้ตาย','BASIC',6),
  card('THUNDER_ATTACK','โจมตีสายฟ้า','โจมตีด้วยธาตุสายฟ้า ส่งความเสียหายผ่านโซ่เหล็ก','BASIC',8),
  card('STEAL','หยิบฉวย','หยิบการ์ดหนึ่งใบจากเป้าหมายที่อยู่ระยะ 1','KIT',6),
  card('SABOTAGE','รื้อสะพาน','ทำลายการ์ดหนึ่งใบจากมือ อุปกรณ์ หรือเขตพิจารณาของเป้าหมาย','KIT',6),
  card('EX_NIHILO','เสกจากความว่าง','จั่วสองใบ','KIT',4),
  card('DUEL','ประลองกำลัง','ผลัดกันใช้โจมตี ผู้ที่ตอบไม่ได้รับความเสียหาย 1','KIT',4),
  card('BARBARIAN_INVASION','คนเถื่อนบุกรุก','ผู้เล่นอื่นใช้โจมตีหนึ่งใบ มิฉะนั้นรับความเสียหาย 1','KIT',3),
  card('ARROW_BARRAGE','ธนูหมื่นดอก','ผู้เล่นอื่นใช้หลบหลีกหนึ่งใบ มิฉะนั้นรับความเสียหาย 1','KIT',3),
  card('PEACH_GARDEN','สวนท้อสาบาน','ทุกคนที่ยังมีชีวิตฟื้นฟู 1 HP','KIT',2),
  card('IRON_CHAIN','โซ่เหล็ก','สลับสถานะล่ามโซ่ได้ถึงสองเป้าหมาย ดาเมจธาตุส่งต่อคนที่ล่ามโซ่','KIT',4),
  card('FIRE_ATTACK','โจมตีเพลิง','เป้าหมายเปิดการ์ด ผู้ร่ายทิ้งการ์ดดอกเดียวกันเพื่อสร้างดาเมจไฟ 1','KIT',3),
  card('NEGATE','ไร้ข้อกังขา','ยกเลิกผลกลยุทธ์ สามารถสวนการยกเลิกในสายโซ่ได้','KIT',8),
  card('BUMPER_HARVEST','เก็บเกี่ยว','เปิดการ์ดแล้วทุกคนเลือกหนึ่งใบตามลำดับที่นั่ง','KIT',2),
  card('BORROWED_SWORD','ยืมดาบฆ่าคน','เลือกผู้มีอาวุธให้โจมตีอีกคน หากไม่โจมตี ผู้ร่ายได้รับอาวุธ','KIT',2),
  card('LIGHTNING','อัสนีบาต','พิจารณาโพดำ 2–9 รับดาเมจสายฟ้า 3 มิฉะนั้นส่งต่อ','DELAYED',2),
  card('ACEDIA','สุขไม่คิดกลับ','พิจารณาไม่เป็นหัวใจ ข้ามเทิร์นโดยไม่บังคับทิ้งการ์ด','DELAYED',3),
  card('STARVATION','เสบียงขาด','พิจารณาไม่เป็นดอกจิก ข้ามการจั่ว','DELAYED',3),
  card('ZHUGE_CROSSBOW','หน้าไม้ขงเบ้ง','ใช้โจมตีได้ไม่จำกัด','EQUIPMENT',2,1,'weapon'),
  card('BLUE_STEEL_SWORD','กระบี่เหล็กฟ้า','โจมตีโดยไม่คิดผลเกราะ','EQUIPMENT',2,2,'weapon'),
  card('SIX_SWORDS_WU','ดาบหกเหล่าอู๋','อาวุธระยะ 2','EQUIPMENT',1,2,'weapon'),
  card('KIRIN_BOW','เกาทัณฑ์กิเลน','เมื่อโจมตีทำดาเมจ ทำลายม้าของเป้าหมายได้','EQUIPMENT',1,5,'weapon'),
  card('FEATHERED_FAN','พัดขนนก','เปลี่ยนโจมตีธรรมดาเป็นดาเมจไฟ','EQUIPMENT',2,4,'weapon'),
  card('SERPENT_SPEAR','ทวนอสรพิษ','ใช้การ์ดบนมือสองใบแทนโจมตี','EQUIPMENT',2,3,'weapon'),
  card('FROST_SWORD','กระบี่เหมันต์','เลือกสละดาเมจเพื่อทำลายการ์ดเป้าหมายสองใบ','EQUIPMENT',1,2,'weapon'),
  card('TWO_BLADED_TRIDENT','ง้าวสองง่าม','เมื่อเป้าหมายหลบ ทิ้งการ์ดหนึ่งใบเพื่อบังคับให้โดน','EQUIPMENT',1,3,'weapon'),
  card('ROCK_CLEAVING_AXE','ขวานผ่าหิน','เมื่อเป้าหมายหลบ ทิ้งสองใบเพื่อบังคับให้โดน','EQUIPMENT',1,3,'weapon'),
  card('GREEN_DRAGON_BLADE','ง้าวมังกรเขียว','เมื่อเป้าหมายหลบ ใช้โจมตีอีกใบเพื่อโจมตีซ้ำ','EQUIPMENT',2,3,'weapon'),
  card('SKY_PIERCING_HALBERD','ทวนกรีดฟ้า','โจมตีใบสุดท้ายบนมือเลือกได้ถึงสามเป้าหมาย','EQUIPMENT',1,4,'weapon'),
  card('YIN_YANG_SWORDS','กระบี่หยินหยาง','โจมตีต่างเพศ ให้เป้าหมายทิ้งหนึ่งใบหรือผู้โจมตีจั่ว','EQUIPMENT',2,2,'weapon'),
  card('NIO_SHIELD','โล่เสือโคร่ง','ป้องกันโจมตีธรรมดาสีดำ','EQUIPMENT',2,undefined,'armor'),
  card('EIGHT_TRIGRAMS_FORMATION','ประยุทธ์แปดทิศ','เมื่อจำเป็นต้องหลบ พิจารณาสีแดงเสมือนใช้หลบหลีก','EQUIPMENT',2,undefined,'armor'),
  card('SILVER_LION_HELMET','หมวกสิงโตเงิน','จำกัดดาเมจครั้งละ 1 ถอดจากเขตอุปกรณ์แล้วฟื้นฟู 1','EQUIPMENT',2,undefined,'armor'),
  card('RATTAN_ARMOR','เกราะหวาย','ป้องกันโจมตีธรรมดาและโจมตีหมู่ รับดาเมจไฟเพิ่ม 1','EQUIPMENT',2,undefined,'armor'),
  card('LIGHTNING_HOOF','ม้าหมอบเต็กเลา','เพิ่มระยะห่างในการป้องกัน 1','EQUIPMENT',2,undefined,'defensiveHorse'),
  card('RED_HARE','ม้าเซ็กเธาว์','ลดระยะห่างในการโจมตี 1','EQUIPMENT',2,undefined,'offensiveHorse'),
  card('FERGANA_STEED','ม้าเฟอร์กานา','ลดระยะห่างในการโจมตี 1','EQUIPMENT',2,undefined,'offensiveHorse'),
  card('SHADOWRUNNER','ม้าเงาทมิฬ','เพิ่มระยะห่างในการป้องกัน 1','EQUIPMENT',2,undefined,'defensiveHorse'),
  card('WOODEN_CART','เกวียนไม้','เพิ่มจำนวนการ์ดที่เก็บได้ตอนจบเทิร์น 1','EQUIPMENT',1,undefined,'treasure'),
].map((item, art) => ({ ...item, art }));
export const CARD_BY_ID = Object.fromEntries(CARDS.map(c => [c.id, c])) as Record<string, CardDefinition>;
export const HEROES: HeroDefinition[] = [
  ['CAO_CAO','โจโฉ','Cao Cao','WEI',4,'MALE','มหาอุปราช: รับการ์ดที่ทำดาเมจ | องครักษ์: เมื่อเป็นเจ้าเมืองขอหลบหลีกจากวุยก๊ก'],
  ['LIU_BEI','เล่าปี่','Liu Bei','SHU',4,'MALE','ปันสุข: มอบการ์ดครบสองใบฟื้นฟู 1 ต่อเทิร์น | ระดมพล: เจ้าเมืองขอโจมตีจากจ๊กก๊ก'],
  ['SUN_QUAN','ซุนกวน','Sun Quan','WU',4,'MALE','ผลัดการ์ด: ทิ้งมือ/อุปกรณ์แล้วจั่วเท่ากันครั้งละเทิร์น | กู้ชีพ: เจ้าเมืองรับสวนท้อจากง่อก๊กเพิ่ม 1'],
  ['GUAN_YU','กวนอู','Guan Yu','SHU',4,'MALE','เทพสงคราม: การ์ดแดงบนมือหรืออุปกรณ์ใช้เป็นโจมตี'],
  ['ZHANG_FEI','เตียวหุย','Zhang Fei','SHU',4,'MALE','กู่ก้องคำราม: ใช้โจมตีไม่จำกัดครั้งในเทิร์น'],
  ['ZHAO_YUN','จูล่ง','Zhao Yun','SHU',4,'MALE','มังกรทะลวง: ใช้โจมตีแทนหลบหลีก และหลบหลีกแทนโจมตี'],
  ['ZHEN_JI','เจินจี','Zhen Ji','WEI',3,'FEMALE','ลั่วเสิน: พิจารณารับการ์ดดำจนพบแดง | เทพธิดา: การ์ดดำบนมือใช้เป็นหลบหลีก'],
  ['LV_BU','ลิโป้','Lu Bu','QUN',5,'MALE','ไร้ผู้ต่อกร: โจมตีต้องหลบสองใบ ประลองกำลังต้องตอบโจมตีสองใบ'],
  ['DIAO_CHAN','เตียวเสี้ยน','Diao Chan','QUN',3,'FEMALE','บ่วงเสน่หา: ทิ้งหนึ่งใบให้ชายสองคนดวล | งามล่มเมือง: จั่วหนึ่งใบจบเทิร์น'],
  ['SIMA_YI','สุมาอี้','Sima Yi','WEI',3,'MALE','ป้อนกลับ: หยิบมือ/อุปกรณ์จากผู้ทำดาเมจ | เปลี่ยนชะตา: ใช้การ์ดบนมือแทนไพ่พิจารณา'],
  ['ZHUGE_LIANG','ขงเบ้ง','Zhuge Liang','SHU',3,'MALE','ดูดาว: เรียงบน/ใต้กองได้ถึงห้าใบ | เมืองว่าง: มือว่างไม่ตกเป็นเป้าโจมตี/ประลอง'],
  ['ZHOU_YU','จิวยี่','Zhou Yu','WU',3,'MALE','สง่างาม: จั่วเพิ่มหนึ่ง | บ่มเพลิง: ให้การ์ดแก่เป้าหมาย ทายดอกผิดรับดาเมจหนึ่ง'],
  ['HUANG_GAI','อุยกาย','Huang Gai','WU',4,'MALE','โบยตนเอง: ลด 1 HP เพื่อจั่วสองใบ ใช้ซ้ำได้ และกู้ชีพก่อนดำเนินต่อ'],
  ['ZHANG_LIAO','เตียวเลี้ยว','Zhang Liao','WEI',4,'MALE','จู่โจมเสบียง: แทนการจั่วปกติ หยิบไพ่สุ่มจากมือผู้อื่นได้ถึงสองคน คนละหนึ่งใบ'],
  ['GUO_JIA','กุยแก','Guo Jia','WEI',3,'MALE','ริษยาสวรรค์: รับไพ่พิจารณาของตนหลังเกิดผล | มรดก: ต่อดาเมจหนึ่งหน่วย ดูไพ่สองใบและแบ่งให้ผู้เล่นที่ยังมีชีวิต'],
  ['HUANG_YUEYING','อุยซี','Huang Yueying','SHU',3,'FEMALE','บ่มเพาะ: หลังใช้กลยุทธ์ เลือกจั่วหนึ่งใบ | อัจฉริยะ: กลยุทธ์ไม่จำกัดระยะ'],
  ['GAN_NING','กำเหลง','Gan Ning','WU',4,'MALE','จู่โจมค่าย: แปลงไพ่ดำบนมือหรืออุปกรณ์เป็นทำลายเสบียง'],
  ['DA_QIAO','ไต้เกี้ยว','Da Qiao','WU',3,'FEMALE','ลุ่มหลง: แปลงไพ่ข้าวหลามตัดบนมือหรืออุปกรณ์เป็นสุขไม่คิดกลับ | เบี่ยงคม: ทิ้งหนึ่งใบเพื่อย้ายโจมตีไปยังผู้อื่นในระยะตน ยกเว้นผู้โจมตี'],
  ['HUA_TUO','ฮัวโต๋','Hua Tuo','QUN',3,'MALE','ปฐมพยาบาล: นอกเทิร์นใช้ไพ่แดงบนมือเป็นสวนท้อ | หมอเทวดา: เทิร์นละครั้ง ทิ้งไพ่บนมือหนึ่งใบเพื่อฟื้นฟูหนึ่ง HP ให้ผู้บาดเจ็บ'],
].map((h, art) => ({ id: h[0], name: h[1], english: h[2], faction: h[3], hp: h[4], gender: h[5], skills: h[6], art })) as HeroDefinition[];
export const HERO_BY_ID = Object.fromEntries(HEROES.map(h => [h.id, h])) as Record<string, HeroDefinition>;
export function canonicalHero(value: unknown): string {
  const text = String(typeof value === 'object' && value ? (value as any).id || (value as any).name || (value as any).title || '' : value || '').toUpperCase().replace(/[^A-Z0-9]+/g, '_');
  if (text.includes('ZHEN') || text.includes('LADY_ZHEN')) return 'ZHEN_JI';
  if (text.includes('LU_BU') || text.includes('LV_BU')) return 'LV_BU';
  return HEROES.find(h => text === h.id || text.includes(h.id))?.id || text.replace(/^_|_$/g, '');
}
export const RULES = Object.freeze({ version: 'pixel-1', minPlayers: 4, maxPlayers: 10, defaultPlayers: 6, reactionMs: 20_000, draftMs: 90_000, reconnectSeconds: 45, turnDeadline: null, deckSize: 176 });
export const FACTIONS = { WEI: { name:'วุยก๊ก', seal:'魏', color:'#2563eb' }, SHU:{name:'จ๊กก๊ก',seal:'蜀',color:'#dc2626'}, WU:{name:'ง่อก๊ก',seal:'吳',color:'#16a34a'}, QUN:{name:'กลุ่มอิสระ',seal:'群',color:'#d97706'} };
export const ROLES: Record<string, {name:string;seal:string;color:string;goal:string}> = {
  LORD:{name:'เจ้าเมือง',seal:'主',color:'#f59e0b',goal:'กำจัดกบฏและคนทรยศ'}, LOYALIST:{name:'ผู้ภักดี',seal:'忠',color:'#3b82f6',goal:'ปกป้องเจ้าเมืองและกำจัดศัตรู'}, REBEL:{name:'กบฏ',seal:'反',color:'#ef4444',goal:'กำจัดเจ้าเมือง'}, RENEGADE:{name:'คนทรยศ',seal:'內',color:'#a855f7',goal:'เป็นคนสุดท้ายที่รอดชีวิต'}, UNKNOWN:{name:'บทบาทลับ',seal:'?',color:'#8b9b9c',goal:'ยังไม่เปิดเผย'}
};
export function seededRandom(seed: number) { let state = seed || 1; return () => { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return (state >>> 0) / 4294967296; }; }
export function shuffle<T>(items: readonly T[], random = Math.random): T[] { const copy = [...items]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
