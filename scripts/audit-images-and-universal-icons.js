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
  const frames = audit.data.frames.filter(f => f.name.includes('[Light]') && !f.name.includes('Menu') && !f.name.includes('Component'));

  console.log(`Auditing ${frames.length} Light screens for:`);
  console.log('1. Back button format (text vs icon-only)');
  console.log('2. Image widths and corner radii\n');

  const backButtons = [];
  const imageNodes = [];

  for (const f of frames) {
    for (const c of f.children || []) {
      // Detect back buttons
      if (c.name.toLowerCase().includes('back')) {
        backButtons.push({ screen: f.name, node: c });
      }
      // Detect image nodes or containers
      if (c.name.toLowerCase().includes('art') || 
          c.name.toLowerCase().includes('image') || 
          c.name.toLowerCase().includes('thumb') || 
          c.name.toLowerCase().includes('media') || 
          c.name.toLowerCase().includes('canvas') ||
          c.name.toLowerCase().includes('cover')
      ) {
        imageNodes.push({ screen: f.name, node: c });
      }
    }
  }

  console.log(`=== BACK BUTTONS FOUND: ${backButtons.length} ===`);
  backButtons.slice(0, 15).forEach(b => {
    console.log(`  [${b.screen}]: "${b.node.name}" (type: ${b.node.type}, w: ${b.node.width}, h: ${b.node.height})`);
  });

  console.log(`\n=== IMAGE / MEDIA NODES FOUND: ${imageNodes.length} ===`);
  imageNodes.slice(0, 15).forEach(m => {
    console.log(`  [${m.screen}]: "${m.node.name}" (x: ${m.node.x}, w: ${m.node.width}, h: ${m.node.height})`);
  });
}

main().catch(console.error);
