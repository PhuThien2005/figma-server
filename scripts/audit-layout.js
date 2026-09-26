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
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function main() {
  const audit = await post('AUDIT_PAGE_LAYOUT');
  if (!audit.success) {
    console.error('Audit failed:', audit);
    return;
  }
  const frames = audit.data.frames;
  console.log('Total audited frames:', frames.length);

  const darkThemeBtns = [];
  const lightThemeBtns = [];
  frames.forEach(f => {
    f.themeButtons.forEach(b => {
      if (f.name.includes('[Light]')) {
        lightThemeBtns.push({ frame: f.name, btn: b.name, id: b.id });
      } else {
        darkThemeBtns.push({ frame: f.name, btn: b.name, id: b.id });
      }
    });
  });
  console.log(`Total Light theme buttons found: ${lightThemeBtns.length}`);
  console.log(`Total Dark theme buttons found: ${darkThemeBtns.length}`);

  console.log('\nSample Light Theme Buttons:');
  lightThemeBtns.slice(0, 10).forEach(b => console.log(`   - [${b.frame}]: ${b.btn} (${b.id})`));

  console.log('\nSample Dark Theme Buttons:');
  darkThemeBtns.slice(0, 10).forEach(b => console.log(`   - [${b.frame}]: ${b.btn} (${b.id})`));

  const framesWithOverflow = frames.filter(f => f.overflowElements.length > 0);
  console.log('\n======================================================');
  console.log('Frames with overflow elements (bottom > 852px):', framesWithOverflow.length);
  console.log('======================================================');
  framesWithOverflow.forEach(f => {
    console.log(`Frame: "${f.name}" (H: ${f.height})`);
    f.overflowElements.forEach(e => console.log(`   - Overflowing: "${e.name}" (y: ${e.y}, h: ${e.height}, bottom: ${e.bottom})`));
  });

  // Check frames with bottom nav and content overlapping bottom nav (y in 700..772 or bottom > 772)
  console.log('\n======================================================');
  console.log('Checking bottom nav collision (elements reaching bottomNav area y >= 772):');
  console.log('======================================================');
  frames.forEach(f => {
    if (!f.bottomNav) return;
    const colliding = (f.childrenSummary || []).filter(c => 
      c.id !== f.bottomNav.id && 
      !c.name.toLowerCase().includes('background') && 
      !c.name.toLowerCase().includes('bg image') &&
      !c.name.toLowerCase().includes('overlay') &&
      c.bottom > 772
    );
    if (colliding.length > 0) {
      console.log(`Frame with Nav collision: "${f.name}"`);
      colliding.forEach(c => console.log(`   - Col: "${c.name}" (y: ${c.y}, bottom: ${c.bottom})`));
    }
  });
}

main().catch(console.error);
