import React, { useState } from "react";
import "./login-signup.css";
import "/src/styles.css";
import "/src/login.css";
import api from "../api";

const AuthForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    contact_no: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
  const response = await api.post("/users/login", {
    email: form.email,
    password: form.password,
  });

  const token = response.data.access_token; // ✅ must match backend key
  if (token) {
    localStorage.setItem("token", token);
    alert("Login successful!");
    console.log("Stored token:", token);
    window.location.href = "/"; // redirect to profile page
  } else {
    alert("Login failed: no token received");
  }
    } else {
      // SIGNUP
      await api.post("/users/signup", {
        first_name: form.first_name,
        last_name: form.last_name,
        contact_no: form.contact_no,
        email: form.email,
        password: form.password,
      });
      alert("User registered successfully!");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server");
  }
};

  return (
    <div className="page-wrapper">
      <header className="flex justify-between items-center p-4 border-b">
        <nav className="w-full flex justify-between items-center">
          <span>
            <a href="/">
              <img className="logo" src="src/assets/black aura.png" alt="logo" />
            </a>
          </span>

          {/* Hamburger Icon */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            &#9776;
          </div>

          <div className={`menu ${menuOpen ? "open" : ""}`}>
            <ul>
              <span className="search-bar">
                <input type="text" placeholder="Search..." />
                <a href="#">
                  <span className="icon">🔍</span>
                </a>
              </span>
            </ul>

            <ul>
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
                <a href="#">
                  <img
                    className="navbaritm"
                    src="src/assets/cart.png"
                    alt="Cart"
                  />
                  <span className="nav-label">Cart</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="form-container">
        <div className="toggle-tabs">
          <button
            className={isLogin ? "tab active" : "tab"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "tab active" : "tab"}
            onClick={() => setIsLogin(false)}
          >
            Sign-up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="name-fields">
                <div>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Contact No.</label>
                <input
                  type="tel"
                  name="contact_no"
                  value={form.contact_no}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
