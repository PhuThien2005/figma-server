import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-110 (SET-10) — 24/7 Global Concierge Helpdesk & Direct Line
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_10', 'SCR-110: Concierge Helpdesk', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('HELPDESK', 'GLOBAL CONCIERGE & SUPPORT DIRECTORY', true);

  const sId = '$scr_set_10';

  // 2. Helpdesk Hero Bento
  b.addMetricsBento([
    { label: 'GLOBAL DESK', value: '24/7 ACTIVE', color: TOKENS.accentGold },
    { label: 'RESPONSE TIME', value: '< 20 SECONDS', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Support Channels Directory Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Support Channels',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_support_channels_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_support_channels_10',
    text: 'Priority Contact Channels',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const channels = [
    { title: 'Executive Concierge Desk (Vietnam HQ)', contact: '+84 (0) 28 8888 7777', note: 'Dedicated to Thảo Điền, Tây Hồ & Coastal Villas' },
    { title: 'European Private Client Desk (Zurich)', contact: '+41 44 888 1200', note: 'Swiss banking, escrow and international trust support' },
    { title: 'Architectural Technical Support', contact: 'bim-support@arki.vn', note: 'Revit IFC models, VR USDZ spatial file queries' },
    { title: 'Encrypted Signal Hotline', contact: '+84 (0) 90 999 8888', note: 'End-to-end encrypted messaging with Managing Partner' }
  ];

  let chY = 48;
  channels.forEach(ch => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_support_channels_10',
      text: ch.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: chY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_support_channels_10',
      text: `${ch.contact} • ${ch.note}`,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.accentGold,
      x: 20,
      y: chY + 16
    });

    chY += 56;
  });

  // Direct Line Quick Call Pill
  b.addStep('CREATE_FRAME', {
    parentId: '$card_support_channels_10',
    name: 'Pill / Instant Connect',
    width: 305,
    height: 44,
    x: 20,
    y: 310,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 10
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_support_channels_10',
    text: '📞 Tap below to place priority audio call to your Chief Concierge',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 28,
    y: 324
  });

  // 4. Action Button: Place Call
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Place Hotline Call',
    text: 'Call Private Concierge Desk Now',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_10.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
