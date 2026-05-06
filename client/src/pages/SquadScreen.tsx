import { useState } from 'react'

interface Player {
  id: number
  name: string
  club: string
  position: string
  age: number
  ovr: number
  pace?: number
  shooting?: number
  passing?: number
  dribbling?: number
  defending?: number
  physical?: number
  fitness: number
  morale: string
  status: string
}

interface SquadScreenProps {
  teamName: string
  players: Player[]
  onContinue: () => void
}

const getMoraleColor = (morale: string) => {
  switch (morale) {
    case 'Very High': return 'text-green-400'
    case 'High': return 'text-green-300'
    case 'Medium': return 'text-yellow-400'
    case 'Low': return 'text-orange-400'
    case 'Very Low': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

const getOvrColor = (ovr: number) => {
  if (ovr >= 88) return 'text-green-400'
  if (ovr >= 83) return 'text-yellow-400'
  return 'text-orange-400'
}

const getFitnessColor = (fitness: number) => {
  if (fitness >= 80) return 'bg-green-500'
  if (fitness >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

function SquadScreen({ teamName, players, onContinue }: SquadScreenProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [starting11, setStarting11] = useState<number[]>(
    players.slice(0, 11).map(p => p.id)
  )

  const toggleStarting = (playerId: number) => {
    if (starting11.includes(playerId)) {
      setStarting11(starting11.filter(id => id !== playerId))
    } else {
      if (starting11.length < 11) {
        setStarting11([...starting11, playerId])
      } else {
        alert('You already have 11 players selected! Remove one first.')
      }
    }
  }

  const positions = ['GK', 'CB', 'RB', 'LB', 'CDM', 'CM', 'CAM', 'RW', 'LW', 'ST']

  const sortedPlayers = [...players].sort((a, b) => {
    return positions.indexOf(a.position) - positions.indexOf(b.position)
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-400">Squad Management</h1>
          <p className="text-gray-400">{teamName}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Starting 11</div>
          <div className={`text-2xl font-bold ${starting11.length === 11 ? 'text-green-400' : 'text-yellow-400'}`}>
            {starting11.length}/11
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Player List */}
        <div className="flex-1">
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-700 text-xs text-gray-400 font-medium">
              <div className="col-span-1">POS</div>
              <div className="col-span-4">NAME</div>
              <div className="col-span-1">AGE</div>
              <div className="col-span-1">OVR</div>
              <div className="col-span-3">FITNESS</div>
              <div className="col-span-1">MORALE</div>
              <div className="col-span-1">START</div>
            </div>

            {/* Player Rows */}
            {sortedPlayers.map((player) => (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className={`grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                  selectedPlayer?.id === player.id ? 'bg-gray-700' : ''
                } ${starting11.includes(player.id) ? 'border-l-2 border-l-green-500' : ''}`}
              >
                <div className="col-span-1 text-xs font-bold text-gray-400">{player.position}</div>
                <div className="col-span-4 text-sm font-medium">{player.name}</div>
                <div className="col-span-1 text-sm text-gray-400">{player.age}</div>
                <div className={`col-span-1 text-sm font-bold ${getOvrColor(player.ovr)}`}>{player.ovr}</div>
                <div className="col-span-3 flex items-center gap-2">
                  <div className="flex-1 bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getFitnessColor(player.fitness)}`}
                      style={{ width: `${player.fitness}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{player.fitness}%</span>
                </div>
                <div className={`col-span-1 text-xs ${getMoraleColor(player.morale)}`}>
                  {player.morale.split(' ')[0]}
                </div>
                <div className="col-span-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleStarting(player.id) }}
                    className={`w-6 h-6 rounded text-xs font-bold transition-colors ${
                      starting11.includes(player.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
                    }`}
                  >
                    {starting11.includes(player.id) ? '✓' : '+'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player Detail Panel */}
        <div className="w-64">
          {selectedPlayer ? (
            <div className="bg-gray-800 rounded-xl p-4 sticky top-6">
              <h3 className="font-bold text-lg mb-1">{selectedPlayer.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{selectedPlayer.position} • Age {selectedPlayer.age}</p>
              
              <div className={`text-3xl font-bold mb-4 ${getOvrColor(selectedPlayer.ovr)}`}>
                {selectedPlayer.ovr} OVR
              </div>

              {/* Attributes */}
              {selectedPlayer.pace && (
                <div className="space-y-2">
                  {[
                    { label: 'PAC', value: selectedPlayer.pace },
                    { label: 'SHO', value: selectedPlayer.shooting },
                    { label: 'PAS', value: selectedPlayer.passing },
                    { label: 'DRI', value: selectedPlayer.dribbling },
                    { label: 'DEF', value: selectedPlayer.defending },
                    { label: 'PHY', value: selectedPlayer.physical },
                  ].map(attr => (
                    <div key={attr.label} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-8">{attr.label}</span>
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${attr.value}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold w-6">{attr.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Fitness</span>
                  <span>{selectedPlayer.fitness}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Morale</span>
                  <span className={getMoraleColor(selectedPlayer.morale)}>{selectedPlayer.morale}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl p-4 text-center text-gray-500">
              <p>Click a player to see their details</p>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={onContinue}
            disabled={starting11.length !== 11}
            className="w-full mt-4 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
          >
            {starting11.length === 11 ? '✅ Confirm Squad' : `Select ${11 - starting11.length} more players`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SquadScreen