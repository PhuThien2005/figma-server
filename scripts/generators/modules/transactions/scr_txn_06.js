import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-094 (TXN-06) — Notary Public Scheduling
 * Module: TRANSACTIONS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_txn_06', 'SCR-094: Notary Public Scheduling', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('NOTARIZATION', 'STATE NOTARY PUBLIC APPOINTMENT', true);

  const sId = '$scr_txn_06';

  // 2. Appointment Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Notary Chamber',
    width: 345,
    height: 160,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_notary_chamber_06');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_notary_chamber_06',
    text: 'SELECTED STATE NOTARY OFFICE',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_notary_chamber_06',
    text: 'Phòng Công Chứng Số 1 TPHCM (Private VIP Room)',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_notary_chamber_06',
    text: 'Address: 97 Pasteur, District 1, Ho Chi Minh City\nState Notary Public: Công chứng viên Nguyễn Văn Hùng\nAppointment Time: 15 October 2026 • 10:00 AM ICT',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 66
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_notary_chamber_06',
    name: 'Pill / Mobile Service Option',
    width: 305,
    height: 28,
    x: 20,
    y: 120,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_notary_chamber_06',
    text: '🏛 In-Villa Private Mobile Notarization Requested',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 32,
    y: 127
  });

  // 3. Dossier Checklist Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Dossier Prep',
    width: 345,
    height: 310,
    x: 24,
    y: 300,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_dossier_prep_06');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_dossier_prep_06',
    text: 'Mandatory Originals for Signing Table',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const docs = [
    { name: 'Original Sổ Hồng (Land Use Rights Certificate)', note: 'Brought by Escrow Officer in secure courier lockbox' },
    { name: 'Foreign Investor Passport / SPV Incorporation Deeds', note: 'Notarized consular apostille translation verified' },
    { name: 'Master SPA Contract Copies (06 Bound Volumes)', note: 'Red ribbon binding with embossed seal' },
    { name: 'State Treasury Stamp Duty Payment Confirmation', note: 'Advance deposit cleared with District 1 tax bureau' }
  ];

  let dcY = 50;
  docs.forEach(d => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_dossier_prep_06',
      text: d.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: dcY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_dossier_prep_06',
      text: d.note,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: dcY + 16
    });

    dcY += 56;
  });

  // 4. Action Button: Confirm Appointment
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Confirm Notary',
    text: 'Confirm Private Notary Slot & Maybach Convoy',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_txn_06.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
