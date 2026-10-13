---
name: anti-ai-ui
description: Audit and rewrite frontend UI code and Figma designs to eliminate generic AI-generated aesthetics ("AI slop"), establish human-crafted design rhythm, and preserve TaskPilot / ARKI core themes (light, dark, glass).
---

# Anti-AI UI & Artisan Design System Skill

This skill enforces strict design steering rules, automated audits, and refactoring patterns to purge "AI slop" from the codebase and Figma designs, ensuring an authentic, professional UI (inspired by Linear, Raycast, Arc, and Toss).

## Core Principles (The 4 Anti-AI Commandments)

### 1. Cấm Icon Trang Trí Dư Thừa (No Gratuitous Icons)
- **CẤM:** Không gắn icon nhỏ trang trí vào đầu mọi thẻ card, badge, hoặc tiêu đề danh mục nếu icon không có tính năng tương tác hoặc giá trị định hướng thông tin rõ ràng.
- **CHUẨN:** Sử dụng typography, font-weight, khoảng cách (tracking/leading), và visual hierarchy để phân cấp nội dung thay vì dùng icon làm nạng đỡ thị giác.

### 2. Xóa Bỏ Gradient & Hiệu Ứng Sáo Rỗng (No Cliché Gradients & Glows)
- **CẤM:** Cấm tuyệt đối gradient tím/hồng/indigo/cyan dạng "cosmic purple glow" vô nghĩa đằng sau card hoặc hero.
- **CẤM:** Không dùng `rounded-2xl` hay `rounded-3xl` bừa bãi cho mọi phần tử nhỏ. Dùng bo góc tinh tế (`rounded-md`, `rounded-lg`) có tính nhất quán.
- **CHUẨN:** Nền trung tính sạch sẽ, phân tách khu vực bằng border 1px thanh mảnh (`border-border` / `border-zinc-200 dark:border-zinc-800`), độ tương phản cao, bóng đổ tự nhiên hoặc không cần bóng (`shadow-none` / `shadow-sm`).

### 3. Phá Vỡ Tính Đối Xứng Cơ Học (Break Mechanical Symmetry)
- **CẤM:** Cấm cấu trúc 3 card nằm ngang kích thước bằng nhau chằn chặn với layout icon-tiêu đề-mô tả lặp đi lặp lại.
- **CHUẨN:** 
  - Áp dụng cấu trúc **Bento Grid bất đối xứng** (1 ô điểm nhấn chiếm 2 cột / full-row kết hợp các ô compact).
  - Thay đổi nhịp điệu padding (Hero py-16 -> Dashboard summary py-8 -> Data dense sections py-4).
  - Xen kẽ section compact (`max-w-4xl`) với full-bleed canvas.

### 4. Bảng Màu Có Chủ Đích & Giữ Vững Các Theme
Hệ thống **BẮT BUỘC** tương thích hoàn hảo và sắc nét trên các Theme quy định:
1. **Light Mode (`light`)**:
   - Nền sáng sạch (`bg-white` / `bg-zinc-50`), border phân tách rõ nét.
   - Chữ đen đậm rõ ràng (`text-zinc-900`, `text-zinc-600`), độ tương phản WCAG AA trở lên.
2. **Dark Mode (`dark`)**:
   - Nền tối sâu trung tính (`bg-zinc-950` / `bg-zinc-900`), loại bỏ gradient tím.
   - Border tinh tế (`border-zinc-800`), chữ sáng dịu (`text-zinc-100`, `text-zinc-400`).
3. **Glass Mode (`glass`)**:
   - Duy trì chế độ glassmorphism tùy chỉnh (`html.glass`).
   - Tối ưu độ mờ `backdrop-filter: blur(16px)` và độ tương phản của chữ (chữ sắc nét trên nền bán trong suốt, không bị chìm hay mờ).

---

## Silhouette Test & Code Audit Checklist

Khi review hoặc viết component, tự hỏi các tiêu chí sau:

- [ ] **Silhouette Test:** Nếu loại bỏ màu sắc và hình ảnh, bố cục trang web/màn hình có bị trùng lặp với template 3-card thông thường không?
- [ ] **Icon Audit:** Mỗi icon trên màn hình có thực sự cần thiết? Nếu bỏ icon đó đi, người dùng có mất ngữ cảnh không?
- [ ] **Border & Glow:** Có đang lạm dụng `border-purple-500/30`, `blur-3xl`, `shadow-indigo-500` không? (Nếu có -> XÓA NGAY).
- [ ] **Typography Scale:** Phân cấp thông tin đã dùng cỡ chữ, khoảng cách dòng, hay chỉ dựa vào màu sắc?
- [ ] **Theme Cohesion:** Đã kiểm tra component trên các theme (`light`, `dark`, `glass`) chưa?
