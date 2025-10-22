import React from 'react';
import './profile.css'; // If you want to use separate CSS

const Profile = () => {
  const user = {
    name: 'Vedika Mayekar',
    email: 'vedika@example.com',
    phone: '9876543210',
    address: 'Mumbai, India',
    joined: 'January 2024',
  };

  return (
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
        </div>
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>

  );
};

export default Profile;
