import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-035 (360-07) — Sun Path & Daylight Simulation
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_07', 'SCR-035: Sun Path Simulation', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SUN PATH SIMULATION', 'SOLAR ANGLE & AMBIENT ILLUMINATION', true, 'Timeline');

  const sId = '$scr_360_07';

  // 2. Sun Path Time Presets (4 Pills)
  const times = ['DAWN 06:30', 'NOON 12:00', 'GOLDEN 17:15', 'NIGHT 21:00'];
  const tGap = 8;
  const tWidth = Math.floor((345 - 3 * tGap) / 4);
  times.forEach((tm, idx) => {
    const isAct = idx === 2; // Golden hour active
    const tX = 24 + idx * (tWidth + tGap);
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Time / ${tm}`,
      width: tWidth,
      height: 36,
      x: tX,
      y: 124,
      backgroundColor: isAct ? TOKENS.accentGold : TOKENS.bgCard,
      cornerRadius: 10
    }, `time_pill_${idx}_07`);

    b.addStep('CREATE_TEXT', {
      parentId: `$time_pill_${idx}_07`,
      text: tm,
      fontSize: 9,
      fontStyle: 'Bold',
      color: isAct ? '#FFFFFF' : TOKENS.textSecondary,
      x: Math.floor(tWidth / 2 - 24),
      y: 12
    });
  });

  // 3. Golden Hour Lighting Viewport Canvas
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Sun Path Viewport',
    width: 345,
    height: 320,
    x: 24,
    y: 172,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'sunpath_viewport_07');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$sunpath_viewport_07',
    name: 'Sunset Lighting Photo',
    width: 345,
    height: 320,
    x: 0,
    y: 0,
    imageUrl: 'sunset infinity pool',
    color: TOKENS.bgSurface
  });

  // Solar Metrics Overlay Badge
  b.addStep('CREATE_FRAME', {
    parentId: '$sunpath_viewport_07',
    name: 'Badge / Solar Data',
    width: 200,
    height: 36,
    x: 16,
    y: 16,
    backgroundColor: '#09090BD9',
    cornerRadius: 18
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$sunpath_viewport_07',
    text: '☀ AZIMUTH 248° • ELEVATION 14°',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 28,
    y: 27
  });

  // 4. Biophilic Daylight Diagnostics Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Daylight Metrics',
    width: 345,
    height: 124,
    x: 24,
    y: 504,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_daylight_07');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_daylight_07',
    text: 'Tropical Passive Solar Performance',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_daylight_07',
    text: '• Natural Daylight Factor: 92% (Zero artificial lighting required)\n• Heat Gain Reduction: -68% via deep engineered bamboo overhangs\n• Natural Cross-Ventilation: 2.4 m/s airflow from Saigon River',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 40
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_daylight_07',
    text: 'LOTUS PASSIVE SOLAR CERTIFIED',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 18,
    y: 98
  });

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Simulate Solstice',
    text: 'Simulate Solar Solstice & Monsoon Angles →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 640,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_solstice_07');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_07.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
