import React, { useState, useEffect } from "react";
import axios from "axios";
import classimage from "../images/signupbanner~1.jpg";
import "./classcontainer.css";
import { useNavigate } from "react-router-dom";

import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
export default function ClassContainer() {
  let navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [imageurl, setImageUrl] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/classcards")
      .then((response) => {
        setTeachers(response.data);
        setId(response.data.classId);
        console.log(response.data.classId);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    retrieveImage();
  }, []);

  const retrieveImage = async (id) => {
    if (id) {
      const storageRef = ref(storage, `ClassThumbs/${id}`);
      try {
        const res = await listAll(storageRef);
        const urls = [];
        await Promise.all(
          res.items.map(async (itemRef) => {
            try {
              const url = await getDownloadURL(itemRef);
              urls.push(url);
            } catch (error) {
              console.log(error);
            }
          })
        );
        setImageUrl((prevUrls) => ({
          ...prevUrls,
          [id]: urls,
        }));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No image ID found.");
    }
  };

  return (
    <>
      <div className="containercards">
        {teachers.map((teacher) => {
          const imageid = teacher.classId;
          if (!imageurl[imageid]) {
            retrieveImage(imageid);
          }

          const cardStyle = {
            backgroundImage:
              imageurl[imageid] && imageurl[imageid][0]
                ? `url(${imageurl[imageid][0]})`
                : `url(${classimage})`,
          };

          return (
            <div
              className="container"
              key={teacher.classId}
              onClick={() => {
                navigate(`/classcontent/${teacher.classId}`);
              }}
            >
              <div className="card_boxclass" style={cardStyle}>
                <div className="card_contentclass">
                  <h3>{teacher.className}</h3>
                  <p>{teacher.grade}</p>
                  <p>{`by: ${teacher.Tutor.firstname} ${teacher.Tutor.lastname}`}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
