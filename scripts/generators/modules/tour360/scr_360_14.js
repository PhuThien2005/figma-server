import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-042 (360-14) — 360 Spatial Snapshot & Pin Annotation Tool
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_14', 'SCR-042: Spatial Annotation Tool', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SPATIAL ANNOTATION', 'PIN NOTES DIRECT TO ARCHITECT', true, 'Share');

  const sId = '$scr_360_14';

  // 2. 360 Viewport Container with Visual Pin Markers
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Annotated Viewport',
    width: 345,
    height: 380,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'annotated_viewport_14');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$annotated_viewport_14',
    name: 'Atrium Annotation Canvas',
    width: 345,
    height: 380,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  // Pin 1: Custom Teak Table
  b.addStep('CREATE_FRAME', {
    parentId: '$annotated_viewport_14',
    name: 'Pin / Note 1',
    width: 200,
    height: 36,
    x: 20,
    y: 120,
    backgroundColor: '#09090BE6',
    cornerRadius: 18
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$annotated_viewport_14',
    text: '📌 Expand Dining Table to 14 Seats',
    fontSize: 10,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 32,
    y: 131
  });

  // Pin 2: Pool Cantilever Lighting
  b.addStep('CREATE_FRAME', {
    parentId: '$annotated_viewport_14',
    name: 'Pin / Note 2',
    width: 220,
    height: 36,
    x: 100,
    y: 260,
    backgroundColor: '#09090BE6',
    cornerRadius: 18
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$annotated_viewport_14',
    text: '📌 Submerged LED Strip along Pool Lip',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 112,
    y: 271
  });

  // 3. Audio & Text Annotation Drawer Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Annotation Memo',
    width: 345,
    height: 120,
    x: 24,
    y: 520,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_memo_14');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_memo_14',
    text: 'Client Design Modification Memo (2 Pins)',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_memo_14',
    text: '• Voice Note: Memo-01_ClientFeedback.m4a (0:45s recording)\n• Direct Dispatch: Synced to KTS Võ Trọng Nghĩa & BIM Engineering team\n• Response SLA: Lead Architect review within 24 business hours',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_memo_14',
    text: 'ARCHITECT SYNC READY',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 18,
    y: 94
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Send Notes',
    text: 'Send Annotated Brief to Lead Architect →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 654,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_send_memo_14');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_14.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
