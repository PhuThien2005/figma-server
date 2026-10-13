import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-038 (360-10) — Apple Vision Pro & Spatial Headset Link
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_10', 'SCR-038: VR Spatial Headset Link', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('VR SPATIAL LINK', 'APPLE VISION PRO & QUEST 3 IMMERSION', true, 'AirPlay');

  const sId = '$scr_360_10';

  // 2. Dual Stereoscopic Lens Viewport Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Stereoscopic Lenses',
    width: 345,
    height: 240,
    x: 24,
    y: 124,
    backgroundColor: '#000000',
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'stereo_container_10');

  // Left Eye Lens
  b.addStep('CREATE_FRAME', {
    parentId: '$stereo_container_10',
    name: 'Lens / Left Eye',
    width: 160,
    height: 216,
    x: 8,
    y: 12,
    backgroundColor: '#1C1C1E',
    cornerRadius: 24,
    clipsContent: true
  }, 'left_lens_10');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$left_lens_10',
    name: 'Left Eye Canvas',
    width: 160,
    height: 216,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$left_lens_10',
    text: 'LEFT EYE (8K)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 12,
    y: 14
  });

  // Right Eye Lens
  b.addStep('CREATE_FRAME', {
    parentId: '$stereo_container_10',
    name: 'Lens / Right Eye',
    width: 160,
    height: 216,
    x: 177,
    y: 12,
    backgroundColor: '#1C1C1E',
    cornerRadius: 24,
    clipsContent: true
  }, 'right_lens_10');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$right_lens_10',
    name: 'Right Eye Canvas',
    width: 160,
    height: 216,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$right_lens_10',
    text: 'RIGHT EYE (8K)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 12,
    y: 14
  });

  // 3. Headset Connection & Spatial Audio Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Headset Pairing',
    width: 345,
    height: 170,
    x: 24,
    y: 380,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_pairing_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_pairing_10',
    text: 'Connected Headset: Apple Vision Pro',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_pairing_10',
    text: '• Native visionOS 2.0 Spatial Persona Ready\n• Dolby Atmos Binaural Room Impulse Response: Active\n• Render Stream: 90 fps • 8K Dual-Eye Resolution',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 44
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_pairing_10',
    text: '● STEREO 8K STREAM READY (LATENCY 8MS)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 20,
    y: 124
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Launch Stream',
    text: 'Stream 8K Spatial Tour to Vision Pro →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 570,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_stream_10');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_10.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
