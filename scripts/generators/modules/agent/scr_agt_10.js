import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-070 (AGT-10) — International School & Health Concierge Briefing
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_10', 'SCR-070: School & Health Concierge', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('FAMILY CONCIERGE', 'ELITE HEALTH & EDUCATION NETWORK', true);

  const sId = '$scr_agt_10';

  // 2. Proximity Overview Bento
  b.addMetricsBento([
    { label: 'TOP IB SCHOOLS', value: '3 WITHIN 3KM', color: TOKENS.accentGold },
    { label: 'JCI HOSPITALS', value: '2 WITHIN 5KM', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Premier International Schools Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Top Schools',
    width: 345,
    height: 220,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_schools_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_schools_10',
    text: 'Premier International Academies',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const schools = [
    { name: 'British International School (BIS HCMC)', loc: 'Thảo Điền • IB Diploma 38.2 Average', dist: '1.2 km (5 min drive)' },
    { name: 'International School HCMC (ISHCMC)', loc: 'An Phú • Full IB Continuum Accredited', dist: '2.1 km (7 min drive)' },
    { name: 'European International School (EIS)', loc: 'Thảo Điền • Village Campus Setting', dist: '1.8 km (6 min drive)' }
  ];

  let scY = 46;
  schools.forEach(sc => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_schools_10',
      text: sc.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: scY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_schools_10',
      text: `${sc.loc} • ${sc.dist}`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: scY + 16
    });

    scY += 52;
  });

  // 4. JCI-Accredited Healthcare Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Medical Facilities',
    width: 345,
    height: 150,
    x: 24,
    y: 466,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_medical_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_medical_10',
    text: 'Priority Private Medical Facilities',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const clinics = [
    { name: 'FV Hospital (JCI Accredited Private Facility)', note: 'Direct Heli-Evacuation Landing Zone' },
    { name: 'Vinmec Central Park International Hospital', note: '24/7 VIP Emergency Trauma Wing' }
  ];

  let clY = 46;
  clinics.forEach(cl => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_medical_10',
      text: cl.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: clY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_medical_10',
      text: cl.note,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.accentEmerald,
      x: 20,
      y: clY + 16
    });

    clY += 46;
  });

  // 5. Action Button: Request Headmaster Introduction
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Request Admissions',
    text: 'Request Priority School Admissions Desk',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_10.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
