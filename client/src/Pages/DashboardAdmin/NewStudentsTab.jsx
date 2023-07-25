import React, { useEffect, useState } from "react";
import axios from "axios";
import "./newstudentstab.css";

export default function NewStudentsTab() {
  const [students, setStudents] = useState([]);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/studregcore");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      // Handle error here (show an error message, etc.)
    }
  };

  return (
    <div className="newstudents-container">
      {students.map((student) => (
        <div key={student.id} className="newstudents-card">
          <div className="avatar">
            {/* You can add an image here as the student's avatar */}
            {/* <img src="student-avatar.jpg" alt="Student Avatar" /> */}
          </div>
          <form className="student-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={student.Student.firstname}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={student.Student.lastname}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={student.Student.gender}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="tel">Tel:</label>
              <input
                type="text"
                id="tel"
                name="tel"
                value={student.Student.tel}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="telParent">Tel Parent:</label>
              <input
                type="text"
                id="telParent"
                name="telParent"
                value={student.Student.telparent}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={student.Student.address}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="school">School:</label>
              <input
                type="text"
                id="school"
                name="school"
                value={student.Student.school}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade:</label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={student.Student.grade}
                readOnly
              />
            </div>
            <div className="buttons">
              <button
                type="button" // Set type to "button" to prevent form submission
                className="accept-button"
                // onClick={() => handleAcceptClick(student)}
              >
                Accept
              </button>
              <button
                type="button" // Set type to "button" to prevent form submission
                className="reject-button"
                // onClick={() => handleRejectClick(student)}
              >
                Reject
              </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
