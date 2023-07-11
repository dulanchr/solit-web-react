import React, { useEffect, useState } from "react";
import './coursecontainer.css';
import axios from "axios";
import courseimg from './img/course-sci.jpg';

export default function CourseContainer() {
  const [CourseData, setCourseData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/coursecard").then((response) => {
      setCourseData(response.data);
    });
  }, []);

  const getCategroyColor = (category) => {
    switch (category) {
      case 'Mathematics':
        return '#C7EEFF';
      case 'Combined Mathematics':
        return '#FFEBBC';
      case 'O/L Science':
        return '#7FDA89';
      case 'ICT':
        return '#F8B739';
      default:
        return '#e96d71'; // Default color if category not found
    }
  };

  return (
    <div className="tp-courses__tab-content">
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
          <div className="row">
            {CourseData.map((course, index) => (
              <div className="col-lg-4 col-md-6 tp-courses__item mb-30" key={index}>
                <div className="tp-courses__thumb w-img fix p-relative">
                
                  <img src={courseimg} width={400} alt="coursethumb" />
                  <span className="tp-courses__cat" style={{ backgroundColor: getCategroyColor(course.category) }}>
                    <a href="./courses">{course.category}</a>
                  </span>
                </div>
                <div className="tp-courses__content">
                  <div className="tp-courses__meta">
                    <span className="tp-ratting">
                      <i className="icon_star_alt"></i> {course.rating}
                    </span>
                    <span>
                      <i className="icon_heart_alt"></i>
                      {course.likes}
                    </span>
                    <span>
                      <i className="fa-light fa-user"></i>325
                    </span>
                  </div>
                  <h3 className="tp-courses__title">
                    <a href="course-details.html">{course.title}</a>
                  </h3>
                  <div className="tp-courses__avata">
                    <span>
                      <a href="#">by {course.instructor}</a>
                    </span>
                  </div>
                  <div className="tp-courses__price d-flex justify-content-between">
                    <div className="tp-courses__time">
                      <span>
                        <i className="fa-light fa-clock"></i>
                        {course.episodes} Episodes
                      </span>
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
