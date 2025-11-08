import React, { useState } from "react";
import "./BookAppointment.css"; // Make sure to create this CSS file

function BookAppointment() {
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const doctorAppointments = appointments.filter((a) => a.doctor === doctor);

    if (doctorAppointments.length >= 15) {
      alert(`⚠️ Sorry, ${doctor} already has 15 appointments booked!`);
      return;
    }

    const newAppointment = { doctor, patient, date };
    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    setMessage("✅ Appointment booked successfully!");
    setDoctor("");
    setPatient("");
    setDate("");

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="booking-container">
      <h2 className="form-title">Book Appointment</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>Doctor Name</label>
        <input
          type="text"
          placeholder="Enter doctor's name"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          required
        />

        <label>Patient Name</label>
        <input
          type="text"
          placeholder="Enter patient's name"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Book Appointment</button>
      </form>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default BookAppointment;
