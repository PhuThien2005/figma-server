import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-086 (COM-12) — Spatial Screen Share with Architect Cursor
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_12', 'SCR-086: Spatial Screen Share', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SCREEN SHARE', 'LIVE DUAL-CURSOR ARCHITECTURAL VIEW', true);

  const sId = '$scr_com_12';

  // 2. Main Shared Canvas
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Shared Screen Viewport',
    width: 345,
    height: 380,
    x: 24,
    y: 124,
    backgroundColor: '#0F172A',
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_share_viewport_12');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_share_viewport_12',
    name: 'Shared / 3D BIM Model',
    width: 345,
    height: 380,
    x: 0,
    y: 0,
    imageUrl: 'villa thao dien pool',
    color: '#1E293B'
  });

  // Architect Cursor Pointer Overlay
  b.addStep('CREATE_FRAME', {
    parentId: '$card_share_viewport_12',
    name: 'Cursor / Architect Host',
    width: 140,
    height: 28,
    x: 80,
    y: 110,
    backgroundColor: '#059669EE',
    cornerRadius: 14
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_share_viewport_12',
    text: '↖ KTS NGHĨA (HOST)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 92,
    y: 118
  });

  // Client Cursor Pointer Overlay
  b.addStep('CREATE_FRAME', {
    parentId: '$card_share_viewport_12',
    name: 'Cursor / Client Guest',
    width: 130,
    height: 28,
    x: 180,
    y: 220,
    backgroundColor: '#B45309EE',
    cornerRadius: 14
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_share_viewport_12',
    text: '↖ YOU (CLIENT)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 194,
    y: 228
  });

  // 3. Shared Stream Session Specs
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Stream Diagnostics',
    width: 345,
    height: 120,
    x: 24,
    y: 520,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_diagnostics_12');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_diagnostics_12',
    text: '4K Ultra-Low Latency Session Diagnostics',
    fontSize: 13,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_diagnostics_12',
    text: 'Resolution: 3840 × 2160 @ 60 FPS • Latency: 18ms (Fiber)\nSync Protocol: WebRTC P2P Direct Tunnel • Audio: Spatial Dolby Atmos',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 40
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_diagnostics_12',
    text: '● RECORDING ENCRYPTED SESSION TO PRIVATE VAULT',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 20,
    y: 84
  });

  // 4. Action Button: Request Control
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Request Control',
    text: 'Request Host Pointer Control',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 656
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_12.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
