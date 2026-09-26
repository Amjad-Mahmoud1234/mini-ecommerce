import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

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
      {/* Public routes */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/products"
        element={<ProductsPage />}
      />

      <Route
        path="/products/:productId"
        element={<ProductDetailsPage />}
      />

      {/* Protected routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-confirmation"
        element={
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/products" replace />}
      />
    </Routes>
  );
}

export default App;