import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";
import "./ProductDetailsPage.css";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] =
    useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Wishlist state
  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const [
    isUpdatingWishlist,
    setIsUpdatingWishlist,
  ] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  const [
    isUpdatingCart,
    setIsUpdatingCart,
  ] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(
          `/products/${productId}`
        );

        const fetchedProduct = response.data.data;

        setProduct(fetchedProduct);

        if (fetchedProduct.variants.length > 0) {
          setSelectedVariant(
            fetchedProduct.variants[0]
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch product:",
          error
        );

        if (error.response?.status === 404) {
          setError("Product not found.");
        } else {
          setError(
            "Unable to load product. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlistStatus = async () => {
      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        return;
      }

      try {
        const response =
          await api.get("/wishlist");

        const exists = response.data.data.some(
          (wishlistProduct) =>
            wishlistProduct.id === Number(productId)
        );

        setIsWishlisted(exists);
      } catch (error) {
        console.error(
          "Failed to fetch wishlist:",
          error
        );
      }
    };

    const fetchCart = async () => {
      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        return;
      }

      try {
        const response = await api.get("/cart");

        setCartItems(response.data.data.items);
      } catch (error) {
        console.error(
          "Failed to fetch cart:",
          error
        );
      }
    };

    fetchProduct();
    fetchWishlistStatus();
    fetchCart();
  }, [productId]);

  const currentCartItem = selectedVariant
    ? cartItems.find(
        (item) =>
          item.product.id === product?.id &&
          item.variant.id === selectedVariant.id
      )
    : null;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (
      selectedVariant &&
      quantity < selectedVariant.stock
    ) {
      setQuantity(quantity + 1);
    }
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

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
      } else {
        await api.post("/wishlist/items", {
          productId: product.id,
        });

        setIsWishlisted(true);
      }
    } catch (error) {
      if (
        !isWishlisted &&
        error.response?.status === 409
      ) {
        setIsWishlisted(true);
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

  const handleCartToggle = async () => {
    const accessToken =
      localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (!selectedVariant) {
      return;
    }

    try {
      setIsUpdatingCart(true);

      if (currentCartItem) {
        await api.delete(
          `/cart/items/${currentCartItem.id}`
        );

        setCartItems((currentItems) =>
          currentItems.filter(
            (item) =>
              item.id !== currentCartItem.id
          )
        );
      } else {
        await api.post("/cart/items", {
          productId: product.id,
          variantId: selectedVariant.id,
          quantity,
        });

        const response = await api.get("/cart");

        setCartItems(
          response.data.data.items
        );
      }
    } catch (error) {
      console.error(
        "Failed to update cart:",
        error
      );
    } finally {
      setIsUpdatingCart(false);
    }
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <Helmet>
          <title>NOVA | Product</title>
        </Helmet>

        <Navbar />

        <main className="product-details-container">
          <LoadingSpinner message="Loading product..." />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-page">
        <Helmet>
          <title>NOVA | Product</title>
        </Helmet>

        <Navbar />

        <main className="product-details-container">
          <Link
            to="/products"
            className="back-link"
          >
            ← Back to products
          </Link>

          <p>{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <Helmet>
        <title>NOVA | {product.title}</title>
      </Helmet>

      <Navbar />

      <main className="product-details-container">
        <Link
          to="/products"
          className="back-link"
        >
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
                {product.variants.map(
                  (variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      className={
                        selectedVariant?.id ===
                        variant.id
                          ? "variant-button active"
                          : "variant-button"
                      }
                      onClick={() =>
                        handleVariantChange(
                          variant
                        )
                      }
                    >
                      {variant.name}
                    </button>
                  )
                )}
              </div>
            </div>

            {selectedVariant && (
              <>
                <div className="stock-info">
                  <span className="stock-dot"></span>

                  <span>
                    {selectedVariant.stock} items
                    available
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
                      disabled={
                        quantity >=
                        selectedVariant.stock
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="product-actions">
              <button
                type="button"
                className="add-cart-button"
                onClick={handleCartToggle}
                disabled={
                  isUpdatingCart ||
                  !selectedVariant ||
                  selectedVariant.stock === 0
                }
              >
                <span>
                  {isUpdatingCart
                    ? "Updating..."
                    : currentCartItem
                      ? "Remove from cart"
                      : "Add to cart"}
                </span>

                <span>
                  {currentCartItem ? "×" : "→"}
                </span>
              </button>

              <button
                type="button"
                className="add-wishlist-button"
                onClick={handleWishlistToggle}
                disabled={isUpdatingWishlist}
              >
                <span>
                  {isWishlisted ? "♥" : "♡"}
                </span>

                <span>
                  {isUpdatingWishlist
                    ? "Updating..."
                    : isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"}
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetailsPage;