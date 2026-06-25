export default function Profile() {
  const mockUser = {
    id: 1,
    username: 'dev_student',
    profileImage:
      'https://ui-avatars.com/api/?name=dev_student&background=0e639c&color=d4d4d4&bold=true',
    joinedAt: 'Jun 2026',
  }

  const mockStats = {
    bestCpm: 88,
    avgAccuracy: 78,
  }

  const mockRecords = [
    {
      id: 1,
      title: 'Arrow Functions',
      mode: 'Offline Practice',
      playedAt: 'Today',
      cpm: '95 CPM',
      status: 'win',
    },
    {
      id: 2,
      title: 'Array Map',
      competitor: 'fast_coder',
      mode: 'Real-time Battle',
      playedAt: 'Yesterday',
      cpm: '82 CPM',
      status: 'loss',
    },
  ]

  return (
    <div className="page-grid">
      <div className="page-section">
        <div className="profile-header">
          <div>
            <img
              src={mockUser.profileImage}
              alt="Profile avatar"
              className="profile-image"
            />
          </div>

          <div>
            <h2 className="page-subtitle">{mockUser.username}</h2>
            <div className="card-subtitle text-muted">
              Joined {mockUser.joinedAt}
            </div>
          </div>
        </div>

        <div className="card card--flex">
          <div className="text--center">
            <div className="card-subtitle">BEST CPM</div>
            <div className="card-title --green">{mockStats.bestCpm}</div>
          </div>
          <div className="text--center">
            <div className="card-subtitle">AVG ACCURACY</div>
            <div className="card-title --blue">{mockStats.avgAccuracy}%</div>
          </div>
        </div>

        <button className="btn btn--outline">LOG OUT</button>
      </div>

      <div className="page-section">
        <h3 className="page-subtitle">Records</h3>
        {mockRecords.map((record) => (
          <div key={record.id} className="list-item">
            <div className="list-item--col">
              <span>{record.title}</span>
              <span className="text-muted">
                {record.mode} - {record.playedAt}
              </span>
            </div>
            <div className={record.status === 'win' ? '--green' : '--orange'}>
              <strong>
                {record.status === 'win' ? record.cpm : `Loss ${record.cpm}`}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
