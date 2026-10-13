import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-011 (BUY-01) — Discover Bento Feed
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_01', 'SCR-011: Discover Bento Feed', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('DISCOVER SANCTUARY', 'AUTHENTIC VIETNAMESE ARCHITECTURE', true);

  // 2. English Category Filter Chips
  b.addCategoryChips(['ALL WORKS', 'RIVERSIDE', 'BAMBOO', 'HERITAGE'], 0, 116);

  // 3. Featured Hero Estate Card (Thảo Điền Riverside Pavilion by Võ Trọng Nghĩa)
  b.addEstateCard({
    y: 168,
    imageUrl: 'villa thao dien',
    title: 'The Riverfront Bamboo Pavilion',
    location: 'Thảo Điền, Saigon Riverfront',
    specs: 'KTS Võ Trọng Nghĩa • 920 sq.m',
    price: '$5,800,000',
    cardRef: 'card_hero_01',
    btnRef: 'btn_hero_details_01'
  });

  // 4. Curated Collection Mini-Banner (Glass card below)
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_buy_01',
    name: 'Glass Card / Collection Preview',
    width: 345,
    height: 180,
    x: 24,
    y: 546,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_collection_preview');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_collection_preview',
    name: 'Cover / Ba Dinh Preview',
    width: 345,
    height: 110,
    x: 0,
    y: 0,
    imageUrl: 'villa ba dinh',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_collection_preview',
    text: 'Ba Đình French Colonial Heritage Villa',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 122
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_collection_preview',
    text: 'Restored 1928 • Ba Đình, Hanoi • $7,400,000',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 148
  });

  // 5. Bottom Navigation Dock (Tab 0: Discover)
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_01.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
