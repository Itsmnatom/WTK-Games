# ⚔️ WTK-Games (สามก๊ก การ์ดเกมเรียลไทม์)

<p align="center">
  <img src="https://raw.githubusercontent.com/Itsmnatom/WTK-Games/main/public/images/hero-banner.png" alt="WTK Games Hero" width="800">
</p>

<p align="center">
  <strong>การ์ดเกมสามก๊กออนไลน์แบบ Real-time Multiplayer เต็มรูปแบบ พร้อมสถาปัตยกรรม Authoritative Server</strong>
</p>

<p align="center">
  <a href="https://github.com/Itsmnatom/WTK-Games/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Itsmnatom/WTK-Games" alt="License"></a>
  <a href="https://github.com/Itsmnatom/WTK-Games"><img src="https://img.shields.io/badge/Node.js-16.x+-success.svg" alt="Node.js"></a>
  <a href="https://github.com/Itsmnatom/WTK-Games"><img src="https://img.shields.io/badge/Colyseus-0.15-blue.svg" alt="Colyseus"></a>
  <a href="https://github.com/Itsmnatom/WTK-Games"><img src="https://img.shields.io/badge/Phaser-3.80-orange.svg" alt="Phaser 3"></a>
</p>

<p align="center">
  <a href="#features">Features</a> • 
  <a href="#-7-วิธีการติดตั้งและเริ่มต้นใช้งาน-getting-started">Installation</a> • 
  <a href="#-2-คู่มือการเล่นเกม-game-rules--playbook">Game Rules</a> • 
  <a href="#-5-อธิบายสถาปัตยกรรมและฟังก์ชันในซอร์สโค้ด-codebase-architecture-for-teaching">Architecture</a>
</p>

---

WTK-Games คือเว็บแอปพลิเคชันเกมการ์ดสามก๊กเรียลไทม์มัลติเพลเยอร์ (War of the Three Kingdoms) ที่ออกแบบมาเพื่อเป็น **สื่อการเรียนการสอน (Educational Resource)** ด้านการพัฒนาเว็บแอปพลิเคชันเชิงซ้อน, การจัดการ State Machine, และระบบการสื่อสารแบบสองทางผ่าน WebSocket

<h2 id="features">✨ Key Features (จุดเด่นของระบบ)</h2>

- ⚡ **Authoritative Multiplayer** — ป้องกันการโกง 100% ด้วย Colyseus 0.15 Server ควบคุม State ทุกกระบวนการ
- 🎮 **Hybrid Rendering** — ผสมผสาน Phaser 3 (Canvas) และ HTML5/CSS3 DOM (Glassmorphism / Theme UI)
- 🤖 **Smart Bot AI** — บอท AI ที่สามารถตัดสินใจตามบทบาท (กบฏ/ภักดี/ทรยศ) และตอบโต้การโจมตีได้อัตโนมัติ
- 🛠️ **Admin Sandbox** — ระบบเสกการ์ด สลับขุนพล และควบคุม HP แบบเรียลไทม์เพื่อการทดสอบ
- 🃏 **Complete Ruleset** — ขุนพล 12 ตัว, การ์ด 41 ชนิด, อุปกรณ์ 16 ชิ้น พร้อมระบบ Chain Action สมบูรณ์แบบ

---

## 📌 1. วัตถุประสงค์และภาพรวมโครงการ (Project Overview)

โครงการ **WTK-Games** คือเว็บแอปพลิเคชันเกมการ์ดสามก๊กเรียลไทม์มัลติเพลเยอร์ (War of the Three Kingdoms) ที่ถูกออกแบบมาเพื่อเป็น **สื่อการเรียนการสอน (Educational Resource)** ด้านการพัฒนาเว็บแอปพลิเคชันเชิงซ้อน, การจัดการ State Machine ของเกม, ระบบการสื่อสารแบบสองทางผ่าน WebSocket (Colyseus 0.15 Authoritative Framework), การออกแบบ UI/UX ตามมาตรฐาน Glassmorphism, และการสร้างภาพเคลื่อนไหวระดับ 60 FPS ด้วย GSAP

---

## 🎮 2. คู่มือการเล่นเกม (Game Rules & Playbook)

### 2.1 เป้าหมายชัยชนะตามบทบาท (Role Victory Conditions)
เกมรองรับผู้เล่นตั้งแต่ **4 ถึง 10 คน** โดยมีการสุ่มแจกบทบาทแบบลับเฉพาะบุคคลดังนี้:

| บทบาท (Role) | สีประจำบทบาท | เป้าหมายในการเอาชนะ (Goal) |
| :--- | :---: | :--- |
| **👑 จักรพรรดิ์ (Lord)** | 🟡 สีทอง | ปราบปรามกบฏและผู้ทรยศทั้งหมดให้สิ้นซาก เพื่อรักษาบัลลังก์ (*เปิดเผยตัวตนเสมอ*) |
| **🛡️ ภักดี (Loyalist)** | 🔵 สีฟ้า | ปกป้องจักรพรรดิ์ด้วยชีวิต และกำจัดศัตรูทั้งหมดของจักรพรรดิ์ |
| **🗡️ กบฏ (Rebel)** | 🔴 สีแดง | โค่นล้มและกำจัดจักรพรรดิ์ (Lord) ให้สำเร็จ |
| **☯️ ทรยศ (Renegade)** | 🟣 สีม่วง | กำจัดผู้เล่นทุกคนจนเหลือดวล 1v1 กับจักรพรรดิ์ แล้วกำจัดจักรพรรดิ์เป็นคนสุดท้าย |

> 💡 **โบนัสจักรพรรดิ์:** หากมีผู้เล่น $\ge 6$ คน จักรพรรดิ์จะได้รับพลังชีวิตสูงสุดเพิ่มขึ้น +1 HP!

---

### 2.2 ลำดับขั้นตอนใน 1 เทิร์น (6 Turn Phases)
เมื่อถึงเทิร์นของผู้เล่น ระบบจะดำเนินขั้นตอนตามลำดับดังนี้:

```mermaid
graph TD
    A["1. Start Phase (เริ่มต้นเทิร์น)"] --> B["2. Judgement Phase (พิจารณาชะตา)"]
    B --> C["3. Draw Phase (จั่วการ์ด 2 ใบ)"]
    C --> D["4. Play Phase (ร่ายการ์ด/ใช้อุปกรณ์)"]
    D --> E["5. Discard Phase (ทิ้งการ์ดให้เท่ากับ HP)"]
    E --> F["6. End Phase (จบเทิร์น)"]
```

