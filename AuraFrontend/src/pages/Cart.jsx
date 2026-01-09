import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/Header";
import "./cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

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
    await api.post(
      "/cart",
      { product_id },
      authHeader
    );
    fetchCart();
  };

  const decreaseQty = async (cart_id) => {
    await api.put(`/cart/decrease/${cart_id}`, {}, authHeader);
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = async () => {
    await api.post("/orders/checkout", {}, authHeader);
    alert("Order placed 🎉");
    fetchCart();
  };

  return (
    <>
      <Header />

      <div className="cart-container">
        <h2>Your Cart 🛒</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.cart_id} className="cart-item">
                <img
                  src={`http://127.0.0.1:8000${item.image_url}`}
                  alt={item.name}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
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
                  className="remove-btn"
                  onClick={() => removeItem(item.cart_id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <h3>Total: ₹{total}</h3>

            <button onClick={checkout} className="checkout-btn">
              Pay & Place Order
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
