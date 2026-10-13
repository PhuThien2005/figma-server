---
name: arki-112-screen-system
description: Industrial Design System, 40-Rule UI/UX Audit Engine, and Modular 112-Screen Generator Architecture for the ARKI Real Estate & 360 Virtual Tour Platform.
---

# ARKI 112-Screen Industrial Design System & Audit Engine

This skill governs the visual design, ergonomic compliance, and modular code generation of the **112 mobile application screens** across the ARKI Architectural Ecosystem (Buyer, Architect/Designer, Real Estate Agent).

---

## 1. The 40 UI/UX Ergonomic & Visual Commandments

### A. Thanh Trạng Thái & Khu Vực Đầu Trang (Header & Status Area)
1. **[R01] Tiêu Đề Có Ngữ Cảnh:** Luôn có tiêu đề trang rõ ràng (18px Bold) và phụ đề ngữ cảnh (10-11px SemiBold Gold/Muted) phía sau nút quay lại.
2. **[R02] Vùng Chạm Fitts's Law:** Nút quay lại tròn hoặc vuông tối thiểu $44 \times 44\text{px}$ (`x: 20, y: 56, width: 44, height: 44, cornerRadius: 22`).
3. **[R03] Biểu Tượng Chuẩn Mực:** Chỉ dùng icon mũi tên thanh mảnh `←` căn giữa chính xác; cấm kèm nhãn chữ "Back" thừa thãi.
4. **[R04] Thang Khoảng Cách Nhất Quán:** Áp dụng hệ thống Spacing Scale 8pt nghiêm ngặt (`8 / 12 / 16 / 24 / 32px`).
5. **[R05] Thanh Tìm Kiếm Đầy Đủ Trạng Thái:** Chiều cao 44px, bo góc 12px, placeholder sắc nét $\ge 13\text{px}$, tích hợp icon kính lúp `🔍` và nút xóa `✕`.

### B. Hàng Danh Mục & Bộ Lọc (Category Chips & Filters)
6. **[R06] Không Tràn Ngang Mù Quáng:** Các chip lọc phải vừa vặn với chiều rộng màn hình ($345\text{px}$ safe area) hoặc có chỉ báo cuộn ngang rõ ràng (Scroll indicator).
7. **[R07] Khoảng Cách Chip Đồng Nhất:** Khoảng cách giữa các chip cố định $8\text{px}$; padding ngang bên trong mỗi chip $12\text{px}$.
8. **[R08] Trạng Thái Chọn Vượt Trội:** Chip Active dùng Titanium White (`#F4F4F6`, chữ đen đậm `#0B0C0E`); Chip Inactive dùng nền tối trung tính (`#131418`, viền `#24262E`, chữ `#A1A1AA`).
9. **[R09] Số Lượng Kết Quả Rõ Ràng:** Hiển thị số lượng mục phù hợp (ví dụ: "14 Dinh Thự Phù Hợp") trên nút áp dụng hoặc đầu danh sách.

### C. Thẻ Bất Động Sản (Estate Card Hierarchy & Consistency)
10. **[R10] Hệ Thống Thẻ Nhất Quán:** Toàn bộ thẻ BĐS trên canvas tuân thủ chiều rộng $345\text{px}$, bo góc $16\text{px}$, padding $16\text{px}$.
11. **[R11] Thứ Bậc Thông Tin Chuẩn:** 
    1. Tên công trình (16-18px Bold `#F4F4F6`, tối đa 2 dòng).
    2. Vị trí & KTS & Diện tích (11-12px Regular `#A1A1AA`).
    3. Giá niêm yết (17-18px Bold `#F4F4F6`).
    4. Nút hành động CTA.
12. **[R12] Chuẩn Hóa Định Dạng Tiền Tệ:** Viết gọn `$4,250,000` (không lặp lại vừa `$` vừa `USD`).
13. **[R13] Chuẩn Hóa Đơn Vị Đo:** Luôn dùng ký hiệu chuẩn `m²` (không dùng `m2` hay `sqm`).
14. **[R14] Nút Yêu Thích Trực Quan:** Bố trí nút tim `♡` ở góc trên bên phải ảnh bìa (`x: 295, y: 14, width: 36, height: 36, cornerRadius: 18, bg: #0B0C0ECC`).
15. **[R15] Đồng Nhất Nút Hành Động:** Nút CTA dùng nhãn "Xem Chi Tiết →" (hoặc "Xem Dinh Thự →") màu Titanium White đồng bộ; cấm dùng nút "Khám Phá" mơ hồ.
16. **[R16] Vùng Chạm Rõ Ràng:** Đảm bảo toàn bộ thẻ có thể chạm hoặc nút CTA có chiều cao tối thiểu $42\text{px}$.

