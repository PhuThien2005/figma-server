import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-078 (COM-04) — Master Blueprint Revision Comments & Approvals
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_04', 'SCR-078: Blueprint Revisions', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('REVISIONS', 'BLUEPRINT COMMENT LOG & SIGNOFF', true);

  const sId = '$scr_com_04';

  // 2. Blueprint Sheet Header Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Blueprint Sheet Info',
    width: 345,
    height: 110,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_bp_info_04');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bp_info_04',
    text: 'DRAWING NO. A-102 • LEVEL 01 ATRIUM & POOL PLAN',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bp_info_04',
    text: 'Revision C: Bamboo Column Modularity',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 36
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bp_info_04',
    text: 'Submitted: 14 Oct 2026 • Lead Structural Engineer: VTN Engineering Desk',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 64
  });

  // 3. Comments Audit Trail Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Comments Log',
    width: 345,
    height: 360,
    x: 24,
    y: 250,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_comments_04');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_comments_04',
    text: 'Client & Structural Review History',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const comments = [
    { author: 'Client Directive (Mrs. Do)', date: 'Yesterday 17:40', text: '“Extend teak dining terrace edge by 1.5m to align with morning reflection pool.”', status: '✓ INCORPORATED' },
    { author: 'Structural Engineer (Mr. Le)', date: 'Today 09:15', text: '“Re-calculated moment loads for extended cantilever. Steel tie-back verified.”', status: '✓ VERIFIED' },
    { author: 'Principal Architect (KTS Nghia)', date: 'Today 11:30', text: '“Aesthetic rhythm preserved. All shadow lines remain continuous.”', status: '✓ APPROVED' }
  ];

  let cY = 50;
  comments.forEach(c => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_comments_04',
      text: `${c.author} • ${c.date}`,
      fontSize: 10,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: cY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_comments_04',
      text: c.text,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textPrimary,
      x: 20,
      y: cY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_comments_04',
      text: `Status: ${c.status}`,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentEmerald,
      x: 20,
      y: cY + 48
    });

    cY += 74;
  });

  // 4. Action Button: Signoff Revision
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Signoff Revision',
    text: 'Formal Client Signoff (Lock Rev C)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 626
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_04.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
