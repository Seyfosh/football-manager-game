interface NavBarProps {
  currentScreen: string
  playerTeam: string
  onGoLeague: () => void
  onGoCL: () => void
  onGoSquad: () => void
  onGoTransfer: () => void
}

function NavBar({ currentScreen, playerTeam, onGoLeague, onGoCL, onGoSquad, onGoTransfer }: NavBarProps) {
  const navItems = [
    { id: 'league', label: '🏆 League', onClick: onGoLeague },
    { id: 'cl', label: '⭐ Champions League', onClick: onGoCL },
    { id: 'squad', label: '👥 Squad', onClick: onGoSquad },
    { id: 'transfer', label: '💰 Transfers', onClick: onGoTransfer },
  ]

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-bold text-lg">⚽</span>
          <span className="text-white font-bold">{playerTeam}</span>
        </div>
        <div className="flex gap-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentScreen === item.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavBar