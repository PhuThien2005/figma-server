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
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

const VIETNAMESE_DICTIONARY = {
  // Splash & Onboarding
  "Architectural Estates & Living": "Dinh Thự Kiến Trúc & Nghệ Thuật Sống",
  "Daylight Porcelain • 2026 Edition": "Phiên Bản Daylight Porcelain • 2026",
  "Curated by Pritzker Masters": "Tuyển Chọn Bởi Bậc Thầy Pritzker",
  "Discover private oceanfront villas and pavilions crafted by legendary architects.": "Khám phá biệt thự biển riêng tư và dinh thự kiệt tác từ các kiến trúc sư huyền thoại.",
  "Step 1 of 3 • Pritzker Architecture": "Bước 1/3 • Kiến Trúc Pritzker",
  "Continue  →": "Tiếp Tục  →",
  "Cinematic 4K & VR Walkthroughs": "Trải Nghiệm 4K & Tour Thực Tế Ảo 3D",
  "Step inside each residence with 3D Matterport spatial scans and solar path studies.": "Bước vào từng dinh thự với quét không gian 3D Matterport và nghiên cứu hướng nắng.",
  "Step 2 of 3 • Pritzker Architecture": "Bước 2/3 • Không Gian Thực Tế Ảo",
  "Direct Studio Advisory": "Tư Vấn Trực Tiếp Cùng KTS Trưởng",
  "Connect directly with lead architectural partners for tailored land acquisition.": "Kết nối trực tiếp với văn phòng KTS trưởng để tư vấn quỹ đất riêng biệt.",
  "Step 3 of 3 • Pritzker Architecture": "Bước 3/3 • Cố Vấn Kiến Trúc VIP",
  "Get Started  ✦": "Bắt Đầu Ngay  ✦",

  // Authentication
  "Welcome to ARKI": "Chào Mừng Đến Với ARKI",
  "Private Luxury Clientele Access": "Cổng Khách Hàng Kiến Trúc Thượng Lưu",
  "Sign In to Collection  ✦": "Đăng Nhập Bộ Sưu Tập  ✦",
  "Scan FaceID Signature  •  Biometrics": "Quét Chữ Ký FaceID  •  Sinh Trắc Học",
  "Enter as Observer Guest →": "Tham Quan Với Tư Cách Khách →",
  "FaceID Biometric Gate": "Cổng Sinh Trắc Học FaceID",
  "Biometric Verified • Alexander Vance": "Xác Thực Sinh Trắc • Alexander Vance",
  "Hardware Token #ARK-SEC-992 Authorized": "Mã Khóa Phần Cứng #ARK-SEC-992 Đã Cấp Phép",
  "Authorize & Enter  ✦": "Ủy Quyền & Truy Cập  ✦",
  "Security Token Key": "Mã Khóa Bảo Mật OTP",
  "Enter 6-digit code sent to private terminal": "Nhập mã 6 chữ số gửi tới thiết bị bảo mật cá nhân",
  "⏱ Resend private token in 0:42": "⏱ Gửi lại mã bảo mật sau 0:42",
  "Confirm Authentication  ✦": "Xác Nhận Xác Thực  ✦",
  "Confidentiality NDA": "Thỏa Thuận Bảo Mật NDA",
  "✓  I accept terms of confidential off-market viewing": "✓  Tôi đồng ý điều khoản xem bất động sản kín (Off-market)",
  "Execute NDA & Enter  ✦": "Ký NDA & Truy Cập  ✦",

  // Feeds & Search
  "🔍  Search Tadao Ando, Oceanfront, Ba Vi...": "🔍  Tìm Tadao Ando, Biệt thự biển, Ba Vì...",
  "✦ All": "✦ Tất Cả",
  "🌊 Ocean": "🌊 Ven Biển",
  "🏛 Brutalist": "🏛 Bê Tông Thô",
  "🌲 Biophilic": "🌲 Sinh Thái",
  "The Glass Sanctuary Villa": "Dinh Thự The Glass Sanctuary",
  "Son Tra Coastline • KTS Tadao Ando • 850 m²": "Vách Biển Sơn Trà • KTS Tadao Ando • 850 m²",
  "View Estate →": "Xem Dinh Thự →",
  "Explore ✦": "Khám Phá ✦",
  "✦ Feed      🗺 Map      ♡ Saved      👤 VIP": "✦ Khám Phá      🗺 Bản Đồ      ♡ Đã Lưu      👤 Hồ Sơ",
  "Architectural Criteria": "Tiêu Chí Kiến Trúc",
  "PRICE RANGE: $2,500,000 — $12,000,000": "KHOẢNG GIÁ: $2,500,000 — $12,000,000",
  "MASTER ARCHITECT STUDIO": "VĂN PHÒNG KIẾN TRÚC SƯ TRƯỞNG",
  "ESTATE AMENITIES": "TIỆN ÍCH DINH THỰ",
  "🚁 Private Heli-pad": "🚁 Bãi Đáp Trực Thăng Riêng",
  "🏊 35m Infinity Pool": "🏊 Hồ Bơi Vô Cực 35m",
  "🍷 Wine Cellar": "🍷 Hầm Rượu Vang Đẳng Cấp",
  "Apply Filters (Show 14 Estates)  ✦": "Áp Dụng Bộ Lọc (14 Dinh Thự)  ✦",
  "Filtered Masterpieces (14)": "Kiệt Tác Phù Hợp (14)",
  "Showing 14 residences matching Tadao Ando & Oceanfront": "Hiển thị 14 dinh thự ven biển từ KTS Tadao Ando",
  "Access Feature  ✦": "Xem Chi Tiết  ✦",

  // Maps
  "The Glass Sanctuary Villa • $4.25M\nSon Tra Coastline • 850 m² • 5 Suites": "Dinh Thự The Glass Sanctuary • $4.25M\nVách Biển Sơn Trà • 850 m² • 5 Phòng Ngủ",
  "Pin Details: Glass Sanctuary": "Chi Tiết Vị Trí: Glass Sanctuary",
  "Son Tra Bay • 850 m² • $4,250,000 • Heli-pad Included": "Vịnh Sơn Trà • 850 m² • $4,250,000 • Kèm Bãi Đáp Trực Thăng",

  // Details
  "$4,250,000 • KTS Tadao Ando • Son Tra Peninsula": "$4,250,000 • KTS Tadao Ando • Bán Đảo Sơn Trà",
  "▶ Watch 4K Tour": "▶ Xem Video 4K",
  "🥽 3D Matterport": "🥽 Không Gian 3D",
  "Land: 1,450 m²   •   Built: 850 m²   •   Year: 2026\nCeiling: 7.2m   •   Pool: 35m Saltwater   •   Heli-pad: Yes": "Khuôn viên: 1,450 m²   •   Xây dựng: 850 m²   •   Năm: 2026\nTrần cao: 7.2m   •   Hồ bơi: 35m Nước mặn   •   Sân đỗ Heli: Có",
  "Schedule Private Viewing  ✦": "Đặt Lịch Xem Riêng Tư  ✦",
  "Cedar Pavilion Atrium": "Dinh Thự Cedar Pavilion",
  "$3,800,000 • KTS Kengo Kuma • Ba Vi Mountain": "$3,800,000 • KTS Kengo Kuma • Rừng Thông Ba Vì",
  "Fluid Dune Villa": "Dinh Thự Fluid Dune",
  "$5,900,000 • Zaha Hadid Architects • Mui Ne Coast": "$5,900,000 • Zaha Hadid Architects • Đồi Cát Mũi Né",

  // Philosophy & Blueprints
  "Studio Tadao Ando": "Văn Phòng Tadao Ando",
  "\"Architecture must provide a sanctuary where nature, light, and geometry merge.\"": "\"Kiến trúc phải là thánh đường nơi thiên nhiên, ánh sáng và hình học hòa làm một.\"",
  "Level 1 Architectural Plan": "Bản Vẽ Mặt Bằng Tầng 1",
  "Scale 1:100 • 850 m² • 5 Suites • Cantilever Pool": "Tỷ lệ 1:100 • 850 m² • 5 Phòng Ngủ • Hồ Bơi Vươn",
  "ZONE A: LIVING ATRIUM\n140 m² • Ceiling +7.2m\nTravertine Navona Finish": "KHU VỰC A: PHÒNG KHÁCH THÔNG TẦNG\n140 m² • Trần cao +7.2m\nỐp đá Travertine Navona",
  "CANTILEVER POOL 35m x 4.5m\nOverflow Edge Over Ocean Horizon": "HỒ BƠI VƯƠN CONSOLE 35m x 4.5m\nTràn viền vô cực hướng chân trời đại dương",
  "↑ N (North Orientation 108° ESE)   •   Scale 1:100": "↑ BẮC (Hướng 108° Đông Đông Nam)   •   Tỷ lệ 1:100",
  "Download High-Res CAD DWG / PDF  ✦": "Tải Bản Vẽ Kỹ Thuật CAD DWG / PDF  ✦",
  "Penthouse & Heli-pad Plan": "Mặt Bằng Tầng Mái & Bãi Đáp Trực Thăng",
  "Approach Angle 108° ESE • Solar Glass Roof Terrace": "Góc tiếp cận 108° ĐĐN • Sân thượng mái kính năng lượng",
  "Material Board & Finishes": "Bảng Vật Liệu & Hoàn Thiện",
  "Navona Travertine Stone\nRome, Italy • Honed Finish": "Đá Tự Nhiên Travertine Navona\nRome, Ý • Mài mờ cao cấp",
  "Shou Sugi Ban Charred Wood\nKyoto, Japan • Fire Treated": "Gỗ Cháy Shou Sugi Ban\nKyoto, Nhật Bản • Xử lý nhiệt truyền thống",
  "Raw Aerospace Titanium 4mm\nKobe, Japan • Salt Resistant": "Titanium Hàng Không 4mm\nKobe, Nhật Bản • Kháng muối biển",
  "Triple Glazed Low-E Solar Glass\nSaint-Gobain • 99.8% UV Block": "Kính Hộp Low-E 3 Lớp Cách Nhiệt\nSaint-Gobain • Chặn 99.8% tia UV",
  "Order Physical Sample Box  ✦": "Đặt Hộp Mẫu Vật Liệu Thực Tế  ✦",
  "24-Hour Solar Radiation": "Biểu Đồ Nắng & Bức Xạ 24 Giờ",
  "☀️\n06:00 AM (Dawn)\nSun Angle 18° E": "☀️\n06:00 Sáng (Bình Minh)\nGóc chiếu 18° Đông",
  "☀️\n12:00 PM (Zenith)\nDeep Cantilever Shade": "☀️\n12:00 Trưa (Đỉnh Điểm)\nMái vươn console che bóng râm",
  "⚡ 84% Passive Cooling Efficiency\n48.5 kWh/day Clean Rooftop Solar Generation": "⚡ 84% Hiệu quả làm mát tự nhiên\n48.5 kWh/ngày Điện mặt trời áp mái sạch",
  "View Complete Climatology Report  ✦": "Xem Báo Cáo Khí Hậu Học Toàn Diện  ✦",

  // VR & Video
  "◉ Walk to Terrace": "◉ Bước Ra Ban Công",
  "◉ Enter Living Room": "◉ Vào Phòng Khách",
  "🥽 Apple Vision Pro / Meta Quest 3 Ready\nGyroscope Spatial Tracking Active": "🥽 Sẵn sàng cho Apple Vision Pro / Meta Quest 3\nĐịnh vị không gian Gyroscope đang bật",
  "3D Isometric Dollhouse": "Mô Hình Bóc Mái 3D Dollhouse",
  "Full Multi-Level Cutaway • Structure & Plumbing Layers": "Mặt cắt đa tầng toàn diện • Kết cấu & hệ thống kỹ thuật",
  "02:45 / 04:10 • 4K HDR 60fps • Dolby Atmos 7.1.4": "02:45 / 04:10 • 4K HDR 60fps • Âm Thanh Dolby Atmos",
  "✕ Exit Video Tour": "✕ Thoát Video Tour",

  // Sliders
  "Slide 1 of 5": "Ảnh 1 / 5",
  "Photo 1/5: Living Atrium": "Ảnh 1/5: Đại Sảnh Thông Tầng",
  "7.2m Ceiling Height • Navona Travertine Walls": "Trần cao 7.2m • Vách ốp đá Travertine Navona",
  "Next Photo →": "Ảnh Kế Tiếp →",
  "Slide 2 of 5": "Ảnh 2 / 5",
  "Photo 2/5: Boffi Kitchen": "Ảnh 2/5: Không Gian Bếp Boffi",
  "4.8m Calacatta Monolith Island • Gaggenau 400 Series": "Đảo bếp Calacatta 4.8m • Gaggenau 400 Series",
  "Slide 3 of 5": "Ảnh 3 / 5",
  "Photo 3/5: Infinity Pool": "Ảnh 3/5: Hồ Bơi Vô Cực",
  "35m Cantilever Saltwater Pool Facing Sunset Horizon": "Hồ bơi nước mặn 35m vươn console ngắm trọn hoàng hôn",
  "Slide 4 of 5": "Ảnh 4 / 5",
  "Photo 4/5: Master Sanctuary": "Ảnh 4/5: Phòng Ngủ Master",
  "180° Ocean Glazing • Private Japanese Hinoki Soaking Tub": "Kính tràn 180° ngắm biển • Bồn ngâm gỗ Hinoki Nhật",
  "Slide 5 of 5": "Ảnh 5 / 5",
  "Photo 5/5: Sommelier Cellar": "Ảnh 5/5: Hầm Rượu Sommelier",
  "2,400 Bottles Capacity • 14°C Controlled Climate": "Sức chứa 2,400 chai • Kiểm soát nhiệt độ 14°C",

  // Booking & Pass
  "Schedule Private Viewing": "Đặt Lịch Xem Riêng Tư",
  "SELECT TIME SLOT (VIP ACCESS)": "CHỌN KHUNG GIỜ (ĐẶC QUYỀN VIP)",
  "✓ 14:30 PM (Selected)": "✓ 14:30 (Đã Chọn)",
  "Confirm Viewing Request  ✦": "Xác Nhận Yêu Cầu Xem  ✦",
  "Transportation Logistics": "Phương Thức Đón Tiếp",
  "Bell 429 Helicopter • 60ft Sunseeker Yacht • Rolls-Royce": "Trực thăng Bell 429 • Du thuyền Sunseeker 60ft • Rolls-Royce",
  "✓ Viewing Confirmed": "✓ Xác Nhận Lịch Xem Thành Công",
  "Add to Apple Wallet  ✦": "Thêm Vào Apple Wallet  ✦",
  "Apple Wallet Passbook": "Ví Apple Wallet",
  "NFC Contactless Pass #ARK-8821 • Ready for Transit": "Thẻ NFC Không Tiếp Xúc #ARK-8821 • Sẵn Sàng Check-in",

  // Saved Architecture
  "Saved Masterpieces (4)": "Kiệt Tác Đã Lưu (4)",
  "Total Valuation: $17,050,000 USD": "Tổng Giá Trị: $17,050,000 USD",
  "The Glass Sanctuary\n$4,250,000 • Tadao Ando": "The Glass Sanctuary\n$4,250,000 • KTS Tadao Ando",
  "Cedar Pavilion Atrium\n$3,800,000 • Kengo Kuma": "Cedar Pavilion Atrium\n$3,800,000 • KTS Kengo Kuma",
  "Fluid Dune Villa\n$5,900,000 • Zaha Hadid": "Fluid Dune Villa\n$5,900,000 • KTS Zaha Hadid",
  "Create New Curated Folder  ✦": "Tạo Bộ Sưu Tập Mới  ✦",
  "New Curated Collection": "Bộ Sưu Tập Mới",
  "Folder: Coastal Havens 2027 • Restricted Access": "Thư mục: Thiên Đường Biển 2027 • Quyền Riêng Tư",

  // Chat & Consultation
  "Studio Tadao Ando Partners": "Văn Phòng Đối Tác Tadao Ando",
  "Good afternoon Mr. Vance. The cantilevered infinity pool at Son Tra can be extended +4m into the cliffside.": "Kính chào ông Vance. Hồ bơi vô cực vươn console tại Sơn Trà hoàn toàn có thể mở rộng thêm +4m ra vách đá.",
  "Can we also install triple-glazed solar Low-E panels for the master suite?": "Văn phòng có thể lắp thêm hệ kính Low-E 3 lớp cản nhiệt cho phòng master được không?",
  "Type a message to Lead Studio Partner...": "Nhập tin nhắn gửi Kiến trúc sư trưởng...",
  "Live Architectural Call": "Cuộc Gọi Tư Vấn KTS Trực Tuyến",
  "Video Conference with Lead Design Studio • Blueprint Share": "Hội nghị trực tuyến cùng KTS Trưởng • Chia sẻ bản vẽ trực tiếp",
  "Bespoke Modification Request": "Yêu Cầu Tùy Biến Thiết Kế Riêng",
  "Extend cantilever pool by +4m • Solar glass upgrade": "Mở rộng hồ bơi console thêm +4m • Nâng cấp kính năng lượng",

  // Calculator
  "Investment Estimator": "Dự Toán Đầu Tư & Tài Chính",
  "ESTIMATED MONTHLY PAYMENT": "CHI PHÍ ƯỚC TÍNH HÀNG THÁNG",
  "$18,450 / month": "$18,450 / tháng",
  "Purchase: $4,250,000 • 30% Down ($1,275,000) • 20Y @ 4.8%": "Giá mua: $4,250,000 • Trả trước 30% ($1,275,000) • 20 năm @ 4.8%",
  "Principal & Interest: $15,200\nProperty Insurance (Lloyds): $1,450\nPrivate Concierge HOA: $1,800\n\nTotal Estimated Capital: $4,840,000": "Gốc & Lãi vay: $15,200\nBảo hiểm tài sản quốc tế: $1,450\nPhí dịch vụ quản gia VIP: $1,800\n\nTổng vốn ước tính: $4,840,000",
  "Lock Financing with Private Banking  ✦": "Khóa Gói Tài Trợ Private Banking  ✦",
  "Multi-Currency Escrow": "Ký Quỹ Đa Ngoại Tệ & Crypto",
  "10-Year Growth Forecast": "Dự Báo Tăng Trưởng 10 Năm",
  "Historical +14.2% YoY • Projected 2036 Value: $11.8M": "Tăng trưởng lịch sử +14.2%/năm • Giá trị dự phóng 2036: $11.8M",

  // Profile & Settings
  "Black Diamond Patron #004": "Hội Viên Kim Cương Đen #004",
  "3 Estates Owned      4 Wishlist      2 Drops Reserved": "3 Dinh Thự Sở Hữu      4 Mục Đã Lưu      2 Suất Đặt Chỗ",
  "Concierge Privileges  →": "Đặc Quyền Quản Gia VIP  →",
  "Biometric Security & Encryption  →": "Bảo Mật Sinh Trắc & Mã Hóa  →",
  "Tax & Multi-Currency Escrow  →": "Thuế & Ký Quỹ Đa Ngoại Tệ  →",
  "Sign Out  →": "Đăng Xuất  →",
  "Black Diamond Privileges": "Đặc Quyền Thẻ Kim Cương Đen",
  "24/7 Global Architectural Attaché • Sotheby’s Private Drops": "Tùy viên kiến trúc toàn cầu 24/7 • Bộ sưu tập kín Sotheby’s",
  "Security & Encryption": "Bảo Mật & Mã Hóa Dữ Liệu",
  "256-bit AES Multi-sig Escrow • FaceID Mandatory": "Ký quỹ đa chữ ký AES 256-bit • Bắt buộc xác thực FaceID",

  // Notifications & Utilities
  "Private Drop Alerts": "Thông Báo Bộ Sưu Tập Kín",
  "3 Unread Invitations: Off-market Tadao Ando Villa Drop": "3 Lời mời chưa đọc: Mở bán kín dinh thự Tadao Ando",
  "Encrypted Estate Sharing": "Chia Sẻ Dinh Thự Mã Hóa",
  "Single-use Time-locked Link with Biometric Watermark": "Liên kết giới hạn thời gian kèm chữ ký mờ sinh trắc",
  "Architectural Gallery (9)": "Thư Viện Ảnh Kiến Trúc (9)",
  "Curated 9-Photo Matrix • Exterior, Interior, Structural": "Ma trận 9 ảnh tuyển chọn • Ngoại thất, nội thất, kết cấu",
  "Offline 3D VR Storage": "Lưu Trữ Tour 3D VR Ngoại Tuyến",
  "Son Tra Glass Sanctuary (1.2 GB Cached for In-flight)": "Glass Sanctuary Sơn Trà (1.2 GB Đã lưu cho chuyến bay)",

  // Drawer Menu
  "THEME": "CHẾ ĐỘ GIAO DIỆN",
  "LANGUAGE": "NGÔN NGỮ",
  "QUICK ACTIONS": "LỐI TẮT NHANH",

  // Common Back
  "← Back": "← Quay lại"
};

async function main() {
  console.log('🇻🇳 Translating all Light screens to Vietnamese as default...');
  const res = await post('APPLY_VIETNAMESE_TRANSLATION', {
    dictionary: VIETNAMESE_DICTIONARY,
    filter: '[Light]'
  });

  console.log('Server response:', JSON.stringify(res, null, 2).slice(0, 500));
}

main().catch(console.error);
