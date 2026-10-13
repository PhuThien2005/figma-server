import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-019 (BUY-09) — Saved Sanctuaries & Curated Wishlists
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_09', 'SCR-019: Saved Sanctuaries', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SAVED SANCTUARIES', 'CURATED PRIVATE SHORTLIST (3)', false, 'Edit');

  const sId = '$scr_buy_09';

  // 2. Filter Category Pills
  const pills = ['ALL SAVED (3)', 'WATERFRONT (2)', 'HERITAGE (1)'];
  const pGap = 8;
  const pWidth = Math.floor((345 - 2 * pGap) / 3);
  pills.forEach((p, idx) => {
    const isAct = idx === 0;
    const pX = 24 + idx * (pWidth + pGap);
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Pill / ${p}`,
      width: pWidth,
      height: 36,
      x: pX,
      y: 124,
      backgroundColor: isAct ? TOKENS.btnPrimaryBg : TOKENS.bgCard,
      cornerRadius: 10
    }, `pill_saved_${idx}_09`);

    b.addStep('CREATE_TEXT', {
      parentId: `$pill_saved_${idx}_09`,
      text: p,
      fontSize: 10,
      fontStyle: 'Bold',
      color: isAct ? '#FFFFFF' : TOKENS.textSecondary,
      x: Math.floor(pWidth / 2 - 28),
      y: 11
    });
  });

  // 3. Saved Estate Card 1: Thảo Điền Riverfront
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Saved 1 - Thao Dien',
    width: 345,
    height: 116,
    x: 24,
    y: 176,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_saved_01_09');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_saved_01_09',
    name: 'Thumb / Thao Dien',
    width: 100,
    height: 116,
    x: 0,
    y: 0,
    imageUrl: 'villa thao dien',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_saved_01_09',
    text: 'The Riverfront Bamboo Pavilion',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 116,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_saved_01_09',
    text: 'Thảo Điền, Saigon • 920 sq.m',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 116,
    y: 40
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_saved_01_09',
    text: '$5,800,000 USD',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 116,
    y: 68
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_saved_01_09',
    name: 'Btn / View 360',
    text: '360 Tour →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 236,
    y: 64,
    width: 96,
    height: 34,
    cornerRadius: 8
  });

  // 4. Saved Estate Card 2: Ba Đình French Colonial
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Saved 2 - Ba Dinh',
    width: 345,
    height: 116,
    x: 24,
    y: 308,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_saved_02_09');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_saved_02_09',
    name: 'Thumb / Ba Dinh',
    width: 100,
    height: 116,
    x: 0,
    y: 0,
    imageUrl: 'villa ba dinh',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_saved_02_09',
    text: 'Ba Đình Colonial Sanctuary',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 116,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_saved_02_09',
    text: 'Ba Đình, Hanoi • Restored 1928',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 116,
    y: 40
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_saved_02_09',
    text: '$7,400,000 USD',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 116,
    y: 68
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_saved_02_09',
    name: 'Btn / View 360',
    text: '360 Tour →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 236,
    y: 64,
    width: 96,
    height: 34,
    cornerRadius: 8
  });

  // 5. Saved Estate Card 3: Hội An Ancient Teak Resort
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Saved 3 - Hoi An',
    width: 345,
    height: 116,
    x: 24,
    y: 440,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_saved_03_09');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_saved_03_09',
    name: 'Thumb / Hoi An',
    width: 100,
    height: 116,
    x: 0,
    y: 0,
    imageUrl: 'resort hoi an',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_saved_03_09',
    text: 'Hội An Heritage Teak Estate',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 116,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_saved_03_09',
    text: 'Hội An Ancient Town • 1,450 sq.m',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 116,
    y: 40
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_saved_03_09',
    text: '$4,800,000 USD',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 116,
    y: 68
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_saved_03_09',
    name: 'Btn / View 360',
    text: '360 Tour →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 236,
    y: 64,
    width: 96,
    height: 34,
    cornerRadius: 8
  });

  // 6. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Schedule VIP Tour',
    text: 'Schedule Private Tour for All 3 Estates →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 574,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_tour_09');

  // 7. Bottom Navigation Dock (Tab 2: Saved Active)
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_09.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
