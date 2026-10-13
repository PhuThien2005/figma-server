import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-091 (TXN-03) — Due Diligence Legal Title Verification (Sổ Đỏ / Sổ Hồng)
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_03', 'SCR-091: Legal Title Verification', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('TITLE DILIGENCE', 'CERTIFICATE OF LAND USE RIGHTS (SỔ HỒNG)', true);

  const sId = '$scr_txn_03';

  // 2. Certificate Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Pink Book Status',
    width: 345,
    height: 150,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_pink_book_03');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_pink_book_03',
    text: 'NATIONAL CADASTRAL REGISTRY: VERIFIED 100%',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_pink_book_03',
    text: 'Sổ Hồng Certificate No. CS-88912/TPHCM',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_pink_book_03',
    text: 'Cadastral Plot: No. 18B • Map Sheet No. 42 (Thảo Điền, Thu Duc City)\nResidential Land Use: Long-Term Freehold (Đất Ở Đô Thị Lâu Dài)\nBuilding Area: 1,420 m² on 1,850 m² Land Parcel',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  // 3. Due Diligence Checklist Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Diligence Checklist',
    width: 345,
    height: 330,
    x: 24,
    y: 290,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_checklist_03');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_checklist_03',
    text: 'Legal Title Verification Audit',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const checks = [
    { title: 'Zero Encumbrance or Bank Mortgages', status: '✓ Verified at Land Registration Office', col: TOKENS.accentEmerald },
    { title: 'Master Planning & Zoning Clearance', status: '✓ Certified 100% Villa Residential Zone', col: TOKENS.accentEmerald },
    { title: 'Saigon River Corridor Setback Compliance', status: '✓ Conforms to 30m Ecological Buffer Law', col: TOKENS.accentEmerald },
    { title: 'Inheritance & Spousal Rights Clearance', status: '✓ Unconditional Power of Sale Notarized', col: TOKENS.accentEmerald }
  ];

  let ckY = 50;
  checks.forEach(c => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_checklist_03',
      text: c.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: ckY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_checklist_03',
      text: c.status,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: c.col,
      x: 20,
      y: ckY + 16
    });

    ckY += 56;
  });

  // 4. Action Button: Download Certified Diligence Report
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Download Diligence',
    text: 'Download Baker McKenzie Title Audit (PDF)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_03.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
