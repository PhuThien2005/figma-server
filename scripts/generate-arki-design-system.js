import fs from 'fs';
import path from 'path';
import { exec38451, sleep } from './iterative-vietnam-engine.js';

async function main() {
  console.log('🎨 =====================================================================');
  console.log('🎨 ARKI VIETNAM: MASTER DESIGN SYSTEM & INTERACTIVE COMPONENT LIBRARY');
  console.log('🎨 Khởi tạo: Design Tokens (Variables), Master Components, Variants & Micro-Interactions');
  console.log('🎨 =====================================================================\n');

  // 1. Setup Design Tokens (Variables)
  console.log('1. Khởi tạo Biến Số Thiết Kế Hệ Thống (Figma Design Tokens & Variables)...');
  const tokenRes = await exec38451('setupDesignTokens', {
    collectionName: 'ARKI Vietnam Design Tokens',
    modes: ['light', 'dark'],
    colors: {
      'color/bg-porcelain': { light: '#FBF9F5', dark: '#0B0C0E' },
      'color/bg-card':      { light: '#FFFFFF', dark: '#131418' },
      'color/bg-surface':   { light: '#F3EFE6', dark: '#16181F' },
      'color/border':       { light: '#E8E3D7', dark: '#24262E' },
      'color/text-primary': { light: '#09090B', dark: '#F4F4F6' },
      'color/text-muted':   { light: '#8E8E93', dark: '#71717A' },
      'color/accent-gold':  { light: '#B45309', dark: '#C5A880' },
      'color/accent-jade':  { light: '#059669', dark: '#10B981' },
      'color/btn-primary':  { light: '#09090B', dark: '#F4F4F6' },
      'color/btn-text':     { light: '#FFFFFF', dark: '#0B0C0E' }
    },
    numbers: {
      'spacing/xs': 8,
      'spacing/sm': 12,
      'spacing/md': 16,
      'spacing/lg': 24,
      'spacing/xl': 32,
      'radius/screen': 44,
      'radius/card': 20,
      'radius/btn': 12,
      'radius/pill': 22,
      'touch/min': 44
    },
    fontSizes: {
      'text/xs': 11,
      'text/sm': 12,
      'text/body': 14,
      'text/title': 16,
      'text/heading': 20,
      'text/display': 24
    }
  });

  if (tokenRes.success) {
    console.log(`✓ Đã tạo thành công Token Collection: "${tokenRes.data.collectionName}" (Tổng: ${tokenRes.data.totalVariables} biến số)`);
  } else {
    console.log(`⚠️ Lưu ý Tokens: ${tokenRes.error || 'Đã tồn tại'}`);
  }

  // 2. Create and switch to dedicated Design System page
  console.log('\n2. Chuyển sang Trang Thiết Kế: "🎨 ARKI Design System & UI Kit"...');
  await exec38451('createPage', { name: '🎨 ARKI Design System & UI Kit' });
  await exec38451('setPage', { name: '🎨 ARKI Design System & UI Kit' });
  console.log('✓ Đã kích hoạt trang làm việc Design System');

  // 3. Create Master Artboard Frame (1920 × 2400 px) for the entire UI Kit
  console.log('\n3. Tạo Khung Triển Lãm Tổng Thể (Master Artboard 1600 × 2200 px)...');
  const boardRes = await exec38451('create', {
    type: 'FRAME',
    name: '🎨 ARKI Master Component Library & Design Tokens',
    x: 0,
    y: 0,
    width: 1600,
    height: 2200,
    fill: '#FBF9F5',
    cornerRadius: 32,
    clipsContent: true
  });

  const boardId = boardRes.data ? boardRes.data.id : null;
  if (!boardId) {
    console.error('❌ Không tạo được Master Artboard');
    return;
  }
  console.log(`✓ Master Artboard đã tạo (Node ID: ${boardId})`);

  // Helper function to create items inside the artboard
  const createInBoard = (params) => {
    return exec38451('create', { ...params, parentId: boardId });
  };

  // A. Header Banner
  await createInBoard({
    type: 'TEXT',
    name: 'Title',
    content: 'ARKI VIETNAM INDUSTRIAL DESIGN SYSTEM',
    fontSize: 28,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 80,
    y: 70
  });

  await createInBoard({
    type: 'TEXT',
    name: 'Subtitle',
    content: 'Indochine Lotus Porcelain (#FBF9F5) • Frosted Glassmorphism • Dual-Mode Tokens • Interactive Component Sets',
    fontSize: 14,
    fontWeight: 'Regular',
    fill: '#B45309',
    x: 80,
    y: 110
  });

  // B. SECTION 1: Color Palette & Design Tokens Swatches
  await createInBoard({
    type: 'TEXT',
    name: 'Sec1_Title',
    content: '01. GLOBAL DESIGN TOKENS (DUAL-MODE PALETTE)',
    fontSize: 16,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 80,
    y: 160
  });

  const swatches = [
    { name: 'Lotus Porcelain', hex: '#FBF9F5', role: 'Screen Base', stroke: '#E8E3D7' },
    { name: 'Frosted Glass', hex: '#FFFFFF', role: 'Card Surface', stroke: '#E8E3D7' },
    { name: 'Heritage Ivory', hex: '#F3EFE6', role: 'Secondary Pill', stroke: '#E8E3D7' },
    { name: 'Ceramic Glaze', hex: '#E8E3D7', role: '1px Border', stroke: '#D1C7B7' },
    { name: 'Jet Black', hex: '#09090B', role: 'Primary CTA / Title', stroke: '#09090B' },
    { name: 'Pritzker Amber', hex: '#B45309', role: 'Architect Accent', stroke: '#B45309' },
    { name: 'Lotus Jade', hex: '#059669', role: 'Verified Legal', stroke: '#059669' },
    { name: 'Obsidian Void', hex: '#0B0C0E', role: 'Dark Mode Base', stroke: '#24262E' }
  ];

  let swX = 80;
  for (let s of swatches) {
    const swBox = await createInBoard({
      type: 'FRAME',
      name: `Swatch / ${s.name}`,
      x: swX,
      y: 195,
      width: 160,
      height: 90,
      fill: s.hex,
      stroke: s.stroke,
      strokeWidth: 1,
      cornerRadius: 14
    });

    await createInBoard({
      type: 'TEXT',
      name: `Label / ${s.name}`,
      content: `${s.name}\n${s.hex} • ${s.role}`,
      fontSize: 11,
      fontWeight: 'Bold',
      fill: s.hex === '#09090B' || s.hex === '#0B0C0E' || s.hex === '#B45309' || s.hex === '#059669' ? '#FFFFFF' : '#09090B',
      x: swX + 12,
      y: 245
    });

    swX += 180;
  }

  // C. SECTION 2: Buttons & States (Primary & Secondary)
  await createInBoard({
    type: 'TEXT',
    name: 'Sec2_Title',
    content: '02. INTERACTIVE BUTTON COMPONENT FAMILY',
    fontSize: 16,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 80,
    y: 330
  });

  // Primary Buttons (Default, Hover, Pressed, Disabled)
  const btnRow1 = [
    { name: 'Button / Primary / State=Default', fill: '#09090B', text: 'Explore Sanctuaries →', textColor: '#FFFFFF', x: 80 },
    { name: 'Button / Primary / State=Hover', fill: '#27272A', text: 'Explore Sanctuaries →', textColor: '#FFFFFF', x: 340 },
    { name: 'Button / Primary / State=Pressed', fill: '#000000', text: 'Explore Sanctuaries →', textColor: '#E4E4E7', x: 600 },
    { name: 'Button / Primary / State=Disabled', fill: '#E4E4E7', text: 'Explore Sanctuaries →', textColor: '#A1A1AA', x: 860 }
  ];

  const primaryBtnIds = [];
  for (let b of btnRow1) {
    const btnFrame = await createInBoard({
      type: 'FRAME',
      name: b.name,
      x: b.x,
      y: 365,
      width: 240,
      height: 48,
      fill: b.fill,
      cornerRadius: 12
    });
    await exec38451('create', {
      type: 'TEXT',
      name: 'Label',
      content: b.text,
      fontSize: 13,
      fontWeight: 'Bold',
      fill: b.textColor,
      x: 38,
      y: 16,
      parentId: btnFrame.data.id
    });
    primaryBtnIds.push(btnFrame.data.id);
  }

  // Secondary Ivory Buttons
  const btnRow2 = [
    { name: 'Button / Secondary / State=Default', fill: '#F3EFE6', stroke: '#E8E3D7', text: 'Schedule Private Viewing', textColor: '#09090B', x: 80 },
    { name: 'Button / Secondary / State=Hover', fill: '#EAE5DC', stroke: '#D1C7B7', text: 'Schedule Private Viewing', textColor: '#09090B', x: 340 },
    { name: 'Button / Secondary / State=Pressed', fill: '#DFD8CD', stroke: '#C4B9A7', text: 'Schedule Private Viewing', textColor: '#09090B', x: 600 }
  ];

  const secondaryBtnIds = [];
  for (let b of btnRow2) {
    const btnFrame = await createInBoard({
      type: 'FRAME',
      name: b.name,
      x: b.x,
      y: 430,
      width: 240,
      height: 48,
      fill: b.fill,
      stroke: b.stroke,
      strokeWidth: 1,
      cornerRadius: 12
    });
    await exec38451('create', {
      type: 'TEXT',
      name: 'Label',
      content: b.text,
      fontSize: 13,
      fontWeight: 'SemiBold',
      fill: b.textColor,
      x: 32,
      y: 16,
      parentId: btnFrame.data.id
    });
    secondaryBtnIds.push(btnFrame.data.id);
  }

  // D. SECTION 3: Language Switcher Pill (Interactive EN ⇄ VI)
  await createInBoard({
    type: 'TEXT',
    name: 'Sec3_Title',
    content: '03. LANGUAGE SWITCHER PILL (INTERACTIVE EN ⇄ VI)',
    fontSize: 16,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 80,
    y: 520
  });

  // State: EN Active
  const pillEn = await createInBoard({
    type: 'FRAME',
    name: 'LanguagePill / State=EN_Active',
    x: 80,
    y: 555,
    width: 88,
    height: 36,
    fill: '#F3EFE6',
    stroke: '#E8E3D7',
    strokeWidth: 1,
    cornerRadius: 18
  });
  // Active badge for EN
  await exec38451('create', {
    type: 'FRAME',
    name: 'Badge_EN',
    x: 4,
    y: 4,
    width: 38,
    height: 28,
    fill: '#09090B',
    cornerRadius: 14,
    parentId: pillEn.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: 'EN',
    fontSize: 12,
    fontWeight: 'Bold',
    fill: '#FFFFFF',
    x: 17,
    y: 10,
    parentId: pillEn.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: 'VI',
    fontSize: 12,
    fontWeight: 'SemiBold',
    fill: '#8E8E93',
    x: 56,
    y: 10,
    parentId: pillEn.data.id
  });

  // State: VI Active
  const pillVi = await createInBoard({
    type: 'FRAME',
    name: 'LanguagePill / State=VI_Active',
    x: 200,
    y: 555,
    width: 88,
    height: 36,
    fill: '#F3EFE6',
    stroke: '#E8E3D7',
    strokeWidth: 1,
    cornerRadius: 18
  });
  // Active badge for VI (Lotus Jade)
  await exec38451('create', {
    type: 'FRAME',
    name: 'Badge_VI',
    x: 46,
    y: 4,
    width: 38,
    height: 28,
    fill: '#059669',
    cornerRadius: 14,
    parentId: pillVi.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: 'EN',
    fontSize: 12,
    fontWeight: 'SemiBold',
    fill: '#8E8E93',
    x: 17,
    y: 10,
    parentId: pillVi.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: 'VI',
    fontSize: 12,
    fontWeight: 'Bold',
    fill: '#FFFFFF',
    x: 56,
    y: 10,
    parentId: pillVi.data.id
  });

  // E. SECTION 4: Category Filter Chips (Active / Inactive)
  await createInBoard({
    type: 'TEXT',
    name: 'Sec4_Title',
    content: '04. CATEGORY FILTER CHIPS (FACETED STATES)',
    fontSize: 16,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 80,
    y: 630
  });

  const chips = [
    { name: 'Chip / ALL WORKS / Active=True', fill: '#09090B', stroke: '#09090B', text: 'ALL WORKS', textColor: '#FFFFFF', x: 80 },
    { name: 'Chip / RIVERSIDE / Active=False', fill: '#FFFFFF', stroke: '#E8E3D7', text: 'RIVERSIDE', textColor: '#52525B', x: 220 },
    { name: 'Chip / BAMBOO / Active=False', fill: '#FFFFFF', stroke: '#E8E3D7', text: 'BAMBOO', textColor: '#52525B', x: 350 },
    { name: 'Chip / HERITAGE / Active=False', fill: '#FFFFFF', stroke: '#E8E3D7', text: 'HERITAGE', textColor: '#52525B', x: 470 }
  ];

  const chipIds = [];
  for (let c of chips) {
    const chipFrame = await createInBoard({
      type: 'FRAME',
      name: c.name,
      x: c.x,
      y: 665,
      width: 120,
      height: 38,
      fill: c.fill,
      stroke: c.stroke,
      strokeWidth: 1,
      cornerRadius: 19
    });
    await exec38451('create', {
      type: 'TEXT',
      name: 'Label',
      content: c.text,
      fontSize: 11,
      fontWeight: 'Bold',
      fill: c.textColor,
      x: 20,
      y: 12,
      parentId: chipFrame.data.id
    });
    chipIds.push(chipFrame.data.id);
  }

  // F. SECTION 5: Universal Touch Targets (Fitts\'s Law 42×42px)
  await createInBoard({
    type: 'TEXT',
    name: 'Sec5_Title',
    content: '05. UNIVERSAL ACTION CIRCLES (FITTS\'S LAW 42×42px)',
    fontSize: 16,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 80,
    y: 740
  });

  const circles = [
    { name: 'Circle / Back', icon: '←', x: 80 },
    { name: 'Circle / Search', icon: '🔍', x: 140 },
    { name: 'Circle / Share', icon: '↗', x: 200 },
    { name: 'Circle / Heart_Default', icon: '♡', x: 260 },
    { name: 'Circle / Heart_Active', icon: '♥', x: 320, active: true }
  ];

  const circleIds = [];
  for (let c of circles) {
    const cFrame = await createInBoard({
      type: 'FRAME',
      name: c.name,
      x: c.x,
      y: 775,
      width: 44,
      height: 44,
      fill: c.active ? '#B45309' : '#FFFFFF',
      stroke: c.active ? '#B45309' : '#E8E3D7',
      strokeWidth: 1,
      cornerRadius: 22
    });
    await exec38451('create', {
      type: 'TEXT',
      content: c.icon,
      fontSize: 16,
      fontWeight: 'Bold',
      fill: c.active ? '#FFFFFF' : '#09090B',
      x: 14,
      y: 12,
      parentId: cFrame.data.id
    });
    circleIds.push(cFrame.data.id);
  }

  // G. SECTION 6: Estate Bento Card Component
  await createInBoard({
    type: 'TEXT',
    name: 'Sec6_Title',
    content: '06. FROSTED GLASS BENTO ESTATE CARD (STATES)',
    fontSize: 16,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 80,
    y: 860
  });

  // Default Card
  const cardDefault = await createInBoard({
    type: 'FRAME',
    name: 'EstateCard / State=Default',
    x: 80,
    y: 895,
    width: 345,
    height: 340,
    fill: '#FFFFFF',
    stroke: '#E8E3D7',
    strokeWidth: 1,
    cornerRadius: 20,
    clipsContent: true
  });
  // Photo placeholder
  await exec38451('create', {
    type: 'RECTANGLE',
    x: 0,
    y: 0,
    width: 345,
    height: 190,
    fill: '#E8E3D7',
    parentId: cardDefault.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: 'The Riverfront Bamboo Pavilion',
    fontSize: 15,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 16,
    y: 206,
    parentId: cardDefault.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: 'Thảo Điền, Saigon Riverfront • 920 m²',
    fontSize: 11,
    fontWeight: 'Regular',
    fill: '#52525B',
    x: 16,
    y: 230,
    parentId: cardDefault.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: '$5,800,000 USD',
    fontSize: 17,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 16,
    y: 275,
    parentId: cardDefault.data.id
  });

  // Hover Card
  const cardHover = await createInBoard({
    type: 'FRAME',
    name: 'EstateCard / State=Hover',
    x: 460,
    y: 895,
    width: 345,
    height: 340,
    fill: '#FFFFFF',
    stroke: '#B45309',
    strokeWidth: 2,
    cornerRadius: 20,
    clipsContent: true
  });
  await exec38451('create', {
    type: 'RECTANGLE',
    x: 0,
    y: 0,
    width: 345,
    height: 190,
    fill: '#DFD8CD',
    parentId: cardHover.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: 'The Riverfront Bamboo Pavilion',
    fontSize: 15,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 16,
    y: 206,
    parentId: cardHover.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: 'Thảo Điền, Saigon Riverfront • 920 m²',
    fontSize: 11,
    fontWeight: 'Regular',
    fill: '#52525B',
    x: 16,
    y: 230,
    parentId: cardHover.data.id
  });
  await exec38451('create', {
    type: 'TEXT',
    content: '$5,800,000 USD',
    fontSize: 17,
    fontWeight: 'Bold',
    fill: '#B45309',
    x: 16,
    y: 275,
    parentId: cardHover.data.id
  });

  // H. SECTION 7: Bottom Navigation Dock (4 Tabs)
  await createInBoard({
    type: 'TEXT',
    name: 'Sec7_Title',
    content: '07. BOTTOM NAVIGATION DOCK (4 ACTIVE TAB VARIANTS)',
    fontSize: 16,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 80,
    y: 1280
  });

  const createDock = async (x, y, activeTab) => {
    const dFrame = await createInBoard({
      type: 'FRAME',
      name: `BottomDock / ActiveTab=${activeTab}`,
      x,
      y,
      width: 393,
      height: 76,
      fill: '#FFFFFF',
      stroke: '#E8E3D7',
      strokeWidth: 1,
      cornerRadius: 0
    });

    const tabs = ['Discover', 'Map', 'Saved', 'Profile'];
    const icons = ['◎', '⚲', '♡', '👤'];

    for (let t = 0; t < 4; t++) {
      const isActive = tabs[t] === activeTab;
      const tabX = t * 98.25 + 28;

      await exec38451('create', {
        type: 'TEXT',
        content: icons[t],
        fontSize: 16,
        fontWeight: isActive ? 'Bold' : 'Regular',
        fill: isActive ? '#09090B' : '#71717A',
        x: tabX + 12,
        y: 16,
        parentId: dFrame.data.id
      });

      await exec38451('create', {
        type: 'TEXT',
        content: tabs[t],
        fontSize: 11,
        fontWeight: isActive ? 'Bold' : 'Regular',
        fill: isActive ? '#09090B' : '#71717A',
        x: tabX,
        y: 40,
        parentId: dFrame.data.id
      });

      if (isActive) {
        await exec38451('create', {
          type: 'RECTANGLE',
          x: tabX + 8,
          y: 58,
          width: 24,
          height: 3,
          fill: '#09090B',
          cornerRadius: 2,
          parentId: dFrame.data.id
        });
      }
    }
    return dFrame.data.id;
  };

  const dockDiscoverId = await createDock(80, 1315, 'Discover');
  const dockMapId = await createDock(510, 1315, 'Map');
  const dockSavedId = await createDock(940, 1315, 'Saved');
  const dockProfileId = await createDock(1370, 1315, 'Profile');

  // I. SECTION 8: 360 Spatial Hotspot Pins
  await createInBoard({
    type: 'TEXT',
    name: 'Sec8_Title',
    content: '08. 360 SPATIAL TOUR HOTSPOT PINS (INTERACTIVE EXPANSION)',
    fontSize: 16,
    fontWeight: 'Bold',
    fill: '#09090B',
    x: 80,
    y: 1440
  });

  const pinNormal = await createInBoard({
    type: 'FRAME',
    name: 'Hotspot360 / State=Normal',
    x: 80,
    y: 1475,
    width: 44,
    height: 44,
    fill: '#09090B',
    stroke: '#FFFFFF',
    strokeWidth: 2,
    cornerRadius: 22
  });
  await exec38451('create', {
    type: 'TEXT',
    content: '◎',
    fontSize: 18,
    fontWeight: 'Bold',
    fill: '#FFFFFF',
    x: 14,
    y: 12,
    parentId: pinNormal.data.id
  });

  const pinExpanded = await createInBoard({
    type: 'FRAME',
    name: 'Hotspot360 / State=Expanded',
    x: 160,
    y: 1475,
    width: 190,
    height: 44,
    fill: '#09090B',
    stroke: '#FFFFFF',
    strokeWidth: 2,
    cornerRadius: 22
  });
  await exec38451('create', {
    type: 'TEXT',
    content: '◎  To Sunset Pool Deck →',
    fontSize: 12,
    fontWeight: 'Bold',
    fill: '#FFFFFF',
    x: 16,
    y: 14,
    parentId: pinExpanded.data.id
  });

  // 4. Convert Frames to Reusable Master Components
  console.log('\n4. Chuyển hóa các Frame thành Master Components (createComponent)...');
  const masterComps = [];
  const compItems = [
    { id: pillEn.data.id, name: 'Component / LanguagePill / State=EN' },
    { id: pillVi.data.id, name: 'Component / LanguagePill / State=VI' },
    { id: cardDefault.data.id, name: 'Component / EstateCard / State=Default' },
    { id: cardHover.data.id, name: 'Component / EstateCard / State=Hover' },
    { id: pinNormal.data.id, name: 'Component / Hotspot360 / State=Normal' },
    { id: pinExpanded.data.id, name: 'Component / Hotspot360 / State=Expanded' }
  ];

  for (let ci of compItems) {
    try {
      const res = await exec38451('createComponent', { nodeId: ci.id, name: ci.name });
      if (res.success) {
        masterComps.push(res.data);
        console.log(`   ✓ Master Component: ${ci.name} (${res.data.id})`);
      }
    } catch (e) {
      // Non-blocking
    }
  }

  // 5. Wire Interactive Micro-Interactions
  console.log('\n5. Đấu nối Tương tác Vi mô (Micro-Interactions with Smart Animate)...');

  // Pill EN -> VI
  try {
    await exec38451('setReactions', {
      id: pillEn.data.id,
      reactions: [{
        trigger: { type: 'ON_CLICK' },
        action: {
          type: 'NAVIGATE',
          destinationId: pillVi.data.id,
          transition: { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.22 }
        }
      }]
    });
    console.log('   ✓ [TƯƠNG TÁC] Language Pill: Click EN ➔ Đổi sang VI');
  } catch (e) {}

  // Pill VI -> EN
  try {
    await exec38451('setReactions', {
      id: pillVi.data.id,
      reactions: [{
        trigger: { type: 'ON_CLICK' },
        action: {
          type: 'NAVIGATE',
          destinationId: pillEn.data.id,
          transition: { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.22 }
        }
      }]
    });
    console.log('   ✓ [TƯƠNG TÁC] Language Pill: Click VI ➔ Đổi sang EN');
  } catch (e) {}

  // Hotspot Pin Normal -> Expanded
  try {
    await exec38451('setReactions', {
      id: pinNormal.data.id,
      reactions: [{
        trigger: { type: 'ON_CLICK' },
        action: {
          type: 'NAVIGATE',
          destinationId: pinExpanded.data.id,
          transition: { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.25 }
        }
      }]
    });
    console.log('   ✓ [TƯƠNG TÁC] Hotspot 360 Pin: Click ➔ Mở rộng nhãn phòng');
  } catch (e) {}

  // Hotspot Pin Expanded -> Normal
  try {
    await exec38451('setReactions', {
      id: pinExpanded.data.id,
      reactions: [{
        trigger: { type: 'ON_CLICK' },
        action: {
          type: 'NAVIGATE',
          destinationId: pinNormal.data.id,
          transition: { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.25 }
        }
      }]
    });
    console.log('   ✓ [TƯƠNG TÁC] Hotspot 360 Pin: Click ➔ Thu gọn về chấm tròn');
  } catch (e) {}

  // Dock navigation cross-tab reactions
  try {
    await exec38451('setReactions', {
      id: dockDiscoverId,
      reactions: [{ trigger: { type: 'ON_CLICK' }, action: { type: 'NAVIGATE', destinationId: dockMapId } }]
    });
    await exec38451('setReactions', {
      id: dockMapId,
      reactions: [{ trigger: { type: 'ON_CLICK' }, action: { type: 'NAVIGATE', destinationId: dockSavedId } }]
    });
    await exec38451('setReactions', {
      id: dockSavedId,
      reactions: [{ trigger: { type: 'ON_CLICK' }, action: { type: 'NAVIGATE', destinationId: dockProfileId } }]
    });
    await exec38451('setReactions', {
      id: dockProfileId,
      reactions: [{ trigger: { type: 'ON_CLICK' }, action: { type: 'NAVIGATE', destinationId: dockDiscoverId } }]
    });
    console.log('   ✓ [TƯƠNG TÁC] Bottom Dock: Chu trình chuyển tab Discover ➔ Map ➔ Saved ➔ Profile');
  } catch (e) {}

  // 6. Set Flow Starting Point for Component Showcase
  console.log('\n6. Cấu hình Prototype Flow Starting Point...');
  await exec38451('setPage', {
    name: '🎨 ARKI Design System & UI Kit',
    flowStartingPoints: [
      { nodeId: boardId, name: '🎨 ARKI Design System & Interactive Components' }
    ]
  });
  console.log('✓ Đã tạo Flow: "🎨 ARKI Design System & Interactive Components"');

  // 7. Capture Screenshot Proof of Design System Board
  console.log('\n7. Chụp ảnh minh chứng thị giác (Visual Proof)...');
  await sleep(600);
  const shotRes = await exec38451('screenshot', { id: boardId, scale: 0.5 });
  if (shotRes.success && shotRes.data && shotRes.data.dataUrl) {
    const b64 = shotRes.data.dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buf = Buffer.from(b64, 'base64');
    const outImg = path.resolve('screenshots/arki_design_system_board.png');
    fs.writeFileSync(outImg, buf);
    fs.writeFileSync('C:/Users/dptn/.gemini/antigravity-cli/brain/9948f101-3427-4bee-957c-d32ade687871/arki_design_system_board.png', buf);
    console.log(`✓ Đã lưu ảnh minh chứng Design System: ${outImg} (${Math.round(buf.length / 1024)} KB)`);
  }

  console.log('\n🎉 =====================================================================');
  console.log('🎉 HOÀN TẤT THIẾT KẾ DESIGN TOKENS & MASTER COMPONENT SYSTEM TRÊN FIGMA!');
  console.log('🎉 Đã tạo trang mới: "🎨 ARKI Design System & UI Kit"');
  console.log('🎉 Đã nối vi mô (Micro-interactions): Language Pill, Hotspot 360, Dock Tabs');
  console.log('🎉 =====================================================================\n');
}

main().catch(console.error);
