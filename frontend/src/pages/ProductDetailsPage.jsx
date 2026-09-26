import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./ProductDetailsPage.css";

function ProductDetailsPage() {
  const { productId } = useParams();

  // Temporary mock product.
  // Later we will fetch it using productId from the backend.
  const product = {
    id: Number(productId),
    title: "Classic Cotton T-Shirt",
    description:
      "A soft cotton t-shirt designed for comfortable everyday wear. Made with a simple fit that works naturally with your daily wardrobe.",
    price: 19.99,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    variants: [
      {
        id: 1,
        name: "Small",
        stock: 12,
        productId: Number(productId),
      },
      {
        id: 2,
        name: "Medium",
        stock: 18,
        productId: Number(productId),
      },
      {
        id: 3,
        name: "Large",
        stock: 10,
        productId: Number(productId),
      },
      {
        id: 4,
        name: "XL",
        stock: 6,
        productId: Number(productId),
      },
    ],
  };

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]
  );

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < selectedVariant.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  return (
    <div className="product-details-page">
      <Navbar />

      <main className="product-details-container">
        <Link to="/products" className="back-link">
          ← Back to products
        </Link>

        <section className="product-details">
          <div className="product-details-image-wrapper">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="product-details-image"
            />
          </div>

          <div className="product-details-content">
            <div className="details-label">
              <span className="details-label-line"></span>
              <span>PRODUCT DETAILS</span>
            </div>

            <h1>{product.title}</h1>

            <p className="details-price">
              ${Number(product.price).toFixed(2)}
            </p>

            <p className="details-description">
              {product.description}
            </p>

            <div className="details-divider"></div>

            <div className="details-section">
              <label className="details-section-label">
                VARIANT
              </label>

              <div className="variant-options">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={
                      selectedVariant.id === variant.id
                        ? "variant-button active"
                        : "variant-button"
                    }
                    onClick={() =>
                      handleVariantChange(variant)
                    }
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="stock-info">
              <span className="stock-dot"></span>

              <span>
                {selectedVariant.stock} items available
              </span>
            </div>

            <div className="details-section">
              <label className="details-section-label">
                QUANTITY
              </label>

              <div className="quantity-selector">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= selectedVariant.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button
                type="button"
                className="add-cart-button"
              >
                <span>Add to cart</span>
                <span>→</span>
              </button>

              <button
                type="button"
                className="add-wishlist-button"
              >
                <span>♡</span>
                <span>Add to wishlist</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetailsPage;