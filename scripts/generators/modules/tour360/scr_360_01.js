import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-029 (360-01) — 360 Living Room Atrium (Spatial Hotspots & High-res Panorama)
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_01', 'SCR-029: 360 Living Room Atrium', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('360° PANORAMA ATRIUM', 'DOUBLE-HEIGHT 7.8M CEILING • THẢO ĐIỀN', true);

  const sId = '$scr_360_01';

  // 2. Full-Bleed 360 Panoramic Viewport
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / 360 Viewport',
    width: 345,
    height: 480,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'container_360_viewport');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$container_360_viewport',
    name: 'Panorama Canvas / Atrium',
    width: 345,
    height: 480,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  // Hotspot 1: To Teak Kitchen
  b.addStep('CREATE_FRAME', {
    parentId: '$container_360_viewport',
    name: 'Hotspot / To Kitchen',
    width: 140,
    height: 36,
    x: 40,
    y: 200,
    backgroundColor: '#09090BE6',
    cornerRadius: 18
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$container_360_viewport',
    text: '⊙ To Teak Kitchen →',
    fontSize: 11,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 52,
    y: 211
  });

  // Hotspot 2: To Sunset Infinity Pool
  b.addStep('CREATE_FRAME', {
    parentId: '$container_360_viewport',
    name: 'Hotspot / To Pool',
    width: 154,
    height: 36,
    x: 160,
    y: 300,
    backgroundColor: '#09090BE6',
    cornerRadius: 18
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$container_360_viewport',
    text: '⊙ To Sunset Pool Deck →',
    fontSize: 11,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 172,
    y: 311
  });

  // 3. Frosted Glass HUD Controls Bar
  b.addStep('CREATE_FRAME', {
    parentId: '$container_360_viewport',
    name: 'HUD / Floating Controls',
    width: 313,
    height: 68,
    x: 16,
    y: 396,
    backgroundColor: '#FFFFFFFA',
    cornerRadius: 14
  }, 'hud_controls_bar');

  b.addStep('CREATE_TEXT', {
    parentId: '$hud_controls_bar',
    text: '◎ Gyroscope Active • Drag to Pan • Pinch to Zoom',
    fontSize: 11,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$hud_controls_bar',
    text: '♫ Spatial Audio: Monsoon Rain & Saigon River Breeze',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.accentEmerald,
    x: 16,
    y: 40
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Floor Plan Navigation',
    text: 'Open 2D / 3D Floor Plan HUD →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 620,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_floorplan_01');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_01.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
