import React, { useState } from "react";
import './login.css'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // To display success or error messages

    // Function to get CSRF token from cookies
    function getCSRFToken() {
        let cookieValue = null;
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith("csrftoken=")) {
                cookieValue = cookie.substring("csrftoken=".length, cookie.length);
                break;
            }
        }
        return cookieValue;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(), // Send CSRF token
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Invalid credentials");
            })
            .then((data) => {
                setMessage("Login successful!");
                // Handle token or session setup here, e.g., storing JWT in localStorage
            })
            .catch((error) => {
                setMessage("Error: " + error.message);
            });
    };

    return (
      <div className="container">
      <header>
      <nav>
        <h1>ArconHUB</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>

        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            {message && <p className="message">{message}</p>}
            <div className="login-links">
          <a href="#">Forgot Password?</a>
          <a href="/Signup">Sign Up</a>
        </div>
      </div> 
    </div>
    );
}

export default Login;
