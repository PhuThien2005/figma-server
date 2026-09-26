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

const PANORAMA_IMG_1 = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80'; // Ultra-wide living room & terrace
const PANORAMA_IMG_2 = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80'; // Wide architectural interior

async function main() {
  console.log('🌐 Building 360° Panorama Street View (Horizontal Scroll Engine)...');

  // Find existing Screen 11 Light coordinates or default to x: 1920, y: 8377
  const doc = await post('GET_DOCUMENT_INFO');
  const existing11 = doc.data.currentPage.children.find(c => c.name === 'ARKI / 11 - 3D Matterport VR [Light]');
  const posX = existing11 ? existing11.x : 1920;
  const posY = existing11 ? existing11.y : 8377;

  // 1. Delete old screen 11 if present
  if (existing11) {
    console.log(`🗑️ Replacing old Screen 11 [Light] (${existing11.id})...`);
    await post('DELETE_NODE', { nodeId: existing11.id });
  }

  // 2. BUILD NEW SCREEN 11: 360° PANORAMA STREET VIEW
  console.log('🏗️ Creating Viewport Frame (393 x 852 px, clipsContent: true)...');
  const frameRes = await post('CREATE_FRAME', {
    name: 'ARKI / 11 - 360° Panorama Street View [Light]',
    width: 393,
    height: 852,
    x: posX,
    y: posY,
    backgroundColor: '#0F172A',
    cornerRadius: 44,
    clipsContent: true
  });
  const screenId = frameRes.data.id;
  console.log(`   ✅ Root Frame created: ${screenId}`);

  // 3. CREATE HORIZONTAL SCROLL VIEWPORT FRAME
  // In Figma: A Frame with overflowDirection: 'HORIZONTAL' allows dragging wide content inside
  console.log('🌊 Creating Horizontal Scroll Viewport (overflowDirection: HORIZONTAL)...');
  const viewportRes = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'Panorama Scroll Viewport',
    width: 393,
    height: 852,
    x: 0,
    y: 0,
    backgroundColor: '#0F172A',
    clipsContent: true,
    overflowDirection: 'HORIZONTAL'
  });
  const viewportId = viewportRes.data.id;

  // 4. PREPARE SEAMLESS PANORAMA STRIP (Ảnh A ghép nối tiếp ảnh A để xoay mượt không đứt đoạn)
  console.log('🖼️ Placing 3400px seamless panorama strip inside viewport...');
  // Container for strip: width 3400, height 852, placed at x: -1000 so user can drag both Left & Right
  const stripContainerRes = await post('CREATE_FRAME', {
    parentId: viewportId,
    name: 'Panorama Seamless Strip (Drag ↔)',
    width: 3400,
    height: 852,
    x: -1000,
    y: 0,
    backgroundColor: '#0F172A'
  });
  const stripId = stripContainerRes.data.id;

  // Tile A: 1700 x 852
  await post('CREATE_RECTANGLE', {
    parentId: stripId,
    name: 'Panorama Tile A (Living Room & Glass Horizon)',
    width: 1700,
    height: 852,
    x: 0,
    y: 0,
    imageUrl: PANORAMA_IMG_1
  });

  // Tile B (Seamless clone of Tile A / complementary angle): 1700 x 852
  await post('CREATE_RECTANGLE', {
    parentId: stripId,
    name: 'Panorama Tile B (Seamless Loop Clone)',
    width: 1700,
    height: 852,
    x: 1700,
    y: 0,
    imageUrl: PANORAMA_IMG_2
  });

  // Hotspot Marker 1 inside panorama (moves with camera drag)
  const pin1 = await post('CREATE_FRAME', {
    parentId: stripId,
    name: 'Hotspot / Living Room',
    width: 200,
    height: 38,
    x: 450,
    y: 380,
    backgroundColor: '#0284C7DD',
    cornerRadius: 19
  });
  await post('CREATE_TEXT', {
    parentId: pin1.data.id,
    text: '◉ Đại Sảnh Thông Tầng',
    fontSize: 12,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 18,
    y: 11
  });

  // Hotspot Marker 2 inside panorama (moves with camera drag)
  const pin2 = await post('CREATE_FRAME', {
    parentId: stripId,
    name: 'Hotspot / Infinity Pool',
    width: 200,
    height: 38,
    x: 1200,
    y: 420,
    backgroundColor: '#059669DD',
    cornerRadius: 19
  });
  await post('CREATE_TEXT', {
    parentId: pin2.data.id,
    text: '◉ Hồ Bơi Vô Cực 35m',
    fontSize: 12,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 18,
    y: 11
  });

  // Hotspot Marker 3 inside panorama (tile B)
  const pin3 = await post('CREATE_FRAME', {
    parentId: stripId,
    name: 'Hotspot / Heli-pad Terrace',
    width: 200,
    height: 38,
    x: 2150,
    y: 360,
    backgroundColor: '#D97706DD',
    cornerRadius: 19
  });
  await post('CREATE_TEXT', {
    parentId: pin3.data.id,
    text: '◉ Bãi Đáp Trực Thăng',
    fontSize: 12,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 18,
    y: 11
  });

  // 5. HUD & CONTROLS (Fixed on screenId, above viewport so they don't scroll)
  console.log('🎛️ Adding fixed HUD & Street View navigation controls...');

  // Status Bar
  const statusBar = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'Status Bar',
    width: 393,
    height: 48,
    x: 0,
    y: 0,
    backgroundColor: '#00000000'
  });
  await post('CREATE_TEXT', { parentId: statusBar.data.id, text: '9:41', fontSize: 14, fontStyle: 'Bold', color: '#FFFFFF', x: 32, y: 14 });
  await post('CREATE_FRAME', { parentId: statusBar.data.id, name: 'Dynamic Island', width: 120, height: 32, x: 136, y: 10, backgroundColor: '#000000', cornerRadius: 16 });
  await post('CREATE_TEXT', { parentId: statusBar.data.id, text: '5G  100%', fontSize: 12, color: '#FFFFFF', x: 320, y: 15 });

  // Floating Frosted Glass Back Button
  const backBtn = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'Btn / Floating Back [360 Panorama]',
    width: 42,
    height: 42,
    x: 24,
    y: 54,
    backgroundColor: '#0F172ACC',
    cornerRadius: 21
  });
  await post('CREATE_TEXT', { parentId: backBtn.data.id, text: '←', fontSize: 18, fontStyle: 'Bold', color: '#FFFFFF', x: 14, y: 10 });

  // Top Pill Header Badge
  const badgeFrame = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'Header / 360 Street View Badge',
    width: 295,
    height: 42,
    x: 74,
    y: 54,
    backgroundColor: '#0F172ACC',
    cornerRadius: 21
  });
  await post('CREATE_TEXT', {
    parentId: badgeFrame.data.id,
    text: '🌐 360° PANORAMA STREET VIEW',
    fontSize: 12,
    fontStyle: 'Bold',
    color: '#38BDF8',
    x: 22,
    y: 13
  });

  // Bottom Instruction HUD Card
  const hudCard = await post('CREATE_FRAME', {
    parentId: screenId,
    name: 'HUD / Drag Instruction Bar',
    width: 345,
    height: 94,
    x: 24,
    y: 724,
    backgroundColor: '#0F172AEE',
    cornerRadius: 20
  });

  await post('CREATE_TEXT', {
    parentId: hudCard.data.id,
    text: '↔  Kéo chuột qua lại để xoay 360°',
    fontSize: 14,
    fontStyle: 'Bold',
    color: '#F8FAFC',
    x: 20,
    y: 18
  });

  await post('CREATE_TEXT', {
    parentId: hudCard.data.id,
    text: 'Chuẩn Google Street View • Ghép nối 2 ảnh liền kề mượt mà',
    fontSize: 11,
    color: '#94A3B8',
    x: 20,
    y: 42
  });

  // Mini VR toggle inside HUD
  const vrPill = await post('CREATE_FRAME', {
    parentId: hudCard.data.id,
    name: 'Btn / Apple Vision Pro VR',
    width: 175,
    height: 24,
    x: 20,
    y: 62,
    backgroundColor: '#1E293B',
    cornerRadius: 12
  });
  await post('CREATE_TEXT', {
    parentId: vrPill.data.id,
    text: '🥽 Apple Vision Pro Sẵn Sàng',
    fontSize: 10,
    color: '#38BDF8',
    x: 10,
    y: 5
  });

  // 6. PROTOTYPE WIRING
  console.log('🔗 Wiring prototype interactions...');

  // Back button -> Screen 09
  const screen09 = doc.data.currentPage.children.find(c => c.name.includes('09 - Property Details (Tadao Ando) [Light]'));
  if (screen09) {
    await post('ADD_INTERACTION', {
      sourceNodeId: backBtn.data.id,
      targetNodeId: screen09.id,
      trigger: 'ON_CLICK',
      transitionType: 'SLIDE_OUT',
      direction: 'RIGHT',
      duration: 0.3
    });
    console.log('   ✅ Back button linked to Screen 09.');

    // Screen 09 '🥽 Không Gian 3D' -> Screen 11
    const btn3D = await post('ADD_INTERACTION', {
      sourceNodeId: 'Btn / VR [09 - Property Details (Tadao Ando)] [Light]',
      targetNodeId: screenId,
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    });
    console.log('   ✅ Screen 09 3D button linked to 360 Panorama Viewport.');
  }

  // 7. CREATE / UPDATE FLOW STARTING POINT
  console.log('🏁 Creating Flow Starting Point for 360 Panorama...');
  await post('CREATE_FLOW', {
    frameId: screenId,
    flowName: '🌐 ARKI — 360° Panorama Street View (Kéo Qua Lại Như Street View)'
  });

  console.log('\n🎉 360° PANORAMA STREET VIEW BUILT SUCCESSFULLY!');
  console.log(`   - Screen: ARKI / 11 - 360° Panorama Street View [Light] (${screenId})`);
  console.log(`   - Horizontal Scroll Viewport: ${viewportId} (overflowDirection: HORIZONTAL)`);
  console.log(`   - Panorama Strip: 3400px wide (2 seamless tiled images + 3 spatial hotspots)`);
  console.log(`   - Flow Starting Point: "🌐 ARKI — 360° Panorama Street View (Kéo Qua Lại Như Street View)"`);
}

main().catch(console.error);
