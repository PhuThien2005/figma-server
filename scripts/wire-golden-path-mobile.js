import http from 'http';
import fs from 'fs';

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
    req.on('error', reject);
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function wire() {
  console.log('🔗 Wiring up Golden Path (18 Mobile Screens) in Figma Prototyping...');

  let refs = {};
  if (fs.existsSync('golden-path-refs.json')) {
    refs = JSON.parse(fs.readFileSync('golden-path-refs.json', 'utf8'));
    console.log(`Loaded ${Object.keys(refs).length} refs from golden-path-refs.json`);
  } else {
    console.log('⚠️ golden-path-refs.json not found, fetching frames from canvas...');
  }

  // Fallback to fetch frames by name if refs is empty
  const pageRes = await post('GET_PAGE_DATA');
  const frames = pageRes?.data?.frames || [];
  const frameMap = {};
  frames.forEach(f => {
    frameMap[f.name] = f.id;
  });

  const getTarget = (refKey, frameNameSubstr) => {
    if (refs[refKey]) return refs[refKey];
    const found = frames.find(f => f.name.includes(frameNameSubstr));
    return found ? found.id : null;
  };

  const wirePairs = [
    // [sourceNode, targetNode, desc, transitionType]
    ['btn_s01', 's02', '01 Splash -> 02 Onboarding', 'SMART_ANIMATE'],
    ['btn_s02', 's03', '02 Onboarding -> 03 NDA/Auth', 'SMART_ANIMATE'],
    ['btn_s03', 's04', '03 NDA Sign -> 04 Feed', 'SMART_ANIMATE'],
    ['btn_s03_guest', 's04', '03 Guest Mode -> 04 Feed', 'DISSOLVE'],
    ['btn_s04_filter', 's05', '04 Feed -> 05 Filter Modal', 'MOVE_IN'],
    ['btn_s05_close', 's04', '05 Filter -> 04 Feed (Close)', 'MOVE_OUT'],
    ['btn_s05_apply', 's04', '05 Filter -> 04 Feed (Apply)', 'DISSOLVE'],
    ['btn_s04_details', 's07', '04 Feed Hero -> 07 Details', 'SMART_ANIMATE'],
    ['btn_s06_back', 's04', '06 Map -> 04 Feed (Back)', 'DISSOLVE'],
    ['btn_s06_pin', 's07', '06 Map Pin -> 07 Details', 'SMART_ANIMATE'],
    ['btn_s07_back', 's04', '07 Details -> 04 Feed (Back)', 'DISSOLVE'],
    ['btn_s07_cad', 's08', '07 Details -> 08 CAD Blueprint', 'SMART_ANIMATE'],
    ['btn_s07_3d', 's09', '07 Details -> 09 360 VR', 'SMART_ANIMATE'],
    ['btn_s07_chat', 's12', '07 Details -> 12 Live Tadao Ando Studio', 'SMART_ANIMATE'],
    ['btn_s07_schedule', 's10', '07 Details -> 10 Schedule Viewing', 'SMART_ANIMATE'],
    ['btn_s08_back', 's07', '08 CAD -> 07 Details (Back)', 'DISSOLVE'],
    ['btn_s08_3d', 's09', '08 CAD -> 09 360 VR', 'SMART_ANIMATE'],
    ['btn_s09_back', 's07', '09 360 VR -> 07 Details (Back)', 'DISSOLVE'],
    ['btn_s10_back', 's07', '10 Schedule -> 07 Details (Back)', 'DISSOLVE'],
    ['btn_s10_submit', 's11', '10 Schedule -> 11 VIP Boarding Pass', 'SMART_ANIMATE'],
    ['btn_s11_back', 's10', '11 VIP Pass -> 10 Schedule (Back)', 'DISSOLVE'],
    ['btn_s11_staff', 's13', '11 VIP Pass -> 13 Staff Operations (Handover)', 'PUSH'],
    ['btn_s12_back', 's07', '12 Studio Chat -> 07 Details (Back)', 'DISSOLVE'],
    ['btn_s13_arch', 's14', '13 Staff Heli -> 14 Staff Architect CAD Review', 'SMART_ANIMATE'],
    ['btn_s14_escrow', 's15', '14 Staff Arch -> 15 Staff Escrow Multi-Sig', 'SMART_ANIMATE'],
    ['btn_s15_admin', 's16', '15 Staff Escrow -> 16 Super Admin Portal', 'PUSH'],
    ['btn_s16_rbac', 's17', '16 Admin Portal -> 17 Admin RBAC Directory', 'SMART_ANIMATE'],
    ['btn_s17_listing', 's18', '17 Admin RBAC -> 18 Admin Catalog Governance', 'SMART_ANIMATE'],
    ['btn_s18_home', 's04', '18 Admin Release -> 04 Client Feed (Cycle Complete)', 'SMART_ANIMATE']
  ];

  let wiredCount = 0;
  for (const [srcRef, dstRef, desc, transitionType] of wirePairs) {
    const srcId = refs[srcRef];
    const dstId = refs[dstRef] || getTarget(dstRef, dstRef.replace('s', 'GOLDEN / '));

    if (!srcId || !dstId) {
      console.log(`⚠️ Skip ${desc}: src=${srcId || srcRef}, dst=${dstId || dstRef}`);
      continue;
    }

    try {
      const res = await post('ADD_INTERACTION', {
        sourceNodeId: srcId,
        targetNodeId: dstId,
        trigger: 'ON_CLICK',
        navigation: 'NAVIGATE',
        transitionType: transitionType || 'SMART_ANIMATE',
        duration: 0.35,
        easing: 'EASE_OUT'
      });
      if (res.success) {
        wiredCount++;
        console.log(`✅ Wired: ${desc}`);
      } else {
        console.log(`❌ Failed: ${desc} -> ${res.error}`);
      }
    } catch (err) {
      console.log(`❌ Error: ${desc} -> ${err.message}`);
    }
  }

  console.log(`🎉 Prototyping wired: ${wiredCount}/${wirePairs.length} interactions.`);

  // Set flow starting point on Màn 01
  const startId = refs['s01'] || getTarget('s01', '01 - Splash');
  if (startId) {
    console.log('🚩 Setting Flow Starting Point on Screen 01...');
    const flowRes = await post('CREATE_FLOW', {
      frameId: startId,
      flowName: '🏛️ ARKI — Luồng Vàng 18 Màn Hình Tinh Hoa (Tadao Ando Style)'
    });
    console.log('Flow Creation Result:', flowRes.success ? 'SUCCESS' : flowRes.error);
  }
}

wire().catch(console.error);
