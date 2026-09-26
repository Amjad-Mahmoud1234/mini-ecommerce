import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productId: 1,
      title: "Classic Cotton T-Shirt",
      price: 19.99,
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
      quantity: 2,
      variantId: 2,
      variants: [
        { id: 1, name: "Small", stock: 12 },
        { id: 2, name: "Medium", stock: 18 },
        { id: 3, name: "Large", stock: 10 },
        { id: 4, name: "XL", stock: 6 },
      ],
    },
    {
      id: 2,
      productId: 3,
      title: "Road Running Sneakers",
      price: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
      quantity: 1,
      variantId: 11,
      variants: [
        { id: 9, name: "40", stock: 7 },
        { id: 10, name: "41", stock: 9 },
        { id: 11, name: "42", stock: 13 },
        { id: 12, name: "43", stock: 6 },
      ],
    },
    {
      id: 3,
      productId: 5,
      title: "Everyday Backpack",
      price: 49,
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
      quantity: 1,
      variantId: 14,
      variants: [
        { id: 14, name: "Black", stock: 10 },
        { id: 15, name: "Green", stock: 8 },
        { id: 16, name: "Beige", stock: 5 },
      ],
    },
  ]);

  const updateQuantity = (itemId, change) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const selectedVariant = item.variants.find(
          (variant) => variant.id === item.variantId
        );

        const newQuantity = item.quantity + change;

        if (
          newQuantity < 1 ||
          newQuantity > selectedVariant.stock
        ) {
          return item;
        }

        return {
          ...item,
          quantity: newQuantity,
        };
      })
    );
  };

  const changeVariant = (itemId, variantId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return {
          ...item,
          variantId: Number(variantId),
          quantity: 1,
        };
      })
    );
  };

  const removeItem = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-page">
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
              {totalItems} {totalItems === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          <Link to="/products" className="continue-shopping">
            ← Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <section className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h2>Your cart is empty.</h2>

            <p>
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link to="/products">
              Browse products →
            </Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items">
              {cartItems.map((item) => {
                const selectedVariant = item.variants.find(
                  (variant) => variant.id === item.variantId
                );

                const itemSubtotal =
                  item.price * item.quantity;

                return (
                  <article
                    key={item.id}
                    className="cart-item"
                  >
                    <Link
                      to={`/products/${item.productId}`}
                      className="cart-item-image-link"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="cart-item-image"
                      />
                    </Link>

                    <div className="cart-item-content">
                      <div className="cart-item-top">
                        <div>
                          <Link
                            to={`/products/${item.productId}`}
                            className="cart-item-title"
                          >
                            {item.title}
                          </Link>

                          <p className="cart-item-price">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="remove-button"
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
                            value={item.variantId}
                            onChange={(event) =>
                              changeVariant(
                                item.id,
                                event.target.value
                              )
                            }
                          >
                            {item.variants.map((variant) => (
                              <option
                                key={variant.id}
                                value={variant.id}
                              >
                                {variant.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="cart-control">
                          <label>QUANTITY</label>

                          <div className="cart-quantity">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, -1)
                              }
                              disabled={item.quantity === 1}
                            >
                              −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, 1)
                              }
                              disabled={
                                item.quantity >=
                                selectedVariant.stock
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
                        ${itemSubtotal.toFixed(2)}
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
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <Link
                to="/checkout"
                className="checkout-button"
              >
                <span>Continue to checkout</span>
                <span>→</span>
              </Link>

              <p className="summary-note">
                Taxes and shipping are mocked for this checkout.
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;