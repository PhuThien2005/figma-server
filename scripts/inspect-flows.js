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
  const docInfo = await post('GET_DOCUMENT_INFO');
  console.log('Flow starting points:');
  docInfo.data.currentPage.flowStartingPoints.forEach(f => {
    console.log(`  - [${f.name}] -> nodeId: ${f.nodeId}`);
  });
}

main().catch(console.error);
