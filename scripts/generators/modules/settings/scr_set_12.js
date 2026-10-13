import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-112 (SET-12) — Logout & Secure Session Purge
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_12', 'SCR-112: Secure Session Purge', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SESSION PURGE', 'CRYPTOGRAPHIC LOGOUT & MEMORY WIPE', true);

  const sId = '$scr_set_12';

  // 2. Warning & Confirmation Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Secure Logout Dialog',
    width: 345,
    height: 280,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_logout_dialog_12');

  b.addStep('CREATE_FRAME', {
    parentId: '$card_logout_dialog_12',
    name: 'Icon Box / Lock',
    width: 56,
    height: 56,
    x: 144,
    y: 24,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 28
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_logout_dialog_12',
    text: '🔒',
    fontSize: 24,
    fontStyle: 'Regular',
    color: TOKENS.textPrimary,
    x: 160,
    y: 36
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_logout_dialog_12',
    text: 'Purge Decrypted Session Keys?',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 60,
    y: 96
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_logout_dialog_12',
    text: 'Signing out will securely overwrite all cached architectural BIM blueprints, Sổ Hồng scans, and offline encryption session keys in Secure Enclave.\n\nYou will require your physical FIDO2 Hardware Key or Master Seed to authenticate upon next return.',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 126
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_logout_dialog_12',
    text: 'Active Member: Lord Alexander Sterling (#ARKI-LOTUS-0089)',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 220
  });

  // 3. Purge Action Buttons
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Confirm Secure Purge',
    text: 'Purge Session & Sign Out Securely',
    backgroundColor: '#EF4444',
    textColor: '#FFFFFF',
    x: 24,
    y: 430
  });

  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Cancel Return',
    text: 'Cancel and Return to Portfolio',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 24,
    y: 494
  });

  // 4. Client Security Guarantee Note
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Security Guarantee',
    width: 345,
    height: 80,
    x: 24,
    y: 570,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_sec_guarantee_12');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sec_guarantee_12',
    text: 'Zero trace left on device storage. Memory zeroization follows DoD 5220.22-M military wipe specifications.',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textMuted,
    x: 20,
    y: 24
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_12.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
