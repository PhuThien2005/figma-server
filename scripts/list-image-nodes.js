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
  const res = await post('INSPECT_PAGE_IMAGES');
  const nodes = res.data.nodes.filter(n => n.hasImage && n.frameName.includes('[Light]'));

  console.log(`Total Image nodes in [Light] screens: ${nodes.length}`);
  nodes.forEach(n => {
    console.log(`  [${n.frameName}] "${n.name}" (id: ${n.id}, type: ${n.type}, x: ${n.x}, w: ${n.width}, h: ${n.height})`);
  });
}

main().catch(console.error);
