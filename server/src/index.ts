import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Load player database
const playersData = JSON.parse(
  readFileSync(join(__dirname, 'data/players.json'), 'utf-8')
);

// REST endpoint to get all players
app.get('/api/players', (req, res) => {
  res.json(playersData);
});

// REST endpoint to get players by club
app.get('/api/players/club/:club', (req, res) => {
  const club = req.params.club;
  const players = playersData.players.filter(
    (p: any) => p.club === club
  );
  res.json(players);
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A player connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('A player disconnected:', socket.id);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

