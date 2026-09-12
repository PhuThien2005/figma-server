# Antigravity Project Instructions: Figma Bridge

Welcome to the Antigravity Figma Bridge repository. This project connects Antigravity CLI directly to Figma Desktop for automated UI design generation, component styling, and interactive prototyping.

## Environment & Scripts
- Node.js runtime is located in `tools/node.exe` (portable, no installation required).
- Bridge server is located in `bridge-server/src/server.js` (listens on `http://localhost:8765` and `ws://localhost:8765`).
- To start the server: run `npm start` inside `bridge-server/` or run `.\scripts\start-server.bat`.
- To test connection: `node scripts/test-connection.js`.
- To dispatch commands: `node scripts/figma-dispatch.js '<JSON>'`.

## Figma Plugin
- Plugin source is in `figma-plugin/`.
- Import `figma-plugin/manifest.json` in Figma Desktop (**Plugins > Development > Import plugin from manifest...**).
- Launch the plugin inside your Figma file to establish the bridge.

## Rules & Conventions
- Always refer to `.agents/rules/figma-rules.md` for artboard sizes, spacing tokens, and typography.
- When generating interactive prototypes, always create a `flowStartingPoint` with `CREATE_FLOW` so the user can immediately test with `Shift + Space`.
