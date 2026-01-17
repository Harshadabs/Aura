import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  /* ---------------- AUTH STATE ---------------- */

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) fetchUser();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) fetchUser();
      else setUserName("");
    };

    window.addEventListener("storage", handleStorageChange);
    return () =>
      window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/me");
      setUserName(res.data.first_name || "User");
    } catch {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
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
          <img src="AuraFrontend/src/assets/black aura.png"></img>
        </span>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
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
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4">
          <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
            Cart
          </NavLink>

          {isLoggedIn ? (
            <button
              onClick={() => navigate("/profile")}
              className="block w-full text-left"
            >
              Hi, {userName}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="block w-full text-left"
            >
              Log in
            </button>
          )}
        </div>
      )}
    </motion.header>
  );
}
