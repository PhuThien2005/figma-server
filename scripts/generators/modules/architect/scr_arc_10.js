import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-056 (ARC-10) — Concept Design Phase Milestone Timeline
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_10', 'SCR-056: Concept Milestone Timeline', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('PROJECT ROADMAP', 'ARCHITECTURAL DESIGN MILESTONES', true);

  const sId = '$scr_arc_10';

  // 2. Timeline Progress Overview Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Roadmap Progress',
    width: 345,
    height: 90,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_roadmap_prog_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_roadmap_prog_10',
    text: 'PHASE 02: SCHEMATIC BIM MODELLING',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_roadmap_prog_10',
    text: 'Progress: 45% Completed (On Schedule)',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 36
  });

  // Progress Bar Track
  b.addStep('CREATE_FRAME', {
    parentId: '$card_roadmap_prog_10',
    name: 'Track / Progress Bar',
    width: 305,
    height: 6,
    x: 20,
    y: 64,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 3
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_roadmap_prog_10',
    name: 'Fill / Progress Active',
    width: 137,
    height: 6,
    x: 20,
    y: 64,
    backgroundColor: TOKENS.accentEmerald,
    cornerRadius: 3
  });

  // 3. Four Core Phases List
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Phase Milestones',
    width: 345,
    height: 380,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_phases_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_phases_10',
    text: 'Standard Architectural Deliverables',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const phases = [
    { num: '01', title: 'Topographic Survey & Site Feng Shui', duration: '3 Weeks', status: '✓ APPROVED', color: TOKENS.accentEmerald },
    { num: '02', title: 'Schematic Massing & Biophilic Ventilation', duration: '5 Weeks', status: '● IN PROGRESS', color: TOKENS.accentGold },
    { num: '03', title: '1:50 Timber Model & LOD-400 BIM Detail', duration: '6 Weeks', status: '○ PENDING', color: TOKENS.textMuted },
    { num: '04', title: 'Permit Dossier & Contractor Tendering', duration: '4 Weeks', status: '○ PENDING', color: TOKENS.textMuted }
  ];

  let phY = 52;
  phases.forEach(ph => {
    b.addStep('CREATE_FRAME', {
      parentId: '$card_phases_10',
      name: `Badge / Phase ${ph.num}`,
      width: 28,
      height: 28,
      x: 20,
      y: phY,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 14
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_phases_10',
      text: ph.num,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 28,
      y: phY + 6
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_phases_10',
      text: ph.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 58,
      y: phY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_phases_10',
      text: `Duration: ${ph.duration} • Status: ${ph.status}`,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: ph.color,
      x: 58,
      y: phY + 18
    });

    phY += 76;
  });

  // 4. Action Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / View Design Book',
    text: 'View Schematic Design Package (PDF)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_10.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
