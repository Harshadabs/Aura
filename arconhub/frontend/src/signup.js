import React, { useState } from "react";
import './login.css'
function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // To show success/error messages

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

        // Create the data object to send to the backend
        const signupData = {
            username,
            password,
            email,
        };

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(), // Send CSRF token in headers
            },
            body: JSON.stringify(signupData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Signup failed");
            })
            .then((data) => {
                setMessage("Signup successful! You can now log in.");
                setUsername("");
                setPassword("");
                setEmail("");
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
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className="login-button">Sign Up</button>
            </form>
            {message && <p className="message">{message}</p>}
            <div className="login-links">
          <a href="#">Forgot Password?</a>
          <a href="/login">Login</a>
        </div>
        </div>
        </div>
    );
}

export default SignupPage;
