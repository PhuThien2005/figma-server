# 🏛️ TÀI LIỆU ĐẶC TẢ CHI TIẾT 112 MÀN HÌNH HỆ THỐNG ARKI VIỆT NAM (ARKI 112-SCREEN ARCHITECTURE & SPECIFICATION)

> **Dự án:** Nền tảng Bất động sản Dinh thự & Tham quan Không gian 360° ARKI Việt Nam  
> **Phiên bản:** v4.5.0 (100% Master Component Instances Toàn Diện 112 Màn Hình, Pure Vietnamese Default, Dense Prototype Mesh >890 Wires)  
> **Tài liệu tham chiếu:** Thiết kế trực tiếp trên Canvas Figma Desktop (`main page`)  
> **Repository:** `https://github.com/PhuThien2005/figma-server.git`  
> **Ghi chú cho User:** Bạn có thể tùy chỉnh hoặc thêm bớt các mô tả trong file này để điều chỉnh nghiệp vụ dự án.

---

## 📑 MỤC LỤC HỆ THỐNG 8 PHÂN HỆ NGHIỆP VỤ (MODULE OVERVIEW)

| Phân Hệ | Tên Phân Hệ | Dải Màn Hình | Mục Đích Nghiệp Vụ Cốt Lõi |
| :---: | :--- | :---: | :--- |
| **MOD-1** | Onboarding, Khởi Động & Bản Sắc Văn Hóa | `SCR-001` → `SCR-010` | Chào đón giới thượng lưu, chuyển ngữ song ngữ, xác thực sinh trắc học kín đáo. |
| **MOD-2** | Khám Phá Dinh Thự Bento & Lưới Tác Phẩm | `SCR-011` → `SCR-020` | Bố cục Bento Grid, bộ lọc kiến trúc theo vùng miền, thẻ bất động sản đa giác quan. |
| **MOD-3** | Không Gian 360° VR & Bản Đồ Số Không Gian | `SCR-021` → `SCR-035` | Trải nghiệm Digital Twin, điểm chạm tương tác HUD, mô hình 3D ánh sáng thời gian thực. |
| **MOD-4** | Tác Quyền KTS & Câu Chuyện Di Sản | `SCR-036` → `SCR-050` | Hồ sơ KTS bậc thầy (Võ Trọng Nghĩa, Hoàng Thúc Hào), giải thưởng quốc tế, triết lý vật liệu xanh. |
| **MOD-5** | Dịch Vụ Quản Gia VIP & Khảo Sát Riêng Tư | `SCR-051` → `SCR-065` | Đặt lịch chuyên cơ/du thuyền, chuyên viên tư vấn 1-1, bảo mật danh tính tuyệt đối. |
| **MOD-6** | Tùy Biến Thiết Kế & Chất Liệu Kiến Trúc | `SCR-066` → `SCR-080` | Bộ cấu hình vật liệu (Gỗ Teak, Tre ép, Đá cẩm thạch), phong thủy vi khí hậu, dự toán thông minh. |
| **MOD-7** | Ký Kết NDA, Ký Quỹ Số & Pháp Lý Minh Bạch | `SCR-081` → `SCR-095` | Xem sổ hồng số, ký thỏa thuận bảo mật NDA bằng Smart Contract/Escrow ngân hàng. |
| **MOD-8** | Cài Đặt Cá Nhân Hóa, Chế Độ & Trợ Lý AI | `SCR-096` → `SCR-112` | Quản lý danh mục lưu trữ, hồ sơ gia tộc, tùy biến giao diện Sáng/Tối, cài đặt i18n. |

---

## 🎨 HỆ THỐNG MASTER COMPONENTS & DESIGN TOKENS (GLOBAL VARIABLES)

### 1. Bảng Design Tokens Toàn Cục (`ARKI Vietnam Design Tokens`)
Tất cả các thành phần trên Canvas đều được liên kết trực tiếp (`boundVariables`) với bộ biến toàn cục:
* `bg-porcelain`: `#FFFFFF` — Nền Canvas và thẻ bài thuần khiết, tinh khôi.
* `bg-card`: `#FAFAFC` — Nền thẻ thứ cấp, tạo phân tầng thị giác thanh lịch.
* `bg-surface`: `#F4F4F6` — Nền chip, pill, nút phụ và trường nhập liệu.
* `border`: `#E4E4E7` — Viền hairline 1px siêu mảnh, tinh xảo.
* `text-primary`: `#09090B` — Chữ đen thạch anh tương phản chuẩn WCAG AAA.
* `text-muted`: `#71717A` — Chữ xám trung tính cho nhãn phụ, thông số.
* `accent-gold`: `#C5A880` — Vàng Champagne tôn vinh sự sang trọng kín đáo (Quiet Luxury).
* `accent-jade`: `#059669` — Xanh ngọc bích biểu trưng cho kiến trúc sinh thái bản địa.

