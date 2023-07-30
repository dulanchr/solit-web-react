import React, { useState } from "react";
import "./postecontent.css";

export default function PosteContent() {
  const [showCommentSection, setShowCommentSection] = useState(false);

  const handleCommentButtonClick = () => {
    setShowCommentSection(!showCommentSection);
  };

  return (
    <div>
      <div className="popup-container">
        <div className="popup">
          <div className="post">
            <div className="post-header">
              <h2>Title of the Post</h2>
              {/* <img
                className="profile-picture"
                src={profilePicture}
                alt="Profile"
              /> */}
            </div>
            {/* <img className="post-content" src={profilePicture} alt="Content" /> */}
            <div className="post-buttons">
              <button onClick={handleCommentButtonClick}>Comment</button>
              <button>Back</button>
            </div>
            {showCommentSection && (
              <div className="comment-section">
                {/* Add your comment section here */}
                <textarea placeholder="Write your comment here..." />
                <button>Post Comment</button>
                {/* Add the comments list here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
