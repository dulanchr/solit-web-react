import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./feedtab.css";
import profilePicture from "./profile~1.jpg";

export default function FeedTabStudent() {
  const { id } = useParams();
  const [tutorId, setTutorId] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setlastname] = useState();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [AssignmentData, setAssignmentData] = useState([]);
  const [comment, setComment] = useState("");
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentPostIndex(index);
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

    const postData = {
      contentpdf: "path/to/content.pdf",
      reply: comment,
      agrees: "0",
      poster: firstname,
      assignmentId: id,
      userId: id,
    };

    fetch("http://localhost:3001/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully posted data:", data);
        handleClosePopup();
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:3001/getstudentid/user/${id}`)
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          setFirstname(data[0].firstname);
          setlastname(data[0].lastname);
          setTutorId(data[0].studentId);
        }
      })
      .catch((error) => console.error("Error fetching tutor data:", error));
    console.log("output", firstname);
  }, []);

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
        <h1>Welcome back, {firstname}</h1>
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
