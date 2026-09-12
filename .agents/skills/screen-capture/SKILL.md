---
name: screen-capture
description: >-
  Captures real-time screenshots directly from the active Figma Canvas or Desktop window.
  Use this skill whenever you need to visually audit and verify UI layouts, examine rendered components,
  or inspect prototype elements generated in Figma.
---

# Screen & Canvas Capture Skill

This skill allows the agent to take high-resolution screenshots of the Figma Canvas and inspect the resulting visual output.

## How to Capture
Run the capture tool:
```bash
node scripts/capture-canvas.js
```
This requests Figma to render and export the active frame/selection to `C:/figma/captured_canvas.png`.

## How to Inspect
Once captured, use `view_file` on `C:/figma/captured_canvas.png` to review the layout, typography, colors, and components.
