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

const steps = [];

function addStep(action, params, ref = null) {
  const item = { action, params, continueOnError: true };
  if (ref) item.ref = ref;
  steps.push(item);
}

// =============================================================================
// SCREEN 1: ADMIN / 01 - Platform Governance & Analytics (x: 7000, y: 0)
// =============================================================================
addStep('CREATE_FRAME', {
  name: 'ADMIN / 01 - Platform Governance',
  width: 1440, height: 900, x: 7000, y: 0,
  backgroundColor: '#090A0D', cornerRadius: 16, clipsContent: true
}, 'admin_01');

// Sidebar
addStep('CREATE_FRAME', {
  parentId: '$admin_01', name: 'Sidebar',
  width: 260, height: 900, x: 0, y: 0,
  backgroundColor: '#0D0F14'
}, 'admin_side');
addStep('CREATE_TEXT', { parentId: '$admin_side', text: 'ARKI', fontSize: 20, fontStyle: 'Bold', color: '#F4F4F5', x: 28, y: 36 });
addStep('CREATE_TEXT', { parentId: '$admin_side', text: 'PLATFORM GOVERNANCE', fontSize: 10, fontStyle: 'SemiBold', color: '#71717A', x: 28, y: 64 });

const navItemsAdmin = [
  { text: 'Overview & Metrics', y: 120, active: true },
  { text: 'RBAC & Directory', y: 168, active: false },
  { text: 'Listing Approvals', y: 216, active: false },
  { text: 'Escrow Treasury', y: 264, active: false },
  { text: 'Audit Security Logs', y: 312, active: false },
  { text: 'System Settings', y: 360, active: false }
];

navItemsAdmin.forEach(item => {
  addStep('CREATE_FRAME', {
    parentId: '$admin_side', name: `Nav / ${item.text}`,
    width: 204, height: 38, x: 28, y: item.y,
    backgroundColor: item.active ? '#161920' : '#0D0F14',
    cornerRadius: 8
  }, `admin_nav_${item.y}`);
  addStep('CREATE_TEXT', {
    parentId: `$admin_nav_${item.y}`, text: item.text,
    fontSize: 13, fontStyle: item.active ? 'SemiBold' : 'Regular',
    color: item.active ? '#F4F4F5' : '#8E919A', x: 14, y: 10
  });
});

// Admin Top Header
addStep('CREATE_FRAME', {
  parentId: '$admin_01', name: 'Top Header',
  width: 1180, height: 72, x: 260, y: 0,
  backgroundColor: '#0D0F14'
}, 'admin_header');
addStep('CREATE_TEXT', { parentId: '$admin_header', text: 'Global Platform Governance & Capital Overview', fontSize: 18, fontStyle: 'Bold', color: '#F4F4F5', x: 36, y: 26 });
addStep('CREATE_FRAME', {
  parentId: '$admin_header', name: 'Badge / Status',
  width: 170, height: 32, x: 800, y: 20,
  backgroundColor: '#161920', cornerRadius: 6
});
addStep('CREATE_TEXT', { parentId: '$admin_header', text: 'ENCLAVE SECURE • 99.98%', fontSize: 11, fontStyle: 'SemiBold', color: '#10B981', x: 812, y: 28 });
addStep('CREATE_TEXT', { parentId: '$admin_header', text: 'Alexander Vance • Super Admin', fontSize: 13, color: '#D4D4D8', x: 990, y: 27 });

// 4 KPI Bento Cards
const kpisAdmin = [
  { label: 'TOTAL OFF-MARKET ASSETS', value: '$148,500,000', change: '+12.4% MoM', x: 296 },
  { label: 'ESCROW TREASURY LOCK', value: '682.4 BTC ($42.8M)', change: 'Multi-Sig Active', x: 584 },
  { label: 'PENDING VIP ACCESS NDA', value: '14 Requests', change: '8 Verified Today', x: 872 },
  { label: 'FLIGHT LOGISTICS MISSIONS', value: '8 Scheduled', change: 'Bell 429 Ready', x: 1160 }
];

