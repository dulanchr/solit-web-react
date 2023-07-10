import React from 'react';
import './courseslink.css';
import CourseContainer from '../Courses/CourseContainer';

export default function CoursesLink() {
  return (
          <div className='courselink'>
            <div className='caption1'>
            <h1>Browse our online courses</h1>
          </div>   
          <div className="containercr2">
            <CourseContainer />
          </div>
          <div className="btncr3">
          <a href="/courses" className="tp-btn2 br-10">
            <span>Visit More Courses ➔</span>
            <div className="transition"></div>
          </a>
          </div>
    </div>
  );
}
