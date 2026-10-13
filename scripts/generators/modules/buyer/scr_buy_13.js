import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-023 (BUY-13) — Semantic AI Architectural Search
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_13', 'SCR-023: Semantic AI Search', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('AI ARCHITECTURAL SEARCH', 'NATURAL LANGUAGE SPATIAL DISCOVERY', true);

  const sId = '$scr_buy_13';

  // 2. Semantic Search Input Bar (Frosted Glass)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Search Box',
    width: 345,
    height: 84,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_search_box_13');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_search_box_13',
    text: '🔍 "Bamboo villa along Saigon river with sunset pool and private boat dock"',
    fontSize: 12,
    fontStyle: 'Regular',
    color: TOKENS.textPrimary,
    x: 18,
    y: 20
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_search_box_13',
    text: 'AI Semantic Parser: KTS Võ Trọng Nghĩa • Thảo Điền • Infinity Lap Pool',
    fontSize: 10,
    fontStyle: 'SemiBold',
    color: TOKENS.accentEmerald,
    x: 18,
    y: 52
  });

  // 3. Extracted Semantic Tags
  const tags = ['Biophilic Bamboo', 'Riverfront Berth', 'Sunset Lap Pool', 'Valuation > $5M'];
  tags.forEach((tg, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const tgX = 24 + col * (165 + 15);
    const tgY = 224 + row * (40 + 8);

    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Tag / ${tg}`,
      width: 165,
      height: 40,
      x: tgX,
      y: tgY,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 10
    }, `tg_${idx}_13`);

    b.addStep('CREATE_TEXT', {
      parentId: `$tg_${idx}_13`,
      text: `✓ ${tg}`,
      fontSize: 11,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 14,
      y: 13
    });
  });

  // 4. AI Best Match Card (98% Compatibility)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / AI Best Match 98%',
    width: 345,
    height: 200,
    x: 24,
    y: 330,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_ai_match_13');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_ai_match_13',
    name: 'Thumb / Thao Dien',
    width: 345,
    height: 115,
    x: 0,
    y: 0,
    imageUrl: 'villa thao dien',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_ai_match_13',
    text: 'The Riverfront Bamboo Pavilion',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 16,
    y: 128
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_ai_match_13',
    text: '98% SEMANTIC MATCH • KTS Võ Trọng Nghĩa • $5,800,000 USD',
    fontSize: 11,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 16,
    y: 154
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_ai_match_13',
    text: 'Thảo Điền, Saigon • 35m Sunset Pool • Private Dock included',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 16,
    y: 174
  });

  // 5. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / View 360 Tour',
    text: 'Launch 360 Spatial Immersion →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 546,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_launch_match_13');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_13.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
