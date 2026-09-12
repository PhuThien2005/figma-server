#!/usr/bin/env node
// Check status of Figma Bridge and report connection health

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://localhost:8765';

async function check() {
  console.log('🔍 Checking AGY Figma Bridge status...');
  console.log(`Target: ${BRIDGE_URL}\n`);

  try {
    const res = await fetch(`${BRIDGE_URL}/status`);
    if (!res.ok) {
      console.log(`❌ Server returned HTTP ${res.status}`);
      process.exit(1);
    }
    const data = await res.json();
    console.log('✅ Bridge Server is RUNNING!');
    console.log(`   - Port: ${data.port}`);
    console.log(`   - Figma Plugin Connected: ${data.figmaConnected ? '🟢 YES' : '🔴 NO (Open Figma and launch plugin)'}`);
    console.log(`   - Active Pending Requests: ${data.pendingRequestsCount}`);

    if (!data.figmaConnected) {
      console.log('\n👉 Next step: Open Figma Desktop -> Plugins -> Development -> AGY Figma Bridge');
    } else {
      console.log('\n🎉 System ready! You can now send UI generation & prototyping prompts in agy.');
    }
  } catch (err) {
    console.log('❌ Could not connect to Bridge Server.');
    console.log(`   Reason: ${err.message}`);
    console.log('👉 Tip: Run "npm start" or execute "scripts/start-server.bat" first.');
    process.exit(1);
  }
}

check();
