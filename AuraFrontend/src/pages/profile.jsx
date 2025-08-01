import React from 'react';

const Profile = () => {
  return (
   <div className="page-wrapper">
    <header className="flex justify-between items-center p-4 border-b">
        <nav className="w-full flex justify-between items-center">
          <span>
            <a href='/'>
              <img className="logo" src='src/assets/black aura.png' alt="logo" />
            </a>
          </span>

          {/* Hamburger Icon */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            &#9776;
          </div>

          <div className={`menu ${menuOpen ? 'open' : ''}`}>
            <ul>
              <span className="search-bar">
                <input type="text" placeholder="Search..." />
                <a href='#'>
                  <span className='icon'>🔍</span>
                </a>
              </span>
            </ul>

            <ul>
              <li>
            <a href="#">
              <img className="navbaritm" src="src/assets/bell.png" alt="Notifications" />
              <span className="nav-label">Notifications</span>
            </a>
          </li>
          <li>
            <a href="#">
              <img className="navbaritm" src="src/assets/cart.png" alt="Cart" />
              <span className="nav-label">Cart</span>
            </a>
          </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>

        <div className="profile-info">
          <div className="profile-pic">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>

          <div className="profile-details">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john@example.com</p>
            <p><strong>Contact:</strong> +91 12345 67890</p>
            <p><strong>Address:</strong> 123, Aura Lane, Bangalore</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>

  );
};

export default Profile;
