import React, { useEffect, useState } from "react";
import "./coursecontainer.css";
import axios from "axios";
import courseimg from "./img/course-sci.jpg";
import { useNavigate } from "react-router-dom";

export default function CourseContainer() {
  let navigate = useNavigate();
  const [CourseData, setCourseData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/coursecard").then((response) => {
      setCourseData(response.data);
    });
  }, []);

  const getCategroyColor = (category) => {
    switch (category) {
      case "Mathematics":
        return "#C7EEFF";
      case "Combined Mathematics":
        return "#FFEBBC";
      case "O/L Science":
        return "#7FDA89";
      case "ICT":
        return "#F8B739";
      default:
        return "#e96d71";
    }
  };

  return (
    <div className="tp-courses__tab-content">
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-all"
          role="tabpanel"
          aria-labelledby="pills-all-tab"
        >
          <div className="row">
            {CourseData.map((course, index) => (
              <div
                className="col-lg-4 col-md-6 tp-courses__item mb-30"
                key={index}
                onClick={() => {
                  navigate(`/coursecontent/${course.courseId}`);
                }}
              >
                <div className="tp-courses__thumb w-img fix p-relative">
                  <img src={courseimg} width={400} alt="coursethumb" />
                  <span
                    className="tp-courses__cat"
                    style={{
                      backgroundColor: getCategroyColor(course.category),
                    }}
                  >
                    {/* Remove the anchor tag from the category */}
                    {course.category}
                  </span>
                </div>
                <div className="tp-courses__content">
                  <div className="tp-courses__meta">
                    <span className="tp-ratting">
                      <i className="icon_star_alt"></i> {course.rating}
                    </span>
                  </div>
                  {/* Change the anchor tag to navigate to "/coursecontent" */}
                  <h3
                    className="tp-courses__title"
                    onClick={() =>
                      navigate(`/coursecontent/${course.courseId}`)
                    }
                  >
                    {course.title}
                  </h3>
                  <div className="tp-courses__avata">
                    <span>
                      <a href="#">
                        by{" "}
                        {course.tutor
                          ? course.tutor.firstname + " " + course.tutor.lastname
                          : "Unknown"}
                      </a>
                    </span>
                  </div>
                  <div className="tp-courses__price d-flex justify-content-between">
                    <div className="tp-courses__time">
                      <span>{course.episodes} Episodes</span>
                    </div>
                    <div className="tp-courses__value">
                      <span>Rs. {course.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
