import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-080 (COM-06) — Multi-Party Legal & Escrow Secure Channel
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_06', 'SCR-080: Legal & Escrow Channel', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ESCROW CHANNEL', 'CONFIDENTIAL MULTI-PARTY DESK', true);

  const sId = '$scr_com_06';

  // 2. Channel Parties Overview Bento
  b.addMetricsBento([
    { label: 'ESCROW CUSTODIAN', value: 'STD CHARTERED', color: TOKENS.accentGold },
    { label: 'LEGAL COUNSEL', value: 'BAKER MCKENZIE', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Multi-Party Chat Log Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Multi-Party Stream',
    width: 345,
    height: 420,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_multiparty_stream_06');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_multiparty_stream_06',
    text: 'Escrow Milestone Release Discussions',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const dialogues = [
    { sender: 'Standard Chartered Escrow Desk', role: 'Custodian', text: '“Confirmed receipt of $72,000 USD Phase 1 retainer deposit into segregated custody account #VN88-888.”', time: '10:02 AM', col: TOKENS.accentGold },
    { sender: 'Dr. Trần Gia Bảo (Baker McKenzie)', role: 'Legal Counsel', text: '“All cadastral land registries for Thảo Điền plot checked against national database. Zero liens or mortgages recorded.”', time: '10:18 AM', col: TOKENS.accentEmerald },
    { sender: 'VTN Architects Financial Office', role: 'Architect Billing', text: '“Milestone 1 invoice countersigned. Ready to disburse according to escrow clause 4.2.”', time: '10:45 AM', col: TOKENS.textPrimary }
  ];

  let dgY = 50;
  dialogues.forEach(d => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_multiparty_stream_06',
      text: `${d.sender} (${d.role}) • ${d.time}`,
      fontSize: 10,
      fontStyle: 'Bold',
      color: d.col,
      x: 20,
      y: dgY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_multiparty_stream_06',
      text: d.text,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textPrimary,
      x: 20,
      y: dgY + 16
    });

    dgY += 76;
  });

  // Escrow Status Verified Badge
  b.addStep('CREATE_FRAME', {
    parentId: '$card_multiparty_stream_06',
    name: 'Badge / Verified Escrow Status',
    width: 305,
    height: 48,
    x: 20,
    y: 340,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 10
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_multiparty_stream_06',
    text: '🔒 Cryptographic Multi-Sig Signature Requirement: 2 of 3 Keys Present',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 32,
    y: 356
  });

  // 4. Action Button: Authorize Release
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Authorize Escrow Release',
    text: 'Provide Client Multi-Sig Approval Key',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 660
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_06.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
