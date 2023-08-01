import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import profilePicture from "../DashboardTutor/defaultbg.jpg"; // Import profilePicture here
import "../DashboardTutor//feedtab.css";
import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Use destructuring to impor

export default function FeedGridStudent() {
  const { id } = useParams();
  const [imageurl, setImageUrl] = useState({});
  const [AssignmentData, setAssignmentData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [comment, setComment] = useState("");
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/gettutorid/poste`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAssignmentData(data);
        }
      })
      .catch((error) => console.error("Error fetching tutor data:", error));
  }, [id]);

  const handleImageClick = (index) => {
    setCurrentPostIndex(index);
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    const popupElement = document.querySelector(".poste-popup");
    popupElement.style.opacity = 0;

    setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    console.log("Submitted comment:", comment);

    const currentAssignment = AssignmentData[currentPostIndex];
    const postAnswer = {
      contentpdf: "path/to/content.pdf",
      reply: comment,
      agrees: "0",
      questionId: currentAssignment.questionId,
      assignmentId: currentAssignment.assignmentId,
      userId: id,
    };

    fetch("http://localhost:3001/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postAnswer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully posted data:", data);
        handleClosePopup();
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  const retrieveImagesForAllUsers = async () => {
    try {
      const teacherIds = AssignmentData.map((assignment) => assignment.userId);
      const imageUrls = {};

      await Promise.all(
        teacherIds.map(async (id) => {
          const storageRef = ref(storage, `ProfilePictures/${id}`);
          try {
            const res = await listAll(storageRef);
            if (res.items.length > 0) {
              // Fetch only the first image URL
              const url = await getDownloadURL(res.items[0]);
              imageUrls[id] = url;
            } else {
              imageUrls[id] = null; // No image found for this user
            }
          } catch (error) {
            console.log(error);
            imageUrls[id] = null; // Error fetching the image URL
          }
        })
      );

      setImageUrl(imageUrls);
      console.log(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveImagesForAllUsers();
  }, [AssignmentData]);

  return (
    <div>
      <div className="poste-bin">
        {AssignmentData.map((assignment, index) => (
          <div
            key={index}
            className="poste"
            style={{
              backgroundImage: `url(${
                imageurl[assignment.userId] || profilePicture
              })`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              cursor: "pointer",
              height: "70px",
              width: "70px",
              border:
                AssignmentData[currentPostIndex].type === "assignment"
                  ? "3px solid yellow"
                  : "none",
            }}
            onClick={() => handleImageClick(index)}
          ></div>
        ))}
      </div>
      {showPopup && (
        <div className={`poste-popup ${showPopup ? "show" : ""}`}>
          <h3>{AssignmentData[currentPostIndex].title} </h3>
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