1. **Start Phase:** เคลียร์สถานะชั่วคราวและเตรียมความพร้อม
2. **Judgement Phase (คำพิจารณา):** ตรวจสอบไพ่หน่วงเวลาในโซ่พิจารณา (`LIGHTNING`, `ACEDIA`, `STARVATION`) สุ่มเปิดไพ่จากบนกองกลาง หากล้มเหลวจะถูกลงโทษ
3. **Draw Phase:** จั่วการ์ด 2 ใบจากกองกลางขึ้นมือ (ขุนพลจิวยี่จั่วได้ 3 ใบ)
4. **Play Phase:** ร่ายการ์ดบนมือได้อย่างอิสระ (การ์ดโจมตี SLASH ร่ายได้ 1 ครั้งต่อเทิร์น เว้นแต่สวมใส่หน้าไม้น่อกมม หรือเป็นเตียวหุย)
5. **Discard Phase:** หากการ์ดบนมือเกินกว่าพลังชีวิตปัจจุบัน (HP) ต้องเลือกลิบทิ้งการ์ดจนกว่าจำนวนการ์ดบนมือจะเท่ากับ HP
6. **End Phase:** สรุปผลและส่งต่อเทิร์นให้ผู้เล่นคนถัดไป

---

## 🃏 3. พจนานุกรมการ์ดทั้ง 41 ชนิด (Card Encyclopedia)

### 3.1 การ์ดพื้นฐาน (Basic Cards)
- ⚔️ **SLASH (โจมตี):** โจมตีเป้าหมายในระยะ อาวุธ สร้าง 1 ดาเมจ (ร่ายได้ 1 ครั้ง/เทิร์น)
- 🛡️ **DODGE (หลบหลีก):** ใช้ตอบสนองเพื่อหลบการโจมตีจาก SLASH หรือธนูหมื่นดอก
- 🍑 **PEACH (ลูกท้อ):** ฟื้นฟู 1 HP ให้ตนเองในเทิร์นตนเอง หรือใช้ช่วยชีวิตผู้เล่นที่กำลังจะตาย (HP $\le 0$)
- 🍷 **WINE (สุรากุหลาบ):** ใช้ในเทิร์นตนเองเพื่อเพิ่มพลังโจมตี SLASH ใบถัดไปเป็น 2 ดาเมจ หรือใช้ชุบชีวิตตนเองเมื่อ HP $\le 0$

### 3.2 การ์ดกลยุทธ์ (Stratagems)
- ✋ **STEAL (ขโมยไพ่):** ขโมยการ์ด 1 ใบ (บนมือ/อุปกรณ์/โซ่หน่วงเวลา) จากเป้าหมายระยะ 1
- 💥 **SABOTAGE (ทำลายไพ่):** เลือกทำลายการ์ด 1 ใบของเป้าหมายในสนามโดยไม่จำกัดระยะ
- ⚔️ **DUEL (การดวล):** ท้าดวลผู้เล่น 1 คน ทั้งสองฝ่ายต้องสลับกันทิ้ง SLASH ใครทิ้งไม่ได้ก่อนจะเสีย 1 HP
- 🔥 **FIRE_ATTACK (โจมตีด้วยไฟ):** เผยการ์ดบนมือเป้าหมาย หากผู้ร่ายทิ้งการ์ดที่มีดอกเดียวกับเป้าหมาย จะสร้าง 1 ดาเมจไฟ
- 🔗 **IRON_CHAIN (โซ่เหล็ก):** เลือกล่ามโซ่ผู้เล่น 1-2 คน (เมื่อผู้เล่นคนหนึ่งโดนดาเมจธาตุ ความเสียหายจะส่งผ่านไปยังทุกคนที่ติดโซ่) หรือใช้ทิ้งเพื่อจั่วการ์ดใหม่ 1 ใบ (Reforge)
- 📜 **EX_NIHILO (จั่วการ์ด 2 ใบ):** จั่วการ์ด 2 ใบขึ้นมือทันที
- 🏹 **ARROW_BARRAGE (ธนูหมื่นดอก):** โจมตีผู้เล่นทุกคน ทุกคนต้องทิ้ง DODGE 1 ใบ ไม่เช่นนั้นเสีย 1 HP
- 🐎 **BARBARIAN_INVASION (คนเถื่อนบุกรุก):** โจมตีผู้เล่นทุกคน ทุกคนต้องทิ้ง SLASH 1 ใบ ไม่เช่นนั้นเสีย 1 HP
- 🌸 **PEACH_GARDEN (คำปฏิญาณสวนท้อ):** ฟื้นฟู 1 HP ให้ผู้เล่นทุกคนในสนาม
- 🌾 **BUMPER_HARVEST (เก็บเกี่ยวสมบูรณ์):** เปิดการ์ดจากกองกลางเท่าจำนวนผู้เล่น ให้ทุกคนเลือกหยิบ 1 ใบ
- 🗡️ **BORROWED_SWORD (ยืมดาบฆ่าคน):** บังคับเป้าหมายคนแรก (ผู้สวมใส่อาวุธ) ให้ใช้ SLASH โจมตีเป้าหมายคนที่สอง หากไม่ทำจะถูกยึดอาวุธส่งให้ผู้ร่าย
- ⛔ **NEGATE (ไร้ข้อกังขา):** ร่ายเพื่อยกเลิกผลของการ์ดกลยุทธ์ใดๆ ก็ตาม

### 3.3 การ์ดพิจารณาหน่วงเวลา (Delayed Kits)
- 🌀 **ACEDIA (สุขไม่คิดกลับ):** วางใส่เป้าหมาย เมื่อถึง Judgement Phase หากเปิดได้ไพ่ที่ไม่ใช่สีแดง (Heart) จะถูกข้าม Play Phase
- 🌾 **STARVATION (เสบียงขาด):** วางใส่เป้าหมาย หากเปิดได้ไพ่ที่ไม่ใช่ดอกข้าวหลามตัด (Club) จะถูกข้าม Draw Phase
- ⚡ **LIGHTNING (อัสนีบาต):** วางในโซ่พิจารณาตนเอง หากเปิดได้ไพ่โพดำ (Spade 2-9) จะโดนสายฟ้าฟาด 3 ดาเมจ! หากไม่ติด จะเวียนไปให้ผู้เล่นคนถัดไป

