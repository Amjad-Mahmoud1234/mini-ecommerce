import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();

  // Temporary mock data.
  // Later this will come from the real cart API.
  const cartItems = [
    {
      id: 1,
      productId: 1,
      title: "Classic Cotton T-Shirt",
      price: 19.99,
      quantity: 2,
      variant: "Medium",
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 2,
      productId: 3,
      title: "Road Running Sneakers",
      price: 89,
      quantity: 1,
      variant: "42",
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 3,
      productId: 5,
      title: "Everyday Backpack",
      price: 49,
      quantity: 1,
      variant: "Black",
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    // UI mock only.
    // Later this will call POST /api/v1/orders.
    navigate("/order-confirmation");
  };

  return (
    <div className="checkout-page">
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
              Check your items before placing your order.
            </p>
          </div>

          <Link to="/cart" className="back-to-cart">
            ← Back to cart
          </Link>
        </div>

        <div className="checkout-layout">
          <section className="checkout-review">
            <div className="checkout-section-heading">
              <div>
                <span>ORDER ITEMS</span>
                <h2>Your items</h2>
              </div>

              <p>
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
              </p>
            </div>

            <div className="checkout-items">
              {cartItems.map((item) => {
                const itemSubtotal =
                  item.price * item.quantity;

                return (
                  <article
                    key={item.id}
                    className="checkout-item"
                  >
                    <Link
                      to={`/products/${item.productId}`}
                      className="checkout-item-image-link"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="checkout-item-image"
                      />
                    </Link>

                    <div className="checkout-item-info">
                      <Link
                        to={`/products/${item.productId}`}
                        className="checkout-item-title"
                      >
                        {item.title}
                      </Link>

                      <p>
                        Variant:{" "}
                        <strong>{item.variant}</strong>
                      </p>

                      <p>
                        Quantity:{" "}
                        <strong>{item.quantity}</strong>
                      </p>
                    </div>

                    <div className="checkout-item-price">
                      <span>
                        ${item.price.toFixed(2)} each
                      </span>

                      <strong>
                        ${itemSubtotal.toFixed(2)}
                      </strong>
                    </div>
                  </article>
                );
              })}
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
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="checkout-summary-divider"></div>

            <div className="checkout-total">
              <span>Total</span>

              <strong>
                ${subtotal.toFixed(2)}
              </strong>
            </div>

            <button
              type="button"
              className="place-order-button"
              onClick={handlePlaceOrder}
            >
              <span>Place order</span>
              <span>→</span>
            </button>

            <div className="checkout-secure">
              <span>✓</span>

              <p>
                This is a demo checkout. No payment
                information is required.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;