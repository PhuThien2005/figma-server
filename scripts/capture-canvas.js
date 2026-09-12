#!/usr/bin/env node
// Captures a high-resolution screenshot directly from the active Figma Canvas
import fs from 'fs';
import path from 'path';

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://localhost:8765';
const OUTPUT_FILE = process.argv[2] || 'C:/figma/captured_canvas.png';
const TARGET_NODE = process.argv[3] || null;

async function capture() {
  console.log(`📸 Capturing screenshot directly from Figma Canvas${TARGET_NODE ? ` (${TARGET_NODE})` : ''}...`);

  try {
    const res = await fetch(`${BRIDGE_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'EXPORT_FRAME',
        params: { nodeId: TARGET_NODE, scale: 1 }
      })
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('❌ Capture failed:', data.error);
      process.exit(1);
    }

    const base64 = data.data.base64;
    const buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync(OUTPUT_FILE, buffer);

    console.log(`✅ Canvas exported successfully!`);
    console.log(`   - Saved to: ${OUTPUT_FILE}`);
    console.log(`   - Frame Name: ${data.data.name}`);
    console.log(`   - Dimensions: ${data.data.width}x${data.data.height} px`);
  } catch (err) {
    console.error('❌ Network error:', err.message);
    process.exit(1);
  }
}

capture();
