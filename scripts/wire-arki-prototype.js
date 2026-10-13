import { exec38451 } from './iterative-vietnam-engine.js';

async function main() {
  console.log('🔗 =====================================================================');
  console.log('🔗 ARKI VIETNAM: WIRING INTERACTIVE PROTOTYPE ON FIGMA DESKTOP');
  console.log('🔗 Hỗ trợ kiểm thử trực tiếp bằng phím tắt Shift + Space');
  console.log('🔗 =====================================================================\n');

  // 1. Get page nodes
  console.log('1. Quét danh sách Frame trên Canvas...');
  const pageRes = await exec38451('get_page_nodes', {});
  const nodes = pageRes.data.nodes || [];
  const frames = nodes.filter(n => n.type === 'FRAME' && n.width === 393 && n.height === 852);

  const getFrame = (code) => {
    // Return latest frame matching code
    const matching = frames.filter(f => f.name.includes(code));
    return matching[matching.length - 1];
  };

  const s001 = getFrame('SCR-001');
  const s002 = getFrame('SCR-002');
  const s006 = getFrame('SCR-006');
  const s011 = getFrame('SCR-011');
  const s012 = getFrame('SCR-012');
  const s013 = getFrame('SCR-013');
  const s014 = getFrame('SCR-014');
  const s017 = getFrame('SCR-017');
  const s029 = getFrame('SCR-029');
  const s037 = getFrame('SCR-037');
  const s047 = getFrame('SCR-047');
  const s061 = getFrame('SCR-061');
  const s075 = getFrame('SCR-075');
  const s089 = getFrame('SCR-089');
  const s101 = getFrame('SCR-101');

  if (!s001 || !s011) {
    console.error('❌ Không tìm thấy các frame chính để nối tương tác');
    return;
  }

  console.log(`✓ Đã định vị các frame cốt lõi:`);
  console.log(`  • SCR-001 (Welcome): ${s001.id}`);
  console.log(`  • SCR-011 (Bento Feed): ${s011.id}`);
  if (s013) console.log(`  • SCR-013 (Map Explorer): ${s013.id}`);
  if (s014) console.log(`  • SCR-014 (Estate Details): ${s014.id}`);
  if (s029) console.log(`  • SCR-029 (360 Tour): ${s029.id}`);

  // 2. Setup Flow Starting Point at SCR-001
  console.log('\n2. Thiết lập Flow Starting Point (Luồng kiểm thử chính)...');
  await exec38451('setPage', {
    flowStartingPoints: [
      { nodeId: s001.id, name: '🇻🇳 ARKI Vietnam Luxury Golden Path' }
    ]
  });
  console.log('✓ Đã tạo Flow Starting Point: "🇻🇳 ARKI Vietnam Luxury Golden Path" tại SCR-001');

  // 3. Wire Prototype Interactions
  console.log('\n3. Nối các dây tương tác (Prototyping Connections):');

  const wireScreen = async (sourceId, targetId, label) => {
    try {
      const res = await exec38451('setReactions', {
        id: sourceId,
        reactions: [
          {
            trigger: { type: 'ON_CLICK' },
            action: {
              type: 'NAVIGATE',
              destinationId: targetId,
              transition: {
                type: 'SMART_ANIMATE',
                easing: { type: 'EASE_OUT' },
                duration: 0.3
              }
            }
          }
        ]
      });
      console.log(`   ✓ [KẾT NỐI] ${label} (${res.success ? 'Thành công' : res.error})`);
    } catch (e) {
      console.log(`   ⚠️ Lỗi nối ${label}: ${e.message}`);
    }
  };

  // Flow sequence:
  // S001 (Welcome) -> S011 (Discover Bento Feed)
  await wireScreen(s001.id, s011.id, 'SCR-001 (Welcome) ➔ SCR-011 (Discover Bento Feed)');

  // S011 (Feed) -> S014 (Details)
  if (s014) {
    await wireScreen(s011.id, s014.id, 'SCR-011 (Feed Hero) ➔ SCR-014 (Estate Details)');
    // S014 (Details Back) -> S011 (Feed)
    await wireScreen(s014.id, s029 ? s029.id : s011.id, 'SCR-014 (Details CTA) ➔ SCR-029 (360 Spatial Tour)');
  }

  // S029 (360 Tour) -> S011 (Feed)
  if (s029 && s011) {
    await wireScreen(s029.id, s011.id, 'SCR-029 (360 Tour Back) ➔ SCR-011 (Bento Feed)');
  }

  console.log('\n🎉 =====================================================================');
  console.log('🎉 HOÀN TẤT NỐI PROTOTYPE! Bạn có thể nhấn Shift + Space trên Figma');
  console.log('🎉 để trải nghiệm ngay luồng tương tác Golden Path!');
  console.log('🎉 =====================================================================\n');
}

main().catch(console.error);
