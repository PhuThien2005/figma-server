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
  const frames = audit.data.frames.filter(f => f.name.includes('[Light]'));
  const overflowingTexts = [];

  for (const f of frames) {
    for (const c of f.children || []) {
      if (c.type === 'TEXT') {
        const rightEdge = (c.x || 0) + (c.width || 0);
        if (c.width > 361 || rightEdge > 393) {
          overflowingTexts.push({
            screen: f.name,
            name: c.name,
            x: c.x,
            width: c.width,
            right: rightEdge
          });
        }
      }
    }
  }

  console.log(`=== TOTAL OVERFLOWING TEXT NODES: ${overflowingTexts.length} ===`);
  overflowingTexts.forEach(t => {
    console.log(`  [${t.screen}]: "${t.name}" -> x:${t.x}, w:${t.width}, right:${t.right}`);
  });
}

main().catch(console.error);
