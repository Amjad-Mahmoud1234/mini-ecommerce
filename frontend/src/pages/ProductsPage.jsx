import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [wishlistProductIds, setWishlistProductIds] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.data);
        setError("");
      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        return;
      }

      try {
        const response = await api.get("/wishlist");

        const productIds = response.data.data.map(
          (product) => product.id
        );

        setWishlistProductIds(productIds);
      } catch (error) {
        console.error(
          "Failed to fetch wishlist:",
          error
        );
      }
    };

    fetchProducts();
    fetchWishlist();
  }, []);

  const handleWishlistChange = (
    productId,
    isWishlisted
  ) => {
    setWishlistProductIds((currentIds) => {
      if (isWishlisted) {
        if (currentIds.includes(productId)) {
          return currentIds;
        }

        return [...currentIds, productId];
      }

      return currentIds.filter(
        (id) => id !== productId
      );
    });
  };

  return (
    <div className="products-page">
      <Helmet>
        <title>NOVA | Products</title>
      </Helmet>

      <Navbar />

      <main className="products-container">
        <section className="products-intro">
          <div className="collection-label">
            <span className="collection-line"></span>
            <span>OUR COLLECTION</span>
          </div>

          <h1>
            Everyday essentials<span>.</span>
          </h1>

          <p>
            A small selection of useful pieces for daily
            life,
            <br />
            chosen with care.
          </p>
        </section>

        {loading && (
          <LoadingSpinner message="Loading products..." />
        )}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <section className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                initiallyWishlisted={wishlistProductIds.includes(
                  product.id
                )}
                onWishlistChange={
                  handleWishlistChange
                }
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default ProductsPage;