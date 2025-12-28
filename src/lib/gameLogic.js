/**
 * Check a guess against the target morphemes
 * @param {Array} guessedMorphemes - Array of morpheme objects the user guessed
 * @param {Array} targetMorphemes - Array of morpheme objects that make up the answer
 * @returns {Array} Array of results: 'correct' | 'present' | 'absent'
 */
export function checkGuess(guessedMorphemes, targetMorphemes) {
  const targetValues = targetMorphemes.map(m => m.value.toLowerCase())
  
  return guessedMorphemes.map((guess, index) => {
    const guessValue = guess.value.toLowerCase()
    const targetValue = targetMorphemes[index]?.value.toLowerCase()

    if (guessValue === targetValue) {
      return 'correct'   // 🟩 Green - right morpheme, right position
    } else if (targetValues.includes(guessValue)) {
      return 'present'   // 🟨 Yellow - right morpheme, wrong position
    } else {
      return 'absent'    // ⬛ Gray - morpheme not in word
    }
  })
}

/**
 * Check if all results are correct (winning guess)
 * @param {Array} results - Array of result strings
 * @returns {boolean}
 */
export function isWinningGuess(results) {
  return results.length > 0 && results.every(r => r === 'correct')
}

/**
 * Generate shareable emoji grid
 * @param {Array} guesses - Array of guess objects with results
 * @param {number} puzzleNumber - The puzzle number (day)
 * @returns {string} Shareable text with emoji grid
 */
export function generateShareText(guesses, puzzleNumber) {
  const emojiMap = {
    correct: '🟩',
    present: '🟨',
    absent: '⬛'
  }

  const won = guesses.length > 0 && isWinningGuess(guesses[guesses.length - 1].results)
  const score = won ? guesses.length : 'X'

  const grid = guesses
    .map(guess => guess.results.map(r => emojiMap[r]).join(''))
    .join('\n')

  return `Fragmentle #${puzzleNumber} ${score}/6\n\n${grid}\n\nhttps://fragmentle.com`
}

/**
 * Get hint about morpheme types
 * @param {Array} targetMorphemes - The target morphemes
 * @returns {Object} Object with counts of each morpheme type
 */
export function getMorphemeTypeHint(targetMorphemes) {
  return {
    prefixes: targetMorphemes.filter(m => m.type === 'prefix').length,
    roots: targetMorphemes.filter(m => m.type === 'root').length,
    suffixes: targetMorphemes.filter(m => m.type === 'suffix').length,
  }
}

/**
 * Validate if a morpheme combination could form a real word
 * This is a simple check - in production you'd verify against a dictionary
 * @param {Array} morphemes - Array of morpheme objects
 * @returns {boolean}
 */
export function isValidCombination(morphemes) {
  if (morphemes.length === 0) return false
  
  // Basic validation: should have at least one root
  const hasRoot = morphemes.some(m => m.type === 'root')
  if (!hasRoot) return false

  // Prefixes should come before roots
  // Suffixes should come after roots
  let seenRoot = false
  let seenSuffix = false

  for (const morpheme of morphemes) {
    if (morpheme.type === 'prefix' && (seenRoot || seenSuffix)) {
      return false // Prefix after root or suffix
    }
    if (morpheme.type === 'root') {
      seenRoot = true
    }
    if (morpheme.type === 'suffix') {
      seenSuffix = true
    }
  }

  return true
}