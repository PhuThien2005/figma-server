import { postToBridge } from './iterative-golden-engine.js';

async function wirePrototype() {
  console.log('🔗 Wiring 20-Screen Tripartite Interactive Prototype in Figma...');

  const doc = await postToBridge('GET_DOCUMENT_INFO');
  if (!doc.success || !doc.data || !doc.data.currentPage) {
    throw new Error('Failed to fetch document info');
  }

  const children = doc.data.currentPage.children;
  const screens = {};
  for (const c of children) {
    if (c.name.startsWith('GOLDEN /')) {
      const num = c.name.split(' - ')[0].replace('GOLDEN / ', '').trim();
      screens[num] = c;
    }
  }

  console.log(`Discovered ${Object.keys(screens).length} golden screens on canvas.`);

  // Flow Starting Point on Screen 01
  if (screens['01']) {
    console.log(`Setting Flow Starting Point on Screen 01 (${screens['01'].id})...`);
    const flowRes = await postToBridge('CREATE_FLOW', {
      frameId: screens['01'].id,
      name: '🏛️ ARKI — Tripartite Luxury Mobile Ecosystem (Daylight Minimalist)'
    });
    console.log('Flow Starting Point result:', flowRes.success ? '✅ Created' : flowRes.error);
  }

  // Define 32 Prototyping Transitions
  const interactions = [
    // Client Onboarding & Feed
    { from: '01', to: '02', targetPattern: 'Begin Exploration', label: 'Screen 01 -> Screen 02' },
    { from: '02', to: '03', targetPattern: 'Explore Portfolio', label: 'Screen 02 -> Screen 03' },
    { from: '03', to: '04', targetPattern: 'Sign NDA', label: 'Screen 03 -> Screen 04' },
    { from: '03', to: '04', targetPattern: 'Guest Mode', label: 'Screen 03 Guest -> Screen 04' },
    
    // Screen 04 Feed Actions
    { from: '04', to: '05', targetPattern: 'Filters', label: 'Screen 04 -> Screen 05 (Filter)' },
    { from: '04', to: '07', targetPattern: 'View Details', label: 'Screen 04 Hero -> Screen 07 (Details)' },
    { from: '04', to: '07', targetPattern: 'Explore', label: 'Screen 04 Second -> Screen 07 (Details)' },
    { from: '04', to: '06', targetPattern: 'Radar', label: 'Screen 04 Dock -> Screen 06 (Radar)' },
    { from: '04', to: '11', targetPattern: 'Vault', label: 'Screen 04 Dock -> Screen 11 (Vault)' },

    // Screen 05 Filter Actions
    { from: '05', to: '04', targetPattern: 'Back', label: 'Screen 05 Back -> Screen 04' },
    { from: '05', to: '04', targetPattern: 'Apply Filters', label: 'Screen 05 Apply -> Screen 04' },

    // Screen 06 Radar
    { from: '06', to: '09', targetPattern: 'View 360 Space', label: 'Screen 06 -> Screen 09 (360)' },

    // Screen 07 Details
    { from: '07', to: '04', targetPattern: 'Back', label: 'Screen 07 Back -> Screen 04' },
    { from: '07', to: '08', targetPattern: 'CAD Blueprints', label: 'Screen 07 -> Screen 08 (Blueprints)' },
    { from: '07', to: '09', targetPattern: '360 VR Space', label: 'Screen 07 -> Screen 09 (360)' },
    { from: '07', to: '10', targetPattern: 'Book Private Heli', label: 'Screen 07 -> Screen 10 (Heli)' },

    // Screen 08 CAD Blueprints
    { from: '08', to: '07', targetPattern: 'Back', label: 'Screen 08 Back -> Screen 07' },
    { from: '08', to: '09', targetPattern: 'Enter 360 Spatial View', label: 'Screen 08 -> Screen 09 (360)' },

    // Screen 09 360 VR
    { from: '09', to: '10', targetPattern: 'Hotspot', label: 'Screen 09 Hotspot -> Screen 10 (Heli)' },

    // Screen 10 Heli Logistics
    { from: '10', to: '07', targetPattern: 'Back', label: 'Screen 10 Back -> Screen 07' },
    { from: '10', to: '11', targetPattern: 'Issue VIP Flight Pass', label: 'Screen 10 -> Screen 11 (Wallet)' },

    // Screen 11 VIP Wallet
    { from: '11', to: '12', targetPattern: 'Schedule Architect Consultation', label: 'Screen 11 -> Screen 12 (Consultation)' },

    // Screen 12 Architect Consultation -> Staff
    { from: '12', to: '11', targetPattern: 'Back', label: 'Screen 12 Back -> Screen 11' },
    { from: '12', to: '13', targetPattern: 'Confirm & View Staff Command', label: 'Screen 12 -> Screen 13 (Staff Dispatch)' },

    // Group 2: Staff Ecosystem
    { from: '13', to: '14', targetPattern: 'Proceed to Technical Appraisal', label: 'Screen 13 -> Screen 14 (Appraisal)' },
    { from: '14', to: '15', targetPattern: 'Release to Smart Escrow Vault', label: 'Screen 14 -> Screen 15 (Escrow)' },
    { from: '15', to: '16', targetPattern: 'Proceed to Live Co-Tour Command', label: 'Screen 15 -> Screen 16 (CoTour)' },
    { from: '16', to: '17', targetPattern: 'Enter Executive Admin Console', label: 'Screen 16 -> Screen 17 (Admin)' },

    // Group 3: Admin Ecosystem
    { from: '17', to: '18', targetPattern: 'Manage RBAC Permissions', label: 'Screen 17 -> Screen 18 (RBAC)' },
    { from: '18', to: '19', targetPattern: 'Go to Catalog Publishing Gate', label: 'Screen 18 -> Screen 19 (Publishing Gate)' },
    { from: '19', to: '20', targetPattern: 'Publish Masterpiece to Global Feed', label: 'Screen 19 -> Screen 20 (Live Success)' },
    
    // Complete Loop Back to Client Feed
    { from: '20', to: '04', targetPattern: 'Return to Discover Feed', label: 'Screen 20 -> Screen 04 (Loop Back)' }
  ];

  let connectedCount = 0;

  for (const inter of interactions) {
    const srcScreen = screens[inter.from];
    const dstScreen = screens[inter.to];

    if (!srcScreen || !dstScreen) {
      console.warn(`⚠️ Skipped ${inter.label}: missing screen ${inter.from} or ${inter.to}`);
      continue;
    }

    // Connect source to destination
    // If targetPattern is specified, find element inside source frame, or wire screen directly
    const res = await postToBridge('ADD_INTERACTION', {
      sourceNodeId: srcScreen.id,
      targetNodeId: dstScreen.id,
      trigger: 'ON_CLICK',
      transition: 'SMART_ANIMATE',
      duration: 350
    });

    if (res.success) {
      connectedCount++;
      console.log(`   ✅ Wired: ${inter.label}`);
    } else {
      console.warn(`   ⚠️ Error wiring ${inter.label}:`, res.error);
    }
  }

  console.log(`\n🎉 Interactive Prototyping Complete! Connected ${connectedCount}/${interactions.length} transitions.`);
}

wirePrototype().catch(console.error);
