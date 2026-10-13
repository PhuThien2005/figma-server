const http = require('http');

const payload = JSON.stringify({
  type: 'CREATE_FLOW',
  nodeId: '1195:10647',
  name: '🇻🇳 ARKI Việt Nam - Trải Nghiệm Mẫu [Shift + Space]'
});

const req = http.request('http://localhost:8765/api/command', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Result:', res.statusCode, body);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.write(payload);
req.end();
