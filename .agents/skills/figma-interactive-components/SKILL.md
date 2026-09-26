---
name: figma-interactive-components
description: >-
  Architects, builds, organizes, and wires interactive Figma Component Sets with Variants and
  micro-interactions (While Hovering, While Pressing, On Click, On Focus, Change To, Smart Animate).
  Transforms static UI frames into living, interactive design systems with design tokens and instances.
---

# 💎 QUY CHUẨN THIẾT KẾ COMPONENT HỆ THỐNG & TƯƠNG TÁC VI MÔ (INTERACTIVE COMPONENTS & MICRO-INTERACTIONS)

Tài liệu kỹ thuật và hướng dẫn vận hành cho Agent nhằm thiết kế, tổ chức và đấu nối hệ thống **Component Sets, Biến thể (Variants)** và **Tương tác vi mô (Micro-interactions)** trên Figma Canvas theo chuẩn công nghiệp thế giới (Design System Standards).

---

## 📑 MỤC LỤC
1. [Nguyên Lý Cốt Lõi Về Interactive Components](#1-nguyên-lý-cốt-lõi-về-interactive-components)
2. [Cấu Trúc Đặt Tên & Thuộc Tính Biến Thể (Variant Properties)](#2-cấu-trúc-đặt-tên--thuộc-tính-biến-thể-variant-properties)
3. [Bộ Thư Viện Component Chuẩn ARKI Luxury Real Estate](#3-bộ-thư-viện-component-chuẩn-arki-luxury-real-estate)
4. [Động Cơ Tương Tác Vi Mô (Micro-Interactions Engine)](#4-động-cơ-tương-tác-vi-mô-micro-interactions-engine)
5. [Tích Hợp API Figma Bridge (Technical Implementation)](#5-tích-hợp-api-figma-bridge-technical-implementation)
6. [Hệ Thống Tiêu Chuẩn Nghiệm Thu (Acceptance Criteria)](#6-hệ-thống-tiêu-chuẩn-nghiệm-thu-acceptance-criteria)
7. [Quy Trình Kiểm Thử Tự Động (Automated Component Testing)](#7-quy-trình-kiểm-thử-tự-động-automated-component-testing)

---

## 1. NGUYÊN LÝ CỐT LÕI VỀ INTERACTIVE COMPONENTS

### 1.1 Vấn Đề Của Thiết Kế Frame Tĩnh (Static Frames)
Khi toàn bộ màn hình được thiết kế bằng các Frame độc lập, hệ thống gặp phải các giới hạn nghiêm trọng:
* **Không thể tái sử dụng:** Thay đổi 1 màu viền hay 1 thông số bo góc đòi hỏi sửa thủ công hàng trăm chỗ.
* **Thiếu phản hồi xúc giác (Sensory Feedback):** Người dùng rê chuột (hover), nhấn giữ (press) hay focus vào ô nhập liệu nhưng giao diện hoàn toàn trơ lỳ, vi phạm trực tiếp **Heuristic #1 của Nielsen (Visibility of System Status)**.
* **Phụ thuộc Navigation giữa các Frame:** Phải tạo thêm hàng loạt màn hình phụ chỉ để thể hiện trạng thái đổi màu của một nút hay mở rộng một tooltip.

### 1.2 Giải Pháp: Interactive Components với `CHANGE_TO`
Tính năng Interactive Components trong Figma cho phép tạo các liên kết tương tác ngay **BÊN TRONG** một `ComponentSetNode` (Component chứa các Variants):
* Trạng thái biến đổi tự động tại chỗ mà **KHÔNG CẦN chuyển trang** (`NAVIGATE`).
* Mọi instance của Component trên toàn bộ 104 màn hình đều tự động kế thừa tương tác Hover, Press, Focus mượt mà.

---

## 2. CẤU TRÚC ĐẶT TÊN & THUỘC TÍNH BIẾN THỂ (VARIANT PROPERTIES)

Mọi Component Set phải tuân thủ chuẩn đặt tên phân cấp của Figma:
$$\text{Component Name} = \text{Category} \text{ / } \text{Component Type}$$
$$\text{Variant Name} = \text{Property1}=\text{Value1}, \text{Property2}=\text{Value2}, \dots$$

### Bảng Thuộc Tính Chuẩn:
| Tên Thuộc Tính | Các Giá Trị Khả Dụng (Values) | Mục Đích Sử Dụng |
| :--- | :--- | :--- |
| `State` | `Default`, `Hover`, `Pressed`, `Focused`, `Active`, `Disabled` | Phản ánh chu kỳ tương tác của người dùng |
| `Theme` | `Light` (Daylight Porcelain), `Dark` (Obsidian Void) | Đồng bộ 2 chế độ màu sắc cao cấp |
| `Type` | `Primary`, `Secondary`, `Ghost`, `Icon-Only` | Phân cấp thị giác theo định luật Fitts & Gestalt |
| `Size` | `SM` (32px), `MD` (42px/48px), `LG` (56px) | Quy chuẩn kích thước vùng chạm |

---

## 3. BỘ THƯ VIỆN COMPONENT CHUẨN ARKI LUXURY REAL ESTATE

Hệ thống ARKI bao gồm 8 Component Sets cốt lõi:

### 3.1 `Button / Primary Glass`
* **Kích thước:** Chiều cao `48px`, bo góc `24px` hoặc `16px`.
* **Variants:**
  * `State=Default`: Kính mờ `rgba(255,255,255,0.22)`, viền trắng `rgba(255,255,255,0.5)`, đổ bóng nhẹ $Y: 6, \text{Blur}: 18$.
  * `State=Hover`: Fill sáng hơn `rgba(255,255,255,0.35)`, viền sáng `rgba(255,255,255,0.85)`, bóng đổ mở rộng $Y: 10, \text{Blur}: 26$.
  * `State=Pressed`: Co tỷ lệ nhẹ `scale: 0.98`, Fill tối nhẹ hoặc đậm nét, bóng đổ nén $Y: 2, \text{Blur}: 8$.
  * `State=Disabled`: Opacity $40\%$, không nhận tương tác pointer.

### 3.2 `Button / Universal Circle` (Nút Công Thái Học 42×42px)
* **Kích thước:** Cố định $42 \times 42\text{ px}$, bo tròn `cornerRadius: 21px`.
* **Biểu tượng:** Universal icons: Quay lại `←`, Menu `☰`, Đóng `✕`, Kính lúp `🔍`, Chia sẻ `↗`.
* **Variants & Micro-interactions:**
  * `Default` $\xrightarrow{\text{WHILE\_HOVERING}}$ `Hover`: Viền sáng trắng tỏa quang, tâm icon dịch chuyển nhẹ.
  * `Hover` $\xrightarrow{\text{WHILE\_PRESSING}}$ `Pressed`: Tỷ lệ nút co về $40 \times 40\text{ px}$ tạo cảm giác lún cơ học.

### 3.3 `Card / Estate Item` (Thẻ Bất Động Sản Kính Mờ)
* **Kích thước:** Rộng $345\text{ px}$, cao $380\text{ px}$, bo góc $28\text{ px}$.
* **Variants & Micro-interactions:**
  * `State=Default`: Đổ bóng $Y: 8, \text{Blur}: 25$.
  * `State=Hover`: Khi người dùng rê chuột, bóng đổ nâng tầng thị giác (Elevation) lên $Y: 16, \text{Blur}: 40$, ảnh dinh thự phóng nhẹ `scale: 1.02` qua `SMART_ANIMATE` 250ms.
  * `State=Active`: Viền vàng Champagne ánh kim hoặc viền trắng nổi bật.

### 3.4 `Input / Glass Search & Form Field`
* **Kích thước:** Rộng $345\text{ px}$, cao $52\text{ px}$, bo góc $18\text{ px}$.
* **Variants & Micro-interactions:**
  * `State=Default`: Placeholder chữ xám mờ `rgba(0,0,0,0.45)`, viền mờ $0.8\text{ px}$.
  * `State=Hover`: Viền rõ nét `rgba(0,0,0,0.25)` hoặc viền trắng sáng.
  * `State=Focused`: Viền sáng nổi bật (Active Focus Ring) màu xanh ngọc bích / vàng Champagne $1.5\text{ px}$, hiển thị con trỏ nhập liệu hoặc văn bản động.

### 3.5 `Chip / Faceted Filter`
* **Kích thước:** Cao $38\text{ px}$, bo tròn hoàn toàn `cornerRadius: 19px`, đệm ngang `16px`.
* **Variants:** `State=Unselected`, `State=Unselected-Hover`, `State=Selected`, `State=Selected-Hover`.
* **Micro-interaction:**
  * `Unselected` $\xrightarrow{\text{ON\_CLICK}}$ `Selected` (`SMART_ANIMATE` 180ms).
  * `Selected` $\xrightarrow{\text{ON\_CLICK}}$ `Unselected`.

### 3.6 `Toggle / Switch Pill`
* **Kích thước:** Khung chứa $50 \times 30\text{ px}$, núm trượt tròn $24 \times 24\text{ px}$.
* **Variants:** `Active=False`, `Active=True`.
* **Micro-interaction:** `ON_CLICK` trượt núm từ trái sang phải với hiệu ứng `SMART_ANIMATE` (`duration: 0.22s`, `easing: EASE_OUT`).

### 3.7 `Dock / Navigation Item`
* **Kích thước:** $64 \times 44\text{ px}$, gồm Icon trên và Nhãn chữ phía dưới.
* **Variants:** `State=Inactive`, `State=Hover`, `State=Active`.
* **Micro-interaction:** `WHILE_HOVERING` đẩy icon nổi lên $2\text{ px}$; `ON_CLICK` bật đèn chỉ báo active pill dưới chân icon.

### 3.8 `Hotspot / 360 Spatial Marker`
* **Kích thước:** Điểm tròn $36 \times 36\text{ px}$ với vòng tròn nhịp tim (Pulse Ring).
* **Variants:** `State=Pulsing`, `State=Hover`, `State=Expanded (HUD Card)`.
* **Micro-interaction:** `WHILE_HOVERING` mở rộng thẻ thông tin mini hiển thị tên phòng và chất liệu kiến trúc.

---

## 4. ĐỘNG CƠ TƯƠNG TÁC VI MÔ (MICRO-INTERACTIONS ENGINE)

### 4.1 Ma Trận Sự Kiện & Chuyển Đổi (Interaction Matrix)

```
[Default State] ──(WHILE_HOVERING / SMART_ANIMATE 180ms)──> [Hover State]
      │                                                           │
      └──────(WHILE_PRESSING / SMART_ANIMATE 100ms)───────────────┼──> [Pressed State]
                                                                  │
[Unselected]   ──────(ON_CLICK / SMART_ANIMATE 200ms)─────────────┴──> [Selected State]
```

### 4.2 Cấu Hình Easing & Duration Chuẩn Công Thái Học
* **Hover Transitions:** `duration: 0.18s` (180ms), `easing: 'EASE_OUT'`. Thời gian phản hồi $< 200\text{ ms}$ tạo cảm giác tức thì (Sub-perceptual threshold).
* **Press / Tap Transitions:** `duration: 0.10s` (100ms), `easing: 'EASE_OUT'`. Đảm bảo cảm giác nén cơ học đàn hồi.
* **Toggle / State Switch:** `duration: 0.22s` (220ms), `easing: 'EASE_IN_AND_OUT'`.
* **Focus Ring Transition:** `duration: 0.15s` (150ms), `easing: 'EASE_OUT'`.

---

## 5. TÍCH HỢP API FIGMA BRIDGE (TECHNICAL IMPLEMENTATION)

### 5.1 Tạo ComponentSet với `figma.combineAsVariants`
```javascript
// 1. Tạo các Component riêng lẻ cho từng biến thể
const defaultComp = figma.createComponent();
defaultComp.name = "State=Default, Theme=Light";

const hoverComp = figma.createComponent();
hoverComp.name = "State=Hover, Theme=Light";

const pressedComp = figma.createComponent();
pressedComp.name = "State=Pressed, Theme=Light";

// 2. Gộp thành ComponentSet
const componentSet = figma.combineAsVariants(
  [defaultComp, hoverComp, pressedComp],
  targetContainerFrame || figma.currentPage
);
componentSet.name = "Button / Primary Glass";
```

### 5.2 Đấu Nối Phản Hồi Tương Tác Vi Mô Với `CHANGE_TO`
```javascript
// Thiết lập Hover: Default -> Hover
const hoverReaction = {
  trigger: { type: 'WHILE_HOVERING' },
  actions: [{
    type: 'NODE',
    destinationId: hoverComp.id,
    navigation: 'CHANGE_TO',
    transition: {
      type: 'SMART_ANIMATE',
      easing: { type: 'EASE_OUT' },
      duration: 0.18
    }
  }]
};

// Thiết lập Press: Hover -> Pressed hoặc Default -> Pressed
const pressReaction = {
  trigger: { type: 'WHILE_PRESSING' },
  actions: [{
    type: 'NODE',
    destinationId: pressedComp.id,
    navigation: 'CHANGE_TO',
    transition: {
      type: 'SMART_ANIMATE',
      easing: { type: 'EASE_OUT' },
      duration: 0.10
    }
  }]
};

// Gán phản hồi bất đồng bộ
if ('setReactionsAsync' in defaultComp) {
  await defaultComp.setReactionsAsync([hoverReaction, pressReaction]);
}
```

---

## 6. HỆ THỐNG TIÊU CHUẨN NGHIỆM THU (ACCEPTANCE CRITERIA)

* **AC-CMP-1 (Component Architecture):** Có ít nhất 6 Component Sets chuẩn công nghiệp với tối thiểu 20 biến thể được tổ chức trên trang `Design System / Master Components`.
* **AC-CMP-2 (Interactive Reactions):** 100% các biến thể có phản hồi `WHILE_HOVERING` và `WHILE_PRESSING` sử dụng `navigation: 'CHANGE_TO'`.
* **AC-CMP-3 (Smooth Smart Animate):** 100% micro-interactions cấu hình `SMART_ANIMATE` với thời lượng từ $100\text{ ms}$ đến $250\text{ ms}$.
* **AC-CMP-4 (Focus State):** Ô tìm kiếm và trường dữ liệu sở hữu trạng thái `State=Focused` có viền nhận diện thị giác nổi bật.
* **AC-CMP-5 (Toggle Mechanics):** Nút gạt chế độ (Toggle Switch) và Chip lọc (Filter Chip) chuyển đổi hai chiều `ON_CLICK` trơn tru.
* **AC-CMP-6 (Instance Integration):** Các màn hình chính (`Screen 06`, `07`, `09`, `11`) được thay thế bằng các Instance liên kết trực tiếp với Master Components.
* **AC-CMP-7 (Zero Breakage Regression):** Không phá vỡ bố cục $393 \times 852\text{ px}$, không gây tràn viền text node, bảo toàn cấu trúc Glassmorphism 4 lớp.
* **AC-CMP-8 (Automated Audit Suite):** Có kịch bản kiểm thử tự động đo đạc số lượng Component, số lượng Variant, và số lượng phản hồi vi mô đạt tiêu chuẩn.

---

## 7. QUY TRÌNH KIỂM THỬ TỰ ĐỘNG (AUTOMATED COMPONENT TESTING)

Mọi tiến trình kiểm thử phải được thực thi thông qua tập lệnh:
```bash
node scripts/audit-interactive-components.js
```
Tập lệnh phải xác nhận số lượng phản hồi `reactionsCount > 0`, kiểm tra kiểu hành động `navigation === 'CHANGE_TO'`, và kết xuất báo cáo nghiệm thu chi tiết.
