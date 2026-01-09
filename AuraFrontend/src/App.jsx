import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppShell from "./app/AppShell";

import Home from "./pages/home";
import Cart from "./pages/Cart";
import Profile from "./pages/profile";
import AuthForm from "./pages/login-signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Auth outside layout */}
        <Route path="/login" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  );
}
