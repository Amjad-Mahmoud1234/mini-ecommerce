import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page">
      <header className="login-header">
        <div className="login-header-container">
          <Link to="/products" className="login-logo">
            NOVA<span>.</span>
          </Link>

          <p>Everyday essentials, chosen with care.</p>
        </div>
      </header>

      <main className="login-main">
        <section className="login-content">
          <div className="login-intro">
            <div className="login-label">
              <span className="login-label-line"></span>
              <span>WELCOME TO NOVA</span>
            </div>

            <h1>
              Welcome back<span>.</span>
            </h1>

            <p>
              Sign in to continue shopping your
              <br />
              everyday essentials.
            </p>
          </div>

          <form className="login-card">
            <div className="login-field">
              <label htmlFor="email">EMAIL</label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">PASSWORD</label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="login-button">
              <span>Sign in</span>
              <span className="login-arrow">→</span>
            </button>

            <p className="login-secure">
              Secure access to your NOVA account
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;