import React, { useState } from "react";

export default function Register({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    if (users.some((u) => u.email === email)) {
      alert("User already exists!");
      return;
    }
    const newUser = { name, email, password, role };
    localStorage.setItem("registeredUsers", JSON.stringify([...users, newUser]));
    alert("Registered successfully!");
    switchToLogin();
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name}
               onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
          <option value="pharmacist">Pharmacist</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Already registered? <span className="link" onClick={switchToLogin}>Login</span></p>
    </div>
  );
}