import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-059 (ARC-13) — Physical Model 1:50 Scale Maquette Viewer
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_13', 'SCR-059: 1:50 Model Maquette', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PHYSICAL MAQUETTE', '1:50 CRAFTED TIMBER SCALE MODEL', true);

  const sId = '$scr_arc_13';

  // 2. Interactive Maquette 360 Turntable Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Turntable Viewport',
    width: 345,
    height: 260,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_maquette_360_13');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_maquette_360_13',
    name: 'Photo / Teak Maquette',
    width: 345,
    height: 260,
    x: 0,
    y: 0,
    imageUrl: 'hoi an resort teak',
    color: TOKENS.bgSurface
  });

  // 360 Spin HUD indicator
  b.addStep('CREATE_FRAME', {
    parentId: '$card_maquette_360_13',
    name: 'Badge / 360 Orbit',
    width: 140,
    height: 32,
    x: 16,
    y: 16,
    backgroundColor: '#09090BDD',
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_maquette_360_13',
    text: '🔄 DRAG TO ROTATE 360°',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 24,
    y: 26
  });

  // Scale tag
  b.addStep('CREATE_FRAME', {
    parentId: '$card_maquette_360_13',
    name: 'Badge / Scale',
    width: 80,
    height: 24,
    x: 245,
    y: 220,
    backgroundColor: '#09090BAA',
    cornerRadius: 6
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_maquette_360_13',
    text: 'SCALE 1:50',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 257,
    y: 226
  });

  // 3. Maquette Craftsmanship Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Maquette Craftsmanship',
    width: 345,
    height: 220,
    x: 24,
    y: 400,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_craft_13');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_craft_13',
    text: 'Handcrafted Physical Miniature',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const details = [
    { label: 'Crafting Studio', val: 'VTN Model Workshop, An Phú, Thu Duc City' },
    { label: 'Wood Species', val: 'Aged Gia Lai Teak & Micro-lathed Bamboo Dowels' },
    { label: 'Illumination', val: 'Integrated 2700K Warm LED Fiber-Optic Core' },
    { label: 'Dimensions', val: '120 cm × 85 cm × 38 cm (Acrylic Display Case)' }
  ];

  let dY = 46;
  details.forEach(d => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_craft_13',
      text: d.label.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.textMuted,
      x: 20,
      y: dY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_craft_13',
      text: d.val,
      fontSize: 11,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 20,
      y: dY + 14
    });

    dY += 38;
  });

  // 4. Request Private Courier Delivery of Maquette
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Request Model Delivery',
    text: 'Request Maquette Viewing at Private Residence',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_13.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
