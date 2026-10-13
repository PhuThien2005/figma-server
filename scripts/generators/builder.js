import http from 'http';
import { t } from './i18n.js';
import { getImageBase64 } from './image-cache.js';

export const TOKENS_LIGHT = {
  // Pure White Minimalist Palette (Authentic Vietnamese Luxury)
  bgDark: '#FFFFFF',          // Pure Crisp White Screen Background
  bgScreen: '#FFFFFF',        // Pure Crisp White Screen Background
  bgCard: '#FFFFFF',          // Pure White Bento Card Surface
  bgSurface: '#F8F9FA',       // Subtle pristine surface for secondary pills / badges
  border: '#E4E4E7',          // Delicate 1px hairline border
  textPrimary: '#09090B',     // Jet Black high-contrast typography
  textSecondary: '#52525B',   // Muted slate for architectural specs & captions
  textMuted: '#71717A',       // Soft metadata & timestamps
  accentGold: '#B45309',      // Indochine Heritage Gold / Pritzker Amber
  accentEmerald: '#059669',   // Lotus Jade Green (Verified status)
  btnPrimaryBg: '#09090B',    // Obsidian Jet Black primary CTA
  btnPrimaryText: '#FFFFFF',  // Crisp pure white text
  btnSecondaryBg: '#F4F4F5',  // Subtle light secondary button
  btnSecondaryText: '#09090B',
  dockBg: '#FFFFFFFA',        // Pure white bottom dock
  dockBorder: '#E4E4E7',
  favoriteBtnBg: '#FFFFFFFA', // Clean floating heart button
  favoriteBtnText: '#09090B',

  // Dimensions & Grid
  screenWidth: 393,
  screenHeight: 852,
  cornerRadiusScreen: 44,
  cornerRadiusCard: 20,
  cornerRadiusBtn: 12,
  cornerRadiusPill: 22,
  minTouchTarget: 44,

  // Spacing Scale
  spaceXS: 8,
  spaceSM: 12,
  spaceMD: 16,
  spaceLG: 24,
  spaceXL: 32
};

export const TOKENS_DARK = {
  bgDark: '#0B0C0E',
  bgScreen: '#0B0C0E',
  bgCard: '#131418',
  bgSurface: '#16181F',
  border: '#24262E',
  textPrimary: '#F4F4F6',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
  accentGold: '#C5A880',
  accentEmerald: '#10B981',
  btnPrimaryBg: '#F4F4F6',
  btnPrimaryText: '#0B0C0E',
  btnSecondaryBg: '#16181F',
  btnSecondaryText: '#D4D4D8',
  dockBg: '#090A0DF2',
  dockBorder: '#24262E',
  favoriteBtnBg: '#0B0C0ECC',
  favoriteBtnText: '#F4F4F6',

  screenWidth: 393,
  screenHeight: 852,
  cornerRadiusScreen: 44,
  cornerRadiusCard: 16,
  cornerRadiusBtn: 10,
  cornerRadiusPill: 22,
  minTouchTarget: 44,
  spaceXS: 8,
  spaceSM: 12,
  spaceMD: 16,
  spaceLG: 24,
  spaceXL: 32
};

// Default export is TOKENS_LIGHT (Primary Light Theme)
export const TOKENS = TOKENS_LIGHT;

