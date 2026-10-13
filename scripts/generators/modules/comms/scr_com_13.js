import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-087 (COM-13) — Archive of Encrypted Communications
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_03_arch', 'SCR-087: Comms Archive', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('COMMS ARCHIVE', 'IMMUTABLE CRYPTOGRAPHIC AUDIT LOG', true);

  const sId = '$scr_com_03_arch';

  // 2. Encryption Certificate Hero Bento
  b.addMetricsBento([
    { label: 'RECORDED SESSIONS', value: '38 ARCHIVES', color: TOKENS.accentGold },
    { label: 'INTEGRITY HASH', value: 'SHA-256 VERIFIED', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Communications Log Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Historical Archive List',
    width: 345,
    height: 420,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_arch_list_13');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_arch_list_13',
    text: 'Historical Project Transcripts & Recordings',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const archives = [
    { title: 'Session #04: Video Conference with KTS Nghĩa', date: '14 Oct 2026 • 45 mins', hash: '0x8f2a...c891', tag: '4K VIDEO + BIM' },
    { title: 'Session #03: Escrow Tripartite Milestone Call', date: '12 Oct 2026 • 32 mins', hash: '0x3c71...9a12', tag: 'LEGAL AUDIO' },
    { title: 'Session #02: West Lake Tea Ceremony Reception', date: '08 Oct 2026 • 1h 15m', hash: '0x1b90...4f55', tag: 'TRANSCRIPT' },
    { title: 'Session #01: Initial Commission Briefing & NDA', date: '01 Oct 2026 • 28 mins', hash: '0xaa44...71b0', tag: 'SIGNED AUDIT' }
  ];

  let arY = 50;
  archives.forEach(a => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_arch_list_13',
      text: a.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: arY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_arch_list_13',
      text: `${a.date} • ${a.tag}`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: arY + 16
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_arch_list_13',
      text: `Immutable Hash: ${a.hash}`,
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: arY + 34
    });

    b.addStep('CREATE_BUTTON', {
      parentId: '$card_arch_list_13',
      name: `Btn / Verify ${a.hash}`,
      text: 'Verify Hash',
      backgroundColor: TOKENS.bgSurface,
      textColor: TOKENS.textPrimary,
      x: 210,
      y: arY + 12,
      width: 105,
      height: 28
    });

    arY += 76;
  });

  // 4. Action Button: Export Comprehensive Archive
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Export Audit Zip',
    text: 'Export Certified Archive (Encrypted ZIP)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 666
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_13.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
