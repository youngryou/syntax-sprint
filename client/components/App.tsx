import { NavLink, Outlet } from 'react-router'

export default function App() {
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
            {/* TODO: Logged in: Profile / Not logged in: Login */}
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/auth">Login</NavLink>
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
