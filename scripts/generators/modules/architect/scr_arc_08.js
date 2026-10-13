import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-054 (ARC-08) — Site Topography & Feng Shui Alignment Analysis
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_08', 'SCR-054: Topography & Feng Shui', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('GEOMANCY & TERRAIN', 'ORIENTED BY MASTER ARCHITECTS', true);

  const sId = '$scr_arc_08';

  // 2. Topographic Elevation & River Curve Map
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / River Curve Map',
    width: 345,
    height: 220,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_map_fengshui_08');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_map_fengshui_08',
    name: 'Map / Saigon River Curve',
    width: 345,
    height: 220,
    x: 0,
    y: 0,
    imageUrl: 'map saigon river',
    color: TOKENS.bgSurface
  });

  // Compass Rose / Luopan Geomancy Ring Indicator
  b.addStep('CREATE_FRAME', {
    parentId: '$card_map_fengshui_08',
    name: 'Geomancy Compass / Water Embrace',
    width: 140,
    height: 32,
    x: 16,
    y: 16,
    backgroundColor: '#09090BEE',
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_map_fengshui_08',
    text: '☯ WATER EMBRACE (THỦY TỤ)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 24,
    y: 26
  });

  // 3. Feng Shui Architectural Harmonies
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Geomancy Metrics',
    width: 345,
    height: 260,
    x: 24,
    y: 360,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_metrics_08');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_metrics_08',
    text: 'Spatial Energetics & Orientation',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  const energetics = [
    { title: 'Riverfront Facing: South-East (Tọa Bắc Hướng Nam)', status: 'Optimal Wind Flow', score: '99/100', color: TOKENS.accentEmerald },
    { title: 'Morning Solar Incidence: Solar Gain Blocked 82%', status: 'Bamboo Overhang', score: 'Passive Cool', color: TOKENS.accentEmerald },
    { title: 'Ground Elevation: +3.80m above Saigon Datum', status: '100-Yr Flood Proof', score: 'Certified', color: TOKENS.accentGold }
  ];

  let eY = 56;
  energetics.forEach(item => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_metrics_08',
      text: item.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: eY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_metrics_08',
      text: `${item.status} • Rating: ${item.score}`,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: item.color,
      x: 20,
      y: eY + 16
    });

    eY += 56;
  });

  // 4. Request Master Feng Shui Audit Report
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Request Audit',
    text: 'Download Full Geomancy Dossier (PDF)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_08.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
