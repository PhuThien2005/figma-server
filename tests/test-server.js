// Automated End-to-End Test Suite for AGY Figma Bridge
import assert from 'assert';
import http from 'http';
import { MockFigmaPlugin } from '../bridge-server/src/mock-figma-client.js';

const TEST_PORT = 8766;
const BASE_URL = `http://localhost:${TEST_PORT}`;
const WS_URL = `ws://localhost:${TEST_PORT}`;

// We will import express app and http server from server logic or run server module with env PORT
process.env.PORT = TEST_PORT;

async function runTests() {
  console.log('🧪 Starting AGY Figma Bridge Automated Test Suite...\n');

  // Dynamically import server with TEST_PORT
  const { server } = await import('../bridge-server/src/server.js');
  let mockPlugin = null;

  try {
    // 1. Test Health Endpoint without Figma connected
    console.log('▶ Test 1: Health check before Figma connects');
    const res1 = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res1.status, 200);
    const data1 = await res1.json();
    assert.strictEqual(data1.status, 'ok');
    assert.strictEqual(data1.figmaConnected, false);
    console.log('  ✔ Health check passed (figmaConnected = false)\n');

    // 2. Test Execution rejection when Figma is not connected
    console.log('▶ Test 2: Execution error when Figma is not connected');
    const res2 = await fetch(`${BASE_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'PING' })
    });
    assert.strictEqual(res2.status, 503);
    const data2 = await res2.json();
    assert.strictEqual(data2.success, false);
    assert.ok(data2.error.includes('not connected'));
    console.log('  ✔ Correctly rejected with HTTP 503 when disconnected\n');

    // 3. Connect Mock Figma Plugin
    console.log('▶ Test 3: Connect Mock Figma Plugin via WebSocket');
    mockPlugin = new MockFigmaPlugin(WS_URL);
    await mockPlugin.start();
    // Allow handshake to complete
    await new Promise(r => setTimeout(r, 200));

    const res3 = await fetch(`${BASE_URL}/health`);
    const data3 = await res3.json();
    assert.strictEqual(data3.figmaConnected, true);
    console.log('  ✔ Mock Figma connected successfully (figmaConnected = true)\n');

    // 4. Test PING action
    console.log('▶ Test 4: Dispatch PING action');
    const res4 = await fetch(`${BASE_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'PING' })
    });
    assert.strictEqual(res4.status, 200);
    const data4 = await res4.json();
    assert.strictEqual(data4.success, true);
    assert.strictEqual(data4.data.pong, true);
    console.log('  ✔ PING roundtrip verified\n');

    // 5. Test CREATE_FRAME
    console.log('▶ Test 5: Dispatch CREATE_FRAME');
    const res5 = await fetch(`${BASE_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'CREATE_FRAME',
        params: { name: 'Home Screen', width: 393, height: 852, backgroundColor: '#10B981' }
      })
    });
    const data5 = await res5.json();
    assert.strictEqual(data5.success, true);
    assert.ok(data5.data.id);
    assert.strictEqual(data5.data.name, 'Home Screen');
    console.log(`  ✔ Created Frame with ID: ${data5.data.id}\n`);

    // 6. Test BATCH_EXECUTE with Prototyping & Reference resolution
    console.log('▶ Test 6: Dispatch atomic BATCH_EXECUTE with Prototyping Wiring');
    const batchPayload = {
      steps: [
        {
          action: 'CREATE_FRAME',
          ref: 'screen_a',
          params: { name: 'Screen A', width: 393, height: 852 }
        },
        {
          action: 'CREATE_BUTTON',
          ref: 'btn_click',
          params: { parentId: '$screen_a', name: 'Start Button', text: 'Start' }
        },
        {
          action: 'CREATE_FRAME',
          ref: 'screen_b',
          params: { name: 'Screen B', width: 393, height: 852 }
        },
        {
          action: 'ADD_INTERACTION',
          params: {
            sourceNodeId: '$btn_click',
            targetNodeId: '$screen_b',
            trigger: 'ON_CLICK',
            transitionType: 'SMART_ANIMATE',
            duration: 0.4
          }
        },
        {
          action: 'CREATE_FLOW',
          params: {
            frameId: '$screen_a',
            flowName: 'E2E Test Flow'
          }
        }
      ]
    };

    const res6 = await fetch(`${BASE_URL}/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batchPayload)
    });
    const data6 = await res6.json();
    assert.strictEqual(data6.success, true);
    assert.strictEqual(data6.data.status, 'batch_completed');
    assert.strictEqual(data6.data.stepsCount, 5);
    assert.ok(data6.data.refMap.screen_a);
    assert.ok(data6.data.refMap.btn_click);
    assert.ok(data6.data.refMap.screen_b);
    console.log('  ✔ Batch execution and prototype wiring passed!\n');

    console.log('====================================================');
    console.log('🎉 ALL 6 TEST SCENARIOS PASSED WITH ZERO ERRORS!');
    console.log('====================================================');

  } finally {
    if (mockPlugin) mockPlugin.stop();
    server.close();
  }
}

runTests().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
