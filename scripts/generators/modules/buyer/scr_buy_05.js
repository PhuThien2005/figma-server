import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-015 (BUY-05) — Architectural Floor Plan & Layout HUD
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_05', 'SCR-015: Floor Plan Blueprint', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('FLOOR PLAN HUD', 'GROUND & LEVEL 1 BLUEPRINT', true, 'CAD 1:100');

  const sId = '$scr_buy_05';

  // 2. Multi-Level Selector Pill Row
  const levels = ['GROUND', 'LEVEL 2', 'ROOFTOP', 'CELLAR'];
  const lGap = 8;
  const lWidth = Math.floor((345 - 3 * lGap) / 4);
  levels.forEach((lvl, idx) => {
    const isAct = idx === 0;
    const lX = 24 + idx * (lWidth + lGap);
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Pill / ${lvl}`,
      width: lWidth,
      height: 36,
      x: lX,
      y: 124,
      backgroundColor: isAct ? TOKENS.btnPrimaryBg : TOKENS.bgCard,
      cornerRadius: 10
    }, `pill_lvl_${idx}_05`);

    b.addStep('CREATE_TEXT', {
      parentId: `$pill_lvl_${idx}_05`,
      text: lvl,
      fontSize: 10,
      fontStyle: 'Bold',
      color: isAct ? '#FFFFFF' : TOKENS.textSecondary,
      x: Math.floor(lWidth / 2 - 18),
      y: 11
    });
  });

  // 3. Technical Blueprint Graphic Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Blueprint / Technical Diagram',
    width: 345,
    height: 380,
    x: 24,
    y: 172,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'blueprint_card_05');

  // Blueprint gridlines simulation
  b.addStep('CREATE_FRAME', {
    parentId: '$blueprint_card_05',
    name: 'Room / Living Atrium',
    width: 200,
    height: 160,
    x: 20,
    y: 20,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$blueprint_card_05',
    text: 'LIVING ROOM ATRIUM\n18.4m × 12.2m (224.5 sq.m)\nDouble-Height Ceiling (7.8m)',
    fontSize: 11,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 36,
    y: 70
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$blueprint_card_05',
    name: 'Room / Teak Chef Kitchen',
    width: 95,
    height: 160,
    x: 230,
    y: 20,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$blueprint_card_05',
    text: 'TEAK KITCHEN\n8.5m × 6.0m\n51.0 sq.m',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 240,
    y: 70
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$blueprint_card_05',
    name: 'Room / Infinity Lap Pool',
    width: 305,
    height: 160,
    x: 20,
    y: 195,
    backgroundColor: '#09090B0D',
    cornerRadius: 12
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$blueprint_card_05',
    text: 'SUNSET INFINITY LAP POOL (35.0m × 6.5m)\nDirect Saigon Riverfront Cantilever',
    fontSize: 11,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 36,
    y: 260
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Launch 360 From Blueprint',
    text: 'Explore in 360 Spatial Immersion →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 574,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_launch_360_05');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_05.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
