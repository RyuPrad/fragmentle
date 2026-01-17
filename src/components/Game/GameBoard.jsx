import GuessRow from './GuessRow'
import { MAX_GUESSES } from '../../lib/constants'

export default function GameBoard({ guesses, currentGuess, slotCount, gameState }) {
  // Create array of 6 rows (max guesses)
  const rows = []

  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      // Completed guess
      rows.push(
        <GuessRow 
          key={i}
          morphemes={guesses[i].morphemes}
          results={guesses[i].results}
          slotCount={slotCount}
          state="completed"
        />
      )
    } else if (i === guesses.length && gameState === 'playing') {
      // Current guess row
      rows.push(
        <GuessRow 
          key={i}
          morphemes={currentGuess}
          results={[]}
          slotCount={slotCount}
          state="current"
        />
      )
    } else {
      // Empty future row
      rows.push(
        <GuessRow 
          key={i}
          morphemes={[]}
          results={[]}
          slotCount={slotCount}
          state="empty"
        />
      )
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {rows}
    </div>
  )
}