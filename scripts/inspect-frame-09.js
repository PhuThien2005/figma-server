import http from 'http';

function post(action, params = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:8765/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function main() {
  const audit = await post('AUDIT_PAGE_LAYOUT');
  const frame09 = audit.data.frames.find(f => f.name === 'ARKI / 09 - Property Details (Tadao Ando) [Light]');
  console.log('Frame 09 details:');
  frame09.children.forEach(c => {
    console.log(`  - [${c.type}] "${c.name}": x=${c.x}, y=${c.y}, w=${c.width}, h=${c.height}, bottom=${c.bottom}`);
  });
}

main().catch(console.error);
