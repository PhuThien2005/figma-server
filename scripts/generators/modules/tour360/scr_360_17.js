import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-045 (360-17) — 360 Sunset Infinity Pool Deck & Cantilever View
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_17', 'SCR-045: 360 Sunset Pool Deck', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('360° INFINITY POOL', '35M CANTILEVER RIVERFRONT POOL DECK', true);

  const sId = '$scr_360_17';

  // 2. Full-Bleed 360 Pool Viewport Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Pool 360 Viewport',
    width: 345,
    height: 420,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'pool_viewport_17');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$pool_viewport_17',
    name: 'Pool Canvas Photo',
    width: 345,
    height: 420,
    x: 0,
    y: 0,
    imageUrl: 'sunset infinity pool',
    color: TOKENS.bgSurface
  });

  // Hotspot 1: Sunken Teak Fire Pit
  b.addStep('CREATE_FRAME', {
    parentId: '$pool_viewport_17',
    name: 'Hotspot / Fire Pit',
    width: 175,
    height: 32,
    x: 20,
    y: 180,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$pool_viewport_17',
    text: '⊙ Sunken Teak Fire Pit →',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 32,
    y: 190
  });

  // Hotspot 2: Private Marina Docking
  b.addStep('CREATE_FRAME', {
    parentId: '$pool_viewport_17',
    name: 'Hotspot / Marina Dock',
    width: 165,
    height: 32,
    x: 160,
    y: 280,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$pool_viewport_17',
    text: '⊙ Saigon River Marina →',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 172,
    y: 290
  });

  // 3. Pool Hydraulic & Aquatic Specs Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Aquatic Specs',
    width: 345,
    height: 120,
    x: 24,
    y: 560,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_aquatic_specs_17');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_aquatic_specs_17',
    text: 'Aquatic Architecture Engineering',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_aquatic_specs_17',
    text: '• 35m Heated Lap Pool cantilevered 6.5m over active river current\n• Natural Saltwater Chlorination & Copper-Ion Biological Filtration\n• Zero-Edge Perimeter Overflow rimmed with flamed volcanic basalt stone',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_aquatic_specs_17',
    text: 'SALT-WATER BIOLOGICAL FILTRATION',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 18,
    y: 94
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Reserve Sunset Yacht',
    text: 'Schedule Sunset Yacht Viewing Arrival →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 694,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_yacht_17');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_17.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
