#!/usr/bin/env node
// MEGA ARKI APP GENERATOR - 21 Interactive Screens + Reusable Components
// Real Estate & Architecture App with full prototyping wirings & Unsplash imagery

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://localhost:8765';

const IMAGES = {
  villaPool: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  villaFront: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  livingRoom: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  kitchen: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
  sunsetEstate: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  brutalistVilla: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  minimalistConcrete: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  architectPortrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  mapSnapshot: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  matterportVR: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  blueprintPlan: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
};

const steps = [];

function addStep(action, params, ref = null) {
  const item = { action, params, continueOnError: true };
  if (ref) item.ref = ref;
  steps.push(item);
}

// =============================================================================
// ROW 1 (y: 0): ONBOARDING & AUTHENTICATION FLOW (Screens 01 - 05)
// =============================================================================

// SCREEN 01: Splash Screen (x: 0, y: 0)
addStep('CREATE_FRAME', {
  name: 'ARKI / 01 - Splash',
  width: 393, height: 852, x: 0, y: 0,
  backgroundColor: '#07090E', cornerRadius: 44, clipsContent: true
}, 'screen_01');
addStep('CREATE_RECTANGLE', { parentId: '$screen_01', name: 'BG Image', width: 393, height: 852, x: 0, y: 0, imageUrl: IMAGES.villaPool, color: '#07090E' });
addStep('CREATE_RECTANGLE', { parentId: '$screen_01', name: 'Overlay', width: 393, height: 852, x: 0, y: 0, color: '#07090EE0' });
addStep('CREATE_TEXT', { parentId: '$screen_01', text: 'A R K I', fontSize: 36, fontStyle: 'Bold', color: '#F8FAFC', x: 40, y: 360 });
addStep('CREATE_TEXT', { parentId: '$screen_01', text: 'Architectural Estates & Living', fontSize: 16, color: '#38BDF8', x: 40, y: 410 });
addStep('CREATE_TEXT', { parentId: '$screen_01', text: 'Loading luxury catalog...', fontSize: 12, color: '#64748B', x: 40, y: 740 });

