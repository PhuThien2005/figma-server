import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-062 (AGT-02) — Saigon River Yacht Tour Booking & Berth Reservation
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_02', 'SCR-062: Saigon River Yacht Tour', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('YACHT CHARTER', 'SAIGON RIVER WATERFRONT EXPEDITION', true);

  const sId = '$scr_agt_02';

  // 2. Yacht Vessel Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Yacht Charter Vessel',
    width: 345,
    height: 190,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_yacht_vessel_02');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_yacht_vessel_02',
    name: 'Photo / Yacht Sunset River',
    width: 345,
    height: 190,
    x: 0,
    y: 0,
    imageUrl: 'villa thao dien pool',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_yacht_vessel_02',
    name: 'Glass Overlay / Vessel Specs',
    width: 305,
    height: 48,
    x: 20,
    y: 126,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_yacht_vessel_02',
    text: 'AZIMUT 78 FLYBRIDGE • “ARKI LOTUS I”',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 32,
    y: 136
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_yacht_vessel_02',
    text: 'Berth: Ba Son Central Marina (District 1) • Capacity: 12 VIP Guests',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 32,
    y: 152
  });

  // 3. Waterfront Estate Itinerary Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / River Cruise Itinerary',
    width: 345,
    height: 280,
    x: 24,
    y: 330,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_itinerary_02');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_itinerary_02',
    text: 'Private Sunset River Route',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const stops = [
    { time: '16:00', title: 'Embarkation at Ba Son Marina Pier', desc: 'Welcome Dom Pérignon & Lotus Tea Refreshment' },
    { time: '16:45', title: 'Thảo Điền Riverfront Villa Inspection', desc: 'Direct pontoon mooring at VTN Bamboo Sanctuary' },
    { time: '17:30', title: 'Thanh Đa Peninsula Sunset Lagoon', desc: 'Private 360 architectural projection on upper deck' },
    { time: '18:30', title: 'Return Disembarkation at Landmark Marina', desc: 'Chauffeur Maybach S680 waiting on pier' }
  ];

  let stY = 48;
  stops.forEach(s => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_itinerary_02',
      text: s.time,
      fontSize: 10,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: stY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_itinerary_02',
      text: s.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 68,
      y: stY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_itinerary_02',
      text: s.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 68,
      y: stY + 14
    });

    stY += 52;
  });

  // 4. Reserve Yacht Charter Action
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Reserve Yacht',
    text: 'Reserve Private River Cruise (Complimentary for VIP)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_02.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
