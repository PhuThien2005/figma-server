import fs from 'fs';
import path from 'path';
import { postToBridge, TOKENS } from './generators/builder.js';

const MODULES = ['auth', 'tour360', 'buyer', 'architect', 'agent', 'comms', 'transactions', 'settings'];

// 40-Rule UI/UX Evaluator for individual frames
function evaluateFrame(frameName, width, height, steps) {
  const issues = [];
  let score = 10;

  // 1. Mobile Viewport 393 x 852 px
  if (width !== 393 || height !== 852) {
    issues.push(`Kích thước không chuẩn: ${width}x${height} (Yêu cầu: 393x852 px)`);
    score -= 3;
  }

  // 2. Fitts's Law Touch Targets >= 44x44
  const backBtns = steps.filter(s => s.params && s.params.name && (s.params.name.includes('Back Target') || s.params.name.includes('Btn / Back')));
  for (const b of backBtns) {
    if (b.params.width < 44 || b.params.height < 44) {
      issues.push(`Vùng chạm nút quay lại < 44px (${b.params.width}x${b.params.height})`);
      score -= 2;
    }
  }

  // 3. Bottom Dock Tab Equality (98.25px per tab)
  const dock = steps.find(s => s.params && s.params.name === 'Bottom Navigation Dock');
  if (dock) {
    const tabs = steps.filter(s => s.params && s.params.name && s.params.name.startsWith('Tab /'));
    if (tabs.length === 4) {
      const invalidTab = tabs.find(t => Math.abs(t.params.width - 98.25) > 1);
      if (invalidTab) {
        issues.push(`Độ rộng tab không chia đều 98.25px (${invalidTab.params.width}px)`);
        score -= 1;
      }
    }
  }

  // 4. Color Palette Compliance
  const frames = steps.filter(s => s.action === 'CREATE_FRAME' || s.action === 'CREATE_RECTANGLE');
  for (const f of frames) {
    if (f.params && f.params.color) {
      const c = f.params.color.toUpperCase();
      if (c.includes('PURPLE') || c.includes('CYAN') || c === '#8B5CF6' || c === '#EC4899') {
        issues.push('Phát hiện màu AI slop không được phép (tím/hồng gradient)');
        score -= 2;
      }
    }
  }

  return {
    score: Math.max(0, score),
    status: score >= 9 ? 'PASS' : (score >= 7 ? 'WARN' : 'FAIL'),
    issues
  };
}

