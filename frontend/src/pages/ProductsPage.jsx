import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import "./ProductsPage.css";

function ProductsPage() {
  const products = [
    {
      id: 1,
      title: "Classic Cotton T-Shirt",
      description: "A soft cotton t-shirt designed for comfortable everyday wear.",
      price: 19.99,
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 1, name: "Small", stock: 12, productId: 1 },
        { id: 2, name: "Medium", stock: 18, productId: 1 },
        { id: 3, name: "Large", stock: 10, productId: 1 },
        { id: 4, name: "XL", stock: 6, productId: 1 },
      ],
    },
    {
      id: 2,
      title: "Slim Fit Denim Jeans",
      description: "Classic slim fit denim jeans with a comfortable everyday feel.",
      price: 59.5,
      imageUrl:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 5, name: "30", stock: 8, productId: 2 },
        { id: 6, name: "32", stock: 14, productId: 2 },
        { id: 7, name: "34", stock: 11, productId: 2 },
        { id: 8, name: "36", stock: 5, productId: 2 },
      ],
    },
    {
      id: 3,
      title: "Road Running Sneakers",
      description: "Lightweight sneakers designed for comfort and daily movement.",
      price: 89.0,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 9, name: "40", stock: 7, productId: 3 },
        { id: 10, name: "41", stock: 9, productId: 3 },
        { id: 11, name: "42", stock: 13, productId: 3 },
        { id: 12, name: "43", stock: 6, productId: 3 },
      ],
    },
    {
      id: 4,
      title: "Wireless Bluetooth Earbuds",
      description: "Compact wireless earbuds with a clean and practical design.",
      price: 79.99,
      imageUrl:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 13, name: "Black", stock: 15, productId: 4 },
      ],
    },
    {
      id: 5,
      title: "Everyday Backpack",
      description: "A practical backpack with enough room for your everyday essentials.",
      price: 49.0,
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 14, name: "Black", stock: 10, productId: 5 },
        { id: 15, name: "Green", stock: 8, productId: 5 },
        { id: 16, name: "Beige", stock: 5, productId: 5 },
        { id: 17, name: "Navy", stock: 7, productId: 5 },
      ],
    },
    {
      id: 6,
      title: "Insulated Water Bottle",
      description: "A reusable insulated bottle that keeps drinks at the right temperature.",
      price: 29.0,
      imageUrl:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 18, name: "500ml", stock: 14, productId: 6 },
        { id: 19, name: "750ml", stock: 9, productId: 6 },
        { id: 20, name: "1L", stock: 6, productId: 6 },
      ],
    },
    {
      id: 7,
      title: "Minimal Watch",
      description: "A clean minimal watch designed to complement everyday outfits.",
      price: 120.0,
      imageUrl:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 21, name: "Black", stock: 6, productId: 7 },
        { id: 22, name: "Brown", stock: 8, productId: 7 },
      ],
    },
    {
      id: 8,
      title: "Classic Cap",
      description: "A simple adjustable cap for casual everyday wear.",
      price: 24.0,
      imageUrl:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 23, name: "Beige", stock: 11, productId: 8 },
        { id: 24, name: "Black", stock: 9, productId: 8 },
        { id: 25, name: "Green", stock: 7, productId: 8 },
      ],
    },
    {
      id: 9,
      title: "Classic Sunglasses",
      description: "Lightweight sunglasses with a timeless everyday frame.",
      price: 39.99,
      imageUrl:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 26, name: "Black", stock: 12, productId: 9 },
      ],
    },
    {
      id: 10,
      title: "Ceramic Coffee Mug",
      description: "A minimal ceramic mug for coffee, tea, and everyday use.",
      price: 16.5,
      imageUrl:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 27, name: "Cream", stock: 20, productId: 10 },
      ],
    },
    {
      id: 11,
      title: "Canvas Tote Bag",
      description: "A lightweight reusable tote bag for daily essentials.",
      price: 22.0,
      imageUrl:
        "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 28, name: "Natural", stock: 16, productId: 11 },
      ],
    },
    {
      id: 12,
      title: "Desk Lamp",
      description: "A compact desk lamp with a simple design for your workspace.",
      price: 44.99,
      imageUrl:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 29, name: "Black", stock: 7, productId: 12 },
      ],
    },
    {
      id: 13,
      title: "Wireless Keyboard",
      description: "A compact wireless keyboard designed for a clean workspace.",
      price: 69.0,
      imageUrl:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 30, name: "White", stock: 9, productId: 13 },
      ],
    },
    {
      id: 14,
      title: "Notebook Set",
      description: "A simple notebook set for notes, ideas, and everyday planning.",
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 31, name: "Standard", stock: 18, productId: 14 },
      ],
    },
    {
      id: 15,
      title: "Portable Speaker",
      description: "A compact wireless speaker for music at home or on the go.",
      price: 54.99,
      imageUrl:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
      variants: [
        { id: 32, name: "Black", stock: 10, productId: 15 },
      ],
    },
  ];

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

        <section className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default ProductsPage;