### 2. Danh Mục 18 Master Components Tái Sử Dụng (`⚙️ ARKI Master Components Library`)
1. `cmp/btn-primary`: Nút CTA màu đen `#09090B`, bo góc 24-26px, căn giữa hoàn hảo, hỗ trợ icon và nhãn (`[ ◎ Khám Phá Kiệt Tác → ]`).
2. `cmp/btn-secondary`: Nút thứ cấp viền mỏng `#E4E4E7`, nền xám mềm `#F4F4F6` (`[ 📅 Đặt Lịch Hẹn ]`).
3. `cmp/action-circle/back`: Nút tròn công thái học 44×44px quay lại (`←`).
4. `cmp/action-circle/search`: Nút tròn công thái học 44×44px tìm kiếm (`🔍`).
5. `cmp/action-circle/share`: Nút tròn công thái học 44×44px chia sẻ (`↗`).
6. `cmp/action-circle/heart-default`: Nút tròn lưu yêu thích rỗng (`♡`).
7. `cmp/action-circle/heart-active`: Nút tròn lưu yêu thích tích cực (`♥` đỏ/vàng).
8. `cmp/language-pill/vi-active`: Pill chuyển ngữ `[ 🇻🇳 VI | EN ]` với trạng thái Tiếng Việt kích hoạt trong khung đen.
9. `cmp/spec-chip/area`: Chip thông số diện tích (`🌿 920 m²`).
10. `cmp/spec-chip/suites`: Chip số phòng ngủ (`🛏️ 5 Phòng`).
11. `cmp/spec-chip/pool`: Chip tiện ích hồ bơi (`🏊 Hồ Bơi 35m`).
12. `cmp/spec-chip/marina`: Chip tiện ích bến du thuyền (`⛵ Du Thuyền`).
13. `cmp/spec-chip/legal`: Chip tình trạng pháp lý (`📜 Sổ Hồng`).
14. `cmp/filter-chip/all-active`: Chip bộ lọc phân loại kích hoạt (`✨ TẤT CẢ`).
15. `cmp/filter-chip/riverside`: Chip bộ lọc dinh thự ven sông (`🌊 VEN SÔNG`).
16. `cmp/filter-chip/bamboo`: Chip bộ lọc kiến trúc tre (`🎋 NHÀ TRE`).
17. `cmp/filter-chip/heritage`: Chip bộ lọc dinh thự di sản (`🏛️ DI SẢN`).
18. `cmp/bottom-dock`: Thanh điều hướng chân trang 4 tab chuẩn công thái học (`◎ Khám Phá`, `⚲ Bản Đồ`, `♡ Đã Lưu`, `👤 Hồ Sơ`).

---

## 📱 CHI TIẾT ĐẶC TẢ TỪNG MÀN HÌNH (DETAILED SCREEN SPECIFICATIONS)

### PHÂN HỆ 1: ONBOARDING & KHỞI ĐỘNG (`SCR-001` → `SCR-010`)

#### `SCR-001: Lotus Sanctuary Welcome`
* **Mục đích:** Màn hình đón tiếp mở đầu hành trình trải nghiệm ARKI Việt Nam, khơi gợi cảm xúc thẩm mỹ kiến trúc nhiệt đới độc bản.
* **Kích thước:** `393 × 852 px` (Chuẩn iPhone 15/16 Pro).
* **Nền & Phong cách:** Nền trắng thuần khiết `#FFFFFF`, liên kết biến `bg-porcelain`. Thẻ kính mờ nổi Glassmorphism 4 lớp.
* **Thành phần giao diện:**
  - Header: Logo `ARKI VIỆT NAM` (18px Bold), slogan `KIẾN TRÚC DINH THỰ ĐỘC BẢN` (10px Vàng Champagne).
  - Component Instance: `cmp/language-pill/vi-active` (Chuyển đổi Tiếng Việt / English).
  - Khung ảnh bìa Hero: Ảnh chụp thực tế Dinh Thự Tre Thảo Điền của KTS Võ Trọng Nghĩa (345×480px, bo góc 24px).
  - Thẻ kính nổi (Glass HUD): Tiêu đề `Dinh Thự Tre Ven Sông`, phụ đề `KTS Võ Trọng Nghĩa • Thảo Điền`.
  - Bộ 3 chip thông số: `[ 🌿 920 m² ]`, `[ 🛏️ 5 Phòng ]`, `[ 🏊 Hồ Bơi ]`.
  - Component Instance CTA: `cmp/btn-primary` (`[ ◎ Khám Phá Kiệt Tác → ]`).
  - Component Instance Dock: `cmp/bottom-dock` (Tab Khám Phá kích hoạt).
* **Điểm chạm tương tác (11 Hotspots):**
  1. `Nút chuyển ngữ [VI | EN]` → Chuyển đổi ngôn ngữ hiển thị.
  2. `Ảnh bìa Hero Tre` → Chuyển sang `SCR-029` (Tham quan 360° VR).
  3. `Thẻ kính nổi` → Chuyển sang `SCR-014` (Chi tiết dinh thự).
  4. `Chip 🌿 920 m²` → Chuyển sang `SCR-014`.
  5. `Chip 🛏️ 5 Phòng` → Chuyển sang `SCR-014`.
  6. `Chip 🏊 Hồ Bơi` → Chuyển sang `SCR-029`.
  7. `Nút chính ◎ Khám Phá Kiệt Tác →` → Chuyển sang `SCR-011` (Bento Feed).
  8. `Tab 1 ◎ Khám Phá` → `SCR-011`.
  9. `Tab 2 ⚲ Bản Đồ` → `SCR-029`.
  10. `Tab 3 ♡ Đã Lưu` → `SCR-014`.
  11. `Tab 4 👤 Hồ Sơ` → `SCR-101` (Cài đặt tài khoản).
