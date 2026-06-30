import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabase } from '../utils/supabase'

export default function Auth() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
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

        <form onSubmit={handleLogin}>
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
              required
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
              required
            />
          </div>

          {message && <p className="text-muted">{message}</p>}

          <div className="card-actions--col">
            <button type="submit" className="btn btn--blue">
              LOGIN
            </button>

            <Link to="/register" className="text-link text--right">
              CREATE ACCOUNT
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
