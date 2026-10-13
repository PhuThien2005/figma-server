import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-008 — Curated Lifestyle Preferences
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_08', 'SCR-008: Lifestyle Preferences', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('CURATION FACETS', 'ARCHITECTURAL TYPOLOGIES', true);

  b.addStep('CREATE_TEXT', {
    parentId: '$scr_auth_08',
    text: 'Select Architectural Lifestyles',
    fontSize: 18,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 24,
    y: 124
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$scr_auth_08',
    text: 'Tailor your private feed to specific spatial atmospheres',
    fontSize: 12,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 24,
    y: 150
  });

  // 2. 4 Typology Cards (2x2 Grid)
  const typologies = [
    { title: 'Riverside Sanctuary', tag: 'Thảo Điền & Sài Gòn River', active: true },
    { title: 'French Colonial', tag: 'Ba Đình & Đà Lạt Villas', active: false },
    { title: 'Biophilic Bamboo', tag: 'VTN Engineered Bamboo', active: true },
    { title: 'Oceanfront Cliff', tag: 'Sơn Trà & Đà Nẵng Coast', active: false }
  ];

  typologies.forEach((tp, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cardX = 24 + col * (165 + 15);
    const cardY = 186 + row * (150 + 15);

    b.addStep('CREATE_FRAME', {
      parentId: '$scr_auth_08',
      name: `Card / ${tp.title}`,
      width: 165,
      height: 150,
      x: cardX,
      y: cardY,
      backgroundColor: tp.active ? '#09090B' : TOKENS.bgCard,
      cornerRadius: 18
    }, `tp_card_${i}_08`);

    b.addStep('CREATE_TEXT', {
      parentId: `$tp_card_${i}_08`,
      text: tp.title,
      fontSize: 14,
      fontStyle: 'Bold',
      color: tp.active ? '#FFFFFF' : TOKENS.textPrimary,
      x: 16,
      y: 24
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$tp_card_${i}_08`,
      text: tp.tag,
      fontSize: 11,
      fontStyle: 'Regular',
      color: tp.active ? '#A1A1AA' : TOKENS.textSecondary,
      x: 16,
      y: 68
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$tp_card_${i}_08`,
      text: tp.active ? '✓ SELECTED' : '+ ADD',
      fontSize: 10,
      fontStyle: 'Bold',
      color: tp.active ? TOKENS.accentEmerald : TOKENS.accentGold,
      x: 16,
      y: 114
    });
  });

  // 3. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_08',
    name: 'CTA / Save Preferences',
    text: 'View Matching Sanctuaries (42) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 540,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_next_scr_auth_08');

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_08.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
