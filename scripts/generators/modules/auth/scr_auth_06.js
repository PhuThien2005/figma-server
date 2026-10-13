import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-006 — Private Investor Key Entry / Passcode
 * Module: WELCOME / CURATION (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_auth_06', 'SCR-006: Investor Passcode', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('INVESTOR VAULT', 'DISCREET SECURITY PASSCODE', true);

  // 2. Title & Instructions
  b.addStep('CREATE_TEXT', {
    parentId: '$scr_auth_06',
    text: 'Enter 4-Digit Private Key',
    fontSize: 20,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 24,
    y: 130
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$scr_auth_06',
    text: 'Encrypted hardware key for confidential transactions',
    fontSize: 12,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 24,
    y: 160
  });

  // 3. Pin Dots (4 dots, 3 filled, 1 empty)
  const dotX = [120, 160, 200, 240];
  dotX.forEach((dx, i) => {
    const isFilled = i < 3;
    b.addStep('CREATE_FRAME', {
      parentId: '$scr_auth_06',
      name: `Dot / Pin ${i + 1}`,
      width: 16,
      height: 16,
      x: dx,
      y: 200,
      backgroundColor: isFilled ? TOKENS.textPrimary : TOKENS.bgSurface,
      cornerRadius: 8
    });
  });

  // 4. Luxury Numeric Keypad (Glass buttons, 3 cols x 4 rows)
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', '0', '⌫'];
  const startX = 54;
  const startY = 260;
  const keyW = 80;
  const keyH = 64;
  const gapX = 22;
  const gapY = 16;

  keys.forEach((k, idx) => {
    if (k === ' ') return;
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const kX = startX + col * (keyW + gapX);
    const kY = startY + row * (keyH + gapY);

    b.addStep('CREATE_FRAME', {
      parentId: '$scr_auth_06',
      name: `Key / ${k}`,
      width: keyW,
      height: keyH,
      x: kX,
      y: kY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: 16
    }, `key_${idx}_06`);

    b.addStep('CREATE_TEXT', {
      parentId: `$key_${idx}_06`,
      text: k,
      fontSize: 22,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: Math.floor(keyW / 2 - 6),
      y: 18
    });
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_auth_06.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
