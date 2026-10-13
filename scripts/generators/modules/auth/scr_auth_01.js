import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-001 — Welcome & Architectural Philosophy
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_01', 'SCR-001: Lotus Sanctuary Welcome', x, y);

  // 1. Header with Fitts's Law Target & Automatic [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ARKI SANCTUARY', 'CURATED VIETNAMESE ARCHITECTURE', false);

  // 2. Hero Cover with authentic VTN Bamboo Architecture
  b.addStep('CREATE_RECTANGLE', {
    parentId: '$scr_auth_01',
    name: 'Cover / VTN Bamboo Sanctuary',
    width: 345,
    height: 470,
    x: 24,
    y: 124,
    imageUrl: 'vtn bamboo compound',
    color: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  });

  // 3. Frosted Glass Metadata Badge (Overlaid at bottom of photo)
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_01',
    name: 'Glass Card / Architectural Monograph',
    width: 313,
    height: 74,
    x: 40,
    y: 504,
    backgroundColor: '#FFFFFFE6',
    cornerRadius: 14
  }, 'card_monograph_01');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_monograph_01',
    text: 'The Riverfront Bamboo Sanctuary',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 14
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_monograph_01',
    text: 'KTS Võ Trọng Nghĩa • Ba Đình & Thảo Điền',
    fontSize: 11,
    fontStyle: 'SemiBold',
    color: TOKENS.accentGold,
    x: 16,
    y: 38
  });

  // 4. Primary CTA Button (English Default)
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_01',
    name: 'CTA / Explore Sanctuaries',
    text: 'Explore Curated Sanctuaries →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 660,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_next_scr_auth_01');

  // 5. Bottom Navigation Dock with 4 Clean Equal Tabs
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_01.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
