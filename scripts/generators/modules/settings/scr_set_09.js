import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-109 (SET-09) — Terms of Private Placement & Heritage Preservation Code
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_09', 'SCR-109: Terms of Placement', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('HERITAGE CHARTER', 'ETHICS & CONSERVATION COMMITMENTS', true);

  const sId = '$scr_set_09';

  // 2. Charter Preamble Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Preamble Charter',
    width: 345,
    height: 140,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_preamble_09');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_preamble_09',
    text: 'ARKI VIETNAM HERITAGE CONSERVATION CODE',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_preamble_09',
    text: 'Stewardship of Tropical Vietnamese Architecture',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_preamble_09',
    text: 'By participating in the ARKI private architectural platform, buyers pledge adherence to sustainable biophilic building covenants and local craft guild patronage.',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  // 3. Four Core Covenants Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Core Covenants',
    width: 345,
    height: 340,
    x: 24,
    y: 280,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_covenants_09');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_covenants_09',
    text: 'Core Architectural Undertakings',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const covenants = [
    { title: '1. Preservation of Native Tree Canopy', desc: 'No mature rain trees, banyans, or bamboo groves may be felled during site works.' },
    { title: '2. Low-Carbon Indigenous Materials', desc: 'Minimum 40% certified Vietnamese bio-materials (Tam Vong bamboo, Gia Lai teak, Bat Trang clay).' },
    { title: '3. Riverfront Ecological Buffer Accord', desc: '30-metre green setback preserved with native mangrove and lotus wetland reeds.' },
    { title: '4. Non-Speculative Heritage Stewardship', desc: 'Villa structures designed for 100-year generational family residence.' }
  ];

  let cvY = 50;
  covenants.forEach(c => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_covenants_09',
      text: c.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: cvY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_covenants_09',
      text: c.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: cvY + 16
    });

    cvY += 56;
  });

  // 4. Action Button: Download Charter
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Download Charter',
    text: 'Download Full Conservation Charter (PDF)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_09.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
