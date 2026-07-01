import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getLeaderboard } from '../utils/apiClient'
import { LeaderboardEntry } from '../../models/scores'

export default function Dashboard() {
  const navigate = useNavigate()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await getLeaderboard()
        setLeaderboard(data.slice(0, 10))
      } catch {
        setError('Could not load leaderboard.')
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <div className="page-grid">
      <div className="page-section">
        <h2 className="page-title">Dashboard</h2>

        <div className="card card--green">
          <p className="card-subtitle">Select Game Mode</p>

          <button
            className="btn btn--dark"
            onClick={() => navigate('/arena', { state: { autoStart: true } })}
          >
            <span className="--green">{'>'}_</span> START GAME
          </button>
        </div>
      </div>

      <div className="page-section">
        <h3 className="page-subtitle">TOP PLAYERS</h3>

        {error && <p className="text-muted">{error}</p>}

        <div className="list-container">
          {leaderboard.map((player) => (
            <div
              key={`${player.username}-${player.rank}`}
              className="list-item"
            >
              <strong className="--green">#{player.rank}</strong>
              <span>{player.username}</span>
              {player.difficulty && (
                <span className="text-muted">
                  {player.difficulty.toUpperCase()}
                </span>
              )}
              <span className="text-muted">{player.bestCpm} CPM</span>
              <span className="--orange">{player.points} PTS</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
