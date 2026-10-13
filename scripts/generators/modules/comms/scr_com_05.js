import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-079 (COM-05) — Concierge Audio Voice Note Dispatch
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_05', 'SCR-079: Concierge Voice Notes', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('VOICE MEMOS', 'ENCRYPTED AUDIO ARCHIVE', true);

  const sId = '$scr_com_05';

  // 2. Active Audio Player Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Active Voice Memo',
    width: 345,
    height: 180,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_audio_player_05');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_audio_player_05',
    text: 'VOICE DISPATCH FROM CHIEF CONCIERGE',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_audio_player_05',
    text: 'Briefing: River Berth Logistics & High Tide Arrival',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 36
  });

  // Audio Waveform Visual Simulation
  b.addStep('CREATE_FRAME', {
    parentId: '$card_audio_player_05',
    name: 'Track / Audio Waveform',
    width: 305,
    height: 48,
    x: 20,
    y: 72,
    backgroundColor: TOKENS.bgSurface,
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_audio_player_05',
    text: '▶ 01:24 / 03:45  ||||||||||||||||||||||||||||||||||||||||||||',
    fontSize: 11,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 36,
    y: 88
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_audio_player_05',
    text: 'Recorded via Encrypted Butler Comms • 48 kHz FLAC Lossless',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 140
  });

  // 3. Audio Notes List Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Voice Memos List',
    width: 345,
    height: 310,
    x: 24,
    y: 320,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_memos_list_05');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_memos_list_05',
    text: 'Recent Voice Dispatches',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const memos = [
    { title: 'KTS Nghĩa: Acoustic Bamboo Lattice Test', dur: '02:18', date: 'Today 08:30 AM', sender: 'VTN Studio' },
    { title: 'Concierge Thảo My: Maybach Chauffeur Route SGN', dur: '01:05', date: 'Yesterday 16:45', sender: 'Private Desk' },
    { title: 'Dr. Trần (Legal): Land Title Notarization Confirmation', dur: '04:12', date: 'Yesterday 10:20', sender: 'Legal Council' }
  ];

  let mmY = 50;
  memos.forEach(m => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_memos_list_05',
      text: m.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: mmY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_memos_list_05',
      text: `Duration: ${m.dur} • ${m.date} • ${m.sender}`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: mmY + 16
    });

    b.addStep('CREATE_BUTTON', {
      parentId: '$card_memos_list_05',
      name: `Btn / Play ${m.title}`,
      text: 'Play Note',
      backgroundColor: TOKENS.bgSurface,
      textColor: TOKENS.textPrimary,
      x: 20,
      y: mmY + 36,
      width: 100,
      height: 28
    });

    mmY += 76;
  });

  // 4. Record New Voice Note Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Record Voice',
    text: 'Hold to Record Encrypted Voice Memo',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 646
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_05.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
