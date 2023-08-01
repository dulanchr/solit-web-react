import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../DashboardTutor/feedtab.css";
import profilePicture from "./profile~1.jpg";
import FeedGrid from "../DashboardTutor/FeedGrid";

import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Use destructuring to impor

export default function FeedTabStudent() {
  const { id } = useParams();
  const [tutorId, setTutorId] = useState();

  const [firstname, setFirstname] = useState();
  const [lastname, setlastname] = useState();
  const navigate = useNavigate();

  const [imageurl, setImageUrl] = useState({});
  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/getstudentid/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFirstname(data[0].firstname);
          setlastname(data[0].lastname);
          setTutorId(data[0].studentId);
        }
      })
      .catch((error) => console.error("Error fetching tutor data:", error));
  }, [id]);

  const retrieveImagesForAllUsers = async () => {
    try {
      const teacherIds = UserData.map((assignment) => assignment.userId);
      const imageUrls = {};
      await Promise.all(
        teacherIds.map(async (id) => {
          const storageRef = ref(storage, `ProfilePictures/${id}`);
          try {
            const res = await listAll(storageRef);
            if (res.items.length > 0) {
              // Fetch only the first image URL
              const url = await getDownloadURL(res.items[0]);
              imageUrls[id] = url;
            } else {
              imageUrls[id] = null; // No image found for this user
            }
          } catch (error) {
            console.log(error);
            imageUrls[id] = null; // Error fetching the image URL
          }
        })
      );

      setImageUrl(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveImagesForAllUsers();
  }, [UserData]);
  console.log("dfsdv", firstname);
  return (
    <div>
      <div>
        <div className="feedd-userinfo">
          <div className="feedd-welcomenote">
            <h1>Welcome back, {firstname}</h1>
          </div>

          <div
            className="feddprofilephoto"
            style={{
              backgroundImage: `url(${imageurl[id] || profilePicture})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
          ></div>

          <div className="feddprofileinfo">
            <h2>
              {firstname} {lastname}
            </h2>
            <h3>Student, SOLIT (Pvt) Ltd</h3>
          </div>
        </div>
        <FeedGrid />
      </div>
    </div>
  );
}
