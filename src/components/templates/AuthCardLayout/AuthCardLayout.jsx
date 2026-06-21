import './AuthCardLayout.css'

function AuthCardLayout({ title, alert, children }) {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-card__hero">
          <p className="auth-card__title">{title}</p>
        </div>
        <div className="auth-card__form-wrap">
          {alert ? <div className="auth-card__alert-wrap">{alert}</div> : null}
          <div className="auth-card__form">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthCardLayout
