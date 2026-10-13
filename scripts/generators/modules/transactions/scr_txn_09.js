import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-097 (TXN-09) — Luxury Property Insurance & Heritage Asset Policy
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_09', 'SCR-097: Property Insurance Policy', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ASSET INSURANCE', 'LLOYD’S OF LONDON HERITAGE UNDERWRITING', true);

  const sId = '$scr_txn_09';

  // 2. Policy Coverage Bento
  b.addMetricsBento([
    { label: 'TOTAL SUM INSURED', value: '$12,000,000 USD', color: TOKENS.accentGold },
    { label: 'ALL-RISK COVERAGE', value: '100% COMPREHENSIVE', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Insurance Coverage Breakdown Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Coverage Details',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_insurance_cov_09');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_insurance_cov_09',
    text: 'Tailored Heritage Villa Policy Schedule',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const coverages = [
    { title: 'Architectural Craftsmanship Rebuilding', limit: '$8,500,000 USD', desc: 'Guarantees authentic reconstruction by VTN Studio using seasoned bamboo and artisan guilds.' },
    { title: 'Fine Art, Antiquities & Wine Cellar Floater', limit: '$2,500,000 USD', desc: 'Covers Indochine lacquer paintings, humidity control failure, and cellar breakage.' },
    { title: 'Tropical Riverfront Flood & Landslip Indemnity', limit: '$1,000,000 USD', desc: 'Specialized 100-year Saigon river basin high tide surge protection.' }
  ];

  let cvY = 50;
  coverages.forEach(c => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_insurance_cov_09',
      text: `${c.title} • ${c.limit}`,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: cvY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_insurance_cov_09',
      text: c.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: cvY + 16
    });

    cvY += 66;
  });

  // Policy Underwriter Badge
  b.addStep('CREATE_FRAME', {
    parentId: '$card_insurance_cov_09',
    name: 'Badge / Underwriter',
    width: 305,
    height: 48,
    x: 20,
    y: 290,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_insurance_cov_09',
    text: 'Policy Syndicate: Lloyd’s of London Syndicate 2987 • Annual Premium: $18,400 USD',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 28,
    y: 306
  });

  // 4. Action Button: Download Insurance Certificate
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Download Insurance',
    text: 'Download Certificate of Insurance (PDF)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_09.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
