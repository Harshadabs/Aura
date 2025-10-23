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
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger toggle

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login/signup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN endpoint
        const response = await api.post("/users/login", {
          email: form.email,
          password: form.password,
        });
        alert("Login successful!");
        console.log("Login response:", response.data);
      } else {
        // SIGNUP endpoint
        const response = await api.post("/users/signup", {
          first_name: form.first_name,
          last_name: form.last_name,
          contact_no: form.contact_no,
          email: form.email,
          password: form.password,
        });
        alert("User registered successfully!");
        console.log("Signup response:", response.data);
      }
    }catch (err) {
  if (err.response) {
    console.error("Backend Error:", err.response.data);
    alert(`Error: ${err.response.data.detail || "Server error"}`);
  } else {
    console.error("Error:", err);
    alert("Cannot connect to server");
  }
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
                  <label style={{ color: "#000" }}>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label style={{ color: "#000" }}>Last Name</label>
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
                <label style={{ color: "#000" }}>Contact No.</label>
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

          <label style={{ color: "#000" }}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label style={{ color: "#000" }}>Password</label>
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
