import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-111 (SET-11) — About ARKI Heritage & Pritzker Foundation Charter
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_11', 'SCR-111: About ARKI Heritage', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ABOUT ARKI', 'PHILOSOPHY, HERITAGE & FOUNDATION', true);

  const sId = '$scr_set_11';

  // 2. Foundation Cover Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / About ARKI Hero',
    width: 345,
    height: 190,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_about_arki_11');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_about_arki_11',
    name: 'Photo / Heritage Architecture',
    width: 345,
    height: 190,
    x: 0,
    y: 0,
    imageUrl: 'vtn bamboo compound',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_about_arki_11',
    name: 'Glass Overlay / Foundation Title',
    width: 305,
    height: 48,
    x: 20,
    y: 126,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_about_arki_11',
    text: 'ARKI ARCHITECTURAL HERITAGE FOUNDATION',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 32,
    y: 136
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_about_arki_11',
    text: 'Patron of Southeast Asian Tropical Architecture • Est. 2024',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 32,
    y: 152
  });

  // 3. Manifesto Summary Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Foundation Manifesto',
    width: 345,
    height: 290,
    x: 24,
    y: 330,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_manifesto_11');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_manifesto_11',
    text: 'The ARKI Architectural Manifesto',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_manifesto_11',
    text: '“We believe exceptional architecture is not merely built; it is cultivated from the climate, geology, and craftsmanship of the land.\n\nARKI brings together Vietnam’s preeminent master architects, heritage artisans, and visionary patrons to create residential estates that endure for centuries while remaining deeply connected to nature.”',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 44
  });

  const stats = [
    { label: 'Architects Represented', val: 'Võ Trọng Nghĩa, Hoàng Thúc Hào & Invited Masters' },
    { label: 'Craft Guild Ateliers', val: 'Bát Tràng Ceramic, Kim Bồng Woodcraft, Ninh Bình Stone' },
    { label: 'App Version', val: 'ARKI iOS Pro v2.4.0 (Build 9948)' }
  ];

  let stY = 160;
  stats.forEach(s => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_manifesto_11',
      text: s.label.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: stY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_manifesto_11',
      text: s.val,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 20,
      y: stY + 14
    });

    stY += 38;
  });

  // 4. Action Button: Visit Foundation Website
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Foundation Website',
    text: 'Explore Foundation Monograph Archive',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_11.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
