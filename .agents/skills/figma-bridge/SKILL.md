---
name: figma-bridge
description: >-
  Connects Antigravity CLI (agy) to the active Figma Desktop Canvas via a local WebSocket bridge.
  Use this skill whenever the user asks to create UI designs, generate mobile or web screens,
  modify layers/text, style components with Auto Layout, or wire up interactive prototypes
  (transitions, clicks, timeouts, Smart Animate, flow starting points) inside Figma.
---

# Figma Bridge Skill for Antigravity (agy)

This skill enables the agent to directly manipulate the Figma Desktop Canvas and construct fully functional, interactive prototypes.

## 1. Prerequisites Check
Before dispatching commands to Figma:
1. Verify Bridge Server status:
   `node scripts/figma-dispatch.js --health`
   Or check `GET http://localhost:8765/health`.
2. Ensure `figmaConnected` is `true`. If `false`, remind the user to open Figma Desktop and start the `AGY Figma Bridge` plugin (under **Plugins > Development**).

## 2. Dispatch Methods

### Method A: Single Command via CLI Dispatcher
```bash
node scripts/figma-dispatch.js '{"action":"CREATE_FRAME","params":{"name":"Dashboard","width":1440,"height":900,"backgroundColor":"#F8FAFC"}}'
```

### Method B: Atomic Batch Execution (Recommended for UI & Flows)
Use `BATCH_EXECUTE` to create multiple screens and wire prototype reactions in one network trip.
Nodes can be given a `ref: "alias"`, which later steps can reference with `$alias`:

```json
{
  "action": "BATCH_EXECUTE",
  "params": {
    "steps": [
      {
        "action": "CREATE_FRAME",
        "ref": "screen_a",
        "params": { "name": "Screen A", "width": 393, "height": 852, "backgroundColor": "#FFFFFF" }
      },
      {
        "action": "CREATE_BUTTON",
        "ref": "btn_next",
        "params": { "parentId": "$screen_a", "text": "Next Page", "backgroundColor": "#2563EB" }
      },
      {
        "action": "CREATE_FRAME",
        "ref": "screen_b",
        "params": { "name": "Screen B", "width": 393, "height": 852, "x": 480, "backgroundColor": "#F1F5F9" }
      },
      {
        "action": "ADD_INTERACTION",
        "params": {
          "sourceNodeId": "$btn_next",
          "targetNodeId": "$screen_b",
          "trigger": "ON_CLICK",
          "transitionType": "SMART_ANIMATE",
          "duration": 0.35,
          "easing": "EASE_OUT"
        }
      },
      {
        "action": "CREATE_FLOW",
        "params": {
          "frameId": "$screen_a",
          "flowName": "Main User Flow"
        }
      }
    ]
  }
}
```

### Method C: MCP Tool Calls (When MCP is active)
When Antigravity has the Figma MCP server loaded, invoke:
- `figma_create_frame`
- `figma_create_text`
- `figma_create_button`
- `figma_add_interaction`
- `figma_create_flow`
- `figma_batch_execute`

---

## 3. Supported Actions Reference

| Action | Parameters | Description |
|---|---|---|
| `CREATE_FRAME` | `name`, `width`, `height`, `backgroundColor`, `cornerRadius`, `layoutMode`, `padding`, `itemSpacing`, `x`, `y`, `parentId` | Creates Frame or Auto Layout container |
| `CREATE_TEXT` | `text`, `fontSize`, `fontFamily`, `fontStyle`, `color`, `textAlignHorizontal`, `x`, `y`, `parentId` | Creates Text node with auto font loading |
| `CREATE_BUTTON` | `text`, `backgroundColor`, `textColor`, `fontSize`, `cornerRadius`, `paddingX`, `paddingY`, `name`, `parentId` | Creates Auto Layout Button |
| `CREATE_RECTANGLE`| `name`, `width`, `height`, `color`, `cornerRadius`, `x`, `y`, `parentId` | Creates Rectangle shape/card |
| `UPDATE_PROPERTIES`| `nodeId`, `name`, `width`, `height`, `color`, `text`, `cornerRadius` | Updates existing canvas element |
| `ADD_INTERACTION` | `sourceNodeId`, `targetNodeId`, `trigger`, `transitionType`, `duration`, `easing`, `direction` | Connects prototype reaction wire |
| `CREATE_FLOW` | `frameId`, `flowName` | Registers a Flow Starting Point (Play button) |
| `GET_SELECTION` | none | Returns user's currently selected nodes |
| `GET_DOCUMENT_INFO` | none | Returns document info, pages, and flow points |
| `CLEAR_PAGE` | none | Clears current page nodes |

---

## 4. Prototyping Best Practices
1. **Always name matching layers identically for Smart Animate**:
   If an element morphs between Screen 1 and Screen 2 (e.g. an expanded card or profile avatar), give it the exact same `name` on both screens. Figma's Smart Animate engine will automatically interpolate position, size, and corner radius!
2. **Standard Mobile Viewport**: 393 x 852 (iPhone 14 / 15 / 16 standard).
3. **Standard Desktop Viewport**: 1440 x 900 or 1280 x 800.
4. **Flow Starting Point**: Always declare the first screen as a Flow Starting Point so the user can immediately hit `Shift + Space` to interact with the flow.
