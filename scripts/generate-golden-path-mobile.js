import http from 'http';
import fs from 'fs';

function post(action, params = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:8765/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ success: false, error: data });
        }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

const IMAGES = {
  villaPool: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  villaFront: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  livingRoom: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  kitchen: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
  sunsetEstate: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  brutalistVilla: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  architectPortrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  mapSnapshot: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  blueprintPlan: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
};

const steps = [];

function addStep(action, params, ref = null) {
  const item = { action, params, continueOnError: true };
  if (ref) item.ref = ref;
  steps.push(item);
}

const BASE_X = 0;
const BASE_Y = 13200;
const COL_W = 460;
const ROW_H = 960;

// =============================================================================
// ROW 1: CLIENT EXPERIENCE GOLDEN PATH (Màn 01 - 09)
// =============================================================================

// MÀN 01: Khởi Động & Triết Lý (Splash)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 01 - Splash & Triết Lý',
  width: 393, height: 852, x: BASE_X, y: BASE_Y,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's01');
addStep('CREATE_RECTANGLE', { parentId: '$s01', name: 'BG Cover', width: 393, height: 852, x: 0, y: 0, imageUrl: IMAGES.villaPool, color: '#0B0C0E' });
addStep('CREATE_RECTANGLE', { parentId: '$s01', name: 'Dark Gradient', width: 393, height: 852, x: 0, y: 0, color: '#0B0C0EE6' });
addStep('CREATE_TEXT', { parentId: '$s01', text: 'A R K I', fontSize: 32, fontStyle: 'Bold', color: '#F4F4F6', x: 36, y: 340 });
addStep('CREATE_TEXT', { parentId: '$s01', text: 'ARCHITECTURAL ESTATES & LIVING', fontSize: 11, fontStyle: 'SemiBold', color: '#C5A880', x: 36, y: 390 });
addStep('CREATE_TEXT', { parentId: '$s01', text: 'Không gian sống như một tác phẩm điêu khắc ánh sáng.\nTriết lý kiến trúc tối giản Tadao Ando.', fontSize: 13, color: '#A1A1AA', x: 36, y: 420 });
addStep('CREATE_BUTTON', { parentId: '$s01', name: 'Btn / Enter', text: 'Khám Phá Kiệt Tác →', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 36, y: 730 }, 'btn_s01');

// MÀN 02: Giới Thiệu Kiệt Tác Pritzker (Onboarding)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 02 - Tuyển Chọn Pritzker',
  width: 393, height: 852, x: BASE_X + COL_W, y: BASE_Y,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's02');
addStep('CREATE_RECTANGLE', { parentId: '$s02', name: 'Hero Image', width: 393, height: 480, x: 0, y: 0, imageUrl: IMAGES.villaFront, color: '#131418' });
addStep('CREATE_FRAME', { parentId: '$s02', name: 'Tag Pritzker', width: 140, height: 26, x: 32, y: 510, backgroundColor: '#16181F', cornerRadius: 6 });
addStep('CREATE_TEXT', { parentId: '$s02', text: 'PRITZKER MASTERS', fontSize: 10, fontStyle: 'SemiBold', color: '#C5A880', x: 42, y: 516 });
addStep('CREATE_TEXT', { parentId: '$s02', text: 'Tuyển Tập Dinh Thự Kín', fontSize: 24, fontStyle: 'Bold', color: '#F4F4F6', x: 32, y: 550 });
addStep('CREATE_TEXT', { parentId: '$s02', text: 'Những công trình vách biển riêng tư, kết cấu bê tông trần nguyên bản từ các kiến trúc sư huyền thoại.', fontSize: 13, color: '#A1A1AA', x: 32, y: 590 });
addStep('CREATE_BUTTON', { parentId: '$s02', name: 'Btn / Continue', text: 'Tiếp Tục →', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 32, y: 730 }, 'btn_s02');

// MÀN 03: Cổng Xác Thực Sinh Trắc & Ký NDA
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 03 - Sinh Trắc & NDA',
  width: 393, height: 852, x: BASE_X + COL_W * 2, y: BASE_Y,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's03');
