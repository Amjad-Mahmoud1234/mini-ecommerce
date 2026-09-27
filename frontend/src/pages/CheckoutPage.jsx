import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";
import "./CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] =
    useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get("/cart");

        setCart(response.data.data);
        setError("");
      } catch (error) {
        console.error(
          "Failed to fetch cart:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load your cart."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) {
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");

      const response =
        await api.post("/orders");

      const order =
        response.data.data.order;

      navigate("/order-confirmation", {
        state: {
          order,
        },
      });
    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to place your order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  const totalItems = cart.items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="checkout-page">
        <Helmet>
          <title>NOVA | Checkout</title>
        </Helmet>

        <Navbar />

        <main className="checkout-container">
          <LoadingSpinner message="Loading checkout..." />
        </main>
      </div>
    );
  }

  if (error && cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <Helmet>
          <title>NOVA | Checkout</title>
        </Helmet>

        <Navbar />

        <main className="checkout-container">
          <div className="checkout-heading">
            <div>
              <div className="checkout-label">
                <span className="checkout-label-line"></span>
                <span>CHECKOUT</span>
              </div>

              <h1>
                Unable to load checkout
                <span>.</span>
              </h1>

              <p>{error}</p>
            </div>
          </div>

          <Link
            to="/cart"
            className="back-to-cart"
          >
            ← Back to cart
          </Link>
        </main>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <Helmet>
          <title>NOVA | Checkout</title>
        </Helmet>

        <Navbar />

        <main className="checkout-container">
          <div className="checkout-heading">
            <div>
              <div className="checkout-label">
                <span className="checkout-label-line"></span>
                <span>CHECKOUT</span>
              </div>

              <h1>
                Your cart is empty
                <span>.</span>
              </h1>

              <p>
                Add some products before
                checking out.
              </p>
            </div>
          </div>

          <Link
            to="/products"
            className="back-to-cart"
          >
            ← Continue shopping
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Helmet>
        <title>NOVA | Checkout</title>
      </Helmet>

      <Navbar />

      <main className="checkout-container">
        <div className="checkout-heading">
          <div>
            <div className="checkout-label">
              <span className="checkout-label-line"></span>
              <span>CHECKOUT</span>
            </div>

            <h1>
              Review your order<span>.</span>
            </h1>

            <p>
              Check your items before placing
              your order.
            </p>
          </div>

          <Link
            to="/cart"
            className="back-to-cart"
          >
            ← Back to cart
          </Link>
        </div>

        {error && (
          <p className="checkout-error">
            {error}
          </p>
        )}

        <div className="checkout-layout">
          <section className="checkout-review">
            <div className="checkout-section-heading">
              <div>
                <span>ORDER ITEMS</span>
                <h2>Your items</h2>
              </div>

              <p>
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}
              </p>
            </div>

            <div className="checkout-items">
              {cart.items.map((item) => (
                <article
                  key={item.id}
                  className="checkout-item"
                >
                  <Link
                    to={`/products/${item.product.id}`}
                    className="checkout-item-image-link"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="checkout-item-image"
                    />
                  </Link>

                  <div className="checkout-item-info">
                    <Link
                      to={`/products/${item.product.id}`}
                      className="checkout-item-title"
                    >
                      {item.product.title}
                    </Link>

                    <p>
                      Variant:{" "}
                      <strong>
                        {item.variant.name}
                      </strong>
                    </p>

                    <p>
                      Quantity:{" "}
                      <strong>
                        {item.quantity}
                      </strong>
                    </p>
                  </div>

                  <div className="checkout-item-price">
                    <span>
                      $
                      {Number(
                        item.product.price
                      ).toFixed(2)}{" "}
                      each
                    </span>

                    <strong>
                      $
                      {Number(
                        item.subtotal
                      ).toFixed(2)}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="checkout-summary">
            <span className="checkout-summary-label">
              ORDER SUMMARY
            </span>

            <h2>Summary</h2>

            <div className="checkout-summary-divider"></div>

            <div className="checkout-summary-row">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>

              <span>
                $
                {Number(
                  cart.total
                ).toFixed(2)}
              </span>
            </div>

            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="checkout-summary-divider"></div>

            <div className="checkout-total">
              <span>Total</span>

              <strong>
                $
                {Number(
                  cart.total
                ).toFixed(2)}
              </strong>
            </div>

            <button
              type="button"
              className="place-order-button"
              onClick={handlePlaceOrder}
              disabled={placingOrder}
            >
              <span>
                {placingOrder
                  ? "Placing order..."
                  : "Place order"}
              </span>

              <span>→</span>
            </button>

            <div className="checkout-secure">
              <span>✓</span>

              <p>
                This is a demo checkout. No
                payment information is required.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;