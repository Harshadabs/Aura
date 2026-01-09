import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "./Navbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  const handleAddToCart = async (productId) => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      await api.post(
        "/cart",
        { product_id: productId, quantity: 1 },
        { headers }
      );
      alert("Added to cart 🛒");
    } catch {
      alert("Failed to add to cart");
    }
  };

  const handleWishlist = async (productId) => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      await api.post("/wishlist", { product_id: productId }, { headers });
      alert("Added to wishlist ❤️");
    } catch {
      alert("Already in wishlist");
    }
  };

  return (
    <>
      <Navbar />

      <section className="products-page">
        <motion.h1
          className="products-heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Shop Our Collection
        </motion.h1>

        <div className="products-grid">
          {products.map((product) => (
            <motion.div
              className="product-card"
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <img
                className="product-image"
                src={`http://127.0.0.1:8000${product.image_url}`}
                alt={product.name}
              />

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

                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;