addStep('CREATE_TEXT', { parentId: '$s03', text: 'Xác Thực Thượng Lưu', fontSize: 24, fontStyle: 'Bold', color: '#F4F4F6', x: 32, y: 100 });
addStep('CREATE_TEXT', { parentId: '$s03', text: 'Cổng bảo mật FaceID Enclave và thỏa thuận tài sản kín.', fontSize: 13, color: '#71717A', x: 32, y: 135 });
addStep('CREATE_FRAME', { parentId: '$s03', name: 'Card NDA', width: 329, height: 260, x: 32, y: 190, backgroundColor: '#131418', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s03', text: 'CAM KẾT BẢO MẬT OFF-MARKET', fontSize: 11, fontStyle: 'Bold', color: '#C5A880', x: 52, y: 215 });
addStep('CREATE_TEXT', { parentId: '$s03', text: '1. Không tiết lộ toạ độ GPS chính xác và giá trị thẩm định.\n2. Xác nhận danh tính hội viên bảo trợ nghệ thuật.\n3. Tiền đặt cọc được bảo chứng qua hợp đồng thông minh.', fontSize: 12, color: '#A1A1AA', x: 52, y: 250 });
addStep('CREATE_TEXT', { parentId: '$s03', text: 'Mã phiên: #ARK-SEC-992 • Cấp cho Alexander Vance', fontSize: 11, color: '#52525B', x: 52, y: 390 });
addStep('CREATE_BUTTON', { parentId: '$s03', name: 'Btn / Sign NDA', text: 'Ký NDA & Mở Khóa Danh Mục', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 32, y: 660 }, 'btn_s03');
addStep('CREATE_BUTTON', { parentId: '$s03', name: 'Btn / Guest', text: 'Xem Chế Độ Khách Vãng Lai →', backgroundColor: '#16181F', textColor: '#A1A1AA', x: 32, y: 730 }, 'btn_s03_guest');

// MÀN 04: Bảng Tin Kiệt Tác (Bento Grid)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 04 - Bảng Tin Bento Grid',
  width: 393, height: 852, x: BASE_X + COL_W * 3, y: BASE_Y,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's04');

// Header with Title & Context
addStep('CREATE_TEXT', { parentId: '$s04', text: 'Khám Phá Kiệt Tác', fontSize: 18, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 58 });
addStep('CREATE_TEXT', { parentId: '$s04', text: 'ARKI • BẤT ĐỘNG SẢN KIẾN TRÚC', fontSize: 10, fontStyle: 'SemiBold', color: '#C5A880', x: 24, y: 82 });
addStep('CREATE_BUTTON', { parentId: '$s04', name: 'Btn / Open Filter', text: 'Bộ Lọc', backgroundColor: '#16181F', textColor: '#F4F4F6', x: 295, y: 56 }, 'btn_s04_filter');

// 4 Category Chips - Perfectly Spaced (8px margins, no overflow)
addStep('CREATE_BUTTON', { parentId: '$s04', text: 'TẤT CẢ', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 24, y: 112 });
addStep('CREATE_BUTTON', { parentId: '$s04', text: 'VEN BIỂN', backgroundColor: '#131418', textColor: '#A1A1AA', x: 104, y: 112 });
addStep('CREATE_BUTTON', { parentId: '$s04', text: 'BÊ TÔNG', backgroundColor: '#131418', textColor: '#A1A1AA', x: 194, y: 112 });
addStep('CREATE_BUTTON', { parentId: '$s04', text: 'SINH THÁI', backgroundColor: '#131418', textColor: '#A1A1AA', x: 282, y: 112 });

// Bento Hero Card 1 (Consistent Design System)
addStep('CREATE_FRAME', { parentId: '$s04', name: 'Card / Hero Villa', width: 345, height: 350, x: 24, y: 165, backgroundColor: '#131418', cornerRadius: 16, clipsContent: true }, 'card_hero');
addStep('CREATE_RECTANGLE', { parentId: '$card_hero', name: 'Villa Photo', width: 345, height: 210, x: 0, y: 0, imageUrl: IMAGES.villaPool, color: '#16181F' });
// Favorite Heart Button on Photo
addStep('CREATE_FRAME', { parentId: '$card_hero', name: 'Btn / Heart', width: 36, height: 36, x: 295, y: 14, backgroundColor: '#0B0C0ECC', cornerRadius: 18 });
addStep('CREATE_TEXT', { parentId: '$card_hero', text: '♡', fontSize: 16, color: '#F4F4F6', x: 307, y: 22 });
// Typography Hierarchy: Title -> Specs -> Price
addStep('CREATE_TEXT', { parentId: '$card_hero', text: 'The Glass Sanctuary Villa', fontSize: 17, fontStyle: 'Bold', color: '#F4F4F6', x: 18, y: 226 });
addStep('CREATE_TEXT', { parentId: '$card_hero', text: 'Bán Đảo Sơn Trà • KTS Tadao Ando • 850 m²', fontSize: 12, color: '#A1A1AA', x: 18, y: 252 });
addStep('CREATE_TEXT', { parentId: '$card_hero', text: '$4,250,000', fontSize: 18, fontStyle: 'Bold', color: '#F4F4F6', x: 18, y: 302 });
addStep('CREATE_BUTTON', { parentId: '$card_hero', name: 'Btn / Details', text: 'Xem Chi Tiết →', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 205, y: 294 }, 'btn_s04_details');

// Secondary Consistent Card 2
addStep('CREATE_FRAME', { parentId: '$s04', name: 'Card / Second Villa', width: 345, height: 236, x: 24, y: 528, backgroundColor: '#131418', cornerRadius: 16, clipsContent: true }, 'card_second');
addStep('CREATE_RECTANGLE', { parentId: '$card_second', name: 'Photo 2', width: 345, height: 136, x: 0, y: 0, imageUrl: IMAGES.brutalistVilla, color: '#16181F' });
addStep('CREATE_FRAME', { parentId: '$card_second', name: 'Btn / Heart 2', width: 36, height: 36, x: 295, y: 14, backgroundColor: '#0B0C0ECC', cornerRadius: 18 });
addStep('CREATE_TEXT', { parentId: '$card_second', text: '♡', fontSize: 16, color: '#F4F4F6', x: 307, y: 22 });
addStep('CREATE_TEXT', { parentId: '$card_second', text: 'Cliffside Monolith Retreat', fontSize: 15, fontStyle: 'Bold', color: '#F4F4F6', x: 18, y: 150 });
addStep('CREATE_TEXT', { parentId: '$card_second', text: 'Bán Đảo Sơn Trà • Studio Kengo Kuma • 620 m²', fontSize: 11, color: '#A1A1AA', x: 18, y: 174 });
addStep('CREATE_TEXT', { parentId: '$card_second', text: '$3,800,000', fontSize: 16, fontStyle: 'Bold', color: '#F4F4F6', x: 18, y: 200 });
addStep('CREATE_BUTTON', { parentId: '$card_second', name: 'Btn / Second Details', text: 'Xem Chi Tiết →', backgroundColor: '#16181F', textColor: '#D4D4D8', x: 210, y: 194 }, 'btn_s04_second');

// Bottom Navigation Dock with 4 Equal Tabs (98.25px each) & Active Indicator
addStep('CREATE_FRAME', { parentId: '$s04', name: 'Bottom Navigation Dock', width: 393, height: 76, x: 0, y: 776, backgroundColor: '#090A0DF2' }, 'dock_s04');

// Tab 0: Khám Phá (Active)
addStep('CREATE_FRAME', { parentId: '$dock_s04', name: 'Tab 0 Khám Phá', width: 98, height: 76, x: 0, y: 0, backgroundColor: 'transparent' });
addStep('CREATE_TEXT', { parentId: '$dock_s04', text: '◎', fontSize: 16, color: '#F4F4F6', x: 41, y: 14 });
addStep('CREATE_TEXT', { parentId: '$dock_s04', text: 'Khám Phá', fontSize: 11, fontStyle: 'Bold', color: '#F4F4F6', x: 23, y: 36 });
addStep('CREATE_FRAME', { parentId: '$dock_s04', name: 'Active Bar', width: 24, height: 3, x: 37, y: 56, backgroundColor: '#F4F4F6', cornerRadius: 2 });

// Tab 1: Bản Đồ
addStep('CREATE_FRAME', { parentId: '$dock_s04', name: 'Tab 1 Bản Đồ', width: 98, height: 76, x: 98, y: 0, backgroundColor: 'transparent' });
addStep('CREATE_TEXT', { parentId: '$dock_s04', text: '⚲', fontSize: 16, color: '#71717A', x: 139, y: 14 });
addStep('CREATE_TEXT', { parentId: '$dock_s04', text: 'Bản Đồ', fontSize: 11, color: '#71717A', x: 129, y: 36 });

// Tab 2: Đã Lưu
addStep('CREATE_FRAME', { parentId: '$dock_s04', name: 'Tab 2 Đã Lưu', width: 98, height: 76, x: 196, y: 0, backgroundColor: 'transparent' });
addStep('CREATE_TEXT', { parentId: '$dock_s04', text: '♡', fontSize: 16, color: '#71717A', x: 237, y: 14 });
addStep('CREATE_TEXT', { parentId: '$dock_s04', text: 'Đã Lưu', fontSize: 11, color: '#71717A', x: 229, y: 36 });

// Tab 3: Hồ Sơ
addStep('CREATE_FRAME', { parentId: '$dock_s04', name: 'Tab 3 Hồ Sơ', width: 98, height: 76, x: 294, y: 0, backgroundColor: 'transparent' });
addStep('CREATE_TEXT', { parentId: '$dock_s04', text: '👤', fontSize: 14, color: '#71717A', x: 337, y: 14 });
addStep('CREATE_TEXT', { parentId: '$dock_s04', text: 'Hồ Sơ', fontSize: 11, color: '#71717A', x: 330, y: 36 });


// MÀN 05: Bộ Lọc Tiêu Chí Chuyên Sâu (Modal)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 05 - Bộ Lọc Chuyên Sâu',
  width: 393, height: 852, x: BASE_X + COL_W * 4, y: BASE_Y,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's05');
