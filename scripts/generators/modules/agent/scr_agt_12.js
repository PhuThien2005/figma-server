import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-072 (AGT-12) — Concierge 24/7 Priority Hotline & Butler Request
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_12', 'SCR-072: 24/7 Hotline & Butler', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PRIVATE BUTLER', '24/7 DEDICATED CONCIERGE DESK', true);

  const sId = '$scr_agt_12';

  // 2. Butler Instant Connection Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Butler Instant Connection',
    width: 345,
    height: 160,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_butler_hero_12');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_butler_hero_12',
    text: 'STATUS: ACTIVE VIP HOTLINE CONNECTED',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_butler_hero_12',
    text: 'Executive Butler Desk: Unit 01',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_butler_hero_12',
    text: 'Average Response Time: < 30 Seconds\nDirect Swiss Encrypted Satellite Line\nEmergency Guard & Medical Dispatch Enabled',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_butler_hero_12',
    name: 'Pill / Hotkey',
    width: 305,
    height: 28,
    x: 20,
    y: 120,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_butler_hero_12',
    text: '📞 DIRECT SATELLITE LINE: +84 (0) 28 8888 7777',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 32,
    y: 127
  });

  // 3. Quick Butler Dispatch Actions Grid
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Butler Actions',
    width: 345,
    height: 310,
    x: 24,
    y: 300,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_butler_actions_12');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_butler_actions_12',
    text: 'Instant One-Touch Dispatch Services',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const dispatches = [
    { title: '1. In-Villa Private Chef Dinner', desc: '3-Star Michelin guest chef arrival with kitchen team.' },
    { title: '2. Armed Security Escort (Saigon / Airport)', desc: '2 Close-protection officers with discreet armored convoy.' },
    { title: '3. Floral & Lotus Fragrance Replenishment', desc: 'Fresh West Lake lotus arrangements delivered daily.' },
    { title: '4. Yacht Mooring & Marina Valet', desc: 'Berth preparation and refueling at Ba Son pier.' }
  ];

  let dpY = 50;
  dispatches.forEach(d => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_butler_actions_12',
      text: d.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: dpY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_butler_actions_12',
      text: d.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: dpY + 16
    });

    dpY += 56;
  });

  // 4. Action Button: Connect Live Audio Call
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Connect Butler Voice',
    text: 'Connect Live Audio Call with Butler Now',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 626
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_12.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
