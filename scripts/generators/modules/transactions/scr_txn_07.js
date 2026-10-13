import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-095 (TXN-07) — Property Handover Checklist & Defect Inspection
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_07', 'SCR-095: Handover Inspection', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('HANDOVER AUDIT', 'TECHNICAL DEFECT INSPECTION (SNAGGING)', true);

  const sId = '$scr_txn_07';

  // 2. Inspection Progress Hero Bento
  b.addMetricsBento([
    { label: 'ITEMS INSPECTED', value: '118 OF 120 CLEAR', color: TOKENS.accentGold },
    { label: 'DEFECT RATE', value: '0.1% MINOR', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Handover Engineering Systems Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Engineering Snagging',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_snagging_07');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_snagging_07',
    text: 'Key Infrastructure Verification',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const audits = [
    { name: 'Bamboo Structural Joints & Stainless Pins', status: '✓ PASSED (Zero Play / Tight)', col: TOKENS.accentEmerald },
    { name: 'Micro-Climate Convection Thermal Imaging', status: '✓ PASSED (32°C outside / 25°C inside)', col: TOKENS.accentEmerald },
    { name: 'Infinity Lotus Pool Hydraulic Circulation', status: '✓ PASSED (Ozone purification 100%)', col: TOKENS.accentEmerald },
    { name: 'Schneider KNX Home Automation & Shading', status: '✓ PASSED (Sub-50ms response)', col: TOKENS.accentEmerald },
    { name: 'Terrace Teak Sealant & Rain Drainage Flow', status: '● RE-COATING SCHEDULED (24h)', col: TOKENS.accentGold }
  ];

  let adY = 50;
  audits.forEach(a => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_snagging_07',
      text: a.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: adY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_snagging_07',
      text: a.status,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: a.col,
      x: 20,
      y: adY + 16
    });

    adY += 56;
  });

  // 4. Action Button: Accept Handover
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Sign Handover Protocol',
    text: 'Sign Formal Handover Protocol (Biên Bản Bàn Giao)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_07.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