kpisAdmin.forEach((kpi, idx) => {
  addStep('CREATE_FRAME', {
    parentId: '$admin_01', name: `KPI / ${idx}`,
    width: 264, height: 110, x: kpi.x, y: 104,
    backgroundColor: '#111318', cornerRadius: 12
  }, `admin_kpi_${idx}`);
  addStep('CREATE_TEXT', { parentId: `$admin_kpi_${idx}`, text: kpi.label, fontSize: 10, fontStyle: 'SemiBold', color: '#71717A', x: 20, y: 18 });
  addStep('CREATE_TEXT', { parentId: `$admin_kpi_${idx}`, text: kpi.value, fontSize: 18, fontStyle: 'Bold', color: '#F4F4F5', x: 20, y: 44 });
  addStep('CREATE_TEXT', { parentId: `$admin_kpi_${idx}`, text: kpi.change, fontSize: 12, color: '#10B981', x: 20, y: 78 });
});

// Main Panel: Estate Approval Queue (x: 296, y: 242, w: 720, h: 620)
addStep('CREATE_FRAME', {
  parentId: '$admin_01', name: 'Listing Queue Panel',
  width: 720, height: 620, x: 296, y: 242,
  backgroundColor: '#111318', cornerRadius: 14
}, 'admin_panel_left');
addStep('CREATE_TEXT', { parentId: '$admin_panel_left', text: 'Off-Market Architectural Listing Approvals', fontSize: 15, fontStyle: 'Bold', color: '#F4F4F5', x: 24, y: 24 });
addStep('CREATE_TEXT', { parentId: '$admin_panel_left', text: 'Review museum-grade estates before releasing to Black Diamond Patrons', fontSize: 12, color: '#71717A', x: 24, y: 48 });

const listingRows = [
  { name: 'The Glass Sanctuary Villa', studio: 'Studio Tadao Ando', val: '$4,250,000', status: 'PENDING CAD AUDIT', y: 90 },
  { name: 'Cedar Pavilion Atrium', studio: 'Kengo Kuma & Assoc.', val: '$3,800,000', status: 'READY FOR RELEASE', y: 180 },
  { name: 'Brutalist Cliff Monolith', studio: 'Zaha Hadid Architects', val: '$8,900,000', status: 'LEGAL VERIFIED', y: 270 },
  { name: 'Biophilic Rainforest Pavilion', studio: 'Vo Trong Nghia Architects', val: '$2,750,000', status: 'NDA RESTRICTED', y: 360 }
];

listingRows.forEach((row, i) => {
  addStep('CREATE_FRAME', {
    parentId: '$admin_panel_left', name: `Row / ${i}`,
    width: 672, height: 72, x: 24, y: row.y,
    backgroundColor: '#161920', cornerRadius: 10
  }, `listing_row_${i}`);
  addStep('CREATE_TEXT', { parentId: `$listing_row_${i}`, text: row.name, fontSize: 14, fontStyle: 'Bold', color: '#F4F4F5', x: 18, y: 16 });
  addStep('CREATE_TEXT', { parentId: `$listing_row_${i}`, text: `${row.studio} • Valuation: ${row.val}`, fontSize: 12, color: '#A1A1AA', x: 18, y: 40 });
  addStep('CREATE_FRAME', {
    parentId: `$listing_row_${i}`, name: 'Status Tag',
    width: 140, height: 28, x: 380, y: 22,
    backgroundColor: '#20242D', cornerRadius: 6
  });
  addStep('CREATE_TEXT', { parentId: `$listing_row_${i}`, text: row.status, fontSize: 10, fontStyle: 'SemiBold', color: '#D4D4D8', x: 390, y: 30 });
  addStep('CREATE_BUTTON', {
    parentId: `$listing_row_${i}`, name: 'Btn / Approve',
    text: 'Approve Release', backgroundColor: '#F4F4F5', textColor: '#090A0D',
    x: 535, y: 18
  });
});

