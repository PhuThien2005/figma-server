# Hướng Dẫn Thao Tác Thủ Công: Kết Nối Antigravity CLI (agy) Với Figma Desktop

Tài liệu này phân định rõ ràng giữa **những gì AI/agy tự động làm 100%** và **những bước bạn BẮT BUỘC phải cấu hình bằng tay (thủ công)** trên giao diện đồ họa.

---

## 1. Bảng Phân Chia Trách Nhiệm: AI Tự Động vs. Thao Tác Thủ Công Của Bạn

| Hạng mục | AI / agy tự động thực hiện | Bạn thao tác thủ công | Lý do kỹ thuật |
|---|:---:|:---:|---|
| **Cài đặt runtime & server** | ✅ Tạo sẵn mã nguồn Node.js, Express, WebSocket, MCP | ❌ Click chạy file `start-server.bat` | AI chuẩn bị đủ script, bạn chỉ cần 1 click để kích hoạt server chạy nền |
| **Mở ứng dụng Figma** | ❌ Không thể | ✅ Bật Figma Desktop và mở file thiết kế | Ứng dụng Desktop chạy native trên Windows có đăng nhập tài khoản bảo mật của bạn, CLI bên ngoài không thể tự click mở file cá nhân |
| **Nạp Plugin vào Figma** | ❌ Không thể | ✅ Bấm `Import plugin from manifest...` (Chỉ làm 1 lần duy nhất) | Figma yêu cầu người dùng xác nhận cấp quyền truy cập file hệ thống qua hộp thoại Windows File Explorer |
| **Bật Plugin kết nối** | ❌ Không thể | ✅ Click chọn Plugin trong menu `Plugins > Development` | Cơ chế bảo mật Sandbox của Figma: Plugin chỉ được cấp quyền chạy mã JavaScript khi người dùng chủ động mở nó trong file |
| **Tạo Frame, Text, Auto Layout** | ✅ 100% Tự động qua WebSocket | ❌ Không cần làm gì | AI tự tính toán vị trí, kích thước, tự động nạp font và vẽ lên Canvas |
| **Nối Prototype (Smart Animate, Slide In)** | ✅ 100% Tự động qua API | ❌ Không cần làm gì | AI tự tìm ID của Button và ID của Frame đích để thiết lập thuộc tính `reactions` |
| **Tạo Flow Starting Point** | ✅ 100% Tự động qua API | ❌ Không cần làm gì | AI tự gán thuộc tính `flowStartingPoints` cho màn hình khởi đầu |
| **Bấm thử tương tác Prototype** | ❌ Không thể | ✅ Nhấn `Shift + Space` hoặc icon Play | Bạn là người dùng trải nghiệm thực tế hiệu ứng chuyển cảnh trên màn hình |

---

## 2. Quy Trình Thao Tác Thủ Công Từng Bước (Chi Tiết & Dễ Hiểu Nhất)

