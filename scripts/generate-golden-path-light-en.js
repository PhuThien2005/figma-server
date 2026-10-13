import http from 'http';
import fs from 'fs';
import { IMAGES, TOKENS_LIGHT as T } from './generators/builder.js';

function post(action, params = {}, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:8765/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
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
    req.write(JSON.stringify({ action, params, timeoutMs }));
    req.end();
  });
}

const steps = [];

function addStep(action, params, ref = null) {
  const item = { action, params, continueOnError: true };
  if (ref) item.ref = ref;
  steps.push(item);
}

const BASE_X = 0;
const BASE_Y = 13200;
const COL_W = 460;
const ROW_H = 960;

// =============================================================================
// ROW 1: CLIENT EXPERIENCE (Screens 01 - 09) — LIGHT THEME & ENGLISH
// =============================================================================

// SCREEN 01: Splash & Philosophy
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 01 - Splash & Philosophy',
  width: 393, height: 852, x: BASE_X, y: BASE_Y,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's01');
addStep('CREATE_RECTANGLE', { parentId: '$s01', name: 'BG Cover Photo', width: 393, height: 500, x: 0, y: 0, imageUrl: IMAGES.villaPool, color: '#E4E4E7' });
addStep('CREATE_FRAME', { parentId: '$s01', name: 'Card / Intro Sheet', width: 345, height: 320, x: 24, y: 470, backgroundColor: '#FFFFFF', cornerRadius: 20 }, 'card_intro_s01');
addStep('CREATE_TEXT', { parentId: '$card_intro_s01', text: 'A R K I', fontSize: 30, fontStyle: 'Bold', color: '#09090B', x: 24, y: 30 });
addStep('CREATE_TEXT', { parentId: '$card_intro_s01', text: 'ARCHITECTURAL ESTATES & LIVING', fontSize: 11, fontStyle: 'SemiBold', color: '#B45309', x: 24, y: 75 });
addStep('CREATE_TEXT', { parentId: '$card_intro_s01', text: 'Living spaces sculpted by light and natural rhythm.\nPure minimalist architecture inspired by Tadao Ando.', fontSize: 13, color: '#52525B', x: 24, y: 105 });
addStep('CREATE_FRAME', { parentId: '$card_intro_s01', name: 'CTA / Enter', width: 297, height: 52, x: 24, y: 220, backgroundColor: '#09090B', cornerRadius: 12 }, 'btn_s01');
addStep('CREATE_TEXT', { parentId: '$btn_s01', text: 'Discover Masterpieces →', fontSize: 15, fontStyle: 'Bold', color: '#FFFFFF', x: 62, y: 17 });

// SCREEN 02: Pritzker Curated Collection (Onboarding)
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 02 - Pritzker Curated Collection',
  width: 393, height: 852, x: BASE_X + COL_W, y: BASE_Y,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's02');
addStep('CREATE_RECTANGLE', { parentId: '$s02', name: 'Hero Image', width: 393, height: 480, x: 0, y: 0, imageUrl: IMAGES.villaFront, color: '#E4E4E7' });
addStep('CREATE_FRAME', { parentId: '$s02', name: 'Tag Pritzker', width: 140, height: 26, x: 32, y: 510, backgroundColor: '#F4F4F5', cornerRadius: 6 });
addStep('CREATE_TEXT', { parentId: '$s02', text: 'PRITZKER MASTERS', fontSize: 10, fontStyle: 'SemiBold', color: '#B45309', x: 42, y: 516 });
addStep('CREATE_TEXT', { parentId: '$s02', text: 'Private Estate Collection', fontSize: 24, fontStyle: 'Bold', color: '#09090B', x: 32, y: 550 });
addStep('CREATE_TEXT', { parentId: '$s02', text: 'Exclusive cliffside sanctuaries and raw concrete monoliths engineered by legendary architects.', fontSize: 13, color: '#52525B', x: 32, y: 590 });
addStep('CREATE_FRAME', { parentId: '$s02', name: 'CTA / Continue', width: 329, height: 52, x: 32, y: 730, backgroundColor: '#09090B', cornerRadius: 12 }, 'btn_s02');
addStep('CREATE_TEXT', { parentId: '$btn_s02', text: 'Continue →', fontSize: 15, fontStyle: 'Bold', color: '#FFFFFF', x: 126, y: 17 });

// SCREEN 03: Biometric Gate & NDA
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 03 - Biometric Gate & NDA',
  width: 393, height: 852, x: BASE_X + COL_W * 2, y: BASE_Y,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's03');
addStep('CREATE_TEXT', { parentId: '$s03', text: 'Elite Verification Gate', fontSize: 24, fontStyle: 'Bold', color: '#09090B', x: 32, y: 90 });
addStep('CREATE_TEXT', { parentId: '$s03', text: 'FaceID Secure Enclave & Private Asset NDA Agreement.', fontSize: 13, color: '#71717A', x: 32, y: 125 });
addStep('CREATE_FRAME', { parentId: '$s03', name: 'Card NDA', width: 329, height: 260, x: 32, y: 180, backgroundColor: '#FFFFFF', cornerRadius: 16 }, 'card_nda_s03');
addStep('CREATE_TEXT', { parentId: '$card_nda_s03', text: 'CONFIDENTIAL OFF-MARKET COVENANT', fontSize: 11, fontStyle: 'Bold', color: '#B45309', x: 24, y: 24 });
addStep('CREATE_TEXT', { parentId: '$card_nda_s03', text: '1. Strict non-disclosure of GPS coordinates and valuation.\n2. Verification of architectural patron credentials.\n3. Escrow deposit protection via smart multi-signature.', fontSize: 12, color: '#52525B', x: 24, y: 56 });
addStep('CREATE_TEXT', { parentId: '$card_nda_s03', text: 'Session: #ARK-SEC-992 • Assigned to Alexander Vance', fontSize: 11, color: '#A1A1AA', x: 24, y: 210 });
addStep('CREATE_FRAME', { parentId: '$s03', name: 'CTA / Sign NDA', width: 329, height: 52, x: 32, y: 660, backgroundColor: '#09090B', cornerRadius: 12 }, 'btn_s03');
addStep('CREATE_TEXT', { parentId: '$btn_s03', text: 'Sign NDA & Unlock Catalog →', fontSize: 15, fontStyle: 'Bold', color: '#FFFFFF', x: 62, y: 17 });
addStep('CREATE_FRAME', { parentId: '$s03', name: 'CTA / Guest Mode', width: 329, height: 52, x: 32, y: 730, backgroundColor: '#F4F4F5', cornerRadius: 12 }, 'btn_s03_guest');
addStep('CREATE_TEXT', { parentId: '$btn_s03_guest', text: 'Enter Guest Preview Mode →', fontSize: 14, fontStyle: 'Medium', color: '#09090B', x: 74, y: 17 });

