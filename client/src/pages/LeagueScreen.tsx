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

interface MatchResult {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  played: boolean
}

interface LeagueScreenProps {
  teams: string[]
  playerTeam: string
  results: MatchResult[]
  onPlayNextMatch: () => void
  onViewComplete: () => void
  onViewSquad: () => void
}

function LeagueScreen({ teams, playerTeam, results, onPlayNextMatch, onViewComplete, onViewSquad }: LeagueScreenProps) {
  // Calculate standings from results
  const standings: TeamStats[] = teams.map(name => {
    const homeGames = results.filter(r => r.homeTeam === name)
    const awayGames = results.filter(r => r.awayTeam === name)

    let won = 0, drawn = 0, lost = 0, goalsFor = 0, goalsAgainst = 0

    homeGames.forEach(r => {
      goalsFor += r.homeScore
      goalsAgainst += r.awayScore
      if (r.homeScore > r.awayScore) won++
      else if (r.homeScore === r.awayScore) drawn++
      else lost++
    })

    awayGames.forEach(r => {
      goalsFor += r.awayScore
      goalsAgainst += r.homeScore
      if (r.awayScore > r.homeScore) won++
      else if (r.awayScore === r.homeScore) drawn++
      else lost++
    })

    return {
      name,
      played: homeGames.length + awayGames.length,
      won, drawn, lost,
      goalsFor, goalsAgainst,
      points: won * 3 + drawn
    }
  })

  const sortedStandings = [...standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    const gdA = a.goalsFor - a.goalsAgainst
    const gdB = b.goalsFor - b.goalsAgainst
    if (gdB !== gdA) return gdB - gdA
    return b.goalsFor - a.goalsFor
  })

  // Generate all fixtures
  const allFixtures: { home: string, away: string }[] = []
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      allFixtures.push({ home: teams[i], away: teams[j] })
      allFixtures.push({ home: teams[j], away: teams[i] })
    }
  }

  const playedKeys = results.map(r => `${r.homeTeam}-${r.awayTeam}`)
  const nextFixture = allFixtures.find(f => !playedKeys.includes(`${f.home}-${f.away}`))
  const isSeasonComplete = !nextFixture

  const getPositionColor = (index: number) => {
    if (index === 0) return 'text-yellow-400'
    if (index <= 3) return 'text-green-400'
    if (index === standings.length - 1) return 'text-red-400'
    return 'text-gray-400'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-400">🏆 League Table</h1>
          <p className="text-gray-400">Your team: <span className="text-white font-bold">{playerTeam}</span></p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onViewSquad}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            👥 My Squad
          </button>
          {!isSeasonComplete ? (
            <button
              onClick={onPlayNextMatch}
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              ⚽ Play Next Match
            </button>
          ) : (
            <button
              onClick={onViewComplete}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors"
            >
              🏆 Season Complete!
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        {/* League Table */}
        <div className="flex-1">
          <div className="bg-gray-800 rounded-xl overflow-hidden mb-6">
            <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-700 text-xs text-gray-400 font-medium">
              <div className="col-span-1">#</div>
              <div className="col-span-4">TEAM</div>
              <div className="col-span-1">P</div>
              <div className="col-span-1">W</div>
              <div className="col-span-1">D</div>
              <div className="col-span-1">L</div>
              <div className="col-span-2">GD</div>
              <div className="col-span-1">PTS</div>
            </div>

            {sortedStandings.map((team, index) => (
              <div
                key={team.name}
                className={`grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-700 ${
                  team.name === playerTeam ? 'bg-green-900 bg-opacity-20' : ''
                }`}
              >
                <div className={`col-span-1 font-bold ${getPositionColor(index)}`}>{index + 1}</div>
                <div className={`col-span-4 font-medium ${team.name === playerTeam ? 'text-green-400' : ''}`}>
                  {team.name}
                </div>
                <div className="col-span-1 text-gray-400">{team.played}</div>
                <div className="col-span-1 text-gray-400">{team.won}</div>
                <div className="col-span-1 text-gray-400">{team.drawn}</div>
                <div className="col-span-1 text-gray-400">{team.lost}</div>
                <div className="col-span-2 text-gray-400">
                  {team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}
                  {team.goalsFor - team.goalsAgainst}
                </div>
                <div className="col-span-1 font-bold text-white">{team.points}</div>
              </div>
            ))}
          </div>

          {/* Next Fixture */}
          {nextFixture && (
            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-bold text-gray-400 mb-3">NEXT FIXTURE</h3>
              <div className="flex justify-between items-center">
                <span className={`font-bold ${nextFixture.home === playerTeam ? 'text-green-400' : 'text-white'}`}>
                  {nextFixture.home}
                </span>
                <span className="text-gray-500 text-sm">vs</span>
                <span className={`font-bold ${nextFixture.away === playerTeam ? 'text-green-400' : 'text-white'}`}>
                  {nextFixture.away}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="w-64">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-400 mb-3">RESULTS</h3>
            {results.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">No matches played yet</p>
            )}
            {[...results].reverse().map((match, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 text-sm">
                <span className={`text-xs ${match.homeTeam === playerTeam ? 'text-green-400' : 'text-gray-400'}`}>
                  {match.homeTeam.split(' ')[0]}
                </span>
                <span className="font-bold mx-2">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className={`text-xs ${match.awayTeam === playerTeam ? 'text-green-400' : 'text-gray-400'}`}>
                  {match.awayTeam.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeagueScreen