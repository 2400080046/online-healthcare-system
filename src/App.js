import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setPage("login");
  };

  return (
    <div className="container">
      {!user ? (
        <>
          {page === "login" ? (
            <Login onLogin={handleLogin} switchToRegister={() => setPage("register")} />
          ) : (
            <Register switchToLogin={() => setPage("login")} />
          )}
        </>
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;