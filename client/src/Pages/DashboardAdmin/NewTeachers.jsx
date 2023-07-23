import React, { useState } from "react";
import "./newteachers.css";

export default function NewTeachers() {
  const [teacherData, setTeacherData] = useState({
    firstname: "",
    lastname: "",
    tel: "",
    address: "",
    description: "",
    email: "",
    password: "",
  });

  const [showAcceptPopup, setShowAcceptPopup] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/tutorregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful response or do something with the data
        console.log("New teacher added:", data);
        setShowAcceptPopup(true); // Show the success popup
        // Reset the input fields to their initial empty values
        setTeacherData({
          firstname: "",
          lastname: "",
          tel: "",
          address: "",
          description: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding new teacher:", error);
      });
  };

  const handleOkClick = () => {
    setShowAcceptPopup(false);
  };

  return (
    <div className="newtutor-container">
      <h2>Add a new teacher</h2>
      <form onSubmit={handleSubmit} className="newtutor-form">
        <div className="newtutor-form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={teacherData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={teacherData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="tel">Phone:</label>
          <input
            type="text"
            id="tel"
            name="tel"
            value={teacherData.tel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={teacherData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={teacherData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={teacherData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={teacherData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="newtutor-btn">
          Add Tutor
        </button>
      </form>

      {showAcceptPopup && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>Payment Successful!</p>
              <h1>
                <i className="fi fi-rr-envelope-download"></i>
              </h1>
              <p>Tutor is added</p>
              <p>Thank you for the purchase!</p>
              <button onClick={handleOkClick}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
