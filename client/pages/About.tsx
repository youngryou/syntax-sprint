import SanImg from '../styles/image/san.jpeg'
import SqwImg from '../styles/image/sqw.jpeg'
import YoungImg from '../styles/image/profile_image-young.webp'
import DanielImg from '../styles/image/daniel.webp'
import ParkieImg from '../styles/image/parkie.webp'

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
    bio: "Hi, I'm Young, the Product Owner and Twin Dad Developer. Let’s be completely honest: the only reason I pitched this typing game project is for the hardcore early childhood coding education of my 2-year-old twin daughters. If they aren't hitting 100 CPM in JavaScript by age three, how will they survive in this economy?",
  },
  {
    id: 2,
    image: DanielImg,
    name: 'Daniel',
    role: 'Git Keeper',
    bio: 'Hey, I’m Daniel. When im not coding I like going for a ride on my motorbike, having friends over for a BBQ or working on projects. I had fun working on this project and working as part of a team. Cheers! ',
  },
  {
    id: 3,
    image: SanImg,
    name: 'Maneet',
    role: 'Agile Facilitator',
    bio: 'I like turtles.',
  },
  {
    id: 4,
    image: SqwImg,
    name: 'Tamahuia',
    role: 'Vibes Watcher',
    bio: 'sdjnvoje',
  },
  {
    id: 5,
    image: ParkieImg,
    name: 'Parkie',
    role: 'Git Keeper',
    bio: "Hi, I'm Parkie! I'm a learning developer. While this project has thrown quite a few challenges my way, I’m incredibly excited to use this app to practice by myself and sharpen my coding skills.",
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
