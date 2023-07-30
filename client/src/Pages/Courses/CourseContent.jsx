import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./coursecontent.css";

export default function CourseContent() {
  const { id } = useParams();
  const [courseContent, setCourseContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/coursecard/byId/${id}`)
      .then((response) => {
        setCourseContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course content:", error);
      });
  }, [id]);

  if (!courseContent) {
    return <div>Loading...</div>;
  }

  // Function to handle Buy Now button click
  const handleBuyNowClick = () => {
    // Navigate to the specific payment page based on the courseId/
    navigate(`/pay/${courseContent.courseId}`);
  };

  return (
    <>
      <div className="navbgc">
        <p>.</p>
      </div>

      <div className="coursecontent-page">
        <div className="coursecon-container">
          <div className="coursecon-thumbnail">
            <img src={courseContent.thumbnail} alt="Course Thumbnail" />
          </div>
          <div className="coursecon-content">
            <h2 className="coursecon-title">{courseContent.title}</h2>
            <p className="coursecon-description">{courseContent.description}</p>
            <div className="coursecon-meta">
              <span className="coursecon-episodes">
                {courseContent.episodes} Episodes
              </span>
              <span className="coursecon-price">Rs. {courseContent.price}</span>
            </div>
            <button
              className="coursecon-buy-button"
              onClick={handleBuyNowClick}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
