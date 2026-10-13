import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-048 (ARC-02) — Master Architects Studio Showcase: 1+1>2 Architects
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_02', 'SCR-048: 1+1>2 Studio Showcase', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('STUDIO SHOWCASE', '1+1>2 ARCHITECTS • KTS HOÀNG THÚC HÀO', true, 'Share');

  const sId = '$scr_arc_02';

  // 2. Architect Profile Hero Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Master Architect HTH',
    width: 345,
    height: 170,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_hth_profile_02');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_hth_profile_02',
    name: 'Portrait / Hoang Thuc Hao',
    width: 110,
    height: 170,
    x: 0,
    y: 0,
    imageUrl: 'hoang thuc hao',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_hth_profile_02',
    text: 'KTS Hoàng Thúc Hào',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 126,
    y: 20
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_hth_profile_02',
    text: 'Founder, 1+1>2 Architects\nUIA Vassilis Sgoutas Prize Laureate\nARCASIA Gold Medal Winner\nHeritage Earth & Wood Pioneer',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 126,
    y: 44
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_hth_profile_02',
    text: '★ UIA INTERNATIONAL LAUREATE',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 126,
    y: 128
  });

  // 3. Studio Metrics Bento Row
  b.addMetricsBento([
    { label: 'BUILT MONOGRAPHS', value: '24 WORKS', color: TOKENS.accentGold },
    { label: 'GLOBAL HONORS', value: 'UIA LAUREATE', color: TOKENS.accentEmerald }
  ], 308);

  // 4. Featured Masterpiece Card: Hội An Teak Courtyard
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Featured Work HTH',
    width: 345,
    height: 180,
    x: 24,
    y: 412,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_featured_hth_02');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_featured_hth_02',
    name: 'Cover / Hoi An Teak',
    width: 345,
    height: 110,
    x: 0,
    y: 0,
    imageUrl: 'resort hoi an',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_featured_hth_02',
    text: 'Hội An Heritage Teak Courtyard',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 122
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_featured_hth_02',
    text: 'Hội An Ancient Town • 1,450 sq.m • Vernacular Earth & Teak',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 144
  });

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Schedule Consultation',
    text: 'Schedule Private Consultation with KTS Hào →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 606,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_consult_02');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_02.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
