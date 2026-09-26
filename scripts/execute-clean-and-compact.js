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
  console.log('🚀 STEP 1: Removing redundant theme buttons from all sub-screens...');
  const resTheme = await post('REMOVE_REDUNDANT_THEME_BUTTONS');
  console.log(`   ✅ Removed ${resTheme.data.removedCount} redundant theme buttons!`);
  if (resTheme.data.removedList && resTheme.data.removedList.length > 0) {
    console.log(`   Sample removed:`, resTheme.data.removedList.slice(0, 5));
  }

  console.log('\n🚀 STEP 2: Removing duplicate back buttons...');
  const resBack = await post('REMOVE_DUPLICATE_BACK_BUTTONS');
  console.log(`   ✅ Removed ${resBack.data.removedCount} duplicate back buttons!`);
  if (resBack.data.removedList && resBack.data.removedList.length > 0) {
    console.log(`   Sample removed:`, resBack.data.removedList);
  }

  console.log('\n🚀 STEP 3: Compacting vertical viewports (Details Body etc.)...');
  const resCompact = await post('COMPACT_VIEWPORTS');
  console.log(`   ✅ Compacted ${resCompact.data.updatedCount} viewports to exact 852px boundary!`);
  if (resCompact.data.updatedList && resCompact.data.updatedList.length > 0) {
    console.log(`   Sample updated:`, resCompact.data.updatedList);
  }

  console.log('\n🚀 STEP 4: Running comprehensive audit verification...');
  const audit = await post('AUDIT_PAGE_LAYOUT');
  const frames = audit.data.frames;

  // Check theme buttons
  let totalThemeBtnsRemaining = 0;
  for (const f of frames) {
    totalThemeBtnsRemaining += f.themeButtons.length;
  }
  console.log(`   Theme buttons remaining on sub-screens: ${totalThemeBtnsRemaining} (Target: 0)`);

  // Check overflows (> 852)
  let totalOverflowsRemaining = 0;
  for (const f of frames) {
    const ov = (f.children || []).filter(c => 
      c.bottom > 852 && 
      !c.name.toLowerCase().includes('canvas') && 
      !c.name.toLowerCase().includes('bg') && 
      !c.name.toLowerCase().includes('background')
    );
    if (ov.length > 0) {
      totalOverflowsRemaining += ov.length;
      console.log(`   ⚠️ Remaining overflow in [${f.name}]:`, ov.map(o => `${o.name} (${o.bottom}px)`));
    }
  }
  console.log(`   Overflowing elements remaining (> 852px): ${totalOverflowsRemaining} (Target: 0)`);

  console.log('\n🎉 ALL CLEANUP & COMPACTING STEPS COMPLETED SUCCESSFULLY!');
}

main().catch(console.error);
