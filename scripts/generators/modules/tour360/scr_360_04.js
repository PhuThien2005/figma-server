import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-032 (360-04) — 3D Volumetric Dollhouse & BIM Cutaway
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_04', 'SCR-032: 3D Dollhouse View', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('3D DOLLHOUSE HUD', 'VOLUMETRIC BIM CUTAWAY • 360 ROTATION', true, 'Explode');

  const sId = '$scr_360_04';

  // 2. 3D Model Viewport Container (Frosted Glass)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / 3D Dollhouse Viewport',
    width: 345,
    height: 420,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'dollhouse_viewport_04');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$dollhouse_viewport_04',
    name: '3D Cutaway Graphic',
    width: 345,
    height: 320,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  // Floating 3D Rotation Badge
  b.addStep('CREATE_FRAME', {
    parentId: '$dollhouse_viewport_04',
    name: 'Badge / 3D Orbit',
    width: 140,
    height: 32,
    x: 16,
    y: 16,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$dollhouse_viewport_04',
    text: '⟲ ORBIT 360° ACTIVE',
    fontSize: 10,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 28,
    y: 26
  });

  // BIM Layer Filters inside 3D Viewport
  const bimLayers = ['Architecture', 'MEP Services', 'Furniture Staging'];
  let lX = 16;
  bimLayers.forEach((bl, i) => {
    const isA = i === 0;
    b.addStep('CREATE_FRAME', {
      parentId: '$dollhouse_viewport_04',
      name: `BIM / ${bl}`,
      width: 98,
      height: 32,
      x: lX,
      y: 370,
      backgroundColor: isA ? TOKENS.btnPrimaryBg : TOKENS.bgSurface,
      cornerRadius: 8
    });
    b.addStep('CREATE_TEXT', {
      parentId: '$dollhouse_viewport_04',
      text: bl,
      fontSize: 9,
      fontStyle: 'Bold',
      color: isA ? '#FFFFFF' : TOKENS.textSecondary,
      x: lX + 12,
      y: 380
    });
    lX += 106;
  });

  // 3. Technical Floor Cutaway Stepper Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Level Cutaway',
    width: 345,
    height: 80,
    x: 24,
    y: 560,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'cutaway_stepper_04');

  b.addStep('CREATE_TEXT', {
    parentId: '$cutaway_stepper_04',
    text: 'Active Cutaway: Level 1 + Cantilever Pool Deck',
    fontSize: 13,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$cutaway_stepper_04',
    text: 'Double-Height Atrium • 7.8m Clear Span • Saigon River Mooring',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 42
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Inspect Cross Section',
    text: 'Inspect Structural Cross-Section (CAD 1:50) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 654,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_cross_section_04');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_04.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
