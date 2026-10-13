import fs from 'fs';
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
  console.log('Testing REAL image upload to Figma...');
  const b64 = fs.readFileSync('assets/vietnam/avatar_vo_trong_nghia.jpg').toString('base64');
  console.log('Read base64, size:', b64.length);

  const res = await exec38451('create', {
    type: 'IMAGE',
    name: 'TEST / KTS Vo Trong Nghia Photo',
    x: 0,
    y: -1500,
    width: 200,
    height: 200,
    cornerRadius: 100,
    imageData: b64,
    scaleMode: 'FILL'
  });

  console.log('Result:', res);
}

test().catch(console.error);
