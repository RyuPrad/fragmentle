import { useAuth } from '../context/AuthContext'
import { useStats } from '../hooks/useStats'
import { Link } from 'react-router-dom'

export default function Stats() {
  const { user } = useAuth()
  const { stats, loading } = useStats()

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Statistics</h1>
        <p className="text-gray-600 mb-6">Sign in to track your stats across devices.</p>
        <Link 
          to="/profile" 
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Sign In
        </Link>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading stats...</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Statistics</h1>

      {/* Main Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatBox value={stats?.games_played || 0} label="Played" />
        <StatBox 
          value={stats?.games_played ? Math.round((stats.games_won / stats.games_played) * 100) : 0} 
          label="Win %" 
        />
        <StatBox value={stats?.current_streak || 0} label="Current Streak" />
        <StatBox value={stats?.max_streak || 0} label="Max Streak" />
      </div>

      {/* Guess Distribution */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">Guess Distribution</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6].map(num => {
            const count = stats?.guess_distribution?.[num] || 0
            const maxCount = Math.max(...Object.values(stats?.guess_distribution || { 1: 0 }))
            const width = maxCount > 0 ? (count / maxCount) * 100 : 0
            
            return (
              <div key={num} className="flex items-center gap-2">
                <div className="w-4 text-sm text-gray-600">{num}</div>
                <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 flex items-center justify-end px-2 transition-all duration-500"
                    style={{ width: `${Math.max(width, count > 0 ? 10 : 0)}%` }}
                  >
                    {count > 0 && (
                      <span className="text-xs text-white font-medium">{count}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StatBox({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}