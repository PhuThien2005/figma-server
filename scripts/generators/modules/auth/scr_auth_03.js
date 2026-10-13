import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-003 — 360 Spatial Immersion Introduction
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_03', 'SCR-003: 360 Spatial Immersion', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SPATIAL IMMERSION', '360° ATRIUM & AMBIENT AUDIO', true);

  // 2. Full-Bleed 360 Panorama Preview Frame
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_03',
    name: 'Container / 360 Panorama',
    width: 345,
    height: 440,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'container_360_03');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$container_360_03',
    name: 'Panorama / Living Room Atrium',
    width: 345,
    height: 440,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  // 3. Floating 360 Gyro Pill (Top-Right)
  b.addStep('CREATE_FRAME', {
    parentId: '$container_360_03',
    name: 'Badge / Gyro Indicator',
    width: 100,
    height: 32,
    x: 230,
    y: 16,
    backgroundColor: '#000000B3',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$container_360_03',
    text: '⟳ 360° ACTIVE',
    fontSize: 10,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 244,
    y: 25
  });

  // 4. Frosted Glass Bottom Overlay Bar (Features: Spatial Audio, Sun Path, Laser Measure)
  b.addStep('CREATE_FRAME', {
    parentId: '$container_360_03',
    name: 'Glass / Spatial Features Bar',
    width: 313,
    height: 64,
    x: 16,
    y: 360,
    backgroundColor: '#FFFFFFE6',
    cornerRadius: 14
  }, 'glass_features_03');

  b.addStep('CREATE_TEXT', {
    parentId: '$glass_features_03',
    text: 'Spatial Audio • Sun Path Simulation • AR Laser',
    fontSize: 11,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 22,
    y: 24
  });

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_03',
    name: 'CTA / Launch 360 Experience',
    text: 'Enter 360 Spatial Tour →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 600,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_next_scr_auth_03');

  // 6. Secondary CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_03',
    name: 'Btn / Learn More',
    text: 'Architecture Specifications',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 24,
    y: 664,
    width: 345,
    height: 48,
    cornerRadius: TOKENS.cornerRadiusBtn
  });

  // 7. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_03.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
