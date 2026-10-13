import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-064 (AGT-04) — Chauffeur Arrival Service (Maybach S680 / Range Rover SV)
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_04', 'SCR-064: VIP Chauffeur Arrival', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('CHAUFFEUR SERVICE', 'BESPOKE GROUND TRANSPORTATION', true);

  const sId = '$scr_agt_04';

  // 2. Chauffeur Status Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Chauffeur Status',
    width: 345,
    height: 160,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_chauffeur_status_04');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_chauffeur_status_04',
    text: 'STATUS: VEHICLE DISPATCHED & EN ROUTE',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_chauffeur_status_04',
    text: 'Mercedes-Maybach S680 4MATIC',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_chauffeur_status_04',
    text: 'Driver: Vũ Hoàng Nam (White Glove Certified)\nLicense Plate: 51K - 888.88 (VIP Escort Protocol)\nETA: 12 Minutes to Pickup Point',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_chauffeur_status_04',
    name: 'Pill / Amenities',
    width: 305,
    height: 28,
    x: 20,
    y: 120,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_chauffeur_status_04',
    text: '❄ Chilled Lotus Water • Wi-Fi 6 • Burmester 4D Audio',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 32,
    y: 127
  });

  // 3. Live Route Tracking Map Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Live Route Map',
    width: 345,
    height: 300,
    x: 24,
    y: 300,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_route_map_04');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_route_map_04',
    name: 'Map / Live Chauffeur GPS',
    width: 345,
    height: 300,
    x: 0,
    y: 0,
    imageUrl: 'map saigon',
    color: TOKENS.bgSurface
  });

  // Car Pin Overlay
  b.addStep('CREATE_FRAME', {
    parentId: '$card_route_map_04',
    name: 'Pin / Maybach Location',
    width: 140,
    height: 36,
    x: 102,
    y: 120,
    backgroundColor: '#09090BF2',
    cornerRadius: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_route_map_04',
    text: '🚘 MAYBACH (1.2 KM AWAY)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 114,
    y: 132
  });

  // 4. Action Button: Contact Driver Direct
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Call Chauffeur',
    text: 'Call Chauffeur Directly (Encrypted)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 620
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_04.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
