import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-069 (AGT-09) — Curated Art Collection & Gallery Loan Advisory
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_09', 'SCR-069: Art Collection Advisory', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ART ADVISORY', 'MUSEUM-GRADE INDOCHINE PAINTINGS', true);

  const sId = '$scr_agt_09';

  // 2. Curated Masterpiece Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Masterpiece Hero',
    width: 345,
    height: 200,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_art_hero_09');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_art_hero_09',
    name: 'Painting / Lacquer Masterpiece',
    width: 345,
    height: 200,
    x: 0,
    y: 0,
    imageUrl: 'hoi an resort teak',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_art_hero_09',
    name: 'Glass Label / Art Title',
    width: 305,
    height: 48,
    x: 20,
    y: 136,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_art_hero_09',
    text: 'NGUYỄN GIA TRÍ (1908–1993) • GOLD LEAF ON LACQUER',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 32,
    y: 146
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_art_hero_09',
    text: '“Spring Landscape” • Provenance: Private Parisian Collection',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 32,
    y: 162
  });

  // 3. Available Fine Art Loan List
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Available Works',
    width: 345,
    height: 270,
    x: 24,
    y: 340,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_works_09');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_works_09',
    text: 'Available for Villa Loan & Acquisition',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const artworks = [
    { title: 'Lê Phổ (1907–2001) — Oil on Silk', desc: '“Young Woman with Peonies” • Sotheby’s Hong Kong Certified', price: '$850,000 USD' },
    { title: 'Mai Trung Thứ (1906–1980) — Gouache on Silk', desc: '“Poetry in the Bamboo Garden” • Christie’s Provenance', price: '$1,200,000 USD' },
    { title: 'Bùi Xuân Phái (1920–1988) — Oil on Canvas', desc: '“Hà Nội Ancient Quarter at Dusk” • Certified Estate Stamp', price: '$340,000 USD' }
  ];

  let wY = 50;
  artworks.forEach(w => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_works_09',
      text: w.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: wY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_works_09',
      text: `${w.desc} • ${w.price}`,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.accentGold,
      x: 20,
      y: wY + 16
    });

    wY += 66;
  });

  // 4. Action Button: Request Art Curator Consultation
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Request Curator',
    text: 'Request Curator Appraisal for Villa',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_09.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
