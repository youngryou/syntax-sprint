import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Auth from './pages/Auth.tsx'
import Arena from './pages/Arena.tsx'
import Profile from './pages/Profile.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Dashboard />} />
    <Route path="auth" element={<Auth />} />
    <Route path="arena" element={<Arena />} />
    <Route path="profile" element={<Profile />} />
  </Route>,
)
