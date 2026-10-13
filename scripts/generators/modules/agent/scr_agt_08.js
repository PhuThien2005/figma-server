import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-068 (AGT-08) — Lotus Tea Ceremony Private Reception Schedule
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_08', 'SCR-068: Lotus Tea Ceremony', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('TEA CEREMONY', 'WEST LAKE LOTUS TEA TRADITION', true);

  const sId = '$scr_agt_08';

  // 2. Lotus Tea Visual Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Lotus Tea Master',
    width: 345,
    height: 190,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_tea_master_08');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_tea_master_08',
    name: 'Photo / Lotus Tea Service',
    width: 345,
    height: 190,
    x: 0,
    y: 0,
    imageUrl: 'hoi an resort teak',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_tea_master_08',
    name: 'Glass Label / Tea Master',
    width: 305,
    height: 48,
    x: 20,
    y: 126,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_tea_master_08',
    text: 'TRÀ SEN TÂY HỒ • 100-YEAR HERITAGE RITUAL',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 32,
    y: 136
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_tea_master_08',
    text: 'Scented overnight inside living lotus blossoms at dawn',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 32,
    y: 152
  });

  // 3. Reception Ritual Steps Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Ceremony Steps',
    width: 345,
    height: 280,
    x: 24,
    y: 330,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_ceremony_steps_08');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_ceremony_steps_08',
    text: 'Private Welcome Reception Format',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const steps = [
    { num: 'I', title: 'Awakening of the Senses (Khai Vị)', desc: 'Pure Ba Vì mineral spring water heated to 85°C over olive-wood embers.' },
    { num: 'II', title: 'Blossom Unfolding (Mở Cánh Sen)', desc: 'Fresh lotus blossom harvested at 5:00 AM unsealed table-side by Master.' },
    { num: 'III', title: 'Three Pourings of Gratitude (Tam Trà)', desc: 'First pour: Earth essence • Second: Heartwood note • Third: Lingering honey.' },
    { num: 'IV', title: 'Architectural Discussion Commences', desc: 'Private introduction of the master architect and estate deeds.' }
  ];

  let stY = 48;
  steps.forEach(s => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_ceremony_steps_08',
      text: s.num,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: stY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_ceremony_steps_08',
      text: s.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 44,
      y: stY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_ceremony_steps_08',
      text: s.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 44,
      y: stY + 14
    });

    stY += 52;
  });

  // 4. Action Button: Schedule Reception
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Confirm Ceremony',
    text: 'Reserve Lotus Tea Ceremony for Next Villa Visit',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_08.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
