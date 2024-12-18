import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import confessionRoutes from './routes/confessionRoutes';
import { WebSocketManager } from './config/websocket';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
new WebSocketManager(server);

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Routes
app.use('/api/confessions', confessionRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});