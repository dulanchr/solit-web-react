import React, { useState } from "react";
import "./newteachers.css";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function NewStudentsTab() {
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
  const [StudentData, setStudentData] = useState({});
  console.log("usrrr", StudentData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentData({
      ...StudentData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return; // Prevent multiple submissions

    setSubmitting(true); // Set submitting state to true during form submission

    // Extract the relevant data from the StudentData object
    const { firstname, lastname, email, password, ...studentData } =
      StudentData;

    fetch("http://localhost:3001/student/internal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        ...studentData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New student added:", data);
        setShowAcceptPopup(true);
        setSubmitting(false);

        // Upload the image with the tutorId as part of the image file name
        if (data && data.userId) {
          uploadImage(data.userId);
        }

        // Reset form data after successful submission
        setStudentData({
          firstname: "",
          lastname: "",
          tel: "",
          telparent: "",
          address: "",
          email: "",
          password: "",
          grade: "",
          gender: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new student:", error);
        setSubmitting(false); // Reset submitting state after error
      });
  };

  const handleOkClick = () => {
    setShowAcceptPopup(false);
  };

  return (
    <div className="newtutor-container">
      <h2>Add a new student</h2>
      <form onSubmit={handleSubmit} className="newtutor-form">
        <div className="newtutor-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={StudentData.email}
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
            value={StudentData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={StudentData.firstname}
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
            value={StudentData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={StudentData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="newtutor-form-group">
          <label htmlFor="tel">Telephone:</label>
          <input
            type="text"
            id="tel"
            name="tel"
            value={StudentData.tel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="tel">Parent Telephone:</label>
          <input
            type="text"
            id="parenttel"
            name="parenttel"
            value={StudentData.parenttel}
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
            value={StudentData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="description">School</label>
          <input
            type="text"
            id="description"
            name="school"
            value={StudentData.school}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newtutor-form-group">
          <label htmlFor="grade">Grade</label>
          <select
            id="grade"
            name="grade"
            value={StudentData.grade}
            onChange={handleChange}
            required
          >
            <option value="">Select Grade</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
            <option value="13">Grade 13</option>
          </select>
        </div>

        <div className="newtutor-form-group">
          <label htmlFor="thumbnail">Select Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              uploadImage(event.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="newclass-btn">
          Add Student
        </button>
      </form>
    </div>
  );
}
