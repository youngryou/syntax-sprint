import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import { supabase } from '../utils/supabase'
import { getUserById, registerUser } from '../utils/apiClient'

export default function App() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        getUserById(session.user.id).then((user) => setUsername(user.username))
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const user = await getUserById(session.user.id)
        if (user.username) {
          setUsername(user.username)
        } else if (event === 'SIGNED_IN') {
          const meta = session.user.user_metadata
          await registerUser(meta.username, meta.profileImage)
          setUsername(meta.username)
        }
      } else {
        setUsername(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  return (
    <>
      <header>
        <div className="layout-container navbar">
          <NavLink to="/" className="nav-logo">
            {'{'}&quot;Syntax_Sprint&quot;{'}'}
          </NavLink>

          <nav className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/arena">Arena</NavLink>
            <NavLink to="/about">About</NavLink>
            {username ? (
              <>
                <NavLink to="/profile">Profile</NavLink>
                <button onClick={handleSignOut}>Logout</button>
                <span className="--green">{username}</span>
              </>
            ) : (
              <NavLink to="/auth">Login</NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="layout-container">
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
