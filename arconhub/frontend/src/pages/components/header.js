import React from "react";
import "./styles.css";

const Header = () => (
  <div>
  <header>
    <nav>
      <h1>ArconHUB</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="/login" className="login-signup">LOGIN / SIGNUP</a></li>
      </ul> 
    </nav>
  </header>
  </div>
);

export default Header;
