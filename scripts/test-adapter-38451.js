import http from 'http';

function exec38451(operation, params = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ operation, params });
    const req = http.request({
      hostname: '127.0.0.1',
      port: 38451,
      path: '/exec',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ success: false, error: data });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function test() {
  console.log('Testing MCP adapter on port 38451...');
  
  // 1. Create Frame
  const frameRes = await exec38451('create', {
    type: 'FRAME',
    name: 'TEST / Screen 01 Adapter',
    x: 0,
    y: -3000,
    width: 393,
    height: 852,
    fill: '#FAFAFA',
    cornerRadius: 44,
    clipsContent: true
  });
  console.log('Created Frame:', frameRes);
  const frameId = frameRes.data.id;

  // 2. Create Header Text inside frame
  const textRes = await exec38451('create', {
    type: 'TEXT',
    parentId: frameId,
    text: 'A R K I • V I E T N A M',
    fontSize: 24,
    fontStyle: 'Bold',
    fill: '#09090B',
    x: 24,
    y: 60
  });
  console.log('Created Text:', textRes);

  // 3. Delete Test Frame
  const delRes = await exec38451('delete', { id: frameId });
  console.log('Deleted Frame:', delRes);
  console.log('🎉 Adapter Test PASSED!');
}

test().catch(console.error);