// Right Panel: Audit Logs & Escrow Multi-Sig (x: 1040, y: 242, w: 364, h: 620)
addStep('CREATE_FRAME', {
  parentId: '$admin_01', name: 'Escrow Multi-Sig Stream',
  width: 364, height: 620, x: 1040, y: 242,
  backgroundColor: '#111318', cornerRadius: 14
}, 'admin_panel_right');
addStep('CREATE_TEXT', { parentId: '$admin_panel_right', text: 'Audit Log & Enclave Stream', fontSize: 15, fontStyle: 'Bold', color: '#F4F4F5', x: 24, y: 24 });

const auditEvents = [
  { action: 'Session #ARK-SEC-992 Issued', user: 'Alexander Vance • FaceID', time: '2m ago', y: 70 },
  { action: 'Smart Contract Escrow Locked', user: '68.2 BTC • Multi-Sig 3/5', time: '14m ago', y: 150 },
  { action: 'Bell 429 Slot Approved', user: 'Son Tra Helipad ESE 108°', time: '38m ago', y: 230 },
  { action: 'Modification Request #MOD-04', user: '+4m Pool • Tadao Ando Studio', time: '1h ago', y: 310 },
  { action: 'Role Updated: Escrow Specialist', user: 'Elena Rostova • Clearance L3', time: '2h ago', y: 390 }
];

auditEvents.forEach((ev, i) => {
  addStep('CREATE_FRAME', {
    parentId: '$admin_panel_right', name: `Log / ${i}`,
    width: 316, height: 64, x: 24, y: ev.y,
    backgroundColor: '#161920', cornerRadius: 8
  }, `audit_log_${i}`);
  addStep('CREATE_TEXT', { parentId: `$audit_log_${i}`, text: ev.action, fontSize: 12, fontStyle: 'SemiBold', color: '#F4F4F5', x: 14, y: 14 });
  addStep('CREATE_TEXT', { parentId: `$audit_log_${i}`, text: `${ev.user} (${ev.time})`, fontSize: 11, color: '#71717A', x: 14, y: 36 });
});


// =============================================================================
// SCREEN 2: ADMIN / 02 - RBAC & User Management (x: 8600, y: 0)
// =============================================================================
addStep('CREATE_FRAME', {
  name: 'ADMIN / 02 - RBAC Management',
  width: 1440, height: 900, x: 8600, y: 0,
  backgroundColor: '#090A0D', cornerRadius: 16, clipsContent: true
}, 'admin_02');

// Sidebar (Clone)
addStep('CREATE_FRAME', {
  parentId: '$admin_02', name: 'Sidebar',
  width: 260, height: 900, x: 0, y: 0,
  backgroundColor: '#0D0F14'
}, 'admin_side_02');
addStep('CREATE_TEXT', { parentId: '$admin_side_02', text: 'ARKI', fontSize: 20, fontStyle: 'Bold', color: '#F4F4F5', x: 28, y: 36 });
addStep('CREATE_TEXT', { parentId: '$admin_side_02', text: 'PLATFORM GOVERNANCE', fontSize: 10, fontStyle: 'SemiBold', color: '#71717A', x: 28, y: 64 });

navItemsAdmin.forEach(item => {
  const isTarget = item.text === 'RBAC & Directory';
  addStep('CREATE_FRAME', {
    parentId: '$admin_side_02', name: `Nav / ${item.text}`,
    width: 204, height: 38, x: 28, y: item.y,
    backgroundColor: isTarget ? '#161920' : '#0D0F14',
    cornerRadius: 8
  }, `admin02_nav_${item.y}`);
  addStep('CREATE_TEXT', {
    parentId: `$admin02_nav_${item.y}`, text: item.text,
    fontSize: 13, fontStyle: isTarget ? 'SemiBold' : 'Regular',
    color: isTarget ? '#F4F4F5' : '#8E919A', x: 14, y: 10
  });
});

