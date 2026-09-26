import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./WishlistPage.css";

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      productId: 4,
      title: "Wireless Bluetooth Earbuds",
      price: 79.99,
      imageUrl:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 13, name: "Black", stock: 15 },
      ],
    },
    {
      id: 2,
      productId: 7,
      title: "Minimal Watch",
      price: 120,
      imageUrl:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 21, name: "Black", stock: 6 },
        { id: 22, name: "Brown", stock: 8 },
      ],
    },
    {
      id: 3,
      productId: 9,
      title: "Classic Sunglasses",
      price: 39.99,
      imageUrl:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 26, name: "Black", stock: 12 },
      ],
    },
  ]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const moveToCart = (itemId) => {
    // UI mock only.
    // Later this will call the real cart API.
    removeFromWishlist(itemId);
  };

  return (
    <div className="wishlist-page">
      <Navbar />

      <main className="wishlist-container">
        <div className="wishlist-heading">
          <div>
            <div className="wishlist-label">
              <span className="wishlist-label-line"></span>
              <span>SAVED FOR LATER</span>
            </div>

            <h1>
              Your wishlist<span>.</span>
            </h1>

            <p>
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "product" : "products"} saved
            </p>
          </div>

          <Link
            to="/products"
            className="wishlist-back-link"
          >
            ← Continue shopping
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <section className="empty-wishlist">
            <div className="empty-wishlist-icon">
              ♡
            </div>

            <h2>Your wishlist is empty.</h2>

            <p>
              Save products you like and find them here later.
            </p>

            <Link to="/products">
              Browse products →
            </Link>
          </section>
        ) : (
          <section className="wishlist-grid">
            {wishlistItems.map((item) => (
              <article
                key={item.id}
                className="wishlist-card"
              >
                <div className="wishlist-image-wrapper">
                  <Link
                    to={`/products/${item.productId}`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="wishlist-image"
                    />
                  </Link>

                  <button
                    type="button"
                    className="wishlist-remove-icon"
                    aria-label={`Remove ${item.title} from wishlist`}
                    onClick={() =>
                      removeFromWishlist(item.id)
                    }
                  >
                    ×
                  </button>
                </div>

                <div className="wishlist-card-content">
                  <Link
                    to={`/products/${item.productId}`}
                    className="wishlist-product-title"
                  >
                    {item.title}
                  </Link>

                  <p className="wishlist-price">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  {item.variants.length > 1 && (
                    <p className="wishlist-options">
                      {item.variants.length} options available
                    </p>
                  )}

                  <div className="wishlist-actions">
                    <Link
                      to={`/products/${item.productId}`}
                      className="view-product-button"
                    >
                      View product
                    </Link>

                    <button
                      type="button"
                      className="move-cart-button"
                      onClick={() =>
                        moveToCart(item.id)
                      }
                    >
                      Move to cart →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default WishlistPage;