* **Nguyên tắc UX & Văn hóa:** Tôn vinh nét đẹp văn hóa tre Việt Nam, không gian mặt nước phản chiếu tĩnh tại, loại bỏ văn bản dày đặc.

#### `SCR-002: Curated Masterpieces Splash`
* **Mục đích:** Giới thiệu ngắn gọn các bộ sưu tập dinh thự tuyển chọn khắp 3 miền Bắc - Trung - Nam.
* **Thành phần:** Lưới 3 cột đại diện: Hà Nội (Di sản Pháp cổ), Huế (Nhà rường phong thủy), Sài Gòn (Ven sông nhiệt đới đương đại).
* **Hotspots:** Nút lướt qua (Skip), Nút tiếp tục, Nút chọn vùng miền.

#### `SCR-003: 360 Spatial Immersion Intro`
* **Mục đích:** Hướng dẫn trực quan cách xoay lật góc nhìn không gian 360° và chế độ kính thực tế ảo Apple Vision Pro / Meta Quest.
* **Hotspots:** Chế độ Gyroscope, Nút thử nghiệm xoay 360 mini, Nút bỏ qua.

#### `SCR-004: Kết Nối Kiến Trúc Sư Trưởng`
* **Mục đích:** Tuyên ngôn về quyền tác giả - Kết nối trực tiếp chủ nhân tinh hoa với các Kiến trúc sư trưởng.
* **Đặc tả hình ảnh / Avatar:** Sử dụng huy hiệu Monogram tối giản tiêu chuẩn (`VTN` - KTS Võ Trọng Nghĩa, `HTH` - KTS Hoàng Thúc Hào) trên nền xám thanh lịch `#F4F4F6`, viền mảnh `#E4E4E7`, gắn nhãn chức danh `CHỦ TRÌ THIẾT KẾ` / `DI SẢN BẢN ĐỊA` thay vì chèn ảnh người thật tùy tiện.
* **Hotspots:** Thẻ KTS Võ Trọng Nghĩa, Thẻ KTS Hoàng Thúc Hào, Nút [ Xem Tác Phẩm → ], Nút [ Khám Phá 360° ], 4 Tab Thanh Điều Hướng.

#### `SCR-005: Dịch Vụ Quản Gia VIP`
* **Mục đích:** Giới thiệu dịch vụ quản gia cao cấp và chuyên gia tư vấn bảo mật thông tin.
* **Đặc tả hình ảnh / Avatar:** Sử dụng huy hiệu Quản Gia VIP chuẩn (`VIP` màu vàng Champagne `#C5A880` trên nền đen thạch anh `#09090B`) kèm trạng thái `● TRỰC TUYẾN` xanh ngọc bích, không sử dụng ảnh người thật.
* **Hotspots:** Nút kết nối Quản gia 24/7, Ô nhập mã định danh khách hàng, Nút điều khoản bảo mật, Nút [ Khám Phá 360° ].

#### `SCR-006: Investor Passcode Entry`
* **Mục đích:** Nhập mã bảo mật dành riêng cho khách hàng VIP nhận thư mời riêng.
* **Hotspots:** Bàn phím số công thái học, Nút quét sinh trắc học FaceID, Nút quên mã.

#### `SCR-007: Biometric Verification`
* **Mục đích:** Xác thực khuôn mặt hoặc vân tay để mở khóa hồ sơ tài chính mật.
* **Hotspots:** Vòng tròn radar FaceID, Nút xác thực lại, Nút chuyển sang mã PIN.

#### `SCR-008: Curated Preferences Selection`
* **Mục đích:** Cho phép người dùng chọn gu kiến trúc yêu thích (Tre, Đá, Di sản cổ, Tối giản đương đại).
* **Hotspots:** 6 thẻ chọn phong cách, Nút hoàn tất cá nhân hóa.

#### `SCR-009: Cultural Aesthetic Alignment`
* **Mục đích:** Lựa chọn triết lý phong thủy và hướng đón gió, đón sáng tự nhiên.
* **Hotspots:** La bàn phong thủy Đông Tứ Trạch / Tây Tứ Trạch, Nút lưu tùy chọn.

#### `SCR-010: Golden Path Welcome Complete`
* **Mục đích:** Màn hình chuyển tiếp hoàn thành Onboarding, chào mừng chính thức bước vào không gian ARKI.
* **Hotspots:** Nút bắt đầu khám phá ngay → Chuyển sang `SCR-011`.

---

### PHÂN HỆ 2: KHÁM PHÁ DINH THỰ BENTO FEED (`SCR-011` → `SCR-020`)

