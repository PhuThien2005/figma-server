import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-085 (COM-11) — Client Direct Feedback & NPS Score
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_11', 'SCR-085: Client Feedback & NPS', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('CLIENT FEEDBACK', 'EXCELLENCE & SERVICE QUALITY AUDIT', true);

  const sId = '$scr_com_11';

  // 2. Rating Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / NPS Score Hero',
    width: 345,
    height: 180,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_nps_hero_11');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_nps_hero_11',
    text: 'PRIVATE CLIENT EXPERIENCE EVALUATION',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_nps_hero_11',
    text: 'How likely are you to recommend ARKI to your Family Office peers?',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 36
  });

  // NPS 10 Stars Row
  b.addStep('CREATE_FRAME', {
    parentId: '$card_nps_hero_11',
    name: 'Row / NPS Score Selector',
    width: 305,
    height: 48,
    x: 20,
    y: 84,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_nps_hero_11',
    text: '1   2   3   4   5   6   7   8   9   [ 10 ★ ]',
    fontSize: 12,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 32,
    y: 100
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_nps_hero_11',
    text: 'Selected Rating: 10 / 10 • World-Class Service Excellence',
    fontSize: 10,
    fontStyle: 'SemiBold',
    color: TOKENS.accentEmerald,
    x: 20,
    y: 146
  });

  // 3. Detailed Criteria Evaluation Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Criteria Review',
    width: 345,
    height: 310,
    x: 24,
    y: 320,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_crit_rev_11');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_crit_rev_11',
    text: 'Specific Evaluation Criteria',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const criteria = [
    { title: 'Architectural Vision (VTN Studio)', score: '★★★★★ Exceptional', note: 'Bamboo craftsmanship and airflow exceeded expectations.' },
    { title: 'VIP Concierge & Butler Courtesy', score: '★★★★★ Flawless', note: 'Maybach arrival and Lotus Tea ceremony were impeccably executed.' },
    { title: 'Legal & Escrow Transparency', score: '★★★★★ Highly Secure', note: 'Baker McKenzie and Standard Chartered multi-sig provided peace of mind.' }
  ];

  let crY = 50;
  criteria.forEach(c => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_crit_rev_11',
      text: c.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: crY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_crit_rev_11',
      text: `${c.score} • “${c.note}”`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: crY + 16
    });

    crY += 56;
  });

  // 4. Submit Feedback Action Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Submit NPS',
    text: 'Submit Confidential Review to Board of Directors',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 646
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_11.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
