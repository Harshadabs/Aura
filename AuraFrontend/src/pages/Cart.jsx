import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import Header from "./components/Navbar";
import "/src/styles/styles.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart", authHeader);
      setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (cart_id) => {
    await api.delete(`/cart/${cart_id}`, authHeader);
    fetchCart();
  };

  const increaseQty = async (product_id) => {
    await api.post("/cart", { product_id }, authHeader);
    fetchCart();
  };

  const decreaseQty = async (cart_id) => {
    await api.put(`/cart/decrease/${cart_id}`, {}, authHeader);
    fetchCart();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = async () => {
    await api.post("/orders/checkout", {}, authHeader);
    alert("Order placed 🎉");
    fetchCart();
  };

  return (
    <>
      <Header />

      <motion.div
        className="cart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Your Cart 🛒</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <motion.div
                key={item.cart_id}
                className="cart-item animate-card"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: item.cart_id * 0.05 }}
              >
                <img
                  src={`http://127.0.0.1:8000${item.image_url}`}
                  alt={item.name}
                  onError={(e) =>
                    (e.currentTarget.src = "https://via.placeholder.com/150")
                  }
                />

                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.cart_id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.product_id)}>+</button>
                  </div>
                </div>

                <button
                  className="remove-btn animate-btn"
                  onClick={() => removeItem(item.cart_id)}
                >
                  Remove
                </button>
              </motion.div>
            ))}

            <h3>Total: ₹{total}</h3>

            <motion.button
              onClick={checkout}
              className="checkout-btn animate-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Pay & Place Order
            </motion.button>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
