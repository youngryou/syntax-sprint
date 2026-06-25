export default function Dashboard() {
  const mockLeaderboard = [
    { id: 1, username: 'fast_coder', wpm: 120, accuracy: 99 },
    { id: 2, username: 'code_warrior', wpm: 105, accuracy: 98 },
    { id: 3, username: 'dev_student', wpm: 95, accuracy: 98 },
    { id: 4, username: 'react_master', wpm: 88, accuracy: 90 },
  ]

  return (
    <div>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div>
          <p>Select Game Mode</p>
          <button>{'>'}_ OFFLINE PRACTICE MODE</button>
          <button>⚡ REAL-TIME BATTLE (MATCHMAKING)</button>
        </div>
      </div>

      <div className="leaderboard">
        <h3>TOP PLAYERS</h3>
        <ul>
          {mockLeaderboard.map((player) => (
            <li key={player.id}>
              <p>#{player.id}</p> <p>{player.username}</p>{' '}
              <p>{player.wpm} WPM</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
