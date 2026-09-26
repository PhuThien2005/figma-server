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

  console.log('=== MULTIPLE BACK BUTTON AUDIT ===');
  for (const f of frames) {
    const backs = f.children.filter(c => c.name.toLowerCase().includes('back'));
    if (backs.length > 1) {
      console.log(`[${f.name}] multiple back buttons:`, backs.map(b => `${b.name} (${b.id})`));
    }
  }

  console.log('\n=== THEME BUTTON AUDIT ===');
  const themeBtns = [];
  for (const f of frames) {
    f.themeButtons.forEach(b => themeBtns.push({ frame: f.name, btn: b.name, id: b.id }));
  }
  console.log('Total theme buttons on sub-screens:', themeBtns.length);

  console.log('\n=== OVERFLOW AUDIT (> 852) ===');
  for (const f of frames) {
    const ov = f.children.filter(c => c.bottom > 852 && !c.name.toLowerCase().includes('canvas') && !c.name.toLowerCase().includes('bg') && !c.name.toLowerCase().includes('background'));
    if (ov.length > 0) {
      console.log(`[${f.name}] overflows:`, ov.map(o => `${o.name} (bottom: ${o.bottom})`));
    }
  }
}

main().catch(console.error);