addStep('CREATE_BUTTON', { parentId: '$s05', name: 'Btn / Close Filter', text: 'Đóng', backgroundColor: '#16181F', textColor: '#A1A1AA', x: 28, y: 64 }, 'btn_s05_close');
addStep('CREATE_TEXT', { parentId: '$s05', text: 'Tiêu Chí Kiến Trúc', fontSize: 22, fontStyle: 'Bold', color: '#F4F4F6', x: 28, y: 124 });
addStep('CREATE_TEXT', { parentId: '$s05', text: 'Khoảng giá: $2.5M - $12.0M USD', fontSize: 13, color: '#C5A880', x: 28, y: 168 });
addStep('CREATE_FRAME', { parentId: '$s05', name: 'Track Bar', width: 337, height: 6, x: 28, y: 196, backgroundColor: '#24262E', cornerRadius: 3 });
addStep('CREATE_FRAME', { parentId: '$s05', name: 'Active Range', width: 220, height: 6, x: 60, y: 196, backgroundColor: '#F4F4F6', cornerRadius: 3 });
addStep('CREATE_TEXT', { parentId: '$s05', text: 'Studio Kiến Trúc Trưởng', fontSize: 15, fontStyle: 'Bold', color: '#F4F4F6', x: 28, y: 240 });
addStep('CREATE_BUTTON', { parentId: '$s05', text: 'Tadao Ando Studio', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 28, y: 280 });
addStep('CREATE_BUTTON', { parentId: '$s05', text: 'Kengo Kuma & Associates', backgroundColor: '#131418', textColor: '#A1A1AA', x: 28, y: 336 });
addStep('CREATE_BUTTON', { parentId: '$s05', text: 'Zaha Hadid Architects', backgroundColor: '#131418', textColor: '#A1A1AA', x: 28, y: 392 });
addStep('CREATE_BUTTON', { parentId: '$s05', name: 'Btn / Apply Filter', text: 'Hiển Thị 14 Dinh Thự Phù Hợp', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 28, y: 730 }, 'btn_s05_apply');

// MÀN 06: Bản Đồ Định Vị Bán Đảo Sơn Trà
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 06 - Bản Đồ Định Vị GPS',
  width: 393, height: 852, x: BASE_X + COL_W * 5, y: BASE_Y,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's06');
