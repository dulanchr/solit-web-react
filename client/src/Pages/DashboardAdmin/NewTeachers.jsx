import React, { useState } from "react";
import "./newteachers.css";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function NewTeachers() {
  const [imageUpload, setImageUpload] = useState(null);

  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false); // State to track form submission

  const uploadImage = (userId) => {
    if (imageUpload == null) return;

    const imageRef = ref(
      storage,
      `ProfilePictures/${userId}/${imageUpload.name}`
    );

    uploadBytes(imageRef, imageUpload)
      .then(() => {
        alert("Image Uploaded");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  const [TutorData, setTutorData] = useState({
    firstname: "",
    lastname: "",
    tel: "",
    address: "",
    description: "",
    email: "",
    password: "",
    Validity: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTutorData({
      ...TutorData,
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
      body: JSON.stringify(TutorData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New teacher added:", data);
        setShowAcceptPopup(true);
        setSubmitting(false);
        if (data && data.userId) {
          // Upload the image with the tutorId as part of the image file name
          uploadImage(data.userId);
        } // Reset submitting state after successful submission
        setTutorData({
          firstname: "",
          lastname: "",
          tel: "",
          address: "",
          description: "",
          email: "",
          password: "",
        });

        // setImageUpload(null);
      })
      .catch((error) => {
        console.error("Error adding new teacher:", error);
        setSubmitting(false); // Reset submitting state after error
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
            value={TutorData.firstname}
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
            value={TutorData.lastname}
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
            value={TutorData.tel}
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
            value={TutorData.address}
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
            value={TutorData.description}
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
            value={TutorData.email}
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
            value={TutorData.password}
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
        <button onClick={uploadImage} className="newclass-btn">
          Add Teacher
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
