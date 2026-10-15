export const STRATEGIES = [
  { id:'MUSTER', name:'จัดทัพ', timing:'ช่วงเล่นไพ่', description:'ทิ้งไพ่บนมือ 1 ใบ แล้วจั่ว 2 ใบ' },
  { id:'OFFENSIVE', name:'เร่งบุก', timing:'ช่วงเล่นไพ่', description:'ทิ้งไพ่บนมือ 1 ใบ เพิ่มโควตาโจมตี 1 ครั้งในเทิร์นนี้ ยังต้องจ่ายไพ่และอยู่ในระยะ' },
  { id:'SUPPLY', name:'เตรียมเสบียง', timing:'เริ่มช่วงจั่ว', description:'สละการรับไพ่ช่วงจั่วทั้งหมด รวมสกิลแทนจั่ว เพื่อฟื้นฟู 1 HP' },
] as const;
export type StrategyId = typeof STRATEGIES[number]['id'];