### 3.4 ชุดอุปกรณ์สวมใส่ (Equipments)
- 🏹 **อาวุธ 12 ชนิด (Weapons - ระยะโจมตี 1 ถึง 5):**
  - **ZHUGE_CROSSBOW (หน้าไม้น่อกมม - ระยะ 1):** ร่าย SLASH ได้ไม่จำกัดจำนวนครั้ง
  - **BLUE_STEEL_SWORD (กระบี่เหล็กฟ้า - ระยะ 2):** โจมตีทะลวงและมองข้ามชุดเกราะของเป้าหมาย 100%
  - **YIN_YANG_SWORDS (กระบี่คู่หยินหยาง - ระยะ 2 - Interactive):** เมื่อโจมตีขุนพลเพศตรงข้าม ฝ่ายป้องกันต้องเลือกระหว่าง *"ทิ้งการ์ด 1 ใบ"* หรือ *"ให้ผู้โจมตีจั่วการ์ด 1 ใบ"*
  - **FROST_SWORD (กระบี่เหมันต์ - ระยะ 2 - Interactive):** เมื่อโจมตีสำเร็จ เลือกระหว่าง *"ทำดาเมจ 1 HP"* หรือ *"สละดาเมจเพื่อทำลายการ์ด 2 ใบของเป้าหมาย"*
  - **GREEN_DRAGON_BLADE (ง้าวมังกรเขียว - ระยะ 3 - Interactive):** หากเป้าหมายใช้ DODGE หลบได้ สามารถเลือกทิ้ง SLASH อีกใบเพื่อโจมตีซ้ำได้ทันที
  - **SERPENT_SPEAR (ทวนอสรพิษ - ระยะ 3):** ทิ้งการ์ดบนมือ 2 ใบใดๆ เพื่อใช้แทน SLASH ได้
  - **ROCK_CLEAVING_AXE (ขวานผ่าหิน - ระยะ 3 - Interactive):** หากเป้าหมายใช้ DODGE สามารถเลือกทิ้งการ์ดบนมือหรืออุปกรณ์ 2 ใบเพื่อบังคับให้โดนดาเมจทันที
  - **FEATHERED_FAN (พัดขนนก - ระยะ 4):** เปลี่ยน SLASH ปกติให้กลายเป็น SLASH ธาตุไฟ
  - **KIRIN_BOW (เกาทัณฑ์กิเลน - ระยะ 5):** เมื่อสร้างดาเมจด้วย SLASH สามารถทำลายม้า (+1 ม้าหมอบ หรือ -1 ม้าบุก) ของเป้าหมายทิ้งทันที
- 🛡️ **ชุดเกราะ 4 ชนิด (Armors):**
  - **EIGHT_TRIGRAMS_FORMATION (เกราะประยุทธ์แปดทิศ):** สุ่มเปิดไพ่พิจารณา 3D หากเป็นสีแดง ถือว่าหลบหลีกสำเร็จเสมือนร่าย DODGE
  - **NIO_SHIELD (เกราะเสือโคร่ง):** ป้องกันการ์ดโจมตีสีดำ (Spade/Club) 100%
  - **SILVER_LION_HELMET (หมวกสิงโตเงิน):** จำกัดความเสียหายสูงสุดไม่เกิน 1 HP ต่อครั้ง และเมื่อถูกปลด/สวมทับ/ขโมย/ทำลาย/ทิ้ง จะฟื้นฟู 1 HP ทันที
  - **RATTAN_ARMOR (เกราะหวาย):** ป้องกัน SLASH ปกติ, ธนูหมื่นดอก, และคนเถื่อนบุกรุก แต่รับดาเมจไฟแรงขึ้น +1 HP
- 🐎 **พาหนะ (Mounts):**
  - **RED_HARE / FERGANA_STEED (ม้าบุก -1 Distance):** ลดระยะห่างขณะโจมตีผู้อื่น (เป้าหมายอยู่ใกล้ขึ้น)
  - **LIGHTNING_HOOF / SHADOWRUNNER (ม้าหมอบ +1 Distance):** เพิ่มระยะห่างป้องกันตนเอง (ศัตรูโจมตีเรายากขึ้น)

---

### 3.5 ปัญญาประดิษฐ์ตามบทบาท (Tactical Role-Based Bot AI)
- **🗡️ กบฏ (Rebel):** คำนวณระยะโจมตี เล็งเป้าหมายและรุมกำจัด **จักรพรรดิ์ (Lord)** ให้เร็วที่สุด
- **🛡️ ภักดี (Loyalist):** ปกป้องจักรพรรดิ์ ใช้ PEACH สวนท้อกู้ชีพเมื่อจักรพรรดิ์ตกอยู่ในภาวะวิกฤต และเน้นกำจัดกบฏ
- **👑 จักรพรรดิ์ (Lord):** ระมัดระวังตัว รักษาพลังชีวิต ควบคุมสนาม และกำจัดกบฏที่แสดงตัว
- **☯️ ทรยศ (Renegade):** รักษาสมดุลของกระดาน ไม่ให้ฝ่ายใดฝ่ายหนึ่งชนะเร็วเกินไป เพื่อเข้าสู่รอบ **ดวล 1v1 กับจักรพรรดิ์** ในตอนท้าย

---

## 🧙‍♂️ 4. คลังขุนพลสามก๊กทั้ง 12 ตัว (Hero Skills)

