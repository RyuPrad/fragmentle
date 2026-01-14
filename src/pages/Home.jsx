import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        🧩 Fragmentle
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Guess the word by its parts. A daily puzzle game about prefixes, roots, and suffixes.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/play"
          className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-md"
        >
          Play Now
        </Link>
        
        <Link
          to="/how-to-play"
          className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition border border-gray-200"
        >
          How to Play
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 text-center">
        <div className="p-4">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-sm text-gray-600">Learn word roots</div>
        </div>
        <div className="p-4">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-sm text-gray-600">Daily challenge</div>
        </div>
        <div className="p-4">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-sm text-gray-600">Track your streak</div>
        </div>
      </div>
    </div>
  )
}