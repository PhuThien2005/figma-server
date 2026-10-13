import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-073 (AGT-13) — Private Aviation Charter Confirmation
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_13', 'SCR-073: Aviation Charter Confirmation', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PRIVATE FLIGHT', 'GULFSTREAM G650ER BOARDING PASS', true);

  const sId = '$scr_agt_13';

  // 2. Flight Boarding Pass Glass Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Boarding Pass',
    width: 345,
    height: 480,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_boarding_pass_13');

  // Top Accent Banner
  b.addStep('CREATE_FRAME', {
    parentId: '$card_boarding_pass_13',
    name: 'Banner / Flight Status',
    width: 345,
    height: 60,
    x: 0,
    y: 0,
    backgroundColor: '#09090B'
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_boarding_pass_13',
    text: 'ARKI PRIVATE AVIATION CHARTER',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_boarding_pass_13',
    text: 'CONFIRMED: FLIGHT AK-882 (SGN → HAN)',
    fontSize: 13,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 20,
    y: 32
  });

  // Airport Route Nodes
  b.addStep('CREATE_TEXT', {
    parentId: '$card_boarding_pass_13',
    text: 'SGN',
    fontSize: 32,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 24,
    y: 84
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_boarding_pass_13',
    text: '✈ 2h 05m ➔',
    fontSize: 12,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 130,
    y: 96
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_boarding_pass_13',
    text: 'HAN',
    fontSize: 32,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 250,
    y: 84
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_boarding_pass_13',
    text: 'Tân Sơn Nhất VIP Terminal',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 24,
    y: 124
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_boarding_pass_13',
    text: 'Nội Bài VIP FBO Terminal',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 220,
    y: 124
  });

  // Perforated Separator Line
  b.addStep('CREATE_FRAME', {
    parentId: '$card_boarding_pass_13',
    name: 'Line / Perforation',
    width: 305,
    height: 1,
    x: 20,
    y: 156,
    backgroundColor: TOKENS.border
  });

  // Flight Details Grid
  const flightDetails = [
    { k: 'AIRCRAFT', v: 'Gulfstream G650ER (VN-A888)' },
    { k: 'DEPARTURE TIME', v: '14:30 ICT • 15 October 2026' },
    { k: 'VIP PASSENGERS', v: '4 Guests + Dedicated In-Flight Chef' },
    { k: 'CHAUFFEUR TARMAC ESCORT', v: 'Mercedes-Maybach S680 Ramp Access' }
  ];

  let flY = 176;
  flightDetails.forEach(f => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_boarding_pass_13',
      text: f.k,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.textMuted,
      x: 24,
      y: flY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_boarding_pass_13',
      text: f.v,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 24,
      y: flY + 14
    });

    flY += 44;
  });

  // Barcode / QR Simulation Box
  b.addStep('CREATE_FRAME', {
    parentId: '$card_boarding_pass_13',
    name: 'Box / FBO Clearance Code',
    width: 297,
    height: 50,
    x: 24,
    y: 396,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_boarding_pass_13',
    text: 'ICAO CLEARANCE: VN-AGY-9948F101 • VIP RAMP PASS',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 36,
    y: 414
  });

  // 3. Action Button: Add to Apple Wallet
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Apple Wallet',
    text: 'Add Private Pass to Apple Wallet',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 626
  });

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_13.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
