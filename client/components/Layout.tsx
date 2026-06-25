import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <header>
        <h1>
          {'{'}&quot;Syntax_Sprint&quot;{'}'}
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
