import { useState } from 'react'
import LobbyScreen from './pages/LobbyScreen'
import DraftScreen from './pages/DraftScreen'
import SquadScreen from './pages/SquadScreen'
import TransferMarketScreen from './pages/TransferMarketScreen'
import MatchScreen from './pages/MatchScreen'
import LeagueScreen from './pages/LeagueScreen'

const TEAM_PLAYERS: Record<string, any[]> = {
  'Manchester City': [
    { id: 1, name: 'Erling Haaland', club: 'Manchester City', position: 'ST', age: 24, ovr: 91, pace: 97, shooting: 97, passing: 65, dribbling: 80, defending: 45, physical: 88, fitness: 95, morale: 'High', status: 'Healthy' },
    { id: 2, name: 'Kevin De Bruyne', club: 'Manchester City', position: 'CM', age: 33, ovr: 91, pace: 76, shooting: 86, passing: 97, dribbling: 88, defending: 64, physical: 78, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 3, name: 'Rodri', club: 'Manchester City', position: 'CDM', age: 28, ovr: 91, pace: 72, shooting: 72, passing: 89, dribbling: 82, defending: 89, physical: 85, fitness: 92, morale: 'Very High', status: 'Healthy' },
    { id: 4, name: 'Phil Foden', club: 'Manchester City', position: 'CAM', age: 24, ovr: 88, pace: 83, shooting: 83, passing: 86, dribbling: 91, defending: 60, physical: 71, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 5, name: 'Ruben Dias', club: 'Manchester City', position: 'CB', age: 27, ovr: 89, pace: 76, shooting: 45, passing: 75, dribbling: 65, defending: 91, physical: 86, fitness: 94, morale: 'High', status: 'Healthy' },
    { id: 6, name: 'Ederson', club: 'Manchester City', position: 'GK', age: 31, ovr: 89, pace: 55, shooting: 30, passing: 70, dribbling: 40, defending: 88, physical: 75, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 66, name: 'Bernardo Silva', club: 'Manchester City', position: 'CM', age: 29, ovr: 88, pace: 80, shooting: 80, passing: 88, dribbling: 90, defending: 68, physical: 70, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 101, name: 'Kyle Walker', club: 'Manchester City', position: 'RB', age: 34, ovr: 82, pace: 90, shooting: 58, passing: 72, dribbling: 74, defending: 82, physical: 80, fitness: 85, morale: 'Medium', status: 'Healthy' },
    { id: 102, name: 'Josko Gvardiol', club: 'Manchester City', position: 'LB', age: 22, ovr: 84, pace: 82, shooting: 52, passing: 72, dribbling: 68, defending: 84, physical: 82, fitness: 93, morale: 'High', status: 'Healthy' },
    { id: 103, name: 'Manuel Akanji', club: 'Manchester City', position: 'CB', age: 29, ovr: 83, pace: 78, shooting: 44, passing: 70, dribbling: 62, defending: 85, physical: 82, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 104, name: 'Jeremy Doku', club: 'Manchester City', position: 'LW', age: 22, ovr: 82, pace: 96, shooting: 74, passing: 72, dribbling: 88, defending: 34, physical: 64, fitness: 88, morale: 'High', status: 'Healthy' },
  ],
  'Arsenal': [
    { id: 7, name: 'Bukayo Saka', club: 'Arsenal', position: 'RW', age: 22, ovr: 88, pace: 90, shooting: 82, passing: 85, dribbling: 88, defending: 70, physical: 72, fitness: 93, morale: 'Very High', status: 'Healthy' },
    { id: 8, name: 'Martin Odegaard', club: 'Arsenal', position: 'CAM', age: 25, ovr: 88, pace: 78, shooting: 81, passing: 91, dribbling: 88, defending: 72, physical: 68, fitness: 91, morale: 'Very High', status: 'Healthy' },
    { id: 9, name: 'Declan Rice', club: 'Arsenal', position: 'CDM', age: 25, ovr: 87, pace: 75, shooting: 72, passing: 82, dribbling: 78, defending: 88, physical: 86, fitness: 94, morale: 'High', status: 'Healthy' },
    { id: 10, name: 'Gabriel Magalhaes', club: 'Arsenal', position: 'CB', age: 26, ovr: 86, pace: 74, shooting: 50, passing: 68, dribbling: 58, defending: 88, physical: 85, fitness: 92, morale: 'High', status: 'Healthy' },
    { id: 11, name: 'David Raya', club: 'Arsenal', position: 'GK', age: 29, ovr: 85, pace: 50, shooting: 25, passing: 72, dribbling: 35, defending: 85, physical: 70, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 65, name: 'Ben White', club: 'Arsenal', position: 'RB', age: 27, ovr: 83, pace: 80, shooting: 58, passing: 76, dribbling: 72, defending: 84, physical: 76, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 105, name: 'Gabriel Martinelli', club: 'Arsenal', position: 'LW', age: 23, ovr: 84, pace: 92, shooting: 78, passing: 72, dribbling: 84, defending: 52, physical: 72, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 106, name: 'Thomas Partey', club: 'Arsenal', position: 'CDM', age: 31, ovr: 83, pace: 72, shooting: 68, passing: 78, dribbling: 74, defending: 84, physical: 84, fitness: 78, morale: 'Medium', status: 'Healthy' },
    { id: 107, name: 'Jurrien Timber', club: 'Arsenal', position: 'LB', age: 23, ovr: 82, pace: 80, shooting: 52, passing: 74, dribbling: 72, defending: 82, physical: 74, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 108, name: 'Kai Havertz', club: 'Arsenal', position: 'ST', age: 25, ovr: 83, pace: 78, shooting: 80, passing: 78, dribbling: 80, defending: 58, physical: 76, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 109, name: 'William Saliba', club: 'Arsenal', position: 'CB', age: 23, ovr: 86, pace: 80, shooting: 44, passing: 72, dribbling: 62, defending: 88, physical: 82, fitness: 94, morale: 'Very High', status: 'Healthy' },
  ],
  'Real Madrid': [
    { id: 12, name: 'Vinicius Jr', club: 'Real Madrid', position: 'LW', age: 24, ovr: 92, pace: 97, shooting: 86, passing: 78, dribbling: 95, defending: 32, physical: 73, fitness: 94, morale: 'Very High', status: 'Healthy' },
    { id: 13, name: 'Jude Bellingham', club: 'Real Madrid', position: 'CAM', age: 21, ovr: 90, pace: 83, shooting: 85, passing: 86, dribbling: 88, defending: 76, physical: 82, fitness: 92, morale: 'Very High', status: 'Healthy' },
    { id: 14, name: 'Kylian Mbappe', club: 'Real Madrid', position: 'ST', age: 26, ovr: 93, pace: 99, shooting: 93, passing: 80, dribbling: 92, defending: 36, physical: 78, fitness: 95, morale: 'High', status: 'Healthy' },
    { id: 15, name: 'Toni Kroos', club: 'Real Madrid', position: 'CM', age: 34, ovr: 88, pace: 62, shooting: 78, passing: 95, dribbling: 82, defending: 72, physical: 72, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 16, name: 'Antonio Rudiger', club: 'Real Madrid', position: 'CB', age: 31, ovr: 85, pace: 82, shooting: 48, passing: 68, dribbling: 58, defending: 88, physical: 90, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 17, name: 'Thibaut Courtois', club: 'Real Madrid', position: 'GK', age: 32, ovr: 91, pace: 52, shooting: 25, passing: 72, dribbling: 35, defending: 91, physical: 78, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 67, name: 'Federico Valverde', club: 'Real Madrid', position: 'CM', age: 26, ovr: 88, pace: 86, shooting: 80, passing: 84, dribbling: 82, defending: 78, physical: 82, fitness: 93, morale: 'High', status: 'Healthy' },
    { id: 110, name: 'Dani Carvajal', club: 'Real Madrid', position: 'RB', age: 32, ovr: 85, pace: 78, shooting: 60, passing: 78, dribbling: 76, defending: 86, physical: 76, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 111, name: 'Ferland Mendy', club: 'Real Madrid', position: 'LB', age: 29, ovr: 83, pace: 86, shooting: 52, passing: 70, dribbling: 72, defending: 83, physical: 78, fitness: 89, morale: 'Medium', status: 'Healthy' },
    { id: 112, name: 'Eder Militao', club: 'Real Madrid', position: 'CB', age: 26, ovr: 85, pace: 80, shooting: 46, passing: 68, dribbling: 62, defending: 87, physical: 82, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 113, name: 'Rodrygo', club: 'Real Madrid', position: 'RW', age: 24, ovr: 84, pace: 88, shooting: 80, passing: 76, dribbling: 86, defending: 38, physical: 66, fitness: 91, morale: 'High', status: 'Healthy' },
  ],
}

