import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-039 (360-11) — Spatial Audio Ambient Selector
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_11', 'SCR-039: Spatial Audio Ambient', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SPATIAL AUDIO AMBIENCE', 'DOLBY ATMOS BINAURAL SOUNDSCAPES', true, 'Vol 80%');

  const sId = '$scr_360_11';

  // 2. Audio Spectrum Visualizer Card (Frosted Glass)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Audio Spectrum',
    width: 345,
    height: 140,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_spectrum_11');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_spectrum_11',
    text: 'Now Playing: Tropical Monsoon Rain & Saigon River',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 20
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_spectrum_11',
    text: 'Field-recorded at Thảo Điền Riverfront compound using Neumann KU100 binaural dummy head microphone.',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 20,
    y: 44
  });

  // Animated Waveform Bars Simulation
  const barHeights = [18, 32, 48, 24, 56, 38, 62, 44, 28, 52, 34, 20];
  let bX = 20;
  barHeights.forEach((bh, i) => {
    b.addStep('CREATE_FRAME', {
      parentId: '$card_spectrum_11',
      name: `Wave / ${i}`,
      width: 6,
      height: bh,
      x: bX,
      y: 110 - bh,
      backgroundColor: i % 2 === 0 ? TOKENS.accentEmerald : TOKENS.accentGold,
      cornerRadius: 3
    });
    bX += 24;
  });

  // 3. Ambient Soundscape Presets (4 Options)
  const soundscapes = [
    { title: 'Monsoon Rain & Saigon River', desc: 'Warm tropical rain on lotus ponds and river waves', active: true },
    { title: 'Bamboo Wind Whistling (Gió Tre)', desc: 'Gentle rustling through VTN engineered bamboo culms', active: false },
    { title: 'Dawn Birdsong & Zen Garden', desc: 'Early morning acoustic fauna in Ba Đình courtyard', active: false },
    { title: 'Silent Acoustic Chamber', desc: 'Ultra-low ambient noise (< 22 dBA soundproof isolation)', active: false }
  ];

  let aY = 280;
  soundscapes.forEach((sc, idx) => {
    b.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Option / ${sc.title}`,
      width: 345,
      height: 64,
      x: 24,
      y: aY,
      backgroundColor: sc.active ? TOKENS.bgSurface : TOKENS.bgCard,
      cornerRadius: 14
    }, `sound_opt_${idx}_11`);

    b.addStep('CREATE_TEXT', {
      parentId: `$sound_opt_${idx}_11`,
      text: `${sc.active ? '▶ ' : '▷ '}${sc.title}`,
      fontSize: 13,
      fontStyle: 'Bold',
      color: sc.active ? TOKENS.textPrimary : TOKENS.textSecondary,
      x: 16,
      y: 14
    });

    b.addStep('CREATE_TEXT', {
      parentId: `$sound_opt_${idx}_11`,
      text: sc.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textMuted,
      x: 16,
      y: 36
    });

    aY += 76;
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Return to 360',
    text: 'Apply Soundscape & Return to 360 Tour →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 600,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_apply_sound_11');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_11.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
