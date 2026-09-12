# figma-server

# Antigravity CLI (agy) to Figma Desktop Bridge ⚡

Hệ thống cầu nối cục bộ thời gian thực cho phép **Antigravity CLI (agy)** tự động sinh giao diện UI, linh kiện Auto Layout, typography, màu sắc và **tự động nối dây Prototype tương tác (Smart Animate, Slide In, Flow Starting Points)** bên trong Figma Desktop.

---

## 📁 Cấu Trúc Dự Án (Project Structure)

```text
C:\figma\
├── .agents\
│   ├── skills\
│   │   └── figma-bridge\
│   │       └── SKILL.md          # Antigravity Skill hướng dẫn AI điều khiển Figma
│   └── rules\
│       └── figma-rules.md        # Quy chuẩn thiết kế (grid 8pt, kích thước iPhone, Smart Animate)
├── bridge-server\                # Local Bridge Server (Node.js + Express + WebSocket + MCP)
│   ├── src\
│   │   ├── server.js             # HTTP REST (port 8765) & WebSocket Bridge
│   │   ├── mcp-server.js         # Model Context Protocol stdio server cho agy
│   │   └── mock-figma-client.js  # Bộ giả lập Figma Plugin để test tự động không cần mở app
│   └── package.json
├── figma-plugin\                 # Plugin nạp vào Figma Desktop
│   ├── manifest.json             # Cấu hình plugin & phân quyền mạng (networkAccess)
│   ├── ui.html                   # Iframe duy trì kết nối WebSocket & hiển thị live HUD
│   └── code.js                   # Figma Sandbox Engine thực thi tạo Frame, Auto Layout & Prototype
├── scripts\
│   ├── start-server.bat          # File nháy đúp chuột để chạy nhanh Bridge Server
│   ├── start-server.ps1          # Script khởi động bằng PowerShell
│   ├── figma-dispatch.js         # Script gửi lệnh từ CLI: node figma-dispatch.js '<JSON>'
│   ├── figma-dispatch.ps1        # PowerShell dispatcher
│   ├── test-connection.js        # Script kiểm tra tình trạng kết nối tới Figma
│   └── demo-onboarding-flow.js   # Script tạo luồng mẫu Onboarding 2 màn hình + Smart Animate
├── tests\
│   └── test-server.js            # Bộ kiểm thử End-to-End tự động (6 scenarios)
├── docs\
│   └── MANUAL_SETUP_GUIDE.md     # Hướng dẫn chi tiết những việc bạn cần thao tác thủ công
├── tools\                        # Portable Node.js & NPM (chạy ngay không cần cài đặt admin)
├── GEMINI.md                     # Quy tắc dự án Antigravity
├── mcp_config.json               # Cấu hình MCP Server cho Antigravity
└── package.json                  # Cấu hình module gốc
```

---

## 🚀 Khởi Động Nhanh Trong 3 Bước

### 1. Khởi động Bridge Server
Nháy đúp chuột vào file:
```text
C:\figma\scripts\start-server.bat
```
Server sẽ chạy ngầm tại địa chỉ: `http://localhost:8765` và `ws://localhost:8765`.

### 2. Nạp Plugin vào Figma Desktop (Chỉ làm 1 lần)
1. Mở app **Figma Desktop**.
2. Bấm Menu Figma (góc trên bên trái) ➔ **Plugins** ➔ **Development** ➔ **Import plugin from manifest...**
3. Chọn file `C:\figma\figma-plugin\manifest.json`.
4. Bật plugin bằng cách: Menu ➔ **Plugins** ➔ **Development** ➔ **AGY Figma Bridge**.
5. Cửa sổ plugin hiện lên báo `🟢 Connected`. *(Giữ cửa sổ này mở trong khi làm việc)*.

### 3. Ra lệnh cho agy sinh giao diện & Prototype
Tại Terminal của agy:
> *"Vibe cho tôi luồng Onboarding mobile gồm 2 màn hình Splash và Login, nối nút Bắt đầu sang Login bằng hiệu ứng Smart Animate và đặt Flow bắt đầu là 'Onboarding Flow'"*

Sau khi agy chạy xong:
Quay lại Figma, bấm **`Shift + Space`** để mở cửa sổ Preview và click trải nghiệm tương tác động ngay lập tức!

---

## 🧪 Kiểm Thử Tự Động (Automated Testing)
Hệ thống đi kèm bộ test E2E hoàn chỉnh không phụ thuộc vào việc mở Figma Desktop:
```powershell
npm test
```
Kết quả:
```text
✔ Health check passed
✔ Disconnected rejection verified (HTTP 503)
✔ Mock Figma WebSocket connection verified
✔ PING roundtrip verified
✔ CREATE_FRAME verified
✔ Atomic BATCH_EXECUTE with Prototyping Wiring verified
🎉 ALL 6 TEST SCENARIOS PASSED WITH ZERO ERRORS!
```

---

## 📖 Hướng Dẫn Chi Tiết
Đọc file [`docs/MANUAL_SETUP_GUIDE.md`](docs/MANUAL_SETUP_GUIDE.md) để xem phân tích chi tiết giữa những gì AI tự động làm và những bước bạn thao tác tay.
