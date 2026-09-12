#!/usr/bin/env node
// AGY Figma MCP Server (Stdio Transport)
// Exposes Figma Canvas and Prototyping tools directly to Antigravity CLI

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://localhost:8765';

async function callBridge(action, params = {}) {
  try {
    const response = await fetch(`${BRIDGE_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, params })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}: Failed to execute ${action}`);
    }
    return data;
  } catch (err) {
    if (err.message.includes('ECONNREFUSED') || err.message.includes('Failed to fetch')) {
      throw new Error(`Cannot connect to AGY Bridge Server at ${BRIDGE_URL}. Ensure 'npm start' is running in bridge-server/`);
    }
    throw err;
  }
}

async function checkHealth() {
  try {
    const res = await fetch(`${BRIDGE_URL}/health`);
    return await res.json();
  } catch (err) {
    return { status: 'down', error: err.message };
  }
}

const server = new Server(
  {
    name: 'figma-agy-bridge',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'figma_status',
        description: 'Checks the connection status of the Figma Bridge Server and the Figma Desktop Plugin.',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'figma_get_selection',
        description: 'Retrieves the currently selected nodes on the active Figma canvas, including their IDs, dimensions, and names.',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'figma_get_document_info',
        description: 'Retrieves metadata about the active document, current page, and existing prototype flow starting points.',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'figma_create_frame',
        description: 'Creates a new Frame/Artboard on the canvas with optional Auto Layout, dimensions, background color, and padding.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name of the frame (e.g. "Screen / Login")' },
            width: { type: 'number', description: 'Frame width (default 393 for mobile)' },
            height: { type: 'number', description: 'Frame height (default 852 for mobile)' },
            backgroundColor: { type: 'string', description: 'Hex color string (e.g. "#FFFFFF" or "#0F172A")' },
            cornerRadius: { type: 'number', description: 'Border radius in pixels' },
            layoutMode: { type: 'string', enum: ['VERTICAL', 'HORIZONTAL', 'NONE'], description: 'Auto Layout direction' },
            padding: { type: 'number', description: 'Padding for all sides in Auto Layout' },
            itemSpacing: { type: 'number', description: 'Gap between child elements in Auto Layout' },
            x: { type: 'number', description: 'X coordinate (optional)' },
            y: { type: 'number', description: 'Y coordinate (optional)' },
            parentId: { type: 'string', description: 'Optional ID of parent node to nest inside' }
          },
          required: ['name']
        }
      },
      {
        name: 'figma_create_text',
        description: 'Creates a typography text node on the Figma canvas, automatically loading fonts before rendering.',
        inputSchema: {
          type: 'object',
          properties: {
            text: { type: 'string', description: 'The text content to render' },
            fontSize: { type: 'number', description: 'Font size in pixels (default 16)' },
            fontFamily: { type: 'string', description: 'Font family (e.g. "Inter", "Roboto")' },
            fontStyle: { type: 'string', description: 'Font style (e.g. "Regular", "Medium", "Bold")' },
            color: { type: 'string', description: 'Hex color string (e.g. "#1E293B")' },
            textAlignHorizontal: { type: 'string', enum: ['LEFT', 'CENTER', 'RIGHT', 'JUSTIFIED'] },
            x: { type: 'number' },
            y: { type: 'number' },
            parentId: { type: 'string', description: 'Optional ID of parent frame to insert into' }
          },
          required: ['text']
        }
      },
      {
        name: 'figma_create_button',
        description: 'Creates an Auto Layout button with styled background, padding, rounded corners, and centered text label.',
        inputSchema: {
          type: 'object',
          properties: {
            text: { type: 'string', description: 'Button label text' },
            backgroundColor: { type: 'string', description: 'Button background hex (default "#2563EB")' },
            textColor: { type: 'string', description: 'Text label color hex (default "#FFFFFF")' },
            fontSize: { type: 'number', description: 'Font size (default 15)' },
            cornerRadius: { type: 'number', description: 'Corner radius (default 8)' },
            paddingX: { type: 'number', description: 'Horizontal padding (default 20)' },
            paddingY: { type: 'number', description: 'Vertical padding (default 12)' },
            name: { type: 'string', description: 'Node name in layers list' },
            parentId: { type: 'string', description: 'Parent frame ID to insert into' }
          },
          required: ['text']
        }
      },
      {
        name: 'figma_add_interaction',
        description: 'Wires an interactive prototype connection between a source node (button/card) and a destination frame.',
        inputSchema: {
          type: 'object',
          properties: {
            sourceNodeId: { type: 'string', description: 'ID of the clickable node (e.g. button)' },
            targetNodeId: { type: 'string', description: 'ID of the destination frame' },
            trigger: { type: 'string', enum: ['ON_CLICK', 'AFTER_TIMEOUT', 'ON_HOVER', 'ON_PRESS', 'ON_DRAG'], description: 'Trigger type' },
            timeout: { type: 'number', description: 'Timeout in seconds if trigger is AFTER_TIMEOUT (e.g. 2.0)' },
            transitionType: { type: 'string', enum: ['SMART_ANIMATE', 'SLIDE_IN', 'SLIDE_OUT', 'MOVE_IN', 'DISSOLVE', 'INSTANT'], description: 'Animation transition' },
            duration: { type: 'number', description: 'Transition duration in seconds (default 0.35)' },
            easing: { type: 'string', enum: ['EASE_OUT', 'EASE_IN', 'EASE_IN_AND_OUT', 'LINEAR'] },
            direction: { type: 'string', enum: ['LEFT', 'RIGHT', 'TOP', 'BOTTOM'], description: 'Direction for slide/move' }
          },
          required: ['sourceNodeId', 'targetNodeId']
        }
      },
      {
        name: 'figma_create_flow',
        description: 'Registers a frame as a Prototype Flow Starting Point so the user can test the flow by pressing Present or Shift+Space.',
        inputSchema: {
          type: 'object',
          properties: {
            frameId: { type: 'string', description: 'ID of the starting frame' },
            flowName: { type: 'string', description: 'Name of the flow (e.g. "Onboarding Flow", "Checkout Flow")' }
          },
          required: ['frameId', 'flowName']
        }
      },
      {
        name: 'figma_batch_execute',
        description: 'Executes a multi-step sequence of canvas creations and prototype wirings in a single atomic transaction. Supports aliases ($screen1, $btn) to wire nodes created in the same batch.',
        inputSchema: {
          type: 'object',
          properties: {
            steps: {
              type: 'array',
              description: 'Array of actions with optional "ref" identifier for cross-referencing in later steps',
              items: {
                type: 'object',
                properties: {
                  action: { type: 'string' },
                  ref: { type: 'string', description: 'Reference alias (e.g. "splash_screen", "login_btn")' },
                  params: { type: 'object' }
                },
                required: ['action']
              }
            }
          },
          required: ['steps']
        }
      },
      {
        name: 'figma_clear_canvas',
        description: 'Removes all nodes from the current Figma page for a clean canvas slate.',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'figma_status': {
        const health = await checkHealth();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(health, null, 2)
            }
          ]
        };
      }

      case 'figma_get_selection': {
        const res = await callBridge('GET_SELECTION');
        return { content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }] };
      }

      case 'figma_get_document_info': {
        const res = await callBridge('GET_DOCUMENT_INFO');
        return { content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }] };
      }

      case 'figma_create_frame': {
        const res = await callBridge('CREATE_FRAME', args);
        return { content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }] };
      }

      case 'figma_create_text': {
        const res = await callBridge('CREATE_TEXT', args);
        return { content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }] };
      }

      case 'figma_create_button': {
        const res = await callBridge('CREATE_BUTTON', args);
        return { content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }] };
      }

      case 'figma_add_interaction': {
        const res = await callBridge('ADD_INTERACTION', args);
        return { content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }] };
      }

      case 'figma_create_flow': {
        const res = await callBridge('CREATE_FLOW', args);
        return { content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }] };
      }

      case 'figma_batch_execute': {
        const res = await callBridge('BATCH_EXECUTE', args);
        return { content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }] };
      }

      case 'figma_clear_canvas': {
        const res = await callBridge('CLEAR_PAGE', {});
        return { content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }] };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      isError: true,
      content: [{ type: 'text', text: `[Figma MCP Error]: ${error.message}` }]
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