addStep('CREATE_RECTANGLE', { parentId: '$s06', name: 'Map Image', width: 393, height: 852, x: 0, y: 0, imageUrl: IMAGES.mapSnapshot, color: '#131418' });
addStep('CREATE_BUTTON', { parentId: '$s06', name: 'Btn / Map Back', text: '← Bảng Tin', backgroundColor: '#0B0C0ECC', textColor: '#F4F4F6', x: 24, y: 64 }, 'btn_s06_back');
// Map Pin Floating Preview
addStep('CREATE_FRAME', { parentId: '$s06', name: 'Pin Card', width: 345, height: 120, x: 24, y: 670, backgroundColor: '#0D0F14F2', cornerRadius: 16 }, 'map_card');
addStep('CREATE_TEXT', { parentId: '$map_card', text: 'The Glass Sanctuary • $4.25M', fontSize: 15, fontStyle: 'Bold', color: '#F4F4F6', x: 20, y: 22 });
addStep('CREATE_TEXT', { parentId: '$map_card', text: 'Vịnh biển Sơn Trà • 850 m² • Bãi đáp trực thăng 108°', fontSize: 12, color: '#A1A1AA', x: 20, y: 48 });
addStep('CREATE_BUTTON', { parentId: '$map_card', name: 'Btn / View Pin Details', text: 'Xem Chi Tiết →', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 205, y: 68 }, 'btn_s06_pin');

// MÀN 07: Hồ Sơ Chi Tiết Dinh Thự (1 Viewport)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 07 - Chi Tiết Dinh Thự',
  width: 393, height: 852, x: BASE_X + COL_W * 6, y: BASE_Y,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's07');
addStep('CREATE_RECTANGLE', { parentId: '$s07', name: 'Cover Photo', width: 393, height: 340, x: 0, y: 0, imageUrl: IMAGES.villaPool, color: '#131418' });
addStep('CREATE_BUTTON', { parentId: '$s07', name: 'Btn / Back From Details', text: '←', backgroundColor: '#0B0C0ECC', textColor: '#F4F4F6', x: 24, y: 60 }, 'btn_s07_back');
addStep('CREATE_TEXT', { parentId: '$s07', text: 'The Glass Sanctuary Villa', fontSize: 22, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 360 });
addStep('CREATE_TEXT', { parentId: '$s07', text: 'KTS Tadao Ando • Sơn Trà • $4,250,000 USD', fontSize: 13, color: '#C5A880', x: 24, y: 392 });
// 6 Ergonomic Spec Badges
const specs = ['850 m²', '5 Suites', 'Heli-pad 108°', 'Hồ Bơi 35m', 'Hầm Rượu', 'Low-E Glass'];
specs.forEach((sp, idx) => {
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  addStep('CREATE_FRAME', { parentId: '$s07', name: `Spec / ${idx}`, width: 105, height: 38, x: 24 + col * 115, y: 430 + row * 48, backgroundColor: '#131418', cornerRadius: 8 }, `spec_${idx}`);
  addStep('CREATE_TEXT', { parentId: `$spec_${idx}`, text: sp, fontSize: 11, fontStyle: 'SemiBold', color: '#D4D4D8', x: 12, y: 12 });
});
// 2 Quick Nav Buttons
addStep('CREATE_BUTTON', { parentId: '$s07', name: 'Btn / Blueprint', text: 'Bản Vẽ CAD 1:100 →', backgroundColor: '#16181F', textColor: '#F4F4F6', x: 24, y: 550 }, 'btn_s07_cad');
addStep('CREATE_BUTTON', { parentId: '$s07', name: 'Btn / 3D View', text: 'Không Gian 360° VR →', backgroundColor: '#16181F', textColor: '#F4F4F6', x: 205, y: 550 }, 'btn_s07_3d');
addStep('CREATE_BUTTON', { parentId: '$s07', name: 'Btn / Chat Studio', text: 'Tư Vấn Studio KTS Tadao Ando →', backgroundColor: '#16181F', textColor: '#C5A880', x: 24, y: 610 }, 'btn_s07_chat');
addStep('CREATE_BUTTON', { parentId: '$s07', name: 'Btn / Schedule', text: 'Đặt Lịch Khảo Sát Riêng', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 24, y: 730 }, 'btn_s07_schedule');

