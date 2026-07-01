import { useNavigate } from 'react-router'
import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react'
import { getUserById, getUserStats, getUserScores } from '../utils/apiClient'
import { User } from '../../models/user'
import { Stat } from '../../models/stat'
import { Score } from '../../models/score'

export default function Profile() {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stat | null>(null)
  const [records, setRecords] = useState<Score[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getProfileAndData() {
      try {
        setLoading(true)
        setError(null)

        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session?.user?.id) {
          navigate('/auth')
          return
        }

        const userId = session.user.id

        const [userData, statsData, scoresData] = await Promise.all([
          getUserById(userId),
          getUserStats(userId),
          getUserScores(userId),
        ])

        setUser(userData)
        setStats(statsData)
        setRecords(scoresData)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        setError(message || 'unexpected error occured.')
      } finally {
        setLoading(false)
      }
    }
    getProfileAndData()
  }, [navigate])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  if (loading) {
    return (
      <div className="page-grid text--center" style={{ padding: '2rem' }}>
        Loading profile...
      </div>
    )
  }
  if (error) {
    return (
      <div className="page-grid text--center" style={{ padding: '2rem' }}>
        <p className="text--orange">Error: {error}</p>
        <button
          className="btn btn--outline"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="page-grid">
      <div className="page-section">
        <div className="profile-header">
          <div>
            <img
              src={
                user?.profileImage ||
                `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=0e639c&color=d4d4d4&bold=true`
              }
              alt="Profile avatar"
              className="profile-image"
            />
          </div>

          <div>
            <h2 className="page-subtitle">
              {user?.username || 'Unknown User'}
            </h2>
            <div className="card-subtitle text-muted">
              Joined{' '}
              {user?.joinedAt
                ? new Date(user.joinedAt).toLocaleDateString('en-NZ', {
                    month: 'short',
                    year: 'numeric',
                  })
                : ''}
            </div>
          </div>
        </div>

        <div className="card card--flex">
          <div className="text--center">
            <div className="card-subtitle">BEST CPM</div>
            <div className="card-title --green">{stats?.bestCpm || 0}</div>
          </div>
          <div className="text--center">
            <div className="card-subtitle">AVG ACCURACY</div>
            <div className="card-title --blue">
              {stats?.averageAccuracy || 0}%
            </div>
          </div>
          <div className="text--center">
            <div className="card-subtitle">BEST POINTS</div>
            <div className="card-title --pink">{stats?.bestPoints || 0}</div>
          </div>
        </div>

        <button className="btn btn--outline" onClick={handleLogout}>
          LOG OUT
        </button>
      </div>

      <div className="page-section">
        <h3 className="page-subtitle">Records</h3>
        {records.length === 0 ? (
          <div className="text-muted" style={{ padding: '1rem 0' }}>
            <p>no record of games. play your first game.</p>
          </div>
        ) : (
          records.map((record) => (
            <div key={record.scoreId} className="list-item">
              <em className="text-muted">
                {record.playedAt
                  ? new Date(record.playedAt).toLocaleDateString('en-NZ', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : ''}
              </em>

              {record.difficulty && (
                <span className="text-muted">
                  {record.difficulty.toUpperCase()}
                </span>
              )}

              <strong className="--green">{record.cpm} CPM</strong>

              <strong className="--blue">
                {record.accuracy.toFixed(0)}% ACC
              </strong>

              <strong className="text--right --pink">
                {record.points} PTS
              </strong>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
