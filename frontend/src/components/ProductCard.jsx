import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const variantCount = product.variants?.length ?? 0;

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <Link to={`/products/${product.id}`} className="product-image-link">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="product-image"
          />
        </Link>

        <button
          type="button"
          className="wishlist-button"
          aria-label={`Add ${product.title} to wishlist`}
        >
          ♡
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