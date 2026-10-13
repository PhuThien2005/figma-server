import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-013 (BUY-03) — Interactive Google Map of Vietnam Estates
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_03', 'SCR-013: Vietnam Map Explorer', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('MAP EXPLORER', 'SAIGON RIVER & THỦ THIÊM PINS', false);

  const sId = '$scr_buy_03';

  // 2. Full-Bleed Google Maps Vietnam Canvas
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Google Map Vietnam',
    width: 345,
    height: 480,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'container_map_03');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$container_map_03',
    name: 'Map / Saigon Riverfront',
    width: 345,
    height: 480,
    x: 0,
    y: 0,
    imageUrl: 'map saigon',
    color: TOKENS.bgSurface
  });

  // 3. Floating Map Pins with Luxury Price Badges
  // Pin 1: Thảo Điền Riverfront
  b.addStep('CREATE_FRAME', {
    parentId: '$container_map_03',
    name: 'Pin / Thao Dien $5.8M',
    width: 96,
    height: 32,
    x: 180,
    y: 110,
    backgroundColor: '#09090B',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$container_map_03',
    text: '⚲ $5.8M VN',
    fontSize: 11,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 194,
    y: 119
  });

  // Pin 2: Thủ Thiêm Peninsula
  b.addStep('CREATE_FRAME', {
    parentId: '$container_map_03',
    name: 'Pin / Thu Thiem $4.2M',
    width: 96,
    height: 32,
    x: 60,
    y: 220,
    backgroundColor: '#09090B',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$container_map_03',
    text: '⚲ $4.2M VN',
    fontSize: 11,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 74,
    y: 229
  });

  // 4. Floating Frosted Glass Estate Card at Bottom of Map
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_buy_03',
    name: 'Glass Card / Selected Pin Details',
    width: 345,
    height: 110,
    x: 24,
    y: 530,
    backgroundColor: '#FFFFFFFA',
    cornerRadius: 18,
    clipsContent: true
  }, 'card_selected_pin_03');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_selected_pin_03',
    name: 'Thumb / Thao Dien',
    width: 90,
    height: 90,
    x: 10,
    y: 10,
    imageUrl: 'villa thao dien',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_selected_pin_03',
    text: 'The Riverfront Bamboo Pavilion',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 112,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_selected_pin_03',
    text: 'Thảo Điền, Saigon • 920 sq.m',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 112,
    y: 40
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_selected_pin_03',
    text: '$5,800,000 USD',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 112,
    y: 68
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_selected_pin_03',
    name: 'Btn / View 360',
    text: '360 Tour →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 236,
    y: 62,
    width: 96,
    height: 34,
    cornerRadius: 8
  });

  // 5. Bottom Navigation Dock (Tab 1: Map Active)
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_03.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
