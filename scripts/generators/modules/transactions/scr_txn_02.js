import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-090 (TXN-02) — Escrow Account Ledger & Multi-Currency Deposit
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_02', 'SCR-090: Escrow Ledger', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ESCROW LEDGER', 'STANDARD CHARTERED TRUST ACCOUNT', true);

  const sId = '$scr_txn_02';

  // 2. Escrow Balance Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Escrow Balance',
    width: 345,
    height: 140,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_escrow_bal_02');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_escrow_bal_02',
    text: 'TOTAL ESCROW BALANCE HELD IN TRUST',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_escrow_bal_02',
    text: '$500,000.00 USD (₫12,250,000,000 VND)',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_escrow_bal_02',
    text: 'Account: SCB-VN-TRUST-88891 • Custodian: Standard Chartered Bank (Vietnam)\nInterest Accrual: 3.4% p.a. Compounded to Buyer Account',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  // 3. Multi-Currency Transactions Ledger Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Transactions Ledger',
    width: 345,
    height: 340,
    x: 24,
    y: 280,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_txn_ledger_02');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_txn_ledger_02',
    text: 'Audit Trail of Escrow Ledger',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const txns = [
    { title: 'Inward Wire Transfer (SWIFT MT103)', amount: '+$500,000 USD', from: 'UBS AG Zurich (Client Ref #AK-01)', status: '✓ CLEARED' },
    { title: 'FX Spot Hedging Facility Lock', amount: '₫12,250,000,000 VND', from: 'Standard Chartered Treasury Desk', status: '✓ LOCKED @ 24,500' },
    { title: 'Notary Legal Audit Fee Disbursement', amount: '-$5,000 USD', from: 'Baker McKenzie Client Account', status: '✓ DISBURSED' }
  ];

  let txY = 50;
  txns.forEach(t => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_txn_ledger_02',
      text: t.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: txY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_txn_ledger_02',
      text: `${t.amount} • ${t.from}`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: txY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_txn_ledger_02',
      text: t.status,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentEmerald,
      x: 20,
      y: txY + 34
    });

    txY += 66;
  });

  // 4. Action Button: Deposit Funds
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Deposit Funds',
    text: 'Wire Supplementary Funds to Escrow',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_02.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
