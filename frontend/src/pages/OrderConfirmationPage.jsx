import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./OrderConfirmationPage.css";

function OrderConfirmationPage() {
  // Temporary mock order.
  // Later this will come from POST /api/v1/orders.
  const order = {
    id: 1042,
    createdAt: new Date(),
    total: 177.98,
    items: [
      {
        id: 1,
        productId: 1,
        productTitle: "Classic Cotton T-Shirt",
        variantName: "Medium",
        unitPrice: 19.99,
        quantity: 2,
        subtotal: 39.98,
      },
      {
        id: 2,
        productId: 3,
        productTitle: "Road Running Sneakers",
        variantName: "42",
        unitPrice: 89,
        quantity: 1,
        subtotal: 89,
      },
      {
        id: 3,
        productId: 5,
        productTitle: "Everyday Backpack",
        variantName: "Black",
        unitPrice: 49,
        quantity: 1,
        subtotal: 49,
      },
    ],
  };

  const orderDate = order.createdAt.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="confirmation-page">
      <Navbar />

      <main className="confirmation-container">
        <section className="confirmation-card">
          <div className="confirmation-icon">
            ✓
          </div>

          <span className="confirmation-label">
            ORDER CONFIRMED
          </span>

          <h1>
            Thank you for your order<span>.</span>
          </h1>

          <p className="confirmation-message">
            Your order has been placed successfully.
            Here's a summary of your purchase.
          </p>

          <div className="order-meta">
            <div>
              <span>ORDER NUMBER</span>
              <strong>#{order.id}</strong>
            </div>

            <div>
              <span>ORDER DATE</span>
              <strong>{orderDate}</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong className="order-status">
                Confirmed
              </strong>
            </div>
          </div>

          <div className="confirmation-divider"></div>

          <div className="confirmation-summary-heading">
            <div>
              <span>ORDER SUMMARY</span>
              <h2>Your items</h2>
            </div>

            <p>
              {order.items.length}{" "}
              {order.items.length === 1
                ? "product"
                : "products"}
            </p>
          </div>

          <div className="confirmation-items">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="confirmation-item"
              >
                <div className="confirmation-item-info">
                  <Link
                    to={`/products/${item.productId}`}
                  >
                    {item.productTitle}
                  </Link>

                  <p>
                    {item.variantName} · Qty{" "}
                    {item.quantity}
                  </p>
                </div>

                <div className="confirmation-item-price">
                  <span>
                    ${Number(item.unitPrice).toFixed(2)} each
                  </span>

                  <strong>
                    ${Number(item.subtotal).toFixed(2)}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <div className="confirmation-total">
            <div>
              <span>Total</span>
              <p>Shipping included</p>
            </div>

            <strong>
              ${Number(order.total).toFixed(2)}
            </strong>
          </div>

          <div className="confirmation-actions">
            <Link
              to="/products"
              className="continue-button"
            >
              <span>Continue shopping</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        <p className="confirmation-footer">
          Thanks for shopping with NOVA.
        </p>
      </main>
    </div>
  );
}

export default OrderConfirmationPage;