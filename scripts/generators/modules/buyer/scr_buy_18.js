import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-028 (BUY-18) — Private Portfolio Summary & Advisory Access
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_18', 'SCR-028: Portfolio Summary', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PORTFOLIO VAULT', 'CLIENT SUMMARY & ADVISORY ACCESS', true);

  const sId = '$scr_buy_18';

  // 2. Metrics Bento Row (Total Valuation & Escrow Status)
  b.addMetricsBento([
    { label: 'TRACKED ASSETS', value: '$13.2M USD', color: TOKENS.accentGold },
    { label: 'ESCROW STATUS', value: 'PRE-APPROVED', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Client Portfolio Summary Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Portfolio Overview',
    width: 345,
    height: 290,
    x: 24,
    y: 228,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_portfolio_18');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_portfolio_18',
    text: 'Active Shortlisted Sanctuaries (2)',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  const portfolioItems = [
    {
      name: 'The Riverfront Bamboo Pavilion',
      loc: 'Thảo Điền, Saigon • 920 sq.m',
      val: '$5,800,000 USD',
      status: 'UNDER LOI REVIEW'
    },
    {
      name: 'Ba Đình French Colonial Villa',
      loc: 'Ba Đình, Hanoi • 1,140 sq.m',
      val: '$7,400,000 USD',
      status: 'VERIFIED PINK BOOK'
    }
  ];

  let pY = 54;
  portfolioItems.forEach((pi, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: '$card_portfolio_18',
      name: `Item / ${pi.name}`,
      width: 305,
      height: 96,
      x: 20,
      y: pY,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 12
    }, `pitem_${idx}_18`);

    b.addStep('CREATE_TEXT', {
      parentId: `$pitem_${idx}_18`,
      text: pi.name,
      fontSize: 13,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 16,
      y: 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$pitem_${idx}_18`,
      text: pi.loc,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 16,
      y: 36
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$pitem_${idx}_18`,
      text: pi.val,
      fontSize: 12,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 16,
      y: 60
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$pitem_${idx}_18`,
      text: pi.status,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentEmerald,
      x: 180,
      y: 62
    });

    pY += 108;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Connect Partner',
    text: 'Consult with Managing Partner (Encrypted) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 546,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_partner_18');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_18.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
