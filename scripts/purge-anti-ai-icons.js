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

async function purgeIcons() {
  console.log('🧹 Purging decorative AI icons and slop from Figma texts according to anti-ai-ui skill...');

  const dictionary = {
    // Category tabs
    "✦ Tất Cả": "TẤT CẢ",
    "🌊 Ven Biển": "VEN BIỂN",
    "🏛 Bê Tông Thô": "BÊ TÔNG THÔ",
    "🌲 Sinh Thái": "SINH THÁI",
    "✦ All Works": "ALL WORKS",
    "🌊 Oceanfront": "OCEANFRONT",
    "🏛 Brutalist": "BRUTALIST",
    "🌲 Biophilic": "BIOPHILIC",

    // Action buttons & CTAs
    "Bắt Đầu Ngay  ✦": "Bắt Đầu Ngay",
    "Bắt Đầu Ngay ✦": "Bắt Đầu Ngay",
    "Đăng Nhập Bộ Sưu Tập  ✦": "Đăng Nhập",
    "Đăng Nhập Bộ Sưu Tập ✦": "Đăng Nhập",
    "Ủy Quyền & Truy Cập  ✦": "Ủy Quyền & Truy Cập",
    "Ủy Quyền & Truy Cập ✦": "Ủy Quyền & Truy Cập",
    "Xác Nhận Xác Thực  ✦": "Xác Nhận",
    "Xác Nhận Xác Thực ✦": "Xác Nhận",
    "Ký NDA & Truy Cập  ✦": "Ký NDA & Tiếp Tục",
    "Ký NDA & Truy Cập ✦": "Ký NDA & Tiếp Tục",
    "Schedule Private Viewing  ✦": "Schedule Private Viewing",
    "Get Started  ✦": "Get Started",
    "Access Private Collection  ✦": "Access Private Collection",
    "Đặt Lịch Tham Quan Riêng ✦": "Đặt Lịch Tham Quan Riêng",
    "Xác Nhận Yêu Cầu Tham Quan ✦": "Xác Nhận Yêu Cầu Tham Quan",

    // Inputs & Badges
    "🔍  Tìm Tadao Ando, Biệt thự biển, Ba Vì...": "Tìm kiếm KTS, dinh thự, vị trí...",
    "🔍 Tìm Tadao Ando, Biệt thự biển, Ba Vì...": "Tìm kiếm KTS, dinh thự, vị trí...",
    "🔍 Filter": "Bộ Lọc",
    "🗺 Map": "Bản Đồ",
    "♡ Saved": "Đã Lưu",
    "👤 Profile": "Hồ Sơ",
    "✉  alexander.vance@forbes-global.com": "alexander.vance@forbes-global.com",
    "🔒  ••••••••••••••••••••": "••••••••••••••••••••",
    "⏱ Gửi lại mã bảo mật sau 0:42": "Gửi lại mã xác thực sau 0:42",
    "⏱ Gửi lại mã sau 0:42": "Gửi lại mã xác thực sau 0:42",
    "🥽 3D Matterport VR": "Matterport 3D Spatial",
    "💬 Chat Architect": "Tư Vấn Kiến Trúc Sư",
    "📊 Investment Calc": "Dự Toán Tài Chính",
    "▶ Watch 4K Video Tour": "Xem Video Tour 4K"
  };

  const res = await post('APPLY_VIETNAMESE_TRANSLATION', { dictionary });
  console.log('Result:', res);
}

purgeIcons().catch(console.error);
