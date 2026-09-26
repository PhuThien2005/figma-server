import http from 'http';

function post(action, params = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:8765/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

// High-resolution architectural photography for 360° multi-tier immersion
const PANORAMA_IMG_1 = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80'; // Living room, terrace & sky
const PANORAMA_IMG_2 = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80'; // Complementary oceanfront interior
const SKY_IMG = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80'; // Architectural skylight & cantilever canopy
const FLOOR_IMG = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=2000&q=80'; // Pool reflection & teak terrace

async function waitForConnection(maxRetries = 30) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await new Promise((resolve) => {
        http.get('http://localhost:8765/health', (r) => {
          let d = '';
          r.on('data', c => d += c);
          r.on('end', () => resolve(JSON.parse(d)));
        }).on('error', () => resolve({ figmaConnected: false }));
      });
      if (res.figmaConnected) return true;
    } catch (err) {}
    if (i % 5 === 0) console.log(`⏳ Đang chờ kết nối Figma Plugin... (${i}/${maxRetries}s). Hãy mở Figma và chọn Plugins > Development > AGY Figma Bridge (Ctrl+Alt+P).`);
    await new Promise(r => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  console.log('🌐 Building 360° Omnidirectional Panorama (Ngang, Dọc & Chéo Engine)...');

  const isConnected = await waitForConnection(60);
  if (!isConnected) {
    console.error('❌ Không thể kết nối tới Figma Plugin sau 60s. Vui lòng mở Figma Desktop và chạy plugin AGY Figma Bridge.');
    process.exit(1);
  }

  const doc = await post('GET_DOCUMENT_INFO');
  if (!doc || !doc.data || !doc.data.currentPage) {
    console.error('❌ Không lấy được thông tin document từ Figma:', doc ? doc.error : 'Unknown error');
    process.exit(1);
  }
  const existing11 = doc.data.currentPage.children.find(c => c.name.includes('11 - 360° Panorama') || c.name.includes('11 - 3D Matterport VR [Light]'));
  const posX = existing11 ? existing11.x : 1920;
  const posY = existing11 ? existing11.y : 8377;

  // 1. Delete old screen 11 if present
  if (existing11) {
    console.log(`🗑️ Replacing existing Screen 11 (${existing11.id})...`);
    await post('DELETE_NODE', { nodeId: existing11.id });
  }

  // 2. BUILD ROOT VIEWPORT FRAME (393 x 852 px, clipsContent: true)
  console.log('🏗️ Creating Root Frame (393 x 852 px, clipsContent: true)...');
  const frameRes = await post('CREATE_FRAME', {
    name: 'ARKI / 11 - 360° Panorama Street View [Light]',
    width: 393,
    height: 852,
    x: posX,
    y: posY,
    backgroundColor: '#07090E',
    cornerRadius: 44,
    clipsContent: true
  });
  const screenId = frameRes.data.id;
  console.log(`   ✅ Root Frame created: ${screenId}`);

  // 3. CREATE OMNIDIRECTIONAL SCROLL VIEWPORT (overflowDirection: BOTH)
  // In Figma: overflowDirection: 'BOTH' allows 2D free dragging (Left, Right, Up, Down, Diagonally)
  console.log('🌊 Creating Omnidirectional Viewport (overflowDirection: BOTH)...');
  const viewportRes = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'Panorama Omnidirectional Viewport (✢ 2D Panning)',
    width: 393,
    height: 852,
    x: 0,
    y: 0,
    backgroundColor: '#07090E',
    clipsContent: true,
    overflowDirection: 'BOTH'
  });
  const viewportId = viewportRes.data.id;

  // 4. PREPARE MULTI-TIER 360° CANVAS
  // Canvas dimensions: 3400px wide (horizontal 360) x 1800px tall (vertical tilt up/down)
  // Placed at x: -1500, y: -474 -> user starts centered at horizon eye-level (y: 474 to 1326)
  // Dragging DOWN -> user looks UP at the skylight and open sky (headroom: 474px)
  // Dragging UP -> user looks DOWN at the travertine terrace and pool (bottom range: 474px)
  // Dragging DIAGONALLY -> smooth 45° angle spatial navigation!
  console.log('🖼️ Building 3400 x 1800 px Omnidirectional Spatial Canvas...');
  const canvasRes = await post('CREATE_FRAME', {
    parentId: viewportId,
    name: '360° Spatial Canvas (3400x1800px - Drag ✢ Ngang Dọc Chéo)',
    width: 3400,
    height: 1800,
    x: -1500,
    y: -474,
    backgroundColor: '#07090E'
  });
  const canvasId = canvasRes.data.id;

  // --- TIER 1: SKY & CANOPY CEILING ZONE (Y: 0 -> 550) ---
  console.log('☁️ Adding Sky & Upper Skylight Tier (Y: 0 -> 550)...');
  await post('CREATE_RECTANGLE', {
    parentId: canvasId,
    name: 'Sky & Skylight Canopy (Nhìn Lên Trần)',
    width: 3400,
    height: 550,
    x: 0,
    y: 0,
    imageUrl: SKY_IMG
  });

  // Gradient transition from Sky to Horizon
  await post('CREATE_RECTANGLE', {
    parentId: canvasId,
    name: 'Atmospheric Horizon Fog Gradient',
    width: 3400,
    height: 120,
    x: 0,
    y: 450,
    fills: [
      { type: 'SOLID', color: { r: 0.05, g: 0.07, b: 0.12 }, opacity: 0.35 }
    ]
  });

  // --- TIER 2: EYE-LEVEL HORIZON PANORAMA STRIP (Y: 520 -> 1380) ---
  console.log('🏛️ Adding Eye-Level 360° Horizon Strip (Y: 520 -> 1380)...');
  // Tile A: 1700 x 860
  await post('CREATE_RECTANGLE', {
    parentId: canvasId,
    name: 'Panorama Tile A (Living Room & Ocean Horizon)',
    width: 1700,
    height: 860,
    x: 0,
    y: 520,
    imageUrl: PANORAMA_IMG_1
  });

  // Tile B: 1700 x 860 (Loop clone)
  await post('CREATE_RECTANGLE', {
    parentId: canvasId,
    name: 'Panorama Tile B (Grand Dining & Lounge)',
    width: 1700,
    height: 860,
    x: 1700,
    y: 520,
    imageUrl: PANORAMA_IMG_2
  });

  // --- TIER 3: POOL & TRAVERTINE FLOOR ZONE (Y: 1350 -> 1800) ---
  console.log('🏊 Adding Pool & Terrace Ground Tier (Y: 1350 -> 1800)...');
  await post('CREATE_RECTANGLE', {
    parentId: canvasId,
    name: 'Pool Water & Travertine Terrace (Nhìn Xuống Sàn)',
    width: 3400,
    height: 450,
    x: 0,
    y: 1350,
    imageUrl: FLOOR_IMG
  });

  // --- 5. INTERACTIVE 3D SPATIAL HOTSPOTS (Across 3 Elevation Levels) ---
  console.log('📍 Placing multi-elevation Spatial Hotspots...');

  // Hotspot 1: High Elevation (Y: 340) - Skylight / Helipad
  const hsHigh = await post('CREATE_FRAME', {
    parentId: canvasId,
    name: 'Hotspot / [Trên Cao] Bãi Đáp Trực Thăng & Trần Kính',
    width: 250,
    height: 40,
    x: 1580,
    y: 340,
    backgroundColor: '#0F172A',
    cornerRadius: 20,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    paddingLeft: 14,
    paddingRight: 14
  });
  await post('UPDATE_PROPERTIES', {
    nodeId: hsHigh.data.id,
    fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: 0.75 }],
    strokes: [{ type: 'SOLID', color: { r: 0.22, g: 0.74, b: 0.97 }, opacity: 0.8 }],
    strokeWeight: 1,
    effects: [
      { type: 'BACKGROUND_BLUR', radius: 16, visible: true },
      { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 4 }, radius: 12, spread: 0, visible: true, blendMode: 'NORMAL' }
    ]
  });
  await post('CREATE_TEXT', {
    parentId: hsHigh.data.id,
    name: 'Label',
    text: '🚁 Bãi Đáp Trực Thăng Tầng Mái',
    fontSize: 12,
    fontFamily: 'Inter',
    fontStyle: 'SemiBold',
    fillColor: '#38BDF8'
  });

  // Hotspot 2: Eye-Level Left (Y: 820) - Grand Atrium
  const hsAtrium = await post('CREATE_FRAME', {
    parentId: canvasId,
    name: 'Hotspot / [Tầm Mắt] Đại Sảnh Thông Tầng',
    width: 230,
    height: 40,
    x: 1480,
    y: 820,
    backgroundColor: '#0F172A',
    cornerRadius: 20,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    paddingLeft: 14,
    paddingRight: 14
  });
  await post('UPDATE_PROPERTIES', {
    nodeId: hsAtrium.data.id,
    fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: 0.75 }],
    strokes: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.4 }],
    strokeWeight: 1,
    effects: [
      { type: 'BACKGROUND_BLUR', radius: 16, visible: true },
      { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 4 }, radius: 12, spread: 0, visible: true, blendMode: 'NORMAL' }
    ]
  });
  await post('CREATE_TEXT', {
    parentId: hsAtrium.data.id,
    name: 'Label',
    text: '◉ Đại Sảnh Thông Tầng 7.2m',
    fontSize: 12,
    fontFamily: 'Inter',
    fontStyle: 'SemiBold',
    fillColor: '#FFFFFF'
  });

  // Hotspot 3: Eye-Level Right (Y: 820, X: 2150) - Boffi Kitchen
  const hsKitchen = await post('CREATE_FRAME', {
    parentId: canvasId,
    name: 'Hotspot / [Tầm Mắt] Bếp Đảo Boffi Vách Biển',
    width: 230,
    height: 40,
    x: 2150,
    y: 820,
    backgroundColor: '#0F172A',
    cornerRadius: 20,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    paddingLeft: 14,
    paddingRight: 14
  });
  await post('UPDATE_PROPERTIES', {
    nodeId: hsKitchen.data.id,
    fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: 0.75 }],
    strokes: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.4 }],
    strokeWeight: 1,
    effects: [
      { type: 'BACKGROUND_BLUR', radius: 16, visible: true },
      { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 4 }, radius: 12, spread: 0, visible: true, blendMode: 'NORMAL' }
    ]
  });
  await post('CREATE_TEXT', {
    parentId: hsKitchen.data.id,
    name: 'Label',
    text: '◉ Bếp Đảo Đá Cẩm Thạch Boffi',
    fontSize: 12,
    fontFamily: 'Inter',
    fontStyle: 'SemiBold',
    fillColor: '#FFFFFF'
  });

  // Hotspot 4: Low Elevation (Y: 1460) - Infinity Pool
  const hsLow = await post('CREATE_FRAME', {
    parentId: canvasId,
    name: 'Hotspot / [Dưới Thấp] Hồ Bơi Vô Cực 35m',
    width: 230,
    height: 40,
    x: 1600,
    y: 1460,
    backgroundColor: '#0F172A',
    cornerRadius: 20,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    paddingLeft: 14,
    paddingRight: 14
  });
  await post('UPDATE_PROPERTIES', {
    nodeId: hsLow.data.id,
    fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: 0.75 }],
    strokes: [{ type: 'SOLID', color: { r: 0.01, g: 0.52, b: 0.78 }, opacity: 0.8 }],
    strokeWeight: 1,
    effects: [
      { type: 'BACKGROUND_BLUR', radius: 16, visible: true },
      { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 4 }, radius: 12, spread: 0, visible: true, blendMode: 'NORMAL' }
    ]
  });
  await post('CREATE_TEXT', {
    parentId: hsLow.data.id,
    name: 'Label',
    text: '🏊 Hồ Bơi Nước Mặn 35m',
    fontSize: 12,
    fontFamily: 'Inter',
    fontStyle: 'SemiBold',
    fillColor: '#38BDF8'
  });

  // =========================================================================
  // 6. FIXED GLASSMORPHIC HUD LAYERS (Direct children of screen frame)
  // =========================================================================
  console.log('🪟 Adding Fixed Glassmorphic HUD Layers...');

  // 6.1 Status Bar
  const statusBar = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'Status Bar [Glass 360]',
    width: 393,
    height: 48,
    x: 0,
    y: 0,
    backgroundColor: 'transparent'
  });
  await post('CREATE_TEXT', { parentId: statusBar.data.id, name: 'Time', text: '9:41', fontSize: 14, fontFamily: 'Inter', fontStyle: 'Bold', fillColor: '#FFFFFF', x: 32, y: 14 });
  const island = await post('CREATE_FRAME', { parentId: statusBar.data.id, name: 'Dynamic Island', width: 120, height: 32, x: 136, y: 10, backgroundColor: '#000000', cornerRadius: 16 });
  await post('CREATE_TEXT', { parentId: statusBar.data.id, name: 'Icons', text: '5G  100%', fontSize: 12, fontFamily: 'Inter', fontStyle: 'Medium', fillColor: '#FFFFFF', x: 320, y: 15 });

  // 6.2 Universal Circular Frosted Glass Back Button (42x42px)
  const backBtn = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'Btn / Floating Back [360 Panorama]',
    width: 42,
    height: 42,
    x: 24,
    y: 54,
    cornerRadius: 21,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER'
  });
  await post('UPDATE_PROPERTIES', {
    nodeId: backBtn.data.id,
    primaryAxisSizingMode: 'FIXED',
    counterAxisSizingMode: 'FIXED',
    fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: 0.65 }],
    strokes: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.35 }],
    strokeWeight: 1,
    effects: [
      { type: 'BACKGROUND_BLUR', radius: 20, visible: true },
      { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.20 }, offset: { x: 0, y: 6 }, radius: 16, spread: 0, visible: true, blendMode: 'NORMAL' }
    ]
  });
  await post('CREATE_TEXT', {
    parentId: backBtn.data.id,
    name: 'Icon',
    text: '←',
    fontSize: 18,
    fontFamily: 'Inter',
    fontStyle: 'Bold',
    fillColor: '#FFFFFF',
    textAlignHorizontal: 'CENTER',
    textAlignVertical: 'CENTER'
  });

  // 6.3 Top Center Mode Badge: VR 360° OMNIDIRECTIONAL
  const topBadge = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'HUD / Top Badge (Omnidirectional Spatial)',
    width: 236,
    height: 38,
    x: 78,
    y: 56,
    cornerRadius: 19,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    paddingLeft: 12,
    paddingRight: 12
  });
  await post('UPDATE_PROPERTIES', {
    nodeId: topBadge.data.id,
    fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: 0.60 }],
    strokes: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.25 }],
    strokeWeight: 1,
    effects: [
      { type: 'BACKGROUND_BLUR', radius: 20, visible: true },
      { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.15 }, offset: { x: 0, y: 4 }, radius: 12, spread: 0, visible: true, blendMode: 'NORMAL' }
    ]
  });
  await post('CREATE_TEXT', {
    parentId: topBadge.data.id,
    name: 'Badge Text',
    text: '🌐 360° ĐA HƯỚNG • 4K SPATIAL',
    fontSize: 11,
    fontFamily: 'Inter',
    fontStyle: 'Bold',
    fillColor: '#38BDF8'
  });

  // 6.4 Compass Indicator (Góc phải trên)
  const compassBtn = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'HUD / Compass Indicator',
    width: 42,
    height: 42,
    x: 327,
    y: 54,
    cornerRadius: 21,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER'
  });
  await post('UPDATE_PROPERTIES', {
    nodeId: compassBtn.data.id,
    primaryAxisSizingMode: 'FIXED',
    counterAxisSizingMode: 'FIXED',
    fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: 0.65 }],
    strokes: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.35 }],
    strokeWeight: 1,
    effects: [
      { type: 'BACKGROUND_BLUR', radius: 20, visible: true }
    ]
  });
  await post('CREATE_TEXT', {
    parentId: compassBtn.data.id,
    name: 'Compass Icon',
    text: '🧭',
    fontSize: 18,
    fontFamily: 'Inter',
    fontStyle: 'Bold',
    fillColor: '#FFFFFF'
  });

  // 6.5 Bottom Omnidirectional Gesture Guide Card (Glassmorphism)
  const bottomCard = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'HUD / Bottom Omnidirectional Gesture Card',
    width: 353,
    height: 100,
    x: 20,
    y: 720,
    cornerRadius: 24,
    layoutMode: 'VERTICAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    itemSpacing: 6
  });
  await post('UPDATE_PROPERTIES', {
    nodeId: bottomCard.data.id,
    fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: 0.78 }],
    strokes: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.30 }],
    strokeWeight: 1,
    effects: [
      { type: 'BACKGROUND_BLUR', radius: 28, visible: true },
      { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 10 }, radius: 25, spread: 0, visible: true, blendMode: 'NORMAL' }
    ]
  });
  await post('CREATE_TEXT', {
    parentId: bottomCard.data.id,
    name: 'Title',
    text: '✢ Kéo Đa Hướng (Lên • Xuống • Ngang • Chéo)',
    fontSize: 13,
    fontFamily: 'Inter',
    fontStyle: 'Bold',
    fillColor: '#FFFFFF',
    textAlignHorizontal: 'CENTER'
  });
  await post('CREATE_TEXT', {
    parentId: bottomCard.data.id,
    name: 'Subtitle',
    text: 'Chuẩn Google Street View 360° • Xoay trần, sàn và mọi góc độ',
    fontSize: 11,
    fontFamily: 'Inter',
    fontStyle: 'Regular',
    fillColor: '#94A3B8',
    textAlignHorizontal: 'CENTER'
  });

  // =========================================================================
  // 7. PROTOTYPE LINKING & FLOW REGISTRATION
  // =========================================================================
  console.log('🔗 Wiring Prototype Interactions & Flow Starting Point...');

  // Flow Starting Point: 360° Omnidirectional Street View
  await post('CREATE_FLOW', {
    nodeId: screenId,
    name: '🌐 ARKI — 360° Panorama Đa Hướng (Kéo Ngang, Dọc & Chéo)'
  });

  // Find Screen 09 Light
  const docAfter = await post('GET_DOCUMENT_INFO');
  const screen09 = docAfter.data.currentPage.children.find(c => c.name.includes('09 - Property Details (Tadao Ando) [Light]'));

  if (screen09) {
    // 1. Back button returns to Screen 09
    await post('LINK_TRANSITION', {
      sourceNodeId: backBtn.data.id,
      targetNodeId: screen09.id,
      trigger: 'ON_CLICK',
      action: 'NAVIGATE',
      transitionType: 'SLIDE_OUT',
      direction: 'LEFT',
      duration: 0.3,
      easing: 'EASE_OUT'
    });
    console.log('   ✅ Back button wired to Screen 09!');

    // 2. Button "🥽 Không Gian 3D" on Screen 09 opens Screen 11
    const vrBtn09 = (screen09.children || []).find(c => c.name.toLowerCase().includes('không gian 3d') || c.name.includes('Btn / VR'));
    if (vrBtn09) {
      await post('LINK_TRANSITION', {
        sourceNodeId: vrBtn09.id,
        targetNodeId: screenId,
        trigger: 'ON_CLICK',
        action: 'NAVIGATE',
        transitionType: 'SMART_ANIMATE',
        duration: 0.4,
        easing: 'EASE_OUT'
      });
      console.log('   ✅ Screen 09 "🥽 Không Gian 3D" wired to Screen 11!');
    }
  }

  console.log('🎉 360° Omnidirectional Panorama Screen successfully created and wired!');
}

main().catch(console.error);
