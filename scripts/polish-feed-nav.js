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
  const feedFrames = audit.data.frames.filter(f => f.name.includes('06'));

  console.log(`Found ${feedFrames.length} feed frames to polish:`);

  for (const f of feedFrames) {
    const navText = (f.children || []).find(c => c.type === 'TEXT' && c.name.includes('Feed'));
    if (navText) {
      console.log(`Polishing nav text in [${f.name}]...`);
      await post('UPDATE_PROPERTIES', {
        nodeId: navText.id,
        x: 20,
        width: 353,
        fontSize: 12
      });
    }
  }

  console.log('✅ Bottom nav polish completed!');
}

main().catch(console.error);
