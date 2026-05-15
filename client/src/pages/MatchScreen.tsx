import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

interface MatchEvent {
  minute: number
  type: 'goal' | 'yellow_card' | 'red_card' | 'injury' | 'chance_missed'
  team: 'home' | 'away'
  playerName: string
  description: string
}

interface MatchStats {
  possession: number
  shots: number
  shotsOnTarget: number
  fouls: number
  yellowCards: number
  redCards: number
}

interface MatchResult {
  homeScore: number
  awayScore: number
  homeStats: MatchStats
  awayStats: MatchStats
}

interface MatchScreenProps {
  homeTeam: string
  awayTeam: string
  homeOvr: number
  awayOvr: number
  homePlayers: { name: string, position: string, ovr: number }[]
  awayPlayers: { name: string, position: string, ovr: number }[]
  onMatchComplete: (result: MatchResult) => void
}

function MatchScreen({ homeTeam, awayTeam, homeOvr, awayOvr, homePlayers, awayPlayers, onMatchComplete }: MatchScreenProps) {  const [socket, setSocket] = useState<Socket | null>(null)
  const [displayedEvents, setDisplayedEvents] = useState<MatchEvent[]>([])
  const [currentMinute, setCurrentMinute] = useState(0)
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [homeStats, setHomeStats] = useState<MatchStats | null>(null)
  const [awayStats, setAwayStats] = useState<MatchStats | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    newSocket.on('match_minute', (data) => {
      setCurrentMinute(data.minute)
      setHomeScore(data.homeScore)
      setAwayScore(data.awayScore)
      setHomeStats(data.homeStats)
      setAwayStats(data.awayStats)

      if (data.events && data.events.length > 0) {
        setDisplayedEvents(prev => [...prev, ...data.events])
      }
    })

    newSocket.on('match_complete', (data) => {
      setIsComplete(true)
      setIsSimulating(false)
      setMatchResult(data)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const startMatch = () => {
    if (!socket) return
    setIsSimulating(true)
    setDisplayedEvents([])
    setCurrentMinute(0)
    setHomeScore(0)
    setAwayScore(0)
    setIsComplete(false)

    socket.emit('start_match', {
      home: {
        name: homeTeam,
        ovr: homeOvr,
        attack: Math.round(homeOvr * 1.05),
        midfield: homeOvr,
        defense: Math.round(homeOvr * 0.95),
        gkRating: Math.round(homeOvr * 0.9),
        mentality: 'balanced',
        players: homePlayers
      },
      away: {
        name: awayTeam,
        ovr: awayOvr,
        attack: Math.round(awayOvr * 1.05),
        midfield: awayOvr,
        defense: Math.round(awayOvr * 0.95),
        gkRating: Math.round(awayOvr * 0.9),
        mentality: 'balanced',
        players: awayPlayers
      }
    })
  }

  const togglePause = () => {
    if (!socket) return
    if (isPaused) {
      socket.emit('resume_match')
      setIsPaused(false)
    } else {
      socket.emit('pause_match')
      setIsPaused(true)
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return '⚽'
      case 'yellow_card': return '🟡'
      case 'red_card': return '🔴'
      case 'injury': return '🚑'
      default: return '•'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Scoreboard */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6 text-center">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-400">
            {isComplete ? '⏱ Full Time' : isSimulating ? `${currentMinute}'` : 'Ready to Kick Off'}
          </div>
          {isSimulating && !isComplete && (
            <button
              onClick={togglePause}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-1 rounded-lg text-sm"
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
          )}
        </div>

        <div className="flex justify-around items-center">
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-green-400">{homeTeam}</div>
            <div className="text-gray-400 text-sm">OVR {homeOvr}</div>
          </div>
          <div className="text-6xl font-bold mx-8">
            <span className="text-white">{homeScore}</span>
            <span className="text-gray-500 mx-3">-</span>
            <span className="text-white">{awayScore}</span>
          </div>
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-blue-400">{awayTeam}</div>
            <div className="text-gray-400 text-sm">OVR {awayOvr}</div>
          </div>
        </div>

        {/* Progress Bar */}
        {isSimulating && (
          <div className="mt-4 bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(currentMinute / 90) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Stats */}
      {homeStats && awayStats && (
        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div className="text-green-400 font-bold">{homeStats.possession}%</div>
            <div className="text-gray-400">Possession</div>
            <div className="text-blue-400 font-bold">{awayStats.possession}%</div>

            <div className="text-green-400 font-bold">{homeStats.shots}</div>
            <div className="text-gray-400">Shots</div>
            <div className="text-blue-400 font-bold">{awayStats.shots}</div>

            <div className="text-green-400 font-bold">{homeStats.shotsOnTarget}</div>
            <div className="text-gray-400">On Target</div>
            <div className="text-blue-400 font-bold">{awayStats.shotsOnTarget}</div>

            <div className="text-green-400 font-bold">{homeStats.yellowCards}</div>
            <div className="text-gray-400">Yellow Cards</div>
            <div className="text-blue-400 font-bold">{awayStats.yellowCards}</div>
          </div>
        </div>
      )}

      {/* Match Events */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6 max-h-64 overflow-y-auto">
        <h3 className="text-sm font-bold text-gray-400 mb-3">MATCH EVENTS</h3>
        {displayedEvents.length === 0 && !isSimulating && (
          <p className="text-gray-500 text-center py-4">Press Kick Off to start the match!</p>
        )}
        {[...displayedEvents].reverse().map((event, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 py-2 border-b border-gray-700 ${
              event.type === 'goal' ? 'bg-green-900 bg-opacity-30 rounded px-2' : ''
            }`}
          >
            <span className="text-xs text-gray-500 w-8 shrink-0">{event.minute}'</span>
            <span>{getEventIcon(event.type)}</span>
            <span className="text-sm">{event.description}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {!isSimulating && !isComplete && (
          <button
            onClick={startMatch}
            className="bg-green-500 hover:bg-green-400 text-white font-bold px-12 py-4 rounded-xl text-xl transition-colors"
          >
            ⚽ Kick Off!
          </button>
        )}
        {isComplete && matchResult && (
          <button
            onClick={() => onMatchComplete(matchResult)}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-12 py-4 rounded-xl text-xl transition-colors"
          >
            Continue →
          </button>
        )}
      </div>
    </div>
  )
}

export default MatchScreen