| ขุนพล (Hero) | ก๊ก / HP | ทักษะและความสามารถพิเศษตามบอร์ดเกมมาตรฐาน (Authentic Skills) |
| :--- | :---: | :--- |
| **ขงเบ้ง (Zhuge Liang)** | 蜀 3 | **ดูดาว (Guanxing):** จัดเรียงไพ่ $N$ ใบจากบนสุดของกองไพ่ก่อนเริ่มเทิร์น (เลือกไว้บนสุดหรือนำไปไว้ใต้กองได้)<br>**ค่ายกลว่างเปล่า (Kongcheng):** เมื่อไม่มีไพ่บนมือ ได้รับสถานะคุ้มกันสมบูรณ์ต่อ `SLASH` และ `DUEL` |
| **เล่าปี่ (Liu Bei)** | 蜀 4 | **ปันสุข (Rende):** มอบการ์ดให้เพื่อนร่วมทัพ หากสะสมครบ $\ge 2$ ใบในเทิร์นจะฟื้นฟู 1 HP ทันที (เทิร์นละ 1 ครั้ง)<br>**ระดมพล (Jijiang - สกิลเจ้าเมือง):** ร้องขอให้ขุนพลจ๊กก๊กใช้การ์ด `SLASH` แทนตนเอง |
| **กวนอู (Guan Yu)** | 蜀 4 | **เทพสงคราม (Wusheng):** แปลงการ์ดสีแดง (♥️/♦️) ทุกชนิดจากบนมือหรือโซนอุปกรณ์มาใช้แทน `SLASH` ได้ |
| **เตียวหุย (Zhang Fei)** | 蜀 4 | **กู่ก้องคำราม (Paoxiao):** ใช้การ์ด `SLASH` โจมตีได้ไม่จำกัดจำนวนครั้งใน 1 เทิร์น |
| **จูล่ง (Zhao Yun)** | 蜀 4 | **มังกรทะลวง (Longdan):** แปลง `SLASH` เป็น `DODGE` หรือแปลง `DODGE` เป็น `SLASH` สลับกันได้ 100% |
| **โจโฉ (Cao Cao)** | 魏 4 | **มหาอุปราช (Jianxiong):** เมื่อได้รับความเสียหายจากการ์ดใดๆ จะหยิบการ์ดใบนั้นขึ้นมือตนเองทันที<br>**องครักษ์ (Hujia - สกิลเจ้าเมือง):** ร้องขอให้ขุนพลวุยก๊กใช้การ์ด `DODGE` ป้องกันแทนตนเอง |
| **สุมาอี้ (Sima Yi)** | 魏 3 | **ป้อนกลับ (Fankui):** เมื่อโดนดาเมจ สุ่มดึงการ์ด 1 ใบจากมือผู้ทำดาเมจ<br>**เปลี่ยนชะตา (Guicai):** มีป๊อปอัปเลือกทิ้งการ์ดบนมือเพื่อสลับเปลี่ยนผลการทำนาย (สายฟ้า/สุขไม่คิดกลับ/เสบียงขาด/เกราะแปดทิศ) |
| **เจินจี (Zhen Ji)** | 魏 3 | **ทำนายลั่วเสิน (Luoshen):** ช่วงเริ่มเทิร์น สุ่มจั่วการ์ดสีดำขึ้นมือเรื่อยๆ จนกว่าจะเปิดเจอการ์ดสีแดง<br>**ไร้ลักษณ์ (Qingguo):** ใช้การ์ดสีดำ (♠️/♣️) จากบนมือแทน `DODGE` ได้ |
| **ซุนกวน (Sun Quan)** | 吳 4 | **ผลัดการ์ด (Zhiheng):** เลือกทิ้งการ์ดบนมือและ/หรืออุปกรณ์สวมใส่ $N$ ใบ เพื่อจั่วการ์ดใหม่ $N$ ใบ (1 ครั้ง/เทิร์น)<br>**พันธมิตรกู้ชีพ (Jiuyuan - สกิลเจ้าเมือง):** เมื่อขุนพลง่อก๊กใช้ `PEACH` สวนท้อช่วยชีวิตตนเองขณะใกล้ตาย จะฟื้นฟู 2 HP ทันที |
| **จิวยี่ (Zhou Yu)** | 吳 3 | **รูปงาม (Yingzi):** จั่วการ์ด 3 ใบช่วง Draw Phase<br>**บ่มเพลิง (Fanjian):** ทิ้งการ์ด 1 ใบให้ศัตรูทายสี หากทายไม่ถูกหรือไม่ยอมทิ้งจะเสีย 1 HP |
| **ลิบอง (Lu Meng)** | 吳 3 | **ยับยั้งชั่งใจ (Keji):** ในเทิร์นของตน หากไม่ได้ร่ายการ์ด `SLASH` โจมตี จะข้ามช่วงทิ้งการ์ด (Discard Phase) ไปทันที สามารถสะสมไพ่บนมือได้ไม่จำกัด |
| **อุยกาย (Huang Gai)** | 吳 4 | **โบยตนเอง (Ku Rou):** ยอมเสีย 1 HP เพื่อจั่วการ์ด 2 ใบ (ใช้กี่ครั้งก็ได้ในเทิร์น) หากเลือดเหลือ $\le 0$ จะเข้าสู่ภาวะ DYING ถามตนเองก่อนเป็นคนแรก |
| **ลิโป้ (Lu Bu)** | 群 5 | **ไร้เทียมทาน (Wu Shuang/Unrivaled):** การร่าย `SLASH` บังคับให้ศัตรูต้องทิ้ง `DODGE` 2 ใบ และการดวล (`DUEL`) ฝ่ายตรงข้ามต้องใช้ `SLASH` 2 ใบต่อรอบ |
| **เตียวเสี้ยน (Diao Chan)** | 群 3 | **บ่วงเสน่หา (Lijian):** ทิ้งการ์ด 1 ใบ บังคับขุนพลชาย 2 คนดวล (`DUEL`) กันเอง<br>**จันทร์หลบโฉม (Biyue):** จั่วการ์ด 1 ใบฟรีเมื่อจบเทิร์นของตนเอง |

---

## 💻 5. อธิบายสถาปัตยกรรมและฟังก์ชันในซอร์สโค้ด (Codebase Architecture for Teaching)

โครงสร้างซอร์สโค้ดถูกแบ่งเป็น **Colyseus Server Stack** และ **Client-Side Architecture** อย่างชัดเจน โดยมีการแยก Game Logic ออกเป็นโมดูลย่อยเพื่อง่ายต่อการบำรุงรักษาและการเรียนการสอน:

