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
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 })

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
        // Move ball toward goal on events
        const goalEvent = data.events.find((e: any) => e.type === 'goal')
        if (goalEvent) {
          setBallPosition({ x: goalEvent.team === 'home' ? 95 : 5, y: 50 })
          setTimeout(() => setBallPosition({ x: 50, y: 50 }), 1500)
        } else {
          const chanceEvent = data.events[0]
          const attackX = chanceEvent.team === 'home' ? 75 + Math.random() * 15 : 10 + Math.random() * 15
          const attackY = 30 + Math.random() * 40
          setBallPosition({ x: Math.round(attackX), y: Math.round(attackY) })
        }
      } else {
        // Random ball movement based on possession
        const possession = data.homeStats?.possession || 50
        const xVariance = (Math.random() - 0.5) * 25
        const newX = Math.max(5, Math.min(95, possession / 2 + 25 + xVariance))
        const newY = Math.max(10, Math.min(90, 50 + (Math.random() - 0.5) * 60))
        setBallPosition({ x: Math.round(newX), y: Math.round(newY) })
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
    {/* Pitch Graphic */}
      {isSimulating && (
        <div className="bg-green-700 rounded-xl mb-6 relative overflow-hidden border-2 border-green-600" style={{ height: '260px' }}>
          {/* Pitch stripes */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 opacity-10 bg-green-500"
              style={{ left: `${i * 12.5}%`, width: '6.25%' }} />
          ))}

          {/* Pitch markings */}
          <div className="absolute left-1/2 top-0 bottom-0 border-l-2 border-white opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 border-2 border-white rounded-full opacity-20" />
          </div>
          <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white rounded-full opacity-30" style={{ transform: 'translate(-50%, -50%)' }} />

          {/* Left penalty box */}
          <div className="absolute border-2 border-white opacity-20"
            style={{ left: 0, top: '25%', width: '14%', height: '50%', borderLeft: 'none' }} />
          {/* Right penalty box */}
          <div className="absolute border-2 border-white opacity-20"
            style={{ right: 0, top: '25%', width: '14%', height: '50%', borderRight: 'none' }} />

          {/* Left Goal */}
          <div className="absolute border-2 border-white bg-white bg-opacity-30 rounded-r"
            style={{ left: 0, top: '38%', width: '2%', height: '24%', borderLeft: 'none' }} />
          {/* Right Goal */}
          <div className="absolute border-2 border-white bg-white bg-opacity-30 rounded-l"
            style={{ right: 0, top: '38%', width: '2%', height: '24%', borderRight: 'none' }} />

          {/* Team names */}
          <div className="absolute left-3 top-2 text-xs text-white font-bold opacity-80">{homeTeam}</div>
          <div className="absolute right-3 top-2 text-xs text-white font-bold opacity-80 text-right">{awayTeam}</div>

          {/* HOME TEAM - 4-3-3 formation (green) */}
          {/* GK */}
          <div className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold z-10" style={{ left: '3%', top: '50%', transform: 'translateY(-50%)' }} title="GK" />
          {/* Defenders */}
          <div className="absolute w-4 h-4 bg-green-400 rounded-full border-2 border-white z-10" style={{ left: '18%', top: '15%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-green-400 rounded-full border-2 border-white z-10" style={{ left: '18%', top: '37%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-green-400 rounded-full border-2 border-white z-10" style={{ left: '18%', top: '63%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-green-400 rounded-full border-2 border-white z-10" style={{ left: '18%', top: '85%', transform: 'translateY(-50%)' }} />
          {/* Midfielders */}
          <div className="absolute w-4 h-4 bg-green-300 rounded-full border-2 border-white z-10" style={{ left: '33%', top: '25%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-green-300 rounded-full border-2 border-white z-10" style={{ left: '33%', top: '50%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-green-300 rounded-full border-2 border-white z-10" style={{ left: '33%', top: '75%', transform: 'translateY(-50%)' }} />
          {/* Forwards */}
          <div className="absolute w-4 h-4 bg-green-200 rounded-full border-2 border-white z-10" style={{ left: '44%', top: '20%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-green-200 rounded-full border-2 border-white z-10" style={{ left: '44%', top: '50%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-green-200 rounded-full border-2 border-white z-10" style={{ left: '44%', top: '80%', transform: 'translateY(-50%)' }} />

          {/* AWAY TEAM - 4-3-3 formation (blue) */}
          {/* GK */}
          <div className="absolute w-4 h-4 bg-orange-400 rounded-full border-2 border-white z-10" style={{ right: '3%', top: '50%', transform: 'translateY(-50%)' }} title="GK" />
          {/* Defenders */}
          <div className="absolute w-4 h-4 bg-blue-400 rounded-full border-2 border-white z-10" style={{ right: '18%', top: '15%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-blue-400 rounded-full border-2 border-white z-10" style={{ right: '18%', top: '37%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-blue-400 rounded-full border-2 border-white z-10" style={{ right: '18%', top: '63%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-blue-400 rounded-full border-2 border-white z-10" style={{ right: '18%', top: '85%', transform: 'translateY(-50%)' }} />
          {/* Midfielders */}
          <div className="absolute w-4 h-4 bg-blue-300 rounded-full border-2 border-white z-10" style={{ right: '33%', top: '25%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-blue-300 rounded-full border-2 border-white z-10" style={{ right: '33%', top: '50%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-blue-300 rounded-full border-2 border-white z-10" style={{ right: '33%', top: '75%', transform: 'translateY(-50%)' }} />
          {/* Forwards */}
          <div className="absolute w-4 h-4 bg-blue-200 rounded-full border-2 border-white z-10" style={{ right: '44%', top: '20%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-blue-200 rounded-full border-2 border-white z-10" style={{ right: '44%', top: '50%', transform: 'translateY(-50%)' }} />
          <div className="absolute w-4 h-4 bg-blue-200 rounded-full border-2 border-white z-10" style={{ right: '44%', top: '80%', transform: 'translateY(-50%)' }} />

          {/* Ball */}
          <div
            className="absolute w-5 h-5 bg-white rounded-full shadow-xl flex items-center justify-center text-xs z-20"
            style={{
              left: `${ballPosition.x}%`,
              top: `${ballPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.6s ease-in-out, top 0.6s ease-in-out'
            }}
          >
            ⚽
          </div>
        </div>
      )}

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
