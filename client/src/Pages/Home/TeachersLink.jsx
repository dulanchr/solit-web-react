import React from "react";
import TeacherContainer from "../Classes/TeacherContainer";
import "teacherslink.css";

export default function () {
  return (
    <div>
      <div className="teacherlink">
        <div className="caption1">
          <h1>Browse our online courses</h1>
        </div>
        <div className="containercr2">
          <TeacherContainer />
        </div>
        <div className="btncr3">
          <a href="/courses" className="tp-btn2 br-10">
            <span>Visit More Courses ➔</span>
            <div className="transition"></div>
          </a>
        </div>
      </div>
    </div>
  );
}
