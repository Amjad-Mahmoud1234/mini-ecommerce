import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // Temporary UI mock.
  // Later this will come from the authenticated user.
  const userName = "Amjad";
  const userInitial = userName.charAt(0).toUpperCase();

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

          <div className="navbar-account">
            <div className="user-info">
              <span className="user-avatar">
                {userInitial}
              </span>

              <span className="user-name">
                {userName}
              </span>
            </div>

            <button
              className="sign-out-button"
              type="button"
            >
              <span className="nav-icon">↪</span>
              Sign out
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;