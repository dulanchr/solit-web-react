import React, { useState } from "react";
import "../DashboardTutor/feedtutor.css";
import logocore from "../images/logo-core-c.png";
import NewStudentsTab from "./NewStudentsTab";
import NewTeachers from "./NewTeachers";
import NewClasses from "./NewClasses";
import FetchRequesters from "./NewStudentsTab";

const FeedTab = () => (
  <div>
    <h2>Welcome to the Feed!</h2>
    <p>This is the Feed content.</p>
  </div>
);

export default function FeedAdmin() {
  const [activeTab, setActiveTab] = useState("feed");

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
