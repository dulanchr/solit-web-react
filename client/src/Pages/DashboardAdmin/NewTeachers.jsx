import React, { useState } from "react";
import "./newteachers.css";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function NewTeachers() {
  const [teacherData, setTeacherData] = useState({
    firstname: "",
    lastname: "",
    tel: "",
    address: "",
    description: "",
    email: "",
    password: "",
    Validity: true,
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false); // State to track form submission

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return; // Prevent multiple submissions

    setSubmitting(true); // Set submitting state to true during form submission

    fetch("http://localhost:3001/tutorregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New teacher added:", data);
        setShowAcceptPopup(true);
        setSubmitting(false); // Reset submitting state after successful submission

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

        // Clear the image upload state after successful image upload
        setImageUpload(null);
      })
      .catch((error) => {
        console.error("Error adding new teacher:", error);
        setSubmitting(false); // Reset submitting state after error
      });
  };

  const handleOkClick = () => {
    setShowAcceptPopup(false);
  };

  const uploadImage = (teacherId) => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `TeacherAvatars/${teacherId}/${imageUpload.name}`
    );

    uploadBytes(imageRef, imageUpload)
      .then(() => {
        // No need to show the popup here, as it's already shown after form submission
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
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

        <div className="newtutor-form-group">
          <label htmlFor="thumbnail">Select Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="newtutor-btn" disabled={submitting}>
          {submitting ? "Adding Tutor..." : "Add Tutor"}
        </button>
      </form>

      {showAcceptPopup && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>Tutor Added Successfully!</p>
              <h1>
                <i class="fi fi-br-check"></i>
              </h1>
              <button onClick={handleOkClick}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