// MÀN 08: Bản Vẽ Kỹ Thuật CAD 1:100
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 08 - Bản Vẽ CAD 1:100',
  width: 393, height: 852, x: BASE_X + COL_W * 7, y: BASE_Y,
  backgroundColor: '#0B0D12', cornerRadius: 44, clipsContent: true
}, 's08');
addStep('CREATE_BUTTON', { parentId: '$s08', name: 'Btn / Back From CAD', text: '←', backgroundColor: '#161922', textColor: '#F4F4F6', x: 24, y: 60 }, 'btn_s08_back');
addStep('CREATE_TEXT', { parentId: '$s08', text: 'Bản Vẽ CAD Mặt Bằng 1:100', fontSize: 20, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 120 });
addStep('CREATE_TEXT', { parentId: '$s08', text: 'Tỷ lệ tiêu chuẩn bảo tàng • Studio Tadao Ando 1995', fontSize: 12, color: '#71717A', x: 24, y: 150 });
addStep('CREATE_RECTANGLE', { parentId: '$s08', name: 'Blueprint Image', width: 345, height: 380, x: 24, y: 190, imageUrl: IMAGES.blueprintPlan, color: '#11141D', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s08', text: 'Đại sảnh thông tầng 7.2m • Diện tích 240 m²\nHồ bơi nước mặn công xôn vươn biển: 35.0m', fontSize: 12, color: '#93C5FD', x: 36, y: 600 });
addStep('CREATE_BUTTON', { parentId: '$s08', name: 'Btn / Next to 3D', text: 'Xem Không Gian 360° →', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 24, y: 730 }, 'btn_s08_3d');

// MÀN 09: Trải Nghiệm Không Gian 360° & 3D
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 09 - Không Gian 360° VR',
  width: 393, height: 852, x: BASE_X + COL_W * 8, y: BASE_Y,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's09');
addStep('CREATE_RECTANGLE', { parentId: '$s09', name: 'Panorama View', width: 393, height: 852, x: 0, y: 0, imageUrl: IMAGES.livingRoom, color: '#131418' });
addStep('CREATE_BUTTON', { parentId: '$s09', name: 'Btn / Back From 3D', text: '← Dinh Thự', backgroundColor: '#0B0C0ECC', textColor: '#F4F4F6', x: 24, y: 60 }, 'btn_s09_back');
addStep('CREATE_FRAME', { parentId: '$s09', name: 'HUD Control', width: 345, height: 90, x: 24, y: 700, backgroundColor: '#0D0F14EB', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s09', text: '360° Street View • Cuộn tự do 2D Pan', fontSize: 13, fontStyle: 'Bold', color: '#F4F4F6', x: 42, y: 720 });
addStep('CREATE_TEXT', { parentId: '$s09', text: 'Đại sảnh thông tầng 7.2m • Bán đảo Sơn Trà', fontSize: 11, color: '#A1A1AA', x: 42, y: 745 });


// =============================================================================
// ROW 2: ACTION & WORKSPACE MOBILE PATH (Màn 10 - 18)
// =============================================================================

// MÀN 10: Đặt Lịch Khảo Sát & Trực Thăng Bell 429
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 10 - Lịch Hẹn & Trực Thăng',
  width: 393, height: 852, x: BASE_X, y: BASE_Y + ROW_H,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's10');
addStep('CREATE_BUTTON', { parentId: '$s10', name: 'Btn / Back 10', text: '←', backgroundColor: '#16181F', textColor: '#F4F4F6', x: 24, y: 60 }, 'btn_s10_back');
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Lịch Khảo Sát Thực Địa', fontSize: 22, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 120 });
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Tháng 10/2026 • Đón tiếp riêng tư', fontSize: 13, color: '#71717A', x: 24, y: 152 });
// Date Choice
addStep('CREATE_FRAME', { parentId: '$s10', name: 'Selected Date', width: 345, height: 80, x: 24, y: 200, backgroundColor: '#131418', cornerRadius: 12 });
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Thứ Sáu, ngày 16 tháng 10 năm 2026', fontSize: 14, fontStyle: 'Bold', color: '#F4F4F6', x: 44, y: 220 });
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Khung giờ đón tiếp: 14:30 chiều (Góc nắng hoàng hôn)', fontSize: 12, color: '#C5A880', x: 44, y: 246 });
// Logistics Choice
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Phương Án Đón Tiếp', fontSize: 15, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 310 });
addStep('CREATE_FRAME', { parentId: '$s10', name: 'Choosen Heli', width: 345, height: 90, x: 24, y: 345, backgroundColor: '#16181F', cornerRadius: 12 });
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Trực Thăng Bell 429 (Hạ cánh sân thượng)', fontSize: 14, fontStyle: 'Bold', color: '#F4F4F6', x: 44, y: 365 });
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Toạ độ đáp 108° ESE • Phi công chuyên cơ riêng', fontSize: 12, color: '#10B981', x: 44, y: 395 });
addStep('CREATE_BUTTON', { parentId: '$s10', name: 'Btn / Confirm Viewing', text: 'Xác Nhận Đặt Lịch & Cấp Thẻ Vé', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 24, y: 730 }, 'btn_s10_submit');

// MÀN 11: Thẻ Thông Hành VIP BOARDING PASS
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 11 - Thẻ Vé VIP PASS',
  width: 393, height: 852, x: BASE_X + COL_W, y: BASE_Y + ROW_H,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's11');
addStep('CREATE_BUTTON', { parentId: '$s11', name: 'Btn / Back 11', text: '←', backgroundColor: '#16181F', textColor: '#F4F4F6', x: 24, y: 60 }, 'btn_s11_back');
addStep('CREATE_FRAME', { parentId: '$s11', name: 'Ticket Card', width: 345, height: 480, x: 24, y: 130, backgroundColor: '#111318', cornerRadius: 20 }, 'ticket');
addStep('CREATE_TEXT', { parentId: '$ticket', text: 'VIP BOARDING PASS', fontSize: 11, fontStyle: 'SemiBold', color: '#C5A880', x: 28, y: 28 });
addStep('CREATE_TEXT', { parentId: '$ticket', text: '#ARK-8821', fontSize: 24, fontStyle: 'Bold', color: '#F4F4F6', x: 28, y: 52 });
addStep('CREATE_TEXT', { parentId: '$ticket', text: 'Khách Hàng: Alexander Vance\nCông Trình: The Glass Sanctuary Villa\nThời Gian: Thứ Sáu 16/10/2026 • 14:30\nPhương Tiện: Trực Thăng Bell 429', fontSize: 13, color: '#D4D4D8', x: 28, y: 110 });
// QR Code Mock
addStep('CREATE_FRAME', { parentId: '$ticket', name: 'QR Frame', width: 180, height: 180, x: 82, y: 240, backgroundColor: '#F4F4F6', cornerRadius: 10 });
addStep('CREATE_TEXT', { parentId: '$ticket', text: 'MÃ BẢO MẬT ĐỘNG', fontSize: 10, fontStyle: 'Bold', color: '#0B0C0E', x: 120, y: 320 });
addStep('CREATE_BUTTON', { parentId: '$s11', name: 'Btn / Apple Wallet', text: 'Đồng Bộ Apple Wallet (NFC)', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 24, y: 660 });
addStep('CREATE_BUTTON', { parentId: '$s11', name: 'Btn / Next to Staff', text: 'Chuyển Sang Cổng Tác Nghiệp Staff →', backgroundColor: '#16181F', textColor: '#C5A880', x: 24, y: 730 }, 'btn_s11_staff');

// MÀN 12: Tư Vấn KTS Tadao Ando & Sửa Đổi
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 12 - Tư Vấn Trực Tiếp KTS',
  width: 393, height: 852, x: BASE_X + COL_W * 2, y: BASE_Y + ROW_H,
  backgroundColor: '#0B0C0E', cornerRadius: 44, clipsContent: true
}, 's12');
addStep('CREATE_BUTTON', { parentId: '$s12', name: 'Btn / Back 12', text: '←', backgroundColor: '#16181F', textColor: '#F4F4F6', x: 24, y: 60 }, 'btn_s12_back');
addStep('CREATE_TEXT', { parentId: '$s12', text: 'Tư Vấn Studio Tadao Ando', fontSize: 20, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 120 });
addStep('CREATE_TEXT', { parentId: '$s12', text: 'Đối thoại kỹ thuật 1-1 về tùy biến kiến trúc', fontSize: 12, color: '#71717A', x: 24, y: 150 });
// Chat bubbles
addStep('CREATE_FRAME', { parentId: '$s12', name: 'Bubble Architect', width: 300, height: 80, x: 24, y: 190, backgroundColor: '#16181F', cornerRadius: 12 });
addStep('CREATE_TEXT', { parentId: '$s12', text: 'Chào Alexander, phương án kéo dài hồ bơi +4m hoàn toàn khả thi với hệ dầm bê tông dự ứng lực.', fontSize: 12, color: '#E4E4E7', x: 40, y: 208 });
addStep('CREATE_FRAME', { parentId: '$s12', name: 'Bubble Client', width: 280, height: 70, x: 89, y: 290, backgroundColor: '#24262E', cornerRadius: 12 });
addStep('CREATE_TEXT', { parentId: '$s12', text: 'Tuyệt vời. Vui lòng lập dự toán phụ lục và gửi sang bộ phận pháp lý giúp tôi.', fontSize: 12, color: '#F4F4F6', x: 105, y: 308 });
addStep('CREATE_BUTTON', { parentId: '$s12', name: 'Btn / Call Video', text: 'Bắt Đầu Gọi Video Trực Tuyến', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 24, y: 730 });

// MÀN 13: [STAFF] Điều Phối Hậu Cần Bay (Mobile Concierge)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 13 - Staff Điều Phối Bay',
  width: 393, height: 852, x: BASE_X + COL_W * 3, y: BASE_Y + ROW_H,
  backgroundColor: '#0D0E12', cornerRadius: 44, clipsContent: true
}, 's13');
addStep('CREATE_TEXT', { parentId: '$s13', text: 'STAFF OPERATIONS', fontSize: 10, fontStyle: 'SemiBold', color: '#C5A880', x: 24, y: 64 });
addStep('CREATE_TEXT', { parentId: '$s13', text: 'Điều Phối Hàng Không', fontSize: 22, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 88 });
addStep('CREATE_FRAME', { parentId: '$s13', name: 'Mission Card', width: 345, height: 200, x: 24, y: 140, backgroundColor: '#13151C', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s13', text: 'CHUYẾN BAY TRỰC THĂNG BELL 429', fontSize: 11, fontStyle: 'Bold', color: '#10B981', x: 44, y: 164 });
addStep('CREATE_TEXT', { parentId: '$s13', text: 'Khách VIP: Alexander Vance\nĐiểm đến: Sân đỗ tầng mái The Glass Sanctuary\nThời gian: Thứ Sáu 16/10/2026 • 14:30', fontSize: 13, color: '#F4F4F6', x: 44, y: 195 });
addStep('CREATE_BUTTON', { parentId: '$s13', name: 'Btn / Approve Flight', text: 'Phê Duyệt Lệnh Bay #ARK-8821', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 44, y: 280 });
addStep('CREATE_BUTTON', { parentId: '$s13', name: 'Btn / Next Staff Architect', text: 'Xem Bàn Vẽ KTS Thẩm Định →', backgroundColor: '#16181F', textColor: '#C5A880', x: 24, y: 730 }, 'btn_s13_arch');

// MÀN 14: [STAFF] Studio KTS Thẩm Định Sửa Đổi (Mobile Architect)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 14 - Staff KTS Thẩm Định',
  width: 393, height: 852, x: BASE_X + COL_W * 4, y: BASE_Y + ROW_H,
  backgroundColor: '#0D0E12', cornerRadius: 44, clipsContent: true
}, 's14');
addStep('CREATE_TEXT', { parentId: '$s14', text: 'STUDIO TADAO ANDO', fontSize: 10, fontStyle: 'SemiBold', color: '#C5A880', x: 24, y: 64 });
addStep('CREATE_TEXT', { parentId: '$s14', text: 'Thẩm Định Đơn Tùy Biến', fontSize: 22, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 88 });
addStep('CREATE_FRAME', { parentId: '$s14', name: 'Docket Card', width: 345, height: 260, x: 24, y: 140, backgroundColor: '#13151C', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s14', text: 'ĐƠN SỬA ĐỔI #MOD-04', fontSize: 11, fontStyle: 'Bold', color: '#C5A880', x: 44, y: 164 });
addStep('CREATE_TEXT', { parentId: '$s14', text: 'Hạng mục: Kéo dài hồ bơi vô cực +4m vươn vách biển\nĐánh giá kết cấu: KHẢ THI (Đạt chuẩn dầm B35)\nDự toán phụ lục: +$480,000 USD\nThời gian thi công thêm: +6 tuần', fontSize: 13, color: '#D4D4D8', x: 44, y: 195 });
addStep('CREATE_BUTTON', { parentId: '$s14', name: 'Btn / Approve Mod', text: 'Ký Duyệt Hồ Sơ Kỹ Thuật', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 44, y: 330 });
addStep('CREATE_BUTTON', { parentId: '$s14', name: 'Btn / Next Staff Escrow', text: 'Xem Kiểm Soát Ký Quỹ Escrow →', backgroundColor: '#16181F', textColor: '#C5A880', x: 24, y: 730 }, 'btn_s14_escrow');

// MÀN 15: [STAFF] Kiểm Soát Ký Quỹ Escrow (Mobile Finance)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 15 - Staff Kiểm Soát Escrow',
  width: 393, height: 852, x: BASE_X + COL_W * 5, y: BASE_Y + ROW_H,
  backgroundColor: '#0D0E12', cornerRadius: 44, clipsContent: true
}, 's15');
addStep('CREATE_TEXT', { parentId: '$s15', text: 'LEGAL & ESCROW', fontSize: 10, fontStyle: 'SemiBold', color: '#C5A880', x: 24, y: 64 });
addStep('CREATE_TEXT', { parentId: '$s15', text: 'Khóa Ký Quỹ Multi-Sig', fontSize: 22, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 88 });
addStep('CREATE_FRAME', { parentId: '$s15', name: 'Escrow Card', width: 345, height: 230, x: 24, y: 140, backgroundColor: '#13151C', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s15', text: 'HỢP ĐỒNG THÔNG MINH #ESCROW-68', fontSize: 11, fontStyle: 'Bold', color: '#10B981', x: 44, y: 164 });
addStep('CREATE_TEXT', { parentId: '$s15', text: 'Tài sản bảo chứng: 68.20 BTC ($4,250,000 USD)\nCơ chế ký số: Multi-Signature 3/5 Chìa khóa\nTrạng thái: ĐÃ KHÓA TRUNG GIAN', fontSize: 13, color: '#D4D4D8', x: 44, y: 195 });
addStep('CREATE_BUTTON', { parentId: '$s15', name: 'Btn / Confirm Escrow', text: 'Xác Nhận Đối Soát Quỹ', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 44, y: 300 });
addStep('CREATE_BUTTON', { parentId: '$s15', name: 'Btn / Next Admin', text: 'Chuyển Sang Cổng Admin Quản Trị →', backgroundColor: '#16181F', textColor: '#C5A880', x: 24, y: 730 }, 'btn_s15_admin');

// MÀN 16: [ADMIN] Trung Tâm Điều Hành Nền Tảng (Mobile Admin Dashboard)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 16 - Admin Điều Hành',
  width: 393, height: 852, x: BASE_X + COL_W * 6, y: BASE_Y + ROW_H,
  backgroundColor: '#090A0D', cornerRadius: 44, clipsContent: true
}, 's16');
addStep('CREATE_TEXT', { parentId: '$s16', text: 'SUPER ADMIN PORTAL', fontSize: 10, fontStyle: 'SemiBold', color: '#C5A880', x: 24, y: 64 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'Trung Tâm Quản Trị', fontSize: 22, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 88 });
// 2 Bento Metrics
addStep('CREATE_FRAME', { parentId: '$s16', name: 'Metric 1', width: 165, height: 90, x: 24, y: 135, backgroundColor: '#111318', cornerRadius: 12 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'TỔNG TÀI SẢN KÍN', fontSize: 9, fontStyle: 'Bold', color: '#71717A', x: 38, y: 152 });
addStep('CREATE_TEXT', { parentId: '$s16', text: '$148.5M', fontSize: 18, fontStyle: 'Bold', color: '#F4F4F6', x: 38, y: 175 });

