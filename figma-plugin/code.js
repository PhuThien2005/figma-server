// AGY Figma Bridge - Sandbox Engine (code.js)
// Executes commands from the Bridge Server on the active Figma Canvas

// Open UI window (visible so user can see status and HUD)
figma.showUI(__html__, { width: 340, height: 420, themeColors: true });

// Helper to log to UI
function logToUI(message, level = 'info') {
  figma.ui.postMessage({ type: 'LOG', message, level });
}

// Helper to parse color hex or RGB object
function parseColor(color) {
  if (!color) return { r: 1, g: 1, b: 1 };
  if (typeof color === 'object' && 'r' in color && 'g' in color && 'b' in color) {
    // Normalize to 0..1 if values > 1
    const r = color.r > 1 ? color.r / 255 : color.r;
    const g = color.g > 1 ? color.g / 255 : color.g;
    const b = color.b > 1 ? color.b / 255 : color.b;
    return { r, g, b };
  }
  if (typeof color === 'string') {
    let hex = color.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length >= 6) {
      const num = parseInt(hex.substring(0, 6), 16);
      return {
        r: ((num >> 16) & 255) / 255,
        g: ((num >> 8) & 255) / 255,
        b: (num & 255) / 255
      };
    }
  }
  return { r: 1, g: 1, b: 1 };
}

// Safe font loader with in-memory cache
const loadedFontsCache = new Set();

async function ensureFont(family = 'Inter', style = 'Regular') {
  const key = `${family}-${style}`;
  if (loadedFontsCache.has(key)) {
    return { family, style };
  }

  try {
    await figma.loadFontAsync({ family, style });
    loadedFontsCache.add(key);
    return { family, style };
  } catch (err) {
    try {
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
      loadedFontsCache.add('Inter-Regular');
      return { family: 'Inter', style: 'Regular' };
    } catch (fallbackErr) {
      try {
        await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
        loadedFontsCache.add('Roboto-Regular');
        return { family: 'Roboto', style: 'Regular' };
      } catch (e) {
        return null;
      }
    }
  }
}

// Resolve node reference (support direct ID or $alias from batch)
function resolveNodeId(idOrRef, refMap) {
  if (!idOrRef) return null;
  if (typeof idOrRef === 'string' && idOrRef.startsWith('$') && refMap) {
    const key = idOrRef.substring(1);
    return refMap[key] || idOrRef;
  }
  return idOrRef;
}

// Safe async node getter (compatible with dynamic-page mode and name matching)
async function getNode(id) {
  if (!id) return null;
  if ('getNodeByIdAsync' in figma) {
    try {
      const n = await figma.getNodeByIdAsync(id);
      if (n) return n;
    } catch (e) {}
  }
  try {
    const n = figma.getNodeById(id);
    if (n) return n;
  } catch (e) {}
  try {
    if ('findOneAsync' in figma.currentPage) {
      const found = await figma.currentPage.findOneAsync(n => n.name === id || n.id === id);
      if (found) return found;
    }
  } catch (e) {}
  try {
    const found = figma.currentPage.findOne(n => n.name === id || n.id === id);
    if (found) return found;
  } catch (e) {}
  return null;
}

// Safe image fill loader with timeout protection
async function applyImageFill(node, imageUrl, fallbackColor = null) {
  if (fallbackColor) {
    node.fills = [{ type: 'SOLID', color: parseColor(fallbackColor) }];
  } else {
    node.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.15, b: 0.25 } }];
  }
  if (imageUrl) {
    try {
      const imgPromise = figma.createImageAsync(imageUrl);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Image download timeout')), 3500));
      const image = await Promise.race([imgPromise, timeoutPromise]);
      if (image && image.hash) {
        node.fills = [{
          type: 'IMAGE',
          imageHash: image.hash,
          scaleMode: 'FILL'
        }];
      }
    } catch (imgErr) {
      logToUI(`Image skipped (${imgErr.message}), using fallback color`, 'warn');
    }
  }
}

// Helper to decode Base64 to Uint8Array safely inside Figma Sandbox
function base64ToBytes(base64) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let bufferLength = base64.length * 0.75,
      len = base64.length, i, p = 0,
      encoded1, encoded2, encoded3, encoded4;

  if (base64[base64.length - 1] === '=') {
    bufferLength--;
    if (base64[base64.length - 2] === '=') bufferLength--;
  }

  const arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

  for (i = 0; i < len; i += 4) {
    encoded1 = chars.indexOf(base64[i]);
    encoded2 = chars.indexOf(base64[i+1]);
    encoded3 = chars.indexOf(base64[i+2]);
    encoded4 = chars.indexOf(base64[i+3]);

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    if (encoded3 !== -1) bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    if (encoded4 !== -1) bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }

  return bytes;
}