#### `SCR-011: Discover Bento Feed`
* **Mục đích:** Bảng cấp tin tổng hợp (Feed) bố cục Bento Grid hiện đại, hiển thị các kiệt tác dinh thự tiêu biểu nhất.
* **Kích thước:** `393 × 852 px`.
* **Nền:** Trắng tinh khôi `#FFFFFF`, viền hairline `#E4E4E7`.
* **Thành phần giao diện:**
  - Header: Nút tròn Back (`←`), tiêu đề `KIỆT TÁC DINH THỰ`, phụ đề `KIẾN TRÚC VIỆT NAM`.
  - Component Instance: `cmp/language-pill/vi-active`.
  - Bộ 4 chip lọc ngang:
    - `[ ✨ TẤT CẢ ]` (Trạng thái kích hoạt, nền đen thạch anh `#18181B`).
    - `[ 🌊 VEN SÔNG ]` (Nền xám mềm `#F4F4F6`).
    - `[ 🎋 NHÀ TRE ]` (Nền xám mềm `#F4F4F6`).
    - `[ 🏛️ DI SẢN ]` (Nền xám mềm `#F4F4F6`).
  - Thẻ Dinh Thự 1: Ảnh hồ bơi và kiến trúc gỗ Thảo Điền, nút tim lưu yêu thích, giá `142 Tỷ VNĐ ($5.8M)`, nút pill `[ Xem Chi Tiết → ]`.
  - Thẻ Dinh Thự 2: Ảnh Biệt thự cổ Ba Đình Hà Nội phong cách Pháp - Đông Dương, giá `182 Tỷ VNĐ ($7.4M)`.
  - Component Instance: `cmp/bottom-dock` (Đã liên kết `boundVariables`).
* **Điểm chạm tương tác (11 Hotspots):**
  1. `Nút Back ←` → Trở về `SCR-001`.
  2. `Pill chuyển ngữ` → `SCR-001`.
  3. `Chip 🌊 VEN SÔNG` → Lọc dinh thự ven sông (`SCR-014`).
  4. `Chip 🎋 NHÀ TRE` → Lọc tác phẩm tre KTS Võ Trọng Nghĩa (`SCR-047`).
  5. `Chip 🏛️ DI SẢN` → Lọc công trình di sản (`SCR-014`).
  6. `Nút tim yêu thích` → Lưu vào danh sách.
  7. `Nút Xem Chi Tiết →` → Mở trang chi tiết `SCR-014`.
  8. `Thẻ Biệt thự cổ Ba Đình` → Mở trang chi tiết `SCR-014`.
  9. `Tab ⚲ Bản Đồ` → Mở bản đồ 3D / 360 `SCR-029`.
  10. `Tab ♡ Đã Lưu` → Mở danh sách đã lưu `SCR-014`.
  11. `Tab 👤 Hồ Sơ` → Mở cài đặt `SCR-101`.

#### `SCR-012: Map-Integrated Bento Explorer`
* **Mục đích:** Chế độ xem nửa màn hình bản đồ tương tác (Google Map phong cách tối giản) kết hợp thẻ trượt ngang dưới chân trang.
* **Hotspots:** Điểm ghim dinh thự trên bản đồ, Bộ lọc bán kính, Nút chuyển chế độ vệ tinh.

#### `SCR-013: Category Facet Search`
* **Mục đích:** Màn hình tìm kiếm đa tiêu chí: Mức giá (từ 50 Tỷ đến 300 Tỷ VNĐ), Diện tích khuôn viên, Pháp lý sở hữu.
* **Hotspots:** Thanh trượt khoảng giá, Các nút chọn pháp lý Sổ hồng / Lâu dài, Nút áp dụng bộ lọc.

#### `SCR-014: Riverfront Estate Details`
* **Mục đích:** Trang chi tiết toàn diện của một dinh thự độc bản, tích hợp đầy đủ thông số kỹ thuật, ảnh độ phân giải cao và nút đặt lịch.
* **Kích thước:** `393 × 852 px`.
* **Nền:** Thuần trắng `#FFFFFF`.
* **Thành phần giao diện:**
  - Header: Nút tròn Back (`←`), tiêu đề `CHI TIẾT DINH THỰ`, phụ đề `DINH THỰ TRE VEN SÔNG`.
  - Nút chia sẻ: `[ ↗ Chia Sẻ ]` chuẩn pill, căn giữa hoàn hảo, cách lề phải 24px, không tràn viền.
  - Ảnh Hero: Ảnh toàn cảnh mặt nước và hồ bơi vô cực 35m.
  - Thông số cơ bản: Tiêu đề `Dinh Thự Tre Ven Sông`, Vị trí `Thảo Điền, TP. Thủ Đức • KTS Võ Trọng Nghĩa`, Giá `142 Tỷ VNĐ ($5.8M)`.
  - Lưới 6 chip thông số chuẩn bo góc 17px:
    - `[ 🌿 920 m² ]`, `[ 🛏️ 5 Phòng ]`, `[ ⛵ Du Thuyền ]`
    - `[ 🏊 Hồ Bơi 35m ]`, `[ 🍷 Hầm Rượu ]`, `[ 📜 Sổ Hồng ]`
  - Nút chức năng hàng đôi:
    - `[ ◎ Xem 360° → ]` (Nền đen thạch anh `#09090B`, chữ trắng, không bị cụt chữ).
    - `[ 📅 Đặt Lịch Hẹn ]` (Nền xám mềm `#F4F4F6`, viền `#E4E4E7`).
  - Nút CTA chính: `[ 🔒 Nhận Hồ Sơ Mật (NDA) → ]` (Nền đen toàn chiều rộng).
  - Component Instance: `cmp/bottom-dock` liên kết biến toàn cục.
