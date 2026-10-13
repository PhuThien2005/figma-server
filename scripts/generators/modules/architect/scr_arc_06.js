import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-052 (ARC-06) — Architectural Monograph & Philosophy
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_06', 'SCR-052: Monograph & Philosophy', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PHILOSOPHY', 'BIOPHILIC SHADOW & WIND DYNAMICS', true);

  const sId = '$scr_arc_06';

  // 2. Monograph Cover Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Monograph Cover',
    width: 345,
    height: 200,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_monograph_06');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_monograph_06',
    name: 'Cover / Bamboo Sanctuary',
    width: 345,
    height: 200,
    x: 0,
    y: 0,
    imageUrl: 'vtn bamboo compound',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_monograph_06',
    name: 'Glass Overlay / Monograph Badge',
    width: 297,
    height: 48,
    x: 24,
    y: 136,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_monograph_06',
    text: 'VO TRONG NGHIA: THE ARCHITECTURE OF GREEN & WIND',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 36,
    y: 146
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_monograph_06',
    text: 'Monograph Vol. IV • Published in Zurich & Tokyo',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 36,
    y: 162
  });

  // 3. Three Pillars of Vietnamese Tropical Architecture
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Core Principles',
    width: 345,
    height: 270,
    x: 24,
    y: 340,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_principles_06');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_principles_06',
    text: 'Three Environmental Pillars',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  const pillars = [
    { title: '1. Natural Micro-Climate Convection', desc: 'Chimney thermal ventilation reducing HVAC energy demand by 62% in tropical humidity.', color: TOKENS.accentEmerald },
    { title: '2. Low-Carbon Structural Bamboo', desc: 'Tam Vong species treated in natural alluvial mud baths with 50-year structural longevity.', color: TOKENS.accentGold },
    { title: '3. Rain Harvesting & Lotus Retention', desc: 'Greywater biological reed filtration returning pure rainwater to groundwater basins.', color: TOKENS.accentEmerald }
  ];

  let pY = 52;
  pillars.forEach(p => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_principles_06',
      text: p.title,
      fontSize: 12,
      fontStyle: 'Bold',
      color: p.color,
      x: 20,
      y: pY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_principles_06',
      text: p.desc,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: pY + 18
    });

    pY += 66;
  });

  // 4. Download Monograph PDF Action
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Download Monograph',
    text: 'Download Monograph (PDF 48MB)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_06.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
