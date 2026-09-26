import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";
import "./CartPage.css";

function CartPage() {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingItemId, setUpdatingItemId] =
    useState(null);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");

      setCart(response.data.data);
      setError("");
    } catch (error) {
      console.error("Failed to fetch cart:", error);

      setError(
        "Unable to load your cart. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (
    itemId,
    currentQuantity,
    change
  ) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity < 1) {
      return;
    }

    try {
      setUpdatingItemId(itemId);

      await api.patch(`/cart/items/${itemId}`, {
        quantity: newQuantity,
      });

      await fetchCart();
    } catch (error) {
      console.error(
        "Failed to update quantity:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update quantity."
      );
    } finally {
      setUpdatingItemId(null);
    }
  };

  const changeVariant = async (
    itemId,
    variantId
  ) => {
    try {
      setUpdatingItemId(itemId);

      await api.patch(`/cart/items/${itemId}`, {
        variantId: Number(variantId),
      });

      await fetchCart();
    } catch (error) {
      console.error(
        "Failed to update variant:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update variant."
      );
    } finally {
      setUpdatingItemId(null);
    }
  };

  const removeItem = async (itemId) => {
    try {
      setUpdatingItemId(itemId);

      await api.delete(`/cart/items/${itemId}`);

      await fetchCart();
    } catch (error) {
      console.error(
        "Failed to remove cart item:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to remove item."
      );
    } finally {
      setUpdatingItemId(null);
    }
  };

  const cartItems = cart.items;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <Helmet>
        <title>NOVA | Cart</title>
      </Helmet>

      <Navbar />

      <main className="cart-container">
        <div className="cart-heading">
          <div>
            <div className="cart-label">
              <span className="cart-label-line"></span>
              <span>YOUR CART</span>
            </div>

            <h1>
              Shopping cart<span>.</span>
            </h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          <Link
            to="/products"
            className="continue-shopping"
          >
            ← Continue shopping
          </Link>
        </div>

        {loading && (
          <LoadingSpinner message="Loading your cart..." />
        )}

        {error && <p>{error}</p>}

        {!loading &&
          cartItems.length === 0 && (
            <section className="empty-cart">
              <div className="empty-cart-icon">
                🛒
              </div>

              <h2>Your cart is empty.</h2>

              <p>
                Looks like you haven't added anything
                to your cart yet.
              </p>

              <Link to="/products">
                Browse products →
              </Link>
            </section>
          )}

        {!loading && cartItems.length > 0 && (
          <div className="cart-layout">
            <section className="cart-items">
              {cartItems.map((item) => {
                const isUpdating =
                  updatingItemId === item.id;

                return (
                  <article
                    key={item.id}
                    className="cart-item"
                  >
                    <Link
                      to={`/products/${item.product.id}`}
                      className="cart-item-image-link"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="cart-item-image"
                      />
                    </Link>

                    <div className="cart-item-content">
                      <div className="cart-item-top">
                        <div>
                          <Link
                            to={`/products/${item.product.id}`}
                            className="cart-item-title"
                          >
                            {item.product.title}
                          </Link>

                          <p className="cart-item-price">
                            $
                            {Number(
                              item.product.price
                            ).toFixed(2)}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="remove-button"
                          disabled={isUpdating}
                          onClick={() =>
                            removeItem(item.id)
                          }
                        >
                          Remove
                        </button>
                      </div>

                      <div className="cart-item-controls">
                        <div className="cart-control">
                          <label
                            htmlFor={`variant-${item.id}`}
                          >
                            VARIANT
                          </label>

                          <select
                            id={`variant-${item.id}`}
                            value={item.variant.id}
                            disabled={isUpdating}
                            onChange={(event) =>
                              changeVariant(
                                item.id,
                                event.target.value
                              )
                            }
                          >
                            {item.product.variants.map(
                              (variant) => (
                                <option
                                  key={variant.id}
                                  value={variant.id}
                                >
                                  {variant.name}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <div className="cart-control">
                          <label>QUANTITY</label>

                          <div className="cart-quantity">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity,
                                  -1
                                )
                              }
                              disabled={
                                isUpdating ||
                                item.quantity === 1
                              }
                            >
                              −
                            </button>

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity,
                                  1
                                )
                              }
                              disabled={
                                isUpdating ||
                                item.quantity >=
                                  item.variant.stock
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="cart-item-subtotal">
                      <span>SUBTOTAL</span>

                      <strong>
                        $
                        {Number(
                          item.subtotal
                        ).toFixed(2)}
                      </strong>
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="order-summary">
              <span className="summary-label">
                ORDER SUMMARY
              </span>

              <h2>Summary</h2>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  ${Number(cart.total).toFixed(2)}
                </span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  ${Number(cart.total).toFixed(2)}
                </strong>
              </div>

              <Link
                to="/checkout"
                className="checkout-button"
              >
                <span>Continue to checkout</span>
                <span>→</span>
              </Link>

              <p className="summary-note">
                Taxes and shipping are mocked for this
                checkout.
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;