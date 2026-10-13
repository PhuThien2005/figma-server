import ExcelJS from 'exceljs';
import path from 'path';

async function generateDetailedExcel() {
  console.log('📊 Starting Granular Excel Generation for ARKI (40 Detailed Use Cases, Actors, Flows, US, Traceability & Nielsen Heuristics)...');

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ARKI UI/UX Engineering Team';
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
  const passFont = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF166534' } };
  const warningFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
  const warningFont = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF92400E' } };

  // =========================================================================
  // SHEET 1: ACTORS MATRIX (ĐẶC TẢ TÁC NHÂN & QUAN HỆ KẾ THỪA)
  // =========================================================================
  const wsActors = workbook.addWorksheet('1. Danh Mục Actors', { views: [{ showGridLines: true }] });
  wsActors.columns = [
    { header: 'Mã Actor', key: 'id', width: 14 },
    { header: 'Tên Tác Nhân (Actor Name)', key: 'name', width: 28 },
    { header: 'Phân Loại & Quan Hệ Kế Thừa', key: 'type', width: 26 },
    { header: 'Mô Tả Vai Trò (Persona & Role)', key: 'role', width: 42 },
    { header: 'Phạm Vi Quyền Hạn (Permissions & Scope)', key: 'permissions', width: 44 },
    { header: 'Use Cases Tham Gia Cụ Thể', key: 'useCases', width: 36 },
    { header: 'Màn Hình Trực Tiếp Tương Tác', key: 'screens', width: 32 }
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
    // =========================================================================
    // KHỐI 1: ADMIN HỆ THỐNG (PLATFORM GOVERNANCE)
    // =========================================================================
    {
      id: 'ADM-01',
      name: 'Super Administrator / Quản Trị Toàn Cầu',
      type: 'Nhóm 1: Admin Hệ Thống',
      role: 'Ban điều hành ARKI Global, Giám đốc nền tảng quản trị quyền hạn cao nhất.',
      permissions: 'Toàn quyền cấu hình phân quyền động RBAC, phê duyệt niêm yết bất động sản kín (Off-market listings), giám sát quỹ ký quỹ Escrow Multi-Sig toàn cầu và xử lý sự cố bảo mật.',
      useCases: 'UC-ADM-01, UC-ADM-02, Giám sát toàn hệ thống',
      screens: 'ADMIN / 01 - Platform Governance, ADMIN / 02 - RBAC Management'
    },
    {
      id: 'ADM-02',
      name: 'Security & Compliance Auditor',
      type: 'Nhóm 1: Admin Hệ Thống',
      role: 'Chuyên viên kiểm toán an ninh mạng và tuân thủ pháp lý tài chính quốc tế.',
      permissions: 'Kiểm tra nhật ký kiểm toán Enclave Audit Logs, giám sát các chứng chỉ ký số NDA, đối soát lưu lượng truy cập bất thường và bảo mật session token #ARK-SEC-992.',
      useCases: 'UC-ADM-01 (Audit Stream), Giám sát tuân thủ',
      screens: 'ADMIN / 01 - Enclave Stream, ADMIN / 02 - Access Logs'
    },

    // =========================================================================
    // KHỐI 2: NHÂN VIÊN HỆ THỐNG (OPERATIONS & DOMAIN SPECIALISTS)
    // =========================================================================
    {
      id: 'STF-01',
      name: 'Chuyên Viên Môi Giới & VIP Concierge',
      type: 'Nhóm 2: Nhân Viên Hệ Thống',
      role: 'Chuyên viên quản lý dịch vụ đón tiếp thượng lưu và hậu cần hàng không/hàng hải của ARKI Club.',
      permissions: 'Tiếp nhận yêu cầu khảo sát, điều phối slot bay trực thăng Bell 429 tầng mái biệt thự hoặc du thuyền Sunseeker, phê duyệt và phát hành thẻ vé thông hành VIP BOARDING PASS #ARK-8821.',
      useCases: 'UC-26, UC-27, UC-28, UC-STF-01',
      screens: 'STAFF / 01 - Concierge Logistics Board, 16, 16b, 17, 17b'
    },
    {
      id: 'STF-02',
      name: 'Kiến Trúc Sư Studio & CAD Specialist',
      type: 'Nhóm 2: Nhân Viên Hệ Thống',
      role: 'Đại diện văn phòng KTS trưởng Pritzker (Studio Tadao Ando, Kengo Kuma, Zaha Hadid).',
      permissions: 'Quản trị hồ sơ bản vẽ CAD 1:100, điều hành kênh họp video trực tuyến với khách VIP, thẩm định tính khả thi kết cấu dầm bê tông đối với các đơn đề xuất tùy biến (hồ bơi +4m).',
      useCases: 'UC-15, UC-16, UC-17, UC-30, UC-31, UC-32, UC-STF-02',
      screens: 'STAFF / 02 - Architect Studio Workbench, 10, 10b, 10c, 19, 19b, 19c'
    },
    {
      id: 'STF-03',
      name: 'Chuyên Viên Pháp Lý & Ký Quỹ Escrow',
      type: 'Nhóm 2: Nhân Viên Hệ Thống',
      role: 'Chuyên viên tài chính ngân hàng đối tác và giám sát hợp đồng thông minh quốc tế.',
      permissions: 'Cập nhật cấu trúc lãi suất vay thế chấp (4.3% 20 năm), kiểm soát tỷ giá quy đổi 68.2 BTC, giám sát hợp đồng thông minh Multi-Sig Escrow 3/5 chìa khóa.',
      useCases: 'UC-32, UC-33, UC-34, UC-35',
      screens: 'STAFF / 01, 20, 20b, 20c'
    },

    // =========================================================================
    // KHỐI 3: KHÁCH HÀNG THƯỢNG LƯU (CLIENTS & PATRONS)
    // =========================================================================
    {
      id: 'CLI-01',
      name: 'Khách Quan Sát (Guest Observer)',
      type: 'Nhóm 3: Khách Hàng (Base Tier)',
      role: 'Khách vãng lai quan tâm tới kiến trúc nghệ thuật, trải nghiệm nhanh qua chế độ Guest Mode.',
      permissions: 'Xem danh mục kiệt tác công khai, duyệt bảng tin phong cách. Bị giới hạn toạ độ GPS chính xác, không xem tài sản kín (Off-market), không mở khóa tính năng đặt lịch trực thăng.',
      useCases: 'UC-01 đến UC-05, UC-09 đến UC-13, UC-24, UC-40',
      screens: '01 - 04, 05 (Guest Mode), 06, 07, 07b, 08, 08b, 13 - 15c, 25'
    },
    {
      id: 'CLI-02',
      name: 'Khách Hàng VIP (Verified VIP Buyer)',
      type: 'Nhóm 3: Khách Hàng (Kế thừa CLI-01)',
      role: 'Khách hàng có tài sản ròng lớn (HNWI) đã hoàn tất quét FaceID, mã OTP và ký thỏa thuận bảo mật NDA.',
      permissions: 'Kế thừa toàn quyền CLI-01. Mở khóa toàn quyền xem bất động sản kín, toạ độ GPS vệ tinh, tour 3D/VR, mô hình bóc mái, xem bản vẽ CAD, tính dự toán và đặt lịch đón tiếp trực thăng.',
      useCases: 'UC-01 đến UC-37, UC-40',
      screens: '05b, 05c, 05d, 06 - 09c, 10b - 17b, 18, 19 - 20c, 23, 25'
    },
    {
      id: 'CLI-03',
      name: 'Nhà Sưu Tập / Black Diamond Patron',
      type: 'Nhóm 3: Khách Hàng (Kế thừa CLI-02)',
      role: 'Hội viên cấp cao nhất (Persona đại diện: Alexander Vance - Thẻ #004) sở hữu danh mục kiệt tác $17M+.',
      permissions: 'Kế thừa toàn quyền CLI-02. Sở hữu đặc quyền tư vấn KTS riêng 24/7, phòng xem trước Sotheby\'s, thiết lập ký quỹ Multi-Sig Crypto Escrow, tạo thư mục riêng tư và tải đệm VR Offline.',
      useCases: 'UC-14 đến UC-22, UC-30 đến UC-40',
      screens: '10, 10b - 10e, 18, 18b, 19 - 21c, 22, 22b, 24, 25'
    },

    // =========================================================================
    // KHỐI 4: DỊCH VỤ NGOẠI VI (SYSTEM SERVICES)
    // =========================================================================
    {
      id: 'SYS-01',
      name: 'Identity & Biometric Vault',
      type: 'Dịch Vụ Ngoại Vi (System)',
      role: 'Hệ thống bảo mật sinh trắc học Apple FaceID, Secure Enclave và OTP Gateway.',
      permissions: 'Đối soát khuôn mặt người dùng, sinh mã xác thực OTP 6 số ngẫu nhiên, cấp phát Session Token #ARK-SEC-992.',
      useCases: 'UC-06, UC-07',
      screens: '05b, 05c'
    },
    {
      id: 'SYS-02',
      name: 'Apple Wallet PassKit Gateway',
      type: 'Dịch Vụ Ngoại Vi (System)',
      role: 'Máy chủ tạo thẻ vé điện tử định dạng Apple Wallet (.pkpass) tích hợp chip NFC ảo.',
      permissions: 'Ký số chứng chỉ vé VIP PASS, đẩy thẻ vào ứng dụng Apple Wallet trên iOS, hiển thị Dynamic Island.',
      useCases: 'UC-28, UC-29',
      screens: '17, 17b'
    },
    {
      id: 'SYS-03',
      name: 'Hệ Thống Hợp Đồng Thông Minh Escrow',
      type: 'Dịch Vụ Ngoại Vi (System)',
      role: 'Cơ chế Multi-Sig Smart Contract quản lý ký quỹ trung gian đa tiền tệ.',
      permissions: 'Khóa tiền ký quỹ (Escrow Lock 68.2 BTC), khóa tỷ giá bảo chứng 15 phút, giải ngân theo các mốc hoàn thành pháp lý.',
      useCases: 'UC-34',
      screens: '20b'
    },
    {
      id: 'SYS-04',
      name: 'Hệ Thống Quản Lý Không Vận & Hàng Hải',
      type: 'Dịch Vụ Ngoại Vi (System)',
      role: 'Dịch vụ điều phối slot bay trực thăng tư nhân và luồng hàng hải cập cảng.',
      permissions: 'Kiểm tra tọa độ và slot hạ cánh an toàn 108° ESE trên sân đỗ trực thăng tầng mái biệt thự (Bell 429), cập nhật điều kiện thời tiết.',
      useCases: 'UC-17, UC-27',
      screens: '10c, 16b'
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
  // SHEET 2: BUSINESS FLOWS & SCREEN METRICS
  // =========================================================================
  const wsFlows = workbook.addWorksheet('2. Luồng Nghiệp Vụ (Flows)', { views: [{ showGridLines: true }] });
  wsFlows.columns = [
    { header: 'Mã Luồng', key: 'id', width: 14 },
    { header: 'Tên Luồng Nghiệp Vụ', key: 'name', width: 32 },
    { header: 'Mục Tiêu Nghiệp Vụ Cốt Lõi', key: 'goal', width: 40 },
    { header: 'Actor Chính', key: 'primaryActor', width: 22 },
    { header: 'Actor Phụ / Dịch Vụ Hỗ Trợ', key: 'subActors', width: 28 },
    { header: 'Số Màn Hình (Base × 2 Theme)', key: 'screenCount', width: 24 },
    { header: 'Danh Sách Màn Hình Figma Ánh Xạ', key: 'screens', width: 36 },
    { header: 'Điểm Chạm Tương Tác Cốt Lõi (Micro-Interactions)', key: 'interactions', width: 42 }
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
    { id: 'FLOW-01', name: 'Khởi Động & Xác Thực Sinh Trắc Học VIP', goal: 'Chào đón người dùng, truyền tải thông điệp thương hiệu KTS Pritzker và xác lập phiên bảo mật ngân hàng với FaceID & OTP.', primaryActor: 'ACT-02: Khách Hàng VIP', subActors: 'ACT-01, SYS-01 (FaceID Vault)', screenCount: '8 màn × 2 = 16', screens: '01, 02, 03, 04, 05, 05b, 05c, 05d', interactions: 'Loading 3 giai đoạn (AFTER_TIMEOUT), trượt Onboarding (SLIDE_IN), quét FaceID hồng ngoại, bàn phím OTP ảo, ký điện tử NDA.' },
    { id: 'FLOW-02', name: 'Khám Phá, Lọc Nâng Cao & Bản Đồ Vệ Tinh', goal: 'Phân loại công trình theo ngôn ngữ kiến trúc, lọc theo ngân sách và studio KTS, tra cứu vị trí địa lý thực tế trên bán đảo Sơn Trà.', primaryActor: 'ACT-02: Khách Hàng VIP', subActors: 'ACT-01 (Guest)', screenCount: '8 màn × 2 = 16', screens: '06, 06b, 06c, 06d, 07, 07b, 08, 08b', interactions: 'Chuyển tab Pill Category (DISSOLVE), khay lọc trượt từ đỉnh (MOVE_IN TOP), thanh kéo giá $2.5M - $12M, thẻ ghim bản đồ GPS.' },
    { id: 'FLOW-03', name: 'Thẩm Định Chi Tiết Dinh Thự & Triết Lý KTS', goal: 'Cung cấp hồ sơ công trình đạt chuẩn bảo tàng: bản vẽ CAD 1:100, bảng mẫu vật liệu thực và biểu đồ quỹ đạo mặt trời 24h.', primaryActor: 'ACT-02, ACT-03 (Patron)', subActors: 'ACT-04 (Lead Architect)', screenCount: '8 màn × 2 = 16', screens: '09, 09b, 09c, 10, 10b, 10c, 10d, 10e', interactions: 'Header ảnh tràn viền 393px, 6 chỉ số công thái học, xem phác thảo tay KTS, soi bản vẽ CAD, biểu đồ đổ bóng mặt trời 06h - 18h.' },
    { id: 'FLOW-04', name: 'Trải Nghiệm 3D VR, 360° Panorama & Media 4K', goal: 'Tham quan không gian thực tế ảo đa chiều, xoay mô hình bóc mái bằng tay và thưởng thức phim flycam điện ảnh kèm slider ảnh.', primaryActor: 'ACT-02: Khách Hàng VIP', subActors: 'ACT-03 (Patron)', screenCount: '11 màn × 2 = 22', screens: '11, 11b, 12, 12a, 12b, 13, 14, 15, 15b, 15c, 23', interactions: 'Cuộn tự do 2D Pan (Ngang/Dọc/Chéo) với 4 Hotspots, xoay mô hình 3D bằng cử chỉ kéo (ON_DRAG), video Play/Pause scrubber, slider 5 ảnh vô tận.' },
    { id: 'FLOW-05', name: 'Đặt Lịch Khảo Sát VIP & Cấp Vé Apple Wallet', goal: 'Đăng ký tham quan thực địa, chọn đón tiếp bằng trực thăng/du thuyền và cấp phát thẻ thông hành điện tử bảo mật.', primaryActor: 'ACT-02: Khách Hàng VIP', subActors: 'ACT-05 (Concierge), SYS-02, SYS-04', screenCount: '4 màn × 2 = 8', screens: '16, 16b, 17, 17b', interactions: 'Bộ chọn lịch tháng 10/2026, chọn trực thăng Bell 429, sinh mã QR VIP PASS #ARK-8821, đồng bộ Apple Wallet Passbook NFC.' },
    { id: 'FLOW-06', name: 'Kênh Tư Vấn KTS Chủ Trì & Đề Xuất Tùy Biến', goal: 'Đối thoại bảo mật trực tiếp với văn phòng KTS Tadao Ando, họp video chia sẻ bản vẽ và lập đơn sửa đổi kết cấu công trình.', primaryActor: 'ACT-02, ACT-03 (Patron)', subActors: 'ACT-04: Lead Architect Studio', screenCount: '3 màn × 2 = 6', screens: '19, 19b, 19c', interactions: 'Nhắn tin mã hóa thời gian thực (MOVE_IN RIGHT), họp truyền hình Live Video song song mô hình 3D, biểu mẫu tùy biến hồ bơi (+4m).' },
    { id: 'FLOW-07', name: 'Máy Tính Tài Chính & Ký Quỹ Đa Tiền Tệ Escrow', goal: 'Mô phỏng đòn bẩy tài chính, dự báo tăng trưởng vốn 10 năm và hỗ trợ ký quỹ thanh toán bằng Bitcoin/Ethereum.', primaryActor: 'ACT-02, ACT-03 (Patron)', subActors: 'ACT-06 (Finance), SYS-03 (Escrow)', screenCount: '3 màn × 2 = 6', screens: '20, 20b, 20c', interactions: 'Bảng tính trả trước 30% ($1.275M), tính trả góp $18,450/tháng (lãi 4.3% 20 năm), tỷ giá 68.2 BTC ký quỹ, biểu đồ tăng trưởng vốn ~12.9%/năm lên $11.8M.' },
    { id: 'FLOW-08', name: 'Bộ Sưu Tập Yêu Thích, Hồ Sơ VIP & Offline VR', goal: 'Quản trị danh mục dinh thự quan tâm ($17M+), chia sẻ mã QR bảo mật, cài đặt thẻ hội viên Black Diamond và tải bộ nhớ đệm VR.', primaryActor: 'ACT-03: Black Diamond Patron', subActors: 'ACT-05 (Concierge)', screenCount: '8 màn × 2 = 16', screens: '18, 18b, 21, 21b, 21c, 22, 22b, 24', interactions: 'Thẻ lưu trữ kiệt tác, chứng nhận Black Diamond Patron #004, chia sẻ QR gắn watermark an ninh, tải trước dữ liệu 3D VR offline.' },
    { id: 'FLOW-09', name: 'Menu Drawer Điều Hướng & Chuyển Theme / Ngôn Ngữ', goal: 'Lối tắt điều hướng nhanh qua menu 3 gạch (☰), chuyển đổi 2 chiều tức thì giữa Daylight Porcelain và Nocturne Slate.', primaryActor: 'Tất cả Actors (ACT-01, 02, 03)', subActors: 'Hệ thống Styling đa Theme', screenCount: '1 màn × 2 = 2', screens: '25 (áp dụng cho toàn bộ 54 màn cơ sở)', interactions: 'Trượt mở Menu Drawer từ cạnh phải (SLIDE_IN), tổ hợp menu tối giản, nút chuyển theme 2 chiều (SMART_ANIMATE), chuyển ngữ VI/EN.' }
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

  // Dòng tổng kết số màn hình chuẩn xác
  const summaryRow = wsFlows.addRow({
    id: 'TỔNG CỘNG',
    name: 'Toàn bộ 9 Luồng Nghiệp Vụ',
    goal: 'Bao quát trọn vẹn trải nghiệm thẩm định và sở hữu bất động sản kiến trúc thượng lưu.',
    primaryActor: 'Toàn bộ Actors',
    subActors: 'Toàn bộ Hệ Thống',
    screenCount: '54 Base × 2 = 108 Artboards',
    screens: '54 màn Dark + 54 màn Light đối xứng chuẩn 1-1',
    interactions: '370+ Prototyping Transitions & Smart Animate'
  });
  summaryRow.height = 32;
  summaryRow.eachCell((cell) => {
    cell.fill = titleFill;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // =========================================================================
  // SHEET 3: USER STORIES (20 US CHUẨN AGILE VỚI TIÊU CHÍ USABILITY)
  // =========================================================================
  const wsUS = workbook.addWorksheet('3. User Stories (Agile)', { views: [{ showGridLines: true }] });
  wsUS.columns = [
    { header: 'Mã US', key: 'id', width: 12 },
    { header: 'Phân Hệ', key: 'module', width: 22 },
    { header: 'Actor (As a...)', key: 'actor', width: 26 },
    { header: 'Hành Động & Tính Năng (I want...)', key: 'action', width: 36 },
    { header: 'Giá Trị Đạt Được (So that...)', key: 'value', width: 36 },
    { header: 'Tiêu Chí Chấp Nhận (Acceptance Criteria & Usability Goal)', key: 'ac', width: 45 },
    { header: 'Màn Hình', key: 'screens', width: 18 },
    { header: 'Ưu Tiên (MoSCoW)', key: 'priority', width: 16 }
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
    { id: 'US-01', module: 'Onboarding & Branding', actor: 'Khách Quan Sát (ACT-01 / ACT-02)', action: 'Xem phần giới thiệu thương hiệu và các slide triết lý KTS Pritzker khi mở ứng dụng.', value: 'Nhanh chóng hiểu rõ định vị nghệ thuật và phong cách kiến trúc đặc thù của câu lạc bộ ARKI.', ac: 'Thời gian tải ban đầu mượt mà, phản hồi chuyển trang < 400ms, cho phép vuốt bỏ qua hoặc bấm Tiếp tục mà không gây kẹt luồng.', screens: '01, 02, 03, 04', priority: 'Must Have' },
    { id: 'US-02', module: 'Xác Thực & Bảo Mật', actor: 'Khách Hàng VIP (ACT-02)', action: 'Đăng nhập bảo mật qua cổng sinh trắc FaceID hoặc mã OTP và xác nhận cam kết bảo mật NDA.', value: 'Đảm bảo danh tính thượng lưu và giữ kín thông tin các thỏa thuận bất động sản riêng tư.', ac: 'Quy trình đăng nhập hoàn tất trong ≤ 3 thao tác; thông báo lỗi hiển thị rõ ràng khi quét không thành công; cung cấp đường dẫn vào nhanh Guest Mode.', screens: '05, 05b, 05c, 05d', priority: 'Must Have' },
    { id: 'US-03', module: 'Khám Phá Danh Mục', actor: 'Khách Hàng VIP (ACT-02)', action: 'Duyệt bảng tin kiệt tác theo 4 nhóm phong cách kiến trúc (Tất cả, Biển Sơn Trà, Bê tông thô mộc, Sinh thái).', value: 'Tiếp cận đúng ngôn ngữ kiến trúc yêu thích mà không bị phân tán thông tin.', ac: 'Danh sách công trình cập nhật ngay lập tức khi chọn tab; hiển thị rõ ràng giá bán chuẩn và diện tích trong 1 khung nhìn.', screens: '06, 06b, 06c, 06d', priority: 'Must Have' },
    { id: 'US-04', module: 'Bộ Lọc Chuyên Sâu', actor: 'Khách Hàng VIP (ACT-02)', action: 'Lọc dinh thự theo khoảng giá $2.5M - $12M và studio KTS trưởng (Tadao Ando, Kengo Kuma, Zaha Hadid).', value: 'Nhanh chóng tìm thấy bất động sản vừa vặn với ngân sách và gu thẩm mỹ cá nhân.', ac: 'Người dùng thiết lập và áp dụng bộ lọc trong ≤ 15 giây; thanh trượt phản hồi mượt mà; hiển thị số lượng kết quả trùng khớp chính xác.', screens: '07, 07b', priority: 'Must Have' },
    { id: 'US-05', module: 'Bản Đồ Địa Lý Vệ Tinh', actor: 'Khách Hàng VIP (ACT-02)', action: 'Xem bản đồ vệ tinh định vị toạ độ GPS các dinh thự và chạm ghim xem tóm tắt thông tin.', value: 'Đánh giá địa thế phong thủy, cự ly bờ biển và khả năng tiếp cận giao thông.', ac: 'Chạm vào ghim hiển thị ngay thẻ nổi tóm tắt trong < 300ms; bấm thẻ dẫn thẳng vào trang chi tiết dinh thự tương ứng.', screens: '08, 08b', priority: 'Must Have' },
    { id: 'US-06', module: 'Thẩm Định Chi Tiết', actor: 'Khách Hàng VIP (ACT-02)', action: 'Xem hồ sơ chi tiết bất động sản với hình ảnh chất lượng cao và bảng chỉ số công năng công thái học.', value: 'Nắm bắt đầy đủ quy mô dinh thự và công năng sinh hoạt chính xác.', ac: 'Toàn bộ 6 chỉ số công năng cốt lõi hiển thị rõ ràng, tương phản cao, không che khuất hành động quan trọng (Schedule Viewing).', screens: '09, 09b, 09c', priority: 'Must Have' },
    { id: 'US-07', module: 'Triết Lý Kiến Trúc', actor: 'Nhà Sưu Tập (ACT-03)', action: 'Đọc bài luận triết lý hình học ánh sáng và xem bản phác thảo tay nguyên tác của KTS Pritzker.', value: 'Thấu hiểu giá trị vô hình và câu chuyện nghệ thuật ẩn sau công trình.', ac: 'Văn bản được căn chỉnh dễ đọc (Typography Hierarchy); hình ảnh phác thảo hiển thị sắc nét; có nút quay lại trang chi tiết thuận tiện.', screens: '10', priority: 'Should Have' },
    { id: 'US-08', module: 'Bản Vẽ Kỹ Thuật CAD', actor: 'Khách Hàng VIP / KTS (ACT-02 / ACT-04)', action: 'Soi xét bản vẽ CAD mặt bằng 1:100 và góc hạ cánh trực thăng 108° ESE tầng mái.', value: 'Đánh giá công năng giao thông nội bộ và độ an toàn kỹ thuật hàng không.', ac: 'Bản vẽ tỷ lệ hiển thị lưới CAD rõ nét trên cả nền tối và sáng; ký hiệu quy chuẩn kiến trúc trực quan, không gây nhầm lẫn.', screens: '10b, 10c', priority: 'Should Have' },
    { id: 'US-09', module: 'Vật Liệu & Hướng Nắng', actor: 'Khách Hàng VIP (ACT-02)', action: 'Khám phá mẫu vật liệu hoàn thiện tự nhiên và mô phỏng đổ bóng mặt trời 24 giờ.', value: 'Biết trước chất lượng bề mặt đá Navona, gỗ Shou Sugi Ban và tính vi khí hậu tự nhiên.', ac: 'Thao tác xem chuyển đổi giữa các mốc 06:00, 12:00, 18:00 trực quan; mẫu vật liệu hiển thị tên gọi và xuất xứ cụ thể.', screens: '10d, 10e', priority: 'Should Have' },
    { id: 'US-10', module: '360° Street View Đa Hướng', actor: 'Khách Hàng VIP (ACT-02)', action: 'Kéo xoay tự do không gian ảo 2D (ngang 360°, dọc ngước trần/sàn) kết hợp các điểm chuyển phòng Hotspots.', value: 'Trải nghiệm toàn diện không gian như đang đứng trực tiếp tại đại sảnh dinh thự.', ac: 'Cử chỉ kéo vuốt phản hồi tức thì, góc nhìn chuyển tiếp êm ái; thanh công cụ điều hướng cố định không che tầm nhìn.', screens: '11', priority: 'Must Have' },
    { id: 'US-11', module: '3D Turntable Kéo Vuốt', actor: 'Khách Hàng VIP (ACT-02)', action: 'Dùng cử chỉ vuốt kéo (ON_DRAG) xoay quanh mô hình 3D bóc mái biệt thự 4 góc vuông.', value: 'Bao quát hình khối kiến trúc và kết cấu chịu lực của toàn bộ dinh thự.', ac: 'Mô hình chuyển góc êm ái qua Smart Animate; hỗ trợ xoay vòng lặp 360 độ liên tục không bị giật cục.', screens: '11b', priority: 'Must Have' },
    { id: 'US-12', module: 'Video Tour 4K & Trình Phát', actor: 'Khách Hàng VIP (ACT-02)', action: 'Xem video flycam toàn cảnh và điều khiển trình phát video (Play/Pause/Scrubber) mượt mà.', value: 'Chiêm ngưỡng toàn cảnh bán đảo Sơn Trà và cảm nhận thực tế quy mô công trình.', ac: 'Nút điều khiển Play/Pause phản hồi ngay lập tức; thanh thời gian hiển thị chính xác tiến trình phát.', screens: '12, 12a, 12b', priority: 'Must Have' },
    { id: 'US-13', module: 'Thư Viện Ảnh Slider & Grid', actor: 'Khách Hàng VIP (ACT-02)', action: 'Duyệt chuỗi ảnh toàn cảnh các phòng dạng slider vòng lặp và mở lưới ảnh toàn màn hình.', value: 'Chiêm ngưỡng chi tiết nội thất phòng khách, bếp, hồ bơi và hầm rượu.', ac: 'Chuyển ảnh lặp vòng kín không gặp ngõ cụt; hỗ trợ xem lưới 9 ảnh bao quát chỉ trong 1 thao tác bấm.', screens: '13 - 15c, 23', priority: 'Must Have' },
    { id: 'US-14', module: 'Đặt Lịch Hẹn Khảo Sát', actor: 'Khách Hàng VIP (ACT-02)', action: 'Chọn ngày hẹn khảo sát tháng 10/2026, chọn khung giờ 14:30 và chọn phương án đón tiếp.', value: 'Thiết lập chuyến khảo sát thực địa chu đáo và đúng lịch trình cá nhân.', ac: 'Người dùng hoàn tất đặt lịch trong ≤ 1 phút; phản hồi trực quan ngày được chọn (Thứ Sáu 16/10/2026).', screens: '16, 16b', priority: 'Must Have' },
    { id: 'US-15', module: 'Thẻ VIP Pass & Apple Wallet', actor: 'Khách Hàng VIP (ACT-02)', action: 'Nhận thẻ thông hành điện tử #ARK-8821 có mã QR và lưu vào Apple Wallet qua NFC.', value: 'Lưu trữ vé vào cổng tiện lợi trên điện thoại để check-in bảo mật khi đến tham quan.', ac: 'Mã QR hiển thị sắc nét; nút Thêm vào Apple Wallet phản hồi ngay với trạng thái đã đồng bộ vé.', screens: '17, 17b', priority: 'Must Have' },
    { id: 'US-16', module: 'Tư Vấn KTS & Tùy Biến', actor: 'Khách Hàng VIP (ACT-02)', action: 'Nhắn tin và gọi Live Video với đại diện KTS Tadao Ando để đề xuất tùy biến kết cấu công trình.', value: 'Tùy chỉnh không gian sống hoàn hảo theo nhu cầu trước khi ký hợp đồng chuyển nhượng.', ac: 'Kênh chat hỗ trợ gửi biểu mẫu tùy biến rõ ràng; trạng thái gửi và nhận hiển thị minh bạch.', screens: '19, 19b, 19c', priority: 'Should Have' },
    { id: 'US-17', module: 'Máy Tính Dự Toán Tài Chính', actor: 'Khách Hàng VIP (ACT-02)', action: 'Tính toán phương án vay thế chấp và xem biểu đồ dự báo tăng trưởng giá trị tài sản 10 năm.', value: 'Chủ động xây dựng kế hoạch dòng tiền và đánh giá tiềm năng tăng trưởng vốn.', ac: 'Máy tính cập nhật số tiền thanh toán hàng tháng ($18,450/tháng) ngay khi thay đổi tỷ lệ trả trước; hiển thị rõ lãi suất tham chiếu 4.3%.', screens: '20, 20b, 20c', priority: 'Should Have' },
    { id: 'US-18', module: 'Bộ Sưu Tập Kiệt Tác Đã Lưu', actor: 'Khách Hàng VIP / Nhà Sưu Tập (ACT-02 / ACT-03)', action: 'Lưu trữ các kiệt tác yêu thích vào thư mục riêng và xem tổng giá trị danh mục quan tâm.', value: 'Dễ dàng theo dõi tiến độ và mở lại ngay công trình mong muốn mà không phải tìm lại từ đầu.', ac: 'Hỗ trợ tạo thư mục riêng tư; thẻ kiệt tác đã lưu liên kết trực tiếp vào trang chi tiết dinh thự.', screens: '18, 18b', priority: 'Must Have' },
    { id: 'US-19', module: 'Hồ Sơ Hội Viên Patron', actor: 'Nhà Sưu Tập / Black Diamond Patron (ACT-03)', action: 'Quản lý thông tin hội viên, xác nhận đặc quyền Concierge và thiết lập bảo mật danh tính.', value: 'Bảo vệ quyền lợi hội viên thượng lưu và duy trì tài khoản cá nhân an toàn.', ac: 'Hiển thị đầy đủ danh vị hội viên #004; các đặc quyền concierge hiển thị trực quan; thao tác đăng xuất có bước xác nhận an toàn.', screens: '21, 21b, 21c, 24', priority: 'Should Have' },
    { id: 'US-20', module: 'Chuyển Đổi Giao Diện Theme', actor: 'Tất cả Người Dùng (ACT-01, 02, 03)', action: 'Mở Menu Drawer (☰) để đổi tức thì giữa Theme Tối (Nocturne) và Theme Sáng (Daylight).', value: 'Tối ưu hóa thị giác theo môi trường ánh sáng thực tế và sở thích thẩm mỹ cá nhân.', ac: 'Toàn bộ 54 màn hình chuyển đổi màu sắc đồng bộ, giữ nguyên vị trí dữ liệu đang xem mà không làm gián đoạn luồng công việc.', screens: '25 & Toàn bộ 54 màn hình', priority: 'Must Have' }
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
      } else if (colNum === 8 && cell.value === 'Should Have') {
        cell.fill = warningFill;
        cell.font = warningFont;
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
    { header: 'Secondary Actors / Dịch Vụ', key: 'subActors', width: 24 },
    { header: 'Tiền Điều Kiện (Pre-conditions)', key: 'preCond', width: 32 },
    { header: 'Kịch Bản Thao Tác Chi Tiết (Main Scenario Steps)', key: 'mainFlow', width: 44 },
    { header: 'Kịch Bản Ngoại Lệ & Xử Lý Lỗi (Exceptions)', key: 'exceptions', width: 34 },
    { header: 'Hậu Điều Kiện (Post-conditions - Trạng Thái Hệ Thống)', key: 'postCond', width: 30 },
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
    { id: 'UC-01', name: 'Xem Animated Loading 3 Giai Đoạn', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'Dịch vụ Client Cache', preCond: 'Người dùng khởi động ứng dụng ARKI.', mainFlow: '1. Hệ thống hiển thị Splash Screen 01.\n2. Tiến trình nạp 15% (800ms) khởi tạo cấu hình.\n3. Tiến trình tăng lên 65% (700ms) nạp dữ liệu kiến trúc.\n4. Hoàn tất 100% (600ms).\n5. Tự động điều hướng sang màn hình Onboarding 02.', exceptions: 'Mạng gián đoạn: Hệ thống nạp dữ liệu từ bộ nhớ đệm cục bộ.', postCond: 'Ứng dụng ở trạng thái sẵn sàng, hiển thị màn hình Onboarding 02.', screens: '01' },
    { id: 'UC-02', name: 'Xem Giới Thiệu Kiệt Tác Pritzker', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở màn hình Onboarding 02.', mainFlow: '1. Đọc thông điệp kiệt tác Pritzker Masters.\n2. Quan sát hình ảnh kiến trúc biệt thự biển.\n3. Bấm nút Tiếp Tục (Continue ->).\n4. Chuyển sang màn hình 03.', exceptions: 'Vuốt sang trái để lùi lại trang trước nếu cần.', postCond: 'Hệ thống chuyển sang màn hình Onboarding 03.', screens: '02' },
    { id: 'UC-03', name: 'Xem Giới Thiệu Công Nghệ 3D VR & Solar', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở màn hình Onboarding 03.', mainFlow: '1. Đọc giới thiệu công nghệ 3D VR và Solar Path Study.\n2. Quan sát ảnh minh họa không gian thông tầng.\n3. Bấm nút Tính Năng Tiếp (Next Feature ->).\n4. Chuyển sang màn hình 04.', exceptions: 'Bấm nút Back lùi về màn hình 02 an toàn.', postCond: 'Hệ thống chuyển sang màn hình Onboarding 04.', screens: '03' },
    { id: 'UC-04', name: 'Xem Giới Thiệu Cố Vấn KTS Trưởng', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở màn hình Onboarding 04.', mainFlow: '1. Đọc thông điệp dịch vụ Direct Studio Advisory.\n2. Quan sát ảnh biệt thự hoàng hôn.\n3. Bấm nút Bắt Đầu Ngay (Get Started).\n4. Chuyển sang cổng đăng nhập 05.', exceptions: 'Bấm Back quay lại màn hình 03.', postCond: 'Hệ thống mở cổng đăng nhập và xác thực 05.', screens: '04' },
    { id: 'UC-05', name: 'Đăng Nhập Khách VIP & Khách Vãng Lai', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở màn hình Cổng Đăng Nhập 05.', mainFlow: '1. Nhập thông tin đăng nhập VIP.\n2. Bấm Truy Cập Bộ Sưu Tập Kín.\n3. Hoặc bấm Đăng Nhập FaceID.\n4. Hoặc chọn Vào Xem Với Tư Cách Khách (Guest Mode) để vào thẳng Feed 06.', exceptions: 'Sai mật khẩu: Hiển thị cảnh báo viền đỏ và hướng dẫn đăng nhập sinh trắc.', postCond: 'Khởi tạo phiên làm việc VIP hoặc cấp quyền Khách Quan Sát vào Home 06.', screens: '05' },
    { id: 'UC-06', name: 'Xác Thực Sinh Trắc Học FaceID Gate', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-01 (FaceID Vault)', preCond: 'Chọn đăng nhập FaceID tại 05.', mainFlow: '1. Màn hình 05b mở giao diện quét sinh trắc học.\n2. Camera quét và đối soát dữ liệu khuôn mặt.\n3. Nhận diện thành công, sinh Session Token #ARK-SEC-992.\n4. Tự động chuyển tiếp sang bước nhập OTP 05c.', exceptions: 'Khuôn mặt không khớp: Rung phản hồi haptic, cho phép nhập mã PIN dự phòng.', postCond: 'Cấp mã phiên xác thực một phần, mở màn hình OTP 05c.', screens: '05b' },
    { id: 'UC-07', name: 'Xác Thực Mã Bảo Mật Phần Cứng OTP', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-01 (OTP Gateway)', preCond: 'Đã xác thực FaceID, đang ở màn hình 05c.', mainFlow: '1. Hệ thống gửi mã số xác thực 6 chữ số.\n2. Người dùng nhập 6 số qua bàn phím bảo vệ.\n3. Hệ thống đối soát mã trong thời hạn 30 giây.\n4. Xác nhận hợp lệ và điều hướng sang thỏa thuận NDA 05d.', exceptions: 'Nhập sai quá 3 lần: Tạm khóa đăng nhập 15 phút để bảo vệ tài khoản.', postCond: 'Xác minh danh tính VIP hoàn tất, chuyển sang thỏa thuận NDA 05d.', screens: '05c' },
    { id: 'UC-08', name: 'Ký Thỏa Thuận Bảo Mật Tài Sản Kín (NDA)', module: 'FLOW-01: Onboarding & Auth', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-05 (Concierge)', preCond: 'Xác thực OTP thành công, đang ở màn hình 05d.', mainFlow: '1. Đọc điều khoản bảo mật danh mục off-market.\n2. Kiểm tra cam kết không tiết lộ toạ độ và giá giao dịch kín.\n3. Bấm Ký Điện Tử & Tiếp Tục.\n4. Hệ thống lưu chữ ký số và điều hướng vào Home Feed 06.', exceptions: 'Từ chối ký: Quay trở lại chế độ xem công khai (Guest Mode).', postCond: 'Tài khoản được gắn cờ Đã Ký NDA, mở khóa toàn bộ quyền xem tài sản kín.', screens: '05d' },

    // Module 2: Discovery, Filtering & Map
    { id: 'UC-09', name: 'Duyệt Bảng Tin Theo Danh Mục Kiến Trúc', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở Home Feed 06.', mainFlow: '1. Quan sát thẻ Hero Villa The Glass Sanctuary ($4.25M).\n2. Chọn chip Oceanfront (chuyển sang 06b).\n3. Chọn chip Brutalist (chuyển sang 06c).\n4. Chọn chip Biophilic (chuyển sang 06d).\n5. Chọn All Works để xem toàn bộ danh mục.', exceptions: 'Bộ lọc danh mục đang tải: Hiển thị khung skeleton xám trang nhã.', postCond: 'Danh sách dinh thự được lọc chính xác theo phong cách kiến trúc.', screens: '06, 06b, 06c, 06d' },
    { id: 'UC-10', name: 'Mở & Cấu Hình Bộ Lọc Tiêu Chí Đa Tầng', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở Home Feed 06.', mainFlow: '1. Bấm nút Filter góc trên bên phải.\n2. Khay lọc 07 trượt xuống từ đỉnh màn hình.\n3. Kéo thanh trượt khoảng giá $2.5M - $12M.\n4. Chọn studio Tadao Ando Architects.\n5. Bấm nút Đóng (Close) nếu muốn hủy thao tác.', exceptions: 'Chạm ngoài vùng modal: Tự động trượt đóng khay lọc an toàn.', postCond: 'Các tham số lọc được ghi nhận vào bộ nhớ phiên làm việc.', screens: '07' },
    { id: 'UC-11', name: 'Áp Dụng Bộ Lọc & Xem Kết Quả Tìm Kiếm', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đã chọn tiêu chí lọc tại 07.', mainFlow: '1. Bấm nút Hiển Thị 14 Bất Động Sản Thỏa Mãn.\n2. Màn hình 07b cập nhật danh sách 14 kết quả trùng khớp.\n3. Quan sát các thẻ tóm tắt giá bán và diện tích.\n4. Chạm vào 1 thẻ để xem chi tiết hoặc bấm Back về 06.', exceptions: 'Không tìm thấy kết quả phù hợp: Gợi ý nới rộng khoảng giá tìm kiếm.', postCond: 'Danh sách 14 dinh thự thỏa mãn hiển thị đầy đủ trên màn hình 07b.', screens: '07, 07b' },
    { id: 'UC-12', name: 'Tra Cứu Bất Động Sản Trên Bản Đồ Vệ Tinh', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở Home Feed 06.', mainFlow: '1. Bấm nút Bản Đồ (Map) trên thanh điều hướng.\n2. Bản đồ vệ tinh bán đảo Sơn Trà 08 mở ra.\n3. Quan sát các ghim vị trí GPS định vị dọc bờ biển.\n4. Bấm nút Feed quay lại bảng tin.', exceptions: 'Không tải được ảnh vệ tinh: Chuyển sang chế độ bản đồ vector tối giản.', postCond: 'Bản đồ định vị vệ tinh hiển thị các ghim công trình kiến trúc.', screens: '08' },
    { id: 'UC-13', name: 'Xem Thẻ Tóm Tắt Ghim Vị Trí Bản Đồ', module: 'FLOW-02: Khám Phá & Lọc', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Đang ở bản đồ vệ tinh 08.', mainFlow: '1. Chạm vào ghim vị trí The Glass Sanctuary.\n2. Thẻ nổi Map Pin Card 08b xuất hiện ở cạnh đáy.\n3. Đọc thông số tóm tắt: $4.25M, 850m2, vịnh biển Sơn Trà.\n4. Bấm nút View Pin -> điều hướng thẳng vào trang chi tiết 09.', exceptions: 'Chạm ra vùng trống bản đồ: Thẻ ghim tự động thu nhỏ lại.', postCond: 'Điều hướng người dùng vào trang chi tiết dinh thự 09.', screens: '08, 08b, 09' },

    // Module 3: Details & Philosophy
    { id: 'UC-14', name: 'Xem Hồ Sơ Chi Tiết Kiệt Tác Dinh Thự', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Truy cập từ Feed hoặc Bản đồ vào màn hình 09.', mainFlow: '1. Quan sát ảnh bìa kiến trúc tỷ lệ lớn.\n2. Đọc tiêu đề The Glass Sanctuary - Tadao Ando.\n3. Đọc 6 chỉ số công thái học ($4.25M, 850m2, 5 Suites, Heli-pad, 35m Pool, Wine Cellar).\n4. Toàn bộ thông tin hiển thị hài hòa trong một khung nhìn.\n5. Bấm nút Back quay về trang trước an toàn.', exceptions: 'Ảnh đang nạp độ phân giải cao: Hiển thị mờ dần (progressive blur).', postCond: 'Người dùng nắm bắt toàn bộ thông số kỹ thuật cốt lõi của dinh thự.', screens: '09, 09b, 09c' },
    { id: 'UC-15', name: 'Đọc Bài Luận Triết Lý & Phác Thảo Tay KTS', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-03: Nhà Sưu Tập', subActors: 'ACT-04 (Lead Architect)', preCond: 'Đang ở màn hình chi tiết 09.', mainFlow: '1. Bấm Triết Lý Kiến Trúc Sư & Bản Vẽ Phác Thảo.\n2. Màn hình 10 hiển thị chân dung KTS Tadao Ando.\n3. Đọc bài luận về hình học bê tông và ánh sáng tự nhiên.\n4. Chiêm ngưỡng bản phác thảo mực tay nguyên tác.\n5. Bấm nút Back quay về trang chi tiết 09.', exceptions: 'Chạm vào ảnh phác thảo để xem ở kích thước phóng to.', postCond: 'Người dùng thấu hiểu chiều sâu nghệ thuật của công trình.', screens: '10' },
    { id: 'UC-16', name: 'Thẩm Định Bản Vẽ Kỹ Thuật CAD Mặt Bằng 1:100', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-04 (Hồ sơ KTS cung cấp)', preCond: 'Đang ở trang chi tiết công trình 09.', mainFlow: '1. Mở màn hình 10b - Blueprint Level 1 Floorplan.\n2. Quan sát hệ trục toạ độ CAD tỷ lệ 1:100.\n3. Kiểm tra diện tích sàn 850m2, phòng khách và hồ bơi 35m.\n4. Bấm nút quay lại trang chi tiết.', exceptions: 'Chế độ phóng to cho phép soi rõ các ký hiệu kích thước tường bê tông.', postCond: 'Bản vẽ mặt bằng kiến trúc được hiển thị và thẩm định.', screens: '10b' },
    { id: 'UC-17', name: 'Kiểm Tra Bản Vẽ CAD Tầng Mái & Sân Bay Trực Thăng', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-04 (Hàng Không)', preCond: 'Đang ở màn hình hồ sơ kỹ thuật.', mainFlow: '1. Chuyển sang màn hình 10c - Blueprint Penthouse & Roof.\n2. Kiểm tra thông số góc tiếp cận hạ cánh 108° ESE của sân bay trực thăng.\n3. Đánh giá khả năng chịu tải trọng tầng mái (Bell 429).\n4. Bấm nút Back quay lại.', exceptions: 'Cảnh báo an toàn hiển thị nếu phát hiện chướng ngại vật hướng gió biển.', postCond: 'Thông số kỹ thuật hạ cánh trực thăng được xác nhận.', screens: '10c' },
    { id: 'UC-18', name: 'Khám Phá Bảng Mẫu Vật Liệu Hoàn Thiện', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Đang ở chi tiết dinh thự 09.', mainFlow: '1. Mở màn hình 10d - Materials & Finishes.\n2. Quan sát bảng mẫu vật liệu hoàn thiện.\n3. Thẩm định vân đá Navona Travertine khai thác từ Ý.\n4. Xem mẫu gỗ Shou Sugi Ban xử lý carbon hóa chống hơi muối biển.\n5. Xem mẫu ốp Titanium chống ăn mòn.', exceptions: 'Chạm từng mẫu vật liệu để xem thông số kiểm định độ bền.', postCond: 'Nắm rõ xuất xứ và đặc tính kỹ thuật của các vật liệu hoàn thiện.', screens: '10d' },
    { id: 'UC-19', name: 'Mô Phỏng Quỹ Đạo Mặt Trời 24 Giờ (Solar Study)', module: 'FLOW-03: Thẩm Định Chi Tiết', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Đang ở chi tiết dinh thự 09.', mainFlow: '1. Mở màn hình 10e - Solar Path 24h Study.\n2. Quan sát vòng tròn quỹ đạo mặt trời 24 giờ.\n3. Xem góc chiếu nắng bình minh lúc 06:00.\n4. Xem hướng nắng đỉnh trưa 12:00 và bóng râm mái vươn.\n5. Xem hướng hoàng hôn biển 18:00.\n6. Bấm quay lại.', exceptions: 'Kéo thanh trượt để quan sát mô phỏng đổ bóng thay đổi liên tục.', postCond: 'Khách hàng thẩm định được vi khí hậu và hướng gió tự nhiên.', screens: '10e' },

    // Module 4: 3D VR & Media
    { id: 'UC-20', name: 'Khám Phá 360° Street View Cuộn Tự Do 2D Pan', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Bấm nút Không Gian 3D trên màn hình 09.', mainFlow: '1. Màn hình 11 mở dải ảnh panorama 360 độ.\n2. Kéo rê chuột hoặc ngón tay tự do theo 2 chiều (ngang, dọc, chéo):\n   - Kéo ngang xoay 360 độ quanh đại sảnh thông tầng 7.2m.\n   - Kéo dọc ngước nhìn giếng trời đón nắng.\n   - Kéo xuống nhìn mặt hồ bơi nước mặn.\n3. Thanh điều hướng cố định trên màn hình.', exceptions: 'Xoay liên tục qua mép ảnh không bị gián đoạn nhờ cơ chế lặp ảnh vô tận.', postCond: 'Không gian 360 độ được kết xuất mượt mà theo cử chỉ người dùng.', screens: '11' },
    { id: 'UC-21', name: 'Tương Tác Điểm Hotspot Trong Không Gian Ảo', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Đang ở không gian 360° Street View 11.', mainFlow: '1. Quan sát 4 điểm Hotspot không gian tương tác.\n2. Chạm Hotspot "Đại Sảnh Thông Tầng".\n3. Chạm Hotspot "Bếp Đảo Boffi".\n4. Chạm Hotspot "Hồ Bơi Nước Mặn 35m".\n5. Chạm Hotspot "Bãi Đáp Trực Thăng Tầng Mái".\n6. Khung nhìn camera tự động chuyển đổi góc quan sát.', exceptions: 'Hotspot đang nạp: Hiển thị vòng tròn chỉ báo tải nhẹ.', postCond: 'Khung nhìn dịch chuyển đến góc phòng tương ứng.', screens: '11' },
    { id: 'UC-22', name: 'Xoay Mô Hình 3D Bóc Mái Bằng Cử Chỉ Drag', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Mở màn hình 3D Dollhouse 11b.', mainFlow: '1. Màn hình hiển thị mô hình bóc mái góc 000 độ.\n2. Nhấn giữ và vuốt ngang màn hình.\n3. Mô hình xoay sang góc 090 độ mượt mà.\n4. Tiếp tục vuốt xoay qua các góc 180 độ và 270 độ.\n5. Vuốt tiếp để quay tròn về góc 000 độ ban đầu.\n6. Bấm nút Back quay về trang chi tiết.', exceptions: 'Thả tay khi xoay dang dở: Mô hình tự động hút về góc vuông gần nhất.', postCond: 'Toàn cảnh hình khối kiến trúc 4 hướng được hiển thị trực quan.', screens: '11b' },
    { id: 'UC-23', name: 'Xem Phim Flycam Drone 4K & Điều Khiển Phát', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Bấm nút Video Tour 4K trên màn hình 09.', mainFlow: '1. Mở màn hình video player 12a ở trạng thái tạm dừng.\n2. Bấm nút Play giữa màn hình.\n3. Giao diện chuyển sang trạng thái đang phát 12b.\n4. Nút đổi thành biểu tượng Pause.\n5. Thanh tiến trình hiển thị thời gian 02:45 / 04:10.\n6. Bấm Pause để dừng video.', exceptions: 'Băng thông mạng yếu: Tự động điều chỉnh độ phân giải phù hợp.', postCond: 'Video flycam 4K được phát và điều khiển mượt mà.', screens: '12, 12a, 12b' },
    { id: 'UC-24', name: 'Duyệt Chuỗi 5 Slider Ảnh Toàn Cảnh Vô Tận', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-01 (Guest)', preCond: 'Chạm vào ảnh thu nhỏ tại màn hình 09.', mainFlow: '1. Mở Slider 1 (13) - Phòng khách thông tầng 7.2m.\n2. Bấm Next Photo -> sang Slider 2 (14) - Bếp đảo Boffi.\n3. Bấm Next Photo -> sang Slider 3 (15) - Hồ bơi hoàng hôn.\n4. Bấm Next Photo -> sang Slider 4 (15b) - Phòng ngủ hướng biển.\n5. Bấm Next Photo -> sang Slider 5 (15c) - Hầm rượu Sommelier.\n6. Bấm Tiếp Tục -> ảnh tự quay tròn về Slider 1 vòng lặp kín.\n7. Bấm nút Close để quay về chi tiết 09.', exceptions: 'Bấm nút Prev Photo ở bất kỳ slider nào để lùi lại ảnh trước.', postCond: 'Người dùng duyệt toàn bộ thư viện ảnh mà không gặp điểm nghẽn ngõ cụt.', screens: '13, 14, 15, 15b, 15c' },
    { id: 'UC-25', name: 'Xem Thư Viện Ảnh Lưới Toàn Màn Hình (Grid)', module: 'FLOW-04: Media & VR 3D', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-03 (Patron)', preCond: 'Bấm xem dạng lưới tại trang chi tiết.', mainFlow: '1. Màn hình 23 hiển thị lưới 9 ô ảnh kiến trúc độ phân giải cao.\n2. Phân loại ảnh theo các nhóm: Ngoại Thất, Nội Thất, Chi Tiết.\n3. Chạm vào 1 ô ảnh để phóng to toàn màn hình.\n4. Bấm nút Back quay về chi tiết dinh thự.', exceptions: 'Ảnh chưa nạp xong hiển thị hiệu ứng skeleton mờ.', postCond: 'Toàn bộ danh mục ảnh công trình được hiển thị tổng quan dạng lưới.', screens: '23' },

    // Module 5: VIP Booking & Logistics
    { id: 'UC-26', name: 'Đặt Lịch Hẹn Khảo Sát Dinh Thự VIP', module: 'FLOW-05: Đặt Lịch & Pass', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-05 (Concierge)', preCond: 'Bấm nút Đặt Lịch Tham Quan trên màn hình 09.', mainFlow: '1. Mở màn hình chọn lịch hẹn 16.\n2. Chọn ngày mong muốn trong tháng 10/2026 (Thứ Sáu, ngày 16/10/2026).\n3. Chọn khung giờ vàng 14:30 đón tiếp.\n4. Bấm Tiếp Tục Chọn Phương Tiện Đón -> chuyển sang 16b.', exceptions: 'Khung giờ đã có khách hẹn: Hiển thị trạng thái xám và gợi ý khung giờ kế tiếp.', postCond: 'Yêu cầu thời gian hẹn được lưu tạm thời, chuyển sang bước chọn phương tiện.', screens: '16' },
    { id: 'UC-27', name: 'Lựa Chọn Phương Tiện Hậu Cần Đón Tiếp', module: 'FLOW-05: Đặt Lịch & Pass', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-05, SYS-04 (Hàng Không)', preCond: 'Đã chọn ngày giờ, đang ở màn hình 16b.', mainFlow: '1. Xem 3 phương án đón tiếp chuyên biệt:\n   - Trực thăng Bell 429 (hạ cánh sân thượng tầng mái).\n   - Du thuyền Sunseeker (cập cầu cảng riêng).\n   - Siêu xe đưa đón tại sân bay.\n2. Chọn phương án Trực thăng Bell 429.\n3. Bấm Xác Nhận Yêu Cầu Tham Quan.\n4. Chuyển sang màn hình xác nhận thẻ vé 17.', exceptions: 'Thời tiết xấu cấm bay: Bộ phận Concierge tự động đề xuất phương án xe đưa đón.', postCond: 'Phương tiện di chuyển được ghi nhận vào hồ sơ đặt lịch.', screens: '16b' },
    { id: 'UC-28', name: 'Tiếp Nhận Thẻ Thông Hành VIP PASS Có Mã QR', module: 'FLOW-05: Đặt Lịch & Pass', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-05 (Concierge)', preCond: 'Xác nhận đặt lịch thành công.', mainFlow: '1. Màn hình 17 hiển thị thông báo Viewing Confirmed.\n2. Hiển thị thẻ VIP BOARDING PASS #ARK-8821.\n3. Kiểm tra thông tin: The Glass Sanctuary, Thứ Sáu 16/10/2026 lúc 14:30, trực thăng Bell 429.\n4. Mã QR bảo mật xuất hiện trên thẻ.\n5. Bấm Quay Về Trang Chủ để trở lại Home Feed 06.', exceptions: 'Chụp ảnh màn hình: Hệ thống tự động đóng dấu chìm watermark mã khách hàng bảo mật.', postCond: 'Thẻ thông hành điện tử được kích hoạt chính thức trong hệ thống.', screens: '17' },
    { id: 'UC-29', name: 'Đồng Bộ Thẻ VIP Passbook Vào Apple Wallet', module: 'FLOW-05: Đặt Lịch & Pass', primaryActor: 'ACT-02: Khách VIP', subActors: 'SYS-02 (PassKit)', preCond: 'Đang ở màn hình thẻ VIP Pass 17.', mainFlow: '1. Bấm nút Thêm Vào Apple Wallet.\n2. Màn hình 17b hiển thị giao diện Passbook chuẩn iOS.\n3. Ký số chứng chỉ bảo mật và lưu thẻ vào ứng dụng Apple Wallet.\n4. Kích hoạt tính năng chạm NFC không tiếp xúc khi đến biệt thự.\n5. Thông báo nhắc giờ hiển thị trên Dynamic Island.', exceptions: 'Thiết bị không hỗ trợ Apple Wallet: Cung cấp tùy chọn lưu mã QR vào thư viện ảnh.', postCond: 'Thẻ vé được đồng bộ vào ví điện tử cá nhân của người dùng.', screens: '17, 17b' },

    // Module 6: Studio Advisory & Customization
    { id: 'UC-30', name: 'Nhắn Tin Mã Hóa 1-1 Với Văn Phòng KTS', module: 'FLOW-06: Tư Vấn KTS', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-04 (Lead Architect)', preCond: 'Bấm nút Chat KTS trên màn hình 09.', mainFlow: '1. Mở màn hình chat 19 với Studio Tadao Ando Partners.\n2. Đọc tin nhắn chào mừng từ đại diện KTS trưởng.\n3. Đọc trao đổi về khả năng kéo dài hồ bơi thêm +4m.\n4. Soạn tin nhắn hỏi về kính cản nhiệt Low-E chống tia cực tím.\n5. Bấm nút gửi tin nhắn.\n6. Bấm nút Back quay về trang chi tiết 09.', exceptions: 'Văn phòng KTS ngoài giờ làm việc: Tin nhắn được đưa vào hàng đợi ưu tiên bảo mật.', postCond: 'Phiên hội thoại bảo mật được thiết lập và lưu trữ trong hồ sơ khách hàng.', screens: '19' },
    { id: 'UC-31', name: 'Tham Gia Họp Truyền Hình Live Video Tư Vấn', module: 'FLOW-06: Tư Vấn KTS', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-04 (Lead Architect)', preCond: 'Nhận được liên kết mời họp trong kênh chat 19.', mainFlow: '1. Bấm vào liên kết mời họp video trực tuyến.\n2. Màn hình 19b mở camera và micro bảo mật.\n3. Kết nối cuộc gọi truyền hình chất lượng cao với KTS chủ trì.\n4. KTS chia sẻ màn hình bản vẽ CAD và mô hình 3D thực tế.\n5. Trao đổi giải pháp gia cố dầm chịu lực cho hồ bơi.\n6. Bấm nút kết thúc cuộc gọi an toàn.', exceptions: 'Mạng yếu: Tự động chuyển sang chế độ âm thanh thoại và chia sẻ tài liệu tĩnh.', postCond: 'Biên bản trao đổi tư vấn được lưu nháp vào hồ sơ dự án.', screens: '19b' },
    { id: 'UC-32', name: 'Lập & Nộp Phiếu Đề Xuất Tùy Biến Thiết Kế', module: 'FLOW-06: Tư Vấn KTS', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-04, ACT-06 (Finance)', preCond: 'Sau khi thống nhất ý tưởng tư vấn.', mainFlow: '1. Mở biểu mẫu 19c - Custom Modification Request.\n2. Điền hạng mục tùy chỉnh 1: Kéo dài hồ bơi công xôn +4m.\n3. Điền hạng mục tùy chỉnh 2: Lắp đặt kính Low-E Solar chống UV.\n4. Ký xác nhận nộp yêu cầu.\n5. Hệ thống gửi hồ sơ sang bộ phận kỹ thuật để lập dự toán phụ lục.', exceptions: 'Yêu cầu vượt quá giới hạn an toàn kết cấu: KTS gửi văn bản phản hồi kỹ thuật giải thích.', postCond: 'Phiếu yêu cầu điều chỉnh chính thức được lưu trữ trong hồ sơ dự án.', screens: '19c' },

    // Module 7: Financials & Escrow
    { id: 'UC-33', name: 'Tính Toán Phương Án Đòn Bẩy Tài Chính', module: 'FLOW-07: Tài Chính & Ký Quỹ', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-06 (Finance)', preCond: 'Bấm nút Bảng Tính Đầu Tư trên màn hình 09.', mainFlow: '1. Mở màn hình tính toán tài chính 20.\n2. Nhập giá mua dinh thự: $4,250,000.\n3. Chọn tỷ lệ trả trước 30% ($1,275,000), số tiền vay thế chấp $2,975,000.\n4. Áp dụng tham số lãi suất cố định 4.3%/năm kỳ hạn 20 năm.\n5. Hệ thống tự động tính chi phí trả góp hàng tháng: ~$18,450 / tháng.\n6. Bấm nút Back quay lại trang chi tiết.', exceptions: 'Nhập số tiền trả trước < 20%: Hệ thống cảnh báo hạn mức trả trước tối thiểu.', postCond: 'Phương án tài chính cá nhân được tính toán và lưu trong phiên làm việc.', screens: '20' },
    { id: 'UC-34', name: 'Thiết Lập Tài Khoản Ký Quỹ Crypto Escrow', module: 'FLOW-07: Tài Chính & Ký Quỹ', primaryActor: 'ACT-03: Nhà Sưu Tập', subActors: 'ACT-06, SYS-03 (Escrow)', preCond: 'Đang ở màn hình tài chính.', mainFlow: '1. Mở màn hình 20b - Multi-Currency & Crypto Escrow.\n2. Xem tỷ giá quy đổi sang các loại tiền tệ: USD, EUR, Bitcoin, Ethereum.\n3. Hệ thống hiển thị giá trị quy đổi tương đương 68.2 BTC.\n4. Thiết lập hợp đồng thông minh Smart Contract khóa quỹ ký quỹ (Escrow Lock).\n5. Ủy quyền đa chữ ký (Multi-Sig) bảo chứng giao dịch.\n6. Bấm hoàn tất.', exceptions: 'Biến động tỷ giá vượt biên độ: Kích hoạt cơ chế khóa tỷ giá bảo chứng 15 phút.', postCond: 'Tài khoản ký quỹ trung gian được thiết lập an toàn.', screens: '20b' },
    { id: 'UC-35', name: 'Phân Tích Biểu Đồ Tăng Trưởng Giá Trị 10 Năm', module: 'FLOW-07: Tài Chính & Ký Quỹ', primaryActor: 'ACT-02: Khách VIP', subActors: 'ACT-06 (Finance)', preCond: 'Đang ở mục tài chính.', mainFlow: '1. Mở màn hình 20c - 10-Year Capital Appreciation.\n2. Quan sát đường biểu đồ tăng trưởng vốn bình quân ~12.9%/năm.\n3. Xem giá trị dự phóng sau 5 năm ($7.8M) và sau 10 năm ($11.8M) từ mức gốc ban đầu $4.25M.\n4. Đọc các chỉ số phân tích biên độ tăng giá do quỹ đất bán đảo Sơn Trà bảo tồn khan hiếm.\n5. Bấm quay lại.', exceptions: 'Lỗi tải biểu đồ: Hiển thị bảng số liệu thống kê thay thế.', postCond: 'Khách hàng thẩm định được hiệu suất đầu tư dài hạn.', screens: '20c' },

    // Module 8: Collections, Profile & Offline
    { id: 'UC-36', name: 'Quản Lý Bộ Sưu Tập Kiệt Tác Đã Lưu', module: 'FLOW-08: Bộ Sưu Tập & Profile', primaryActor: 'ACT-03: Nhà Sưu Tập', subActors: 'ACT-02 (Khách VIP)', preCond: 'Bấm tab Đã Lưu trên thanh Bottom Nav.', mainFlow: '1. Màn hình 18 hiển thị danh mục 3 kiệt tác kiến trúc đã lưu.\n2. Xem tổng giá trị danh mục: $17,050,000.\n3. Xem thẻ dinh thự The Glass Sanctuary ($4.25M).\n4. Bấm nút Xem -> điều hướng thẳng vào trang chi tiết 09.\n5. Bấm nút Back quay về Home Feed.', exceptions: 'Danh sách rỗng: Hiển thị gợi ý các kiệt tác tiêu biểu trên Feed.', postCond: 'Người dùng theo dõi tập trung các công trình yêu thích.', screens: '18' },
    { id: 'UC-37', name: 'Tạo Thư Mục Bộ Sưu Tập Riêng Tư Mới', module: 'FLOW-08: Bộ Sưu Tập & Profile', primaryActor: 'ACT-03: Nhà Sưu Tập', subActors: 'ACT-02 (Khách VIP)', preCond: 'Đang ở màn hình danh mục đã lưu 18.', mainFlow: '1. Bấm nút Tạo Bộ Sưu Tập Mới (+ Create Curated Collection).\n2. Màn hình 18b mở biểu mẫu nhập tên bộ sưu tập.\n3. Đặt tên "Dinh Thự Vách Biển 2026".\n4. Chọn chế độ bảo mật riêng tư VIP (Private Encrypted Folder).\n5. Bấm Xác Nhận Tạo.\n6. Thư mục mới xuất hiện trong danh mục quản lý.', exceptions: 'Trùng tên thư mục: Nhắc người dùng đổi tên phân biệt.', postCond: 'Thư mục bộ sưu tập mới được khởi tạo thành công.', screens: '18b' },
    { id: 'UC-38', name: 'Xem Hồ Sơ VIP & Kích Hoạt Đặc Quyền Hội Viên', module: 'FLOW-08: Bộ Sưu Tập & Profile', primaryActor: 'ACT-03: Black Diamond Patron', subActors: 'ACT-05 (Concierge)', preCond: 'Bấm tab Profile trên thanh Bottom Nav.', mainFlow: '1. Màn hình 21 hiển thị hồ sơ hội viên Black Diamond Patron #004 (Alexander Vance).\n2. Mở danh mục 21b - Concierge Privileges.\n3. Kích hoạt quyền cố vấn KTS 24/7 và quyền xem trước đấu giá Sotheby\'s.\n4. Bấm Đăng Xuất Tài Khoản (Sign Out) nếu muốn thoát ra màn hình 05.', exceptions: 'Hết hạn thẻ hội viên: Hiển thị hướng dẫn liên hệ Concierge gia hạn.', postCond: 'Quản trị hồ sơ và kích hoạt đầy đủ quyền lợi thượng lưu.', screens: '21, 21b, 21c' },
    { id: 'UC-39', name: 'Tải & Quản Lý Dữ Liệu VR Không Gian Offline', module: 'FLOW-08: Bộ Sưu Tập & Profile', primaryActor: 'ACT-03: Black Diamond Patron', subActors: 'Bộ nhớ thiết bị cục bộ', preCond: 'Đang ở cài đặt ứng dụng.', mainFlow: '1. Mở màn hình 24 - Offline VR Spatial Cache.\n2. Kiểm tra dung lượng đệm không gian 3D (1.2 GB).\n3. Bấm Tải Về Toàn Bộ Mô Hình 3D Dinh Thự Sơn Trà.\n4. Tiến trình tải hoàn tất 100% vào bộ nhớ trong máy.\n5. Bật chế độ máy bay kiểm tra: Không gian 360 độ vẫn hoạt động mượt mà không cần mạng.\n6. Bấm xóa đệm để giải phóng bộ nhớ khi cần.', exceptions: 'Thiết bị không đủ dung lượng: Hiển thị cảnh báo và gợi ý gói tải nén 400MB.', postCond: 'Dữ liệu VR sẵn sàng trải nghiệm khi bay trên chuyên cơ không có Internet.', screens: '24' },

    // Module 9: System Drawer & Instant Theme
    { id: 'UC-40', name: 'Mở Menu Drawer, Đổi Ngôn Ngữ & Đổi Theme 2 Chiều', module: 'FLOW-09: Menu Drawer & Theme', primaryActor: 'Tất cả Actors (ACT-01, 02, 03)', subActors: 'Theme Engine', preCond: 'Ứng dụng đang mở ở bất kỳ màn hình nào.', mainFlow: '1. Bấm Menu 3 gạch ☰ trên thanh Header.\n2. Menu Drawer 25 trượt từ cạnh phải ra (SLIDE_IN).\n3. Xem thẻ định danh VIP và các lối tắt điều hướng.\n4. Bấm nút song ngữ VI <-> EN để đổi văn bản hiển thị.\n5. Bấm nút Mặt Trời / Mặt Trăng:\n   - Kích hoạt chuyển đổi 2 chiều giữa Daylight Porcelain và Nocturne Slate.\n   - Giữ nguyên vị trí cuộn và dữ liệu đang thao tác.\n6. Bấm nút đóng hoặc chạm nền tối để trượt đóng menu.', exceptions: 'Chuyển theme không bao giờ làm mất dữ liệu nhập dở của người dùng.', postCond: 'Giao diện toàn bộ 54 màn hình được cập nhật đồng bộ.', screens: '25 & Toàn bộ 54 màn hình' }
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
    { header: 'Tên Nghiệp Vụ Cốt Lõi', key: 'name', width: 32 },
    { header: 'Actor Thực Thi', key: 'actor', width: 22 },
    { header: 'Màn Hình Dark Theme', key: 'dark', width: 28 },
    { header: 'Màn Hình Light Theme', key: 'light', width: 28 },
    { header: 'Master Components Sử Dụng', key: 'components', width: 26 },
    { header: 'Prototype Trigger & Animation', key: 'proto', width: 30 },
    { header: 'Đánh Giá Usability / Heuristic', key: 'heuristic', width: 32 }
  ];

  wsTrace.spliceRows(1, 0, [['🔗 MA TRẬN TRUY VẾT YÊU CẦU — THIẾT KẾ — PROTOTYPE — ĐÁNH GIÁ HEURISTIC (40 USE CASES)']]);
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
    { uc: 'UC-01', us: 'US-01', name: 'Animated Loading 3 Giai Đoạn', actor: 'ACT-02', dark: 'ARKI / 01 - Splash', light: 'ARKI / 01 - Splash [Light]', components: 'Progress Tracker Frame', proto: 'AFTER_TIMEOUT (800ms -> 700ms -> 600ms)', heuristic: 'Nielsen #1 (Visibility): Phản hồi tiến trình tải rõ ràng' },
    { uc: 'UC-02', us: 'US-01', name: 'Onboarding 1 - Pritzker Masters', actor: 'ACT-02, ACT-01', dark: 'ARKI / 02 - Onboarding', light: 'ARKI / 02 - Onboarding [Light]', components: 'Primary Action Button', proto: 'ON_CLICK -> SLIDE_IN (Left, 0.35s)', heuristic: 'Nielsen #8 (Minimalist): Ảnh tỷ lệ vàng, không icon thừa' },
    { uc: 'UC-03', us: 'US-01', name: 'Onboarding 2 - 3D VR & Solar', actor: 'ACT-02, ACT-01', dark: 'ARKI / 03 - Onboarding VR', light: 'ARKI / 03 - Onboarding VR [Light]', components: 'Primary Action Button', proto: 'ON_CLICK -> SLIDE_IN (Left, 0.35s)', heuristic: 'Nielsen #4 (Consistency): Nhịp điệu padding đồng bộ' },
    { uc: 'UC-04', us: 'US-01', name: 'Onboarding 3 - Direct Advisory', actor: 'ACT-02, ACT-01', dark: 'ARKI / 04 - Onboarding Adv', light: 'ARKI / 04 - Onboarding Adv [Light]', components: 'Primary Action Button', proto: 'ON_CLICK -> SLIDE_IN (Left, 0.35s)', heuristic: 'Nielsen #3 (User Control): Cho phép chuyển tiếp nhanh' },
    { uc: 'UC-05', us: 'US-02', name: 'Cổng Đăng Nhập VIP & Guest Mode', actor: 'ACT-02, ACT-01', dark: 'ARKI / 05 - Authentication', light: 'ARKI / 05 - Authentication [Light]', components: 'Input Field, Guest Button', proto: 'ON_CLICK -> Login / FaceID Gate', heuristic: 'Nielsen #7 (Flexibility): Có Guest Mode cho khách vãng lai' },
    { uc: 'UC-06', us: 'US-02', name: 'Xác Thực FaceID Biometric Gate', actor: 'ACT-02', dark: 'ARKI / 05b - FaceID Gate', light: 'ARKI / 05b - FaceID Gate [Light]', components: 'Biometric Scanner Card', proto: 'AFTER_TIMEOUT -> Scan Complete', heuristic: 'Nielsen #2 (Real World): Mô phỏng cảm biến FaceID chuẩn iOS' },
    { uc: 'UC-07', us: 'US-02', name: 'Nhập Mã OTP 6 Số Phần Cứng', actor: 'ACT-02', dark: 'ARKI / 05c - Hardware OTP', light: 'ARKI / 05c - Hardware OTP [Light]', components: 'OTP 6-Box Pin Frame', proto: 'ON_CLICK Digit -> Form Submit', heuristic: 'Nielsen #5 (Error Prevention): Ô nhập 6 số chống gõ nhầm' },
    { uc: 'UC-08', us: 'US-02', name: 'Ký Thỏa Thuận Bảo Mật Điện Tử (NDA)', actor: 'ACT-02', dark: 'ARKI / 05d - Electronic NDA', light: 'ARKI / 05d - Electronic NDA [Light]', components: 'Legal Document Card, Primary Btn', proto: 'ON_CLICK -> Sign & Enter Feed', heuristic: 'Nielsen #9 (Clear Recovery): Tùy chọn Hủy đưa về an toàn' },
    { uc: 'UC-09', us: 'US-03', name: 'Duyệt Bảng Tin Phong Cách Kiến Trúc', actor: 'ACT-02, ACT-01', dark: 'ARKI / 06 - Home Feed (All)', light: 'ARKI / 06 - Home Feed [Light]', components: 'Pill Tabs, Bento Hero Card', proto: 'ON_CLICK -> Filter Category', heuristic: 'Nielsen #8 (Artisan UI): Bố cục Bento Grid bất đối xứng' },
    { uc: 'UC-10', us: 'US-04', name: 'Mở Khay Lọc Đa Tiêu Chí $2.5M-$12M', actor: 'ACT-02, ACT-01', dark: 'ARKI / 07 - Filters Modal', light: 'ARKI / 07 - Filters Modal [Light]', components: 'Filter Bar, Slider Bar', proto: 'MOVE_IN (Top) <-> SLIDE_OUT', heuristic: 'Nielsen #7 (Flexibility): Lọc kết hợp Giá + KTS' },
    { uc: 'UC-11', us: 'US-04', name: 'Áp Dụng Lọc Trả Về 14 Kiệt Tác', actor: 'ACT-02, ACT-01', dark: 'ARKI / 07b - Filter Results', light: 'ARKI / 07b - Filter Results [Light]', components: 'Compact Estate Cards', proto: 'ON_CLICK Apply -> Render 14 Items', heuristic: 'Nielsen #1 (Visibility): Báo rõ 14 kết quả thỏa mãn' },
    { uc: 'UC-12', us: 'US-05', name: 'Bản Đồ Định Vị Vệ Tinh Bán Đảo', actor: 'ACT-02, ACT-01', dark: 'ARKI / 08 - Satellite Map', light: 'ARKI / 08 - Satellite Map [Light]', components: 'Satellite Container, GPS Pins', proto: 'ON_CLICK Map Tab -> DISSOLVE', heuristic: 'Nielsen #6 (Recognition): Ghim GPS trực quan trên địa hình' },
    { uc: 'UC-13', us: 'US-05', name: 'Xem Thẻ Nổi Chi Tiết Ghim GPS', actor: 'ACT-02, ACT-01', dark: 'ARKI / 08b - Pin Preview Card', light: 'ARKI / 08b - Pin Preview [Light]', components: 'Map Floating Card', proto: 'ON_CLICK Pin -> View Details 09', heuristic: 'Nielsen #3 (Freedom): Bấm ngoài vùng thẻ tự thu gọn' },
    { uc: 'UC-14', us: 'US-06', name: 'Xem Hồ Sơ Chi Tiết 6 Thông Số', actor: 'ACT-02, ACT-03', dark: 'ARKI / 09 - Estate Details', light: 'ARKI / 09 - Estate Details [Light]', components: '6 Specs Badges, CTA Button', proto: 'ON_CLICK -> SMART_ANIMATE', heuristic: 'Nielsen #6 (Recognition): 6 thông số gói gọn 1 tầm nhìn' },
    { uc: 'UC-15', us: 'US-07', name: 'Đọc Bài Luận Triết Lý & Phác Thảo KTS', actor: 'ACT-03, ACT-02', dark: 'ARKI / 10 - Architect Essay', light: 'ARKI / 10 - Architect Essay [Light]', components: 'Sketch Container, Essay Typography', proto: 'ON_CLICK -> SMART_ANIMATE (0.35s)', heuristic: 'Nielsen #8 (Aesthetic): Phân cấp typographic tỉ mỉ' },
    { uc: 'UC-16', us: 'US-08', name: 'Soi Bản Vẽ CAD Mặt Bằng Tầng 1:100', actor: 'ACT-02, ACT-04', dark: 'ARKI / 10b - Blueprint CAD L1', light: 'ARKI / 10b - Blueprint L1 [Light]', components: 'CAD Blueprint Grid', proto: 'SMART_ANIMATE (0.35s)', heuristic: 'Nielsen #2 (Real World): Quy chuẩn bản vẽ kiến trúc 1:100' },
    { uc: 'UC-17', us: 'US-08', name: 'Kiểm Tra Bản Vẽ Tầng Mái & Sân Bay', actor: 'ACT-02, ACT-04', dark: 'ARKI / 10c - Roof & Heli-pad', light: 'ARKI / 10c - Roof CAD [Light]', components: 'Aviation Compass Ring', proto: 'SMART_ANIMATE (0.35s)', heuristic: 'Nielsen #5 (Error Prevention): Góc đỗ 108° ESE an toàn' },
    { uc: 'UC-18', us: 'US-09', name: 'Khám Phá Bảng Mẫu Đá, Gỗ & Kim Loại', actor: 'ACT-02, ACT-03', dark: 'ARKI / 10d - Materials Swatch', light: 'ARKI / 10d - Materials [Light]', components: 'Material Swatch Frames', proto: 'SMART_ANIMATE (0.35s)', heuristic: 'Nielsen #8 (Minimalist): Mẫu vật liệu phân ô gọn gàng' },
    { uc: 'UC-19', us: 'US-09', name: 'Mô Phỏng Quỹ Đạo Mặt Trời 24 Giờ', actor: 'ACT-02, ACT-03', dark: 'ARKI / 10e - Solar Path Dial', light: 'ARKI / 10e - Solar Dial [Light]', components: 'Solar Dial Component', proto: 'SMART_ANIMATE (0.35s)', heuristic: 'Nielsen #1 (Visibility): Minh họa bóng đổ 06:00-18:00' },
    { uc: 'UC-20', us: 'US-10', name: '360° Street View 2D Pan Tự Do', actor: 'ACT-02', dark: 'ARKI / 11 - 360 Panorama', light: 'ARKI / 11 - 360 Panorama [Light]', components: 'Floating Glass Compass HUD', proto: 'BOTH (2D Pan Cuộn Tự Do)', heuristic: 'Nielsen #3 (User Control): Kéo vuốt 360 độ tự nhiên' },
    { uc: 'UC-21', us: 'US-10', name: 'Chạm Hotspot Chuyển Phân Khu Không Gian', actor: 'ACT-02', dark: 'ARKI / 11 - 360 Hotspots', light: 'ARKI / 11 - 360 Hotspots [Light]', components: 'Hotspot Pill Markers', proto: 'ON_CLICK -> Camera Teleport', heuristic: 'Nielsen #6 (Recognition): Điểm Hotspot dán nhãn cụ thể' },
    { uc: 'UC-22', us: 'US-11', name: 'Xoay Mô Hình 3D Bóc Mái Bằng Drag', actor: 'ACT-02', dark: 'ARKI / 11b - 3D Dollhouse', light: 'ARKI / 11b - 3D Dollhouse [Light]', components: '3D Turntable Frame', proto: 'ON_DRAG -> SMART_ANIMATE (300ms)', heuristic: 'Nielsen #7 (Efficiency): Vuốt kéo xoay mô hình 4 hướng' },
    { uc: 'UC-23', us: 'US-12', name: 'Xem Phim Flycam 4K & Trình Phát', actor: 'ACT-02, ACT-01', dark: 'ARKI / 12 - Video Player', light: 'ARKI / 12 - Video Player [Light]', components: 'Play/Pause Circle, Scrubber Bar', proto: 'ON_CLICK Play <-> Pause 02:45', heuristic: 'Nielsen #1 (Visibility): Thanh scrubber hiển thị mốc giờ' },
    { uc: 'UC-24', us: 'US-13', name: 'Duyệt Chuỗi 5 Slider Ảnh Vòng Lặp Kín', actor: 'ACT-02, ACT-01', dark: 'ARKI / 13 - 15c (5 Sliders)', light: 'ARKI / 13 - 15c [Light]', components: 'Carousel Slider Containers', proto: 'SLIDE_IN (Left) <-> DISSOLVE Loop', heuristic: 'Nielsen #3 (User Freedom): Vòng lặp kín không cụt lối' },
    { uc: 'UC-25', us: 'US-13', name: 'Xem Thư Viện Ảnh Lưới 9 Khung Toàn Màn', actor: 'ACT-02, ACT-03', dark: 'ARKI / 23 - Fullscreen Grid', light: 'ARKI / 23 - Fullscreen Grid [Light]', components: '9-Grid Mosaic Frame', proto: 'ON_CLICK -> Zoom Fullscreen', heuristic: 'Nielsen #8 (Aesthetic): Lưới ảnh kiến trúc tỷ lệ chặt chẽ' },
    { uc: 'UC-26', us: 'US-14', name: 'Đặt Lịch Hẹn Khảo Sát Tháng 10/2026', actor: 'ACT-02, ACT-05', dark: 'ARKI / 16 - Schedule Viewing', light: 'ARKI / 16 - Schedule [Light]', components: 'Calendar Matrix Component', proto: 'ON_CLICK -> Date Selected', heuristic: 'Nielsen #2 (Real World): Lịch tháng 10/2026 chuẩn xác' },
    { uc: 'UC-27', us: 'US-14', name: 'Chọn Phương Tiện Đón Trực Thăng Bell 429', actor: 'ACT-02, SYS-04', dark: 'ARKI / 16b - Logistics Choice', light: 'ARKI / 16b - Logistics [Light]', components: 'Transport Option Pills', proto: 'ON_CLICK -> Confirm Logistics', heuristic: 'Nielsen #4 (Consistency): Lựa chọn dạng thẻ đồng nhất' },
    { uc: 'UC-28', us: 'US-15', name: 'Cấp Thẻ VIP BOARDING PASS #ARK-8821', actor: 'ACT-02, ACT-05', dark: 'ARKI / 17 - VIP Pass Confirm', light: 'ARKI / 17 - VIP Pass [Light]', components: 'Pass Boarding Card, Dynamic QR', proto: 'SMART_ANIMATE -> Ticket Generated', heuristic: 'Nielsen #6 (Recognition): Mã QR hiển thị cùng lộ trình' },
    { uc: 'UC-29', us: 'US-15', name: 'Đồng Bộ Thẻ Passbook Vào Apple Wallet', actor: 'ACT-02, SYS-02', dark: 'ARKI / 17b - Apple Wallet Pass', light: 'ARKI / 17b - Apple Wallet [Light]', components: 'Apple Wallet Sync Button', proto: 'PassKit API Sync + NFC Tap', heuristic: 'Nielsen #7 (Flexibility): Đồng bộ một chạm vào ví Apple' },
    { uc: 'UC-30', us: 'US-16', name: 'Nhắn Tin Mã Hóa Với KTS Tadao Ando', actor: 'ACT-02, ACT-04', dark: 'ARKI / 19 - Architect Chat', light: 'ARKI / 19 - Architect Chat [Light]', components: 'Chat Bubble Containers', proto: 'MOVE_IN (Right) <-> SLIDE_OUT', heuristic: 'Nielsen #1 (Visibility): Trạng thái gửi tin nhắn rõ ràng' },
    { uc: 'UC-31', us: 'US-16', name: 'Họp Truyền Hình Live Video Tư Vấn', actor: 'ACT-02, ACT-04', dark: 'ARKI / 19b - Live Video Call', light: 'ARKI / 19b - Video Call [Light]', components: 'Video Call Window, CAD View', proto: 'Live Stream Window Overlay', heuristic: 'Nielsen #8 (Minimalist): Cửa sổ gọi video gọn gàng' },
    { uc: 'UC-32', us: 'US-16', name: 'Nộp Đơn Đề Xuất Tùy Biến Kết Cấu +4m', actor: 'ACT-02, ACT-04', dark: 'ARKI / 19c - Custom Request', light: 'ARKI / 19c - Custom Form [Light]', components: 'Modification Form & Primary Btn', proto: 'ON_CLICK -> Form Submit', heuristic: 'Nielsen #5 (Error Prevention): Xác nhận trước khi gửi đơn' },
    { uc: 'UC-33', us: 'US-17', name: 'Tính Đòn Bẩy Vay & Trả Góp Định Kỳ', actor: 'ACT-02, ACT-06', dark: 'ARKI / 20 - Financial Calc', light: 'ARKI / 20 - Financial Calc [Light]', components: 'Financial Calculator Card', proto: 'MOVE_IN (Bottom) <-> SLIDE_OUT', heuristic: 'Nielsen #2 (Real World): Công thức $18,450/tháng (4.3% 20y)' },
    { uc: 'UC-34', us: 'US-17', name: 'Ký Quỹ Bằng Bitcoin 68.2 BTC & Escrow', actor: 'ACT-03, SYS-03', dark: 'ARKI / 20b - Crypto Escrow', light: 'ARKI / 20b - Escrow [Light]', components: 'Multi-Currency Selector', proto: 'Smart Contract Escrow Lock', heuristic: 'Nielsen #9 (Error Recovery): Khóa tỷ giá bảo hộ 15 phút' },
    { uc: 'UC-35', us: 'US-17', name: 'Phân Tích Dự Báo Tăng Giá Vốn 10 Năm', actor: 'ACT-02, ACT-06', dark: 'ARKI / 20c - Capital Growth', light: 'ARKI / 20c - Growth [Light]', components: 'Appreciation Chart Card', proto: 'SMART_ANIMATE (0.35s)', heuristic: 'Nielsen #1 (Visibility): Đường biểu đồ ~12.9%/năm trực quan' },
    { uc: 'UC-36', us: 'US-18', name: 'Quản Lý Danh Mục Kiệt Tác Đã Lưu $17M', actor: 'ACT-03, ACT-02', dark: 'ARKI / 18 - Saved Architecture', light: 'ARKI / 18 - Saved [Light]', components: 'Estate Preview Card, Bottom Nav', proto: 'SMART_ANIMATE <-> DISSOLVE', heuristic: 'Nielsen #6 (Recognition): Tổng tài sản $17M hiển thị đậm' },
    { uc: 'UC-37', us: 'US-18', name: 'Tạo Thư Mục Bộ Sưu Tập Riêng Tư', actor: 'ACT-03, ACT-02', dark: 'ARKI / 18b - Curated Folder', light: 'ARKI / 18b - Curated [Light]', components: 'Folder Form & Primary Btn', proto: 'ON_CLICK -> Create Folder', heuristic: 'Nielsen #3 (User Freedom): Tùy biến phân loại bộ sưu tập' },
    { uc: 'UC-38', us: 'US-19', name: 'Hồ Sơ Black Diamond Patron #004', actor: 'ACT-03, ACT-05', dark: 'ARKI / 21, 21b, 21c (Profile)', light: 'ARKI / 21, 21b [Light]', components: 'Concierge Badge, Privileges Card', proto: 'SMART_ANIMATE -> Logout Option', heuristic: 'Nielsen #5 (Error Prevention): Xác nhận trước khi Đăng xuất' },
    { uc: 'UC-39', us: 'US-19', name: 'Tải & Quản Lý Dữ Liệu VR Không Gian Offline', actor: 'ACT-03', dark: 'ARKI / 24 - Offline VR Cache', light: 'ARKI / 24 - Offline VR [Light]', components: 'Storage Gauge, Cache Download Btn', proto: 'PROGRESS_BAR (0% -> 100% Cache)', heuristic: 'Nielsen #1 (Visibility): Báo rõ dung lượng 1.2GB tải về' },
    { uc: 'UC-40', us: 'US-20', name: 'Menu 3 Gạch ☰, Đổi Theme & Song Ngữ', actor: 'Tất cả Actors', dark: 'ARKI / 25 - Drawer Menu', light: 'ARKI / 25 - Drawer Menu [Light]', components: 'Drawer Container, Theme Toggle', proto: 'SLIDE_IN (Right) + Cross-Theme', heuristic: 'Nielsen #4 (Consistency): Đổi Theme tức thì không mất ngữ cảnh' }
  ];

  traceData.forEach((item) => {
    const row = wsTrace.addRow(item);
    row.height = 34;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum === 1) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
      if (colNum === 9) {
        cell.font = { name: 'Segoe UI', size: 8.5, color: { argb: 'FF1E293B' } };
      }
    });
  });

  // =========================================================================
  // SHEET 6: ĐÁNH GIÁ 10 NGUYÊN LÝ HEURISTICS NIELSEN (RUBRIC ĐỒ ÁN)
  // =========================================================================
  const wsNielsen = workbook.addWorksheet('6. Đánh Giá 10 Heuristics', { views: [{ showGridLines: true }] });
  wsNielsen.columns = [
    { header: 'STT', key: 'stt', width: 8 },
    { header: '10 Nguyên Lý Heuristics (Jakob Nielsen)', key: 'principle', width: 32 },
    { header: 'Thực Trạng Triển Khai Trong ARKI Prototype', key: 'implementation', width: 42 },
    { header: 'Điểm Mạnh Đạt Được', key: 'strengths', width: 38 },
    { header: 'Điểm Cần Khắc Phục / Rủi Ro', key: 'limitations', width: 36 },
    { header: 'Giải Pháp Tối Ưu Hóa (Remediation)', key: 'solution', width: 40 },
    { header: 'Đánh Giá', key: 'verdict', width: 14 }
  ];

  wsNielsen.spliceRows(1, 0, [['🔬 BÁO CÁO ĐÁNH GIÁ CÔNG THÁI HỌC THEO 10 NGUYÊN LÝ HEURISTICS CỦA JAKOB NIELSEN']]);
  wsNielsen.mergeCells('A1:G1');
  wsNielsen.getRow(1).height = 38;
  wsNielsen.getCell('A1').fill = titleFill;
  wsNielsen.getCell('A1').font = titleFont;
  wsNielsen.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsNielsen.getRow(2).height = 26;
  wsNielsen.getRow(2).eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const nielsenData = [
    {
      stt: '01',
      principle: '1. Visibility of system status\n(Hiển thị rõ trạng thái hệ thống)',
      implementation: 'Thanh tải dữ liệu 3 giai đoạn (15% -> 65% -> 100%), scrubber phát video 02:45/04:10, báo rõ 14 kết quả khi áp dụng bộ lọc.',
      strengths: 'Người dùng luôn nhận thức được tiến trình thực thi, không gặp trạng thái "đóng băng" không phản hồi.',
      limitations: 'Một số tương tác nạp ảnh panorama 360 độ ban đầu chưa có vòng xoay tải nhẹ (loading spinner).',
      solution: 'Bổ sung hiệu ứng skeleton mờ và progressive blur trong lúc chờ tải dữ liệu ảnh dung lượng cao.',
      verdict: 'TỐT (8.5/10)'
    },
    {
      stt: '02',
      principle: '2. Match between system & real world\n(Khớp với thế giới thực)',
      implementation: 'Bản vẽ CAD 1:100, la bàn góc gió hạ cánh 108° ESE, mô phỏng mặt trời 24h, công thức trả góp tài chính $18,450/tháng (4.3% lãi suất).',
      strengths: 'Thuật ngữ kiến trúc và tài chính chính xác tuyệt đối theo chuẩn chuyên ngành bất động sản cao cấp.',
      limitations: 'Khái niệm Crypto Escrow và hợp đồng thông minh Multi-Sig có thể khó hiểu với người dùng truyền thống.',
      solution: 'Cung cấp ghi chú diễn giải bằng ngôn ngữ tài chính thông thường kèm tỷ giá tham chiếu song song.',
      verdict: 'XUẤT SẮC (9.5/10)'
    },
    {
      stt: '03',
      principle: '3. User control and freedom\n(Quyền kiểm soát & tự do cho người dùng)',
      implementation: 'Cung cấp nút Back kính mờ trên mọi màn hình chi tiết, cho phép hủy khay lọc bằng chạm ngoài vùng, slider ảnh 5 trang lặp kín.',
      strengths: 'Không bao giờ đưa người dùng vào "ngõ cụt" (dead-end). Luôn có lối thoát an toàn về trang trước hoặc Home.',
      limitations: 'Thao tác ký quỹ Crypto Escrow và xóa bộ nhớ đệm VR chưa có nút Hoàn Tác (Undo).',
      solution: 'Bổ sung hộp thoại cảnh báo xác nhận 2 bước trước các hành động khó hoàn tác (Safety Principle).',
      verdict: 'TỐT (8.0/10)'
    },
    {
      stt: '04',
      principle: '4. Consistency and standards\n(Tính nhất quán & quy chuẩn)',
      implementation: 'Hệ thống Design System đồng bộ 10 Master Components, quy chuẩn kích thước iPhone (393x852px), nút bấm và bo góc nhất quán.',
      strengths: 'Tất cả 54 màn hình duy trì ngôn ngữ thị giác chặt chẽ trên cả hai chế độ Nocturne Slate và Daylight Porcelain.',
      limitations: 'Một số biểu tượng icon trước đây bị trùng lặp chức năng hoặc lạm dụng làm trang trí.',
      solution: 'Áp dụng bộ quy tắc Anti-AI UI: xóa toàn bộ icon thừa, chỉ giữ lại typography phân cấp chuẩn mực.',
      verdict: 'XUẤT SẮC (9.5/10)'
    },
    {
      stt: '05',
      principle: '5. Error prevention\n(Ngăn ngừa sai sót)',
      implementation: 'Giới hạn số tiền trả trước tối thiểu 20%, khay chọn ngày giờ giới hạn các slot đã kín lịch, định dạng 6 ô số cho OTP.',
      strengths: 'Ràng buộc dữ liệu đầu vào ngay trên giao diện giúp loại bỏ nguy cơ người dùng nhập sai tham số.',
      limitations: 'Khi nộp biểu mẫu tùy biến kết cấu +4m chưa có bước xem lại bản tóm tắt (Review Summary).',
      solution: 'Thêm màn hình xác nhận tóm tắt nội dung sửa đổi trước khi gửi chính thức tới văn phòng KTS.',
      verdict: 'TỐT (8.5/10)'
    },
    {
      stt: '06',
      principle: '6. Recognition rather than recall\n(Nhận diện thay vì ghi nhớ)',
      implementation: 'Ghim bản đồ hiển thị thẻ preview đầy đủ giá và diện tích, trang chi tiết gói gọn 6 chỉ số công thái học trong 1 viewport.',
      strengths: 'Người dùng không phải ghi nhớ số liệu từ màn hình này sang màn hình khác; dữ liệu luôn sẵn có trước mắt.',
      limitations: 'Danh mục so sánh các bất động sản cùng phân khúc chưa hỗ trợ bảng đối chiếu trực diện 2 cột.',
      solution: 'Có thể bổ sung tính năng So sánh nhanh (Quick Compare) 2 dinh thự trong các bản cập nhật tương lai.',
      verdict: 'RẤT TỐT (9.0/10)'
    },
    {
      stt: '07',
      principle: '7. Flexibility and efficiency of use\n(Linh hoạt & hiệu quả sử dụng)',
      implementation: 'Guest Mode vào nhanh danh mục, Menu Drawer (☰) cung cấp lối tắt tức thì, cử chỉ vuốt kéo Drag xoay mô hình 3D linh hoạt.',
      strengths: 'Phục vụ cả người dùng mới (dễ duyệt) lẫn hội viên thượng lưu lâu năm (thao tác nhanh qua Menu Drawer).',
      limitations: 'Người dùng thành thạo chưa có phím tắt gõ tìm kiếm trực tiếp trên bàn phím ảo.',
      solution: 'Tích hợp thanh tìm kiếm thông minh Quick Search bar với gợi ý từ khóa tự động.',
      verdict: 'TỐT (8.5/10)'
    },
    {
      stt: '08',
      principle: '8. Aesthetic and minimalist design\n(Thẩm mỹ cao cấp & thiết kế tối giản - Anti-AI UI)',
      implementation: 'Áp dụng triệt để phong cách Artisan Design: triệt tiêu gradient tím phát sáng rẻ tiền, dùng nền đá phiến trung tính, viền 1px thanh mảnh, bố cục Bento Grid.',
      strengths: 'Tôn vinh nghệ thuật kiến trúc của Tadao Ando, tạo cảm giác sang trọng thực thụ của một bảo tàng số hiện đại.',
      limitations: 'Cần duy trì độ tương phản chữ khắt khe trên cả nền sáng để tránh chữ bị chìm (WCAG AA).',
      solution: 'Đã chuẩn hóa màu chữ: đen đậm `#0F172A` trên nền sáng và trắng ngà `#F8FAFC` trên nền tối.',
      verdict: 'XUẤT SẮC (9.8/10)'
    },
    {
      stt: '09',
      principle: '9. Help users recognize, diagnose, and recover from errors\n(Giúp nhận biết & khắc phục lỗi)',
      implementation: 'Cảnh báo khung giờ kín lịch chuyển màu xám và gợi ý khung giờ kế tiếp, báo đỏ khi nhập sai OTP kèm thời gian đếm ngược.',
      strengths: 'Thông báo lỗi luôn chỉ ra rõ nguyên nhân và hướng dẫn cụ thể cách khắc phục thay vì chỉ báo mã lỗi.',
      limitations: 'Thông báo lỗi kết nối mạng còn chung chung ở một số màn hình media.',
      solution: 'Chuẩn hóa câu thông báo lỗi thành tiếng Việt rõ nghĩa và cung cấp nút "Thử lại ngay".',
      verdict: 'TỐT (8.0/10)'
    },
    {
      stt: '10',
      principle: '10. Help and documentation\n(Trợ giúp & hướng dẫn sử dụng)',
      implementation: 'Tích hợp kênh liên hệ Concierge 24/7 trực tiếp, hướng dẫn giải thích từng điều khoản trong thỏa thuận bảo mật NDA.',
      strengths: 'Người dùng luôn có thể kết nối với chuyên viên hỗ trợ thực tế qua 1 nút bấm trên màn hình hồ sơ.',
      limitations: 'Chưa có mục Câu hỏi thường gặp (FAQ) tích hợp sẵn trong ứng dụng.',
      solution: 'Bổ sung danh mục FAQ về quy trình pháp lý sở hữu bất động sản tại Menu Drawer.',
      verdict: 'TỐT (8.0/10)'
    }
  ];

  nielsenData.forEach((item) => {
    const row = wsNielsen.addRow(item);
    row.height = 42;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum === 1) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
      if (colNum === 7) {
        cell.fill = passFill;
        cell.font = passFont;
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  const outV3 = path.resolve('ARKI_NghiepVu_Actors_US_UC_v3_Ecosystem.xlsx');
  await workbook.xlsx.writeFile(outV3);
  console.log(`✅ File Excel v3 (3 User Groups Ecosystem) đã được tạo tại: ${outV3}`);

  try {
    const outV2 = path.resolve('ARKI_NghiepVu_Actors_US_UC_v2.xlsx');
    await workbook.xlsx.writeFile(outV2);
    console.log(`✅ Đồng bộ thành công sang: ${outV2}`);
  } catch (e) {
    // ignore if v2 is open
  }
}

generateDetailedExcel().catch((err) => {
  console.error('❌ Lỗi khi sinh Excel:', err);
  process.exit(1);
});
