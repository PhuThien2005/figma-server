import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-027 (BUY-17) — Notification Center & Private VIP Releases
 * Module: DISCOVER / BUYER (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_buy_17', 'SCR-027: VIP Notification Center', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('NOTIFICATIONS', 'CONFIDENTIAL DROPS & PRIVATE RELEASES', true, 'Clear');

  const sId = '$scr_buy_17';

  // 2. Notification Cards
  const notifs = [
    {
      title: 'Off-Market Release: Ba Đình French Villa',
      desc: 'Restored 1928 French colonial estate with private courtyard garden. Confidential viewing slots now open.',
      time: '12m ago • EXCLUSIVE DROP',
      unread: true,
      tag: 'NEW LISTING'
    },
    {
      title: 'Escrow Terms Updated: Thảo Điền Pavilion',
      desc: 'Vietcombank Priority has approved syndicated escrow facilities with 3.85% fixed financing rate.',
      time: '2h ago • CAPITAL UPDATE',
      unread: true,
      tag: 'ESCROW'
    },
    {
      title: 'Private Studio Monograph: KTS Võ Trọng Nghĩa',
      desc: 'Invitation to the private architectural preview of new biophilic bamboo pavilion designs in Saigon.',
      time: 'Yesterday • MASTER ARCHITECT',
      unread: false,
      tag: 'EVENT'
    }
  ];

  let currY = 124;
  notifs.forEach((nt, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Notif / ${nt.title}`,
      width: 345,
      height: 120,
      x: 24,
      y: currY,
      backgroundColor: nt.unread ? TOKENS.bgCard : TOKENS.bgSurface,
      cornerRadius: 16
    }, `notif_${idx}_17`);

    b.addStep('CREATE_TEXT', {
      parentId: `$notif_${idx}_17`,
      text: nt.title,
      fontSize: 13,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 18,
      y: 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$notif_${idx}_17`,
      text: nt.desc,
      fontSize: 11,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 18,
      y: 38
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$notif_${idx}_17`,
      text: nt.time,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: nt.unread ? TOKENS.accentEmerald : TOKENS.textMuted,
      x: 18,
      y: 92
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$notif_${idx}_17`,
      text: nt.tag,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 260,
      y: 18
    });

    currY += 134;
  });

  // 3. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Notification Settings',
    text: 'Configure VIP Notification Channels →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 560,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_settings_17');

  // 4. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_buy_17.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
