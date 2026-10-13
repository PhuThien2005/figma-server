import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-046 (360-18) — 360 Tour Summary & Private Inquiry Submission
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_18', 'SCR-046: Tour Summary & Inquiries', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('TOUR SUMMARY', 'SESSION COMPLETE • 4 ROOMS INSPECTED', true, 'Share');

  const sId = '$scr_360_18';

  // 2. Metrics Bento Row (Rooms Explored & Hotspots)
  b.addMetricsBento([
    { label: 'SPATIAL ROOMS', value: '4 / 4 VISITED', color: TOKENS.accentEmerald },
    { label: 'HOTSPOTS AUDITED', value: '18 INSPECTED', color: TOKENS.accentGold }
  ], 124);

  // 3. Session Summary Recap Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Session Recap',
    width: 345,
    height: 290,
    x: 24,
    y: 228,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_summary_18');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_summary_18',
    text: 'Inspection Dossier Summary',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  const recapItems = [
    { title: 'The Riverfront Bamboo Pavilion', sub: 'Thảo Điền, Saigon • 920 sq.m • $5,800,000 USD' },
    { title: 'Client Modifications Recorded', sub: '2 Visual Pins (Dining Table & Pool Lip Lighting)' },
    { title: 'Voice Memo Dispatched', sub: 'Memo-01.m4a synced to Lead Architect' },
    { title: 'Escrow Facility Status', sub: 'Pre-Approved by Vietcombank Priority' }
  ];

  let rY = 56;
  recapItems.forEach((rc, i) => {
    b.addStep('CREATE_FRAME', {
      parentId: '$card_summary_18',
      name: `Box / ${rc.title}`,
      width: 305,
      height: 48,
      x: 20,
      y: rY,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 10
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_summary_18',
      text: `✓ ${rc.title}`,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 32,
      y: rY + 10
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_summary_18',
      text: rc.sub,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 32,
      y: rY + 28
    });

    rY += 56;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Submit LOI',
    text: 'Submit Confidential Letter of Intent (LOI) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 546,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_submit_loi_18');

  // 5. Secondary Action Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Book Private Yacht',
    text: 'Reserve On-Site Yacht Inspection',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 24,
    y: 610,
    width: 345,
    height: 48,
    cornerRadius: TOKENS.cornerRadiusBtn
  });

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_18.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
