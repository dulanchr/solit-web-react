import React, { useState, useEffect } from "react";
import "./newclasses.css";

export default function NewClasses() {
  const [classData, setClassData] = useState({
    className: "",
    grade: "",
    date: "",
    time: "",
    location: "",
    thumbnail: "",
    tutorId: "", // To store the selected tutor ID
  });

  const [tutors, setTutors] = useState([]); // To store the tutor data fetched from the API

  useEffect(() => {
    // Fetch tutor data from the API and store it in the "tutors" state
    fetch("http://localhost:3001/tutor")
      .then((response) => response.json())
      .then((data) => setTutors(data))
      .catch((error) => console.error("Error fetching tutor data:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClassData({
      ...classData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful response or do something with the data
        console.log("New class added:", data);
        // Reset the input fields to their initial empty values
        setClassData({
          className: "",
          grade: "",
          date: "",
          time: "",
          location: "",
          thumbnail: "",
          tutorId: "",
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding new class:", error);
      });
  };

  return (
    <div className="newclass-container">
      <h2>Add a new class</h2>
      <form onSubmit={handleSubmit} className="newclass-form">
        <div className="newclass-form-group">
          <label htmlFor="className">Class Name:</label>
          <input
            type="text"
            id="className"
            name="className"
            value={classData.className}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newclass-form-group">
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={classData.grade}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newclass-form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={classData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newclass-form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            id="time"
            name="time"
            value={classData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newclass-form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={classData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newclass-form-group">
          <label htmlFor="thumbnail">Thumbnail URL:</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={classData.thumbnail}
            onChange={handleChange}
          />
        </div>
        <div className="newclass-form-group">
          <label htmlFor="tutorId">Tutor:</label>
          <select
            id="tutorId"
            name="tutorId"
            value={classData.tutorId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a tutor
            </option>
            {tutors.map((tutor) => (
              <option key={tutor.tutorId} value={tutor.tutorId}>
                {tutor.firstname} {tutor.lastname}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="newclass-btn">
          Add Class
        </button>
      </form>
    </div>
  );
}