addStep('CREATE_FRAME', { parentId: '$s16', name: 'Metric 2', width: 165, height: 90, x: 204, y: 135, backgroundColor: '#111318', cornerRadius: 12 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'QUỸ KÝ QUỸ ESCROW', fontSize: 9, fontStyle: 'Bold', color: '#71717A', x: 218, y: 152 });
addStep('CREATE_TEXT', { parentId: '$s16', text: '682.4 BTC', fontSize: 18, fontStyle: 'Bold', color: '#10B981', x: 218, y: 175 });
// Listing Approvals Queue
addStep('CREATE_FRAME', { parentId: '$s16', name: 'Approval Card', width: 345, height: 180, x: 24, y: 245, backgroundColor: '#111318', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'DUYỆT NIÊM YẾT OFF-MARKET', fontSize: 11, fontStyle: 'Bold', color: '#C5A880', x: 44, y: 268 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'The Glass Sanctuary Villa • $4.25M\nStudio Tadao Ando • Bán Đảo Sơn Trà\nHồ sơ: Đã kiểm định CAD 1:100 & Ký NDA', fontSize: 12, color: '#D4D4D8', x: 44, y: 295 });
addStep('CREATE_BUTTON', { parentId: '$s16', name: 'Btn / Admin Approve', text: 'Phê Duyệt Phát Hành Toàn Cầu', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 44, y: 360 });
addStep('CREATE_BUTTON', { parentId: '$s16', name: 'Btn / Next Admin RBAC', text: 'Quản Lý Danh Mục Phân Quyền RBAC →', backgroundColor: '#16181F', textColor: '#C5A880', x: 24, y: 730 }, 'btn_s16_rbac');