// SCREEN 04: Bento Masterpiece Feed
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 04 - Bento Masterpiece Feed',
  width: 393, height: 852, x: BASE_X + COL_W * 3, y: BASE_Y,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's04');
addStep('CREATE_TEXT', { parentId: '$s04', text: 'Discover Masterpieces', fontSize: 18, fontStyle: 'Bold', color: '#09090B', x: 24, y: 58 });
addStep('CREATE_TEXT', { parentId: '$s04', text: 'ARKI • CURATED ARCHITECTURAL ESTATES', fontSize: 10, fontStyle: 'SemiBold', color: '#B45309', x: 24, y: 82 });
addStep('CREATE_FRAME', { parentId: '$s04', name: 'Btn / Filter', width: 78, height: 38, x: 291, y: 56, backgroundColor: '#F4F4F5', cornerRadius: 8 }, 'btn_s04_filter');
addStep('CREATE_TEXT', { parentId: '$btn_s04_filter', text: 'Filters', fontSize: 13, fontStyle: 'Bold', color: '#09090B', x: 18, y: 11 });

// 4 Category Chips (80px width each, 8px gap)
const chipsS04 = ['ALL WORKS', 'COASTAL', 'BRUTALIST', 'BIOPHILIC'];
chipsS04.forEach((c, i) => {
  const isA = i === 0;
  const cX = 24 + i * 88;
  addStep('CREATE_FRAME', { parentId: '$s04', name: `Chip / ${c}`, width: 80, height: 36, x: cX, y: 112, backgroundColor: isA ? '#09090B' : '#F4F4F5', cornerRadius: 8 });
  addStep('CREATE_TEXT', { parentId: '$s04', text: c, fontSize: 10, fontStyle: 'Bold', color: isA ? '#FFFFFF' : '#52525B', x: cX + 8, y: 123 });
});

// Card 1: The Glass Sanctuary
addStep('CREATE_FRAME', { parentId: '$s04', name: 'Card / Hero Villa', width: 345, height: 350, x: 24, y: 165, backgroundColor: '#FFFFFF', cornerRadius: 16, clipsContent: true }, 'card_hero');
addStep('CREATE_RECTANGLE', { parentId: '$card_hero', name: 'Villa Photo', width: 345, height: 210, x: 0, y: 0, imageUrl: IMAGES.villaPool, color: '#E4E4E7' });
addStep('CREATE_FRAME', { parentId: '$card_hero', name: 'Btn / Heart', width: 36, height: 36, x: 295, y: 14, backgroundColor: '#FFFFFFD9', cornerRadius: 18 });
addStep('CREATE_TEXT', { parentId: '$card_hero', text: '♡', fontSize: 16, color: '#09090B', x: 307, y: 22 });
addStep('CREATE_TEXT', { parentId: '$card_hero', text: 'The Glass Sanctuary Villa', fontSize: 18, fontStyle: 'Bold', color: '#09090B', x: 16, y: 226 });
addStep('CREATE_TEXT', { parentId: '$card_hero', text: 'Son Tra Peninsula • Tadao Ando • 850 sq.m', fontSize: 12, color: '#52525B', x: 16, y: 252 });
addStep('CREATE_TEXT', { parentId: '$card_hero', text: '$4,250,000', fontSize: 18, fontStyle: 'Bold', color: '#09090B', x: 16, y: 302 });
addStep('CREATE_FRAME', { parentId: '$card_hero', name: 'Btn / Details', width: 130, height: 40, x: 199, y: 294, backgroundColor: '#09090B', cornerRadius: 8 }, 'btn_hero_details');
addStep('CREATE_TEXT', { parentId: '$btn_hero_details', text: 'View Details →', fontSize: 12, fontStyle: 'Bold', color: '#FFFFFF', x: 18, y: 13 });

// Card 2: Cliffside Monolith
addStep('CREATE_FRAME', { parentId: '$s04', name: 'Card / Second Villa', width: 345, height: 180, x: 24, y: 535, backgroundColor: '#FFFFFF', cornerRadius: 16, clipsContent: true }, 'card_second');
addStep('CREATE_RECTANGLE', { parentId: '$card_second', name: 'Photo 2', width: 345, height: 100, x: 0, y: 0, imageUrl: IMAGES.brutalistVilla, color: '#E4E4E7' });
addStep('CREATE_TEXT', { parentId: '$card_second', text: 'Cliffside Monolith Retreat', fontSize: 15, fontStyle: 'Bold', color: '#09090B', x: 16, y: 112 });
addStep('CREATE_TEXT', { parentId: '$card_second', text: 'Kengo Kuma • 620 sq.m • $3,800,000', fontSize: 12, color: '#52525B', x: 16, y: 136 });

