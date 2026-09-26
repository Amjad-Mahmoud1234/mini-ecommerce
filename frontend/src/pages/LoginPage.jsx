import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import api from "../services/api";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { user, accessToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/products");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to sign in"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Helmet>
        <title>NOVA | Sign In</title>
      </Helmet>

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

          <form
            className="login-card"
            onSubmit={handleSubmit}
          >
            <div className="login-field">
              <label htmlFor="email">
                EMAIL
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">
                PASSWORD
              </label>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                      <path d="M9.9 4.2A10.7 10.7 0 0112 4c5.5 0 9 5 9 5a15.6 15.6 0 01-2.1 2.7" />
                      <path d="M6.6 6.6C4.4 8 3 10 3 10s3.5 5 9 5a10.6 10.6 0 004.1-.8" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              <span>
                {isLoading
                  ? "Signing in..."
                  : "Sign in"}
              </span>

              <span className="login-arrow">
                →
              </span>
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