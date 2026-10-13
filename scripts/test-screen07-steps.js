import { SCREENS, postToBridge } from './iterative-golden-engine.js';

async function test() {
  const s = SCREENS[6]; // Screen 07
  const steps = s.build(2760, 13200);
  console.log(`Testing ${steps.length} steps individually...`);

  const refMap = {};

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`Step ${i + 1}/${steps.length}: ${step.action} (ref: ${step.ref || 'none'}) parent: ${step.params.parentId || 'page'} name: ${step.params.name || step.params.text || 'unnamed'}`);
    
    // Resolve parentId manually
    const params = { ...step.params };
    if (params.parentId && params.parentId.startsWith('$')) {
      const refKey = params.parentId.substring(1);
      params.parentId = refMap[refKey] || null;
      console.log(`   Resolved parentId ${step.params.parentId} -> ${params.parentId}`);
    }

    const t0 = Date.now();
    try {
      const res = await postToBridge(step.action, params, 10000);
      const dt = Date.now() - t0;
      if (res.success) {
        console.log(`   ✅ Success in ${dt}ms! ID: ${res.data ? res.data.id : 'ok'}`);
        if (step.ref && res.data && res.data.id) {
          refMap[step.ref] = res.data.id;
        }
      } else {
        console.error(`   ❌ Failed in ${dt}ms:`, res.error);
        break;
      }
    } catch (err) {
      console.error(`   💥 Exception after ${Date.now() - t0}ms:`, err.message);
      break;
    }
  }
}

test().catch(console.error);