* **Điểm chạm tương tác (10 Hotspots):**
  1. `Nút Back ←` → Quay lại `SCR-011`.
  2. `Nút ↗ Chia Sẻ` → Mở dịch vụ Concierge `SCR-061`.
  3. `Nút ◎ Xem 360° →` → Mở không gian thực tế ảo `SCR-029`.
  4. `Nút 📅 Đặt Lịch Hẹn` → Mở lịch khảo sát `SCR-061`.
  5. `Nút 🔒 Nhận Hồ Sơ Mật (NDA) →` → Mở hợp đồng số `SCR-089`.
  6. `Chip 🏊 Hồ Bơi 35m` → Mở góc nhìn 360 bể bơi `SCR-029`.
  7. `Chip 📜 Sổ Hồng` → Mở hồ sơ pháp lý minh bạch `SCR-089`.
  8. `Tab Khám Phá` → `SCR-011`.
  9. `Tab Bản Đồ` → `SCR-011`.
  10. `Tab Hồ Sơ` → `SCR-101`.

#### `SCR-015: Master Gallery & High-Res Viewer`
* **Mục đích:** Trình xem ảnh góc rộng và cận cảnh chi tiết cấu trúc tre, đá tự nhiên và nội thất thủ công.
* **Hotspots:** Chế độ xem toàn màn hình, Nút phóng to thu nhỏ, Nút tải ảnh tư liệu.

#### `SCR-016: Floorplan 2D / 3D Cutaway`
* **Mục đích:** Sơ đồ mặt bằng chi tiết các tầng kèm phân khu chức năng (Phòng khách đại sảnh, Hầm rượu, Bến thuyền, Khu gia nhân).
* **Hotspots:** Nút chuyển Tầng 1 / Tầng 2 / Tầng Mái, Thước đo khoảng cách thực tế.

#### `SCR-017: Solar & Microclimate Simulation`
* **Mục đích:** Mô phỏng biểu đồ bóng nắng theo mùa và hướng gió sông tự nhiên giải nhiệt cho ngôi nhà.
* **Hotspots:** Thanh trượt thời gian 24h (Sáng / Trưa / Chiều / Tối), Chỉ số thông gió tự nhiên.

#### `SCR-018: Neighborhood & Luxury Amenities Map`
* **Mục đích:** Bản đồ tiện ích ngoại khu thượng lưu: Bến du thuyền quốc tế, Sân Golf, Trường học quốc tế BIS, Bệnh viện Pháp Việt.
* **Hotspots:** Ghim khoảng cách di chuyển, Nút gọi xe Limousine đưa đón.

#### `SCR-019: Valuation & Investment Metrics`
* **Mục đích:** Biểu đồ định giá bất động sản ven sông Thảo Điền qua các năm, tiềm năng tăng giá và hệ số khan hiếm.
* **Hotspots:** Biểu đồ tăng trưởng 5 năm, Nút tải báo cáo thẩm định độc lập CBRE/Savills.

#### `SCR-020: Comparable Estates Showcase`
* **Mục đích:** Danh sách các dinh thự cùng phân khúc giá trị để khách hàng so sánh trực diện.
* **Hotspots:** Nút so sánh 2 bất động sản, Thẻ dinh thự tương đồng.

---

### PHÂN HỆ 3: KHÔNG GIAN 360° VR & BẢN ĐỒ SỐ KHÔNG GIAN (`SCR-021` → `SCR-035`)

#### `SCR-021: 360 Virtual Tour Launchpad`
* **Mục đích:** Điểm bắt đầu tour tham quan ảo, tải môi trường không gian 3D chất lượng cao.
* **Hotspots:** Nút chọn độ phân giải 4K/8K, Nút bật âm thanh tiếng nước chảy và gió tự nhiên.

#### `SCR-029: 360 Living Room Atrium Immersion`
* **Mục đích:** Tham quan đại sảnh phòng khách thông tầng kết cấu tre vòm uốn lượn đặc trưng.
* **Kích thước:** `393 × 852 px`.
* **Thành phần:** Toàn cảnh 360 ảnh ghép chất lượng cao, các điểm chạm thông minh (Hotspots HUD) lơ lửng trong không gian chỉ vào chất liệu Tre Tầm Vông ngâm bùn chống mối mọt.
* **Hotspots (10 Hotspots):** Nút xoay góc nhìn, Điểm chạm vật liệu Tre, Điểm chạm sàn đá cẩm thạch, Điểm dịch chuyển sang Hồ bơi, Nút chuyển phòng, Nút mở la bàn hướng nhà, Nút gọi KTS tư vấn.

#### `SCR-030: 360 Master Suite & River Balcony`
* **Mục đích:** Trải nghiệm phòng ngủ Master nhìn thẳng ra khúc cong sông Sài Gòn đón hoàng hôn.
* **Hotspots:** Điểm mở rèm tự động, Điểm đo kích thước ban công, Nút chuyển góc nhìn đêm.

#### `SCR-031: 360 Teak Wine Cellar & Cigar Lounge`
* **Mục đích:** Trải nghiệm hầm rượu ngầm gỗ Teak cách nhiệt tự nhiên kiểm soát độ ẩm chuẩn quốc tế.
* **Hotspots:** Điểm xem danh mục rượu vang, Điểm kiểm tra nhiệt độ hầm.

#### `SCR-032: 360 Infinity Pool & Private Marina Pier`
* **Mục đích:** Khảo sát hồ bơi vô cực 35m tràn bờ và cầu tàu đón du thuyền riêng biệt lập.
* **Hotspots:** Điểm kiểm tra mực nước sông, Nút mô phỏng neo đậu du thuyền 60ft.

