import { useState } from 'react'

interface LobbyScreenProps {
  onCreateGame: (name: string) => void
}

function LobbyScreen({ onCreateGame }: LobbyScreenProps) {
  const [playerName, setPlayerName] = useState('')
  const [gameCode, setGameCode] = useState('')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-green-400 mb-4">⚽ Football Manager</h1>
        <p className="text-xl text-gray-400">Multiplayer Season Challenge</p>
      </div>

      {/* Main Card */}
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        
        {/* Player Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onCreateGame(playerName)}
            disabled={!playerName.trim()}
          >
            🏆 Create New Game
          </button>

          <div className="flex gap-3">
            <input
              type="text"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              placeholder="Game code..."
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 rounded-lg transition-colors"
              onClick={() => alert(`Joining game ${gameCode}...`)}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-600 mt-8 text-sm">2–6 players • 60–90 minutes • Real football clubs</p>
    </div>
  )
}

export default LobbyScreen
