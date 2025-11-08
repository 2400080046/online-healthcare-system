import React, { useState, useEffect } from "react";

export default function DoctorPanel({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [prescription, setPrescription] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data.filter((a) => a.doctor === user.name));
  }, [user.name]);

  const sendPrescription = () => {
    if (!selectedPatient || !prescription) {
      alert("Select a patient and add prescription!");
      return;
    }
    const prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];
    prescriptions.push({ doctor: user.name, patient: selectedPatient, details: prescription });
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
    alert("Prescription sent!");
    setPrescription("");
  };

  return (
    <div>
      <h3>Your Appointments</h3>
      {appointments.length === 0 ? <p>No appointments yet.</p> : (
        <ul>
          {appointments.map((a, i) => (
            <li key={i}>{a.patient} on {a.date}</li>
          ))}
        </ul>
      )}
      <h3>Send Prescription</h3>
      <input type="text" placeholder="Patient Name"
             value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} />
      <textarea placeholder="Prescription details"
                value={prescription} onChange={(e) => setPrescription(e.target.value)} />
      <button onClick={sendPrescription}>Send</button>
    </div>
  );
}