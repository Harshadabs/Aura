import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // ✅ Check login status + fetch user info if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetchUser(); // Get user's first name
    }
  }, []);

  // ✅ Reactively update when token changes
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) fetchUser();
      else setUserName("");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Fetch user profile for greeting
  const fetchUser = async () => {
    try {
      const response = await api.get("/users/me");
      setUserName(response.data.first_name || "User");
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ Button click handler
  const handleButtonClick = () => {
    if (isLoggedIn) navigate("/profile");
    else navigate("/login");
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <a href="/">
          <img className="logo" src="src/assets/black aura.png" alt="Logo" />
        </a>

        {/* Hamburger Icon for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>

        <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <li>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <span className="icon">🔍</span>
            </div>
          </li>

          <li>
            <a href="#">
              <img
                className="navbaritm"
                src="src/assets/bell.png"
                alt="Notifications"
              />
              <span className="nav-label">Notifications</span>
            </a>
          </li>

          <li>
            <a href="/cart">
              <img
                className="navbaritm"
                src="src/assets/cart.png"
                alt="Cart"
              />
              <span className="nav-label">Cart</span>
            </a>
          </li>

          {/* 🔹 Dynamic Button (Login or Profile greeting) */}
         <li>
            {isLoggedIn ? (
              <span className="login-btn" onClick={() => navigate("/profile")}>
                Hi, {userName || "User"}
              </span>
            ) : (
              <button onClick={handleButtonClick} className="login-btn">
                Log In
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
