// AGY Figma Bridge Server (HTTP REST + WebSocket)
import http from 'http';
import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import crypto from 'crypto';

const PORT = process.env.PORT || 8765;
const app = express();

app.use(express.json({ limit: '10mb' }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let activeFigmaSocket = null;
const pendingRequests = new Map(); // correlationId -> { resolve, reject, timeoutId }

wss.on('connection', (ws, req) => {
  const remoteIp = req.socket.remoteAddress;
  console.log(`[Bridge WS] New connection established from ${remoteIp}`);
  activeFigmaSocket = ws;

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      // Check if this is a response to a pending request
      if (msg.correlationId && pendingRequests.has(msg.correlationId)) {
        const { resolve, timeoutId } = pendingRequests.get(msg.correlationId);
        clearTimeout(timeoutId);
        pendingRequests.delete(msg.correlationId);
        resolve(msg);
      } else if (msg.type === 'HANDSHAKE') {
        console.log('[Bridge WS] Handshake received from Figma Plugin:', msg);
      } else {
        console.log('[Bridge WS] Message from Figma:', msg);
      }
    } catch (err) {
      console.error('[Bridge WS] Error parsing incoming message:', err);
    }
  });

  ws.on('close', () => {
    console.log('[Bridge WS] Figma connection closed.');
    if (activeFigmaSocket === ws) {
      activeFigmaSocket = null;
    }
  });

  ws.on('error', (err) => {
    console.error('[Bridge WS] Socket error:', err.message);
  });
});

// Helper to send command to Figma and wait for response
function sendToFigma(action, params = {}, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    if (!activeFigmaSocket || activeFigmaSocket.readyState !== WebSocket.OPEN) {
      return reject(new Error('Figma Plugin is not connected. Please open Figma Desktop and run the AGY Figma Bridge plugin.'));
    }

    const correlationId = crypto.randomUUID();
    const payload = { correlationId, action, params };

    const timeoutId = setTimeout(() => {
      if (pendingRequests.has(correlationId)) {
        pendingRequests.delete(correlationId);
        reject(new Error(`Command timed out after ${timeoutMs}ms waiting for Figma response.`));
      }
    }, timeoutMs);

    pendingRequests.set(correlationId, { resolve, reject, timeoutId });

    activeFigmaSocket.send(JSON.stringify(payload));
  });
}

// REST Endpoints
app.get('/health', (req, res) => {
  const isConnected = !!(activeFigmaSocket && activeFigmaSocket.readyState === WebSocket.OPEN);
  res.json({
    status: 'ok',
    figmaConnected: isConnected,
    timestamp: Date.now()
  });
});

app.get('/status', (req, res) => {
  const isConnected = !!(activeFigmaSocket && activeFigmaSocket.readyState === WebSocket.OPEN);
  res.json({
    status: 'running',
    port: PORT,
    figmaConnected: isConnected,
    pendingRequestsCount: pendingRequests.size,
    timestamp: Date.now()
  });
});

app.post('/execute', async (req, res) => {
  const { action, params, timeoutMs } = req.body;
  if (!action) {
    return res.status(400).json({ error: 'Missing required field: action' });
  }

  const effectiveTimeout = timeoutMs || (action === 'BATCH_EXECUTE' ? 180000 : 60000);

  try {
    const result = await sendToFigma(action, params || {}, effectiveTimeout);
    if (result.status === 'error') {
      return res.status(500).json({ success: false, error: result.error });
    }
    return res.json({ success: true, action, data: result.data });
  } catch (err) {
    const status = err.message.includes('not connected') ? 503 : 500;
    return res.status(status).json({ success: false, error: err.message });
  }
});

app.post('/batch', async (req, res) => {
  const { steps, timeoutMs } = req.body;
  if (!Array.isArray(steps)) {
    return res.status(400).json({ error: 'steps must be an array of actions' });
  }

  const effectiveTimeout = timeoutMs || 180000;

  try {
    const result = await sendToFigma('BATCH_EXECUTE', { steps }, effectiveTimeout);
    return res.json({ success: true, data: result.data });
  } catch (err) {
    const status = err.message.includes('not connected') ? 503 : 500;
    return res.status(status).json({ success: false, error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 AGY Figma Bridge Server running at:`);
  console.log(`   - HTTP REST API: http://localhost:${PORT}`);
  console.log(`   - WebSocket:     ws://localhost:${PORT}`);
  console.log(`   - Health Check:  http://localhost:${PORT}/health`);
  console.log(`====================================================`);
});

export { server, sendToFigma, app };
