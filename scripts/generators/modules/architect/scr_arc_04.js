import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-050 (ARC-04) — Sustainable Materials Research (Bamboo & Earth)
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_04', 'SCR-050: Sustainable Material Research', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('MATERIAL RESEARCH', 'CARBON-NEGATIVE BIOCLIMATIC LAB', true, 'Specs');

  const sId = '$scr_arc_04';

  // 2. Metrics Bento Row (Tensile Strength & Carbon Negative)
  b.addMetricsBento([
    { label: 'TENSILE STRENGTH', value: '160 MPa', color: TOKENS.accentEmerald },
    { label: 'CARBON SEQUESTRATION', value: '-482 kg CO₂/m³', color: TOKENS.accentGold }
  ], 124);

  // 3. Technical Monograph Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Material Monograph',
    width: 345,
    height: 310,
    x: 24,
    y: 228,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_mat_monograph_04');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_mat_monograph_04',
    text: 'Engineered Bamboo Culm Structural Testing',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  const testResults = [
    {
      metric: 'Tensile Strength to Weight Ratio',
      val: '3.2× Structural Softwood',
      desc: 'Tested at National University of Civil Engineering (NUCE Hanoi).'
    },
    {
      metric: 'Thermal Conductivity (k-value)',
      val: '0.12 W/m·K (Insulative)',
      desc: 'Provides 4.5× superior thermal insulation over standard brickwork.'
    },
    {
      metric: 'Fire Retardant Borate Treatment',
      val: 'Class B-s1, d0 (Self-Extinguishing)',
      desc: 'Proprietary non-toxic mineral salt immersion preserves biological matrix.'
    },
    {
      metric: 'Structural Lifespan Guarantee',
      val: '50 Years Warranted',
      desc: 'Zero delamination under tropical 95% relative humidity testing.'
    }
  ];

  let mY = 54;
  testResults.forEach((tr, i) => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_mat_monograph_04',
      text: tr.metric,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: mY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_mat_monograph_04',
      text: tr.val,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.accentEmerald,
      x: 20,
      y: mY + 18
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_mat_monograph_04',
      text: tr.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: mY + 34
    });

    mY += 60;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Download Monograph',
    text: 'Download Full Engineering Monograph (CSI 06) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 564,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_download_mono_04');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_04.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