// Bottom Dock (4 equal tabs: 98.25px each)
addStep('CREATE_FRAME', { parentId: '$s04', name: 'Bottom Dock', width: 393, height: 76, x: 0, y: 776, backgroundColor: '#FFFFFF' }, 'dock_s04');
addStep('CREATE_FRAME', { parentId: '$dock_s04', name: 'Dock Border', width: 393, height: 1, x: 0, y: 0, backgroundColor: '#E4E4E7' });
const tabsS04 = [{ name: 'Discover', icon: '◎' }, { name: 'Map', icon: '⚲' }, { name: 'Saved', icon: '♡' }, { name: 'Profile', icon: '👤' }];
tabsS04.forEach((tb, idx) => {
  const isA = idx === 0;
  const tX = idx * 98.25;
  addStep('CREATE_FRAME', { parentId: '$dock_s04', name: `Tab / ${tb.name}`, width: 98.25, height: 76, x: tX, y: 0, backgroundColor: '#FFFFFF' }, `tab_s04_${idx}`);
  addStep('CREATE_TEXT', { parentId: `$tab_s04_${idx}`, text: tb.icon, fontSize: 16, color: isA ? '#09090B' : '#A1A1AA', x: 41, y: 16 });
  addStep('CREATE_TEXT', { parentId: `$tab_s04_${idx}`, text: tb.name, fontSize: 11, fontStyle: isA ? 'Bold' : 'Medium', color: isA ? '#09090B' : '#A1A1AA', x: 26, y: 38 });
  if (isA) {
    addStep('CREATE_FRAME', { parentId: `$tab_s04_${idx}`, name: 'Active Bar', width: 24, height: 3, x: 37, y: 56, backgroundColor: '#09090B', cornerRadius: 2 });
  }
});

// SCREEN 05: Architectural Criteria Filter
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 05 - Architectural Criteria Filter',
  width: 393, height: 852, x: BASE_X + COL_W * 4, y: BASE_Y,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's05');
addStep('CREATE_FRAME', { parentId: '$s05', name: 'Btn / Back', width: 44, height: 44, x: 24, y: 56, backgroundColor: '#F4F4F5', cornerRadius: 22 }, 'btn_s05_back');
addStep('CREATE_TEXT', { parentId: '$btn_s05_back', text: '←', fontSize: 18, color: '#09090B', x: 14, y: 11 });
addStep('CREATE_TEXT', { parentId: '$s05', text: 'Architectural Criteria', fontSize: 20, fontStyle: 'Bold', color: '#09090B', x: 80, y: 64 });
addStep('CREATE_TEXT', { parentId: '$s05', text: 'Price Range: $2.5M - $12.0M USD', fontSize: 12, color: '#B45309', x: 24, y: 120 });
addStep('CREATE_FRAME', { parentId: '$s05', name: 'Slider Track', width: 345, height: 6, x: 24, y: 145, backgroundColor: '#E4E4E7', cornerRadius: 3 });
addStep('CREATE_FRAME', { parentId: '$s05', name: 'Slider Fill', width: 220, height: 6, x: 50, y: 145, backgroundColor: '#09090B', cornerRadius: 3 });
addStep('CREATE_TEXT', { parentId: '$s05', text: 'LEAD ARCHITECTURAL STUDIO', fontSize: 11, fontStyle: 'Bold', color: '#71717A', x: 24, y: 180 });
addStep('CREATE_FRAME', { parentId: '$s05', name: 'Studio Tadao Ando', width: 345, height: 44, x: 24, y: 205, backgroundColor: '#09090B', cornerRadius: 10 });
addStep('CREATE_TEXT', { parentId: '$s05', text: 'Tadao Ando Studio  ✓', fontSize: 13, fontStyle: 'Bold', color: '#FFFFFF', x: 40, y: 218 });
addStep('CREATE_FRAME', { parentId: '$s05', name: 'Studio Kengo Kuma', width: 345, height: 44, x: 24, y: 260, backgroundColor: '#FFFFFF', cornerRadius: 10 });
addStep('CREATE_TEXT', { parentId: '$s05', text: 'Kengo Kuma & Associates', fontSize: 13, color: '#09090B', x: 40, y: 273 });
addStep('CREATE_FRAME', { parentId: '$s05', name: 'Studio Zaha Hadid', width: 345, height: 44, x: 24, y: 315, backgroundColor: '#FFFFFF', cornerRadius: 10 });
addStep('CREATE_TEXT', { parentId: '$s05', text: 'Zaha Hadid Architects', fontSize: 13, color: '#09090B', x: 40, y: 328 });
addStep('CREATE_FRAME', { parentId: '$s05', name: 'CTA / Apply', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#09090B', cornerRadius: 12 }, 'btn_s05_apply');
addStep('CREATE_TEXT', { parentId: '$btn_s05_apply', text: 'Apply Filters (14 Results) →', fontSize: 15, fontStyle: 'Bold', color: '#FFFFFF', x: 80, y: 17 });

// SCREEN 06: GPS Estate Radar Map
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 06 - GPS Estate Radar Map',
  width: 393, height: 852, x: BASE_X + COL_W * 5, y: BASE_Y,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's06');
addStep('CREATE_RECTANGLE', { parentId: '$s06', name: 'Map Surface', width: 393, height: 852, x: 0, y: 0, imageUrl: IMAGES.mapSnapshot, color: '#E4E4E7' });
addStep('CREATE_FRAME', { parentId: '$s06', name: 'Btn / Back Feed', width: 110, height: 42, x: 24, y: 56, backgroundColor: '#FFFFFF', cornerRadius: 21 }, 'btn_s06_back');
addStep('CREATE_TEXT', { parentId: '$btn_s06_back', text: '← Feed', fontSize: 13, fontStyle: 'Bold', color: '#09090B', x: 24, y: 13 });
addStep('CREATE_FRAME', { parentId: '$s06', name: 'Sheet / Pin Preview', width: 345, height: 130, x: 24, y: 680, backgroundColor: '#FFFFFF', cornerRadius: 16 }, 'sheet_s06');
addStep('CREATE_TEXT', { parentId: '$sheet_s06', text: 'The Glass Sanctuary • $4.25M', fontSize: 16, fontStyle: 'Bold', color: '#09090B', x: 20, y: 22 });
addStep('CREATE_TEXT', { parentId: '$sheet_s06', text: 'Son Tra Peninsula • 850 sq.m • Helipad 108°', fontSize: 12, color: '#52525B', x: 20, y: 48 });
addStep('CREATE_FRAME', { parentId: '$sheet_s06', name: 'Btn / Open Pin', width: 140, height: 40, x: 185, y: 74, backgroundColor: '#09090B', cornerRadius: 8 }, 'btn_s06_open');
addStep('CREATE_TEXT', { parentId: '$btn_s06_open', text: 'View Details →', fontSize: 12, fontStyle: 'Bold', color: '#FFFFFF', x: 22, y: 13 });

// SCREEN 07: Estate Details & Specs
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 07 - Estate Details & Specs',
  width: 393, height: 852, x: BASE_X + COL_W * 6, y: BASE_Y,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's07');
addStep('CREATE_RECTANGLE', { parentId: '$s07', name: 'Hero Cover', width: 393, height: 380, x: 0, y: 0, imageUrl: IMAGES.villaPool, color: '#E4E4E7' });
addStep('CREATE_FRAME', { parentId: '$s07', name: 'Btn / Floating Back', width: 44, height: 44, x: 24, y: 56, backgroundColor: '#FFFFFFD9', cornerRadius: 22 }, 'btn_s07_back');
addStep('CREATE_TEXT', { parentId: '$btn_s07_back', text: '←', fontSize: 18, color: '#09090B', x: 14, y: 11 });
addStep('CREATE_TEXT', { parentId: '$s07', text: 'The Glass Sanctuary Villa', fontSize: 24, fontStyle: 'Bold', color: '#09090B', x: 24, y: 405 });
addStep('CREATE_TEXT', { parentId: '$s07', text: 'Tadao Ando Studio • Son Tra Peninsula • $4,250,000 USD', fontSize: 13, fontStyle: 'SemiBold', color: '#B45309', x: 24, y: 435 });

// 6 Specs Bento Grid Chips
const specsS07 = ['850 sq.m', '5 Suites', 'Heli-pad 108°', '35m Pool', 'Wine Cellar', 'Low-E Glass'];
specsS07.forEach((sp, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const spX = 24 + col * 118;
  const spY = 470 + row * 46;
  addStep('CREATE_FRAME', { parentId: '$s07', name: `Spec / ${sp}`, width: 108, height: 38, x: spX, y: spY, backgroundColor: '#FFFFFF', cornerRadius: 8 });
  addStep('CREATE_TEXT', { parentId: '$s07', text: sp, fontSize: 11, fontStyle: 'Bold', color: '#09090B', x: spX + 16, y: spY + 12 });
});

addStep('CREATE_FRAME', { parentId: '$s07', name: 'Btn / CAD Blueprints', width: 166, height: 44, x: 24, y: 580, backgroundColor: '#F4F4F5', cornerRadius: 10 }, 'btn_s07_cad');
addStep('CREATE_TEXT', { parentId: '$btn_s07_cad', text: 'CAD 1:100 Blueprints →', fontSize: 11, fontStyle: 'Bold', color: '#09090B', x: 14, y: 14 });
addStep('CREATE_FRAME', { parentId: '$s07', name: 'Btn / Tour 360', width: 166, height: 44, x: 202, y: 580, backgroundColor: '#F4F4F5', cornerRadius: 10 }, 'btn_s07_vr');
addStep('CREATE_TEXT', { parentId: '$btn_s07_vr', text: '360° Spatial Tour →', fontSize: 11, fontStyle: 'Bold', color: '#09090B', x: 24, y: 14 });

addStep('CREATE_FRAME', { parentId: '$s07', name: 'Btn / Chat Architect', width: 345, height: 44, x: 24, y: 640, backgroundColor: '#FFFFFF', cornerRadius: 10 }, 'btn_s07_chat');
addStep('CREATE_TEXT', { parentId: '$btn_s07_chat', text: 'Consult Tadao Ando Studio 1-on-1 →', fontSize: 13, fontStyle: 'Bold', color: '#B45309', x: 50, y: 14 });

