import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-049 (ARC-03) — Architect Built Works Directory (Vietnam Elite)
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_03', 'SCR-049: Master Architect Directory', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ARCHITECT DIRECTORY', 'VIETNAM & ASIA MASTER STUDIOS (4)', true, 'Filter');

  const sId = '$scr_arc_03';

  // 2. 4 Master Studio Directory Cards
  const studios = [
    {
      name: 'VTN Architects',
      founder: 'KTS Võ Trọng Nghĩa',
      specialty: 'Engineered Bamboo & Biophilic Compounds',
      honor: '5 RIBA Awards • 18 Monographs',
      thumb: 'avatar_vo_trong_nghia.jpg'
    },
    {
      name: '1+1>2 Architects',
      founder: 'KTS Hoàng Thúc Hào',
      specialty: 'Vernacular Earth & Cultural Heritage',
      honor: 'UIA Laureate • 24 Monographs',
      thumb: 'avatar_hoang_thuc_hao.jpg'
    },
    {
      name: 'Ba Đình Heritage Conservation',
      founder: 'French-Vietnamese Atelier',
      specialty: 'Indochine Colonial Restoration',
      honor: 'Heritage Tier 1 • 12 Monographs',
      thumb: 'villa_ba_dinh.jpg'
    },
    {
      name: 'Tropical Space Studio',
      founder: 'KTS Nguyễn Hải Long',
      specialty: 'Perforated Red Brick & Passive Cooling',
      honor: 'WAF Shortlist • 8 Monographs',
      thumb: 'resort_hoi_an.jpg'
    }
  ];

  let currY = 124;
  studios.forEach((st, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Studio / ${st.name}`,
      width: 345,
      height: 96,
      x: 24,
      y: currY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: 16
    }, `st_dir_${idx}_03`);

    b.addStep('CREATE_TEXT', {
      parentId: `$st_dir_${idx}_03`,
      text: st.name,
      fontSize: 14,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 18,
      y: 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$st_dir_${idx}_03`,
      text: `${st.founder} • ${st.specialty}`,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 18,
      y: 38
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$st_dir_${idx}_03`,
      text: `★ ${st.honor}`,
      fontSize: 10,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 18,
      y: 64
    });

    b.addStep('CREATE_BUTTON', {
      parentId: `$st_dir_${idx}_03`,
      name: 'Btn / View Studio',
      text: 'View Studio →',
      backgroundColor: TOKENS.bgSurface,
      textColor: TOKENS.textPrimary,
      x: 236,
      y: 56,
      width: 95,
      height: 30,
      cornerRadius: 6
    });

    currY += 108;
  });

  // 3. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Custom Commission',
    text: 'Submit Custom Architectural Villa Brief →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 574,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_custom_brief_03');

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_03.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
