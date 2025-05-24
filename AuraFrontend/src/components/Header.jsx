import React from 'react';
/*import { FaSearch, FaBell, FaShoppingCart, FaUser } from 'react-icons/fa';*/

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="text-2xl font-serif tracking-wider">AURA <span className="text-sm">BY UAE</span></div>
      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-full px-4 py-1"
        />
      </div>
    </header>
  );
};

export default Header;