// MÀN 17: [ADMIN] Quản Lý Phân Quyền 3 Nhóm (Mobile RBAC Directory)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 17 - Admin Phân Quyền RBAC',
  width: 393, height: 852, x: BASE_X + COL_W * 7, y: BASE_Y + ROW_H,
  backgroundColor: '#090A0D', cornerRadius: 44, clipsContent: true
}, 's17');
addStep('CREATE_TEXT', { parentId: '$s17', text: 'RBAC DIRECTORY', fontSize: 10, fontStyle: 'SemiBold', color: '#C5A880', x: 24, y: 64 });
addStep('CREATE_TEXT', { parentId: '$s17', text: 'Phân Quyền 3 Nhóm User', fontSize: 22, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 88 });

const rbacUsers = [
  { name: 'Alexander Vance', role: 'Nhóm 3: Hội Viên Patron', perm: 'Quyền xem off-market & Sotheby’s', y: 140 },
  { name: 'Studio Tadao Ando', role: 'Nhóm 2: KTS Trưởng', perm: 'Quyền cập nhật CAD & họp Live Call', y: 240 },
  { name: 'Marcus Sterling', role: 'Nhóm 2: VIP Concierge', perm: 'Quyền điều phối bay Bell 429 & PassKit', y: 340 },
  { name: 'Super Admin Governance', role: 'Nhóm 1: Admin Toàn Cầu', perm: 'Toàn quyền cấu hình Enclave & Escrow', y: 440 }
];

rbacUsers.forEach((u, i) => {
  addStep('CREATE_FRAME', { parentId: '$s17', name: `User / ${i}`, width: 345, height: 82, x: 24, y: u.y, backgroundColor: '#111318', cornerRadius: 10 }, `u_${i}`);
  addStep('CREATE_TEXT', { parentId: `$u_${i}`, text: u.name, fontSize: 13, fontStyle: 'Bold', color: '#F4F4F6', x: 18, y: 16 });
  addStep('CREATE_TEXT', { parentId: `$u_${i}`, text: `${u.role} • ${u.perm}`, fontSize: 11, color: '#A1A1AA', x: 18, y: 42 });
});
addStep('CREATE_BUTTON', { parentId: '$s17', name: 'Btn / Next Admin Approval', text: 'Kiểm Duyệt Hồ Sơ Niêm Yết Kín →', backgroundColor: '#16181F', textColor: '#C5A880', x: 24, y: 730 }, 'btn_s17_listing');

// MÀN 18: [ADMIN] Phê Duyệt Niêm Yết Kín (Mobile Listing Governance)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 18 - Admin Duyệt Niêm Yết',
  width: 393, height: 852, x: BASE_X + COL_W * 8, y: BASE_Y + ROW_H,
  backgroundColor: '#090A0D', cornerRadius: 44, clipsContent: true
}, 's18');
addStep('CREATE_TEXT', { parentId: '$s18', text: 'CATALOG GOVERNANCE', fontSize: 10, fontStyle: 'SemiBold', color: '#C5A880', x: 24, y: 64 });
addStep('CREATE_TEXT', { parentId: '$s18', text: 'Ký Duyệt Phát Hành Kiệt Tác', fontSize: 20, fontStyle: 'Bold', color: '#F4F4F6', x: 24, y: 88 });
addStep('CREATE_RECTANGLE', { parentId: '$s18', name: 'Villa Release', width: 345, height: 220, x: 24, y: 130, imageUrl: IMAGES.villaFront, color: '#131418', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s18', text: 'The Glass Sanctuary Villa • $4,250,000 USD\nĐã thẩm định: Pháp lý hoàn tất • Bản vẽ CAD 1:100\nTrạng thái phát hành: SẴN SÀNG ĐẨY LÊN BẢNG TIN CLIENT', fontSize: 12, color: '#D4D4D8', x: 24, y: 375 });
addStep('CREATE_BUTTON', { parentId: '$s18', name: 'Btn / Release to Feed', text: 'Phát Hành Lên Feed Khách Hàng', backgroundColor: '#F4F4F6', textColor: '#0B0C0E', x: 24, y: 660 });
addStep('CREATE_BUTTON', { parentId: '$s18', name: 'Btn / Return to Client Feed', text: 'Quay Lại Bảng Tin Client (Màn 04) ↺', backgroundColor: '#16181F', textColor: '#C5A880', x: 24, y: 730 }, 'btn_s18_home');

console.log(`Generated ${steps.length} batch steps for 18 Elite Mobile Screens!`);

async function run() {
  if (fs.existsSync('golden-path-refs.json')) {
    try {
      const oldRefs = JSON.parse(fs.readFileSync('golden-path-refs.json', 'utf8'));
      console.log('🧹 Cleaning up previous golden path frames...');
      for (let i = 1; i <= 18; i++) {
        const key = `s${i < 10 ? '0' + i : i}`;
        if (oldRefs[key]) {
          await post('DELETE_NODE', { nodeId: oldRefs[key] });
        }
      }
    } catch (cleanErr) {
      console.log('Clean warning:', cleanErr.message);
    }
  }

  console.log('🚀 Dispatching 18 Elite Mobile Screens (393x852) to Figma Canvas via Bridge...');
  const res = await post('BATCH_EXECUTE', { steps });
  console.log('Result status:', res.success ? 'SUCCESS' : 'FAILED', res.error || '');
  if (res.success && res.data && res.data.refMap) {
    fs.writeFileSync('golden-path-refs.json', JSON.stringify(res.data.refMap, null, 2), 'utf8');
    console.log('✅ Successfully saved golden-path-refs.json with', Object.keys(res.data.refMap).length, 'refs!');
  }
}

run().catch(console.error);


