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
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function main() {
  const res = await post('INSPECT_PAGE_TEXTS');
  const texts = res.data.texts || [];
  const lightTexts = texts.filter(t => t.screen && t.screen.includes('[Light]'));

  const list = [];
  const seen = new Set();
  lightTexts.forEach(t => {
    const s = t.characters.trim();
    if (!seen.has(s)) {
      seen.add(s);
      list.push({ text: s, screen: t.screen, id: t.id });
    }
  });

  if (!fs.existsSync('C:/figma/scratch')) fs.mkdirSync('C:/figma/scratch', { recursive: true });
  fs.writeFileSync('C:/figma/scratch/light_unique_texts.json', JSON.stringify(list, null, 2));
  console.log(`Saved ${list.length} unique texts to scratch/light_unique_texts.json`);
}

main().catch(console.error);
