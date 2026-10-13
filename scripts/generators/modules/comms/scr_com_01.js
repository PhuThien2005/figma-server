import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-075 (COM-01) — Encrypted Client-Principal Architect Thread
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_01', 'SCR-075: Encrypted Architect Thread', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('ARCHITECT THREAD', 'END-TO-END ENCRYPTED (SIGNAL PROTOCOL)', true);

  const sId = '$scr_com_01';

  // 2. Chat Partner Info Banner
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Chat Partner Header',
    width: 345,
    height: 70,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_partner_01');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_partner_01',
    name: 'Avatar / Vo Trong Nghia',
    width: 44,
    height: 44,
    x: 16,
    y: 13,
    imageUrl: 'vo trong nghia',
    color: TOKENS.bgSurface,
    cornerRadius: 22
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_partner_01',
    text: 'KTS Võ Trọng Nghĩa (Principal)',
    fontSize: 13,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 70,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_partner_01',
    text: '● Active Now • Thảo Điền Riverfront Villa Revision',
    fontSize: 10,
    fontStyle: 'SemiBold',
    color: TOKENS.accentEmerald,
    x: 70,
    y: 36
  });

  // 3. Conversation Thread Messages Area
  // Message 1: Architect (Incoming)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Bubble / Architect Msg 1',
    width: 280,
    height: 90,
    x: 24,
    y: 210,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'bubble_arch_01');

  b.addStep('CREATE_TEXT', {
    parentId: '$bubble_arch_01',
    text: '“Greetings. We have finalized the wind-tunnel simulation for the cantilevered bamboo atrium. Natural airflow velocity reaches 1.4 m/s at noon.”',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textPrimary,
    x: 14,
    y: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$bubble_arch_01',
    text: '10:14 AM • VTN Atelier',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textMuted,
    x: 14,
    y: 68
  });

  // Message 2: Attached Drawing Card (Incoming)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Attached Sketch',
    width: 280,
    height: 140,
    x: 24,
    y: 312,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16,
    clipsContent: true
  }, 'card_sketch_01');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_sketch_01',
    name: 'Photo / Bamboo Sketch',
    width: 280,
    height: 95,
    x: 0,
    y: 0,
    imageUrl: 'vtn bamboo compound',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sketch_01',
    text: 'SKETCH-04_CANTILEVER_DETAIL.DWG',
    fontSize: 10,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 14,
    y: 106
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sketch_01',
    text: 'LOD-400 Bamboo Node Pin Connection (14.2 MB)',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 14,
    y: 122
  });

  // Message 3: Client (Outgoing)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Bubble / Client Reply',
    width: 260,
    height: 80,
    x: 109,
    y: 466,
    backgroundColor: '#09090B',
    cornerRadius: 16
  }, 'bubble_client_01');

  b.addStep('CREATE_TEXT', {
    parentId: '$bubble_client_01',
    text: '“Approved. Please ensure the Bát Tràng celadon ceramic panels complement the dark bamboo tones. Let’s review on site.”',
    fontSize: 11,
    fontStyle: 'Regular',
    color: '#FFFFFF',
    x: 14,
    y: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$bubble_client_01',
    text: '10:22 AM • Read ✓✓',
    fontSize: 9,
    fontStyle: 'Regular',
    color: '#A1A1AA',
    x: 180,
    y: 58
  });

  // 4. Message Input Bar
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Bar / Input Dock',
    width: 345,
    height: 52,
    x: 24,
    y: 560,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 26
  }, 'input_bar_01');

  b.addStep('CREATE_TEXT', {
    parentId: '$input_bar_01',
    text: 'Type encrypted message or attach BIM note...',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textMuted,
    x: 20,
    y: 18
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$input_bar_01',
    name: 'Btn / Send',
    width: 36,
    height: 36,
    x: 298,
    y: 8,
    backgroundColor: TOKENS.btnPrimaryBg,
    cornerRadius: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$input_bar_01',
    text: '↑',
    fontSize: 16,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 312,
    y: 16
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_01.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
