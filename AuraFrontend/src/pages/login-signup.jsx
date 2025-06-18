import React, { useState } from 'react';
import './login-signup.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="page-wrapper">
          <header className="flex justify-between items-center p-4 border-b">
      <nav>
        <span >
          <a href='/'>
        < img className="Logo" src='src/assets/black aura.png' ></img>
      </a>
      </span>
      <ul>
      <span className="search-bar">
        <input
          type="text"
          placeholder="Search..."
        />
        <a href='#'>
        <span className='icon'>🔍</span>
        </a>
      </span>
      </ul>
      <ul>
      <li className='notif'>
        <a href='#'>
        <img className='navbaritm  button' src='src/assets/bell.png'></img>
      </a>
      </li>
      <li>
        <a href='#'>
        <img className='navbaritm button' src='src/assets/cart.png'></img>
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

        <form className="auth-form">
          {!isLogin && (
            <div className="name-fields">
              <div>
                <label>First Name</label>
                <input type="text" />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" />
              </div>
            </div>
          )}
          <label>Email Id</label>
          <input type="email" />

          <label>Contact No.</label>
          <input type="tel" />

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