// Top Header
addStep('CREATE_FRAME', {
  parentId: '$admin_02', name: 'Top Header',
  width: 1180, height: 72, x: 260, y: 0,
  backgroundColor: '#0D0F14'
}, 'admin02_header');
addStep('CREATE_TEXT', { parentId: '$admin02_header', text: 'Role-Based Access Control & User Directory (3 Tiers)', fontSize: 18, fontStyle: 'Bold', color: '#F4F4F5', x: 36, y: 26 });
addStep('CREATE_BUTTON', { parentId: '$admin02_header', name: 'Btn / Add Member', text: 'Invite Staff Specialist', backgroundColor: '#F4F4F5', textColor: '#090A0D', x: 990, y: 18 });

// Filter Tabs
const filterTabs = ['All Users (1,248)', 'Platform Admins (4)', 'Staff & Specialists (28)', 'VIP Clients (312)', 'Patrons (42)'];
filterTabs.forEach((tab, idx) => {
  addStep('CREATE_FRAME', {
    parentId: '$admin_02', name: `Tab / ${idx}`,
    width: 160, height: 36, x: 296 + idx * 170, y: 96,
    backgroundColor: idx === 0 ? '#161920' : '#111318',
    cornerRadius: 8
  }, `tab_${idx}`);
  addStep('CREATE_TEXT', { parentId: `$tab_${idx}`, text: tab, fontSize: 12, fontStyle: idx === 0 ? 'SemiBold' : 'Regular', color: idx === 0 ? '#F4F4F5' : '#8E919A', x: 14, y: 10 });
});

// Directory Table (w: 1108, h: 700)
addStep('CREATE_FRAME', {
  parentId: '$admin_02', name: 'Directory Table Panel',
  width: 1108, height: 700, x: 296, y: 154,
  backgroundColor: '#111318', cornerRadius: 14
}, 'table_panel');

const tableRows = [
  { name: 'Alexander Vance', role: 'UHNW Patron (ACT-03)', group: 'Tier 3 Client', clearance: 'Full Off-Market & Sotheby’s', status: 'ACTIVE', y: 30 },
  { name: 'Studio Tadao Ando', role: 'Lead Architect (ACT-04)', group: 'Staff Specialist', clearance: 'Studio CAD & Live Video', status: 'VERIFIED', y: 120 },
  { name: 'Marcus Sterling', role: 'VIP Concierge (ACT-05)', group: 'Staff Operations', clearance: 'Aviation Dispatch & PassKit', status: 'ON DUTY', y: 210 },
  { name: 'Elena Rostova', role: 'Escrow Officer (ACT-06)', group: 'Staff Finance', clearance: 'Multi-Sig Keyholder 3/5', status: 'ACTIVE', y: 300 },
  { name: 'Jonathan Thorne', role: 'Guest Observer (ACT-01)', group: 'Tier 1 Public', clearance: 'Public Catalog Only', status: 'PENDING KYC', y: 390 },
  { name: 'Clara Beaumont', role: 'VIP Buyer (ACT-02)', group: 'Tier 2 Client', clearance: 'NDA Signed • GPS Access', status: 'ACTIVE', y: 480 }
];

tableRows.forEach((row, i) => {
  addStep('CREATE_FRAME', {
    parentId: '$table_panel', name: `TRow / ${i}`,
    width: 1060, height: 72, x: 24, y: row.y,
    backgroundColor: '#161920', cornerRadius: 10
  }, `trow_${i}`);
  addStep('CREATE_TEXT', { parentId: `$trow_${i}`, text: row.name, fontSize: 14, fontStyle: 'Bold', color: '#F4F4F5', x: 24, y: 16 });
  addStep('CREATE_TEXT', { parentId: `$trow_${i}`, text: `${row.role} • ${row.group}`, fontSize: 12, color: '#A1A1AA', x: 24, y: 40 });
  addStep('CREATE_TEXT', { parentId: `$trow_${i}`, text: row.clearance, fontSize: 12, color: '#D4D4D8', x: 380, y: 28 });
  addStep('CREATE_FRAME', {
    parentId: `$trow_${i}`, name: 'Status Pill',
    width: 120, height: 28, x: 740, y: 22,
    backgroundColor: '#20242D', cornerRadius: 6
  });
  addStep('CREATE_TEXT', { parentId: `$trow_${i}`, text: row.status, fontSize: 11, fontStyle: 'SemiBold', color: '#10B981', x: 752, y: 28 });
  addStep('CREATE_BUTTON', {
    parentId: `$trow_${i}`, name: 'Btn / Edit Perms',
    text: 'Manage RBAC', backgroundColor: '#262A35', textColor: '#F4F4F5',
    x: 900, y: 18
  });
});


