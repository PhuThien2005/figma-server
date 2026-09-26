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
  const texts = res.data.texts.filter(t => t.screen && t.screen.includes('[Light]'));

  const remainingEnglish = [];
  texts.forEach(t => {
    const s = t.characters.trim();
    // English keywords to detect
    const keywords = [
      'Schedule', 'Private', 'Viewing', 'Apply', 'Watch', 'Filter', 'Save',
      'Estimated', 'Investment', 'Sign Out', 'Concierge', 'Download', 'Order',
      'Radiation', 'Solar', 'Dollhouse', 'Walk', 'Enter', 'Photo', 'Slide',
      'Transportation', 'Transit', 'Confirmed', 'Wallet', 'Folder', 'Chat',
      'Conference', 'Request', 'Monthly', 'Appreciation', 'Forecast', 'Privileges',
      'Alerts', 'Sharing', 'Gallery', 'Offline', 'Cache', 'Criteria', 'Studio',
      'Escrow', 'Payment', 'Price', 'Amenities', 'Pool', 'Cellar', 'Master'
    ];
    if (keywords.some(k => s.includes(k))) {
      remainingEnglish.push({ text: s, screen: t.screen, id: t.id });
    }
  });

  console.log(`Remaining English candidate texts: ${remainingEnglish.length}`);
  remainingEnglish.forEach(r => {
    console.log(`  - [${r.screen}] (id: ${r.id}): "${r.text.replace(/\n/g, ' ')}"`);
  });
}

main().catch(console.error);
