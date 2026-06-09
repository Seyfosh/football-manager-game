import { useState } from 'react'

interface CLTeam {
  name: string
  ovr: number
}

interface GroupStanding {
  name: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

interface CLMatch {
  home: string
  away: string
  homeScore?: number
  awayScore?: number
  played: boolean
  round: 'group' | 'r16' | 'qf' | 'sf' | 'final'
  group?: string
}

interface ChampionsLeagueScreenProps {
  teams: CLTeam[]
  playerTeam: string
  onPlayMatch: (home: string, away: string, round: string) => void
  onMatchResult: (home: string, away: string, homeScore: number, awayScore: number, round: string) => void
  matches: CLMatch[]
  onComplete: () => void
}

function ChampionsLeagueScreen({
  teams,
  playerTeam,
  onPlayMatch,
  matches,
  onComplete
}: ChampionsLeagueScreenProps) {
  const [activeTab, setActiveTab] = useState<'groups' | 'knockout'>('groups')

  // Get groups
  const groups = ['A', 'B', 'C', 'D']
  const groupMatches = matches.filter(m => m.round === 'group')
  const knockoutMatches = matches.filter(m => m.round !== 'group')

  const getGroupStandings = (group: string): GroupStanding[] => {
    const groupTeams = teams.filter(t => {
      const teamIndex = teams.indexOf(t)
      const groupIndex = groups.indexOf(group)
      return Math.floor(teamIndex / (teams.length / 4)) === groupIndex
    })

    return groupTeams.map(team => {
      const homeGames = groupMatches.filter(m => m.homeTeam === team.name && m.group === group && m.played)
      const awayGames = groupMatches.filter(m => m.awayTeam === team.name && m.group === group && m.played)

      let won = 0, drawn = 0, lost = 0, goalsFor = 0, goalsAgainst = 0

      homeGames.forEach((m: any) => {
        goalsFor += m.homeScore || 0
        goalsAgainst += m.awayScore || 0
        if ((m.homeScore || 0) > (m.awayScore || 0)) won++
        else if (m.homeScore === m.awayScore) drawn++
        else lost++
      })

      awayGames.forEach((m: any) => {
        goalsFor += m.awayScore || 0
        goalsAgainst += m.homeScore || 0
        if ((m.awayScore || 0) > (m.homeScore || 0)) won++
        else if (m.awayScore === m.homeScore) drawn++
        else lost++
      })

      return {
        name: team.name,
        played: homeGames.length + awayGames.length,
        won, drawn, lost, goalsFor, goalsAgainst,
        points: won * 3 + drawn
      }
    }).sort((a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst))
  }

  const nextMatch = matches.find(m => !m.played)
  const isComplete = !nextMatch

  const getRoundName = (round: string) => {
    switch (round) {
      case 'r16': return 'Round of 16'
      case 'qf': return 'Quarter Finals'
      case 'sf': return 'Semi Finals'
      case 'final': return 'Final'
      default: return 'Group Stage'
    }
  }

  const getMatchStyle = (match: CLMatch) => {
    if (!match.played) return 'border-gray-600'
    if (match.homeTeam === playerTeam || match.awayTeam === playerTeam) {
      if ((match.homeTeam === playerTeam && (match.homeScore || 0) > (match.awayScore || 0)) ||
          (match.awayTeam === playerTeam && (match.awayScore || 0) > (match.homeScore || 0))) {
        return 'border-green-500 bg-green-900 bg-opacity-20'
      }
      return 'border-red-500 bg-red-900 bg-opacity-20'
    }
    return 'border-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">🏆 Champions League</h1>
          <p className="text-gray-400">Your team: <span className="text-white font-bold">{playerTeam}</span></p>
        </div>
        <div className="flex gap-3">
          {nextMatch && (
            <button
              onClick={() => onPlayMatch(nextMatch.home, nextMatch.away, nextMatch.round)}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors"
            >
              ⚽ Play Next CL Match
            </button>
          )}
          {isComplete && (
            <button
              onClick={onComplete}
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Continue →
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === 'groups' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400'
          }`}
        >
          Group Stage
        </button>
        <button
          onClick={() => setActiveTab('knockout')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === 'knockout' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400'
          }`}
        >
          Knockout
        </button>
      </div>

      {activeTab === 'groups' && (
        <div className="grid grid-cols-2 gap-6">
          {groups.map(group => {
            const gTeams = teams.slice(
              groups.indexOf(group) * Math.ceil(teams.length / 4),
              (groups.indexOf(group) + 1) * Math.ceil(teams.length / 4)
            )
            const gMatches = groupMatches.filter(m => m.group === group)

            return (
              <div key={group} className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="bg-yellow-600 px-4 py-2 font-bold">Group {group}</div>

                {/* Standings */}
                <div className="p-3">
                  <div className="grid grid-cols-8 text-xs text-gray-400 mb-1 px-2">
                    <div className="col-span-3">Team</div>
                    <div className="text-center">P</div>
                    <div className="text-center">W</div>
                    <div className="text-center">D</div>
                    <div className="text-center">L</div>
                    <div className="text-center font-bold">Pts</div>
                  </div>
                  {gTeams.map((team, idx) => {
                    const played = gMatches.filter(m =>
                      (m.home === team.name || m.away === team.name) && m.played
                    )
                    let w = 0, d = 0, l = 0
                    played.forEach(m => {
                      const isHome = m.home === team.name
                      const ts = isHome ? (m.homeScore || 0) : (m.awayScore || 0)
                      const os = isHome ? (m.awayScore || 0) : (m.homeScore || 0)
                      if (ts > os) w++
                      else if (ts === os) d++
                      else l++
                    })
                    const pts = w * 3 + d

                    return (
                      <div
                        key={team.name}
                        className={`grid grid-cols-8 text-sm py-1 px-2 rounded ${
                          team.name === playerTeam ? 'text-yellow-400 font-bold' : ''
                        } ${idx < 2 ? 'border-l-2 border-green-500' : ''}`}
                      >
                        <div className="col-span-3 truncate">{team.name}</div>
                        <div className="text-center text-gray-400">{played.length}</div>
                        <div className="text-center text-gray-400">{w}</div>
                        <div className="text-center text-gray-400">{d}</div>
                        <div className="text-center text-gray-400">{l}</div>
                        <div className="text-center font-bold">{pts}</div>
                      </div>
                    )
                  })}
                </div>

                {/* Group Matches */}
                <div className="border-t border-gray-700 p-3">
                  {gMatches.map((match, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center py-1 px-2 rounded mb-1 border ${getMatchStyle(match)}`}
                    >
                      <span className={`text-xs ${match.home === playerTeam ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {match.home.split(' ')[0]}
                      </span>
                      <span className="text-xs font-bold mx-2">
                        {match.played ? `${match.homeScore} - ${match.awayScore}` : 'vs'}
                      </span>
                      <span className={`text-xs ${match.away === playerTeam ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {match.away.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'knockout' && (
        <div className="space-y-6">
          {['r16', 'qf', 'sf', 'final'].map(round => {
            const roundMatches = knockoutMatches.filter(m => m.round === round)
            if (roundMatches.length === 0) return null

            return (
              <div key={round} className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="bg-yellow-600 px-4 py-2 font-bold">{getRoundName(round)}</div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  {roundMatches.map((match, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center p-3 rounded-lg border ${getMatchStyle(match)}`}
                    >
                      <span className={`font-medium ${match.home === playerTeam ? 'text-yellow-400' : ''}`}>
                        {match.home}
                      </span>
                      <span className="font-bold mx-3">
                        {match.played ? `${match.homeScore} - ${match.awayScore}` : 'vs'}
                      </span>
                      <span className={`font-medium ${match.away === playerTeam ? 'text-yellow-400' : ''}`}>
                        {match.away}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {knockoutMatches.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <p className="text-xl mb-2">🏆</p>
              <p>Complete the group stage to unlock knockout rounds</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChampionsLeagueScreen