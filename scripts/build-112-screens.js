import fs from 'fs';
import path from 'path';
import { postToBridge } from './generators/builder.js';

const MODULES = ['auth', 'tour360', 'buyer', 'architect', 'agent', 'comms', 'transactions', 'settings'];

async function run() {
  const targetModule = process.argv[2] ? process.argv[2].replace('--', '') : null;
  console.log(`🏗️ ARKI 112 Screen Generator Master Runner... Target: ${targetModule || 'ALL MODULES'}`);

  const activeModules = targetModule && MODULES.includes(targetModule) ? [targetModule] : MODULES;

  let allSteps = [];
  let screenCount = 0;
  const layoutColW = 460;
  const layoutRowH = 960;
  let currX = 0;
  let currY = 15000; // Place below existing screens to keep canvas organized

  for (const mod of activeModules) {
    const dir = path.resolve(`scripts/generators/modules/${mod}`);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
    console.log(`📦 Loading module [${mod.toUpperCase()}] (${files.length} screens)...`);

    for (const file of files) {
      const modulePath = `./generators/modules/${mod}/${file}`;
      try {
        const modObj = await import(modulePath);
        if (typeof modObj.createScreen === 'function') {
          const screen = modObj.createScreen(currX, currY);
          allSteps.push(...screen.getSteps());
          screenCount++;
          currX += layoutColW;
          if (currX > layoutColW * 9) {
            currX = 0;
            currY += layoutRowH;
          }
        }
      } catch (err) {
        console.error(`❌ Error importing ${modulePath}:`, err.message);
      }
    }
  }

  console.log(`✨ Total screens prepared: ${screenCount} screens with ${allSteps.length} batch steps.`);

  if (process.argv.includes('--dispatch')) {
    console.log('🚀 Dispatching to Figma Canvas in chunked batches...');
    const CHUNK_SIZE = 40; // Avoid timeout by sending in 40-step chunks
    for (let i = 0; i < allSteps.length; i += CHUNK_SIZE) {
      const chunk = allSteps.slice(i, i + CHUNK_SIZE);
      console.log(`   Dispatching chunk ${Math.floor(i / CHUNK_SIZE) + 1}/${Math.ceil(allSteps.length / CHUNK_SIZE)} (${chunk.length} steps)...`);
      const res = await postToBridge('BATCH_EXECUTE', { steps: chunk });
      if (!res.success) {
        console.error('   ❌ Batch error:', res.error);
      }
    }
    console.log('🎉 Dispatch completed successfully!');
  } else {
    console.log('💡 Note: Run with `--dispatch` flag to transmit all screens to Figma Desktop Canvas.');
  }
}

run().catch(console.error);
