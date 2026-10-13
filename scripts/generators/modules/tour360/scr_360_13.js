import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-041 (360-13) — Day to Night Lighting Transition
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_13', 'SCR-041: Lighting Transition', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('LIGHTING TRANSITION', 'DAYLIGHT SKYLIGHT VS. NIGHT AMBIENCE', true, 'Night Mode');

  const sId = '$scr_360_13';

  // 2. Lighting Scene Pills (3 Options)
  const scenes = ['DAYLIGHT 5500K', 'SUNSET 3200K', 'NIGHT 2400K'];
  const sGap = 8;
  const sWidth = Math.floor((345 - 2 * sGap) / 3);
  scenes.forEach((sc, idx) => {
    const isAct = idx === 2; // Night active
    const scX = 24 + idx * (sWidth + sGap);
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Scene / ${sc}`,
      width: sWidth,
      height: 36,
      x: scX,
      y: 124,
      backgroundColor: isAct ? '#09090B' : TOKENS.bgCard,
      cornerRadius: 10
    }, `scene_pill_${idx}_13`);

    b.addStep('CREATE_TEXT', {
      parentId: `$scene_pill_${idx}_13`,
      text: sc,
      fontSize: 9,
      fontStyle: 'Bold',
      color: isAct ? '#FFFFFF' : TOKENS.textSecondary,
      x: Math.floor(sWidth / 2 - 28),
      y: 12
    });
  });

  // 3. Evening Ambient Lighting Viewport Canvas
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Night Lighting Viewport',
    width: 345,
    height: 340,
    x: 24,
    y: 172,
    backgroundColor: '#09090B',
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'night_viewport_13');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$night_viewport_13',
    name: 'Evening Lighting Canvas',
    width: 345,
    height: 340,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: '#1C1C1E'
  });

  // Floating Lighting Fixture Hotspot (2700K Flos)
  b.addStep('CREATE_FRAME', {
    parentId: '$night_viewport_13',
    name: 'Hotspot / 2700K Flos',
    width: 170,
    height: 32,
    x: 16,
    y: 16,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$night_viewport_13',
    text: '💡 FLOS RECESSED (2700K WARM)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 28,
    y: 26
  });

  // 4. Lighting Engineering Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Luminaire Specs',
    width: 345,
    height: 120,
    x: 24,
    y: 524,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_luminaire_13');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_luminaire_13',
    text: 'Architectural Luminaire Engineering',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_luminaire_13',
    text: '• Concealed Flos Architectural fixtures hidden within bamboo culms\n• Color Rendering Index (CRI > 98) preserves rich teak and ceramic tones\n• DALI-2 Smart Lighting automation with circadian rhythm sync',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_luminaire_13',
    text: 'DALI-2 CIRCADIAN AUTOMATION',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 18,
    y: 94
  });

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Simulate Night VR',
    text: 'Experience Night Ambience in 360 VR →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 656,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_vr_night_13');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_13.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
