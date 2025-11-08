import React, { useEffect, useState } from "react";
import "./PharmacistPanel.css"; // Create this CSS file

export default function PharmacistPanel() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("prescriptions")) || [];
    setPrescriptions(data);
  }, []);

  return (
    <div className="pharmacist-panel">
      <h2 className="panel-title">Prescriptions Overview</h2>
      {prescriptions.length === 0 ? (
        <p className="no-data">No prescriptions available.</p>
      ) : (
        <div className="prescription-list">
          {prescriptions.map((p, i) => (
            <div key={i} className="prescription-card">
              <p><strong>Patient:</strong> {p.patient}</p>
              <p><strong>Doctor:</strong> {p.doctor}</p>
              <p><strong>Details:</strong> {p.details}</p>
            </div>
          ))}
        </div>
      )}
      <p className="total-count">Total Prescriptions: {prescriptions.length}</p>
    </div>
  );
}
