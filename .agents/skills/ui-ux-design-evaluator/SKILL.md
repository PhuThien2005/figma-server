---
name: ui-ux-design-evaluator
description: >-
  Evaluates, audits, and generates Figma UI designs according to rigorous HCI/UI/UX theory,
  Usability engineering, Gestalt laws, Heuristic principles (Nielsen, Shneiderman, Norman, Tog),
  WCAG accessibility, and industrial Figma file standards. Includes automated visual verification
  and UAT test suites.
---

# 🎓 CẨM NANG THIẾT KẾ & ĐÁNH GIÁ GIAO DIỆN CHUẨN LÝ THUYẾT TRÊN FIGMA (SKILL.MD)

Tài liệu này hệ thống hóa các nguyên lý tương tác người - máy (HCI/UI/UX), công thức Usability, các quy luật Gestalt, bộ tiêu chuẩn Heuristic (Nielsen, Shneiderman, Norman, Tog) và chuyển hóa thành các tiêu chuẩn thiết kế thực chiến và kiểm thử nghiệm thu (UAT) trên Figma.

---

## 📑 MỤC LỤC
1. [Bộ Ba Cốt Lõi Usability (Khả Dụng)](#1-bộ-ba-cốt-lõi-usability-khả-dụng)
   - 1.1 Learnability (Khả năng học)
   - 1.2 Efficiency (Tính hiệu quả & Luật Fitts)
   - 1.3 Safety (Độ an toàn & Chống lỗi)
2. [Quy Trình Thiết Kế Lấy Người Dùng Làm Trung Tâm (UCD)](#2-quy-trình-thiết-kế-lấy-người-dùng-làm-trung-tâm-ucd)
3. [Kỹ Thuật Thiết Kế Thành Phần Giao Diện Chuẩn Mobile (393 × 852 px)](#3-kỹ-thuật-thiết-kế-thành-phần-giao-diện-chuẩn-mobile-393--852-px)
   - 3.1 Điều hướng (Navigation) & Nguyên lý "Don't Make Me Think"
   - 3.2 Typography & Chiến lược khống chế tràn văn bản (Truncation)
   - 3.3 Màu sắc thị giác, Glassmorphism & Trợ năng tiếp cận (WCAG AAA)
   - 3.4 Bố cục thị giác & Quy luật Gestalt
   - 3.5 Công nghệ tương tác 360° Đa hướng (Omnidirectional Spatial Pan)
   - 3.6 Quốc tế hóa (i18n) & Bản địa hóa (l10n)
4. [Bộ Tiêu Chuẩn Đánh Giá Giao Diện (Heuristic Evaluation)](#4-bộ-tiêu-chuẩn-đánh-giá-giao-diện-heuristic-evaluation)
5. [Quy Chuẩn Cấu Trúc File & Workflow Figma Chuẩn Công Nghiệp](#5-quy-chuẩn-cấu-trúc-file--workflow-figma-chuẩn-công-nghiệp)
6. [Hệ Thống Acceptance Criteria (AC) & Kịch Bản Kiểm Thử Chấp Nhận UAT](#6-hệ-thống-acceptance-criteria-ac--kịch-bản-kiểm-thử-chấp-nhận-uat)
7. [Workflow Tự Động Hóa Kiểm Tra Bằng Chụp Ảnh & Đánh Giá](#7-workflow-tự-động-hóa-kiểm-tra-bằng-chụp-ảnh--đánh-giá)

---

## 1. BỘ BA CỐT LÕI USABILITY (KHẢ DỤNG)
$$\text{Usability} = \text{Learnability} + \text{Efficiency} + \text{Safety}$$

### 1.1 Learnability (Khả năng học)
> *"Người dùng học giao diện bằng cách THỰC HÀNH (Doing) và QUAN SÁT (Watching), không phải bằng cách đọc tài liệu hướng dẫn."*

* **Quy luật bộ nhớ ngắn hạn ($7 \pm 2$ mục):** Trí nhớ tức thời của con người chỉ chứa được 5 đến 9 đơn vị thông tin cùng lúc.
  * **Ứng dụng Figma:** Nhóm (Chunking) các trường thông tin trong form hoặc danh mục menu tối đa 5-7 mục trên một khối. Không dồn ép quá nhiều lựa chọn vào một dropdown list đơn độc.
* **Đường cong quên lãng (Ebbinghaus Forgetting Curve):** Sau 20 phút người dùng quên 42%, sau 1 ngày quên 67% lượng kiến thức mới tiếp nhận.
  * **Ứng dụng Figma:** Thiết kế giao diện không bắt người dùng phải "nhớ", mà phải để hệ thống "nhắc" (*Recognition rather than recall*). Tránh ẩn đi các menu quan trọng.
* **Sự quen thuộc (Affordance & Familiarity) & Phép ẩn dụ (Metaphor):**
  * Nút bấm phải trông có vẻ nhấn được (3D nổi nhẹ, viền kính mờ, đổ bóng chiều sâu).
  * Sử dụng biểu tượng quy chuẩn (Universal Icons): Kính lúp (Tìm kiếm `🔍`), Mũi tên trái (Quay lại `←`), Ngôi nhà (Trang chủ), Dấu chữ X (Đóng `✕`), Menu (3 gạch `☰`), Chia sẻ (`↗`).
* **Ánh xạ tự nhiên (Natural Mapping & Direct Mapping):**
  * Nút điều khiển phải khớp với hướng chuyển động vật lý (gạt sang phải để bật/tăng tiến, kéo chuột lên để nhìn xuống sàn, kéo chuột xuống để ngước nhìn lên trần).

---

### 1.2 Efficiency (Tính hiệu quả & Luật Fitts)
> *"Tối ưu hóa thời gian thực hiện tác vụ của người dùng thường xuyên và chuyên gia."*

* **Luật Fitts (Fitts's Law):** Thời gian chạm tới mục tiêu phụ thuộc vào *khoảng cách* và *kích thước mục tiêu*:
  $$T = a + b \log_2 \left(1 + \frac{D}{W}\right)$$
  * **Ứng dụng Figma:**
    * Vùng chạm tối thiểu trên màn hình cảm ứng: **$\ge 44 \times 44\text{ pt}$** (Apple HIG) hoặc **$48 \times 48\text{ px}$** (Material Design).
    * Toàn bộ nút tròn quay lại được chuẩn hóa **$42 \times 42\text{ px}$** với padding trong suốt mở rộng vùng chạm.
    * Các nút CTA hành động chính (Xem Dinh Thự, Đặt Lịch, Áp Dụng Bộ Lọc) đặt ở cạnh đáy hoặc vị trí ngón tay cái dễ với tới (Thumb Zone).
* **Tự động hóa & Giảm thao tác nhập liệu:**
  * Cung cấp giá trị mặc định hợp lý (Smart Defaults).
  * Trạng thái gợi ý tìm kiếm tức thì (Auto-complete / Predictive Search).

---

### 1.3 Safety (Độ an toàn & Phục hồi lỗi)
> *"Con người chắc chắn sẽ phạm sai lầm. Hệ thống phải chủ động ngăn chặn lỗi và giúp phục hồi dễ dàng khi lỗi xảy ra."*

* **Phòng ngừa lỗi hơn chữa lỗi (Error Prevention):**
  * Vô hiệu hóa nút (Disabled State) khi chưa điền đủ các trường bắt buộc; kiểm tra hợp lệ tức thì (Inline Validation).
  * Dùng Component chuyên dụng: Bộ chọn ngày, Segmented Control thay vì nhập text tự do.
* **Ủng hộ cơ chế Undo thay cho cảnh báo liên tục (Support Undo):**
  * Thông báo hoàn tác nhanh (Toast / Snackbar: *"Đã lưu vào bộ sưu tập. Hoàn tác [Undo]"*).
* **Thông báo lỗi mang tính xây dựng (Constructive Error Messages):**
  * Ngôn từ tích cực, chỉ rõ nguyên nhân và hướng dẫn cụ thể cách khắc phục tại vị trí lỗi.

---

## 2. QUY TRÌNH THIẾT KẾ LẤY NGƯỜI DÙNG LÀM TRUNG TÂM (UCD)
* **Chu trình lặp xoắn ốc (Spiral Model):**
  $$\text{Phân tích (Analyze)} \longrightarrow \text{Thiết kế (Design)} \longrightarrow \text{Tạo mẫu (Prototype)} \longrightarrow \text{Đánh giá (Evaluate)}$$
* **Thiết kế song song (Parallel Design):** Thử nghiệm đồng thời nhiều biến thể layout (Light vs Dark Themes, Grid vs Feed) để chọn ra giải pháp tối ưu.
* **Từ Low-Fidelity đến High-Fidelity:** Chuyển đổi từ Wireframe cấu trúc lên Interactive High-Fidelity Prototype kết nối hơn 390+ liên kết tương tác.

---

## 3. KỸ THUẬT THIẾT KẾ THÀNH PHẦN GIAO DIỆN CHUẨN MOBILE (393 × 852 px)

### 3.1 Điều hướng (Navigation) & Nguyên lý "Don't Make Me Think"
* **Trạng thái "You Are Here":** Active tab nổi bật rõ ràng, breadcrumbs định vị cấu trúc.
* **Header tinh gọn & Nút Back Universal Icon:**
  * Nút quay lại tròn kính mờ $42 \times 42\text{ px}$ (`cornerRadius: 21`, tọa độ $X = 24, Y = 54$, icon `←` căn giữa). Loại bỏ hoàn toàn nhãn chữ dài dòng thừa thãi.
* **Tìm kiếm song song với Duyệt:** Thanh tìm kiếm kính mờ và hàng chip bộ lọc trượt ngang luôn sẵn sàng trên Trang chủ.

### 3.2 Typography & Chiến lược khống chế tràn văn bản (Truncation)
* **Thang đo Typography công thái học trên iPhone ($393\text{ px}$):**
  * Safe Margin 16px mỗi bên $\rightarrow$ Chiều rộng văn bản khả dụng: **$361\text{ px}$** (hoặc **$329\text{ px}$** bên trong Card).
  | Cỡ chữ (Font size) | Mục đích | Số ký tự / dòng (ước lượng) | Giới hạn dòng (Max Lines) |
  |:---:|:---:|:---:|:---:|
  | **11 - 12 px** | Caption, Dock Helper | 50 – 60 ký tự | 1 dòng duy nhất |
  | **14 px** | Body Small, Subtext | 40 – 48 ký tự | 2 dòng (`...`) |
  | **16 px** | Body Regular | 35 – 42 ký tự | 3 dòng (`...`) |
  | **20 px** | Title / H3 | 25 – 30 ký tự | 1 – 2 dòng |
  | **24 px** | Heading / H2 | 20 – 24 ký tự | 1 – 2 dòng |
  | **32 px** | Large Display / H1 | 12 – 16 ký tự | 1 dòng |
* **Quy tắc Truncation:** Luôn đặt Text Box ở chế độ `textAutoResize = 'HEIGHT'` và thiết lập `textTruncation = 'ENDING'` để đảm bảo không một text node nào tràn ra ngoài $393\text{ px}$.

### 3.3 Màu sắc thị giác, Glassmorphism & Trợ năng tiếp cận (WCAG AAA)
* **Công thức Glassmorphism 4 lớp chuẩn thực chiến:**
  1. **Nền mờ trong suốt (Transparency):** Fill `#FFFFFF` với Opacity $18\% - 25\%$ (Thẻ thông tin) hoặc $80\% - 90\%$ (Khay Drawer/Details Sheet).
  2. **Khử nét nền phía sau (Background Blur):** Hiệu ứng `BACKGROUND_BLUR` bán kính **$20\text{ px} - 32\text{ px}$**.
  3. **Viền khúc xạ mép kính (Subtle Stroke):** Đường viền 1px màu trắng `#FFFFFF` Opacity $40\% - 55\%$ mô phỏng ánh sáng chiếu xiên.
  4. **Bóng lơ lửng mềm mại (Soft Drop Shadow):** `Y: 8 - 12, Blur: 25 - 32, Opacity: 6% - 10%`.
* **Trợ năng tiếp cận WCAG AAA:** Nâng cấp font chữ trên kính mờ lên `Inter Medium / Bold`, đảm bảo độ tương phản vượt ngưỡng $4.5:1$ (AA) và $7:1$ (AAA).

### 3.4 Bố cục thị giác & Quy luật Gestalt
* **Proximity (Gần gũi):** Nhóm nhãn và trường nhập liệu sát nhau ($8\text{ px}$), cách xa cụm khác ($24\text{ px}$).
* **Similarity (Tương đồng):** Đồng nhất hình dạng bo góc $24\text{ px}$ cho tất cả ảnh chính, $16\text{ px}$ cho thumbnail.
* **Closure (Đóng kín):** Dùng thẻ kính mờ bao bọc các cụm thông tin bất động sản.
* **Alignment (Căn lề):** Căn lề trái nghiêm ngặt trên trục $X = 24\text{ px}$ hoặc $X = 16\text{ px}$.

### 3.5 Công nghệ tương tác 360° Đa hướng (Omnidirectional Spatial Pan)
* Mở khóa cuộn 2D tự do: Khung nhìn bật `overflowDirection: 'BOTH'`.
* Canvas không gian 3 tầng đa cao độ ($3400 \times 1800\text{ px}$):
  * **Tầng Trên Cao ($Y: 0 \rightarrow 550$)**: Vòm trần kính, bầu trời quang đãng, bãi đáp trực thăng.
  * **Tầng Tầm Mắt ($Y: 520 \rightarrow 1380$)**: Đại sảnh thông tầng 7.2m, vách kính view biển Sơn Trà, bếp Boffi.
  * **Tầng Dưới Thấp ($Y: 1350 \rightarrow 1800$)**: Hồ bơi vô cực nước mặn 35m, sàn gỗ Teak và đá Travertine.
* Khởi điểm cân bằng trọng tâm ($X = -1500, Y = -474$): Cho phép kéo lên (nhìn xuống sàn), kéo xuống (nhìn lên trần), xoay ngang $360^\circ$ và lướt chéo $45^\circ$.

### 3.6 Quốc tế hóa (i18n) & Bản địa hóa (l10n)
* Mặc định 100% hiển thị tiếng Việt tự nhiên, sang trọng.
* Nút chuyển đổi ngôn ngữ Swiss Typography `VI` $\leftrightarrow$ `EN` tích hợp trong Menu 3 gạch.

---

## 4. BỘ TIÊU CHUẨN ĐÁNH GIÁ GIAO DIỆN (HEURISTIC EVALUATION)

| STT | 10 Nguyên Tắc Jakob Nielsen | Hiện Thực Hóa Trong ARKI | Điểm Đánh Giá |
|:---:|---|---|:---:|
| 1 | **Visibility of system status** | Status Bar thực tế (9:41, Dynamic Island, 5G), chỉ số giá, badge trạng thái | 10/10 |
| 2 | **Match system & real world** | Thuật ngữ kiến trúc chuẩn mực (Pritzker, Thông tầng, Travertine), la bàn thực | 10/10 |
| 3 | **User control and freedom** | Nút lùi an toàn `←`, nút đóng `✕`, chuyển đổi qua lại giữa các view | 10/10 |
| 4 | **Consistency & standards** | Hệ thống icon quy chuẩn (Universal Icons), 8-pt Grid, bo góc đồng bộ | 10/10 |
| 5 | **Error prevention** | Vùng chạm $\ge 42\text{ px}$, khóa tràn viền (Clamping width $\le 361\text{ px}$) | 10/10 |
| 6 | **Recognition rather than recall** | Tấm kính mờ gợi ý nội dung, nhãn rõ ràng, không bắt nhớ mã phòng | 10/10 |
| 7 | **Flexibility & efficiency** | Menu 3 gạch mở ma trận 6 lối tắt, phím tắt Shift+Space, cuộn 360° đa hướng | 10/10 |
| 8 | **Aesthetic & minimalist design** | Chuẩn Glassmorphism tối giản, loại bỏ 100 nút theme thừa, single viewport | 10/10 |
| 9 | **Help users recognize errors** | Thông báo toast hoàn tác, inline helper text dễ hiểu | 10/10 |
| 10 | **Help & documentation** | Thẻ hướng dẫn cử chỉ `✢ Kéo Đa Hướng`, cẩm nang sử dụng chi tiết | 10/10 |

---

## 5. QUY CHUẨN CẤU TRÚC FILE & WORKFLOW FIGMA CHUẨN CÔNG NGHIỆP

```
[ARKI Design Ecosystem]
├── ☀️ DAYLIGHT PORCELAIN THEME (53 Màn hình - Giao diện chính mặc định, Y: 5200 - 9040)
│   ├── 01 - 05d: Khởi động, Onboarding & Xác thực sinh trắc học
│   ├── 06 - 08b: Trang chủ khám phá, Bảng tin & Bản đồ vệ tinh
│   ├── 09 - 10e: Chi tiết dinh thự, Triết lý KTS & Bản vẽ kỹ thuật
│   ├── 11 - 15c: 360° Panorama đa hướng, Video Tour 4K & Sliders
│   ├── 16 - 19c: Đặt lịch xem VIP, Thẻ QR Pass & Tư vấn 1-kèm-1
│   ├── 20 - 24: Tính toán tài chính, Danh mục lưu trữ & Hồ sơ cá nhân
│   └── 25: Navigation Drawer Menu (Khay menu trượt cá nhân hóa)
├── 🌙 NOCTURNE DARK THEME (53 Màn hình - Luồng Dark song song, Y: 0 - 3840)
└── 🧩 10 REUSABLE MASTER COMPONENTS (X: 5800)
```

---

## 6. HỆ THỐNG ACCEPTANCE CRITERIA (AC) & KỊCH BẢN KIỂM THỬ CHẤP NHẬN UAT

Bộ tiêu chuẩn nghiệm thu UAT (User Acceptance Testing) đối chiếu định lượng 1-1 với lý thuyết:

* **AC1: Kích thước vùng chạm & Luật Fitts (Touch Targets & Ergonomics)**
  * *Tiêu chuẩn:* Tất cả nút tương tác (Quay lại, CTA chính, Chip) phải đạt kích thước tối thiểu $\ge 42 \times 42\text{ px}$. Nút Back chuẩn hóa tròn $42 \times 42\text{ px}$ (`cornerRadius: 21`).
  * *Kiểm thử:* Quét toàn bộ 104 màn hình, xác nhận 100% nút thỏa mãn tiêu chuẩn.
* **AC2: Khống chế tràn văn bản (Typography Clamping & Truncation)**
  * *Tiêu chuẩn:* Không có text node nào có chiều rộng $> 361\text{ px}$ hoặc tràn mép phải $> 393\text{ px}$. Tiêu đề giới hạn 2 dòng, mô tả giới hạn 3 dòng.
  * *Kiểm thử:* Chạy script kiểm tra tự động `scripts/audit-text-overflow.js`, kết quả phải bằng **0 lỗi**.
* **AC3: Độ hoàn thiện hiệu ứng Glassmorphism (4 Lớp Quang Học)**
  * *Tiêu chuẩn:* Các thẻ, thanh điều hướng đáy, khay menu và nút quay lại phải có đầy đủ 4 thuộc tính: Nền mờ trong suốt (Fill $18\% - 88\%$), Khử nét nền (`BACKGROUND_BLUR` $20 - 32\text{ px}$), Viền khúc xạ (1px Stroke `#FFFFFF`), và Bóng mềm (`DROP_SHADOW`).
  * *Kiểm thử:* Kiểm tra 226 thành phần kính mờ được áp dụng thành công.
* **AC4: Động cơ xoay 360° Đa Hướng (Omnidirectional Panning Engine)**
  * *Tiêu chuẩn:* Màn hình 11 phải có `overflowDirection = 'BOTH'`, kích thước canvas $\ge 3400 \times 1800\text{ px}$, hỗ trợ kéo lên/xuống/ngang/chéo, đầy đủ 4 Hotspot phân tầng cao độ và tầng điều khiển HUD cố định.
  * *Kiểm thử:* Chạy kiểm tra cấu hình node và tương tác Prototype trên Figma Desktop.
* **AC5: Gói gọn 1 màn hình chiều dọc (Single-Viewport Layout)**
  * *Tiêu chuẩn:* Các màn hình chức năng không được tràn chiều cao quá $852\text{ px}$. Khối `Details Body` khóa đáy chính xác ở $852\text{ px}$.
* **AC6: Ngôn ngữ mặc định Tiếng Việt**
  * *Tiêu chuẩn:* 100% 52 màn hình Light hiển thị tiếng Việt tự nhiên, chuẩn phong thái bất động sản siêu sang.
* **AC7: Hệ thống Icon Quy Chuẩn (Universal Icons)**
  * *Tiêu chuẩn:* Loại bỏ hoàn toàn nhãn chữ trên các nút quay lại (`←`), dùng icon nét vẽ tối giản cho Menu (`☰`), Đóng (`✕`), Tìm kiếm (`🔍`), Theme (`☀`/`☾`).

---

## 7. WORKFLOW TỰ ĐỘNG HÓA KIỂM TRA BẰNG CHỤP ẢNH & ĐÁNH GIÁ

Workflow thực thi tự động gồm 3 bước:
1. **Chạy Test Suite tự động qua CLI**:
   ```powershell
   node scripts/run-ui-ux-uat.js
   ```
2. **Chụp ảnh màn hình kiểm thử trực tiếp từ Canvas**:
   - `assets/screenshots/uat_06_home_feed.png`: Kiểm tra Trang chủ, thẻ kính mờ, thanh dock 1 dòng.
   - `assets/screenshots/uat_07_filter.png`: Kiểm tra nút Back tròn 42x42px, chip kính mờ.
   - `assets/screenshots/uat_09_details.png`: Kiểm tra ảnh tràn viền 393px bo góc 28px, tấm acrylic che mờ hồ bơi.
   - `assets/screenshots/uat_11_360_omnidirectional.png`: Kiểm tra canvas 3 tầng đa cao độ và HUD cố định.
3. **Tổng hợp báo cáo UAT nghiệm thu (Artifact Report)**:
   - Xuất file artifact `UAT_ACCEPTANCE_REPORT.md` trình bày kết quả định lượng, bằng chứng thị giác dạng Carousel, và chữ ký nghiệm thu.
