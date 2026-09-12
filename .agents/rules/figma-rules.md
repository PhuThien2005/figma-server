# Figma Design & Prototyping Rules

When designing UI layouts or interactive prototypes for Figma:

## 1. Dimensional Standards
- **Mobile Artboards**: 393 × 852 px (Default iOS/iPhone viewport). Spacing between multiple artboards should be 80px (`x = current_x + 393 + 80`).
- **Desktop Artboards**: 1440 × 900 px. Spacing between artboards: 120px.
- **Corner Radii**:
  - Screen containers: 40px with `clipsContent: true`.
  - Cards & Modals: 16px.
  - Buttons: 12px or 16px (Pill buttons: 999px).
  - Input fields: 10px.

## 2. Spacing & Grid System
- Follow an 8pt grid system: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px.
- Mobile horizontal padding: 24px or 32px from screen edge.
- Button padding: `paddingX = 24`, `paddingY = 14`.

## 3. Typography Hierarchy
- Fonts: Prefer `Inter` as the primary cross-platform font available in Figma.
- Large Titles: 28px - 34px (Bold).
- Section Headers: 20px - 24px (SemiBold/Bold).
- Body text: 15px - 16px (Regular).
- Caption & labels: 12px - 13px (Medium).

## 4. Color Contrast & Accessibility
- High contrast between text and background fills (e.g. White `#FFFFFF` on Dark `#0F172A`, Dark `#1E293B` on Light `#F8FAFC`).
- Primary actions: Clear primary brand accent (e.g., Indigo `#4F46E5`, Sky Blue `#0284C7`, Emerald `#10B981`).

## 5. Prototyping Conventions
- Every interactive flow MUST have a registered Flow Starting Point (`CREATE_FLOW`).
- Clickable CTAs must have an `ADD_INTERACTION` entry targeting the destination screen.
- Screen transitions: Use `SMART_ANIMATE` (duration 0.3s - 0.4s, `EASE_OUT`) for continuous elements, or `SLIDE_IN` / `MOVE_IN` for hierarchical screen pushes.
- Back buttons should use `SLIDE_OUT` (direction: `RIGHT`) or return to parent screen.
