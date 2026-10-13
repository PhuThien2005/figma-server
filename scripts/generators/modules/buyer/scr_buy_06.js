import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-016 (BUY-06) — Private Amenities & Waterfront Lifestyle
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_06', 'SCR-016: Private Amenities', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PRIVATE AMENITIES', 'BESPOKE WATERFRONT PRIVILEGES', true);

  const sId = '$scr_buy_06';

  // 2. 3 Rich Amenity Cards
  const amenities = [
    {
      title: 'Private Yacht Marina Dock',
      desc: 'Direct Saigon River deep-water mooring for private yachts up to 90ft. Dedicated shore power & concierge boatman.',
      tag: 'WATERFRONT BERTH',
      tagColor: TOKENS.accentEmerald
    },
    {
      title: 'Rooftop Helipad & Lounge',
      desc: 'Certified private landing pad for Airbus H145 / Bell 429. Direct 12-minute flight to Tan Son Nhat or Long Thanh.',
      tag: 'HELIPAD CERTIFIED',
      tagColor: TOKENS.accentGold
    },
    {
      title: 'Sommelier Teak Wine Vault',
      desc: 'Subterranean climate-controlled cellar (14°C / 65% RH) crafted from sustainably harvested Vietnamese teak. 1,200 bottle capacity.',
      tag: 'SOMMELIER CELLAR',
      tagColor: TOKENS.textPrimary
    }
  ];

  let currY = 124;
  amenities.forEach((am, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Amenity / ${am.title}`,
      width: 345,
      height: 124,
      x: 24,
      y: currY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: 16
    }, `amenity_${idx}_06`);

    b.addStep('CREATE_TEXT', {
      parentId: `$amenity_${idx}_06`,
      text: am.title,
      fontSize: 15,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 18,
      y: 18
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$amenity_${idx}_06`,
      text: am.desc,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 18,
      y: 42
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$amenity_${idx}_06`,
      text: am.tag,
      fontSize: 9,
      fontStyle: 'Bold',
      color: am.tagColor,
      x: 18,
      y: 98
    });

    currY += 138;
  });

  // 3. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Reserve Helicopter',
    text: 'Reserve Private Helicopter Viewing →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 560,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_heli_06');

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_06.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
