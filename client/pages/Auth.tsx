import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../utils/supabase'

export default function Auth() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

  async function handleLogin() {
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    navigate('/profile')
  }

  async function handleSignUp() {
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    const token = data.session?.access_token

    if (!token) {
      setMessage('Check your email to confirm your account before logging in.')
      return
    }

    const res = await fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username || email.split('@')[0],
      }),
    })

    if (!res.ok) {
      setMessage('Account created, but profile setup failed.')
      return
    }

    navigate('/profile')
  }

  return (
    <div className="layout-container layout--half">
      <div className="card">
        <div className="text--center">
          <h2 className="page-title">Welcome Back</h2>
          <p className="card-subtitle text-muted">
            Sign in to save your typing scores.
          </p>
        </div>

        <div className="space" />

        <div className="input-group">
          <label htmlFor="username" className="card-subtitle">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="input-field"
            placeholder="syntax_sprinter"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email" className="card-subtitle">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="student@devacademy.co.nz"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="card-subtitle">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="**********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {message && <p className="text-muted">{message}</p>}

        <div className="card-actions--col">
          <button className="btn btn--blue" onClick={handleLogin}>
            LOGIN
          </button>
          <a
            className="text-link text--right"
            onClick={() => navigate('/register')}
          >
            CREATE ACCOUNT
          </a>
        </div>
      </div>
    </div>
  )
}
