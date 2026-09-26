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
  const doc = await post('GET_DOCUMENT_INFO');
  const screens = doc.data.currentPage.children.filter(c => 
    c.name.toLowerCase().includes('3d') || 
    c.name.toLowerCase().includes('vr') || 
    c.name.toLowerCase().includes('panorama') || 
    c.name.toLowerCase().includes('turntable')
  );
  console.log('3D/VR related screens:');
  screens.forEach(s => console.log(`  - [${s.name}] (id: ${s.id}, x: ${s.x}, y: ${s.y})`));
}

main().catch(console.error);
