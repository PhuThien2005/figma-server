import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-014 (BUY-04) — Estate Details: The Riverfront Bamboo Pavilion
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_04', 'SCR-014: Riverfront Estate Details', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ESTATE DETAILS', 'THE RIVERFRONT BAMBOO PAVILION', true, 'Share');

  const sId = '$scr_buy_04';

  // 2. Hero Cover Photo Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Hero / Cover Container',
    width: 345,
    height: 220,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'hero_cover_04');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$hero_cover_04',
    name: 'Cover Photo / Thao Dien',
    width: 345,
    height: 220,
    x: 0,
    y: 0,
    imageUrl: 'villa thao dien',
    color: TOKENS.bgSurface
  });

  // Favorite Heart Floating Button
  b.addStep('CREATE_FRAME', {
    parentId: '$hero_cover_04',
    name: 'Btn / Favorite',
    width: 36,
    height: 36,
    x: 295,
    y: 14,
    backgroundColor: '#FFFFFFE6',
    cornerRadius: 18
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$hero_cover_04',
    text: '♡',
    fontSize: 16,
    fontStyle: 'Regular',
    color: TOKENS.textPrimary,
    x: 307,
    y: 22
  });

  // 3. Title & Price Block
  b.addStep('CREATE_TEXT', {
    parentId: sId,
    text: 'The Riverfront Bamboo Pavilion',
    fontSize: 20,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 24,
    y: 360
  });

  b.addStep('CREATE_TEXT', {
    parentId: sId,
    text: 'Thảo Điền, Saigon Riverfront • KTS Võ Trọng Nghĩa',
    fontSize: 12,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 24,
    y: 388
  });

  b.addStep('CREATE_TEXT', {
    parentId: sId,
    text: '$5,800,000 USD',
    fontSize: 22,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 24,
    y: 414
  });

  // 4. Specifications Grid (6 Chips)
  const specs = [
    { label: '920 sq.m', sub: 'Site Area' },
    { label: '5 Suites', sub: 'Master Bedrooms' },
    { label: 'Private Marina', sub: 'Saigon River Dock' },
    { label: '35m Infinity Pool', sub: 'Riverfront Lap' },
    { label: 'Teak Cellar', sub: '1,200 Bottles' },
    { label: 'LOTUS Platinum', sub: 'Biophilic Certified' }
  ];

  const colW = 107;
  const gap = 12;
  specs.forEach((sp, i) => {
    const colIdx = i % 3;
    const rowIdx = Math.floor(i / 3);
    const spX = 24 + colIdx * (colW + gap);
    const spY = 450 + rowIdx * 48;
    const spRef = `spec_box_${i}_04`;

    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Spec / ${sp.label}`,
      width: colW,
      height: 40,
      x: spX,
      y: spY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: 10
    }, spRef);

    b.addStep('CREATE_TEXT', {
      parentId: `$${spRef}`,
      text: sp.label,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 10,
      y: 12
    });
  });

  // 5. Dual Action Buttons (360 Tour & Book Viewing)
  const actW = 166;
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Launch 360',
    text: '360 Spatial Tour →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 564,
    width: actW,
    height: 48,
    cornerRadius: 12
  });

  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Book Concierge',
    text: 'Reserve Viewing',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 202,
    y: 564,
    width: actW,
    height: 48,
    cornerRadius: 12
  });

  // 6. Primary Full CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Private Inquiry',
    text: 'Request Confidential Dossier (NDA) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 624,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_dossier_04');

  // 7. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_04.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
