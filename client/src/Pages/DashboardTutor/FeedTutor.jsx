import React, { useState } from 'react';
import './feedtutor.css';
import AssignmentsTab from './AssignmentsTab';
import CoursesTab from './CoursesTab';
import StudentsTab from './StudentsTab';
import logocore from '../images/logo-core-c.png';

const FeedTab = () => (
  <div>
    <h2>Welcome to the Feed!</h2>
    <p>This is the Feed content.</p>
  </div>
);

export default function FeedTutor() {
  const [activeTab, setActiveTab] = useState('feed');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedTab />;
      case 'assignments':
        return <AssignmentsTab />;
      case 'courses':
        return <CoursesTab />;
      case 'students':
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
            <img src={logocore} width={160} alt="logocore" style={{ marginLeft: '.5vw' }} />
          </div>
          <ul className="dash-nav">
            <li>
              <a href="#" className={`dash-nav-item ${activeTab === 'feed' ? 'active' : ''}`} onClick={() => handleTabClick('feed')}>
                Feed
              </a>
            </li>
            <li>
              <a href="#" className={`dash-nav-item ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => handleTabClick('assignments')}>
                Assignments
              </a>
            </li>
            <li>
              <a href="#" className={`dash-nav-item ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => handleTabClick('courses')}>
                Courses
              </a>
            </li>
            <li>
              <a href="#" className={`dash-nav-item ${activeTab === 'students' ? 'active' : ''}`} onClick={() => handleTabClick('students')}>
                Students
              </a>
            </li>
          </ul>
        </div>
        <div className="dash-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
