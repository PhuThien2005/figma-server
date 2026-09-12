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
3. Ở cột bên phải tab **Prototype**, bạn sẽ thấy danh sách **Flow starting points**:
   - **`⚡ ARKI — Full Interactive Experience`**: Luồng trải nghiệm hoàn chỉnh toàn bộ tính năng (Loading $\rightarrow$ Home $\rightarrow$ Details $\rightarrow$ 3D $\rightarrow$ Video $\rightarrow$ Booking).
   - **`🌙 ARKI — Nocturne Dark Experience`**: Trải nghiệm độc lập 52 màn hình Dark Theme.
   - **`☀️ ARKI — Daylight Porcelain Experience`**: Trải nghiệm độc lập 52 màn hình Light Theme.
   - **`🌀 ARKI — 3D Turntable 360° Drag Experience`**: Thử nghiệm tương tác xoay biệt thự 360° bằng cử chỉ kéo.
   - **`🎬 ARKI — 4K Flythrough Video Player Experience`**: Thử nghiệm trình phát video 2 trạng thái Play/Pause.
   - **`⏳ ARKI — 3-Stage Animated Loading Experience`**: Thử nghiệm thanh tải dữ liệu tự động.

---

## 5. Hướng Dẫn Thao Tác 3D Turntable 360° Drag & Video Player

### 🌀 Thao Tác Xoay 3D Turntable 360°
1. Mở flow **`🌀 ARKI — 3D Turntable 360° Drag Experience`** hoặc chọn màn hình `11 - 3D Angle 000°`.
2. **Nhấn giữ chuột trái (hoặc ngón tay trên màn hình cảm ứng) và vuốt ngang sang trái/phải**.
3. Góc nhìn của biệt thự sẽ chuyển dịch mượt mà qua các góc quay:
   - $000^\circ$ (Mặt tiền kính & hồ bơi)
   - $090^\circ$ (Cánh đông & bãi đáp trực thăng)
   - $180^\circ$ (Mặt sau hướng hoàng hôn)
   - $270^\circ$ (Cánh tây & khuôn viên vườn thiền)
   - $000^\circ$ (Quay tròn trở lại điểm đầu)

### 🎬 Thao Tác Bật / Tắt Video Tour
1. Chọn flow **`🎬 ARKI — 4K Flythrough Video Player Experience`** hoặc vào màn hình `12a - Video Tour (Paused)`.
2. Bấm vào nút tròn lớn **`▶ Play`** ở giữa màn hình:
   - Giao diện lập tức chuyển sang trạng thái đang phát (`12b - Video Tour (Playing 02:45)`).
   - Nút đổi thành biểu tượng tạm dừng **`❚❚ Pause`**.
   - Thanh tiến trình scrubber đổi sang màu vàng hổ phách và hiển thị thời gian phát `02:45 / 04:10`.
3. Bấm lại nút **`❚❚ Pause`** để đưa về trạng thái tạm dừng ban đầu.

### ☀️ Chuyển Đổi Giao Diện Sáng / Tối Tức Thì
- Trên góc trên cùng bên phải của tất cả các màn hình đều có nút chuyển theme:
  - Bấm nút **`☀️ Light`** (trên màn hình Dark) $\rightarrow$ Chuyển ngay sang màn hình Light tương ứng.
  - Bấm nút **`🌙 Dark`** (trên màn hình Light) $\rightarrow$ Trở về màn hình Dark tương ứng.

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
