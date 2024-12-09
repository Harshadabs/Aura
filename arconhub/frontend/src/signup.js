import React from "react";
import "./login.css";

const Signup = () => {
    return (
    <>
    <header>
      <nav>
        <h1>ArconHUB</h1>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href="/About">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
    <div className="container">
      <div className="login-form-container">
        <h2>Sign up</h2>
        <form action="/signup" method="post" className="login-form">
          <input type="text" name="username" placeholder="Username" required />
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit" className="login-button">
            <a
              href="/signup"
              style={{textDecoration: "none"}}
              className="login-buttonx"
              >Submit</a>
          </button>
        </form>
        <div className="login-links">
          <a href="/login">Log in</a>
        </div>
      </div>
    </div>
    </>
    );
};

export default Signup;