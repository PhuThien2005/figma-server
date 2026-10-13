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
    req.on('error', reject);
    req.write(JSON.stringify({ action, params }));
    req.end();
  });
}

async function updateColors() {
  console.log('🎨 Applying Artisan Architectural Palette (Anti-AI Luxury Styling)...');

  // Step 1: Update Light Mode Home Feed Action button & Active Chip to Deep Obsidian (#0F172A)
  await post('UPDATE_PROPERTIES', {
    nodeId: '1121:8136', // Chip / All [Light]
    color: '#0F172A',
    cornerRadius: 8
  });

  await post('UPDATE_PROPERTIES', {
    nodeId: '1121:8149', // Btn / Action [Light]
    color: '#0F172A',
    cornerRadius: 10
  });

  await post('UPDATE_PROPERTIES', {
    nodeId: '1121:8144', // Hero Estate Card
    cornerRadius: 16
  });

  await post('UPDATE_PROPERTIES', {
    nodeId: '1121:8151', // Second Card
    cornerRadius: 16
  });

  // Step 2: Update Dark Mode Home Feed Action button & Active Chip to Crisp Titanium (#F4F4F5)
  await post('UPDATE_PROPERTIES', {
    nodeId: '1121:7170', // Chip / All [Dark]
    color: '#F4F4F5',
    cornerRadius: 8
  });

  await post('UPDATE_PROPERTIES', {
    nodeId: '1121:7183', // Btn / Action [Dark]
    color: '#F4F4F5',
    cornerRadius: 10
  });

  await post('UPDATE_PROPERTIES', {
    nodeId: '1121:7178', // Hero Estate Card [Dark]
    cornerRadius: 16
  });

  await post('UPDATE_PROPERTIES', {
    nodeId: '1121:7185', // Second Card [Dark]
    cornerRadius: 16
  });

  console.log('✅ Updated Home Feed colors and corner radii to Artisan standards!');
}

updateColors().catch(console.error);
