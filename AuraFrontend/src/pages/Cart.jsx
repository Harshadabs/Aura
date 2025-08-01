// src/pages/Cart.jsx
import React from 'react';
import Header from "../components/Header.jsx"
const Cart = () => {
  const cartItems = []; // You can later replace this with props or context

  return (
<>
  <Header />
  <div className="cart-page">
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</>

  );
};

export default Cart;
