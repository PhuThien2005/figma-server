import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-025 (BUY-15) — Price Trend & Appreciation Index
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_15', 'SCR-025: Valuation Trend Index', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('VALUATION INDEX', 'HISTORICAL APPRECIATION (2020–2026)', true);

  const sId = '$scr_buy_15';

  // 2. Metrics Bento Row (Thảo Điền & Thủ Thiêm Growth)
  b.addMetricsBento([
    { label: 'THỦ THIÊM CAGR', value: '+18.2% / YR', color: TOKENS.accentEmerald },
    { label: 'THẢO ĐIỀN CAGR', value: '+16.4% / YR', color: TOKENS.accentGold }
  ], 124);

  // 3. Historical Appreciation Chart Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Appreciation Chart',
    width: 345,
    height: 310,
    x: 24,
    y: 228,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_chart_15');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_chart_15',
    text: 'Vietnam Prime Luxury Land Appreciation Index',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_chart_15',
    text: 'Benchmark: Base 100 in 2020 → Index 234 in 2026',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 44
  });

  // Trend Bars Simulation
  const zones = [
    { name: 'Thủ Thiêm Peninsula (Saigon)', cagr: '+18.2%', barW: 240, color: TOKENS.accentEmerald },
    { name: 'Thảo Điền Riverfront (Saigon)', cagr: '+16.4%', barW: 215, color: TOKENS.accentGold },
    { name: 'Tây Hồ Waterfront (Hanoi)', cagr: '+14.5%', barW: 190, color: TOKENS.textPrimary },
    { name: 'Ba Đình French Quarter (Hanoi)', cagr: '+11.8%', barW: 160, color: TOKENS.textSecondary }
  ];

  let zY = 76;
  zones.forEach((zn, i) => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_chart_15',
      text: zn.name,
      fontSize: 11,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 20,
      y: zY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_chart_15',
      text: zn.cagr,
      fontSize: 11,
      fontStyle: 'Bold',
      color: zn.color,
      x: 275,
      y: zY
    });

    // Bar background
    b.addStep('CREATE_FRAME', {
      parentId: '$card_chart_15',
      name: `Bar BG / ${zn.name}`,
      width: 305,
      height: 8,
      x: 20,
      y: zY + 20,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 4
    });

    // Active progress bar
    b.addStep('CREATE_FRAME', {
      parentId: '$card_chart_15',
      name: `Bar Active / ${zn.name}`,
      width: zn.barW,
      height: 8,
      x: 20,
      y: zY + 20,
      backgroundColor: zn.color,
      cornerRadius: 4
    });

    zY += 54;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Download Report',
    text: 'Download Full Q3 Investment Report (PDF) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 564,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_report_15');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_15.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
