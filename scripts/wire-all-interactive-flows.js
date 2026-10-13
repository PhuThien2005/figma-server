import { exec38451 } from './iterative-vietnam-engine.js';

async function main() {
  console.log('🔗 =====================================================================');
  console.log('🔗 ARKI VIETNAM: MASTER INTERACTIVE PROTOTYPING ENGINE (8 MODULES)');
  console.log('🔗 Đấu nối toàn diện 5 Luồng Trải nghiệm (Flows) & Micro-Interactions');
  console.log('🔗 Hỗ trợ kiểm thử trực tiếp bằng phím tắt Shift + Space trên Figma');
  console.log('🔗 =====================================================================\n');

  // 1. Switch to main page
  await exec38451('setPage', { name: 'main page' });
  const pageRes = await exec38451('get_page_nodes', {});
  const nodes = pageRes.data.nodes || [];

  const getLatestFrame = (code) => {
    const matching = nodes.filter(n => n.name.includes(code) && n.type === 'FRAME');
    return matching[matching.length - 1];
  };

  const frames = {
    s001: getLatestFrame('SCR-001'),
    s002: getLatestFrame('SCR-002'),
    s006: getLatestFrame('SCR-006'),
    s011: getLatestFrame('SCR-011'),
    s013: getLatestFrame('SCR-013'),
    s014: getLatestFrame('SCR-014'),
    s029: getLatestFrame('SCR-029'),
    s037: getLatestFrame('SCR-037'),
    s047: getLatestFrame('SCR-047'),
    s061: getLatestFrame('SCR-061'),
    s075: getLatestFrame('SCR-075'),
    s089: getLatestFrame('SCR-089'),
    s101: getLatestFrame('SCR-101'),
    s102: getLatestFrame('SCR-102'),
    s103: getLatestFrame('SCR-103')
  };

  for (const [key, frame] of Object.entries(frames)) {
    if (frame) {
      console.log(`  ✓ Đã định vị ${key.toUpperCase()}: ${frame.name} (${frame.id})`);
    } else {
      console.log(`  ⚠️ Không tìm thấy frame cho ${key.toUpperCase()}`);
    }
  }

  // 2. Setup Multiple Flow Starting Points
  console.log('\n2. Thiết lập 4 Luồng Khởi động Prototype (Flow Starting Points)...');
  await exec38451('setPage', {
    name: 'main page',
    flowStartingPoints: [
      { nodeId: frames.s001.id, name: '🇻🇳 ARKI Vietnam Luxury Golden Path' },
      { nodeId: frames.s029.id, name: '🏛️ 360 Spatial Tour & Architect VTN' },
      { nodeId: frames.s089.id, name: '🔒 Private Escrow & Milestone Placement' },
      { nodeId: frames.s101.id, name: '⚙️ Language & Dual-Theme Settings' }
    ]
  });
  console.log('✓ Đã khởi tạo 4 Flow Starting Points thành công');

  // Helper for reaction wiring
  const wireReaction = async (sourceId, targetId, label, transitionType = 'SMART_ANIMATE') => {
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
                type: transitionType,
                easing: { type: 'EASE_OUT' },
                duration: 0.28
              }
            }
          }
        ]
      });
      console.log(`   ✓ [NỐI THÀNH CÔNG] ${label}`);
    } catch (e) {
      console.log(`   ⚠️ Lỗi nối ${label}: ${e.message}`);
    }
  };

  // 3. Wiring Journeys
  console.log('\n3. Đấu nối các bước hành trình tương tác:');

  // Journey 1: Golden Onboarding & Discovery Path
  console.log('\n-- [LUỒNG 1: GOLDEN ONBOARDING & DISCOVERY] --');
  await wireReaction(frames.s001.id, frames.s002.id, 'SCR-001 (Welcome) ➔ SCR-002 (Curated Masterpieces)');
  await wireReaction(frames.s002.id, frames.s006.id, 'SCR-002 (Showcase) ➔ SCR-006 (Passcode Access)');
  await wireReaction(frames.s006.id, frames.s011.id, 'SCR-006 (Unlock) ➔ SCR-011 (Discover Bento Feed)');
  await wireReaction(frames.s011.id, frames.s013.id, 'SCR-011 (Feed Map Pill) ➔ SCR-013 (Vietnam Map Explorer)');
  await wireReaction(frames.s013.id, frames.s014.id, 'SCR-013 (Map Pin) ➔ SCR-014 (Riverfront Estate Details)');
  await wireReaction(frames.s014.id, frames.s029.id, 'SCR-014 (Explore 360 CTA) ➔ SCR-029 (360 Living Room Atrium)');

  // Journey 2: 360 Spatial Tour & Architect Showcase
  console.log('\n-- [LUỒNG 2: 360 SPATIAL TOUR & ARCHITECT SHOWCASE] --');
  await wireReaction(frames.s029.id, frames.s037.id, 'SCR-029 (Atrium Pin) ➔ SCR-037 (Virtual Staging Split)');
  await wireReaction(frames.s037.id, frames.s047.id, 'SCR-037 (Architect Badge) ➔ SCR-047 (VTN Studio Showcase)');

  // Journey 3: Architect Collaboration & Concierge Advisory
  console.log('\n-- [LUỒNG 3: ARCHITECT COLLABORATION & ADVISORY] --');
  await wireReaction(frames.s047.id, frames.s061.id, 'SCR-047 (Consult Architect) ➔ SCR-061 (VIP Concierge Advisory)');
  await wireReaction(frames.s061.id, frames.s075.id, 'SCR-061 (Start Chat) ➔ SCR-075 (Encrypted Architect Thread)');

  // Journey 4: Luxury Escrow & Settlement
  console.log('\n-- [LUỒNG 4: LUXURY ESCROW & MILESTONE SETTLEMENT] --');
  await wireReaction(frames.s075.id, frames.s089.id, 'SCR-075 (Review Contract) ➔ SCR-089 (LOI Digital Signing)');
  await wireReaction(frames.s089.id, frames.s101.id, 'SCR-089 (Settlement Done) ➔ SCR-101 (Client Profile)');

  // Journey 5: Localization & Dual-Theme Settings
  console.log('\n-- [LUỒNG 5: LOCALIZATION & SETTINGS PREFERENCES] --');
  await wireReaction(frames.s101.id, frames.s102.id, 'SCR-101 (Profile) ➔ SCR-102 (Language Preferences [EN ⇄ VI])');
  await wireReaction(frames.s102.id, frames.s103.id, 'SCR-102 (Language Chosen) ➔ SCR-103 (Theme & Appearance)');
  await wireReaction(frames.s103.id, frames.s011.id, 'SCR-103 (Preferences Saved) ➔ SCR-011 (Discover Bento Feed)');

  console.log('\n🎉 =====================================================================');
  console.log('🎉 TOÀN BỘ 5 LUỒNG NỐI PROTOTYPE ĐÃ ĐƯỢC THIẾT LẬP THÀNH CÔNG!');
  console.log('🎉 Mở Figma Desktop ➔ Nhấn Shift + Space để trực tiếp trải nghiệm:');
  console.log('🎉  1. 🇻🇳 ARKI Vietnam Luxury Golden Path (SCR-001 ➔ 002 ➔ 006 ➔ 011 ➔ 013 ➔ 014 ➔ 029)');
  console.log('🎉  2. 🏛️ 360 Spatial Tour & Architect VTN (SCR-029 ➔ 037 ➔ 047)');
  console.log('🎉  3. 🔒 Private Escrow & Milestone Placement (SCR-089 ➔ 101)');
  console.log('🎉  4. ⚙️ Language & Dual-Theme Settings (SCR-101 ➔ 102 ➔ 103 ➔ 011)');
  console.log('🎉  5. 🎨 ARKI Design System & Interactive Components (Trên Trang UI Kit)');
  console.log('🎉 =====================================================================\n');
}

main().catch(console.error);
