import React from "react";
import "./login.css";

const Login = () => {
    return (
        <><div class="container">
        <header>
        <nav>
          <h1>ArconHUB</h1>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div class="login-form-container">
        <h2>Login</h2>
        <form action="/login" method="post" class="login-form">
          <input type="text" name="username" placeholder="Username" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit" class="login-button">Log In</button>
        </form>
        <div class="login-links">
          <a href="#">Forgot Password?</a>
          <a href="/Signup">Sign Up</a>
        </div>
      </div>
    </div>
    </>
    );
};

export default Login;