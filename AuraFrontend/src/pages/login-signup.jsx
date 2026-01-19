import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../supabaseclient";
import "/src/styles/styles.css";
import "./login-signup.css";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    contact_no: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 Email Login / Signup
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      alert("Login successful!");
      navigate("/"); // ✅ NO reload
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      const user = data.user;

      if (!user) {
        alert("Check email for verification");
        return;
      }

      alert("Signup successful!");
      navigate("/login");
    }
  } catch (err) {
    console.error(err);
    alert(err.message || "Something went wrong");
  }
};

  // 🔑 Google Login
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div className="page-wrapper">
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur"
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer text-lg font-semibold tracking-wide"
          >
            <img
              src="https://mljcpaxpdmlmagwjqrxg.supabase.co/storage/v1/object/public/essentials/black-aura.png"
              alt="Aura Logo"
              className="h-8 object-contain logo"
            />

          </span>
        </nav>
      </motion.header>
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
            onClick={handleSubmit}
            className="submit-btn animate-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </motion.form>

        {/* Google Sign In */}
        <motion.button
          className="google-btn"
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AuthForm;
