import React, { useState, useEffect } from "react";
import "./AdminPanel.css"; // Make sure to create this CSS file

function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  const filteredAppointments = appointments.filter((a) => {
    return (
      a.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.date.includes(searchTerm)
    );
  });

  return (
    <div className="admin-panel-container">
      <h1 className="panel-title">Appointments Dashboard</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by doctor, patient, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((a, index) => (
                <tr key={index}>
                  <td>{a.doctor}</td>
                  <td>{a.patient}</td>
                  <td>{a.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-results">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="total-count">Total Appointments: {filteredAppointments.length}</p>
    </div>
  );
}

export default AdminPanel;
