import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-058 (ARC-12) — Commission Fee Schedule & Retainer Breakdown
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_12', 'SCR-058: Commission Fee Schedule', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('RETAINER SCHEDULE', 'TRANSPARENT ARCHITECTURAL FEES', true);

  const sId = '$scr_arc_12';

  // 2. Total Commission Fee Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Total Fee Summary',
    width: 345,
    height: 100,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_fee_sum_12');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_fee_sum_12',
    text: 'TOTAL ARCHITECTURAL COMMISSION (ESTIMATED)',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_fee_sum_12',
    text: '$480,000 USD (₫11,800,000,000 VND)',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_fee_sum_12',
    text: 'Based on 8% of Estimated $6M Construction Cost • RIBA Standard',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  // 3. Milestone Installment Breakdown Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Fee Milestones',
    width: 345,
    height: 370,
    x: 24,
    y: 240,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_milestones_12');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_milestones_12',
    text: 'Escrow Milestone Disbursements',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const feeMilestones = [
    { pct: '15%', title: 'Phase 1: Initial Retainer & Concept', amount: '$72,000 USD', status: 'Due at LOI signing' },
    { pct: '25%', title: 'Phase 2: Schematic BIM & Physical Model', amount: '$120,000 USD', status: 'Due on model delivery' },
    { pct: '30%', title: 'Phase 3: Construction Working Drawings', amount: '$144,000 USD', status: 'Due on permit grant' },
    { pct: '30%', title: 'Phase 4: Site Supervision & Handover', amount: '$144,000 USD', status: 'Disbursed quarterly' }
  ];

  let mY = 50;
  feeMilestones.forEach(m => {
    b.addStep('CREATE_FRAME', {
      parentId: '$card_milestones_12',
      name: `Badge / ${m.pct}`,
      width: 44,
      height: 24,
      x: 20,
      y: mY,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 6
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_milestones_12',
      text: m.pct,
      fontSize: 10,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 30,
      y: mY + 6
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_milestones_12',
      text: m.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 74,
      y: mY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_milestones_12',
      text: `${m.amount} • ${m.status}`,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.textSecondary,
      x: 74,
      y: mY + 16
    });

    mY += 72;
  });

  // 4. Action Button: Authorize Retainer via Escrow
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Authorize Retainer',
    text: 'Authorize Initial Retainer ($72,000 USD)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_12.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
