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
  price: number
}

interface TransferMarketProps {
  budget: number
  myTeam: string
  onPurchase: (player: Player, price: number) => void
  onContinue: () => void
  timeLeft: number
  isMidSeason?: boolean
}

const MARKET_PLAYERS: Player[] = [
  { id: 301, name: 'Victor Osimhen', club: 'Napoli', position: 'ST', age: 25, ovr: 88, pace: 92, shooting: 87, passing: 68, dribbling: 82, defending: 38, physical: 86, price: 95000000 },
  { id: 302, name: 'Mohamed Salah', club: 'Liverpool', position: 'RW', age: 32, ovr: 89, pace: 90, shooting: 88, passing: 80, dribbling: 88, defending: 52, physical: 74, price: 75000000 },
  { id: 303, name: 'Virgil van Dijk', club: 'Liverpool', position: 'CB', age: 33, ovr: 87, pace: 78, shooting: 52, passing: 78, dribbling: 65, defending: 90, physical: 88, price: 45000000 },
  { id: 304, name: 'Bruno Fernandes', club: 'Man United', position: 'CAM', age: 30, ovr: 86, pace: 74, shooting: 82, passing: 88, dribbling: 84, defending: 68, physical: 72, price: 65000000 },
  { id: 305, name: 'Alisson Becker', club: 'Liverpool', position: 'GK', age: 32, ovr: 89, pace: 54, shooting: 25, passing: 78, dribbling: 38, defending: 89, physical: 76, price: 55000000 },
  { id: 306, name: 'Achraf Hakimi', club: 'PSG', position: 'RB', age: 26, ovr: 86, pace: 93, shooting: 68, passing: 78, dribbling: 82, defending: 80, physical: 78, price: 70000000 },
  { id: 307, name: 'Khvicha Kvaratskhelia', club: 'Napoli', position: 'LW', age: 23, ovr: 87, pace: 90, shooting: 82, passing: 80, dribbling: 92, defending: 44, physical: 70, price: 85000000 },
  { id: 308, name: 'Florian Wirtz', club: 'Bayer Leverkusen', position: 'CAM', age: 21, ovr: 87, pace: 80, shooting: 80, passing: 86, dribbling: 90, defending: 58, physical: 66, price: 90000000 },
  { id: 309, name: 'Granit Xhaka', club: 'Bayer Leverkusen', position: 'CM', age: 31, ovr: 82, pace: 66, shooting: 72, passing: 84, dribbling: 74, defending: 78, physical: 78, price: 30000000 },
  { id: 310, name: 'Lois Openda', club: 'RB Leipzig', position: 'ST', age: 24, ovr: 83, pace: 90, shooting: 82, passing: 66, dribbling: 78, defending: 38, physical: 76, price: 55000000 },
  { id: 311, name: 'Donyell Malen', club: 'Borussia Dortmund', position: 'RW', age: 25, ovr: 81, pace: 92, shooting: 78, passing: 70, dribbling: 82, defending: 34, physical: 66, price: 40000000 },
  { id: 312, name: 'Youri Tielemans', club: 'Aston Villa', position: 'CM', age: 27, ovr: 81, pace: 70, shooting: 74, passing: 84, dribbling: 78, defending: 72, physical: 72, price: 35000000 },
  { id: 313, name: 'Alejandro Garnacho', club: 'Man United', position: 'LW', age: 20, ovr: 80, pace: 88, shooting: 74, passing: 70, dribbling: 84, defending: 36, physical: 64, price: 45000000 },
  { id: 314, name: 'Evan Ferguson', club: 'Brighton', position: 'ST', age: 20, ovr: 78, pace: 74, shooting: 78, passing: 62, dribbling: 70, defending: 36, physical: 78, price: 40000000 },
  { id: 315, name: 'Castello Lukeba', club: 'RB Leipzig', position: 'CB', age: 22, ovr: 80, pace: 82, shooting: 44, passing: 68, dribbling: 60, defending: 82, physical: 78, price: 38000000 },
]

const formatPrice = (price: number) => {
  if (price >= 1000000) return `€${(price / 1000000).toFixed(0)}M`
  return `€${price.toLocaleString()}`
}

const getOvrColor = (ovr: number) => {
  if (ovr >= 88) return 'text-green-400'
  if (ovr >= 83) return 'text-yellow-400'
  return 'text-orange-400'
}

