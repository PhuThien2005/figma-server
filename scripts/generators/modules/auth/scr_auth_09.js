import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-009 — Private Client Advisory Intro
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_09', 'SCR-009: Private Advisory', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PRIVATE ADVISORY', 'DISCREET CLIENT REPRESENTATION', true);

  // 2. Advisor Profile Card
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_09',
    name: 'Card / Senior Private Advisor',
    width: 345,
    height: 180,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_adv_09');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_adv_09',
    name: 'Portrait / Advisor',
    width: 120,
    height: 180,
    x: 0,
    y: 0,
    imageUrl: 'broker male',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_adv_09',
    text: 'Trần Minh Quân',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 136,
    y: 20
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_adv_09',
    text: 'Senior Real Estate Advisor\n14+ Years in Ultra-Luxury Vietnam\nSpecialist in Heritage & Waterfront',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 136,
    y: 44
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_adv_09',
    text: 'VERIFIED BROKER #VN-9948',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 136,
    y: 120
  });

  // 3. Confidential Advisory Capabilities (3 Features)
  const caps = [
    { label: 'Off-Market Private Releases', desc: 'Pre-vetted unlisted villas in Ba Đình & Thảo Điền' },
    { label: 'Encrypted Escrow Representation', desc: 'Bank vault guarantees via Vietcombank Priority' },
    { label: 'Helicopter & Yacht Viewing Logistics', desc: 'Full concierge coordination for on-site inspections' }
  ];

  let currY = 320;
  caps.forEach((cp, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: '$scr_auth_09',
      name: `Feature / ${cp.label}`,
      width: 345,
      height: 68,
      x: 24,
      y: currY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: 14
    }, `cap_${idx}_09`);

    b.addStep('CREATE_TEXT', {
      parentId: `$cap_${idx}_09`,
      text: cp.label,
      fontSize: 13,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 16,
      y: 14
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$cap_${idx}_09`,
      text: cp.desc,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 16,
      y: 36
    });

    currY += 80;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_09',
    name: 'CTA / Connect Advisor',
    text: 'Connect with Senior Advisor →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 580,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_next_scr_auth_09');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_09.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
