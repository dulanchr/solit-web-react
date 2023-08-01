import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logocore from "../images/logo-core-c.png";
import axios from "axios";
import FeedTabStudent from "./FeedTabStudent";
import StudentAssignmentsTab from "./StudentAssignmentsTab";
import MyProgress from "./MyProgress";
import QuestionsTab from "./QuestionsTab";

export default function FeedStudent() {
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
        return <FeedTabStudent />;
      case "myprogress":
        return <MyProgress />;
      case "questions":
        return <QuestionsTab />;
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
                  activeTab === "students" ? "active" : ""
                }`}
                onClick={() => handleTabClick("myprogress")}
              >
                <i class="fi fi-rr-chart-histogram"></i>Myself
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`dash-nav-item ${
                  activeTab === "questions" ? "active" : ""
                }`}
                onClick={() => handleTabClick("questions")}
              >
                <i class="fi fi-rr-chart-histogram"></i>Questions
              </a>
            </li>
          </ul>
        </div>
        <div className="dash-content">{renderContent()}</div>
      </div>
    </div>
  );
}
