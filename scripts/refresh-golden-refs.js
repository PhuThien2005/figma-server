import http from 'http';
import fs from 'fs';

function post(action, params = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:8765/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ success: false, error: data });
        }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function refresh() {
  console.log('🔍 Scanning canvas for Golden Path screens and buttons...');
  const res = await post('AUDIT_PAGE_LAYOUT');
  const allFrames = res.data?.frames || [];
  const goldenFrames = allFrames.filter(f => f.name.includes('GOLDEN /'));

  console.log(`Found ${goldenFrames.length} Golden frames on canvas.`);
  const refs = {};

  function findNode(node, predicate) {
    if (predicate(node)) return node;
    if (node.children) {
      for (const c of node.children) {
        const found = findNode(c, predicate);
        if (found) return found;
      }
    }
    return null;
  }

  goldenFrames.forEach(f => {
    // Map frame code (e.g. s01, s02...)
    const match = f.name.match(/GOLDEN \/ (\d+)/);
    if (!match) return;
    const num = match[1];
    const sKey = `s${num}`;
    refs[sKey] = f.id;

    // Scan buttons inside frame
    const searchBtns = [
      { key: 'btn_s01', name: 'Enter' },
      { key: 'btn_s02', name: 'Continue' },
      { key: 'btn_s03', name: 'Sign NDA' },
      { key: 'btn_s03_guest', name: 'Guest' },
      { key: 'btn_s04_filter', name: 'Open Filter' },
      { key: 'btn_s04_details', name: 'Details' },
      { key: 'btn_s05_close', name: 'Close Filter' },
      { key: 'btn_s05_apply', name: 'Apply Filter' },
      { key: 'btn_s06_back', name: 'Map Back' },
      { key: 'btn_s06_pin', name: 'Pin Details' },
      { key: 'btn_s07_back', name: 'Back From Details' },
      { key: 'btn_s07_cad', name: 'Blueprint' },
      { key: 'btn_s07_3d', name: '3D View' },
      { key: 'btn_s07_chat', name: 'Chat Studio' },
      { key: 'btn_s07_schedule', name: 'Schedule' },
      { key: 'btn_s08_back', name: 'Back From CAD' },
      { key: 'btn_s08_3d', name: 'Next to 3D' },
      { key: 'btn_s09_back', name: 'Back From 3D' },
      { key: 'btn_s10_back', name: 'Back 10' },
      { key: 'btn_s10_submit', name: 'Confirm Viewing' },
      { key: 'btn_s11_back', name: 'Back 11' },
      { key: 'btn_s11_staff', name: 'Next to Staff' },
      { key: 'btn_s12_back', name: 'Back 12' },
      { key: 'btn_s13_arch', name: 'Next Staff Architect' },
      { key: 'btn_s14_escrow', name: 'Next Staff Escrow' },
      { key: 'btn_s15_admin', name: 'Next Admin' },
      { key: 'btn_s16_rbac', name: 'Next Admin RBAC' },
      { key: 'btn_s17_listing', name: 'Next Admin Approval' },
      { key: 'btn_s18_home', name: 'Return to Client Feed' }
    ];

    searchBtns.forEach(sb => {
      const found = findNode(f, c => c.name && c.name.toLowerCase().includes(sb.name.toLowerCase()));
      if (found) {
        refs[sb.key] = found.id;
      }
    });
  });

  console.log(`Resolved ${Object.keys(refs).length} refs from canvas.`);
  fs.writeFileSync('golden-path-refs.json', JSON.stringify(refs, null, 2), 'utf8');
  console.log('✅ Updated golden-path-refs.json successfully!');
}

refresh().catch(console.error);
