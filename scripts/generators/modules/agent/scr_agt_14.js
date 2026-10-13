import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-074 (AGT-14) — Bespoke VIP Membership Tier (Amber, Jade, Lotus)
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_14', 'SCR-074: VIP Membership Tier', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('MEMBERSHIP', 'EXCLUSIVE PRIVATE CLIENT TIERS', true);

  const sId = '$scr_agt_14';

  // 2. Active Tier Status Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Active Membership',
    width: 345,
    height: 140,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_tier_active_14');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_tier_active_14',
    text: 'CURRENT STATUS: ACTIVE CHARTER PATRON',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_tier_active_14',
    text: 'ARKI LOTUS HERITAGE CIRCLE',
    fontSize: 17,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_tier_active_14',
    text: 'Member ID: #ARKI-LOTUS-0089 • Valid Worldwide\nIncludes 24/7 Global Butler, Helicopter Access & Yacht Mooring',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  // 3. Three Tiers Comparison Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Tiers Comparison',
    width: 345,
    height: 330,
    x: 24,
    y: 280,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_tiers_comp_14');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_tiers_comp_14',
    text: 'Privilege Tiers Architecture',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const tiers = [
    { name: 'AMBER CIRCLE (HỔ PHÁCH)', criteria: 'Portfolio Assets > $3,000,000 USD', benefits: 'Access to off-market villas, 360 dollhouse tours, priority viewings.', color: TOKENS.accentGold },
    { name: 'JADE CIRCLE (NGỌC BÍCH)', criteria: 'Portfolio Assets > $10,000,000 USD', benefits: 'Maybach chauffeur arrival, architect 1-on-1 briefs, Sommelier service.', color: TOKENS.accentEmerald },
    { name: 'LOTUS CIRCLE (HOA SEN)', criteria: 'Invitation-Only / > $25,000,000 USD', benefits: 'Private yacht charter, Airbus H145 helicopter, Sổ Hồng legal escrow custody.', color: '#09090B' }
  ];

  let trY = 50;
  tiers.forEach(t => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_tiers_comp_14',
      text: t.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: t.color,
      x: 20,
      y: trY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_tiers_comp_14',
      text: t.criteria,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 20,
      y: trY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_tiers_comp_14',
      text: t.benefits,
      fontSize: 9,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: trY + 32
    });

    trY += 72;
  });

  // 4. Action Button: Request Tier Upgrade
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Request Tier Upgrade',
    text: 'Manage Family Office Privileges',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_14.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