### D. Thanh Điều Hướng Đáy (Bottom Navigation Dock)
17. **[R17] 4 Vùng Chia Đều Tuyệt Đối:** Chiều rộng màn hình $393\text{px}$ chia cho 4 tab = $98.25\text{px}$ mỗi tab.
18. **[R18] Tích Hợp Icon & Nhãn Chữ:** Bắt buộc có cả biểu tượng tối giản và nhãn chữ:
    - Tab 0: `◎ Khám Phá`
    - Tab 1: `⚲ Bản Đồ`
    - Tab 2: `♡ Đã Lưu`
    - Tab 3: `👤 Hồ Sơ`
19. **[R19] Chỉ Báo Trạng Thái Đang Chọn (Active Indicator):** 
    - Chữ và icon của tab Active có màu Titanium White (`#F4F4F6`, fontStyle: Bold).
    - Có thanh gạch chân Active Bar phía dưới (`width: 24, height: 3, cornerRadius: 2, bg: #F4F4F6`).
    - Tab Inactive có màu xám dịu (`#71717A`).
20. **[R20] Cố Định Vị Trí (Fixed Dock):** Chiều cao dock $76\text{px}$, tọa độ $y = 776$, nền `#090A0DF2` với viền trên 1px.

---

## 2. Kiến Trúc 112 Màn Hình Ứng Dụng (112 File Generators)

Toàn bộ 112 màn hình được chia thành 8 module độc lập trong thư mục `scripts/generators/modules/`:

| Module | Thư mục | Số màn | Dải mã màn hình | Trọng tâm nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `modules/auth/` | 12 | `SCR-AUTH-01 → 12` | Splash, Onboarding 1-3, Chọn vai trò, OTP, eKYC Face/CCCD, Chứng chỉ |
| **Tour 360** | `modules/tour360/` | 15 | `SCR-360-01 → 15` | Viewer Gyroscope, Carousel phòng, Mặt bằng Radar, Thước đo, Hotspots, VR |
| **Buyer** | `modules/buyer/` | 20 | `SCR-BUY-01 → 20` | Bento Grid, Bộ lọc, Chi tiết dinh thự, Tính lãi vay, Đặt lịch bay, VIP Pass |
| **Architect** | `modules/architect/` | 20 | `SCR-ARC-01 → 20` | Portfolio KTS, Tải ảnh 360, Node Linking, Hotspots editor, Duyệt dầm CAD |
| **Agent** | `modules/agent/` | 18 | `SCR-AGT-01 → 18` | Dashboard, Giỏ hàng ký gửi, Quét Pano, Leads CRM, Lịch bay Bell 429 |
| **Comms** | `modules/comms/` | 12 | `SCR-COM-01 → 12` | Phòng Co-tour 360 (Host/Guest), Laser pointer, Whiteboard, Chat 1-1 KTS |
| **Transactions**| `modules/transactions/`| 13 | `SCR-TXN-01 → 13` | Báo giá #MOD-04, Ký hợp đồng số, Khóa Escrow 68.2 BTC Multi-Sig 3/5 |
| **Settings** | `modules/settings/` | 12 | `SCR-SET-01 → 12` | Cấu hình 360, Cache, Offline tour, Switch Profile (Buyer/Designer/Agent) |

---

## 3. Cách Thức Thực Thi & Kiểm Định

1. **Chạy đơn lẻ 1 màn hình:**
   ```bash
   tools/node.exe scripts/generators/modules/buyer/scr_buy_01.js
   ```
2. **Chạy theo module:**
   ```bash
   tools/node.exe scripts/build-112-screens.js --buyer
   ```
3. **Chạy kiểm định chất lượng (Automated UAT Suite):**
   ```bash
   tools/node.exe scripts/run-ui-ux-uat.js
   ```
4. **Chụp ảnh màn hình kiểm chứng (Visual Proof):**
   ```bash
   tools/node.exe scripts/capture-canvas.js uat-screenshots/golden_04_client_feed.png 1166:302
   ```
