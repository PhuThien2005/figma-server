import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-026 (BUY-16) — Feng Shui & Geomancy Analysis
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_16', 'SCR-026: Feng Shui Geomancy', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('FENG SHUI & GEOMANCY', 'NATURAL QI & TOPOGRAPHIC HARMONY', true);

  const sId = '$scr_buy_16';

  // 2. Master Geomancy Badge (Lotus Porcelain Glass)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Geomancy Header',
    width: 345,
    height: 84,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_fengshui_header_16');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_fengshui_header_16',
    text: '☯ Master Geomancer Certified Analysis',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 18,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_fengshui_header_16',
    text: 'Audited by Vietnam Institute of Applied Geomancy. Direction, water bend, and wind currents verified.',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 44
  });

  // 3. 3 Core Geomancy Elements (Cards)
  const geomancyElements = [
    {
      title: 'Water Embrace (Thủy Tụ Sinh Khí)',
      desc: 'The estate sits directly on the auspicious convex bend of the Saigon River, naturally concentrating peaceful Qi and wealth energy.',
      status: 'AUSPICIOUS WATERFRONT'
    },
    {
      title: 'Southeast Orientation (Hướng Đông Nam)',
      desc: 'Optimal tropical orientation catching prevailing cool river breezes while completely shielding living spaces from harsh afternoon sun.',
      status: 'PRIME ORIENTATION'
    },
    {
      title: 'Bamboo Biophilic Screen (Thanh Long Mộc)',
      desc: 'Natural VTN engineered bamboo canopy acts as living acoustic dampener and atmospheric negative-ion oxygen generator.',
      status: 'NATURAL HARMONY'
    }
  ];

  let currY = 224;
  geomancyElements.forEach((el, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Element / ${el.title}`,
      width: 345,
      height: 98,
      x: 24,
      y: currY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: 14
    }, `el_${idx}_16`);

    b.addStep('CREATE_TEXT', {
      parentId: `$el_${idx}_16`,
      text: el.title,
      fontSize: 13,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 16,
      y: 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$el_${idx}_16`,
      text: el.desc,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 16,
      y: 38
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$el_${idx}_16`,
      text: `✓ ${el.status}`,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentEmerald,
      x: 16,
      y: 76
    });

    currY += 110;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Request Geomancy Dossier',
    text: 'Request Complete Geomancy Dossier (PDF) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 574,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_geomancy_16');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_16.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
