import http from 'http';

function exec38451(operation, params = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ operation, params });
    const req = http.request({
      hostname: '127.0.0.1',
      port: 38451,
      path: '/exec',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
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
    req.write(payload);
    req.end();
  });
}

async function clean() {
  console.log('Fetching all frames on page to clean up broken runs...');
  const res = await exec38451('get_page_nodes', {});
  const nodes = res.data && res.data.nodes ? res.data.nodes : [];
  console.log(`Found ${nodes.length} nodes on current page.`);

  let deletedCount = 0;
  for (const node of nodes) {
    // Delete previous test frames: SCR-AUTH, SCR-360, SCR-BUY, GOLDEN, etc.
    if (node.name && (node.name.startsWith('SCR-') || node.name.startsWith('ARKI_') || node.name.startsWith('TEST /'))) {
      try {
        await exec38451('delete', { id: node.id });
        deletedCount++;
      } catch (e) {}
    }
  }

  console.log(`🧹 Cleaned up ${deletedCount} old test frames from Figma canvas.`);
}

clean().catch(console.error);
