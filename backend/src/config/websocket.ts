import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { verifyToken } from '../utils/auth';
import type { WebSocket } from 'ws';
import type { Confession } from '../types';

export class WebSocketManager {
  private wss: WebSocketServer;
  private clients: Set<WebSocket> = new Set();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server });
    this.initialize();
  }

  private initialize() {
    this.wss.on('connection', async (ws, req) => {
      try {
        const token = req.url?.split('token=')[1];
        if (!token || !await verifyToken(token)) {
          ws.close();
          return;
        }

        this.clients.add(ws);

        ws.on('message', (data) => {
          try {
            const message = JSON.parse(data.toString());
            this.broadcast(message);
          } catch (error) {
            console.error('Error processing message:', error);
          }
        });

        ws.on('close', () => {
          this.clients.delete(ws);
        });
      } catch (error) {
        console.error('WebSocket connection error:', error);
        ws.close();
      }
    });
  }

  broadcast(confession: Confession) {
    const message = JSON.stringify(confession);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}