import React from 'react';
import PropTypes from 'prop-types';
import classimage from '../images/signupbanner~1.jpg';

import './classcontainer.css';

const ClassContainer = () => {
  const teachers = [
    {
      classname: 'Mathematics',
      classgrade: 'Grade11',
      tutorfirstname: 'Math',
      tutorlastname: 'Tutor',
      image: classimage,
    },
    

   
    
    // Add more teacher objects as needed
  ];

  return (
    <>
      

      <div className='containercards'>
        {teachers.map((teacher, index) => (
          <div className="container" key={index}>
            <div className="card_boxclass">
              <img src={teacher.image} alt="Card Imageclass" />
              <div className="card_contentclass">
                <h3>{teacher.classname}</h3>
                <p>{teacher.classgrade}</p>
                <p>by: {`${teacher.tutorfirstname} ${teacher.tutorlastname}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default ClassContainer;
