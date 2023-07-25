import React, { useState, useEffect } from "react";
import "./teachercontainer.css";
import PropTypes from "prop-types";
import axios from "axios";
import mainprofile from "../images/profilemain.jpg";
import { useNavigate } from "react-router-dom";

import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function TeacherContainer() {
  let navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("http://localhost:3001/tutor")
      .then((response) => {
        // Update the state with the retrieved data
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="caption1">
        <h1>Meet our teachers!</h1>
      </div>

      <div className="containercards">
        {teachers.map((teacher, index) => (
          <div
            className="container"
            key={index}
            onClick={() => {
              navigate(`/teachercontent/${teacher.tutorId}`);
            }}
          >
            <div className="card_boxteacher">
              <img src={teacher.image || mainprofile} alt="Card Image" />
              <div className="card_content">
                <h3>{`${teacher.firstname} ${teacher.lastname}`}</h3>
                <p>{teacher.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
