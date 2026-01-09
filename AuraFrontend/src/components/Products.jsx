import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  // ---------------- AUTH HEADER ----------------
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  // ---------------- ADD TO CART ----------------
  const handleAddToCart = async (productId) => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      await api.post(
        "/cart",
        {
          product_id: productId,
          quantity: 1,
        },
        { headers }
      );
      alert("Added to cart 🛒");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  // ---------------- ADD TO WISHLIST ----------------
  const handleWishlist = async (productId) => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      await api.post(
        "/wishlist",
        { product_id: productId },
        { headers }
      );
      alert("Added to wishlist ❤️");
    } catch (err) {
      console.error(err);
      alert("Already in wishlist or error occurred");
    }
  };

  return (
    <>
      <Header />

      <section className="products-page">
        <h1 className="products-heading">Shop Our Collection</h1>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img className="product-image " src={`http://127.0.0.1:8000${product.image_url}`} alt={product.name} />


              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <p className="product-price">₹{product.price}</p>

                <div className="product-actions">
                  <button
                    className="btn-outline"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    Shop Now
                  </button>

                  <button
                    className="btn-outline"
                    onClick={() => handleWishlist(product.id)}
                  >
                    Wishlist
                  </button>

                  <button
                    className="btn-primary"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;
