import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-083 (COM-09) — In-App Live Translation & Transcription (EN/VI)
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_09', 'SCR-083: Live Translation EN/VI', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('TRANSLATION', 'BILINGUAL ARCHITECTURAL INTERPRETER', true);

  const sId = '$scr_com_09';

  // 2. Active Mode Selector Bento
  b.addMetricsBento([
    { label: 'INPUT LANGUAGE', value: 'ENGLISH (EN)', color: TOKENS.accentGold },
    { label: 'OUTPUT TARGET', value: 'TIẾNG VIỆT (VI)', color: TOKENS.accentEmerald }
  ], 124);

  // 3. Dual Language Dialogue Translation Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Live Transcription Feed',
    width: 345,
    height: 420,
    x: 24,
    y: 230,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_trans_feed_09');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_trans_feed_09',
    text: 'Real-Time Conversational Transcription',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const translations = [
    {
      speaker: 'English Client Voice',
      original: '“Can we increase the cantilever overhang to provide deeper shade during the Saigon monsoon season?”',
      translated: '“Chúng ta có thể tăng thêm phần nhô mái console để tạo bóng râm sâu hơn trong mùa mưa Sài Gòn không?”'
    },
    {
      speaker: 'Vietnamese Architect Voice (KTS Nghĩa)',
      original: '“Được chứ. Chúng tôi sẽ gia cố thêm cáp dự ứng lực ngầm trong kết cấu tre để giữ độ võng dưới 5mm.”',
      translated: '“Certainly. We will reinforce subsurface post-tensioned cables within the bamboo structure to keep deflection below 5mm.”'
    }
  ];

  let trY = 50;
  translations.forEach((t, i) => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_trans_feed_09',
      text: t.speaker.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.accentGold,
      x: 20,
      y: trY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_trans_feed_09',
      text: t.original,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: trY + 16
    });

    b.addStep('CREATE_FRAME', {
      parentId: '$card_trans_feed_09',
      name: `Box / Translated ${i}`,
      width: 305,
      height: 54,
      x: 20,
      y: trY + 48,
      backgroundColor: TOKENS.bgSurface,
      cornerRadius: 8
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_trans_feed_09',
      text: `➔ ${t.translated}`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 30,
      y: trY + 58
    });

    trY += 120;
  });

  // 4. Action Button: Live Microphone Translation Toggle
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Toggle Mic',
    text: '🎙 Microphone Active (Translating Simultaneously)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 660
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_09.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
