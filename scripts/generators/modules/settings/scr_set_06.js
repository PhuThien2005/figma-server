import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-106 (SET-06) — Notification Filters (Auction Bids, Direct Calls)
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_06', 'SCR-106: Notification Filters', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('NOTIFICATIONS', 'VIP PRIORITY DISPATCH ALERTS', true);

  const sId = '$scr_set_06';

  // 2. Alert Channels Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Notification Rules',
    width: 345,
    height: 480,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_notif_rules_06');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_notif_rules_06',
    text: 'Priority Alert Filters',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const alerts = [
    { title: 'New Off-Market Heritage Villa Releases', desc: 'Alert only when properties meet >1,000m² riverfront criteria.', toggle: '● ACTIVE' },
    { title: 'Direct Calls from Principal Architects', desc: 'Bypass Do-Not-Disturb for KTS Võ Trọng Nghĩa & Hoàng Thúc Hào.', toggle: '● ACTIVE' },
    { title: 'Escrow Milestone Disbursement Requests', desc: 'Instant push & SMS for any sum exceeding $50,000 USD.', toggle: '● ACTIVE' },
    { title: 'Aviation & Helicopter Tarmac Updates', desc: 'Live flight departures and tail number changes.', toggle: '● ACTIVE' },
    { title: 'General Marketing & Open House Digest', desc: 'Promotional brochures and public announcements.', toggle: '○ MUTED' }
  ];

  let alY = 48;
  alerts.forEach(a => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_notif_rules_06',
      text: a.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: alY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_notif_rules_06',
      text: a.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: alY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_notif_rules_06',
      text: a.toggle,
      fontSize: 9,
      fontStyle: 'Bold',
      color: a.toggle.includes('ACTIVE') ? TOKENS.accentEmerald : TOKENS.textMuted,
      x: 20,
      y: alY + 36
    });

    alY += 70;
  });

  // Delivery Channel Pill
  b.addStep('CREATE_FRAME', {
    parentId: '$card_notif_rules_06',
    name: 'Pill / Delivery Channels',
    width: 305,
    height: 44,
    x: 20,
    y: 410,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 10
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_notif_rules_06',
    text: 'Channel: Apple Push Notification Service (APNs) + Encrypted Signal Bot',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 28,
    y: 424
  });

  // 3. Action Button: Save
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Save Notifications',
    text: 'Save Notification Preferences',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_06.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
