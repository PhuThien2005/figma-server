import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-055 (ARC-09) — Sustainable Material Sourcing & Craft Guilds
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_09', 'SCR-055: Material Craft Guilds', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('HERITAGE GUILDS', 'AUTHENTIC VIETNAMESE ATELIERS', true);

  const sId = '$scr_arc_09';

  // 2. Guild Highlight Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Guild Highlight',
    width: 345,
    height: 180,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_guild_hero_09');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_guild_hero_09',
    name: 'Photo / Bát Tràng Atelier',
    width: 345,
    height: 180,
    x: 0,
    y: 0,
    imageUrl: 'hoi an resort teak',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_guild_hero_09',
    name: 'Glass Label / Atelier Name',
    width: 305,
    height: 48,
    x: 20,
    y: 116,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_guild_hero_09',
    text: 'BÁT TRÀNG CELADON & RED EARTH CERAMIC GUILD',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 32,
    y: 126
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_guild_hero_09',
    text: 'Custom handmade glazed facade panels • 700-Year Heritage',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 32,
    y: 142
  });

  // 3. Three Verified Artisan Ateliers
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Atelier List',
    width: 345,
    height: 290,
    x: 24,
    y: 320,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_guild_list_09');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_guild_list_09',
    text: 'Contracted Guild Masters',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const guilds = [
    { name: '1. Kim Bồng Woodcraft Guild (Quảng Nam)', desc: 'Reclaimed aged ironwood & teak joinery without iron nails.', tag: 'HERITAGE CARPENTRY' },
    { name: '2. Ninh Bình Bluestone Carving (Hoa Lư)', desc: 'Monolithic bas-relief fountain slabs & lotus pool rims.', tag: 'QUARRY CARVING' },
    { name: '3. Phú Vinh Bamboo Weaving Guild (Hà Nội)', desc: 'Acoustic micro-weave ceiling panels & lattice screens.', tag: 'BIO-WEAVING' }
  ];

  let gY = 52;
  guilds.forEach(g => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_guild_list_09',
      text: g.name,
      fontSize: 12,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: gY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_guild_list_09',
      text: g.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: gY + 18
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_guild_list_09',
      text: `★ ${g.tag}`,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: gY + 36
    });

    gY += 72;
  });

  // 4. Sample Box Delivery Request Action
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Request Material Box',
    text: 'Request Physical Sample Box to Villa Address',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_09.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
