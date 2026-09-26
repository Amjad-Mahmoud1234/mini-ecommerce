import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />

      <Route path="/checkout" element={<CheckoutPage />} />
      <Route
        path="/order-confirmation"
        element={<OrderConfirmationPage />}
      />

      <Route path="/" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}

export default App;