#### `SCR-033: Digital Twin BIM Layer Inspector`
* **Mục đích:** Bóc tách kết cấu khung xương công trình, hệ thống cơ điện lạnh âm tường và móng cọc chống lún.
* **Hotspots:** Thanh trượt bóc tách lớp bê tông/kết cấu tre, Chỉ số vật liệu xanh.

#### `SCR-034: Day-Night Lighting Simulator`
* **Mục đích:** Mô phỏng kịch bản chiếu sáng ban đêm từ đèn LED nhiệt độ màu 2700K vàng ấm.
* **Hotspots:** Nút bật/tắt đèn chiếu sáng cảnh quan sân vườn, Chế độ đón tiệc tối.

#### `SCR-035: VR Headset Spatial Casting`
* **Mục đích:** Kết nối đồng bộ với kính Apple Vision Pro hoặc Oculus để trải nghiệm thực tế ảo không gian tỷ lệ 1:1.
* **Hotspots:** Nút quét mã QR ghép đôi kính, Nút điều chỉnh khoảng cách đồng tử.

---

### PHÂN HỆ 4: TÁC QUYỀN KIẾN TRÚC SƯ & DI SẢN (`SCR-036` → `SCR-050`)

#### `SCR-047: VTN Studio Showcase`
* **Mục đích:** Trang vinh danh Kiến trúc sư trưởng Võ Trọng Nghĩa, khẳng định tính độc bản và giá trị tác quyền nghệ thuật của dinh thự.
* **Kích thước:** `393 × 852 px`.
* **Nền:** Trắng tinh khôi `#FFFFFF`.
* **Thành phần giao diện:**
  - Header: Nút tròn Back (`←`), tiêu đề `VĂN PHÒNG KIẾN TRÚC`, phụ đề `VTN ARCHITECTS • KTS VÕ TRỌNG NGHĨA` (10px Vàng Champagne).
  - Nút chia sẻ: `[ ↗ Chia Sẻ ]` chuẩn pill gọn gàng, có lề an toàn.
  - Khung chân dung KTS: Ảnh màu chân thực KTS Võ Trọng Nghĩa mặc vest lịch lãm (110×170px, bo góc 16px).
  - Khung tiểu sử tóm tắt:
    - Tiêu đề `KTS Võ Trọng Nghĩa`
    - Chức danh: `Sáng lập VTN Architects`, `Viện sĩ Danh dự Quốc tế RIBA & AIA`, `Giải thưởng Kiến trúc Thế giới (WAF)`.
    - Huy hiệu: `🎖️ VIỆN SĨ DANH DỰ RIBA` (Màu vàng đất sang trọng).
  - Khung 2 chỉ số tiêu biểu:
    - `🏆 18 KIỆT TÁC` (Công trình tiêu biểu).
    - `🌟 5 GIẢI RIBA` (Giải thưởng danh giá quốc tế).
  - Thẻ công trình tiêu biểu: Ảnh và thông tin `Dinh Thự Tre Ven Sông`, `Thảo Điền, TP. Thủ Đức • 920 m² • Kiến Trúc Tre`.
  - Nút CTA: `[ ✍️ Đặt Lịch Tư Vấn KTS → ]` (Nền đen bo tròn, căn giữa hoàn hảo).
  - Component Instance: `cmp/bottom-dock` liên kết biến toàn cục.
* **Điểm chạm tương tác (10 Hotspots):**
  1. `Nút Back ←` → Quay về `SCR-011`.
  2. `Nút ↗ Chia Sẻ` → Mở Concierge `SCR-061`.
  3. `Thẻ Dinh Thự Tre` → Mở chi tiết `SCR-014`.
  4. `Nút ✍️ Đặt Lịch Tư Vấn KTS →` → Mở lịch hẹn trực tiếp `SCR-061`.
  5. `Chỉ số 18 Kiệt Tác` → Mở danh mục công trình `SCR-011`.
  6. `Chỉ số 5 Giải RIBA` → Mở tư liệu giải thưởng `SCR-014`.
  7. `Tab Khám Phá` → `SCR-011`.
  8. `Tab Bản Đồ` → `SCR-029`.
  9. `Tab Đã Lưu` → `SCR-014`.
  10. `Tab Hồ Sơ` → `SCR-101`.

#### `SCR-048: Sustainable Bamboo Technology Monograph`
* **Mục đích:** Chuyên đề khoa học về phương pháp xử lý tre tự nhiên: Ngâm bùn sinh học 6 tháng, sấy hun khói và liên kết chốt tre không dùng đinh kim loại.
* **Hotspots:** Sơ đồ quy trình ngâm sấy tre, Chỉ số độ bền trên 50 năm.

#### `SCR-049: Heritage Restoration Philosophy`
* **Mục đích:** Triết lý bảo tồn và phục dựng các công trình biệt thự Pháp cổ thời kỳ Đông Dương tại Hà Nội và Đà Lạt.
* **Hotspots:** Thước kéo so sánh Trước và Sau khi phục chế, Tư liệu bản vẽ gốc thời Pháp.

