import React, { useEffect, useState } from "react";
import "../DashboardTutor/feedtutor.css";
import logocore from "../images/logo-core-c.png";
import NewStudentsTab from "./NewStudentsTab";
import NewTeachers from "./NewTeachers";
import NewClasses from "./NewClasses";
import FetchRequesters from "./NewStudentsTab";
import axios from "axios";

const FeedTab = () => (
  <div>
    <h2>Welcome to the Feed!</h2>
    <p>This is the Feed content.</p>
  </div>
);

export default function FeedAdmin() {
  const [activeTab, setActiveTab] = useState("feed");
  const [userData, setUserData] = useState(null);

  // Assuming you have the userId available in the component
  const userId = "ID"; // Replace this with the actual user ID

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
      case "newstudents":
        return <FetchRequesters />;
      case "newteachers":
        return <NewTeachers />;
      case "newclasses":
        return <NewClasses />;
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
              width={120}
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
                <i class="fi fi-br-apps"></i>Feed
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`dash-nav-item ${
                  activeTab === "newstudents" ? "active" : ""
                }`}
                onClick={() => handleTabClick("newstudents")}
              >
                <i class="fi fi-rr-user-add"></i>New Stdudents
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`dash-nav-item ${
                  activeTab === "newteachers" ? "active" : ""
                }`}
                onClick={() => handleTabClick("newteachers")}
              >
                <i class="fi fi-sr-user-add"></i>New Teachers
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`dash-nav-item ${
                  activeTab === "newclasses" ? "active" : ""
                }`}
                onClick={() => handleTabClick("newclasses")}
              >
                <i class="fi fi-br-add"></i>New Classes
              </a>
            </li>
          </ul>
        </div>
        <div className="dash-content">{renderContent()}</div>
      </div>
    </div>
  );
}
