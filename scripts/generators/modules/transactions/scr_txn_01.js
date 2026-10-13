import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-089 (TXN-01) — Letter of Intent (LOI) Digital Signing
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_01', 'SCR-089: LOI Digital Signing', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('LETTER OF INTENT', 'BINDING OFFER & EXCLUSIVITY DEED', true);

  const sId = '$scr_txn_01';

  // 2. Offer Summary Bento
  b.addMetricsBento([
    { label: 'OFFER CONSIDERATION', value: '$8,500,000 USD', color: TOKENS.accentGold },
    { label: 'EARNEST DEPOSIT', value: '$500,000 USD', color: TOKENS.accentEmerald }
  ], 124);

  // 3. LOI Key Terms Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / LOI Terms',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_loi_terms_01');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_loi_terms_01',
    text: 'Key Terms of Private Placement',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const terms = [
    { title: 'Asset Identification', desc: 'Thảo Điền Riverfront Biophilic Villa (Plot No. 18B/TD)' },
    { title: 'Exclusivity Period', desc: '45 Business Days for full technical & title due diligence' },
    { title: 'Escrow Depository', desc: 'Standard Chartered Bank Vietnam (Segregated Trust Account)' },
    { title: 'Architectural Continuity', desc: 'Conditioned upon VTN Architects lead execution of LOD-400' },
    { title: 'Governing Law', desc: 'Laws of Vietnam with ICC Arbitration (Singapore seat)' }
  ];

  let tmY = 48;
  terms.forEach(t => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_loi_terms_01',
      text: t.title.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: tmY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_loi_terms_01',
      text: t.desc,
      fontSize: 11,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 20,
      y: tmY + 14
    });

    tmY += 46;
  });

  // Digital Signature Seal
  b.addStep('CREATE_FRAME', {
    parentId: '$card_loi_terms_01',
    name: 'Seal / Cryptographic Auth',
    width: 305,
    height: 52,
    x: 20,
    y: 310,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_loi_terms_01',
    text: '🔒 Hardware Token Verification Ready (FIDO2 / Secure Enclave)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 28,
    y: 326
  });

  // 4. Action Button: Sign LOI
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Sign LOI',
    text: 'Execute Digital LOI & Lock Exclusivity',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_01.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
