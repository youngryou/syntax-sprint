export default function Auth() {
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
          <label className="card-subtitle">Email</label>
          <input
            type="email"
            className="input-field"
            placeholder="student@devacademy.co.nz"
          />
        </div>

        <div className="input-group">
          <label className="card-subtitle">Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="**********"
          />
        </div>

        <div className="card-actions--col">
          <button className="btn btn--blue">LOGIN</button>
          <button className="btn btn--outline">CREATE ACCOUNT</button>
        </div>
      </div>
    </div>
  )
}
