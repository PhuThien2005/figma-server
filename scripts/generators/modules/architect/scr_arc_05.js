import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-051 (ARC-05) — Commission Master Architect Brief
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_05', 'SCR-051: Commission Architect Brief', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('COMMISSION BRIEF', 'BESPOKE RESIDENTIAL MASTERPIECE', true);

  const sId = '$scr_arc_05';

  // 2. Client Brief Stepper Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Brief Form',
    width: 345,
    height: 380,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_brief_form_05');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_brief_form_05',
    text: 'Client Architectural Commission',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  const fields = [
    { label: 'Selected Studio Principal', val: 'KTS Võ Trọng Nghĩa (VTN Architects)' },
    { label: 'Target Site Location', val: 'Thảo Điền / An Phú Riverfront (Saigon)' },
    { label: 'Land Plot Area', val: '1,200 sq.m – 2,500 sq.m (Private Waterfront)' },
    { label: 'Architectural Typology', val: 'Biophilic Bamboo & Cantilever Pool Pavilion' },
    { label: 'Estimated Construction Budget', val: '$6,000,000 – $10,000,000 USD' }
  ];

  let fY = 56;
  fields.forEach((fd, i) => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_brief_form_05',
      text: fd.label.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.textMuted,
      x: 20,
      y: fY
    });

    b.addStep('CREATE_FRAME', {
      parentId: '$card_brief_form_05',
      name: `Input / ${fd.label}`,
      width: 305,
      height: 36,
      x: 20,
      y: fY + 16,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 8
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_brief_form_05',
      text: fd.val,
      fontSize: 11,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 32,
      y: fY + 26
    });

    fY += 62;
  });

  // 3. Confidential NDA Guarantee Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Confidentiality',
    width: 345,
    height: 60,
    x: 24,
    y: 520,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  }, 'card_confidential_05');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_confidential_05',
    text: '🔒 Confidentiality: Encrypted under Swiss Private Client NDA',
    fontSize: 11,
    fontStyle: 'SemiBold',
    color: TOKENS.textSecondary,
    x: 18,
    y: 22
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Submit Commission',
    text: 'Submit Commission Brief to Studio Principal →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 600,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_submit_brief_05');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_05.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
