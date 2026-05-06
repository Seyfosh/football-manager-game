export interface MatchTeam {
  name: string
  ovr: number
  attack: number
  midfield: number
  defense: number
  gkRating: number
  mentality: 'defensive' | 'balanced' | 'attacking'
}

export interface MatchEvent {
  minute: number
  type: 'goal' | 'yellow_card' | 'red_card' | 'injury' | 'chance_missed'
  team: 'home' | 'away'
  playerName: string
  description: string
}

export interface MatchStats {
  possession: number
  shots: number
  shotsOnTarget: number
  fouls: number
  yellowCards: number
  redCards: number
}

export interface MatchState {
  minute: number
  homeScore: number
  awayScore: number
  homeStats: MatchStats
  awayStats: MatchStats
}

const HOME_PLAYERS = ['Striker', 'Left Winger', 'Right Winger', 'Midfielder', 'Captain']
const AWAY_PLAYERS = ['Their Forward', 'Their Attacker', 'Their Playmaker', 'Their Winger', 'Their Midfielder']

function weightedRandom(probability: number): boolean {
  return Math.random() < probability
}

function randomPlayer(players: string[]): string {
  return players[Math.floor(Math.random() * players.length)]
}

export function simulateMinute(
  home: MatchTeam,
  away: MatchTeam,
  state: MatchState
): { events: MatchEvent[], updatedState: MatchState } {
  const events: MatchEvent[] = []
  const newState = { ...state }
  newState.homeStats = { ...state.homeStats }
  newState.awayStats = { ...state.awayStats }

  const homeBonus = 1.1
  const homeAttackStrength = (home.attack * homeBonus) / away.defense
  const awayAttackStrength = away.attack / (home.defense * homeBonus)

  // Home team chance
  if (weightedRandom(0.08 * homeAttackStrength)) {
    newState.homeStats.shots++
    if (weightedRandom(0.45)) {
      newState.homeStats.shotsOnTarget++
      const conversionRate = home.attack / (home.attack + away.gkRating)
      if (weightedRandom(conversionRate * 0.35)) {
        newState.homeScore++
        const scorer = randomPlayer(HOME_PLAYERS)
        events.push({
          minute: state.minute,
          type: 'goal',
          team: 'home',
          playerName: scorer,
          description: `⚽ GOAL! ${home.name} score! ${scorer} finds the net! ${newState.homeScore}-${newState.awayScore}`
        })
      }
    }
  }

  // Away team chance
  if (weightedRandom(0.08 * awayAttackStrength)) {
    newState.awayStats.shots++
    if (weightedRandom(0.45)) {
      newState.awayStats.shotsOnTarget++
      const conversionRate = away.attack / (away.attack + home.gkRating)
      if (weightedRandom(conversionRate * 0.35)) {
        newState.awayScore++
        const scorer = randomPlayer(AWAY_PLAYERS)
        events.push({
          minute: state.minute,
          type: 'goal',
          team: 'away',
          playerName: scorer,
          description: `⚽ GOAL! ${away.name} score! ${scorer} finds the net! ${newState.homeScore}-${newState.awayScore}`
        })
      }
    }
  }

  // Yellow card
  if (weightedRandom(0.025)) {
    const isHome = weightedRandom(0.5)
    const team = isHome ? home : away
    const stats = isHome ? newState.homeStats : newState.awayStats
    stats.yellowCards++
    stats.fouls++
    events.push({
      minute: state.minute,
      type: 'yellow_card',
      team: isHome ? 'home' : 'away',
      playerName: randomPlayer(isHome ? HOME_PLAYERS : AWAY_PLAYERS),
      description: `🟡 Yellow card for ${team.name}`
    })
  }

  // Red card
  if (weightedRandom(0.004)) {
    const isHome = weightedRandom(0.5)
    const team = isHome ? home : away
    const stats = isHome ? newState.homeStats : newState.awayStats
    stats.redCards++
    events.push({
      minute: state.minute,
      type: 'red_card',
      team: isHome ? 'home' : 'away',
      playerName: randomPlayer(isHome ? HOME_PLAYERS : AWAY_PLAYERS),
      description: `🔴 RED CARD! ${team.name} are down to 10 men!`
    })
  }

  // Injury
  if (weightedRandom(0.008)) {
    const isHome = weightedRandom(0.5)
    const team = isHome ? home : away
    events.push({
      minute: state.minute,
      type: 'injury',
      team: isHome ? 'home' : 'away',
      playerName: randomPlayer(isHome ? HOME_PLAYERS : AWAY_PLAYERS),
      description: `🚑 Injury concern for ${team.name} — substitution needed`
    })
  }

  return { events, updatedState: newState }
}