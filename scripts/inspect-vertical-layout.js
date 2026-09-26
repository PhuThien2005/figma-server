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
    req.on('error', reject);
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function main() {
  const audit = await post('AUDIT_PAGE_LAYOUT');
  const frames = audit.data.frames;

  const lightScreens = frames.filter(f => f.name.includes('[Light]') && !f.name.includes('Menu'));
  console.log(`Auditing ${lightScreens.length} Light screens for compact vertical viewport compliance:\n`);

  for (const f of lightScreens) {
    const children = f.children || [];
    // sort children by y
    const sorted = [...children].sort((a, b) => a.y - b.y);
    const bottomElements = sorted.filter(c => c.bottom >= 740);
    console.log(`📱 Screen: "${f.name}" (total children: ${f.totalChildren})`);
    if (bottomElements.length > 0) {
      console.log(`   Bottom area (y >= 740):`);
      bottomElements.forEach(c => {
        console.log(`     - [${c.type}] "${c.name}": y=${c.y}, h=${c.height}, bottom=${c.bottom}`);
      });
    }
  }
}

main().catch(console.error);
