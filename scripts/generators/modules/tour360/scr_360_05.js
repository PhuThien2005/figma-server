import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-033 (360-05) — AR Laser Measure Tool & Clear Span Diagnostics
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_05', 'SCR-033: AR Laser Measure', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('AR LASER MEASURE', 'MILLIMETER-PRECISION DIMENSIONS', true, 'Metric (m)');

  const sId = '$scr_360_05';

  // 2. AR Laser Viewport Container (Frosted Glass)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / AR Measure Viewport',
    width: 345,
    height: 380,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'ar_viewport_05');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$ar_viewport_05',
    name: 'Atrium Laser Photo',
    width: 345,
    height: 380,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  // AR Laser Line 1: Clear Ceiling Height (Vertical)
  b.addStep('CREATE_FRAME', {
    parentId: '$ar_viewport_05',
    name: 'Laser / Vertical Height',
    width: 2,
    height: 220,
    x: 172,
    y: 40,
    backgroundColor: TOKENS.accentEmerald
  });
  b.addStep('CREATE_FRAME', {
    parentId: '$ar_viewport_05',
    name: 'Badge / 7.82m Height',
    width: 86,
    height: 28,
    x: 130,
    y: 130,
    backgroundColor: '#09090BD9',
    cornerRadius: 14
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$ar_viewport_05',
    text: '↕ 7.82 m',
    fontSize: 11,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 146,
    y: 137
  });

  // AR Laser Line 2: Atrium Width (Horizontal)
  b.addStep('CREATE_FRAME', {
    parentId: '$ar_viewport_05',
    name: 'Laser / Horizontal Width',
    width: 280,
    height: 2,
    x: 32,
    y: 280,
    backgroundColor: TOKENS.accentGold
  });
  b.addStep('CREATE_FRAME', {
    parentId: '$ar_viewport_05',
    name: 'Badge / 12.20m Width',
    width: 96,
    height: 28,
    x: 124,
    y: 266,
    backgroundColor: '#09090BD9',
    cornerRadius: 14
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$ar_viewport_05',
    text: '↔ 12.20 m',
    fontSize: 11,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 138,
    y: 273
  });

  // 3. Precision Readout Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Dimension Readout',
    width: 345,
    height: 120,
    x: 24,
    y: 520,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'readout_card_05');

  b.addStep('CREATE_TEXT', {
    parentId: '$readout_card_05',
    text: 'Laser Diagnostics Summary',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$readout_card_05',
    text: 'Clear Span Ceiling: 7.82 m (Double-Height Lotus Open)\nAtrium Floor Area: 224.5 m² • Total Air Volume: 1,751 m³\nLaser Tolerance: ± 2 mm (Leica Geosystems Calibrated)',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$readout_card_05',
    text: 'CALIBRATED AR LASER',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 18,
    y: 94
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Export Sheet',
    text: 'Export Verified Dimension Sheet (CAD) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 654,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_export_dim_05');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_05.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
