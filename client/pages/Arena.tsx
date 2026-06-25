import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import TypingField from '../components/TypingField.tsx'

export default function Arena() {
  const location = useLocation()
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState('')
  const [gameState, setGameState] = useState(
    location.state?.autoStart ? 'playing' : 'ready',
  )
  const [timer, setTimer] = useState(0)

  const mockSnippet = {
    id: 1,
    language: 'javascript',
    codeText: 'const sum = (a, b) => {\n  return a + b;\n};',
    logicHint: 'Arrow function that returns the sum of two parameters.',
  }

  const mockStats = {
    cpm: 80,
    accuracy: 100,
  }

  useEffect(() => {
    if (gameState === 'playing') {
      const timerId = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)

      return () => clearInterval(timerId)
    }
  }, [gameState])

  useEffect(() => {
    if (gameState === 'playing' && userInput === mockSnippet.codeText) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGameState('finished')
    }
  }, [userInput, gameState, mockSnippet.codeText])

  const timerFormat = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleStartGame = () => {
    setGameState('playing')
    setUserInput('')
    setTimer(0)
  }

  return (
    <div className="page-section">
      <div className="card card--flex">
        <div className="text--center">
          <div className="card-subtitle">CPM</div>
          <div className="card-title --green">{mockStats.cpm}</div>
        </div>
        <div className="text--center">
          <div className="card-subtitle">ACCURACY</div>
          <div className="card-title --blue">{mockStats.accuracy}%</div>
        </div>
        <div className="text--center">
          <div className="card-subtitle">TIME</div>
          <div className="card-title --orange">{timerFormat(timer)}</div>
        </div>
      </div>

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
        <>
          <TypingField
            snippetCode={mockSnippet.codeText}
            userInput={userInput}
            inputChange={setUserInput}
          />

          <div className="card card--hint">
            <strong>Code Explanation:</strong> {mockSnippet.logicHint}
          </div>
        </>
      )}
    </div>
  )
}
