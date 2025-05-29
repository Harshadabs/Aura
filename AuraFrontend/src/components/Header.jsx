import React from 'react';
/*import { FaSearch, FaBell, FaShoppingCart, FaUser } from 'react-icons/fa';*/

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <nav>
        <span className="Logo">
        < img src='src/assets/black aura.png' style={{width: 150 }}></img>
      </span>
      <ul>
      <li className="search-bar">
        <input
          type="text"
          placeholder="Search..."
        />
        <span className='icon'>🔍</span>
      </li>
      </ul>
      </nav>
    </header>
  );
};

export default Header;