// =============================================================================
// SCREEN 3: STAFF / 01 - Concierge Logistics Board (x: 7000, y: 1060)
// =============================================================================
addStep('CREATE_FRAME', {
  name: 'STAFF / 01 - Concierge Logistics Board',
  width: 1440, height: 900, x: 7000, y: 1060,
  backgroundColor: '#090A0D', cornerRadius: 16, clipsContent: true
}, 'staff_01');

// Staff Sidebar
addStep('CREATE_FRAME', {
  parentId: '$staff_01', name: 'Sidebar',
  width: 260, height: 900, x: 0, y: 0,
  backgroundColor: '#0D0F14'
}, 'staff_side');
addStep('CREATE_TEXT', { parentId: '$staff_side', text: 'ARKI', fontSize: 20, fontStyle: 'Bold', color: '#F4F4F5', x: 28, y: 36 });
addStep('CREATE_TEXT', { parentId: '$staff_side', text: 'OPERATIONS WORKSPACE', fontSize: 10, fontStyle: 'SemiBold', color: '#71717A', x: 28, y: 64 });

const navItemsStaff = [
  { text: 'Concierge Dispatch', y: 120, active: true },
  { text: 'Architect CAD Studio', y: 168, active: false },
  { text: 'Escrow & Legal', y: 216, active: false },
  { text: 'Client Consultations', y: 264, active: false },
  { text: 'Heli-pad / Marina Radar', y: 312, active: false }
];

navItemsStaff.forEach(item => {
  addStep('CREATE_FRAME', {
    parentId: '$staff_side', name: `Nav / ${item.text}`,
    width: 204, height: 38, x: 28, y: item.y,
    backgroundColor: item.active ? '#161920' : '#0D0F14',
    cornerRadius: 8
  }, `staff_nav_${item.y}`);
  addStep('CREATE_TEXT', {
    parentId: `$staff_nav_${item.y}`, text: item.text,
    fontSize: 13, fontStyle: item.active ? 'SemiBold' : 'Regular',
    color: item.active ? '#F4F4F5' : '#8E919A', x: 14, y: 10
  });
});

// Top Header
addStep('CREATE_FRAME', {
  parentId: '$staff_01', name: 'Top Header',
  width: 1180, height: 72, x: 260, y: 0,
  backgroundColor: '#0D0F14'
}, 'staff01_header');
addStep('CREATE_TEXT', { parentId: '$staff01_header', text: 'VIP Concierge Dispatch & Flight Logistics Board', fontSize: 18, fontStyle: 'Bold', color: '#F4F4F5', x: 36, y: 26 });
addStep('CREATE_TEXT', { parentId: '$staff01_header', text: 'Marcus Sterling • Chief Concierge (Duty)', fontSize: 13, color: '#D4D4D8', x: 890, y: 27 });

