interface TeamStats {
  name: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

interface EndOfSeasonProps {
  standings: TeamStats[]
  playerTeam: string
  clWinner: string | null
  onPlayAgain: () => void
}

function EndOfSeasonScreen({ standings, playerTeam, clWinner, onPlayAgain }: EndOfSeasonProps) {  const sortedStandings = [...standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    const gdA = a.goalsFor - a.goalsAgainst
    const gdB = b.goalsFor - b.goalsAgainst
    if (gdB !== gdA) return gdB - gdA
    return b.goalsFor - a.goalsFor
  })

  const champion = sortedStandings[0]
  const playerPosition = sortedStandings.findIndex(t => t.name === playerTeam) + 1
  const topScorer = [...standings].sort((a, b) => b.goalsFor - a.goalsFor)[0]
  const bestDefense = [...standings].sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0]

  const getPositionEmoji = (pos: number) => {
    if (pos === 1) return '🥇'
    if (pos === 2) return '🥈'
    if (pos === 3) return '🥉'
    return `${pos}th`
  }

  const getPositionMessage = (pos: number, total: number) => {
    if (pos === 1) return "You are the Champion! 🎉"
    if (pos === 2) return "So close! Runners-up finish!"
    if (pos === 3) return "Solid season! Third place!"
    if (pos === total) return "Tough season. You'll do better next time!"
    return "Mid-table finish. Room to improve!"
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Champion Banner */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">Season Complete!</h1>
        <p className="text-2xl text-white font-bold">{champion.name} are Champions!</p>
        <p className="text-gray-400 mt-2">{champion.points} points • {champion.won}W {champion.drawn}D {champion.lost}L</p>
      </div>

      {/* Player Result */}
      <div className={`rounded-2xl p-6 mb-8 text-center ${
        playerPosition === 1 ? 'bg-yellow-900 bg-opacity-40 border border-yellow-500' :
        playerPosition <= 3 ? 'bg-green-900 bg-opacity-40 border border-green-500' :
        'bg-gray-800 border border-gray-600'
      }`}>
        <div className="text-4xl mb-2">{getPositionEmoji(playerPosition)}</div>
        <h2 className="text-2xl font-bold text-green-400 mb-1">{playerTeam}</h2>
        <p className="text-xl text-white mb-2">{getPositionMessage(playerPosition, standings.length)}</p>
        <div className="flex justify-center gap-8 text-sm text-gray-400">
          <span>{sortedStandings[playerPosition - 1]?.points} pts</span>
          <span>{sortedStandings[playerPosition - 1]?.won}W</span>
          <span>{sortedStandings[playerPosition - 1]?.drawn}D</span>
          <span>{sortedStandings[playerPosition - 1]?.lost}L</span>
          <span>{sortedStandings[playerPosition - 1]?.goalsFor} goals</span>
        </div>
      </div>

      {/* Awards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">⚽</div>
          <div className="text-xs text-gray-400 mb-1">TOP SCORER</div>
          <div className="font-bold text-green-400">{topScorer.name}</div>
          <div className="text-sm text-gray-400">{topScorer.goalsFor} goals</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🛡️</div>
          <div className="text-xs text-gray-400 mb-1">BEST DEFENSE</div>
          <div className="font-bold text-blue-400">{bestDefense.name}</div>
          <div className="text-sm text-gray-400">{bestDefense.goalsAgainst} conceded</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">👑</div>
          <div className="text-xs text-gray-400 mb-1">LEAGUE CHAMPION</div>
          <div className="font-bold text-yellow-400">{champion.name}</div>
          <div className="text-sm text-gray-400">{champion.points} points</div>
        </div>
        {clWinner && (
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-yellow-500">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-xs text-gray-400 mb-1">CL WINNER</div>
            <div className="font-bold text-yellow-400">{clWinner}</div>
            <div className="text-sm text-gray-400">Champions of Europe!</div>
          </div>
        )}
      </div>

      {/* Final Standings */}
      <div className="bg-gray-800 rounded-xl overflow-hidden mb-8">
        <div className="px-4 py-2 bg-gray-700 text-xs text-gray-400 font-medium">
          FINAL STANDINGS
        </div>
        {sortedStandings.map((team, index) => (
          <div
            key={team.name}
            className={`flex items-center gap-4 px-4 py-3 border-b border-gray-700 ${
              team.name === playerTeam ? 'bg-green-900 bg-opacity-20' : ''
            }`}
          >
            <div className="text-lg w-8 text-center">
              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
            </div>
            <div className={`flex-1 font-bold ${team.name === playerTeam ? 'text-green-400' : ''}`}>
              {team.name}
            </div>
            <div className="text-gray-400 text-sm">{team.played}P</div>
            <div className="text-gray-400 text-sm">{team.won}W</div>
            <div className="text-gray-400 text-sm">{team.drawn}D</div>
            <div className="text-gray-400 text-sm">{team.lost}L</div>
            <div className="text-gray-400 text-sm">
              {team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}{team.goalsFor - team.goalsAgainst}
            </div>
            <div className="font-bold text-white w-8 text-right">{team.points}</div>
          </div>
        ))}
      </div>

      {/* Play Again */}
      <div className="text-center">
        <button
          onClick={onPlayAgain}
          className="bg-green-500 hover:bg-green-400 text-white font-bold px-12 py-4 rounded-xl text-xl transition-colors"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  )
}

export default EndOfSeasonScreen