#### `SCR-050: Earth & Stone Craftsmanship Dossier`
* **Mục đích:** Tư liệu về tay nghề thủ công của các nghệ nhân làng đá Non Nước và kỹ thuật đầm đất thô mộc.
* **Hotspots:** Video ngắn cận cảnh bàn tay nghệ nhân chạm khắc, Mẫu thử chất liệu bề mặt.

---

### PHÂN HỆ 5: QUẢN GIA VIP & KHẢO SÁT RIÊNG TƯ (`SCR-051` → `SCR-065`)

#### `SCR-061: VIP Concierge Consultation`
* **Mục đích:** Đặt lịch hẹn khảo sát thực địa độc quyền với chuyên viên quản gia cá nhân (Private Butler).
* **Kích thước:** `393 × 852 px`.
* **Nền:** Thuần trắng `#FFFFFF`.
* **Thành phần:**
  - Header: Tiêu đề `DỊCH VỤ QUẢN GIA VIP`, phụ đề `KHẢO SÁT THỰC ĐỊA BIỆT LẬP`.
  - Bộ chọn phương tiện di chuyển: `[ 🚁 Trực Thăng ]`, `[ ⛵ Du Thuyền ]`, `[ 🚗 Maybach ]`.
  - Bộ chọn ngày giờ công thái học: Lịch tuần trượt ngang, các khung giờ riêng tư (10:00 Sáng, 14:30 Chiều, 17:00 Hoàng hôn).
  - Tùy chọn bảo mật: Nút gạt `Yêu cầu không chụp hình & Không vệ sĩ đi kèm`.
  - Nút CTA: `[ 🔒 Xác Nhận Lịch Khảo Sát Kín → ]`.
  - Component Instance: `cmp/bottom-dock`.
* **Hotspots (10 Hotspots):** Nút Back, 3 nút chọn phương tiện, 3 khung giờ hẹn, Nút gạt bảo mật, Nút xác nhận lịch hẹn, Nút gọi trực tiếp Butler hotline.

#### `SCR-062: Private Helicopter & Yacht Charter Booking`
* **Mục đích:** Điều phối hành trình đưa đón khách VIP từ sân bay Tân Sơn Nhất hoặc cảng du thuyền đến tận dinh thự.
* **Hotspots:** Bản đồ lộ trình bay/chạy tàu, Nút xác nhận danh sách khách tháp tùng.

#### `SCR-063: Private Security & Non-Disclosure Protocol`
* **Mục đích:** Ký cam kết bảo mật danh tính khách hàng tham quan thực địa, bảo vệ thông tin cá nhân.
* **Hotspots:** Hộp kiểm đồng ý điều khoản, Nút ký tên cảm ứng.

#### `SCR-064: Exclusive Private Dining & Wine Tasting`
* **Mục đích:** Đặt tiệc trà chiều hoặc tiệc rượu vang thử nghiệm ngay trong khuôn viên dinh thự trong buổi khảo sát.
* **Hotspots:** Thực đơn Bếp trưởng Michelin, Danh mục rượu vang Grand Cru.

#### `SCR-065: Post-Tour Survey & Bespoke Feedback`
* **Mục đích:** Thu thập ý kiến đánh giá kín đáo của chủ nhân sau buổi khảo sát thực địa.
* **Hotspots:** Thang điểm cảm xúc 5 sao vàng, Ô ghi chú nguyện vọng tùy chỉnh.

---

### PHÂN HỆ 6: TÙY BIẾN THIẾT KẾ & VẬT LIỆU KIẾN TRÚC (`SCR-066` → `SCR-080`)

#### `SCR-071: Bespoke Material Customizer`
* **Mục đích:** Cung cấp bảng vật liệu số cho phép chủ nhân tùy biến chất liệu nội thất theo gu thẩm mỹ cá nhân.
* **Hotspots:** Mẫu Gỗ Teak Myanmar, Mẫu Đá Cẩm Thạch Carrara, Mẫu Tre ép sợi cao tần, Nút cập nhật phối cảnh 3D tức thì.

#### `SCR-072: Feng Shui & Energy Optimization Tool`
* **Mục đích:** Tích hợp phân tích trường khí, hướng đặt hồ cá Koi, thủy minh đường tụ khí theo năm sinh gia chủ.
* **Hotspots:** Bánh xe ngũ hành Kim-Mộc-Thủy-Hỏa-Thổ, Nút xem đề xuất chỉnh sửa vị trí cửa chính.

---

### PHÂN HỆ 7: KÝ QUỸ SỐ, NDA & PHÁP LÝ MINH BẠCH (`SCR-081` → `SCR-095`)

#### `SCR-089: LOI Digital Signing & Bank Escrow`
* **Mục đích:** Ký kết Ý định Thư (Letter of Intent - LOI) và thiết lập tài khoản Ký quỹ Phong tỏa (Escrow Account) tại Ngân hàng đối tác (Vietcombank Priority / Techcombank Private).
* **Kích thước:** `393 × 852 px`.
* **Nền:** Thuần trắng `#FFFFFF`.
* **Thành phần:**
  - Header: Tiêu đề `PHÁP LÝ & KÝ QUỸ SỐ`, phụ đề `THƯ THỎA THUẬN BẢO MẬT LOI`.
  - Thông tin giao dịch: Mã hồ sơ dinh thự, Giá trị ký quỹ thiện chí `5 Tỷ VNĐ ($200,000 USD)`, Thời hạn phong tỏa 14 ngày.
  - Khung xem tài liệu PDF Sổ hồng số và Bản trích lục quy hoạch 1/500 đã được công chứng số.
  - Vùng chữ ký số điện tử Smart Contract: Ô ký tay cảm ứng mượt mà.
  - Nút CTA: `[ ✍️ Ký Điện Tử & Mở Tài Khoản Phong Tỏa → ]`.
  - Component Instance: `cmp/bottom-dock`.