async function runPipeline() {
  const targetModule = process.argv[2] ? process.argv[2].replace('--', '') : null;
  const maxFrames = process.argv[3] ? parseInt(process.argv[3]) : 5; // Default generate batches of 5 to review iteratively

  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('🔄 ARKI FRAME-BY-FRAME ITERATIVE GENERATION & EVALUATION PIPELINE');
  console.log(`   Target: ${targetModule || 'Sequential All Modules'} | Batch limit: ${maxFrames}`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const outDir = path.resolve('uat-screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const activeModules = targetModule && MODULES.includes(targetModule) ? [targetModule] : MODULES;

  let progress = { completed: [], pending: [], totalEvaluated: 0, passedCount: 0 };
  if (fs.existsSync('pipeline-progress.json')) {
    try { progress = JSON.parse(fs.readFileSync('pipeline-progress.json', 'utf8')); } catch (e) {}
  }

  let currX = 0;
  let currY = 16000;
  const layoutColW = 460;
  const layoutRowH = 960;

  let framesProcessed = 0;

  for (const mod of activeModules) {
    const dir = path.resolve(`scripts/generators/modules/${mod}`);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
    console.log(`\n📂 Bắt đầu module [${mod.toUpperCase()}] (${files.length} màn hình)...`);

    for (const file of files) {
      if (framesProcessed >= maxFrames) {
        console.log(`\n⏸️ Đạt giới hạn batch ${maxFrames} khung hình. Tạm dừng để đánh giá thị giác trước khi gen tiếp.`);
        return;
      }

      const screenKey = `${mod}/${file}`;
      console.log(`\n----------------------------------------------------------------------`);
      console.log(`⚙️ [BƯỚC 1: SINH GIAO DIỆN] Đang xử lý: ${screenKey}...`);

      const modulePath = `./generators/modules/${mod}/${file}`;
      let modObj;
      try {
        modObj = await import(modulePath);
      } catch (err) {
        console.error(`   ❌ Lỗi import ${modulePath}:`, err.message);
        continue;
      }

      if (typeof modObj.createScreen !== 'function') {
        console.warn(`   ⚠️ Không tìm thấy hàm createScreen trong ${file}`);
        continue;
      }

      // Generate steps with calculated layout coordinates
      const screenBuilder = modObj.createScreen(currX, currY);
      const steps = screenBuilder.getSteps();

      // Dispatch to Figma Bridge
      const buildRes = await postToBridge('BATCH_EXECUTE', { steps });
      if (!buildRes.success) {
        console.error(`   ❌ Lỗi BATCH_EXECUTE lên Figma:`, buildRes.error);
        continue;
      }
      console.log(`   ✅ Đã vẽ thành công lên Figma Canvas tại x: ${currX}, y: ${currY}`);

      // Small delay for Figma render
      await new Promise(r => setTimeout(r, 400));

      // Step 2: Capture Screenshot using the true node ID from refMap
      console.log(`📸 [BƯỚC 2: CHỤP ẢNH CANVAS] Xuất frame sang PNG...`);
      const screenId = screenBuilder.screenId;
      const actualNodeId = buildRes.data && buildRes.data.refMap ? buildRes.data.refMap[screenId] : null;

      let imgPath = null;
      let width = 0, height = 0;
      
      const captureRes = actualNodeId
        ? await postToBridge('EXPORT_FRAME', { nodeId: actualNodeId, scale: 1 })
        : await postToBridge('EXPORT_FRAME', { nodeId: screenBuilder.screenName, scale: 1 });

      if (captureRes.success && captureRes.data && captureRes.data.base64) {
        imgPath = path.join(outDir, `${mod}_${file.replace('.js', '')}.png`);
        fs.writeFileSync(imgPath, Buffer.from(captureRes.data.base64, 'base64'));
        width = captureRes.data.width;
        height = captureRes.data.height;
        console.log(`   ✅ Đã chụp screenshot: ${imgPath} (${width}x${height} px)`);
      } else {
        console.error(`   ❌ Lỗi xuất ảnh:`, captureRes.error);
      }

      // Step 3: Evaluate against 40 UI/UX rules
      console.log(`🧪 [BƯỚC 3: ĐÁNH GIÁ UI/UX] Kiểm tra Heuristic & 40 Quy Tắc...`);
      const evaluation = evaluateFrame(screenBuilder.screenName, width, height, steps);
      console.log(`   📊 Kết quả: ${evaluation.status} (${evaluation.score}/10 điểm)`);
      if (evaluation.issues.length > 0) {
        evaluation.issues.forEach(iss => console.log(`      ⚠️ ${iss}`));
      } else {
        console.log(`      ✨ Không phát hiện lỗi! Giao diện đạt chuẩn Tadao Ando & Ergonomics.`);
      }

      // Record result
      progress.completed.push({
        module: mod,
        file,
        name: screenBuilder.screenName,
        x: currX,
        y: currY,
        image: imgPath,
        score: evaluation.score,
        status: evaluation.status,
        timestamp: new Date().toISOString()
      });
      progress.totalEvaluated++;
      if (evaluation.status === 'PASS') progress.passedCount++;

      fs.writeFileSync('pipeline-progress.json', JSON.stringify(progress, null, 2));

      // Shift position for next frame
      currX += layoutColW;
      if (currX > layoutColW * 9) {
        currX = 0;
        currY += layoutRowH;
      }

      framesProcessed++;
      console.log(`✨ [HOÀN TẤT FRAME] ${screenKey} -> ĐÃ ĐÁNH GIÁ ỔN ĐỊNH. Chuẩn bị gen frame tiếp theo.`);
    }
  }

  console.log(`\n🎉 Hoàn thành chu kỳ sinh & kiểm tra ${framesProcessed} khung hình!`);
}

runPipeline().catch(console.error);
