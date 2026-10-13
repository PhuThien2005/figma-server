import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-053 (ARC-07) — BIM 3D Structural Section & Detail Inspector
 * Module: ARCHITECT (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_arc_07', 'SCR-053: BIM Structural Section', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('BIM INSPECTOR', 'REVIT 2026 LOD-400 STRUCTURAL CUT', true);

  const sId = '$scr_arc_07';

  // 2. BIM Viewport Interactive Canvas Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / BIM Viewport Canvas',
    width: 345,
    height: 280,
    x: 24,
    y: 124,
    backgroundColor: '#1E293B',
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_bim_canvas_07');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_bim_canvas_07',
    name: 'Visual / BIM Cutaway Model',
    width: 345,
    height: 280,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: '#0F172A'
  });

  // Structural Wireframe HUD Overlay
  b.addStep('CREATE_FRAME', {
    parentId: '$card_bim_canvas_07',
    name: 'BIM HUD / Layer Selector',
    width: 313,
    height: 38,
    x: 16,
    y: 16,
    backgroundColor: '#0F172ACC',
    cornerRadius: 8
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bim_canvas_07',
    text: 'AXIS 04-B • REINFORCED SLAB & BAMBOO CANTILEVER NODE',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#38BDF8',
    x: 28,
    y: 28
  });

  // Hotspot Callout Node
  b.addStep('CREATE_FRAME', {
    parentId: '$card_bim_canvas_07',
    name: 'Hotspot / Joint Pin',
    width: 28,
    height: 28,
    x: 158,
    y: 130,
    backgroundColor: '#059669EE',
    cornerRadius: 14
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bim_canvas_07',
    text: '①',
    fontSize: 12,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 167,
    y: 136
  });

  // 3. Technical Engineering Specifications
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Structural Specs',
    width: 345,
    height: 190,
    x: 24,
    y: 420,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_bim_specs_07');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_bim_specs_07',
    text: 'Structural Engineering Specification',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const specs = [
    { k: 'Material Grade', v: 'Tầm Vông Bio-Carbon Composite + 316 Stainless Steel Pin' },
    { k: 'Max Tensile Load', v: '42.8 kN/m² (Certified by Asian Earthquake Standards)' },
    { k: 'Thermal Bridging', v: 'U-Value 0.28 W/m²K (Zero Thermal Bridge Interface)' },
    { k: 'Acoustic Attenuation', v: 'Rw 48 dB Acoustic Teak Sound Isolators' }
  ];

  let sY = 48;
  specs.forEach(s => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_bim_specs_07',
      text: s.k.toUpperCase(),
      fontSize: 9,
      fontStyle: 'Bold',
      color: TOKENS.textMuted,
      x: 20,
      y: sY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_bim_specs_07',
      text: s.v,
      fontSize: 11,
      fontStyle: 'SemiBold',
      color: TOKENS.textPrimary,
      x: 20,
      y: sY + 14
    });

    sY += 34;
  });

  // 4. Export IFC CAD File Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Export IFC Model',
    text: 'Export BIM 3D Model (IFC / Revit LOD-400)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(1);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_arc_07.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
