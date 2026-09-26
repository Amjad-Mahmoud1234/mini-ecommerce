import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";
import "./ProductCard.css";

function ProductCard({
  product,
  initiallyWishlisted = false,
  onWishlistChange,
}) {
  const navigate = useNavigate();

  const variantCount =
    product.variants?.length ?? 0;

  const [isUpdatingWishlist, setIsUpdatingWishlist] =
    useState(false);

  const [isWishlisted, setIsWishlisted] =
    useState(initiallyWishlisted);

  useEffect(() => {
    setIsWishlisted(initiallyWishlisted);
  }, [initiallyWishlisted]);

  const handleWishlistToggle = async () => {
    const accessToken =
      localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      setIsUpdatingWishlist(true);

      if (isWishlisted) {
        await api.delete(
          `/wishlist/items/${product.id}`
        );

        setIsWishlisted(false);

        onWishlistChange?.(
          product.id,
          false
        );
      } else {
        await api.post("/wishlist/items", {
          productId: product.id,
        });

        setIsWishlisted(true);

        onWishlistChange?.(
          product.id,
          true
        );
      }
    } catch (error) {
      if (
        !isWishlisted &&
        error.response?.status === 409
      ) {
        setIsWishlisted(true);

        onWishlistChange?.(
          product.id,
          true
        );

        return;
      }

      console.error(
        "Failed to update wishlist:",
        error
      );
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <Link
          to={`/products/${product.id}`}
          className="product-image-link"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            className="product-image"
          />
        </Link>

        <button
          type="button"
          className={
            isWishlisted
              ? "wishlist-button active"
              : "wishlist-button"
          }
          aria-label={
            isWishlisted
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          disabled={isUpdatingWishlist}
          onClick={handleWishlistToggle}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <Link
          to={`/products/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        <p className="product-price">
          ${Number(product.price).toFixed(2)}
        </p>

        {variantCount > 1 && (
          <p className="product-options">
            {variantCount} options
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;