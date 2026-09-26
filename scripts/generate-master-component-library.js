import http from 'http';

function post(action, params = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:8765/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ success: false, error: data });
        }
      });
    });
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('🏛️ ARKI DESIGN SYSTEM: TẠO THƯ VIỆN MASTER COMPONENTS & TƯƠNG TÁC VI MÔ');
  console.log('   Theo Chuẩn: .agents/skills/figma-interactive-components/SKILL.md');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  // 1. Tạo Frame chứa Master Component Library
  console.log('📐 [1/9] Tạo Artboard Thư Viện Master Design System...');
  const libraryFrameRes = await post('CREATE_FRAME', {
    name: 'ARKI / Design System & Master Components [Library]',
    width: 1800,
    height: 1400,
    x: -3600,
    y: 0,
    backgroundColor: '#F3F2EE'
  });
  const libId = libraryFrameRes.data?.id;
  console.log(`   ✅ Đã tạo Artboard Library ID: ${libId} tại X: -3600, Y: 0`);

  // Tiêu đề Artboard
  await post('CREATE_TEXT', {
    parentId: libId,
    characters: 'ARKI MASTER DESIGN SYSTEM & COMPONENT VARIANTS',
    fontSize: 28,
    fontFamily: 'Cinzel',
    fontWeight: 'Bold',
    color: '#111111',
    x: 40,
    y: 40
  });

  await post('CREATE_TEXT', {
    parentId: libId,
    characters: 'Hệ thống 8 Component Sets với đầy đủ các biến thể tương tác vi mô: Hover (ON_HOVER), Pressed (ON_PRESS), Focused, Selected (ON_CLICK) qua Smart Animate.',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    color: '#666666',
    x: 40,
    y: 80
  });

  const createdComponents = [];
  const interactionsToWire = [];

  // =========================================================================
  // 1. BUTTON / UNIVERSAL CIRCLE (42x42px)
  // =========================================================================
  console.log('\n🔘 [2/9] Sinh Component 1: Button / Universal Circle (Default, Hover, Pressed)...');
  const btnCircleDefault = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Button / Universal Circle [Default]',
    width: 42,
    height: 42,
    cornerRadius: 21,
    x: 60,
    y: 160
  });
  await post('CREATE_TEXT', {
    parentId: btnCircleDefault.data.id,
    characters: '←',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#111111',
    x: 14,
    y: 10
  });

  const btnCircleHover = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Button / Universal Circle [Hover]',
    width: 42,
    height: 42,
    cornerRadius: 21,
    x: 130,
    y: 160
  });
  await post('CREATE_TEXT', {
    parentId: btnCircleHover.data.id,
    characters: '←',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#000000',
    x: 14,
    y: 10
  });

  const btnCirclePressed = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Button / Universal Circle [Pressed]',
    width: 38,
    height: 38,
    cornerRadius: 19,
    x: 200,
    y: 162
  });
  await post('CREATE_TEXT', {
    parentId: btnCirclePressed.data.id,
    characters: '←',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 13,
    y: 9
  });

  createdComponents.push(btnCircleDefault.data, btnCircleHover.data, btnCirclePressed.data);
  interactionsToWire.push(
    { src: btnCircleDefault.data.id, dst: btnCircleHover.data.id, trigger: 'ON_HOVER', dur: 0.18 },
    { src: btnCircleHover.data.id, dst: btnCirclePressed.data.id, trigger: 'ON_PRESS', dur: 0.10 }
  );

  // =========================================================================
  // 2. BUTTON / PRIMARY GLASS (345x48px)
  // =========================================================================
  console.log('🔘 [3/9] Sinh Component 2: Button / Primary Glass (Default, Hover, Pressed)...');
  const btnGlassDefault = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Button / Primary Glass [Default]',
    width: 345,
    height: 48,
    cornerRadius: 24,
    x: 60,
    y: 260
  });
  await post('CREATE_TEXT', {
    parentId: btnGlassDefault.data.id,
    characters: 'Xác Nhận & Đặt Lịch Tư Vấn  ✦',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'SemiBold',
    color: '#111111',
    x: 75,
    y: 15
  });

  const btnGlassHover = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Button / Primary Glass [Hover]',
    width: 345,
    height: 48,
    cornerRadius: 24,
    x: 440,
    y: 260
  });
  await post('CREATE_TEXT', {
    parentId: btnGlassHover.data.id,
    characters: 'Xác Nhận & Đặt Lịch Tư Vấn  ✦',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#000000',
    x: 75,
    y: 15
  });

  const btnGlassPressed = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Button / Primary Glass [Pressed]',
    width: 338,
    height: 46,
    cornerRadius: 23,
    x: 820,
    y: 261
  });
  await post('CREATE_TEXT', {
    parentId: btnGlassPressed.data.id,
    characters: 'Xác Nhận & Đặt Lịch Tư Vấn  ✦',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 71,
    y: 14
  });

  createdComponents.push(btnGlassDefault.data, btnGlassHover.data, btnGlassPressed.data);
  interactionsToWire.push(
    { src: btnGlassDefault.data.id, dst: btnGlassHover.data.id, trigger: 'ON_HOVER', dur: 0.18 },
    { src: btnGlassHover.data.id, dst: btnGlassPressed.data.id, trigger: 'ON_PRESS', dur: 0.10 }
  );

  // =========================================================================
  // 3. INPUT / GLASS SEARCH & FORM (345x52px)
  // =========================================================================
  console.log('🔘 [4/9] Sinh Component 3: Input / Glass Search Field (Default, Hover, Focused)...');
  const inputDefault = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Input / Glass Search Field [Default]',
    width: 345,
    height: 52,
    cornerRadius: 18,
    x: 60,
    y: 360
  });
  await post('CREATE_TEXT', {
    parentId: inputDefault.data.id,
    characters: '🔍  Tìm Tadao Ando, Biệt thự biển, Ba Vì...',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    color: '#888888',
    x: 20,
    y: 18
  });

  const inputHover = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Input / Glass Search Field [Hover]',
    width: 345,
    height: 52,
    cornerRadius: 18,
    x: 440,
    y: 360
  });
  await post('CREATE_TEXT', {
    parentId: inputHover.data.id,
    characters: '🔍  Tìm Tadao Ando, Biệt thự biển, Ba Vì...',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    color: '#333333',
    x: 20,
    y: 18
  });

  const inputFocused = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Input / Glass Search Field [Focused]',
    width: 345,
    height: 52,
    cornerRadius: 18,
    x: 820,
    y: 360
  });
  await post('CREATE_TEXT', {
    parentId: inputFocused.data.id,
    characters: '🔍  Tadao Ando Son Tra|',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#C5A880',
    x: 20,
    y: 18
  });

  createdComponents.push(inputDefault.data, inputHover.data, inputFocused.data);
  interactionsToWire.push(
    { src: inputDefault.data.id, dst: inputHover.data.id, trigger: 'ON_HOVER', dur: 0.15 },
    { src: inputHover.data.id, dst: inputFocused.data.id, trigger: 'ON_CLICK', dur: 0.15 }
  );

  // =========================================================================
  // 4. CHIP / FACETED FILTER (Cao 38px, bo 19px)
  // =========================================================================
  console.log('🔘 [5/9] Sinh Component 4: Chip / Faceted Filter (Unselected, Hover, Selected)...');
  const chipUnselected = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Chip / Faceted Filter [Unselected]',
    width: 120,
    height: 38,
    cornerRadius: 19,
    x: 60,
    y: 460
  });
  await post('CREATE_TEXT', {
    parentId: chipUnselected.data.id,
    characters: '🌊 Ven Biển',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#444444',
    x: 24,
    y: 11
  });

  const chipHover = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Chip / Faceted Filter [Hover]',
    width: 120,
    height: 38,
    cornerRadius: 19,
    x: 200,
    y: 460
  });
  await post('CREATE_TEXT', {
    parentId: chipHover.data.id,
    characters: '🌊 Ven Biển',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'SemiBold',
    color: '#111111',
    x: 24,
    y: 11
  });

  const chipSelected = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Chip / Faceted Filter [Selected]',
    width: 120,
    height: 38,
    cornerRadius: 19,
    x: 340,
    y: 460
  });
  await post('CREATE_TEXT', {
    parentId: chipSelected.data.id,
    characters: '✓ Ven Biển',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 24,
    y: 11
  });

  createdComponents.push(chipUnselected.data, chipHover.data, chipSelected.data);
  interactionsToWire.push(
    { src: chipUnselected.data.id, dst: chipHover.data.id, trigger: 'ON_HOVER', dur: 0.15 },
    { src: chipHover.data.id, dst: chipSelected.data.id, trigger: 'ON_CLICK', dur: 0.18 },
    { src: chipSelected.data.id, dst: chipUnselected.data.id, trigger: 'ON_CLICK', dur: 0.18 }
  );

  // =========================================================================
  // 5. TOGGLE / SWITCH PILL (50x30px)
  // =========================================================================
  console.log('🔘 [6/9] Sinh Component 5: Toggle / Switch Pill (Off, On)...');
  const toggleOff = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Toggle / Switch Pill [Off]',
    width: 50,
    height: 30,
    cornerRadius: 15,
    x: 60,
    y: 550
  });
  await post('CREATE_RECTANGLE', {
    parentId: toggleOff.data.id,
    name: 'Knob',
    width: 22,
    height: 22,
    cornerRadius: 11,
    color: '#888888',
    x: 4,
    y: 4
  });

  const toggleOn = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Toggle / Switch Pill [On]',
    width: 50,
    height: 30,
    cornerRadius: 15,
    x: 140,
    y: 550
  });
  await post('CREATE_RECTANGLE', {
    parentId: toggleOn.data.id,
    name: 'Knob',
    width: 22,
    height: 22,
    cornerRadius: 11,
    color: '#C5A880',
    x: 24,
    y: 4
  });

  createdComponents.push(toggleOff.data, toggleOn.data);
  interactionsToWire.push(
    { src: toggleOff.data.id, dst: toggleOn.data.id, trigger: 'ON_CLICK', dur: 0.22 },
    { src: toggleOn.data.id, dst: toggleOff.data.id, trigger: 'ON_CLICK', dur: 0.22 }
  );

  // =========================================================================
  // 6. DOCK / NAVIGATION ITEM (64x44px)
  // =========================================================================
  console.log('🔘 [7/9] Sinh Component 6: Dock / Navigation Item (Inactive, Hover, Active)...');
  const dockInactive = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Dock / Navigation Item [Inactive]',
    width: 64,
    height: 44,
    cornerRadius: 12,
    x: 60,
    y: 630
  });
  await post('CREATE_TEXT', {
    parentId: dockInactive.data.id,
    characters: '🏠\nKhám Phá',
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    color: '#888888',
    x: 10,
    y: 6
  });

  const dockHover = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Dock / Navigation Item [Hover]',
    width: 64,
    height: 44,
    cornerRadius: 12,
    x: 140,
    y: 630
  });
  await post('CREATE_TEXT', {
    parentId: dockHover.data.id,
    characters: '🏠\nKhám Phá',
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#111111',
    x: 10,
    y: 4
  });

  const dockActive = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Dock / Navigation Item [Active]',
    width: 64,
    height: 44,
    cornerRadius: 12,
    x: 220,
    y: 630
  });
  await post('CREATE_TEXT', {
    parentId: dockActive.data.id,
    characters: '🏠\nKhám Phá',
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 10,
    y: 4
  });
  await post('CREATE_RECTANGLE', {
    parentId: dockActive.data.id,
    name: 'Active Indicator',
    width: 16,
    height: 3,
    cornerRadius: 2,
    color: '#C5A880',
    x: 24,
    y: 38
  });

  createdComponents.push(dockInactive.data, dockHover.data, dockActive.data);
  interactionsToWire.push(
    { src: dockInactive.data.id, dst: dockHover.data.id, trigger: 'ON_HOVER', dur: 0.15 },
    { src: dockHover.data.id, dst: dockActive.data.id, trigger: 'ON_CLICK', dur: 0.18 }
  );

  // =========================================================================
  // 7. HOTSPOT / 360 SPATIAL MARKER (36x36px & HUD Popup)
  // =========================================================================
  console.log('🔘 [8/9] Sinh Component 7: Hotspot / 360 Spatial Marker (Default, Hover, Expanded)...');
  const hotspotDefault = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Hotspot / 360 Spatial Marker [Default]',
    width: 36,
    height: 36,
    cornerRadius: 18,
    x: 60,
    y: 720
  });
  await post('CREATE_TEXT', {
    parentId: hotspotDefault.data.id,
    characters: '◎',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#FFFFFF',
    x: 10,
    y: 6
  });

  const hotspotHover = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Hotspot / 360 Spatial Marker [Hover]',
    width: 36,
    height: 36,
    cornerRadius: 18,
    x: 120,
    y: 720
  });
  await post('CREATE_TEXT', {
    parentId: hotspotHover.data.id,
    characters: '◉',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 10,
    y: 6
  });

  const hotspotExpanded = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Hotspot / 360 Spatial Marker [Expanded HUD]',
    width: 180,
    height: 60,
    cornerRadius: 16,
    x: 180,
    y: 710
  });
  await post('CREATE_TEXT', {
    parentId: hotspotExpanded.data.id,
    characters: '🏛 Gian Chính Tadao Ando\nBê tông thô & Giếng trời 850m²',
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#111111',
    x: 12,
    y: 14
  });

  createdComponents.push(hotspotDefault.data, hotspotHover.data, hotspotExpanded.data);
  interactionsToWire.push(
    { src: hotspotDefault.data.id, dst: hotspotHover.data.id, trigger: 'ON_HOVER', dur: 0.18 },
    { src: hotspotHover.data.id, dst: hotspotExpanded.data.id, trigger: 'ON_CLICK', dur: 0.22 }
  );

  // =========================================================================
  // 8. CARD / ESTATE ITEM (345x380px)
  // =========================================================================
  console.log('🔘 [9/9] Sinh Component 8: Card / Estate Item (Default, Hover)...');
  const cardDefault = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Card / Estate Item [Default]',
    width: 345,
    height: 380,
    cornerRadius: 28,
    x: 60,
    y: 830
  });
  await post('CREATE_RECTANGLE', {
    parentId: cardDefault.data.id,
    name: 'Hero Image Preview',
    width: 345,
    height: 240,
    cornerRadius: 28,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000',
    x: 0,
    y: 0
  });
  await post('CREATE_TEXT', {
    parentId: cardDefault.data.id,
    characters: 'Dinh Thự The Glass Sanctuary',
    fontSize: 16,
    fontFamily: 'Cinzel',
    fontWeight: 'Bold',
    color: '#111111',
    x: 20,
    y: 260
  });
  await post('CREATE_TEXT', {
    parentId: cardDefault.data.id,
    characters: 'Vách Biển Sơn Trà • KTS Tadao Ando • 850 m²',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    color: '#666666',
    x: 20,
    y: 290
  });

  const cardHover = await post('CREATE_COMPONENT', {
    parentId: libId,
    name: 'Card / Estate Item [Hover]',
    width: 345,
    height: 380,
    cornerRadius: 28,
    x: 440,
    y: 830
  });
  await post('CREATE_RECTANGLE', {
    parentId: cardHover.data.id,
    name: 'Hero Image Preview',
    width: 345,
    height: 240,
    cornerRadius: 28,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000',
    x: 0,
    y: 0
  });
  await post('CREATE_TEXT', {
    parentId: cardHover.data.id,
    characters: 'Dinh Thự The Glass Sanctuary',
    fontSize: 16,
    fontFamily: 'Cinzel',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 20,
    y: 260
  });
  await post('CREATE_TEXT', {
    parentId: cardHover.data.id,
    characters: 'Vách Biển Sơn Trà • KTS Tadao Ando • 850 m²  →',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'SemiBold',
    color: '#111111',
    x: 20,
    y: 290
  });

  createdComponents.push(cardDefault.data, cardHover.data);
  interactionsToWire.push(
    { src: cardDefault.data.id, dst: cardHover.data.id, trigger: 'ON_HOVER', dur: 0.22 }
  );

  // =========================================================================
  // ÁP DỤNG GLASSMORPHISM LÊN TOÀN BỘ CÁC COMPONENT
  // =========================================================================
  console.log('\n🎨 Áp dụng hiệu ứng Glassmorphism 4 lớp lên các Component Master...');
  await post('STYLE_GLASSMORPHISM', {
    theme: 'light',
    blurRadius: 24,
    fillOpacity: 0.22
  });

  // =========================================================================
  // ĐẤU NỐI CÁC TƯƠNG TÁC VI MÔ (SMART ANIMATE)
  // =========================================================================
  console.log(`\n⚡ Bắt đầu đấu nối ${interactionsToWire.length} tương tác vi mô (ON_HOVER, ON_PRESS, ON_CLICK)...`);
  let wiredSuccess = 0;
  for (const item of interactionsToWire) {
    const res = await post('ADD_INTERACTION', {
      sourceNodeId: item.src,
      targetNodeId: item.dst,
      trigger: item.trigger,
      navigation: 'NAVIGATE',
      transitionType: 'SMART_ANIMATE',
      duration: item.dur || 0.18,
      easing: 'EASE_OUT'
    });
    if (res.success) {
      wiredSuccess++;
      console.log(`   ✅ Wired: ${item.trigger} (${item.dur}s) -> Dest: ${item.dst}`);
    } else {
      console.log(`   ⚠️ Wire warning:`, res.error);
    }
  }

  // =========================================================================
  // TẠO FLOW STARTING POINT CHO THƯ VIỆN COMPONENT
  // =========================================================================
  console.log('\n🧭 Tạo Flow Starting Point kiểm thử Interactive Components...');
  await post('CREATE_FLOW', {
    frameId: libId,
    flowName: '💎 ARKI — Thư Viện Master Interactive Components (Hover & Press)'
  });

  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log(`🎉 HOÀN TẤT TẠO THƯ VIỆN MASTER COMPONENT SYSTEM!`);
  console.log(`   - Tổng số Component/Variant đã tạo: ${createdComponents.length}`);
  console.log(`   - Tổng số Tương tác vi mô đã đấu nối: ${wiredSuccess}/${interactionsToWire.length}`);
  console.log(`   - Tọa độ Artboard Library: X: -3600, Y: 0 trên Figma Canvas`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
