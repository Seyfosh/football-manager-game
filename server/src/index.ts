import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';
import { simulateMinute, MatchTeam, MatchState } from './engine/matchEngine';

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

const playersData = JSON.parse(
  readFileSync(join(__dirname, 'data/players.json'), 'utf-8')
);

app.get('/api/players', (req, res) => {
  res.json(playersData);
});

app.get('/api/players/club/:club', (req, res) => {
  const club = req.params.club;
  const players = playersData.players.filter((p: any) => p.club === club);
  res.json(players);
});

io.on('connection', (socket) => {
  console.log('A player connected:', socket.id);

  let matchInterval: NodeJS.Timeout | null = null
  let isPaused = false

  socket.on('start_match', (data: { home: MatchTeam, away: MatchTeam }) => {
    const { home, away } = data

    const state: MatchState = {
      minute: 0,
      homeScore: 0,
      awayScore: 0,
      homeStats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, yellowCards: 0, redCards: 0 },
      awayStats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, yellowCards: 0, redCards: 0 },
    }

    const totalMid = home.midfield + away.midfield
    state.homeStats.possession = Math.round((home.midfield / totalMid) * 100)
    state.awayStats.possession = 100 - state.homeStats.possession

    socket.emit('match_started', { home, away, state })

    const tick = () => {
      if (isPaused) return

      state.minute++

      const { events, updatedState } = simulateMinute(home, away, state)

      state.homeScore = updatedState.homeScore
      state.awayScore = updatedState.awayScore
      state.homeStats = updatedState.homeStats
      state.awayStats = updatedState.awayStats

      socket.emit('match_minute', {
        minute: state.minute,
        homeScore: state.homeScore,
        awayScore: state.awayScore,
        events,
        homeStats: state.homeStats,
        awayStats: state.awayStats,
      })

      if (state.minute >= 90) {
        clearInterval(matchInterval!)
        socket.emit('match_complete', {
          homeScore: state.homeScore,
          awayScore: state.awayScore,
          homeStats: state.homeStats,
          awayStats: state.awayStats,
        })
      }
    }

    matchInterval = setInterval(tick, 1333)

    socket.on('pause_match', () => { isPaused = true })
    socket.on('resume_match', () => { isPaused = false })

    socket.on('set_speed_fast', () => {
      if (matchInterval) {
        clearInterval(matchInterval)
        matchInterval = setInterval(tick, 200)
      }
    })

    socket.on('set_speed_normal', () => {
      if (matchInterval) {
        clearInterval(matchInterval)
        matchInterval = setInterval(tick, 1333)
      }
    })

    socket.on('skip_to_result', () => {
      if (matchInterval) {
        clearInterval(matchInterval)
      }
      while (state.minute < 90) {
        state.minute++
        const { updatedState } = simulateMinute(home, away, state)
        state.homeScore = updatedState.homeScore
        state.awayScore = updatedState.awayScore
        state.homeStats = updatedState.homeStats
        state.awayStats = updatedState.awayStats
      }
      socket.emit('match_complete', {
        homeScore: state.homeScore,
        awayScore: state.awayScore,
        homeStats: state.homeStats,
        awayStats: state.awayStats,
      })
    })
  })

  socket.on('disconnect', () => {
    if (matchInterval) clearInterval(matchInterval)
    console.log('A player disconnected:', socket.id);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});