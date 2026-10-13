import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-099 (TXN-11) — Cryptographic Proof of Ownership & Smart Contract Ledger
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_11', 'SCR-099: Cryptographic Ownership Ledger', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ON-CHAIN LEDGER', 'IMMUTABLE DIGITAL PROOF OF DEED', true);

  const sId = '$scr_txn_11';

  // 2. On-Chain Deed NFT Hero Bento
  b.addMetricsBento([
    { label: 'BLOCKCHAIN NETWORK', value: 'ETHEREUM MAINNET', color: TOKENS.accentGold },
    { label: 'SMART CONTRACT', value: 'ERC-721 DEED CERT', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Cryptographic Token & Cadastral Hash Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Crypto Deed Cert',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_crypto_cert_11');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_crypto_cert_11',
    text: 'Cryptographic Title Token #0089',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const hashes = [
    { label: 'Contract Address', val: '0x3a7e9140BcFeE290bC181920Da18A98C7B19842F' },
    { label: 'Token ID', val: '89 (Thảo Điền Riverfront Biophilic Sanctuary)' },
    { label: 'Cadastral Sổ Hồng Hash', val: 'sha256: 9e4f21d...38b0a1f49e0c71' },
    { label: 'BIM Model Version Hash', val: 'ipfs://bafybeic...78d9vtnbiophiliclod400' },
    { label: 'Owner Public Key', val: '0xClientFamilyOffice...8889' }
  ];

  let hY = 48;
  hashes.forEach(h => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_crypto_cert_11',
      text: h.label.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: hY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_crypto_cert_11',
      text: h.val,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 20,
      y: hY + 14
    });

    hY += 46;
  });

  // Proof Card
  b.addStep('CREATE_FRAME', {
    parentId: '$card_crypto_cert_11',
    name: 'Box / ZK Proof',
    width: 305,
    height: 48,
    x: 20,
    y: 310,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_crypto_cert_11',
    text: '🔒 Zero-Knowledge Proof: Ownership verifiable without public identity leak',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 28,
    y: 326
  });

  // 4. Action Button: View on Etherscan
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / View Etherscan',
    text: 'View Certified Transaction on Block Explorer',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_11.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
