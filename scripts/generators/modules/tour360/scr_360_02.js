import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-030 (360-02) — Spatial Room Switcher & Navigation
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_02', 'SCR-030: Spatial Room Selector', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SPATIAL ROOM SELECTOR', 'SEAMLESS TRANSITION <0.8S • 2D RADAR', true, 'Radar');

  const sId = '$scr_360_02';

  // 2. Active 360 Room Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Panorama / Active Room',
    width: 345,
    height: 230,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'pano_active_container_02');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$pano_active_container_02',
    name: 'Photo / Living Room Atrium',
    width: 345,
    height: 230,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  // Hotspot Portal Pill
  b.addStep('CREATE_FRAME', {
    parentId: '$pano_active_container_02',
    name: 'Hotspot / To Kitchen',
    width: 150,
    height: 32,
    x: 95,
    y: 100,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$pano_active_container_02',
    text: '⊙ To Teak Kitchen →',
    fontSize: 10,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 108,
    y: 110
  });

  // 3. Section Title: SPATIAL ROOM NAVIGATION
  b.addStep('CREATE_TEXT', {
    parentId: sId,
    text: 'AVAILABLE SPATIAL ROOMS (4)',
    fontSize: 11,
    fontStyle: 'SemiBold',
    color: TOKENS.textMuted,
    x: 24,
    y: 374
  });

  // 4. Room Thumbnails List (4 Rooms)
  const rooms = [
    { name: 'Double-Height Living Atrium (7.8m)', active: true, tag: 'NOW VIEWING', img: 'living room atrium' },
    { name: 'Teak Chef Kitchen & Cellar', active: false, tag: '120 SQ.M', img: 'kitchen teak wood' },
    { name: 'Sunset Infinity Lap Pool', active: false, tag: '35M CANTILEVER', img: 'sunset infinity pool' },
    { name: 'Master Zen Suite & Terrace', active: false, tag: 'LEVEL 2', img: 'master bedroom zen' }
  ];

  let rY = 398;
  rooms.forEach((r, idx) => {
    const rRef = `room_card_${idx}_02`;
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Room / ${r.name}`,
      width: 345,
      height: 54,
      x: 24,
      y: rY,
      backgroundColor: r.active ? TOKENS.bgSurface : TOKENS.bgCard,
      cornerRadius: 12
    }, rRef);

    // Mini Thumbnail
    b.addStep('CREATE_RECTANGLE', {
      parentId: `$${rRef}`,
      name: 'Thumb',
      width: 42,
      height: 42,
      x: 6,
      y: 6,
      imageUrl: r.img,
      cornerRadius: 8
    });

    // Label
    b.addStep('CREATE_TEXT', {
      parentId: `$${rRef}`,
      text: r.name,
      fontSize: 12,
      fontStyle: r.active ? 'Bold' : 'Medium',
      color: r.active ? TOKENS.textPrimary : TOKENS.textSecondary,
      x: 58,
      y: 12
    });

    // Tag
    b.addStep('CREATE_TEXT', {
      parentId: `$${rRef}`,
      text: r.tag,
      fontSize: 9,
      fontStyle: 'Bold',
      color: r.active ? TOKENS.accentEmerald : TOKENS.accentGold,
      x: 58,
      y: 30
    });

    // Arrow indicator
    b.addStep('CREATE_TEXT', {
      parentId: `$${rRef}`,
      text: r.active ? '●' : '→',
      fontSize: 12,
      fontStyle: 'Bold',
      color: r.active ? TOKENS.accentEmerald : TOKENS.textMuted,
      x: 320,
      y: 18
    });

    rY += 62;
  });

  // 5. Full-Width CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / VR Mode',
    text: 'Enter Apple Vision Pro VR Mode →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 660,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_vr_mode_02');

  // 6. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_02.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
