import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import TypingField from '../components/TypingField.tsx'
import { getRandomSnippet, postScore } from '../utils/apiClient.ts'
import { Snippet } from '../../models/snippet.ts'
import { getDifficultyMultiplier } from '../../models/difficulty.ts'
import { supabase } from '../utils/supabase.ts'

export default function Arena() {
  const location = useLocation()
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState('')
  const [totalTyped, setTotalTyped] = useState(0)

  const [gameState, setGameState] = useState(
    location.state?.autoStart ? 'playing' : 'ready',
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [timer, setTimer] = useState(0)

  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState(true)

  // const mockStats = {
  //   cpm: 80,
  //   accuracy: 100,
  // }

  const correctCharsCount = snippet
    ? userInput
        .split('')
        .filter((char, index) => char === snippet.codeText[index]).length
    : 0

  const progressPercent = snippet
    ? Math.min((correctCharsCount / snippet.codeText.length) * 100, 100)
    : 0

  const liveAccuracy =
    totalTyped > 0 ? Math.round((correctCharsCount / totalTyped) * 100) : 100

  const liveCpm = timer > 0 ? Math.round(correctCharsCount / (timer / 60)) : 0

  const livePoints = snippet
    ? Math.round(liveCpm * getDifficultyMultiplier(snippet.difficulty))
    : 0

  useEffect(() => {
    if (gameState === 'playing') {
      const timerId = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)

      return () => clearInterval(timerId)
    }
  }, [gameState])

  useEffect(() => {
    async function fetchSnippet() {
      try {
        const data = await getRandomSnippet()
        setSnippet(data)
      } catch (error) {
        console.error('Error fetching snippet:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSnippet()
  }, [])

  useEffect(() => {
    if (gameState === 'playing' && snippet && userInput === snippet.codeText) {
      setGameState('finished')
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsLoggedIn(true)
          postScore(liveCpm, liveAccuracy, livePoints, snippet.difficulty)
        }
      })
    }
  }, [userInput, gameState, snippet, liveCpm, liveAccuracy, livePoints])

  const timerFormat = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleStartGame = () => {
    setGameState('playing')
    setUserInput('')
    setTotalTyped(0)
    setTimer(0)
  }

  const handleTyping = (newInput: string) => {
    if (newInput.length > userInput.length) {
      setTotalTyped((prev) => prev + (newInput.length - userInput.length))
    }
    setUserInput(newInput)
  }

  if (loading) {
    return <div className="page-section text--center">Loading Arena...</div>
  }

  if (!snippet) {
    return (
      <div className="page-section text--center">Failed to load snippet.</div>
    )
  }

  return (
    <div className="page-section">
      <div className="card card--flex">
        <div className="text--center">
          <div className="card-subtitle">CPM</div>
          <div className="card-title --green">{liveCpm}</div>
        </div>
        <div className="text--center">
          <div className="card-subtitle">ACCURACY</div>
          <div className="card-title --blue">{liveAccuracy}%</div>
        </div>
        <div className="text--center">
          <div className="card-subtitle">POINTS</div>
          <div className="card-title --pink">{livePoints}</div>
        </div>
        <div className="text--center">
          <div className="card-subtitle">TIME</div>
          <div className="card-title --orange">{timerFormat(timer)}</div>
        </div>
      </div>

      {gameState === 'playing' && (
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${progressPercent}%`,
            }}
          />
        </div>
      )}

      {gameState === 'ready' ? (
        <div className="page-section card text--center">
          <h2 className="page-title">Ready to type?</h2>

          <div className="card-actions">
            <button className="btn btn--blue" onClick={handleStartGame}>
              START GAME
            </button>
          </div>
        </div>
      ) : gameState === 'finished' ? (
        <div className="card text--center">
          <h2 className="page-title --green">Match Finished!</h2>
          <p className="card-subtitle">Your Time: {timerFormat(timer)}</p>
          {!isLoggedIn && (
            <p className="text-muted">
              <a href="/auth" className="--green">Login</a> to save your score next time.
            </p>
          )}
          <div className="card-actions">
            <button className="btn btn--dark" onClick={() => navigate('/')}>
              BACK TO DASHBOARD
            </button>
            <button className="btn btn--blue" onClick={handleStartGame}>
              PLAY AGAIN
            </button>
          </div>
        </div>
      ) : (
        <TypingField
          snippetCode={snippet.codeText}
          userInput={userInput}
          inputChange={handleTyping}
        />
      )}

      <div className="card card--hint">
        <p>
          <strong>Language:</strong> {snippet.language.toUpperCase()}
        </p>
        <p>
          <strong>Explanation:</strong> {snippet.logicHint}
        </p>
        <p>
          <strong>Difficulty:</strong> {snippet.difficulty.toUpperCase()}
        </p>
      </div>
    </div>
  )
}
