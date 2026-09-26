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
  const frames = audit.data.frames;
  for (const f of frames) {
    const avNodes = (f.children || []).filter(c => c.name === 'AV');
    for (const av of avNodes) {
      console.log(`Removing overlapping initial text AV (${av.id}) from ${f.name}`);
      await post('DELETE_NODE', { nodeId: av.id });
    }
  }
}

main().catch(console.error);