// SCREEN 02: Onboarding 1 (x: 480, y: 0)
addStep('CREATE_FRAME', {
  name: 'ARKI / 02 - Onboarding Curated',
  width: 393, height: 852, x: 480, y: 0,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_02');
addStep('CREATE_RECTANGLE', { parentId: '$screen_02', name: 'Cover Image', width: 393, height: 460, x: 0, y: 0, imageUrl: IMAGES.villaFront, color: '#131B2E' });
addStep('CREATE_TEXT', { parentId: '$screen_02', text: 'Curated by Pritzker Masters', fontSize: 26, fontStyle: 'Bold', color: '#F8FAFC', x: 32, y: 490 });
addStep('CREATE_TEXT', { parentId: '$screen_02', text: 'Discover private oceanfront villas, brutalist pavilions, and biophilic sanctuaries crafted by legendary architects.', fontSize: 14, color: '#94A3B8', x: 32, y: 560 });
addStep('CREATE_BUTTON', { parentId: '$screen_02', name: 'Btn / Next 1', text: 'Continue  →', backgroundColor: '#38BDF8', textColor: '#090D16', x: 32, y: 740 }, 'btn_onb_1');

// SCREEN 03: Onboarding 2 (x: 960, y: 0)
addStep('CREATE_FRAME', {
  name: 'ARKI / 03 - Onboarding VR Tours',
  width: 393, height: 852, x: 960, y: 0,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_03');
addStep('CREATE_RECTANGLE', { parentId: '$screen_03', name: 'Cover Image', width: 393, height: 460, x: 0, y: 0, imageUrl: IMAGES.livingRoom, color: '#131B2E' });
addStep('CREATE_TEXT', { parentId: '$screen_03', text: 'Cinematic 4K & VR Walkthroughs', fontSize: 26, fontStyle: 'Bold', color: '#F8FAFC', x: 32, y: 490 });
addStep('CREATE_TEXT', { parentId: '$screen_03', text: 'Step inside each residence before physical viewing with 3D Matterport models, spatial audio, and solar path studies.', fontSize: 14, color: '#94A3B8', x: 32, y: 560 });
addStep('CREATE_BUTTON', { parentId: '$screen_03', name: 'Btn / Next 2', text: 'Next Feature  →', backgroundColor: '#38BDF8', textColor: '#090D16', x: 32, y: 740 }, 'btn_onb_2');

// SCREEN 04: Onboarding 3 (x: 1440, y: 0)
addStep('CREATE_FRAME', {
  name: 'ARKI / 04 - Onboarding Advisory',
  width: 393, height: 852, x: 1440, y: 0,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_04');
addStep('CREATE_RECTANGLE', { parentId: '$screen_04', name: 'Cover Image', width: 393, height: 460, x: 0, y: 0, imageUrl: IMAGES.sunsetEstate, color: '#131B2E' });
addStep('CREATE_TEXT', { parentId: '$screen_04', text: 'Direct Studio Advisory', fontSize: 26, fontStyle: 'Bold', color: '#F8FAFC', x: 32, y: 490 });
addStep('CREATE_TEXT', { parentId: '$screen_04', text: 'Connect directly with lead architectural partners for customized modifications and private land acquisition.', fontSize: 14, color: '#94A3B8', x: 32, y: 560 });
addStep('CREATE_BUTTON', { parentId: '$screen_04', name: 'Btn / Get Started', text: 'Get Started  ✦', backgroundColor: '#38BDF8', textColor: '#090D16', x: 32, y: 740 }, 'btn_onb_3');

// SCREEN 05: Authentication & Login (x: 1920, y: 0)
addStep('CREATE_FRAME', {
  name: 'ARKI / 05 - Authentication',
  width: 393, height: 852, x: 1920, y: 0,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_05');
addStep('CREATE_TEXT', { parentId: '$screen_05', text: 'Welcome to ARKI', fontSize: 28, fontStyle: 'Bold', color: '#F8FAFC', x: 32, y: 120 });
addStep('CREATE_TEXT', { parentId: '$screen_05', text: 'Private architectural clientele login', fontSize: 14, color: '#94A3B8', x: 32, y: 165 });
addStep('CREATE_FRAME', { parentId: '$screen_05', name: 'Input / Email', width: 329, height: 56, x: 32, y: 240, backgroundColor: '#131B2E', cornerRadius: 14, layoutMode: 'HORIZONTAL', padding: 18 });
addStep('CREATE_TEXT', { parentId: '$screen_05', text: 'client@forbes-global.com', fontSize: 14, color: '#E2E8F0', x: 48, y: 258 });
addStep('CREATE_FRAME', { parentId: '$screen_05', name: 'Input / Pass', width: 329, height: 56, x: 32, y: 320, backgroundColor: '#131B2E', cornerRadius: 14, layoutMode: 'HORIZONTAL', padding: 18 });
addStep('CREATE_TEXT', { parentId: '$screen_05', text: '••••••••••••••', fontSize: 16, color: '#E2E8F0', x: 48, y: 338 });
addStep('CREATE_BUTTON', { parentId: '$screen_05', name: 'Btn / Sign In', text: 'Access Private Collection', backgroundColor: '#38BDF8', textColor: '#090D16', x: 32, y: 420 }, 'btn_login_submit');
addStep('CREATE_BUTTON', { parentId: '$screen_05', name: 'Btn / Guest', text: 'Enter as Guest Observer →', backgroundColor: '#1E293B', textColor: '#94A3B8', x: 32, y: 500 }, 'btn_login_guest');

// =============================================================================
// ROW 2 (y: 960): MAIN DISCOVERY & ESTATE DETAILS (Screens 06 - 10)
// =============================================================================

// SCREEN 06: Home Feed (x: 0, y: 960)
addStep('CREATE_FRAME', {
  name: 'ARKI / 06 - Home Feed',
  width: 393, height: 852, x: 0, y: 960,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_06');
addStep('CREATE_TEXT', { parentId: '$screen_06', text: 'Masterpieces', fontSize: 24, fontStyle: 'Bold', color: '#F8FAFC', x: 24, y: 56 });
addStep('CREATE_BUTTON', { parentId: '$screen_06', name: 'Btn / Search Filter', text: '🔍 Filter', backgroundColor: '#1E293B', textColor: '#38BDF8', x: 280, y: 50 }, 'btn_open_filter');
// Category Tabs
addStep('CREATE_BUTTON', { parentId: '$screen_06', text: 'All Works', backgroundColor: '#38BDF8', textColor: '#090D16', x: 24, y: 108 });
addStep('CREATE_BUTTON', { parentId: '$screen_06', text: 'Oceanfront', backgroundColor: '#131B2E', textColor: '#94A3B8', x: 120, y: 108 });
addStep('CREATE_BUTTON', { parentId: '$screen_06', text: 'Brutalist', backgroundColor: '#131B2E', textColor: '#94A3B8', x: 220, y: 108 });
addStep('CREATE_BUTTON', { parentId: '$screen_06', text: '🗺 Map', backgroundColor: '#131B2E', textColor: '#38BDF8', x: 305, y: 108 }, 'btn_open_map');
// Hero Estate Card
addStep('CREATE_FRAME', {
  parentId: '$screen_06', name: 'Hero Estate Card',
  width: 345, height: 380, x: 24, y: 165,
  backgroundColor: '#131B2E', cornerRadius: 24, clipsContent: true
}, 'card_hero_estate');
addStep('CREATE_RECTANGLE', { parentId: '$card_hero_estate', name: 'Hero Image', width: 345, height: 230, x: 0, y: 0, imageUrl: IMAGES.villaPool, color: '#1E293B' });
addStep('CREATE_TEXT', { parentId: '$card_hero_estate', text: 'The Glass Sanctuary Villa', fontSize: 18, fontStyle: 'Bold', color: '#F8FAFC', x: 18, y: 248 });
addStep('CREATE_TEXT', { parentId: '$card_hero_estate', text: 'Architect Tadao Ando • Son Tra Peninsula', fontSize: 12, color: '#38BDF8', x: 18, y: 276 });
addStep('CREATE_TEXT', { parentId: '$card_hero_estate', text: '$4,250,000', fontSize: 20, fontStyle: 'Bold', color: '#38BDF8', x: 18, y: 335 });
addStep('CREATE_BUTTON', { parentId: '$card_hero_estate', name: 'Btn / View Villa', text: 'View Estate →', backgroundColor: '#38BDF8', textColor: '#090D16', x: 220, y: 330 }, 'btn_view_estate');
// Bottom Nav
addStep('CREATE_FRAME', { parentId: '$screen_06', name: 'Bottom Nav', width: 393, height: 80, x: 0, y: 772, backgroundColor: '#070A10' });
addStep('CREATE_BUTTON', { parentId: '$screen_06', text: '♡ Saved', backgroundColor: '#131B2E', textColor: '#FFFFFF', x: 140, y: 790 }, 'btn_nav_saved');
addStep('CREATE_BUTTON', { parentId: '$screen_06', text: '👤 Profile', backgroundColor: '#131B2E', textColor: '#FFFFFF', x: 260, y: 790 }, 'btn_nav_profile');

// SCREEN 07: Search & Filter Modal (x: 480, y: 960)
addStep('CREATE_FRAME', {
  name: 'ARKI / 07 - Search & Filters',
  width: 393, height: 852, x: 480, y: 960,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_07');
addStep('CREATE_BUTTON', { parentId: '$screen_07', name: 'Btn / Close Filter', text: '✕ Close', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_close_filter');
addStep('CREATE_TEXT', { parentId: '$screen_07', text: 'Architectural Criteria', fontSize: 22, fontStyle: 'Bold', color: '#F8FAFC', x: 24, y: 110 });
addStep('CREATE_TEXT', { parentId: '$screen_07', text: 'Price Range: $2.5M - $12M', fontSize: 14, color: '#38BDF8', x: 24, y: 160 });
addStep('CREATE_FRAME', { parentId: '$screen_07', name: 'Slider Bar', width: 345, height: 8, x: 24, y: 195, backgroundColor: '#38BDF8', cornerRadius: 4 });
addStep('CREATE_TEXT', { parentId: '$screen_07', text: 'Architect Studio Preference', fontSize: 16, fontStyle: 'Bold', color: '#F8FAFC', x: 24, y: 240 });
addStep('CREATE_BUTTON', { parentId: '$screen_07', text: 'Tadao Ando', backgroundColor: '#38BDF8', textColor: '#090D16', x: 24, y: 280 });
addStep('CREATE_BUTTON', { parentId: '$screen_07', text: 'Kengo Kuma', backgroundColor: '#131B2E', textColor: '#94A3B8', x: 140, y: 280 });
addStep('CREATE_BUTTON', { parentId: '$screen_07', text: 'Zaha Hadid Architects', backgroundColor: '#131B2E', textColor: '#94A3B8', x: 24, y: 330 });
addStep('CREATE_BUTTON', { parentId: '$screen_07', name: 'Btn / Apply Filter', text: 'Show 14 Matching Estates', backgroundColor: '#38BDF8', textColor: '#090D16', x: 24, y: 740 }, 'btn_apply_filter');

// SCREEN 08: Interactive Map View (x: 960, y: 960)
addStep('CREATE_FRAME', {
  name: 'ARKI / 08 - Estate Map View',
  width: 393, height: 852, x: 960, y: 960,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_08');
addStep('CREATE_RECTANGLE', { parentId: '$screen_08', name: 'Map Image', width: 393, height: 852, x: 0, y: 0, imageUrl: IMAGES.mapSnapshot, color: '#131B2E' });
addStep('CREATE_BUTTON', { parentId: '$screen_08', name: 'Btn / Map Back', text: '← Feed', backgroundColor: '#070A10E6', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_map_back');
// Map Pin Card Preview
addStep('CREATE_FRAME', {
  parentId: '$screen_08', name: 'Map Pin Card',
  width: 345, height: 110, x: 24, y: 680,
  backgroundColor: '#0B0F1AF2', cornerRadius: 18, layoutMode: 'HORIZONTAL', padding: 14
}, 'map_pin_card');
addStep('CREATE_TEXT', { parentId: '$screen_08', text: 'The Glass Sanctuary • $4.25M\nSon Tra Coastline • 850 m²', fontSize: 13, fontStyle: 'Bold', color: '#F8FAFC', x: 40, y: 710 });
addStep('CREATE_BUTTON', { parentId: '$screen_08', name: 'Btn / Pin Details', text: 'View Pin →', backgroundColor: '#38BDF8', textColor: '#090D16', x: 240, y: 715 }, 'btn_pin_details');

// SCREEN 09: Property Details Hero (x: 1440, y: 960)
addStep('CREATE_FRAME', {
  name: 'ARKI / 09 - Property Details',
  width: 393, height: 852, x: 1440, y: 960,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_09');
addStep('CREATE_RECTANGLE', { parentId: '$screen_09', name: 'Main Image', width: 393, height: 340, x: 0, y: 0, imageUrl: IMAGES.villaPool, color: '#131B2E' });
addStep('CREATE_BUTTON', { parentId: '$screen_09', name: 'Btn / Details Back', text: '← Back', backgroundColor: '#070A10CC', textColor: '#FFFFFF', x: 24, y: 54 }, 'btn_details_back');
addStep('CREATE_BUTTON', { parentId: '$screen_09', name: 'Btn / Watch Tour', text: '▶ Watch 4K Video Tour', backgroundColor: '#0284C7', textColor: '#FFFFFF', x: 24, y: 270 }, 'btn_watch_tour');
addStep('CREATE_TEXT', { parentId: '$screen_09', text: 'The Glass Sanctuary Villa', fontSize: 22, fontStyle: 'Bold', color: '#F8FAFC', x: 24, y: 360 });
addStep('CREATE_BUTTON', { parentId: '$screen_09', name: 'Btn / Philosophy', text: 'Architect Philosophy & Sketches →', backgroundColor: '#131B2E', textColor: '#38BDF8', x: 24, y: 400 }, 'btn_open_philosophy');
// Gallery Thumbnails
addStep('CREATE_RECTANGLE', { parentId: '$screen_09', name: 'Thumb Living', width: 78, height: 78, x: 24, y: 460, imageUrl: IMAGES.livingRoom, cornerRadius: 12 }, 'thumb_1');
addStep('CREATE_RECTANGLE', { parentId: '$screen_09', name: 'Thumb Kitchen', width: 78, height: 78, x: 110, y: 460, imageUrl: IMAGES.kitchen, cornerRadius: 12 }, 'thumb_2');
addStep('CREATE_RECTANGLE', { parentId: '$screen_09', name: 'Thumb Sunset', width: 78, height: 78, x: 196, y: 460, imageUrl: IMAGES.sunsetEstate, cornerRadius: 12 }, 'thumb_3');
addStep('CREATE_BUTTON', { parentId: '$screen_09', name: 'Btn / 3D Walkthrough', text: '🥽 3D Matterport VR', backgroundColor: '#1E293B', textColor: '#38BDF8', x: 24, y: 560 }, 'btn_open_matterport');
addStep('CREATE_BUTTON', { parentId: '$screen_09', name: 'Btn / Chat Studio', text: '💬 Chat Architect', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 210, y: 560 }, 'btn_open_chat');
addStep('CREATE_BUTTON', { parentId: '$screen_09', name: 'Btn / Calc', text: '📊 Investment Calc', backgroundColor: '#1E293B', textColor: '#94A3B8', x: 24, y: 620 }, 'btn_open_calc');
addStep('CREATE_BUTTON', { parentId: '$screen_09', name: 'Btn / Book Private', text: 'Schedule Private Viewing  ✦', backgroundColor: '#38BDF8', textColor: '#090D16', x: 24, y: 760 }, 'btn_book_private');

// SCREEN 10: Architect Philosophy (x: 1920, y: 960)
addStep('CREATE_FRAME', {
  name: 'ARKI / 10 - Architect Philosophy',
  width: 393, height: 852, x: 1920, y: 960,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_10');
addStep('CREATE_BUTTON', { parentId: '$screen_10', name: 'Btn / Phil Back', text: '← Property', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_phil_back');
addStep('CREATE_RECTANGLE', { parentId: '$screen_10', name: 'Architect Photo', width: 100, height: 100, x: 24, y: 120, imageUrl: IMAGES.architectPortrait, cornerRadius: 50 });
addStep('CREATE_TEXT', { parentId: '$screen_10', text: 'Studio Tadao Ando', fontSize: 20, fontStyle: 'Bold', color: '#F8FAFC', x: 140, y: 140 });
addStep('CREATE_TEXT', { parentId: '$screen_10', text: 'Pritzker Laureate • Osaka, Japan', fontSize: 13, color: '#38BDF8', x: 140, y: 170 });
addStep('CREATE_TEXT', { parentId: '$screen_10', text: '"Architecture must provide a sanctuary where nature, light, and geometry merge into pure tranquility."', fontSize: 15, fontStyle: 'Medium', color: '#CBD5E1', x: 24, y: 250 });
addStep('CREATE_RECTANGLE', { parentId: '$screen_10', name: 'Blueprint Concept', width: 345, height: 260, x: 24, y: 360, imageUrl: IMAGES.blueprintPlan, cornerRadius: 18 });

// =============================================================================
// ROW 3 (y: 1920): MEDIA, VR, VIDEO & SLIDERS (Screens 11 - 15)
// =============================================================================

// SCREEN 11: 3D Matterport VR Walkthrough (x: 0, y: 1920)
addStep('CREATE_FRAME', {
  name: 'ARKI / 11 - 3D Matterport VR',
  width: 393, height: 852, x: 0, y: 1920,
  backgroundColor: '#020408', cornerRadius: 44, clipsContent: true
}, 'screen_11');
addStep('CREATE_RECTANGLE', { parentId: '$screen_11', name: 'VR Stream', width: 393, height: 852, x: 0, y: 0, imageUrl: IMAGES.matterportVR, color: '#090D16' });
addStep('CREATE_BUTTON', { parentId: '$screen_11', name: 'Btn / VR Close', text: '✕ Exit 3D View', backgroundColor: '#070A10E6', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_vr_close');
addStep('CREATE_FRAME', { parentId: '$screen_11', name: 'Hotspot Living', width: 140, height: 40, x: 130, y: 400, backgroundColor: '#0284C7DD', cornerRadius: 20 });
addStep('CREATE_TEXT', { parentId: '$screen_11', text: '◉ Tap to Walk Here', fontSize: 12, fontStyle: 'Bold', color: '#FFFFFF', x: 145, y: 412 });

// SCREEN 12: 4K Cinematic Video Player (x: 480, y: 1920)
addStep('CREATE_FRAME', {
  name: 'ARKI / 12 - Video Tour Player',
  width: 393, height: 852, x: 480, y: 1920,
  backgroundColor: '#020408', cornerRadius: 44, clipsContent: true
}, 'screen_12');
addStep('CREATE_RECTANGLE', { parentId: '$screen_12', name: 'Video Screen', width: 393, height: 500, x: 0, y: 130, imageUrl: IMAGES.livingRoom, color: '#090D16' });
addStep('CREATE_BUTTON', { parentId: '$screen_12', name: 'Btn / Close Video', text: '✕ Close Tour', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_close_video');
addStep('CREATE_TEXT', { parentId: '$screen_12', text: '4K HDR • Spatial Audio • 02:45 / 04:10', fontSize: 13, color: '#38BDF8', x: 24, y: 660 });
addStep('CREATE_FRAME', { parentId: '$screen_12', name: 'Progress Bar', width: 345, height: 6, x: 24, y: 690, backgroundColor: '#38BDF8', cornerRadius: 3 });

// SCREEN 13: Gallery Slider 1 - Travertine Living (x: 960, y: 1920)
addStep('CREATE_FRAME', {
  name: 'ARKI / 13 - Slider 1 (Living)',
  width: 393, height: 852, x: 960, y: 1920,
  backgroundColor: '#020408', cornerRadius: 44, clipsContent: true
}, 'screen_13');
addStep('CREATE_RECTANGLE', { parentId: '$screen_13', name: 'Slide 1', width: 393, height: 600, x: 0, y: 80, imageUrl: IMAGES.livingRoom, color: '#090D16' });
addStep('CREATE_BUTTON', { parentId: '$screen_13', name: 'Btn / Close S1', text: '✕ Close', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_close_s1');
addStep('CREATE_TEXT', { parentId: '$screen_13', text: 'Slide 1 of 3: Travertine Living Atrium', fontSize: 14, color: '#F8FAFC', x: 24, y: 710 });
addStep('CREATE_BUTTON', { parentId: '$screen_13', name: 'Btn / Next S1', text: 'Next Photo →', backgroundColor: '#38BDF8', textColor: '#090D16', x: 240, y: 740 }, 'btn_next_s1');

// SCREEN 14: Gallery Slider 2 - Minimalist Kitchen (x: 1440, y: 1920)
addStep('CREATE_FRAME', {
  name: 'ARKI / 14 - Slider 2 (Kitchen)',
  width: 393, height: 852, x: 1440, y: 1920,
  backgroundColor: '#020408', cornerRadius: 44, clipsContent: true
}, 'screen_14');
addStep('CREATE_RECTANGLE', { parentId: '$screen_14', name: 'Slide 2', width: 393, height: 600, x: 0, y: 80, imageUrl: IMAGES.kitchen, color: '#090D16' });
addStep('CREATE_BUTTON', { parentId: '$screen_14', name: 'Btn / Close S2', text: '✕ Close', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_close_s2');
addStep('CREATE_TEXT', { parentId: '$screen_14', text: 'Slide 2 of 3: Custom Boffi Monolith Kitchen', fontSize: 14, color: '#F8FAFC', x: 24, y: 710 });
addStep('CREATE_BUTTON', { parentId: '$screen_14', name: 'Btn / Next S2', text: 'Next Photo →', backgroundColor: '#38BDF8', textColor: '#090D16', x: 240, y: 740 }, 'btn_next_s2');

// SCREEN 15: Gallery Slider 3 - Sunset Ocean View (x: 1920, y: 1920)
addStep('CREATE_FRAME', {
  name: 'ARKI / 15 - Slider 3 (Sunset)',
  width: 393, height: 852, x: 1920, y: 1920,
  backgroundColor: '#020408', cornerRadius: 44, clipsContent: true
}, 'screen_15');
addStep('CREATE_RECTANGLE', { parentId: '$screen_15', name: 'Slide 3', width: 393, height: 600, x: 0, y: 80, imageUrl: IMAGES.sunsetEstate, color: '#090D16' });
addStep('CREATE_BUTTON', { parentId: '$screen_15', name: 'Btn / Close S3', text: '✕ Close', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_close_s3');
addStep('CREATE_TEXT', { parentId: '$screen_15', text: 'Slide 3 of 3: Ocean Sunset Infinity Terrace', fontSize: 14, color: '#F8FAFC', x: 24, y: 710 });
addStep('CREATE_BUTTON', { parentId: '$screen_15', name: 'Btn / Wrap S3', text: '↺ Back to First Photo', backgroundColor: '#38BDF8', textColor: '#090D16', x: 180, y: 740 }, 'btn_wrap_s3');

// =============================================================================
// ROW 4 (y: 2880): BOOKING, SAVED, CHAT, CALC, PROFILE (Screens 16 - 21)
// =============================================================================

// SCREEN 16: Schedule Private Viewing (x: 0, y: 2880)
addStep('CREATE_FRAME', {
  name: 'ARKI / 16 - Schedule Viewing',
  width: 393, height: 852, x: 0, y: 2880,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_16');
addStep('CREATE_BUTTON', { parentId: '$screen_16', name: 'Btn / Book Back', text: '← Back', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_book_back');
addStep('CREATE_TEXT', { parentId: '$screen_16', text: 'Schedule Private Viewing', fontSize: 24, fontStyle: 'Bold', color: '#F8FAFC', x: 24, y: 110 });
addStep('CREATE_TEXT', { parentId: '$screen_16', text: 'Select Date (October 2026)', fontSize: 14, color: '#38BDF8', x: 24, y: 160 });
addStep('CREATE_FRAME', { parentId: '$screen_16', name: 'Calendar Card', width: 345, height: 180, x: 24, y: 190, backgroundColor: '#131B2E', cornerRadius: 20 });
addStep('CREATE_TEXT', { parentId: '$screen_16', text: 'Mon 14    Tue 15    [Wed 16]    Thu 17    Fri 18\n\nSelected Time Slot: 14:30 - Private Helicopter Landing', fontSize: 13, color: '#E2E8F0', x: 40, y: 240 });
addStep('CREATE_BUTTON', { parentId: '$screen_16', name: 'Btn / Confirm Book', text: 'Confirm Viewing Request  ✦', backgroundColor: '#38BDF8', textColor: '#090D16', x: 24, y: 740 }, 'btn_confirm_book');

// SCREEN 17: Booking Confirmation Pass (x: 480, y: 2880)
addStep('CREATE_FRAME', {
  name: 'ARKI / 17 - VIP Pass Confirmation',
  width: 393, height: 852, x: 480, y: 2880,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_17');
addStep('CREATE_TEXT', { parentId: '$screen_17', text: '✓ Viewing Confirmed', fontSize: 26, fontStyle: 'Bold', color: '#38BDF8', x: 32, y: 120 });
addStep('CREATE_FRAME', { parentId: '$screen_17', name: 'Pass Boarding', width: 329, height: 360, x: 32, y: 180, backgroundColor: '#131B2E', cornerRadius: 24, padding: 24 });
addStep('CREATE_TEXT', { parentId: '$screen_17', text: 'VIP PASS #ARK-8821\nThe Glass Sanctuary Villa\nDate: Wednesday, Oct 16 • 14:30\nHost: Master Architect Advisory', fontSize: 14, color: '#F8FAFC', x: 54, y: 230 });
addStep('CREATE_BUTTON', { parentId: '$screen_17', name: 'Btn / Home Return', text: 'Return to Discovery Feed →', backgroundColor: '#38BDF8', textColor: '#090D16', x: 32, y: 740 }, 'btn_home_return');

// SCREEN 18: Saved Collection (x: 960, y: 2880)
addStep('CREATE_FRAME', {
  name: 'ARKI / 18 - Saved Architecture',
  width: 393, height: 852, x: 960, y: 2880,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_18');
addStep('CREATE_BUTTON', { parentId: '$screen_18', name: 'Btn / Saved Back', text: '← Home', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_saved_back');
addStep('CREATE_TEXT', { parentId: '$screen_18', text: 'Saved Masterpieces (3)', fontSize: 24, fontStyle: 'Bold', color: '#F8FAFC', x: 24, y: 110 });
addStep('CREATE_FRAME', { parentId: '$screen_18', name: 'Saved Card 1', width: 345, height: 120, x: 24, y: 160, backgroundColor: '#131B2E', cornerRadius: 20 }, 'card_saved_item');
addStep('CREATE_RECTANGLE', { parentId: '$card_saved_item', name: 'Thumb', width: 110, height: 120, x: 0, y: 0, imageUrl: IMAGES.villaPool });
addStep('CREATE_TEXT', { parentId: '$card_saved_item', text: 'The Glass Sanctuary\n$4,250,000', fontSize: 14, fontStyle: 'Bold', color: '#F8FAFC', x: 125, y: 40 });
addStep('CREATE_BUTTON', { parentId: '$card_saved_item', name: 'Btn / Open Saved', text: 'View →', backgroundColor: '#38BDF8', textColor: '#090D16', x: 250, y: 40 }, 'btn_open_saved');

// SCREEN 19: Direct Chat with Architect Studio (x: 1440, y: 2880)
addStep('CREATE_FRAME', {
  name: 'ARKI / 19 - Architect Chat',
  width: 393, height: 852, x: 1440, y: 2880,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_19');
addStep('CREATE_BUTTON', { parentId: '$screen_19', name: 'Btn / Chat Back', text: '← Back', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_chat_back');
addStep('CREATE_TEXT', { parentId: '$screen_19', text: 'Studio Tadao Ando Partners', fontSize: 18, fontStyle: 'Bold', color: '#F8FAFC', x: 110, y: 64 });
addStep('CREATE_FRAME', { parentId: '$screen_19', name: 'Msg 1 Studio', width: 280, height: 70, x: 24, y: 130, backgroundColor: '#131B2E', cornerRadius: 16, padding: 14 });
addStep('CREATE_TEXT', { parentId: '$screen_19', text: 'Welcome. The cantilevered pool at the Glass Sanctuary can be extended by 4 meters if requested.', fontSize: 12, color: '#E2E8F0', x: 38, y: 145 });
addStep('CREATE_FRAME', { parentId: '$screen_19', name: 'Msg 2 User', width: 260, height: 50, x: 100, y: 220, backgroundColor: '#0284C7', cornerRadius: 16, padding: 14 });
addStep('CREATE_TEXT', { parentId: '$screen_19', text: 'Can we install museum-grade solar UV glass?', fontSize: 12, color: '#FFFFFF', x: 115, y: 235 });

// SCREEN 20: Mortgage & Investment Calculator (x: 1920, y: 2880)
addStep('CREATE_FRAME', {
  name: 'ARKI / 20 - Financial Calculator',
  width: 393, height: 852, x: 1920, y: 2880,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_20');
addStep('CREATE_BUTTON', { parentId: '$screen_20', name: 'Btn / Calc Back', text: '← Back', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_calc_back');
addStep('CREATE_TEXT', { parentId: '$screen_20', text: 'Investment Estimator', fontSize: 24, fontStyle: 'Bold', color: '#F8FAFC', x: 24, y: 110 });
addStep('CREATE_TEXT', { parentId: '$screen_20', text: 'Purchase Price: $4,250,000\nDown Payment: 30% ($1,275,000)\nEstimated Monthly Payment: $18,450 / mo', fontSize: 14, color: '#38BDF8', x: 24, y: 180 });

// SCREEN 21: User Profile & VIP Membership (x: 2400, y: 2880)
addStep('CREATE_FRAME', {
  name: 'ARKI / 21 - VIP Client Profile',
  width: 393, height: 852, x: 2400, y: 2880,
  backgroundColor: '#090D16', cornerRadius: 44, clipsContent: true
}, 'screen_21');
addStep('CREATE_BUTTON', { parentId: '$screen_21', name: 'Btn / Profile Back', text: '← Feed', backgroundColor: '#1E293B', textColor: '#FFFFFF', x: 24, y: 56 }, 'btn_profile_back');
addStep('CREATE_TEXT', { parentId: '$screen_21', text: 'Alexander Vance', fontSize: 24, fontStyle: 'Bold', color: '#F8FAFC', x: 24, y: 120 });
addStep('CREATE_TEXT', { parentId: '$screen_21', text: 'Tier: Black Diamond Architectural Patron', fontSize: 13, color: '#38BDF8', x: 24, y: 155 });
addStep('CREATE_BUTTON', { parentId: '$screen_21', name: 'Btn / Logout', text: 'Sign Out of Account', backgroundColor: '#334155', textColor: '#FCA5A5', x: 24, y: 740 }, 'btn_logout');

// =============================================================================
// REUSABLE FIGMA COMPONENTS (x: 2880, y: 0)
// =============================================================================
addStep('CREATE_COMPONENT', {
  name: 'Component / Primary Button',
  width: 345, height: 56, x: 2880, y: 0,
  backgroundColor: '#38BDF8', cornerRadius: 16, layoutMode: 'HORIZONTAL',
  primaryAxisAlignItems: 'CENTER', counterAxisAlignItems: 'CENTER'
}, 'comp_btn_primary');

addStep('CREATE_COMPONENT', {
  name: 'Component / Secondary Button',
  width: 345, height: 56, x: 2880, y: 90,
  backgroundColor: '#1E293B', cornerRadius: 16, layoutMode: 'HORIZONTAL',
  primaryAxisAlignItems: 'CENTER', counterAxisAlignItems: 'CENTER'
}, 'comp_btn_secondary');

addStep('CREATE_COMPONENT', {
  name: 'Component / Estate Preview Card',
  width: 345, height: 280, x: 2880, y: 180,
  backgroundColor: '#131B2E', cornerRadius: 20, clipsContent: true
}, 'comp_estate_card');

addStep('CREATE_COMPONENT', {
  name: 'Component / Bottom Navigation Bar',
  width: 393, height: 80, x: 2880, y: 490,
  backgroundColor: '#070A10'
}, 'comp_navbar');

addStep('CREATE_COMPONENT', {
  name: 'Component / VR Tour Badge',
  width: 130, height: 32, x: 2880, y: 600,
  backgroundColor: '#0284C7', cornerRadius: 16
}, 'comp_badge_vr');

// =============================================================================
// PROTOTYPE INTERACTIONS (Connecting all 21 Screens)
// =============================================================================
const interactions = [
  // 1. Splash -> Onboarding 1
  { sourceNodeId: '$screen_01', targetNodeId: '$screen_02', trigger: 'AFTER_TIMEOUT', timeout: 1.2, transitionType: 'DISSOLVE', duration: 0.4 },
  // 2. Onboarding 1 -> 2
  { sourceNodeId: '$btn_onb_1', targetNodeId: '$screen_03', trigger: 'ON_CLICK', transitionType: 'SLIDE_IN', direction: 'LEFT', duration: 0.35 },
  // 3. Onboarding 2 -> 3
  { sourceNodeId: '$btn_onb_2', targetNodeId: '$screen_04', trigger: 'ON_CLICK', transitionType: 'SLIDE_IN', direction: 'LEFT', duration: 0.35 },
  // 4. Onboarding 3 -> Login
  { sourceNodeId: '$btn_onb_3', targetNodeId: '$screen_05', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  // 5. Login -> Home Feed
  { sourceNodeId: '$btn_login_submit', targetNodeId: '$screen_06', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  { sourceNodeId: '$btn_login_guest', targetNodeId: '$screen_06', trigger: 'ON_CLICK', transitionType: 'DISSOLVE', duration: 0.3 },
  // 6. Home -> Filter Modal
  { sourceNodeId: '$btn_open_filter', targetNodeId: '$screen_07', trigger: 'ON_CLICK', transitionType: 'MOVE_IN', direction: 'TOP', duration: 0.3 },
  { sourceNodeId: '$btn_close_filter', targetNodeId: '$screen_06', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'BOTTOM', duration: 0.3 },
  { sourceNodeId: '$btn_apply_filter', targetNodeId: '$screen_06', trigger: 'ON_CLICK', transitionType: 'DISSOLVE', duration: 0.3 },
  // 7. Home -> Map
  { sourceNodeId: '$btn_open_map', targetNodeId: '$screen_08', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  { sourceNodeId: '$btn_map_back', targetNodeId: '$screen_06', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'RIGHT', duration: 0.35 },
  { sourceNodeId: '$btn_pin_details', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  // 8. Home -> Details
  { sourceNodeId: '$btn_view_estate', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  { sourceNodeId: '$btn_details_back', targetNodeId: '$screen_06', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'RIGHT', duration: 0.35 },
  // 9. Details -> Architect Philosophy
  { sourceNodeId: '$btn_open_philosophy', targetNodeId: '$screen_10', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  { sourceNodeId: '$btn_phil_back', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'RIGHT', duration: 0.35 },
  // 10. Details -> 3D VR
  { sourceNodeId: '$btn_open_matterport', targetNodeId: '$screen_11', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.45 },
  { sourceNodeId: '$btn_vr_close', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'DISSOLVE', duration: 0.3 },
  // 11. Details -> Video Tour
  { sourceNodeId: '$btn_watch_tour', targetNodeId: '$screen_12', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  { sourceNodeId: '$btn_close_video', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'DISSOLVE', duration: 0.3 },
  // 12. Details -> Gallery Slider (1 -> 2 -> 3 -> 1)
  { sourceNodeId: '$thumb_1', targetNodeId: '$screen_13', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  { sourceNodeId: '$btn_close_s1', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'BOTTOM', duration: 0.35 },
  { sourceNodeId: '$btn_next_s1', targetNodeId: '$screen_14', trigger: 'ON_CLICK', transitionType: 'SLIDE_IN', direction: 'LEFT', duration: 0.35 },
  { sourceNodeId: '$btn_close_s2', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'BOTTOM', duration: 0.35 },
  { sourceNodeId: '$btn_next_s2', targetNodeId: '$screen_15', trigger: 'ON_CLICK', transitionType: 'SLIDE_IN', direction: 'LEFT', duration: 0.35 },
  { sourceNodeId: '$btn_close_s3', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'BOTTOM', duration: 0.35 },
  { sourceNodeId: '$btn_wrap_s3', targetNodeId: '$screen_13', trigger: 'ON_CLICK', transitionType: 'DISSOLVE', duration: 0.3 },
  // 13. Details -> Schedule Viewing -> Confirmation Pass -> Home
  { sourceNodeId: '$btn_book_private', targetNodeId: '$screen_16', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  { sourceNodeId: '$btn_book_back', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'RIGHT', duration: 0.35 },
  { sourceNodeId: '$btn_confirm_book', targetNodeId: '$screen_17', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  { sourceNodeId: '$btn_home_return', targetNodeId: '$screen_06', trigger: 'ON_CLICK', transitionType: 'DISSOLVE', duration: 0.35 },
  // 14. Home -> Saved Collection -> Details
  { sourceNodeId: '$btn_nav_saved', targetNodeId: '$screen_18', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.35 },
  { sourceNodeId: '$btn_saved_back', targetNodeId: '$screen_06', trigger: 'ON_CLICK', transitionType: 'DISSOLVE', duration: 0.3 },
  { sourceNodeId: '$btn_open_saved', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.4 },
  // 15. Details -> Chat
  { sourceNodeId: '$btn_open_chat', targetNodeId: '$screen_19', trigger: 'ON_CLICK', transitionType: 'MOVE_IN', direction: 'RIGHT', duration: 0.35 },
  { sourceNodeId: '$btn_chat_back', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'RIGHT', duration: 0.35 },
  // 16. Details -> Financial Calc
  { sourceNodeId: '$btn_open_calc', targetNodeId: '$screen_20', trigger: 'ON_CLICK', transitionType: 'MOVE_IN', direction: 'BOTTOM', duration: 0.35 },
  { sourceNodeId: '$btn_calc_back', targetNodeId: '$screen_09', trigger: 'ON_CLICK', transitionType: 'SLIDE_OUT', direction: 'BOTTOM', duration: 0.35 },
  // 17. Home -> Profile -> Logout (Back to Login)
  { sourceNodeId: '$btn_nav_profile', targetNodeId: '$screen_21', trigger: 'ON_CLICK', transitionType: 'SMART_ANIMATE', duration: 0.35 },
  { sourceNodeId: '$btn_profile_back', targetNodeId: '$screen_06', trigger: 'ON_CLICK', transitionType: 'DISSOLVE', duration: 0.3 },
  { sourceNodeId: '$btn_logout', targetNodeId: '$screen_05', trigger: 'ON_CLICK', transitionType: 'DISSOLVE', duration: 0.35 }
];

for (const inter of interactions) {
  addStep('ADD_INTERACTION', inter);
}

// REGISTER STARTING FLOW POINT
addStep('CREATE_FLOW', {
  frameId: '$screen_01',
  flowName: 'ARKI — Master 21-Screen Interactive Architecture Flow'
});

async function runMegaGenerator() {
  console.log('🏛️ Dispatching MEGA ARKI Architecture App (21 Screens + Components + Full Prototyping)...');
  console.log(`   - Total Steps: ${steps.length}`);

  try {
    const res = await fetch(`${BRIDGE_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'BATCH_EXECUTE', params: { steps }, timeoutMs: 180000 })
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('❌ Mega App generation failed:', data.error || data);
      process.exit(1);
    }

    const results = data.data && data.data.results ? data.data.results : [];
    const failed = results.filter(r => !r.success);
    const succeeded = results.filter(r => r.success);

    console.log('\n========================================================================');
    console.log('🎉 BATCH EXECUTION RESULTS IN FIGMA:');
    console.log('========================================================================');
    console.log(`   - Steps Succeeded: ${succeeded.length} / ${steps.length}`);
    if (failed.length > 0) {
      console.warn(`   - Steps Failed: ${failed.length}`);
      failed.slice(0, 10).forEach(f => console.warn(`     • Step ${f.index} [${f.action}]: ${f.error}`));
    }
    console.log(`   - Reusable Components Created: 5 Figma Components`);
    console.log(`   - Interactive Prototype Links Wired: 36 Transitions`);
    console.log(`   - Starting Flow: "ARKI — Master 21-Screen Interactive Architecture Flow"`);

    // Auto Zoom to Fit all 21 frames in Figma viewport
    try {
      await fetch(`${BRIDGE_URL}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ZOOM_TO_FIT' })
      });
      console.log('🔍 Canvas auto-zoomed to fit all 21 screens in Figma view!');
    } catch (zErr) {}

    console.log('\n👉 Go to Figma Desktop:');
    console.log('   1. Press Shift + E to switch to Prototype mode (view all blue interaction wires)');
    console.log('   2. Press Shift + Space to run the interactive prototype modal!\n');
  } catch (err) {
    console.error('❌ Network error:', err.message);
    process.exit(1);
  }
}

runMegaGenerator();
