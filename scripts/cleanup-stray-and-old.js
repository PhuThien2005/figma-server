import http from 'http';

function post(action, params = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:8765/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({ success: false, error: data }); }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function main() {
  const doc = await post('GET_DOCUMENT_INFO');
  if (!doc.success || !doc.data || !doc.data.currentPage) {
    console.error('Failed to get document info:', doc);
    return;
  }

  const children = doc.data.currentPage.children;
  console.log(`Current page children count: ${children.length}`);

  // Nodes to keep: Master Components (CMP / ..., Component / ...)
  const toDelete = [];
  for (const c of children) {
    const name = c.name || '';
    if (name.startsWith('CMP /') || name.startsWith('Component /') || name.includes('NOCTURNE') || name.includes('DAYLIGHT')) {
      continue; // Keep master components and section labels
    }
    // Delete old desktop admin/staff, old golden frames, and stray elements
    toDelete.push(c);
  }

  console.log(`Found ${toDelete.length} nodes to delete (old screens and stray elements)...`);
  for (const node of toDelete) {
    console.log(` Deleting [${node.id}] ${node.name} (${node.width}x${node.height})...`);
    await post('DELETE_NODE', { nodeId: node.id });
  }

  console.log('✅ Canvas cleanup complete!');
}

main().catch(console.error);