```
WTK-Games/
├── colyseus_server.ts      # Entry Point — Colyseus 0.15 + Express (PORT 3001)
├── tsconfig.json           # TypeScript Configuration
├── dist/                   # Compiled JavaScript output (npm run build)
│   ├── colyseus_server.js
│   ├── game/
│   ├── rooms/
│   └── db/
├── rules.json              # ข้อกำหนดและกฎกติกาเกมฉบับมาตรฐาน
├── AGENTS.md               # ข้อกำหนดสถาปัตยกรรมและ Skill Registry
├── README.md               # คู่มือการเล่นและสื่อการเรียนการสอน
├── game/
│   ├── types.ts            # Shared Interfaces & Type Definitions
│   ├── phaseLogic.ts       # Deck, Turn Phases, Role Assignment, HP Setup
│   ├── cardLogic.ts        # Card Use Handlers, Negate Window, Action Chain
│   ├── combatLogic.ts      # dealDamage, checkGameOver, Dying Phase
│   └── botAI.ts            # Bot AI Brain — runBotTurn + Response Handlers
├── rooms/
│   ├── WTKRoom.ts          # Colyseus Room Class — onMessage Handlers ทั้งหมด
│   └── schema/WTKSchema.ts # Colyseus Schema — Delta Encoding State
├── db/
│   └── database.ts         # SQLite Helpers (initDatabase, recordPlayerStats, getLeaderboard)
├── plugins/
│   └── plugin_manager.ts   # Plugin System + SoundEffectsPlugin v1.2.0
├── public/
│   ├── colyseus_client.js  # Socket.IO Compat Layer สำหรับ Colyseus.Client
│   ├── room.html           # หน้าจอเกมหลัก (Glassmorphism 2.0 UI)
│   ├── lobby.html          # หน้าห้องพักรอเล่นเกม
│   ├── room_app.js         # Client-side Game Controller & Canvas/GSAP Handlers
│   ├── lobby.js            # Client-side Lobby Controller
│   ├── phaser_card_scene.js# Phaser 3 Canvas Card Scene
│   ├── style.css           # Design System & Responsive Layout (54KB Glassmorphism)
│   ├── cards_db.json       # พจนานุกรมการ์ด 41 ชนิด และ pic_url
│   └── heroes.json         # ฐานข้อมูลขุนพล 12 ตัว และคำแปลสกิลภาษาไทย
└── skills/                 # Open Design Skills Registry (9 skills)
```

### 5.1 ฟังก์ชันสำคัญฝั่ง Server

#### `game/phaseLogic.js` — Phase & Deck Management
1. **`initDeck()`:** สร้างและสับกองการ์ด 41 ชนิด รวมกว่า 240+ ใบ (Basic, Kit, Delayed, Equipment)
2. **`assignRoles(room)`:** สุ่มแจกบทบาท (LORD, LOYALIST, REBEL, RENEGADE) ตามจำนวนผู้เล่น 2–10 คน
3. **`endPlayerTurn(room)`:** ปิดเทิร์นอย่างปลอดภัย ตรวจสอบเงื่อนไขชนะทุกบทบาท และส่งต่อเทิร์น
4. **`setupCharacterHp(player, playerCount)`:** ตั้งค่า HP ตามตัวละคร (3 HP สำหรับตัวละคร INT-type, +1 LORD bonus เมื่อผู้เล่น ≥ 6)

#### `game/cardLogic.js` — Card Use & Action Chain
5. **`handleUseCard(room, socket, data)`:** Handler หลักสำหรับ `use_card` event — จัดการการร่ายการ์ดทุกชนิด
6. **`startNegateWindow(room, actionData)`:** เปิดหน้าต่าง 5 วินาทีให้ผู้เล่นทุกคนร่าย NEGATE ขัดขวาง
7. **`resolveActionChain(room)`:** ตัดสินผลของ Action Chain (จำนวนคู่คือถูกยกเลิก, จำนวนคี่คือสำเร็จ)

#### `game/combatLogic.js` — Damage & Game Over
8. **`dealDamage(room, targetPlayerId, damage, cardUsed, attackerId, damageType)`:** คำนวณความเสียหายรวม Armor passive, Iron Chain, Dying Phase
9. **`checkGameOver(room)`:** ตรวจสอบเงื่อนไขจบเกม — LORD ตาย = Rebel/Renegade ชนะ, ปราบทุกศัตรู = Lord ชนะ

#### `game/botAI.js` — Bot Intelligence
10. **`runBotTurn(room, botId)`:** AI Loop 8 ขั้นตอน — Heal → EX_NIHILO → Equip → AOE → Delayed → KIT → Wine → SLASH
11. **`handleBotDodge/DuelSlash/AOE/Seduction/ZhouYu/BumperPick/BorrowSlash`:** Bot Response Handlers สำหรับแต่ละสถานการณ์

#### `rooms/WTKRoom.js` — Colyseus Room
12. **`onCreate/onJoin/onLeave/onDispose`:** Lifecycle hooks จัดการ Reconnect grace period 45 วินาที และบันทึก DB เมื่อจบเกม
13. **`_registerHandlers()`:** ลงทะเบียน onMessage handlers ทั้งหมด รวม Character Skills, Admin Tools
14. **`_broadcastAll()`:** ส่ง Sanitized State ส่วนตัวให้แต่ละ Client (ซ่อนไพ่ของคนอื่น)

### 5.2 ฟังก์ชันสำคัญฝั่ง Client (`public/room_app.js`)
1. **`renderHand()`:** วาดการ์ดบนมือแบบคลี่พัด (Card Fan) คำนวณมุมและระยะห่าง `translate(x, y) rotate(deg)` พร้อมแสดงป้ายระยะโจมตีสีทอง `(ระยะ: N)` บนการ์ดอาวุธ
2. **`renderOpponents()`:** วาดการ์ดคู่ต่อสู้รอบโต๊ะตามมุมองศารูปครึ่งวงกลม ($10^\circ \rightarrow 170^\circ$) คำนวณระยะห่างระหว่างผู้เล่น ให้ออร่าสีทองนำสายตาเป้าหมาย
3. **`onSelectTarget(targetPlayerId)`:** ระบบจัดการเลือกเป้าหมายแบบ 2-Step Workflow สำหรับการ์ดหลายเป้าหมาย (`BORROWED_SWORD`, `IRON_CHAIN`)
4. **`showJudgementCardFlipAnimation(title, card, isSuccess, playerName)`:** ฟังก์ชันแสดงผลหน้าต่างเปิดไพ่พิจารณาชะตา 3D ด้วย GSAP Engine

