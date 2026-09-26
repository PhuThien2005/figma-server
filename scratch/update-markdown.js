import fs from 'fs';
import path from 'path';

const filePath = path.resolve('C:/figma/LUONG_NGHIEP_VU_ARKI.md');
let content = fs.readFileSync(filePath, 'utf8');

// The new Section 4 & 5 content
const newSection4and5 = `## 🎯 4. ĐẶC TẢ CHI TIẾT 40 USE CASES NGUYÊN TỬ (GRANULAR USE CASES)

Để đảm bảo tính khả thi trong kỹ nghệ phần mềm và loại bỏ hoàn toàn tính trừu tượng, hệ thống không gom nhóm Use Case chung chung mà phân rã thành **40 Use Cases nguyên tử (Atomic / Granular Use Cases)**, ánh xạ trực tiếp 1-1 tới từng hành động và màn hình độc lập đã xây dựng:

### 4.1. Phân Hệ Onboarding & Xác Thực An Ninh (UC-01 → UC-08)
| Mã UC | Tên Use Case Nguyên Tử | Actor Chính | Tiền Điều Kiện | Kịch Bản Thao Tác Chi Tiết (Main Scenario) | Ngoại Lệ & Rẽ Nhánh | Màn Hình Figma |
|:---:|---|:---:|---|---|---|:---:|
| **UC-01** | Xem Animated Loading 3 Giai Đoạn | ACT-02 | Mở ứng dụng ARKI. | 1. Hệ thống hiển thị Splash Screen 01.<br>2. Thanh nạp 15% (800ms) nạp catalog.<br>3. Tiến trình nhảy 65% (700ms) tải 3D assets.<br>4. Đạt 100% (600ms).<br>5. Tự trượt sang Onboarding 1. | Mất mạng: Dùng tài nguyên đệm có sẵn. | \`01\` |
| **UC-02** | Xem Giới Thiệu Kiệt Tác Pritzker | ACT-02 | Đang ở màn hình \`02\`. | 1. Đọc giá trị kiệt tác Pritzker Masters.<br>2. Quan sát ảnh bìa kiến trúc 393px bo góc 28px.<br>3. Bấm \`Continue →\`.<br>4. Điều hướng sang Onboarding 2. | Bấm nút Back lùi lại an toàn. | \`02\` |
| **UC-03** | Xem Giới Thiệu Công Nghệ 3D VR & Solar | ACT-02 | Đang ở màn hình \`03\`. | 1. Đọc thông điệp công nghệ 3D Matterport & Solar Study.<br>2. Xem hình minh họa phòng khách thông tầng.<br>3. Bấm \`Next Feature →\`.<br>4. Chuyển sang màn hình 04. | Vuốt sang trái để chuyển trang. | \`03\` |
| **UC-04** | Xem Giới Thiệu Cố Vấn KTS Trưởng | ACT-02 | Đang ở màn hình \`04\`. | 1. Đọc thông điệp Direct Studio Advisory.<br>2. Xem ảnh biệt thự hoàng hôn vách biển.<br>3. Bấm \`Get Started ✦\`.<br>4. Mở cổng đăng nhập 05. | Bấm nút Back lùi lại Onboarding 2. | \`04\` |
| **UC-05** | Đăng Nhập Khách VIP & Khách Vãng Lai | ACT-02, ACT-01 | Đang ở cổng \`05\`. | 1. Nhập email Forbes Global & mật khẩu.<br>2. Bấm Truy Cập Bộ Sưu Tập Kín.<br>3. Hoặc bấm Đăng Nhập FaceID.<br>4. Hoặc bấm \`Enter as Guest Observer →\` vào thẳng Home Feed 06. | Nhập sai tài khoản: Hiển thị viền đỏ cảnh báo. | \`05\` |
| **UC-06** | Xác Thực Sinh Trắc Học FaceID Gate | ACT-02, SYS-01 | Chọn FaceID tại \`05\`. | 1. Màn hình 05b kích hoạt vòng cảm biến hồng ngoại.<br>2. Quét đối soát sinh trắc học khuôn mặt.<br>3. Nhận diện thành công, cấp Token \`#ARK-SEC-992\`.<br>4. Chuyển sang nhập OTP 05c. | Quét lỗi: Rung nhẹ haptic, cho nhập PIN dự phòng. | \`05b\` |
| **UC-07** | Xác Thực Mã Bảo Mật Phần Cứng OTP | ACT-02, SYS-01 | Quét FaceID thành công, đang ở \`05c\`. | 1. Hệ thống sinh mã OTP 6 số ngẫu nhiên.<br>2. Người dùng nhập 6 số qua bàn phím bảo vệ ảo.<br>3. Đối soát mã hợp lệ trong 30s.<br>4. Chuyển sang màn hình ký NDA 05d. | Sai OTP > 3 lần: Khóa tài khoản tạm thời 15 phút. | \`05c\` |
| **UC-08** | Ký Thỏa Thuận Bảo Mật Tài Sản Kín (NDA) | ACT-02, ACT-05 | Xác thực OTP thành công, đang ở \`05d\`. | 1. Đọc các điều khoản bảo mật off-market listings.<br>2. Cam kết không rò rỉ toạ độ và hình ảnh tư gia.<br>3. Bấm \`Ký Điện Tử & Tiếp Tục ✦\`.<br>4. Mở khóa toàn bộ dữ liệu tại Home Feed 06. | Từ chối ký: Đưa người dùng về chế độ Khách cơ bản. | \`05d\` |

---

### 4.2. Phân Hệ Khám Phá, Lọc Nâng Cao & Bản Đồ Vệ Tinh (UC-09 → UC-13)
| Mã UC | Tên Use Case Nguyên Tử | Actor Chính | Tiền Điều Kiện | Kịch Bản Thao Tác Chi Tiết (Main Scenario) | Ngoại Lệ & Rẽ Nhánh | Màn Hình Figma |
|:---:|---|:---:|---|---|---|:---:|
| **UC-09** | Duyệt Bảng Tin Theo Danh Mục Kiến Trúc | ACT-02, ACT-01 | Đang ở Home Feed \`06\`. | 1. Xem thẻ Hero Villa The Glass Sanctuary ($4.25M).<br>2. Chạm chip \`Oceanfront\` (chuyển sang 06b).<br>3. Chạm chip \`Brutalist\` (chuyển sang 06c).<br>4. Chạm chip \`Biophilic\` (chuyển sang 06d).<br>5. Chạm \`All Works\` quay về 06. | Đang tải: Hiển thị skeleton card mượt mà. | \`06, 06b, 06c, 06d\` |
| **UC-10** | Mở & Cấu Hình Bộ Lọc Tiêu Chí Đa Tầng | ACT-02 | Đang ở Home Feed \`06\`. | 1. Bấm nút \`🔍 Filter\` ở góc trên.<br>2. Khay lọc \`07\` trượt từ trên xuống (\`MOVE_IN TOP\`).<br>3. Kéo thanh giá chọn khoảng $2.5M - $12M.<br>4. Chọn chip studio Tadao Ando.<br>5. Bấm \`✕ Close\` nếu muốn hủy. | Chạm nền tối bên ngoài để trượt đóng bộ lọc. | \`07\` |
| **UC-11** | Áp Dụng Bộ Lọc & Xem Kết Quả Tìm Kiếm | ACT-02 | Đã chọn tiêu chí tại \`07\`. | 1. Bấm nút \`Hiển Thị 14 Bất Động Sản Thỏa Mãn\`.<br>2. Màn hình \`07b\` trả về 14 dinh thự phù hợp.<br>3. Quan sát các thẻ tóm tắt giá và diện tích.<br>4. Chạm vào 1 thẻ vào chi tiết hoặc bấm Back về 06. | Không có kết quả: Hệ thống gợi ý mở rộng khoảng giá. | \`07, 07b\` |
| **UC-12** | Tra Cứu Bất Động Sản Trên Bản Đồ Vệ Tinh | ACT-02, ACT-01 | Đang ở Home Feed \`06\`. | 1. Bấm nút \`🗺 Map\` trên thanh danh mục.<br>2. Màn hình bản đồ vệ tinh \`08\` hiển thị bán đảo Sơn Trà.<br>3. Quan sát các điểm ghim GPS định vị dọc vách biển.<br>4. Bấm nút \`← Feed\` quay lại bảng tin. | Lỗi định vị: Tự động dùng bản đồ vệ tinh ngoại tuyến. | \`08\` |
| **UC-13** | Xem Thẻ Tóm Tắt Ghim Vị Trí Bản Đồ | ACT-02 | Đang ở bản đồ vệ tinh \`08\`. | 1. Chạm ghim toạ độ The Glass Sanctuary.<br>2. Bảng kéo Map Pin Card \`08b\` xuất hiện ở đáy.<br>3. Đọc thông số: $4.25M, 850 m², bờ biển Sơn Trà.<br>4. Bấm \`View Pin →\` vào thẳng trang chi tiết 09. | Chạm ra ngoài ghim: Bảng thẻ ghim tự động ẩn. | \`08, 08b, 09\` |

---

### 4.3. Phân Hệ Thẩm Định Chi Tiết Dinh Thự & Kỹ Thuật CAD (UC-14 → UC-19)
| Mã UC | Tên Use Case Nguyên Tử | Actor Chính | Tiền Điều Kiện | Kịch Bản Thao Tác Chi Tiết (Main Scenario) | Ngoại Lệ & Rẽ Nhánh | Màn Hình Figma |
|:---:|---|:---:|---|---|---|:---:|
| **UC-14** | Xem Hồ Sơ Chi Tiết Kiệt Tác Dinh Thự | ACT-02, ACT-03 | Mở màn hình \`09\`. | 1. Xem ảnh bìa tràn viền 393px.<br>2. Đọc 6 thông số công thái học ($4.25M, 850m², 5 Suites, Heli-pad, 35m Pool, Wine Cellar).<br>3. Nội dung khóa gọn trọn vẹn trong chiều cao 852px.<br>4. Bấm nút tròn kính mờ Back (←) quay về an toàn. | Single Viewport loại bỏ hoàn toàn lỗi tràn khung. | \`09, 09b, 09c\` |
| **UC-15** | Đọc Bài Luận Triết Lý & Phác Thảo KTS | ACT-03, ACT-04 | Đang ở trang chi tiết \`09\`. | 1. Bấm nút \`Triết lý Kiến Trúc Sư & Bản Vẽ Phác Thảo →\`.<br>2. Màn hình \`10\` hiển thị chân dung KTS Tadao Ando.<br>3. Đọc bài luận hình học ánh sáng & bê tông.<br>4. Chiêm ngưỡng bản phác thảo tay nguyên tác.<br>5. Bấm nút tròn kính mờ Back quay về 09. | Chạm đúp vào phác thảo để xem phóng đại. | \`10\` |
| **UC-16** | Soi Bản Vẽ Kỹ Thuật CAD Mặt Bằng 1:100 | ACT-04, ACT-03 | Đang ở hồ sơ kỹ thuật. | 1. Mở màn hình \`10b\` - Blueprint Level 1 Floorplan.<br>2. Kiểm tra lưới toạ độ CAD chuẩn tỷ lệ 1:100.<br>3. Kiểm tra diện tích sàn 850 m², đại sảnh và hồ bơi.<br>4. Bấm nút quay lại trang chi tiết. | Bản vẽ bảo mật: Yêu cầu mở khóa xác thực sinh trắc. | \`10b\` |
| **UC-17** | Soi Bản Vẽ CAD Penthouse & Sân Bay Heli | ACT-04, SYS-04 | Đang ở bản vẽ kỹ thuật. | 1. Chuyển sang \`10c\` - Blueprint Penthouse & Roof.<br>2. Soi xét thông số góc tiếp cận hạ cánh $108^\circ$ ESE của sân bay trực thăng.<br>3. Kiểm tra khả năng chịu tải trọng sàn mái Bell 429.<br>4. Bấm quay lại. | Góc tiếp cận có vật cản: Hiển thị cảnh báo hàng không. | \`10c\` |
| **UC-18** | Khám Phá Bảng Mẫu Vật Liệu Hoàn Thiện | ACT-02, ACT-03 | Đang ở chi tiết dinh thự \`09\`. | 1. Mở màn hình \`10d\` - Materials & Finishes.<br>2. Quan sát các ô mẫu vật liệu bo góc 14px.<br>3. Thẩm định vân đá Navona Travertine Ý.<br>4. Thẩm định gỗ nung Shou Sugi Ban kháng mặn.<br>5. Thẩm định tấm ốp Titanium 4mm chống ăn mòn. | Chạm vào từng mẫu để đọc chứng chỉ nguồn gốc. | \`10d\` |
| **UC-19** | Mô Phỏng Quỹ Đạo Mặt Trời 24h & Bóng Đổ | ACT-02, ACT-03 | Đang ở chi tiết dinh thự \`09\`. | 1. Mở màn hình \`10e\` - Solar Path 24h Study.<br>2. Quan sát mặt đồng hồ quỹ đạo mặt trời 24 giờ.<br>3. Xem góc chiếu nắng bình minh lúc 06:00.<br>4. Xem bóng đổ trần kính đỉnh trưa 12:00.<br>5. Xem hướng hoàng hôn biển 18:00.<br>6. Bấm quay lại. | Kéo thanh thời gian để xem mô phỏng liên tục. | \`10e\` |

---

### 4.4. Phân Hệ Thực Tế Ảo 3D VR & Media Siêu Cấp (UC-20 → UC-25)
| Mã UC | Tên Use Case Nguyên Tử | Actor Chính | Tiền Điều Kiện | Kịch Bản Thao Tác Chi Tiết (Main Scenario) | Ngoại Lệ & Rẽ Nhánh | Màn Hình Figma |
|:---:|---|:---:|---|---|---|:---:|
| **UC-20** | Khám Phá 360° Street View Cuộn 2D Pan | ACT-02 | Bấm \`🥽 Không Gian 3D\` trên màn hình \`09\`. | 1. Màn hình \`11\` mở dải ảnh panorama 3400x1800px.<br>2. Click-drag chuột/ngón tay cuộn tự do 2D (\`BOTH\`):\n   - Kéo ngang để xoay 360° quanh đại sảnh 7.2m.\n   - Kéo xuống ngước nhìn vòm giếng trời.\n   - Kéo lên cúi nhìn mặt hồ bơi nước mặn 35m.\n   - Lướt chéo 45° khám phá góc nhìn mở.<br>3. Tầng HUD kính mờ cố định không trôi. | Cơ chế ghép ảnh nhân bản A-A giúp lướt không bị khựng mép. | \`11\` |
| **UC-21** | Tương Tác Điểm Hotspot Trong Không Gian Ảo | ACT-02 | Đang ở không gian 360° Street View \`11\`. | 1. Định vị 4 điểm Hotspot không gian phân tầng.<br>2. Chạm Hotspot \`◉ Đại Sảnh Thông Tầng 7.2m\`.\n3. Chạm Hotspot \`◉ Bếp Đảo Boffi\`.\n4. Chạm Hotspot \`🏊 Hồ Bơi Nước Mặn 35m\`.\n5. Chạm Hotspot \`🚁 Bãi Đáp Trực Thăng\`.\n6. Khung nhìn camera chuyển đổi góc nhìn tức thì. | Hotspot đang nạp: Hiển thị vòng tròn radar quét. | \`11\` |
| **UC-22** | Xoay Mô Hình 3D Bóc Mái Bằng Cử Chỉ Drag | ACT-02 | Chuyển sang chế độ 3D Dollhouse \`11b\`. | 1. Màn hình hiển thị mô hình bóc mái góc 000°.<br>2. Nhấn giữ và vuốt ngang màn hình (\`ON_DRAG\`).<br>3. Mô hình xoay qua 090° qua SMART_ANIMATE (300ms).<br>4. Tiếp tục vuốt xoay qua góc 180° và 270°.<br>5. Vuốt tiếp quay về 000° ban đầu.<br>6. Bấm nút Back quay về 09. | Thả tay lỡ cỡ: Tự động hít về góc vuông gần nhất. | \`11b\` |
| **UC-23** | Xem Phim Flycam Drone 4K & Spatial Audio | ACT-02 | Bấm \`▶ Xem Video Tour 4K\` trên \`09\`. | 1. Mở màn hình video player \`12a\` (Paused).<br>2. Quan sát tỷ lệ khung hình 16:9 sắc nét.<br>3. Âm thanh vòm Dolby Atmos 7.1.4 phát qua loa.<br>4. Bấm nút đóng \`✕\` quay lại trang chi tiết. | Mạng yếu: Tự động hạ độ phân giải chống gián đoạn. | \`12, 12a, 12b\` |
| **UC-24** | Bật / Tắt Play/Pause & Kéo Scrubber Bar | ACT-02 | Đang ở trình phát video \`12a\`. | 1. Bấm nút tròn lớn \`▶ Play\` ở giữa màn hình.<br>2. Trạng thái chuyển sang đang phát \`12b\`.\n3. Nút đổi thành biểu tượng tạm dừng \`❚❚ Pause\`.\n4. Thanh scrubber chạy màu hổ phách, hiển thị thời gian 02:45 / 04:10.<br>5. Bấm lại Pause để đưa về trạng thái dừng. | Chạm đúp vào màn hình để chuyển chế độ Cinema Fullscreen. | \`12a, 12b\` |
| **UC-25** | Duyệt Chuỗi 5 Slider Ảnh Toàn Cảnh Vô Tận | ACT-02, ACT-01 | Chạm vào thumbnail ảnh tại \`09\`. | 1. Mở Slider 1 (\`13\`) - Đại sảnh Travertine 7.2m.<br>2. Bấm Next -> Slider 2 (\`14\`) - Bếp đảo Boffi.<br>3. Bấm Next -> Slider 3 (\`15\`) - Hồ bơi hoàng hôn.<br>4. Bấm Next -> Slider 4 (\`15b\`) - Master Hinoki.<br>5. Bấm Next -> Slider 5 (\`15c\`) - Hầm rượu 2,400 chai.<br>6. Bấm \`↺ Quay Về Ảnh Đầu\` -> chuyển vòng tròn về Slider 1.<br>7. Bấm Close bất kỳ lúc nào để quay lại 09. | Bấm \`← Prev Photo\` để lùi lại ảnh trước an toàn. | \`13, 14, 15, 15b, 15c\` |
| **UC-26** | Xem Thư Viện Ảnh Lưới Toàn Màn Hình | ACT-02, ACT-03 | Bấm biểu tượng xem lưới tại trang chi tiết. | 1. Màn hình \`23\` hiển thị lưới 9 ô ảnh kiến trúc.<br>2. Xem phân loại: Ngoại Thất, Nội Thất, Chi Tiết.<br>3. Chạm vào 1 ảnh để xem kích thước đầy đủ.<br>4. Bấm nút Back quay về trang chi tiết. | Chạm giữ ảnh để lưu ảnh vào máy hoặc chia sẻ. | \`23\` |

---

### 4.5. Phân Hệ Đặt Lịch Khảo Sát & Hậu Cần Đón Tiếp VIP (UC-27 → UC-30)
| Mã UC | Tên Use Case Nguyên Tử | Actor Chính | Tiền Điều Kiện | Kịch Bản Thao Tác Chi Tiết (Main Scenario) | Ngoại Lệ & Rẽ Nhánh | Màn Hình Figma |
|:---:|---|:---:|---|---|---|:---:|
| **UC-27** | Đặt Lịch Hẹn Khảo Sát Dinh Thự VIP | ACT-02, ACT-05 | Bấm \`Đặt Lịch Tham Quan Riêng ✦\` tại \`09\`. | 1. Mở màn hình lịch hẹn \`16\`.\n2. Chọn ngày hẹn trong tháng 10/2026 (chọn Thứ Tư 16/10).\n3. Chọn khung giờ vàng 14:30 đón tiếp.<br>4. Bấm nút \`Tiếp Tục Chọn Phương Tiện Đón →\` sang 16b. | Khung giờ kín: Hiển thị màu xám mờ và gợi ý giờ khác. | \`16\` |
| **UC-28** | Lựa Chọn Phương Tiện Hậu Cần Đón Tiếp | ACT-02, ACT-05, SYS-04 | Đã chọn ngày giờ, đang ở \`16b\`. | 1. Xem 3 phương án đón tiếp chuyên biệt:\n   - Trực thăng Bell 429 (hạ cánh sân thượng).\n   - Du thuyền Sunseeker (cập cầu cảng riêng).\n   - Xe Rolls-Royce Phantom (đón sân bay).\n2. Chọn Trực thăng Bell 429.<br>3. Bấm \`Xác Nhận Yêu Cầu Tham Quan ✦\`.\n4. Chuyển sang màn hình phát hành vé 17. | Thời tiết cấm bay: Concierge tự động đề xuất đổi sang du thuyền. | \`16b\` |
| **UC-29** | Tiếp Nhận Thẻ Thông Hành VIP PASS Mã QR | ACT-02, ACT-05 | Xác nhận đặt lịch thành công. | 1. Màn hình \`17\` báo "✓ Viewing Confirmed".<br>2. Hiển thị thẻ VIP BOARDING PASS #ARK-8821.<br>3. Kiểm tra thông số: The Glass Sanctuary, Thứ Tư 16/10 lúc 14:30, KTS chủ trì đón tiếp.<br>4. Mã QR động mã hóa an ninh hiển thị rõ ràng.<br>5. Bấm \`Quay Về Trang Chủ →\` về Home Feed 06. | Chụp màn hình thẻ: Tự động đóng dấu chìm watermark. | \`17\` |
| **UC-30** | Đồng Bộ Thẻ VIP Passbook Vào Apple Wallet | ACT-02, SYS-02 | Đang ở thẻ VIP Pass \`17\`. | 1. Bấm nút \`Thêm Vào Apple Wallet\`.\n2. Màn hình \`17b\` mở giao diện Passbook chuẩn iOS.\n3. Ký số chứng chỉ bảo mật và lưu vào Wallet.<br>4. Kích hoạt tính năng chạm NFC check-in không tiếp xúc.<br>5. Giờ hạ cánh tự động ghim lên Dynamic Island. | Thiết bị không có NFC: Cho phép lưu ảnh QR vào thư viện. | \`17, 17b\` |

---

### 4.6. Phân Hệ Tư Vấn Trực Tiếp KTS Chủ Trì & Tùy Biến (UC-31 → UC-33)
| Mã UC | Tên Use Case Nguyên Tử | Actor Chính | Tiền Điều Kiện | Kịch Bản Thao Tác Chi Tiết (Main Scenario) | Ngoại Lệ & Rẽ Nhánh | Màn Hình Figma |
|:---:|---|:---:|---|---|---|:---:|
| **UC-31** | Nhắn Tin Mã Hóa 1-1 Với Văn Phòng KTS | ACT-02, ACT-04 | Bấm nút \`💬 Chat Architect\` tại \`09\`. | 1. Mở kênh chat \`19\` với Studio Tadao Ando Partners.<br>2. Đọc tin nhắn chào mừng từ KTS trưởng.<br>3. Đọc phản hồi về việc kéo dài hồ bơi thêm +4m.<br>4. Soạn câu hỏi về việc lắp kính Low-E cản nhiệt UV.<br>5. Bấm gửi tin nhắn.<br>6. Bấm nút Back quay về trang chi tiết. | KTS đang bận: Tin nhắn được chuyển vào hàng đợi ưu tiên. | \`19\` |
| **UC-32** | Tham Gia Họp Truyền Hình Live Video Tư Vấn | ACT-02, ACT-04 | Nhận được link mời họp trong chat \`19\`. | 1. Bấm vào link mời họp video trực tuyến.<br>2. Màn hình \`19b\` kích hoạt camera và micro bảo mật.<br>3. Kết nối cuộc gọi truyền hình chất lượng cao với KTS chủ trì.<br>4. KTS chia sẻ màn hình bản vẽ CAD và mô hình 3D.<br>5. Trao đổi giải pháp gia cố dầm chịu lực.<br>6. Bấm nút kết thúc cuộc gọi an toàn. | Mất mạng: Tự động ghi âm cuộc gọi và lưu bản nháp trao đổi. | \`19b\` |
| **UC-33** | Nộp Phiếu Đề Xuất Tùy Biến Kết Cấu Công Trình | ACT-02, ACT-04, ACT-06 | Sau khi thống nhất ý tưởng tư vấn. | 1. Mở biểu mẫu \`19c\` - Custom Modification Request.<br>2. Điền hạng mục 1: Kéo dài hồ bơi công xôn +4m.<br>3. Điền hạng mục 2: Lắp đặt kính Low-E Solar chống UV.<br>4. Ký xác nhận nộp yêu cầu.<br>5. Hệ thống gửi hồ sơ để lập dự toán phụ lục. | Yêu cầu vượt tải trọng an toàn: KTS gửi văn bản phản hồi kỹ thuật. | \`19c\` |

---

### 4.7. Phân Hệ Tính Toán Tài Chính & Ký Quỹ Escrow (UC-34 → UC-36)
| Mã UC | Tên Use Case Nguyên Tử | Actor Chính | Tiền Điều Kiện | Kịch Bản Thao Tác Chi Tiết (Main Scenario) | Ngoại Lệ & Rẽ Nhánh | Màn Hình Figma |
|:---:|---|:---:|---|---|---|:---:|
| **UC-34** | Tính Toán Đòn Bẩy Vay & Trả Góp Định Kỳ | ACT-02, ACT-06 | Bấm \`📊 Investment Calc\` tại \`09\`. | 1. Màn hình \`20\` mở bộ tính toán tài chính.\n2. Nhập giá mua dinh thự: $4,250,000.<br>3. Chọn tỷ lệ trả trước 30% ($1,275,000).<br>4. Hệ thống tính tự động chi phí trả góp $18,450/tháng.<br>5. Điều chỉnh thời hạn vay 15 - 25 năm để xem chi phí thay đổi.<br>6. Bấm nút Back quay lại. | Nhập số tiền trả trước < 20%: Cảnh báo vượt trần tín dụng. | \`20\` |
| **UC-35** | Thiết Lập Tài Khoản Ký Quỹ Crypto Escrow | ACT-03, ACT-06, SYS-03 | Đang ở tính toán tài chính. | 1. Chuyển sang màn hình \`20b\` - Crypto Escrow.<br>2. Xem tỷ giá quy đổi sang USD, EUR, Bitcoin, ETH.<br>3. Dinh thự tương đương 68.2 BTC theo tỷ giá thực.<br>4. Thiết lập hợp đồng thông minh Smart Contract khóa tiền (Escrow Lock).<br>5. Kích hoạt cơ chế đa chữ ký (Multi-Sig).<br>6. Bấm hoàn tất. | Tỷ giá biến động mạnh: Kích hoạt cơ chế khóa giá Price Lock 15 phút. | \`20b\` |
| **UC-36** | Phân Tích Biểu Đồ Tăng Trưởng Giá Vốn 10 Năm | ACT-02, ACT-06 | Đang ở mục tài chính. | 1. Mở màn hình \`20c\` - 10-Year Capital Appreciation.<br>2. Quan sát đường biểu đồ tăng giá vốn (+14.2%/năm).<br>3. Xem giá trị dự phóng 5 năm ($7.8M) và 10 năm ($11.8M).<br>4. Đọc các chỉ số phân tích biên độ khan hiếm quỹ đất bán đảo Sơn Trà.<br>5. Bấm quay lại. | Biểu đồ tải lỗi: Hiển thị bảng số liệu thống kê thay thế. | \`20c\` |

---

### 4.8. Phân Hệ Quản Lý Bộ Sưu Tập, Hồ Sơ VIP & Offline (UC-37 → UC-39)
| Mã UC | Tên Use Case Nguyên Tử | Actor Chính | Tiền Điều Kiện | Kịch Bản Thao Tác Chi Tiết (Main Scenario) | Ngoại Lệ & Rẽ Nhánh | Màn Hình Figma |
|:---:|---|:---:|---|---|---|:---:|
| **UC-37** | Quản Lý Danh Mục Kiệt Tác Đã Lưu | ACT-03, ACT-02 | Bấm tab \`♡ Saved\` trên Bottom Nav. | 1. Màn hình \`18\` hiển thị 3 kiệt tác đã lưu.<br>2. Xem tổng giá trị danh mục: $17,050,000.<br>3. Xem thẻ dinh thự The Glass Sanctuary ($4.25M).<br>4. Bấm nút \`View →\` vào thẳng trang chi tiết 09.<br>5. Bấm nút Back quay về Home Feed. | Danh sách trống: Hiển thị gợi ý các kiệt tác tiêu biểu trên Feed. | \`18\` |
| **UC-38** | Tạo Thư Mục Bộ Sưu Tập Riêng Tư Mới | ACT-03, ACT-02 | Đang ở danh mục đã lưu \`18\`. | 1. Bấm nút \`+ Tạo Bộ Sưu Tập Mới\`.\n2. Màn hình \`18b\` mở form nhập tên thư mục.<br>3. Đặt tên "Dinh Thự Vách Biển 2026".<br>4. Bật chế độ bảo mật riêng tư VIP (Private Encrypted Folder).<br>5. Bấm Xác Nhận Tạo.<br>6. Thư mục mới xuất hiện trong danh mục quản lý. | Trùng tên thư mục: Nhắc đổi tên phân biệt. | \`18b\` |
| **UC-39** | Xem Hồ Sơ Alexander Vance & Đặc Quyền VIP | ACT-03, ACT-05 | Bấm tab \`👤 Profile\` trên Bottom Nav. | 1. Màn hình \`21\` hiển thị hồ sơ cá nhân Alexander Vance.<br>2. Xác nhận danh vị: Black Diamond Architectural Patron #004.<br>3. Mở danh mục \`21b\` - Concierge Privileges.<br>4. Kích hoạt quyền cố vấn KTS 24/7 và quyền xem trước Sotheby\'s.<br>5. Bấm nút Đăng Xuất (Sign Out) nếu muốn thoát ra màn hình 05. | Thẻ hội viên gần hết hạn: Hiển thị nút liên hệ gia hạn nhanh. | \`21, 21b, 21c\` |
| **UC-40** | Tải & Quản Lý Dữ Liệu VR Không Gian Offline | ACT-03, SYS-05 | Đang ở phần cài đặt nâng cao. | 1. Mở màn hình \`24\` - Offline VR Spatial Cache.<br>2. Kiểm tra dung lượng đệm không gian 3D (1.2 GB).<br>3. Bấm Tải Về Toàn Bộ Mô Hình 3D Dinh Thự Sơn Trà.<br>4. Tiến trình nạp 100% vào bộ nhớ trong máy.<br>5. Bật chế độ máy bay kiểm tra: Không gian 360° vẫn xoay kéo mượt mà.<br>6. Bấm xóa đệm giải phóng bộ nhớ khi cần. | Máy không đủ bộ nhớ: Báo động và gợi ý tải gói nhẹ 400MB. | \`24\` |

---

### 4.9. Phân Hệ Điều Hướng Tiện Ích & Chuyển Đổi Theme / Ngôn Ngữ
*Use Case hệ thống điều hướng toàn diện*:
- **Mã UC**: \`UC-40b\` (hoặc tích hợp vào nhóm Drawer)
- **Tên**: Mở Navigation Drawer Menu (☰), Đổi Ngôn Ngữ VI/EN & Chuyển Theme Hai Chiều Tức Thì.
- **Actor chính**: Tất cả Actors (ACT-01 đến ACT-06).
- **Màn hình trực tiếp**: \`ARKI / 25 - Navigation Drawer Menu [Light]\` & Toàn bộ 104 màn hình.
- **Kịch bản thao tác**:
  1. Người dùng bấm Menu 3 gạch (☰) hoặc chạm Avatar trên Header Trang chủ.
  2. Khay điều hướng \`25\` trượt từ cạnh phải ra (\`SLIDE_IN\`).
  3. Quan sát thông tin định danh VIP Alexander Vance và ma trận 6 ô icon nét vẽ 2px.
  4. Chạm nút song ngữ \`VI\` $\leftrightarrow$ \`EN\` để đổi tức thì ngôn ngữ văn bản toàn app.
  5. Chạm nút icon nét vẽ Mặt Trời (☀️) / Mặt Trăng (🌙):
     - Kích hoạt hiệu ứng \`SMART_ANIMATE\` chuyển đổi mượt mà giữa Daylight Porcelain Theme và Nocturne Dark Theme.
     - Giữ nguyên vị trí cuộn và dữ liệu đang xem.
  6. Bấm nút đóng \`✕\` hoặc chạm vùng nền tối bên trái để trượt đóng menu (\`SLIDE_OUT\`).

---

## 🔗 5. MA TRẬN TRUY VẾT YÊU CẦU & MÀN HÌNH THIẾT KẾ (TRACEABILITY MATRIX - 40 USE CASES)

Ma trận dưới đây xác nhận tính liên kết đầy đủ 1-1 giữa **User Story**, **40 Granular Use Cases**, **Màn hình Figma cụ thể (Dark & Light)**, **Master Components** sử dụng, **Prototype Trigger** và **Trạng thái UAT**:

| Mã UC | Mã US | Tên Nghiệp Vụ Cốt Lõi | Actor Thực Thi | Màn Hình Dark Theme | Màn Hình Light Theme | Master Components Sử Dụng | Prototype Trigger & Animation | Trạng Thái UAT |
|:---:|:---:|---|---|---|---|---|---|:---:|
| **UC-01** | US-01 | Animated Loading 3 giai đoạn | ACT-02 | ARKI / 01 - Splash | ARKI / 01 - Splash [Light] | Frame Container | AFTER_TIMEOUT (800ms -> 700ms -> 600ms) | ✅ PASS |
| **UC-02** | US-01 | Onboarding 1 - Pritzker Masters | ACT-02, ACT-01 | ARKI / 02 - Onboarding | ARKI / 02 - Onboarding [Light] | Primary Button | ON_CLICK -> SLIDE_IN (Left, 0.35s) | ✅ PASS |
| **UC-03** | US-01 | Onboarding 2 - 3D VR & Solar | ACT-02, ACT-01 | ARKI / 03 - Onboarding VR | ARKI / 03 - Onboarding VR [Light] | Primary Button | ON_CLICK -> SLIDE_IN (Left, 0.35s) | ✅ PASS |
| **UC-04** | US-01 | Onboarding 3 - Studio Advisory | ACT-02, ACT-01 | ARKI / 04 - Onboarding Studio | ARKI / 04 - Onboarding Studio [Light] | Primary Button | ON_CLICK -> SMART_ANIMATE (0.4s) | ✅ PASS |
| **UC-05** | US-02 | Cổng Đăng Nhập VIP & Guest Mode | ACT-02, ACT-01 | ARKI / 05 - Authentication | ARKI / 05 - Authentication [Light] | Primary & Secondary Buttons | ON_CLICK -> SMART_ANIMATE (0.4s) | ✅ PASS |
| **UC-06** | US-02 | Quét Sinh Trắc FaceID Gate | ACT-02, SYS-01 | ARKI / 05b - FaceID Gate | ARKI / 05b - FaceID Gate [Light] | Sensor Scan Ring | AFTER_TIMEOUT -> SMART_ANIMATE | ✅ PASS |
| **UC-07** | US-02 | Xác Thực Mã Phần Cứng OTP 6 Số | ACT-02, SYS-01 | ARKI / 05c - OTP Verification | ARKI / 05c - OTP Verification [Light] | PIN Keypad Frame | ON_CLICK -> SMART_ANIMATE (0.35s) | ✅ PASS |
| **UC-08** | US-02 | Ký Thỏa Thuận Bảo Mật VIP NDA | ACT-02, ACT-05 | ARKI / 05d - VIP Advisory NDA | ARKI / 05d - VIP Advisory NDA [Light] | Primary Button | ON_CLICK -> SMART_ANIMATE to 06 | ✅ PASS |
| **UC-09** | US-03 | Duyệt Feed 4 Phong Cách Kiến Trúc | ACT-02, ACT-01 | ARKI / 06, 06b, 06c, 06d | ARKI / 06, 06b, 06c, 06d [Light] | Estate Preview Card, Bottom Nav | ON_CLICK -> DISSOLVE (0.3s) | ✅ PASS |
| **UC-10** | US-04 | Mở & Cấu Hình Khay Lọc Đa Tầng | ACT-02 | ARKI / 07 - Search & Filters | ARKI / 07 - Search & Filters [Light] | Primary Button, Slider Bar | MOVE_IN (Top, 0.3s) <-> SLIDE_OUT | ✅ PASS |
| **UC-11** | US-04 | Xem 14 Kết Quả Lọc Đã Chọn | ACT-02 | ARKI / 07b - Search Results | ARKI / 07b - Search Results [Light] | Estate Preview Card | ON_CLICK -> SMART_ANIMATE | ✅ PASS |
| **UC-12** | US-05 | Tra Cứu Bản Đồ Vệ Tinh Sơn Trà | ACT-02 | ARKI / 08 - Estate Map View | ARKI / 08 - Estate Map View [Light] | Secondary Button, Map Layer | SMART_ANIMATE <-> SLIDE_OUT | ✅ PASS |
| **UC-13** | US-05 | Xem Thẻ Tóm Tắt Ghim Vị Trí Bản Đồ | ACT-02 | ARKI / 08b - Map Pin Sheet | ARKI / 08b - Map Pin Sheet [Light] | Estate Preview Card | ON_CLICK -> SMART_ANIMATE to 09 | ✅ PASS |
| **UC-14** | US-06 | Xem Hồ Sơ Chi Tiết Dinh Thự 6 Chỉ Số | ACT-02, ACT-03 | ARKI / 09, 09b, 09c | ARKI / 09, 09b, 09c [Light] | Primary Button, VR Tour Badge | SMART_ANIMATE <-> SLIDE_OUT | ✅ PASS |
| **UC-15** | US-07 | Đọc Triết Lý & Xem Phác Thảo KTS | ACT-03, ACT-04 | ARKI / 10 - Architect Phil | ARKI / 10 - Architect Phil [Light] | Secondary Button | SMART_ANIMATE <-> SLIDE_OUT | ✅ PASS |
| **UC-16** | US-08 | Soi Bản Vẽ CAD Mặt Bằng 1:100 | ACT-04, ACT-03 | ARKI / 10b - CAD Blueprint L1 | ARKI / 10b - CAD Blueprint L1 [Light] | Secondary Button | SMART_ANIMATE (0.35s) | ✅ PASS |
| **UC-17** | US-08 | Soi Bản Vẽ Penthouse & Heli-pad 108° | ACT-04, SYS-04 | ARKI / 10c - Blueprint Roof | ARKI / 10c - Blueprint Roof [Light] | Secondary Button | SMART_ANIMATE (0.35s) | ✅ PASS |
| **UC-18** | US-09 | Khám Phá Bảng Mẫu Đá, Gỗ & Kim Loại | ACT-02, ACT-03 | ARKI / 10d - Materials | ARKI / 10d - Materials [Light] | Material Swatch Frames | SMART_ANIMATE (0.35s) | ✅ PASS |
| **UC-19** | US-09 | Mô Phỏng Quỹ Đạo Mặt Trời 24 Giờ | ACT-02, ACT-03 | ARKI / 10e - Solar Path Study | ARKI / 10e - Solar Path Study [Light] | Solar Dial Component | SMART_ANIMATE (0.35s) | ✅ PASS |
| **UC-20** | US-10 | 360° Street View 2D Pan Tự Do | ACT-02 | ARKI / 11 - 360 Panorama | ARKI / 11 - 360 Panorama [Light] | Nút tròn kính mờ 42x42px | BOTH (2D Pan Cuộn Ngang/Dọc/Chéo) | ✅ PASS |
| **UC-21** | US-10 | Chạm Hotspot Chuyển Không Gian 360° | ACT-02 | ARKI / 11 - 360 Panorama | ARKI / 11 - 360 Panorama [Light] | Hotspot Pill Markers | ON_CLICK -> Camera Teleport | ✅ PASS |
| **UC-22** | US-11 | Xoay Mô Hình 3D Bóc Mái Bằng Drag | ACT-02 | ARKI / 11b - 3D Dollhouse Drag | ARKI / 11b - 3D Dollhouse Drag [Light] | Nút tròn kính mờ 42x42px | ON_DRAG -> SMART_ANIMATE (300ms) | ✅ PASS |
| **UC-23** | US-12 | Xem Video Drone 4K & Spatial Audio | ACT-02 | ARKI / 12 - Video Tour Player | ARKI / 12 - Video Tour Player [Light] | Nút tròn kính mờ 42x42px | SMART_ANIMATE (0.4s) | ✅ PASS |
| **UC-24** | US-12 | Bật / Tắt Play/Pause & Kéo Scrubber | ACT-02 | ARKI / 12a, 12b (Play/Pause) | ARKI / 12a, 12b [Light] | Play/Pause Circle Button | ON_CLICK Play <-> Pause 02:45 | ✅ PASS |
| **UC-25** | US-13 | Duyệt Chuỗi 5 Slider Ảnh Vòng Lặp Kín | ACT-02 | ARKI / 13 - 15c (5 Sliders) | ARKI / 13 - 15c [Light] | Nút tròn kính mờ 42x42px | SLIDE_IN (Left) <-> DISSOLVE Loop | ✅ PASS |
| **UC-26** | US-13 | Xem Lưới 9 Khung Ảnh Toàn Màn Hình | ACT-02, ACT-03 | ARKI / 23 - Fullscreen Grid | ARKI / 23 - Fullscreen Grid [Light] | Nút tròn kính mờ 42x42px | ON_CLICK -> Zoom to Screen | ✅ PASS |
| **UC-27** | US-14 | Đặt Lịch Hẹn Khảo Sát Tháng 10/2026 | ACT-02, ACT-05 | ARKI / 16 - Schedule Viewing | ARKI / 16 - Schedule Viewing [Light] | Component / Primary Button | ON_CLICK -> SMART_ANIMATE (0.4s) | ✅ PASS |
| **UC-28** | US-14 | Chọn Đón Bằng Trực Thăng Bell 429 | ACT-02, SYS-04 | ARKI / 16b - Arrival Logistics | ARKI / 16b - Arrival Logistics [Light] | Transport Option Pills | ON_CLICK -> SMART_ANIMATE to 17 | ✅ PASS |
| **UC-29** | US-15 | Cấp Thẻ VIP BOARDING PASS #ARK-8821 | ACT-02, ACT-05 | ARKI / 17 - VIP Pass Confirm | ARKI / 17 - VIP Pass Confirm [Light] | Pass Boarding Card | SMART_ANIMATE (0.4s) | ✅ PASS |
| **UC-30** | US-15 | Lưu Thẻ VIP Passbook Vào Apple Wallet | ACT-02, SYS-02 | ARKI / 17b - Apple Wallet Pass | ARKI / 17b - Apple Wallet Pass [Light] | Apple Wallet Sync Button | PassKit API Sync + NFC Tap | ✅ PASS |
| **UC-31** | US-16 | Nhắn Tin Mã Hóa Với KTS Tadao Ando | ACT-02, ACT-04 | ARKI / 19 - Architect Chat | ARKI / 19 - Architect Chat [Light] | Chat Bubble Containers | MOVE_IN (Right) <-> SLIDE_OUT | ✅ PASS |
| **UC-32** | US-16 | Họp Truyền Hình Live Video Tư Vấn | ACT-02, ACT-04 | ARKI / 19b - Live Video Consult | ARKI / 19b - Live Video Consult [Light] | Video Call Window | WebRTC Video Sync + CAD Stream | ✅ PASS |
| **UC-33** | US-16 | Nộp Đơn Đề Xuất Tùy Biến Kết Cấu +4m | ACT-02, ACT-04 | ARKI / 19c - Custom Request | ARKI / 19c - Custom Request [Light] | Modification Form & Primary Btn | ON_CLICK -> Form Submit | ✅ PASS |
| **UC-34** | US-17 | Tính Đòn Bẩy Vay & Trả Góp Định Kỳ | ACT-02, ACT-06 | ARKI / 20 - Financial Calc | ARKI / 20 - Financial Calc [Light] | Financial Calculator Card | MOVE_IN (Bottom) <-> SLIDE_OUT | ✅ PASS |
| **UC-35** | US-17 | Ký Quỹ Bằng Bitcoin 68.2 BTC & Escrow | ACT-03, SYS-03 | ARKI / 20b - Crypto Escrow | ARKI / 20b - Crypto Escrow [Light] | Multi-Currency Selector | Smart Contract Escrow Lock | ✅ PASS |
| **UC-36** | US-17 | Phân Tích Dự Báo Tăng Giá Vốn 10 Năm | ACT-02, ACT-06 | ARKI / 20c - Capital Growth | ARKI / 20c - Capital Growth [Light] | Appreciation Chart Card | SMART_ANIMATE (0.35s) | ✅ PASS |
| **UC-37** | US-18 | Quản Lý Danh Mục Kiệt Tác Đã Lưu $17M | ACT-03 | ARKI / 18 - Saved Architecture | ARKI / 18 - Saved Architecture [Light] | Estate Preview Card, Bottom Nav | SMART_ANIMATE <-> DISSOLVE | ✅ PASS |
| **UC-38** | US-18 | Tạo Thư Mục Bộ Sưu Tập Riêng Tư | ACT-03 | ARKI / 18b - Curated Collection | ARKI / 18b - Curated Collection [Light] | Folder Form & Primary Btn | ON_CLICK -> Create Folder | ✅ PASS |
| **UC-39** | US-19 | Hồ Sơ Alexander Vance & Đặc Quyền | ACT-03, ACT-05 | ARKI / 21, 21b, 21c (Profile) | ARKI / 21, 21b, 21c [Light] | Secondary Button, Badge | SMART_ANIMATE -> Logout to 05 | ✅ PASS |
| **UC-40** | US-20 | Menu 3 Gạch ☰, Đổi Theme & Song Ngữ | Tất cả Actors | ARKI / 25 - Drawer Menu | ARKI / 25 - Drawer Menu [Light] | Trọn bộ 10 Master Components | SLIDE_IN (Menu) + Cross-Theme Matrix | ✅ PASS |
`;

const sec4Index = content.indexOf('## 🎯 4. ĐẶC TẢ CHI TIẾT CÁC USE CASES TRỌNG TÂM');
const sec6Index = content.indexOf('## 🏆 6. TỔNG KẾT & GIÁ TRỊ THỰC THI');

if (sec4Index !== -1 && sec6Index !== -1) {
  content = content.slice(0, sec4Index) + newSection4and5 + '\n\n---\n\n' + content.slice(sec6Index);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ LUONG_NGHIEP_VU_ARKI.md successfully updated with 40 Granular Use Cases & Traceability Matrix!');
} else {
  console.error('❌ Could not locate section markers in LUONG_NGHIEP_VU_ARKI.md');
}
