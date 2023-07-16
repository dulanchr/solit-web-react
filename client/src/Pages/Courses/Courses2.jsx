import React from 'react';
import './courses.css'
import CourseContainer from './CourseContainer';
import Footer from '../../components/Footer';
export default function Courses2() {
  return (
        <><div className='navbgc'><p>.</p></div>

        <div className='PageTitle'>
        <h1>By buying one of our online courses, you can be a member in CORE</h1>
        </div>
        <div className="containercr">
        <CourseContainer/>
        </div>
        <div>
      <Footer/>
   </div>
        
        </>
  );
}