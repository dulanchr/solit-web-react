import React from 'react'
import './teachercontainer.css'

import PropTypes from 'prop-types';
import mainprofile from '../images/profilemain.jpg';

export default function TeacherContainer() {

  const teachers = [
    {
      firstName: 'Prabhath',
      lastName: 'Chathuranga',
      class: 'Mathematics, Ordinary Level',
      image: mainprofile,
    },
    {
      firstName: 'Teacher 2',
      lastName: 'LastName2',
      class: 'Subject2, Class2',
      image: mainprofile,
    },
    {
      firstName: 'Teacher 3',
      lastName: 'LastName3',
      class: 'Subject3, Class3',
      image: mainprofile,
    },
    {
      firstName: 'Teacher 4',
      lastName: 'LastName4',
      class: 'Subject4, Class4',
      image: mainprofile,
    },
    // Add more teacher objects as needed
  ];
  return (
    <>
      <div className='caption1'>
        <h1>Meet our teachers!</h1>
      </div>

      <div className='containercards'>
        {teachers.map((teacher, index) => (
          <div className="container" key={index}>
            <div className="card_boxteacher">
              <img src={teacher.image} alt="Card Image" />
              <div className="card_content">
                <h3>{`${teacher.firstName} ${teacher.lastName}`}</h3>
                <p>{teacher.class}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>  
    )
}
