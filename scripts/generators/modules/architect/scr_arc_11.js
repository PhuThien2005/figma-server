import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-057 (ARC-11) — Principal Architect Video Pitch & Vision
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_11', 'SCR-057: Principal Architect Video Pitch', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('STUDIO VISION', 'DIRECT PITCH BY PRINCIPAL', true);

  const sId = '$scr_arc_11';

  // 2. Video Player Frame
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / 4K Video Player',
    width: 345,
    height: 220,
    x: 24,
    y: 124,
    backgroundColor: '#000000',
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_video_player_11');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_video_player_11',
    name: 'Video / Architect Still',
    width: 345,
    height: 220,
    x: 0,
    y: 0,
    imageUrl: 'vo trong nghia',
    color: '#18181B'
  });

  // Play Button Glass Ring
  b.addStep('CREATE_FRAME', {
    parentId: '$card_video_player_11',
    name: 'Btn / Play 4K Video',
    width: 56,
    height: 56,
    x: 144,
    y: 82,
    backgroundColor: '#FFFFFFCC',
    cornerRadius: 28
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_video_player_11',
    text: '▶',
    fontSize: 20,
    fontStyle: 'Bold',
    color: '#09090B',
    x: 164,
    y: 98
  });

  // Duration Pill
  b.addStep('CREATE_FRAME', {
    parentId: '$card_video_player_11',
    name: 'Badge / Duration',
    width: 60,
    height: 22,
    x: 270,
    y: 184,
    backgroundColor: '#000000AA',
    cornerRadius: 11
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_video_player_11',
    text: '04:18',
    fontSize: 10,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 282,
    y: 188
  });

  // 3. Vision Statement Summary Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Vision Transcript',
    width: 345,
    height: 260,
    x: 24,
    y: 360,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_transcript_11');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_transcript_11',
    text: '“A Sanctuary Returning to Earth”',
    fontSize: 15,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_transcript_11',
    text: 'KTS Võ Trọng Nghĩa speaks on the spiritual dialogue between engineered bamboo structures and tropical micro-climates:\n\n“Our objective for this Saigon river estate is not to impose heavy concrete upon the landscape, but to create breathing structures where natural river breezes cool the living pavilions without artificial chill.”',
    fontSize: 12,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 48
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_transcript_11',
    text: 'Recorded at VTN Atelier, District 2, Ho Chi Minh City',
    fontSize: 10,
    fontStyle: 'SemiBold',
    color: TOKENS.accentGold,
    x: 20,
    y: 220
  });

  // 4. Action Button: Book Private Design Consultation
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Book Consultation',
    text: 'Schedule Private 1-on-1 Consultation',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_11.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
