import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./app/AppShell";
import Home from "./pages/Home";
import ProductDetails from "./components/Products";
import Login from "./pages/login-signup.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
