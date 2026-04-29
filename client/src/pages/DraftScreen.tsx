import { useState } from 'react'

const TEAMS = [
  { name: 'Manchester City', league: 'Premier League', ovr: 89, color: 'bg-blue-500' },
  { name: 'Arsenal', league: 'Premier League', ovr: 86, color: 'bg-red-500' },
  { name: 'Real Madrid', league: 'La Liga', ovr: 91, color: 'bg-yellow-500' },
  { name: 'Barcelona', league: 'La Liga', ovr: 87, color: 'bg-purple-500' },
  { name: 'Inter Milan', league: 'Serie A', ovr: 86, color: 'bg-blue-700' },
  { name: 'AC Milan', league: 'Serie A', ovr: 84, color: 'bg-red-700' },
  { name: 'Bayern Munich', league: 'Bundesliga', ovr: 88, color: 'bg-red-600' },
  { name: 'Borussia Dortmund', league: 'Bundesliga', ovr: 82, color: 'bg-yellow-400' },
  { name: 'PSG', league: 'Ligue 1', ovr: 87, color: 'bg-blue-900' },
  { name: 'Benfica', league: 'Primeira Liga', ovr: 80, color: 'bg-red-500' },
  { name: 'Porto', league: 'Primeira Liga', ovr: 81, color: 'bg-blue-600' },
  { name: 'PSV', league: 'Eredivisie', ovr: 82, color: 'bg-red-500' },
  { name: 'Feyenoord', league: 'Eredivisie', ovr: 79, color: 'bg-red-600' },
]

interface DraftScreenProps {
  players: string[]
  onDraftComplete: (selections: Record<string, string>) => void
}

function DraftScreen({ players, onDraftComplete }: DraftScreenProps) {
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [currentPickIndex, setCurrentPickIndex] = useState(0)

  const takenTeams = Object.values(selections)
  const currentPlayer = players[currentPickIndex]
  const isDraftComplete = currentPickIndex >= players.length

  const handlePick = (teamName: string) => {
    if (takenTeams.includes(teamName)) return

    const newSelections = { ...selections, [currentPlayer]: teamName }
    setSelections(newSelections)

    if (currentPickIndex + 1 >= players.length) {
      onDraftComplete(newSelections)
    } else {
      setCurrentPickIndex(currentPickIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-400 mb-2">⚽ Team Draft</h1>
        {!isDraftComplete ? (
          <p className="text-xl text-gray-300">
            <span className="text-yellow-400 font-bold">{currentPlayer}</span>'s turn to pick
          </p>
        ) : (
          <p className="text-xl text-green-400 font-bold">Draft Complete!</p>
        )}
      </div>

      {/* Draft Order */}
      <div className="flex justify-center gap-4 mb-8">
        {players.map((player, index) => (
          <div
            key={player}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              index === currentPickIndex
                ? 'bg-yellow-500 text-black'
                : index < currentPickIndex
                ? 'bg-green-700 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {player}
            {selections[player] && (
              <div className="text-xs mt-1 truncate max-w-24">{selections[player]}</div>
            )}
          </div>
        ))}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {TEAMS.map((team) => {
          const isTaken = takenTeams.includes(team.name)
          const takenBy = Object.entries(selections).find(([, t]) => t === team.name)?.[0]

          return (
            <button
              key={team.name}
              onClick={() => handlePick(team.name)}
              disabled={isTaken || isDraftComplete}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isTaken
                  ? 'border-gray-600 bg-gray-800 opacity-50 cursor-not-allowed'
                  : 'border-gray-600 bg-gray-800 hover:border-green-400 hover:bg-gray-700 cursor-pointer'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${team.color} mb-3`} />
              <div className="font-bold text-sm">{team.name}</div>
              <div className="text-xs text-gray-400 mb-2">{team.league}</div>
              <div className="text-xs">
                <span className="text-green-400 font-bold">OVR {team.ovr}</span>
              </div>
              {isTaken && (
                <div className="text-xs text-yellow-400 mt-1">Taken by {takenBy}</div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DraftScreen
