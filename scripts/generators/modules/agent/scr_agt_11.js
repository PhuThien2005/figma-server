import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-071 (AGT-11) — Offshore Wealth Advisory & Tax Treaty Guidance
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_11', 'SCR-071: Offshore Wealth Advisory', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('TAX & WEALTH', 'CROSS-BORDER STRUCTURING DESK', true);

  const sId = '$scr_agt_11';

  // 2. Tax Treaty Framework Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Tax Treaty Framework',
    width: 345,
    height: 120,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_treaty_11');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_treaty_11',
    text: 'DOUBLE TAXATION AVOIDANCE (DTA) PROTOCOL',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_treaty_11',
    text: 'Singapore – Vietnam DTA Treaty Article 13',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_treaty_11',
    text: 'Capital gains structuring for foreign investment funds and family office holding vehicles holding freehold residential real estate assets.',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  // 3. Four Wealth Structuring Pillars Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Wealth Pillars',
    width: 345,
    height: 360,
    x: 24,
    y: 260,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_pillars_11');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_pillars_11',
    text: 'Private Client Wealth Solutions',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const pillars = [
    { title: '1. Foreign Direct Investment (FDI) SPV', desc: 'Direct corporate SPV incorporation for commercial/residential hybrid assets.' },
    { title: '2. Multi-Sig Escrow Custody (USD/EUR)', desc: 'Standard Chartered Vietnam offshore-inward escrow facility with zero FX slippage.' },
    { title: '3. Long-Term 50-Year Renewable Leasehold', desc: 'Protected by Decree 02/2022/ND-CP with automatic inheritance renewal clauses.' },
    { title: '4. Generational Asset Transfer & Trust', desc: 'Jersey & Singapore private family trust integration for multi-generational wealth preservation.' }
  ];

  let plY = 50;
  pillars.forEach(p => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_pillars_11',
      text: p.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: plY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_pillars_11',
      text: p.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: plY + 16
    });

    plY += 66;
  });

  // 4. Action Button: Schedule Senior Wealth Counsel
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Schedule Counsel',
    text: 'Schedule Senior Wealth Counsel Session',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_11.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
