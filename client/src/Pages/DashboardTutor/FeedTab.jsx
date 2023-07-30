import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./feedtab.css";
import profilePicture from "./profile~1.jpg";

export default function FeedTab() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [posteData, setPosteData] = useState({});
  const [comment, setComment] = useState("");

  const handleImageClick = () => {
    fetchPosteData();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    console.log("Submitted comment:", comment);
    handleClosePopup();
  };

  const fetchPosteData = () => {
    fetch("http://localhost:3001/postelist")
      .then((response) => response.json())
      .then((data) => setPosteData(data))
      .catch((error) => console.error("Error fetching poste data:", error));
  };

  useEffect(() => {
    fetchPosteData();
  }, []);

  return (
    <div>
      <div>
        <h2>Welcome back, firstname</h2>
        <div className="poste-bin">
          <div
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
            onClick={handleImageClick}
          ></div>
        </div>
      </div>

      {showPopup && (
        <div className="poste-popup">
          <h3>Title of the Popup</h3>
          {/* Render the content fetched from the API */}
          <div className="poste-content">{posteData.content}</div>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Enter your answer here..."
          ></textarea>
          <button onClick={handleClosePopup}>Close</button>
          <button onClick={handleCommentSubmit}>Answer</button>
        </div>
      )}
    </div>
  );
}
