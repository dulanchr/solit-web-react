import React, { useEffect, useState } from "react";
import "../DashboardTutor/feedtutor.css";
import AssignmentsTab from "../DashboardTutor/AssignmentsTab";
import CoursesTab from "../DashboardTutor/CoursesTab";
import StudentsTab from "../DashboardTutor/StudentsTab";
import logocore from "../images/logo-core-c.png";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FeedTab = () => (
  <div>
    <h2>Welcome to the Feed!</h2>
    <p>This is the Feed content.</p>
  </div>
);

export default function FeedStudent() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("feed");
  const [userData, setUserData] = useState(null);

  // Assuming you have the userId available in the component
  const userId = id; // Replace this with the actual user ID

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/byId/${userId}`) // Fetch user data by id
      .then((response) => {
        setUserData(response.data);
        setActiveTab("feed"); // Set the activeTab to 'feed' by default
      })
      .catch((error) => {
        console.error("Error fetching user content:", error);
      });
  }, [userId]);
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
                Feed
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
                Assignments
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
                Courses
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
                Students
              </a>
            </li>
          </ul>
        </div>
        <div className="dash-content">{renderContent()}</div>
      </div>
    </div>
  );
}
