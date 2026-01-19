import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { user } from "../AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  /* ---------------- UI ---------------- */

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur"
    >
      <nav className="navbar-inner">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="navbar-logo cursor-pointer"
        >
          <img
            src="https://mljcpaxpdmlmagwjqrxg.supabase.co/storage/v1/object/public/essentials/black-aura.png"
            alt="Aura Logo"
            className="logo"
          />
        </div>


        {/* Desktop Nav */}
        <div className="desktop-nav">
          <NavLink
            to="/cart"
            className="text-neutral-500 hover:text-black transition"
          >
            Cart
          </NavLink>

          {isLoggedIn ? (
            <button
              onClick={() => navigate("/profile")}
              className="rounded-full border px-4 py-1.5 text-sm hover:bg-black hover:text-white transition"
            >
              Hi, {userName}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-full border px-4 py-1.5 hover:bg-black hover:text-white transition"
            >
              Log in
            </button>
          )}

        </div>
          {/* Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
          >

            ☰
          </button>
        
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
  <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
    Cart
  </NavLink>

  {isLoggedIn ? (
    <button
      onClick={() => navigate("/profile")}
      className="mobile-menu-btn"
    >
      Hi, {userName}
    </button>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="mobile-menu-btn"
    >
      Log in
    </button>
  )}
</div>

      )}
    </motion.header>
  );
}
