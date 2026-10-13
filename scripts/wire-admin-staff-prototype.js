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
    req.on('error', reject);
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function wirePrototypes() {
  console.log('⚡ Wiring Interactive Prototype Transitions & Flow Starting Points for Admin & Staff...');

  // 1. Create Flow Starting Points
  // Admin Portal Flow
  const flowAdmin = await post('CREATE_FLOW', {
    frameId: '1163:2', // ADMIN / 01 - Platform Governance
    flowName: '👑 ARKI — Admin Platform Governance Console (1440x900)'
  });
  console.log('Flow Admin created:', flowAdmin.success, flowAdmin.data || flowAdmin.error);

  // Staff Workspace Flow
  const flowStaff = await post('CREATE_FLOW', {
    frameId: '1164:166', // STAFF / 01 - Concierge Logistics Board
    flowName: '🛠️ ARKI — Staff Operations Workspace (1440x900)'
  });
  console.log('Flow Staff created:', flowStaff.success, flowStaff.data || flowStaff.error);

  // 2. Wire Admin Navigation
  // In Admin 01, click "RBAC & Directory" (1163:8) -> Navigate to Admin 02 (1163:87)
  const wireAdmin1 = await post('ADD_INTERACTION', {
    sourceNodeId: '1163:8',
    targetNodeId: '1163:87',
    trigger: 'ON_CLICK',
    transitionType: 'DISSOLVE',
    duration: 0.25
  });
  console.log('Wire Admin 01 -> 02:', wireAdmin1.success);

  // In Admin 02, click "Overview & Metrics" (1163:91) -> Navigate to Admin 01 (1163:2)
  const wireAdmin2 = await post('ADD_INTERACTION', {
    sourceNodeId: '1163:91',
    targetNodeId: '1163:2',
    trigger: 'ON_CLICK',
    transitionType: 'DISSOLVE',
    duration: 0.25
  });
  console.log('Wire Admin 02 -> 01:', wireAdmin2.success);

  // 3. Wire Staff Navigation
  // In Staff 01, click "Architect CAD Studio" (1164:172) -> Navigate to Staff 02 (1164:231)
  const wireStaff1 = await post('ADD_INTERACTION', {
    sourceNodeId: '1164:172',
    targetNodeId: '1164:231',
    trigger: 'ON_CLICK',
    transitionType: 'DISSOLVE',
    duration: 0.25
  });
  console.log('Wire Staff 01 -> 02:', wireStaff1.success);

  // In Staff 02, click "Concierge Dispatch" (1164:235) -> Navigate to Staff 01 (1164:166)
  const wireStaff2 = await post('ADD_INTERACTION', {
    sourceNodeId: '1164:235',
    targetNodeId: '1164:166',
    trigger: 'ON_CLICK',
    transitionType: 'DISSOLVE',
    duration: 0.25
  });
  console.log('Wire Staff 02 -> 01:', wireStaff2.success);

  console.log('✅ Interactive wirings completed successfully! Ready for Shift + Space preview in Figma.');
}

wirePrototypes().catch(console.error);
