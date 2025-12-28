import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useDailyPuzzle() {
  const [puzzle, setPuzzle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPuzzle() {
      try {
        const today = new Date().toISOString().split('T')[0]
        
        // First, check if a puzzle exists for today
        const { data, error: fetchError } = await supabase
          .from('daily_puzzles')
          .select(`
            *,
            word:words (
              id,
              word,
              difficulty,
              word_morphemes (
                position,
                morpheme:morphemes (
                  id,
                  value,
                  type,
                  meaning
                )
              )
            )
          `)
          .eq('puzzle_date', today)
          .maybeSingle()  // Use maybeSingle() instead of single()

        if (fetchError) {
          throw fetchError
        }

        if (!data) {
          // No puzzle for today
          setError({ message: 'No puzzle available for today. Check back tomorrow!' })
          setLoading(false)
          return
        }

        // Sort morphemes by position
        const morphemes = data.word.word_morphemes
          .sort((a, b) => a.position - b.position)
          .map(wm => wm.morpheme)

        setPuzzle({
          id: data.id,
          date: data.puzzle_date,
          word: data.word.word,
          wordId: data.word.id,
          morphemes: morphemes,
          difficulty: data.word.difficulty
        })
        
      } catch (err) {
        console.error('Error fetching puzzle:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPuzzle()
  }, [])

  return { puzzle, loading, error }
}