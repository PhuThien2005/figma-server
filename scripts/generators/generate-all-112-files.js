import fs from 'fs';
import path from 'path';

// Definition of all 112 Screens
const SCREENS = [
  // PHÂN HỆ 1: AUTH & ONBOARDING (12 màn)
  { id: 'scr_auth_01', code: 'SCR-AUTH-01', name: 'Splash Screen', dir: 'auth', title: 'A R K I', sub: 'KIẾN TRÚC & BẤT ĐỘNG SẢN 360', type: 'splash' },
  { id: 'scr_auth_02', code: 'SCR-AUTH-02', name: 'Onboarding 1 - Khám Phá 360', dir: 'auth', title: 'Khám Phá Không Gian Thực', sub: 'Công nghệ 360 Street View & Đa Chiều', type: 'onboarding' },
  { id: 'scr_auth_03', code: 'SCR-AUTH-03', name: 'Onboarding 2 - Kết Nối KTS', dir: 'auth', title: 'Hội Tụ KTS Pritzker', sub: 'Tadao Ando, Kengo Kuma, Zaha Hadid', type: 'onboarding' },
  { id: 'scr_auth_04', code: 'SCR-AUTH-04', name: 'Onboarding 3 - Đồng Hành Môi Giới', dir: 'auth', title: 'Xem Nhà Trực Tuyến 1-1', sub: 'Dẫn tour ảo cùng môi giới chuyên nghiệp', type: 'onboarding' },
  { id: 'scr_auth_05', code: 'SCR-AUTH-05', name: 'Chọn Vai Trò Tài Khoản', dir: 'auth', title: 'Chọn Vai Trò Của Bạn', sub: 'Phân luồng trải nghiệm hệ sinh thái', type: 'role_select' },
  { id: 'scr_auth_06', code: 'SCR-AUTH-06', name: 'Đăng Nhập Đa Kênh', dir: 'auth', title: 'Đăng Nhập ARKI', sub: 'Số điện thoại, Apple ID, Google', type: 'form_login' },
  { id: 'scr_auth_07', code: 'SCR-AUTH-07', name: 'Xác Thực OTP SMS/Email', dir: 'auth', title: 'Nhập Mã Xác Thực OTP', sub: 'Mã gồm 6 chữ số gửi về thiết bị', type: 'otp' },
  { id: 'scr_auth_08', code: 'SCR-AUTH-08', name: 'Đăng Ký Thông Tin Cơ Bản', dir: 'auth', title: 'Thiết Lập Hồ Sơ', sub: 'Họ tên, ảnh đại diện, mật khẩu', type: 'form_register' },
  { id: 'scr_auth_09', code: 'SCR-AUTH-09', name: 'eKYC - Chụp Căn Cước Công Dân', dir: 'auth', title: 'Xác Thực Danh Tính eKYC', sub: 'Quét 2 mặt CCCD / Hộ chiếu', type: 'ekyc_card' },
  { id: 'scr_auth_10', code: 'SCR-AUTH-10', name: 'eKYC - Sinh Trắc Học Face Liveness', dir: 'auth', title: 'Quét Khuôn Mặt Sinh Trắc', sub: 'Bảo mật Enclave chống giả mạo', type: 'ekyc_face' },
  { id: 'scr_auth_11', code: 'SCR-AUTH-11', name: 'Upload Chứng Chỉ Hành Nghề', dir: 'auth', title: 'Chứng Chỉ Chuyên Môn', sub: 'Thẻ môi giới BĐS hoặc giấy phép KTS', type: 'upload_cert' },
  { id: 'scr_auth_12', code: 'SCR-AUTH-12', name: 'Chờ Duyệt Hồ Sơ & Chính Sách', dir: 'auth', title: 'Hồ Sơ Đang Xét Duyệt', sub: 'ARKI Global phê duyệt trong 24h', type: 'status_pending' },

  // PHÂN HỆ 2: 360 TOUR ENGINE & BẢN ĐỒ (15 màn)
  { id: 'scr_360_01', code: 'SCR-360-01', name: 'Trình Diễn 360 Toàn Màn Hình', dir: 'tour360', title: '360° Panorama Viewer', sub: 'Đại sảnh thông tầng 7.2m', type: 'viewer360' },
  { id: 'scr_360_02', code: 'SCR-360-02', name: 'Menu Chuyển Phòng Trực Quan', dir: 'tour360', title: 'Danh Sách Phòng', sub: 'Thumbnail Carousel chuyển cảnh <0.8s', type: 'carousel_rooms' },
  { id: 'scr_360_03', code: 'SCR-360-03', name: 'Bản Đồ Mặt Bằng Tích Hợp (Radar)', dir: 'tour360', title: 'Mặt Bằng 2D & Radar', sub: 'Tầng trệt • Nón góc nhìn thời gian thực', type: 'floorplan_radar' },
  { id: 'scr_360_04', code: 'SCR-360-04', name: 'Chế Độ Búp Bê 3D (Dollhouse View)', dir: 'tour360', title: 'Mô Hình 3D Dollhouse', sub: 'Cắt lớp không gian xoay đa chiều', type: 'dollhouse' },
  { id: 'scr_360_05', code: 'SCR-360-05', name: 'Thước Đo Không Gian Ảo (Measure)', dir: 'tour360', title: 'Thước Đo Không Gian', sub: 'Khoảng cách thực tế giữa 2 điểm (m)', type: 'measurement' },
  { id: 'scr_360_06', code: 'SCR-360-06', name: 'Chi Tiết Hotspot - Vật Liệu Nội Thất', dir: 'tour360', title: 'Vật Liệu & Cấu Tạo', sub: 'Gạch Terrazzo Ý M-8802', type: 'hotspot_detail' },
  { id: 'scr_360_07', code: 'SCR-360-07', name: 'Chi Tiết Hotspot - Thiết Bị Gia Dụng', dir: 'tour360', title: 'Thiết Bị Cao Cấp', sub: 'Bếp từ Hafele Series 8', type: 'hotspot_appliance' },
  { id: 'scr_360_08', code: 'SCR-360-08', name: 'Chi Tiết Hotspot - Bản Vẽ CAD 1:100', dir: 'tour360', title: 'Bản Vẽ CAD 1:100', sub: 'Hệ dầm bê tông dự ứng lực B35', type: 'cad_viewer' },
  { id: 'scr_360_09', code: 'SCR-360-09', name: 'Chế Độ So Sánh Before & After', dir: 'tour360', title: 'So Sánh Trước & Sau', sub: 'Hiện trạng thô vs Thiết kế hoàn thiện', type: 'split_slider' },
  { id: 'scr_360_10', code: 'SCR-360-10', name: 'Chế Độ Kính Thực Tế Ảo (VR Mode)', dir: 'tour360', title: 'VR Cardboard Mode', sub: 'Chia đôi thấu kính mắt lập thể', type: 'vr_mode' },
  { id: 'scr_360_11', code: 'SCR-360-11', name: 'Bản Đồ Định Vị BĐS 360 (GPS)', dir: 'tour360', title: 'Bản Đồ Vệ Tinh Sơn Trà', sub: 'Định vị GPS tọa độ các kiệt tác', type: 'map_gps' },
  { id: 'scr_360_12', code: 'SCR-360-12', name: 'Lớp Phủ Quy Hoạch Đô Thị (Zoning)', dir: 'tour360', title: 'Quy Hoạch Đô Thị', sub: 'Lớp phủ pháp lý đất ở & thương mại', type: 'zoning_map' },
  { id: 'scr_360_13', code: 'SCR-360-13', name: 'Tiện Ích Ngoại Khu 360 (Bán Kính 1km)', dir: 'tour360', title: 'Tiện Ích Ngoại Khu', sub: 'Bến du thuyền, sân bay, bệnh viện', type: 'amenities_map' },
  { id: 'scr_360_14', code: 'SCR-360-14', name: 'Tùy Chỉnh Ánh Sáng Ngày / Đêm', dir: 'tour360', title: 'Ánh Sáng Ngày & Đêm', sub: 'Mô phỏng góc nắng hoàng hôn', type: 'day_night' },
  { id: 'scr_360_15', code: 'SCR-360-15', name: 'Chụp Ảnh Không Gian & Chia Sẻ MXH', dir: 'tour360', title: 'Chụp Ảnh & Chia Sẻ', sub: 'Góc chụp tỉ lệ vàng có watermark', type: 'snapshot_share' },

  // PHÂN HỆ 3: NGƯỜI MUA & THUÊ BĐS (20 màn)
  { id: 'scr_buy_01', code: 'SCR-BUY-01', name: 'Trang Chủ Người Mua (Bento Grid)', dir: 'buyer', title: 'Khám Phá Kiệt Tác', sub: 'Bảng tin Bento Grid Tadao Ando', type: 'buyer_home' },
  { id: 'scr_buy_02', code: 'SCR-BUY-02', name: 'Bộ Lọc Tìm Kiếm Chi Tiết', dir: 'buyer', title: 'Bộ Lọc Chuyên Sâu', sub: 'Mức giá $2.5M - $12M, phong cách', type: 'filter_modal' },
  { id: 'scr_buy_03', code: 'SCR-BUY-03', name: 'Danh Sách Kết Quả Tìm Kiếm', dir: 'buyer', title: '14 Dinh Thự Phù Hợp', sub: 'Gắn nhãn 360 Verified', type: 'search_results' },
  { id: 'scr_buy_04', code: 'SCR-BUY-04', name: 'Chi Tiết BĐS - Tổng Quan', dir: 'buyer', title: 'The Glass Sanctuary', sub: 'KTS Tadao Ando • Sơn Trà • $4.25M', type: 'property_overview' },
  { id: 'scr_buy_05', code: 'SCR-BUY-05', name: 'Chi Tiết BĐS - Tab Mặt Bằng Layout', dir: 'buyer', title: 'Mặt Bằng & Layout', sub: 'Diện tích 850 m² • 5 Master Suites', type: 'tab_layout' },
  { id: 'scr_buy_06', code: 'SCR-BUY-06', name: 'Chi Tiết BĐS - Tab Tiện Ích Nội Khu', dir: 'buyer', title: 'Tiện Ích Đặc Quyền', sub: 'Heli-pad 108°, Hầm rượu, Hồ bơi 35m', type: 'tab_amenities' },
  { id: 'scr_buy_07', code: 'SCR-BUY-07', name: 'Bảng Tính Lãi Suất Vay Private Banking', dir: 'buyer', title: 'Đòn Bẩy Tài Chính', sub: 'Lãi suất 4.3% cố định 20 năm', type: 'finance_calc' },
  { id: 'scr_buy_08', code: 'SCR-BUY-08', name: 'So Sánh BĐS Đa Tiêu Chí', dir: 'buyer', title: 'So Sánh 2 Dinh Thự', sub: 'Đối chiếu đơn giá, diện tích, vật tư', type: 'compare_estates' },
  { id: 'scr_buy_09', code: 'SCR-BUY-09', name: 'Bộ Sưu Tập BĐS Đã Lưu (Wishlist)', dir: 'buyer', title: 'Dinh Thự Đã Lưu', sub: '3 bộ sưu tập: Mua ở, Đầu tư, Nghệ thuật', type: 'wishlist' },
  { id: 'scr_buy_10', code: 'SCR-BUY-10', name: 'Lịch Sử Xem Tour 360 Gần Đây', dir: 'buyer', title: 'Lịch Sử Trải Nghiệm', sub: 'Các không gian đã tham quan gần đây', type: 'history_tours' },
  { id: 'scr_buy_11', code: 'SCR-BUY-11', name: 'Đặt Lịch Hẹn Xem Thực Địa & Trực Thăng', dir: 'buyer', title: 'Đặt Lịch Khảo Sát', sub: 'Thứ Sáu 16/10/2026 • Bell 429', type: 'booking_viewing' },
  { id: 'scr_buy_12', code: 'SCR-BUY-12', name: 'Yêu Cầu Mở Phòng Live Co-touring', dir: 'buyer', title: 'Yêu Cầu Co-touring', sub: 'Xem nhà trực tuyến cùng chuyên gia', type: 'req_cotour' },
  { id: 'scr_buy_13', code: 'SCR-BUY-13', name: 'Đăng Tin Tìm BĐS Theo Nhu Cầu Riêng', dir: 'buyer', title: 'Đặt Hàng Kiến Trúc', sub: 'Reverse Marketplace theo ngân sách', type: 'reverse_market' },
  { id: 'scr_buy_14', code: 'SCR-BUY-14', name: 'Quản Lý Các Tin Tìm Mua / Thuê Đã Đăng', dir: 'buyer', title: 'Tin Tìm Kiếm Đã Đăng', sub: 'Theo dõi báo giá từ các môi giới', type: 'manage_reverse' },
  { id: 'scr_buy_15', code: 'SCR-BUY-15', name: 'Tạo Phiếu Yêu Cầu Tư Vấn KTS', dir: 'buyer', title: 'Brief Tư Vấn KTS', sub: 'Đề xuất tùy biến hồ bơi +4m vươn biển', type: 'brief_architect' },
  { id: 'scr_buy_16', code: 'SCR-BUY-16', name: 'Danh Sách KTS Phù Hợp Phong Cách', dir: 'buyer', title: 'KTS Khuyên Chọn', sub: 'Studio Tadao Ando, Kengo Kuma', type: 'architect_list' },
  { id: 'scr_buy_17', code: 'SCR-BUY-17', name: 'Theo Dõi Tiến Độ Lịch Hẹn Xem Nhà', dir: 'buyer', title: 'Vé Thông Hành VIP PASS', sub: 'Boarding Pass #ARK-8821', type: 'ticket_pass' },
  { id: 'scr_buy_18', code: 'SCR-BUY-18', name: 'Đánh Giá Trải Nghiệm Sau Buổi Xem', dir: 'buyer', title: 'Đánh Giá Chuyến Thăm', sub: 'Chấm điểm độ chân thực & dịch vụ', type: 'review_tour' },
  { id: 'scr_buy_19', code: 'SCR-BUY-19', name: 'Tra Cứu Chủ Đầu Tư & Nhà Thầu', dir: 'buyer', title: 'Hồ Sơ Chủ Đầu Tư', sub: 'Lịch sử bàn giao và năng lực pháp lý', type: 'developer_profile' },
  { id: 'scr_buy_20', code: 'SCR-BUY-20', name: 'Kiểm Tra Tính Pháp Lý BĐS', dir: 'buyer', title: 'Chứng Thư Pháp Lý', sub: 'Sổ hồng lâu dài & Giấy phép xây dựng', type: 'legal_cert' },

  // PHÂN HỆ 4: KTS & NTK NỘI THẤT (20 màn)
  { id: 'scr_arc_01', code: 'SCR-ARC-01', name: 'Trang Chủ KTS & Thống Kê Portfolio', dir: 'architect', title: 'Studio Kiến Trúc', sub: 'Lượt xem Portfolio & Brief mới', type: 'arc_home' },
  { id: 'scr_arc_02', code: 'SCR-ARC-02', name: 'Hồ Sơ Năng Lực KTS Công Khai', dir: 'architect', title: 'Studio Tadao Ando', sub: 'Giải thưởng Pritzker 1995 • Osaka', type: 'arc_profile' },
  { id: 'scr_arc_03', code: 'SCR-ARC-03', name: 'Quản Lý Danh Sách Portfolio Công Trình', dir: 'architect', title: 'Danh Mục Dự Án 360', sub: '12 kiệt tác đã xuất bản', type: 'arc_portfolio_list' },
  { id: 'scr_arc_04', code: 'SCR-ARC-04', name: 'Tải Lên Dự Án Mới - Bước 1: Thông Tin', dir: 'architect', title: 'Tạo Dự Án Mới (1/2)', sub: 'Tên dinh thự, diện tích, chi phí', type: 'arc_upload_step1' },
  { id: 'scr_arc_05', code: 'SCR-ARC-05', name: 'Tải Lên Dự Án Mới - Bước 2: Upload 360', dir: 'architect', title: 'Tải Ảnh 360 (2/2)', sub: 'Panorama 2:1 & Mặt bằng 2D', type: 'arc_upload_step2' },
  { id: 'scr_arc_06', code: 'SCR-ARC-06', name: 'Studio Dựng 360 - Node Linking', dir: 'architect', title: 'Liên Kết Chuyển Phòng', sub: 'Kéo thả cổng nối giữa các Scene', type: 'arc_node_linking' },
  { id: 'scr_arc_07', code: 'SCR-ARC-07', name: 'Studio Dựng 360 - Material Hotspots', dir: 'architect', title: 'Gắn Thẻ Vật Tư', sub: 'Ghim mã màu, kích thước, đơn giá', type: 'arc_hotspot_editor' },
  { id: 'scr_arc_08', code: 'SCR-ARC-08', name: 'Studio Dựng 360 - Góc Nhìn Mặc Định', dir: 'architect', title: 'Căn Chỉnh Góc Nhìn', sub: 'Thiết lập Default Yaw, Pitch, FOV', type: 'arc_default_view' },
  { id: 'scr_arc_09', code: 'SCR-ARC-09', name: 'Xem Trước Dự Án 360 Trước Xuất Bản', dir: 'architect', title: 'Xem Trước Dự Án', sub: 'Kiểm thử toàn diện trước khi phát hành', type: 'arc_preview_mode' },
  { id: 'scr_arc_10', code: 'SCR-ARC-10', name: 'Bảng Tin Briefs Tìm Kiếm KTS', dir: 'architect', title: 'Bảng Tin Đầu Bài', sub: 'Yêu cầu thiết kế từ các gia chủ', type: 'arc_briefs_feed' },
  { id: 'scr_arc_11', code: 'SCR-ARC-11', name: 'Chi Tiết Một Đầu Bài Brief Gia Chủ', dir: 'architect', title: 'Chi Tiết Đầu Bài', sub: 'Mặt bằng thô & Ngân sách $500K', type: 'arc_brief_detail' },
  { id: 'scr_arc_12', code: 'SCR-ARC-12', name: 'Soạn Thảo Concept & Báo Giá Thiết Kế', dir: 'architect', title: 'Báo Giá Phụ Lục', sub: 'Phương án kéo dài hồ bơi +4m (+$480K)', type: 'arc_quote_builder' },
  { id: 'scr_arc_13', code: 'SCR-ARC-13', name: 'Quản Lý Các Dự Án Thiết Kế Đang Chạy', dir: 'architect', title: 'Dự Án Đang Thực Hiện', sub: 'Theo dõi mốc khai triển & thi công', type: 'arc_active_projects' },
  { id: 'scr_arc_14', code: 'SCR-ARC-14', name: 'Bảng Kanban Tiến Độ Công Trình', dir: 'architect', title: 'Tiến Độ Công Trình', sub: 'Khai triển -> Duyệt 3D -> Thi công', type: 'arc_kanban' },
  { id: 'scr_arc_15', code: 'SCR-ARC-15', name: 'Nghiệm Thu Giai Đoạn (Thực Tế vs 360)', dir: 'architect', title: 'Nghiệm Thu Mốc', sub: 'Đối chiếu ảnh thi công vs Render 3D', type: 'arc_milestone_review' },
  { id: 'scr_arc_16', code: 'SCR-ARC-16', name: 'Thư Viện Vật Liệu & Bảng Màu Yêu Thích', dir: 'architect', title: 'Thư Viện Vật Tư', sub: 'Kho mẫu Terrazzo, gỗ óc chó, kính Low-E', type: 'arc_material_lib' },
  { id: 'scr_arc_17', code: 'SCR-ARC-17', name: 'Liên Kết Đối Tác Nội Thất & Nhà Thầu', dir: 'architect', title: 'Mạng Lưới Nhà Thầu', sub: 'Đối tác gia công cấu kiện kim loại & gỗ', type: 'arc_contractors' },
  { id: 'scr_arc_18', code: 'SCR-ARC-18', name: 'Quản Lý Đánh Giá & Phản Hồi Gia Chủ', dir: 'architect', title: 'Đánh Giá Khách Hàng', sub: '4.95/5.0 sao từ 28 gia chủ', type: 'arc_reviews' },
  { id: 'scr_arc_19', code: 'SCR-ARC-19', name: 'Báo Cáo Tương Tác Portfolio (Analytics)', dir: 'architect', title: 'Chỉ Số Tương Tác', sub: 'Lượt xoay 360 & Phòng xem nhiều nhất', type: 'arc_analytics' },
  { id: 'scr_arc_20', code: 'SCR-ARC-20', name: 'Đăng Ký Gói Tài Khoản KTS Pro', dir: 'architect', title: 'Nâng Cấp KTS Pro', sub: 'Tích xanh uy tín & Lưu trữ không giới hạn', type: 'arc_pro_upgrade' },

  // PHÂN HỆ 5: MÔI GIỚI BĐS & GIỎ HÀNG (18 màn)
  { id: 'scr_agt_01', code: 'SCR-AGT-01', name: 'Bảng Điều Khiển Môi Giới (Dashboard)', dir: 'agent', title: 'Trung Tâm Môi Giới', sub: 'Doanh số $14.2M • 18 Leads mới', type: 'agt_dashboard' },
  { id: 'scr_agt_02', code: 'SCR-AGT-02', name: 'Quản Lý Danh Sách BĐS Ký Gửi', dir: 'agent', title: 'Giỏ Hàng Ký Gửi', sub: 'Đang bán, Đã cọc, Hết hạn', type: 'agt_inventory' },
  { id: 'scr_agt_03', code: 'SCR-AGT-03', name: 'Soạn Tin Đăng Mới - Bước 1: Định Vị', dir: 'agent', title: 'Soạn Tin Mới (1/2)', sub: 'Toạ độ GPS & Thông số pháp lý', type: 'agt_listing_step1' },
  { id: 'scr_agt_04', code: 'SCR-AGT-04', name: 'Soạn Tin Đăng Mới - Bước 2: Tích Hợp 360', dir: 'agent', title: 'Gắn Tour 360 (2/2)', sub: 'Liên kết mã tour máy quét Matterport', type: 'agt_listing_step2' },
  { id: 'scr_agt_05', code: 'SCR-AGT-05', name: 'Trình Quét Không Gian Bằng Camera ĐT', dir: 'agent', title: 'Quét 360 Bằng ĐT', sub: 'Pano Capture Guide: Hướng dẫn lia máy', type: 'agt_pano_capture' },
  { id: 'scr_agt_06', code: 'SCR-AGT-06', name: 'Kiểm Tra Chất Lượng Ảnh Ghép 360', dir: 'agent', title: 'Kiểm Định Độ Nối', sub: 'Stitching Quality Review', type: 'agt_stitch_review' },
  { id: 'scr_agt_07', code: 'SCR-AGT-07', name: 'Quản Lý Phễu Khách Hàng (Leads CRM)', dir: 'agent', title: 'Phễu Khách Hàng CRM', sub: 'Mới -> Đã xem 360 -> Hẹn bay -> Cọc', type: 'agt_crm_pipeline' },
  { id: 'scr_agt_08', code: 'SCR-AGT-08', name: 'Chi Tiết Hồ Sơ Khách Tiềm Năng (Lead)', dir: 'agent', title: 'Khách Alexander Vance', sub: 'Ngân sách $5M • Quan tâm The Glass Sanctuary', type: 'agt_lead_detail' },
  { id: 'scr_agt_09', code: 'SCR-AGT-09', name: 'Lịch Công Tác & Lịch Hẹn Dẫn Khách', dir: 'agent', title: 'Điều Phối Bay Hàng Không', sub: 'Duyệt bay Bell 429 lúc 14:30', type: 'agt_calendar' },
  { id: 'scr_agt_10', code: 'SCR-AGT-10', name: 'Thiết Lập Phòng Co-tour 360 Từ Xa', dir: 'agent', title: 'Khởi Tạo Co-tour', sub: 'Mã phòng #COT-782 • Khóa Host Mode', type: 'agt_cotour_setup' },
  { id: 'scr_agt_11', code: 'SCR-AGT-11', name: 'Quản Lý Kho Hàng Liên Kết Sàn', dir: 'agent', title: 'Mạng Lưới Co-broking', sub: 'Hợp tác giỏ hàng hoa hồng 50/50', type: 'agt_cobroking' },
  { id: 'scr_agt_12', code: 'SCR-AGT-12', name: 'Tạo Phiếu Giữ Chỗ / Phiếu Cọc BĐS', dir: 'agent', title: 'Phiếu Giữ Chỗ Khẩn', sub: 'Khóa căn hộ • Đặt cọc 1.5 BTC', type: 'agt_deposit_slip' },
  { id: 'scr_agt_13', code: 'SCR-AGT-13', name: 'Báo Cáo Chỉ Số Tương Tác (Heatmap)', dir: 'agent', title: 'Bản Đồ Nhiệt Tương Tác', sub: 'Đại sảnh thông tầng nán lại 8.5 phút', type: 'agt_heatmap_report' },
  { id: 'scr_agt_14', code: 'SCR-AGT-14', name: 'Quản Lý Hoa Hồng & Thu Nhập Môi Giới', dir: 'agent', title: 'Bảng Kê Hoa Hồng', sub: 'Thu nhập khả dụng: $128,400 USD', type: 'agt_commissions' },
  { id: 'scr_agt_15', code: 'SCR-AGT-15', name: 'Quản Lý Yêu Cầu Ký Gửi Nhà Đất', dir: 'agent', title: 'Tiếp Nhận Ký Gửi', sub: 'Yêu cầu định giá từ chủ sở hữu', type: 'agt_consignment' },
  { id: 'scr_agt_16', code: 'SCR-AGT-16', name: 'Mua Gói Dịch Vụ Chụp 360 Tận Nơi', dir: 'agent', title: 'Dịch Vụ Chụp 360 Pro', sub: 'Ekip ARKI quét Matterport Pro 3', type: 'agt_service_order' },
  { id: 'scr_agt_17', code: 'SCR-AGT-17', name: 'Nạp Điểm Đẩy Tin & Chạy Quảng Cáo', dir: 'agent', title: 'Chiến Dịch Đẩy Tin', sub: 'Huy hiệu Kim Cương & Top 1 Tìm kiếm', type: 'agt_ad_campaign' },
  { id: 'scr_agt_18', code: 'SCR-AGT-18', name: 'Đào Tạo Kỹ Năng Số Cho Môi Giới', dir: 'agent', title: 'Học Viện Môi Giới 360', sub: 'Khóa kỹ năng dẫn tour thực tế ảo', type: 'agt_training' },

  // PHÂN HỆ 6: CO-TOURING & GIAO TIẾP (12 màn)
  { id: 'scr_com_01', code: 'SCR-COM-01', name: 'Phòng Chờ Cuộc Gọi Co-tour 360', dir: 'comms', title: 'Phòng Chờ Co-tour', sub: 'Kiểm tra Mic, Camera & Tín hiệu mạng', type: 'com_lobby' },
  { id: 'scr_com_02', code: 'SCR-COM-02', name: 'Phòng Co-touring - Host Control', dir: 'comms', title: 'Host Control (Môi Giới)', sub: 'Đồng bộ màn hình & Bật Laser Pointer', type: 'com_host_room' },
  { id: 'scr_com_03', code: 'SCR-COM-03', name: 'Phòng Co-touring - Guest View', dir: 'comms', title: 'Guest View (Khách Hàng)', sub: 'Xem theo Host • Tự do xoay phòng', type: 'com_guest_room' },
  { id: 'scr_com_04', code: 'SCR-COM-04', name: 'Bảng Vẽ Trực Tiếp Lên Không Gian 360', dir: 'comms', title: 'Whiteboard 360', sub: 'Vẽ kích thước & Ghi chú trực tiếp', type: 'com_whiteboard' },
  { id: 'scr_com_05', code: 'SCR-COM-05', name: 'Hộp Thoại Trò Chuyện Trong Co-tour', dir: 'comms', title: 'Khung Chat Phòng Gọi', sub: 'Gửi tin nhắn & Chia sẻ link tài liệu', type: 'com_room_chat' },
  { id: 'scr_com_06', code: 'SCR-COM-06', name: 'Kết Thúc Phiên Co-touring & Tổng Hợp', dir: 'comms', title: 'Tổng Kết Buổi Xem', sub: 'Báo cáo 3 căn đã xem & Tài liệu pháp lý', type: 'com_summary' },
  { id: 'scr_com_07', code: 'SCR-COM-07', name: 'Danh Sách Tin Nhắn Chính', dir: 'comms', title: 'Hộp Thư ARKI', sub: 'Khách mua, Môi giới, KTS Studio', type: 'com_inbox' },
  { id: 'scr_com_08', code: 'SCR-COM-08', name: 'Khung Chat 1-1 & Thẻ BĐS', dir: 'comms', title: 'Studio Tadao Ando', sub: 'Hội thoại kỹ thuật 1-1 về kết cấu', type: 'com_chat_1on1' },
  { id: 'scr_com_09', code: 'SCR-COM-09', name: 'Chia Sẻ Deep-link Góc Nhìn 360', dir: 'comms', title: 'Liên Kết Sâu Tọa Độ', sub: 'Chia sẻ góc Yaw=12°, Pitch=-4°', type: 'com_deeplink' },
  { id: 'scr_com_10', code: 'SCR-COM-10', name: 'Khung Chat Nhóm Dự Án Công Trình', dir: 'comms', title: 'Nhóm Dự Án Sơn Trà', sub: 'Gia chủ + KTS chủ trì + Giám sát', type: 'com_group_chat' },
  { id: 'scr_com_11', code: 'SCR-COM-11', name: 'Cuộc Gọi Thoại & Video Call 1-1', dir: 'comms', title: 'Gọi Video Trực Tuyến', sub: 'KTS Tadao Ando • HD 1080p', type: 'com_video_call' },
  { id: 'scr_com_12', code: 'SCR-COM-12', name: 'Danh Bạ Lưu Trữ Chuyên Gia', dir: 'comms', title: 'Danh Bạ Chuyên Gia', sub: 'Mạng lưới KTS Pritzker tin cậy', type: 'com_contacts' },

  // PHÂN HỆ 7: GIAO DỊCH & HỢP ĐỒNG (13 màn)
  { id: 'scr_txn_01', code: 'SCR-TXN-01', name: 'Trung Tâm Giao Dịch & Hợp Đồng', dir: 'transactions', title: 'Trung Tâm Giao Dịch', sub: 'Hợp đồng mua bán & Phụ lục thiết kế', type: 'txn_center' },
  { id: 'scr_txn_02', code: 'SCR-TXN-02', name: 'Chi Tiết Bảng Báo Giá Thiết Kế', dir: 'transactions', title: 'Phụ Lục Kỹ Thuật #MOD-04', sub: 'Kéo dài hồ bơi +4m • +$480,000 USD', type: 'txn_quote_detail' },
  { id: 'scr_txn_03', code: 'SCR-TXN-03', name: 'Chấp Thuận Báo Giá & Tạo Hợp Đồng', dir: 'transactions', title: 'Tạo Hợp Đồng Thiết Kế', sub: 'Điều khoản bảo chứng pháp lý', type: 'txn_contract_create' },
  { id: 'scr_txn_04', code: 'SCR-TXN-04', name: 'Đọc Hợp Đồng Điện Tử', dir: 'transactions', title: 'Hợp Đồng Nguyên Tắc', sub: 'Điều khoản bảo mật tài sản kín', type: 'txn_contract_viewer' },
  { id: 'scr_txn_05', code: 'SCR-TXN-05', name: 'Ký Hợp Đồng Số (OTP / Smart Contract)', dir: 'transactions', title: 'Ký Số Điện Tử', sub: 'Ký tay cảm ứng & Xác thực OTP', type: 'txn_esign' },
  { id: 'scr_txn_06', code: 'SCR-TXN-06', name: 'Thiết Lập Các Mốc Thanh Toán Tiến Độ', dir: 'transactions', title: 'Mốc Giải Ngân Escrow', sub: '30% thiết kế -> 40% thi công -> 30% bàn giao', type: 'txn_milestones' },
  { id: 'scr_txn_07', code: 'SCR-TXN-07', name: 'Cổng Thanh Toán & Khóa Escrow', dir: 'transactions', title: 'Khóa Ký Quỹ Escrow', sub: '68.20 BTC ($4,250,000 USD) • Multi-Sig 3/5', type: 'txn_escrow_lock' },
  { id: 'scr_txn_08', code: 'SCR-TXN-08', name: 'Xác Nhận Giao Dịch Thành Công & Hóa Đơn', dir: 'transactions', title: 'Giao Dịch Thành Công', sub: 'Chứng thư bảo chứng số #ESCROW-68', type: 'txn_receipt' },
  { id: 'scr_txn_09', code: 'SCR-TXN-09', name: 'Ví Tài Khoản Ứng Dụng ARKI Vault', dir: 'transactions', title: 'ARKI Vault', sub: 'Số dư khả dụng & Ký quỹ cọc', type: 'txn_vault' },
  { id: 'scr_txn_10', code: 'SCR-TXN-10', name: 'Rút Tiền Về Tài Khoản Ngân Hàng', dir: 'transactions', title: 'Rút Thù Lao / Hoa Hồng', sub: 'Lệnh chuyển khoản ngân hàng ưu tiên', type: 'txn_withdraw' },
  { id: 'scr_txn_11', code: 'SCR-TXN-11', name: 'Quản Lý Biên Nhận Đặt Cọc BĐS', dir: 'transactions', title: 'Biên Nhận Giữ Chỗ', sub: 'Mã BĐS #ARK-8821 • Thời hạn 14 ngày', type: 'txn_deposit_receipt' },
  { id: 'scr_txn_12', code: 'SCR-TXN-12', name: 'Khiếu Nại Giao Dịch & Trọng Tài', dir: 'transactions', title: 'Trọng Tài Giải Quyết', sub: 'Khiếu nại tiến độ thi công', type: 'txn_dispute' },
  { id: 'scr_txn_13', code: 'SCR-TXN-13', name: 'Lịch Sử Sao Kê Tài Chính Chi Tiết', dir: 'transactions', title: 'Lịch Sử Dòng Tiền', sub: 'Sao kê đầy đủ thu chi & thuế', type: 'txn_statements' },

  // PHÂN HỆ 8: CÀI ĐẶT & TIỆN ÍCH (12 màn)
  { id: 'scr_set_01', code: 'SCR-SET-01', name: 'Trung Tâm Thông Báo Thông Minh', dir: 'settings', title: 'Thông Báo Hệ Thống', sub: 'Lịch hẹn, giao dịch, tin nhắn KTS', type: 'set_notifications' },
  { id: 'scr_set_02', code: 'SCR-SET-02', name: 'Cài Đặt Tài Khoản & Bảo Mật', dir: 'settings', title: 'Tài Khoản & Bảo Mật', sub: 'FaceID, 2FA, đổi mật khẩu', type: 'set_security' },
  { id: 'scr_set_03', code: 'SCR-SET-03', name: 'Cài Đặt Cấu Hình Hiển Thị 360', dir: 'settings', title: 'Cấu Hình Trình Xem 360', sub: 'Độ nhạy xoay, tải trước, Gyroscope', type: 'set_config360' },
  { id: 'scr_set_04', code: 'SCR-SET-04', name: 'Quản Lý Bộ Nhớ Đệm (Cache 360)', dir: 'settings', title: 'Bộ Nhớ Đệm 360', sub: 'Dung lượng đã lưu: 480 MB', type: 'set_cache' },
  { id: 'scr_set_05', code: 'SCR-SET-05', name: 'Chế Độ Tải Ngoại Tuyến (Offline Tours)', dir: 'settings', title: 'Tải Tour Offline', sub: 'Xem không cần mạng khi dẫn khách', type: 'set_offline' },
  { id: 'scr_set_06', code: 'SCR-SET-06', name: 'Cài Đặt Ngôn Ngữ & Đơn Vị Đo Lường', dir: 'settings', title: 'Ngôn Ngữ & Đơn Vị', sub: 'Tiếng Việt • m² • USD / Tỷ VNĐ / BTC', type: 'set_language' },
  { id: 'scr_set_07', code: 'SCR-SET-07', name: 'Trung Tâm Trợ Giúp & FAQ', dir: 'settings', title: 'Trợ Giúp & Câu Hỏi', sub: 'Hướng dẫn sử dụng & Quy trình cọc', type: 'set_faq' },
  { id: 'scr_set_08', code: 'SCR-SET-08', name: 'Gửi Yêu Cầu Hỗ Trợ Kỹ Thuật', dir: 'settings', title: 'Hỗ Trợ Kỹ Thuật', sub: 'Báo lỗi hiển thị 360 & đường truyền', type: 'set_support' },
  { id: 'scr_set_09', code: 'SCR-SET-09', name: 'Điều Khoản Dịch Vụ & Chính Sách', dir: 'settings', title: 'Điều Khoản & Bảo Mật', sub: 'Chính sách bảo mật dữ liệu nhà đất', type: 'set_terms' },
  { id: 'scr_set_10', code: 'SCR-SET-10', name: 'Giới Thiệu Phiên Bản Phần Mềm', dir: 'settings', title: 'Về Ứng Dụng ARKI', sub: 'Phiên bản 3.0 Enterprise Engine', type: 'set_about' },
  { id: 'scr_set_11', code: 'SCR-SET-11', name: 'Khóa Tài Khoản / Xóa Vĩnh Viễn', dir: 'settings', title: 'Vô Hiệu Hóa Tài Khoản', sub: 'Xóa tài khoản theo tiêu chuẩn GDPR', type: 'set_delete_acc' },
  { id: 'scr_set_12', code: 'SCR-SET-12', name: 'Chuyển Đổi Vai Trò Nhanh (Switch Profile)', dir: 'settings', title: 'Chuyển Đổi Vai Trò', sub: 'Buyer ↔ Designer ↔ Agent', type: 'set_switch_role' }
];

