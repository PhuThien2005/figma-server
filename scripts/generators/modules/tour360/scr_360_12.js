import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-040 (360-12) — Live Guided Tour with Private Broker
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_12', 'SCR-040: Live Guided Broker Tour', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('LIVE GUIDED TOUR', 'PRIVATE BROKER CO-BROWSING SESSION', true, 'End Call');

  const sId = '$scr_360_12';

  // 2. Full-Bleed 360 Viewport Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Live Guided Viewport',
    width: 345,
    height: 440,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'guided_viewport_12');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$guided_viewport_12',
    name: '360 Atrium Canvas',
    width: 345,
    height: 440,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  // Broker Picture-in-Picture (PiP) Window (Top-Right of Viewport)
  b.addStep('CREATE_FRAME', {
    parentId: '$guided_viewport_12',
    name: 'PiP / Broker Video Call',
    width: 110,
    height: 140,
    x: 220,
    y: 16,
    backgroundColor: '#09090BE6',
    cornerRadius: 16,
    clipsContent: true
  }, 'pip_broker_12');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$pip_broker_12',
    name: 'Portrait / Broker',
    width: 110,
    height: 140,
    x: 0,
    y: 0,
    imageUrl: 'broker male',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$pip_broker_12',
    text: 'Trần Minh Quân',
    fontSize: 10,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 10,
    y: 118
  });

  // Co-Browsing Status Pill (Top-Left)
  b.addStep('CREATE_FRAME', {
    parentId: '$guided_viewport_12',
    name: 'Pill / Sync Status',
    width: 150,
    height: 32,
    x: 16,
    y: 16,
    backgroundColor: '#09090BD9',
    cornerRadius: 16
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$guided_viewport_12',
    text: '● FOLLOWING BROKER POV',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 28,
    y: 26
  });

  // 3. Audio & Co-Browsing Controls Card (Frosted Glass)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Session Controls',
    width: 345,
    height: 100,
    x: 24,
    y: 580,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'controls_card_12');

  b.addStep('CREATE_TEXT', {
    parentId: '$controls_card_12',
    text: 'Encrypted HD Audio & Laser Pointer Active',
    fontSize: 13,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$controls_card_12',
    text: 'Tap "Take Control" to explore independently or request specific room.',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 36
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$controls_card_12',
    name: 'Btn / Take Control',
    text: 'Take Control ✋',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 18,
    y: 58,
    width: 140,
    height: 32,
    cornerRadius: 8
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$controls_card_12',
    name: 'Btn / Mute',
    text: 'Mute Mic 🎤',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 168,
    y: 58,
    width: 140,
    height: 32,
    cornerRadius: 8
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Schedule Next',
    text: 'Schedule In-Person Site Inspection (Maybach) →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 694,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_schedule_site_12');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_12.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
