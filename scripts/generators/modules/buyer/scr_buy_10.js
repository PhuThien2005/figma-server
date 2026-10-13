import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-020 (BUY-10) — 360 Viewing History & Spatial Resume
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_10', 'SCR-020: Spatial Tour History', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SPATIAL RESUME', 'RECENT 360 TOURS & INSPECTIONS', true, 'Clear');

  const sId = '$scr_buy_10';

  // 2. Recent History Cards
  const history = [
    {
      title: 'Living Room Atrium',
      estate: 'The Riverfront Bamboo Pavilion',
      time: '14 mins ago • 4 Hotspots Visited',
      thumb: 'living room atrium',
      progress: '100% EXPLORED'
    },
    {
      title: 'Sunset Infinity Pool Deck',
      estate: 'The Riverfront Bamboo Pavilion',
      time: '2 hours ago • Gyro Headset Mode',
      thumb: 'sunset infinity pool',
      progress: '85% EXPLORED'
    },
    {
      title: 'Master Suite & Zen Courtyard',
      estate: 'Ba Đình French Colonial Villa',
      time: 'Yesterday • Laser AR Distance Used',
      thumb: 'master bedroom zen',
      progress: '60% EXPLORED'
    }
  ];

  let currY = 124;
  history.forEach((h, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Card / History ${idx + 1}`,
      width: 345,
      height: 110,
      x: 24,
      y: currY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: 16,
      clipsContent: true
    }, `hist_${idx}_10`);

    b.addStep('CREATE_RECTANGLE', {
      parentId: `$hist_${idx}_10`,
      name: `Thumb / ${h.title}`,
      width: 100,
      height: 110,
      x: 0,
      y: 0,
      imageUrl: h.thumb,
      color: TOKENS.bgSurface
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$hist_${idx}_10`,
      text: h.title,
      fontSize: 14,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 114,
      y: 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$hist_${idx}_10`,
      text: h.estate,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 114,
      y: 38
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$hist_${idx}_10`,
      text: h.time,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textMuted,
      x: 114,
      y: 58
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$hist_${idx}_10`,
      text: h.progress,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentEmerald,
      x: 114,
      y: 84
    });

    b.addStep('CREATE_BUTTON', {
      parentId: `$hist_${idx}_10`,
      name: 'Btn / Resume',
      text: 'Resume ⟳',
      backgroundColor: TOKENS.btnPrimaryBg,
      textColor: TOKENS.btnPrimaryText,
      x: 244,
      y: 72,
      width: 88,
      height: 28,
      cornerRadius: 6
    });

    currY += 126;
  });

  // 3. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Resume Primary',
    text: 'Resume Last Session (Living Atrium) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 560,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_resume_10');

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_10.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
