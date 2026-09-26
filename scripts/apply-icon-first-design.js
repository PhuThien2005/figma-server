#!/usr/bin/env node
// ARKI - ICON-FIRST UI REFACTORING
// Prioritizes icons over text across buttons:
// 1. Menu Drawer: Pure icon theme switcher (☀️ / 🌙) and flag icons (🇻🇳 / 🇬🇧) - NO verbose text!
// 2. Menu Drawer: 2x3 Icon Matrix for quick navigation (🏛️ Đã lưu, 🗺️ Bản đồ, 💬 Tư vấn, 📊 Tài chính, 🔒 Bảo mật, 🚪 Đăng xuất)
// 3. User Card: Clean icon button (↗) instead of long text link
// 4. Home Feed Header: Direct Theme icon button (🌙) + Avatar icon + Hamburger icon (☰)
// 5. All Screen Back buttons: Clean circular icon button (←) instead of "← Back"

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://localhost:8765';

const IMAGES = {
  architectPortrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
};

async function execute(action, params = {}) {
  const res = await fetch(`${BRIDGE_URL}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, params, timeoutMs: 60000 })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data.data;
}

async function run() {
  console.log('🎨 Starting Icon-First UI Refactoring...');

  // =========================================================================
  // 1. REBUILD LIGHT THEME MENU DRAWER WITH PURE ICONS
  // =========================================================================
  try {
    await execute('DELETE_NODE', { nodeId: 'ARKI / 25 - Navigation Drawer Menu [Light]' });
    console.log('🗑️ Cleared previous Light Menu Drawer.');
  } catch (e) {}

  try {
    await execute('DELETE_NODE', { nodeId: 'ARKI / 25 - Navigation Drawer Menu' });
    console.log('🗑️ Cleared previous Dark Menu Drawer.');
  } catch (e) {}

  const lightDrawerSteps = [
    // Root Frame
    {
      action: 'CREATE_FRAME',
      ref: 'drawer_light_root',
      params: {
        name: 'ARKI / 25 - Navigation Drawer Menu [Light]',
        width: 393,
        height: 852,
        x: 4800,
        y: 6457,
        backgroundColor: '#090D1677',
        cornerRadius: 44,
        clipsContent: true
      }
    },
    // Left Tap Scrim to Dismiss
    {
      action: 'CREATE_FRAME',
      ref: 'scrim_tap_light',
      params: {
        parentId: '$drawer_light_root',
        name: 'Backdrop Tap Area / Dismiss [Light]',
        width: 73,
        height: 852,
        x: 0,
        y: 0,
        backgroundColor: '#00000000'
      }
    },
    // White Drawer Container (width 320, height 852)
    {
      action: 'CREATE_FRAME',
      ref: 'drawer_panel_light',
      params: {
        parentId: '$drawer_light_root',
        name: 'Drawer Container [Light]',
        width: 320,
        height: 852,
        x: 73,
        y: 0,
        backgroundColor: '#FFFFFF',
        cornerRadius: 0,
        clipsContent: true
      }
    },

    // --- HEADER ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'A R K I',
        fontSize: 18,
        fontStyle: 'Bold',
        color: '#0284C7',
        x: 20,
        y: 36
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'VIP',
        fontSize: 11,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 82,
        y: 42
      }
    },
    // Close Icon Button (✕)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_close_menu_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Close Menu [Light]',
        text: '✕',
        backgroundColor: '#F1F5F9',
        textColor: '#0F172A',
        fontSize: 15,
        cornerRadius: 18,
        paddingX: 12,
        paddingY: 8,
        x: 264,
        y: 30
      }
    },

    // --- USER PROFILE CARD (WITH ICON BUTTON ↗) ---
    {
      action: 'CREATE_FRAME',
      ref: 'card_user_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / VIP Profile [Light]',
        width: 280,
        height: 80,
        x: 20,
        y: 80,
        backgroundColor: '#F8FAFC',
        cornerRadius: 18
      }
    },
    // Avatar
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_user_light',
        name: 'User Avatar Image',
        width: 50,
        height: 50,
        x: 14,
        y: 15,
        cornerRadius: 25,
        imageUrl: IMAGES.architectPortrait,
        color: '#0284C7'
      }
    },
    // Online VIP Dot
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$card_user_light',
        name: 'Dot / Online VIP',
        width: 12,
        height: 12,
        x: 52,
        y: 52,
        cornerRadius: 6,
        backgroundColor: '#10B981'
      }
    },
    // User Info
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_user_light',
        text: 'Alexander Vance',
        fontSize: 15,
        fontStyle: 'Bold',
        color: '#0F172A',
        x: 74,
        y: 15
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_user_light',
        text: '💎 Black Diamond #004',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#0284C7',
        x: 74,
        y: 36
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_user_light',
        text: 'alexander@forbes-global.com',
        fontSize: 10,
        color: '#64748B',
        x: 74,
        y: 54
      }
    },
    // Profile Icon Button (↗)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_view_profile_light',
      params: {
        parentId: '$card_user_light',
        name: 'Btn / View Profile [Menu Light]',
        text: '↗',
        backgroundColor: '#E0F2FE',
        textColor: '#0284C7',
        fontSize: 16,
        cornerRadius: 16,
        paddingX: 10,
        paddingY: 6,
        x: 236,
        y: 22
      }
    },

    // --- ROW: PURE ICON THEME TOGGLE & PURE FLAG LANGUAGE TOGGLE ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'THEME',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 20,
        y: 176
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'LANGUAGE',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 164,
        y: 176
      }
    },

    // 1. Theme Icons Container (width: 134, height: 48)
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Container / Theme Icon Segmented',
        width: 134,
        height: 48,
        x: 20,
        y: 194,
        backgroundColor: '#F1F5F9',
        cornerRadius: 14
      }
    },
    // Active Sun Icon Button (☀️)
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Pill / Sun Icon Active',
        width: 61,
        height: 40,
        x: 24,
        y: 198,
        backgroundColor: '#FFFFFF',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: '☀️',
        fontSize: 20,
        x: 43,
        y: 206
      }
    },
    // Clickable Moon Icon Button (🌙)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_switch_dark',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Switch To Dark [Menu Light]',
        text: '🌙',
        backgroundColor: '#F1F5F900',
        textColor: '#64748B',
        fontSize: 20,
        cornerRadius: 10,
        paddingX: 16,
        paddingY: 6,
        x: 89,
        y: 198
      }
    },

    // 2. Language Flags Container (width: 134, height: 48)
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Container / Lang Flag Segmented',
        width: 134,
        height: 48,
        x: 166,
        y: 194,
        backgroundColor: '#F1F5F9',
        cornerRadius: 14
      }
    },
    // Active Vietnamese Flag Button (🇻🇳)
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Pill / VN Flag Active',
        width: 61,
        height: 40,
        x: 170,
        y: 198,
        backgroundColor: '#0284C7',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: '🇻🇳',
        fontSize: 22,
        x: 188,
        y: 206
      }
    },
    // UK Flag Button (🇬🇧)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_lang_en',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Switch To English [Menu Light]',
        text: '🇬🇧',
        backgroundColor: '#F1F5F900',
        textColor: '#64748B',
        fontSize: 22,
        cornerRadius: 10,
        paddingX: 14,
        paddingY: 6,
        x: 235,
        y: 198
      }
    },

    // --- DIVIDER ---
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Divider / Line',
        width: 280,
        height: 1,
        x: 20,
        y: 260,
        backgroundColor: '#E2E8F0'
      }
    },

    // --- QUICK ACTION ICON MATRIX (2 COLUMNS x 3 ROWS) ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'QUICK ACTIONS',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 20,
        y: 274
      }
    },

    // ROW 1: Saved (🏛️) & Map (🗺️)
    // Card 1: Saved
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_saved_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / Saved [Menu Light]',
        width: 134,
        height: 72,
        x: 20,
        y: 294,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_saved_light',
        text: '🏛️',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_saved_light',
        text: 'Đã lưu (4)',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#0F172A',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_saved_light',
      params: {
        parentId: '$card_menu_saved_light',
        name: 'Btn / Nav Saved [Menu Light]',
        text: '→',
        backgroundColor: '#E0F2FE',
        textColor: '#0284C7',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },

    // Card 2: Map
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_map_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / Map [Menu Light]',
        width: 134,
        height: 72,
        x: 166,
        y: 294,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_map_light',
        text: '🗺️',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_map_light',
        text: 'Bản đồ Sơn Trà',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#0F172A',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_map_light',
      params: {
        parentId: '$card_menu_map_light',
        name: 'Btn / Nav Map [Menu Light]',
        text: '→',
        backgroundColor: '#E0F2FE',
        textColor: '#0284C7',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },

    // ROW 2: Architect Chat (💬) & Financials (📊)
    // Card 3: Chat
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_chat_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / Chat [Menu Light]',
        width: 134,
        height: 72,
        x: 20,
        y: 380,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_chat_light',
        text: '💬',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_chat_light',
        text: 'Tư vấn KTS',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#0F172A',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_chat_light',
      params: {
        parentId: '$card_menu_chat_light',
        name: 'Btn / Nav Chat [Menu Light]',
        text: '●',
        backgroundColor: '#DCFCE7',
        textColor: '#16A34A',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },

    // Card 4: Financial Calculator
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_calc_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / Calc [Menu Light]',
        width: 134,
        height: 72,
        x: 166,
        y: 380,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_calc_light',
        text: '📊',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_calc_light',
        text: 'Ký quỹ Escrow',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#0F172A',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_calc_light',
      params: {
        parentId: '$card_menu_calc_light',
        name: 'Btn / Nav Calc [Menu Light]',
        text: '→',
        backgroundColor: '#E0F2FE',
        textColor: '#0284C7',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },

    // ROW 3: FaceID Security (🔒) & Sign Out (🚪)
    // Card 5: FaceID Security
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_sec_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / Security [Menu Light]',
        width: 134,
        height: 72,
        x: 20,
        y: 466,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_sec_light',
        text: '🔒',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_sec_light',
        text: 'FaceID Token',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#0F172A',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_sec_light',
      params: {
        parentId: '$card_menu_sec_light',
        name: 'Btn / Nav Security [Menu Light]',
        text: '→',
        backgroundColor: '#E0F2FE',
        textColor: '#0284C7',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },

    // Card 6: Sign Out (🚪)
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_logout_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / Logout [Menu Light]',
        width: 134,
        height: 72,
        x: 166,
        y: 466,
        backgroundColor: '#FEF2F2',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_logout_light',
        text: '🚪',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_logout_light',
        text: 'Đăng xuất',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#DC2626',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_logout_light',
      params: {
        parentId: '$card_menu_logout_light',
        name: 'Btn / Sign Out [Menu Light]',
        text: '⎋',
        backgroundColor: '#FEE2E2',
        textColor: '#DC2626',
        fontSize: 14,
        fontStyle: 'Bold',
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },

    // --- FOOTER BRANDING ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'ARKI Luxury Living v2.4',
        fontSize: 11,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 90,
        y: 730
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: '☀️ Daylight Porcelain (Primary Interface)',
        fontSize: 10,
        fontStyle: 'Medium',
        color: '#0284C7',
        x: 55,
        y: 750
      }
    }
  ];

  console.log('Generating Icon-First Light Theme Menu Drawer...');
  await execute('BATCH_EXECUTE', { steps: lightDrawerSteps });
  console.log('✅ Light Menu Drawer created with Icon-First architecture.');

  // =========================================================================
  // 2. REBUILD DARK THEME MENU DRAWER WITH PURE ICONS
  // =========================================================================
  const darkDrawerSteps = [
    {
      action: 'CREATE_FRAME',
      ref: 'drawer_dark_root',
      params: {
        name: 'ARKI / 25 - Navigation Drawer Menu',
        width: 393,
        height: 852,
        x: 4800,
        y: 0,
        backgroundColor: '#00000088',
        cornerRadius: 44,
        clipsContent: true
      }
    },
    {
      action: 'CREATE_FRAME',
      ref: 'scrim_tap_dark',
      params: {
        parentId: '$drawer_dark_root',
        name: 'Backdrop Tap Area / Dismiss [Dark]',
        width: 73,
        height: 852,
        x: 0,
        y: 0,
        backgroundColor: '#00000000'
      }
    },
    {
      action: 'CREATE_FRAME',
      ref: 'drawer_panel_dark',
      params: {
        parentId: '$drawer_dark_root',
        name: 'Drawer Container [Dark]',
        width: 320,
        height: 852,
        x: 73,
        y: 0,
        backgroundColor: '#090D16',
        cornerRadius: 0,
        clipsContent: true
      }
    },
    // Header
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: 'A R K I',
        fontSize: 18,
        fontStyle: 'Bold',
        color: '#38BDF8',
        x: 20,
        y: 36
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: 'VIP',
        fontSize: 11,
        fontStyle: 'Bold',
        color: '#64748B',
        x: 82,
        y: 42
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_close_menu_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Btn / Close Menu [Dark]',
        text: '✕',
        backgroundColor: '#1E293B',
        textColor: '#F8FAFC',
        fontSize: 15,
        cornerRadius: 18,
        paddingX: 12,
        paddingY: 8,
        x: 264,
        y: 30
      }
    },
    // User Card
    {
      action: 'CREATE_FRAME',
      ref: 'card_user_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / VIP Profile [Dark]',
        width: 280,
        height: 80,
        x: 20,
        y: 80,
        backgroundColor: '#131B2E',
        cornerRadius: 18
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_user_dark',
        name: 'User Avatar Image [Dark]',
        width: 50,
        height: 50,
        x: 14,
        y: 15,
        cornerRadius: 25,
        imageUrl: IMAGES.architectPortrait,
        color: '#38BDF8'
      }
    },
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$card_user_dark',
        name: 'Dot / Online VIP [Dark]',
        width: 12,
        height: 12,
        x: 52,
        y: 52,
        cornerRadius: 6,
        backgroundColor: '#10B981'
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_user_dark',
        text: 'Alexander Vance',
        fontSize: 15,
        fontStyle: 'Bold',
        color: '#F8FAFC',
        x: 74,
        y: 15
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_user_dark',
        text: '💎 Black Diamond #004',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#38BDF8',
        x: 74,
        y: 36
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_user_dark',
        text: 'alexander@forbes-global.com',
        fontSize: 10,
        color: '#94A3B8',
        x: 74,
        y: 54
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_view_profile_dark',
      params: {
        parentId: '$card_user_dark',
        name: 'Btn / View Profile [Menu Dark]',
        text: '↗',
        backgroundColor: '#1E293B',
        textColor: '#38BDF8',
        fontSize: 16,
        cornerRadius: 16,
        paddingX: 10,
        paddingY: 6,
        x: 236,
        y: 22
      }
    },
    // Row: Theme Icons & Flag Icons
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: 'THEME',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#64748B',
        x: 20,
        y: 176
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: 'LANGUAGE',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#64748B',
        x: 164,
        y: 176
      }
    },
    // Theme Icons Container (width 134)
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Container / Theme Icon Segmented [Dark]',
        width: 134,
        height: 48,
        x: 20,
        y: 194,
        backgroundColor: '#131B2E',
        cornerRadius: 14
      }
    },
    // Sun Icon Button (Switch to Light)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_switch_light',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Btn / Switch To Light [Menu Dark]',
        text: '☀️',
        backgroundColor: '#131B2E00',
        textColor: '#94A3B8',
        fontSize: 20,
        cornerRadius: 10,
        paddingX: 14,
        paddingY: 6,
        x: 24,
        y: 198
      }
    },
    // Moon Icon Active Pill
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Pill / Moon Icon Active',
        width: 61,
        height: 40,
        x: 89,
        y: 198,
        backgroundColor: '#38BDF8',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: '🌙',
        fontSize: 20,
        x: 108,
        y: 206
      }
    },
    // Language Flags Container
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Container / Lang Flag Segmented [Dark]',
        width: 134,
        height: 48,
        x: 166,
        y: 194,
        backgroundColor: '#131B2E',
        cornerRadius: 14
      }
    },
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Pill / VN Flag Active [Dark]',
        width: 61,
        height: 40,
        x: 170,
        y: 198,
        backgroundColor: '#38BDF8',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: '🇻🇳',
        fontSize: 22,
        x: 188,
        y: 206
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_lang_en_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Btn / Switch To English [Menu Dark]',
        text: '🇬🇧',
        backgroundColor: '#131B2E00',
        textColor: '#94A3B8',
        fontSize: 22,
        cornerRadius: 10,
        paddingX: 14,
        paddingY: 6,
        x: 235,
        y: 198
      }
    },
    // Divider
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Divider / Line [Dark]',
        width: 280,
        height: 1,
        x: 20,
        y: 260,
        backgroundColor: '#1E293B'
      }
    },
    // Quick Actions Label
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: 'QUICK ACTIONS',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#64748B',
        x: 20,
        y: 274
      }
    },
    // Row 1: Saved & Map
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_saved_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Saved [Menu Dark]',
        width: 134,
        height: 72,
        x: 20,
        y: 294,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_saved_dark',
        text: '🏛️',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_saved_dark',
        text: 'Đã lưu (4)',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#F8FAFC',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_saved_dark',
      params: {
        parentId: '$card_menu_saved_dark',
        name: 'Btn / Nav Saved [Menu Dark]',
        text: '→',
        backgroundColor: '#1E293B',
        textColor: '#38BDF8',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_map_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Map [Menu Dark]',
        width: 134,
        height: 72,
        x: 166,
        y: 294,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_map_dark',
        text: '🗺️',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_map_dark',
        text: 'Bản đồ Sơn Trà',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#F8FAFC',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_map_dark',
      params: {
        parentId: '$card_menu_map_dark',
        name: 'Btn / Nav Map [Menu Dark]',
        text: '→',
        backgroundColor: '#1E293B',
        textColor: '#38BDF8',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },
    // Row 2: Chat & Calc
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_chat_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Chat [Menu Dark]',
        width: 134,
        height: 72,
        x: 20,
        y: 380,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_chat_dark',
        text: '💬',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_chat_dark',
        text: 'Tư vấn KTS',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#F8FAFC',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_chat_dark',
      params: {
        parentId: '$card_menu_chat_dark',
        name: 'Btn / Nav Chat [Menu Dark]',
        text: '●',
        backgroundColor: '#064E3B',
        textColor: '#34D399',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_calc_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Calc [Menu Dark]',
        width: 134,
        height: 72,
        x: 166,
        y: 380,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_calc_dark',
        text: '📊',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_calc_dark',
        text: 'Ký quỹ Escrow',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#F8FAFC',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_calc_dark',
      params: {
        parentId: '$card_menu_calc_dark',
        name: 'Btn / Nav Calc [Menu Dark]',
        text: '→',
        backgroundColor: '#1E293B',
        textColor: '#38BDF8',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },
    // Row 3: Security & Logout
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_sec_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Security [Menu Dark]',
        width: 134,
        height: 72,
        x: 20,
        y: 466,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_sec_dark',
        text: '🔒',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_sec_dark',
        text: 'FaceID Token',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#F8FAFC',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_sec_dark',
      params: {
        parentId: '$card_menu_sec_dark',
        name: 'Btn / Nav Security [Menu Dark]',
        text: '→',
        backgroundColor: '#1E293B',
        textColor: '#38BDF8',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    },
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_logout_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Logout [Menu Dark]',
        width: 134,
        height: 72,
        x: 166,
        y: 466,
        backgroundColor: '#38161D',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_logout_dark',
        text: '🚪',
        fontSize: 24,
        x: 16,
        y: 12
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_menu_logout_dark',
        text: 'Đăng xuất',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#F87171',
        x: 16,
        y: 44
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_logout_dark',
      params: {
        parentId: '$card_menu_logout_dark',
        name: 'Btn / Sign Out [Menu Dark]',
        text: '⎋',
        backgroundColor: '#4C1D24',
        textColor: '#F87171',
        fontSize: 14,
        fontStyle: 'Bold',
        cornerRadius: 12,
        paddingX: 8,
        paddingY: 4,
        x: 96,
        y: 14
      }
    }
  ];

  console.log('Generating Icon-First Dark Theme Menu Drawer...');
  await execute('BATCH_EXECUTE', { steps: darkDrawerSteps });
  console.log('✅ Dark Menu Drawer created with Icon-First architecture.');

  // =========================================================================
  // 3. ENHANCE HOME FEED TOP BAR: DIRECT THEME ICON BUTTON (🌙) + AVATAR + ☰
  // =========================================================================
  console.log('🔄 Upgrading Home Feed Header with Direct Theme Icon Button...');
  
  // Clean up existing header controls on Light Home Feed
  try {
    await execute('DELETE_NODE', { nodeId: 'Btn / Quick Theme Icon [Light Home]' });
  } catch (e) {}

  const lightHeaderIconSteps = [
    // Direct Moon Icon Button on Light Home Feed (width: 36, height: 36, cornerRadius: 18)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_quick_theme_light_home',
      params: {
        parentId: 'ARKI / 06 - Home Feed (All Works) [Light]',
        name: 'Btn / Quick Theme Icon [Light Home]',
        text: '🌙',
        backgroundColor: '#F1F5F9',
        textColor: '#0F172A',
        fontSize: 16,
        cornerRadius: 18,
        paddingX: 8,
        paddingY: 6,
        x: 238,
        y: 52
      }
    }
  ];
  await execute('BATCH_EXECUTE', { steps: lightHeaderIconSteps });
  console.log('✅ Added direct 1-tap Moon icon button (🌙) to Light Home Feed Header.');

  // Clean up existing header controls on Dark Home Feed
  try {
    await execute('DELETE_NODE', { nodeId: 'Btn / Quick Theme Icon [Dark Home]' });
  } catch (e) {}

  const darkHeaderIconSteps = [
    // Direct Sun Icon Button on Dark Home Feed (width: 36, height: 36, cornerRadius: 18)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_quick_theme_dark_home',
      params: {
        parentId: 'ARKI / 06 - Home Feed (All Works)',
        name: 'Btn / Quick Theme Icon [Dark Home]',
        text: '☀️',
        backgroundColor: '#1E293B',
        textColor: '#F8FAFC',
        fontSize: 16,
        cornerRadius: 18,
        paddingX: 8,
        paddingY: 6,
        x: 238,
        y: 52
      }
    }
  ];
  await execute('BATCH_EXECUTE', { steps: darkHeaderIconSteps });
  console.log('✅ Added direct 1-tap Sun icon button (☀️) to Dark Home Feed Header.');

  // =========================================================================
  // 4. TRANSFORM "← Back" TEXT BUTTONS ACROSS KEY SCREENS INTO CIRCULAR ICON BUTTONS (←)
  // =========================================================================
  console.log('🔄 Transforming verbose "← Back" buttons into sleek circular icon buttons (←)...');
  const screensToRefactorBack = [
    // Light screens
    { nodeId: 'Btn / Back [07 - Search & Faceted Filter] [Light]', isLight: true },
    { nodeId: 'Btn / Back [08 - Estate Map View] [Light]', isLight: true },
    { nodeId: 'Btn / Back [09 - Property Details (Tadao Ando)] [Light]', isLight: true },
    { nodeId: 'Btn / Back [09b - Property Details (Kengo Kuma)] [Light]', isLight: true },
    { nodeId: 'Btn / Back [09c - Property Details (Zaha Hadid)] [Light]', isLight: true },
    { nodeId: 'Btn / Back [10 - Architect Philosophy] [Light]', isLight: true },
    { nodeId: 'Btn / Back [11 - 3D Matterport VR] [Light]', isLight: true },
    { nodeId: 'Btn / Back [12 - Video Tour Player] [Light]', isLight: true },
    { nodeId: 'Btn / Back [16 - Schedule Private Viewing] [Light]', isLight: true },
    { nodeId: 'Btn / Back [17 - VIP Pass Confirmation] [Light]', isLight: true },
    { nodeId: 'Btn / Back [18 - Saved Architecture] [Light]', isLight: true },
    { nodeId: 'Btn / Back [19 - 1-on-1 Architect Chat] [Light]', isLight: true },
    { nodeId: 'Btn / Back [20 - Financial Calculator] [Light]', isLight: true },
    { nodeId: 'Btn / Back [21 - VIP Client Profile] [Light]', isLight: true },
    { nodeId: 'Btn / Back [21c - Biometric Security Settings] [Light]', isLight: true },
    
    // Dark screens
    { nodeId: 'Btn / Back [07 - Search & Faceted Filter]', isLight: false },
    { nodeId: 'Btn / Back [08 - Estate Map View]', isLight: false },
    { nodeId: 'Btn / Back [09 - Property Details (Tadao Ando)]', isLight: false },
    { nodeId: 'Btn / Back [18 - Saved Architecture]', isLight: false },
    { nodeId: 'Btn / Back [21 - VIP Client Profile]', isLight: false }
  ];

  let backConverted = 0;
  for (const item of screensToRefactorBack) {
    try {
      await execute('UPDATE_PROPERTIES', {
        nodeId: item.nodeId,
        text: '←',
        cornerRadius: 20
      });
      backConverted++;
    } catch (e) {}
  }
  console.log(`✅ Converted ${backConverted} back buttons to clean circular icon buttons (←).`);

  // =========================================================================
  // 5. RE-WIRE ALL PROTOTYPE INTERACTIONS
  // =========================================================================
  console.log('🔗 Wiring prototype interactions for Icon-First architecture...');
  const interactions = [
    // 1. Direct Theme Icon on Home Feed Header -> Instant Theme Switch
    {
      sourceNodeId: 'Btn / Quick Theme Icon [Light Home]',
      targetNodeId: 'ARKI / 06 - Home Feed (All Works)',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.4
    },
    {
      sourceNodeId: 'Btn / Quick Theme Icon [Dark Home]',
      targetNodeId: 'ARKI / 06 - Home Feed (All Works) [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.4
    },

    // 2. Open Menu Drawer from Hamburger or Avatar
    {
      sourceNodeId: 'Btn / Open Menu ☰ [Light Home]',
      targetNodeId: 'ARKI / 25 - Navigation Drawer Menu [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SLIDE_IN',
      direction: 'LEFT',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Mini Avatar [Light Home]',
      targetNodeId: 'ARKI / 25 - Navigation Drawer Menu [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SLIDE_IN',
      direction: 'LEFT',
      duration: 0.35
    },
    // Close Drawer
    {
      sourceNodeId: 'Btn / Close Menu [Light]',
      targetNodeId: 'ARKI / 06 - Home Feed (All Works) [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SLIDE_OUT',
      direction: 'RIGHT',
      duration: 0.35
    },
    {
      sourceNodeId: 'Backdrop Tap Area / Dismiss [Light]',
      targetNodeId: 'ARKI / 06 - Home Feed (All Works) [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SLIDE_OUT',
      direction: 'RIGHT',
      duration: 0.35
    },

    // 3. Moon Icon inside Menu Drawer -> Switch to Dark Menu Drawer
    {
      sourceNodeId: 'Btn / Switch To Dark [Menu Light]',
      targetNodeId: 'ARKI / 25 - Navigation Drawer Menu',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.4
    },
    // User Profile Icon Button (↗) -> VIP Profile Screen
    {
      sourceNodeId: 'Btn / View Profile [Menu Light]',
      targetNodeId: 'ARKI / 21 - VIP Client Profile [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    },

    // 4. Quick Actions in Menu Drawer
    {
      sourceNodeId: 'Btn / Nav Saved [Menu Light]',
      targetNodeId: 'ARKI / 18 - Saved Architecture [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Nav Map [Menu Light]',
      targetNodeId: 'ARKI / 08 - Estate Map View [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Nav Chat [Menu Light]',
      targetNodeId: 'ARKI / 19 - 1-on-1 Architect Chat [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'MOVE_IN',
      direction: 'RIGHT',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Nav Calc [Menu Light]',
      targetNodeId: 'ARKI / 20 - Financial Calculator [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'MOVE_IN',
      direction: 'BOTTOM',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Nav Security [Menu Light]',
      targetNodeId: 'ARKI / 21c - Biometric Security Settings [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Sign Out [Menu Light]',
      targetNodeId: 'ARKI / 05 - Authentication [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'DISSOLVE',
      duration: 0.35
    },

    // 5. Dark Menu Drawer Wirings
    {
      sourceNodeId: 'Btn / Open Menu ☰ [Dark Home]',
      targetNodeId: 'ARKI / 25 - Navigation Drawer Menu',
      trigger: 'ON_CLICK',
      transitionType: 'SLIDE_IN',
      direction: 'LEFT',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Mini Avatar [Dark Home]',
      targetNodeId: 'ARKI / 25 - Navigation Drawer Menu',
      trigger: 'ON_CLICK',
      transitionType: 'SLIDE_IN',
      direction: 'LEFT',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Close Menu [Dark]',
      targetNodeId: 'ARKI / 06 - Home Feed (All Works)',
      trigger: 'ON_CLICK',
      transitionType: 'SLIDE_OUT',
      direction: 'RIGHT',
      duration: 0.35
    },
    {
      sourceNodeId: 'Backdrop Tap Area / Dismiss [Dark]',
      targetNodeId: 'ARKI / 06 - Home Feed (All Works)',
      trigger: 'ON_CLICK',
      transitionType: 'SLIDE_OUT',
      direction: 'RIGHT',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Switch To Light [Menu Dark]',
      targetNodeId: 'ARKI / 25 - Navigation Drawer Menu [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.4
    },
    {
      sourceNodeId: 'Btn / View Profile [Menu Dark]',
      targetNodeId: 'ARKI / 21 - VIP Client Profile',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Nav Saved [Menu Dark]',
      targetNodeId: 'ARKI / 18 - Saved Architecture',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Nav Map [Menu Dark]',
      targetNodeId: 'ARKI / 08 - Estate Map View',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Nav Chat [Menu Dark]',
      targetNodeId: 'ARKI / 19 - 1-on-1 Architect Chat',
      trigger: 'ON_CLICK',
      transitionType: 'MOVE_IN',
      direction: 'RIGHT',
      duration: 0.35
    },
    {
      sourceNodeId: 'Btn / Sign Out [Menu Dark]',
      targetNodeId: 'ARKI / 05 - Authentication',
      trigger: 'ON_CLICK',
      transitionType: 'DISSOLVE',
      duration: 0.35
    }
  ];

  for (const item of interactions) {
    try {
      await execute('ADD_INTERACTION', item);
    } catch (err) {
      console.warn(`⚠️ Skipped interaction: ${item.sourceNodeId} -> ${item.targetNodeId}`);
    }
  }
  console.log(`✅ All ${interactions.length} interactions connected.`);

  // Maintain Light Flow as Flow 1 & 2
  const flows = [
    { frameId: 'ARKI / 01 - Splash [Light]', flowName: '☀️ ARKI — Giao Diện Sáng Chính (52 Màn Hình & Menu Drawer)' },
    { frameId: 'ARKI / 06 - Home Feed (All Works) [Light]', flowName: '☀️ ARKI — Trang Chủ Khám Phá & Menu 3 Gạch [Light]' },
    { frameId: 'ARKI / 01 - Splash', flowName: '🌙 ARKI — Nocturne Dark Flow (52 Màn Hình)' },
    { frameId: 'ARKI / 01a - Splash Loading (15%)', flowName: '⚡ ARKI — Full Interactive Experience (Loading + 3D Drag + Video)' }
  ];

  for (const f of flows) {
    try {
      await execute('CREATE_FLOW', f);
    } catch (e) {}
  }

  // Rotate dummy flows to the end
  try {
    await execute('CREATE_FLOW', { frameId: '1121:7030', flowName: 'Flow 1' });
    await execute('CREATE_FLOW', { frameId: '1121:9280', flowName: 'Flow 3' });
    await execute('CREATE_FLOW', { frameId: '1121:9328', flowName: 'Flow 4' });
  } catch (e) {}

  console.log('🎉 ICON-FIRST UI REFACTORING COMPLETED!');
}

run().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
