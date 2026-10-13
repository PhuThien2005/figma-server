import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-088 (COM-14) — Media Vault (Hi-Res Renders, VR Passes)
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_14', 'SCR-088: Media Vault & VR Passes', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('MEDIA VAULT', '8K ARCHITECTURAL RENDERS & VR PASSES', true);

  const sId = '$scr_com_14';

  // 2. VR Spatial Pass Hero Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / VR Spatial Hero',
    width: 345,
    height: 190,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'card_vr_hero_14');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$card_vr_hero_14',
    name: 'Cover / Sunset Pool 8K',
    width: 345,
    height: 190,
    x: 0,
    y: 0,
    imageUrl: 'sunset infinity pool',
    color: TOKENS.bgSurface
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$card_vr_hero_14',
    name: 'Glass Overlay / Apple Vision Pro Ready',
    width: 305,
    height: 48,
    x: 20,
    y: 126,
    backgroundColor: '#FFFFFFEE',
    cornerRadius: 12
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vr_hero_14',
    text: 'APPLE VISION PRO SPATIAL ENVIRONMENT (.USDZ)',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 32,
    y: 136
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_vr_hero_14',
    text: 'Full 16K Photorealistic Lighting • 1.2 GB Immersive Download',
    fontSize: 9,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 32,
    y: 152
  });

  // 3. Media Assets Grid Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Media Grid',
    width: 345,
    height: 290,
    x: 24,
    y: 330,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_media_grid_14');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_media_grid_14',
    text: 'Ultra-High-Definition Assets',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const mediaList = [
    { title: 'Sunset Pool Reflection (8K TIFF)', size: '240 MB', type: 'HERO RENDER' },
    { title: 'Teak Dining Pavilion Dawn Light (8K TIFF)', size: '198 MB', type: 'INTERIOR' },
    { title: 'Master Atrium Bamboo Canopy Drone Video (ProRes)', size: '4.8 GB', type: 'CINEMATIC' }
  ];

  let mdY = 50;
  mediaList.forEach(m => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_media_grid_14',
      text: m.title,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: mdY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_media_grid_14',
      text: `File Size: ${m.size} • Category: ${m.type}`,
      fontSize: 10,
      fontStyle: 'SemiBold',
      color: TOKENS.accentGold,
      x: 20,
      y: mdY + 16
    });

    b.addStep('CREATE_BUTTON', {
      parentId: '$card_media_grid_14',
      name: `Btn / Download ${m.type}`,
      text: 'Download Full Res',
      backgroundColor: TOKENS.bgSurface,
      textColor: TOKENS.textPrimary,
      x: 20,
      y: mdY + 36,
      width: 140,
      height: 28
    });

    mdY += 76;
  });

  // 4. Action Button: AirDrop to Apple Vision Pro
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Vision Pro AirDrop',
    text: '🥽 Send Spatial Pass to Apple Vision Pro',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_14.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
