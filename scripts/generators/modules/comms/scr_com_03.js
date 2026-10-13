import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-077 (COM-03) — Private Video Consultation Room (Spatial Audio)
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_03', 'SCR-077: Video Consultation Room', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('VIDEO ROOM', '4K SPATIAL ARCHITECTURE HUD', true);

  const sId = '$scr_com_03';

  // 2. Main Full-Screen Video Canvas Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Video Stream Frame',
    width: 345,
    height: 440,
    x: 24,
    y: 124,
    backgroundColor: '#09090B',
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_video_stream_03');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_video_stream_03',
    name: 'Video / Architect Feed',
    width: 345,
    height: 440,
    x: 0,
    y: 0,
    imageUrl: 'vo trong nghia',
    color: '#18181B'
  });

  // Top Video Badges
  b.addStep('CREATE_FRAME', {
    parentId: '$card_video_stream_03',
    name: 'Badge / Encryption Lock',
    width: 130,
    height: 28,
    x: 16,
    y: 16,
    backgroundColor: '#000000AA',
    cornerRadius: 14
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_video_stream_03',
    text: '🔒 256-BIT AES SPATIAL',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 26,
    y: 24
  });

  // Client Picture-in-Picture (PiP) Window
  b.addStep('CREATE_FRAME', {
    parentId: '$card_video_stream_03',
    name: 'PiP / Client Camera View',
    width: 90,
    height: 120,
    x: 235,
    y: 16,
    backgroundColor: '#1E293B',
    cornerRadius: 12,
    clipsContent: true
  }, 'pip_client_03');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$pip_client_03',
    name: 'Photo / Self Feed',
    width: 90,
    height: 120,
    x: 0,
    y: 0,
    imageUrl: 'broker avatar',
    color: '#334155'
  });

  // Subtitle / Architect Audio Transcript HUD
  b.addStep('CREATE_FRAME', {
    parentId: '$card_video_stream_03',
    name: 'HUD / Audio Subtitle',
    width: 313,
    height: 48,
    x: 16,
    y: 376,
    backgroundColor: '#000000CC',
    cornerRadius: 10
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_video_stream_03',
    text: 'KTS Nghĩa: “Here is the view from the master bedroom facing the sunset river...”',
    fontSize: 10,
    fontStyle: 'Regular',
    color: '#FFFFFF',
    x: 26,
    y: 390
  });

  // 3. Audio & Video Control Dock
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Bar / Call Controls Dock',
    width: 345,
    height: 64,
    x: 24,
    y: 580,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 32
  }, 'dock_call_ctrl_03');

  const buttons = [
    { label: '🎙 Mute', x: 24, bg: TOKENS.bgSurface, col: TOKENS.textPrimary },
    { label: '📹 Cam', x: 100, bg: TOKENS.bgSurface, col: TOKENS.textPrimary },
    { label: '📐 360 BIM', x: 176, bg: TOKENS.accentGold, col: '#FFFFFF' },
    { label: '✕ End', x: 268, bg: '#EF4444', col: '#FFFFFF' }
  ];

  buttons.forEach(btn => {
    b.addStep('CREATE_FRAME', {
      parentId: '$dock_call_ctrl_03',
      name: `Btn / ${btn.label}`,
      width: 52,
      height: 44,
      x: btn.x,
      y: 10,
      backgroundColor: btn.bg,
      cornerRadius: 22
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$dock_call_ctrl_03',
      text: btn.label,
      fontSize: 10,
      fontStyle: 'Bold',
      color: btn.col,
      x: btn.x + 8,
      y: 24
    });
  });

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_03.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
