import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-103 (SET-03) — Appearance: Lotus Porcelain (Light) vs Obsidian Slate (Dark)
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_03', 'SCR-103: Theme & Appearance', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('APPEARANCE', 'FROSTED GLASS & PALETTE THEMES', true);

  const sId = '$scr_set_03';

  // 2. Theme Preview Bento (Light vs Dark)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Theme Selector Container',
    width: 345,
    height: 300,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_theme_box_03');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_theme_box_03',
    text: 'Visual Theme Aesthetic',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  // Light Mode Box (Selected Default)
  b.addStep('CREATE_FRAME', {
    parentId: '$card_theme_box_03',
    name: 'Box / Light Theme Preview',
    width: 145,
    height: 180,
    x: 20,
    y: 50,
    backgroundColor: '#FBF9F5',
    cornerRadius: 14
  }, 'box_theme_light_03');

  b.addStep('CREATE_TEXT', {
    parentId: '$box_theme_light_03',
    text: 'LOTUS PORCELAIN',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 16,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$box_theme_light_03',
    text: 'Daylight Ivory (#FBF9F5)\nFrosted Glass Card\nPritzker Amber & Jade\nHigh-Contrast Jet Black',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 36
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$box_theme_light_03',
    text: '● ACTIVE (DEFAULT)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 16,
    y: 146
  });

  // Dark Mode Box
  b.addStep('CREATE_FRAME', {
    parentId: '$card_theme_box_03',
    name: 'Box / Dark Theme Preview',
    width: 145,
    height: 180,
    x: 180,
    y: 50,
    backgroundColor: '#0B0C0E',
    cornerRadius: 14
  }, 'box_theme_dark_03');

  b.addStep('CREATE_TEXT', {
    parentId: '$box_theme_dark_03',
    text: 'OBSIDIAN SLATE',
    fontSize: 10,
    fontStyle: 'Bold',
    color: '#E4E4E7',
    x: 16,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$box_theme_dark_03',
    text: 'Nocturnal Black (#0B0C0E)\nOLED True Black\nSubtle 1px Carbon Border\nChampagne Gold Accents',
    fontSize: 9,
    fontStyle: 'Regular',
    color: '#A1A1AA',
    x: 16,
    y: 36
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$box_theme_dark_03',
    text: '○ TAP TO SWITCH',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#71717A',
    x: 16,
    y: 146
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_theme_box_03',
    text: 'Automatic circadian shifting based on sunset in Vietnam (18:00 ICT)',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 250
  });

  // 3. Ergonomics & Contrast Settings Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Ergonomics Display',
    width: 345,
    height: 160,
    x: 24,
    y: 440,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_ergo_display_03');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_ergo_display_03',
    text: 'Display & Visual Comfort',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const opts = [
    { title: 'Dynamic Glass Blur & Translucency', val: 'High (Glassmorphism GPU Active)' },
    { title: 'True Black OLED Battery Saver', val: 'Off (Daylight Porcelain Preferred)' }
  ];

  let opY = 48;
  opts.forEach(o => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_ergo_display_03',
      text: o.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: opY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_ergo_display_03',
      text: o.val,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.accentGold,
      x: 20,
      y: opY + 16
    });

    opY += 46;
  });

  // 4. Action Button: Save Theme
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Confirm Appearance',
    text: 'Apply Appearance & Lighting Palette',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_03.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