// 3 Kanban Dispatch Columns
const kanbanCols = [
  { title: 'PENDING CLIENT MISSIONS (3)', x: 296, items: [
    { client: 'Alexander Vance', estate: 'The Glass Sanctuary', trans: 'Helicopter Bell 429', time: 'Fri, 16 Oct 2026 • 14:30', pass: '#ARK-8821' },
    { client: 'Lady Genevieve', estate: 'Cedar Pavilion', trans: 'Sunseeker Yacht', time: 'Sat, 17 Oct 2026 • 10:00', pass: '#ARK-8825' }
  ]},
  { title: 'FLIGHT CLEARED & PASS ISSUED (4)', x: 672, items: [
    { client: 'Viktor Lindqvist', estate: 'Brutalist Monolith', trans: 'Rolls-Royce Phantom', time: 'Thu, 15 Oct 2026 • 16:00', pass: '#ARK-8819' },
    { client: 'Amara Al-Mansoor', estate: 'Oceanfront Glass House', trans: 'Helicopter Bell 429', time: 'Fri, 16 Oct 2026 • 11:30', pass: '#ARK-8820' }
  ]},
  { title: 'MARINA & RADAR MONITOR (2)', x: 1048, items: [
    { client: 'Son Tra Helipad ESE 108°', estate: 'Wind 12 kts • Visibility 10km', trans: 'Status: ALL CLEAR', time: 'Ready for Touchdown', pass: 'HELI-OK' },
    { client: 'Sunseeker Marina Pier 02', estate: 'Tide +0.8m • Sea Calm', trans: 'Status: BERTH SECURED', time: 'Arrival 14:15', pass: 'DOCK-OK' }
  ]}
];

kanbanCols.forEach((col, colIdx) => {
  addStep('CREATE_FRAME', {
    parentId: '$staff_01', name: `Col / ${colIdx}`,
    width: 356, height: 780, x: col.x, y: 96,
    backgroundColor: '#111318', cornerRadius: 14
  }, `kcol_${colIdx}`);
  addStep('CREATE_TEXT', { parentId: `$kcol_${colIdx}`, text: col.title, fontSize: 12, fontStyle: 'Bold', color: '#71717A', x: 20, y: 20 });

  col.items.forEach((it, itIdx) => {
    addStep('CREATE_FRAME', {
      parentId: `$kcol_${colIdx}`, name: `Card / ${itIdx}`,
      width: 316, height: 160, x: 20, y: 60 + itIdx * 180,
      backgroundColor: '#161920', cornerRadius: 10
    }, `kcard_${colIdx}_${itIdx}`);
    addStep('CREATE_TEXT', { parentId: `$kcard_${colIdx}_${itIdx}`, text: it.client, fontSize: 14, fontStyle: 'Bold', color: '#F4F4F5', x: 16, y: 16 });
    addStep('CREATE_TEXT', { parentId: `$kcard_${colIdx}_${itIdx}`, text: it.estate, fontSize: 12, color: '#A1A1AA', x: 16, y: 38 });
    addStep('CREATE_TEXT', { parentId: `$kcard_${colIdx}_${itIdx}`, text: it.trans, fontSize: 12, fontStyle: 'SemiBold', color: '#10B981', x: 16, y: 64 });
    addStep('CREATE_TEXT', { parentId: `$kcard_${colIdx}_${itIdx}`, text: it.time, fontSize: 11, color: '#71717A', x: 16, y: 88 });
    addStep('CREATE_BUTTON', {
      parentId: `$kcard_${colIdx}_${itIdx}`, name: 'Btn / Approve Dispatch',
      text: `Dispatch Pass ${it.pass}`, backgroundColor: '#F4F4F5', textColor: '#090A0D',
      x: 16, y: 112
    });
  });
});


// =============================================================================
// SCREEN 4: STAFF / 02 - Architect Studio CAD Workbench (x: 8600, y: 1060)
// =============================================================================
addStep('CREATE_FRAME', {
  name: 'STAFF / 02 - Architect Studio Workbench',
  width: 1440, height: 900, x: 8600, y: 1060,
  backgroundColor: '#090A0D', cornerRadius: 16, clipsContent: true
}, 'staff_02');

