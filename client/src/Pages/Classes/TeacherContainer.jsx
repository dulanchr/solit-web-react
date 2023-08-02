import React, { useState, useEffect } from "react";
import "./teachercontainer.css";
import PropTypes from "prop-types";
import axios from "axios";
import mainprofile from "../images/defaultbg.jpg";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Use destructuring to import v4 as uuidv4

export default function TeacherContainer() {
  const navigate = useNavigate();
  const [imageurl, setImageUrl] = useState({}); // Changed to an object instead of an array
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachersData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tutor");
        setTeachers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeachersData();
  }, []);

  const retrieveImagesForAllTeachers = async () => {
    try {
      const teacherIds = teachers.map((teacher) => teacher.userId);
      const imageUrls = {};

      await Promise.all(
        teacherIds.map(async (id) => {
          const storageRef = ref(storage, `ProfilePictures/${id}`);
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
            imageUrls[id] = urls.filter((url) => url !== null); // Filter out null URLs
          } catch (error) {
            console.log(error);
          }
        })
      );

      setImageUrl(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveImagesForAllTeachers();
  }, [teachers]); // Call this effect whenever the 'teachers' state changes

  return (
    <>
      <div className="caption1">
        <h1>Meet our teachers!</h1>
      </div>

      <div className="containercards">
        {teachers.map((teacher) => {
          const imageid = teacher.userId;
          const cardStyle = {
            backgroundImage: `url(${
              imageurl[imageid] && imageurl[imageid][0]
                ? imageurl[imageid][0]
                : mainprofile
            })`,
          };

          return (
            <div
              className="container"
              key={uuidv4()} // Use a unique key for each teacher card
              onClick={() => {
                navigate(`/teachercontent/${teacher.tutorId}`);
              }}
            >
              <div className="card_boxteacher">
                <div style={cardStyle}>
                  {/* Display the same image as the background */}
                  <img
                    src={
                      imageurl[imageid] && imageurl[imageid][0]
                        ? imageurl[imageid][0]
                        : mainprofile
                    }
                    alt="Card Image"
                  />
                  <div className="card_content">
                    <h3>{`${teacher.firstname} ${teacher.lastname}`}</h3>
                    <p>{teacher.description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