const getDefaultSquad = (teamName: string) => [
  { id: 201, name: 'Player GK', club: teamName, position: 'GK', age: 28, ovr: 80, pace: 52, shooting: 25, passing: 68, dribbling: 35, defending: 82, physical: 74, fitness: 90, morale: 'High', status: 'Healthy' },
  { id: 202, name: 'Player RB', club: teamName, position: 'RB', age: 26, ovr: 78, pace: 78, shooting: 55, passing: 70, dribbling: 68, defending: 78, physical: 74, fitness: 88, morale: 'High', status: 'Healthy' },
  { id: 203, name: 'Player CB 1', club: teamName, position: 'CB', age: 27, ovr: 80, pace: 72, shooting: 44, passing: 66, dribbling: 58, defending: 82, physical: 80, fitness: 91, morale: 'High', status: 'Healthy' },
  { id: 204, name: 'Player CB 2', club: teamName, position: 'CB', age: 29, ovr: 79, pace: 70, shooting: 42, passing: 64, dribbling: 56, defending: 80, physical: 78, fitness: 89, morale: 'Medium', status: 'Healthy' },
  { id: 205, name: 'Player LB', club: teamName, position: 'LB', age: 25, ovr: 77, pace: 76, shooting: 52, passing: 68, dribbling: 66, defending: 76, physical: 72, fitness: 87, morale: 'High', status: 'Healthy' },
  { id: 206, name: 'Player CDM', club: teamName, position: 'CDM', age: 28, ovr: 79, pace: 70, shooting: 65, passing: 78, dribbling: 72, defending: 80, physical: 80, fitness: 90, morale: 'High', status: 'Healthy' },
  { id: 207, name: 'Player CM 1', club: teamName, position: 'CM', age: 26, ovr: 78, pace: 72, shooting: 70, passing: 80, dribbling: 76, defending: 70, physical: 72, fitness: 88, morale: 'High', status: 'Healthy' },
  { id: 208, name: 'Player CM 2', club: teamName, position: 'CM', age: 24, ovr: 76, pace: 74, shooting: 68, passing: 78, dribbling: 74, defending: 68, physical: 70, fitness: 86, morale: 'Medium', status: 'Healthy' },
  { id: 209, name: 'Player RW', club: teamName, position: 'RW', age: 23, ovr: 78, pace: 86, shooting: 74, passing: 70, dribbling: 82, defending: 38, physical: 66, fitness: 89, morale: 'High', status: 'Healthy' },
  { id: 210, name: 'Player LW', club: teamName, position: 'LW', age: 24, ovr: 77, pace: 84, shooting: 72, passing: 68, dribbling: 80, defending: 36, physical: 64, fitness: 87, morale: 'High', status: 'Healthy' },
  { id: 211, name: 'Player ST', club: teamName, position: 'ST', age: 27, ovr: 81, pace: 80, shooting: 82, passing: 66, dribbling: 76, defending: 40, physical: 78, fitness: 92, morale: 'High', status: 'Healthy' },
]

