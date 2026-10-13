import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-067 (AGT-07) — VIP Client Preferences & Lifestyle Questionnaire
 * Module: CONCIERGE (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_agt_07', 'SCR-067: Lifestyle Questionnaire', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PREFERENCES', 'BESPOKE RESIDENTIAL CRITERIA', true);

  const sId = '$scr_agt_07';

  // 2. Lifestyle Curation Glass Form Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Lifestyle Questionnaire',
    width: 345,
    height: 480,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_quest_form_07');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_quest_form_07',
    text: 'Client Living Profile & Needs',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  const prefs = [
    { label: 'Architectural Style Preference', val: 'Tropical Brutalism & Vietnamese Engineered Bamboo' },
    { label: 'Waterfront Docking Requirement', val: 'Deep-water private pontoon (minimum 80ft yacht berth)' },
    { label: 'Private Aviation Needs', val: 'Direct helicopter transfers from Tân Sơn Nhất (SGN)' },
    { label: 'Art & Sculpture Space', val: 'Museum-grade gallery with climate & UV controls' },
    { label: 'Security & Privacy Level', val: 'Swiss-standard biometric perimeter & bulletproof glazing' },
    { label: 'Staff Quarters Capacity', val: 'Separate independent quarters for 4 live-in personnel' }
  ];

  let pY = 56;
  prefs.forEach((p, i) => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_quest_form_07',
      text: p.label.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.textMuted,
      x: 20,
      y: pY
    });

    b.addStep('CREATE_FRAME', {
      parentId: '$card_quest_form_07',
      name: `Box / ${p.label}`,
      width: 305,
      height: 38,
      x: 20,
      y: pY + 16,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 8
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_quest_form_07',
      text: p.val,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 32,
      y: pY + 28
    });

    pY += 68;
  });

  // 3. Action Button: Save & Update Concierge Profile
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Save Preferences',
    text: 'Save Preferences to Private Dossier',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 620
  });

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(2);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_agt_07.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