export const IMAGES = {
  // 100% Authentic Vietnamese Architecture & Culture
  villaThaoDien: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Saigon_skyline.png',
  villaBaDinh: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Hanoi_Colonial_villa.jpg',
  resortHoiAn: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Hoi_An_Ancient_Town%2C_Vietnam_%286944581966%29.jpg',
  bambooSanctuary: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/C%C3%A0_ph%C3%AA_Gi%C3%B3_v%C3%A0_N%C6%B0%E1%BB%9Bc_%E1%BB%9F_B%C3%ACnh_D%C6%B0%C6%A1ng_%28b%C3%AAn_trong%29_%282%29.JPG',
  fptGreenMonolith: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/FPT_University_administration_building.jpg',
  architectVoTrongNghia: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Vo_Trong_Nghia_20141210_Braunschweig_768p.jpg',
  architectHoangThucHao: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/HoangThucHao.jpg',
  vietnameseLadyAoDai: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/A_Vietnamese_young_lady_in_ao_dai.jpg',
  vietnameseDirectorAoDai: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Vietnamese_girl_wearing_ao_dai.jpg',
  mapGoogleSaigon: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Map_of_Ho_Chi_Minh_City.jpg',

  // Backward-compatible aliases for all screen generators
  villaPool: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/C%C3%A0_ph%C3%AA_Gi%C3%B3_v%C3%A0_N%C6%B0%E1%BB%9Bc_%E1%BB%9F_B%C3%ACnh_D%C6%B0%C6%A1ng_%28b%C3%AAn_trong%29_%282%29.JPG',
  villaFront: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Hanoi_Colonial_villa.jpg',
  livingRoom: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Hoi_An_Ancient_Town%2C_Vietnam_%286944581966%29.jpg',
  kitchen: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/C%C3%A0_ph%C3%AA_Gi%C3%B3_v%C3%A0_N%C6%B0%E1%BB%9Bc_%E1%BB%9F_B%C3%ACnh_D%C6%B0%C6%A1ng_%28b%C3%AAn_trong%29_%282%29.JPG',
  sunsetEstate: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Saigon_skyline.png',
  brutalistVilla: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/FPT_University_administration_building.jpg',
  architectPortrait: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Vo_Trong_Nghia_20141210_Braunschweig_768p.jpg',
  mapSnapshot: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Map_of_Ho_Chi_Minh_City.jpg',
  bedroom: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Hoi_An_Ancient_Town%2C_Vietnam_%286944581966%29.jpg',
  garden: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/C%C3%A0_ph%C3%AA_Gi%C3%B3_v%C3%A0_N%C6%B0%E1%BB%9Bc_%E1%BB%9F_B%C3%ACnh_D%C6%B0%C6%A1ng_%28b%C3%AAn_trong%29_%282%29.JPG'
};

