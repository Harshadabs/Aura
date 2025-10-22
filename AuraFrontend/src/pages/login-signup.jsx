import React, { useState } from 'react';
import './login-signup.css';
import '/src/styles.css';
import '/src/login.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // For hamburger toggle

  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    contact_no: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? 'http://localhost:8000/api/login/'
      : 'http://localhost:8000/api/signup/';

    const payload = isLogin
      ? { username: form.email, password: form.password }
      : form;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message || data.error || "Response received");
  };

  return (
    <div className="page-wrapper">
      <header className="flex justify-between items-center p-4 border-b">
        <nav className="w-full flex justify-between items-center">
          <span>
            <a href='/'>
              <img className="logo" src='src/assets/black aura.png' alt="logo" />
            </a>
          </span>

          {/* Hamburger Icon */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            &#9776;
          </div>

          <div className={`menu ${menuOpen ? 'open' : ''}`}>
            <ul>
              <span className="search-bar">
                <input type="text" placeholder="Search..." />
                <a href='#'>
                  <span className='icon'>🔍</span>
                </a>
              </span>
            </ul>

            <ul>
              <li>
            <a href="#">
              <img className="navbaritm" src="src/assets/bell.png" alt="Notifications" />
              <span className="nav-label">Notifications</span>
            </a>
          </li>
          <li>
            <a href="#">
              <img className="navbaritm" src="src/assets/cart.png" alt="Cart" />
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
            className={isLogin ? 'tab active' : 'tab'}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? 'tab active' : 'tab'}
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
                  <input type="text" name="first_name" value={form.first_name} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ color: "#000" }}>Last Name</label>
                  <input type="text" name="last_name" value={form.last_name} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label style={{ color: "#000" }}>Contact No.</label>
                <input type="tel" name="contact_no" value={form.contact_no} onChange={handleChange} />
              </div>
            </>
          )}

          <label style={{ color: "#000" }}>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label style={{ color: "#000" }}>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
