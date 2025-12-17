import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Header";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("orders");
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
  try {
    const response = await api.get("/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setWishlist(response.data);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
  }
};


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Session expired or invalid token. Please log in again.");
        navigate("/login");
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchProfile();
    fetchOrders();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  if (!user)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading profile...
      </p>
    );

  return (
    <>
      <Header />

      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          <h1>Welcome, {user.first_name} 👤</h1>

          <img
            src="https://i.ibb.co/4pDNDk1/avatar.png"
            alt="User Avatar"
            className="profile-avatar"
          />

          <div className="profile-details">
            <p>
              <strong>First Name:</strong> {user.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {user.last_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Contact:</strong> {user.contact_no}
            </p>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Toggle Tabs */}
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

          {/* Conditional Sections */}
          {selectedTab === "orders" ? (
            <div className="order-history">
              <h2>Your Orders</h2>
              <div className="order-list">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-info">
                        <p>
                          <strong>Order ID:</strong> #{order.id}
                        </p>
                        <p>
                          <strong>Item:</strong> {order.item_name}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`order-status ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center" }}>No orders yet.</p>
                )}
              </div>
            </div>
          ) : (
           <div className="wishlist-section">
  <h2>Your Wishlist ❤️</h2>

  {wishlist.length > 0 ? (
    <div className="wishlist-grid">
      {wishlist.map((item) => (
        <div key={item.id} className="wishlist-item">
          <img
            src={item.image_url}
            alt={item.product_name}
          />
          <p>{item.product_name}</p>
        </div>
      ))}
    </div>
  ) : (
    <p style={{ textAlign: "center" }}>Your wishlist is empty.</p>
  )}
</div>

          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
