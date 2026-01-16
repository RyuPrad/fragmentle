import { useDailyPuzzle} from './hooks/useDailyPuzzle';
import {useGame} from '../hooks/useGame';
import GameBoard from '../components/Game/GameBoard';
import MorphemePallete from '../components/Game/MorphemePallete';
import GameOverModal from '../components/Game/GameOverModal';

export default function Play() {
  const { puzzle, loading, error } = useDailyPuzzle();
  const game = useGame(puzzle);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Loading today's puzzle...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className='text-red-500'>Error loading puzzle. Please refresh.</div>
      </div>
    );
  }

  if (!puzzle) {
    return(
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">No puzzle available today.</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Puzzle Info */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-800">Daily Puzzle</h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US',{
            weekday: 'long',
            month: 'long',
            day:'numeric'
          })}
        </p>
      </div>

      {/* Slot Structure Hint */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: game.slotCount }).map((_, i) => (
          <div
            key={i}
            className="px-3 py-1 bg-gray-100 rounded text-xs text-gray-500 font-medium">
              {i === 0 && game.slotCount === 3 && 'prefix'}
              {i === 1 && game.slotCount === 3 && 'root'}
              {i === 2 && game.slotCount === 3 && 'suffix'}
              {game.slotCount !== 3 && `slot ${i + 1}`}
            </div>
        ))}
      </div>

      {/* Game Board */}
      <GameBoard 
        guesses={game.guesses}
        currentGuess={game.currentGuess}
        slotCount={game.slotCount}
        gameState={game.gameState}
      />

      {/* Current Guess Display */}
      {game.gameState === 'playing' && (
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: game.slotCount }).map((_, i) => (
            <div
              key={i}
              className={`w-24 h-12 border-2 rounded-lg flex items-center justify-center font-medium text-sm ${game.currentGuess[i] ? 'border-gray-400 bg-white text-gray-800' : "border-dashed border-gray-300 text-gray-400"}`}>
              {game.currentGuess[i]?.value || '?'}
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {game.gameState === 'playing' && (
        <div className="flex justify-center gap-3">
          <button
            onClick={game.clearGuess}
            disabled={game.currentGuess.length === 0}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition">
              Clear
          </button>
          <button
            onClick={game.removeMorpheme}
            disabled={game.currentGuess.length === 0}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Delete
          </button>
          <button
            onClick={game.submitGuess}
            disabled={game.currentGuess.length !== game.slotCount}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Submit
          </button>
        </div>
      )}

      {/* Morpheme Palette */}
      {game.gameState === 'playing' && (
        <MorphemePallete
          onSelect={game.addMorpheme}
          usedMorphemes={game.currentGuess}
        />
      )}

      {/* Game Over Modal */}
      {game.gameState !== 'playing' && (
        <GameOverModal
          won={game.gameState === 'won'}
          answer={puzzle.word}
          guesses={game.guesses}
          morphemes={puzzle.morphemes}
          />
      )}
    </div> 
  );
}