// Sidebar (Clone)
addStep('CREATE_FRAME', {
  parentId: '$staff_02', name: 'Sidebar',
  width: 260, height: 900, x: 0, y: 0,
  backgroundColor: '#0D0F14'
}, 'staff02_side');
addStep('CREATE_TEXT', { parentId: '$staff02_side', text: 'ARKI', fontSize: 20, fontStyle: 'Bold', color: '#F4F4F5', x: 28, y: 36 });
addStep('CREATE_TEXT', { parentId: '$staff02_side', text: 'OPERATIONS WORKSPACE', fontSize: 10, fontStyle: 'SemiBold', color: '#71717A', x: 28, y: 64 });

navItemsStaff.forEach(item => {
  const isTarget = item.text === 'Architect CAD Studio';
  addStep('CREATE_FRAME', {
    parentId: '$staff02_side', name: `Nav / ${item.text}`,
    width: 204, height: 38, x: 28, y: item.y,
    backgroundColor: isTarget ? '#161920' : '#0D0F14',
    cornerRadius: 8
  }, `staff02_nav_${item.y}`);
  addStep('CREATE_TEXT', {
    parentId: `$staff02_nav_${item.y}`, text: item.text,
    fontSize: 13, fontStyle: isTarget ? 'SemiBold' : 'Regular',
    color: isTarget ? '#F4F4F5' : '#8E919A', x: 14, y: 10
  });
});

// Top Header
addStep('CREATE_FRAME', {
  parentId: '$staff_02', name: 'Top Header',
  width: 1180, height: 72, x: 260, y: 0,
  backgroundColor: '#0D0F14'
}, 'staff02_header');
addStep('CREATE_TEXT', { parentId: '$staff02_header', text: 'Studio Tadao Ando • CAD Blueprint & Modification Review', fontSize: 18, fontStyle: 'Bold', color: '#F4F4F5', x: 36, y: 26 });
addStep('CREATE_BUTTON', { parentId: '$staff02_header', name: 'Btn / Live Call', text: 'Start Live Video Session', backgroundColor: '#F4F4F5', textColor: '#090A0D', x: 960, y: 18 });

// Left Main CAD Blueprint Viewer (w: 740, h: 780)
addStep('CREATE_FRAME', {
  parentId: '$staff_02', name: 'CAD Blueprint Canvas',
  width: 740, height: 780, x: 296, y: 96,
  backgroundColor: '#0B0D12', cornerRadius: 14
}, 'cad_canvas');
addStep('CREATE_TEXT', { parentId: '$cad_canvas', text: 'BLUEPRINT LEVEL 1 — THE GLASS SANCTUARY (1:100 SCALE)', fontSize: 12, fontStyle: 'Bold', color: '#71717A', x: 24, y: 20 });
addStep('CREATE_TEXT', { parentId: '$cad_canvas', text: 'GRID: 1200mm • CANTILEVER TOLERANCE: 4200mm • CONCRETE: B35 LOW-SLUMP', fontSize: 10, color: '#52525B', x: 24, y: 40 });

// Simulated CAD grid elements
addStep('CREATE_FRAME', {
  parentId: '$cad_canvas', name: 'Living Atrium 7.2m',
  width: 420, height: 320, x: 40, y: 80,
  backgroundColor: '#11141D', cornerRadius: 8
});
addStep('CREATE_TEXT', { parentId: '$cad_canvas', text: 'GREAT HALL ATRIUM (7.2m CEILING)\nAREA: 240 m²\nSTRUCTURAL CONCRETE COLUMNS: 4x 800mm', fontSize: 12, fontStyle: 'Bold', color: '#93C5FD', x: 60, y: 110 });

addStep('CREATE_FRAME', {
  parentId: '$cad_canvas', name: 'Proposed +4m Pool Cantilever',
  width: 580, height: 180, x: 40, y: 440,
  backgroundColor: '#131C2E', cornerRadius: 8
});
addStep('CREATE_TEXT', { parentId: '$cad_canvas', text: 'PROPOSED EXTENSION: +4.00m CANTILEVER OVER CLIFF FACE\nENGINEERING STATUS: POST-TENSIONED TENDONS REQUIRED (T3-T8)\nHYDRAULIC LOAD: 380,000 LITERS SALTWATER', fontSize: 12, fontStyle: 'Bold', color: '#38BDF8', x: 60, y: 470 });

