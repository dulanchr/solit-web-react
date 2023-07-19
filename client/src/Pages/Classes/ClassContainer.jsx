import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classimage from '../images/signupbanner~1.jpg';

import './classcontainer.css';

const ClassContainer = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:3001/classcards')
      .then((response) => {
        // Update the state with the retrieved data
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className='containercards'>
        {teachers.map((teacher, index) => (
          <div className="container" key={index}>
            <div className="card_boxclass">
              <img src={teacher.thumbnail || classimage} alt="Card Imageclass" />
              <div className="card_contentclass">
                <h3>{teacher.className}</h3>
                <p>{teacher.grade}</p>
                <p>by: {`${teacher.Tutor.firstname} ${teacher.Tutor.lastname}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClassContainer;
