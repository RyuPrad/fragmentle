import { useState, useEffect } from 'react'
import { checkGuess, isWinningGuess } from '../lib/gameLogic'

const MAX_GUESSES = 6

export function useGame(puzzle) {
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState([])
  const [gameState, setGameState] = useState('playing') // 'playing' | 'won' | 'lost'

  const slotCount = puzzle?.morphemes.length || 3

  // Add morpheme to current guess
  function addMorpheme(morpheme) {
    if (currentGuess.length < slotCount) {
      setCurrentGuess([...currentGuess, morpheme])
    }
  }

  // Remove last morpheme from current guess
  function removeMorpheme() {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  // Clear current guess
  function clearGuess() {
    setCurrentGuess([])
  }

  // Submit guess
  function submitGuess() {
    if (currentGuess.length !== slotCount) return
    if (gameState !== 'playing') return

    const results = checkGuess(currentGuess, puzzle.morphemes)
    const newGuess = {
      morphemes: currentGuess,
      results: results
    }

    const newGuesses = [...guesses, newGuess]
    setGuesses(newGuesses)
    setCurrentGuess([])

    if (isWinningGuess(results)) {
      setGameState('won')
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameState('lost')
    }
  }

  return {
    guesses,
    currentGuess,
    gameState,
    slotCount,
    addMorpheme,
    removeMorpheme,
    clearGuess,
    submitGuess
  }
}