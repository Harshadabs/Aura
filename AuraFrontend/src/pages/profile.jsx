import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";
import "../styles/styles.css";
import Navbar from "../components/NavBar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
<<<<<<< HEAD
  const [wishlist, setWishlist] = useState([]);
  const [selectedTab, setSelectedTab] = useState("orders");
  const navigate = useNavigate();

  /* ================= AUTH CHECK ================= */
=======
  const [selectedTab, setSelectedTab] = useState("orders");
  const navigate = useNavigate();

>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      navigate("/login");
    }
  }, [navigate]);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
    } catch {
      navigate("/login");
    }
  };
  fetchProfile();
}, []);


  /* ================= FETCH ORDERS ================= */
 useEffect(() => {
  api.get("/orders").then((res) => setOrders(res.data));
}, []);


  /* ================= FETCH WISHLIST ================= */
useEffect(() => {
  api.get("/wishlist").then((res) => setWishlist(res.data));
}, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="profile-container">
        {/* ================= PROFILE CARD ================= */}
        <motion.div
          className="profile-card animate-card"
          whileHover={{ y: -4, scale: 1.02 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>Welcome, {user.first_name} 👤</h1>

          <img
            src="https://i.ibb.co/4pDNDk1/avatar.png"
            alt="Avatar"
            className="profile-avatar"
          />

          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Contact:</strong> {user.contact_no}
          </p>

          <button className="logout-btn animate-btn" onClick={handleLogout}>
            Logout
          </button>
        </motion.div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="main-content">
          {/* TABS */}
          <div className="toggle-tabs">
            <button
              className={selectedTab === "orders" ? "tab active" : "tab"}
              onClick={() => setSelectedTab("orders")}
            >
              Orders
            </button>
            <button
              className={selectedTab === "wishlist" ? "tab active" : "tab"}
              onClick={() => setSelectedTab("wishlist")}
            >
              Wishlist
            </button>
          </div>

          {/* ================= ORDERS ================= */}
{selectedTab === "orders" && (
  <div className="orders-section">
    <h2>📦 Your Orders</h2>

    {orders.length > 0 ? (
      orders.map((order) => (
        <motion.div
          key={order.id}
          className="order-card animate-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p><strong>Order ID:</strong> #{order.id}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </p>

          <div className="order-items">
            {order.items.map((item, idx) => (
              <p key={idx}>
                Product #{item.product_id} × {item.quantity} — ₹{item.price}
              </p>
            ))}
          </div>

          <p className="order-total">
            <strong>Total:</strong> ₹{order.total_amount}
          </p>
        </motion.div>
      ))
    ) : (
      <p>No orders yet.</p>
    )}
  </div>
)}

          {/* ================= WISHLIST ================= */}
          {selectedTab === "wishlist" && (
            <div className="wishlist-section">
              <h2>🛍️ Your Wishlist</h2>

              {wishlist.length > 0 ? (
                wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    className="wishlist-item animate-card"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: item.id * 0.05 }}
                  >
                    {/* IMAGE */}
                    <div className="wishlist-item-img">
                      <img
                        src={`http://127.0.0.1:8000${item.image_url}`}
                        alt={item.name}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://via.placeholder.com/150")
                        }
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="wishlist-item-details">
                      <h4>{item.name}</h4>
                      <p className="wishlist-item-price">₹{item.price}</p>

                      <div style={{ display: "flex", gap: "0.8rem" }}>
                        {/* MOVE TO CART */}
                        <button
                          className="wishlist-btn animate-btn"
                          onClick={async () => {
                            const token = localStorage.getItem("token");

                            try {
                              await api.post(
                                "/cart",
                                { product_id: item.product_id },
                                {
                                  headers: { Authorization: `Bearer ${token}` },
                                }
                              );

                              await api.delete(`/wishlist/${item.id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                              });

                              setWishlist((prev) =>
                                prev.filter((w) => w.id !== item.id)
                              );
                            } catch (err) {
                              console.error(err);
                              alert("Failed to move item");
                            }
                          }}
                        >
                          Move to Cart
                        </button>

                        {/* REMOVE */}
                        <button
                          className="wishlist-btn animate-btn"
                          style={{ background: "#dc2626" }}
                          onClick={async () => {
                            const token = localStorage.getItem("token");

                            try {
                              await api.delete(`/wishlist/${item.id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                              });

                              setWishlist((prev) =>
                                prev.filter((w) => w.id !== item.id)
                              );
                            } catch (err) {
                              console.error(err);
                              alert("Failed to remove item");
                            }
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="wishlist-empty">Your wishlist is empty.</p>
              )}
            </div>
<<<<<<< HEAD
=======
          ) : (
            <div className="wishlist-section">
              <h2>Your Wishlist ❤️</h2>
              <div className="wishlist-grid">
                <div className="wishlist-item">
                  <img
                    src="https://i.ibb.co/JzQdXwL/valorant.jpg"
                    alt="Valorant Points"
                  />
                  <p>Valorant Points</p>
                </div>
                <div className="wishlist-item">
                  <img
                    src="https://i.ibb.co/YR9DCnG/pubg.jpg"
                    alt="PUBG UC"
                  />
                  <p>PUBG UC</p>
                </div>
                <div className="wishlist-item">
                  <img
                    src="https://i.ibb.co/3T6dcL8/diamonds.jpg"
                    alt="Free Fire Diamonds"
                  />
                  <p>Free Fire Diamonds</p>
                </div>
              </div>
            </div>
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
