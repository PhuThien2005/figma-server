import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-017 (BUY-07) — Investment Yield & Private Wealth Calculator
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_07', 'SCR-017: Investment Yield Calculator', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('CAPITAL & YIELD', 'PRIVATE WEALTH & CAP RATE ANALYSIS', true);

  const sId = '$scr_buy_07';

  // 2. Metrics Bento Row (Appreciation & Net Cap Rate)
  b.addMetricsBento([
    { label: '5-YR APPRECIATION', value: '+14.2% / YR', color: TOKENS.accentEmerald },
    { label: 'NET CAP RATE', value: '6.8% NET', color: TOKENS.accentGold }
  ], 124);

  // 3. Financial Breakdown Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Facility Breakdown',
    width: 345,
    height: 310,
    x: 24,
    y: 228,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_finance_07');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_finance_07',
    text: 'Priority Private Banking Facility',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  const lines = [
    { label: 'Sanctuary Acquisition Price', val: '$5,800,000 USD' },
    { label: 'Required Client Equity (30%)', val: '$1,740,000 USD' },
    { label: 'Syndicated Private Loan (70%)', val: '$4,060,000 USD' },
    { label: 'Preferential Fixed Rate', val: '3.85% (Vietcombank Priority)' },
    { label: 'Estimated Annual Cash Flow', val: '+$394,400 USD / YR' },
    { label: '5-Year Projected Valuation', val: '$8,420,000 USD' }
  ];

  let lY = 56;
  lines.forEach((ln, idx) => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_finance_07',
      text: ln.label,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: lY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_finance_07',
      text: ln.val,
      fontSize: 12,
      fontStyle: 'Bold',
      color: idx === 0 || idx === 5 ? TOKENS.accentGold : TOKENS.textPrimary,
      x: 180,
      y: lY
    });

    lY += 40;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Request Facility',
    text: 'Request Private Banking Facility →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 564,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_loan_07');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_07.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
