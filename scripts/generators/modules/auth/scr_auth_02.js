import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-002 — Curated Vietnamese Masterpieces (Bento Onboarding)
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_02', 'SCR-002: Curated Masterpieces', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('CURATED MASTERPIECES', 'HERITAGE & CONTEMPORARY ESTATES', true);

  // 2. Bento Card 1: Thảo Điền Riverside Estate
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_02',
    name: 'Bento / Thao Dien Riverside',
    width: 345,
    height: 240,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_bento_01');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_bento_01',
    name: 'Cover / Thao Dien',
    width: 345,
    height: 150,
    x: 0,
    y: 0,
    imageUrl: 'villa thao dien',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bento_01',
    text: 'The Riverfront Pavilion',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 162
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bento_01',
    text: 'Thảo Điền, Saigon • 920 sq.m • $5,800,000',
    fontSize: 12,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 188
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bento_01',
    text: 'LOTUS PLATINUM',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 16,
    y: 212
  });

  // 3. Bento Card 2: Ba Đình French Colonial Heritage
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_02',
    name: 'Bento / Ba Dinh Heritage',
    width: 345,
    height: 240,
    x: 24,
    y: 380,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_bento_02');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_bento_02',
    name: 'Cover / Ba Dinh',
    width: 345,
    height: 150,
    x: 0,
    y: 0,
    imageUrl: 'villa ba dinh',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bento_02',
    text: 'Ba Đình French Colonial Sanctuary',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 162
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bento_02',
    text: 'Ba Đình, Hanoi • Restored 1928 • $7,400,000',
    fontSize: 12,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 188
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bento_02',
    text: 'HERITAGE PROTECTED',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 16,
    y: 212
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_02',
    name: 'CTA / Continue',
    text: 'Explore Collections →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 640,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_next_scr_auth_02');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_02.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
