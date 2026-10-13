import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-066 (AGT-06) — High-Net-Worth Advisory Team Directory
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_06', 'SCR-066: HNW Advisory Directory', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ADVISORY BOARD', 'PRIVATE CLIENT CONSULTING TEAM', true);

  const sId = '$scr_agt_06';

  // 2. Search / Filter Chips
  b.addCategoryChips(['ALL DESKS', 'LEGAL & TITLE', 'WEALTH & TAX', 'ARCHITECTURE'], 0, 116);

  // 3. Advisor 1 Card: Lead Managing Partner
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Advisor 1',
    width: 345,
    height: 140,
    x: 24,
    y: 168,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_adv_01');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_adv_01',
    name: 'Photo / Advisor 1',
    width: 90,
    height: 140,
    x: 0,
    y: 0,
    imageUrl: 'broker avatar',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_adv_01',
    text: 'Trần Gia Bảo, LL.M',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 104,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_adv_01',
    text: 'Head of Legal Due Diligence\nEx-Baker McKenzie Vietnam\nExpertise: Sổ Đỏ / Sổ Hồng Heritage Title',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 104,
    y: 38
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_adv_01',
    name: 'Btn / Contact Adv 1',
    text: 'Direct Encrypted Line',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 104,
    y: 92,
    width: 170,
    height: 32
  });

  // 4. Advisor 2 Card: Private Wealth Strategist
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Advisor 2',
    width: 345,
    height: 140,
    x: 24,
    y: 322,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_adv_02');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_adv_02',
    name: 'Photo / Advisor 2',
    width: 90,
    height: 140,
    x: 0,
    y: 0,
    imageUrl: 'architect portrait male',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_adv_02',
    text: 'Lê Hoàng Phong, CFA',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 104,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_adv_02',
    text: 'Senior Offshore Wealth Advisor\nEx-UBS Wealth Management Singapore\nFocus: Multi-Currency Escrow & Tax Treaties',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 104,
    y: 38
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_adv_02',
    name: 'Btn / Contact Adv 2',
    text: 'Direct Encrypted Line',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 104,
    y: 92,
    width: 170,
    height: 32
  });

  // 5. Advisor 3 Card: Chief Concierge
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Advisor 3',
    width: 345,
    height: 140,
    x: 24,
    y: 476,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_adv_03');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_adv_03',
    name: 'Photo / Advisor 3',
    width: 90,
    height: 140,
    x: 0,
    y: 0,
    imageUrl: 'vietnamese lady ao dai',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_adv_03',
    text: 'Nguyễn Thảo My',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 104,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_adv_03',
    text: 'Director of VIP Lifestyle Concierge\nLes Clefs d’Or Member\nFocus: Aviation, Yachting & Private Security',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 104,
    y: 38
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_adv_03',
    name: 'Btn / Contact Adv 3',
    text: 'Direct Encrypted Line',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 104,
    y: 92,
    width: 170,
    height: 32
  });

  // 6. Action Button: Request Advisory Board Call
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Assemble Board',
    text: 'Convene Full Advisory Board (Joint Session)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 7. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_06.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
