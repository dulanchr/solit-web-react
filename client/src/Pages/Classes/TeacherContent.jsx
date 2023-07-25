import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TeacherContent() {
  const { id } = useParams();
  const [teacherContent, setTeacherContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tutor/byId/${id}`)
      .then((response) => {
        setTeacherContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course content:", error);
      });
  }, [id]);
  return (
    <>
      <div className="navbgc">
        <p>.</p>
      </div>

      {teacherContent && (
        <div className="coursecontent-page">
          <div className="coursecon-container">
            {/* <div className="coursecon-thumbnail">
            <img src={teacherContent.thumbnail} alt="Course Thumbnail" />
          </div> */}
            <div className="coursecon-content">
              <h2 className="coursecon-title">
                {teacherContent.firstname} {teacherContent.lastname}
              </h2>
              {/* Access Tutor information from teacherContent */}
              {/* <p>
                by:{" "}
                {`${teacherContent.Tutor.firstname} ${teacherContent.Tutor.lastname}`}
              </p> */}
              <p className="coursecon-description">
                at the {teacherContent.location}
              </p>
              <div className="coursecon-meta">
                <span className="coursecon-episodes">
                  at {teacherContent.time}
                </span>
                <span className="coursecon-price">
                  on every {teacherContent.date}'s
                </span>
              </div>
              {/* <button
              className="coursecon-buy-button"
              onClick={handleBuyNowClick}
            >
              Buy Now
            </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
