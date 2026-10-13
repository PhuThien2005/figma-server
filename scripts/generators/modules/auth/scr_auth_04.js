import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-004 — Direct Master Architect Connection
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_04', 'SCR-004: Master Architect Connection', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('MASTER ARCHITECTS', 'DIRECT MONOGRAPH & CONSULTATION', true);

  // 2. Architect Card 1: KTS Võ Trọng Nghĩa
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_04',
    name: 'Card / Vo Trong Nghia',
    width: 345,
    height: 190,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_arc_vtn_04');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_arc_vtn_04',
    name: 'Portrait / Vo Trong Nghia',
    width: 120,
    height: 190,
    x: 0,
    y: 0,
    imageUrl: 'vo trong nghia',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_arc_vtn_04',
    text: 'KTS Võ Trọng Nghĩa',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 136,
    y: 24
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_arc_vtn_04',
    text: 'Founder, VTN Architects\nRIBA International Fellow\nMaster of Bamboo & Earth',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 136,
    y: 48
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_arc_vtn_04',
    name: 'Btn / View Monograph',
    text: 'View Works →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 136,
    y: 132,
    width: 140,
    height: 36,
    cornerRadius: 8
  });

  // 3. Architect Card 2: KTS Hoàng Thúc Hào
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_04',
    name: 'Card / Hoang Thuc Hao',
    width: 345,
    height: 190,
    x: 24,
    y: 330,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_arc_hth_04');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_arc_hth_04',
    name: 'Portrait / Hoang Thuc Hao',
    width: 120,
    height: 190,
    x: 0,
    y: 0,
    imageUrl: 'hoang thuc hao',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_arc_hth_04',
    text: 'KTS Hoàng Thúc Hào',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 136,
    y: 24
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_arc_hth_04',
    text: 'Founder, 1+1>2 Architects\nUIA Vassilis Sgoutas Laureate\nCultural Heritage Advocate',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 136,
    y: 48
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_arc_hth_04',
    name: 'Btn / View Monograph',
    text: 'View Works →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 136,
    y: 132,
    width: 140,
    height: 36,
    cornerRadius: 8
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_04',
    name: 'CTA / Connect',
    text: 'Request Architect Consultation →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 546,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_next_scr_auth_04');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_04.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
