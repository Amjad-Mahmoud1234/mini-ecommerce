import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
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
            A small selection of useful pieces for daily life,
            <br />
            chosen with care.
          </p>
        </section>

        {loading && (
          <p>Loading products...</p>
        )}

        {error && (
          <p>{error}</p>
        )}

        {!loading && !error && (
          <section className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default ProductsPage;