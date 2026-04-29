import { useState } from 'react'
import LobbyScreen from './pages/LobbyScreen'
import DraftScreen from './pages/DraftScreen'

function App() {
  const [screen, setScreen] = useState<'lobby' | 'draft'>('lobby')
  const [playerName, setPlayerName] = useState('')

  const handleCreateGame = (name: string) => {
    setPlayerName(name)
    setScreen('draft')
  }

  const handleDraftComplete = (selections: Record<string, string>) => {
    alert(`Draft complete! ${JSON.stringify(selections)}`)
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
    </div>
  )
}

export default App