// Right Panel: Modification Request Docket (w: 348, h: 780)
addStep('CREATE_FRAME', {
  parentId: '$staff_02', name: 'Modification Docket Panel',
  width: 348, height: 780, x: 1056, y: 96,
  backgroundColor: '#111318', cornerRadius: 14
}, 'mod_docket');
addStep('CREATE_TEXT', { parentId: '$mod_docket', text: 'Client Modification Docket #MOD-04', fontSize: 15, fontStyle: 'Bold', color: '#F4F4F5', x: 20, y: 20 });
addStep('CREATE_TEXT', { parentId: '$mod_docket', text: 'Requester: Alexander Vance (Black Diamond #004)\nProperty: The Glass Sanctuary Villa', fontSize: 12, color: '#A1A1AA', x: 20, y: 48 });

addStep('CREATE_FRAME', {
  parentId: '$mod_docket', name: 'Detail Card 1',
  width: 308, height: 160, x: 20, y: 110,
  backgroundColor: '#161920', cornerRadius: 10
}, 'docket_card_1');
addStep('CREATE_TEXT', { parentId: '$docket_card_1', text: 'Proposed Modification 1:', fontSize: 11, fontStyle: 'SemiBold', color: '#71717A', x: 16, y: 16 });
addStep('CREATE_TEXT', { parentId: '$docket_card_1', text: 'Extend 35m Saltwater Pool by +4m over sea cliff edge.', fontSize: 13, fontStyle: 'Bold', color: '#F4F4F5', x: 16, y: 38 });
addStep('CREATE_TEXT', { parentId: '$docket_card_1', text: 'Structural Audit: FEASIBLE\nEstimated Annex Cost: +$480,000 USD\nAdded Construction Time: +6 Weeks', fontSize: 11, color: '#10B981', x: 16, y: 80 });

addStep('CREATE_FRAME', {
  parentId: '$mod_docket', name: 'Detail Card 2',
  width: 308, height: 160, x: 20, y: 290,
  backgroundColor: '#161920', cornerRadius: 10
}, 'docket_card_2');
addStep('CREATE_TEXT', { parentId: '$docket_card_2', text: 'Proposed Modification 2:', fontSize: 11, fontStyle: 'SemiBold', color: '#71717A', x: 16, y: 16 });
addStep('CREATE_TEXT', { parentId: '$docket_card_2', text: 'Install Low-E UV Acoustic Glazing for Museum Art Gallery.', fontSize: 13, fontStyle: 'Bold', color: '#F4F4F5', x: 16, y: 38 });
addStep('CREATE_TEXT', { parentId: '$docket_card_2', text: 'UV Blocking: 99.8% (Sotheby\'s Spec)\nEstimated Annex Cost: +$140,000 USD\nSupplier: Guardian Glass Switzerland', fontSize: 11, color: '#10B981', x: 16, y: 80 });

addStep('CREATE_BUTTON', {
  parentId: '$mod_docket', name: 'Btn / Approve Modification',
  text: 'Approve Architectural Annex', backgroundColor: '#F4F4F5', textColor: '#090A0D',
  x: 20, y: 480
});

addStep('CREATE_BUTTON', {
  parentId: '$mod_docket', name: 'Btn / Request Revision',
  text: 'Request Engineering Revision', backgroundColor: '#20242D', textColor: '#D4D4D8',
  x: 20, y: 536
});

console.log(`Generated ${steps.length} batch steps for Admin & Staff Workspaces!`);

async function run() {
  console.log('🚀 Dispatching Admin & Staff Workspace Screens to Figma Canvas via Bridge...');
  const res = await post('BATCH_EXECUTE', { steps });
  console.log('Result:', JSON.stringify(res, null, 2));
}

run().catch(console.error);
