import fs from 'fs';
import path from 'path';
import { postToBridge } from './generators/builder.js';

async function main() {
  console.log('🔍 Fetching Figma Document Info for Daylight Light Screens...');
  const res = await postToBridge('GET_DOCUMENT_INFO');
  if (!res.success) {
    console.error('❌ Failed to get document info:', res.error);
    process.exit(1);
  }

  const screens = res.data.currentPage.children.filter(c => c.name && c.name.startsWith('GOLDEN /'));
  screens.sort((a, b) => a.name.localeCompare(b.name));
  console.log(`Found ${screens.length} Daylight Light GOLDEN screens on Canvas:\n`);

  const outDir = path.resolve('uat-screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const auditLog = [];

  for (const s of screens) {
    const numMatch = s.name.match(/GOLDEN \/ (\d+)/);
    const num = numMatch ? numMatch[1] : 'xx';
    const outPath = path.join(outDir, `light_golden_${num}.png`);

    console.log(`📸 Capturing [${s.name}] (ID: ${s.id})...`);
    const capRes = await postToBridge('EXPORT_FRAME', { nodeId: s.id, scale: 1 });

    if (capRes.success && capRes.data && capRes.data.base64) {
      fs.writeFileSync(outPath, Buffer.from(capRes.data.base64, 'base64'));
      const passW = capRes.data.width === 393;
      const passH = capRes.data.height === 852;
      const status = (passW && passH) ? 'PASS' : 'WARN';
      console.log(`   ✅ Exported: ${capRes.data.width}x${capRes.data.height} px | Status: ${status}`);
      auditLog.push({
        num,
        name: s.name,
        nodeId: s.id,
        path: outPath,
        width: capRes.data.width,
        height: capRes.data.height,
        status
      });
    } else {
      console.error(`   ❌ Export failed: ${capRes.error}`);
      auditLog.push({ num, name: s.name, nodeId: s.id, status: 'FAIL', error: capRes.error });
    }
  }

  fs.writeFileSync('golden-light-audit-log.json', JSON.stringify(auditLog, null, 2));
  console.log(`\n🎉 Completed capturing ${auditLog.length} Daylight Light screens! Saved to golden-light-audit-log.json`);
}

main().catch(console.error);
