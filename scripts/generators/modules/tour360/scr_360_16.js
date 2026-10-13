import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-044 (360-16) — 360 Master Zen Bedroom & Outdoor Forest Shower
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_16', 'SCR-044: 360 Master Zen Bedroom', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('360° MASTER ZEN SUITE', 'PRIVATE TERRACE & FOREST SHOWER', true);

  const sId = '$scr_360_16';

  // 2. Full-Bleed 360 Bedroom Viewport Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Master 360 Viewport',
    width: 345,
    height: 420,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'master_viewport_16');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$master_viewport_16',
    name: 'Bedroom Canvas Photo',
    width: 345,
    height: 420,
    x: 0,
    y: 0,
    imageUrl: 'master bedroom zen',
    color: TOKENS.bgSurface
  });

  // Hotspot 1: Outdoor Forest Rain Shower
  b.addStep('CREATE_FRAME', {
    parentId: '$master_viewport_16',
    name: 'Hotspot / Forest Shower',
    width: 175,
    height: 32,
    x: 150,
    y: 160,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$master_viewport_16',
    text: '⊙ Outdoor Rain Shower →',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 162,
    y: 170
  });

  // Hotspot 2: Private Sunset Tea Terrace
  b.addStep('CREATE_FRAME', {
    parentId: '$master_viewport_16',
    name: 'Hotspot / Tea Terrace',
    width: 160,
    height: 32,
    x: 20,
    y: 260,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$master_viewport_16',
    text: '⊙ Private Tea Terrace →',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 32,
    y: 270
  });

  // 3. Biophilic Sanctuary Specs Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Master Suite Specs',
    width: 345,
    height: 120,
    x: 24,
    y: 560,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_suite_specs_16');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_suite_specs_16',
    text: 'Master Sanctuary Specifications',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_suite_specs_16',
    text: '• Floor Area: 145 sq.m with 270° unobstructed panoramic river views\n• Natural Sound Isolation: Triple-glazed acoustic laminated glass (STC 48)\n• En-suite Bat Trang ceramic soaking tub carved from solid basalt block',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_suite_specs_16',
    text: 'ACOUSTIC ISOLATED • TRIPLE GLAZED',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 18,
    y: 94
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / View Level 2 Plan',
    text: 'Inspect Level 2 Master Floor Plan (CAD) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 694,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_suite_plan_16');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_16.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
