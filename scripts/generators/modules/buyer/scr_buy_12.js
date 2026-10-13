import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-022 (BUY-12) — Curated Collection: Private Island & Helipad Estates
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_12', 'SCR-022: Helipad & Island Estates', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ISLAND & HELIPAD', 'EXCLUSIVE AVIATION & MARINA ACCESS', true);

  const sId = '$scr_buy_12';

  // 2. Collection Hero Banner: Sơn Trà Oceanfront Cliff (Da Nang)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Son Tra Oceanfront',
    width: 345,
    height: 250,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_sontra_12');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_sontra_12',
    name: 'Cover / Son Tra Cliff',
    width: 345,
    height: 155,
    x: 0,
    y: 0,
    imageUrl: 'villa da nang',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sontra_12',
    text: 'Sơn Trà Oceanfront Helipad Estate',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 168
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sontra_12',
    text: 'Sơn Trà Peninsula, Đà Nẵng • Private Helipad • $8,900,000 USD',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 194
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sontra_12',
    text: 'HELIPAD 108° CERTIFIED • DEEP WATER BERTH',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 16,
    y: 220
  });

  // 3. Collection Card 2: Saigon River Private Island Sanctuary
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Saigon River Island',
    width: 345,
    height: 230,
    x: 24,
    y: 390,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_island_12');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_island_12',
    name: 'Cover / Sunset Pool',
    width: 345,
    height: 140,
    x: 0,
    y: 0,
    imageUrl: 'sunset infinity pool',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_island_12',
    text: 'The Riverfront Island Compound',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 152
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_island_12',
    text: 'Thủ Thiêm, Saigon River • 1,800 sq.m Private Marina • $12,500,000 USD',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 176
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_island_12',
    text: 'EXCLUSIVE PRIVATE BERTH',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 16,
    y: 202
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Reserve Helipad Flight',
    text: 'Reserve Helicopter Viewing Flight →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_heli_12');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_12.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
