import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-005 — VIP Member Sign In / Concierge Access
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_05', 'SCR-005: VIP Concierge Access', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('VIP CONCIERGE', 'CONFIDENTIAL CLIENT ACCESS', true);

  // 2. VIP Concierge Host Card in Silk Áo Dài
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_05',
    name: 'Card / VIP Host Concierge',
    width: 345,
    height: 140,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_host_05');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_host_05',
    name: 'Portrait / Concierge in Ao Dai',
    width: 100,
    height: 140,
    x: 0,
    y: 0,
    imageUrl: 'vietnamese lady ao dai',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_host_05',
    text: 'Phạm Thu Hằng',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 116,
    y: 20
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_host_05',
    text: 'Head of Private Concierge\nDiscreet & Encrypted Advisory\nVietnam & Global Ultra-HNW',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 116,
    y: 44
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_host_05',
    text: '● CONCIERGE ONLINE',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 116,
    y: 104
  });

  // 3. Frosted Glass Input Card
  b.addStep('CREATE_FRAME', {
    parentId: '$scr_auth_05',
    name: 'Glass Card / Member Input',
    width: 345,
    height: 220,
    x: 24,
    y: 284,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_input_05');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_input_05',
    text: 'Client Identification or Email',
    fontSize: 12,
    fontStyle: 'SemiBold',
    color: TOKENS.textSecondary,
    x: 20,
    y: 20
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_input_05',
    name: 'Input / Field 1',
    width: 305,
    height: 48,
    x: 20,
    y: 44,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 10
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$card_input_05',
    text: 'investor@sanctuary-arki.com',
    fontSize: 14,
    fontStyle: 'Regular',
    color: TOKENS.textPrimary,
    x: 36,
    y: 58
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_input_05',
    text: 'Private Invitation Code',
    fontSize: 12,
    fontStyle: 'SemiBold',
    color: TOKENS.textSecondary,
    x: 20,
    y: 110
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_input_05',
    name: 'Input / Field 2',
    width: 305,
    height: 48,
    x: 20,
    y: 134,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 10
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$card_input_05',
    text: '••••  ••••  ••••  ARKI-VN',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textMuted,
    x: 36,
    y: 148
  });

  // 4. Primary CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: '$scr_auth_05',
    name: 'CTA / Authenticate',
    text: 'Enter Private Sanctuary →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 524,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_next_scr_auth_05');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_05.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
