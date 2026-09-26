#!/usr/bin/env node
// ARKI - UNIFIED MONOCHROME LINE-DRAWING ICON SYSTEM
// Replaces all colorful OS emojis with a single, unified architectural vector line-art icon family.
// Consistent 2px stroke, monochrome palette, zero rainbow emojis.

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://localhost:8765';

const IMAGES = {
  architectPortrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
};

// Unified Material Outlined Line-Drawing Icon Set (Stroke Style)
const ICONS = {
  light: {
    sunActive: 'https://img.icons8.com/material-outlined/48/0284C7/sun.png',
    moonInactive: 'https://img.icons8.com/material-outlined/48/64748B/moon.png',
    globe: 'https://img.icons8.com/material-outlined/48/0284C7/globe.png',
    bookmark: 'https://img.icons8.com/material-outlined/48/0F172A/bookmark.png',
    map: 'https://img.icons8.com/material-outlined/48/0F172A/map.png',
    chat: 'https://img.icons8.com/material-outlined/48/0F172A/speech-bubble.png',
    chart: 'https://img.icons8.com/material-outlined/48/0F172A/combo-chart.png',
    lock: 'https://img.icons8.com/material-outlined/48/0F172A/lock.png',
    logout: 'https://img.icons8.com/material-outlined/48/DC2626/logout-rounded.png',
    extLink: 'https://img.icons8.com/material-outlined/48/0284C7/external-link.png'
  },
  dark: {
    sunInactive: 'https://img.icons8.com/material-outlined/48/94A3B8/sun.png',
    moonActive: 'https://img.icons8.com/material-outlined/48/38BDF8/moon.png',
    globe: 'https://img.icons8.com/material-outlined/48/38BDF8/globe.png',
    bookmark: 'https://img.icons8.com/material-outlined/48/F8FAFC/bookmark.png',
    map: 'https://img.icons8.com/material-outlined/48/F8FAFC/map.png',
    chat: 'https://img.icons8.com/material-outlined/48/F8FAFC/speech-bubble.png',
    chart: 'https://img.icons8.com/material-outlined/48/F8FAFC/combo-chart.png',
    lock: 'https://img.icons8.com/material-outlined/48/F8FAFC/lock.png',
    logout: 'https://img.icons8.com/material-outlined/48/F87171/logout-rounded.png',
    extLink: 'https://img.icons8.com/material-outlined/48/38BDF8/external-link.png'
  }
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
  console.log('🖋️ Deploying Unified Monochrome Line-Drawing Icon Architecture...');

  // Delete previous drawer frames to rebuild cleanly
  try {
    await execute('DELETE_NODE', { nodeId: 'ARKI / 25 - Navigation Drawer Menu [Light]' });
    console.log('🗑️ Cleared Light Menu Drawer.');
  } catch (e) {}

  try {
    await execute('DELETE_NODE', { nodeId: 'ARKI / 25 - Navigation Drawer Menu' });
    console.log('🗑️ Cleared Dark Menu Drawer.');
  } catch (e) {}

  // =========================================================================
  // 1. REBUILD LIGHT THEME MENU DRAWER (UNIFIED LINE ICONS)
  // =========================================================================
  const lightDrawerSteps = [
    // Root Frame (393x852)
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
    // Left Tap Dismiss Scrim (73px)
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
    // Drawer Panel (width: 320, height: 852)
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
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 82,
        y: 42
      }
    },
    // Close Button (✕)
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

    // --- USER PROFILE CARD ---
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
        text: '✦ BLACK DIAMOND #004',
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
    // Line-art External Link Icon Button (↗)
    {
      action: 'CREATE_FRAME',
      ref: 'btn_menu_view_profile_light',
      params: {
        parentId: '$card_user_light',
        name: 'Btn / View Profile [Menu Light]',
        width: 32,
        height: 32,
        x: 236,
        y: 24,
        cornerRadius: 16,
        backgroundColor: '#E0F2FE'
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$btn_menu_view_profile_light',
        name: 'Icon / ExtLink',
        width: 16,
        height: 16,
        x: 8,
        y: 8,
        imageUrl: ICONS.light.extLink,
        color: '#0284C7'
      }
    },

    // --- ROW: UNIFIED THEME (LINE ICONS) & LANGUAGE (GLOBE + PILLS) ---
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
        x: 166,
        y: 176
      }
    },

    // 1. Theme Line-Drawing Segmented Container (width: 134, height: 46)
    {
      action: 'CREATE_FRAME',
      ref: 'theme_container_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Container / Theme Icon Segmented',
        width: 134,
        height: 46,
        x: 20,
        y: 194,
        backgroundColor: '#F1F5F9',
        cornerRadius: 14
      }
    },
    // Sun Active Pill (White elevated)
    {
      action: 'CREATE_FRAME',
      ref: 'pill_sun_active',
      params: {
        parentId: '$theme_container_light',
        name: 'Pill / Sun Active',
        width: 61,
        height: 38,
        x: 4,
        y: 4,
        backgroundColor: '#FFFFFF',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$pill_sun_active',
        name: 'Icon / Sun Line',
        width: 22,
        height: 22,
        x: 19,
        y: 8,
        imageUrl: ICONS.light.sunActive,
        color: '#0284C7'
      }
    },
    // Moon Inactive Clickable Button
    {
      action: 'CREATE_FRAME',
      ref: 'btn_menu_switch_dark',
      params: {
        parentId: '$theme_container_light',
        name: 'Btn / Switch To Dark [Menu Light]',
        width: 61,
        height: 38,
        x: 69,
        y: 4,
        backgroundColor: '#F1F5F900',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$btn_menu_switch_dark',
        name: 'Icon / Moon Line',
        width: 22,
        height: 22,
        x: 19,
        y: 8,
        imageUrl: ICONS.light.moonInactive,
        color: '#64748B'
      }
    },

    // 2. Language Segmented Container with Globe Line Icon (width: 134, height: 46)
    {
      action: 'CREATE_FRAME',
      ref: 'lang_container_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Container / Lang Segmented',
        width: 134,
        height: 46,
        x: 166,
        y: 194,
        backgroundColor: '#F1F5F9',
        cornerRadius: 14
      }
    },
    // VI Active Pill
    {
      action: 'CREATE_FRAME',
      ref: 'pill_lang_vi_active',
      params: {
        parentId: '$lang_container_light',
        name: 'Pill / VI Active',
        width: 61,
        height: 38,
        x: 4,
        y: 4,
        backgroundColor: '#0284C7',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$pill_lang_vi_active',
        text: 'VI',
        fontSize: 13,
        fontStyle: 'Bold',
        color: '#FFFFFF',
        x: 23,
        y: 11
      }
    },
    // EN Inactive Button
    {
      action: 'CREATE_FRAME',
      ref: 'btn_menu_lang_en',
      params: {
        parentId: '$lang_container_light',
        name: 'Btn / Switch To English [Menu Light]',
        width: 61,
        height: 38,
        x: 69,
        y: 4,
        backgroundColor: '#F1F5F900',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$btn_menu_lang_en',
        text: 'EN',
        fontSize: 13,
        fontStyle: 'Medium',
        color: '#64748B',
        x: 22,
        y: 11
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
        y: 256,
        backgroundColor: '#E2E8F0'
      }
    },

    // --- 2x3 QUICK ACTION MATRIX WITH UNIFIED LINE DRAWING ICONS ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'QUICK ACTIONS',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 20,
        y: 270
      }
    },

    // ROW 1: Bookmark / Saved & Map Location
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
        y: 288,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_saved_light',
        name: 'Line Icon / Bookmark',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.light.bookmark,
        color: '#0F172A'
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
        y: 288,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_map_light',
        name: 'Line Icon / Map',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.light.map,
        color: '#0F172A'
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

    // ROW 2: Architect Chat & Financial Escrow
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
        y: 372,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_chat_light',
        name: 'Line Icon / Chat',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.light.chat,
        color: '#0F172A'
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

    // Card 4: Calculator / Chart
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_calc_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / Calc [Menu Light]',
        width: 134,
        height: 72,
        x: 166,
        y: 372,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_calc_light',
        name: 'Line Icon / Chart',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.light.chart,
        color: '#0F172A'
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

    // ROW 3: Security Lock & Sign Out
    // Card 5: Security Lock
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_sec_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / Security [Menu Light]',
        width: 134,
        height: 72,
        x: 20,
        y: 456,
        backgroundColor: '#F8FAFC',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_sec_light',
        name: 'Line Icon / Lock',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.light.lock,
        color: '#0F172A'
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

    // Card 6: Sign Out (Line Icon Logout)
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_logout_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / Logout [Menu Light]',
        width: 134,
        height: 72,
        x: 166,
        y: 456,
        backgroundColor: '#FEF2F2',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_logout_light',
        name: 'Line Icon / Logout',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.light.logout,
        color: '#DC2626'
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
        x: 95,
        y: 730
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: '✦ Minimalist Vector Line Icon Architecture',
        fontSize: 10,
        fontStyle: 'Medium',
        color: '#0284C7',
        x: 52,
        y: 750
      }
    }
  ];

  console.log('Generating Light Theme Menu Drawer with unified line-drawing icons...');
  await execute('BATCH_EXECUTE', { steps: lightDrawerSteps });
  console.log('✅ Light Drawer generated with unified line-art icons.');

  // =========================================================================
  // 2. REBUILD DARK THEME MENU DRAWER (UNIFIED LINE ICONS)
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
        fontSize: 10,
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
        text: '✦ BLACK DIAMOND #004',
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
      action: 'CREATE_FRAME',
      ref: 'btn_menu_view_profile_dark',
      params: {
        parentId: '$card_user_dark',
        name: 'Btn / View Profile [Menu Dark]',
        width: 32,
        height: 32,
        x: 236,
        y: 24,
        cornerRadius: 16,
        backgroundColor: '#1E293B'
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$btn_menu_view_profile_dark',
        name: 'Icon / ExtLink [Dark]',
        width: 16,
        height: 16,
        x: 8,
        y: 8,
        imageUrl: ICONS.dark.extLink,
        color: '#38BDF8'
      }
    },
    // Theme & Language Row (Dark)
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
        x: 166,
        y: 176
      }
    },
    // Theme Container (Dark)
    {
      action: 'CREATE_FRAME',
      ref: 'theme_container_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Container / Theme Icon Segmented [Dark]',
        width: 134,
        height: 46,
        x: 20,
        y: 194,
        backgroundColor: '#131B2E',
        cornerRadius: 14
      }
    },
    // Sun Inactive Button (Switch to Light)
    {
      action: 'CREATE_FRAME',
      ref: 'btn_menu_switch_light',
      params: {
        parentId: '$theme_container_dark',
        name: 'Btn / Switch To Light [Menu Dark]',
        width: 61,
        height: 38,
        x: 4,
        y: 4,
        backgroundColor: '#131B2E00',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$btn_menu_switch_light',
        name: 'Icon / Sun Line [Dark]',
        width: 22,
        height: 22,
        x: 19,
        y: 8,
        imageUrl: ICONS.dark.sunInactive,
        color: '#94A3B8'
      }
    },
    // Moon Active Pill
    {
      action: 'CREATE_FRAME',
      ref: 'pill_moon_active',
      params: {
        parentId: '$theme_container_dark',
        name: 'Pill / Moon Active',
        width: 61,
        height: 38,
        x: 69,
        y: 4,
        backgroundColor: '#38BDF8',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$pill_moon_active',
        name: 'Icon / Moon Line [Active Dark]',
        width: 22,
        height: 22,
        x: 19,
        y: 8,
        imageUrl: ICONS.dark.moonActive,
        color: '#07090E'
      }
    },

    // Language Container (Dark)
    {
      action: 'CREATE_FRAME',
      ref: 'lang_container_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Container / Lang Segmented [Dark]',
        width: 134,
        height: 46,
        x: 166,
        y: 194,
        backgroundColor: '#131B2E',
        cornerRadius: 14
      }
    },
    // VI Active Pill
    {
      action: 'CREATE_FRAME',
      ref: 'pill_lang_vi_dark',
      params: {
        parentId: '$lang_container_dark',
        name: 'Pill / VI Active [Dark]',
        width: 61,
        height: 38,
        x: 4,
        y: 4,
        backgroundColor: '#38BDF8',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$pill_lang_vi_dark',
        text: 'VI',
        fontSize: 13,
        fontStyle: 'Bold',
        color: '#07090E',
        x: 23,
        y: 11
      }
    },
    // EN Button
    {
      action: 'CREATE_FRAME',
      ref: 'btn_menu_lang_en_dark',
      params: {
        parentId: '$lang_container_dark',
        name: 'Btn / Switch To English [Menu Dark]',
        width: 61,
        height: 38,
        x: 69,
        y: 4,
        backgroundColor: '#131B2E00',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$btn_menu_lang_en_dark',
        text: 'EN',
        fontSize: 13,
        fontStyle: 'Medium',
        color: '#94A3B8',
        x: 22,
        y: 11
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
        y: 256,
        backgroundColor: '#1E293B'
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: 'QUICK ACTIONS',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#64748B',
        x: 20,
        y: 270
      }
    },

    // 2x3 Matrix (Dark)
    // Card 1: Saved
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_saved_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Saved [Menu Dark]',
        width: 134,
        height: 72,
        x: 20,
        y: 288,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_saved_dark',
        name: 'Line Icon / Bookmark [Dark]',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.dark.bookmark,
        color: '#F8FAFC'
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

    // Card 2: Map
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_map_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Map [Menu Dark]',
        width: 134,
        height: 72,
        x: 166,
        y: 288,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_map_dark',
        name: 'Line Icon / Map [Dark]',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.dark.map,
        color: '#F8FAFC'
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

    // Card 3: Chat
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_chat_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Chat [Menu Dark]',
        width: 134,
        height: 72,
        x: 20,
        y: 372,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_chat_dark',
        name: 'Line Icon / Chat [Dark]',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.dark.chat,
        color: '#F8FAFC'
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

    // Card 4: Calc
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_calc_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Calc [Menu Dark]',
        width: 134,
        height: 72,
        x: 166,
        y: 372,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_calc_dark',
        name: 'Line Icon / Chart [Dark]',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.dark.chart,
        color: '#F8FAFC'
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

    // Card 5: Security Lock
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_sec_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Security [Menu Dark]',
        width: 134,
        height: 72,
        x: 20,
        y: 456,
        backgroundColor: '#131B2E',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_sec_dark',
        name: 'Line Icon / Lock [Dark]',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.dark.lock,
        color: '#F8FAFC'
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

    // Card 6: Sign Out (Dark)
    {
      action: 'CREATE_FRAME',
      ref: 'card_menu_logout_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Card / Logout [Menu Dark]',
        width: 134,
        height: 72,
        x: 166,
        y: 456,
        backgroundColor: '#38161D',
        cornerRadius: 16
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_menu_logout_dark',
        name: 'Line Icon / Logout [Dark]',
        width: 22,
        height: 22,
        x: 16,
        y: 12,
        imageUrl: ICONS.dark.logout,
        color: '#F87171'
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

  console.log('Generating Dark Theme Menu Drawer with unified line-drawing icons...');
  await execute('BATCH_EXECUTE', { steps: darkDrawerSteps });
  console.log('✅ Dark Drawer generated with unified line-art icons.');

  // =========================================================================
  // 3. UPDATE HEADER ON HOME FEED: CLEAN LINE-ART MOON ICON
  // =========================================================================
  console.log('🔄 Upgrading Home Feed Header with pure line-art icons...');
  try {
    await execute('DELETE_NODE', { nodeId: 'Btn / Quick Theme Icon [Light Home]' });
  } catch (e) {}

  const lightHeaderLineIcon = [
    {
      action: 'CREATE_FRAME',
      ref: 'btn_quick_theme_line_light',
      params: {
        parentId: 'ARKI / 06 - Home Feed (All Works) [Light]',
        name: 'Btn / Quick Theme Line Icon [Light Home]',
        width: 36,
        height: 36,
        x: 238,
        y: 52,
        backgroundColor: '#F1F5F9',
        cornerRadius: 18
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$btn_quick_theme_line_light',
        name: 'Icon / Moon Header Line',
        width: 18,
        height: 18,
        x: 9,
        y: 9,
        imageUrl: ICONS.light.moonInactive,
        color: '#0F172A'
      }
    }
  ];
  await execute('BATCH_EXECUTE', { steps: lightHeaderLineIcon });
  console.log('✅ Updated Home Feed header with monochrome line-art moon icon.');

  // =========================================================================
  // 4. RE-CONNECT PROTOTYPE INTERACTIONS
  // =========================================================================
  console.log('🔗 Wiring prototype transitions...');
  const interactions = [
    // Header direct theme toggle
    {
      sourceNodeId: 'Btn / Quick Theme Line Icon [Light Home]',
      targetNodeId: 'ARKI / 06 - Home Feed (All Works)',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.4
    },
    // Open Light Drawer from Home (Hamburger or Avatar)
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
    // Close Light Drawer (✕ or Tap Scrim)
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
    // Switch Theme inside Drawer (Moon line button)
    {
      sourceNodeId: 'Btn / Switch To Dark [Menu Light]',
      targetNodeId: 'ARKI / 25 - Navigation Drawer Menu',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.4
    },
    // User Profile Link (ExtLink line button)
    {
      sourceNodeId: 'Btn / View Profile [Menu Light]',
      targetNodeId: 'ARKI / 21 - VIP Client Profile [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    },
    // Quick Actions
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

    // Dark Drawer Wirings
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
      console.warn(`⚠️ Skipped interaction: ${item.sourceNodeId}`);
    }
  }
  console.log(`✅ Wired ${interactions.length} interactions.`);

  // Keep Light flow as Flow 1 & 2
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

  console.log('🎉 UNIFIED MONOCHROME LINE-DRAWING ICON SYSTEM DEPLOYED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
