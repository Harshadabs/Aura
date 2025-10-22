import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <a href="/">
          <img className="logo" src="src/assets/black aura.png" alt="Logo" />
        </a>

        <div className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </div>

        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <li>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <span className="icon">🔍</span>
            </div>
          </li>
          <li>
            <a href="#">
              <img className="navbaritm" src="src/assets/bell.png" alt="Notifications" />
              <span className="nav-label">Notifications</span>
            </a>
          </li>
          <li>
            <a href="/Cart">
              <img className="navbaritm" src="src/assets/cart.png" alt="Cart" />
              <span className="nav-label">Cart</span>
            </a>
          </li>
          <li>
            <a href="/Login">
              <img className="navbaritm" src="src/assets/user.png" alt="Profile" />
              <span className="nav-label">Profile</span>
            </a>
          </li>
          <li>
            <a href="/Profile">
              <img className="navbaritm" src="src/assets/user.png" alt="Logout" />
              <span className="nav-label">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
