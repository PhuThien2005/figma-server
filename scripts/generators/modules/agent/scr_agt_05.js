import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-065 (AGT-05) — Private Wine Cellar & Cigar Lounge Tasting Curation
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_05', 'SCR-065: Wine & Cigar Curation', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('CELLAR & LOUNGE', 'SOMMELIER TASTING CURATION', true);

  const sId = '$scr_agt_05';

  // 2. Cellar Visual Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Cellar Tasting',
    width: 345,
    height: 180,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_cellar_hero_05');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_cellar_hero_05',
    name: 'Photo / Teak Cellar',
    width: 345,
    height: 180,
    x: 0,
    y: 0,
    imageUrl: 'kitchen teak wood',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_cellar_hero_05',
    name: 'Glass Overlay / Cellar Name',
    width: 305,
    height: 48,
    x: 20,
    y: 116,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_cellar_hero_05',
    text: 'GRAND CRU SOMMELIER SELECTION',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 32,
    y: 126
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_cellar_hero_05',
    text: 'Curated by Master Sommelier • Temperature 14°C / Humidity 70%',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 32,
    y: 142
  });

  // 3. Vintage Pairing Curation List
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Curated Vintages',
    width: 345,
    height: 290,
    x: 24,
    y: 320,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_vintages_05');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vintages_05',
    text: 'Curated Tasting Flight for Villa Tour',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const tastings = [
    { name: 'Château Margaux Premier Grand Cru (2010)', note: 'Decanted 2 hours prior to arrival', tag: 'BORDEAUX' },
    { name: 'Domaine de la Romanée-Conti Échezeaux (2015)', note: 'Single vineyard pinot noir', tag: 'BURGUNDY' },
    { name: 'Cohiba Behike BHK 56 Cigar Selection', note: 'Stored in cedar humidor with aged Dalat honey pairing', tag: 'CUBAN RESERVE' }
  ];

  let tY = 52;
  tastings.forEach(t => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_vintages_05',
      text: t.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: tY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_vintages_05',
      text: t.note,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: tY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_vintages_05',
      text: `★ ${t.tag}`,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: tY + 34
    });

    tY += 72;
  });

  // 4. Action Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Pre-Order Tasting',
    text: 'Confirm Private Sommelier Service',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_05.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
