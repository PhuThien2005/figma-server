import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-096 (TXN-08) — Sổ Hồng Pink Book Handover Ceremony & Certificate
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_08', 'SCR-096: Sổ Hồng Handover Ceremony', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('HANDOVER CEREMONY', 'CONGRATULATIONS: DEED TRANSFERRED', true);

  const sId = '$scr_txn_08';

  // 2. Pink Book Handover Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Pink Book Ceremony Hero',
    width: 345,
    height: 220,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_ceremony_hero_08');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_ceremony_hero_08',
    name: 'Photo / Villa Handover Toast',
    width: 345,
    height: 220,
    x: 0,
    y: 0,
    imageUrl: 'hoi an resort teak',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_ceremony_hero_08',
    name: 'Glass Overlay / Deed Badge',
    width: 305,
    height: 52,
    x: 20,
    y: 152,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_ceremony_hero_08',
    text: 'SỔ HỒNG TITLE DEED OFFICIALLY CONVEYED',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 32,
    y: 162
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_ceremony_hero_08',
    text: 'Signed & Sealed by Thu Duc City Department of Natural Resources',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 32,
    y: 178
  });

  // 3. Handover Memorial Dossier Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Memorial Box',
    width: 345,
    height: 270,
    x: 24,
    y: 360,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_memorial_08');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_memorial_08',
    text: 'The Heritage Presentation Case',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const gifts = [
    { name: '1. Lacquered Ebony Certificate Case', desc: 'Bespoke hand-inlaid mother-of-pearl case containing original Sổ Hồng.' },
    { name: '2. Solid Gold Commemorative Villa Key', desc: 'Custom forged 18K solid yellow gold key inscribed with architect monograph number.' },
    { name: '3. VTN Studio Signed Architectural Monograph', desc: 'Hardcover linen-bound commemorative volume documenting every construction stage.' }
  ];

  let gfY = 50;
  gifts.forEach(g => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_memorial_08',
      text: g.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: gfY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_memorial_08',
      text: g.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: gfY + 16
    });

    gfY += 64;
  });

  // 4. Action Button: View Ownership Dashboard
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / View Ownership',
    text: 'Enter Estate Management Dashboard',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 646
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_08.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
