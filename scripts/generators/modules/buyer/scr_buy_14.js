import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-024 (BUY-14) — Search Results Grid with Micro-metrics
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_14', 'SCR-024: Search Results Grid', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SEARCH RESULTS', '14 MATCHING SANCTUARIES FOUND', true, 'Sort');

  const sId = '$scr_buy_14';

  // 2. Sort Pills Row
  const sorts = ['VALUATION ↓', 'APPRECIATION ↑', 'LOTUS RATING'];
  const sGap = 8;
  const sWidth = Math.floor((345 - 2 * sGap) / 3);
  sorts.forEach((st, idx) => {
    const isAct = idx === 0;
    const stX = 24 + idx * (sWidth + sGap);
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Sort / ${st}`,
      width: sWidth,
      height: 36,
      x: stX,
      y: 124,
      backgroundColor: isAct ? TOKENS.btnPrimaryBg : TOKENS.bgCard,
      cornerRadius: 10
    }, `sort_pill_${idx}_14`);

    b.addStep('CREATE_TEXT', {
      parentId: `$sort_pill_${idx}_14`,
      text: st,
      fontSize: 10,
      fontStyle: 'Bold',
      color: isAct ? '#FFFFFF' : TOKENS.textSecondary,
      x: Math.floor(sWidth / 2 - 28),
      y: 11
    });
  });

  // 3. Result Card 1: Thảo Điền Riverfront
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Result 1',
    width: 345,
    height: 190,
    x: 24,
    y: 174,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'res_card_01_14');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$res_card_01_14',
    name: 'Cover / Thao Dien',
    width: 345,
    height: 110,
    x: 0,
    y: 0,
    imageUrl: 'villa thao dien',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$res_card_01_14',
    text: 'The Riverfront Bamboo Pavilion',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 122
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$res_card_01_14',
    text: 'Thảo Điền, Saigon • 920 sq.m • $5,800,000 USD • Cap Rate 6.8%',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 146
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$res_card_01_14',
    text: '★ 98% MATCH • VERIFIED TITLE',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 16,
    y: 168
  });

  // 4. Result Card 2: Ba Đình French Colonial
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Result 2',
    width: 345,
    height: 190,
    x: 24,
    y: 378,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'res_card_02_14');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$res_card_02_14',
    name: 'Cover / Ba Dinh',
    width: 345,
    height: 110,
    x: 0,
    y: 0,
    imageUrl: 'villa ba dinh',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$res_card_02_14',
    text: 'Ba Đình Colonial Sanctuary',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 122
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$res_card_02_14',
    text: 'Ba Đình, Hanoi • Restored 1928 • $7,400,000 USD • Cap Rate 5.4%',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 146
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$res_card_02_14',
    text: '★ 94% MATCH • HERITAGE TIER 1',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 16,
    y: 168
  });

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Compare Both',
    text: 'Compare Both Estates Side-by-Side →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 582,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_compare_14');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_14.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
