import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-082 (COM-08) — Secure Document Sharing Vault & Watermarking
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_08', 'SCR-082: Secure Document Vault', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('DOCUMENT VAULT', 'CRYPTOGRAPHIC WATERMARKED REPOSITORY', true);

  const sId = '$scr_com_08';

  // 2. Security Protocol Banner Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Vault Security Status',
    width: 345,
    height: 100,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_vault_status_08');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vault_status_08',
    text: 'DYNAMIC CLIENT WATERMARK ACTIVE',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vault_status_08',
    text: 'Encrypted Documents Protected by DRM',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 36
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vault_status_08',
    text: 'All PDFs are stamped with recipient ID #ARKI-LOTUS-0089 and GPS coordinates.',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 64
  });

  // 3. Document Repository List Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Vault Files',
    width: 345,
    height: 400,
    x: 24,
    y: 240,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_vault_files_08');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vault_files_08',
    text: 'Classified Architectural & Title Dossiers',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const files = [
    { name: '1. Sổ Hồng Pink Book Cadastral Extract (4K Scan)', size: '28.4 MB', tag: 'OFFICIAL TITLE', date: 'Certified Yesterday' },
    { name: '2. VTN Bamboo Cantilever Structural Engineering LOD-400', size: '142.0 MB', tag: 'IFC BIM MODEL', date: 'Updated Today' },
    { name: '3. Standard Chartered Bank Escrow Tripartite Agreement', size: '12.8 MB', tag: 'LEGAL CONTRACT', date: 'Signed 12 Oct' },
    { name: '4. Environmental Airflow & River Flood Analysis (100-Yr)', size: '45.1 MB', tag: 'HYDROLOGY', date: 'Certified 10 Oct' }
  ];

  let fY = 50;
  files.forEach(f => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_vault_files_08',
      text: f.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: fY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_vault_files_08',
      text: `${f.size} • ${f.date} • ${f.tag}`,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.accentGold,
      x: 20,
      y: fY + 16
    });

    b.addStep('CREATE_BUTTON', {
      parentId: '$card_vault_files_08',
      name: `Btn / Open ${f.tag}`,
      text: 'View Securely',
      backgroundColor: TOKENS.bgSurface,
      textColor: TOKENS.textPrimary,
      x: 20,
      y: fY + 36,
      width: 120,
      height: 28
    });

    fY += 80;
  });

  // 4. Upload Encrypted Document Action
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Upload File',
    text: 'Deposit New Secure File to Vault',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 650
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_08.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
