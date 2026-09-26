import ExcelJS from 'exceljs';
import path from 'path';

async function generateDetailedExcel() {
  console.log('📊 Starting Granular Excel Generation for ARKI (40 Detailed Use Cases, Actors, Flows, US & Traceability)...');

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Antigravity AI - ARKI System Architect';
  workbook.lastModifiedBy = 'ARKI Architecture Team';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Helper styles
  const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } }; // Slate 900
  const headerFont = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
  const titleFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } }; // Sky Blue 600
  const titleFont = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFFFF' } };
  const borderAll = {
    top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
  };
  const passFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
  const passFont = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF166534' } };

  // =========================================================================
  // SHEET 1: ACTORS MATRIX (ĐẶC TẢ TÁC NHÂN)
  // =========================================================================
  const wsActors = workbook.addWorksheet('1. Danh Mục Actors', { views: [{ showGridLines: true }] });
  wsActors.columns = [
    { header: 'Mã Actor', key: 'id', width: 14 },
    { header: 'Tên Tác Nhân (Actor Name)', key: 'name', width: 28 },
    { header: 'Phân Loại', key: 'type', width: 18 },
    { header: 'Mô Tả Vai Trò (Persona & Role)', key: 'role', width: 38 },
    { header: 'Phạm Vi Quyền Hạn (Permissions & Scope)', key: 'permissions', width: 44 },
    { header: 'Use Cases Tham Gia Chi Tiết', key: 'useCases', width: 36 },
    { header: 'Màn Hình Trực Tiếp Tương Tác', key: 'screens', width: 30 }
  ];

  wsActors.spliceRows(1, 0, [['🏛️ HỆ THỐNG ĐẶC TẢ TÁC NHÂN (ACTORS MATRIX) — ARKI LUXURY LIVING']]);
  wsActors.mergeCells('A1:G1');
  wsActors.getRow(1).height = 38;
  wsActors.getCell('A1').fill = titleFill;
  wsActors.getCell('A1').font = titleFont;
  wsActors.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsActors.getRow(2).height = 26;
  wsActors.getRow(2).eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const actorsData = [
    {
      id: 'ACT-01',
      name: 'Khách Quan Sát (Guest Observer)',
      type: 'Người dùng (Public)',
      role: 'Khách vãng lai quan tâm tới bất động sản kiến trúc, chưa đăng ký VIP hoặc chọn chế độ "Enter as Guest".',
      permissions: 'Chỉ xem catalog công khai, xem ảnh chụp cơ bản. Không được xem toạ độ GPS chính xác, không xem tài sản kín (Off-market), không đặt lịch trực thăng.',
      useCases: 'UC-01, UC-02, UC-03 (Guest mode), UC-07 (Public cards), UC-40',
      screens: '01 - 04, 05 (Guest button), 06 (Public cards), 25'
    },
    {
      id: 'ACT-02',
      name: 'Khách Hàng VIP (VIP Buyer / Client)',
      type: 'Người dùng (Verified VIP)',
      role: 'Khách hàng có tài sản ròng lớn (HNWI/UHNW) đã xác thực FaceID, mã OTP và ký cam kết bảo mật NDA.',
      permissions: 'Toàn quyền xem tài sản Off-market, xem toạ độ GPS bản đồ vệ tinh, trải nghiệm 360° Street View đa hướng, mô hình 3D bóc mái, xem video flycam 4K, tính tài chính và đặt lịch tham quan đón tiếp.',
      useCases: 'UC-01 đến UC-10, UC-14 đến UC-26, UC-30, UC-31, UC-38, UC-40',
      screens: '05b, 05c, 05d, 06 - 09c, 11 - 17, 20, 22, 25'
    },
    {
      id: 'ACT-03',
      name: 'Nhà Sưu Tập / Hội Viên Black Diamond',
      type: 'Người dùng (UHNW Patron)',
      role: 'Hội viên cấp cao nhất (tiêu biểu: Alexander Vance - Thẻ #004) sở hữu danh mục đầu tư kiến trúc lớn ($17M+).',
      permissions: 'Đặc quyền tư vấn Concierge riêng 24/7, quyền xem trước (Private Previews) Sotheby\'s, mã hóa khóa riêng AES-256 bit, thanh toán ký quỹ Crypto Escrow (Multi-sig BTC/ETH), quản lý bộ nhớ đệm VR Offline.',
      useCases: 'UC-10 đến UC-15, UC-21, UC-27 đến UC-37, UC-39, UC-40',
      screens: '10, 10b - 10e, 18, 18b, 19 - 19c, 20b, 20c, 21 - 21c, 22 - 24, 25'
    },
    {
      id: 'ACT-04',
      name: 'Kiến Trúc Sư Chủ Trì (Lead Architect)',
      type: 'Chuyên gia (Professional)',
      role: 'Kiến trúc sư trưởng đoạt giải Pritzker hoặc đại diện studio danh tiếng (Studio Tadao Ando, Kengo Kuma, Zaha Hadid).',
      permissions: 'Tiếp nhận kênh chat 1-1 với khách hàng VIP, họp truyền hình Live Video trực tiếp, trình chiếu bản vẽ CAD thời gian thực, thẩm định và phản hồi yêu cầu tùy biến kết cấu công trình.',
      useCases: 'UC-11, UC-12, UC-13, UC-27, UC-28, UC-29',
      screens: '10, 10b, 10c, 10d, 19, 19b, 19c'
    },
    {
      id: 'ACT-05',
      name: 'Điều Phối Viên Hậu Cần (VIP Concierge)',
      type: 'Vận hành (Operations)',
      role: 'Chuyên viên quản lý trải nghiệm đón tiếp thượng lưu và dịch vụ hàng không/hàng hải của ARKI Club.',
      permissions: 'Kiểm duyệt thỏa thuận bảo mật NDA, điều phối bãi đáp trực thăng Bell 429 nóc biệt thự, cầu cảng du thuyền Sunseeker hoặc xe Rolls-Royce; phát hành và kích hoạt thẻ VIP Pass #ARK-8821.',
      useCases: 'UC-06, UC-23, UC-24, UC-25, UC-26, UC-35',
      screens: '05d, 16, 16b, 17, 17b, 21b'
    },
    {
      id: 'ACT-06',
      name: 'Chuyên Viên Tài Chính & Ký Quỹ (Escrow Officer)',
      type: 'Tài chính (Finance)',
      role: 'Chuyên gia ngân hàng đối tác hoặc giám sát hợp đồng thông minh tài chính quốc tế.',
      permissions: 'Thiết lập tham số lãi suất vay thế chấp, quản lý tỷ giá quy đổi USD/EUR/BTC/ETH, xác nhận giải ngân tài khoản ký quỹ trung gian bảo chứng giao dịch.',
      useCases: 'UC-30, UC-31, UC-32, UC-36',
      screens: '20, 20b, 20c, 21c'
    },
    {
      id: 'SYS-01',
      name: 'Identity & Biometric Vault',
      type: 'Hệ thống ngoại vi (System)',
      role: 'Dịch vụ Apple FaceID, Secure Enclave và SMS/Hardware OTP Gateway.',
      permissions: 'Xác thực sinh trắc học khuôn mặt người dùng, sinh mã xác thực OTP 6 số ngẫu nhiên, cấp phát Session Token mã hóa #ARK-SEC-992.',
      useCases: 'UC-04, UC-05, UC-36',
      screens: '05b, 05c, 21c'
    },
    {
      id: 'SYS-02',
      name: 'Apple Wallet PassKit Gateway',
      type: 'Hệ thống ngoại vi (System)',
      role: 'Máy chủ tạo và phân phối thẻ điện tử chuẩn Apple Wallet (.pkpass) tích hợp chip NFC ảo.',
      permissions: 'Ký số chứng chỉ thẻ vé VIP PASS, đẩy thông báo cập nhật giờ bay/giờ hạ cánh trực tiếp lên Dynamic Island và Màn hình khóa iPhone.',
      useCases: 'UC-25, UC-26',
      screens: '17, 17b'
    },
    {
      id: 'SYS-03',
      name: 'Cổng Ký Quỹ Crypto & Multi-Currency',
      type: 'Hệ thống ngoại vi (System)',
      role: 'Cơ chế hợp đồng thông minh Multi-Sig Smart Contract trên blockchain và cổng thanh toán quốc tế.',
      permissions: 'Khóa tiền ký quỹ (Escrow Lock), đối soát tỷ giá thời gian thực của Bitcoin (68.2 BTC) và Ethereum, giải phóng tiền khi biên bản bàn giao được ký kết.',
      useCases: 'UC-31, UC-36',
      screens: '20b, 21c'
    },
    {
      id: 'SYS-04',
      name: 'Hệ Thống Không Vận & Hàng Hải Tư Nhân',
      type: 'Hệ thống ngoại vi (System)',
      role: 'API quản lý không phận và bến đỗ chuyên dụng phục vụ trực thăng Bell 429 và du thuyền.',
      permissions: 'Kiểm tra slot cất/hạ cánh tại toạ độ ESE 108° sân đỗ trực thăng tầng mái, xác nhận lộ trình di chuyển an toàn.',
      useCases: 'UC-13, UC-24, UC-25',
      screens: '10c, 16b, 17'
    },
    {
      id: 'SYS-05',
      name: 'Antigravity CLI & Figma Bridge Engine',
      type: 'Hệ thống ngoại vi (System)',
      role: 'Hệ thống Server trung gian WebSocket & REST API kết nối Antigravity Agent tới Figma Canvas.',
      permissions: 'Tự động hoá cập nhật 104 màn hình, 370+ prototype transitions, bơm ảnh nhị phân độ phân giải cao và thực thi UAT test suite.',
      useCases: 'UC-40, Toàn hệ thống',
      screens: 'Toàn bộ 104 màn hình'
    }
  ];

  actorsData.forEach((item) => {
    const row = wsActors.addRow(item);
    row.height = 36;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9.5 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum === 1) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // =========================================================================
  // SHEET 2: BUSINESS FLOWS
  // =========================================================================
  const wsFlows = workbook.addWorksheet('2. Luồng Nghiệp Vụ (Flows)', { views: [{ showGridLines: true }] });
  wsFlows.columns = [
    { header: 'Mã Luồng', key: 'id', width: 14 },
    { header: 'Tên Luồng Nghiệp Vụ', key: 'name', width: 32 },
    { header: 'Mục Tiêu Nghiệp Vụ Cốt Lõi', key: 'goal', width: 40 },
    { header: 'Actor Chính', key: 'primaryActor', width: 22 },
    { header: 'Actor Phụ / Dịch Vụ', key: 'subActors', width: 26 },
    { header: 'Số Màn Hình', key: 'screenCount', width: 14 },
    { header: 'Màn Hình Phụ Trách', key: 'screens', width: 34 },
    { header: 'Điểm Chạm Tương Tác Cốt Lõi (Micro-Interactions)', key: 'interactions', width: 40 }
  ];

  wsFlows.spliceRows(1, 0, [['🧭 TỔNG HỢP 9 LUỒNG NGHIỆP VỤ CỐT LÕI (CORE BUSINESS WORKFLOWS) — ARKI']]);
  wsFlows.mergeCells('A1:H1');
  wsFlows.getRow(1).height = 38;
  wsFlows.getCell('A1').fill = titleFill;
  wsFlows.getCell('A1').font = titleFont;
  wsFlows.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsFlows.getRow(2).height = 26;
  wsFlows.getRow(2).eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const flowsData = [
    { id: 'FLOW-01', name: 'Khởi Động & Xác Thực Sinh Trắc Học VIP', goal: 'Chào đón người dùng, truyền tải giá trị KTS Pritzker và xác lập phiên bảo mật ngân hàng với FaceID & OTP.', primaryActor: 'ACT-02: Khách Hàng VIP', subActors: 'ACT-01, SYS-01 (FaceID Vault)', screenCount: '8 × 2 = 16', screens: '01, 02, 03, 04, 05, 05b, 05c, 05d', interactions: 'Loading 3 giai đoạn (AFTER_TIMEOUT), trượt Onboarding (SLIDE_IN), quét FaceID hồng ngoại, bàn phím OTP ảo, ký điện tử NDA.' },
    { id: 'FLOW-02', name: 'Khám Phá, Lọc Nâng Cao & Bản Đồ Vệ Tinh', goal: 'Phân loại công trình theo phong cách, lọc theo ngân sách và KTS, tra cứu toạ độ thực tế trên bán đảo Sơn Trà.', primaryActor: 'ACT-02: Khách Hàng VIP', subActors: 'ACT-01 (Guest)', screenCount: '8 × 2 = 16', screens: '06, 06b, 06c, 06d, 07, 07b, 08, 08b', interactions: 'Chuyển tab Pill Category (DISSOLVE), khay lọc trượt từ đỉnh (MOVE_IN TOP), thanh kéo giá $2.5M - $12M, thẻ ghim bản đồ GPS.' },
    { id: 'FLOW-03', name: 'Thẩm Định Chi Tiết Dinh Thự & Triết Lý KTS', goal: 'Cung cấp hồ sơ công trình đạt chuẩn bảo tàng: bản vẽ CAD 1:100, bảng vật liệu thực và mô phỏng hướng nắng 24h.', primaryActor: 'ACT-02, ACT-03 (Patron)', subActors: 'ACT-04 (Lead Architect)', screenCount: '8 × 2 = 16', screens: '09, 09b, 09c, 10, 10b, 10c, 10d, 10e', interactions: 'Header ảnh tràn viền 393px, 6 chỉ số công thái học, xem phác thảo tay KTS, soi bản vẽ CAD, biểu đồ đổ bóng mặt trời 06h - 18h.' },
    { id: 'FLOW-04', name: 'Trải Nghiệm 3D VR, 360° Panorama & Media 4K', goal: 'Tham quan không gian thực tế ảo đa chiều, xoay mô hình bóc mái bằng tay và thưởng thức phim flycam điện ảnh.', primaryActor: 'ACT-02: Khách Hàng VIP', subActors: 'ACT-03 (Patron)', screenCount: '9 × 2 = 18', screens: '11, 11b, 12, 12a, 12b, 13, 14, 15, 15b, 15c, 23', interactions: 'Cuộn tự do 2D Pan (Ngang/Dọc/Chéo) với 4 Hotspots, xoay mô hình 3D bằng cử chỉ kéo (ON_DRAG), video Play/Pause scrubber, slider 5 ảnh vô tận.' },
    { id: 'FLOW-05', name: 'Đặt Lịch Khảo Sát VIP & Cấp Vé Apple Wallet', goal: 'Đăng ký tham quan thực địa, chọn đón tiếp bằng trực thăng/du thuyền và cấp phát thẻ thông hành điện tử bảo mật.', primaryActor: 'ACT-02: Khách Hàng VIP', subActors: 'ACT-05 (Concierge), SYS-02, SYS-04', screenCount: '4 × 2 = 8', screens: '16, 16b, 17, 17b', interactions: 'Bộ chọn lịch tháng 10/2026, chọn trực thăng Bell 429, sinh mã QR VIP PASS #ARK-8821, đồng bộ Apple Wallet Passbook NFC.' },
    { id: 'FLOW-06', name: 'Kênh Tư Vấn KTS Chủ Trì & Đề Xuất Tùy Biến', goal: 'Đối thoại bảo mật trực tiếp với văn phòng KTS Tadao Ando, họp video chia sẻ bản vẽ và lập đơn sửa đổi kiến trúc.', primaryActor: 'ACT-02, ACT-03 (Patron)', subActors: 'ACT-04: Lead Architect Studio', screenCount: '3 × 2 = 6', screens: '19, 19b, 19c', interactions: 'Nhắn tin mã hóa thời gian thực (MOVE_IN RIGHT), họp truyền hình Live Video song song mô hình 3D, biểu mẫu tùy biến hồ bơi (+4m).' },
    { id: 'FLOW-07', name: 'Máy Tính Tài Chính & Ký Quỹ Đa Tiền Tệ Escrow', goal: 'Mô phỏng đòn bẩy tài chính, dự báo tăng trưởng vốn 10 năm và hỗ trợ ký quỹ thanh toán bằng Bitcoin/Ethereum.', primaryActor: 'ACT-02, ACT-03 (Patron)', subActors: 'ACT-06 (Escrow), SYS-03 (Crypto Escrow)', screenCount: '3 × 2 = 6', screens: '20, 20b, 20c', interactions: 'Bảng tính trả trước 30% ($1.275M), tính trả góp $18,450/tháng, tỷ giá 68.2 BTC ký quỹ, biểu đồ tăng trưởng vốn +14.2%/năm lên $11.8M.' },
    { id: 'FLOW-08', name: 'Bộ Sưu Tập Yêu Thích, Hồ Sơ VIP & Offline VR', goal: 'Quản trị danh mục dinh thự quan tâm ($17M+), cài đặt bảo mật AES-256 và tải bộ nhớ đệm 3D VR phục vụ xem offline trên máy bay.', primaryActor: 'ACT-03: Alexander Vance', subActors: 'ACT-05 (Concierge)', screenCount: '8 × 2 = 16', screens: '18, 18b, 21, 21b, 21c, 22, 22b, 24', interactions: 'Thẻ lưu trữ kiệt tác, chứng nhận Black Diamond Patron #004, chia sẻ QR gắn watermark sinh trắc, tải trước 1.2GB dữ liệu VR offline.' },
    { id: 'FLOW-09', name: 'Menu Drawer Điều Hướng & Chuyển Theme / Ngôn Ngữ', goal: 'Lối tắt điều hướng nhanh qua menu 3 gạch (☰), chuyển đổi 2 chiều tức thì giữa Daylight và Nocturne Theme.', primaryActor: 'Tất cả Actors', subActors: 'SYS-05 (Bridge Engine)', screenCount: '1 × 2 = 2 (+ 104)', screens: '25 & 104 screens đối xứng', interactions: 'Trượt mở Menu Drawer từ cạnh phải (SLIDE_IN), ma trận 6 icon nét vẽ 2px, nút đổi theme 2 chiều (SMART_ANIMATE), chuyển ngữ VI/EN.' }
  ];

  flowsData.forEach((item) => {
    const row = wsFlows.addRow(item);
    row.height = 36;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9.5 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum === 1) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // =========================================================================
  // SHEET 3: USER STORIES (20 US THEO CHUẨN AGILE)
  // =========================================================================
  const wsUS = workbook.addWorksheet('3. User Stories (Agile)', { views: [{ showGridLines: true }] });
  wsUS.columns = [
    { header: 'Mã US', key: 'id', width: 12 },
    { header: 'Phân Hệ', key: 'module', width: 22 },
    { header: 'Actor (As a...)', key: 'actor', width: 24 },
    { header: 'Hành Động & Tính Năng (I want...)', key: 'action', width: 36 },
    { header: 'Giá Trị Đạt Được (So that...)', key: 'value', width: 36 },
    { header: 'Tiêu Chí Chấp Nhận (Acceptance Criteria)', key: 'ac', width: 45 },
    { header: 'Màn Hình', key: 'screens', width: 18 },
    { header: 'Ưu Tiên', key: 'priority', width: 14 }
  ];

  wsUS.spliceRows(1, 0, [['🎯 MA TRẬN 20 USER STORIES CHUẨN AGILE — ARKI ECOSYSTEM']]);
  wsUS.mergeCells('A1:H1');
  wsUS.getRow(1).height = 38;
  wsUS.getCell('A1').fill = titleFill;
  wsUS.getCell('A1').font = titleFont;
  wsUS.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsUS.getRow(2).height = 26;
  wsUS.getRow(2).eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const usData = [
    { id: 'US-01', module: 'Onboarding & Branding', actor: 'Khách Hàng VIP (ACT-02)', action: 'Trải nghiệm màn hình Splash tải dữ liệu 3 giai đoạn và các slide giới thiệu KTS Pritzker.', value: 'Thấu cảm đẳng cấp nghệ thuật và sự khác biệt của câu lạc bộ kiến trúc ngay từ lần đầu mở app.', ac: 'Given mở app; When thời gian trôi qua 800ms -> 700ms -> 600ms; Then tiến trình tăng 15% -> 65% -> 100% và tự trượt sang Onboarding 1.', screens: '01, 02, 03, 04', priority: 'Must Have' },
    { id: 'US-02', module: 'Xác Thực & Bảo Mật', actor: 'Khách Hàng VIP (ACT-02)', action: 'Đăng nhập bảo mật qua cổng sinh trắc FaceID và nhập mã xác thực OTP 6 số.', value: 'Đảm bảo danh tính thượng lưu và các thỏa thuận tài sản kín hoàn toàn bảo mật.', ac: 'Given ở cổng login 05; When quét FaceID thành công và nhập đúng 6 số OTP; Then hệ thống cấp token #ARK-SEC-992 và chuyển vào thỏa thuận NDA.', screens: '05, 05b, 05c, 05d', priority: 'Must Have' },
    { id: 'US-03', module: 'Khám Phá Danh Mục', actor: 'Nhà Sưu Tập (ACT-03)', action: 'Duyệt bảng tin kiệt tác theo 4 nhóm phong cách (Tất cả, Biển Sơn Trà, Bê tông thô mộc, Sinh thái).', value: 'Tiếp cận đúng ngôn ngữ kiến trúc yêu thích mà không bị phân tán thông tin.', ac: 'Given ở Home Feed; When bấm vào các chip tab phong cách; Then danh sách cập nhật ngay lập tức các dinh thự tương ứng kèm mức giá chuẩn.', screens: '06, 06b, 06c, 06d', priority: 'Must Have' },
    { id: 'US-04', module: 'Bộ Lọc Chuyên Sâu', actor: 'Khách Hàng VIP (ACT-02)', action: 'Lọc dinh thự theo tầm giá $2.5M - $12M và văn phòng KTS trưởng (Tadao Ando, Kengo Kuma, Zaha Hadid).', value: 'Nhanh chóng tìm thấy bất động sản vừa vặn với ngân sách và gu thẩm mỹ cá nhân.', ac: 'Given mở khay lọc 07; When kéo thanh trượt giá và chọn KTS Tadao Ando; Then màn hình 07b trả về đúng 14 dinh thự thỏa mãn.', screens: '07, 07b', priority: 'Must Have' },
    { id: 'US-05', module: 'Bản Đồ Địa Lý Vệ Tinh', actor: 'Khách Hàng VIP (ACT-02)', action: 'Xem bản đồ vệ tinh định vị toạ độ GPS các dinh thự và chạm ghim xem tóm tắt.', value: 'Đánh giá địa thế phong thủy, cự ly bờ biển và góc tiếp cận bãi đáp trực thăng.', ac: 'Given ở tab Bản đồ 08; When chạm vào ghim GPS; Then thẻ nổi 08b hiển thị ảnh và diện tích 850m2, bấm View Pin vào ngay trang chi tiết.', screens: '08, 08b', priority: 'Must Have' },
    { id: 'US-06', module: 'Thẩm Định Chi Tiết', actor: 'Khách Hàng VIP (ACT-02)', action: 'Xem hồ sơ bất động sản với ảnh tràn viền 393px, 6 thông số công thái học trong 1 viewport.', value: 'Nắm bắt đầy đủ quy mô dinh thự mà không phải cuộn dọc gây mỏi tay.', ac: 'Given mở trang chi tiết 09; When xem thông tin; Then các chỉ số (850m2, 5 Suites, Heli-pad, 35m Pool) hiển thị trọn vẹn trong chiều cao 852px.', screens: '09, 09b, 09c', priority: 'Must Have' },
    { id: 'US-07', module: 'Triết Lý Kiến Trúc', actor: 'Nhà Sưu Tập (ACT-03)', action: 'Đọc bài luận triết lý hình học ánh sáng và xem bản phác thảo tay nguyên tác của KTS Pritzker.', value: 'Thấu hiểu giá trị vô hình và câu chuyện nghệ thuật ẩn sau công trình.', ac: 'Given ở trang chi tiết; When bấm Triết lý KTS; Then màn hình 10 hiển thị ảnh chân dung KTS Tadao Ando và phác thảo mực tay nguyên bản.', screens: '10', priority: 'Should Have' },
    { id: 'US-08', module: 'Bản Vẽ Kỹ Thuật CAD', actor: 'KTS / Thẩm Định (ACT-04)', action: 'Soi xét bản vẽ CAD mặt bằng 1:100 và góc hạ cánh trực thăng 108° ESE tầng mái.', value: 'Đánh giá công năng giao thông nội bộ và độ an toàn kỹ thuật hàng không.', ac: 'Given ở phần hồ sơ kỹ thuật; When chuyển giữa 10b và 10c; Then lưới CAD tỷ lệ 1:100 và các ký hiệu kỹ thuật hiển thị chuẩn xác.', screens: '10b, 10c', priority: 'Must Have' },
    { id: 'US-09', module: 'Vật Liệu & Hướng Nắng', actor: 'Khách Hàng VIP (ACT-02)', action: 'Khám phá mẫu vật liệu hoàn thiện tự nhiên và mô phỏng đổ bóng mặt trời 24 giờ.', value: 'Biết trước chất lượng bề mặt đá Navona, gỗ Shou Sugi Ban và tính vi khí hậu tự nhiên.', ac: 'Given mở 10d và 10e; When quan sát mẫu vật liệu và mặt đồng hồ 24h; Then bóng đổ tại 06:00, 12:00, 18:00 được mô phỏng trực quan.', screens: '10d, 10e', priority: 'Should Have' },
    { id: 'US-10', module: '360° Street View Đa Hướng', actor: 'Khách Hàng VIP (ACT-02)', action: 'Kéo xoay tự do 2D (ngang 360°, dọc ngước trần/nhìn sàn, chéo 45°) với 4 Hotspots.', value: 'Trải nghiệm toàn diện không gian như đang đứng trực tiếp tại đại sảnh dinh thự.', ac: 'Given mở màn hình 11; When click-drag theo bất kỳ hướng nào; Then dải ảnh 3400px cuộn mượt mà, HUD cố định không trôi, chạm Hotspot chuyển phòng.', screens: '11', priority: 'Must Have' },
    { id: 'US-11', module: '3D Turntable Kéo Vuốt', actor: 'Khách Hàng VIP (ACT-02)', action: 'Dùng cử chỉ vuốt kéo (ON_DRAG) xoay quanh mô hình 3D bóc mái biệt thự 4 góc.', value: 'Bao quát hình khối kiến trúc và kết cấu chịu lực của toàn bộ dinh thự.', ac: 'Given ở màn hình 11b; When vuốt kéo ngang; Then mô hình xoay liên tục 000° -> 090° -> 180° -> 270° mượt mà qua SMART_ANIMATE.', screens: '11b', priority: 'Must Have' },
    { id: 'US-12', module: 'Video Tour 4K & Âm Thanh Vòm', actor: 'Khách Hàng VIP (ACT-02)', action: 'Xem video flycam 4K HDR kèm âm thanh Dolby Atmos và điều khiển Play/Pause tương tác.', value: 'Chiêm ngưỡng toàn cảnh bán đảo Sơn Trà và cảm nhận nhịp thở thiên nhiên hùng vĩ.', ac: 'Given mở màn hình 12; When bấm nút tròn Play; Then video chuyển sang trạng thái 12b (đang phát), thanh tua đổi màu và đếm 02:45 / 04:10.', screens: '12, 12a, 12b', priority: 'Must Have' },
    { id: 'US-13', module: 'Gallery 5 Slider Vô Tận', actor: 'Khách Hàng VIP (ACT-02)', action: 'Duyệt 5 ảnh toàn cảnh các phòng và quay vòng lặp liên tục không gặp ngõ cụt.', value: 'Chiêm ngưỡng chi tiết nội thất phòng khách, bếp Boffi, hồ bơi, phòng master và hầm rượu.', ac: 'Given mở Slider 1; When ấn Next liên tục tới Slider 5 và ấn Quay lại; Then ảnh tự quay về Slider 1 mượt mà qua hiệu ứng Dissolve.', screens: '13, 14, 15, 15b, 15c', priority: 'Should Have' },
    { id: 'US-14', module: 'Đặt Lịch & Hậu Cần Bay', actor: 'Khách Hàng VIP (ACT-02)', action: 'Chọn ngày hẹn tháng 10/2026, chọn khung giờ 14:30 và chọn đón bằng trực thăng Bell 429.', value: 'Thiết lập chuyến bay khảo sát riêng tư và sang trọng bậc nhất.', ac: 'Given ở màn hình 16; When chọn ngày 16 và phương tiện trực thăng; Then đơn đặt được ghi nhận và chuyển tiếp sang màn hình cấp vé thông hành.', screens: '16, 16b', priority: 'Must Have' },
    { id: 'US-15', module: 'Thẻ VIP Pass & Apple Wallet', actor: 'Khách Hàng VIP (ACT-02)', action: 'Nhận thẻ thông hành điện tử #ARK-8821 có mã QR và lưu vào Apple Wallet qua NFC.', value: 'Check-in bảo mật một chạm không tiếp xúc khi trực thăng hạ cánh xuống biệt thự.', ac: 'Given đặt lịch thành công; When thẻ VIP Pass 17 hiển thị; Then bấm Thêm vào Apple Wallet 17b lưu ngay vào máy và có nút trở về Trang chủ.', screens: '17, 17b', priority: 'Must Have' },
    { id: 'US-16', module: 'Tư Vấn KTS & Tùy Biến', actor: 'Khách Hàng VIP (ACT-02)', action: 'Nhắn tin bảo mật và gọi Live Video với KTS Tadao Ando để đề xuất kéo dài hồ bơi +4m.', value: 'Tùy chỉnh không gian sống hoàn hảo theo cá tính trước khi ký hợp đồng chuyển nhượng.', ac: 'Given ở kênh chat 19; When gửi yêu cầu hoặc gọi video 19b; Then KTS phản hồi trực tiếp trên mô hình và tiếp nhận đơn tùy biến 19c.', screens: '19, 19b, 19c', priority: 'Should Have' },
    { id: 'US-17', module: 'Dự Toán & Ký Quỹ Crypto', actor: 'Khách Hàng VIP (ACT-02)', action: 'Tính toán đòn bẩy tài chính ($4.25M, trả trước 30%) và xem tỷ giá ký quỹ 68.2 Bitcoin.', value: 'Chủ động phương án dòng tiền và bảo chứng giao dịch quốc tế qua công nghệ Smart Contract.', ac: 'Given mở máy tính 20; When chọn trả trước 30%; Then tính ra $18,450/tháng và quy đổi chính xác 68.2 BTC trong cổng Escrow 20b.', screens: '20, 20b, 20c', priority: 'Must Have' },
    { id: 'US-18', module: 'Bộ Sưu Tập Đã Lưu', actor: 'Nhà Sưu Tập (ACT-03)', action: 'Lưu trữ các kiệt tác yêu thích vào thư mục riêng và xem tổng giá trị tài sản ($17.05M).', value: 'Dễ dàng theo dõi tiến độ pháp lý và tình trạng giao dịch của danh mục đầu tư.', ac: 'Given ở tab Đã Lưu 18; When bấm vào thẻ dinh thự; Then ứng dụng chuyển thẳng vào trang chi tiết tương ứng mà không cần tìm kiếm lại.', screens: '18, 18b', priority: 'Must Have' },
    { id: 'US-19', module: 'Hồ Sơ Black Diamond', actor: 'Hội Viên Patron (ACT-03)', action: 'Quản lý hồ sơ Alexander Vance, kích hoạt đặc quyền Sotheby\'s và thiết lập khóa AES-256.', value: 'Bảo vệ quyền lợi tối cao và danh tính bảo mật tuyệt đối trong câu lạc bộ.', ac: 'Given mở Profile 21; When truy cập 21b và 21c; Then các chứng chỉ bảo mật và quyền truy cập phòng trưng bày Sotheby\'s được xác nhận.', screens: '21, 21b, 21c', priority: 'Should Have' },
    { id: 'US-20', module: 'Menu Drawer & Đổi Theme', actor: 'Tất cả Actors', action: 'Mở Menu Drawer (☰) để đổi tức thì giữa Theme Sáng/Tối và đổi ngôn ngữ hiển thị VI/EN.', value: 'Tối ưu hóa thị giác theo môi trường ánh sáng thực tế và ngôn ngữ thuận tiện nhất.', ac: 'Given chạm Menu 3 gạch 25; When ấn icon Mặt Trời/Mặt Trăng; Then toàn bộ 104 màn hình chuyển màu êm ái qua SMART_ANIMATE mà không mất ngữ cảnh.', screens: '25 & 104 screens', priority: 'Must Have' }
  ];

  usData.forEach((item) => {
    const row = wsUS.addRow(item);
    row.height = 36;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9.5 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum === 1) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
      if (colNum === 8 && cell.value === 'Must Have') {
        cell.fill = passFill;
        cell.font = passFont;
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // =========================================================================
  // SHEET 4: GRANULAR USE CASES (40 USE CASES CHI TIẾT NGUYÊN TỬ)
  // =========================================================================
  const wsUC = workbook.addWorksheet('4. Use Cases Chi Tiết', { views: [{ showGridLines: true }] });
  wsUC.columns = [
    { header: 'Mã UC', key: 'id', width: 11 },
    { header: 'Tên Use Case Nguyên Tử (Granular UC Name)', key: 'name', width: 30 },
    { header: 'Phân Hệ Nghiệp Vụ', key: 'module', width: 22 },
    { header: 'Primary Actor', key: 'primaryActor', width: 20 },
    { header: 'Secondary Actors / Dịch Vụ', key: 'subActors', width: 22 },
    { header: 'Tiền Điều Kiện (Pre-conditions)', key: 'preCond', width: 32 },
    { header: 'Kịch Bản Thao Tác Chi Tiết (Main Scenario Steps)', key: 'mainFlow', width: 44 },
    { header: 'Kịch Bản Ngoại Lệ & Rẽ Nhánh (Exceptions)', key: 'exceptions', width: 34 },
    { header: 'Hậu Điều Kiện (Post-conditions)', key: 'postCond', width: 28 },
    { header: 'Màn Hình Figma Ánh Xạ', key: 'screens', width: 20 }
  ];

  wsUC.spliceRows(1, 0, [['📐 ĐẶC TẢ CHI TIẾT 40 USE CASES NGUYÊN TỬ (GRANULAR USE CASES) — ARKI ECOSYSTEM']]);
  wsUC.mergeCells('A1:J1');
  wsUC.getRow(1).height = 38;
  wsUC.getCell('A1').fill = titleFill;
  wsUC.getCell('A1').font = titleFont;
  wsUC.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsUC.getRow(2).height = 26;
  wsUC.getRow(2).eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const detailedUCs = [
    // Module 1: Onboarding & Auth
    { id: 'UC-01', name: 'Xem Animated Loading 3 Giai Đoạn', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-05 (Bridge)', preCond: 'Người dùng mở ứng dụng ARKI trên thiết bị di động.', mainFlow: '1. Hệ thống hiển thị Splash Screen 01 nền tối/sáng.\n2. Thanh loading nạp 15% (800ms) khởi tạo catalog.\n3. Tiến trình nhảy 65% (700ms) tải tài sản 3D.\n4. Hoàn tất 100% (600ms).\n5. Tự động chuyển trang sang Onboarding 1.', exceptions: 'Timeout mạng: Tự động dùng tài nguyên cache cục bộ.', postCond: 'Chuyển mượt mà vào màn hình Onboarding 02.', screens: '01' },
    { id: 'UC-02', name: 'Xem Giới Thiệu Kiệt Tác Pritzker', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở màn hình 02.', mainFlow: '1. Đọc giá trị kiệt tác Pritzker Masters.\n2. Quan sát ảnh bìa kiến trúc tràn viền 393px.\n3. Bấm nút Tiếp Tục (Continue ->).\n4. Chuyển tiếp sang màn hình 03.', exceptions: 'Vuốt sang trái để lùi lại trang trước an toàn.', postCond: 'Điều hướng sang Onboarding 2 (03).', screens: '02' },
    { id: 'UC-03', name: 'Xem Giới Thiệu Công Nghệ 3D VR & Solar', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở màn hình 03.', mainFlow: '1. Đọc thông điệp công nghệ 3D Matterport & Solar Study.\n2. Xem hình minh họa phòng khách thông tầng.\n3. Bấm nút Tính Năng Tiếp (Next Feature ->).\n4. Chuyển sang màn hình 04.', exceptions: 'Bấm nút Back lùi về màn hình 02.', postCond: 'Điều hướng sang Onboarding 3 (04).', screens: '03' },
    { id: 'UC-04', name: 'Xem Giới Thiệu Cố Vấn KTS Trưởng', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở màn hình 04.', mainFlow: '1. Đọc giới thiệu dịch vụ Direct Studio Advisory.\n2. Xem ảnh biệt thự hoàng hôn.\n3. Bấm nút Bắt Đầu Ngay (Get Started ✦).\n4. Chuyển sang cổng đăng nhập 05.', exceptions: 'Bấm Back quay lại màn hình 03.', postCond: 'Mở màn hình Đăng nhập 05.', screens: '04' },
    { id: 'UC-05', name: 'Đăng Nhập Khách VIP & Khách Vãng Lai', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở màn hình Cổng Đăng Nhập 05.', mainFlow: '1. Nhập email VIP Forbes Global và mật khẩu.\n2. Bấm Truy Cập Bộ Sưu Tập Kín.\n3. Hoặc bấm Đăng Nhập FaceID.\n4. Hoặc bấm Vào xem với tư cách Khách Quan Sát (Guest Mode ->) vào thẳng 06.', exceptions: 'Nhập sai tài khoản: Báo đỏ viền input và gợi ý thử FaceID.', postCond: 'Kích hoạt FaceID Gate hoặc vào Home Feed ở chế độ Khách.', screens: '05' },
    { id: 'UC-06', name: 'Xác Thực Sinh Trắc Học FaceID Gate', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-01 (FaceID Vault)', preCond: 'Chọn đăng nhập FaceID tại 05.', mainFlow: '1. Màn hình 05b mở vòng cảm biến hồng ngoại.\n2. Camera quét và đối soát dữ liệu sinh trắc học.\n3. Nhận diện thành công, cấp Session Token #ARK-SEC-992.\n4. Tự động chuyển sang xác thực OTP 05c.', exceptions: 'Khuôn mặt không khớp: Rung nhẹ haptic, cho phép nhập PIN dự phòng.', postCond: 'Chuyển sang màn hình nhập OTP 05c.', screens: '05b' },
    { id: 'UC-07', name: 'Xác Thực Mã Bảo Mật Phần Cứng OTP', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-01 (OTP Gateway)', preCond: 'Đã quét FaceID thành công, đang ở 05c.', mainFlow: '1. Hệ thống gửi mã 6 số về thiết bị bảo mật.\n2. Người dùng nhập 6 chữ số qua bàn phím bảo vệ.\n3. Hệ thống đối soát mã trong vòng 30 giây.\n4. Xác nhận hợp lệ và chuyển sang ký NDA 05d.', exceptions: 'Sai OTP quá 3 lần: Khóa tạm thời 15 phút.', postCond: 'Mở màn hình Thỏa thuận bảo mật 05d.', screens: '05c' },
    { id: 'UC-08', name: 'Ký Thỏa Thuận Bảo Mật Tài Sản Kín (NDA)', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-05 (Concierge)', preCond: 'Xác thực OTP thành công, đang ở 05d.', mainFlow: '1. Đọc các điều khoản bảo mật off-market listings.\n2. Kiểm tra điều khoản không tiết lộ toạ độ và giá bán.\n3. Bấm nút Ký Điện Tử & Tiếp Tục ✦.\n4. Hệ thống lưu chữ ký số và chuyển vào Home Feed 06.', exceptions: 'Bấm từ chối: Quay lại màn hình đăng nhập công khai.', postCond: 'Mở khóa toàn bộ quyền xem dinh thự kín tại 06.', screens: '05d' },

    // Module 2: Discovery, Filtering & Map
    { id: 'UC-09', name: 'Duyệt Bảng Tin Theo Danh Mục Kiến Trúc', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở Home Feed 06.', mainFlow: '1. Xem thẻ Hero Villa The Glass Sanctuary ($4.25M).\n2. Chạm vào chip Oceanfront (chuyển sang 06b).\n3. Chạm vào chip Brutalist (chuyển sang 06c).\n4. Chạm vào chip Biophilic (chuyển sang 06d).\n5. Chạm All Works quay lại 06.', exceptions: 'Danh mục đang cập nhật: Hiển thị trạng thái nạp dữ liệu mượt mà.', postCond: 'Hiển thị danh sách thẻ bất động sản đúng phong cách.', screens: '06, 06b, 06c, 06d' },
    { id: 'UC-10', name: 'Mở & Cấu Hình Bộ Lọc Tiêu Chí Đa Tầng', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở Home Feed 06.', mainFlow: '1. Bấm nút Filter (🔍 Filter) góc trên.\n2. Màn hình 07 trượt xuống từ đỉnh (MOVE_IN TOP).\n3. Kéo thanh giá chọn khoảng $2.5M - $12M.\n4. Chọn chip studio Tadao Ando.\n5. Bấm nút Đóng (✕ Close) nếu muốn hủy.', exceptions: 'Bấm ra ngoài vùng modal: Tự động trượt đóng bộ lọc.', postCond: 'Bộ tiêu chí lọc được thiết lập sẵn sàng áp dụng.', screens: '07' },
    { id: 'UC-11', name: 'Áp Dụng Bộ Lọc & Xem Kết Quả Tìm Kiếm', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đã chọn tiêu chí lọc tại 07.', mainFlow: '1. Bấm nút Hiển Thị 14 Bất Động Sản Thỏa Mãn.\n2. Màn hình 07b hiển thị danh sách 14 kết quả.\n3. Quan sát các thẻ tóm tắt giá và diện tích.\n4. Chạm vào 1 thẻ để xem chi tiết hoặc bấm Back về 06.', exceptions: 'Không có kết quả: Hệ thống gợi ý nới rộng khoảng giá.', postCond: 'Danh sách 14 bất động sản hiển thị đầy đủ.', screens: '07, 07b' },
    { id: 'UC-12', name: 'Tra Cứu Bất Động Sản Trên Bản Đồ Vệ Tinh', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở Home Feed 06.', mainFlow: '1. Bấm nút Bản Đồ (🗺 Map) trên thanh danh mục.\n2. Màn hình bản đồ vệ tinh Sơn Trà 08 mở ra.\n3. Quan sát các điểm ghim GPS định vị dọc bờ biển.\n4. Bấm nút Feed (<- Feed) quay lại bảng tin.', exceptions: 'Lỗi GPS: Hiển thị bản đồ tĩnh có định vị sẵn.', postCond: 'Hiển thị bản đồ vệ tinh bán đảo Sơn Trà.', screens: '08' },
    { id: 'UC-13', name: 'Xem Thẻ Tóm Tắt Ghim Vị Trí Bản Đồ', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở bản đồ vệ tinh 08.', mainFlow: '1. Chạm vào ghim vị trí dinh thự The Glass Sanctuary.\n2. Bảng kéo Map Pin Card 08b xuất hiện ở đáy.\n3. Đọc thông số: $4.25M, 850m2, bờ biển Sơn Trà.\n4. Bấm nút View Pin -> điều hướng thẳng vào 09.', exceptions: 'Chạm ra ngoài ghim: Bảng thẻ ghim tự động ẩn.', postCond: 'Điều hướng vào trang chi tiết dinh thự 09.', screens: '08, 08b, 09' },

    // Module 3: Details & Philosophy
    { id: 'UC-14', name: 'Xem Hồ Sơ Chi Tiết Kiệt Tác Dinh Thự', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Điều hướng từ Feed hoặc Bản đồ vào 09.', mainFlow: '1. Xem ảnh bìa tràn viền 393px.\n2. Đọc tiêu đề The Glass Sanctuary - Tadao Ando.\n3. Đọc 6 thông số công thái học ($4.25M, 850m2, 5 Suites, Heli-pad, 35m Pool, Wine Cellar).\n4. Toàn bộ thông tin hiển thị gói gọn trong khung 852px.\n5. Bấm nút tròn kính mờ Back (<-) quay lại an toàn.', exceptions: 'Khắc phục 100% lỗi tràn viền dọc (single viewport layout).', postCond: 'Người dùng nắm rõ các chỉ số cơ bản của dinh thự.', screens: '09, 09b, 09c' },
    { id: 'UC-15', name: 'Đọc Bài Luận Triết Lý & Phác Thảo Tay KTS', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-03: Nhà Sưu Tập', subActors: 'ACT-04 (Lead Architect)', preCond: 'Đang ở màn hình chi tiết 09.', mainFlow: '1. Bấm nút Triết Lý Kiến Trúc Sư & Bản Vẽ Phác Thảo ->.\n2. Màn hình 10 hiển thị ảnh chân dung KTS Tadao Ando (Pritzker 1995).\n3. Đọc bài luận về hình học bê tông và ánh sáng tự nhiên.\n4. Chiêm ngưỡng bức phác thảo mực tay nguyên tác.\n5. Bấm nút tròn kính mờ Back quay về 09.', exceptions: 'Chạm đúp vào hình phác thảo để xem độ phân giải cao.', postCond: 'Người dùng hiểu rõ giá trị nghệ thuật nguyên tác.', screens: '10' },
    { id: 'UC-16', name: 'Thẩm Định Bản Vẽ Kỹ Thuật CAD Mặt Bằng 1:100', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-04: KTS / Thẩm Định', subActors: 'ACT-03 (Patron)', preCond: 'Đang ở trang hồ sơ kỹ thuật.', mainFlow: '1. Mở màn hình 10b - Blueprint Level 1 Floorplan.\n2. Soi xét hệ trục toạ độ CAD tỷ lệ 1:100.\n3. Kiểm tra diện tích sàn xây dựng 850 m2, phân vùng phòng khách và hồ bơi.\n4. Bấm nút quay lại trang chi tiết.', exceptions: 'Yêu cầu mật khẩu cấp cao đối với bản vẽ kết cấu chi tiết.', postCond: 'Thẩm định thành công quy hoạch không gian mặt bằng.', screens: '10b' },
    { id: 'UC-17', name: 'Kiểm Tra Bản Vẽ CAD Tầng Mái & Sân Bay Trực Thăng', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-04: KTS / Thẩm Định', subActors: 'SYS-04 (Aviation API)', preCond: 'Đang ở bản vẽ kỹ thuật.', mainFlow: '1. Chuyển sang màn hình 10c - Blueprint Penthouse & Roof.\n2. Soi xét thông số góc tiếp cận hạ cánh 108° ESE của sân bay trực thăng.\n3. Kiểm tra khả năng chịu tải trọng của sàn mái (Bell 429).\n4. Bấm quay lại.', exceptions: 'Góc tiếp cận có chướng ngại vật: Hệ thống hiển thị cảnh báo đỏ.', postCond: 'Xác nhận thông số kỹ thuật hàng không đạt chuẩn an toàn.', screens: '10c' },
    { id: 'UC-18', name: 'Khám Phá Bảng Mẫu Vật Liệu Hoàn Thiện', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Đang ở chi tiết dinh thự 09.', mainFlow: '1. Mở màn hình 10d - Materials & Finishes.\n2. Quan sát các ô mẫu vật liệu bo góc 14px.\n3. Thẩm định vân đá Navona Travertine khai thác từ Ý.\n4. Xem gỗ nung Shou Sugi Ban xử lý carbon hóa chống ẩm biển.\n5. Xem tấm ốp Titanium 4mm chống ăn mòn muối.', exceptions: 'Chạm vào mẫu vật liệu để xem ảnh macro cận cảnh vân đá.', postCond: 'Người dùng nắm rõ xuất xứ và đặc tính vật liệu.', screens: '10d' },
    { id: 'UC-19', name: 'Mô Phỏng Quỹ Đạo Mặt Trời 24 Giờ (Solar Study)', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Đang ở chi tiết dinh thự 09.', mainFlow: '1. Mở màn hình 10e - Solar Path 24h Study.\n2. Quan sát mặt đồng hồ quỹ đạo mặt trời 24 giờ.\n3. Xem góc chiếu nắng bình minh lúc 06:00.\n4. Xem góc nắng đỉnh trưa 12:00 và hiệu quả che bóng râm.\n5. Xem hướng hoàng hôn biển lúc 18:00.\n6. Bấm quay lại.', exceptions: 'Kéo thanh trượt thời gian để xem bóng đổ di chuyển liên tục.', postCond: 'Đánh giá khả năng cách nhiệt và thông gió tự nhiên.', screens: '10e' },

    // Module 4: 3D VR & Media
    { id: 'UC-20', name: 'Khám Phá 360° Street View Cuộn Tự Do 2D Pan', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-05 (Bridge)', preCond: 'Bấm nút Không Gian 3D trên màn hình 09.', mainFlow: '1. Màn hình 11 mở dải ảnh panorama 3400x1800px.\n2. Nhấp giữ chuột/ngón tay cuộn tự do 2D (BOTH):\n   - Kéo ngang để xoay 360° quanh phòng khách thông tầng 7.2m.\n   - Kéo xuống để ngước nhìn vòm giếng trời đón nắng.\n   - Kéo lên để nhìn xuống mặt hồ bơi nước mặn 35m.\n   - Lướt chéo 45° khám phá góc nhìn mở.\n3. HUD điều khiển (nút Back, compass) cố định không trôi.', exceptions: 'Kéo quá mép ảnh: Cơ chế nhân bản ảnh giúp lướt liên tục không khựng.', postCond: 'Trải nghiệm toàn diện không gian ảo 360 độ.', screens: '11' },
    { id: 'UC-21', name: 'Tương Tác Điểm Hotspot Trong Không Gian Ảo', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-05 (Bridge)', preCond: 'Đang ở không gian 360° Street View 11.', mainFlow: '1. Xác định 4 điểm Hotspot không gian phân tầng.\n2. Chạm Hotspot "◉ Đại Sảnh Thông Tầng 7.2m".\n3. Chạm Hotspot "◉ Bếp Đảo Boffi".\n4. Chạm Hotspot "🏊 Hồ Bơi Nước Mặn 35m".\n5. Chạm Hotspot "🚁 Bãi Đáp Trực Thăng Tầng Mái".\n6. Khung nhìn camera tự động dịch chuyển góc nhìn tức thì.', exceptions: 'Hotspot đang tải: Hiển thị vòng tròn nhấp nháy.', postCond: 'Chuyển đổi góc quan sát giữa các phân khu dinh thự.', screens: '11' },
    { id: 'UC-22', name: 'Xoay Mô Hình 3D Bóc Mái Bằng Cử Chỉ Drag', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-05 (Bridge)', preCond: 'Chuyển sang chế độ 3D Dollhouse 11b.', mainFlow: '1. Màn hình hiển thị mô hình bóc mái biệt thự góc 000°.\n2. Nhấn giữ và vuốt ngang màn hình (ON_DRAG).\n3. Mô hình xoay sang góc 090° qua SMART_ANIMATE (300ms).\n4. Tiếp tục vuốt xoay qua góc 180° và 270°.\n5. Vuốt tiếp để quay tròn về góc 000° ban đầu.\n6. Bấm nút Back quay về trang chi tiết.', exceptions: 'Thả tay giữa chừng: Hiệu ứng nam châm tự hút về góc vuông gần nhất.', postCond: 'Người dùng quan sát toàn cảnh 4 hướng công trình.', screens: '11b' },
    { id: 'UC-23', name: 'Xem Phim Flycam Drone 4K & Điều Khiển Phát', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-05 (Bridge)', preCond: 'Bấm nút Xem Video Tour 4K trên màn hình 09.', mainFlow: '1. Mở màn hình video player 12a (trạng thái tạm dừng).\n2. Bấm nút tròn lớn Play giữa màn hình.\n3. Giao diện đổi sang trạng thái đang phát 12b.\n4. Nút đổi thành biểu tượng Pause.\n5. Thanh tiến trình scrubber chuyển màu hổ phách, hiển thị 02:45 / 04:10.\n6. Bấm Pause để tạm dừng video.', exceptions: 'Mạng yếu: Tự động hạ độ phân giải xuống 1080p mượt mà.', postCond: 'Thưởng thức video flycam kèm âm thanh Dolby Atmos 7.1.4.', screens: '12, 12a, 12b' },
    { id: 'UC-24', name: 'Duyệt Chuỗi 5 Slider Ảnh Toàn Cảnh Vô Tận', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Chạm vào thumbnail ảnh tại 09.', mainFlow: '1. Mở Slider 1 (13) - Phòng khách thông tầng 7.2m.\n2. Bấm Next Photo -> sang Slider 2 (14) - Bếp đảo Boffi.\n3. Bấm Next Photo -> sang Slider 3 (15) - Hồ bơi hoàng hôn.\n4. Bấm Next Photo -> sang Slider 4 (15b) - Phòng ngủ Hinoki.\n5. Bấm Next Photo -> sang Slider 5 (15c) - Hầm rượu Sommelier.\n6. Bấm Quay Về Ảnh Đầu -> chuyển vòng tròn về Slider 1 (DISSOLVE).\n7. Bấm nút Close bất kỳ lúc nào để quay lại 09.', exceptions: 'Bấm nút Prev Photo ở bất kỳ slider nào để lùi lại ảnh trước.', postCond: 'Duyệt ảnh mượt mà, không bao giờ bị kẹt ngõ cụt.', screens: '13, 14, 15, 15b, 15c' },
    { id: 'UC-25', name: 'Xem Thư Viện Ảnh Lưới Toàn Màn Hình (Grid)', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Bấm vào biểu tượng xem lưới tại trang chi tiết.', mainFlow: '1. Màn hình 23 hiển thị lưới 9 ô ảnh kiến trúc độ phân giải cao.\n2. Phân loại ảnh theo 3 nhóm: Ngoại Thất, Nội Thất, Chi Tiết Vật Liệu.\n3. Chạm vào 1 ô ảnh để phóng to toàn màn hình.\n4. Bấm nút Back quay về chi tiết dinh thự.', exceptions: 'Ảnh chưa tải xong hiển thị hiệu ứng skeleton mờ.', postCond: 'Người dùng bao quát toàn bộ bộ sưu tập ảnh công trình.', screens: '23' },

    // Module 5: VIP Booking & Logistics
    { id: 'UC-26', name: 'Đặt Lịch Hẹn Khảo Sát Dinh Thự VIP', module: 'FLOW-05: Đặt Lịch & Pass', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-05 (Concierge)', preCond: 'Bấm nút Đặt Lịch Tham Quan Riêng ✦ trên màn hình 09.', mainFlow: '1. Mở màn hình lịch hẹn 16.\n2. Chọn ngày mong muốn trong tháng 10/2026 (chọn Thứ Tư ngày 16).\n3. Chọn khung giờ vàng 14:30 đón tiếp.\n4. Bấm nút Tiếp Tục Chọn Phương Tiện Đón -> sang 16b.', exceptions: 'Khung giờ kín lịch: Hệ thống hiển thị màu xám và gợi ý khung giờ kế tiếp.', postCond: 'Ghi nhận thời gian hẹn khảo sát của khách hàng.', screens: '16' },
    { id: 'UC-27', name: 'Lựa Chọn Phương Tiện Hậu Cần Đón Tiếp', module: 'FLOW-05: Đặt Lịch & Pass', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-05, SYS-04 (Aviation)', preCond: 'Đã chọn ngày giờ, đang ở màn hình 16b.', mainFlow: '1. Xem 3 phương án đón tiếp chuyên biệt:\n   - Trực thăng Bell 429 (hạ cánh sân thượng).\n   - Du thuyền thể thao Sunseeker (cập cầu cảng riêng).\n   - Siêu xe Rolls-Royce Phantom (đón tại sân bay).\n2. Chọn phương án Trực thăng Bell 429.\n3. Bấm nút Xác Nhận Yêu Cầu Tham Quan ✦.\n4. Hệ thống kiểm tra slot bay và chuyển sang màn hình vé 17.', exceptions: 'Thời tiết xấu cấm bay: Concierge tự động đề xuất đổi sang du thuyền.', postCond: 'Xác lập phương tiện di chuyển chính thức cho chuyến đi.', screens: '16b' },
    { id: 'UC-28', name: 'Tiếp Nhận Thẻ Thông Hành VIP PASS Có Mã QR', module: 'FLOW-05: Đặt Lịch & Pass', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-05 (Concierge)', preCond: 'Xác nhận đặt lịch thành công.', mainFlow: '1. Màn hình 17 hiển thị thông báo "✓ Viewing Confirmed".\n2. Hiển thị thẻ VIP BOARDING PASS #ARK-8821.\n3. Kiểm tra thông tin: The Glass Sanctuary, Thứ Tư 16/10 lúc 14:30, KTS chủ trì đón tiếp.\n4. Mã QR động mã hóa thông tin an ninh xuất hiện trên thẻ.\n5. Bấm Quay Về Trang Chủ -> đưa người dùng về Home Feed 06.', exceptions: 'Chụp ảnh màn hình: Hệ thống tự động đóng dấu chìm watermark mã khách hàng.', postCond: 'Khách hàng sở hữu vé thông hành chính thức.', screens: '17' },
    { id: 'UC-29', name: 'Đồng Bộ Thẻ VIP Passbook Vào Apple Wallet', module: 'FLOW-05: Đặt Lịch & Pass', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-02 (Apple PassKit)', preCond: 'Đang ở màn hình thẻ VIP Pass 17.', mainFlow: '1. Bấm nút "Thêm Vào Apple Wallet".\n2. Màn hình 17b hiển thị giao diện Passbook chuẩn iOS.\n3. Ký số chứng chỉ bảo mật và nạp thẻ vào ứng dụng Wallet.\n4. Kích hoạt tính năng chạm NFC không tiếp xúc tại chốt kiểm soát.\n5. Thông báo giờ hạ cánh ghim trực tiếp lên Dynamic Island.', exceptions: 'Thiết bị không hỗ trợ Apple Wallet: Cho phép lưu ảnh mã QR bảo mật vào thư viện ảnh.', postCond: 'Thẻ thông hành sẵn sàng sử dụng trong Apple Wallet.', screens: '17, 17b' },

    // Module 6: Studio Advisory & Customization
    { id: 'UC-30', name: 'Nhắn Tin Mã Hóa 1-1 Với Văn Phòng KTS', module: 'FLOW-06: Tư Vấn KTS', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-04 (Lead Architect)', preCond: 'Bấm nút Chat KTS trên màn hình 09.', mainFlow: '1. Mở màn hình chat 19 với Studio Tadao Ando Partners.\n2. Đọc tin nhắn chào mừng từ KTS trưởng.\n3. Đọc phản hồi về khả năng kéo dài hồ bơi thêm +4m.\n4. Soạn tin nhắn hỏi về kính cản nhiệt Low-E UV bảo vệ tranh.\n5. Bấm nút gửi tin nhắn.\n6. Bấm nút Back quay về trang chi tiết.', exceptions: 'KTS đang bận: Tin nhắn tự động được lưu vào hàng đợi bảo mật.', postCond: 'Thiết lập kênh liên lạc trực tiếp với văn phòng kiến trúc sư.', screens: '19' },
    { id: 'UC-31', name: 'Tham Gia Họp Truyền Hình Live Video Tư Vấn', module: 'FLOW-06: Tư Vấn KTS', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-04 (Lead Architect)', preCond: 'Nhận được liên kết mời họp trong kênh chat 19.', mainFlow: '1. Bấm vào link mời họp video trực tuyến.\n2. Màn hình 19b kích hoạt camera và micro bảo mật.\n3. Kết nối cuộc gọi truyền hình chất lượng cao với KTS chủ trì.\n4. KTS chia sẻ màn hình bản vẽ CAD và mô hình 3D xoay thực tế.\n5. Trao đổi giải pháp gia cố dầm chịu lực cho hồ bơi.\n6. Bấm nút kết thúc cuộc gọi an toàn.', exceptions: 'Mất kết nối mạng: Tự động ghi âm cuộc gọi và lưu bản nháp trao đổi.', postCond: 'Thống nhất phương án điều chỉnh thiết kế sơ bộ.', screens: '19b' },
    { id: 'UC-32', name: 'Lập & Nộp Phiếu Đề Xuất Tùy Biến Thiết Kế', module: 'FLOW-06: Tư Vấn KTS', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-04, ACT-06 (Finance)', preCond: 'Sau khi thống nhất ý tưởng tư vấn.', mainFlow: '1. Mở biểu mẫu 19c - Custom Modification Request.\n2. Điền hạng mục tùy chỉnh 1: Kéo dài hồ bơi công xôn +4m.\n3. Điền hạng mục tùy chỉnh 2: Lắp đặt kính Low-E Solar chống UV.\n4. Ký xác nhận nộp yêu cầu.\n5. Hệ thống gửi hồ sơ sang bộ phận kỹ thuật để lập dự toán phụ lục.', exceptions: 'Yêu cầu vượt quá giới hạn an toàn kết cấu: KTS gửi văn bản phản hồi kỹ thuật giải thích.', postCond: 'Phiếu yêu cầu điều chỉnh chính thức được lưu trữ trong hồ sơ dự án.', screens: '19c' },

    // Module 7: Financials & Escrow
    { id: 'UC-33', name: 'Tính Toán Phương Án Đòn Bẩy Tài Chính', module: 'FLOW-07: Tài Chính & Ký Quỹ', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-06 (Escrow Officer)', preCond: 'Bấm nút Bảng Tính Đầu Tư trên màn hình 09.', mainFlow: '1. Màn hình 20 mở bộ tính toán tài chính.\n2. Nhập giá mua dinh thự: $4,250,000.\n3. Chọn tỷ lệ thanh toán ban đầu 30% ($1,275,000).\n4. Hệ thống tự động tính chi phí trả góp hàng tháng: $18,450 / tháng.\n5. Điều chỉnh thời hạn vay 15 - 25 năm để xem chi phí thay đổi tức thì.\n6. Bấm nút Back quay lại.', exceptions: 'Nhập số tiền trả trước không hợp lệ: Báo lỗi giới hạn tối thiểu 20%.', postCond: 'Khách hàng có phương án cân đối dòng tiền mua bất động sản.', screens: '20' },
    { id: 'UC-34', name: 'Thiết Lập Tài Khoản Ký Quỹ Crypto Escrow', module: 'FLOW-07: Tài Chính & Ký Quỹ', primaryActor: 'ACT-03: Nhà Sưu Tập', subActors: 'ACT-06, SYS-03 (Blockchain)', preCond: 'Đang ở màn hình tính toán tài chính.', mainFlow: '1. Chuyển sang màn hình 20b - Multi-Currency & Crypto Escrow.\n2. Xem tỷ giá quy đổi sang các loại tiền tệ: USD, EUR, Bitcoin, Ethereum.\n3. Hệ thống hiển thị giá trị căn hộ quy đổi tương đương 68.2 BTC.\n4. Thiết lập hợp đồng thông minh Smart Contract khóa quỹ ký quỹ (Escrow Lock).\n5. Ủy quyền đa chữ ký (Multi-Sig) bảo chứng giao dịch.\n6. Bấm hoàn tất.', exceptions: 'Biến động tỷ giá vượt biên độ: Hệ thống kích hoạt cơ chế khóa giá (Price Lock 15 phút).', postCond: 'Tài khoản ký quỹ trung gian được thiết lập an toàn.', screens: '20b' },
    { id: 'UC-35', name: 'Phân Tích Biểu Đồ Tăng Trưởng Giá Trị 10 Năm', module: 'FLOW-07: Tài Chính & Ký Quỹ', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-06 (Finance)', preCond: 'Đang ở mục tài chính.', mainFlow: '1. Mở màn hình 20c - 10-Year Capital Appreciation.\n2. Quan sát đường biểu đồ tăng trưởng vốn hàng năm (+14.2%/năm).\n3. Xem giá trị dự phóng sau 5 năm ($7.8M) và sau 10 năm ($11.8M).\n4. Đọc các chỉ số phân tích biên độ tăng giá do quỹ đất bán đảo Sơn Trà bảo tồn khan hiếm.\n5. Bấm quay lại.', exceptions: 'Tải biểu đồ thất bại: Hiển thị bảng số liệu thống kê thay thế.', postCond: 'Khách hàng thẩm định được hiệu suất đầu tư dài hạn.', screens: '20c' },

    // Module 8: Collections, Profile & Offline
    { id: 'UC-36', name: 'Quản Lý Bộ Sưu Tập Kiệt Tác Đã Lưu', module: 'FLOW-08: Bộ Sưu Tập & Profile', primaryActor: 'ACT-03: Nhà Sưu Tập', subActors: 'ACT-02 (Khách VIP)', preCond: 'Bấm tab Đã Lưu trên thanh Bottom Nav.', mainFlow: '1. Màn hình 18 hiển thị danh mục 3 kiệt tác kiến trúc đã lưu.\n2. Xem tổng giá trị danh mục: $17,050,000.\n3. Xem thẻ dinh thự The Glass Sanctuary ($4.25M).\n4. Bấm nút Xem -> điều hướng thẳng vào trang chi tiết 09.\n5. Bấm nút Back quay về Home Feed.', exceptions: 'Danh sách rỗng: Hiển thị gợi ý các kiệt tác tiêu biểu trên Feed.', postCond: 'Người dùng theo dõi tập trung các công trình yêu thích.', screens: '18' },
    { id: 'UC-37', name: 'Tạo Thư Mục Bộ Sưu Tập Riêng Tư Mới', module: 'FLOW-08: Bộ Sưu Tập & Profile', primaryActor: 'ACT-03: Nhà Sưu Tập', subActors: 'ACT-02 (Khách VIP)', preCond: 'Đang ở màn hình danh mục đã lưu 18.', mainFlow: '1. Bấm nút Tạo Bộ Sưu Tập Mới (+ Create Curated Collection).\n2. Màn hình 18b mở biểu mẫu nhập tên bộ sưu tập.\n3. Đặt tên "Dinh Thự Vách Biển 2026".\n4. Chọn chế độ bảo mật riêng tư VIP (Private Encrypted Folder).\n5. Bấm Xác Nhận Tạo.\n6. Thư mục mới xuất hiện trong danh mục quản lý.', exceptions: 'Trùng tên thư mục: Nhắc người dùng đổi tên phân biệt.', postCond: 'Thư mục bộ sưu tập mới được khởi tạo thành công.', screens: '18b' },
    { id: 'UC-38', name: 'Xem Hồ Sơ VIP & Kích Hoạt Đặc Quyền Hội Viên', module: 'FLOW-08: Bộ Sưu Tập & Profile', primaryActor: 'ACT-03: Alexander Vance', subActors: 'ACT-05 (Concierge)', preCond: 'Bấm tab Profile trên thanh Bottom Nav.', mainFlow: '1. Màn hình 21 hiển thị hồ sơ cá nhân Alexander Vance.\n2. Xác nhận danh vị: Black Diamond Architectural Patron #004.\n3. Mở danh mục 21b - Concierge Privileges.\n4. Kích hoạt quyền cố vấn KTS 24/7 và quyền xem trước đấu giá Sotheby\'s.\n5. Bấm nút Đăng Xuất Tài Khoản (Sign Out) nếu muốn thoát ra màn hình 05.', exceptions: 'Hết hạn thẻ hội viên: Hiển thị hướng dẫn liên hệ Concierge gia hạn.', postCond: 'Quản trị hồ sơ và kích hoạt đầy đủ quyền lợi thượng lưu.', screens: '21, 21b' },
    { id: 'UC-39', name: 'Tải & Quản Lý Dữ Liệu VR Không Gian Offline', module: 'FLOW-08: Bộ Sưu Tập & Profile', primaryActor: 'ACT-03: Nhà Sưu Tập', subActors: 'SYS-05 (Bridge)', preCond: 'Đang ở cài đặt ứng dụng.', mainFlow: '1. Mở màn hình 24 - Offline VR Spatial Cache.\n2. Kiểm tra dung lượng đệm không gian 3D (1.2 GB).\n3. Bấm Tải Về Toàn Bộ Mô Hình 3D Dinh Thự Sơn Trà.\n4. Tiến trình tải hoàn tất 100% vào bộ nhớ trong iPhone.\n5. Bật chế độ bay để kiểm tra: Không gian 360° vẫn xoay kéo mượt mà không cần Internet.\n6. Bấm xóa đệm giải phóng bộ nhớ khi cần.', exceptions: 'Thiết bị không đủ dung lượng trống: Báo động và gợi ý chọn gói tải nhẹ 400MB.', postCond: 'Dữ liệu VR sẵn sàng trải nghiệm trên các chuyến bay riêng.', screens: '24' },

    // Module 9: System Drawer & Instant Theme
    { id: 'UC-40', name: 'Mở Menu Drawer, Đổi Ngôn Ngữ & Đổi Theme 2 Chiều', module: 'FLOW-09: Menu Drawer & Theme', primaryActor: 'Tất cả Actors', subActors: 'SYS-05 (Bridge Engine)', preCond: 'Ứng dụng đang mở ở bất kỳ màn hình nào.', mainFlow: '1. Bấm Menu 3 gạch ☰ hoặc chạm Avatar trên Header.\n2. Menu Drawer 25 trượt từ cạnh phải ra (SLIDE_IN).\n3. Xem thẻ định danh VIP Alexander Vance và 6 lối tắt nét vẽ.\n4. Bấm nút song ngữ VI <-> EN để chuyển đổi toàn bộ văn bản.\n5. Bấm nút icon Mặt Trời / Mặt Trăng:\n   - Kích hoạt SMART_ANIMATE chuyển đổi 2 chiều giữa Daylight Porcelain và Nocturne Dark.\n   - Giữ nguyên vị trí cuộn và dữ liệu đang thao tác.\n6. Bấm nút đóng ✕ hoặc chạm nền tối để trượt đóng menu (SLIDE_OUT).', exceptions: 'Chuyển theme không bao giờ gây gián đoạn phiên làm việc hiện tại.', postCond: 'Thay đổi theme và ngôn ngữ đồng bộ trên toàn bộ 104 màn hình.', screens: '25 & Toàn bộ 104 màn hình' }
  ];

  detailedUCs.forEach((item) => {
    const row = wsUC.addRow(item);
    row.height = 44;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum === 1) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // =========================================================================
  // SHEET 5: TRACEABILITY MATRIX (MA TRẬN TRUY VẾT 1-1 CHO 40 USE CASES)
  // =========================================================================
  const wsTrace = workbook.addWorksheet('5. Ma Trận Truy Vết', { views: [{ showGridLines: true }] });
  wsTrace.columns = [
    { header: 'Mã UC', key: 'uc', width: 11 },
    { header: 'Mã US Liên Quan', key: 'us', width: 14 },
    { header: 'Tên Nghiệp Vụ Cốt Lõi', key: 'name', width: 30 },
    { header: 'Actor Thực Thi', key: 'actor', width: 22 },
    { header: 'Màn Hình Dark Theme', key: 'dark', width: 28 },
    { header: 'Màn Hình Light Theme', key: 'light', width: 28 },
    { header: 'Master Components Sử Dụng', key: 'components', width: 26 },
    { header: 'Prototype Trigger & Animation', key: 'proto', width: 30 },
    { header: 'Kiểm Thử UAT', key: 'uat', width: 14 }
  ];

  wsTrace.spliceRows(1, 0, [['🔗 MA TRẬN TRUY VẾT YÊU CẦU — THIẾT KẾ — PROTOTYPE — KIỂM THỬ UAT (40 USE CASES)']]);
  wsTrace.mergeCells('A1:I1');
  wsTrace.getRow(1).height = 38;
  wsTrace.getCell('A1').fill = titleFill;
  wsTrace.getCell('A1').font = titleFont;
  wsTrace.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsTrace.getRow(2).height = 26;
  wsTrace.getRow(2).eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const traceData = [
    { uc: 'UC-01', us: 'US-01', name: 'Animated Loading 3 giai đoạn', actor: 'ACT-02', dark: 'ARKI / 01 - Splash', light: 'ARKI / 01 - Splash [Light]', components: 'Frame Container', proto: 'AFTER_TIMEOUT (800ms -> 700ms -> 600ms)', uat: '✅ PASS' },
    { uc: 'UC-02', us: 'US-01', name: 'Onboarding 1 - Pritzker Masters', actor: 'ACT-02, ACT-01', dark: 'ARKI / 02 - Onboarding', light: 'ARKI / 02 - Onboarding [Light]', components: 'Primary Button', proto: 'ON_CLICK -> SLIDE_IN (Left, 0.35s)', uat: '✅ PASS' },
    { uc: 'UC-03', us: 'US-01', name: 'Onboarding 2 - 3D VR & Solar', actor: 'ACT-02, ACT-01', dark: 'ARKI / 03 - Onboarding VR', light: 'ARKI / 03 - Onboarding VR [Light]', components: 'Primary Button', proto: 'ON_CLICK -> SLIDE_IN (Left, 0.35s)', uat: '✅ PASS' },
    { uc: 'UC-04', us: 'US-01', name: 'Onboarding 3 - Studio Advisory', actor: 'ACT-02, ACT-01', dark: 'ARKI / 04 - Onboarding Studio', light: 'ARKI / 04 - Onboarding Studio [Light]', components: 'Primary Button', proto: 'ON_CLICK -> SMART_ANIMATE (0.4s)', uat: '✅ PASS' },
    { uc: 'UC-05', us: 'US-02', name: 'Cổng Đăng Nhập VIP & Guest Mode', actor: 'ACT-02, ACT-01', dark: 'ARKI / 05 - Authentication', light: 'ARKI / 05 - Authentication [Light]', components: 'Primary & Secondary Buttons', proto: 'ON_CLICK -> SMART_ANIMATE (0.4s)', uat: '✅ PASS' },
    { uc: 'UC-06', us: 'US-02', name: 'Quét Sinh Trắc FaceID Gate', actor: 'ACT-02, SYS-01', dark: 'ARKI / 05b - FaceID Gate', light: 'ARKI / 05b - FaceID Gate [Light]', components: 'Sensor Scan Ring', proto: 'AFTER_TIMEOUT -> SMART_ANIMATE', uat: '✅ PASS' },
    { uc: 'UC-07', us: 'US-02', name: 'Xác Thực Mã Phần Cứng OTP 6 Số', actor: 'ACT-02, SYS-01', dark: 'ARKI / 05c - OTP Verification', light: 'ARKI / 05c - OTP Verification [Light]', components: 'PIN Keypad Frame', proto: 'ON_CLICK -> SMART_ANIMATE (0.35s)', uat: '✅ PASS' },
    { uc: 'UC-08', us: 'US-02', name: 'Ký Thỏa Thuận Bảo Mật VIP NDA', actor: 'ACT-02, ACT-05', dark: 'ARKI / 05d - VIP Advisory NDA', light: 'ARKI / 05d - VIP Advisory NDA [Light]', components: 'Primary Button', proto: 'ON_CLICK -> SMART_ANIMATE to 06', uat: '✅ PASS' },
    { uc: 'UC-09', us: 'US-03', name: 'Duyệt Feed 4 Phong Cách Kiến Trúc', actor: 'ACT-02, ACT-01', dark: 'ARKI / 06, 06b, 06c, 06d', light: 'ARKI / 06, 06b, 06c, 06d [Light]', components: 'Estate Preview Card, Bottom Nav', proto: 'ON_CLICK -> DISSOLVE (0.3s)', uat: '✅ PASS' },
    { uc: 'UC-10', us: 'US-04', name: 'Mở & Cấu Hình Khay Lọc Đa Tầng', actor: 'ACT-02', dark: 'ARKI / 07 - Search & Filters', light: 'ARKI / 07 - Search & Filters [Light]', components: 'Primary Button, Slider Bar', proto: 'MOVE_IN (Top, 0.3s) <-> SLIDE_OUT', uat: '✅ PASS' },
    { uc: 'UC-11', us: 'US-04', name: 'Xem 14 Kết Quả Lọc Đã Chọn', actor: 'ACT-02', dark: 'ARKI / 07b - Search Results', light: 'ARKI / 07b - Search Results [Light]', components: 'Estate Preview Card', proto: 'ON_CLICK -> SMART_ANIMATE', uat: '✅ PASS' },
    { uc: 'UC-12', us: 'US-05', name: 'Tra Cứu Bản Đồ Vệ Tinh Sơn Trà', actor: 'ACT-02', dark: 'ARKI / 08 - Estate Map View', light: 'ARKI / 08 - Estate Map View [Light]', components: 'Secondary Button, Map Layer', proto: 'SMART_ANIMATE <-> SLIDE_OUT', uat: '✅ PASS' },
    { uc: 'UC-13', us: 'US-05', name: 'Xem Thẻ Tóm Tắt Ghim Vị Trí Bản Đồ', actor: 'ACT-02', dark: 'ARKI / 08b - Map Pin Sheet', light: 'ARKI / 08b - Map Pin Sheet [Light]', components: 'Estate Preview Card', proto: 'ON_CLICK -> SMART_ANIMATE to 09', uat: '✅ PASS' },
    { uc: 'UC-14', us: 'US-06', name: 'Xem Hồ Sơ Chi Tiết Dinh Thự 6 Chỉ Số', actor: 'ACT-02, ACT-03', dark: 'ARKI / 09, 09b, 09c', light: 'ARKI / 09, 09b, 09c [Light]', components: 'Primary Button, VR Tour Badge', proto: 'SMART_ANIMATE <-> SLIDE_OUT', uat: '✅ PASS' },
    { uc: 'UC-15', us: 'US-07', name: 'Đọc Triết Lý & Xem Phác Thảo KTS', actor: 'ACT-03, ACT-04', dark: 'ARKI / 10 - Architect Phil', light: 'ARKI / 10 - Architect Phil [Light]', components: 'Secondary Button', proto: 'SMART_ANIMATE <-> SLIDE_OUT', uat: '✅ PASS' },
    { uc: 'UC-16', us: 'US-08', name: 'Soi Bản Vẽ CAD Mặt Bằng 1:100', actor: 'ACT-04, ACT-03', dark: 'ARKI / 10b - CAD Blueprint L1', light: 'ARKI / 10b - CAD Blueprint L1 [Light]', components: 'Secondary Button', proto: 'SMART_ANIMATE (0.35s)', uat: '✅ PASS' },
    { uc: 'UC-17', us: 'US-08', name: 'Soi Bản Vẽ Penthouse & Heli-pad 108°', actor: 'ACT-04, SYS-04', dark: 'ARKI / 10c - Blueprint Roof', light: 'ARKI / 10c - Blueprint Roof [Light]', components: 'Secondary Button', proto: 'SMART_ANIMATE (0.35s)', uat: '✅ PASS' },
    { uc: 'UC-18', us: 'US-09', name: 'Khám Phá Bảng Mẫu Đá, Gỗ & Kim Loại', actor: 'ACT-02, ACT-03', dark: 'ARKI / 10d - Materials', light: 'ARKI / 10d - Materials [Light]', components: 'Material Swatch Frames', proto: 'SMART_ANIMATE (0.35s)', uat: '✅ PASS' },
    { uc: 'UC-19', us: 'US-09', name: 'Mô Phỏng Quỹ Đạo Mặt Trời 24 Giờ', actor: 'ACT-02, ACT-03', dark: 'ARKI / 10e - Solar Path Study', light: 'ARKI / 10e - Solar Path Study [Light]', components: 'Solar Dial Component', proto: 'SMART_ANIMATE (0.35s)', uat: '✅ PASS' },
    { uc: 'UC-20', us: 'US-10', name: '360° Street View 2D Pan Tự Do', actor: 'ACT-02', dark: 'ARKI / 11 - 360 Panorama', light: 'ARKI / 11 - 360 Panorama [Light]', components: 'Nút tròn kính mờ 42x42px', proto: 'BOTH (2D Pan Cuộn Ngang/Dọc/Chéo)', uat: '✅ PASS' },
    { uc: 'UC-21', us: 'US-10', name: 'Chạm Hotspot Chuyển Không Gian 360°', actor: 'ACT-02', dark: 'ARKI / 11 - 360 Panorama', light: 'ARKI / 11 - 360 Panorama [Light]', components: 'Hotspot Pill Markers', proto: 'ON_CLICK -> Camera Teleport', uat: '✅ PASS' },
    { uc: 'UC-22', us: 'US-11', name: 'Xoay Mô Hình 3D Bóc Mái Bằng Drag', actor: 'ACT-02', dark: 'ARKI / 11b - 3D Dollhouse Drag', light: 'ARKI / 11b - 3D Dollhouse Drag [Light]', components: 'Nút tròn kính mờ 42x42px', proto: 'ON_DRAG -> SMART_ANIMATE (300ms)', uat: '✅ PASS' },
    { uc: 'UC-23', us: 'US-12', name: 'Xem Video Drone 4K & Spatial Audio', actor: 'ACT-02', dark: 'ARKI / 12 - Video Tour Player', light: 'ARKI / 12 - Video Tour Player [Light]', components: 'Nút tròn kính mờ 42x42px', proto: 'SMART_ANIMATE (0.4s)', uat: '✅ PASS' },
    { uc: 'UC-24', us: 'US-12', name: 'Bật / Tắt Play/Pause & Kéo Scrubber', actor: 'ACT-02', dark: 'ARKI / 12a, 12b (Play/Pause)', light: 'ARKI / 12a, 12b [Light]', components: 'Play/Pause Circle Button', proto: 'ON_CLICK Play <-> Pause 02:45', uat: '✅ PASS' },
    { uc: 'UC-25', us: 'US-13', name: 'Duyệt Chuỗi 5 Slider Ảnh Vòng Lặp Kín', actor: 'ACT-02', dark: 'ARKI / 13 - 15c (5 Sliders)', light: 'ARKI / 13 - 15c [Light]', components: 'Nút tròn kính mờ 42x42px', proto: 'SLIDE_IN (Left) <-> DISSOLVE Loop', uat: '✅ PASS' },
    { uc: 'UC-26', us: 'US-13', name: 'Xem Lưới 9 Khung Ảnh Toàn Màn Hình', actor: 'ACT-02, ACT-03', dark: 'ARKI / 23 - Fullscreen Grid', light: 'ARKI / 23 - Fullscreen Grid [Light]', components: 'Nút tròn kính mờ 42x42px', proto: 'ON_CLICK -> Zoom to Screen', uat: '✅ PASS' },
    { uc: 'UC-27', us: 'US-14', name: 'Đặt Lịch Hẹn Khảo Sát Tháng 10/2026', actor: 'ACT-02, ACT-05', dark: 'ARKI / 16 - Schedule Viewing', light: 'ARKI / 16 - Schedule Viewing [Light]', components: 'Component / Primary Button', proto: 'ON_CLICK -> SMART_ANIMATE (0.4s)', uat: '✅ PASS' },
    { uc: 'UC-28', us: 'US-14', name: 'Chọn Đón Bằng Trực Thăng Bell 429', actor: 'ACT-02, SYS-04', dark: 'ARKI / 16b - Arrival Logistics', light: 'ARKI / 16b - Arrival Logistics [Light]', components: 'Transport Option Pills', proto: 'ON_CLICK -> SMART_ANIMATE to 17', uat: '✅ PASS' },
    { uc: 'UC-29', us: 'US-15', name: 'Cấp Thẻ VIP BOARDING PASS #ARK-8821', actor: 'ACT-02, ACT-05', dark: 'ARKI / 17 - VIP Pass Confirm', light: 'ARKI / 17 - VIP Pass Confirm [Light]', components: 'Pass Boarding Card', proto: 'SMART_ANIMATE (0.4s)', uat: '✅ PASS' },
    { uc: 'UC-30', us: 'US-15', name: 'Lưu Thẻ VIP Passbook Vào Apple Wallet', actor: 'ACT-02, SYS-02', dark: 'ARKI / 17b - Apple Wallet Pass', light: 'ARKI / 17b - Apple Wallet Pass [Light]', components: 'Apple Wallet Sync Button', proto: 'PassKit API Sync + NFC Tap', uat: '✅ PASS' },
    { uc: 'UC-31', us: 'US-16', name: 'Nhắn Tin Mã Hóa Với KTS Tadao Ando', actor: 'ACT-02, ACT-04', dark: 'ARKI / 19 - Architect Chat', light: 'ARKI / 19 - Architect Chat [Light]', components: 'Chat Bubble Containers', proto: 'MOVE_IN (Right) <-> SLIDE_OUT', uat: '✅ PASS' },
    { uc: 'UC-32', us: 'US-16', name: 'Họp Truyền Hình Live Video Tư Vấn', actor: 'ACT-02, ACT-04', dark: 'ARKI / 19b - Live Video Consult', light: 'ARKI / 19b - Live Video Consult [Light]', components: 'Video Call Window', proto: 'WebRTC Video Sync + CAD Stream', uat: '✅ PASS' },
    { uc: 'UC-33', us: 'US-16', name: 'Nộp Đơn Đề Xuất Tùy Biến Kết Cấu +4m', actor: 'ACT-02, ACT-04', dark: 'ARKI / 19c - Custom Request', light: 'ARKI / 19c - Custom Request [Light]', components: 'Modification Form & Primary Btn', proto: 'ON_CLICK -> Form Submit', uat: '✅ PASS' },
    { uc: 'UC-34', us: 'US-17', name: 'Tính Đòn Bẩy Vay & Trả Góp Định Kỳ', actor: 'ACT-02, ACT-06', dark: 'ARKI / 20 - Financial Calc', light: 'ARKI / 20 - Financial Calc [Light]', components: 'Financial Calculator Card', proto: 'MOVE_IN (Bottom) <-> SLIDE_OUT', uat: '✅ PASS' },
    { uc: 'UC-35', us: 'US-17', name: 'Ký Quỹ Bằng Bitcoin 68.2 BTC & Escrow', actor: 'ACT-03, SYS-03', dark: 'ARKI / 20b - Crypto Escrow', light: 'ARKI / 20b - Crypto Escrow [Light]', components: 'Multi-Currency Selector', proto: 'Smart Contract Escrow Lock', uat: '✅ PASS' },
    { uc: 'UC-36', us: 'US-17', name: 'Phân Tích Dự Báo Tăng Giá Vốn 10 Năm', actor: 'ACT-02, ACT-06', dark: 'ARKI / 20c - Capital Growth', light: 'ARKI / 20c - Capital Growth [Light]', components: 'Appreciation Chart Card', proto: 'SMART_ANIMATE (0.35s)', uat: '✅ PASS' },
    { uc: 'UC-37', us: 'US-18', name: 'Quản Lý Danh Mục Kiệt Tác Đã Lưu $17M', actor: 'ACT-03', dark: 'ARKI / 18 - Saved Architecture', light: 'ARKI / 18 - Saved Architecture [Light]', components: 'Estate Preview Card, Bottom Nav', proto: 'SMART_ANIMATE <-> DISSOLVE', uat: '✅ PASS' },
    { uc: 'UC-38', us: 'US-18', name: 'Tạo Thư Mục Bộ Sưu Tập Riêng Tư', actor: 'ACT-03', dark: 'ARKI / 18b - Curated Collection', light: 'ARKI / 18b - Curated Collection [Light]', components: 'Folder Form & Primary Btn', proto: 'ON_CLICK -> Create Folder', uat: '✅ PASS' },
    { uc: 'UC-39', us: 'US-19', name: 'Hồ Sơ Alexander Vance & Đặc Quyền', actor: 'ACT-03, ACT-05', dark: 'ARKI / 21, 21b, 21c (Profile)', light: 'ARKI / 21, 21b, 21c [Light]', components: 'Secondary Button, Badge', proto: 'SMART_ANIMATE -> Logout to 05', uat: '✅ PASS' },
    { uc: 'UC-40', us: 'US-20', name: 'Menu 3 Gạch ☰, Đổi Theme & Song Ngữ', actor: 'Tất cả Actors', dark: 'ARKI / 25 - Drawer Menu', light: 'ARKI / 25 - Drawer Menu [Light]', components: 'Trọn bộ 10 Master Components', proto: 'SLIDE_IN (Menu) + Cross-Theme Matrix', uat: '✅ PASS' }
  ];

  traceData.forEach((item) => {
    const row = wsTrace.addRow(item);
    row.height = 34;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum <= 2) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
      if (colNum === 9) {
        cell.fill = passFill;
        cell.font = passFont;
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // Save workbook
  const outputPath = path.resolve('C:/figma/ARKI_NghiepVu_Actors_US_UC.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`🎉 Detailed Excel File successfully created at: ${outputPath}`);
}

generateDetailedExcel().catch((err) => {
  console.error('❌ Error generating Excel file:', err);
  process.exit(1);
});
