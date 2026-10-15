export declare const STRATEGIES: readonly [{
    readonly id: 'MUSTER';
    readonly name: 'จัดทัพ';
    readonly timing: 'ช่วงเล่นไพ่';
    readonly description: 'ทิ้งไพ่บนมือ 1 ใบ แล้วจั่ว 2 ใบ';
}, {
    readonly id: 'OFFENSIVE';
    readonly name: 'เร่งบุก';
    readonly timing: 'ช่วงเล่นไพ่';
    readonly description: 'ทิ้งไพ่บนมือ 1 ใบ เพิ่มโควตาโจมตี 1 ครั้งในเทิร์นนี้ ยังต้องจ่ายไพ่และอยู่ในระยะ';
}, {
    readonly id: 'SUPPLY';
    readonly name: 'เตรียมเสบียง';
    readonly timing: 'เริ่มช่วงจั่ว';
    readonly description: 'สละการรับไพ่ช่วงจั่วทั้งหมด รวมสกิลแทนจั่ว เพื่อฟื้นฟู 1 HP';
}];
export type StrategyId = typeof STRATEGIES[number]['id'];
//# sourceMappingURL=experimental.d.ts.map