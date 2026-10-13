import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-010 — Welcome to The Sanctuary (Main Entrance)
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_10', 'SCR-010: Sanctuary Entrance', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('A R K I', 'INDIGN ARCHITECTURE & 360 TOUR', false);

  // 2. Hero Cover with Sunset Infinity Pool
  b.addStep('CREATE_RECTANGLE', {
    parentId: '$scr_auth_10',
    name: 'Cover / Sunset Pool',
    width: 345,
    height: 380,
    x: 24,
    y: 124,
    imageUrl: 'sunset infinity pool',
    color: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  });

  // 3. Frosted Glass Title Badge
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_10',
    name: 'Glass Card / Welcome Title',
    width: 313,
    height: 84,
    x: 40,
    y: 400,
    backgroundColor: '#FFFFFFE6',
    cornerRadius: 16
  }, 'card_title_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_title_10',
    text: 'Welcome to The Sanctuary',
    fontSize: 17,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_title_10',
    text: 'Vietnam’s Premier 360 Architectural Platform',
    fontSize: 12,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 44
  });

  // 4. Metrics Bento Row (2 Columns)
  b.addMetricsBento([
    { label: 'CURATED ESTATES', value: '112 WORKS' },
    { label: 'ESCROW SECURITY', value: '$148.5M' }
  ], 524);

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_10',
    name: 'CTA / Enter Platform',
    text: 'Enter Discovery Feed →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_next_scr_auth_10');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_10.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
