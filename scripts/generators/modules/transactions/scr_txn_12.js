import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-100 (TXN-12) — Tax Invoicing & State Treasury Stamp Duty Receipt
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_12', 'SCR-100: Stamp Duty & Treasury Tax', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('TAX & DUTY', 'STATE TREASURY OFFICIAL TAX RECEIPT', true);

  const sId = '$scr_txn_12';

  // 2. State Treasury Receipt Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Treasury Tax Hero',
    width: 345,
    height: 150,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_treasury_tax_12');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_treasury_tax_12',
    text: 'VIETNAM STATE TREASURY (KHO BẠC NHÀ NƯỚC)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_treasury_tax_12',
    text: 'Official E-Invoice & Duty Receipt No. 88912',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_treasury_tax_12',
    text: 'Taxpayer: ARKI Vietnam Private Client SPV (Tax Code: 031888999)\nIssuing Authority: Thu Duc City Tax Department, HCMC\nPayment Channel: Vietcombank State Treasury Direct Gateway',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_treasury_tax_12',
    name: 'Pill / Treasury Clearance',
    width: 305,
    height: 28,
    x: 20,
    y: 120,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_treasury_tax_12',
    text: '✓ 100% Tax Obligations Fulfilled & Cleared',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 32,
    y: 127
  });

  // 3. Tax Breakdown Itemization Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Tax Breakdown',
    width: 345,
    height: 330,
    x: 24,
    y: 290,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_tax_breakdown_12');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_tax_breakdown_12',
    text: 'Itemized Statutory Fees',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const duties = [
    { name: '1. Registration Stamp Duty (Lệ Phí Trước Bạ - 0.5%)', val: '₫1,025,000,000 VND ($41,800 USD)', status: '✓ PAID' },
    { name: '2. Personal Income Tax Withholding (Thuế TNCN - 2%)', val: '₫4,100,000,000 VND ($167,300 USD)', status: '✓ SETTLED' },
    { name: '3. Cadastral Cadastre Fee & Title Issuance Duty', val: '₫15,000,000 VND ($610 USD)', status: '✓ PAID' },
    { name: '4. State Notary Public Statutory Fee Stamp', val: '₫10,000,000 VND ($408 USD)', status: '✓ CLEARED' }
  ];

  let dtY = 50;
  duties.forEach(d => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_tax_breakdown_12',
      text: d.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: dtY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_tax_breakdown_12',
      text: `${d.val} • ${d.status}`,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.accentEmerald,
      x: 20,
      y: dtY + 16
    });

    dtY += 56;
  });

  // 4. Action Button: Download Official Tax PDF
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Download Tax Receipt',
    text: 'Download Official General Department of Taxation PDF',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_12.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
