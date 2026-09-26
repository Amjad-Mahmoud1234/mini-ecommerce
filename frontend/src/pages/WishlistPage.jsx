import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";
import "./WishlistPage.css";

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingProductId, setRemovingProductId] =
    useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get("/wishlist");

        setWishlistItems(response.data.data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load wishlist. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      setRemovingProductId(productId);

      await api.delete(`/wishlist/items/${productId}`);

      setWishlistItems((currentItems) =>
        currentItems.filter(
          (item) => item.id !== productId
        )
      );
    } catch (error) {
      console.error(
        "Failed to remove wishlist item:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to remove product from wishlist."
      );
    } finally {
      setRemovingProductId(null);
    }
  };

  if (loading) {
    return (
      <div className="wishlist-page">
        <Navbar />

        <main className="wishlist-container">
          <p>Loading wishlist...</p>
        </main>
      </div>
    );
  }

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
              {wishlistItems.length === 1
                ? "product"
                : "products"}{" "}
              saved
            </p>
          </div>

          <Link
            to="/products"
            className="wishlist-back-link"
          >
            ← Continue shopping
          </Link>
        </div>

        {error && (
          <p className="wishlist-error">
            {error}
          </p>
        )}

        {wishlistItems.length === 0 ? (
          <section className="empty-wishlist">
            <div className="empty-wishlist-icon">
              ♡
            </div>

            <h2>Your wishlist is empty.</h2>

            <p>
              Save products you like and find them
              here later.
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
                  <Link to={`/products/${item.id}`}>
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
                    disabled={
                      removingProductId === item.id
                    }
                    onClick={() =>
                      removeFromWishlist(item.id)
                    }
                  >
                    ×
                  </button>
                </div>

                <div className="wishlist-card-content">
                  <Link
                    to={`/products/${item.id}`}
                    className="wishlist-product-title"
                  >
                    {item.title}
                  </Link>

                  <p className="wishlist-price">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  {item.variants.length > 1 && (
                    <p className="wishlist-options">
                      {item.variants.length} options
                      available
                    </p>
                  )}

                  <div className="wishlist-actions">
                    <Link
                      to={`/products/${item.id}`}
                      className="view-product-button"
                    >
                      View product
                    </Link>
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