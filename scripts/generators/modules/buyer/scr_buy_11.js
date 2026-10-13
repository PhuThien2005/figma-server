import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-021 (BUY-11) — Curated Collection: Pritzker & Heritage Awards
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_11', 'SCR-021: Heritage Award Collection', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('AWARD COLLECTION', 'INTERNATIONAL PRITZKER & UIA WORKS', true);

  const sId = '$scr_buy_11';

  // 2. Collection Badge Banner (Lotus Porcelain Glass)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Award Header',
    width: 345,
    height: 90,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_award_header_11');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_award_header_11',
    text: '★ Curated Laureate Masterpieces',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 18,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_award_header_11',
    text: 'Estates recognized by RIBA, UIA, ARCASIA and the Pritzker jury. Verified authentic architectural titles in Vietnam.',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 44
  });

  // 3. Award Estate Card 1: VTN Bamboo Sanctuary (RIBA International Award)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Award Estate 1',
    width: 345,
    height: 190,
    x: 24,
    y: 228,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 18,
    clipsContent: true
  }, 'card_estate_award_01');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_estate_award_01',
    name: 'Cover / VTN Bamboo',
    width: 345,
    height: 110,
    x: 0,
    y: 0,
    imageUrl: 'vtn bamboo compound',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_estate_award_01',
    text: 'The Riverfront Bamboo Sanctuary',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 122
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_estate_award_01',
    text: 'KTS Võ Trọng Nghĩa • RIBA International Award Winner • $5,800,000 USD',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 146
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_estate_award_01',
    text: 'RIBA LAUREATE 2024',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 16,
    y: 168
  });

  // 4. Award Estate Card 2: 1+1>2 Architects Earth & Wood (UIA Vassilis Sgoutas)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Award Estate 2',
    width: 345,
    height: 190,
    x: 24,
    y: 432,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 18,
    clipsContent: true
  }, 'card_estate_award_02');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_estate_award_02',
    name: 'Cover / Hoi An Teak',
    width: 345,
    height: 110,
    x: 0,
    y: 0,
    imageUrl: 'resort hoi an',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_estate_award_02',
    text: 'Hội An Heritage Teak Courtyard',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 122
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_estate_award_02',
    text: 'KTS Hoàng Thúc Hào • UIA Vassilis Sgoutas Prize • $4,800,000 USD',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 146
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_estate_award_02',
    text: 'UIA GLOBAL PRIZE',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 16,
    y: 168
  });

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / View All Laureate Works',
    text: 'Explore All 14 Laureate Estates →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_all_awards_11');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_11.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
