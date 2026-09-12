#!/usr/bin/env node
// CLI dispatcher script for Antigravity CLI (agy)
// Usage: node figma-dispatch.js '{"action":"CREATE_FRAME","params":{"name":"Home"}}'
//    or: node figma-dispatch.js --file my-flow.json

import fs from 'fs';

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://localhost:8765';

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`
Usage:
  node figma-dispatch.js '<JSON_PAYLOAD>'
  node figma-dispatch.js --file <path-to-json-file>
  node figma-dispatch.js --batch <path-to-steps-json>
  node figma-dispatch.js --health

Examples:
  node figma-dispatch.js '{"action":"CREATE_FRAME","params":{"name":"Login Screen"}}'
  node figma-dispatch.js '{"action":"PING"}'
`);
    process.exit(1);
  }

  let payload = null;

  if (args[0] === '--health' || args[0] === '-h') {
    try {
      const res = await fetch(`${BRIDGE_URL}/health`);
      const data = await res.json();
      console.log(JSON.stringify(data, null, 2));
      process.exit(0);
    } catch (err) {
      console.error(`Error connecting to Bridge Server at ${BRIDGE_URL}:`, err.message);
      process.exit(1);
    }
  }

  if (args[0] === '--file' || args[0] === '-f') {
    const filePath = args[1];
    if (!filePath || !fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    payload = JSON.parse(content);
  } else if (args[0] === '--batch') {
    const filePath = args[1];
    const content = fs.readFileSync(filePath, 'utf-8');
    const steps = JSON.parse(content);
    payload = { action: 'BATCH_EXECUTE', params: { steps } };
  } else {
    try {
      payload = JSON.parse(args[0]);
    } catch (e) {
      console.error('Invalid JSON payload provided:', args[0]);
      process.exit(1);
    }
  }

  try {
    const res = await fetch(`${BRIDGE_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const responseData = await res.json();
    if (!res.ok) {
      console.error(`[Error ${res.status}]:`, responseData.error || responseData);
      process.exit(1);
    }

    console.log(JSON.stringify(responseData, null, 2));
  } catch (err) {
    console.error(`Bridge dispatch failed: ${err.message}`);
    process.exit(1);
  }
}

main();
