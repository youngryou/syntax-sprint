import ManeetImg from '../styles/image/san.jpeg'
import YoungImg from '../styles/image/pat.jpeg'
import DanielImg from '../styles/image/pln.jpeg'
import ParkieImg from '../styles/image/pat.jpeg'
import TamaImg from '../styles/image/sqw.jpeg'

type TeamMember = {
  id: number
  image: string
  name: string
  role: string
  bio: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    image: YoungImg,
    name: 'Young',
    role: 'Product Owner',
    bio: "Hi, I'm Young!",
  },
  {
    id: 2,
    image: DanielImg,
    name: 'Daniel',
    role: 'Git Keeper',
    bio: "Hi, I'm Daniel!",
  },
  {
    id: 3,
    image: ManeetImg,
    name: 'Maneet',
    role: 'Agile Facilitator',
    bio: "Hi, I'm Maneet!",
  },
  {
    id: 4,
    image: TamaImg,
    name: 'Tamahuia',
    role: 'Vibes Watcher',
    bio: "Hi, I'm Tamahuia!",
  },
  {
    id: 5,
    image: ParkieImg,
    name: 'Parkie',
    role: 'Git Keeper',
    bio: "Hi, I'm Parkie!",
  },
]

export default function About() {
  return (
    <div className="page-grid">
      <div
        className="page-section text--center"
        style={{ gridColumn: '1 / -1', marginBottom: '0.5rem' }}
      >
        <h2
          className="page-subtitle"
          style={{ fontSize: '2rem', marginBottom: '0.25rem' }}
        >
          Meet Our Team
        </h2>
      </div>

      <div
        style={{
          gridColumn: '1 / -1',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'center',
        }}
      >
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="page-section"
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ marginBottom: '0.25rem' }}>
              <img
                src={member.image}
                className="profile-image"
                alt={`${member.name} avatar`}
              />
            </div>
            <h2
              className="page-subtitle"
              style={{ margin: '0 0 0.15rem 0', fontSize: '1.4rem' }}
            >
              {member.name || 'Unknown'}
            </h2>
            <div
              className="card-subtitle"
              style={{ marginBottom: '.1rem', color: 'var(--accent-green)' }}
            >
              {member.role}
            </div>

            <div
              style={{
                flexGrow: 1,
                marginBottom: '0.2rem',
                alignItems: 'center',
              }}
            >
              <p
                className="text-muted"
                style={{
                  fontSize: '0.85rem',
                  lineHeight: '1.25',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {member.bio}
              </p>
            </div>

            <div
              style={{
                marginBottom: '1.5rem',
                width: 100,
                textAlign: 'center',
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
