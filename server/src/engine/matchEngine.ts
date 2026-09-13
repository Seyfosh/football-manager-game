export interface MatchTeam {
  name: string
  ovr: number
  attack: number
  midfield: number
  defense: number
  gkRating: number
  mentality: 'defensive' | 'balanced' | 'attacking'
  players?: { name: string, position: string, ovr: number }[]
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
  xG: number
  passCompletion: number
  passesAttempted: number
  passesCompleted: number
  keyPasses: number
  crossAccuracy: number
  crossesAttempted: number
  crossesCompleted: number
  tackleWinRate: number
  tacklesAttempted: number
  tacklesWon: number
  interceptions: number
  dribbleSuccessRate: number
  dribblesAttempted: number
  dribblesCompleted: number
}

export interface MatchState {
  minute: number
  homeScore: number
  awayScore: number
  homeStats: MatchStats
  awayStats: MatchStats
}

const DEFAULT_HOME_PLAYERS = ['Striker', 'Left Winger', 'Right Winger', 'Midfielder', 'Captain']
const DEFAULT_AWAY_PLAYERS = ['Their Forward', 'Their Attacker', 'Their Playmaker', 'Their Winger', 'Their Midfielder']

function weightedRandom(probability: number): boolean {
  return Math.random() < probability
}

function randomPlayer(players: string[]): string {
  return players[Math.floor(Math.random() * players.length)]
}

function getAttacker(team: MatchTeam, defaults: string[]): string {
  if (team.players && team.players.length > 0) {
    const attackers = team.players.filter(p =>
      ['ST', 'LW', 'RW', 'CAM'].includes(p.position)
    )
    if (attackers.length > 0) {
      return attackers[Math.floor(Math.random() * attackers.length)].name
    }
    return team.players[Math.floor(Math.random() * team.players.length)].name
  }
  return defaults[Math.floor(Math.random() * defaults.length)]
}

function getAnyPlayer(team: MatchTeam, defaults: string[]): string {
  if (team.players && team.players.length > 0) {
    return team.players[Math.floor(Math.random() * team.players.length)].name
  }
  return defaults[Math.floor(Math.random() * defaults.length)]
}

export function createEmptyStats(possession: number): MatchStats {
  return {
    possession,
    shots: 0,
    shotsOnTarget: 0,
    fouls: 0,
    yellowCards: 0,
    redCards: 0,
    xG: 0,
    passCompletion: 0,
    passesAttempted: 0,
    passesCompleted: 0,
    keyPasses: 0,
    crossAccuracy: 0,
    crossesAttempted: 0,
    crossesCompleted: 0,
    tackleWinRate: 0,
    tacklesAttempted: 0,
    tacklesWon: 0,
    interceptions: 0,
    dribbleSuccessRate: 0,
    dribblesAttempted: 0,
    dribblesCompleted: 0,
  }
}

