import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-061 (AGT-01) — VIP Concierge Private Portfolio Consultation
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_01', 'SCR-061: VIP Concierge Consultation', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('VIP CONCIERGE', 'DEDICATED PRIVATE WEALTH DESK', true);

  const sId = '$scr_agt_01';

  // 2. Dedicated Concierge Officer Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Concierge Host Profile',
    width: 345,
    height: 170,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_host_01');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_host_01',
    name: 'Portrait / Concierge Lady',
    width: 110,
    height: 170,
    x: 0,
    y: 0,
    imageUrl: 'vietnamese lady ao dai',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_host_01',
    text: 'Nguyễn Thảo My',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 126,
    y: 20
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_host_01',
    text: 'Senior Private Client Director\nEx-Aman Resorts & Les Clefs d’Or\nLanguages: English, French, Vietnamese\nFocus: Saigon River & Heritage Estates',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 126,
    y: 44
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_host_01',
    text: '★ LES CLEFS D’OR CERTIFIED',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 126,
    y: 128
  });

  // 3. Confidential Portfolio Stats
  b.addMetricsBento([
    { label: 'OFF-MARKET ASSETS', value: '14 ESTATES', color: TOKENS.accentGold },
    { label: 'DISCRETION RATING', value: '100% PRIVATE', color: TOKENS.accentEmerald }
  ], 308);

  // 4. Request Private Portfolio Review Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Portfolio Review Schedule',
    width: 345,
    height: 180,
    x: 24,
    y: 412,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_portfolio_rev_01');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_portfolio_rev_01',
    text: 'Private Consultation Format',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const formats = [
    { type: 'In-Person Residence Visit', desc: 'At your private villa or Park Hyatt Saigon presidential suite' },
    { type: 'Encrypted Video Room', desc: '4K Spatial Audio with live 360 dollhouse BIM co-browsing' },
    { type: 'Saigon River Yacht Briefing', desc: 'Private yacht cruise departing Ba Son marina' }
  ];

  let fmY = 46;
  formats.forEach(f => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_portfolio_rev_01',
      text: `• ${f.type}`,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: fmY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_portfolio_rev_01',
      text: f.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 30,
      y: fmY + 14
    });

    fmY += 38;
  });

  // 5. Action Button: Request Immediate Call
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Request Call',
    text: 'Request Instant Confidential Call',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 620
  });

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_01.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
