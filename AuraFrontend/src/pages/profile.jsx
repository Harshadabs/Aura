import React, { useEffect, useState } from "react";
import api from "../api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/me"); // ✅ Protected endpoint
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Please log in again");
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

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
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact:</strong> {user.contact_no}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
