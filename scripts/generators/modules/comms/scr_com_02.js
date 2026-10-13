import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-076 (COM-02) — Real-Time 360 Spatial Markups & Co-Annotation
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_02', 'SCR-076: 360 Spatial Markups', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SPATIAL MARKUP', 'LIVE CO-ANNOTATION WITH VTN STUDIO', true);

  const sId = '$scr_com_02';

  // 2. 360 Viewport Markup Canvas Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / 360 Annotation Canvas',
    width: 345,
    height: 320,
    x: 24,
    y: 124,
    backgroundColor: '#09090B',
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_annot_canvas_02');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_annot_canvas_02',
    name: 'Photo / 360 Atrium Panorama',
    width: 345,
    height: 320,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: '#18181B'
  });

  // Architect Live Cursor Overlay
  b.addStep('CREATE_FRAME', {
    parentId: '$card_annot_canvas_02',
    name: 'Cursor / Architect Pointer',
    width: 140,
    height: 28,
    x: 120,
    y: 90,
    backgroundColor: '#059669EE',
    cornerRadius: 14
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_annot_canvas_02',
    text: '✎ KTS NGHĨA (DRAWING)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 132,
    y: 98
  });

  // Client Pin Overlay
  b.addStep('CREATE_FRAME', {
    parentId: '$card_annot_canvas_02',
    name: 'Pin / Client Revision Request',
    width: 160,
    height: 32,
    x: 80,
    y: 200,
    backgroundColor: '#B45309EE',
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_annot_canvas_02',
    text: '★ PIN #03: EXPAND LOTUS POOL',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 90,
    y: 210
  });

  // 3. Active Annotation Notes List
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Markup Notes',
    width: 345,
    height: 180,
    x: 24,
    y: 456,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_notes_02');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_notes_02',
    text: 'Active Spatial Revisions (2 Pending)',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const notes = [
    { num: 'Pin #01', desc: 'Raise bamboo canopy clearance by +450mm for natural wind channel.', author: 'Architect Vo Trong Nghia' },
    { num: 'Pin #02', desc: 'Add recessed warm LED uplight along Bát Tràng ceramic column base.', author: 'Client Directive' }
  ];

  let ntY = 48;
  notes.forEach(n => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_notes_02',
      text: `${n.num} • ${n.desc}`,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: ntY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_notes_02',
      text: `Annotated by: ${n.author}`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: ntY + 16
    });

    ntY += 48;
  });

  // 4. Action Button: Commit Markups to BIM
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Commit Revisions',
    text: 'Sync Markups to Revit BIM Model',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 646
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_02.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
