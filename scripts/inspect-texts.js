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
  const res = await post('INSPECT_PAGE_TEXTS');
  if (!res.success) {
    console.error('Failed to inspect texts:', res);
    return;
  }
  const texts = res.data.texts || [];
  console.log(`Total text nodes on page: ${texts.length}`);

  // Group by screen
  const lightTexts = texts.filter(t => t.screen && t.screen.includes('[Light]'));
  console.log(`Text nodes in [Light] screens: ${lightTexts.length}`);

  // Print unique texts in Light screens
  const uniqueTexts = new Map();
  lightTexts.forEach(t => {
    const str = t.characters.trim();
    if (!uniqueTexts.has(str)) {
      uniqueTexts.set(str, { count: 1, screens: [t.screen], id: t.id });
    } else {
      const entry = uniqueTexts.get(str);
      entry.count++;
      if (!entry.screens.includes(t.screen)) entry.screens.push(t.screen);
    }
  });

  console.log(`Unique text strings in Light screens: ${uniqueTexts.size}`);
  console.log('\nSample text strings:');
  let i = 0;
  for (const [str, info] of uniqueTexts.entries()) {
    if (i++ < 50) {
      console.log(`  "${str.replace(/\n/g, ' ')}" (count: ${info.count}, screen: ${info.screens[0]})`);
    }
  }
}

main().catch(console.error);
