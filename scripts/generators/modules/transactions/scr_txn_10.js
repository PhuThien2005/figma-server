import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-098 (TXN-10) — Escrow Release Milestone Authorization
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_10', 'SCR-098: Escrow Release Milestone', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ESCROW RELEASE', 'AUTHORIZE DISBURSEMENT TO ARCHITECT', true);

  const sId = '$scr_txn_10';

  // 2. Milestone Release Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Milestone Release Request',
    width: 345,
    height: 160,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_release_req_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_release_req_10',
    text: 'PENDING CLIENT DISBURSEMENT APPROVAL',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_release_req_10',
    text: 'Milestone 2: Schematic BIM & Physical Model',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_release_req_10',
    text: 'Disbursement Amount: $120,000 USD (₫2,940,000,000 VND)\nRecipient: VTN Architects Design Studio Account\nVerification: 1:50 Timber model delivered & LOD-400 BIM reviewed',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_release_req_10',
    name: 'Pill / Condition Met',
    width: 305,
    height: 28,
    x: 20,
    y: 120,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_release_req_10',
    text: '✓ Independent Engineering Inspector Signoff Recorded',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 32,
    y: 127
  });

  // 3. Milestone Progress Bar & Timeline Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / All Escrow Milestones',
    width: 345,
    height: 310,
    x: 24,
    y: 300,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_all_escrow_ms_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_all_escrow_ms_10',
    text: 'Contract Escrow Stages ($480,000 Total)',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const stages = [
    { num: 'MS 1', name: 'Concept & Briefing Retainer (15%)', amount: '$72,000 USD', status: '✓ PAID', col: TOKENS.accentEmerald },
    { num: 'MS 2', name: 'Schematic BIM & Maquette (25%)', amount: '$120,000 USD', status: '● AWAITING YOUR APPROVAL', col: TOKENS.accentGold },
    { num: 'MS 3', name: 'Construction Documentation (30%)', amount: '$144,000 USD', status: '○ SCHEDULED', col: TOKENS.textMuted },
    { num: 'MS 4', name: 'Final Handover & Supervision (30%)', amount: '$144,000 USD', status: '○ SCHEDULED', col: TOKENS.textMuted }
  ];

  let stgY = 50;
  stages.forEach(s => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_all_escrow_ms_10',
      text: `${s.num} • ${s.name}`,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: stgY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_all_escrow_ms_10',
      text: `${s.amount} • ${s.status}`,
      fontSize: 10,
      fontStyle: 'Bold',
      color: s.col,
      x: 20,
      y: stgY + 16
    });

    stgY += 56;
  });

  // 4. Action Button: Authorize Release
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Confirm Disbursement',
    text: 'Authorize $120,000 USD Escrow Release',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_10.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
