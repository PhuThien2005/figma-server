import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-102 (SET-02) — Language & Regional Preferences (English / Tiếng Việt)
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_02', 'SCR-102: Language Preferences', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('LANGUAGES', 'LOCALE & BILINGUAL INTERFACE', true);

  const sId = '$scr_set_02';

  // 2. Language Selection Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Language Options',
    width: 345,
    height: 240,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_lang_opts_02');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_lang_opts_02',
    text: 'Default App Display Language',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  // Option 1: English (Selected Default)
  b.addStep('CREATE_FRAME', {
    parentId: '$card_lang_opts_02',
    name: 'Row / English Selected',
    width: 305,
    height: 56,
    x: 20,
    y: 48,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_lang_opts_02',
    text: '🇬🇧  English (International Default)',
    fontSize: 13,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 36,
    y: 66
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_lang_opts_02',
    text: '✓ ACTIVE',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 250,
    y: 68
  });

  // Option 2: Tiếng Việt
  b.addStep('CREATE_FRAME', {
    parentId: '$card_lang_opts_02',
    name: 'Row / Vietnamese',
    width: 305,
    height: 56,
    x: 20,
    y: 114,
    backgroundColor: '#FFFFFF',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_lang_opts_02',
    text: '🇻🇳  Tiếng Việt (Bản ngữ & Di sản)',
    fontSize: 13,
    fontStyle: 'SemiBold',
    color: TOKENS.textPrimary,
    x: 36,
    y: 132
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_lang_opts_02',
    text: 'All architectural monographs & deeds are instantly translated to selected language.',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 186
  });

  // 3. Regional Format & Calendar Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Regional Formatting',
    width: 345,
    height: 220,
    x: 24,
    y: 380,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_regional_format_02');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_regional_format_02',
    text: 'Date, Time & Calendar Standards',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const formats = [
    { k: 'Timezone Standard', v: 'Indochina Time (ICT / GMT+7) & UTC Dual Display' },
    { k: 'Lunar Calendar Overlay', v: 'Enabled (Displays Auspicious Feng Shui Dates)' },
    { k: 'Number Separator', v: 'Anglo-American Standard ($1,000,000.00)' }
  ];

  let fmY = 48;
  formats.forEach(f => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_regional_format_02',
      text: f.k.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: fmY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_regional_format_02',
      text: f.v,
      fontSize: 11,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 20,
      y: fmY + 14
    });

    fmY += 46;
  });

  // 4. Action Button: Save Preferences
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Save Locale',
    text: 'Save Language & Locale Settings',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_02.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
