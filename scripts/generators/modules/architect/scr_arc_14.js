import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-060 (ARC-14) — Master Architectural Contract Signing Ceremony
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_14', 'SCR-060: Contract Signing Ceremony', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('CONTRACT CEREMONY', 'MASTER ARCHITECTURAL AGREEMENT', true);

  const sId = '$scr_arc_14';

  // 2. Contract Header Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Contract Summary',
    width: 345,
    height: 140,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_contract_sum_14');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_contract_sum_14',
    text: 'DEED OF ARCHITECTURAL COMMISSION',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_contract_sum_14',
    text: 'VTN Architects × ARKI Private Client',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_contract_sum_14',
    text: 'Project: Thảo Điền Riverfront Biophilic Villa (LOD-400)\nGoverning Law: International Chamber of Commerce (ICC) Paris\nEscrow Custodian: Standard Chartered Bank Vietnam',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  // 3. Digital Signature Pad / Seal Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Digital Signature Box',
    width: 345,
    height: 220,
    x: 24,
    y: 280,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_signature_box_14');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_signature_box_14',
    text: 'Cryptographic Signature & Seal',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  // Signature canvas line
  b.addStep('CREATE_FRAME', {
    parentId: '$card_signature_box_14',
    name: 'Canvas / Signature Line',
    width: 305,
    height: 100,
    x: 20,
    y: 50,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_signature_box_14',
    text: 'Vo Trong Nghia',
    fontSize: 22,
    fontStyle: 'Regular',
    color: TOKENS.accentGold,
    x: 40,
    y: 80
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_signature_box_14',
    text: '✓ Signed by KTS Võ Trọng Nghĩa (Principal)',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 40,
    y: 116
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_signature_box_14',
    text: 'Client Signature: Pending Authentication via Hardware Token',
    fontSize: 10,
    fontStyle: 'SemiBold',
    color: TOKENS.textSecondary,
    x: 20,
    y: 170
  });

  // 4. Action Buttons
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Sign Contract',
    text: 'Execute Cryptographic Signature',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 520
  });

  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / View Contract PDF',
    text: 'Download Master Legal Contract (PDF)',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 24,
    y: 580
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_14.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
