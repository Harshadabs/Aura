import React, { useState } from 'react';
import './login-signup.css';
import '/src/styles.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
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
        <nav>
          <span>
            <a href='/'>
              <img className="Logo" src='src/assets/black aura.png' alt="logo" />
            </a>
          </span>
          <ul>
            <span className="search-bar">
              <input type="text" placeholder="Search..." />
              <a href='#'>
                <span className='icon'>🔍</span>
              </a>
            </span>
          </ul>
          <ul>
            <li className='notif'>
              <a href='#'>
                <img className='navbaritm button' src='src/assets/bell.png' alt="bell" />
              </a>
            </li>
            <li>
              <a href='#'>
                <img className='navbaritm button' src='src/assets/cart.png' alt="cart" />
              </a>
            </li>
          </ul>
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
