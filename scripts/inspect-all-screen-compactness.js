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

  console.log(`Checking vertical compactness for ${frames.length} Light screens:`);
  console.log('Target viewport: 393 x 852 px (iPhone 16 Pro)\n');

  for (const f of frames) {
    const nonBgChildren = (f.children || []).filter(c => 
      !c.name.toLowerCase().includes('canvas') && 
      !c.name.toLowerCase().includes('bg') && 
      !c.name.toLowerCase().includes('background') &&
      !c.name.toLowerCase().includes('status bar') &&
      !c.name.toLowerCase().includes('dynamic island')
    );
    const maxY = Math.max(...nonBgChildren.map(c => c.bottom || c.y + c.height || 0), 0);
    const minY = Math.min(...nonBgChildren.map(c => c.y || 0), 999);
    const status = maxY <= 852 ? (maxY > 780 ? '✅ COMPACT (full viewport)' : '✅ COMPACT (fits cleanly)') : '⚠️ OVERFLOW (' + maxY + 'px)';
    console.log(`${status.padEnd(35)} | [${f.name.replace('ARKI / ', '')}] content Y range: ${minY} -> ${maxY}`);
  }
}

main().catch(console.error);
