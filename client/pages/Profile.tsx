import { useNavigate } from 'react-router'
import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react'
import { getUserById, getUserStats, getUserScores } from '../utils/apiClient'

interface UserData {
  profile_image: string
  username: string
  joined_at: string
}

interface StatsData {
  best_cpm: number
  average_accuracy: number
}
interface ScoreRecord {
  id: number
  title?: string
  mode?: string
  date: string
  cpm: number
  accuracy: number

  playedAt?: string
  status?: 'win' | 'loss' | string
}

export default function Profile() {
  const navigate = useNavigate()

  const [user, setUser] = useState<UserData | null>(null)
  const [stats, setStats] = useState<StatsData | null>(null)
  const [records, setRecords] = useState<ScoreRecord[]>([])

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

        setUser(userData as unknown as UserData)
        setStats(statsData as unknown as StatsData)
        setRecords(scoresData as unknown as ScoreRecord[])
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
                user?.profile_image || 'https://ui-avatars.com/api/?name=User'
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
              {user?.joined_at
                ? new Date(user.joined_at).toLocaleDateString(undefined, {
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
            <div className="card-title --green">{stats?.best_cpm}</div>
          </div>
          <div className="text--center">
            <div className="card-subtitle">AVG ACCURACY</div>
            <div className="card-title --blue">{stats?.average_accuracy}%</div>
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
          ))
        )}
      </div>
    </div>
  )
}
