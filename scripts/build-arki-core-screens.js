import fs from 'fs';
import path from 'path';
import http from 'http';
import { getImageBase64 } from './generators/image-cache.js';

function exec38451(operation, params = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ operation, params });
    const req = http.request({
      hostname: '127.0.0.1',
      port: 38451,
      path: '/exec',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ success: false, error: data });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// Glassmorphism & Indochine Porcelain Tokens
const TOKENS = {
  bgCanvas: '#FBF9F5',         // Lotus Porcelain (Warm Vietnamese White)
  bgGlass: '#FFFFFFF2',        // Frosted Glass container
  borderGlass: '#EAE6DF',      // Delicate 1px glass border
  textPrimary: '#0C0D0E',      // Obsidian Jet Black
  textSecondary: '#57534E',    // Warm Stone Grey
  textMuted: '#A8A29E',        // Soft Warm Caption
  accentGold: '#B45309',       // Pritzker Imperial Ochre
  accentEmerald: '#059669',    // Heritage Jade Green
  accentTeak: '#78350F',       // Indochine Teak Wood
  btnPrimary: '#0C0D0E',       // Obsidian Black CTA
  btnPrimaryText: '#FFFFFF',
  cornerRadiusScreen: 44,
  cornerRadiusCard: 20,
  cornerRadiusBtn: 14,
  screenWidth: 393,
  screenHeight: 852
};

export { exec38451, sleep, TOKENS, getImageBase64 };
