import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./feedtab.css";
import profilePicture from "./profile~1.jpg";

export default function FeedTabAdmin() {
  const { id } = useParams();
  const [AssignmentData, setAssignmentData] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageClick = (index) => {
    setCurrentPostIndex(index);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/gettutorid/assignment`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAssignmentData(data);
        }
      })
      .catch((error) => console.error("Error fetching tutor data:", error));
  }, [id]);

  return (
    <div>
      <div>
        <h1>You're now logged in as an admin</h1>
        <div className="poste-bin">
          {AssignmentData.map((assignment, index) => (
            <div
              key={index}
              className="poste"
              style={{
                backgroundImage: `url(${profilePicture})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                cursor: "pointer",
                height: "70px",
                width: "70px",
              }}
              onClick={() => handleImageClick(index)}
            ></div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="poste-popup">
          <h3>{AssignmentData[currentPostIndex].title}</h3>
          {/* Render the content fetched from the API */}
          <div className="poste-content">
            <p>{AssignmentData[currentPostIndex].description}</p>
            {AssignmentData[currentPostIndex].content}
          </div>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
}
