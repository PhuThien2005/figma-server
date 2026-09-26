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
  console.log('💎 ARKI DESIGN SYSTEM: BUILD MASTER INTERACTIVE COMPONENTS SYSTEM');
  console.log('   Theo Chuẩn SKILL: .agents/skills/figma-interactive-components/SKILL.md');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const baseX = -2200;
  let startY = 0;

  const components = [];
  const wires = [];

  // =========================================================================
  // 1. BUTTON / UNIVERSAL CIRCLE (42x42px) — DEFAULT, HOVER, PRESSED
  // =========================================================================
  console.log('🔘 [1/8] Xây dựng Component Set: Button / Universal Circle (42x42px)...');
  const btnCircleDef = await post('CREATE_COMPONENT', {
    name: 'CMP / Button Universal Circle [Default]',
    width: 42,
    height: 42,
    cornerRadius: 21,
    x: baseX,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: btnCircleDef.data.id,
    characters: '←',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#111111',
    x: 14,
    y: 10
  });

  const btnCircleHov = await post('CREATE_COMPONENT', {
    name: 'CMP / Button Universal Circle [Hover]',
    width: 42,
    height: 42,
    cornerRadius: 21,
    x: baseX + 80,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: btnCircleHov.data.id,
    characters: '←',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 14,
    y: 10
  });

  const btnCirclePre = await post('CREATE_COMPONENT', {
    name: 'CMP / Button Universal Circle [Pressed]',
    width: 38,
    height: 38,
    cornerRadius: 19,
    x: baseX + 160,
    y: startY + 2
  });
  await post('CREATE_TEXT', {
    parentId: btnCirclePre.data.id,
    characters: '←',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#111111',
    x: 13,
    y: 9
  });

  components.push(btnCircleDef.data, btnCircleHov.data, btnCirclePre.data);
  wires.push(
    { src: btnCircleDef.data.id, dst: btnCircleHov.data.id, trigger: 'ON_HOVER', dur: 0.18 },
    { src: btnCircleHov.data.id, dst: btnCirclePre.data.id, trigger: 'ON_PRESS', dur: 0.10 }
  );

  // =========================================================================
  // 2. BUTTON / PRIMARY GLASS (345x48px) — DEFAULT, HOVER, PRESSED
  // =========================================================================
  startY += 100;
  console.log('🔘 [2/8] Xây dựng Component Set: Button / Primary Glass (345x48px)...');
  const btnGlassDef = await post('CREATE_COMPONENT', {
    name: 'CMP / Button Primary Glass [Default]',
    width: 345,
    height: 48,
    cornerRadius: 24,
    x: baseX,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: btnGlassDef.data.id,
    characters: 'Xác Nhận & Đặt Lịch Tư Vấn  ✦',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'SemiBold',
    color: '#111111',
    x: 75,
    y: 15
  });

  const btnGlassHov = await post('CREATE_COMPONENT', {
    name: 'CMP / Button Primary Glass [Hover]',
    width: 345,
    height: 48,
    cornerRadius: 24,
    x: baseX + 380,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: btnGlassHov.data.id,
    characters: 'Xác Nhận & Đặt Lịch Tư Vấn  ✦',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#000000',
    x: 75,
    y: 15
  });

  const btnGlassPre = await post('CREATE_COMPONENT', {
    name: 'CMP / Button Primary Glass [Pressed]',
    width: 338,
    height: 46,
    cornerRadius: 23,
    x: baseX + 760,
    y: startY + 1
  });
  await post('CREATE_TEXT', {
    parentId: btnGlassPre.data.id,
    characters: 'Xác Nhận & Đặt Lịch Tư Vấn  ✦',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 71,
    y: 14
  });

  components.push(btnGlassDef.data, btnGlassHov.data, btnGlassPre.data);
  wires.push(
    { src: btnGlassDef.data.id, dst: btnGlassHov.data.id, trigger: 'ON_HOVER', dur: 0.18 },
    { src: btnGlassHov.data.id, dst: btnGlassPre.data.id, trigger: 'ON_PRESS', dur: 0.10 }
  );

  // =========================================================================
  // 3. INPUT / GLASS SEARCH FIELD (345x52px) — DEFAULT, HOVER, FOCUSED
  // =========================================================================
  startY += 110;
  console.log('🔘 [3/8] Xây dựng Component Set: Input / Glass Search Field (Default, Hover, Focused)...');
  const inputDef = await post('CREATE_COMPONENT', {
    name: 'CMP / Input Glass Search Field [Default]',
    width: 345,
    height: 52,
    cornerRadius: 18,
    x: baseX,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: inputDef.data.id,
    characters: '🔍  Tìm Tadao Ando, Biệt thự biển, Ba Vì...',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    color: '#888888',
    x: 20,
    y: 18
  });

  const inputHov = await post('CREATE_COMPONENT', {
    name: 'CMP / Input Glass Search Field [Hover]',
    width: 345,
    height: 52,
    cornerRadius: 18,
    x: baseX + 380,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: inputHov.data.id,
    characters: '🔍  Tìm Tadao Ando, Biệt thự biển, Ba Vì...',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    color: '#222222',
    x: 20,
    y: 18
  });

  const inputFoc = await post('CREATE_COMPONENT', {
    name: 'CMP / Input Glass Search Field [Focused]',
    width: 345,
    height: 52,
    cornerRadius: 18,
    x: baseX + 760,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: inputFoc.data.id,
    characters: '🔍  Tadao Ando Son Tra|',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#C5A880',
    x: 20,
    y: 18
  });

  components.push(inputDef.data, inputHov.data, inputFoc.data);
  wires.push(
    { src: inputDef.data.id, dst: inputHov.data.id, trigger: 'ON_HOVER', dur: 0.15 },
    { src: inputHov.data.id, dst: inputFoc.data.id, trigger: 'ON_CLICK', dur: 0.15 }
  );

  // =========================================================================
  // 4. CHIP / FACETED FILTER (Cao 38px) — UNSELECTED, HOVER, SELECTED
  // =========================================================================
  startY += 110;
  console.log('🔘 [4/8] Xây dựng Component Set: Chip / Faceted Filter (Unselected, Hover, Selected)...');
  const chipUnsel = await post('CREATE_COMPONENT', {
    name: 'CMP / Chip Faceted Filter [Unselected]',
    width: 120,
    height: 38,
    cornerRadius: 19,
    x: baseX,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: chipUnsel.data.id,
    characters: '🌊 Ven Biển',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#555555',
    x: 24,
    y: 11
  });

  const chipHov = await post('CREATE_COMPONENT', {
    name: 'CMP / Chip Faceted Filter [Hover]',
    width: 120,
    height: 38,
    cornerRadius: 19,
    x: baseX + 150,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: chipHov.data.id,
    characters: '🌊 Ven Biển',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'SemiBold',
    color: '#111111',
    x: 24,
    y: 11
  });

  const chipSel = await post('CREATE_COMPONENT', {
    name: 'CMP / Chip Faceted Filter [Selected]',
    width: 120,
    height: 38,
    cornerRadius: 19,
    x: baseX + 300,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: chipSel.data.id,
    characters: '✓ Ven Biển',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 24,
    y: 11
  });

  components.push(chipUnsel.data, chipHov.data, chipSel.data);
  wires.push(
    { src: chipUnsel.data.id, dst: chipHov.data.id, trigger: 'ON_HOVER', dur: 0.15 },
    { src: chipHov.data.id, dst: chipSel.data.id, trigger: 'ON_CLICK', dur: 0.18 },
    { src: chipSel.data.id, dst: chipUnsel.data.id, trigger: 'ON_CLICK', dur: 0.18 }
  );

  // =========================================================================
  // 5. TOGGLE / SWITCH PILL (50x30px) — OFF, ON
  // =========================================================================
  startY += 100;
  console.log('🔘 [5/8] Xây dựng Component Set: Toggle / Switch Pill (Off, On)...');
  const toggleOff = await post('CREATE_COMPONENT', {
    name: 'CMP / Toggle Switch Pill [Off]',
    width: 50,
    height: 30,
    cornerRadius: 15,
    x: baseX,
    y: startY
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
    name: 'CMP / Toggle Switch Pill [On]',
    width: 50,
    height: 30,
    cornerRadius: 15,
    x: baseX + 80,
    y: startY
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

  components.push(toggleOff.data, toggleOn.data);
  wires.push(
    { src: toggleOff.data.id, dst: toggleOn.data.id, trigger: 'ON_CLICK', dur: 0.22 },
    { src: toggleOn.data.id, dst: toggleOff.data.id, trigger: 'ON_CLICK', dur: 0.22 }
  );

  // =========================================================================
  // 6. DOCK / NAVIGATION ITEM (64x44px) — INACTIVE, HOVER, ACTIVE
  // =========================================================================
  startY += 90;
  console.log('🔘 [6/8] Xây dựng Component Set: Dock / Navigation Item (Inactive, Hover, Active)...');
  const dockInact = await post('CREATE_COMPONENT', {
    name: 'CMP / Dock Navigation Item [Inactive]',
    width: 64,
    height: 44,
    cornerRadius: 12,
    x: baseX,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: dockInact.data.id,
    characters: '🏠\nKhám Phá',
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    color: '#888888',
    x: 10,
    y: 6
  });

  const dockHov = await post('CREATE_COMPONENT', {
    name: 'CMP / Dock Navigation Item [Hover]',
    width: 64,
    height: 44,
    cornerRadius: 12,
    x: baseX + 90,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: dockHov.data.id,
    characters: '🏠\nKhám Phá',
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#111111',
    x: 10,
    y: 4
  });

  const dockAct = await post('CREATE_COMPONENT', {
    name: 'CMP / Dock Navigation Item [Active]',
    width: 64,
    height: 44,
    cornerRadius: 12,
    x: baseX + 180,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: dockAct.data.id,
    characters: '🏠\nKhám Phá',
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 10,
    y: 4
  });
  await post('CREATE_RECTANGLE', {
    parentId: dockAct.data.id,
    name: 'Active Pill',
    width: 16,
    height: 3,
    cornerRadius: 2,
    color: '#C5A880',
    x: 24,
    y: 38
  });

  components.push(dockInact.data, dockHov.data, dockAct.data);
  wires.push(
    { src: dockInact.data.id, dst: dockHov.data.id, trigger: 'ON_HOVER', dur: 0.15 },
    { src: dockHov.data.id, dst: dockAct.data.id, trigger: 'ON_CLICK', dur: 0.18 }
  );

  // =========================================================================
  // 7. HOTSPOT / 360 SPATIAL MARKER — DEFAULT, HOVER, EXPANDED HUD
  // =========================================================================
  startY += 100;
  console.log('🔘 [7/8] Xây dựng Component Set: Hotspot / 360 Spatial Marker (Default, Hover, Expanded)...');
  const hotDef = await post('CREATE_COMPONENT', {
    name: 'CMP / Hotspot Spatial Marker [Default]',
    width: 36,
    height: 36,
    cornerRadius: 18,
    x: baseX,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: hotDef.data.id,
    characters: '◎',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#FFFFFF',
    x: 10,
    y: 6
  });

  const hotHov = await post('CREATE_COMPONENT', {
    name: 'CMP / Hotspot Spatial Marker [Hover]',
    width: 36,
    height: 36,
    cornerRadius: 18,
    x: baseX + 80,
    y: startY
  });
  await post('CREATE_TEXT', {
    parentId: hotHov.data.id,
    characters: '◉',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 10,
    y: 6
  });

  const hotExp = await post('CREATE_COMPONENT', {
    name: 'CMP / Hotspot Spatial Marker [Expanded HUD]',
    width: 180,
    height: 60,
    cornerRadius: 16,
    x: baseX + 160,
    y: startY - 12
  });
  await post('CREATE_TEXT', {
    parentId: hotExp.data.id,
    characters: '🏛 Gian Chính Tadao Ando\nBê tông thô & Giếng trời 850m²',
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    color: '#111111',
    x: 12,
    y: 14
  });

  components.push(hotDef.data, hotHov.data, hotExp.data);
  wires.push(
    { src: hotDef.data.id, dst: hotHov.data.id, trigger: 'ON_HOVER', dur: 0.18 },
    { src: hotHov.data.id, dst: hotExp.data.id, trigger: 'ON_CLICK', dur: 0.22 }
  );

  // =========================================================================
  // 8. CARD / ESTATE ITEM (345x380px) — DEFAULT, HOVER
  // =========================================================================
  startY += 120;
  console.log('🔘 [8/8] Xây dựng Component Set: Card / Estate Item (Default, Hover)...');
  const cardDef = await post('CREATE_COMPONENT', {
    name: 'CMP / Card Estate Item [Default]',
    width: 345,
    height: 380,
    cornerRadius: 28,
    x: baseX,
    y: startY
  });
  await post('CREATE_RECTANGLE', {
    parentId: cardDef.data.id,
    name: 'Hero Image Preview',
    width: 345,
    height: 240,
    cornerRadius: 28,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000',
    x: 0,
    y: 0
  });
  await post('CREATE_TEXT', {
    parentId: cardDef.data.id,
    characters: 'Dinh Thự The Glass Sanctuary',
    fontSize: 16,
    fontFamily: 'Cinzel',
    fontWeight: 'Bold',
    color: '#111111',
    x: 20,
    y: 260
  });
  await post('CREATE_TEXT', {
    parentId: cardDef.data.id,
    characters: 'Vách Biển Sơn Trà • KTS Tadao Ando • 850 m²',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    color: '#666666',
    x: 20,
    y: 290
  });

  const cardHov = await post('CREATE_COMPONENT', {
    name: 'CMP / Card Estate Item [Hover]',
    width: 345,
    height: 380,
    cornerRadius: 28,
    x: baseX + 380,
    y: startY
  });
  await post('CREATE_RECTANGLE', {
    parentId: cardHov.data.id,
    name: 'Hero Image Preview',
    width: 345,
    height: 240,
    cornerRadius: 28,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000',
    x: 0,
    y: 0
  });
  await post('CREATE_TEXT', {
    parentId: cardHov.data.id,
    characters: 'Dinh Thự The Glass Sanctuary',
    fontSize: 16,
    fontFamily: 'Cinzel',
    fontWeight: 'Bold',
    color: '#C5A880',
    x: 20,
    y: 260
  });
  await post('CREATE_TEXT', {
    parentId: cardHov.data.id,
    characters: 'Vách Biển Sơn Trà • KTS Tadao Ando • 850 m²  →',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'SemiBold',
    color: '#111111',
    x: 20,
    y: 290
  });

  components.push(cardDef.data, cardHov.data);
  wires.push(
    { src: cardDef.data.id, dst: cardHov.data.id, trigger: 'ON_HOVER', dur: 0.22 }
  );

  // =========================================================================
  // ÁP DỤNG HIỆU ỨNG GLASSMORPHISM LÊN CÁC COMPONENT
  // =========================================================================
  console.log('\n🎨 Áp dụng chuẩn hiệu ứng Glassmorphism 4 lớp...');
  await post('STYLE_GLASSMORPHISM', {
    theme: 'light',
    blurRadius: 24,
    fillOpacity: 0.22
  });

  // =========================================================================
  // ĐẤU NỐI TOÀN BỘ CÁC TƯƠNG TÁC VI MÔ (SMART ANIMATE)
  // =========================================================================
  console.log(`\n⚡ Đang kích hoạt & đấu nối ${wires.length} liên kết tương tác vi mô...`);
  let wiredCount = 0;
  for (const w of wires) {
    const res = await post('ADD_INTERACTION', {
      sourceNodeId: w.src,
      targetNodeId: w.dst,
      trigger: w.trigger,
      navigation: 'NAVIGATE',
      transitionType: 'SMART_ANIMATE',
      duration: w.dur,
      easing: 'EASE_OUT'
    });
    if (res.success) {
      wiredCount++;
      console.log(`   ✅ Wired: ${w.trigger} (${w.dur}s) -> ${w.src} => ${w.dst}`);
    } else {
      console.log(`   ⚠️ Lỗi wire:`, res);
    }
  }

  // =========================================================================
  // TẠO FLOW STARTING POINT CHO THƯ VIỆN COMPONENT
  // =========================================================================
  console.log('\n🧭 Thiết lập Flow Starting Point cho Master Component System...');
  await post('CREATE_FLOW', {
    frameId: btnCircleDef.data.id,
    flowName: '💎 ARKI — Master Interactive Components System (Hover, Press & Focus)'
  });

  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log('🏆 HOÀN THÀNH XÂY DỰNG MASTER INTERACTIVE SYSTEM!');
  console.log(`   - Tổng số Component Variants được tạo: ${components.length}`);
  console.log(`   - Tổng số Micro-interactions đã đấu nối thành công: ${wiredCount}/${wires.length}`);
  console.log(`   - Tọa độ Master Library trên Canvas: X: ${baseX}, Y: 0`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