function TransferMarketScreen({ budget, myTeam, onPurchase, onContinue, timeLeft, isMidSeason }: TransferMarketProps) {  const [searchQuery, setSearchQuery] = useState('')
  const [positionFilter, setPositionFilter] = useState('ALL')
  const [purchasedIds, setPurchasedIds] = useState<number[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [remainingBudget, setRemainingBudget] = useState(budget)

  const positions = ['ALL', 'GK', 'CB', 'RB', 'LB', 'CDM', 'CM', 'CAM', 'RW', 'LW', 'ST']

  const filteredPlayers = MARKET_PLAYERS.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.club.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPosition = positionFilter === 'ALL' || player.position === positionFilter
    return matchesSearch && matchesPosition
  })

  const handleBuy = (player: Player) => {
    if (player.price > remainingBudget) {
      alert(`Not enough budget! You need ${formatPrice(player.price)} but only have ${formatPrice(remainingBudget)}`)
      return
    }
    setPurchasedIds([...purchasedIds, player.id])
    setRemainingBudget(remainingBudget - player.price)
    onPurchase(player, player.price)
    setSelectedPlayer(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-400">Transfer Market</h1>
<p className="text-gray-400">{isMidSeason ? 'January Window' : 'Summer Window'} • {myTeam}</p>        </div>
        <div className="flex gap-6 items-center">
          <div className="text-center">
            <div className="text-xs text-gray-400">Budget</div>
            <div className="text-xl font-bold text-green-400">{formatPrice(remainingBudget)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">Time Left</div>
            <div className={`text-xl font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-yellow-400'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
          <button
            onClick={onContinue}
            className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Done ✅
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search players or clubs..."
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="flex gap-2 flex-wrap">
          {positions.map(pos => (
            <button
              key={pos}
              onClick={() => setPositionFilter(pos)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                positionFilter === pos
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Player List */}
        <div className="flex-1">
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-700 text-xs text-gray-400 font-medium">
              <div className="col-span-1">POS</div>
              <div className="col-span-3">NAME</div>
              <div className="col-span-2">CLUB</div>
              <div className="col-span-1">AGE</div>
              <div className="col-span-1">OVR</div>
              <div className="col-span-2">PRICE</div>
              <div className="col-span-2">ACTION</div>
            </div>

            {filteredPlayers.map((player) => {
              const isPurchased = purchasedIds.includes(player.id)
              const canAfford = player.price <= remainingBudget

              return (
                <div
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className={`grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                    selectedPlayer?.id === player.id ? 'bg-gray-700' : ''
                  } ${isPurchased ? 'opacity-50' : ''}`}
                >
                  <div className="col-span-1 text-xs font-bold text-gray-400">{player.position}</div>
                  <div className="col-span-3 text-sm font-medium">{player.name}</div>
                  <div className="col-span-2 text-xs text-gray-400">{player.club}</div>
                  <div className="col-span-1 text-sm text-gray-400">{player.age}</div>
                  <div className={`col-span-1 text-sm font-bold ${getOvrColor(player.ovr)}`}>{player.ovr}</div>
                  <div className="col-span-2 text-sm text-yellow-400 font-medium">{formatPrice(player.price)}</div>
                  <div className="col-span-2">
                    {isPurchased ? (
                      <span className="text-xs text-green-400 font-bold">✅ Signed</span>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleBuy(player) }}
                        disabled={!canAfford}
                        className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                          canAfford
                            ? 'bg-green-500 hover:bg-green-400 text-white'
                            : 'bg-gray-600 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Buy
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Player Detail Panel */}
        <div className="w-64">
          {selectedPlayer ? (
            <div className="bg-gray-800 rounded-xl p-4 sticky top-6">
              <h3 className="font-bold text-lg mb-1">{selectedPlayer.name}</h3>
              <p className="text-gray-400 text-sm mb-2">{selectedPlayer.position} • {selectedPlayer.club}</p>
              <p className="text-gray-400 text-sm mb-4">Age {selectedPlayer.age}</p>

              <div className={`text-3xl font-bold mb-4 ${getOvrColor(selectedPlayer.ovr)}`}>
                {selectedPlayer.ovr} OVR
              </div>

              <div className="space-y-2 mb-4">
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
                      <div className="h-2 rounded-full bg-green-500" style={{ width: `${attr.value}%` }} />
                    </div>
                    <span className="text-xs font-bold w-6">{attr.value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="text-2xl font-bold text-yellow-400 mb-3">{formatPrice(selectedPlayer.price)}</div>
                {!purchasedIds.includes(selectedPlayer.id) && (
                  <button
                    onClick={() => handleBuy(selectedPlayer)}
                    disabled={selectedPlayer.price > remainingBudget}
                    className={`w-full py-3 rounded-xl font-bold transition-colors ${
                      selectedPlayer.price <= remainingBudget
                        ? 'bg-green-500 hover:bg-green-400 text-white'
                        : 'bg-gray-600 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedPlayer.price <= remainingBudget ? '💰 Sign Player' : '❌ Too Expensive'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl p-4 text-center text-gray-500">
              <p>Click a player to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransferMarketScreen