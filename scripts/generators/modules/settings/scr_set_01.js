import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-101 (SET-01) — Client Profile & Global Citizenship Status
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_01', 'SCR-101: Client Profile', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PROFILE', 'CLIENT & CITIZENSHIP DOSSIER', true);

  const sId = '$scr_set_01';

  // 2. Client Profile Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Client Profile Summary',
    width: 345,
    height: 160,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_profile_sum_01');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_profile_sum_01',
    name: 'Avatar / Client Photo',
    width: 80,
    height: 160,
    x: 0,
    y: 0,
    imageUrl: 'broker avatar',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_profile_sum_01',
    text: 'Lord Alexander Sterling',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 96,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_profile_sum_01',
    text: 'Sterling Family Trust (Singapore / Zurich)\nMember Tier: Lotus Circle (#0089)\nPrimary Residence: Thảo Điền Riverfront Villa',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 96,
    y: 42
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_profile_sum_01',
    name: 'Pill / Verified Status',
    width: 220,
    height: 24,
    x: 96,
    y: 116,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_profile_sum_01',
    text: '✓ DTA Treaty Qualified Investor',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 108,
    y: 122
  });

  // 3. Citizenship & Legal Entity Specifications Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Citizenship Details',
    width: 345,
    height: 320,
    x: 24,
    y: 300,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_citizenship_details_01');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_citizenship_details_01',
    text: 'Legal Structure & Jurisdiction',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const details = [
    { label: 'Primary Holding Vehicle', val: 'Sterling Heritage Vietnam SPV Ltd (BVI)' },
    { label: 'Tax Residency Status', val: 'Singapore Family Office (Section 13O Scheme)' },
    { label: 'Vietnam Visa & Entry Exemption', val: '5-Year Golden Investor Residence Exemption (ĐT1)' },
    { label: 'Private Bank Custody', val: 'Standard Chartered Private Bank Singapore' }
  ];

  let dtY = 48;
  details.forEach(d => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_citizenship_details_01',
      text: d.label.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: dtY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_citizenship_details_01',
      text: d.val,
      fontSize: 11,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 20,
      y: dtY + 14
    });

    dtY += 46;
  });

  // 4. Action Button: Update Entity Documents
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Update Dossier',
    text: 'Update Family Office Structuring Dossier',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_01.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
