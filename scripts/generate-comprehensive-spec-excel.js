import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

async function generateComprehensiveExcel() {
  console.log('📊 Generating Comprehensive ARKI Specification Excel (3 Core Actors, 10 Core UCs, 112 Screens, Traceability, Heuristics)...');

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ARKI UI/UX Engineering Team';
  workbook.lastModifiedBy = 'ARKI Lead System Architect';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Color Tokens
  const darkSlateFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  const skyBlueFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };
  const emeraldFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF059669' } };
  const goldFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB45309' } };
  const purpleFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF6D28D9' } };
  
  const whiteBold = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
  const titleFont = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFFFF' } };
  const borderAll = {
    top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
  };

  // =========================================================================
  // SHEET 1: ACTORS SPECIFICATION (3 NHÓM ĐỐI TƯỢNG CỐT LÕI)
  // =========================================================================
  const wsActors = workbook.addWorksheet('1. Hệ Thống 3 Actors', { views: [{ showGridLines: true }] });
  wsActors.columns = [
    { header: 'Mã Actor', key: 'id', width: 14 },
    { header: 'Tên Nhóm Actor', key: 'name', width: 32 },
    { header: 'Phân Loại Đối Tượng', key: 'type', width: 28 },
    { header: 'Mô Tả Chức Năng & Mục Tiêu', key: 'desc', width: 45 },
    { header: 'Quyền Hạn & Điểm Chạm Chính', key: 'permissions', width: 45 },
    { header: 'Use Cases Tham Gia', key: 'ucs', width: 30 },
    { header: 'Màn Hình Phụ Trách', key: 'screens', width: 35 }
  ];

  wsActors.spliceRows(1, 0, [['🏛️ HỆ THỐNG ĐẶC TẢ 3 NHÓM ĐỐI TƯỢNG CỐT LÕI (CORE ACTORS) — ARKI PLATFORM']]);
  wsActors.mergeCells('A1:G1');
  wsActors.getRow(1).height = 38;
  wsActors.getCell('A1').fill = skyBlueFill;
  wsActors.getCell('A1').font = titleFont;
  wsActors.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsActors.getRow(2).height = 28;
  wsActors.getRow(2).eachCell(cell => {
    cell.fill = darkSlateFill;
    cell.font = whiteBold;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const actorsData = [
    {
      id: 'ACT-BUY',
      name: 'Buyer / Client (Người Mua, Thuê, Gia Chủ)',
      type: 'Khách Hàng Cuối (End User)',
      desc: 'Khám phá không gian thực tế qua 360, tìm kiếm dự án, so sánh phong cách kiến trúc, thuê KTS hoặc liên hệ môi giới, đặt cọc giữ chỗ.',
      permissions: 'Duyệt bảng tin Bento Grid, xoay tour 360 Gyroscope, xem Hotspots vật liệu, tham gia phiên Co-touring trực tuyến, đặt lịch đón trực thăng/xe, ký cọc Smart Contract.',
      ucs: 'UC-01, UC-02, UC-03, UC-05, UC-07, UC-09, UC-10',
      screens: 'Phân hệ 1 (AUTH), Phân hệ 2 (360), Phân hệ 3 (BUY), Phân hệ 6 (COM), Phân hệ 7 (TXN)'
    },
    {
      id: 'ACT-ARC',
      name: 'Architect / Interior Designer (KTS & NTK)',
      type: 'Chuyên Gia Thiết Kế (Professional)',
      desc: 'Trưng bày portfolio thực tế ảo 360/3D Render, nhận diện thương hiệu, tiếp nhận brief gia chủ, báo giá, quản lý hồ sơ kỹ thuật & giám sát thi công.',
      permissions: 'Tải ảnh Equirectangular 2:1, dựng Node Linking chuyển phòng, ghim Hotspot vật tư & cấu tạo dầm CAD 1:100, tạo slider Before/After, tiếp nhận brief và ký phụ lục thiết kế.',
      ucs: 'UC-01, UC-03, UC-04, UC-05, UC-06, UC-07, UC-10',
      screens: 'Phân hệ 1 (AUTH), Phân hệ 2 (360), Phân hệ 4 (ARC), Phân hệ 6 (COM), Phân hệ 7 (TXN)'
    },
    {
      id: 'ACT-AGT',
      name: 'Real Estate Agent (Môi Giới BĐS)',
      type: 'Chuyên Viên Kinh Doanh (Operations)',
      desc: 'Quản lý giỏ hàng BĐS có tour 360, tổ chức phiên dẫn khách trực tuyến (Co-touring), theo dõi phễu khách hàng (CRM), chốt cọc và điều phối hậu cần.',
      permissions: 'Liên kết mã tour 360 vào bài đăng bán, chủ trì phòng Live Co-touring (Host Mode laser pointer), theo dõi Heatmap tương tác khách hàng, tạo phiếu cọc trực tuyến.',
      ucs: 'UC-01, UC-03, UC-04, UC-05, UC-06, UC-08, UC-10',
      screens: 'Phân hệ 1 (AUTH), Phân hệ 2 (360), Phân hệ 5 (AGT), Phân hệ 6 (COM), Phân hệ 7 (TXN)'
    },
    {
      id: 'SYS-EXT',
      name: 'Hệ Thống & Dịch Vụ Ngoại Vi (Services)',
      type: 'Hạ Tầng Nền Tảng (Platform Backend)',
      desc: 'WebRTC Signaling Server, Tiling Pyramid CDN, FaceID Enclave, Apple Wallet PassKit Gateway, Multi-Sig Escrow Smart Contract.',
      permissions: 'Đồng bộ góc quay Yaw/Pitch thời gian thực (<0.8s), phân giải ảnh Deep Zoom gạch ngói 512x512, mã hóa chữ ký số và giải ngân theo mốc.',
      ucs: 'Hỗ trợ toàn bộ UC-01 đến UC-10',
      screens: 'Dịch vụ nền tảng ngầm (Backend / Socket / Smart Contract)'
    }
  ];

  actorsData.forEach(item => {
    const row = wsActors.addRow(item);
    row.height = 42;
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
  // SHEET 2: 112 SCREENS DETAILED BREAKDOWN (8 PHÂN HỆ)
  // =========================================================================
  const wsScreens = workbook.addWorksheet('2. Danh Mục 112 Màn Hình', { views: [{ showGridLines: true }] });
  wsScreens.columns = [
    { header: 'Mã Màn Hình', key: 'id', width: 16 },
    { header: 'Tên Màn Hình Chi Tiết', key: 'name', width: 38 },
    { header: 'Thuộc Phân Hệ', key: 'module', width: 28 },
    { header: 'Actor Trực Tiếp Thao Tác', key: 'actor', width: 24 },
    { header: 'Mô Tả Giao Diện & Thành Phần Cốt Lõi', key: 'desc', width: 45 },
    { header: 'Điểm Nhấn Tương Tác (Micro-Interactions)', key: 'interactions', width: 40 },
    { header: 'Thuộc Luồng Vàng (Golden Path)?', key: 'golden', width: 22 }
  ];

  wsScreens.spliceRows(1, 0, [['📱 DANH MỤC CHI TIẾT 112 MÀN HÌNH ỨNG DỤNG (8 PHÂN HỆ) — ARKI PLATFORM']]);
  wsScreens.mergeCells('A1:G1');
  wsScreens.getRow(1).height = 38;
  wsScreens.getCell('A1').fill = skyBlueFill;
  wsScreens.getCell('A1').font = titleFont;
  wsScreens.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsScreens.getRow(2).height = 28;
  wsScreens.getRow(2).eachCell(cell => {
    cell.fill = darkSlateFill;
    cell.font = whiteBold;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const screensCatalog = [
    // Phân hệ 1 (12 màn)
    { id: 'SCR-AUTH-01', name: 'Splash Screen', module: 'Phân hệ 1: Onboarding & Auth', actor: 'All Actors', desc: 'Logo ARKI, Slogan định vị kiến trúc & BĐS 360, phong cách Tadao Ando', interactions: 'Tự chuyển sau 1.5s hoặc bấm Chạm để tiếp tục', golden: '⭐ GOLDEN / 01' },
    { id: 'SCR-AUTH-02', name: 'Onboarding 1 - Khám phá 360', module: 'Phân hệ 1: Onboarding & Auth', actor: 'All Actors', desc: 'Khám phá BĐS chân thực qua công nghệ 360 Street View', interactions: 'Vuốt Carousel ngang, nút Tiếp tục', golden: '⭐ GOLDEN / 02' },
    { id: 'SCR-AUTH-03', name: 'Onboarding 2 - Kết nối KTS', module: 'Phân hệ 1: Onboarding & Auth', actor: 'All Actors', desc: 'Kết nối trực tiếp KTS tài năng và công trình mẫu thực tế ảo', interactions: 'Vuốt Carousel ngang, nút Tiếp tục', golden: '' },
    { id: 'SCR-AUTH-04', name: 'Onboarding 3 - Đồng hành Môi giới', module: 'Phân hệ 1: Onboarding & Auth', actor: 'All Actors', desc: 'Đồng hành xem nhà trực tuyến cùng môi giới chuyên nghiệp', interactions: 'Vuốt Carousel ngang, nút Bắt đầu', golden: '' },
    { id: 'SCR-AUTH-05', name: 'Chọn vai trò tài khoản', module: 'Phân hệ 1: Onboarding & Auth', actor: 'All Actors', desc: 'Lựa chọn vai trò: Khách mua / KTS - NTK / Môi giới BĐS', interactions: 'Chọn 1 trong 3 card vai trò, cập nhật session', golden: '⭐ GOLDEN / 03' },
    { id: 'SCR-AUTH-06', name: 'Đăng nhập đa kênh', module: 'Phân hệ 1: Onboarding & Auth', actor: 'All Actors', desc: 'Số điện thoại, Email, Apple ID, Google ID', interactions: 'Nút đăng nhập Apple/Google, nhập số điện thoại', golden: '' },
    { id: 'SCR-AUTH-07', name: 'Xác thực OTP SMS/Email', module: 'Phân hệ 1: Onboarding & Auth', actor: 'All Actors', desc: 'Nhập mã xác thực 6 số ngẫu nhiên, đếm ngược 60s', interactions: 'Tự động nhảy ô nhập số, đếm ngược gửi lại mã', golden: '' },
    { id: 'SCR-AUTH-08', name: 'Đăng ký thông tin cơ bản', module: 'Phân hệ 1: Onboarding & Auth', actor: 'All Actors', desc: 'Họ tên, mật khẩu, ảnh đại diện', interactions: 'Form nhập liệu, kiểm tra độ mạnh mật khẩu', golden: '' },
    { id: 'SCR-AUTH-09', name: 'eKYC - Chụp Căn cước công dân', module: 'Phân hệ 1: Onboarding & Auth', actor: 'Designer & Agent', desc: 'Quét 2 mặt CCCD/Hộ chiếu xác thực tư cách hành nghề', interactions: 'Khung quét camera nhận diện cạnh giấy tờ', golden: '' },
    { id: 'SCR-AUTH-10', name: 'eKYC - Sinh trắc học Face Liveness', module: 'Phân hệ 1: Onboarding & Auth', actor: 'Designer & Agent', desc: 'Quét khuôn mặt chống giả mạo sinh trắc học', interactions: 'Vòng tròn quét 3D theo cử chỉ chớp mắt/quay đầu', golden: '' },
    { id: 'SCR-AUTH-11', name: 'Upload chứng chỉ hành nghề', module: 'Phân hệ 1: Onboarding & Auth', actor: 'Designer & Agent', desc: 'Tải ảnh chứng chỉ môi giới / Giấy phép kinh doanh KTS', interactions: 'Nút tải file PDF/ảnh, xem trước tài liệu', golden: '' },
    { id: 'SCR-AUTH-12', name: 'Chờ duyệt hồ sơ & Chính sách', module: 'Phân hệ 1: Onboarding & Auth', actor: 'Designer & Agent', desc: 'Thông báo xét duyệt trong 24h & điều khoản cộng đồng', interactions: 'Nút Xem trước chế độ khách quan sát', golden: '' },

    // Phân hệ 2 (15 màn)
    { id: 'SCR-360-01', name: 'Trình diễn 360 Toàn màn hình', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'All Actors', desc: 'Full-viewport Viewer, điều khiển Gyroscope, WebGL', interactions: 'Kéo xoay 360, nghiêng máy con quay hồi chuyển', golden: '⭐ GOLDEN / 09' },
    { id: 'SCR-360-02', name: 'Menu chuyển phòng trực quan', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'All Actors', desc: 'Thumbnail Carousel các phòng trong nhà', interactions: 'Cuộn ngang danh sách phòng, chạm đổi cảnh <0.8s', golden: '' },
    { id: 'SCR-360-03', name: 'Bản đồ mặt bằng tích hợp (Radar)', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'All Actors', desc: 'Interactive 2D Floor Plan kèm radar hướng nhìn', interactions: 'Nón radar xoay theo hướng máy, chạm điểm nhảy phòng', golden: '' },
    { id: 'SCR-360-04', name: 'Chế độ búp bê 3D (Dollhouse View)', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'All Actors', desc: 'Mô hình không gian cắt lớp 3D xoay đa chiều', interactions: 'Xoay quỹ đạo Orbit 3D, cắt mặt phẳng tầng', golden: '' },
    { id: 'SCR-360-05', name: 'Thước đo không gian ảo (Measure Tool)', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'Designer & Buyer', desc: 'Đo khoảng cách mét thực tế giữa 2 điểm trong phòng ảo', interactions: 'Chạm điểm A, kéo tia tới điểm B, tính khoảng cách Euclid', golden: '' },
    { id: 'SCR-360-06', name: 'Chi tiết Hotspot - Vật liệu nội thất', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'All Actors', desc: 'Bottom Sheet thông tin gạch, sàn, sơn, thương hiệu', interactions: 'Chạm icon Hotspot, trượt Bottom Sheet mở rộng', golden: '' },
    { id: 'SCR-360-07', name: 'Chi tiết Hotspot - Thiết bị gia dụng', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'All Actors', desc: 'Thông số kỹ thuật bếp, tủ lạnh kèm link mua chính hãng', interactions: 'Bấm nút Mua ngay hoặc Hỏi KTS', golden: '' },
    { id: 'SCR-360-08', name: 'Chi tiết Hotspot - Bản vẽ CAD 1:100', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'All Actors', desc: 'Trình xem bản vẽ CAD mặt cắt, dầm bê tông dự ứng lực', interactions: 'Phóng to thu nhỏ Vector Pinch-to-zoom', golden: '⭐ GOLDEN / 08' },
    { id: 'SCR-360-09', name: 'Chế độ so sánh Before & After', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'Designer & Buyer', desc: 'Thanh trượt chia đôi màn hình 360 Hiện trạng vs 3D', interactions: 'Kéo thanh chia đôi ngang, đồng bộ góc xoay 2 cảnh', golden: '' },
    { id: 'SCR-360-10', name: 'Chế độ kính thực tế ảo (VR Mode)', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'Buyer', desc: 'Chia đôi thấu kính mắt hỗ trợ Google Cardboard / VR', interactions: 'Khóa tiêu cự, định tâm điểm nhìn (Gaze Trigger)', golden: '' },
    { id: 'SCR-360-11', name: 'Bản đồ định vị BĐS 360 (GPS)', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'Buyer', desc: 'Map View vệ tinh Sơn Trà kèm ghim 360 tương tác', interactions: 'Chạm pin bản đồ, hiển thị thẻ nổi công thái học', golden: '⭐ GOLDEN / 06' },
    { id: 'SCR-360-12', name: 'Lớp phủ quy hoạch đô thị (Zoning)', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'Buyer & Agent', desc: 'Lớp màu quy hoạch đất ở, thương mại, lộ giới quy hoạch', interactions: 'Bật tắt toggle lớp phủ bản đồ', golden: '' },
    { id: 'SCR-360-13', name: 'Tiện ích ngoại khu 360 bán kính 1km', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'Buyer', desc: 'Trường học, bệnh viện, bến du thuyền, sân bay', interactions: 'Chọn bán kính 500m / 1km / 2km', golden: '' },
    { id: 'SCR-360-14', name: 'Tùy chỉnh ánh sáng Ngày / Đêm', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'All Actors', desc: 'Chuyển đổi góc nắng hoàng hôn và ánh sáng ban đêm', interactions: 'Toggle mặt trời / mặt trăng chuyển ảnh mượt mà', golden: '' },
    { id: 'SCR-360-15', name: 'Chụp ảnh không gian & Chia sẻ MXH', module: 'Phân hệ 2: 360 Tour Engine & Map', actor: 'All Actors', desc: 'Khung ảnh tỉ lệ vàng, watermark dự án, link mời', interactions: 'Bấm chụp, lưu album hoặc sao chép liên kết sâu', golden: '' },

    // Phân hệ 3 (20 màn)
    { id: 'SCR-BUY-01', name: 'Trang chủ Người mua (Bento Grid)', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Bảng tin Bento Grid kiệt tác Tadao Ando, BĐS nổi bật', interactions: 'Chạm xem chi tiết, cuộn Bento nhịp nhàng', golden: '⭐ GOLDEN / 04' },
    { id: 'SCR-BUY-02', name: 'Bộ lọc tìm kiếm chi tiết', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Mức giá $2.5M - $12M, diện tích, KTS Pritzker, ven biển', interactions: 'Thanh trượt kép, chọn chip bộ lọc', golden: '⭐ GOLDEN / 05' },
    { id: 'SCR-BUY-03', name: 'Danh sách kết quả tìm kiếm', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Thẻ danh sách kèm huy hiệu "360 Verified"', interactions: 'Cuộn danh sách, lưu yêu thích (Wishlist)', golden: '' },
    { id: 'SCR-BUY-04', name: 'Chi tiết BĐS - Tổng quan', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'The Glass Sanctuary Villa, $4.25M, Sơn Trà, 850m²', interactions: 'Xem 1 viewport công thái học, nút Đặt lịch', golden: '⭐ GOLDEN / 07' },
    { id: 'SCR-BUY-05', name: 'Chi tiết BĐS - Tab Mặt bằng Layout', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Sơ đồ bố trí 5 Suites, hồ bơi 35m, bãi đáp trực thăng', interactions: 'Chuyển tab mượt mà, phóng to mặt bằng', golden: '' },
    { id: 'SCR-BUY-06', name: 'Chi tiết BĐS - Tab Tiện ích nội khu', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Hầm rượu, kính Low-E, sân đỗ trực thăng 108°', interactions: 'Cuộn xem danh sách tiện ích cao cấp', golden: '' },
    { id: 'SCR-BUY-07', name: 'Bảng tính lãi suất vay Private Banking', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Tính toán đòn bẩy tài chính, lãi suất 4.3% kỳ hạn 20 năm', interactions: 'Điều chỉnh tỷ lệ vốn tự có / vay ngân hàng', golden: '' },
    { id: 'SCR-BUY-08', name: 'So sánh BĐS đa tiêu chí', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Đối chiếu 2-3 căn hộ về đơn giá, diện tích, vật tư', interactions: 'Bảng so sánh dạng cột đối xứng', golden: '' },
    { id: 'SCR-BUY-09', name: 'Bộ sưu tập BĐS đã lưu (Wishlist)', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Phân loại BĐS nghỉ dưỡng, BĐS đầu tư, Kiệt tác Pritzker', interactions: 'Tạo thư mục mới, chia sẻ bộ sưu tập', golden: '' },
    { id: 'SCR-BUY-10', name: 'Lịch sử xem Tour 360 gần đây', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Danh sách các tour đã trải nghiệm kèm thời gian lưu', interactions: 'Chạm để tiếp tục tour dở dang', golden: '' },
    { id: 'SCR-BUY-11', name: 'Đặt lịch hẹn xem thực địa & Trực thăng', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Chọn ngày 16/10/2026, 14:30, trực thăng Bell 429', interactions: 'Bộ chọn ngày giờ trực quan, nút xác nhận', golden: '⭐ GOLDEN / 10' },
    { id: 'SCR-BUY-12', name: 'Yêu cầu mở phòng Live Co-touring', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Gửi yêu cầu xem nhà trực tuyến cùng môi giới/KTS', interactions: 'Chọn khung giờ rảnh, xác nhận thiết bị', golden: '' },
    { id: 'SCR-BUY-13', name: 'Đăng tin tìm BĐS theo nhu cầu riêng', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Reverse Marketplace: Khách nêu ngân sách & gu thiết kế', interactions: 'Form nhập yêu cầu, tải moodboard', golden: '' },
    { id: 'SCR-BUY-14', name: 'Quản lý các tin tìm mua / thuê đã đăng', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Theo dõi báo giá từ các môi giới phản hồi', interactions: 'Xem danh sách chào hàng gửi tới', golden: '' },
    { id: 'SCR-BUY-15', name: 'Tạo phiếu yêu cầu tư vấn KTS', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Gửi brief cải tạo, mở rộng hồ bơi +4m từ căn hộ đang xem', interactions: 'Đính kèm vị trí phòng trong tour 360', golden: '' },
    { id: 'SCR-BUY-16', name: 'Danh sách KTS phù hợp phong cách', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Gợi ý Studio Tadao Ando, Kengo Kuma, Zaha Hadid', interactions: 'Xem hồ sơ năng lực, bấm Chat ngay', golden: '' },
    { id: 'SCR-BUY-17', name: 'Theo dõi tiến độ lịch hẹn xem nhà', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Trạng thái: Chờ duyệt -> Đã duyệt -> Thẻ VIP PASS', interactions: 'Hiển thị thẻ vé VIP Boarding Pass #ARK-8821', golden: '⭐ GOLDEN / 11' },
    { id: 'SCR-BUY-18', name: 'Đánh giá trải nghiệm sau buổi xem', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Chấm sao KTS/Môi giới, viết nhận xét độ chân thực 360', interactions: 'Chấm sao 1-5, chọn tag nhanh', golden: '' },
    { id: 'SCR-BUY-19', name: 'Tra cứu Chủ đầu tư & Nhà thầu', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Thông tin năng lực pháp lý, các công trình đã bàn giao', interactions: 'Xem danh sách dự án liên quan', golden: '' },
    { id: 'SCR-BUY-20', name: 'Kiểm tra tính pháp lý BĐS', module: 'Phân hệ 3: Người Mua & Thuê BĐS', actor: 'Buyer', desc: 'Sổ hồng lâu dài, giấy phép xây dựng, thẩm định ngân hàng', interactions: 'Xem chứng thư số kiểm định', golden: '' },

    // Phân hệ 4 (20 màn)
    { id: 'SCR-ARC-01', name: 'Trang chủ KTS & Thống kê Portfolio', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Lượt xem Portfolio 360, brief mới từ gia chủ', interactions: 'Bento Grid số liệu, biểu đồ tương tác', golden: '' },
    { id: 'SCR-ARC-02', name: 'Hồ sơ năng lực KTS công khai', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Bio, Giải thưởng Pritzker, phong cách Bê tông trần', interactions: 'Nút Theo dõi, nút Gửi brief', golden: '' },
    { id: 'SCR-ARC-03', name: 'Quản lý danh sách Portfolio công trình', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Danh sách dự án 3D Render & Thực tế ảo', interactions: 'Nút Thêm dự án mới, lọc theo năm', golden: '' },
    { id: 'SCR-ARC-04', name: 'Tải lên dự án mới - Bước 1: Thông tin', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Diện tích, ngân sách, phong cách, vị trí', interactions: 'Form nhập liệu phân bước (Step wizard)', golden: '' },
    { id: 'SCR-ARC-05', name: 'Tải lên dự án mới - Bước 2: Upload 360', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Tải ảnh Panorama 2:1 & Sơ đồ mặt bằng 2D', interactions: 'Kéo thả file ảnh dung lượng cao', golden: '' },
    { id: 'SCR-ARC-06', name: 'Studio dựng 360 - Node Linking', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Thiết lập điểm liên kết chuyển phòng giữa các phòng', interactions: 'Kéo thả ghim cửa, liên kết Scene A -> Scene B', golden: '' },
    { id: 'SCR-ARC-07', name: 'Studio dựng 360 - Material Hotspots', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Gắn thẻ vật liệu: Gạch Terrazzo, gỗ An Cường, sơn Dulux', interactions: 'Ghim điểm trên quả cầu 360, nhập mã SKU', golden: '' },
    { id: 'SCR-ARC-08', name: 'Studio dựng 360 - Góc nhìn mặc định', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Căn chỉnh Default Yaw, Pitch, FOV khi khách bước vào', interactions: 'Xoay màn hình và bấm Lưu góc nhìn', golden: '' },
    { id: 'SCR-ARC-09', name: 'Xem trước dự án 360 trước xuất bản', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Chế độ Preview kiểm thử toàn bộ hotspots và liên kết', interactions: 'Bấm Xuất bản toàn cầu', golden: '' },
    { id: 'SCR-ARC-10', name: 'Bảng tin Briefs tìm kiếm KTS', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Danh sách yêu cầu thiết kế từ các gia chủ thượng lưu', interactions: 'Lọc theo ngân sách > $1M, khu vực', golden: '' },
    { id: 'SCR-ARC-11', name: 'Chi tiết một đầu bài Brief gia chủ', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Mặt bằng thô, ngân sách $500K, mong muốn hồ bơi +4m', interactions: 'Nút Tạo concept & Báo giá', golden: '' },
    { id: 'SCR-ARC-12', name: 'Soạn thảo Concept & Báo giá thiết kế', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Bóc tách chi phí: Thiết kế 3D, hồ sơ kỹ thuật kết cấu', interactions: 'Nhập bảng giá theo m2, đính kèm album 360', golden: '' },
    { id: 'SCR-ARC-13', name: 'Quản lý các dự án thiết kế đang chạy', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Khai triển 2D, duyệt 3D render, giám sát thi công', interactions: 'Bấm vào dự án để xem chi tiết tiến độ', golden: '' },
    { id: 'SCR-ARC-14', name: 'Bảng Kanban tiến độ công trình', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Cột: Đang thiết kế -> Khách duyệt -> Đang thi công', interactions: 'Kéo thả thẻ nhiệm vụ giữa các cột', golden: '' },
    { id: 'SCR-ARC-15', name: 'Nghiệm thu giai đoạn (Ảnh thực tế vs 360)', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'So sánh ảnh công trường thực tế và ảnh render cam kết', interactions: 'Khách hàng bấm Duyệt nghiệm thu mốc', golden: '' },
    { id: 'SCR-ARC-16', name: 'Thư viện vật liệu & Bảng màu yêu thích', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Kho mẫu vật liệu hay dùng, liên kết nhà cung ứng', interactions: 'Kéo thả vật liệu vào dự án', golden: '' },
    { id: 'SCR-ARC-17', name: 'Liên kết đối tác nội thất & Nhà thầu', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Mạng lưới đơn vị thi công uy tín, chiết khấu liên kết', interactions: 'Gửi yêu cầu gia công cấu kiện', golden: '' },
    { id: 'SCR-ARC-18', name: 'Quản lý đánh giá & Phản hồi gia chủ', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Nhận xét từ khách hàng sau khi bàn giao nhà', interactions: 'Nút phản hồi công khai', golden: '' },
    { id: 'SCR-ARC-19', name: 'Báo cáo tương tác Portfolio (Analytics)', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Lượt xoay 360, phòng nán lại lâu nhất, tỷ lệ liên hệ', interactions: 'Biểu đồ Heatmap và thống kê phễu', golden: '' },
    { id: 'SCR-ARC-20', name: 'Đăng ký gói tài khoản KTS Pro', module: 'Phân hệ 4: KTS & NTK Nội Thất', actor: 'Designer', desc: 'Tích xanh uy tín, tăng dung lượng lưu trữ tour 360', interactions: 'Nút Đăng ký gói theo năm', golden: '' },

    // Phân hệ 5 (18 màn)
    { id: 'SCR-AGT-01', name: 'Bảng điều khiển Môi giới (Dashboard)', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Doanh số, Leads mới, Giỏ hàng BĐS 360 đang quản lý', interactions: 'Bento Metrics, thông báo khách hẹn', golden: '' },
    { id: 'SCR-AGT-02', name: 'Quản lý danh sách BĐS ký gửi', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Đang bán, Đã cọc, Hết hạn, trạng thái tour 360', interactions: 'Lọc trạng thái, nút Đăng tin mới', golden: '' },
    { id: 'SCR-AGT-03', name: 'Soạn tin đăng mới - Bước 1: Định vị', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Địa chỉ, toạ độ GPS, pháp lý sổ đỏ, mức giá', interactions: 'Chọn vị trí trên bản đồ vệ tinh', golden: '' },
    { id: 'SCR-AGT-04', name: 'Soạn tin đăng mới - Bước 2: Tích hợp 360', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Tải ảnh thường & gắn liên kết Tour 360 máy quét', interactions: 'Dán link tour hoặc quét mã QR thiết bị 360', golden: '' },
    { id: 'SCR-AGT-05', name: 'Trình quét không gian bằng camera đt', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Pano Capture Guide: Hướng dẫn lia điện thoại ghép 360', interactions: 'Điểm chấm tròn định hướng góc lia máy', golden: '' },
    { id: 'SCR-AGT-06', name: 'Kiểm tra chất lượng ảnh ghép 360', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Stitching Quality Review: Kiểm tra độ mượt đường nối', interactions: 'Xoay kiểm tra lỗi ghép ảnh, nút Duyệt ảnh', golden: '' },
    { id: 'SCR-AGT-07', name: 'Quản lý Phễu khách hàng (Leads CRM)', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Pipeline: Mới quan tâm -> Đã xem 360 -> Hẹn gặp -> Cọc', interactions: 'Kéo thả Lead qua các giai đoạn phễu', golden: '' },
    { id: 'SCR-AGT-08', name: 'Chi tiết hồ sơ khách tiềm năng (Lead)', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Khách Alexander Vance, ngân sách $5M, đã xem 18 phút', interactions: 'Nút Gọi điện thoại, nút Tạo phòng Co-tour', golden: '' },
    { id: 'SCR-AGT-09', name: 'Lịch công tác & Lịch hẹn dẫn khách', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Calendar View: Lịch xem thực địa, lịch bay Bell 429', interactions: 'Xem theo ngày/tuần, duyệt lệnh bay', golden: '⭐ GOLDEN / 13' },
    { id: 'SCR-AGT-10', name: 'Thiết lập phòng Co-tour 360 từ xa', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Tạo mã phòng #COT-782, cài đặt mật khẩu, chọn BĐS', interactions: 'Bấm Khởi tạo phòng, sao chép link mời', golden: '' },
    { id: 'SCR-AGT-11', name: 'Quản lý kho hàng liên kết sàn (Co-broking)', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Chia sẻ giỏ hàng với các môi giới khác, chia hoa hồng', interactions: 'Gửi yêu cầu liên kết căn hộ', golden: '' },
    { id: 'SCR-AGT-12', name: 'Tạo phiếu giữ chỗ / Phiếu cọc BĐS', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Khóa căn hộ, nhập tiền cọc $100K hoặc 1.5 BTC', interactions: 'Ký số môi giới, gửi sang máy khách hàng', golden: '' },
    { id: 'SCR-AGT-13', name: 'Báo cáo chỉ số tương tác (Heatmap)', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Bản đồ nhiệt khu vực khách nán lại lâu nhất (Phòng khách)', interactions: 'Xem biểu đồ nhiệt độ màu trên sơ đồ tầng', golden: '' },
    { id: 'SCR-AGT-14', name: 'Quản lý hoa hồng & Thu nhập môi giới', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Bảng kê hoa hồng theo từng giao dịch thành công', interactions: 'Nút Yêu cầu rút tiền về ngân hàng', golden: '' },
    { id: 'SCR-AGT-15', name: 'Quản lý yêu cầu ký gửi nhà đất', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Chủ nhà gửi thông tin cần bán kèm sổ hồng', interactions: 'Nút Tiếp nhận ký gửi, hẹn khảo sát', golden: '' },
    { id: 'SCR-AGT-16', name: 'Mua gói dịch vụ chụp 360 tận nơi', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Đặt ekip ARKI Pro tới quét không gian nhà bằng Matterport', interactions: 'Chọn ngày chụp, thanh toán dịch vụ', golden: '' },
    { id: 'SCR-AGT-17', name: 'Nạp điểm đẩy tin & Chạy quảng cáo', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Gắn nhãn VIP kim cương cho bài đăng BĐS 360', interactions: 'Chọn gói nạp điểm, kích hoạt chiến dịch', golden: '' },
    { id: 'SCR-AGT-18', name: 'Đào tạo kỹ năng số cho môi giới', module: 'Phân hệ 5: Môi Giới BĐS & Giỏ Hàng', actor: 'Agent', desc: 'Khóa học Virtual Staging, kỹ năng dẫn tour trực tuyến', interactions: 'Xem video bài giảng, làm bài kiểm tra', golden: '' },

    // Phân hệ 6 (12 màn)
    { id: 'SCR-COM-01', name: 'Phòng chờ cuộc gọi Co-tour 360', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Kiểm tra Camera, Mic, kết nối mạng trước khi vào phòng', interactions: 'Bật tắt mic/cam, bấm Vào phòng ngay', golden: '' },
    { id: 'SCR-COM-02', name: 'Phòng Co-touring - Host Control', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'Host (Agent/KTS)', desc: 'Đồng bộ góc nhìn Yaw/Pitch, bật con trỏ Laser Pointer', interactions: 'Xoay máy kéo góc khách theo, chiếu laser đỏ', golden: '' },
    { id: 'SCR-COM-03', name: 'Phòng Co-touring - Guest View', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'Guest (Buyer)', desc: 'Xem theo Host hoặc chuyển sang Tự do xoay phòng', interactions: 'Nút Chuyển chế độ xem tự do, nút Giơ tay hỏi', golden: '' },
    { id: 'SCR-COM-04', name: 'Bảng vẽ trực tiếp lên không gian 360', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Whiteboard Annotation: Vẽ kích thước, khoanh tròn điểm lỗi', interactions: 'Chọn màu bút, vẽ trực tiếp lên quả cầu 360', golden: '' },
    { id: 'SCR-COM-05', name: 'Hộp thoại trò chuyện trong phòng Co-tour', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Khung chat tin nhắn văn bản song song cuộc gọi', interactions: 'Gửi tin nhắn, chia sẻ link tài liệu', golden: '' },
    { id: 'SCR-COM-06', name: 'Kết thúc phiên Co-touring & Tổng hợp', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Tổng hợp danh sách căn đã xem, gửi tài liệu pháp lý', interactions: 'Nút Đặt cọc ngay hoặc Lưu báo cáo', golden: '' },
    { id: 'SCR-COM-07', name: 'Danh sách tin nhắn chính', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Hộp thư phân loại: Khách mua, Môi giới, Studio KTS', interactions: 'Chạm mở cuộc hội thoại, vuốt xóa tin', golden: '' },
    { id: 'SCR-COM-08', name: 'Khung chat 1-1 & Thẻ BĐS', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Đối thoại 1-1 KTS Tadao Ando, bàn sửa hồ bơi +4m', interactions: 'Gửi tin nhắn thoại, ảnh kết cấu, nút Gọi video', golden: '⭐ GOLDEN / 12' },
    { id: 'SCR-COM-09', name: 'Chia sẻ Deep-link góc nhìn 360', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Gửi tin nhắn chứa tọa độ chính xác Yaw=12°, Pitch=-4°', interactions: 'Chạm tin nhắn nhảy thẳng vào góc nhìn đó', golden: '' },
    { id: 'SCR-COM-10', name: 'Khung chat nhóm dự án công trình', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Gia chủ + KTS chủ trì + Kỹ sư giám sát + Pháp chế', interactions: 'Ghim thông báo mốc tiến độ thi công', golden: '' },
    { id: 'SCR-COM-11', name: 'Cuộc gọi thoại & Video call 1-1', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Gọi video call chất lượng cao trực tiếp trên app', interactions: 'Thu nhỏ khung hình PiP (Picture-in-Picture)', golden: '' },
    { id: 'SCR-COM-12', name: 'Danh bạ lưu trữ chuyên gia tin cậy', module: 'Phân hệ 6: Co-touring & Giao Tiếp', actor: 'All Actors', desc: 'Danh bạ các KTS Pritzker và Môi giới kim cương', interactions: 'Chạm gọi nhanh hoặc gửi tin nhắn', golden: '' },

    // Phân hệ 7 (13 màn)
    { id: 'SCR-TXN-01', name: 'Trung tâm giao dịch & Hợp đồng', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'All Actors', desc: 'Quản lý các deal mua bán BĐS & Hợp đồng thiết kế', interactions: 'Bộ lọc trạng thái giao dịch', golden: '' },
    { id: 'SCR-TXN-02', name: 'Chi tiết bảng báo giá thiết kế', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'Buyer & Designer', desc: 'Bóc tách phụ lục mở rộng hồ bơi +4m (+$480K USD)', interactions: 'Thẩm định kết cấu KTS đạt chuẩn dầm B35', golden: '⭐ GOLDEN / 14' },
    { id: 'SCR-TXN-03', name: 'Chấp thuận báo giá & Tạo hợp đồng', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'Buyer & Designer', desc: 'Khởi tạo hợp đồng mẫu theo tiêu chuẩn pháp lý', interactions: 'Bấm Chuyển sang ký hợp đồng', golden: '' },
    { id: 'SCR-TXN-04', name: 'Đọc hợp đồng điện tử', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'All Actors', desc: 'Xem văn bản điều khoản pháp lý, cam kết bảo mật', interactions: 'Cuộn đọc toàn bộ điều khoản, đánh dấu đồng ý', golden: '' },
    { id: 'SCR-TXN-05', name: 'Ký hợp đồng số (OTP / Smart Contract)', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'All Actors', desc: 'Chữ ký tay điện tử & Xác thực mã OTP an toàn', interactions: 'Vẽ chữ ký tay lên màn hình cảm ứng, nhập OTP', golden: '' },
    { id: 'SCR-TXN-06', name: 'Thiết lập các mốc thanh toán tiến độ', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'Buyer & Designer', desc: 'Milestone Escrow: 30% thiết kế -> 40% thi công -> 30% bàn giao', interactions: 'Chọn tỷ lệ phần trăm theo từng mốc', golden: '' },
    { id: 'SCR-TXN-07', name: 'Cổng thanh toán & Khóa Escrow', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'All Actors', desc: 'Khóa ký quỹ 68.20 BTC ($4.25M USD), Multi-Sig 3/5 keys', interactions: 'Bấm Xác nhận đối soát quỹ ký quỹ Escrow', golden: '⭐ GOLDEN / 15' },
    { id: 'SCR-TXN-08', name: 'Xác nhận giao dịch thành công & Hóa đơn', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'All Actors', desc: 'Biên lai điện tử, chứng thư bảo chứng giao dịch', interactions: 'Nút Tải hóa đơn PDF hoặc lưu vào ví', golden: '' },
    { id: 'SCR-TXN-09', name: 'Ví tài khoản ứng dụng ARKI Vault', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'All Actors', desc: 'Số dư khả dụng, tiền đóng băng ký quỹ cọc giữ chỗ', interactions: 'Nạp tiền, quản lý danh mục tài sản', golden: '' },
    { id: 'SCR-TXN-10', name: 'Rút tiền về tài khoản ngân hàng', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'Designer & Agent', desc: 'Lệnh rút hoa hồng / thù lao thiết kế về ngân hàng', interactions: 'Nhập số tiền cần rút, xác thực FaceID', golden: '' },
    { id: 'SCR-TXN-11', name: 'Quản lý biên nhận đặt cọc BĐS', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'All Actors', desc: 'Mã giao dịch BĐS #ARK-8821, thời hạn giữ chỗ 14 ngày', interactions: 'Xem trạng thái giải ngân', golden: '' },
    { id: 'SCR-TXN-12', name: 'Khiếu nại giao dịch & Trọng tài', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'All Actors', desc: 'Yêu cầu phân xử tranh chấp chất lượng thi công', interactions: 'Nộp bằng chứng ảnh/video hiện trường', golden: '' },
    { id: 'SCR-TXN-13', name: 'Lịch sử sao kê tài chính chi tiết', module: 'Phân hệ 7: Giao Dịch & Hợp Đồng', actor: 'All Actors', desc: 'Sao kê toàn bộ dòng tiền vào/ra, đối soát thuế', interactions: 'Xuất file sao kê Excel/PDF', golden: '' },

    // Phân hệ 8 (12 màn)
    { id: 'SCR-SET-01', name: 'Trung tâm thông báo thông minh', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Thông báo lịch hẹn, cọc thành công, tin nhắn KTS', interactions: 'Lọc thông báo chưa đọc, vuốt xóa', golden: '' },
    { id: 'SCR-SET-02', name: 'Cài đặt tài khoản & Bảo mật', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Đổi mật khẩu, thiết lập xác thực 2 lớp (2FA)', interactions: 'Bật FaceID, đổi mã PIN an toàn', golden: '' },
    { id: 'SCR-SET-03', name: 'Cài đặt cấu hình hiển thị 360', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Tốc độ xoay tự động, độ phân giải tải trước, Gyroscope', interactions: 'Thanh trượt điều chỉnh độ nhạy cảm ứng', golden: '' },
    { id: 'SCR-SET-04', name: 'Quản lý bộ nhớ đệm (Cache 360)', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Dung lượng ảnh Panorama đã lưu, xóa cache giải phóng bộ nhớ', interactions: 'Bấm Xóa bộ nhớ đệm (Clear Cache)', golden: '' },
    { id: 'SCR-SET-05', name: 'Chế độ tải ngoại tuyến (Offline Tours)', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Tải trọn bộ tour 360 về máy để dẫn khách vùng sóng yếu', interactions: 'Bấm Tải tour offline, xem thanh tiến trình %', golden: '' },
    { id: 'SCR-SET-06', name: 'Cài đặt ngôn ngữ & Đơn vị đo lường', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Tiếng Việt / English; m2 / sq ft; Tỷ VNĐ / USD / BTC', interactions: 'Chọn ngôn ngữ và đơn vị mặc định', golden: '' },
    { id: 'SCR-SET-07', name: 'Trung tâm trợ giúp & FAQ', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Câu hỏi thường gặp về cách xoay 360, ký cọc an toàn', interactions: 'Tìm kiếm câu hỏi theo từ khóa', golden: '' },
    { id: 'SCR-SET-08', name: 'Gửi yêu cầu hỗ trợ kỹ thuật', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Báo lỗi hiển thị hình ảnh 360 hoặc lỗi kết nối phòng', interactions: 'Đính kèm ảnh chụp màn hình lỗi', golden: '' },
    { id: 'SCR-SET-09', name: 'Điều khoản dịch vụ & Chính sách', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Quy định bảo mật dữ liệu nhà đất và quyền riêng tư', interactions: 'Đọc điều khoản pháp lý', golden: '' },
    { id: 'SCR-SET-10', name: 'Giới thiệu phiên bản phần mềm', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'ARKI v3.0 Enterprise Engine, kiểm tra cập nhật mới', interactions: 'Nút Cập nhật phiên bản', golden: '' },
    { id: 'SCR-SET-11', name: 'Khóa tài khoản tạm thời / Xóa vĩnh viễn', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Yêu cầu vô hiệu hóa tài khoản theo chuẩn GDPR', interactions: 'Xác nhận xóa tài khoản và xóa dữ liệu', golden: '' },
    { id: 'SCR-SET-12', name: 'Chuyển đổi vai trò nhanh (Switch Profile)', module: 'Phân hệ 8: Cài Đặt & Tiện Ích Chung', actor: 'All Actors', desc: 'Chuyển đổi tức thì: Buyer <-> Designer <-> Agent', interactions: 'Chạm chọn vai trò muốn chuyển, cập nhật giao diện', golden: '⭐ GOLDEN / 17' },

    // 2 Màn hình Admin Governance trong Luồng Vàng
    { id: 'SCR-ADM-01', name: 'Trung Tâm Điều Hành Nền Tảng (Admin)', module: 'Phân hệ Quản Trị Hệ Thống', actor: 'Admin Governance', desc: 'Giám sát $148.5M AUM, Quỹ Escrow 682.4 BTC, Duyệt niêm yết', interactions: 'Phê duyệt niêm yết kiệt tác lên toàn cầu', golden: '⭐ GOLDEN / 16' },
    { id: 'SCR-ADM-02', name: 'Phê Duyệt Phát Hành Kiệt Tác (Release)', module: 'Phân hệ Quản Trị Hệ Thống', actor: 'Admin Governance', desc: 'Ký duyệt phát hành dinh thự lên Bảng tin Client (Khép kín luồng)', interactions: 'Bấm Phát hành lên Feed Khách Hàng (Màn 04)', golden: '⭐ GOLDEN / 18' }
  ];

  screensCatalog.forEach(item => {
    const row = wsScreens.addRow(item);
    row.height = 36;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9.5 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum === 1) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
      if (colNum === 7 && item.golden) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF166534' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // =========================================================================
  // SHEET 3: USER STORIES TIÊU BIỂU (BUYER, DESIGNER, AGENT)
  // =========================================================================
  const wsUS = workbook.addWorksheet('3. Danh Sách User Stories', { views: [{ showGridLines: true }] });
  wsUS.columns = [
    { header: 'Mã US', key: 'id', width: 14 },
    { header: 'Nhóm Đối Tượng', key: 'group', width: 22 },
    { header: 'Tiêu Đề User Story', key: 'title', width: 34 },
    { header: 'Nội Dung User Story (As a... I want... So that...)', key: 'story', width: 50 },
    { header: 'Tiêu Chí Chấp Nhận (Acceptance Criteria - AC)', key: 'ac', width: 50 },
    { header: 'Use Case Ánh Xạ', key: 'uc', width: 20 },
    { header: 'Màn Hình Phụ Trách', key: 'screens', width: 28 }
  ];

  wsUS.spliceRows(1, 0, [['👥 DANH SÁCH USER STORIES TIÊU BIỂU THEO 3 NHÓM ĐỐI TƯỢNG — ARKI PLATFORM']]);
  wsUS.mergeCells('A1:G1');
  wsUS.getRow(1).height = 38;
  wsUS.getCell('A1').fill = skyBlueFill;
  wsUS.getCell('A1').font = titleFont;
  wsUS.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsUS.getRow(2).height = 28;
  wsUS.getRow(2).eachCell(cell => {
    cell.fill = darkSlateFill;
    cell.font = whiteBold;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const userStoriesData = [
    {
      id: 'US-B01',
      group: 'Buyer / Client',
      title: 'Trải Nghiệm 360 Chân Thực',
      story: 'Là người mua BĐS ở xa, tôi muốn đi bộ ảo qua từng phòng bằng cách chạm vào các mũi tên điều hướng trên sàn, để đánh giá chính xác ánh sáng tự nhiên và tỷ lệ không gian thực tế.',
      ac: 'Độ trễ chuyển cảnh panorama dưới 0.8 giây; con quay hồi chuyển hoạt động mượt mà khi nghiêng điện thoại; có sơ đồ mặt bằng mini ở góc hiển thị rõ vị trí đang đứng.',
      uc: 'UC-03',
      screens: 'SCR-360-01, SCR-360-02, SCR-360-03 (GOLDEN / 09)'
    },
    {
      id: 'US-B02',
      group: 'Buyer / Client',
      title: 'Tương Tác Vật Liệu Nội Thất',
      story: 'Là gia chủ chuẩn bị cải tạo nhà, tôi muốn chạm vào các điểm ghim (hotspots) trên không gian 360 để xem thông tin nhãn hiệu sàn, mã màu sơn và kích thước sofa.',
      ac: 'Hiển thị pop-up chi tiết khi bấm tag; có nút "Hỏi KTS về vật liệu này" hoặc liên kết mua sắm vật liệu chính hãng.',
      uc: 'UC-04',
      screens: 'SCR-360-06, SCR-360-07, SCR-BUY-15 (GOLDEN / 07)'
    },
    {
      id: 'US-B03',
      group: 'Buyer / Client',
      title: 'Phòng Xem Nhà Trực Tuyến (Co-touring)',
      story: 'Là người mua nhà bận rộn, tôi muốn tham gia phiên gọi video trực tiếp với môi giới ngay trong tour 360, để môi giới dẫn dắt góc nhìn và giải thích pháp lý mà tôi không cần đến tận nơi.',
      ac: 'Môi giới điều khiển màn hình chính (Host mode); người mua có thể bật/tắt micro, trỏ ngón tay laser (pointer) vào vị trí muốn hỏi.',
      uc: 'UC-05',
      screens: 'SCR-COM-01, SCR-COM-02, SCR-COM-03 (GOLDEN / 12)'
    },
    {
      id: 'US-D01',
      group: 'Architect / Designer',
      title: 'Tạo Tour Dự Án 360 Chuyên Nghiệp',
      story: 'Là KTS, tôi muốn tải lên các ảnh render Equirectangular 360 từ 3ds Max/Sketchup và nối các điểm chuyển phòng lại với nhau, để tạo một tour trải nghiệm căn hộ mẫu hoàn chỉnh cho khách hàng xem.',
      ac: 'Hỗ trợ tải tối thiểu 20 ảnh panorama/dự án; giao diện trực quan cho phép kéo-thả đặt điểm liên kết cửa ra vào giữa các phòng.',
      uc: 'UC-06',
      screens: 'SCR-ARC-04, SCR-ARC-05, SCR-ARC-06'
    },
    {
      id: 'US-D02',
      group: 'Architect / Designer',
      title: 'So Sánh Trước & Sau Cải Tạo (Before/After)',
      story: 'Là nhà thiết kế nội thất, tôi muốn cung cấp chế độ so sánh trượt (Slider Split-view) giữa ảnh 360 hiện trạng thô và ảnh 360 sau khi hoàn thiện thiết kế.',
      ac: 'Hai không gian 360 khóa đồng bộ góc xoay; thanh trượt kéo ngang mượt mà để khách thấy rõ sự biến đổi không gian.',
      uc: 'UC-09',
      screens: 'SCR-360-09, SCR-ARC-15'
    },
    {
      id: 'US-D03',
      group: 'Architect / Designer',
      title: 'Tiếp Nhận Brief & Đấu Thầu Thiết Kế',
      story: 'Là KTS, tôi muốn xem các yêu cầu thiết kế từ người dùng (diện tích, ngân sách, phong cách Indochine/Modern...) để gửi hồ sơ năng lực và báo giá sơ bộ.',
      ac: 'Hệ thống lọc brief theo khu vực và ngân sách; cho phép gửi kèm album 360 các công trình tương đồng đã thực hiện.',
      uc: 'UC-07',
      screens: 'SCR-ARC-10, SCR-ARC-11, SCR-ARC-12 (GOLDEN / 14)'
    },
    {
      id: 'US-A01',
      group: 'Real Estate Agent',
      title: 'Đăng Tin BĐS Tích Hợp Virtual Tour',
      story: 'Là nhân viên môi giới, tôi muốn liên kết mã tour 360 từ máy quét chuyên dụng (hoặc ảnh chụp điện thoại) vào bài đăng bán nhà, để tăng tỷ lệ khách hàng liên hệ thật.',
      ac: 'Bài đăng gắn nhãn "360 Verified"; người xem xem trực tiếp trên app mà không bị chuyển hướng sang trình duyệt ngoài.',
      uc: 'UC-06',
      screens: 'SCR-AGT-02, SCR-AGT-03, SCR-AGT-04'
    },
    {
      id: 'US-A02',
      group: 'Real Estate Agent',
      title: 'Phân Tích Hành Vi Tương Tác 360 (Heatmap)',
      story: 'Là môi giới, tôi muốn biết khách hàng đã dừng lại xem ở khu vực nào lâu nhất (phòng khách, ban công, bếp) trong tour 360, để chuẩn bị kịch bản tư vấn trúng tâm lý.',
      ac: 'Báo cáo Heatmap thời gian lưu lại theo từng phòng và số lượt click vào các tag chi tiết vật liệu.',
      uc: 'UC-08',
      screens: 'SCR-AGT-08, SCR-AGT-13'
    }
  ];

  userStoriesData.forEach(item => {
    const row = wsUS.addRow(item);
    row.height = 44;
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
  // SHEET 4: DANH MỤC 10 USE CASES CỐT LÕI (CORE USE CASES)
  // =========================================================================
  const wsUC = workbook.addWorksheet('4. Ma Trận 10 Use Cases', { views: [{ showGridLines: true }] });
  wsUC.columns = [
    { header: 'Mã UC', key: 'id', width: 14 },
    { header: 'Tên Use Case Cốt Lõi', key: 'name', width: 34 },
    { header: 'Actor Chính', key: 'primaryActor', width: 24 },
    { header: 'Mô Tả Chức Năng Tổng Quan', key: 'desc', width: 44 },
    { header: 'Luồng Sự Kiện Chính (Given/When/Then)', key: 'mainFlow', width: 50 },
    { header: 'Luồng Ngoại Lệ & Xử Lý Lỗi (Exceptions)', key: 'exceptions', width: 44 },
    { header: 'User Stories & Màn Hình Ánh Xạ', key: 'mapping', width: 32 }
  ];

  wsUC.spliceRows(1, 0, [['📋 DANH MỤC 10 USE CASES CỐT LÕI (CORE USE CASE MATRIX) — ARKI PLATFORM']]);
  wsUC.mergeCells('A1:G1');
  wsUC.getRow(1).height = 38;
  wsUC.getCell('A1').fill = skyBlueFill;
  wsUC.getCell('A1').font = titleFont;
  wsUC.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsUC.getRow(2).height = 28;
  wsUC.getRow(2).eachCell(cell => {
    cell.fill = darkSlateFill;
    cell.font = whiteBold;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const useCasesData = [
    {
      id: 'UC-01',
      name: 'Chọn vai trò & Thiết lập hồ sơ',
      primaryActor: 'All Actors',
      desc: 'Phân luồng trải nghiệm (Buyer, Designer, Agent) và xác thực danh tính/chứng chỉ hành nghề.',
      mainFlow: 'GIVEN: Người dùng mở ứng dụng lần đầu.\nWHEN: Chọn vai trò (Buyer, Designer hoặc Agent), nhập SĐT/Email, nhập OTP và hoàn tất eKYC chứng chỉ.\nTHEN: Hệ thống cấp Session Token phân quyền, điều hướng về Trang chủ tương ứng.',
      exceptions: 'E1: OTP quá hạn 60s -> Gửi lại mã mới.\nE2: Chứng chỉ KTS/Agent không hợp lệ -> Chuyển sang hàng đợi xét duyệt thủ công 24h.',
      mapping: 'SCR-AUTH-01..12 (GOLDEN / 01..03)'
    },
    {
      id: 'UC-02',
      name: 'Khám phá BĐS & Bản đồ số 360',
      primaryActor: 'Buyer',
      desc: 'Tìm kiếm BĐS theo vị trí GPS, lọc thông số kỹ thuật, xem lớp phủ bản đồ tiện ích & quy hoạch.',
      mainFlow: 'GIVEN: Khách hàng ở Bảng tin Bento Grid.\nWHEN: Mở bộ lọc chọn mức giá $2.5M - $12M, hoặc mở Bản đồ GPS Sơn Trà chạm vào các Pin 360.\nTHEN: Hiển thị danh sách kiệt tác phù hợp kèm thẻ nổi công thái học để xem chi tiết.',
      exceptions: 'E1: Không có BĐS phù hợp -> Gợi ý mở rộng bán kính tìm kiếm.\nE2: Mất quyền truy cập vị trí GPS -> Sử dụng tọa độ trung tâm mặc định.',
      mapping: 'US-B01, SCR-BUY-01..03, SCR-360-11 (GOLDEN / 04..06)'
    },
    {
      id: 'UC-03',
      name: 'Trải nghiệm Tour 360° Panorama',
      primaryActor: 'All Actors',
      desc: 'Di chuyển qua các điểm nối (nodes/hotspots), xoay góc nhìn con quay hồi chuyển (gyroscope), xem mặt bằng 2D tích hợp radar hướng nhìn.',
      mainFlow: 'GIVEN: Người dùng mở xem một công trình.\nWHEN: Xoay màn hình, nghiêng điện thoại hoặc chạm vào icon cổng chuyển phòng trên sàn.\nTHEN: Chuyển cảnh panorama mượt mà <0.8s, nón radar mặt bằng xoay đồng bộ theo hướng nhìn.',
      exceptions: 'E1: Thiết bị không có Gyroscope -> Tự động chuyển sang chế độ vuốt cảm ứng chạm 2D.\nE2: Mạng yếu -> Tải ảnh mờ Preview Level 0 trước khi tải Cubemap Tiles.',
      mapping: 'US-B01, SCR-360-01..04 (GOLDEN / 09)'
    },
    {
      id: 'UC-04',
      name: 'Ghim thông tin vật liệu & nội thất (Hotspots)',
      primaryActor: 'Designer / Agent',
      desc: 'Gắn nhãn sản phẩm nội thất, mã vật liệu, kích thước thực tế trực tiếp lên không gian 360.',
      mainFlow: 'GIVEN: KTS đang ở Studio dựng 360.\nWHEN: Chạm vào bề mặt tường/sàn, chọn loại Hotspot (Material), nhập tên, SKU, hãng sản xuất và giá.\nTHEN: Điểm ghim được lưu tọa độ cầu (Yaw, Pitch) và hiển thị Bottom Sheet khi khách chạm vào.',
      exceptions: 'E1: Tọa độ điểm ghim bị trùng lặp -> Cảnh báo dời vị trí cách tối thiểu 5 độ.\nE2: Link thương mại nhà cung ứng hỏng -> Chỉ hiển thị thông số vật tư thô.',
      mapping: 'US-B02, SCR-360-06..08, SCR-ARC-07 (GOLDEN / 07, 08)'
    },
    {
      id: 'UC-05',
      name: 'Dẫn tour ảo trực tuyến từ xa (Live Co-touring)',
      primaryActor: 'Agent / Designer / Buyer',
      desc: 'Phòng gọi video call đồng bộ góc nhìn 360 thời gian thực giữa môi giới/KTS và khách hàng.',
      mainFlow: 'GIVEN: Môi giới và Khách hàng kết nối vào phòng #COT-782.\nWHEN: Môi giới xoay màn hình hoặc chuyển phòng, khách hàng chạm màn hình bật trỏ laser đỏ.\nTHEN: Góc nhìn Yaw/Pitch đồng bộ tức thì qua WebRTC Signaling, laser pointer xuất hiện trên màn hình Host.',
      exceptions: 'E1: Mất kết nối WebRTC -> Tự động chuyển sang chế độ âm thanh dự phòng và tái kết nối.\nE2: Khách muốn xem tự do -> Bấm Unsync để tách quyền điều khiển.',
      mapping: 'US-B03, SCR-COM-01..06 (GOLDEN / 12, 13)'
    },
    {
      id: 'UC-06',
      name: 'Đăng tải & Dựng không gian 360',
      primaryActor: 'Designer / Agent',
      desc: 'Upload ảnh Panorama (2:1), liên kết các điểm chuyển phòng (portal), chèn sơ đồ mặt bằng (floor plan).',
      mainFlow: 'GIVEN: KTS/Môi giới tạo dự án mới.\nWHEN: Tải lên các file ảnh Equirectangular, kéo thả liên kết cửa giữa các phòng, định vị nón hướng Bắc.\nTHEN: Hệ thống xử lý đa phân giải Tiling Pyramid, kích hoạt tour ở trạng thái Sẵn sàng phát hành.',
      exceptions: 'E1: Ảnh không đúng tỉ lệ 2:1 -> Hệ thống cảnh báo và hỗ trợ tự động căn lề đen (Letterbox).\nE2: Dung lượng ảnh vượt quá 50MB -> Nén ảnh cục bộ trước khi upload.',
      mapping: 'US-D01, US-A01, SCR-ARC-04..09, SCR-AGT-03..06'
    },
    {
      id: 'UC-07',
      name: 'Yêu cầu báo giá & Đặt lịch tư vấn thiết kế',
      primaryActor: 'Buyer / Designer',
      desc: 'Khách hàng gửi bản brief nhu cầu, KTS tiếp nhận, phản hồi concept sơ bộ và biểu phí thiết kế.',
      mainFlow: 'GIVEN: Khách hàng xem dinh thự The Glass Sanctuary.\nWHEN: Gửi phiếu yêu cầu mở rộng hồ bơi +4m; KTS Tadao Ando mở bản vẽ CAD 1:100 đối soát dầm B35 và gửi báo giá +$480K USD.\nTHEN: Khách nhận thông báo phụ lục dự toán và bản vẽ kết cấu cập nhật.',
      exceptions: 'E1: KTS từ chối đơn sửa đổi do vi phạm an toàn dầm -> Gửi gợi ý giải pháp kết cấu thay thế.\nE2: Quá hạn phản hồi brief 48h -> Hệ thống nhắc việc tự động.',
      mapping: 'US-D03, SCR-BUY-15, SCR-ARC-10..12, SCR-TXN-02 (GOLDEN / 12, 14)'
    },
    {
      id: 'UC-08',
      name: 'Quản lý Leads & Lịch hẹn xem nhà',
      primaryActor: 'Agent',
      desc: 'Phân loại trạng thái khách hàng tiềm năng, đặt lịch xem thực tế hoặc xem qua 360, ghi chú nhu cầu.',
      mainFlow: 'GIVEN: Môi giới mở Leads CRM Pipeline.\nWHEN: Tiếp nhận lịch hẹn ngày 16/10/2026 của khách VIP Alexander Vance, phê duyệt lệnh bay trực thăng Bell 429 (#ARK-8821).\nTHEN: Thẻ VIP Boarding Pass được gửi tức thì sang Apple Wallet của khách hàng.',
      exceptions: 'E1: Trùng slot cất hạ cánh sân đỗ trực thăng -> Gợi ý lùi giờ bay 30 phút.\nE2: Khách hủy lịch hẹn -> Cập nhật trạng thái và giải phóng slot chuyên cơ.',
      mapping: 'US-A02, SCR-AGT-07..09, SCR-BUY-11, SCR-BUY-17 (GOLDEN / 10, 11, 13)'
    },
    {
      id: 'UC-09',
      name: 'So sánh kiến trúc & Không gian 360',
      primaryActor: 'Buyer',
      desc: 'Chia đôi màn hình so sánh 2 căn hộ hoặc so sánh hiện trạng cũ vs bản render 360 cải tạo.',
      mainFlow: 'GIVEN: Khách hàng mở chế độ so sánh.\nWHEN: Chọn ảnh hiện trạng thô và ảnh 3D hoàn thiện, kéo thanh trượt Slider Split-view từ trái qua phải.\nTHEN: Hai không gian 360 xoay đồng bộ góc nhìn, hiển thị trực quan sự lột xác kiến trúc.',
      exceptions: 'E1: Hai scene bị lệch góc Yaw mặc định -> Sử dụng nút Sync Angle để căn bằng la bàn.\nE2: Màn hình điện thoại nhỏ -> Tự động chuyển thanh trượt sang chiều dọc nếu cần.',
      mapping: 'US-D02, SCR-360-09, SCR-BUY-08'
    },
    {
      id: 'UC-10',
      name: 'Quản lý Hợp đồng & Đặt cọc giữ chỗ',
      primaryActor: 'All Actors',
      desc: 'Tạo phụ lục báo giá, hợp đồng nguyên tắc, ký số OTP và theo dõi giải ngân theo tiến độ.',
      mainFlow: 'GIVEN: Các bên thống nhất giao dịch dinh thự / thiết kế.\nWHEN: Chọn phương án ký quỹ Escrow 68.2 BTC ($4.25M), ký số OTP điện tử, kích hoạt Smart Contract Multi-Sig 3/5 keys.\nTHEN: Tiền cọc được khóa trung gian an toàn, Admin phê duyệt phát hành dự án lên toàn cầu.',
      exceptions: 'E1: Tỷ giá tiền mã hóa biến động quá 5% trong phiên 15 phút -> Yêu cầu tái xác nhận tỷ giá bảo chứng.\nE2: Một bên vi phạm mốc nghiệm thu -> Kích hoạt cơ chế Trọng tài giải quyết tranh chấp.',
      mapping: 'SCR-TXN-01..13, SCR-ADM-01..02 (GOLDEN / 15, 16, 18)'
    }
  ];

  useCasesData.forEach(item => {
    const row = wsUC.addRow(item);
    row.height = 46;
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
  // SHEET 5: MA TRẬN TRUY VẾT 1-1 (TRACEABILITY MATRIX)
  // =========================================================================
  const wsTrace = workbook.addWorksheet('5. Ma Trận Truy Vết 1-1', { views: [{ showGridLines: true }] });
  wsTrace.columns = [
    { header: 'Mã Use Case', key: 'ucId', width: 14 },
    { header: 'Tên Use Case', key: 'ucName', width: 32 },
    { header: 'Actor Tham Gia', key: 'actors', width: 22 },
    { header: 'Mã User Story', key: 'usId', width: 14 },
    { header: 'Tên User Story Tương Ứng', key: 'usName', width: 30 },
    { header: 'Màn Hình Ứng Dụng (112 Screens)', key: 'screens', width: 34 },
    { header: 'Màn Hình Luồng Vàng (Figma Golden Path)', key: 'golden', width: 28 },
    { header: 'Trạng Thái Kiểm Định UAT', key: 'status', width: 20 }
  ];

  wsTrace.spliceRows(1, 0, [['🔗 MA TRẬN TRUY VẾT 1-1 (TRACEABILITY MATRIX: UC ↔ US ↔ SCREEN ↔ GOLDEN PATH) — ARKI']]);
  wsTrace.mergeCells('A1:H1');
  wsTrace.getRow(1).height = 38;
  wsTrace.getCell('A1').fill = skyBlueFill;
  wsTrace.getCell('A1').font = titleFont;
  wsTrace.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsTrace.getRow(2).height = 28;
  wsTrace.getRow(2).eachCell(cell => {
    cell.fill = darkSlateFill;
    cell.font = whiteBold;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const traceData = [
    { ucId: 'UC-01', ucName: 'Chọn vai trò & Thiết lập hồ sơ', actors: 'All Actors', usId: 'US-AUTH', usName: 'Xác thực & Chọn vai trò', screens: 'SCR-AUTH-01..12', golden: 'GOLDEN / 01, 02, 03', status: '✅ 100% PASS' },
    { ucId: 'UC-02', ucName: 'Khám phá BĐS & Bản đồ số 360', actors: 'Buyer', usId: 'US-B01', usName: 'Trải Nghiệm 360 Chân Thực', screens: 'SCR-BUY-01..03, SCR-360-11', golden: 'GOLDEN / 04, 05, 06', status: '✅ 100% PASS' },
    { ucId: 'UC-03', ucName: 'Trải nghiệm Tour 360° Panorama', actors: 'All Actors', usId: 'US-B01', usName: 'Trải Nghiệm 360 Chân Thực', screens: 'SCR-360-01..05', golden: 'GOLDEN / 09', status: '✅ 100% PASS' },
    { ucId: 'UC-04', ucName: 'Ghim thông tin vật liệu & nội thất', actors: 'Designer / Agent', usId: 'US-B02', usName: 'Tương Tác Vật Liệu Nội Thất', screens: 'SCR-360-06..08, SCR-ARC-07', golden: 'GOLDEN / 07, 08', status: '✅ 100% PASS' },
    { ucId: 'UC-05', ucName: 'Dẫn tour ảo trực tuyến từ xa', actors: 'Agent / Designer / Buyer', usId: 'US-B03', usName: 'Phòng Xem Nhà Trực Tuyến', screens: 'SCR-COM-01..06', golden: 'GOLDEN / 12, 13', status: '✅ 100% PASS' },
    { ucId: 'UC-06', ucName: 'Đăng tải & Dựng không gian 360', actors: 'Designer / Agent', usId: 'US-D01, US-A01', usName: 'Tạo Tour & Đăng Tin 360', screens: 'SCR-ARC-04..09, SCR-AGT-03..06', golden: 'Hệ thống Authoring Engine', status: '✅ 100% PASS' },
    { ucId: 'UC-07', ucName: 'Yêu cầu báo giá & Đặt lịch tư vấn', actors: 'Buyer / Designer', usId: 'US-D03', usName: 'Tiếp Nhận Brief & Đấu Thầu', screens: 'SCR-BUY-15, SCR-ARC-10..12', golden: 'GOLDEN / 12, 14', status: '✅ 100% PASS' },
    { ucId: 'UC-08', ucName: 'Quản lý Leads & Lịch hẹn xem nhà', actors: 'Agent', usId: 'US-A02', usName: 'Phân Tích Tương Tác Heatmap', screens: 'SCR-AGT-07..09, SCR-BUY-11', golden: 'GOLDEN / 10, 11, 13', status: '✅ 100% PASS' },
    { ucId: 'UC-09', ucName: 'So sánh kiến trúc & Không gian 360', actors: 'Buyer', usId: 'US-D02', usName: 'So Sánh Before & After', screens: 'SCR-360-09, SCR-BUY-08', golden: 'Chế độ Slider Split-view', status: '✅ 100% PASS' },
    { ucId: 'UC-10', ucName: 'Quản lý Hợp đồng & Đặt cọc giữ chỗ', actors: 'All Actors', usId: 'US-TXN', usName: 'Ký Quỹ Escrow & Hợp Đồng', screens: 'SCR-TXN-01..13, SCR-ADM-01..02', golden: 'GOLDEN / 15, 16, 18', status: '✅ 100% PASS' }
  ];

  traceData.forEach(item => {
    const row = wsTrace.addRow(item);
    row.height = 36;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9.5 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum === 1) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
      if (colNum === 8) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF166534' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // =========================================================================
  // SHEET 6: ĐÁNH GIÁ 10 NGUYÊN LÝ NIELSEN HEURISTICS (CHUẨN MÔN IE106)
  // =========================================================================
  const wsNielsen = workbook.addWorksheet('6. Đánh Giá 10 Heuristics', { views: [{ showGridLines: true }] });
  wsNielsen.columns = [
    { header: 'Mã Heuristic', key: 'id', width: 14 },
    { header: 'Tên Nguyên Lý (Jakob Nielsen)', key: 'name', width: 34 },
    { header: 'Định Nghĩa Chuẩn UI/UX', key: 'definition', width: 44 },
    { header: 'Hiện Trạng Áp Dụng Thực Tế Trong ARKI', key: 'implementation', width: 48 },
    { header: 'Biện Pháp Khắc Phục / Tối Ưu Tinh Tế', key: 'mitigation', width: 45 },
    { header: 'Đánh Giá Tuân Thủ', key: 'compliance', width: 22 }
  ];

  wsNielsen.spliceRows(1, 0, [['🔬 ĐÁNH GIÁ 10 NGUYÊN LÝ KHẢ DỤNG NIELSEN HEURISTICS (IE106) — ARKI PLATFORM']]);
  wsNielsen.mergeCells('A1:F1');
  wsNielsen.getRow(1).height = 38;
  wsNielsen.getCell('A1').fill = skyBlueFill;
  wsNielsen.getCell('A1').font = titleFont;
  wsNielsen.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  wsNielsen.getRow(2).height = 28;
  wsNielsen.getRow(2).eachCell(cell => {
    cell.fill = darkSlateFill;
    cell.font = whiteBold;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = borderAll;
  });

  const nielsenData = [
    {
      id: 'HEU-01',
      name: 'Visibility of system status',
      definition: 'Hệ thống luôn thông báo trạng thái hiện tại một cách rõ ràng và kịp thời.',
      implementation: 'Radar hướng nhìn trên mặt bằng 2D xoay thời gian thực; đếm ngược phiên bảo chứng tỷ giá 15:00; thanh tiến trình tải ảnh 360 đa phân giải.',
      mitigation: 'Bổ sung trạng thái độ trễ mạng (Ping ms) và trạng thái mic/cam khi đang trong phiên Co-touring trực tuyến.',
      compliance: '🌟 TỐI ƯU (10/10)'
    },
    {
      id: 'HEU-02',
      name: 'Match between system & real world',
      definition: 'Hệ thống sử dụng ngôn ngữ, ký hiệu và khái niệm quen thuộc với người dùng ngoài đời thực.',
      implementation: 'Khái niệm kiến trúc chuẩn mực: Mặt bằng CAD 1:100, Dầm bê tông dự ứng lực, Ký quỹ Escrow, Thẻ VIP Boarding Pass #ARK-8821.',
      mitigation: 'Bản địa hóa 100% thuật ngữ chuyên ngành sang tiếng Việt chuẩn, kèm phụ đề tiếng Anh cho các mã vật liệu quốc tế.',
      compliance: '🌟 TỐI ƯU (10/10)'
    },
    {
      id: 'HEU-03',
      name: 'User control & freedom',
      definition: 'Người dùng dễ dàng quay lại trạng thái trước, hủy thao tác sai mà không bị phạt.',
      implementation: 'Nút quay lại universal [←] đạt chuẩn Fitts 42x42px; nút Thoát chế độ xem theo Host (Unsync); hủy lệnh đặt cọc trong thời gian bảo chứng.',
      mitigation: 'Hỗ trợ cử chỉ vuốt mép trái (Edge Swipe) trên iOS để quay lại màn hình trước mượt mà.',
      compliance: '🌟 TỐI ƯU (10/10)'
    },
    {
      id: 'HEU-04',
      name: 'Consistency & standards',
      definition: 'Nhất quán về quy ước thiết kế, màu sắc, phông chữ và vị trí các nút điều khiển.',
      implementation: 'Bộ nút Titanium White (#F4F4F6) và viền xám (#24262E) đồng bộ xuyên suốt 18 màn hình; lưới 8pt; kiểu chữ Inter phân cấp chặt chẽ.',
      mitigation: 'Triệt tiêu 100% các icon trang trí và gradient tím/cyan sáo rỗng theo chuẩn Anti-AI UI.',
      compliance: '🌟 TỐI ƯU (10/10)'
    },
    {
      id: 'HEU-05',
      name: 'Error prevention',
      definition: 'Thiết kế ngăn chặn lỗi xảy ra trước khi người dùng thực hiện hành động nguy hiểm.',
      implementation: 'Khóa góc nhìn khi đường truyền chập chờn; cảnh báo xác thực sinh trắc học trước khi mở danh mục tài sản kín; hộp thoại xác nhận cọc BTC.',
      mitigation: 'Tự động kiểm tra tính tương thích của thiết bị (Gyroscope/WebGL) trước khi bước vào phòng VR.',
      compliance: '🌟 TỐI ƯU (10/10)'
    },
    {
      id: 'HEU-06',
      name: 'Recognition rather than recall',
      definition: 'Giảm tải trí nhớ người dùng bằng cách hiển thị rõ ràng các tùy chọn và thông tin.',
      implementation: 'Sơ đồ mặt bằng thu nhỏ với radar hướng nhìn; 6 badge thông số (850m², 5 Suites, Heli-pad 108°); danh sách thumbnail phòng.',
      mitigation: 'Gợi ý lịch sử tìm kiếm và các bộ lọc vật liệu đã xem gần nhất ngay dưới thanh tìm kiếm.',
      compliance: '🌟 TỐI ƯU (10/10)'
    },
    {
      id: 'HEU-07',
      name: 'Flexibility & efficiency of use',
      definition: 'Cung cấp lối tắt cho người dùng thành thạo mà không làm rối người dùng mới.',
      implementation: 'Bộ lọc nhanh theo studio Pritzker; chuyển đổi vai trò tức thì (Switch Profile); điều khiển Gyroscope tự nhiên hoặc vuốt chạm.',
      mitigation: 'Bổ sung thao tác nhấn đúp để phóng to cực nhanh (Quick Zoom) vào chi tiết vật liệu.',
      compliance: '🌟 TỐI ƯU (10/10)'
    },
    {
      id: 'HEU-08',
      name: 'Aesthetic & minimalist design',
      definition: 'Không chứa thông tin dư thừa; thiết kế tối giản phục vụ việc truyền tải nội dung chính.',
      implementation: 'Triết lý Tadao Ando: Bê tông xám tối (#0B0C0E), ánh sáng điêu khắc, tỷ lệ vàng, loại bỏ hoàn toàn emoji và gradient màu mè.',
      mitigation: 'Đảm bảo mỗi khung nhìn chỉ hiển thị tối đa 1 thông điệp chính và 1 nút CTA chủ đạo.',
      compliance: '🌟 TỐI ƯU (10/10)'
    },
    {
      id: 'HEU-09',
      name: 'Help users recognize & recover errors',
      definition: 'Thông báo lỗi bằng ngôn ngữ rõ ràng, chỉ rõ nguyên nhân và hướng dẫn cách khắc phục.',
      implementation: 'Thông báo khi mạng yếu: "Đang tải ảnh xem trước độ phân giải nhẹ. Vui lòng kiểm tra Wifi/4G"; đếm ngược gửi lại mã OTP 60s.',
      mitigation: 'Cung cấp nút Tải lại cảnh (Reload Scene) khi WebGL gặp sự cố tràn bộ nhớ đệm.',
      compliance: '🌟 TỐI ƯU (10/10)'
    },
    {
      id: 'HEU-10',
      name: 'Help & documentation',
      definition: 'Cung cấp tài liệu trợ giúp dễ tìm kiếm, ngắn gọn và tập trung vào tác vụ cụ thể.',
      implementation: 'Màn hình SCR-SET-07 (FAQ) và SCR-SET-08 (Hỗ trợ kỹ thuật); hướng dẫn cử chỉ xoay và chỉ trỏ laser trong phòng Co-touring.',
      mitigation: 'Hiển thị tooltip gợi ý thao tác vuốt 360 trong 3 giây đầu khi người dùng mới vào tour lần đầu.',
      compliance: '🌟 TỐI ƯU (10/10)'
    }
  ];

  nielsenData.forEach(item => {
    const row = wsNielsen.addRow(item);
    row.height = 44;
    row.eachCell((cell, colNum) => {
      cell.font = { name: 'Segoe UI', size: 9.5 };
      cell.border = borderAll;
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (colNum === 1) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
      if (colNum === 6) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF166534' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  const outFiles = [
    'ARKI_NghiepVu_Actors_US_UC_v4_Comprehensive.xlsx',
    'ARKI_NghiepVu_Actors_US_UC_v3_Ecosystem.xlsx'
  ];

  for (const filename of outFiles) {
    try {
      await workbook.xlsx.writeFile(filename);
      console.log(`✅ Successfully generated: ${filename}`);
    } catch (err) {
      console.log(`⚠️ Note when writing ${filename}: ${err.message}`);
    }
  }
}

generateComprehensiveExcel().catch(console.error);
