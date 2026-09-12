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

// Safe font loader
async function ensureFont(family = 'Inter', style = 'Regular') {
  try {
    await figma.loadFontAsync({ family, style });
    return { family, style };
  } catch (err) {
    try {
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
      return { family: 'Inter', style: 'Regular' };
    } catch (fallbackErr) {
      try {
        await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
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

// Safe async node getter (compatible with dynamic-page mode)
async function getNode(id) {
  if (!id) return null;
  if ('getNodeByIdAsync' in figma) {
    try {
      const n = await figma.getNodeByIdAsync(id);
      if (n) return n;
    } catch (e) {}
  }
  try {
    return figma.getNodeById(id);
  } catch (e) {
    return null;
  }
}

// Safe image fill loader
async function applyImageFill(node, imageUrl, fallbackColor = null) {
  if (imageUrl) {
    try {
      const image = await figma.createImageAsync(imageUrl);
      node.fills = [{
        type: 'IMAGE',
        imageHash: image.hash,
        scaleMode: 'FILL'
      }];
      return;
    } catch (imgErr) {
      logToUI(`Could not load image ${imageUrl}: ${imgErr.message}`, 'warn');
    }
  }
  if (fallbackColor) {
    node.fills = [{ type: 'SOLID', color: parseColor(fallbackColor) }];
  } else if (!imageUrl) {
    node.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  }
}

// Core action executor
async function executeAction(action, params = {}, refMap = {}) {
  switch (action) {
    case 'PING': {
      return { status: 'pong', time: Date.now() };
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
      // Filter out existing flow on same node if any
      const existingFlows = figma.currentPage.flowStartingPoints.filter(f => f.nodeId !== startFrame.id);
      figma.currentPage.flowStartingPoints = [
        ...existingFlows,
        { nodeId: startFrame.id, name: flowName }
      ];

      return {
        status: 'flow_created',
        frameId: startFrame.id,
        flowName: flowName,
        totalFlows: figma.currentPage.flowStartingPoints.length
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
        transitionObj = {
          type: transitionType,
          duration: duration,
          easing: { type: easingType }
        };
        if (params.direction) {
          transitionObj.direction = params.direction.toUpperCase(); // 'LEFT', 'RIGHT', 'TOP', 'BOTTOM'
        }
      } else {
        transitionObj = { type: 'INSTANT' };
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

      // Append or replace reactions
      const currentReactions = sourceNode.reactions || [];
      sourceNode.reactions = [...currentReactions, reaction];

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
