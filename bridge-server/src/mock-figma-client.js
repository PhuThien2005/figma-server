// Mock Figma Plugin Client for Headless Testing & Verification
// Connects to Bridge Server via WebSocket and simulates the Figma sandbox engine

import WebSocket from 'ws';

const WS_URL = process.env.WS_URL || 'ws://localhost:8765';

export class MockFigmaPlugin {
  constructor(url = WS_URL) {
    this.url = url;
    this.ws = null;
    this.virtualCanvas = {
      nodes: new Map(),
      flowStartingPoints: [],
      nextId: 100
    };
  }

  start() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      this.ws.on('open', () => {
        console.log('[Mock Figma] Connected to Bridge Server at', this.url);
        // Send handshake
        this.ws.send(JSON.stringify({
          type: 'HANDSHAKE',
          client: 'mock-figma-plugin',
          timestamp: Date.now()
        }));
        resolve();
      });

      this.ws.on('message', (data) => {
        try {
          const command = JSON.parse(data.toString());
          this.handleCommand(command);
        } catch (err) {
          console.error('[Mock Figma] Error parsing message:', err);
        }
      });

      this.ws.on('error', (err) => {
        reject(err);
      });
    });
  }

  stop() {
    if (this.ws) {
      this.ws.close();
    }
  }

  handleCommand(cmd) {
    const { correlationId, action, params } = cmd;
    let result = null;
    let error = null;

    try {
      result = this.executeVirtualAction(action, params);
    } catch (e) {
      error = e.message;
    }

    const response = {
      correlationId,
      status: error ? 'error' : 'success',
      action,
      data: result,
      error
    };

    this.ws.send(JSON.stringify(response));
  }

  executeVirtualAction(action, params = {}) {
    const genId = () => `mock-${this.virtualCanvas.nextId++}`;

    switch (action) {
      case 'PING':
        return { pong: true, time: Date.now() };

      case 'GET_SELECTION':
        return { selection: [] };

      case 'GET_DOCUMENT_INFO':
        return {
          documentName: 'Mock Figma File',
          currentPage: {
            id: '0:1',
            name: 'Page 1',
            childCount: this.virtualCanvas.nodes.size,
            flowStartingPoints: this.virtualCanvas.flowStartingPoints
          }
        };

      case 'CREATE_FRAME': {
        const id = genId();
        const node = {
          id,
          type: 'FRAME',
          name: params.name || 'Frame',
          width: params.width || 393,
          height: params.height || 852,
          layoutMode: params.layoutMode || 'NONE',
          reactions: []
        };
        this.virtualCanvas.nodes.set(id, node);
        return { id, name: node.name, type: node.type };
      }

      case 'CREATE_TEXT': {
        const id = genId();
        const node = {
          id,
          type: 'TEXT',
          characters: params.text || 'Text',
          fontSize: params.fontSize || 16,
          fontName: { family: params.fontFamily || 'Inter', style: params.fontStyle || 'Regular' }
        };
        this.virtualCanvas.nodes.set(id, node);
        return { id, name: node.characters, type: node.type };
      }

      case 'CREATE_BUTTON': {
        const id = genId();
        const node = {
          id,
          type: 'FRAME',
          name: params.name || 'Button',
          layoutMode: 'HORIZONTAL',
          reactions: []
        };
        this.virtualCanvas.nodes.set(id, node);
        return { id, name: node.name, type: node.type };
      }

      case 'CREATE_FLOW': {
        const frame = this.virtualCanvas.nodes.get(params.frameId);
        if (!frame) throw new Error(`Target frame not found: ${params.frameId}`);
        const flow = { nodeId: frame.id, name: params.flowName || 'Flow' };
        this.virtualCanvas.flowStartingPoints.push(flow);
        return { status: 'flow_created', frameId: frame.id, flowName: flow.name };
      }

      case 'ADD_INTERACTION': {
        const source = this.virtualCanvas.nodes.get(params.sourceNodeId);
        const target = this.virtualCanvas.nodes.get(params.targetNodeId);
        if (!source) throw new Error(`Source node not found: ${params.sourceNodeId}`);
        if (!target) throw new Error(`Target node not found: ${params.targetNodeId}`);

        const reaction = {
          trigger: { type: params.trigger || 'ON_CLICK' },
          actions: [{ destinationId: target.id, transition: params.transitionType || 'SMART_ANIMATE' }]
        };
        source.reactions.push(reaction);
        return { status: 'interaction_added', sourceNodeId: source.id, targetNodeId: target.id };
      }

      case 'BATCH_EXECUTE': {
        const steps = params.steps || [];
        const results = [];
        const refMap = {};

        for (let i = 0; i < steps.length; i++) {
          const step = steps[i];
          // Resolve refs in params
          const resolvedParams = { ...step.params };
          for (const key of Object.keys(resolvedParams)) {
            const val = resolvedParams[key];
            if (typeof val === 'string' && val.startsWith('$') && refMap[val.substring(1)]) {
              resolvedParams[key] = refMap[val.substring(1)];
            }
          }

          const res = this.executeVirtualAction(step.action, resolvedParams);
          results.push({ index: i, action: step.action, success: true, result: res });
          if (step.ref && res && res.id) {
            refMap[step.ref] = res.id;
          }
        }

        return { status: 'batch_completed', stepsCount: steps.length, results, refMap };
      }

      case 'CLEAR_PAGE': {
        const count = this.virtualCanvas.nodes.size;
        this.virtualCanvas.nodes.clear();
        this.virtualCanvas.flowStartingPoints = [];
        return { status: 'cleared', removedCount: count };
      }

      default:
        throw new Error(`Mock Figma unsupported action: ${action}`);
    }
  }
}

// Standalone execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const client = new MockFigmaPlugin();
  client.start().catch((err) => {
    console.error('Failed to start mock Figma client:', err);
    process.exit(1);
  });
}
