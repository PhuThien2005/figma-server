import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-043 (360-15) — 360 Teak Kitchen & Sommelier Wine Vault
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_15', 'SCR-043: 360 Teak Kitchen', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('360° TEAK KITCHEN', 'CHEF ISLE & SOMMELIER WINE VAULT', true);

  const sId = '$scr_360_15';

  // 2. Full-Bleed 360 Kitchen Viewport Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Kitchen 360 Viewport',
    width: 345,
    height: 420,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'kitchen_viewport_15');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$kitchen_viewport_15',
    name: 'Kitchen Canvas Photo',
    width: 345,
    height: 420,
    x: 0,
    y: 0,
    imageUrl: 'kitchen teak wood',
    color: TOKENS.bgSurface
  });

  // Hotspot Marker 1: Boffi Teak Island
  b.addStep('CREATE_FRAME', {
    parentId: '$kitchen_viewport_15',
    name: 'Hotspot / Teak Island',
    width: 170,
    height: 32,
    x: 20,
    y: 180,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$kitchen_viewport_15',
    text: '⊙ Boffi Teak Island (4.2m) →',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 32,
    y: 190
  });

  // Hotspot Marker 2: Sub-Zero Wine Vault
  b.addStep('CREATE_FRAME', {
    parentId: '$kitchen_viewport_15',
    name: 'Hotspot / Wine Vault',
    width: 170,
    height: 32,
    x: 155,
    y: 280,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$kitchen_viewport_15',
    text: '⊙ 1,200-Bottle Cellar →',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 168,
    y: 290
  });

  // 3. Gourmet Appliance Specifications Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Culinary Specs',
    width: 345,
    height: 120,
    x: 24,
    y: 560,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_culinary_15');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_culinary_15',
    text: 'Culinary Atelier Engineering',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_culinary_15',
    text: '• Gaggenau 400 Series Full-Surface Induction & Teppanyaki\n• Sub-Zero Integrated Triple-Zone Refrigeration & Wine Cooler\n• Bat Trang Custom Ceramic Splashback & Reclaimed Teak Millwork',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_culinary_15',
    text: 'GAGGENAU & BOFFI ATELIER',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 18,
    y: 94
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Reserve Chef',
    text: 'Reserve Private Chef In-Villa Tasting Experience →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 694,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_chef_15');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_15.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