const TEAM_BUDGETS: Record<string, number> = {
  'Manchester City': 150000000,
  'Arsenal': 120000000,
  'Real Madrid': 200000000,
  'Barcelona': 130000000,
  'Inter Milan': 100000000,
  'AC Milan': 95000000,
  'Bayern Munich': 140000000,
  'Borussia Dortmund': 80000000,
  'PSG': 180000000,
  'Benfica': 60000000,
  'Porto': 65000000,
  'PSV': 70000000,
  'Feyenoord': 55000000,
}

const TEAM_OVRS: Record<string, number> = {
  'Manchester City': 89,
  'Arsenal': 86,
  'Real Madrid': 91,
  'Barcelona': 87,
  'Inter Milan': 86,
  'AC Milan': 84,
  'Bayern Munich': 88,
  'Borussia Dortmund': 82,
  'PSG': 87,
  'Benfica': 80,
  'Porto': 81,
  'PSV': 82,
  'Feyenoord': 79,
}

function App() {
  const [screen, setScreen] = useState<'lobby' | 'draft' | 'squad' | 'transfer' | 'league' | 'match'>('lobby')
  const [playerName, setPlayerName] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [mySquad, setMySquad] = useState<any[]>([])
  const [draftSelections, setDraftSelections] = useState<Record<string, string>>({})
  const [allTeams, setAllTeams] = useState<string[]>([])
  const [currentMatch, setCurrentMatch] = useState<{ home: string, away: string } | null>(null)
  const [leagueResults, setLeagueResults] = useState<any[]>([])

  const handleCreateGame = (name: string) => {
    setPlayerName(name)
    setScreen('draft')
  }

  const handleDraftComplete = (selections: Record<string, string>) => {
    setDraftSelections(selections)
    const myTeam = selections[playerName]
    setSelectedTeam(myTeam)
    const teams = Object.values(selections)
    setAllTeams(teams)
    const squad = TEAM_PLAYERS[myTeam] || getDefaultSquad(myTeam)
    setMySquad(squad)
    setScreen('squad')
  }

  const handleSquadConfirmed = () => {
    setScreen('transfer')
  }

  const handlePurchase = (player: any) => {
    const newPlayer = { ...player, fitness: 85, morale: 'High', status: 'Healthy' }
    setMySquad(prev => [...prev, newPlayer])
  }

  const handleTransferComplete = () => {
    setScreen('league')
  }

  const handlePlayNextMatch = () => {
    // Find next unplayed fixture
    const fixtures = generateFixtures(allTeams)
    const playedKeys = leagueResults.map(r => `${r.homeTeam}-${r.awayTeam}`)
    const nextFixture = fixtures.find(f => !playedKeys.includes(`${f.home}-${f.away}`))
    if (nextFixture) {
      setCurrentMatch(nextFixture)
      setScreen('match')
    }
  }

  const generateFixtures = (teams: string[]) => {
    const fixtures: { home: string, away: string }[] = []
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        fixtures.push({ home: teams[i], away: teams[j] })
        fixtures.push({ home: teams[j], away: teams[i] })
      }
    }
    return fixtures
  }

  const handleMatchComplete = (result: any) => {
    if (currentMatch) {
      const newResult = {
        homeTeam: currentMatch.home,
        awayTeam: currentMatch.away,
        homeScore: result.homeScore,
        awayScore: result.awayScore,
        played: true
      }
      setLeagueResults(prev => [...prev, newResult])
    }
    setScreen('league')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {screen === 'lobby' && (
        <LobbyScreen onCreateGame={handleCreateGame} />
      )}
      {screen === 'draft' && (
        <DraftScreen
          players={[playerName, 'Player 2', 'Player 3', 'Player 4']}
          onDraftComplete={handleDraftComplete}
        />
      )}
      {screen === 'squad' && (
        <SquadScreen
          teamName={selectedTeam}
          players={mySquad}
          onContinue={handleSquadConfirmed}
        />
      )}
      {screen === 'transfer' && (
        <TransferMarketScreen
          budget={TEAM_BUDGETS[selectedTeam] || 80000000}
          myTeam={selectedTeam}
          onPurchase={handlePurchase}
          onContinue={handleTransferComplete}
          timeLeft={600}
        />
      )}
      {screen === 'league' && (
        <LeagueScreen
          teams={allTeams}
          playerTeam={selectedTeam}
          results={leagueResults}
          onPlayNextMatch={handlePlayNextMatch}
          onViewComplete={() => alert('🏆 Season Complete! Thanks for playing!')}
        />
      )}
      {screen === 'match' && currentMatch && (
        <MatchScreen
          homeTeam={currentMatch.home}
          awayTeam={currentMatch.away}
          homeOvr={TEAM_OVRS[currentMatch.home] || 82}
          awayOvr={TEAM_OVRS[currentMatch.away] || 82}
          onMatchComplete={handleMatchComplete}
        />
      )}
    </div>
  )
}

export default App