addStep('CREATE_FRAME', { parentId: '$s07', name: 'CTA / Schedule Tour', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#09090B', cornerRadius: 12 }, 'btn_s07_schedule');
addStep('CREATE_TEXT', { parentId: '$btn_s07_schedule', text: 'Schedule Private Viewing →', fontSize: 15, fontStyle: 'Bold', color: '#FFFFFF', x: 80, y: 17 });

// SCREEN 08: CAD 1:100 Floorplan & Blueprints
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 08 - CAD 1:100 Blueprints',
  width: 393, height: 852, x: BASE_X + COL_W * 7, y: BASE_Y,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's08');
addStep('CREATE_FRAME', { parentId: '$s08', name: 'Btn / Back', width: 44, height: 44, x: 24, y: 56, backgroundColor: '#F4F4F5', cornerRadius: 22 }, 'btn_s08_back');
addStep('CREATE_TEXT', { parentId: '$btn_s08_back', text: '←', fontSize: 18, color: '#09090B', x: 14, y: 11 });
addStep('CREATE_TEXT', { parentId: '$s08', text: 'CAD Architectural Floorplan 1:100', fontSize: 18, fontStyle: 'Bold', color: '#09090B', x: 24, y: 115 });
addStep('CREATE_TEXT', { parentId: '$s08', text: 'Museum Standard Ratio • Tadao Ando Studio 1995', fontSize: 12, color: '#71717A', x: 24, y: 140 });
addStep('CREATE_RECTANGLE', { parentId: '$s08', name: 'Blueprint Canvas', width: 345, height: 460, x: 24, y: 175, imageUrl: IMAGES.blueprintPlan, color: '#E4E4E7' });
addStep('CREATE_TEXT', { parentId: '$s08', text: 'Grand Atrium 7.2m Ceiling • Built-up Area 240 sq.m\nCantilevered Saltwater Infinity Pool: 35.0m', fontSize: 12, color: '#52525B', x: 24, y: 655 });
addStep('CREATE_FRAME', { parentId: '$s08', name: 'CTA / To 360', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#09090B', cornerRadius: 12 }, 'btn_s08_to_vr');
addStep('CREATE_TEXT', { parentId: '$btn_s08_to_vr', text: 'Launch 360° Spatial Tour →', fontSize: 15, fontStyle: 'Bold', color: '#FFFFFF', x: 80, y: 17 });

// SCREEN 09: 360° Spatial VR Experience
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 09 - 360 Spatial VR',
  width: 393, height: 852, x: BASE_X + COL_W * 8, y: BASE_Y,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's09');
addStep('CREATE_RECTANGLE', { parentId: '$s09', name: 'Pano Living', width: 393, height: 852, x: 0, y: 0, imageUrl: IMAGES.livingRoom, color: '#E4E4E7' });
addStep('CREATE_FRAME', { parentId: '$s09', name: 'Btn / Back Details', width: 140, height: 42, x: 24, y: 56, backgroundColor: '#FFFFFFE6', cornerRadius: 21 }, 'btn_s09_back');
addStep('CREATE_TEXT', { parentId: '$btn_s09_back', text: '← Villa Details', fontSize: 13, fontStyle: 'Bold', color: '#09090B', x: 24, y: 13 });
addStep('CREATE_FRAME', { parentId: '$s09', name: 'HUD Pan', width: 345, height: 90, x: 24, y: 690, backgroundColor: '#FFFFFFE6', cornerRadius: 16 }, 'hud_s09');
addStep('CREATE_TEXT', { parentId: '$hud_s09', text: '360° Panorama Viewer • Gyroscope 2D Pan', fontSize: 14, fontStyle: 'Bold', color: '#09090B', x: 20, y: 22 });
addStep('CREATE_TEXT', { parentId: '$hud_s09', text: 'Grand Atrium 7.2m • Son Tra Peninsula', fontSize: 12, color: '#52525B', x: 20, y: 48 });

// =============================================================================
// ROW 2: OPERATIONS, ARCHITECT & GOVERNANCE (Screens 10 - 18)
// =============================================================================

// SCREEN 10: Heli Viewing & Logistics
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 10 - Heli Viewing Logistics',
  width: 393, height: 852, x: BASE_X, y: BASE_Y + ROW_H,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's10');
addStep('CREATE_FRAME', { parentId: '$s10', name: 'Btn / Back', width: 44, height: 44, x: 24, y: 56, backgroundColor: '#F4F4F5', cornerRadius: 22 }, 'btn_s10_back');
addStep('CREATE_TEXT', { parentId: '$btn_s10_back', text: '←', fontSize: 18, color: '#09090B', x: 14, y: 11 });
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Schedule Private Viewing', fontSize: 20, fontStyle: 'Bold', color: '#09090B', x: 80, y: 64 });
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Bell 429 Helicopter Charter Service Included', fontSize: 12, color: '#B45309', x: 24, y: 120 });
addStep('CREATE_FRAME', { parentId: '$s10', name: 'Card Form', width: 345, height: 260, x: 24, y: 160, backgroundColor: '#FFFFFF', cornerRadius: 16 });
addStep('CREATE_TEXT', { parentId: '$s10', text: 'SELECTED FLIGHT SLOT: FRIDAY 14:30', fontSize: 12, fontStyle: 'Bold', color: '#09090B', x: 44, y: 190 });
addStep('CREATE_TEXT', { parentId: '$s10', text: 'Helipad Departure: Da Nang International Heliport\nLanding Pad: The Glass Sanctuary Private Rooftop Pad\nLead Architect Concierge: Marcus Vance, AIA', fontSize: 12, color: '#52525B', x: 44, y: 220 });
addStep('CREATE_FRAME', { parentId: '$s10', name: 'CTA / Confirm Slot', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#09090B', cornerRadius: 12 }, 'btn_s10_confirm');
addStep('CREATE_TEXT', { parentId: '$btn_s10_confirm', text: 'Issue VIP Pass Ticket →', fontSize: 15, fontStyle: 'Bold', color: '#FFFFFF', x: 100, y: 17 });

// SCREEN 11: VIP Pass & Wallet Confirmation
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 11 - VIP Pass Wallet',
  width: 393, height: 852, x: BASE_X + COL_W, y: BASE_Y + ROW_H,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's11');
addStep('CREATE_FRAME', { parentId: '$s11', name: 'Card Pass', width: 345, height: 460, x: 24, y: 100, backgroundColor: '#FFFFFF', cornerRadius: 20 }, 'pass_s11');
addStep('CREATE_TEXT', { parentId: '$pass_s11', text: 'ARKI VIP PRIVATE PASS', fontSize: 14, fontStyle: 'Bold', color: '#B45309', x: 24, y: 30 });
addStep('CREATE_TEXT', { parentId: '$pass_s11', text: 'Alexander Vance', fontSize: 24, fontStyle: 'Bold', color: '#09090B', x: 24, y: 65 });
addStep('CREATE_TEXT', { parentId: '$pass_s11', text: 'Destination: The Glass Sanctuary Villa\nFlight Code: #ARK-8821 (Bell 429 Charter)\nSecurity Clearance: Level 1 Patron', fontSize: 12, color: '#52525B', x: 24, y: 110 });
addStep('CREATE_RECTANGLE', { parentId: '$pass_s11', name: 'QR Code Placeholder', width: 160, height: 160, x: 92, y: 240, color: '#F4F4F5', cornerRadius: 8 });
addStep('CREATE_TEXT', { parentId: '$pass_s11', text: 'Scan at Heliport Enclave', fontSize: 11, color: '#A1A1AA', x: 105, y: 415 });
addStep('CREATE_FRAME', { parentId: '$s11', name: 'CTA / Back Feed', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#09090B', cornerRadius: 12 }, 'btn_s11_home');
addStep('CREATE_TEXT', { parentId: '$btn_s11_home', text: 'Return to Discover Feed ↺', fontSize: 15, fontStyle: 'Bold', color: '#FFFFFF', x: 90, y: 17 });

// SCREEN 12: 1-on-1 Architect Consultation
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 12 - Architect Consultation',
  width: 393, height: 852, x: BASE_X + COL_W * 2, y: BASE_Y + ROW_H,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's12');
addStep('CREATE_FRAME', { parentId: '$s12', name: 'Btn / Back', width: 44, height: 44, x: 24, y: 56, backgroundColor: '#F4F4F5', cornerRadius: 22 }, 'btn_s12_back');
addStep('CREATE_TEXT', { parentId: '$btn_s12_back', text: '←', fontSize: 18, color: '#09090B', x: 14, y: 11 });
addStep('CREATE_TEXT', { parentId: '$s12', text: 'Consultation: Tadao Ando Studio', fontSize: 18, fontStyle: 'Bold', color: '#09090B', x: 80, y: 64 });
addStep('CREATE_FRAME', { parentId: '$s12', name: 'Msg 1', width: 280, height: 60, x: 24, y: 140, backgroundColor: '#FFFFFF', cornerRadius: 12 });
addStep('CREATE_TEXT', { parentId: '$s12', text: 'Welcome Mr. Vance. We have reviewed your request for a +4m cantilevered pool extension.', fontSize: 11, color: '#09090B', x: 38, y: 155 });
addStep('CREATE_FRAME', { parentId: '$s12', name: 'Msg 2', width: 260, height: 60, x: 109, y: 220, backgroundColor: '#09090B', cornerRadius: 12 });
addStep('CREATE_TEXT', { parentId: '$s12', text: 'Thank you. Please ensure the exposed concrete texture matches the 1995 museum standard.', fontSize: 11, color: '#FFFFFF', x: 123, y: 235 });
addStep('CREATE_FRAME', { parentId: '$s12', name: 'CTA / To Staff', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#F4F4F5', cornerRadius: 12 }, 'btn_s12_to_staff');
addStep('CREATE_TEXT', { parentId: '$btn_s12_to_staff', text: 'Switch to Staff Operations Portal →', fontSize: 14, fontStyle: 'Bold', color: '#09090B', x: 50, y: 17 });

// SCREEN 13: Staff Aviation Dispatch
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 13 - Staff Aviation Dispatch',
  width: 393, height: 852, x: BASE_X + COL_W * 3, y: BASE_Y + ROW_H,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's13');
addStep('CREATE_TEXT', { parentId: '$s13', text: 'STAFF OPERATIONS PORTAL', fontSize: 11, fontStyle: 'SemiBold', color: '#B45309', x: 24, y: 60 });
addStep('CREATE_TEXT', { parentId: '$s13', text: 'Aviation Dispatch & Flight Radar', fontSize: 22, fontStyle: 'Bold', color: '#09090B', x: 24, y: 85 });
addStep('CREATE_FRAME', { parentId: '$s13', name: 'Card Flight', width: 345, height: 220, x: 24, y: 140, backgroundColor: '#FFFFFF', cornerRadius: 16 });
addStep('CREATE_TEXT', { parentId: '$s13', text: 'BELL 429 CHARTER FLIGHT #ARK-8821', fontSize: 12, fontStyle: 'Bold', color: '#059669', x: 44, y: 165 });
addStep('CREATE_TEXT', { parentId: '$s13', text: 'Guest: Alexander Vance\nDestination: The Glass Sanctuary Helipad\nDeparture: Friday 14:30\nStatus: Pre-flight Clearance Confirmed', fontSize: 12, color: '#52525B', x: 44, y: 195 });
addStep('CREATE_FRAME', { parentId: '$s13', name: 'Btn / Approve Flight', width: 280, height: 44, x: 44, y: 295, backgroundColor: '#09090B', cornerRadius: 8 });
addStep('CREATE_TEXT', { parentId: '$s13', text: 'Authorize Flight Plan #ARK-8821', fontSize: 12, fontStyle: 'Bold', color: '#FFFFFF', x: 80, y: 310 });
addStep('CREATE_FRAME', { parentId: '$s13', name: 'CTA / To Appraisal', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#F4F4F5', cornerRadius: 12 }, 'btn_s13_to_appraise');
addStep('CREATE_TEXT', { parentId: '$btn_s13_to_appraise', text: 'Open Architect Appraisal Workspace →', fontSize: 14, fontStyle: 'Bold', color: '#09090B', x: 38, y: 17 });

// SCREEN 14: Staff Architect Technical Appraisal
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 14 - Staff Technical Appraisal',
  width: 393, height: 852, x: BASE_X + COL_W * 4, y: BASE_Y + ROW_H,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's14');
addStep('CREATE_TEXT', { parentId: '$s14', text: 'TECHNICAL APPRAISAL', fontSize: 11, fontStyle: 'SemiBold', color: '#B45309', x: 24, y: 60 });
addStep('CREATE_TEXT', { parentId: '$s14', text: 'Structural Audit & CAD 1:100', fontSize: 22, fontStyle: 'Bold', color: '#09090B', x: 24, y: 85 });
addStep('CREATE_FRAME', { parentId: '$s14', name: 'Card Specs Audit', width: 345, height: 260, x: 24, y: 140, backgroundColor: '#FFFFFF', cornerRadius: 16 });
addStep('CREATE_TEXT', { parentId: '$s14', text: 'STRUCTURAL AUDIT & CONCRETE INTEGRITY', fontSize: 11, fontStyle: 'Bold', color: '#09090B', x: 44, y: 165 });
addStep('CREATE_TEXT', { parentId: '$s14', text: '• Core Compressive Strength: 38.5 MPa (Passed)\n• Low-E Acoustic Insulation: -42dB (Passed)\n• Wind Resistance Rating: Category 5 Hurricane (Passed)\n• Seismic Damper Verification: Certified ISO-9001', fontSize: 12, color: '#52525B', x: 44, y: 195 });
addStep('CREATE_FRAME', { parentId: '$s14', name: 'CTA / To Escrow', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#F4F4F5', cornerRadius: 12 }, 'btn_s14_to_escrow');
addStep('CREATE_TEXT', { parentId: '$btn_s14_to_escrow', text: 'Open Escrow & Settlement Workspace →', fontSize: 14, fontStyle: 'Bold', color: '#09090B', x: 40, y: 17 });

// SCREEN 15: Staff Smart Escrow Oversight
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 15 - Staff Smart Escrow',
  width: 393, height: 852, x: BASE_X + COL_W * 5, y: BASE_Y + ROW_H,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's15');
addStep('CREATE_TEXT', { parentId: '$s15', text: 'ESCROW & SETTLEMENT', fontSize: 11, fontStyle: 'SemiBold', color: '#B45309', x: 24, y: 60 });
addStep('CREATE_TEXT', { parentId: '$s15', text: 'Multi-Sig Escrow Vault', fontSize: 22, fontStyle: 'Bold', color: '#09090B', x: 24, y: 85 });
addStep('CREATE_FRAME', { parentId: '$s15', name: 'Card Escrow', width: 345, height: 240, x: 24, y: 140, backgroundColor: '#FFFFFF', cornerRadius: 16 });
addStep('CREATE_TEXT', { parentId: '$s15', text: 'DEPOSIT TRANSACTION #TX-ESCROW-0082', fontSize: 11, fontStyle: 'Bold', color: '#059669', x: 44, y: 165 });
addStep('CREATE_TEXT', { parentId: '$s15', text: 'Locked Deposit: 68.20 BTC ($4,250,000 USD)\nPatron: Alexander Vance\nBeneficiary: Tadao Ando Studio Escrow Trust\nConsensus: 3-of-4 Multi-Signature Validated', fontSize: 12, color: '#52525B', x: 44, y: 195 });
addStep('CREATE_FRAME', { parentId: '$s15', name: 'CTA / To Admin', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#F4F4F5', cornerRadius: 12 }, 'btn_s15_to_admin');
addStep('CREATE_TEXT', { parentId: '$btn_s15_to_admin', text: 'Switch to Executive Admin Portal →', fontSize: 14, fontStyle: 'Bold', color: '#09090B', x: 55, y: 17 });

// SCREEN 16: Executive Governance Dashboard
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 16 - Executive Governance',
  width: 393, height: 852, x: BASE_X + COL_W * 6, y: BASE_Y + ROW_H,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's16');
addStep('CREATE_TEXT', { parentId: '$s16', text: 'SUPER ADMIN PORTAL', fontSize: 11, fontStyle: 'SemiBold', color: '#B45309', x: 24, y: 60 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'Executive Governance', fontSize: 22, fontStyle: 'Bold', color: '#09090B', x: 24, y: 85 });

// 2 Bento Metrics Cards
addStep('CREATE_FRAME', { parentId: '$s16', name: 'Bento Metric 1', width: 166, height: 100, x: 24, y: 130, backgroundColor: '#FFFFFF', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'ASSETS UNDER MGT', fontSize: 10, fontStyle: 'Bold', color: '#71717A', x: 38, y: 150 });
addStep('CREATE_TEXT', { parentId: '$s16', text: '$148.5M', fontSize: 22, fontStyle: 'Bold', color: '#09090B', x: 38, y: 180 });

addStep('CREATE_FRAME', { parentId: '$s16', name: 'Bento Metric 2', width: 166, height: 100, x: 202, y: 130, backgroundColor: '#FFFFFF', cornerRadius: 14 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'ESCROW VAULT', fontSize: 10, fontStyle: 'Bold', color: '#71717A', x: 216, y: 150 });
addStep('CREATE_TEXT', { parentId: '$s16', text: '682.4 BTC', fontSize: 22, fontStyle: 'Bold', color: '#059669', x: 216, y: 180 });

addStep('CREATE_FRAME', { parentId: '$s16', name: 'Card Approval', width: 345, height: 200, x: 24, y: 250, backgroundColor: '#FFFFFF', cornerRadius: 16 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'PENDING LISTING APPROVAL', fontSize: 11, fontStyle: 'Bold', color: '#B45309', x: 44, y: 275 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'The Glass Sanctuary Villa • $4.25M\nArchitect: Studio Tadao Ando • Son Tra Peninsula\nDossier: CAD 1:100 Verified & NDA Enforced', fontSize: 12, color: '#52525B', x: 44, y: 305 });
addStep('CREATE_FRAME', { parentId: '$s16', name: 'Btn / Approve Global', width: 260, height: 44, x: 44, y: 380, backgroundColor: '#09090B', cornerRadius: 8 });
addStep('CREATE_TEXT', { parentId: '$s16', text: 'Authorize Global Public Listing', fontSize: 12, fontStyle: 'Bold', color: '#FFFFFF', x: 80, y: 395 });

addStep('CREATE_FRAME', { parentId: '$s16', name: 'CTA / To RBAC', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#F4F4F5', cornerRadius: 12 }, 'btn_s16_to_rbac');
addStep('CREATE_TEXT', { parentId: '$btn_s16_to_rbac', text: 'Open RBAC Role Permissions →', fontSize: 14, fontStyle: 'Bold', color: '#09090B', x: 74, y: 17 });

// SCREEN 17: RBAC Permissions Management
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 17 - RBAC Permissions',
  width: 393, height: 852, x: BASE_X + COL_W * 7, y: BASE_Y + ROW_H,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's17');
addStep('CREATE_TEXT', { parentId: '$s17', text: 'ACCESS CONTROL', fontSize: 11, fontStyle: 'SemiBold', color: '#B45309', x: 24, y: 60 });
addStep('CREATE_TEXT', { parentId: '$s17', text: 'Role-Based Access Control', fontSize: 22, fontStyle: 'Bold', color: '#09090B', x: 24, y: 85 });
addStep('CREATE_FRAME', { parentId: '$s17', name: 'Card Roles', width: 345, height: 320, x: 24, y: 140, backgroundColor: '#FFFFFF', cornerRadius: 16 });
addStep('CREATE_TEXT', { parentId: '$s17', text: 'SYSTEM ROLE MATRIX (3 ACTORS)', fontSize: 11, fontStyle: 'Bold', color: '#09090B', x: 44, y: 165 });
addStep('CREATE_TEXT', { parentId: '$s17', text: '1. BUYER / PATRON: Read 360, Sign NDA, Escrow Deposit\n2. ARCHITECT / KTS: Upload CAD 1:100, Material Hotspots\n3. AGENT / STAFF: Host Live Co-tour, Flight Logistics\n4. SUPER ADMIN: Executive Governance & Listing Approval', fontSize: 12, color: '#52525B', x: 44, y: 200 });
addStep('CREATE_FRAME', { parentId: '$s17', name: 'CTA / To Publishing', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#F4F4F5', cornerRadius: 12 }, 'btn_s17_to_publish');
addStep('CREATE_TEXT', { parentId: '$btn_s17_to_publish', text: 'Open Listing Approval Gate →', fontSize: 14, fontStyle: 'Bold', color: '#09090B', x: 80, y: 17 });

// SCREEN 18: Global Listing Catalog Approval
addStep('CREATE_FRAME', {
  name: 'GOLDEN / 18 - Listing Catalog Approval',
  width: 393, height: 852, x: BASE_X + COL_W * 8, y: BASE_Y + ROW_H,
  backgroundColor: '#FAFAFA', cornerRadius: 44, clipsContent: true
}, 's18');
addStep('CREATE_TEXT', { parentId: '$s18', text: 'CATALOG GOVERNANCE', fontSize: 11, fontStyle: 'SemiBold', color: '#B45309', x: 24, y: 60 });
addStep('CREATE_TEXT', { parentId: '$s18', text: 'Final Listing Publishing Gate', fontSize: 22, fontStyle: 'Bold', color: '#09090B', x: 24, y: 85 });
addStep('CREATE_FRAME', { parentId: '$s18', name: 'Card Publish', width: 345, height: 260, x: 24, y: 140, backgroundColor: '#FFFFFF', cornerRadius: 16 });
addStep('CREATE_RECTANGLE', { parentId: '$s18', name: 'Villa Thumb', width: 305, height: 140, x: 44, y: 160, imageUrl: IMAGES.villaPool, color: '#E4E4E7' });
addStep('CREATE_TEXT', { parentId: '$s18', text: 'The Glass Sanctuary Villa • $4,250,000 USD\nAudit Complete: Legal Title Verified • CAD 1:100 Approved\nStatus: READY FOR GLOBAL CLIENT FEED DISTRIBUTION', fontSize: 11, color: '#52525B', x: 44, y: 320 });
addStep('CREATE_FRAME', { parentId: '$s18', name: 'CTA / Publish Now', width: 345, height: 52, x: 24, y: 660, backgroundColor: '#09090B', cornerRadius: 12 }, 'btn_s18_publish');
addStep('CREATE_TEXT', { parentId: '$btn_s18_publish', text: 'Publish to Client Feed (Screen 04) →', fontSize: 14, fontStyle: 'Bold', color: '#FFFFFF', x: 55, y: 17 });
addStep('CREATE_FRAME', { parentId: '$s18', name: 'CTA / Loop Back', width: 345, height: 52, x: 24, y: 730, backgroundColor: '#F4F4F5', cornerRadius: 12 }, 'btn_s18_loop');
addStep('CREATE_TEXT', { parentId: '$btn_s18_loop', text: 'Return to Discover Feed ↺', fontSize: 14, fontStyle: 'Medium', color: '#09090B', x: 95, y: 17 });

async function run() {
  console.log(`🏗️ Generating 18 Golden Path Screens in Daylight Porcelain Light Theme & Full English...`);
  console.log(`Total Steps prepared: ${steps.length}`);

  // Delete previous golden screens if any to ensure clean generation
  console.log('🧹 Cleaning up previous golden frames...');
  const doc = await post('GET_DOCUMENT_INFO');
  if (doc.success && doc.data && doc.data.currentPage) {
    const existingGolden = doc.data.currentPage.children.filter(c => c.name.startsWith('GOLDEN /'));
    for (const g of existingGolden) {
      await post('DELETE_NODE', { nodeId: g.id });
    }
  }

  // Dispatch in chunks to avoid timeout
  const CHUNK_SIZE = 35;
  const chunkCount = Math.ceil(steps.length / CHUNK_SIZE);
  console.log(`🚀 Dispatching in ${chunkCount} chunks of ${CHUNK_SIZE} steps...`);

  const globalRefMap = {};

  for (let i = 0; i < steps.length; i += CHUNK_SIZE) {
    const chunk = steps.slice(i, i + CHUNK_SIZE);
    const chunkIdx = Math.floor(i / CHUNK_SIZE) + 1;
    console.log(`   Dispatching Chunk ${chunkIdx}/${chunkCount} (${chunk.length} steps)...`);
    const res = await post('BATCH_EXECUTE', { steps: chunk });
    if (!res.success) {
      console.error(`   ❌ Chunk ${chunkIdx} failed:`, res.error);
    } else if (res.data && res.data.refMap) {
      Object.assign(globalRefMap, res.data.refMap);
    }
  }

  fs.writeFileSync('golden-path-light-refs.json', JSON.stringify(globalRefMap, null, 2));
  console.log('🎉 18 Golden Path Daylight Light Screens generated successfully!');
  console.log(`Saved refs to golden-path-light-refs.json`);
}

run().catch(console.error);
