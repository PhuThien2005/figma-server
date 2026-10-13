import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-107 (SET-07) — Hardware Token & Security Key Management
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_07', 'SCR-107: Hardware Security Keys', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SECURITY TOKENS', 'FIDO2 & HARDWARE AUTHENTICATION', true);

  const sId = '$scr_set_07';

  // 2. Hardware Enclave Hero Bento
  b.addMetricsBento([
    { label: 'AUTHENTICATION STANDARD', value: 'FIDO2 / WEBAUTHN', color: TOKENS.accentGold },
    { label: 'REGISTERED TOKENS', value: '2 ACTIVE KEYS', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Registered Hardware Tokens Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Registered Keys',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_hardware_keys_07');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_hardware_keys_07',
    text: 'Active Physical Security Tokens',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const keys = [
    { name: '1. Primary Key: YubiKey 5Ci (NFC / Lightning)', serial: 'SN: 18492041 • Registered in Zurich', role: 'Full Signing Authority (Wire Transfers > $1M)', col: TOKENS.accentEmerald },
    { name: '2. Backup Key: Apple iPhone 16 Pro Secure Enclave', serial: 'Hardware Enclave • Face ID Bound', role: 'Daily App Unlock & Messaging Auth', col: TOKENS.accentEmerald },
    { name: '3. Trustee Key: Family Office General Counsel', serial: 'YubiKey 5C NFC • Singapore Desk', role: 'Multi-Sig Escrow 2nd Key', col: TOKENS.accentGold }
  ];

  let kY = 48;
  keys.forEach(k => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_hardware_keys_07',
      text: k.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: kY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_hardware_keys_07',
      text: `${k.serial} • ${k.role}`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: kY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_hardware_keys_07',
      text: '● VERIFIED & PAIRED',
      fontSize: 9,
      fontStyle: 'Bold',
      color: k.col,
      x: 20,
      y: kY + 36
    });

    kY += 68;
  });

  // Pair New Key Info
  b.addStep('CREATE_FRAME', {
    parentId: '$card_hardware_keys_07',
    name: 'Box / NFC Tap',
    width: 305,
    height: 44,
    x: 20,
    y: 310,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_hardware_keys_07',
    text: 'Tap new NFC FIDO2 key against top of iPhone to pair backup',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 28,
    y: 324
  });

  // 4. Action Button: Pair New Hardware Key
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Pair Key',
    text: 'Pair New Physical Hardware Key',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_07.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
