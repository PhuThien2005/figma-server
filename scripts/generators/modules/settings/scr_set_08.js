import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-108 (SET-08) — Family Office & Secondary Trustee Access
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_08', 'SCR-108: Family Office Access', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('FAMILY OFFICE', 'DELEGATED TRUSTEES & PERMISSIONS', true);

  const sId = '$scr_set_08';

  // 2. Family Office Entity Hero Bento
  b.addMetricsBento([
    { label: 'AUTHORIZED TRUSTEES', value: '3 MEMBERS', color: TOKENS.accentGold },
    { label: 'GOVERNANCE MANDATE', value: 'JOINT SIGNOFF', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Delegated Trustees Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Trustee Delegates',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_trustees_list_08');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_trustees_list_08',
    text: 'Authorized Portfolio Trustees',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const trustees = [
    { name: '1. Eleanor Sterling (Co-Trustee & Spouse)', role: 'Full View & Architectural Design Approval', status: 'Active (Direct Key)' },
    { name: '2. Julian Vance, LL.M (Family Office Counsel)', role: 'Legal Sổ Hồng & Escrow Wire Co-Signer', status: 'Active (Multi-Sig)' },
    { name: '3. Marcus Sterling (Next-Gen Beneficiary)', role: '360 Virtual Tour & Architectural Library View Only', status: 'Restricted Access' }
  ];

  let trY = 50;
  trustees.forEach(t => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_trustees_list_08',
      text: t.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: trY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_trustees_list_08',
      text: t.role,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: trY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_trustees_list_08',
      text: `Status: ${t.status}`,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentEmerald,
      x: 20,
      y: trY + 34
    });

    trY += 68;
  });

  // Action Button inside card
  b.addStep('CREATE_BUTTON', {
    parentId: '$card_trustees_list_08',
    name: 'Btn / Add Trustee',
    text: '+ Invite Secondary Trustee via Secure Token',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 20,
    y: 310,
    width: 305,
    height: 44
  });

  // 4. Action Button: Audit Access Logs
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Audit Logs',
    text: 'Download Trustee Access Audit Log (PDF)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_08.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
