import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-034 (360-06) — Hotspot Material Inspector: Vietnamese Artisanal Finishes
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_06', 'SCR-034: Material Inspector', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('MATERIAL INSPECTOR', 'AUTHENTIC INDIGENOUS FINISHES', true, 'Specs');

  const sId = '$scr_360_06';

  // 2. 3 Material Breakdown Cards (Glass Container)
  const materials = [
    {
      name: 'Bát Tràng Ceramic Glaze (Gốm Sứ Bát Tràng)',
      desc: 'Hand-thrown wood-ash crackle glaze ceramic tiles. Sourced directly from 700-year-old artisan kilns along the Red River.',
      spec: 'LOTUS PLATINUM • RED RIVER CLAY',
      color: TOKENS.accentGold
    },
    {
      name: 'Engineered Bamboo Struts (Tre Ép Tự Nhiên)',
      desc: 'VTN patented thermo-pressure treated bamboo culms. High tensile strength exceeding structural timber, natural resistance to humidity.',
      spec: 'VTN PROPRIETARY TECH • FSC CERTIFIED',
      color: TOKENS.accentEmerald
    },
    {
      name: 'Sustainably Harvested Teak (Gỗ Tếch Đông Dương)',
      desc: 'Reclaimed teak wood with natural golden silica patina. Used for bespoke millwork, kitchen cabinetry, and sommelier cellar.',
      spec: '100% RECLAIMED • SILICA PATINA',
      color: TOKENS.textPrimary
    }
  ];

  let currY = 124;
  materials.forEach((mat, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Material / ${mat.name}`,
      width: 345,
      height: 128,
      x: 24,
      y: currY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: 16
    }, `mat_card_${idx}_06`);

    b.addStep('CREATE_TEXT', {
      parentId: `$mat_card_${idx}_06`,
      text: mat.name,
      fontSize: 13,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 18,
      y: 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$mat_card_${idx}_06`,
      text: mat.desc,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 18,
      y: 40
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$mat_card_${idx}_06`,
      text: `✓ ${mat.spec}`,
      fontSize: 9,
      fontStyle: 'Bold',
      color: mat.color,
      x: 18,
      y: 100
    });

    currY += 140;
  });

  // 3. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Request Sample Box',
    text: 'Order Physical Material Sample Box (Courier) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 564,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_samples_06');

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_06.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
