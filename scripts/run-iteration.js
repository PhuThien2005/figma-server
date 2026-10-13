import fs from 'fs';
import { SCREENS, generateSingleScreen } from './iterative-golden-engine.js';

async function main() {
  const startIdx = process.argv[2] !== undefined ? parseInt(process.argv[2]) : 0;
  const count = process.argv[3] !== undefined ? parseInt(process.argv[3]) : 1;
  const endIdx = Math.min(startIdx + count, SCREENS.length);

  console.log(`🎯 Iterative Generation Runner: Screens ${startIdx + 1} to ${endIdx} of ${SCREENS.length}`);

  const results = [];
  let masterRefs = {};
  if (fs.existsSync('master-golden-refs.json')) {
    try { masterRefs = JSON.parse(fs.readFileSync('master-golden-refs.json', 'utf8')); } catch (e) {}
  }

  for (let i = startIdx; i < endIdx; i++) {
    const res = await generateSingleScreen(i);
    results.push(res);
    Object.assign(masterRefs, res.refMap);
    fs.writeFileSync('master-golden-refs.json', JSON.stringify(masterRefs, null, 2));
  }

  console.log(`\n🎉 Finished generating & auditing ${results.length} screen(s)!`);
}

main().catch(console.error);
