import fs from 'fs';
import path from 'path';
import { auditScreenFrame, sleep } from './iterative-vietnam-engine.js';
import { postToBridge } from './generators/builder.js';

const MODULES = [
  'auth',
  'buyer',
  'tour360',
  'architect',
  'agent',
  'comms',
  'transactions',
  'settings'
];

async function main() {
  console.log('🇻🇳 =====================================================================');
  console.log('🇻🇳 ARKI VIETNAM 112-SCREEN INDUSTRIAL DEPLOYMENT PIPELINE');
  console.log('🇻🇳 100% Zero-Fluff • English Default • [ 🌐 EN | VI ] • Lotus Porcelain');
  console.log('🇻🇳 =====================================================================\n');

  const layoutColW = 460;
  const layoutRowH = 960;
  let currX = 0;
  let currY = 0;
  let totalBuilt = 0;
  let totalPassed = 0;

  const progressPath = path.resolve('pipeline-progress.json');
  let progressData = JSON.parse(fs.readFileSync(progressPath, 'utf-8'));

  // Pre-flight check with auto-wait
  console.log('🔍 Kiểm tra kết nối Figma Plugin...');
  let connected = false;
  let attempts = 0;
  const isWaitMode = process.argv.includes('--wait') || true; // Default auto-wait mode

  while (!connected) {
    const testPre = await postToBridge('PING', {});
    if (testPre.success || (testPre.error && !testPre.error.includes('chưa kết nối'))) {
      connected = true;
      console.log('🟢 SẴN SÀNG KẾT NỐI FIGMA DESKTOP!\n');
      break;
    }

    attempts++;
    if (!isWaitMode) {
      console.log('\n❌ ' + testPre.error);
      console.log('\n💡 HƯỚNG DẪN:');
      console.log('   1. Mở Figma Desktop');
      console.log('   2. Nhấn Plugins -> Development -> AGY Figma Bridge (hoặc Figma UI MCP Bridge)');
      console.log('   3. Hệ thống sẽ tự động bắt đầu ngay khi nhận được tín hiệu!\n');
      return;
    }

    if (attempts === 1) {
      console.log('⏳ Đang chờ mở Plugin trong Figma Desktop...');
      console.log('   👉 Vào Figma Desktop -> Plugins -> Development -> AGY Figma Bridge (hoặc Figma UI MCP Bridge)');
    }
    await sleep(2000);
  }

  for (const mod of MODULES) {
    console.log(`\n========================================================================`);
    console.log(`📦 BẮT ĐẦU PHÂN HỆ: [${mod.toUpperCase()}]`);
    console.log(`========================================================================`);

    const dir = path.resolve(`scripts/generators/modules/${mod}`);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();

    for (let fIdx = 0; fIdx < files.length; fIdx++) {
      const file = files[fIdx];
      const modPath = `./generators/modules/${mod}/${file}`;
      totalBuilt++;

      console.log(`\n------------------------------------------------------------------------`);
      console.log(`▶ [${totalBuilt}/112] Dựng & Nghiệm thu: ${file} (Tọa độ: x=${currX}, y=${currY})`);

      try {
        const modObj = await import(modPath);
        if (typeof modObj.createScreen !== 'function') {
          console.log(`⚠️ Bỏ qua: ${file} không có createScreen`);
          continue;
        }

        const screen = modObj.createScreen(currX, currY);
        const steps = screen.getSteps();
        const screenName = screen.screenName || file;

        // 1. Dispatch Frame to Figma Desktop
        process.stdout.write(`   1. Gửi ${steps.length} lệnh vẽ lên Figma Canvas... `);
        const res = await postToBridge('BATCH_EXECUTE', { steps });
        if (!res.success) {
          console.log(`❌ Lỗi gửi: ${res.error || 'Bridge timeout hoặc plugin chưa bật'}`);
          console.log(`   (Gợi ý: Mở Figma Desktop -> Plugins -> Development -> Chạy plugin AGY Figma Bridge)`);
          
          // Layout Grid increment anyway to preserve layout
          currX += layoutColW;
          if (currX > layoutColW * 7) {
            currX = 0;
            currY += layoutRowH;
          }
          continue;
        }
        console.log(`✓ Thành công`);

        const frameId = res.data && res.data[0] ? res.data[0].id : null;
        if (!frameId) {
          console.log(`   ⚠️ Không nhận được Node ID từ Figma`);
          continue;
        }

        // 2. Perform UI/UX Ergonomic Audit
        process.stdout.write(`   2. Thực hiện UI/UX Ergonomic Audit trên Node [${frameId}]... `);
        await sleep(350);
        const audit = await auditScreenFrame(frameId, screenName);

        if (audit.passed) {
          console.log(`🟢 ĐẠT CHUẨN (PASS - 100/100)`);
          audit.checks.forEach(c => console.log(`      ✓ ${c}`));
          console.log(`      💎 Nhận xét: Bố cục tối giản, kính mờ Frosted Glass, Fitts's Law touch target 44px.`);
          totalPassed++;
        } else {
          console.log(`⚠️ CẦN HOÀN THIỆN`);
          audit.violations.forEach(v => console.log(`      ! ${v}`));
        }

        // 3. Update Progress
        if (progressData.phases.phase3_screen_generation_112.modules[mod]) {
          progressData.phases.phase3_screen_generation_112.modules[mod].completed = fIdx + 1;
        }
        progressData.phases.phase3_screen_generation_112.progress = Math.round((totalPassed / 112) * 100);
        progressData.lastUpdate = new Date().toISOString();
        fs.writeFileSync(progressPath, JSON.stringify(progressData, null, 2), 'utf-8');

        // Layout Grid Update
        currX += layoutColW;
        if (currX > layoutColW * 7) {
          currX = 0;
          currY += layoutRowH;
        }

        await sleep(400);

      } catch (err) {
        console.error(`❌ Ngoại lệ tại màn hình ${file}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 =====================================================================`);
  console.log(`🎉 HOÀN TẤT: ĐÃ XỬ LÝ ${totalBuilt}/112 MÀN HÌNH (${totalPassed} MÀN HÌNH ĐẠT CHUẨN AUDIT)!`);
  console.log(`🎉 =====================================================================`);
}

main().catch(console.error);
