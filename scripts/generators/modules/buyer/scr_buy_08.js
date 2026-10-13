import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-018 (BUY-08) — Estate Comparison (Bento Side-by-Side)
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_08', 'SCR-018: Estate Comparison', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ESTATE COMPARISON', 'SIDE-BY-SIDE ARCHITECTURAL AUDIT', true);

  const sId = '$scr_buy_08';

  // 2. Dual Column Headers (Photos & Titles)
  // Left Estate: Thảo Điền Riverfront
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Col / Thao Dien Pavilion',
    width: 165,
    height: 140,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 14,
    clipsContent: true
  }, 'col_thao_dien_08');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$col_thao_dien_08',
    name: 'Thumb / Thao Dien',
    width: 165,
    height: 85,
    x: 0,
    y: 0,
    imageUrl: 'villa thao dien',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$col_thao_dien_08',
    text: 'Riverfront Pavilion',
    fontSize: 12,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 10,
    y: 95
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$col_thao_dien_08',
    text: '$5,800,000 USD',
    fontSize: 12,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 10,
    y: 115
  });

  // Right Estate: Ba Đình French Colonial
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Col / Ba Dinh Heritage',
    width: 165,
    height: 140,
    x: 204,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 14,
    clipsContent: true
  }, 'col_ba_dinh_08');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$col_ba_dinh_08',
    name: 'Thumb / Ba Dinh',
    width: 165,
    height: 85,
    x: 0,
    y: 0,
    imageUrl: 'villa ba dinh',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$col_ba_dinh_08',
    text: 'Ba Đình Colonial',
    fontSize: 12,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 10,
    y: 95
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$col_ba_dinh_08',
    text: '$7,400,000 USD',
    fontSize: 12,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 10,
    y: 115
  });

  // 3. Comparison Metrics Rows Container (Glass Card)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Comparison Table',
    width: 345,
    height: 270,
    x: 24,
    y: 280,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_table_08');

  const rows = [
    { metric: 'Lot Area', left: '920 sq.m', right: '1,140 sq.m' },
    { metric: 'Architect', left: 'Võ Trọng Nghĩa', right: 'Heritage (1928)' },
    { metric: 'Material', left: 'Bamboo & Glass', right: 'Teak & Brick' },
    { metric: 'Location', left: 'Saigon Riverfront', right: 'Hanoi Embassy Zone' },
    { metric: 'Status', left: 'LOTUS Platinum', right: 'Pink Book Title' }
  ];

  let rY = 16;
  rows.forEach((r, idx) => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_table_08',
      text: r.metric.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.textMuted,
      x: 16,
      y: rY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_table_08',
      text: r.left,
      fontSize: 12,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 16,
      y: rY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_table_08',
      text: r.right,
      fontSize: 12,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 180,
      y: rY + 16
    });

    rY += 50;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Select Primary',
    text: 'Reserve Riverfront Pavilion ($5.8M) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 574,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_select_08');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_08.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
