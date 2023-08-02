import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import profilePicture from "./defaultbg.jpg"; // Import profilePicture here
import "./feedtab.css";
import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Use destructuring to import

export default function FeedGrid() {
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
          // Sort AssignmentData based on the updatedAt property in descending order
          const sortedData = data.slice().sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB - dateA;
          });

          setAssignmentData(sortedData);
        }
      })
      .catch((error) => console.error("Error fetching tutor data:", error));
  }, [id]);

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

  const currentAssignment = AssignmentData[currentPostIndex];

  const handleCommentSubmit = () => {
    console.log("Submitted comment:", comment);

    const postData = {
      contentpdf: "path/to/content.pdf",
      reply: comment,
      agrees: "0",
      poster: "firstname",
      questionId: currentAssignment.questionId,
      assignmentId: currentAssignment.assignmentId,
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
              imageUrls[id] = profilePicture; // Set default image if no image found for this user
            }
          } catch (error) {
            console.log(error);
            imageUrls[id] = profilePicture; // Set default image in case of error fetching the image URL
          }
        })
      );

      setImageUrl(imageUrls);
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
              backgroundImage: `url(${imageurl[assignment.userId]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              cursor: "pointer",
              height: "70px",
              width: "70px",
              border:
                assignment.type === "assignment"
                  ? "3px solid #03C988"
                  : "3px solid #ffffff",
            }}
            onClick={() => handleImageClick(index)}
          ></div>
        ))}
      </div>
      {showPopup && (
        <div className={`poste-popup ${showPopup ? "show" : ""}`}>
          <h3>{currentAssignment.title}</h3>
          <div className="poste-content">
            <p>{currentAssignment.description}</p>
            {currentAssignment.content}
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
