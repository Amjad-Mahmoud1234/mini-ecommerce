import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      navigate("/login");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/products" className="navbar-logo">
          NOVA<span>.</span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/products">
            Products
          </NavLink>

          <NavLink to="/wishlist">
            <span className="nav-icon">♡</span>
            Wishlist
          </NavLink>

          <NavLink to="/cart">
            <span className="nav-icon">🛒</span>
            Cart
          </NavLink>

          {user ? (
            <div className="navbar-account">
              <div className="user-info">
                <span className="user-avatar">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>

              <button
                className="sign-out-button"
                type="button"
                onClick={handleLogout}
              >
                <span className="nav-icon">↪</span>
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="sign-in-link"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;