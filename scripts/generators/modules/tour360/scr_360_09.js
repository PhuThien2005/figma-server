import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-037 (360-09) — Virtual Staging Comparison (Raw Shell vs. Furnished)
 * Module: TOUR360 (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_360_09', 'SCR-037: Virtual Staging Split', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('VIRTUAL STAGING HUD', 'RAW ARCHITECTURE VS. BESPOKE INTERIOR', true, 'Toggle');

  const sId = '$scr_360_09';

  // 2. Split Comparison Viewport Container
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Container / Staging Viewport',
    width: 345,
    height: 380,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard,
    clipsContent: true
  }, 'staging_viewport_09');

  b.addStep('CREATE_RECTANGLE', {
    parentId: '$staging_viewport_09',
    name: 'Photo / Furnished Living Atrium',
    width: 345,
    height: 380,
    x: 0,
    y: 0,
    imageUrl: 'living room atrium',
    color: TOKENS.bgSurface
  });

  // Center Interactive Slider Divider
  b.addStep('CREATE_FRAME', {
    parentId: '$staging_viewport_09',
    name: 'Slider / Vertical Divider',
    width: 2,
    height: 380,
    x: 172,
    y: 0,
    backgroundColor: '#FFFFFF'
  });

  // Slider Thumb Handle
  b.addStep('CREATE_FRAME', {
    parentId: '$staging_viewport_09',
    name: 'Handle / Split Slider',
    width: 36,
    height: 36,
    x: 155,
    y: 172,
    backgroundColor: '#09090BF2',
    cornerRadius: 18
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$staging_viewport_09',
    text: '◀ ▶',
    fontSize: 10,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 163,
    y: 184
  });

  // Badges Left and Right
  b.addStep('CREATE_FRAME', {
    parentId: '$staging_viewport_09',
    name: 'Badge / Left Raw',
    width: 90,
    height: 28,
    x: 16,
    y: 16,
    backgroundColor: '#09090BD9',
    cornerRadius: 14
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$staging_viewport_09',
    text: 'RAW SHELL',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 28,
    y: 24
  });

  b.addStep('CREATE_FRAME', {
    parentId: '$staging_viewport_09',
    name: 'Badge / Right Furnished',
    width: 100,
    height: 28,
    x: 230,
    y: 16,
    backgroundColor: '#09090BD9',
    cornerRadius: 14
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$staging_viewport_09',
    text: 'FURNISHED 100%',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentGold,
    x: 238,
    y: 24
  });

  // 3. Bespoke Interior Package Card (Glass Container)
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Glass Card / Procurement Summary',
    width: 345,
    height: 120,
    x: 24,
    y: 520,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_procure_09');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_procure_09',
    text: 'Bespoke Sanctuary Staging Package',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 18,
    y: 16
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_procure_09',
    text: 'Custom Teak Millwork • Boffi Kitchen Appliances • Minotti Seating\nProcurement Value: $420,000 USD (Includes Turnkey Installation)\nLead Time: 6 Weeks via ARKI Concierge Atelier',
    fontSize: 11,
    fontStyle: 'Regular',
    color: TOKENS.textSecondary,
    x: 18,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_procure_09',
    text: 'TURNKEY PROCURED',
    fontSize: 9,
    fontStyle: 'Bold',
    color: TOKENS.accentEmerald,
    x: 18,
    y: 94
  });

  // 4. Action CTA Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'CTA / Request Interior Package',
    text: 'Request Turnkey Furniture Procurement →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 654,
    width: 345,
    height: 52,
    cornerRadius: TOKENS.cornerRadiusBtn
  }, 'btn_procure_09');

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(0);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_360_09.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
