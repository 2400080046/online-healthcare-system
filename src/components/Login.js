import React, { useState } from "react";
import "./Login.css"; // Create this CSS file

export default function Login({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      onLogin(found);
    } else {
      alert("⚠️ Invalid credentials!");
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="auth-footer">
        Don’t have an account?{" "}
        <span className="link" onClick={switchToRegister}>
          Register
        </span>
      </p>
    </div>
  );
}
