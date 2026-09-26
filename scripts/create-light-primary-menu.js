#!/usr/bin/env node
// ARKI - PIXEL-PERFECT LIGHT THEME PRIMARY & COMPACT HAMBURGER MENU DRAWER
// Calibrated relative coordinates for 320px slide-over drawer inside 393px viewport.

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
  console.log('🚀 Generating Pixel-Perfect Navigation Drawer & Prototyping Wirings...');

  // Remove existing drawer frames if they exist to rebuild cleanly
  try {
    await execute('DELETE_NODE', { nodeId: 'ARKI / 25 - Navigation Drawer Menu [Light]' });
    console.log('🗑️ Cleared previous Light Menu Drawer.');
  } catch (e) {}

  try {
    await execute('DELETE_NODE', { nodeId: 'ARKI / 25 - Navigation Drawer Menu' });
    console.log('🗑️ Cleared previous Dark Menu Drawer.');
  } catch (e) {}

  // =========================================================================
  // 1. LIGHT THEME MENU DRAWER (ARKI / 25 - Navigation Drawer Menu [Light])
  // =========================================================================
  const lightDrawerSteps = [
    // Root Frame: 393x852 at x: 4800, y: 6457
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
    // Left Tap Scrim to Dismiss (x: 0, width: 73)
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
    // White Drawer Container (x: 73, width: 320, height: 852)
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

    // --- HEADER INSIDE DRAWER (relative to drawer_panel_light: width 320) ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'A R K I',
        fontSize: 18,
        fontStyle: 'Bold',
        color: '#0284C7',
        x: 20,
        y: 38
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'PRIVILEGE',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 80,
        y: 44
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
        y: 32
      }
    },

    // --- USER PROFILE & AVATAR CARD ---
    {
      action: 'CREATE_FRAME',
      ref: 'card_user_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Card / VIP Profile [Light]',
        width: 280,
        height: 108,
        x: 20,
        y: 82,
        backgroundColor: '#F8FAFC',
        cornerRadius: 18
      }
    },
    // Avatar inside Card (relative to card_user_light)
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_user_light',
        name: 'User Avatar Image',
        width: 52,
        height: 52,
        x: 14,
        y: 14,
        cornerRadius: 26,
        imageUrl: IMAGES.architectPortrait,
        color: '#0284C7'
      }
    },
    // Green Online VIP Dot
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$card_user_light',
        name: 'Dot / Online VIP',
        width: 14,
        height: 14,
        x: 52,
        y: 52,
        cornerRadius: 7,
        backgroundColor: '#10B981'
      }
    },
    // Name
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_user_light',
        text: 'Alexander Vance',
        fontSize: 15,
        fontStyle: 'Bold',
        color: '#0F172A',
        x: 78,
        y: 14
      }
    },
    // Tier Badge
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$card_user_light',
        name: 'Badge / Tier',
        width: 136,
        height: 20,
        x: 78,
        y: 36,
        cornerRadius: 6,
        backgroundColor: '#E0F2FE'
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
        x: 84,
        y: 40
      }
    },
    // Email
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_user_light',
        text: 'alexander@forbes-global.com',
        fontSize: 11,
        color: '#64748B',
        x: 78,
        y: 60
      }
    },
    // View Profile Link Button
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_view_profile_light',
      params: {
        parentId: '$card_user_light',
        name: 'Btn / View Profile [Menu Light]',
        text: 'Hồ sơ VIP & Đặc quyền →',
        backgroundColor: '#F8FAFC00',
        textColor: '#0284C7',
        fontSize: 11,
        paddingX: 0,
        paddingY: 2,
        x: 78,
        y: 80
      }
    },

    // --- THEME SWITCHER SECTION (VỚI ICON NHỎ LẠI) ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'CHỦ ĐỀ GIAO DIỆN (THEME)',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 20,
        y: 204
      }
    },
    // Theme Segmented Container (width: 280)
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Container / Theme Segmented',
        width: 280,
        height: 44,
        x: 20,
        y: 222,
        backgroundColor: '#F1F5F9',
        cornerRadius: 12
      }
    },
    // Active Light Option (Sáng chính)
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Pill / Light Active',
        width: 136,
        height: 36,
        x: 24,
        y: 226,
        backgroundColor: '#FFFFFF',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: '☀️ Sáng (Chính)',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#0284C7',
        x: 44,
        y: 236
      }
    },
    // Dark Option (Nút chuyển sang Dark với icon nhỏ)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_switch_dark',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Switch To Dark [Menu Light]',
        text: '🌙 Tối',
        backgroundColor: '#F1F5F900',
        textColor: '#64748B',
        fontSize: 12,
        cornerRadius: 10,
        paddingX: 18,
        paddingY: 8,
        x: 164,
        y: 226
      }
    },

    // --- LANGUAGE SWITCHER SECTION (TIẾNG ANH - VIỆT) ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'NGÔN NGỮ (LANGUAGE)',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 20,
        y: 278
      }
    },
    // Language Segmented Container (width: 280)
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Container / Lang Segmented',
        width: 280,
        height: 44,
        x: 20,
        y: 296,
        backgroundColor: '#F1F5F9',
        cornerRadius: 12
      }
    },
    // Active Tiếng Việt
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Pill / Lang VI Active',
        width: 136,
        height: 36,
        x: 24,
        y: 300,
        backgroundColor: '#0284C7',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: '🇻🇳 Tiếng Việt',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#FFFFFF',
        x: 52,
        y: 310
      }
    },
    // English Option
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_lang_en',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Switch To English [Menu Light]',
        text: '🇬🇧 English',
        backgroundColor: '#F1F5F900',
        textColor: '#64748B',
        fontSize: 12,
        cornerRadius: 10,
        paddingX: 14,
        paddingY: 8,
        x: 164,
        y: 300
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
        y: 352,
        backgroundColor: '#E2E8F0'
      }
    },

    // --- QUICK NAVIGATION MENU ITEMS ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'ĐIỀU HƯỚNG NHANH (NAVIGATION)',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#94A3B8',
        x: 20,
        y: 366
      }
    },
    // Item 1: Dinh thự đã lưu (Saved)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_saved_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Nav Saved [Menu Light]',
        text: '🏛️  Bộ Sưu Tập Đã Lưu (4)               →',
        backgroundColor: '#F8FAFC',
        textColor: '#0F172A',
        fontSize: 12,
        cornerRadius: 12,
        paddingX: 16,
        paddingY: 12,
        x: 20,
        y: 384
      }
    },
    // Item 2: Bản đồ vệ tinh (Map)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_map_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Nav Map [Menu Light]',
        text: '🗺️  Bản Đồ Bờ Biển Sơn Trà           →',
        backgroundColor: '#F8FAFC',
        textColor: '#0F172A',
        fontSize: 12,
        cornerRadius: 12,
        paddingX: 16,
        paddingY: 12,
        x: 20,
        y: 434
      }
    },
    // Item 3: Tư vấn KTS (Chat)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_chat_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Nav Chat [Menu Light]',
        text: '💬  Tư Vấn Trực Tiếp KTS Tadao       ●',
        backgroundColor: '#F8FAFC',
        textColor: '#0F172A',
        fontSize: 12,
        cornerRadius: 12,
        paddingX: 16,
        paddingY: 12,
        x: 20,
        y: 484
      }
    },
    // Item 4: Dự toán tài chính & Escrow
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_calc_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Nav Calc [Menu Light]',
        text: '📊  Ước Tính Tài Chính & Escrow       →',
        backgroundColor: '#F8FAFC',
        textColor: '#0F172A',
        fontSize: 12,
        cornerRadius: 12,
        paddingX: 16,
        paddingY: 12,
        x: 20,
        y: 534
      }
    },
    // Item 5: Cài đặt FaceID & Bảo mật
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_sec_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Nav Security [Menu Light]',
        text: '🔒  Bảo Mật Sinh Trắc FaceID          →',
        backgroundColor: '#F8FAFC',
        textColor: '#0F172A',
        fontSize: 12,
        cornerRadius: 12,
        paddingX: 16,
        paddingY: 12,
        x: 20,
        y: 584
      }
    },

    // --- SIGN OUT BUTTON ---
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_logout_light',
      params: {
        parentId: '$drawer_panel_light',
        name: 'Btn / Sign Out [Menu Light]',
        text: '🚪  Đăng Xuất Tài Khoản VIP',
        backgroundColor: '#FEF2F2',
        textColor: '#DC2626',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 20,
        paddingY: 12,
        x: 20,
        y: 654
      }
    },

    // --- FOOTER BRANDING ---
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'ARKI Luxury Living v2.4 • UIT IE106 Edition',
        fontSize: 11,
        color: '#94A3B8',
        x: 35,
        y: 720
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_light',
        text: 'Giao Diện Sáng Mặc Định (Primary Daylight Theme)',
        fontSize: 10,
        fontStyle: 'Medium',
        color: '#0284C7',
        x: 30,
        y: 738
      }
    }
  ];

  console.log('Building calibrated Light Theme Menu Drawer...');
  await execute('BATCH_EXECUTE', { steps: lightDrawerSteps });
  console.log('✅ Light Drawer Panel generated.');

  // =========================================================================
  // 2. DARK THEME MENU DRAWER (ARKI / 25 - Navigation Drawer Menu)
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
        y: 38
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: 'PRIVILEGE',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#64748B',
        x: 80,
        y: 44
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
        y: 32
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
        height: 108,
        x: 20,
        y: 82,
        backgroundColor: '#131B2E',
        cornerRadius: 18
      }
    },
    {
      action: 'CREATE_RECTANGLE',
      params: {
        parentId: '$card_user_dark',
        name: 'User Avatar Image [Dark]',
        width: 52,
        height: 52,
        x: 14,
        y: 14,
        cornerRadius: 26,
        imageUrl: IMAGES.architectPortrait,
        color: '#38BDF8'
      }
    },
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$card_user_dark',
        name: 'Dot / Online VIP [Dark]',
        width: 14,
        height: 14,
        x: 52,
        y: 52,
        cornerRadius: 7,
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
        x: 78,
        y: 14
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
        x: 78,
        y: 38
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$card_user_dark',
        text: 'alexander@forbes-global.com',
        fontSize: 11,
        color: '#94A3B8',
        x: 78,
        y: 60
      }
    },
    // Theme Switcher Section
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: 'CHỦ ĐỀ GIAO DIỆN (THEME)',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#64748B',
        x: 20,
        y: 204
      }
    },
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Container / Theme Segmented [Dark]',
        width: 280,
        height: 44,
        x: 20,
        y: 222,
        backgroundColor: '#131B2E',
        cornerRadius: 12
      }
    },
    // Switch to Light Button (Nút icon nhỏ)
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_switch_light',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Btn / Switch To Light [Menu Dark]',
        text: '☀️ Sáng (Chính)',
        backgroundColor: '#1E293B',
        textColor: '#94A3B8',
        fontSize: 12,
        cornerRadius: 10,
        paddingX: 14,
        paddingY: 8,
        x: 24,
        y: 226
      }
    },
    // Dark Active Pill
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Pill / Dark Active',
        width: 136,
        height: 36,
        x: 164,
        y: 226,
        backgroundColor: '#38BDF8',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: '🌙 Tối (Active)',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#07090E',
        x: 196,
        y: 236
      }
    },
    // Language Section
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: 'NGÔN NGỮ (LANGUAGE)',
        fontSize: 10,
        fontStyle: 'Bold',
        color: '#64748B',
        x: 20,
        y: 278
      }
    },
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Container / Lang Segmented [Dark]',
        width: 280,
        height: 44,
        x: 20,
        y: 296,
        backgroundColor: '#131B2E',
        cornerRadius: 12
      }
    },
    {
      action: 'CREATE_FRAME',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Pill / Lang VI Active [Dark]',
        width: 136,
        height: 36,
        x: 24,
        y: 300,
        backgroundColor: '#38BDF8',
        cornerRadius: 10
      }
    },
    {
      action: 'CREATE_TEXT',
      params: {
        parentId: '$drawer_panel_dark',
        text: '🇻🇳 Tiếng Việt',
        fontSize: 12,
        fontStyle: 'Bold',
        color: '#07090E',
        x: 52,
        y: 310
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_lang_en_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Btn / Switch To English [Menu Dark]',
        text: '🇬🇧 English',
        backgroundColor: '#131B2E00',
        textColor: '#94A3B8',
        fontSize: 12,
        cornerRadius: 10,
        paddingX: 14,
        paddingY: 8,
        x: 164,
        y: 300
      }
    },
    // Navigation items
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_saved_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Btn / Nav Saved [Menu Dark]',
        text: '🏛️  Bộ Sưu Tập Đã Lưu (4)               →',
        backgroundColor: '#131B2E',
        textColor: '#F8FAFC',
        fontSize: 12,
        cornerRadius: 12,
        paddingX: 16,
        paddingY: 12,
        x: 20,
        y: 384
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_map_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Btn / Nav Map [Menu Dark]',
        text: '🗺️  Bản Đồ Bờ Biển Sơn Trà           →',
        backgroundColor: '#131B2E',
        textColor: '#F8FAFC',
        fontSize: 12,
        cornerRadius: 12,
        paddingX: 16,
        paddingY: 12,
        x: 20,
        y: 434
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_chat_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Btn / Nav Chat [Menu Dark]',
        text: '💬  Tư Vấn Trực Tiếp KTS Tadao       ●',
        backgroundColor: '#131B2E',
        textColor: '#F8FAFC',
        fontSize: 12,
        cornerRadius: 12,
        paddingX: 16,
        paddingY: 12,
        x: 20,
        y: 484
      }
    },
    {
      action: 'CREATE_BUTTON',
      ref: 'btn_menu_logout_dark',
      params: {
        parentId: '$drawer_panel_dark',
        name: 'Btn / Sign Out [Menu Dark]',
        text: '🚪  Đăng Xuất VIP',
        backgroundColor: '#38161D',
        textColor: '#F87171',
        fontSize: 13,
        cornerRadius: 12,
        paddingX: 20,
        paddingY: 12,
        x: 20,
        y: 654
      }
    }
  ];

  console.log('Building calibrated Dark Theme Menu Drawer...');
  await execute('BATCH_EXECUTE', { steps: darkDrawerSteps });
  console.log('✅ Dark Drawer Panel generated.');

  // =========================================================================
  // 3. RE-WIRE ALL PROTOTYPE INTERACTIONS
  // =========================================================================
  console.log('🔗 Wiring prototype transitions...');
  const interactions = [
    // Open Light Drawer from Home
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
    // Close Light Drawer
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
    // Toggle Theme inside Light Drawer
    {
      sourceNodeId: 'Btn / Switch To Dark [Menu Light]',
      targetNodeId: 'ARKI / 25 - Navigation Drawer Menu',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.4
    },
    // Menu item links
    {
      sourceNodeId: 'Btn / View Profile [Menu Light]',
      targetNodeId: 'ARKI / 21 - VIP Client Profile [Light]',
      trigger: 'ON_CLICK',
      transitionType: 'SMART_ANIMATE',
      duration: 0.35
    },
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
      console.warn(`⚠️ Interaction skipped: ${item.sourceNodeId} -> ${item.targetNodeId} (${err.message})`);
    }
  }
  console.log(`✅ All ${interactions.length} interactions connected.`);

  // =========================================================================
  // 4. ENSURE LIGHT THEME REMAINS FLOW 1 & FLOW 2
  // =========================================================================
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

  console.log('🎉 Calibrated menu generation complete!');
}

run().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