console.log(`Generating 112 dedicated screen generator files... Total screens: ${SCREENS.length}`);

SCREENS.forEach((s, idx) => {
  const filePath = path.resolve(`scripts/generators/modules/${s.dir}/${s.id}.js`);
  const codeContent = `import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: ${s.code} — ${s.name}
 * Module: ${s.dir.toUpperCase()}
 * Standard: Tadao Ando Minimalist Luxury | Mobile iPhone 16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('${s.id}', '${s.code}: ${s.name}', x, y);

  // 1. Screen Header with Ergonomic Fitts's Law Back Button (>= 44x44px)
  b.addHeader('${s.title}', '${s.sub}', true, 'Tùy Chọn', 'btn_opt_${s.id}');

  // 2. Body Section according to Screen Type
  ${generateBodyForType(s)}

  // 3. Bottom Navigation Dock with 4 Equal Tabs (98.25px each) & Active State
  b.addBottomNavBar(${getNavIndex(s.dir)});

  return b;
}

// Direct Execution Support
if (process.argv[1] && process.argv[1].endsWith('${s.id}.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
`;

  fs.writeFileSync(filePath, codeContent, 'utf8');
});

function getNavIndex(dir) {
  if (dir === 'buyer') return 0;
  if (dir === 'tour360') return 1;
  if (dir === 'transactions') return 2;
  return 3;
}

