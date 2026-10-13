import fs from 'fs';
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
    req.on('error', reject);
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function main() {
  console.log('🔗 Wiring 29 Prototyping Interactions for Daylight Light English Golden Path...');

  let refs = {};
  if (fs.existsSync('golden-path-light-refs.json')) {
    refs = JSON.parse(fs.readFileSync('golden-path-light-refs.json', 'utf8'));
  }

  // Also query document info to map frame names to ids
  const doc = await post('GET_DOCUMENT_INFO');
  const screens = {};
  for (const c of doc.data.currentPage.children) {
    if (c.name.startsWith('GOLDEN /')) {
      const match = c.name.match(/GOLDEN \/ (\d+)/);
      if (match) {
        screens[`s${match[1]}`] = c.id;
      }
    }
  }

  console.log('Mapped Golden Screens:', screens);

  const interactions = [
    // Client Onboarding & Auth
    { from: refs.btn_s01 || 'btn_s01', to: screens.s02, label: 'Splash -> Pritzker Onboarding' },
    { from: refs.btn_s02 || 'btn_s02', to: screens.s03, label: 'Pritzker -> Biometric Gate' },
    { from: refs.btn_s03 || 'btn_s03', to: screens.s04, label: 'Sign NDA -> Masterpiece Feed' },
    { from: refs.btn_s03_guest || 'btn_s03_guest', to: screens.s04, label: 'Guest Mode -> Masterpiece Feed' },

    // Feed to Features
    { from: refs.btn_s04_filter || 'btn_s04_filter', to: screens.s05, label: 'Feed -> Filters' },
    { from: refs.tab_s04_1 || 'tab_s04_1', to: screens.s06, label: 'Dock Tab Map -> Radar Map' },
    { from: refs.btn_hero_details || 'btn_hero_details', to: screens.s07, label: 'Hero Villa -> Details' },

    // Filter Screen Actions
    { from: refs.btn_s05_back || 'btn_s05_back', to: screens.s04, label: 'Filter Back -> Feed' },
    { from: refs.btn_s05_apply || 'btn_s05_apply', to: screens.s04, label: 'Apply Filter -> Feed' },

    // Map Screen Actions
    { from: refs.btn_s06_back || 'btn_s06_back', to: screens.s04, label: 'Map Back -> Feed' },
    { from: refs.btn_s06_open || 'btn_s06_open', to: screens.s07, label: 'Map Pin -> Details' },

    // Property Details Connections
    { from: refs.btn_s07_back || 'btn_s07_back', to: screens.s04, label: 'Details Back -> Feed' },
    { from: refs.btn_s07_cad || 'btn_s07_cad', to: screens.s08, label: 'Details -> CAD Blueprints' },
    { from: refs.btn_s07_vr || 'btn_s07_vr', to: screens.s09, label: 'Details -> 360 Spatial VR' },
    { from: refs.btn_s07_chat || 'btn_s07_chat', to: screens.s12, label: 'Details -> 1-on-1 Chat Architect' },
    { from: refs.btn_s07_schedule || 'btn_s07_schedule', to: screens.s10, label: 'Details -> Schedule Viewing' },

    // Blueprint & 360 Tour
    { from: refs.btn_s08_back || 'btn_s08_back', to: screens.s07, label: 'CAD Back -> Details' },
    { from: refs.btn_s08_to_vr || 'btn_s08_to_vr', to: screens.s09, label: 'CAD -> 360 Spatial VR' },
    { from: refs.btn_s09_back || 'btn_s09_back', to: screens.s07, label: '360 Back -> Details' },

    // Schedule & VIP Ticket
    { from: refs.btn_s10_back || 'btn_s10_back', to: screens.s07, label: 'Schedule Back -> Details' },
    { from: refs.btn_s10_confirm || 'btn_s10_confirm', to: screens.s11, label: 'Confirm Slot -> VIP Pass' },
    { from: refs.btn_s11_home || 'btn_s11_home', to: screens.s04, label: 'VIP Pass -> Return Feed' },

    // Architect to Staff Workflow
    { from: refs.btn_s12_back || 'btn_s12_back', to: screens.s07, label: 'Chat Back -> Details' },
    { from: refs.btn_s12_to_staff || 'btn_s12_to_staff', to: screens.s13, label: 'Chat -> Staff Aviation' },
    { from: refs.btn_s13_to_appraise || 'btn_s13_to_appraise', to: screens.s14, label: 'Staff Flight -> Architect Appraisal' },
    { from: refs.btn_s14_to_escrow || 'btn_s14_to_escrow', to: screens.s15, label: 'Staff Appraisal -> Escrow Vault' },
    { from: refs.btn_s15_to_admin || 'btn_s15_to_admin', to: screens.s16, label: 'Escrow Vault -> Admin Governance' },
    { from: refs.btn_s16_to_rbac || 'btn_s16_to_rbac', to: screens.s17, label: 'Admin Gov -> RBAC Matrix' },
    { from: refs.btn_s17_to_publish || 'btn_s17_to_publish', to: screens.s18, label: 'RBAC -> Catalog Approval' },
    { from: refs.btn_s18_publish || 'btn_s18_publish', to: screens.s04, label: 'Publish Listing -> Client Feed' },
    { from: refs.btn_s18_loop || 'btn_s18_loop', to: screens.s04, label: 'Loop Back -> Client Feed' }
  ];

  let wiredCount = 0;
  for (const item of interactions) {
    if (!item.from || !item.to) continue;
    try {
      const res = await post('ADD_INTERACTION', {
        sourceNodeId: item.from,
        targetNodeId: item.to,
        trigger: 'ON_CLICK',
        navigation: 'NAVIGATE',
        transitionType: 'SMART_ANIMATE',
        duration: 0.35,
        easing: 'EASE_OUT'
      });
      if (res.success) {
        wiredCount++;
        console.log(`   ✅ Wired: ${item.label}`);
      }
    } catch (e) {
      console.warn(`   ⚠️ Could not wire ${item.label}:`, e.message);
    }
  }

  // Create Flow Starting Point on Screen 01
  if (screens.s01) {
    console.log('🚩 Creating Flow Starting Point on Screen 01...');
    const flowRes = await post('CREATE_FLOW', {
      nodeId: screens.s01,
      flowName: '🏛️ ARKI — Daylight Minimalist Golden Path (Mobile 393x852)'
    });
    console.log('Flow Creation Result:', flowRes.success ? 'SUCCESS' : flowRes.error);
  }

  console.log(`\n🎉 Completed Prototyping Wiring: ${wiredCount}/${interactions.length} interactions connected!`);
}

main().catch(console.error);