### Bước 1: Khởi động Cầu nối (Bridge Server)
Bạn có 2 cách cực kỳ nhanh:
- **Cách nhanh nhất (Double-click)**: Vào thư mục `C:\figma\scripts\`, nháy đúp chuột vào file `start-server.bat`.
- **Hoặc qua Terminal**:
  ```powershell
  cd C:\figma
  npm start
  ```
- **Dấu hiệu thành công**: Màn hình cửa sổ đen Terminal sẽ hiển thị:
  ```text
  ====================================================
  🚀 AGY Figma Bridge Server running at:
     - HTTP REST API: http://localhost:8765
     - WebSocket:     ws://localhost:8765
     - Health Check:  http://localhost:8765/health
  ====================================================
  ```
  *(Hãy giữ cửa sổ này chạy ngầm trong suốt buổi làm việc)*.

---

### Bước 2: Nhập Plugin vào Figma Desktop (Chỉ làm 1 lần đầu)
1. Mở ứng dụng **Figma Desktop** trên máy tính.
2. Mở một file thiết kế bất kỳ (hoặc tạo file mới: **New design file**).
3. Bấm vào icon **Logo Figma** ở góc trên cùng bên trái màn hình.
4. Di chuột vào mục **Plugins** ➔ chọn **Development** ➔ bấm **Import plugin from manifest...**
5. Cửa sổ chọn file hiện ra, bạn điều hướng tới thư mục:
   ```text
   C:\figma\figma-plugin\manifest.json
   ```
6. Bấm **Open**. Figma sẽ báo đã nạp thành công plugin có tên **AGY Figma Bridge**.

---

### Bước 3: Kích hoạt Plugin trong file đang vẽ
1. Vẫn trong file Figma đó, bạn bấm lại vào Logo Figma ➔ **Plugins** ➔ **Development** ➔ Click vào **AGY Figma Bridge**.
2. Một cửa sổ nhỏ của Plugin sẽ xuất hiện trên màn hình:
   - Huy hiệu trạng thái chuyển sang: `🟢 Connected` (Màu xanh lá).
   - Dòng log hiển thị: `Connected to AGY Bridge Server! Ready for commands.`
3. **LƯU Ý CỰC KỲ QUAN TRỌNG**:
   - **Đừng tắt cửa sổ plugin này đi!** Figma Plugin chạy dưới dạng một tiến trình Sandbox ngầm; nếu bạn ấn nút `X` để đóng cửa sổ plugin, kết nối WebSocket sẽ bị cắt đứt và AI sẽ không thể vẽ lên màn hình.
   - Bạn chỉ cần kéo cửa sổ này sang một góc để quan sát nhật ký thao tác (live logs).

---

### Bước 4: Ra lệnh cho agy sinh giao diện và prototype
Bây giờ tại Antigravity CLI (agy), bạn chỉ cần gõ yêu cầu bằng ngôn ngữ tự nhiên:

> **Ví dụ prompt:**
> *"Vibe cho tôi một luồng Onboarding app tài chính gồm 2 màn hình: Màn 1 là Splash có logo và nút 'Bắt đầu ngay', bấm vào thì Smart Animate trượt sang Màn 2 là Đăng nhập có 2 ô input Email và Password cùng nút 'Đăng nhập'. Nhớ đặt Flow bắt đầu là 'Onboarding Flow'."*

AI sẽ tự động:
1. Tính toán bố cục Auto Layout, bảng màu hiện đại, kích thước chuẩn iPhone (393 x 852 px).
2. Tự động nạp font `Inter` an toàn mà không gây crash sandbox.
3. Gửi lệnh qua Bridge Server tới Plugin.
4. Nối dây `reactions` chuyển cảnh từ nút bấm sang màn hình 2.
5. Gán Flow Starting Point.

---

### Bước 5: Bấm thử và trải nghiệm tương tác trực tiếp trên Figma
Sau khi agy thông báo hoàn tất, bạn quay lại cửa sổ Figma:
1. Bạn sẽ thấy 2 màn hình cùng các nút bấm đã được vẽ ngay ngắn trên canvas.
2. Để trải nghiệm luồng động tương tác:
   - **Cách 1 (Nhanh nhất - Inline Preview)**: Nhấn tổ hợp phím tắt **`Shift + Space`**. Một pop-up preview trực tiếp sẽ hiện lên ngay trên canvas. Bạn lấy chuột click thử vào nút "Bắt đầu ngay" để xem màn hình chuyển cảnh mượt mà bằng Smart Animate!
   - **Cách 2 (Toàn màn hình - Present mode)**: Nhấn vào icon **Play (Present)** hình tam giác ở góc trên bên phải thanh công cụ Figma.

---

## 3. Cấu Hình MCP Native (Tùy Chọn - Dành Cho Người Thích Gọi Tool Trực Tiếp)

Hệ thống đã chuẩn bị sẵn file `C:\figma\mcp_config.json`. Nếu bạn muốn Antigravity CLI tự động nhận diện các công cụ như `figma_create_frame`, `figma_create_button`, `figma_add_interaction` dưới dạng MCP Tool gốc:

1. Mở file cấu hình Antigravity toàn cục tại đường dẫn:
   ```text
   C:\Users\<Tên_User>\.gemini\config\mcp_config.json
   ```
2. Thêm khối cấu hình sau vào trong trường `"mcpServers"`:
   ```json
   {
     "mcpServers": {
       "figma-bridge": {
         "command": "C:/figma/tools/node.exe",
         "args": ["C:/figma/bridge-server/src/mcp-server.js"],
         "env": {
           "BRIDGE_URL": "http://localhost:8765"
         }
       }
     }
   }
   ```
3. Khởi động lại phiên làm việc của agy để kích hoạt bộ công cụ MCP.

---

## 4. Xử Lý Các Sự Cố Thường Gặp (Troubleshooting)

### 🔴 Lỗi: "Figma Plugin is not connected"
- **Nguyên nhân**: Server đang chạy nhưng bạn chưa bật Plugin trong Figma Desktop, hoặc đã lỡ bấm nút tắt cửa sổ plugin.
- **Cách khắc phục**: Vào lại Figma ➔ `Plugins` ➔ `Development` ➔ click `AGY Figma Bridge`. Đảm bảo thấy chữ `🟢 Connected`.

### 🔴 Lỗi: "Cannot connect to AGY Bridge Server at http://localhost:8765"
- **Nguyên nhân**: Bridge Server chưa được khởi động.
- **Cách khắc phục**: Nháy đúp vào `C:\figma\scripts\start-server.bat` hoặc chạy lệnh kiểm tra `node scripts/test-connection.js`.

### 🔴 Lỗi: Font không hiển thị hoặc bị lỗi chữ
- **Nguyên nhân**: Plugin đang cố gắng sửa text mà không nạp font trước.
- **Cách khắc phục**: Plugin của hệ thống này đã tích hợp cơ chế tự động nạp font `await ensureFont('Inter', 'Regular')`. Nếu font bạn yêu cầu không có trên máy, plugin sẽ tự động fallback về font hệ thống tiêu chuẩn (`Inter` hoặc `Roboto`) mà không bị crash.

### 🔴 Cổng 8765 bị chiếm dụng (Port Conflict)
- Nếu cổng 8765 đang bị phần mềm khác sử dụng, bạn có thể chỉ định cổng mới trong PowerShell:
  ```powershell
  $env:PORT=8888; node bridge-server/src/server.js
  ```
  Sau đó chỉnh sửa địa chỉ URL tương ứng trong `figma-plugin/ui.html`.
