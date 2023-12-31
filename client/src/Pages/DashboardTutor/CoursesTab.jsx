import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function CourseTab() {
  const { id } = useParams();
  const [tutorId, setTutorId] = useState();

  const [imageUpload, setImageUpload] = useState(null);
  const [tutorIdFromUserId, setTutorIdFromUserId] = useState(null);

  console.log("export tutorId here", { tutorId });
  const uploadImage = (courseId) => {
    if (imageUpload == null) return;

    // Use the class ID to rename the image file
    const imageRef = ref(
      storage,
      `CourseThumbs/${courseId}/${imageUpload.name}`
    );

    uploadBytes(imageRef, imageUpload)
      .then(() => {
        alert("Image Uploaded");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    episodes: "",
    price: "",
    courselink: "",
    tutorId: tutorId, // To store the selected tutor ID
    category: "",
  });

  const [CourseErrors, setCourseErrors] = useState({
    title: "",
    description: "",
    episodes: "",
    price: "",
    courselink: "",
    tutorId: tutorId, // To store the selected tutor ID
    category: "",
  });

  const [tutors, setTutors] = useState([]); // To store the tutor data fetched from the API

  useEffect(() => {
    fetch(`http://localhost:3001/gettutorid/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array and contains at least one object
        if (Array.isArray(data) && data.length > 0) {
          setTutorId(data[0].tutorId); // Access tutorId from the first object in the array
        }
      })
      .catch((error) => console.error("Error fetching tutor data:", error));
  }, [id]);

  useEffect(() => {
    console.log("export tutorid here", { tutorId });
    setCourseData((prevCourseData) => ({
      ...prevCourseData,
      tutorId: tutorId,
    }));
    setCourseErrors((prevFormErrors) => ({
      ...prevFormErrors,
      tutorId: tutorId,
    }));
  }, [tutorId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New course added:", data);

        if (data && data.courseId) {
          uploadImage(data.courseId); // Pass the courseId to the uploadImage function
        }

        setCourseData({
          title: "",
          description: "",
          episodes: "",
          price: "",
          courselink: "",
          tutorId: tutorIdFromUserId,
          category: "",
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding new course:", error);
      });
  };

  const categoryOptions = [
    "Mathematics",
    "Combined Mathematics",
    "O/L Science",
    "ICT",
  ];

  return (
    <div className="newclass-page">
      <div className="newclass-container">
        <h2>Add a new course</h2>
        <form onSubmit={handleSubmit} className="newclass-form">
          <div className="newclass-form-group">
            <label htmlFor="className">Course Title:</label>
            <input
              type="text"
              id="courseTitle"
              name="title" // Changed from "courseTitle" to "title"
              value={courseData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="newclass-form-group">
            <label htmlFor="grade">Description:</label>
            <input
              type="text"
              id="grade"
              name="description" // Changed from "grade" to "description"
              value={courseData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="newclass-form-group">
            <label htmlFor="date">Episodes:</label>
            <input
              type="text"
              id="date"
              name="episodes" // Changed from "date" to "episodes"
              value={courseData.episodes}
              onChange={handleChange}
              required
            />
          </div>
          <div className="newclass-form-group">
            <label htmlFor="time">Price:</label>
            <input
              type="text"
              id="time"
              name="price" // Changed from "time" to "price"
              value={courseData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="newclass-form-group">
            <label htmlFor="location">Course-Link:</label>
            <input
              type="text"
              id="location"
              name="courselink" // Changed from "location" to "courselink"
              value={courseData.courselink}
              onChange={handleChange}
              required
            />
          </div>
          <div className="newclass-form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="newclass-form-group">
            <label htmlFor="tutorId">Tutor:</label>
            <select
              id="tutorId"
              name="tutorId"
              value={courseData.tutorId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a tutor
              </option>
              {tutors.map((tutor) => (
                <option key={tutor.tutorId} value={tutor.tutorId}>
                  {tutor.firstname} {tutor.lastname}
                </option>
              ))}
            </select>
          </div> */}

          <div className="newclass-form-group">
            <label htmlFor="thumbnail">Select Course Thumbnail:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
          </div>

          <button onClick={uploadImage} className="newclass-btn">
            Add Course
          </button>
          {/* <button type="submit" className="newclass-btn">
        Add Class
      </button> */}
        </form>
      </div>
    </div>
  );
}
