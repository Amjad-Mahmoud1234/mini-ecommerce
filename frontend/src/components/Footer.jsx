import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/products" className="footer-logo">
              NOVA<span>.</span>
            </Link>

            <p>
              Thoughtfully selected products for
              everyday living.
            </p>
          </div>

          <nav
            className="footer-links"
            aria-label="Footer navigation"
          >
            <Link to="/products">Shop</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} NOVA.
            All rights reserved.
          </p>

          <p className="footer-note">
            Simple. Modern. Essential.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;