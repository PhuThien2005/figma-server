import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-036 (360-08) — Structural Engineering Blueprint (CAD 1:100)
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_08', 'SCR-036: Structural CAD Blueprint', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('STRUCTURAL CAD 1:100', 'ENGINEERING JOINERY & FOUNDATION SPECS', true, 'DWG / BIM');

  const sId = '$scr_360_08';

  // 2. Structural Specs Bento Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Engineering Specs',
    width: 345,
    height: 420,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_cad_specs_08');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_cad_specs_08',
    text: 'Structural Engineering Specifications',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  const engItems = [
    {
      code: 'SPEC-01: FOUNDATION PILES',
      detail: 'Bored reinforced concrete piles (Ø1200mm) driven 48m into competent sandstone stratum. Resists maximum 100-year Saigon River flood scour.'
    },
    {
      code: 'SPEC-02: CANTILEVER POOL SLAB',
      detail: 'Post-tensioned concrete beam (Grade B35) projecting 6.5m over water. Cathodic protection against saline brackish intrusion.'
    },
    {
      code: 'SPEC-03: BAMBOO HYBRID JOINERY',
      detail: 'VTN patented stainless steel pin connections hidden within culm nodes. Zero exposed bolts, 50-year structural design life.'
    },
    {
      code: 'SPEC-04: SEISMIC & WIND COMPLIANCE',
      detail: 'Engineered to withstand Category 4 typhoon wind gusts (180 km/h) and Richter 6.5 seismic acceleration.'
    }
  ];

  let eY = 56;
  engItems.forEach((ei, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: '$card_cad_specs_08',
      name: `Box / ${ei.code}`,
      width: 305,
      height: 78,
      x: 20,
      y: eY,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 12
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_cad_specs_08',
      text: ei.code,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 32,
      y: eY + 12
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_cad_specs_08',
      text: ei.detail,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 32,
      y: eY + 30
    });

    eY += 88;
  });

  // 3. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Download DWG',
    text: 'Download Full BIM & DWG Engineering Package (64MB) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 564,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_dwg_08');

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_08.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
