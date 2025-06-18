import React from 'react';
/*import { FaSearch, FaBell, FaShoppingCart, FaUser } from 'react-icons/fa';*/


const Header = () => {
  return (
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
      <li>
        <a href="/Login">
        <img className='navbaritm  button' src='src/assets/user.png'></img>
      </a>
      </li>
      </ul>
      </nav>
    </header>
  );
};

export default Header;
