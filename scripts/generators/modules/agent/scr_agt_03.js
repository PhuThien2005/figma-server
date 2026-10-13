import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-063 (AGT-03) — Private Helicopter Flyover Itinerary
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_03', 'SCR-063: Helicopter Flyover Itinerary', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('HELICOPTER TOUR', 'AERIAL ESTATE APPRAISAL', true);

  const sId = '$scr_agt_03';

  // 2. Aircraft & Route Overview Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Helicopter Flight Spec',
    width: 345,
    height: 190,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_heli_spec_03');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_heli_spec_03',
    name: 'Photo / Aerial Estate View',
    width: 345,
    height: 190,
    x: 0,
    y: 0,
    imageUrl: 'da nang ocean villa',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_heli_spec_03',
    name: 'Glass Overlay / Aircraft Model',
    width: 305,
    height: 48,
    x: 20,
    y: 126,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_heli_spec_03',
    text: 'AIRBUS H145 VIP TWIN-ENGINE ROTORCRAFT',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 32,
    y: 136
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_heli_spec_03',
    text: 'Departure: Tân Sơn Nhất VIP Helipad (SGN) • 6 Passenger Seating',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 32,
    y: 152
  });

  // 3. Flight Corridors Selector
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Flight Corridors',
    width: 345,
    height: 280,
    x: 24,
    y: 330,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_corridors_03');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_corridors_03',
    text: 'Select Aerial Inspection Corridor',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const routes = [
    { name: 'Saigon Riverfront & Thủ Thiêm Skyview', time: '35 Mins', tag: 'RECOMMENDED', price: '$2,800 USD' },
    { name: 'Vũng Tàu Coastal Cliff Sanctuary Overflight', time: '55 Mins', tag: 'COASTAL', price: '$4,200 USD' },
    { name: 'Đà Lạt Pine Forest & Alpine Estate Corridor', time: '80 Mins', tag: 'HIGHLANDS', price: '$6,500 USD' }
  ];

  let rY = 52;
  routes.forEach(r => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_corridors_03',
      text: r.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: rY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_corridors_03',
      text: `Flight Time: ${r.time} • Rate: ${r.price}`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: rY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_corridors_03',
      text: `★ ${r.tag}`,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: rY + 34
    });

    rY += 68;
  });

  // 4. Action Button: Book Helicopter Slot
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Book Helicopter',
    text: 'Book Helicopter Flight Slot (Instant Dispatch)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_03.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