### 5.3 Client ↔ Server Communication (`public/colyseus_client.js`)
ไฟล์นี้ทำหน้าที่เป็น **Socket.IO Compatibility Layer** ห่อหุ้ม `Colyseus.Client` ให้มี API เหมือน Socket.IO เดิม:
- `socket.emit(event, data)` → `room.send(event, data)`
- `socket.on(event, cb)` → `room.onMessage(event, cb)`
- Auto-reconnect เมื่อ disconnect โดยไม่ตั้งใจ (retry 3 วินาที)
- บันทึก Colyseus Reconnection Token ลง `localStorage` สำหรับการต่อกลับเข้าห้อง

---

## 🧪 6. โหมดทดสอบสำหรับแอดมิน (Admin Test Sandbox)

ผู้สอน ผู้พัฒนา หรือแอดมินสามารถใช้โหมดทดสอบเพื่อทดลองการ์ดและสกิลขุนพลทุกตัวได้อย่างอิสระผ่าน 2 ช่องทาง:

1. **เข้าผ่าน URL พิเศษ:** เปิดเบราว์เซอร์ไปที่ **`http://localhost:3001/test`**
2. **เข้าผ่านปุ่มเมนู:** กดปุ่ม **`🛠️ Admin Sandbox`** (สีส้มทอง) บนแถบเมนูด้านบนของหน้าจอเกม

### ฟังก์ชันในแผงควบคุม Admin Sandbox:
- 🧙‍♂️ **Hero Switcher:** เปลี่ยนตัวละครเป็นขุนพลคนใดก็ได้ใน 12 ตัวทันที
- 🃏 **Card Spawner:** เลือกเสกการ์ดชนิดใดก็ได้จาก 41 ชนิดขึ้นมือ
- ❤️ **HP Controls:** ปรับเพิ่ม/ลด HP หรือตั้งค่า `HP = 1` เพื่อทดสอบสถานะวิกฤตใกล้ตาย
- 🤖 **Bot Spawner:** เสกบอทคู่ต่อสู้เข้าร่วมทดสอบได้ทันที

---

## 🗄️ 6.5 การตรวจสอบและดูข้อมูลในฐานข้อมูล (SQLite Database Inspection)

ระบบเกมบันทึกข้อมูลลงใน SQLite Database ที่ไฟล์ `db/wtk_game.sqlite` โดยคุณสามารถเข้าดูข้อมูลได้ผ่าน **3 ช่องทางง่ายๆ**:

### 1. ดูผ่าน CLI Script (แนะนำที่สุด - แสดงเป็นตารางสวยงาม)
รันคำสั่งใน Terminal/PowerShell:
```bash
node db/view_db.js
```
ระบบจะแสดงข้อมูลสถิติผู้เล่น (Win rate / Kills / EXP), ประวัติการแข่งขัน (Match History) และจำนวนการ์ดในรูปแบบ `Console Table` สวยงามทันที

### 2. ดูผ่าน REST API Endpoint
เมื่อเปิดเซิร์ฟเวอร์ `node server.js` หรือ `node colyseus_server.js` สามารถเปิดเบราว์เซอร์ดูตารางผู้นำ (Leaderboard) ได้ที่:
```http
http://localhost:3001/api/leaderboard
```

### 3. ดูผ่านโปรแกรมจัดการ SQLite (GUI Tool)
หากต้องการแก้ไขหรือดูตารางทั้งหมดแบบคอลัมน์ สามารถดาวน์โหลดโปรแกรมฟรี เช่น **[DB Browser for SQLite](https://sqlitebrowser.org/)** หรือส่วนขยาย **VS Code SQLite Viewer** แล้วเปิดไฟล์:
```
d:\test\db\wtk_game.sqlite
```

---

## 🚀 7. วิธีการติดตั้งและเริ่มต้นใช้งาน (Getting Started)

### ความต้องการของระบบ (Prerequisites)
- **Node.js**: เวอร์ชัน 16.x ขึ้นไป
- **npm**: เวอร์ชัน 8.x ขึ้นไป

### ขั้นตอนการรันระบบ (Step-by-Step)
1. **ดาวน์โหลดหรือ Clone คลังโค้ด:**
   ```bash
   git clone https://github.com/Itsmnatom/WTK-Games.git
   cd WTK-Games
   ```
2. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```
3. **คอมไพล์ TypeScript & เริ่มต้นเซิร์ฟเวอร์ (Colyseus Stack — แนะนำ):**
   ```bash
   npm run build     # คอมไพล์ TypeScript โค้ดฝั่ง Server ลง dist/
   npm start         # รัน node dist/colyseus_server.js
   # หรือรันคำสั่งทดสอบพร้อมคอมไพล์ในคำสั่งเดียว
   npm test          # คอมไพล์และรัน Unit Test ทั้ง 19 ข้อ
   ```
   > ⚠️ **Legacy Server** (Socket.IO เก่า — ไม่แนะนำ): `npm run start:legacy`
4. **เข้าใช้งานผ่านเบราว์เซอร์:**
   - หน้าล็อบบี้หลัก: `http://localhost:3001/lobby`
   - โหมดทดสอบแอดมิน: `http://localhost:3001/test`
   - Colyseus Monitor Dashboard: `http://localhost:3001/colyseus`
   - ดูข้อมูลสถิติผู้เล่นผ่าน API: `http://localhost:3001/api/leaderboard`
   - ดูห้องที่เปิดอยู่: `http://localhost:3001/api/rooms`
5. **วิธีเข้าดูข้อมูลใน SQL Database (`db/wtk_game.sqlite`):**
   - **ผ่าน Terminal Command:** รันคำสั่ง `node db/view_db.js` เพื่อแสดงตารางสถิติผู้เล่นและประวัติการแข่งในคอนโซล
   - **ผ่าน GUI Program:** ใช้โปรแกรม [DB Browser for SQLite](https://sqlitebrowser.org/) หรือ VS Code Extension `SQLite Viewer` เปิดไฟล์ `db/wtk_game.sqlite`

---

## 📜 8. ลิขสิทธิ์และการนำไปใช้ (License & Citation)

โครงการนี้จัดทำขึ้นเพื่อประโยชน์ทางการศึกษาและการเรียนรู้การพัฒนาเกมการ์ดเรียลไทม์ สามารถนำไปใช้เป็นสื่อการเรียนการสอน พัฒนาต่อยอด หรือศึกษาโครงสร้างซอร์สโค้ดได้โดยเสรี

---

## 📝 9. บันทึกประวัติการปรับปรุงระบบและฟีเจอร์ใหม่ (Changelog & Updates)

| เวอร์ชั่น | รายละเอียดการปรับปรุง (Key Changes & Feature Additions) |
| :--- | :--- |
| **v2.2.0** | 🎯 **Authentic Mechanics & Comprehensive Rules Overhaul**: <br>• **ลิโป้ (Lu Bu) ใน DUEL:** สกิล Unrivaled/Wu Shuang บังคับให้ศัตรูต้องใช้ SLASH 2 ใบต่อรอบในการสู้กลับ ทั้งผู้เล่นและบอท AI<br>• **อุยกาย (Huang Gai) สกิล Ku Rou:** เพิ่มปุ่ม Action Bar สำหรับลด 1 HP เพื่อจั่ว 2 ใบไม่จำกัดครั้ง หาก HP $\le 0$ จะเข้าสู่ภาวะ DYING ถามอุยกายก่อนเป็นคนแรกทันที<br>• **โซ่เหล็ก & ลำดับวิกฤต (Iron Chain & Simultaneous DYING):** ดาเมจธาตุไฟ/สายฟ้าจะส่งผลพร้อมกันแก่ผู้เล่นที่ถูกล่ามโซ่ทั้งหมด พร้อมระบบคิว `dyingQueue` ประมวลผลการกู้ชีพตามเข็มนาฬิกาทีละคน<br>• **ยืมดาบฆ่าคน (Borrowed Sword):** เมื่อเป้าหมายไม่ใช้ SLASH อาวุธจะถูกย้ายเข้าสู่มือของผู้ร่ายการ์ดโดยตรง<br>• **หมวกสิงโตเงิน (Silver Lion Helmet):** ฟื้นฟู 1 HP ทันทีเมื่อถูกปลด/สวมทับ/ขโมย/ทำลาย/ทิ้งจากการ์ดหรือสกิล<br>• **สกิลแปลงการ์ดกวนอู & เจินจี:** กวนอูแปลงการ์ดสีแดงจากมือหรืออุปกรณ์เป็น SLASH ได้, เจินจีแปลงการ์ดสีดำจากมือเป็น DODGE ได้<br>• **สกิลเล่าปี่ & ซุนกวน:** เล่าปี่นับยอดสะสมมอบครบ $\ge 2$ ใบในเทิร์นฟื้นฟู 1 HP, ซุนกวนสามารถเลือกทิ้งการ์ดบนมือและอุปกรณ์ผสมกันเพื่อผลัดการ์ดได้<br>• **การแสดงผลหน้าไพ่ & ดอกไพ่:** แสดง Rank (A, 2-10, J, Q, K) และดอกไพ่ (♠️, ♥️, ♣️, ♦️) พร้อมสีแดง/ดำตรงตามไพ่จริงอย่างสะอาดตา |
| **v2.1.2** | 🎴 **3D Card Draw Animation & Complete Admin Spawner**: เพิ่มระบบอนิเมชันจั่วการ์ด 3D (`animateCardDraw`) บินเฉียงโค้งจากกองไพ่กลางสนาม (`#deck-pile`) ลงสู่มือผู้เล่น (`#hand-cards`) ด้วย GSAP 3D flip (หมุนจากหลังการ์ดมังกรทองกลับมาหน้าการ์ด) + เอฟเฟกต์ประกายไฟสว่างเมื่อร่อนลงมือ (`createLandingSparks`), พร้อมอัปเดต Admin Sandbox ให้เสกการ์ดครบ 41 ชนิดผูกระยะอาวุธอัตโนมัติและสลับขุนพลได้ครบทั้ง 12 ตัวละคร |
| **v2.1.1** | ⚔️ **Borrowed Sword & Character Safety Fix**: แก้ไขบั๊กการ์ด `BORROWED_SWORD` (ยืมดาบฆ่าคน) ทั้ง Client (`room_app.js` เพิ่ม dictionary fallback ระยะอาวุธและกรองเป้าหมาย Step 1/Step 2) และ Server (`game/cardLogic.ts` เพิ่มการคำนวณระยะอาวุธ fallback และ `rooms/WTKRoom.ts` เพิ่มการตรวจสอบประเภทการ์ด SLASH/สกิลขุนพลเมื่อตอบรับการยืมดาบ), พร้อมสกัดกั้น `TypeError: player.character.toUpperCase` กรณี character เป็น object 100% |
| **v2.1.0** | 📘 **TypeScript Server Migration**: ย้ายโค้ดฝั่ง Server ทั้งหมดจาก JavaScript ไปสู่ TypeScript (`colyseus_server.ts`, `game/types.ts`, `game/phaseLogic.ts`, `game/combatLogic.ts`, `game/cardLogic.ts`, `game/botAI.ts`, `rooms/WTKRoom.ts`, `rooms/schema/WTKSchema.ts`, `db/database.ts`, `plugins/plugin_manager.ts`), เพิ่ม `tsconfig.json`, คอมไพล์ลงโฟลเดอร์ `dist/`, ปรับปรุง `package.json` (`npm run build`, `npm start` -> `node dist/colyseus_server.js`, `npm test` -> `tsc && jest`), ลบไฟล์ `.js` เก่าฝั่ง Server และอัปเดต Unit Tests ทั้ง 19 ข้อให้ผ่าน 100% |

| **v2.0.0** | 🧪 **Jest Unit Test Suite**: เพิ่มชุดทดสอบอัตโนมัติด้วย Jest ครอบคลุม 4 โซนหลัก (`tests/phaseLogic.test.js`, `tests/combatLogic.test.js`, `tests/cardLogic.test.js`, `tests/database.test.js`) จำนวน 19 test cases ให้ผ่าน 100% พร้อมอัปเดตคำสั่ง `npm test` ใน `package.json` (`jest --verbose --forceExit`) |
| **v1.9.1** | 🎨 **Animation & Motion Polish**: ปรับปรุง physics-like animations ใน `public/style.css` (cubic-bezier cubic transitions, targetPulse, dramatic shake, winnerGlow, card hover/select elevation) |
| **v1.9.0** | 🖥️ **UX/UI Overhaul**: ปรับปรุง UI หน้า Room (Lobby + Draft + Game Board) เพิ่ม imperial header, player list v2, top bar button system, action bar two-row layout, skill button pills, game over premium overlay |
| **v1.8.1** | 🔓 ผู้เล่นที่ใช้ชื่อ `Admin` (ไม่แบ่งตัวพิมพ์ใหญ่/เล็ก) จะได้รับสิทธิ์ Admin โดยอัตโนมัติ **ทุกห้อง** โดยไม่ต้องใช้ Secret Key + ยกเลิกสิทธิ์ Admin อัตโนมัติของ Host (Host ได้แค่ปุ่ม Start Game) — ปรับใน `onJoin` และ `admin_authenticate` ของ `WTKRoom.js` |
| **v1.8.0** | 📋 อัปเดตเอกสาร `AGENTS.md` และ `README.md` ให้สะท้อนสถาปัตยกรรม Colyseus 0.15 ปัจจุบันอย่างครบถ้วน: แผนผังไฟล์ทั้งหมด, ตาราง Deck Composition, ตาราง Character Skills, ลำดับ Bot AI Priority, ตาราง Plugin Hooks, และรายการ Admin Tools ครบทุกตัว |
| **v1.7.5** | 🎨 ปรับปรุงความสว่างและการแสดงผลไพ่บนมือ: ลบผลกระทบของ GSAP Animation Opacity และกำหนดค่าความโปร่งแสงให้เป็นการ์ดทึบแสง (Opacity 100%) สว่างชัดเจนทุกใบอย่างสมบูรณ์แบบ |
| **v1.7.4** | 🎨 ปรับการแสดงผลการ์ดบนมือให้สว่างคมชัดและสวยงามเสมอกันทุกใบตามดีไซน์ต้นแบบ (Uniform Brightness Style) |
| **v1.7.3** | 🎨 ปรับปรุงการแสดงผลพลังชีวิต (HP) ให้สอดคล้องกันทั่วทั้งกระดาน: เปลี่ยนหลอด HP ของผู้เล่นคนอื่นให้ใช้จุดพลังชีวิตสีเขียว (`.hp-point`) เหมือนกับเพลทผู้เล่นหลัก |
| **v1.7.1** | 🐞 แก้ไขบั๊ก Grace Period Reconnect: ป้องกันห้องเกมถูกลบโดยไม่จำเป็นกรณีผู้เล่นคนสุดท้ายหลุดการเชื่อมต่อแต่ยังอยู่ระหว่างนับเวลาถอยหลัง Reconnect (45 วินาที) |
| **v1.7.0** | 🤖 เพิ่มระบบ **Bot Controller & Passive Mode ในโหมด `/test`**: กำหนดให้บอทอยู่เฉยๆ ไม่เล่นอัตโนมัติ (Passive), เพิ่มปุ่ม **➕ เพิ่มบอท**, **➖ ลบบอทออก**, **⏩ สั่งบอทผ่านเทิร์น**, และ **⚔️ สั่งบอทฟันใส่เรา** |
| **v1.6.2** | ⚡ ปรับสลับลำดับความสำคัญให้ URL Query Parameters (`params.get(...)`) มีลำดับความสำคัญสูงกว่า `sessionStorage` เพื่อให้ Intent จาก URL ในโหมดทดสอบ `/test` (`action=create`, `mode=BOT`) ทำงานได้อย่างถูกต้องเสมอมิโดนค่าเก่าทับ |
| **v1.6.1** | 🐞 แก้ไขบั๊ก String Mismatch การต่อเชื่อมใหม่ (`reconnect_player`) เติม `critical: true` และสั่งล้าง `localStorage` เคลียร์ `activeRoomId`/`activePlayerId` เมื่อเกิดข้อผิดพลาดวิกฤต ป้องกันอาการค้างหน้าจอเปล่า |
| **v1.6.0** | 🔐 แยกสิทธิ์ผู้เล่น **Player (สิทธิ์ผู้เล่นทั่วไป)** กับ **Admin (สิทธิ์แอดมินทดสอบระบบ)** ออกจากกันอย่างสมบูรณ์ ซ่อนปุ่ม Admin และเพิ่มระบบยืนยันสิทธิ์ Socket Authentication (`socket.isAdmin`) ป้องกันการส่งคำสั่งข้ามสิทธิ์ |
| **v1.5.1** | 🛡️ เพิ่มไฟล์ `.gitignore` ครอบคลุม `node_modules/`, `*.sqlite`, และไฟล์คอนฟิกชั่วคราว |
| **v1.5.0** | 🗄️ เพิ่มเลเยอร์ฐานข้อมูล **SQL Database (`db/database.js`)** ด้วย SQLite3 และระบบ **Plugin Architecture (`plugins/plugin_manager.js`)** พร้อม API `/api/leaderboard` |
| **v1.4.1** | ⚡ ปรับปรุงระบบเข้าเล่นโหมดทดสอบ `/test`: แก้ไข Redirect Loop, เพิ่มการตรวจจับ Null Check ป้องกัน Error, และเพิ่ม Auto-Start แมตช์พร้อมเสกบอท 3 ตัวให้อัตโนมัติ |
| **v1.4.0** | 🛠️ เพิ่มโหมด **Admin Test Sandbox (`/test`)** พร้อมแผงควบคุมสลับเปลี่ยนขุนพล, เสกการ์ด 41 ชนิด, ปรับ HP, และเสกบอทคู่ต่อสู้ |
| **v1.3.0** | 📖 จัดทำคู่มือสื่อการเรียนการสอนและสถาปัตยกรรมระบบใน `README.md` ภาษาไทยฉบับสมบูรณ์ |
| **v1.2.0** | 🎯 เพิ่มระบบเลือก 2 เป้าหมายสำหรับโซ่เหล็ก (`IRON_CHAIN`) และยืมดาบฆ่าคน (`BORROWED_SWORD`) พร้อมออร่าสีทองนำสายตา |
| **v1.1.0** | 🎨 เพิ่มการแสดงผลระยะโจมตีอาวุธ `(ระยะ: N)` บนมือ, แอนิเมชันเปิดไพ่พิจารณา 3D, และอัปเกรด Glassmorphism UI 2.0 |
