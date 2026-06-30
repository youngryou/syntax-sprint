import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../utils/supabase'
import { registerUser } from '../utils/apiClient'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

  const passwordLength = password.length >= 8
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    if (!passwordLength || !specialChar) {
      setMessage('Please meet all password requirements.')
      return
    }

    const avatarUrl = `https://ui-avatars.com/api/?name=${username}&background=0e639c&color=d4d4d4&bold=true`

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, avatarUrl } },
    })

    if (error) {
      setMessage(error.message)
      return
    }

    if (!data.session?.access_token) {
      setMessage('Check your email to confirm your account before logging in.')
      return
    }

    try {
      await registerUser(username, avatarUrl)
      navigate('/profile')
    } catch (err) {
      setMessage('Account created, but profile setup failed.')
    }
  }

  return (
    <div className="layout-container layout--half">
      <div className="card">
        <div className="text--center">
          <h2 className="page-title">Create Account</h2>
          <p className="card-subtitle text-muted">Join the Syntax Sprint.</p>
        </div>

        <div className="space" />

        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="reg-username" className="card-subtitle">
              Username
            </label>
            <input
              id="reg-username"
              type="text"
              className="input-field"
              // placeholder="e.g. syntax_sprinter"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-email" className="card-subtitle">
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              className="input-field"
              // placeholder="e.g. syntax_sprinter@syntax-sprinters.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-password" className="card-subtitle">
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              className="input-field"
              // placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <ul className="password-rules">
              <li className={passwordLength ? 'rule--valid' : 'rule--invalid'}>
                ✓ At least 8 characters
              </li>
              <li className={specialChar ? 'rule--valid' : 'rule--invalid'}>
                ✓ At least 1 special character
              </li>
            </ul>
          </div>

          <div className="input-group">
            <label htmlFor="reg-confirm" className="card-subtitle">
              Confirm Password
            </label>
            <input
              id="reg-confirm"
              type="password"
              className="input-field"
              // placeholder="**********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-muted">{message}</p>}

          <div className="card-actions--col" style={{ marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn--blue">
              SIGN UP
            </button>
            <a
              className="text-link text--right"
              onClick={() => navigate('/auth')}
            >
              ALREADY HAVE AN ACCOUNT? LOGIN
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
