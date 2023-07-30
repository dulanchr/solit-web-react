import React, { useEffect, useState } from "react";
import "./coursecontainer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default function CourseContainer() {
  let navigate = useNavigate();
  const [CourseData, setCourseData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/coursecard").then((response) => {
      setCourseData(response.data);
      retrieveImages(response.data);
    });
  }, []);

  const retrieveImages = async (courses) => {
    try {
      const urlsPromises = courses.map(async (course) => {
        const storageRef = ref(storage, `CourseThumbs/${course.courseId}`);
        try {
          const res = await listAll(storageRef);
          const urls = await Promise.all(
            res.items.map(async (itemRef) => {
              try {
                const url = await getDownloadURL(itemRef);
                return url;
              } catch (error) {
                console.log(error);
                return null;
              }
            })
          );
          return { id: course.courseId, urls };
        } catch (error) {
          console.log(error);
          return null;
        }
      });

      const urlsData = await Promise.all(urlsPromises);
      const imageUrlsObject = urlsData.reduce((acc, curr) => {
        if (curr) {
          acc[curr.id] = curr.urls;
        }
        return acc;
      }, {});
      setImageUrls(imageUrlsObject);
    } catch (error) {
      console.log(error);
    }
  };

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
                  {imageUrls[course.courseId] &&
                    imageUrls[course.courseId][0] && (
                      <img
                        src={imageUrls[course.courseId][0]}
                        width={400}
                        alt="coursethumb"
                      />
                    )}
                  <span
                    className="tp-courses__cat"
                    style={{
                      backgroundColor: getCategroyColor(course.category),
                    }}
                  >
                    {course.category}
                  </span>
                </div>
                <div className="tp-courses__content">
                  <div className="tp-courses__meta">
                    <span className="tp-ratting">
                      <i className="icon_star_alt"></i> {course.rating}
                    </span>
                  </div>
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
