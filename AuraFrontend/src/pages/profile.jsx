import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Header";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState("orders"); // <-- new
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please log in first");
          navigate("/login");
          return;
        }

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

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  if (!user) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</p>;

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
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact_no}</p>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {/* Main content area */}
        <div className="main-content">
          {/* Dynamic Toggle Tabs */}
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

          {/* Conditional Rendering */}
          {selectedTab === "orders" ? (
            <div className="order-history">
              <h2>Your Orders</h2>
              <div className="order-list">
                <div className="order-card">
                  <div className="order-info">
                    <p><strong>Order ID:</strong> #12345</p>
                    <p><strong>Item:</strong> Game Recharge</p>
                    <p><strong>Date:</strong> 20 Oct 2025</p>
                  </div>
                  <span className="order-status completed">Completed</span>
                </div>

                <div className="order-card">
                  <div className="order-info">
                    <p><strong>Order ID:</strong> #12346</p>
                    <p><strong>Item:</strong> Valorant Points</p>
                    <p><strong>Date:</strong> 19 Oct 2025</p>
                  </div>
                  <span className="order-status pending">Pending</span>
                </div>

                <div className="order-card">
                  <div className="order-info">
                    <p><strong>Order ID:</strong> #12347</p>
                    <p><strong>Item:</strong> PUBG UC</p>
                    <p><strong>Date:</strong> 17 Oct 2025</p>
                  </div>
                  <span className="order-status cancelled">Cancelled</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="wishlist-section">
              <h2>Your Wishlist ❤️</h2>
              <div className="wishlist-grid">
                <div className="wishlist-item">
                  <img src="https://i.ibb.co/JzQdXwL/valorant.jpg" alt="Valorant Points" />
                  <p>Valorant Points</p>
                </div>
                <div className="wishlist-item">
                  <img src="https://i.ibb.co/YR9DCnG/pubg.jpg" alt="PUBG UC" />
                  <p>PUBG UC</p>
                </div>
                <div className="wishlist-item">
                  <img src="https://i.ibb.co/3T6dcL8/diamonds.jpg" alt="Free Fire Diamonds" />
                  <p>Free Fire Diamonds</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
