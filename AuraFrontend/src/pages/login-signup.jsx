import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import "/src/styles/styles.css";

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
<<<<<<< HEAD
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await api.post("/users/login", {
          email: form.email,
          password: form.password,
        });
        const token = response.data.access_token;
        if (token) {
          localStorage.setItem("token", token);
          alert("Login successful!");
          window.location.href = "/"; // redirect to homepage
        } else alert("Login failed: no token received");
      } else {
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
=======
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
    window.location.href = "/profile"; // redirect to profile page
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
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)
    }
  };

  return (
    <div className="page-wrapper">
      <motion.div
        className="form-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Toggle Tabs */}
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
            Sign Up
          </button>
        </div>

        <motion.form
          className="auth-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {!isLogin && (
            <div className="name-fields">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </div>
          )}

          {!isLogin && (
            <motion.div whileFocus={{ scale: 1.02 }}>
              <label>Contact No.</label>
              <input
                type="tel"
                name="contact_no"
                value={form.contact_no}
                onChange={handleChange}
                required
              />
            </motion.div>
          )}

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="submit-btn animate-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AuthForm;
