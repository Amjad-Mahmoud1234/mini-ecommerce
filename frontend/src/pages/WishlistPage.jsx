import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";
import "./WishlistPage.css";

function WishlistPage() {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [
    removingProductId,
    setRemovingProductId,
  ] = useState(null);

  const [
    movingProductId,
    setMovingProductId,
  ] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response =
          await api.get("/wishlist");

        setWishlistItems(response.data.data);
      } catch (error) {
        console.error(
          "Failed to fetch wishlist:",
          error
        );

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

  const removeFromWishlist = async (
    productId
  ) => {
    try {
      setRemovingProductId(productId);

      await api.delete(
        `/wishlist/items/${productId}`
      );

      setWishlistItems((currentItems) =>
        currentItems.filter(
          (item) => item.id !== productId
        )
      );

      setError("");
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

  const moveToCart = async (product) => {
    if (product.variants.length > 1) {
      navigate(`/products/${product.id}`);
      return;
    }

    const variant = product.variants[0];

    if (!variant) {
      setError(
        "This product does not have an available variant."
      );
      return;
    }

    if (variant.stock < 1) {
      setError(
        "This product is currently out of stock."
      );
      return;
    }

    try {
      setMovingProductId(product.id);
      setError("");

      await api.post("/cart/items", {
        productId: product.id,
        variantId: variant.id,
        quantity: 1,
      });

      await api.delete(
        `/wishlist/items/${product.id}`
      );

      setWishlistItems((currentItems) =>
        currentItems.filter(
          (item) => item.id !== product.id
        )
      );
    } catch (error) {
      console.error(
        "Failed to move product to cart:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to move product to cart."
      );
    } finally {
      setMovingProductId(null);
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
                  <Link
                    to={`/products/${item.id}`}
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
                    disabled={
                      removingProductId ===
                        item.id ||
                      movingProductId === item.id
                    }
                    onClick={() =>
                      removeFromWishlist(
                        item.id
                      )
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
                    $
                    {Number(
                      item.price
                    ).toFixed(2)}
                  </p>

                  {item.variants.length > 1 && (
                    <p className="wishlist-options">
                      {item.variants.length}{" "}
                      options available
                    </p>
                  )}

                  <div className="wishlist-actions">
                    <button
                      type="button"
                      className="move-cart-button"
                      disabled={
                        movingProductId ===
                          item.id ||
                        removingProductId ===
                          item.id
                      }
                      onClick={() =>
                        moveToCart(item)
                      }
                    >
                      {movingProductId ===
                      item.id
                        ? "Moving..."
                        : item.variants.length > 1
                          ? "Choose options"
                          : "Move to cart"}
                    </button>

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