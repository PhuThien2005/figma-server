import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-093 (TXN-05) — Master Sales Contract (SPA) Digital Clause Review
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_05', 'SCR-093: SPA Clause Review', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SALES CONTRACT', 'MASTER SALE & PURCHASE AGREEMENT (SPA)', true);

  const sId = '$scr_txn_05';

  // 2. Contract Status Bento
  b.addMetricsBento([
    { label: 'CLAUSES REVIEWED', value: '48 OF 48 READY', color: TOKENS.accentGold },
    { label: 'LEGAL AUDIT', value: '100% COMPLIANT', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Essential Clauses Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Core SPA Clauses',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_spa_clauses_05');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_spa_clauses_05',
    text: 'Key Protective Clauses for Buyer',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const clauses = [
    { num: 'Clause 4.1', title: 'Defect Liability Warranty (10 Years)', text: 'Developer & VTN Studio warrant bamboo structural integrity and roof waterproofing for 120 months.' },
    { num: 'Clause 8.3', title: 'Pink Book Title Handover Deadline', text: 'Official Sổ Hồng transferred to Buyer within 90 days of final payment completion.' },
    { num: 'Clause 12.2', title: 'Force Majeure & River Bank Setback', text: 'Full compensation escrow protection against any municipal zoning amendments.' },
    { num: 'Clause 15.4', title: 'International Dispute Resolution', text: 'Exclusive arbitration at Singapore International Arbitration Centre (SIAC).' }
  ];

  let clY = 50;
  clauses.forEach(c => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_spa_clauses_05',
      text: `${c.num}: ${c.title}`,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: clY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_spa_clauses_05',
      text: c.text,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: clY + 16
    });

    clY += 66;
  });

  // Stamp of Legal Approval
  b.addStep('CREATE_FRAME', {
    parentId: '$card_spa_clauses_05',
    name: 'Box / Legal Stamp',
    width: 305,
    height: 44,
    x: 20,
    y: 318,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_spa_clauses_05',
    text: '✓ Certified Fair & Enforceable under 2024 Vietnam Real Estate Law',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 28,
    y: 332
  });

  // 4. Action Button: Approve Clauses
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Approve SPA',
    text: 'Approve SPA & Schedule Notarization',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_05.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
