import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-092 (TXN-04) — Multi-Sig Banking Wire Authorization
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_04', 'SCR-092: Multi-Sig Wire Transfer', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('BANKING TRANSFER', 'MULTI-SIGNATURE SETTLEMENT DESK', true);

  const sId = '$scr_txn_04';

  // 2. Transfer Amount Hero Bento
  b.addMetricsBento([
    { label: 'DISBURSEMENT AMOUNT', value: '$2,500,000 USD', color: TOKENS.accentGold },
    { label: 'BANK ROUTING', value: 'VIETCOMBANK VIP', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Multi-Sig Approval Quorum Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Multi-Sig Quorum',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_multisig_quorum_04');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_multisig_quorum_04',
    text: 'Required Signatures (2 of 3 Needed)',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const signers = [
    { name: 'Key 1: Buyer Family Office Trustee', status: '✓ SIGNED', time: '14 Oct 10:14 ICT', col: TOKENS.accentEmerald, desc: 'Hardware Token YubiKey 5Ci confirmed' },
    { name: 'Key 2: Escrow Custodian (Std Chartered)', status: '✓ SIGNED', time: '14 Oct 10:45 ICT', col: TOKENS.accentEmerald, desc: 'Compliance & AML Clearance passed' },
    { name: 'Key 3: Baker McKenzie Legal Trustee', status: '○ PENDING YOUR KEY', time: 'Awaiting Final Tap', col: TOKENS.accentGold, desc: 'Ready for client biometric signature' }
  ];

  let sgY = 50;
  signers.forEach(s => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_multisig_quorum_04',
      text: s.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: sgY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_multisig_quorum_04',
      text: `${s.status} • ${s.time}`,
      fontSize: 10,
      fontStyle: 'Bold',
      color: s.col,
      x: 20,
      y: sgY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_multisig_quorum_04',
      text: s.desc,
      fontSize: 9,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: sgY + 32
    });

    sgY += 68;
  });

  // Security Note Card
  b.addStep('CREATE_FRAME', {
    parentId: '$card_multisig_quorum_04',
    name: 'Box / SWIFT GPI Tracking',
    width: 305,
    height: 50,
    x: 20,
    y: 310,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_multisig_quorum_04',
    text: 'SWIFT gpi Tracking UETR: 88f2-39c0-11eb-a830 • Real-Time Settlement',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 28,
    y: 326
  });

  // 4. Action Button: Sign Final Key
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Provide Final Signature',
    text: 'Authorize Wire with Hardware Key',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_04.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
