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
      const response = await axios.get("http://localhost:3001/requester");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      // Handle error here (show an error message, etc.)
    }
  };

  const handleAcceptClick = (student) => {
    setSelectedStudent(student);
    setShowAcceptPopup(true);
  };

  const handleRejectClick = (student) => {
    setSelectedStudent(student);
    setShowRejectPopup(true);
  };

  const handleOkClick = async () => {
    // Add student or delete student based on the pop-up context
    try {
      if (showAcceptPopup) {
        // Perform the action to add student here (POST)
        await axios.post("http://localhost:3001/register", selectedStudent);
      } else if (showRejectPopup) {
        // Perform the action to delete student here (DELETE)
        await axios.delete(
          `http://localhost:3001/requester/${selectedStudent.requesterId}`
        );
      }
      setShowAcceptPopup(false);
      setShowRejectPopup(false);
      setSelectedStudent(null);
      fetchStudentData(); // Refresh student data after the action is performed
    } catch (error) {
      console.error(error);
      // Handle error here (show an error message, etc.)
    }
  };

  const handleBackClick = () => {
    setShowAcceptPopup(false);
    setShowRejectPopup(false);
    setSelectedStudent(null);
  };

  return (
    <div className="newstudents-container">
      {students.map((student, index) => (
        <div key={index} className="newstudents-card">
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
                value={student.firstname}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={student.lastname}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={student.gender}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="tel">Tel:</label>
              <input
                type="text"
                id="tel"
                name="tel"
                value={student.tel}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="telParent">Tel Parent:</label>
              <input
                type="text"
                id="telParent"
                name="telParent"
                value={student.telparent}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={student.address}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="school">School:</label>
              <input
                type="text"
                id="school"
                name="school"
                value={student.school}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade:</label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={student.grade}
                readOnly
              />
            </div>
            <div className="buttons">
              <button
                type="button" // Set type to "button" to prevent form submission
                className="accept-button"
                onClick={() => handleAcceptClick(student)}
              >
                Accept
              </button>
              <button
                type="button" // Set type to "button" to prevent form submission
                className="reject-button"
                onClick={() => handleRejectClick(student)}
              >
                Reject
              </button>
            </div>
          </form>
        </div>
      ))}

      {/* Accept Pop-up */}
      {showAcceptPopup && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>Payment Successful!</p>
              <h1>
                <i className="fi fi-rr-envelope-download"></i>
              </h1>
              <p>
                Are you sure? This action will add a new student in the CORE
                community.
              </p>
              <p>Thank you for the purchase!</p>
              <button onClick={handleOkClick}>ADD STUDENT</button>
              <button onClick={handleBackClick}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Pop-up */}
      {showRejectPopup && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>Payment Successful!</p>
              <h1>
                <i className="fi fi-rr-envelope-download"></i>
              </h1>
              <p>
                Are you sure? This action will delete the user data forever.
                This cannot be undone.
              </p>
              <p>Thank you for the purchase!</p>
              <button onClick={handleOkClick}>DELETE REQUEST</button>
              <button onClick={handleBackClick}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
