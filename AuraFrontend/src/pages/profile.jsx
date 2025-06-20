import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="page-wrapper">
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