* **Hotspots (9 Hotspots):** Nút Back, Nút mở xem toàn văn Sổ hồng, Nút xem chứng thư ngân hàng, Ô ký tên, Nút xóa chữ ký làm lại, Nút xác thực OTP sinh trắc học, Nút tải bản sao PDF có mã hash, Dock tabs.

#### `SCR-090: Digital Land Title (Sổ Hồng Số) Explorer`
* **Mục đích:** Tra cứu tọa độ ranh giới đất trên hệ tọa độ VN-2000, kiểm tra tình trạng không tranh chấp và thời hạn sở hữu vĩnh viễn.
* **Hotspots:** Bản đồ địa chính số, Mã QR xác thực cổng dịch vụ công quốc gia.

---

### PHÂN HỆ 8: CÀI ĐẶT CÁ NHÂN HÓA, CHẾ ĐỘ & ĐỒNG BỘ (`SCR-096` → `SCR-112`)

#### `SCR-101: Hồ Sơ Nhà Đầu Tư Thượng Lưu`
* **Mục đích:** Trung tâm quản lý tài khoản định danh thượng lưu, cấu trúc pháp lý nắm giữ tài sản và cài đặt ứng dụng.
* **Kích thước:** `393 × 852 px`.
* **Nền:** Thuần trắng `#FFFFFF`.
* **Thành phần:**
  - Header: Tiêu đề `Hồ Sơ`, phụ đề `HỒ SƠ KHÁCH HÀNG & QUỐC TỊCH ĐẦU TƯ`.
  - Thẻ định danh: Huy hiệu Avatar mặc định tiêu chuẩn (`ARKI` / `CHỦ THẺ` / `★ HẠNG SEN`) trên nền xám `#F4F4F6`, không dùng ảnh người thật.
  - Tên chủ nhân tinh hoa: `Lord Alexander Sterling`.
  - Thông tin quỹ: `Quỹ Gia Tộc Sterling (Singapore / Zurich) • Hạng Thành Viên: Hoa Sen Vàng (#0089) • Nơi Cư Trú Chính: Dinh Thự Ven Sông Thảo Điền`.
  - Huy hiệu xác thực: `✓ Nhà Đầu Tư Đạt Chuẩn Hiệp Định DTA`.
  - Khung Cấu Trúc Pháp Lý & Thẩm Quyền Tài Phán:
    - Pháp nhân nắm giữ tài sản chính: `Sterling Heritage Vietnam SPV Ltd (BVI)`.
    - Tình trạng cư trú thuế: `Singapore Family Office (Section 13O Scheme)`.
    - Thị thực & Miễn trừ nhập cảnh: `Thẻ Tạm Trú Nhà Đầu Tư Vàng 5 Năm (ĐT1)`.
    - Lưu ký ngân hàng: `Standard Chartered Private Bank Singapore`.
  - Component Instance: `cmp/btn-primary` (`[ ◎ Khám Phá 360° ]`), `cmp/bottom-dock` (Tab Hồ Sơ).
* **Hotspots (9 Hotspots):** Nút Back, Nút gạt ngôn ngữ, Thẻ định danh, Thẻ pháp lý, Nút CTA chính, 4 Tab Dock.

---

## 🔒 TIÊU CHUẨN NGHIỆM THU & QUY TRÌNH KIỂM THỬ (UAT & ACCEPTANCE CRITERIA)

1. **AC-DS-1 (Master Components Instance Usage):** 100% các nút CTA, thanh điều hướng Dock, nút tròn thao tác và chip thông số trên màn hình chính phải là `INSTANCE` trỏ về `cmp/*` trên artboard `⚙️ ARKI Master Components Library`.
2. **AC-DS-2 (Global Variables Cascade):** 100% Master Components được liên kết với bộ biến `ARKI Vietnam Design Tokens`. Khi thay đổi giá trị của `bg-porcelain` hay `text-primary`, toàn bộ các màn hình và component phải đổi màu đồng bộ tức thì.
3. **AC-UI-3 (Zero Text Overflow / Perfect Centering):** Tất cả các nhãn chữ trong nút và chip đều được căn giữa (`primaryAxisAlignItems: "CENTER"`, `counterAxisAlignItems: "CENTER"`), không bao giờ bị cắt cụt hoặc tràn khỏi viền.
4. **AC-PR-4 (Prototype Hotspot Density):** Mỗi màn hình tương tác phải chứa tối thiểu từ 8 đến 12 hotspots có phản hồi `ON_CLICK` qua chuyển động `SMART_ANIMATE` mượt mà khi bấm `Shift + Space`.
5. **AC-VN-5 (Vietnamese First & Pure White Canvas):** Ngôn ngữ mặc định toàn hệ thống là Tiếng Việt văn hóa bản địa sang trọng, nền Canvas thuần trắng `#FFFFFF`.
