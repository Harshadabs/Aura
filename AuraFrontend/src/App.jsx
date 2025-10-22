// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authform from './pages/login-signup.jsx';
import Home from './pages/home.jsx';
<<<<<<< HEAD
import Cart from './pages/Cart.jsx';
import Profile from './pages/profile.jsx';
=======
import Profile from './pages/profile.jsx';

>>>>>>> 3509d71ca2aa8e8c1b9bf193ef9ea8e216a0bd45

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authform />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
