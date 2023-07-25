import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ClassContent() {
  const { id } = useParams();
  const [classContent, setClassContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/classcards/byId/${id}`)
      .then((response) => {
        setClassContent(response.data);
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

      {classContent && (
        <div className="coursecontent-page">
          <div className="coursecon-container">
            <div className="coursecon-content">
              <h2 className="coursecon-title">{classContent.className}</h2>
              {/* Access Tutor information from classContent */}
              <p>
                by:{" "}
                {`${classContent.Tutor.firstname} ${classContent.Tutor.lastname}`}
              </p>
              <p className="coursecon-description">
                at the {classContent.location}
              </p>
              <div className="coursecon-meta">
                <span className="coursecon-episodes">
                  at {classContent.time}
                </span>
                <span className="coursecon-price">
                  on every {classContent.date}'s
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