// Core action executor
async function executeAction(action, params = {}, refMap = {}) {
  switch (action) {
    case 'INSPECT_PAGE_IMAGES': {
      const results = [];
      function traverse(node, frameName = '', frameY = 0) {
        if ('fills' in node && Array.isArray(node.fills)) {
          const hasImage = node.fills.some(f => f.type === 'IMAGE');
          const isContainer = (node.width >= 50 && node.height >= 50) && (node.type === 'RECTANGLE' || node.type === 'FRAME');
          if (isContainer) {
            results.push({
              id: node.id,
              name: node.name,
              type: node.type,
              frameName: frameName,
              frameY: frameY,
              width: node.width,
              height: node.height,
              hasImage: hasImage,
              fills: node.fills.map(f => ({ type: f.type, color: f.color }))
            });
          }
        }
        if ('children' in node) {
          for (const child of node.children) {
            traverse(child, frameName || node.name, frameY || node.y || 0);
          }
        }
      }

      for (const child of figma.currentPage.children) {
        traverse(child, child.name, child.y || 0);
      }
      return { totalCandidates: results.length, nodes: results };
    }

    case 'BATCH_FILL_IMAGES': {
      // params.assignments: array of { id, imageBase64, scaleMode }
      // Or params.assignments: array of { targetPattern, frameFilter, imageBase64, scaleMode }
      const assignments = params.assignments || [];
      const imageCache = new Map(); // base64 -> image
      let filledCount = 0;
      const details = [];

      for (const a of assignments) {
        let image;
        if (imageCache.has(a.imageBase64)) {
          image = imageCache.get(a.imageBase64);
        } else {
          const bytes = base64ToBytes(a.imageBase64);
          image = figma.createImage(bytes);
          imageCache.set(a.imageBase64, image);
        }

        if (a.id) {
          const node = await getNode(a.id);
          if (node && 'fills' in node) {
            node.fills = [{
              type: 'IMAGE',
              scaleMode: a.scaleMode || 'FILL',
              imageHash: image.hash
            }];
            filledCount++;
            details.push({ id: node.id, name: node.name, frame: node.parent ? node.parent.name : '' });
          }
        } else if (a.targetPattern) {
          const regex = new RegExp(a.targetPattern, 'i');
          const frameRegex = a.frameFilter ? new RegExp(a.frameFilter, 'i') : null;

          function scanAndFill(node, currentFrameName = '') {
            if (regex.test(node.name)) {
              if (!frameRegex || frameRegex.test(currentFrameName)) {
                if ('fills' in node) {
                  node.fills = [{
                    type: 'IMAGE',
                    scaleMode: a.scaleMode || 'FILL',
                    imageHash: image.hash
                  }];
                  filledCount++;
                  details.push({ id: node.id, name: node.name, frame: currentFrameName });
                }
              }
            }
            if ('children' in node) {
              for (const c of node.children) {
                scanAndFill(c, currentFrameName || node.name);
              }
            }
          }

          for (const child of figma.currentPage.children) {
            scanAndFill(child, child.name);
          }
        }
      }

      return { status: 'batch_fill_completed', filledCount, details };
    }

    case 'TEST_RELOAD': {
      return { status: 'reloaded', timestamp: Date.now() };
    }

    case 'AUDIT_PAGE_LAYOUT': {
      const frames = [];
      for (const frame of figma.currentPage.children) {
        if (frame.type !== 'FRAME' && frame.type !== 'COMPONENT') continue;
        const frameInfo = {
          id: frame.id,
          name: frame.name,
          x: frame.x,
          y: frame.y,
          width: frame.width,
          height: frame.height,
          themeButtons: [],
          overflowElements: [],
          bottomNav: null,
          totalChildren: frame.children ? frame.children.length : 0,
          children: []
        };

        if (frame.children) {
          for (const child of frame.children) {
            const childBottom = (child.y || 0) + (child.height || 0);
            const childInfo = {
              id: child.id,
              name: child.name,
              type: child.type,
              characters: child.type === 'TEXT' ? child.characters : undefined,
              x: child.x,
              y: child.y,
              width: child.width,
              height: child.height,
              bottom: childBottom
            };
            frameInfo.children.push(childInfo);

            // Detect theme buttons (excluding inside Drawer Menu itself)
            const isMenuDrawer = frame.name.includes('Navigation Drawer Menu') || frame.name.includes('Menu Drawer');
            const lowerName = child.name.toLowerCase();
            if (!isMenuDrawer && (
              lowerName.includes('to dark') ||
              lowerName.includes('to light') ||
              lowerName.includes('btn / theme') ||
              lowerName.includes('btn / switch to') ||
              lowerName.includes('theme toggle')
            )) {
              frameInfo.themeButtons.push(childInfo);
            }

            // Detect bottom nav
            if (lowerName.includes('bottom nav') || lowerName.includes('nav / bottom') || lowerName.includes('navigation bar')) {
              frameInfo.bottomNav = childInfo;
            }

            // Detect elements exceeding standard screen height 852 or bottom nav threshold
            if (childBottom > 852 && !lowerName.includes('scroll') && !lowerName.includes('background') && !lowerName.includes('bg image')) {
              frameInfo.overflowElements.push(childInfo);
            }
          }
        }
        frames.push(frameInfo);
      }
      return { totalFrames: frames.length, frames };
    }

    case 'REMOVE_REDUNDANT_THEME_BUTTONS': {
      let removedCount = 0;
      const removedList = [];
      for (const frame of figma.currentPage.children) {
        // Preserve buttons inside Navigation Drawer Menu
        if (frame.name.includes('Navigation Drawer Menu') || frame.name.includes('Menu Drawer')) continue;
        if (!frame.children) continue;

        const toRemove = [];
        for (const child of frame.children) {
          const lower = child.name.toLowerCase();
          // Remove sub-screen theme toggle buttons:
          if (
            lower.startsWith('btn / to dark') ||
            lower.startsWith('btn / to light') ||
            lower === 'theme toggle' ||
            lower === 'btn / theme'
          ) {
            toRemove.push(child);
          }
        }

        for (const node of toRemove) {
          removedList.push({ frame: frame.name, btn: node.name, id: node.id });
          node.remove();
          removedCount++;
        }
      }
      return { status: 'redundant_theme_buttons_removed', removedCount, removedList };
    }

    case 'REMOVE_DUPLICATE_BACK_BUTTONS': {
      let removedCount = 0;
      const removedList = [];
      for (const frame of figma.currentPage.children) {
        if (!frame.children) continue;
        const hasFloatingBack = frame.children.some(c => c.name.toLowerCase().includes('floating back'));
        if (hasFloatingBack) {
          const oldBacks = frame.children.filter(c =>
            c.name.toLowerCase().startsWith('btn / back') &&
            !c.name.toLowerCase().includes('floating')
          );
          for (const b of oldBacks) {
            removedList.push({ frame: frame.name, btn: b.name, id: b.id });
            b.remove();
            removedCount++;
          }
        }
      }
      return { status: 'duplicate_back_buttons_removed', removedCount, removedList };
    }

    case 'COMPACT_VIEWPORTS': {
      let updatedCount = 0;
      const updatedList = [];
      for (const frame of figma.currentPage.children) {
        if (!frame.children) continue;
        for (const child of frame.children) {
          if (child.name === 'Details Body') {
            if ('resize' in child) {
              // y is 300, resize height to 552 so bottom: 300 + 552 = 852 (exact viewport boundary)
              child.resize(child.width, 552);
              updatedCount++;
              updatedList.push({ frame: frame.name, node: child.name, newHeight: 552, bottom: 852 });
            }
          }
        }
      }
      return { status: 'viewports_compacted', updatedCount, updatedList };
    }

    case 'INSPECT_PAGE_TEXTS': {
      const texts = [];
      function scan(node, screenName) {
        if (node.type === 'TEXT') {
          texts.push({
            id: node.id,
            characters: node.characters,
            name: node.name,
            screen: screenName,
            fontSize: node.fontSize,
            fontFamily: node.fontName ? node.fontName.family : 'Inter',
            fontStyle: node.fontName ? node.fontName.style : 'Regular'
          });
        }
        if (node.children) {
          for (const c of node.children) {
            scan(c, screenName || node.name);
          }
        }
      }
      for (const c of figma.currentPage.children) {
        scan(c, c.name);
      }
      return { total: texts.length, texts };
    }

    case 'APPLY_VIETNAMESE_TRANSLATION': {
      const dict = params.dictionary || {};
      const specific = params.specific || [];
      let updatedCount = 0;
      const log = [];

      // Pre-load common fonts once into cache
      await ensureFont('Inter', 'Regular');
      await ensureFont('Inter', 'Medium');
      await ensureFont('Inter', 'Bold');
      await ensureFont('Inter', 'SemiBold');

      let matchedCount = 0;
      const errors = [];

      // Helper function to safely update text node instantly
      async function setText(node, newText) {
        if (!node || node.type !== 'TEXT') return false;
        try {
          if (typeof node.fontName === 'symbol') {
            await ensureFont('Inter', 'Regular');
            node.fontName = { family: 'Inter', style: 'Regular' };
          } else {
            const font = node.fontName;
            await ensureFont(font.family, font.style);
          }
          node.characters = newText;
          return true;
        } catch (e) {
          errors.push({ id: node.id, err: e.message, font: String(node.fontName) });
          return false;
        }
      }

      // 1. Process specific ID-based updates
      for (const s of specific) {
        const node = await getNode(s.id);
        if (node) {
          const ok = await setText(node, s.text);
          if (ok) {
            updatedCount++;
            log.push({ id: node.id, old: node.name, newText: s.text });
          }
        }
      }

      const sampleCurrent = [];

      // 2. Process dictionary scan
      async function traverseAndTranslate(node, screenName) {
        if (node.type === 'TEXT') {
          const current = node.characters.trim();
          if (sampleCurrent.length < 10) sampleCurrent.push(current);
          if (dict[current]) {
            matchedCount++;
            const ok = await setText(node, dict[current]);
            if (ok) {
              updatedCount++;
              log.push({ id: node.id, screen: screenName, old: current, newText: dict[current] });
            }
          }
        }
        if (node.children) {
          for (const child of node.children) {
            await traverseAndTranslate(child, screenName || node.name);
          }
        }
      }

      const scannedTexts = [];
      for (const topFrame of figma.currentPage.children) {
        if (params.filter && !topFrame.name.includes(params.filter)) continue;
        await traverseAndTranslate(topFrame, topFrame.name);
      }

      return {
        status: 'translation_applied',
        dictKeysCount: Object.keys(dict).length,
        sampleCurrent,
        matchedCount,
        updatedCount,
        errors: errors.slice(0, 10),
        log: log.slice(0, 100)
      };
    }

    case 'CONVERT_BACK_BUTTONS_TO_UNIVERSAL_ICONS': {
      let convertedCount = 0;
      const convertedList = [];

      for (const frame of figma.currentPage.children) {
        if (!frame.children) continue;
        for (const child of frame.children) {
          const lower = child.name.toLowerCase();
          if (lower.startsWith('btn / back') || lower.includes('floating back')) {
              if ('layoutMode' in child) {
                child.layoutMode = 'HORIZONTAL';
                if ('primaryAxisSizingMode' in child) child.primaryAxisSizingMode = 'FIXED';
                if ('counterAxisSizingMode' in child) child.counterAxisSizingMode = 'FIXED';
                child.primaryAxisAlignItems = 'CENTER';
                child.counterAxisAlignItems = 'CENTER';
                child.paddingLeft = 0;
                child.paddingRight = 0;
                child.paddingTop = 0;
                child.paddingBottom = 0;
              }
              child.resize(42, 42);
              child.cornerRadius = 21;
              child.x = 24;
              child.y = 54;

              const isDark = !frame.name.includes('[Light]');
              const isMediaScreen = frame.name.includes('09') || frame.name.includes('11') || frame.name.includes('12') || frame.name.includes('13') || frame.name.includes('14') || frame.name.includes('15') || frame.name.includes('02') || frame.name.includes('03') || frame.name.includes('04');

              if (isDark || isMediaScreen) {
                child.fills = [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: 0.85 }];
                child.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.15 }];
                child.strokeWeight = 1;
              } else {
                child.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.95 }];
                child.strokes = [{ type: 'SOLID', color: { r: 0.89, g: 0.92, b: 0.96 } }];
                child.strokeWeight = 1;
              }

              if (child.children) {
                for (const txt of child.children) {
                  if (txt.type === 'TEXT') {
                    try {
                      await ensureFont('Inter', 'Bold');
                      txt.fontName = { family: 'Inter', style: 'Bold' };
                      txt.characters = '←';
                      txt.fontSize = 18;
                      txt.textAlignHorizontal = 'CENTER';
                      if (isDark || isMediaScreen) {
                        txt.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                      } else {
                        txt.fills = [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 } }];
                      }
                    } catch (err) {}
                  }
                }
              }

              convertedCount++;
              convertedList.push({ screen: frame.name, btn: child.name });
            }
          }
        }
      return { status: 'back_buttons_converted_to_universal_icon', convertedCount, convertedList };
    }

    case 'APPLY_FULL_WIDTH_AND_ROUNDED_IMAGES': {
      let updatedCount = 0;
      const updatedList = [];

      for (const frame of figma.currentPage.children) {
        if (!frame.children) continue;
        for (const child of frame.children) {
          const lower = child.name.toLowerCase();

          // 1. Hero Cover on Onboarding (02, 03, 04)
          if (lower === 'hero cover' || lower === 'cover image') {
            if ('resize' in child) {
              child.x = 0;
              child.resize(393, child.height || 480);
              child.cornerRadius = 28;
              updatedCount++;
              updatedList.push({ screen: frame.name, node: child.name, w: 393, r: 28 });
            }
          }

          // 2. Art on Home Feeds (06, 06b, 06c, 06d)
          if (lower === 'art' && frame.name.includes('06')) {
            if ('resize' in child) {
              child.x = 0;
              child.resize(393, 210);
              child.cornerRadius = 24;
              updatedCount++;
              updatedList.push({ screen: frame.name, node: child.name, w: 393, r: 24 });
            }
          }

          // 3. Second Art on Home Feeds (Sec Art)
          if (lower === 'sec art') {
            if ('cornerRadius' in child) {
              child.cornerRadius = 20;
              updatedCount++;
              updatedList.push({ screen: frame.name, node: child.name, r: 20 });
            }
          }

          // 4. Media Header on Details (09, 09b, 09c)
          if (lower === 'media header') {
            if ('resize' in child) {
              child.x = 0;
              child.resize(393, child.height || 320);
              child.cornerRadius = 28;
              updatedCount++;
              updatedList.push({ screen: frame.name, node: child.name, w: 393, r: 28 });
            }
          }

          // 5. Thumbnails on Details (Thumb 1, 2, 3)
          if (lower.startsWith('thumb') && !lower.includes('slider')) {
            if ('cornerRadius' in child && child.width > 30) {
              child.cornerRadius = 16;
              updatedCount++;
              updatedList.push({ screen: frame.name, node: child.name, r: 16 });
            }
          }

          // 6. Graphic Art on Secondary screens
          if (lower === 'graphic art') {
            if ('resize' in child) {
              child.x = 0;
              child.resize(393, child.height || 260);
              child.cornerRadius = 24;
              updatedCount++;
              updatedList.push({ screen: frame.name, node: child.name, w: 393, r: 24 });
            }
          }

          // 7. Video Screen & Sliders Fullscreen Art (12, 12b, 13, 14, 15, 15b, 15c)
          if (lower === '16:9 video screen' || lower === 'fullscreen art') {
            if ('resize' in child) {
              child.x = 0;
              child.resize(393, child.height || 500);
              child.cornerRadius = 28;
              updatedCount++;
              updatedList.push({ screen: frame.name, node: child.name, w: 393, r: 28 });
            }
          }

          // 8. Saved Item Art (18)
          if (lower.startsWith('item art')) {
            if ('cornerRadius' in child) {
              child.cornerRadius = 16;
              updatedCount++;
              updatedList.push({ screen: frame.name, node: child.name, r: 16 });
            }
          }

          // 9. Material Swatches (10d)
          if (lower.startsWith('swatch')) {
            if ('cornerRadius' in child) {
              child.cornerRadius = 14;
              updatedCount++;
              updatedList.push({ screen: frame.name, node: child.name, r: 14 });
            }
          }
        }
      }
      return { status: 'images_updated_full_width_and_rounded', updatedCount, updatedList };
    }

    case 'APPLY_GLASSMORPHISM_STYLE': {
      let styledCount = 0;
      const details = [];

      const glassBlurEffect = (radius = 24) => ({
        type: 'BACKGROUND_BLUR',
        radius,
        visible: true
      });

      const glassShadowEffect = (y = 10, blur = 25, opacity = 0.08) => ({
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: opacity },
        offset: { x: 0, y },
        radius: blur,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      });

      for (const frame of figma.currentPage.children) {
        if (!frame.children) continue;
        const isLight = frame.name.includes('[Light]');
        const isMediaScreen = frame.name.includes('09') || frame.name.includes('11') || frame.name.includes('12') || frame.name.includes('13') || frame.name.includes('14') || frame.name.includes('15') || frame.name.includes('02') || frame.name.includes('03') || frame.name.includes('04');

        function applyGlass(node, options = {}) {
          const cornerRadius = options.cornerRadius || 20;
          const blurRadius = options.blurRadius || 24;
          const shadowY = options.shadowY || 10;
          const shadowBlur = options.shadowBlur || 25;
          const shadowOpacity = options.shadowOpacity || (isLight ? 0.08 : 0.20);

          if ('cornerRadius' in node && cornerRadius !== undefined) node.cornerRadius = cornerRadius;

          if (isLight && !options.forceDark) {
            const fillOpacity = options.fillOpacity !== undefined ? options.fillOpacity : 0.25;
            node.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: fillOpacity }];
            node.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.50 }];
          } else {
            const fillOpacity = options.fillOpacity !== undefined ? options.fillOpacity : 0.55;
            node.fills = [{ type: 'SOLID', color: { r: 0.06, g: 0.09, b: 0.16 }, opacity: fillOpacity }];
            node.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.20 }];
          }

          if ('strokeWeight' in node) node.strokeWeight = 1;
          if ('strokeAlign' in node) node.strokeAlign = 'INSIDE';

          node.effects = [
            glassBlurEffect(blurRadius),
            glassShadowEffect(shadowY, shadowBlur, shadowOpacity)
          ];
          styledCount++;
        }

        for (const child of frame.children) {
          const lower = child.name.toLowerCase();

          // 1. Back Buttons (Universal Icon Buttons)
          if (lower.startsWith('btn / back') || lower.includes('floating back')) {
            applyGlass(child, {
              cornerRadius: 21,
              blurRadius: 20,
              shadowY: 6,
              shadowBlur: 16,
              fillOpacity: (isLight && !isMediaScreen) ? 0.35 : 0.60,
              forceDark: !isLight || isMediaScreen
            });
            details.push({ screen: frame.name, target: child.name, type: 'glass_back_btn' });
          }

          // 2. Primary Estate Cards & Secondary Cards on Feeds
          if (lower === 'hero estate card' || lower === 'second card') {
            applyGlass(child, {
              cornerRadius: 24,
              blurRadius: 28,
              shadowY: 12,
              shadowBlur: 30,
              fillOpacity: isLight ? 0.85 : 0.65
            });
            details.push({ screen: frame.name, target: child.name, type: 'glass_feed_card' });
          }

          // 3. Search Input Bar
          if (lower === 'search input bar') {
            applyGlass(child, {
              cornerRadius: 16,
              blurRadius: 20,
              shadowY: 4,
              shadowBlur: 16,
              fillOpacity: isLight ? 0.40 : 0.50
            });
            details.push({ screen: frame.name, target: child.name, type: 'glass_search_bar' });
          }

          // 4. Inactive Filter Chips
          if (lower.startsWith('chip /') && !lower.includes('all')) {
            applyGlass(child, {
              cornerRadius: 20,
              blurRadius: 16,
              shadowY: 4,
              shadowBlur: 12,
              fillOpacity: isLight ? 0.35 : 0.40
            });
            details.push({ screen: frame.name, target: child.name, type: 'glass_chip' });
          }

          // 5. Specialized Containers on Secondary Screens
          if (lower === 'specialized container') {
            applyGlass(child, {
              cornerRadius: 24,
              blurRadius: 28,
              shadowY: 10,
              shadowBlur: 28,
              fillOpacity: isLight ? 0.85 : 0.65
            });
            details.push({ screen: frame.name, target: child.name, type: 'glass_container' });
          }

          // 6. Details Body on 09, 09b, 09c
          if (lower === 'details body') {
            applyGlass(child, {
              cornerRadius: 28,
              blurRadius: 32,
              shadowY: -6,
              shadowBlur: 28,
              fillOpacity: isLight ? 0.90 : 0.80
            });
            details.push({ screen: frame.name, target: child.name, type: 'glass_details_body' });
          }

          // 7. Nav Bar (Floating dock or bottom navigation)
          if (lower === 'nav bar' || lower.includes('bottom nav')) {
            applyGlass(child, {
              cornerRadius: 0,
              blurRadius: 28,
              shadowY: -4,
              shadowBlur: 20,
              fillOpacity: isLight ? 0.88 : 0.80
            });
            details.push({ screen: frame.name, target: child.name, type: 'glass_nav_dock' });
          }

          // 8. Secondary Buttons
          if (lower.startsWith('btn / secondary')) {
            applyGlass(child, {
              cornerRadius: 16,
              blurRadius: 16,
              shadowY: 4,
              shadowBlur: 12,
              fillOpacity: isLight ? 0.40 : 0.45
            });
            details.push({ screen: frame.name, target: child.name, type: 'glass_sec_btn' });
          }

          // 9. Quick Theme Line Icon Button & Menu 3 Gạch Button
          if (lower.includes('quick theme') || lower.includes('open menu') || lower.includes('mini avatar')) {
            applyGlass(child, {
              cornerRadius: 18,
              blurRadius: 16,
              shadowY: 4,
              shadowBlur: 12,
              fillOpacity: isLight ? 0.35 : 0.50
            });
            details.push({ screen: frame.name, target: child.name, type: 'glass_header_action' });
          }
        }
      }

      return { status: 'glassmorphism_applied', styledCount, detailsCount: details.length };
    }

    case 'APPLY_TYPOGRAPHY_AND_TEXT_TRUNCATION': {
      let clampedCount = 0;
      let truncatedCount = 0;
      const clampedList = [];

      await ensureFont('Inter', 'Regular');
      await ensureFont('Inter', 'Medium');
      await ensureFont('Inter', 'SemiBold');
      await ensureFont('Inter', 'Bold');

      for (const frame of figma.currentPage.children) {
        if (!frame.children) continue;
        const isLight = frame.name.includes('[Light]');

        for (const child of frame.children) {
          // Adjust layout on 06 feed to avoid text overlapping the full-width image
          if (frame.name.includes('06') && child.type === 'TEXT') {
            const lName = child.name.toLowerCase();
            if (lName.includes('sanctuary')) {
              child.y = 432;
            } else if (lName.includes('son tra')) {
              child.y = 458;
            } else if (lName.includes('usd') || lName.includes('$4,250,000')) {
              child.y = 494;
            }
          }
          if (frame.name.includes('06') && child.name.startsWith('Btn / Action')) {
            child.y = 486;
            child.x = 216;
          }

          if (child.type !== 'TEXT') continue;

          try {
            await figma.loadFontAsync(child.fontName);
          } catch (e) {
            try {
              await ensureFont('Inter', 'Regular');
              child.fontName = { family: 'Inter', style: 'Regular' };
            } catch (err) {}
          }

          const currentRight = (child.x || 0) + (child.width || 0);
          const maxAllowedWidth = Math.max(120, 393 - (child.x || 16) - 16);

          // Rule 1: Width clamping (Safe Padding: 16px each side, max width <= 361px, or 345px)
          if (child.width > 361 || currentRight > 393) {
            const targetWidth = Math.min(child.width, maxAllowedWidth, 345);
            child.resize(targetWidth, child.height);
            child.textAutoResize = 'HEIGHT';
            clampedCount++;
            clampedList.push({
              screen: frame.name,
              name: child.name,
              prevWidth: child.width,
              newWidth: targetWidth
            });
          }

          // Rule 2: Truncation for titles & headers (Max 1 or 2 lines)
          const lowerName = child.name.toLowerCase();
          const isTitleOrHeading = child.fontSize >= 18 || lowerName.includes('sanctuary') || lowerName.includes('villa') || lowerName.includes('title') || lowerName.includes('heading') || lowerName.includes('curated') || lowerName.includes('sotheby');

          if (isTitleOrHeading) {
            if ('textTruncation' in child) {
              child.textTruncation = 'ENDING';
            }
            if ('maxLines' in child) {
              child.maxLines = child.fontSize >= 24 ? 2 : 1;
            }
            truncatedCount++;
          }

          // Rule 3: Truncation for descriptions (Max 3 lines)
          const isDescription = child.fontSize <= 16 && (child.characters.length > 50 || lowerName.includes('discover') || lowerName.includes('step inside') || lowerName.includes('connect directly') || lowerName.includes('architecture must') || lowerName.includes('showing 14') || lowerName.includes('pin details'));
          if (isDescription) {
            if ('textTruncation' in child) {
              child.textTruncation = 'ENDING';
            }
            if ('maxLines' in child) {
              child.maxLines = 3;
            }
            truncatedCount++;
          }

          // Rule 4: High-contrast sharpness for Glassmorphism Accessibility (WCAG AAA)
          if (child.fontName && child.fontName.style === 'Regular' && child.fontSize >= 14 && isLight) {
            try {
              await ensureFont('Inter', 'Medium');
              child.fontName = { family: 'Inter', style: 'Medium' };
            } catch (err) {}
          }
        }
      }

      return {
        status: 'typography_and_truncation_applied',
        clampedCount,
        truncatedCount,
        clampedList: clampedList.slice(0, 30)
      };
    }

    case 'PING': {
      return { status: 'pong', time: Date.now() };
    }

    case 'CHECK_CAPABILITIES': {
      return {
        hasCreateVideoAsync: 'createVideoAsync' in figma,
        hasCreateImage: 'createImage' in figma,
        hasCreateImageAsync: 'createImageAsync' in figma,
        editorType: figma.editorType
      };
    }

    case 'INSERT_VIDEO': {
      const targetId = resolveNodeId(params.nodeId || params.targetNodeName, refMap);
      const node = await getNode(targetId);
      if (!node) throw new Error(`Target node not found for video: ${targetId}`);

      if (!('createVideoAsync' in figma)) {
        throw new Error('figma.createVideoAsync is not supported in this Figma environment');
      }

      let bytes;
      if (params.videoBytes && Array.isArray(params.videoBytes)) {
        bytes = new Uint8Array(params.videoBytes);
      } else if (params.videoBase64) {
        bytes = base64ToBytes(params.videoBase64);
      } else {
        throw new Error('No videoBytes or videoBase64 provided');
      }

      try {
        logToUI(`Uploading video (${bytes.length} bytes) to Figma canvas...`, 'info');
        const video = await figma.createVideoAsync(bytes);
        if (video && video.hash) {
          node.fills = [{
            type: 'VIDEO',
            scaleMode: params.scaleMode || 'FILL',
            videoHash: video.hash
          }];
          logToUI(`Video fill applied successfully to ${node.name}!`, 'success');
          return { status: 'video_inserted', nodeId: node.id, videoHash: video.hash };
        }
      } catch (err) {
        logToUI(`Figma Video Error: ${err.message}`, 'error');
        throw new Error(`Figma Video Error: ${err.message}`);
      }
    }

    case 'INSERT_IMAGE': {
      const targetId = resolveNodeId(params.nodeId || params.targetNodeName, refMap);
      const node = await getNode(targetId);
      if (!node) throw new Error(`Target node not found for image: ${targetId}`);

      if (params.imageBytes && Array.isArray(params.imageBytes)) {
        const image = figma.createImage(new Uint8Array(params.imageBytes));
        node.fills = [{
          type: 'IMAGE',
          scaleMode: params.scaleMode || 'FILL',
          imageHash: image.hash
        }];
        return { status: 'image_inserted', nodeId: node.id, imageHash: image.hash };
      } else if (params.imageBase64) {
        const bytes = base64ToBytes(params.imageBase64);
        const image = figma.createImage(bytes);
        node.fills = [{
          type: 'IMAGE',
          scaleMode: params.scaleMode || 'FILL',
          imageHash: image.hash
        }];
        return { status: 'image_inserted', nodeId: node.id, imageHash: image.hash };
      } else if (params.imageUrl) {
        await applyImageFill(node, params.imageUrl, params.fallbackColor);
        return { status: 'image_applied', nodeId: node.id };
      }
      throw new Error('No imageBytes, imageBase64 or imageUrl provided');
    }

    case 'GET_SELECTION': {
      const selection = figma.currentPage.selection.map(node => ({
        id: node.id,
        name: node.name,
        type: node.type,
        width: node.width,
        height: node.height,
        x: node.x,
        y: node.y,
        reactions: node.reactions ? node.reactions.length : 0
      }));
      return { selection };
    }

    case 'GET_DOCUMENT_INFO': {
      return {
        documentName: figma.root.name,
        currentPage: {
          id: figma.currentPage.id,
          name: figma.currentPage.name,
          childCount: figma.currentPage.children.length,
          children: figma.currentPage.children.map(c => ({
            id: c.id,
            name: c.name,
            type: c.type,
            x: c.x,
            y: c.y,
            width: c.width,
            height: c.height,
            reactionsCount: c.reactions ? c.reactions.length : 0
          })),
          flowStartingPoints: figma.currentPage.flowStartingPoints
        },
        pages: figma.root.children.map(p => ({ id: p.id, name: p.name }))
      };
    }

    case 'CREATE_FRAME': {
      const frame = figma.createFrame();
      frame.name = params.name || 'Frame';
      
      const width = params.width || 393;
      const height = params.height || 852;
      frame.resize(width, height);

      if (params.x !== undefined && params.y !== undefined) {
        frame.x = params.x;
        frame.y = params.y;
      } else {
        // Place next to existing frames to avoid overlapping
        const children = figma.currentPage.children;
        if (children.length > 1) {
          let maxX = 0;
          for (const c of children) {
            if (c.id !== frame.id && 'x' in c && 'width' in c) {
              maxX = Math.max(maxX, c.x + c.width);
            }
          }
          frame.x = maxX + 80;
        }
      }

      // Fill color or image
      await applyImageFill(frame, params.imageUrl, params.backgroundColor);

      if (params.cornerRadius !== undefined) {
        frame.cornerRadius = params.cornerRadius;
      }

      if (params.clipsContent !== undefined) {
        frame.clipsContent = params.clipsContent;
      }

      if (params.overflowDirection !== undefined) {
        frame.overflowDirection = params.overflowDirection.toUpperCase();
      }

      // Auto Layout settings
      if (params.layoutMode) {
        frame.layoutMode = params.layoutMode.toUpperCase(); // VERTICAL or HORIZONTAL
        if (params.padding !== undefined) {
          frame.paddingLeft = params.padding;
          frame.paddingRight = params.padding;
          frame.paddingTop = params.padding;
          frame.paddingBottom = params.padding;
        }
        if (params.paddingLeft !== undefined) frame.paddingLeft = params.paddingLeft;
        if (params.paddingRight !== undefined) frame.paddingRight = params.paddingRight;
        if (params.paddingTop !== undefined) frame.paddingTop = params.paddingTop;
        if (params.paddingBottom !== undefined) frame.paddingBottom = params.paddingBottom;
        if (params.itemSpacing !== undefined) frame.itemSpacing = params.itemSpacing;
        if (params.primaryAxisAlignItems) frame.primaryAxisAlignItems = params.primaryAxisAlignItems;
        if (params.counterAxisAlignItems) frame.counterAxisAlignItems = params.counterAxisAlignItems;
      }

      // Parent attachment
      const parentId = resolveNodeId(params.parentId, refMap);
      if (parentId) {
        const parentNode = await getNode(parentId);
        if (parentNode && 'appendChild' in parentNode) {
          parentNode.appendChild(frame);
        } else {
          figma.currentPage.appendChild(frame);
        }
      } else {
        figma.currentPage.appendChild(frame);
      }

      figma.viewport.scrollAndZoomIntoView([frame]);
      return { id: frame.id, name: frame.name, type: frame.type };
    }

    case 'CREATE_TEXT': {
      const textNode = figma.createText();
      const family = params.fontFamily || 'Inter';
      const style = params.fontStyle || 'Regular';
      const loadedFont = await ensureFont(family, style);

      if (loadedFont) {
        textNode.fontName = loadedFont;
      }

      textNode.characters = params.text || 'Text';
      textNode.fontSize = params.fontSize || 16;
      textNode.name = params.name || textNode.characters.substring(0, 20);

      if (params.color) {
        const c = parseColor(params.color);
        textNode.fills = [{ type: 'SOLID', color: c }];
      }

      if (params.textAlignHorizontal) {
        textNode.textAlignHorizontal = params.textAlignHorizontal; // 'LEFT', 'CENTER', 'RIGHT', 'JUSTIFIED'
      }

      if (params.x !== undefined && params.y !== undefined) {
        textNode.x = params.x;
        textNode.y = params.y;
      }

      const parentId = resolveNodeId(params.parentId, refMap);
      if (parentId) {
        const parentNode = await getNode(parentId);
        if (parentNode && 'appendChild' in parentNode) {
          parentNode.appendChild(textNode);
        } else {
          figma.currentPage.appendChild(textNode);
        }
      } else {
        figma.currentPage.appendChild(textNode);
      }

      return { id: textNode.id, name: textNode.name, type: textNode.type };
    }

    case 'CREATE_BUTTON': {
      const btn = figma.createFrame();
      btn.name = params.name || 'Button';
      btn.layoutMode = 'HORIZONTAL';
      btn.primaryAxisSizingMode = 'AUTO';
      btn.counterAxisSizingMode = 'AUTO';
      btn.primaryAxisAlignItems = 'CENTER';
      btn.counterAxisAlignItems = 'CENTER';

      const padX = params.paddingX !== undefined ? params.paddingX : 20;
      const padY = params.paddingY !== undefined ? params.paddingY : 12;
      btn.paddingLeft = padX;
      btn.paddingRight = padX;
      btn.paddingTop = padY;
      btn.paddingBottom = padY;
      btn.cornerRadius = params.cornerRadius !== undefined ? params.cornerRadius : 8;

      const bgColor = params.backgroundColor || '#2563eb';
      btn.fills = [{ type: 'SOLID', color: parseColor(bgColor) }];

      const label = figma.createText();
      const font = await ensureFont('Inter', 'Medium');
      if (font) label.fontName = font;
      label.characters = params.text || 'Button';
      label.fontSize = params.fontSize || 15;
      const textColor = params.textColor || '#ffffff';
      label.fills = [{ type: 'SOLID', color: parseColor(textColor) }];

      btn.appendChild(label);

      if (params.x !== undefined && params.y !== undefined) {
        btn.x = params.x;
        btn.y = params.y;
      }

      const parentId = resolveNodeId(params.parentId, refMap);
      if (parentId) {
        const parentNode = await getNode(parentId);
        if (parentNode && 'appendChild' in parentNode) {
          parentNode.appendChild(btn);
        } else {
          figma.currentPage.appendChild(btn);
        }
      } else {
        figma.currentPage.appendChild(btn);
      }

      return { id: btn.id, labelId: label.id, name: btn.name, type: btn.type };
    }

    case 'CREATE_RECTANGLE': {
      const rect = figma.createRectangle();
      rect.name = params.name || 'Rectangle';
      rect.resize(params.width || 100, params.height || 100);
      await applyImageFill(rect, params.imageUrl, params.color);
      if (params.cornerRadius !== undefined) {
        rect.cornerRadius = params.cornerRadius;
      }
      if (params.x !== undefined && params.y !== undefined) {
        rect.x = params.x;
        rect.y = params.y;
      }

      const parentId = resolveNodeId(params.parentId, refMap);
      if (parentId) {
        const parentNode = await getNode(parentId);
        if (parentNode && 'appendChild' in parentNode) {
          parentNode.appendChild(rect);
        } else {
          figma.currentPage.appendChild(rect);
        }
      } else {
        figma.currentPage.appendChild(rect);
      }

      return { id: rect.id, name: rect.name, type: rect.type };
    }

    case 'CREATE_COMPONENT': {
      const comp = figma.createComponent();
      comp.name = params.name || 'Component';
      const width = params.width || 345;
      const height = params.height || 100;
      comp.resize(width, height);
      if (params.x !== undefined && params.y !== undefined) {
        comp.x = params.x;
        comp.y = params.y;
      }
      await applyImageFill(comp, params.imageUrl, params.backgroundColor);
      if (params.cornerRadius !== undefined) comp.cornerRadius = params.cornerRadius;
      if (params.layoutMode) {
        comp.layoutMode = params.layoutMode.toUpperCase();
        if (params.padding !== undefined) {
          comp.paddingLeft = params.padding;
          comp.paddingRight = params.padding;
          comp.paddingTop = params.padding;
          comp.paddingBottom = params.padding;
        }
        if (params.paddingX !== undefined) {
          comp.paddingLeft = params.paddingX;
          comp.paddingRight = params.paddingX;
        }
        if (params.paddingY !== undefined) {
          comp.paddingTop = params.paddingY;
          comp.paddingBottom = params.paddingY;
        }
        if (params.itemSpacing !== undefined) comp.itemSpacing = params.itemSpacing;
        if (params.primaryAxisAlignItems) comp.primaryAxisAlignItems = params.primaryAxisAlignItems;
        if (params.counterAxisAlignItems) comp.counterAxisAlignItems = params.counterAxisAlignItems;
      }
      const parentId = resolveNodeId(params.parentId, refMap);
      if (parentId) {
        const parentNode = await getNode(parentId);
        if (parentNode && 'appendChild' in parentNode) {
          parentNode.appendChild(comp);
        } else {
          figma.currentPage.appendChild(comp);
        }
      } else {
        figma.currentPage.appendChild(comp);
      }
      return { id: comp.id, name: comp.name, type: comp.type };
    }

    case 'CREATE_COMPONENT_SET_WITH_VARIANTS': {
      const comps = [];
      const parent = params.parentId ? await getNode(resolveNodeId(params.parentId, refMap)) : figma.currentPage;

      for (let i = 0; i < (params.variants || []).length; i++) {
        const v = params.variants[i];
        const comp = figma.createComponent();
        comp.name = v.name || `Property1=Variant${i + 1}`;
        const w = v.width || 100;
        const h = v.height || 40;
        comp.resize(w, h);
        if (v.cornerRadius !== undefined) comp.cornerRadius = v.cornerRadius;

        if (v.fills && Array.isArray(v.fills)) {
          comp.fills = v.fills.map(f => ({
            type: f.type || 'SOLID',
            color: f.color ? parseColor(f.color) : { r: 1, g: 1, b: 1 },
            opacity: f.opacity !== undefined ? f.opacity : 1
          }));
        }
        if (v.strokes && Array.isArray(v.strokes)) {
          comp.strokes = v.strokes.map(s => ({
            type: s.type || 'SOLID',
            color: s.color ? parseColor(s.color) : { r: 1, g: 1, b: 1 },
            opacity: s.opacity !== undefined ? s.opacity : 1
          }));
          if (v.strokeWeight) comp.strokeWeight = v.strokeWeight;
        }
        if (v.effects && Array.isArray(v.effects)) {
          comp.effects = v.effects.map(e => {
            if (e.type === 'BACKGROUND_BLUR') return glassBlurEffect(e.radius || 24);
            if (e.type === 'DROP_SHADOW') return glassShadowEffect(e.offsetY || 8, e.radius || 20, e.opacity || 0.1);
            return e;
          });
        }

        if (v.layoutMode) {
          comp.layoutMode = v.layoutMode.toUpperCase();
          if (v.padding !== undefined) {
            comp.paddingLeft = comp.paddingRight = comp.paddingTop = comp.paddingBottom = v.padding;
          }
          if (v.paddingX !== undefined) comp.paddingLeft = comp.paddingRight = v.paddingX;
          if (v.paddingY !== undefined) comp.paddingTop = comp.paddingBottom = v.paddingY;
          if (v.itemSpacing !== undefined) comp.itemSpacing = v.itemSpacing;
          if (v.primaryAxisAlignItems) comp.primaryAxisAlignItems = v.primaryAxisAlignItems;
          if (v.counterAxisAlignItems) comp.counterAxisAlignItems = v.counterAxisAlignItems;
        }

        if (Array.isArray(v.children)) {
          for (const ch of v.children) {
            if (ch.type === 'TEXT') {
              const fontFam = ch.fontFamily || 'Inter';
              const fontSty = ch.fontWeight || 'Regular';
              await ensureFont(fontFam, fontSty);
              const txt = figma.createText();
              txt.fontName = { family: fontFam, style: fontSty };
              txt.characters = ch.characters || '';
              txt.fontSize = ch.fontSize || 14;
              if (ch.color) txt.fills = [{ type: 'SOLID', color: parseColor(ch.color), opacity: ch.opacity !== undefined ? ch.opacity : 1 }];
              if (ch.name) txt.name = ch.name;
              comp.appendChild(txt);
            }
          }
        }

        comps.push(comp);
      }

      if (comps.length === 0) throw new Error('No variants provided to create component set.');

      const compSet = figma.combineAsVariants(comps, parent);
      compSet.name = params.name || 'Component Set';
      if (params.x !== undefined) compSet.x = params.x;
      if (params.y !== undefined) compSet.y = params.y;
      if (params.layoutMode) {
        compSet.layoutMode = params.layoutMode.toUpperCase();
        if (params.itemSpacing !== undefined) compSet.itemSpacing = params.itemSpacing;
        if (params.padding !== undefined) {
          compSet.paddingLeft = compSet.paddingRight = compSet.paddingTop = compSet.paddingBottom = params.padding;
        }
      }

      return {
        id: compSet.id,
        name: compSet.name,
        type: compSet.type,
        variantsCount: compSet.children.length,
        variants: compSet.children.map(c => ({ id: c.id, name: c.name }))
      };
    }

    case 'WIRE_INTERACTIVE_VARIANTS': {
      const compSetId = resolveNodeId(params.componentSetId, refMap);
      const compSet = await getNode(compSetId);
      if (!compSet || compSet.type !== 'COMPONENT_SET') {
        throw new Error(`ComponentSet not found or invalid: ${compSetId}`);
      }

      const variantMap = new Map();
      for (const child of compSet.children) {
        variantMap.set(child.name, child);
      }

      let wiredCount = 0;
      for (const link of (params.links || [])) {
        const source = variantMap.get(link.fromVariant);
        const target = variantMap.get(link.toVariant);
        if (!source || !target) continue;

        let triggerType = (link.trigger || 'ON_HOVER').toUpperCase();
        if (triggerType === 'WHILE_HOVERING') triggerType = 'ON_HOVER';
        if (triggerType === 'WHILE_PRESSING') triggerType = 'ON_PRESS';
        const duration = link.duration !== undefined ? link.duration : 0.18;
        const easing = (link.easing || 'EASE_OUT').toUpperCase();
        const transitionType = (link.transitionType || 'SMART_ANIMATE').toUpperCase();

        const reaction = {
          trigger: { type: triggerType },
          actions: [{
            type: 'NODE',
            destinationId: target.id,
            navigation: 'CHANGE_TO',
            transition: {
              type: transitionType,
              easing: { type: easing },
              duration: duration
            }
          }]
        };

        if ('setReactionsAsync' in source) {
          let current = [];
          try {
            current = 'getReactionsAsync' in source ? await source.getReactionsAsync() : (source.reactions || []);
          } catch (e) { current = []; }
          await source.setReactionsAsync([...current, reaction]);
        } else {
          source.reactions = [...(source.reactions || []), reaction];
        }
        wiredCount++;
      }

      return {
        status: 'variants_wired',
        componentSetId: compSet.id,
        wiredCount
      };
    }

    case 'AUDIT_DESIGN_SYSTEM_COMPONENTS': {
      const componentSets = [];
      const standaloneComponents = [];

      for (const node of figma.currentPage.children) {
        if (node.type === 'COMPONENT_SET') {
          const variants = [];
          for (const v of node.children) {
            let reactions = [];
            if ('reactions' in v && Array.isArray(v.reactions)) {
              reactions = v.reactions.map(r => ({
                trigger: r.trigger ? r.trigger.type : 'UNKNOWN',
                actionType: r.actions && r.actions[0] ? r.actions[0].type : 'UNKNOWN',
                navigation: r.actions && r.actions[0] ? r.actions[0].navigation : 'UNKNOWN',
                destinationId: r.actions && r.actions[0] ? r.actions[0].destinationId : null
              }));
            }
            variants.push({
              id: v.id,
              name: v.name,
              reactionsCount: reactions.length,
              reactions
            });
          }
          componentSets.push({
            id: node.id,
            name: node.name,
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height,
            variantsCount: variants.length,
            variants
          });
        } else if (node.type === 'COMPONENT') {
          standaloneComponents.push({
            id: node.id,
            name: node.name,
            x: node.x,
            y: node.y
          });
        }
      }

      return {
        totalComponentSets: componentSets.length,
        totalStandaloneComponents: standaloneComponents.length,
        componentSets,
        standaloneComponents
      };
    }

    case 'UPDATE_PROPERTIES': {
      const targetId = resolveNodeId(params.nodeId, refMap);
      const node = await getNode(targetId);
      if (!node) throw new Error(`Node not found with ID: ${targetId}`);

      if (params.name) node.name = params.name;
      if (params.x !== undefined) node.x = params.x;
      if (params.y !== undefined) node.y = params.y;
      if (params.width !== undefined && params.height !== undefined && 'resize' in node) {
        node.resize(params.width, params.height);
      }
      if (params.color && 'fills' in node) {
        node.fills = [{ type: 'SOLID', color: parseColor(params.color) }];
      }
      if (params.imageUrl && 'fills' in node) {
        await applyImageFill(node, params.imageUrl, params.color);
      }
      if (params.cornerRadius !== undefined && 'cornerRadius' in node) {
        node.cornerRadius = params.cornerRadius;
      }
      if (params.overflowDirection !== undefined && 'overflowDirection' in node) {
        node.overflowDirection = params.overflowDirection.toUpperCase();
      }
      if (params.clipsContent !== undefined && 'clipsContent' in node) {
        node.clipsContent = params.clipsContent;
      }
      if (params.text && node.type === 'TEXT') {
        await figma.loadFontAsync(node.fontName);
        node.characters = params.text;
      }

      return { id: node.id, status: 'updated' };
    }

    // ==========================================
    // PROTOTYPING ACTIONS
    // ==========================================

    case 'CREATE_FLOW': {
      const targetFrameId = resolveNodeId(params.frameId, refMap);
      const startFrame = await getNode(targetFrameId);
      if (!startFrame) {
        throw new Error(`Target frame not found for flow starting point: ${targetFrameId}`);
      }

      const flowName = params.flowName || 'User Flow';
      const flowItem = { nodeId: startFrame.id, name: flowName };

      if ('setFlowStartingPointsAsync' in figma.currentPage) {
        try {
          const existing = 'getFlowStartingPointsAsync' in figma.currentPage
            ? await figma.currentPage.getFlowStartingPointsAsync()
            : (figma.currentPage.flowStartingPoints || []);
          const filtered = existing.filter(f => f.nodeId !== startFrame.id);
          await figma.currentPage.setFlowStartingPointsAsync([...filtered, flowItem]);
        } catch (e) {
          try {
            await figma.currentPage.setFlowStartingPointsAsync([flowItem]);
          } catch (err2) {}
        }
      } else {
        const existingFlows = (figma.currentPage.flowStartingPoints || []).filter(f => f.nodeId !== startFrame.id);
        figma.currentPage.flowStartingPoints = [...existingFlows, flowItem];
      }

      return {
        status: 'flow_created',
        frameId: startFrame.id,
        flowName: flowName
      };
    }

    case 'ADD_INTERACTION': {
      const sourceId = resolveNodeId(params.sourceNodeId, refMap);
      const targetId = resolveNodeId(params.targetNodeId, refMap);

      const sourceNode = await getNode(sourceId);
      const targetNode = await getNode(targetId);

      if (!sourceNode) throw new Error(`Source node not found: ${sourceId}`);
      if (!targetNode) throw new Error(`Target node not found: ${targetId}`);

      const triggerType = (params.trigger || 'ON_CLICK').toUpperCase();
      let triggerObj = { type: triggerType };
      if (triggerType === 'AFTER_TIMEOUT') {
        triggerObj.timeout = params.timeout !== undefined ? params.timeout : 1.5;
      }

      const navType = (params.navigation || 'NAVIGATE').toUpperCase();
      const transitionType = (params.transitionType || 'SMART_ANIMATE').toUpperCase();
      const duration = params.duration !== undefined ? params.duration : 0.35;
      const easingType = (params.easing || 'EASE_OUT').toUpperCase();

      let transitionObj = null;
      if (transitionType !== 'INSTANT') {
        const directionalTypes = ['MOVE_IN', 'MOVE_OUT', 'PUSH', 'SLIDE_IN', 'SLIDE_OUT'];
        if (directionalTypes.includes(transitionType)) {
          transitionObj = {
            type: transitionType,
            direction: (params.direction || 'LEFT').toUpperCase(),
            matchLayers: false,
            easing: { type: easingType },
            duration: duration
          };
        } else {
          // Simple transitions: DISSOLVE, SMART_ANIMATE, SCROLL_ANIMATE
          const validType = ['DISSOLVE', 'SMART_ANIMATE', 'SCROLL_ANIMATE'].includes(transitionType)
            ? transitionType
            : 'SMART_ANIMATE';
          transitionObj = {
            type: validType,
            easing: { type: easingType },
            duration: duration
          };
        }
      }

      const reaction = {
        trigger: triggerObj,
        actions: [
          {
            type: 'NODE',
            destinationId: targetNode.id,
            navigation: navType,
            transition: transitionObj,
            preserveScrollPosition: !!params.preserveScrollPosition
          }
        ]
      };

      // Append reactions using setReactionsAsync or fallback
      try {
        if ('setReactionsAsync' in sourceNode) {
          let current = [];
          try {
            current = 'getReactionsAsync' in sourceNode
              ? await sourceNode.getReactionsAsync()
              : (sourceNode.reactions || []);
          } catch (e) {
            current = [];
          }
          await sourceNode.setReactionsAsync([...current, reaction]);
        } else {
          const currentReactions = sourceNode.reactions || [];
          sourceNode.reactions = [...currentReactions, reaction];
        }
      } catch (assignErr) {
        // Graceful fallback with SMART_ANIMATE or null transition if directional validation fails
        const fallbackReaction = {
          trigger: triggerObj,
          actions: [
            {
              type: 'NODE',
              destinationId: targetNode.id,
              navigation: navType,
              transition: { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.35 },
              preserveScrollPosition: false
            }
          ]
        };
        if ('setReactionsAsync' in sourceNode) {
          await sourceNode.setReactionsAsync([fallbackReaction]);
        } else {
          sourceNode.reactions = [fallbackReaction];
        }
      }

      return {
        status: 'interaction_added',
        sourceNodeId: sourceNode.id,
        targetNodeId: targetNode.id,
        trigger: triggerType,
        transition: transitionType
      };
    }

    // ==========================================
    // BATCH TRANSACTION EXECUTOR
    // ==========================================
    case 'BATCH_EXECUTE': {
      const steps = params.steps || [];
      const results = [];
      const batchRefMap = { ...refMap };

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        try {
          const res = await executeAction(step.action, step.params, batchRefMap);
          results.push({ index: i, action: step.action, success: true, result: res });
          if (step.ref && res && res.id) {
            batchRefMap[step.ref] = res.id;
          }
        } catch (stepErr) {
          results.push({ index: i, action: step.action, success: false, error: stepErr.message });
          if (!step.continueOnError) {
            break;
          }
        }
      }

      return { status: 'batch_completed', stepsCount: steps.length, results, refMap: batchRefMap };
    }

    case 'EXPORT_FRAME': {
      const targetId = resolveNodeId(params.nodeId, refMap);
      let target = targetId ? await getNode(targetId) : null;
      if (!target && figma.currentPage.selection.length > 0) {
        target = figma.currentPage.selection[0];
      }
      if (!target && figma.currentPage.children.length > 0) {
        target = figma.currentPage.children[0];
      }
      if (!target) throw new Error('No element found to export');
      const scale = params.scale || 1;
      const bytes = await target.exportAsync({
        format: 'PNG',
        constraint: { type: 'SCALE', value: scale }
      });
      let binary = '';
      const len = bytes.byteLength;
      const chunkSize = 8192;
      for (let j = 0; j < len; j += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(j, Math.min(j + chunkSize, len)));
      }
      return {
        nodeId: target.id,
        name: target.name,
        width: target.width,
        height: target.height,
        base64: btoa(binary)
      };
    }

    case 'ZOOM_TO_FIT': {
      if (figma.currentPage.children.length > 0) {
        figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
      }
      return { status: 'zoomed', count: figma.currentPage.children.length };
    }

    case 'DELETE_NODE': {
      const targetId = resolveNodeId(params.nodeId, refMap);
      const node = await getNode(targetId);
      if (node) {
        node.remove();
        return { status: 'deleted', id: targetId };
      }
      return { status: 'not_found', id: targetId };
    }

    case 'DELETE_NODES_BY_Y': {
      const minY = params.minY || 4000;
      const toRemove = figma.currentPage.children.filter(c => c.y >= minY);
      for (const node of toRemove) {
        node.remove();
      }
      return { status: 'deleted_by_y', count: toRemove.length };
    }

    case 'DELETE_NODES_MATCHING': {
      const matchText = params.matchText || '[Light]';
      const toRemove = figma.currentPage.children.filter(c => 
        c.name.includes(matchText) || c.name === 'Text' || c.name === 'Button' || c.y >= 4000
      );
      for (const node of toRemove) {
        node.remove();
      }
      return { status: 'deleted_matching', count: toRemove.length };
    }

    case 'CLEAR_PAGE': {
      const count = figma.currentPage.children.length;
      while (figma.currentPage.children.length > 0) {
        figma.currentPage.children[0].remove();
      }
      return { status: 'cleared', removedCount: count };
    }

    default:
      throw new Error(`Unsupported action: ${action}`);
  }
}

// Receive messages from UI iframe
figma.ui.onmessage = async (msg) => {
  const correlationId = msg.correlationId || null;
  try {
    const result = await executeAction(msg.action, msg.params);
    figma.ui.postMessage({
      correlationId,
      status: 'success',
      action: msg.action,
      data: result
    });
  } catch (err) {
    logToUI(`Error executing ${msg.action}: ${err.message}`, 'error');
    figma.ui.postMessage({
      correlationId,
      status: 'error',
      action: msg.action,
      error: err.message
    });
  }
};

logToUI('AGY Figma Sandbox Engine initialized. Waiting for commands...');
