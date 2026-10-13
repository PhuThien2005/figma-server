import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-047 (ARC-01) — Master Architects Studio Showcase: VTN Architects
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_01', 'SCR-047: VTN Studio Showcase', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('STUDIO SHOWCASE', 'VTN ARCHITECTS • KTS VÕ TRỌNG NGHĨA', true, 'Share');

  const sId = '$scr_arc_01';

  // 2. Architect Profile Hero Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Master Architect VTN',
    width: 345,
    height: 170,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_vtn_profile_01');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_vtn_profile_01',
    name: 'Portrait / Vo Trong Nghia',
    width: 110,
    height: 170,
    x: 0,
    y: 0,
    imageUrl: 'vo trong nghia',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vtn_profile_01',
    text: 'KTS Võ Trọng Nghĩa',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 126,
    y: 20
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vtn_profile_01',
    text: 'Principal, VTN Architects\nRIBA International Fellow\nHonorary Fellow, AIA\nWorld Architecture Festival Winner',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 126,
    y: 44
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vtn_profile_01',
    text: '★ RIBA INTERNATIONAL FELLOW',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 126,
    y: 128
  });

  // 3. Studio Metrics Bento Row
  b.addMetricsBento([
    { label: 'BUILT MONOGRAPHS', value: '18 WORKS', color: TOKENS.accentGold },
    { label: 'GLOBAL HONORS', value: '5 RIBA AWARDS', color: TOKENS.accentEmerald }
  ], 308);

  // 4. Featured Masterpiece Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Featured Work',
    width: 345,
    height: 180,
    x: 24,
    y: 412,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_featured_vtn_01');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_featured_vtn_01',
    name: 'Cover / VTN Sanctuary',
    width: 345,
    height: 110,
    x: 0,
    y: 0,
    imageUrl: 'vtn bamboo compound',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_featured_vtn_01',
    text: 'The Riverfront Bamboo Sanctuary',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 122
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_featured_vtn_01',
    text: 'Thảo Điền, Saigon • 920 sq.m • Bamboo & Earth Architecture',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 144
  });

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Commission Brief',
    text: 'Commission Custom Architectural Brief →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 606,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_commission_01');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_01.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
