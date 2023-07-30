import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./feedtutor.css";
import AssignmentsTab from "./AssignmentsTab";
import CoursesTab from "./CoursesTab";
import StudentsTab from "./StudentsTab";
import logocore from "../images/logo-core-c.png";
import axios from "axios";
import FeedTab from "./FeedTab";

export default function FeedTutor() {
  const { id } = useParams(); // Get the id parameter from the URL
  const [activeTab, setActiveTab] = useState("feed");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/byId/${id}`) // Fetch user data by id
      .then((response) => {
        setUserData(response.data);
        setActiveTab(response.data.email); // Set the activeTab state with the email field
      })
      .catch((error) => {
        console.error("Error fetching user content:", error);
      });
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return <FeedTab />;
      case "assignments":
        return <AssignmentsTab />;
      case "courses":
        return <CoursesTab />;
      case "students":
        return <StudentsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="feed">
      <div className="dash-container">
        <div className="dash-sidebar">
          <div className="dash-logo">
            <img
              src={logocore}
              width={160}
              alt="logocore"
              style={{ marginLeft: ".5vw" }}
            />
          </div>
          <ul className="dash-nav">
            <li>
              <a
                href="#"
                className={`dash-nav-item ${
                  activeTab === "feed" ? "active" : ""
                }`}
                onClick={() => handleTabClick("feed")}
              >
                <i class="fi fi-br-apps"></i> Feed {activeTab.email}
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`dash-nav-item ${
                  activeTab === "assignments" ? "active" : ""
                }`}
                onClick={() => handleTabClick("assignments")}
              >
                <i class="fi fi-br-document"></i>Assignments
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`dash-nav-item ${
                  activeTab === "courses" ? "active" : ""
                }`}
                onClick={() => handleTabClick("courses")}
              >
                <i class="fi fi-br-bookmark"></i> Courses
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`dash-nav-item ${
                  activeTab === "students" ? "active" : ""
                }`}
                onClick={() => handleTabClick("students")}
              >
                <i class="fi fi-rr-users-alt"></i>Students
              </a>
            </li>
          </ul>
        </div>
        <div className="dash-content">{renderContent()}</div>
      </div>
    </div>
  );
}
