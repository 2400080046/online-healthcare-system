import React from "react";
import BookAppointment from "./BookAppointment";
import DoctorPanel from "./DoctorPanel";
import PharmacistPanel from "./PharmacistPanel";
import AdminPanel from "./AdminPanel";
import "./Dashboard.css"; // create this CSS file

export default function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h2>Welcome, {user.name}</h2>
          <p className="user-role">Role: {user.role}</p>
        </div>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        {user.role === "patient" && <BookAppointment user={user} />}
        {user.role === "doctor" && <DoctorPanel user={user} />}
        {user.role === "pharmacist" && <PharmacistPanel />}
        {user.role === "admin" && <AdminPanel />}
      </main>
    </div>
  );
}
