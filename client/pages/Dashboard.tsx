import { useNavigate } from 'react-router'

export default function Dashboard() {
  const navigate = useNavigate()

  const mockLeaderboard = [
    { id: 1, rank: 1, username: 'fast_coder', cpm: 120, accuracy: 99 },
    { id: 2, rank: 2, username: 'code_warrior', cpm: 105, accuracy: 98 },
    { id: 3, rank: 3, username: 'dev_student (You)', cpm: 95, accuracy: 98 },
    { id: 4, rank: 4, username: 'react_master', cpm: 88, accuracy: 90 },
  ]

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
            <span className="--green">{'>'}_</span> OFFLINE PRACTICE MODE
          </button>

          <button
            className="btn btn--blue"
            onClick={() => navigate('/arena', { state: { autoStart: true } })}
          >
            ⚡ REAL-TIME BATTLE (MATCHMAKING)
          </button>
        </div>
      </div>

      <div className="page-section">
        <h3 className="page-subtitle">TOP PLAYERS</h3>

        <div className="list-container">
          {mockLeaderboard.map((player) => (
            <div key={player.id} className="list-item">
              <strong className="--green">#{player.rank}</strong>
              <span>{player.username}</span>
              <span className="--orange">{player.cpm} CPM</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
