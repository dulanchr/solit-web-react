import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../DashboardTutor/feedtab.css";
import profilePicture from "../DashboardTutor/defaultbg.jpg";
import FeedGridStudent from "./FeedGridStudent";

import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Use destructuring to import

export default function FeedTabStudent() {
  const { id } = useParams();
  const [tutorId, setTutorId] = useState();
  const [userId, setuserId] = useState(id);

  const [firstname, setFirstname] = useState();
  const [lastname, setlastname] = useState();
  const [description, setdescription] = useState();
  const navigate = useNavigate();

  const [imageurl, setImageUrl] = useState("");

  const retrieveImagesForAllUsers = async (id) => {
    try {
      const storageRef = ref(storage, `ProfilePictures/${id}`);
      try {
        const res = await listAll(storageRef);
        if (res.items.length > 0) {
          const url = await getDownloadURL(res.items[0]);
          setImageUrl(url);
        } else {
          setImageUrl(profilePicture); // No image found for this user, set the default image
        }
      } catch (error) {
        console.log(error);
        setImageUrl(profilePicture); // Error fetching the image URL, set the default image
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/getstudentid/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFirstname(data[0].firstname);
          setlastname(data[0].lastname);
          setTutorId(data[0].tutorId);
        }
      })
      .catch((error) => console.error("Error fetching tutor data:", error));
  }, [id]);

  useEffect(() => {
    // Fetch tutor's image using the tutorId
    if (id) {
      retrieveImagesForAllUsers(id);
    }
  }, [id]);

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
              backgroundImage: `url(${imageurl})`,
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
        <FeedGridStudent />
      </div>
    </div>
  );
}