function generateBodyForType(s) {
  switch (s.type) {
    case 'splash':
    case 'onboarding':
      return `
  // Hero Cover
  b.addStep('CREATE_RECTANGLE', {
    parentId: '$${s.id}',
    name: 'Hero Visual',
    width: 345,
    height: 480,
    x: 24,
    y: 130,
    imageUrl: IMAGES.villaPool,
    color: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  });
  b.addStep('CREATE_BUTTON', {
    parentId: '$${s.id}',
    name: 'Btn / Continue',
    text: 'Tiếp Tục Khám Phá →',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 660
  }, 'btn_next_${s.id}');
      `;

    case 'role_select':
    case 'set_switch_role':
      return `
  const roles = [
    { title: 'Buyer / Client', sub: 'Khám phá dinh thự, tour 360 & đặt lịch' },
    { title: 'Architect / Designer', sub: 'Trưng bày portfolio 360 & duyệt bản vẽ' },
    { title: 'Real Estate Agent', sub: 'Quản lý giỏ hàng & dẫn tour trực tuyến' }
  ];
  roles.forEach((r, i) => {
    const cardY = 140 + i * 110;
    b.addStep('CREATE_FRAME', {
      parentId: '$${s.id}',
      name: 'Role / ' + r.title,
      width: 345,
      height: 94,
      x: 24,
      y: cardY,
      backgroundColor: TOKENS.bgCard,
      cornerRadius: TOKENS.cornerRadiusCard
    }, 'role_card_' + i);
    b.addStep('CREATE_TEXT', {
      parentId: '$role_card_' + i,
      text: r.title,
      fontSize: 15,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: 24
    });
    b.addStep('CREATE_TEXT', {
      parentId: '$role_card_' + i,
      text: r.sub,
      fontSize: 12,
      color: TOKENS.textSecondary,
      x: 20,
      y: 50
    });
  });
  b.addStep('CREATE_BUTTON', {
    parentId: '$${s.id}',
    name: 'Btn / Confirm Role',
    text: 'Xác Nhận Vai Trò',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 660
  }, 'btn_confirm_${s.id}');
      `;

    case 'viewer360':
    case 'split_slider':
      return `
  // 360 Panoramic Viewport
  b.addStep('CREATE_RECTANGLE', {
    parentId: '$${s.id}',
    name: '360 Panorama Canvas',
    width: 345,
    height: 520,
    x: 24,
    y: 130,
    imageUrl: IMAGES.livingRoom,
    color: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  });
  // HUD Controls
  b.addStep('CREATE_FRAME', {
    parentId: '$${s.id}',
    name: 'HUD Floating Controls',
    width: 313,
    height: 60,
    x: 40,
    y: 560,
    backgroundColor: '#0B0C0ECC',
    cornerRadius: 12
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$${s.id}',
    text: '◎ Xoay Gyroscope • Chạm Điểm Nối Chuyển Phòng',
    fontSize: 12,
    fontStyle: 'SemiBold',
    color: TOKENS.textPrimary,
    x: 58,
    y: 582
  });
      `;

    case 'buyer_home':
    case 'search_results':
      return `
  b.addCategoryChips(['TẤT CẢ', 'VEN BIỂN', 'BÊ TÔNG', 'SINH THÁI'], 0, 116);
  b.addEstateCard({
    y: 168,
    imageUrl: IMAGES.villaPool,
    title: 'The Glass Sanctuary Villa',
    location: 'Bán Đảo Sơn Trà',
    specs: 'KTS Tadao Ando • 850 m²',
    price: '$4,250,000',
    cardRef: 'card_hero',
    btnRef: 'btn_hero_details'
  });
  b.addEstateCard({
    y: 544,
    imageUrl: IMAGES.brutalistVilla,
    title: 'Cliffside Monolith Retreat',
    location: 'Bán Đảo Sơn Trà',
    specs: 'Studio Kengo Kuma • 620 m²',
    price: '$3,800,000',
    cardRef: 'card_second',
    btnRef: 'btn_second_details'
  });
      `;

    case 'ticket_pass':
      return `
  b.addStep('CREATE_FRAME', {
    parentId: '$${s.id}',
    name: 'Boarding Pass Card',
    width: 345,
    height: 480,
    x: 24,
    y: 130,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 20
  }, 'card_ticket');
  b.addStep('CREATE_TEXT', {
    parentId: '$card_ticket',
    text: 'VIP BOARDING PASS',
    fontSize: 11,
    fontStyle: 'SemiBold',
    color: TOKENS.accentGold,
    x: 28,
    y: 28
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$card_ticket',
    text: '#ARK-8821',
    fontSize: 24,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 28,
    y: 52
  });
  b.addStep('CREATE_TEXT', {
    parentId: '$card_ticket',
    text: 'Khách Hàng: Alexander Vance\\nCông Trình: The Glass Sanctuary\\nThời Gian: Thứ Sáu 16/10/2026 • 14:30\\nPhương Tiện: Trực Thăng Bell 429',
    fontSize: 13,
    color: TOKENS.textSecondary,
    x: 28,
    y: 110
  });
  b.addStep('CREATE_FRAME', {
    parentId: '$card_ticket',
    name: 'QR Frame',
    width: 160,
    height: 160,
    x: 92,
    y: 250,
    backgroundColor: TOKENS.textPrimary,
    cornerRadius: 10
  });
  b.addStep('CREATE_BUTTON', {
    parentId: '$${s.id}',
    name: 'Btn / Apple Wallet',
    text: 'Đồng Bộ Apple Wallet (NFC)',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 650
  }, 'btn_wallet_${s.id}');
      `;

    default:
      return `
  // Standard Bento Content Card
  b.addStep('CREATE_FRAME', {
    parentId: '$${s.id}',
    name: 'Primary Content Panel',
    width: 345,
    height: 380,
    x: 24,
    y: 130,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'panel_${s.id}');

  b.addStep('CREATE_TEXT', {
    parentId: '$panel_${s.id}',
    text: '${s.name}',
    fontSize: 16,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 24,
    y: 28
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$panel_${s.id}',
    text: 'Mã: ${s.code} • Phân hệ: ${s.dir.toUpperCase()}\\nThiết kế chuẩn Tadao Ando • Trải nghiệm cảm ứng 393x852px.\\nThứ bậc thông tin rõ ràng, không tràn mép, viền 1px.',
    fontSize: 13,
    color: TOKENS.textSecondary,
    x: 24,
    y: 64
  });

  b.addStep('CREATE_BUTTON', {
    parentId: '$${s.id}',
    name: 'Btn / Primary Action',
    text: 'Xác Nhận Thao Tác',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 650
  }, 'btn_action_${s.id}');
      `;
  }
}

console.log('✅ Successfully generated all 112 dedicated screen generator files!');
