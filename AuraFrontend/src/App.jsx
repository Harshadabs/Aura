// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authform from './pages/login-signup.jsx';
import Home from './pages/home.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authform />} />
      </Routes>
    </Router>
  );
}

export default App;
