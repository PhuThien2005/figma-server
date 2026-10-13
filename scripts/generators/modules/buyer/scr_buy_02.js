import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-012 (BUY-02) — Architectural Filters & Facets
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_02', 'SCR-012: Architectural Filters', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ARCHITECTURAL FACETS', 'PRICE RANGE $2.5M - $12.0M USD', true, 'Reset');

  const sId = '$scr_buy_02';

  // 2. Price Range Slider in Frosted Glass Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Price Filter',
    width: 345,
    height: 72,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_price_02');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_price_02',
    text: 'Valuation Range: $3,500,000 – $8,200,000 USD',
    fontSize: 12,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 16
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_price_02',
    name: 'Slider / Track BG',
    width: 313,
    height: 6,
    x: 16,
    y: 44,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 3
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_price_02',
    name: 'Slider / Active Range',
    width: 190,
    height: 6,
    x: 40,
    y: 44,
    backgroundColor: TOKENS.textPrimary,
    cornerRadius: 3
  });

  // 3. Section 1: Master Studio Selection
  b.addStep('CREATE_TEXT', {
    parentId: sId,
    text: 'MASTER ARCHITECTURE STUDIO',
    fontSize: 11,
    fontStyle: 'SemiBold',
    color: TOKENS.textMuted,
    x: 24,
    y: 216
  });

  const studios = [
    { name: 'VTN Architects (Võ Trọng Nghĩa)', active: true, count: '18 Estates' },
    { name: '1+1>2 Architects (Hoàng Thúc Hào)', active: false, count: '14 Estates' },
    { name: 'Ba Đình Colonial Restorations', active: false, count: '10 Estates' }
  ];

  let currY = 240;
  studios.forEach((st, i) => {
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Option / ${st.name}`,
      width: 345,
      height: 52,
      x: 24,
      y: currY,
      backgroundColor: st.active ? TOKENS.btnPrimaryBg : TOKENS.bgCard,
      cornerRadius: 12
    }, `st_opt_${i}_02`);

    b.addStep('CREATE_TEXT', {
      parentId: `$st_opt_${i}_02`,
      text: st.name,
      fontSize: 13,
      fontStyle: 'Bold',
      color: st.active ? '#FFFFFF' : TOKENS.textPrimary,
      x: 16,
      y: 17
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$st_opt_${i}_02`,
      text: st.count,
      fontSize: 11,
      fontStyle: 'Regular',
      color: st.active ? '#A1A1AA' : TOKENS.textSecondary,
      x: 260,
      y: 18
    });

    currY += 62;
  });

  // 4. Section 2: Material Typology (Bento Chips)
  b.addStep('CREATE_TEXT', {
    parentId: sId,
    text: 'PRIMARY ARCHITECTURAL MATERIALS',
    fontSize: 11,
    fontStyle: 'SemiBold',
    color: TOKENS.textMuted,
    x: 24,
    y: 440
  });

  const materials = ['Engineered Bamboo', 'Teak Wood', 'Bat Trang Ceramic', 'Basalt Stone'];
  materials.forEach((m, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const mX = 24 + col * (165 + 15);
    const mY = 464 + row * (44 + 10);
    const isAct = idx < 2;

    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Chip / ${m}`,
      width: 165,
      height: 44,
      x: mX,
      y: mY,
      backgroundColor: isAct ? TOKENS.bgSurface : TOKENS.bgCard,
      cornerRadius: 10
    }, `mat_${idx}_02`);

    b.addStep('CREATE_TEXT', {
      parentId: `$mat_${idx}_02`,
      text: `${isAct ? '✓ ' : '+ '}${m}`,
      fontSize: 12,
      fontStyle: isAct ? 'Bold' : 'Regular',
      color: TOKENS.textPrimary,
      x: 14,
      y: 14
    });
  });

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Apply Filters',
    text: 'Apply Filters (28 Sanctuaries) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 600,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_apply_02');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_02.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
