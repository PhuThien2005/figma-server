import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-081 (COM-07) — Scheduled Architecture Review Conference Call
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_07', 'SCR-081: Architecture Conference', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('CONFERENCE DESK', 'SCHEDULED DESIGN REVIEW SESSIONS', true);

  const sId = '$scr_com_07';

  // 2. Upcoming Session Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Upcoming Conference',
    width: 345,
    height: 190,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_up_conf_07');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_up_conf_07',
    text: 'NEXT SESSION: TODAY AT 15:00 ICT',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_up_conf_07',
    text: 'Thảo Điền Riverfront: Facade Shading Simulation',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 36
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_up_conf_07',
    text: 'Attendees: KTS Võ Trọng Nghĩa, Lighting Designer (Tokyo), Client Representative\nPlatform: ARKI 4K Spatial Video Room with Apple Vision Pro Sync',
    fontSize: 10,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 64
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$card_up_conf_07',
    name: 'Btn / Join Conference',
    text: 'Join Video Room Now',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 20,
    y: 126,
    width: 305,
    height: 44
  });

  // 3. Conference Agenda & Calendar List
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Agenda List',
    width: 345,
    height: 310,
    x: 24,
    y: 330,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_agenda_list_07');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_agenda_list_07',
    text: 'Upcoming Design Milestones Review',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const agendas = [
    { date: '16 Oct 2026 • 10:00 AM', title: 'Acoustic Teak Joinery & Interior Millwork Review', host: 'Interior Architecture Desk' },
    { date: '20 Oct 2026 • 14:00 PM', title: 'Landscape Lotus Pond Ecosystem & Filtration Signoff', host: 'Bio-Ecological Engineer' },
    { date: '24 Oct 2026 • 16:30 PM', title: 'Structural Bamboo Fire-Retardant Certification Audit', host: 'RIBA Independent Inspector' }
  ];

  let agY = 50;
  agendas.forEach(a => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_agenda_list_07',
      text: a.date,
      fontSize: 10,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: agY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_agenda_list_07',
      text: a.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: agY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_agenda_list_07',
      text: `Lead Presenter: ${a.host}`,
      fontSize: 9,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: agY + 34
    });

    agY += 72;
  });

  // 4. Action Button: Book New Review Session
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Book Session',
    text: 'Schedule Special Technical Session',
    backgroundColor: TOKENS.bgSurface,
    textColor: TOKENS.textPrimary,
    x: 24,
    y: 650
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_07.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
