import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-031 (360-03) — Integrated 2D Radar & Field-of-View HUD
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_03', 'SCR-031: 2D Radar & FOV HUD', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('2D RADAR HUD', 'REAL-TIME FIELD-OF-VIEW CONE', true, 'Compass');

  const sId = '$scr_360_03';

  // 2. Blueprint Radar Container (Glass Card)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Radar / Blueprint Canvas',
    width: 345,
    height: 400,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'radar_canvas_03');

  // Blueprint Layout Zones
  b.addStep('CREATE_FRAME', {
    parentId: '$radar_canvas_03',
    name: 'Zone / Atrium (Active)',
    width: 190,
    height: 180,
    x: 20,
    y: 20,
    backgroundColor: '#09090B0D',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$radar_canvas_03',
    text: 'LIVING ATRIUM (ACTIVE)',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 36,
    y: 36
  });

  // Radar FOV Cone Marker (Circle + Vector Cone)
  b.addStep('CREATE_FRAME', {
    parentId: '$radar_canvas_03',
    name: 'FOV / Observer Node',
    width: 24,
    height: 24,
    x: 105,
    y: 100,
    backgroundColor: TOKENS.btnPrimaryBg,
    cornerRadius: 12
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$radar_canvas_03',
    text: '▲',
    fontSize: 12,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 111,
    y: 103
  });

  // Compass Heading Readout
  b.addStep('CREATE_FRAME', {
    parentId: '$radar_canvas_03',
    name: 'Pill / Heading Compass',
    width: 180,
    height: 32,
    x: 20,
    y: 348,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$radar_canvas_03',
    text: '🧭 HEADING 134° SE (RIVER)',
    fontSize: 10,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 32,
    y: 358
  });

  // Neighboring Rooms (Tap to Teleport)
  b.addStep('CREATE_FRAME', {
    parentId: '$radar_canvas_03',
    name: 'Zone / Kitchen',
    width: 105,
    height: 180,
    x: 220,
    y: 20,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$radar_canvas_03',
    text: 'KITCHEN\n(TAP TO MOVE)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.textSecondary,
    x: 232,
    y: 40
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$radar_canvas_03',
    name: 'Zone / Pool Cantilever',
    width: 305,
    height: 120,
    x: 20,
    y: 215,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$radar_canvas_03',
    text: 'SUNSET INFINITY POOL DECK (35M)\nFacing Saigon Riverfront',
    fontSize: 11,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 36,
    y: 255
  });

  // 3. Teleport Action Bar (Frosted Glass)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Teleport Bar',
    width: 345,
    height: 64,
    x: 24,
    y: 540,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'teleport_bar_03');

  b.addStep('CREATE_TEXT', {
    parentId: '$teleport_bar_03',
    text: 'Teleport: Tap any room zone above to jump instant 360 view',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 24
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / 3D Volumetric',
    text: 'Switch to 3D Volumetric Dollhouse View →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 620,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_dollhouse_03');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_03.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