function updateDerivedStats(stats: MatchStats) {
  stats.passCompletion = stats.passesAttempted > 0
    ? Math.round((stats.passesCompleted / stats.passesAttempted) * 100)
    : 0
  stats.crossAccuracy = stats.crossesAttempted > 0
    ? Math.round((stats.crossesCompleted / stats.crossesAttempted) * 100)
    : 0
  stats.tackleWinRate = stats.tacklesAttempted > 0
    ? Math.round((stats.tacklesWon / stats.tacklesAttempted) * 100)
    : 0
  stats.dribbleSuccessRate = stats.dribblesAttempted > 0
    ? Math.round((stats.dribblesCompleted / stats.dribblesAttempted) * 100)
    : 0
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

    // Passing activity every minute (scaled by possession share so it stays consistent)
  const homePassAttempts = Math.round(4 + (state.homeStats.possession / 100) * 4)
  const homePassSuccess = Math.round(homePassAttempts * (0.78 + Math.random() * 0.15))
  newState.homeStats.passesAttempted += homePassAttempts
  newState.homeStats.passesCompleted += homePassSuccess

  const awayPassAttempts = Math.round(4 + (state.awayStats.possession / 100) * 4)
  const awayPassSuccess = Math.round(awayPassAttempts * (0.78 + Math.random() * 0.15))
  newState.awayStats.passesAttempted += awayPassAttempts
  newState.awayStats.passesCompleted += awayPassSuccess

  // Tackles and interceptions
  if (weightedRandom(0.3)) {
    const isHome = weightedRandom(0.5)
    const stats = isHome ? newState.homeStats : newState.awayStats
    stats.tacklesAttempted++
    if (weightedRandom(0.65)) stats.tacklesWon++
  }
  if (weightedRandom(0.15)) {
    const isHome = weightedRandom(0.5)
    const stats = isHome ? newState.homeStats : newState.awayStats
    stats.interceptions++
  }

  // Dribbles
  if (weightedRandom(0.2)) {
    const isHome = weightedRandom(0.5)
    const stats = isHome ? newState.homeStats : newState.awayStats
    stats.dribblesAttempted++
    if (weightedRandom(0.6)) stats.dribblesCompleted++
  }

  // Crosses
  if (weightedRandom(0.1)) {
    const isHome = weightedRandom(0.5)
    const stats = isHome ? newState.homeStats : newState.awayStats
    stats.crossesAttempted++
    if (weightedRandom(0.4)) stats.crossesCompleted++
  }

  // Home team chance
  if (weightedRandom(0.08 * homeAttackStrength)) {
    newState.homeStats.shots++
    const shotXG = Math.round((0.05 + Math.random() * 0.35) * 100) / 100
    newState.homeStats.xG = Math.round((newState.homeStats.xG + shotXG) * 100) / 100
    if (weightedRandom(0.3)) newState.homeStats.keyPasses++
    if (weightedRandom(0.45)) {
      newState.homeStats.shotsOnTarget++
      const conversionRate = home.attack / (home.attack + away.gkRating)
      if (weightedRandom(conversionRate * 0.35)) {
        newState.homeScore++
        const scorer = getAttacker(home, DEFAULT_HOME_PLAYERS)
        events.push({
          minute: state.minute,
          type: 'goal',
          team: 'home',
          playerName: scorer,
          description: `⚽ GOAL! ${scorer} scores for ${home.name}! ${newState.homeScore}-${newState.awayScore}`
        })
      }
    }
  }

  // Away team chance
  if (weightedRandom(0.08 * awayAttackStrength)) {
    newState.awayStats.shots++
    const shotXG = Math.round((0.05 + Math.random() * 0.35) * 100) / 100
    newState.awayStats.xG = Math.round((newState.awayStats.xG + shotXG) * 100) / 100
    if (weightedRandom(0.3)) newState.awayStats.keyPasses++
    if (weightedRandom(0.45)) {
      newState.awayStats.shotsOnTarget++
      const conversionRate = away.attack / (away.attack + home.gkRating)
      if (weightedRandom(conversionRate * 0.35)) {
        newState.awayScore++
        const scorer = getAttacker(away, DEFAULT_AWAY_PLAYERS)
        events.push({
          minute: state.minute,
          type: 'goal',
          team: 'away',
          playerName: scorer,
          description: `⚽ GOAL! ${scorer} scores for ${away.name}! ${newState.homeScore}-${newState.awayScore}`
        })
      }
    }
  }

    // Regular fouls (not all lead to cards)
  if (weightedRandom(0.06)) {
    const isHome = weightedRandom(0.5)
    const stats = isHome ? newState.homeStats : newState.awayStats
    stats.fouls++
  }

  // Yellow card
  if (weightedRandom(0.025)) {
    const isHome = weightedRandom(0.5)
    const team = isHome ? home : away
    const stats = isHome ? newState.homeStats : newState.awayStats
    const player = getAnyPlayer(isHome ? home : away, isHome ? DEFAULT_HOME_PLAYERS : DEFAULT_AWAY_PLAYERS)
    stats.yellowCards++
    stats.fouls++
    events.push({
      minute: state.minute,
      type: 'yellow_card',
      team: isHome ? 'home' : 'away',
      playerName: player,
      description: `🟡 Yellow card for ${player} (${team.name})`
    })
  }

  // Red card
  if (weightedRandom(0.004)) {
    const isHome = weightedRandom(0.5)
    const team = isHome ? home : away
    const stats = isHome ? newState.homeStats : newState.awayStats
    const player = getAnyPlayer(isHome ? home : away, isHome ? DEFAULT_HOME_PLAYERS : DEFAULT_AWAY_PLAYERS)
    stats.redCards++
    events.push({
      minute: state.minute,
      type: 'red_card',
      team: isHome ? 'home' : 'away',
      playerName: player,
      description: `🔴 RED CARD! ${player} is sent off! ${team.name} down to 10 men!`
    })
  }

  // Injury
  if (weightedRandom(0.008)) {
    const isHome = weightedRandom(0.5)
    const team = isHome ? home : away
    const player = getAnyPlayer(isHome ? home : away, isHome ? DEFAULT_HOME_PLAYERS : DEFAULT_AWAY_PLAYERS)
    events.push({
      minute: state.minute,
      type: 'injury',
      team: isHome ? 'home' : 'away',
      playerName: player,
      description: `🚑 ${player} is injured and needs to come off for ${team.name}`
    })
  }

  updateDerivedStats(newState.homeStats)
  updateDerivedStats(newState.awayStats)

  return { events, updatedState: newState }
}
