import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Navbar";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedTab, setSelectedTab] = useState("orders");
  const navigate = useNavigate();

  /* ================= AUTH CHECK ================= */
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
        const token = localStorage.getItem("token");
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/wishlist/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data);
      } catch (err) {
        console.error("Wishlist error:", err);
      }
    };
    fetchWishlist();
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
      <Header />

      <div className="profile-container">
        {/* ================= PROFILE CARD ================= */}
        <div className="profile-card">
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

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

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
            <div className="order-history">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="order-card">
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
                    <span
                      className={`order-status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </div>
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
                  <div key={item.id} className="wishlist-item">
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
                          className="wishlist-btn"
                          onClick={async () => {
                            const token = localStorage.getItem("token");

                            try {
                              await api.post(
                                "/cart",
                                { product_id: item.product_id },
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              );

                              await api.delete(`/wishlist/${item.id}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
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
                          className="wishlist-btn"
                          style={{ background: "#dc2626" }}
                          onClick={async () => {
                            const token = localStorage.getItem("token");

                            try {
                              await api.delete(`/wishlist/${item.id}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
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
                  </div>
                ))
              ) : (
                <p className="wishlist-empty">Your wishlist is empty.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
