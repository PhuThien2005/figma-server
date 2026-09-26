# 📖 CẨM NANG HƯỚNG DẪN SỬ DỤNG HỆ THỐNG ARKI FIGMA BRIDGE

Tài liệu hướng dẫn chi tiết từ A-Z cách thiết lập môi trường, kết nối Antigravity CLI tới Figma Desktop, chạy tự động hoá và tương tác với hệ thống 104 màn hình ARKI.

---

## 📑 Mục Lục

1. [Yêu Cầu Hệ Thống & Cài Đặt Ban Đầu](#1-yêu-cầu-hệ-thống--cài-đặt-ban-đầu)
2. [Hướng Dẫn Khởi Động Bridge Server](#2-hướng-dẫn-khởi-động-bridge-server)
3. [Hướng Dẫn Nạp Plugin Vào Figma Desktop](#3-hướng-dẫn-nạp-plugin-vào-figma-desktop)
4. [Hướng Dẫn Trải Nghiệm Prototype Trực Tiếp](#4-hướng-dẫn-trải-nghiệm-prototype-trực-tiếp)
5. [Hướng Dẫn Thao Tác 3D Turntable 360° Drag & Video Player](#5-hướng-dẫn-thao-tác-3d-turntable-360-drag--video-player)
6. [Hướng Dẫn Ra Lệnh Tự Động Hóa Từ CLI](#6-hướng-dẫn-ra-lệnh-tự-động-hóa-từ-cli)
7. [Hướng Dẫn Nạp Ảnh Thật Bằng Script Tự Động](#7-hướng-dẫn-nạp-ảnh-thật-bằng-script-tự-động)
8. [Khắc Phục Sự Cố Thường Gặp (Troubleshooting)](#8-khắc-phục-sự-cố-thường-gặp-troubleshooting)

---

## 1. Yêu Cầu Hệ Thống & Cài Đặt Ban Đầu

- **Hệ điều hành**: Windows 10/11, macOS, hoặc Linux.
- **Figma Desktop**: Đã cài đặt ứng dụng Figma Desktop (khuyến nghị dùng app Desktop thay vì trình duyệt web để hỗ trợ plugin phát triển cục bộ mượt mà nhất).
- **Node.js**: Đã tích hợp sẵn Node.js portable tại thư mục `tools/node.exe` (không yêu cầu quyền Admin, không cần cài đặt thêm).

---

## 2. Hướng Dẫn Khởi Động Bridge Server

Bridge Server đóng vai trò trung gian nhận lệnh từ Antigravity CLI / Script và truyền qua WebSocket tới Figma Plugin.

### Cách 1: Chạy bằng file nháy đúp (Đơn giản nhất)
Nháy đúp chuột vào file:
```text
C:\figma\scripts\start-server.bat
```

### Cách 2: Chạy từ Terminal / PowerShell
Mở PowerShell tại thư mục `C:\figma` và gõ:
```powershell
.\tools\node.exe bridge-server/src/server.js
```

Khi khởi động thành công, Terminal sẽ hiển thị:
```text
🚀 Figma Bridge HTTP server running on http://localhost:8765
🔌 WebSocket server running on ws://localhost:8765
```

---

## 3. Hướng Dẫn Nạp Plugin Vào Figma Desktop

*(Bạn chỉ cần làm bước này 1 lần duy nhất)*

1. Mở ứng dụng **Figma Desktop**.
2. Mở file thiết kế của bạn (hoặc tạo một file thiết kế mới).
3. Bấm vào icon **Menu Figma** ở góc trên cùng bên trái (hoặc bấm chuột phải vào Canvas trống).
4. Di chuyển chuột tới: **Plugins** ➔ **Development** ➔ **Import plugin from manifest...**
5. Tìm và chọn file:
   ```text
   C:\figma\figma-plugin\manifest.json
   ```
6. Sau khi import xong, kích hoạt plugin bằng cách:
   - Bấm chuột phải ➔ **Plugins** ➔ **Development** ➔ **AGY Figma Bridge**.
7. Cửa sổ Plugin nhỏ sẽ xuất hiện ở góc dưới bên phải màn hình:
   - Nếu Server đang chạy, Plugin sẽ hiển thị: `🟢 Connected` và đồng hồ đo độ trễ WebSocket.
   - **Lưu ý**: Hãy giữ cửa sổ plugin này mở trong suốt quá trình thao tác tự động hoá.

---

## 4. Hướng Dẫn Trải Nghiệm Prototype Trực Tiếp

Hệ sinh thái ARKI sở hữu hơn **370+ transitions tương tác**, kết nối chặt chẽ qua 6 flow chính:

### Cách Mở Trình Chiếu Prototype
1. Trong file Figma, chuyển tới trang **`Page 3`**.
2. Nhấn tổ hợp phím tắt:
   - Windows: **`Shift + Space`** (mở cửa sổ Preview trực tiếp ngay trên Canvas) hoặc chọn nút **Play** ở góc trên bên phải thanh công cụ.
3. Ở cột bên phải tab **Prototype**, danh sách **Flow starting points** được thiết lập với **Giao Diện Sáng là luồng chính mặc định**:
   - **`☀️ ARKI — Giao Diện Sáng Chính (52 Màn Hình & Menu Drawer)`** (Mặc định Flow 1): Khởi động trải nghiệm đầy đủ từ Splash Sáng.
   - **`☀️ ARKI — Trang Chủ Khám Phá & Menu 3 Gạch [Light]`** (Flow 2): Trải nghiệm ngay Trang chủ khám phá kèm tương tác Menu 3 gạch (☰) và Avatar.
   - **`🌙 ARKI — Nocturne Dark Flow (52 Màn Hình)`**: Trải nghiệm độc lập 52 màn hình Dark Theme.
   - **`⚡ ARKI — Full Interactive Experience`**: Luồng toàn diện kết hợp màn tải động, 3D xoay 360°, video và 104 màn hình.

---

## 5. Hướng Dẫn Trải Nghiệm 360° Panorama Street View (Kéo Xoay Mượt Mà) & Video Tour

### 🌐 Trải Nghiệm 360° Panorama Đa Hướng (Kéo Lên • Xuống • Ngang • Chéo Chuẩn Google Street View)
Để mang lại trải nghiệm xem không gian 360 độ chân thực nhất theo mọi góc nhìn trong Figma (nhìn lên trần/trời, nhìn xuống sàn/hồ bơi, xoay vòng 360° và lướt chéo góc):
1. **Khung nhìn Viewport (393 × 852 px)**: Màn hình `ARKI / 11 - 360° Panorama Street View [Light]` bật **Clip content** để ẩn phần canvas tràn ra ngoài.
2. **Cấu hình Cuộn Tự Do 2D (`overflowDirection: 'BOTH'`)**: Viewport được thiết lập chế độ cuộn cả hai trục (Both horizontal and vertical scrolling), mở khóa khả năng click-drag chuột theo **bất kỳ hướng nào (Ngang, Dọc và Chéo $45^\circ$)**.
3. **Không gian ảnh kiến trúc 3 tầng đa cao độ ($3400 \times 1800\text{ px}$)**:
   - **Tầng Trên Cao ($Y: 0 \rightarrow 550$)**: Vòm kính thông tầng, giếng trời kiến trúc, bầu trời quang đãng và bãi đáp trực thăng tầng mái (kéo xuống để ngước nhìn lên trần).
   - **Tầng Tầm Mắt ($Y: 520 \rightarrow 1380$)**: Đại sảnh thông tầng 7.2m, vách kính nhìn ra vách biển Sơn Trà, đảo bếp đá Calacatta thương hiệu Boffi (kéo ngang để xoay $360^\circ$ quanh phòng).
   - **Tầng Dưới Thấp ($Y: 1350 \rightarrow 1800$)**: Mặt nước hồ bơi vô cực 35m soi bóng biệt thự, sàn gỗ Teak tự nhiên và đá phiến Travertine Ý (kéo lên để nhìn xuống sàn/nước).
4. **Hotspot tương tác phân tầng**: Bố trí 4 điểm tương tác không gian ở các cao độ khác nhau (*🚁 Bãi đáp trực thăng tầng mái*, *◉ Đại sảnh thông tầng 7.2m*, *◉ Bếp đảo Boffi*, *🏊 Hồ bơi nước mặn 35m*).
5. **Tầng điều khiển HUD kính mờ cố định (Fixed Layers)**: Nút quay lại tròn kính mờ $42 \times 42\text{ px}$ (`←`), thanh trạng thái, la bàn định hướng 360° và thẻ hướng dẫn thao tác đa hướng `✢` luôn ghim cố định trên màn hình, không bị trôi khi kéo ảnh.
6. **Cách Thao Tác**:
   - Mở flow **`🌐 ARKI — 360° Panorama Đa Hướng (Kéo Ngang, Dọc & Chéo)`** hoặc nhấn vào nút **`🥽 Không Gian 3D`** trên màn hình Chi Tiết Dinh Thự (`09`).
   - Nhấn **`Shift + Space`** để bật Preview.
   - Dùng chuột **nhấp giữ và kéo sang trái/phải (xoay ngang), kéo lên/xuống (nhìn trần/sàn) hoặc kéo chéo $45^\circ$** để khám phá mọi ngóc ngách không gian biệt thự.

### 🎬 Thao Tác Bật / Tắt Video Tour
1. Chọn màn hình `12a - Video Tour (Paused)`.
2. Bấm vào nút tròn lớn **`▶ Play`** ở giữa màn hình:
   - Giao diện lập tức chuyển sang trạng thái đang phát (`12b - Video Tour (Playing 02:45)`).
   - Nút đổi thành biểu tượng tạm dừng **`❚❚ Pause`**.
   - Thanh tiến trình scrubber đổi sang màu vàng hổ phách và hiển thị thời gian phát `02:45 / 04:10`.
3. Bấm lại nút **`❚❚ Pause`** để đưa về trạng thái tạm dừng ban đầu.

### 🍔 Menu 3 Gạch (☰) & Bộ Icon Chung Style Hình Vẽ (Vector Stroke Outlines)
- Trên góc trên bên phải của Trang chủ và các màn hình chính:
  - Nút chuyển theme cồng kềnh trước đây đã được thay thế bằng **Menu 3 gạch nhỏ (☰)**, **Icon Theme đường nét mảnh**, và **Avatar người dùng mini**.
  - **Chọt vào Menu 3 gạch (☰) hoặc Avatar**: Mở khay điều hướng trượt **Navigation Drawer Menu** (`ARKI / 25 - Navigation Drawer Menu [Light]`).
  - **Bên trong Menu Drawer tích hợp bộ icon chung style hình vẽ (không dùng emoji màu mè)**:
    1. **Avatar & Hồ sơ người dùng VIP**: Hiển thị ảnh chân dung cao cấp, tên **Alexander Vance**, huy hiệu `✦ BLACK DIAMOND #004`, email và nút icon liên kết ngoài (`↗`).
    2. **Chuyển theme chuẩn nét vẽ vector**: Nút icon nét vẽ Mặt trời (`sun.png`) và Mặt trăng (`moon.png`) đơn sắc, chuyển đổi 2 chiều mượt mà (`SMART_ANIMATE`).
    3. **Chuyển ngôn ngữ Swiss Typography**: Nút chuyển đổi tinh gọn song ngữ `VI` $\leftrightarrow$ `EN` chuẩn phong cách tối giản quốc tế.
    4. **Ma trận Quick Actions 2×3 nét vẽ đồng bộ**:
       - 6 thẻ icon đồng nhất độ dày nét (2px stroke line-art): Sổ tay lưu trữ (`bookmark`), Bản đồ nếp gấp (`map`), Bong bóng hội thoại (`speech`), Biểu đồ tăng trưởng (`chart`), Ổ khóa bảo mật (`lock`), Cửa thoát đăng xuất (`logout`).
    5. **Đóng Menu**: Bấm nút **`✕`** hoặc chạm vào vùng màn hình nền tối bên trái để trượt đóng menu (`SLIDE_OUT`).

### 🖼️ Chuẩn Hình Ảnh Full Chiều Ngang & Bo Góc Toàn Diện (Full-Width & Rounded Imagery)
- **Fix cứng chiều ngang tràn viền (`width: 393px`, `x: 0`)**:
  - Mọi hình ảnh kiến trúc chủ đạo (Hero Cover Onboarding, Thẻ kiến trúc Home Feed, Media Header Chi tiết dinh thự, Màn hình Video Tour 16:9, Bộ sưu tập ảnh Slider Fullscreen, và Graphic Art trên các màn hình chức năng) đều được căn chỉnh tràn viền toàn bộ chiều ngang màn hình điện thoại ($393\text{ px}$, $X = 0$).
  - Mang lại trải nghiệm thị giác điện ảnh sống động, khoáng đạt, tương xứng với đẳng cấp bất động sản siêu sang.
- **Bo góc nghệ thuật đồng bộ (Universal Corner Radii)**:
  - **Hero & Media chính ($24 - 28\text{ px}$)**: Bo góc lớn mềm mại cho khối ảnh chính trên Onboarding, Chi tiết, Video và Sliders.
  - **Thẻ phụ & Thumbnail ($16 - 20\text{ px}$)**: Bo góc hài hòa cho các ảnh xem trước (Thumbnails 1-3), thẻ bộ sưu tập đã lưu (Item Art 1-3), thẻ thứ cấp trên Feed.
  - **Mẫu vật liệu ($14\text{ px}$)**: Bo góc tinh tế cho các ô mẫu vật liệu (Marble, Wood, Titanium).
  - Khắc phục triệt để lỗi góc nhọn thô cứng và tình trạng chữ đè lên ảnh.

### 🔘 Hệ Thống Icon Quy Chuẩn (Universal Icons — Chuẩn UX Quốc Tế)
Theo nghiên cứu công thái học và chuẩn UI/UX quốc tế (Apple HIG, Google Material Design, giáo trình IE106 UIT), các biểu tượng phổ thông đã định hình sẵn phản xạ nhận diện trong não bộ người dùng, **hoàn toàn không cần chữ đi kèm**:
- **Nút Quay Lại (`←`) chuẩn nút tròn kính mờ**:
  - Loại bỏ hoàn toàn nhãn chữ dài dòng (`← Quay lại` / `← Back`).
  - Chuẩn hóa thành nút tròn kính mờ kích thước chuẩn công thái học **$42 \times 42\text{ px}$** (`cornerRadius: 21`), tọa độ chuẩn ($X = 24, Y = 54$).
  - Căn giữa hoàn hảo mũi tên `←` (Inter Bold 18pt), nền kính mờ chống lóa (`#FFFFFFCC` viền mảnh trên nền sáng, `#0F172ACC` viền mờ trên ảnh/nền tối).
- **Hệ thống Icon Quy Chuẩn xuyên suốt ứng dụng**:
  | Icon | Biểu Tượng | Ý Nghĩa Quy Chuẩn Tự Hiểu | Áp Dụng Trong ARKI |
  |:---:|:---:|---|---|
  | **Back** | `←` | Quay lại màn hình trước | Nút tròn $42 \times 42\text{ px}$ cố định góc trên bên trái tất cả 52 màn hình con |
  | **Close** | `✕` | Đóng popup, thoát modal/drawer | Nút đóng Menu Drawer và tắt trình chiếu |
  | **Search** | `🔍` | Tìm kiếm dữ liệu, từ khóa | Ô tìm kiếm thông minh trên Home Feed |
  | **Menu** | `☰` | Mở danh mục điều hướng chính | Nút hamburger góc trên bên phải Trang chủ |
  | **Theme** | `☀` / `☾` | Chuyển đổi giao diện Sáng / Tối | Nút icon đường nét trong Menu Drawer & Trang chủ |
  | **Language**| `VI` / `EN` | Chuyển đổi ngôn ngữ hiển thị | Nút Swiss Typography trong Menu Drawer |
  | **Share** | `↗` | Chia sẻ liên kết ra ngoài | Nút chia sẻ hồ sơ và liên kết dinh thự mã hóa |
  | **Favorite**| `♡` | Lưu trữ vào bộ sưu tập yêu thích | Thẻ lưu trữ kiệt tác kiến trúc |
- **Tiếng Việt là ngôn ngữ hiển thị mặc định**: 100% nội dung trên 52 màn hình Daylight Porcelain Theme được biên soạn bằng tiếng Việt chuyên ngành kiến trúc chuẩn mực, tự nhiên và sang trọng.

### 📱 Chuẩn Gói Gọn Trong 1 Màn Hình Chiều Dọc & Header Tinh Gọn (Single Viewport Layout)
- **Loại bỏ nút chuyển theme ở mọi trang phụ**: Theo đúng nguyên lý thiết kế tối giản, nút đổi theme không xuất hiện tràn lan trên từng trang con gây rối mắt. Người dùng đổi theme tập trung qua Menu Drawer (☰) hoặc Header Trang chủ.
- **Header thoáng đãng & nút Back kính mờ**: Trên toàn bộ các trang chi tiết, bộ lọc, bản đồ, lưu trữ và hồ sơ cá nhân, header chỉ giữ lại nút quay lại tròn kính mờ (`←`), loại bỏ hoàn toàn các nút dư thừa.
- **Nội dung gói gọn trọn vẹn trong 852px**: 
  - Mọi nội dung, form nhập liệu, thẻ thông tin, mã QR và nút bấm hành động chính (Primary CTA) đều được tính toán căn chỉnh hoàn hảo trong chiều dọc màn hình ($393 \times 852\text{ px}$).
  - Khắc phục 100% tình trạng tràn khung dọc (overflow) ở khối thông tin chi tiết (`Details Body` được khóa ở $552\text{ px}$, bottom chính xác $852\text{ px}$).
  - Người dùng không phải scroll không cần thiết trên các màn hình chức năng (Onboarding, Login, FaceID, OTP, NDA, Filter, Details preview, Sliders, Viewing Booking, VIP Pass, Chat input, Calculator, Profile). Chỉ cuộn dọc ở các luồng cấp thiết như Bảng tin khám phá vô tận (Home Feed) và Lưới thư viện ảnh toàn cảnh (Grid).

---

## 6. Hướng Dẫn Ra Lệnh Tự Động Hóa Từ CLI

Bạn có thể gửi lệnh trực tiếp cho Figma thông qua CLI bằng cách sử dụng script `scripts/figma-dispatch.js`:

### Cú pháp:
```powershell
.\tools\node.exe scripts/figma-dispatch.js '<JSON_PAYLOAD>'
```

### Ví dụ 1: Tạo một nút bấm Auto Layout
```powershell
.\tools\node.exe scripts/figma-dispatch.js '{"action":"CREATE_BUTTON","params":{"text":"Book Private Viewing","backgroundColor":"#0284C7","textColor":"#FFFFFF"}}'
```

### Ví dụ 2: Tạo liên kết Prototype giữa 2 màn hình
```powershell
.\tools\node.exe scripts/figma-dispatch.js '{"action":"ADD_INTERACTION","params":{"sourceNodeId":"Button_1","targetNodeId":"Screen_2","trigger":"ON_CLICK","transitionType":"SMART_ANIMATE","duration":0.35}}'
```

---

## 7. Hướng Dẫn Nạp Ảnh Thật Bằng Script Tự Động

Để nạp ảnh chụp thực tế vào các card, container mà không lo lỗi mạng sandbox:

```powershell
.\tools\node.exe scratch/fill-all-light-and-dark-images.js
```

Script sẽ:
1. Tải trước 18 bức ảnh kiến trúc Pritzker độ nét cao vào RAM dưới dạng nhị phân.
2. Quét toàn bộ 104 màn hình trên canvas đang mở.
3. Bơm trực tiếp ảnh vào các thẻ thông qua hàm `figma.createImage(bytes)`.

---

## 8. Khắc Phục Sự Cố Thường Gặp (Troubleshooting)

| Tình Huống | Nguyên Nhân | Cách Xử Lý |
|---|---|---|
| **Cửa sổ Plugin báo `🔴 Disconnected`** | Bridge Server chưa được khởi động. | Chạy `scripts/start-server.bat` hoặc kiểm tra xem port 8765 có bị ứng dụng khác chiếm giữ không. |
| **Báo lỗi `Port 8765 in use`** | Có một tiến trình Node.js cũ đang chạy ngầm. | Mở Task Manager tắt tiến trình `node.exe`, hoặc chạy: `Get-Process node | Stop-Process`. |
| **Nút bấm bị nhảy vị trí khi xoay 3D** | Chưa chọn layer đúng tên khi Smart Animate. | Đảm bảo các layer chuyển tiếp giữa các frame giữ nguyên tên để Figma nội suy toạ độ. |
| **Video không nạp được file .mp4** | Chính sách của Figma giới hạn `createVideoAsync` chỉ cho tài khoản trả phí (Paid Pro Team ngoài Drafts). | Sử dụng cơ chế Video Player 2 trạng thái Play/Pause được xây dựng sẵn. Khi chuyển file vào Pro Team, plugin sẽ tự nạp video nhị phân. |

---

**ARKI Documentation** • Hướng dẫn vận hành hệ thống toàn diện.
