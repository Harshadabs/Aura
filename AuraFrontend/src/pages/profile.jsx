import React from 'react';
<<<<<<< HEAD
=======
import './profile.css'; // If you want to use separate CSS
>>>>>>> 3509d71ca2aa8e8c1b9bf193ef9ea8e216a0bd45

const Profile = () => {
  const user = {
    name: 'Vedika Mayekar',
    email: 'vedika@example.com',
    phone: '9876543210',
    address: 'Mumbai, India',
    joined: 'January 2024',
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <img
          src="https://i.ibb.co/4pDNDk1/avatar.png"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Member Since:</strong> {user.joined}</p>
>>>>>>> 3509d71ca2aa8e8c1b9bf193ef9ea8e216a0bd45
        </div>
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>

  );
};

export default Profile;
