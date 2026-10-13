import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-007 — Language & Regional Hub Selection
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_07', 'SCR-007: Regional Hub Selection', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('LOCALIZATION & REGION', 'GLOBAL LUXURY & VIETNAM HUBS', true);

  // 2. Language Selection Card
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_07',
    name: 'Card / Language Selector',
    width: 345,
    height: 140,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_lang_07');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_lang_07',
    text: 'Select Preferred Language',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  // Option 1: English (Default)
  b.addStep('CREATE_FRAME', {
    parentId: '$card_lang_07',
    name: 'Option / English (Active)',
    width: 146,
    height: 48,
    x: 20,
    y: 54,
    backgroundColor: TOKENS.btnPrimaryBg,
    cornerRadius: 12
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$card_lang_07',
    text: '🌐 English (Default)',
    fontSize: 12,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 34,
    y: 70
  });

  // Option 2: Tiếng Việt
  b.addStep('CREATE_FRAME', {
    parentId: '$card_lang_07',
    name: 'Option / Tiếng Việt',
    width: 146,
    height: 48,
    x: 178,
    y: 54,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$card_lang_07',
    text: '🇻🇳 Tiếng Việt',
    fontSize: 12,
    fontStyle: 'SemiBold',
    color: TOKENS.textPrimary,
    x: 204,
    y: 70
  });

  // 3. Regional Hubs of Vietnam (3 Cards)
  const hubs = [
    { name: 'Northern Hub', detail: 'Ba Đình French Colonial • Tây Hồ Lakefront', icon: '🏛️' },
    { name: 'Central Heritage Hub', detail: 'Hội An Ancient Teak • Sơn Trà Coastal Cliffs', icon: '🏮' },
    { name: 'Southern Riverfront Hub', detail: 'Thảo Điền Waterfront • Thủ Thiêm Skylines', icon: '🌴' }
  ];

  let currY = 280;
  hubs.forEach((h, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: '$scr_auth_07',
      name: `Card / ${h.name}`,
      width: 345,
      height: 84,
      x: 24,
      y: currY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: 16
    }, `hub_${idx}_07`);

    b.addStep('CREATE_TEXT', {
      parentId: `$hub_${idx}_07`,
      text: `${h.icon}  ${h.name}`,
      fontSize: 14,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 18,
      y: 18
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$hub_${idx}_07`,
      text: h.detail,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 18,
      y: 44
    });

    currY += 100;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_07',
    name: 'CTA / Confirm Preferences',
    text: 'Confirm & Continue →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 600,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_next_scr_auth_07');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_07.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
