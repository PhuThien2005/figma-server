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
      for (let j = 0; j < len; j++) {
        binary += String.fromCharCode(bytes[j]);
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