function execHttp(port, path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: '127.0.0.1',
      port: port,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ success: false, error: body });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function checkPortConnected(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/health`, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(!!(json.pluginConnected || json.figmaConnected));
        } catch (e) { resolve(false); }
      });
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => { req.destroy(); resolve(false); });
  });
}

const persistentRefMap = {};

export async function postToBridge(action, params = {}, timeoutMs = 60000) {
  // Check which bridge has an active Figma plugin connected
  const is38451Connected = await checkPortConnected(38451);
  const is8765Connected = !is38451Connected && await checkPortConnected(8765);

  if (!is38451Connected && !is8765Connected) {
    return { 
      success: false, 
      error: 'Plugin Figma chưa kết nối (Vui lòng mở Figma Desktop -> Plugins -> Development -> Chạy plugin AGY Figma Bridge hoặc Figma UI MCP)' 
    };
  }

  if (is8765Connected) {
    // Send to AGY Bridge (port 8765)
    return execHttp(8765, '/execute', { action, params, timeoutMs });
  }

  // Route to figma-ui-mcp (port 38451)
  if (action === 'BATCH_EXECUTE') {
    const steps = params.steps || [];
    const results = [];

    const resolveParent = (pId) => {
      if (!pId) return undefined;
      if (typeof pId === 'string' && pId.startsWith('$')) {
        const key = pId.slice(1);
        return persistentRefMap[key] || undefined;
      }
      return pId;
    };

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const p = step.params || {};
      const parentId = resolveParent(p.parentId);

      let op = 'create';
      let opParams = {};

      switch (step.action) {
        case 'CREATE_FRAME':
          opParams = {
            type: 'FRAME',
            name: p.name || 'Frame',
            width: p.width || 393,
            height: p.height || 852,
            x: p.x || 0,
            y: p.y || 0,
            fill: p.backgroundColor,
            cornerRadius: p.cornerRadius,
            clipsContent: p.clipsContent !== undefined ? p.clipsContent : true,
            parentId
          };
          break;

        case 'CREATE_TEXT':
          opParams = {
            type: 'TEXT',
            content: p.text || p.content || '',
            characters: p.text || p.characters || '',
            fontSize: p.fontSize || 14,
            fontWeight: p.fontStyle || 'Regular',
            fill: p.color || '#09090B',
            x: p.x || 0,
            y: p.y || 0,
            parentId
          };
          break;

        case 'CREATE_BUTTON': {
          const btnW = p.width || 345;
          const btnH = p.height || 48;
          try {
            const btnRes = await execHttp(38451, '/exec', {
              operation: 'create',
              params: {
                type: 'FRAME',
                name: p.name || 'Button',
                width: btnW,
                height: btnH,
                x: p.x || 0,
                y: p.y || 0,
                fill: p.backgroundColor || '#09090B',
                cornerRadius: p.cornerRadius || 12,
                parentId
              }
            });

            if (btnRes.success && btnRes.data && btnRes.data.id) {
              const btnNodeId = btnRes.data.id;
              if (step.ref) persistentRefMap[step.ref] = btnNodeId;

              if (p.text) {
                await execHttp(38451, '/exec', {
                  operation: 'create',
                  params: {
                    type: 'TEXT',
                    content: p.text,
                    characters: p.text,
                    fontSize: 14,
                    fontWeight: 'Bold',
                    fill: p.textColor || '#FFFFFF',
                    x: 20,
                    y: Math.max(8, Math.round((btnH - 18) / 2)),
                    parentId: btnNodeId
                  }
                });
              }
              results.push({ index: i, success: true, id: btnNodeId });
              continue;
            }
          } catch (e) {
            results.push({ index: i, success: false, error: e.message });
            continue;
          }
          break;
        }

        case 'CREATE_RECTANGLE':
        case 'INSERT_IMAGE': {
          const isImg = step.action === 'INSERT_IMAGE' || !!p.imageUrl;
          const b64 = isImg ? getImageBase64(p.name || p.imageUrl || '') : null;
          if (b64) {
            opParams = {
              type: 'IMAGE',
              name: p.name || 'Photo / Visual',
              width: p.width || 100,
              height: p.height || 100,
              x: p.x || 0,
              y: p.y || 0,
              cornerRadius: p.cornerRadius,
              imageData: b64,
              scaleMode: 'FILL',
              parentId
            };
          } else {
            opParams = {
              type: 'RECTANGLE',
              name: p.name || 'Rect',
              width: p.width || 100,
              height: p.height || 100,
              x: p.x || 0,
              y: p.y || 0,
              fill: p.color || '#E4E4E7',
              cornerRadius: p.cornerRadius,
              parentId
            };
          }
          break;
        }

        case 'CREATE_FLOW':
          // Flow starting point
          continue;

        default:
          opParams = Object.assign({}, p, { parentId });
          break;
      }

      try {
        const res = await execHttp(38451, '/exec', { operation: op, params: opParams });
        if (res.success && res.data && res.data.id) {
          if (step.ref) {
            persistentRefMap[step.ref] = res.data.id;
          }
          results.push({ index: i, success: true, id: res.data.id });
        } else {
          results.push({ index: i, success: false, error: res.error });
        }
      } catch (err) {
        results.push({ index: i, success: false, error: err.message });
      }
    }

    const hasSuccess = results.some(r => r.success);
    if (!hasSuccess && steps.length > 0) {
      return { success: false, error: results[0]?.error || 'Tất cả thao tác đều thất bại', data: results };
    }

    return { success: true, count: results.length, data: results };
  }

  // Single action translation
  if (action === 'CREATE_FRAME') {
    return execHttp(38451, '/exec', {
      operation: 'create',
      params: {
        type: 'FRAME',
        name: params.name,
        width: params.width,
        height: params.height,
        x: params.x,
        y: params.y,
        fill: params.backgroundColor,
        cornerRadius: params.cornerRadius,
        clipsContent: params.clipsContent
      }
    });
  }

  return execHttp(38451, '/exec', { operation: action.toLowerCase(), params });
}

export class ScreenBuilder {
  constructor(screenId, screenName, x = 0, y = 0, theme = 'light', lang = 'vi') {
    this.screenId = screenId;
    this.screenName = screenName;
    this.x = x;
    this.y = y;
    this.theme = theme;
    this.lang = lang;
    this.tokens = theme === 'dark' ? TOKENS_DARK : TOKENS_LIGHT;
    this.steps = [];

    // Base Mobile Frame (393 × 852 px, Daylight Porcelain Minimalist)
    this.addStep('CREATE_FRAME', {
      name: screenName,
      width: this.tokens.screenWidth,
      height: this.tokens.screenHeight,
      x: this.x,
      y: this.y,
      backgroundColor: this.tokens.bgScreen,
      cornerRadius: this.tokens.cornerRadiusScreen,
      clipsContent: true
    }, screenId);
  }

  addStep(action, params, ref = null) {
    const item = { action, params, continueOnError: true };
    if (ref) item.ref = ref;
    this.steps.push(item);
    return this;
  }

  // Language Switcher Pill [ 🌐 VI | EN ] (Active VI by default, toggleable to EN)
  addLanguagePill(x = 295, y = 62) {
    const sId = `$${this.screenId}`;
    const pillRef = `pill_lang_${this.screenId}`;
    const isVi = this.lang === 'vi';
    
    // Outer pill container (78x32px, cornerRadius: 16px)
    this.addStep('CREATE_FRAME', {
      parentId: sId,
      name: 'Pill / Language Switcher [VI | EN]',
      width: 78,
      height: 32,
      x: x,
      y: y,
      backgroundColor: this.tokens.bgSurface,
      cornerRadius: 16
    }, pillRef);

    if (isVi) {
      // Active VI badge on left (36x24px, jet black, white text)
      this.addStep('CREATE_FRAME', {
        parentId: `$${pillRef}`,
        name: 'Badge / VI (Active)',
        width: 36,
        height: 24,
        x: 4,
        y: 4,
        backgroundColor: this.tokens.btnPrimaryBg,
        cornerRadius: 12
      }, `badge_vi_${this.screenId}`);
      this.addStep('CREATE_TEXT', {
        parentId: `$${pillRef}`,
        text: 'VI',
        fontSize: 10,
        fontStyle: 'Bold',
        color: this.tokens.btnPrimaryText,
        x: 15,
        y: 9
      });

      // Inactive EN label on right
      this.addStep('CREATE_TEXT', {
        parentId: `$${pillRef}`,
        name: 'Label / EN (Inactive)',
        text: 'EN',
        fontSize: 10,
        fontStyle: 'SemiBold',
        color: this.tokens.textMuted,
        x: 50,
        y: 9
      }, `label_en_${this.screenId}`);
    } else {
      // Inactive VI label on left
      this.addStep('CREATE_TEXT', {
        parentId: `$${pillRef}`,
        name: 'Label / VI (Inactive)',
        text: 'VI',
        fontSize: 10,
        fontStyle: 'SemiBold',
        color: this.tokens.textMuted,
        x: 15,
        y: 9
      }, `label_vi_${this.screenId}`);

      // Active EN badge on right (36x24px, jet black, white text)
      this.addStep('CREATE_FRAME', {
        parentId: `$${pillRef}`,
        name: 'Badge / EN (Active)',
        width: 36,
        height: 24,
        x: 38,
        y: 4,
        backgroundColor: this.tokens.btnPrimaryBg,
        cornerRadius: 12
      }, `badge_en_${this.screenId}`);
      this.addStep('CREATE_TEXT', {
        parentId: `$${pillRef}`,
        text: 'EN',
        fontSize: 10,
        fontStyle: 'Bold',
        color: this.tokens.btnPrimaryText,
        x: 49,
        y: 9
      });
    }

    return this;
  }

  // Header with context title, back button (>=44x44px Fitts's Law) and optional action
  addHeader(title, subtitle = null, showBack = true, rightBtnText = null, rightBtnRef = null) {
    const sId = `$${this.screenId}`;
    if (showBack) {
      // 44x44px touch target with centered universal arrow
      this.addStep('CREATE_FRAME', {
        parentId: sId,
        name: 'Btn / Back Target',
        width: 44,
        height: 44,
        x: 20,
        y: 56,
        backgroundColor: this.tokens.bgSurface,
        cornerRadius: 22
      }, `btn_back_${this.screenId}`);
      this.addStep('CREATE_TEXT', {
        parentId: `$btn_back_${this.screenId}`,
        text: '←',
        fontSize: 18,
        fontStyle: 'Regular',
        color: this.tokens.textPrimary,
        x: 14,
        y: 11
      });
    }

    const titleX = showBack ? 74 : 24;
    this.addStep('CREATE_TEXT', {
      parentId: sId,
      text: title,
      fontSize: 18,
      fontStyle: 'Bold',
      color: this.tokens.textPrimary,
      x: titleX,
      y: 66
    });

    if (subtitle) {
      this.addStep('CREATE_TEXT', {
        parentId: sId,
        text: subtitle,
        fontSize: 11,
        fontStyle: 'SemiBold',
        color: this.tokens.accentGold,
        x: titleX,
        y: 90
      });
    }

    if (rightBtnText) {
      this.addStep('CREATE_BUTTON', {
        parentId: sId,
        name: 'Btn / Header Action',
        text: rightBtnText,
        backgroundColor: this.tokens.bgSurface,
        textColor: this.tokens.textPrimary,
        x: 285,
        y: 60
      }, rightBtnRef);
    } else {
      // Add default luxury Language Switcher Pill [ 🌐 EN | VI ]
      this.addLanguagePill(295, 62);
    }
    return this;
  }

  // Horizontal category chips with clear active state & 8px spacing
  addCategoryChips(chips = null, activeIndex = 0, y = 116) {
    const sId = `$${this.screenId}`;
    const defaultChips = this.lang === 'vi' 
      ? ['TẤT CẢ', 'VEN BIỂN', 'BÊ TÔNG', 'SINH THÁI']
      : ['ALL WORKS', 'COASTAL', 'BRUTALIST', 'BIOPHILIC'];
    const activeChips = chips || defaultChips;

    const chipCount = activeChips.length;
    const totalW = 345;
    const gap = 8;
    const chipWidth = Math.floor((totalW - (chipCount - 1) * gap) / chipCount); // Fits 345px perfectly (80px each)

    let currX = 24;
    activeChips.forEach((chip, i) => {
      const isActive = i === activeIndex;
      this.addStep('CREATE_FRAME', {
        parentId: sId,
        name: `Chip / ${chip}`,
        width: chipWidth,
        height: 36,
        x: currX,
        y: y,
        backgroundColor: isActive ? this.tokens.btnPrimaryBg : this.tokens.bgSurface,
        cornerRadius: 8
      }, `chip_${this.screenId}_${i}`);

      this.addStep('CREATE_TEXT', {
        parentId: `$chip_${this.screenId}_${i}`,
        text: chip,
        fontSize: 10,
        fontStyle: 'Bold',
        color: isActive ? this.tokens.btnPrimaryText : this.tokens.textSecondary,
        x: Math.max(6, Math.floor((chipWidth - chip.length * 6) / 2)),
        y: 11
      });
      currX += chipWidth + gap;
    });
    return this;
  }

  // Consistent Estate Card (Hierarchy: Title -> Price -> Specs, Heart favorite button)
  addEstateCard({
    y = 170,
    imageUrl = IMAGES.villaPool,
    title = 'The Glass Sanctuary Villa',
    location = 'Son Tra Peninsula',
    specs = 'Tadao Ando • 850 sq.m',
    price = '$4,250,000',
    cardRef = 'card_estate',
    btnRef = 'btn_details'
  } = {}) {
    const sId = `$${this.screenId}`;
    const cRef = `${this.screenId}_${cardRef}`;

    // Main Card Container (w: 345px, h: 360px, cornerRadius: 16px)
    this.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `Card / ${title}`,
      width: 345,
      height: 360,
      x: 24,
      y: y,
      backgroundColor: this.tokens.bgCard,
      cornerRadius: this.tokens.cornerRadiusCard,
      clipsContent: true
    }, cRef);

    // Hero Photo (w: 345px, h: 215px)
    this.addStep('CREATE_RECTANGLE', {
      parentId: `$${cRef}`,
      name: 'Cover Photo',
      width: 345,
      height: 215,
      x: 0,
      y: 0,
      imageUrl: imageUrl,
      color: this.tokens.bgSurface
    });

    // Favorite Heart Button (Top-Right of Photo)
    this.addStep('CREATE_FRAME', {
      parentId: `$${cRef}`,
      name: 'Btn / Favorite Heart',
      width: 36,
      height: 36,
      x: 295,
      y: 14,
      backgroundColor: this.tokens.favoriteBtnBg,
      cornerRadius: 18
    });
    this.addStep('CREATE_TEXT', {
      parentId: `$${cRef}`,
      text: '♡',
      fontSize: 16,
      fontStyle: 'Regular',
      color: this.tokens.favoriteBtnText,
      x: 307,
      y: 22
    });

    // Typography Hierarchy
    // 1. Title (Max 2 lines, Bold 17px)
    this.addStep('CREATE_TEXT', {
      parentId: `$${cRef}`,
      text: title,
      fontSize: 17,
      fontStyle: 'Bold',
      color: this.tokens.textPrimary,
      x: 18,
      y: 232
    });

    // 2. Location & Specs (12px Muted)
    this.addStep('CREATE_TEXT', {
      parentId: `$${cRef}`,
      text: `${location} • ${specs}`,
      fontSize: 12,
      fontStyle: 'Regular',
      color: this.tokens.textSecondary,
      x: 18,
      y: 258
    });

    // 3. Price (18px Bold `#09090B` - Clean formatting)
    this.addStep('CREATE_TEXT', {
      parentId: `$${cRef}`,
      text: price,
      fontSize: 18,
      fontStyle: 'Bold',
      color: this.tokens.textPrimary,
      x: 18,
      y: 310
    });

    // 4. Action Button (Consistent CTA)
    const btnLabel = this.lang === 'vi' ? 'Xem Chi Tiết →' : 'View Details →';
    this.addStep('CREATE_BUTTON', {
      parentId: `$${cRef}`,
      name: 'Btn / View Details',
      text: btnLabel,
      backgroundColor: this.tokens.btnPrimaryBg,
      textColor: this.tokens.btnPrimaryText,
      x: 200,
      y: 302
    }, btnRef);

    return this;
  }

  // Uniform Full-Width CTA Button (345px width centered at x: 24, 52px height)
  addFullWidthCTA(text, y = 740, isSecondary = false, ref = null) {
    const sId = `$${this.screenId}`;
    const btnRef = ref || `cta_${this.screenId}`;
    this.addStep('CREATE_FRAME', {
      parentId: sId,
      name: `CTA / ${text}`,
      width: 345,
      height: 52,
      x: 24,
      y: y,
      backgroundColor: isSecondary ? this.tokens.btnSecondaryBg : this.tokens.btnPrimaryBg,
      cornerRadius: 12
    }, btnRef);
    this.addStep('CREATE_TEXT', {
      parentId: `$${btnRef}`,
      text: text,
      fontSize: 15,
      fontStyle: 'Bold',
      color: isSecondary ? this.tokens.btnSecondaryText : this.tokens.btnPrimaryText,
      x: Math.max(16, Math.floor((345 - text.length * 8) / 2)),
      y: 17
    });
    return this;
  }

  // Bento Metrics Row for Dashboards / Statistics
  addMetricsBento(metrics = null, y = 130) {
    const sId = `$${this.screenId}`;
    const defaultMetrics = this.lang === 'vi'
      ? [{ label: 'TỔNG TÀI SẢN', value: '$148.5M' }, { label: 'QUỸ ESCROW', value: '682 BTC' }]
      : [{ label: 'TOTAL ASSETS', value: '$148.5M' }, { label: 'ESCROW FUND', value: '682 BTC' }];
    const activeMetrics = metrics || defaultMetrics;

    const gap = 12;
    const cardW = Math.floor((345 - gap * (activeMetrics.length - 1)) / activeMetrics.length);
    activeMetrics.forEach((m, idx) => {
      const mX = 24 + idx * (cardW + gap);
      const mRef = `metric_${this.screenId}_${idx}`;
      this.addStep('CREATE_FRAME', {
        parentId: sId,
        name: `Metric / ${m.label}`,
        width: cardW,
        height: 90,
        x: mX,
        y: y,
        backgroundColor: this.tokens.bgCard,
        cornerRadius: this.tokens.cornerRadiusCard
      }, mRef);
      this.addStep('CREATE_TEXT', {
        parentId: `$${mRef}`,
        text: m.label,
        fontSize: 11,
        fontStyle: 'SemiBold',
        color: this.tokens.textMuted,
        x: 16,
        y: 18
      });
      this.addStep('CREATE_TEXT', {
        parentId: `$${mRef}`,
        text: m.value,
        fontSize: 20,
        fontStyle: 'Bold',
        color: m.color || this.tokens.textPrimary,
        x: 16,
        y: 44
      });
    });
    return this;
  }

  // 4 Equal Navigation Tabs (Each 98.25px wide) with active indicator
  addBottomNavBar(activeTabIndex = 0) {
    const sId = `$${this.screenId}`;
    const dockHeight = 76;
    const dockY = this.tokens.screenHeight - dockHeight;

    // Bottom Bar Background
    this.addStep('CREATE_FRAME', {
      parentId: sId,
      name: 'Bottom Navigation Dock',
      width: this.tokens.screenWidth,
      height: dockHeight,
      x: 0,
      y: dockY,
      backgroundColor: this.tokens.dockBg
    }, `dock_${this.screenId}`);

    // Subtle 1px Top Border for clean delineation
    this.addStep('CREATE_FRAME', {
      parentId: `$dock_${this.screenId}`,
      name: 'Dock / Top Border',
      width: this.tokens.screenWidth,
      height: 1,
      x: 0,
      y: 0,
      backgroundColor: this.tokens.border
    });

    const tabs = this.lang === 'vi'
      ? [
          { name: 'Khám Phá', icon: '◎' },
          { name: 'Bản Đồ', icon: '⚲' },
          { name: 'Đã Lưu', icon: '♡' },
          { name: 'Hồ Sơ', icon: '👤' }
        ]
      : [
          { name: 'Discover', icon: '◎' },
          { name: 'Map', icon: '⚲' },
          { name: 'Saved', icon: '♡' },
          { name: 'Profile', icon: '👤' }
        ];

    const tabWidth = this.tokens.screenWidth / tabs.length; // 98.25px each

    tabs.forEach((tItem, idx) => {
      const isActive = idx === activeTabIndex;
      const tabX = idx * tabWidth;

      this.addStep('CREATE_FRAME', {
        parentId: `$dock_${this.screenId}`,
        name: `Tab / ${tItem.name}`,
        width: tabWidth,
        height: dockHeight,
        x: tabX,
        y: 0,
        backgroundColor: this.tokens.dockBg
      }, `tab_${this.screenId}_${idx}`);

      // Icon
      this.addStep('CREATE_TEXT', {
        parentId: `$tab_${this.screenId}_${idx}`,
        text: tItem.icon,
        fontSize: 16,
        fontStyle: 'Regular',
        color: isActive ? this.tokens.textPrimary : this.tokens.textMuted,
        x: Math.floor(tabWidth / 2 - 8),
        y: 16
      });

      // Label
      this.addStep('CREATE_TEXT', {
        parentId: `$tab_${this.screenId}_${idx}`,
        text: tItem.name,
        fontSize: 11,
        fontStyle: isActive ? 'Bold' : 'Medium',
        color: isActive ? this.tokens.textPrimary : this.tokens.textMuted,
        x: Math.floor(tabWidth / 2 - (tItem.name.length * 3.5)),
        y: 38
      });

      // Active Indicator Bar (Underline 24px)
      if (isActive) {
        this.addStep('CREATE_FRAME', {
          parentId: `$tab_${this.screenId}_${idx}`,
          name: 'Active Bar',
          width: 24,
          height: 3,
          x: Math.floor(tabWidth / 2 - 12),
          y: 56,
          backgroundColor: this.tokens.textPrimary,
          cornerRadius: 2
        });
      }
    });

    return this;
  }

  getSteps() {
    return this.steps;
  }

  async build() {
    console.log(`🚀 Dispatching Screen [${this.screenName}] (${this.steps.length} steps)...`);
    const res = await postToBridge('BATCH_EXECUTE', { steps: this.steps });
    return res;
  }
}
