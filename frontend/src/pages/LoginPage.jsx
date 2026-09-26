import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />
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