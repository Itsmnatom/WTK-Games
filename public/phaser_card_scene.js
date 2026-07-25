/**
 * public/phaser_card_scene.js
 * Phaser 3 Client Scene — Card Interaction, Selection, Auto-Target & Drag & Drop
 */

(function () {
  const CARD_NAME_DICT = {
    'SLASH': 'โจมตี (SLASH)',
    'DODGE': 'หลบ (DODGE)',
    'PEACH': 'สวนท้อ (PEACH)',
    'WINE': 'สุรา (WINE)',
    'FIRE_ATTACK': 'โจมตีด้วยไฟ',
    'THUNDER_ATTACK': 'สายฟ้าโจมตี',
    'BUMPER_HARVEST': 'เสบียงอุดมสมบูรณ์',
    'PEACH_GARDEN': 'สวนท้อสาบาน',
    'NEGATE': 'ไร้ข้อกังขา',
    'IRON_CHAIN': 'โซ่เหล็ก',
    'BARBARIAN_INVASION': 'วันฟ้าทลายศัตรู',
    'BORROWED_SWORD': 'ยืมดาบฆ่าคน',
    'ARROW_BARRAGE': 'ฝนธนู (ARCHERY)',
    'EX_NIHILO': 'ไร้กลางมี',
    'DUEL': 'ประลอง (DUEL)',
    'STEAL': 'ขโมย (STEAL)',
    'SABOTAGE': 'ทำลาย (SABOTAGE)',
    'LIGHTNING': 'อัสนีบาต',
    'ACEDIA': 'สุขไม่คิดกลับ',
    'STARVATION': 'เสบียงขาด',
    'ZHUGE_CROSSBOW': 'หน้าไม้จูกัด',
    'BLUE_STEEL_SWORD': 'ดาบชิงกัง',
    'GREEN_DRAGON_BLADE': 'ง้าวมังกรเขียว',
    'SERPENT_SPEAR': 'ทวนอสรพิษ',
    'ROCK_CLEAVING_AXE': 'ขวานผ่าหิน',
    'EIGHT_TRIGRAMS_FORMATION': 'ประยุทธ์แปดทิศ',
    'NIO_SHIELD': 'โล่หนี่หวัง',
    'RED_HARE': 'ม้าเซ็กเธาว์',
    'LIGHTNING_HOOF': 'ม้าเต็กเลา'
  };

  const FALLBACK_PICS = {
    'SLASH': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014284266ed161a63759.jpg',
    'DODGE': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014233766ed14e9bebdb.jpg',
    'PEACH': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014400566ed18c590b33.jpg',
    'WINE': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014452766ed1a07699f7.jpg',
    'STEAL': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014363066ed17eed2877.jpg',
    'SABOTAGE': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014290866ed161a63759.jpg',
    'DUEL': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014345866ed1792871c0.jpg',
    'ARROW_BARRAGE': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014340966ed1761909c6.jpg',
    'BARBARIAN_INVASION': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014305266ed169cc2b59.jpg',
    'EX_NIHILO': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014343666ed177cc16a3.jpg',
    'ZHUGE_CROSSBOW': 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014293266ed164c8ef28.jpg',
    'RED_HARE': '/images/red_hare.png',
    'LIGHTNING_HOOF': '/images/lightning_hoof.png'
  };

  class CardTableScene extends Phaser.Scene {
    constructor() {
      super({ key: 'CardTableScene' });
      this.cardContainerMap = new Map();
      this.handCardsData = [];
      this.selectedCardId = null;
    }

    preload() {}

    create() {
      this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');
      this.scale.on('resize', this.handleResize, this);

      window.addEventListener('updatePhaserHand', (e) => {
        if (e.detail && e.detail.cards) {
          this.syncHandCards(e.detail.cards);
        }
      });
    }

    handleResize(gameSize) {
      this.cameras.main.setSize(gameSize.width, gameSize.height);
      this.arrangeHandCards();
    }

    syncHandCards(cards) {
      // Clear duplicate Phaser card sprites so only HTML DOM cards render cleanly without double layering
      for (const [id, container] of this.cardContainerMap.entries()) {
        container.destroy();
      }
      this.cardContainerMap.clear();
      return;
    }

    getCardPicUrl(card) {
      if (card.pic_url && !card.pic_url.includes('default.png')) return card.pic_url;
      const dict = window.CARD_DICT || {};
      if (dict[card.name] && dict[card.name].pic && !dict[card.name].pic.includes('default.png')) {
        return dict[card.name].pic;
      }
      return FALLBACK_PICS[card.name] || 'https://sjsea-2cstatic.oss-cn-hongkong.aliyuncs.com/uploads/banner/2014284266ed161a63759.jpg';
    }

    createCardContainer(card) {
      const w = 125;
      const h = 175;

      const centerX = this.cameras.main.width / 2;
      const centerY = this.cameras.main.height / 2;

      const container = this.add.container(centerX, centerY);
      container.setScale(0.2);
      container.setAlpha(0);

      let themeBorder = 0xc6a15b;
      if (card.name === 'SLASH' || card.name === 'THUNDER_ATTACK' || card.name === 'FIRE_ATTACK') {
        themeBorder = 0xef4444;
      } else if (card.name === 'DODGE' || card.name === 'NEGATE') {
        themeBorder = 0x3b82f6;
      } else if (card.name === 'PEACH' || card.name === 'WINE') {
        themeBorder = 0xec4899;
      }

      // 1. Dark Glass Card Frame Base
      const bg = this.add.graphics();
      bg.fillStyle(0x0f172a, 0.96);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 10);
      bg.lineStyle(2.5, themeBorder, 0.95);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 10);
      container.add(bg);

      // Gold Corner Brackets
      const cornerSize = 10;
      const corners = this.add.graphics();
      corners.lineStyle(1.5, 0xf0c040, 0.8);
      corners.moveTo(-w / 2 + 4, -h / 2 + 4 + cornerSize);
      corners.lineTo(-w / 2 + 4, -h / 2 + 4);
      corners.lineTo(-w / 2 + 4 + cornerSize, -h / 2 + 4);
      corners.moveTo(w / 2 - 4 - cornerSize, -h / 2 + 4);
      corners.lineTo(w / 2 - 4, -h / 2 + 4);
      corners.lineTo(w / 2 - 4, -h / 2 + 4 + cornerSize);
      corners.moveTo(-w / 2 + 4, h / 2 - 4 - cornerSize);
      corners.lineTo(-w / 2 + 4, h / 2 - 4);
      corners.lineTo(-w / 2 + 4 + cornerSize, h / 2 - 4);
      corners.moveTo(w / 2 - 4 - cornerSize, h / 2 - 4);
      corners.lineTo(w / 2 - 4, h / 2 - 4);
      corners.lineTo(w / 2 - 4, h / 2 - 4 - cornerSize);
      corners.strokePath();
      container.add(corners);

      // 2. Card Illustration Image Area
      const imgKey = `card_img_${card.name}`;
      const picUrl = this.getCardPicUrl(card);

      const cardImg = this.add.image(0, -6, imgKey);
      cardImg.setDisplaySize(w - 12, h - 56);
      container.add(cardImg);

      if (!this.textures.exists(imgKey)) {
        this.load.image(imgKey, picUrl);
        this.load.once(`filecomplete-image-${imgKey}`, () => {
          if (cardImg && cardImg.active) {
            cardImg.setTexture(imgKey);
            cardImg.setDisplaySize(w - 12, h - 56);
          }
        });
        this.load.start();
      }

      // Top Title Bar Backdrop
      const titleBg = this.add.graphics();
      titleBg.fillStyle(0x000000, 0.75);
      titleBg.fillRect(-w / 2 + 4, -h / 2 + 4, w - 8, 24);
      container.add(titleBg);

      // Top Title Text
      const displayName = CARD_NAME_DICT[card.name] || card.name || 'การ์ด';
      const titleText = this.add.text(0, -h / 2 + 16, displayName, {
        fontFamily: 'Outfit, sans-serif',
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#f0c040',
        align: 'center'
      }).setOrigin(0.5);
      container.add(titleText);

      // Bottom Suit & Rank Badge Bar Backdrop
      const badgeBg = this.add.graphics();
      badgeBg.fillStyle(0x000000, 0.85);
      badgeBg.fillRect(-w / 2 + 4, h / 2 - 28, w - 8, 24);
      container.add(badgeBg);

      // Suit & Rank Text
      const suitSymbol = card.suit === 'HEART' ? '♥' : card.suit === 'DIAMOND' ? '♦' : card.suit === 'SPADE' ? '♠' : '♣';
      const isRed = card.suit === 'HEART' || card.suit === 'DIAMOND';
      const suitText = this.add.text(-w / 2 + 12, h / 2 - 16, `${suitSymbol} ${card.rank || ''}`, {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '14px',
        fontWeight: 'bold',
        color: isRed ? '#ef4444' : '#ffffff'
      }).setOrigin(0, 0.5);

      // Type Badge Text
      const typeText = this.add.text(w / 2 - 12, h / 2 - 16, card.type || 'BASIC', {
        fontFamily: 'Outfit, sans-serif',
        fontSize: '10px',
        fontWeight: '600',
        color: '#94a3b8'
      }).setOrigin(1, 0.5);

      container.add([suitText, typeText]);

      container.setSize(w, h);
      container.cardData = card;

      // Make Interactive
      container.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h), Phaser.Geom.Rectangle.Contains);
      this.input.setDraggable(container);

      // Pointer Click / Selection Handler
      container.on('pointerdown', () => {
        this.selectedCardId = card.id;
        window.dispatchEvent(new CustomEvent('phaserCardSelected', {
          detail: { cardId: card.id, cardName: card.name }
        }));
      });

      // Hover Animations
      container.on('pointerover', () => {
        if (!container.isDragging) {
          this.tweens.add({
            targets: container,
            scaleX: 1.2,
            scaleY: 1.2,
            y: container.baseY - 40,
            rotation: 0,
            duration: 180,
            ease: 'Back.out'
          });
          container.setDepth(1000);
        }
      });

      container.on('pointerout', () => {
        if (!container.isDragging) {
          this.tweens.add({
            targets: container,
            scaleX: 1,
            scaleY: 1,
            x: container.baseX,
            y: container.baseY,
            rotation: container.baseRotation,
            duration: 180,
            ease: 'Power2'
          });
          container.setDepth(container.baseDepth);
        }
      });

      // Dragging Logic
      container.on('dragstart', () => {
        container.isDragging = true;
        container.setDepth(2000);
      });

      container.on('drag', (pointer, dragX, dragY) => {
        const deltaX = pointer.x - pointer.prevPosition.x;
        const tiltAngle = Phaser.Math.Clamp(deltaX * 0.04, -0.25, 0.25);

        container.x = dragX;
        container.y = dragY;
        container.rotation = tiltAngle;
      });

      container.on('dragend', () => {
        container.isDragging = false;

        const screenHeight = this.cameras.main.height;
        if (container.y < screenHeight - 220) {
          this.createSparkBurst(container.x, container.y, themeBorder);

          window.dispatchEvent(new CustomEvent('phaserCardPlayed', {
            detail: { cardId: container.cardData.id, cardName: container.cardData.name }
          }));
        }

        this.tweens.add({
          targets: container,
          scaleX: 1,
          scaleY: 1,
          x: container.baseX,
          y: container.baseY,
          rotation: container.baseRotation,
          duration: 220,
          ease: 'Cubic.out'
        });
        container.setDepth(container.baseDepth);
      });

      return container;
    }

    createSparkBurst(x, y, colorHex) {
      for (let i = 0; i < 16; i++) {
        const particle = this.add.graphics();
        particle.fillStyle(colorHex, 1);
        particle.fillCircle(0, 0, Phaser.Math.Between(2, 5));
        particle.setPosition(x, y);

        const angle = Math.random() * Math.PI * 2;
        const speed = Phaser.Math.Between(80, 220);

        this.tweens.add({
          targets: particle,
          x: x + Math.cos(angle) * speed,
          y: y + Math.sin(angle) * speed,
          alpha: 0,
          scale: 0.2,
          duration: Phaser.Math.Between(300, 600),
          ease: 'Quad.out',
          onComplete: () => particle.destroy()
        });
      }
    }

    arrangeHandCards() {
      const cardsCount = this.handCardsData.length;
      if (cardsCount === 0) return;

      const screenWidth = this.cameras.main.width;
      const screenHeight = this.cameras.main.height;

      const centerX = screenWidth / 2;
      const centerY = screenHeight + 300;

      const maxArcAngle = Math.min(cardsCount * 6, 45);
      const startAngle = -maxArcAngle / 2;
      const stepAngle = cardsCount > 1 ? maxArcAngle / (cardsCount - 1) : 0;
      const radius = 400;

      this.handCardsData.forEach((c, index) => {
        const container = this.cardContainerMap.get(c.id);
        if (!container) return;

        const currentAngleDegree = startAngle + (stepAngle * index);
        const currentAngleRad = Phaser.Math.DegToRad(currentAngleDegree - 90);

        const targetX = centerX + radius * Math.cos(currentAngleRad);
        const targetY = centerY + radius * Math.sin(currentAngleRad);
        const targetRotation = Phaser.Math.DegToRad(currentAngleDegree);

        container.baseX = targetX;
        container.baseY = targetY;
        container.baseRotation = targetRotation;
        container.baseDepth = index + 10;

        if (!container.isDragging) {
          this.tweens.add({
            targets: container,
            x: targetX,
            y: targetY,
            rotation: targetRotation,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 400 + index * 50,
            ease: 'Back.out'
          });
          container.setDepth(container.baseDepth);
        }
      });
    }
  }

  window.initPhaserCardCanvas = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const config = {
      type: Phaser.AUTO,
      parent: containerId,
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: true,
      physics: { default: 'arcade' },
      scene: [CardTableScene]
    };

    window.phaserGame = new Phaser.Game(config);

    // Canvas overlay for particle FX & animations (passes clicks to DOM cards)
    if (window.phaserGame && window.phaserGame.canvas) {
      window.phaserGame.canvas.style.pointerEvents = 'none';
    }

    window.addEventListener('resize', () => {
      if (window.phaserGame) {
        window.phaserGame.scale.resize(window.innerWidth, window.innerHeight);
      }
    });
  };
})();
