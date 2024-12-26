import React from "react";
import "./styles.css";

const Header = () => {
  function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
  }
return(
    <div>
  <header>
    <nav>
      <h1>ArconHUB</h1>
      <div class="hamburger" onclick="toggleMenu()">&#9776;</div>
      <ul>
        <li><a href="/" className="navlink">Home</a></li>
        <li><a href="/About" className="navlink">About</a></li>
        <li><a href="#" className="navlink">Contact</a></li>
        </ul>
        <ul>
        <li><a href="/login" className="login-signup">LOGIN / SIGNUP</a></li>
      </ul> 
    </nav>
  </header>
  </div>
);
};

export default Header;
