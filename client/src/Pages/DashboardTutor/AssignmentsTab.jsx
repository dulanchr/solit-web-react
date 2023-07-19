import React, { useState, useEffect } from 'react';
import './coursestab.css';
import './assignmentstab.css';

import folder from '../images/folder.png';
import Assignmentlist from './Assignments';

export default function AssignmentsTab() {
  
  const [formData, setFormData] = useState({
    classId: '',
    title: '',
    description: '',
    content: '',
    deadline: '',
  });

  const [formErrors, setFormErrors] = useState({
    classId: '',
    title: '',
    description: '',
    content: '',
    deadline: '',
  });

  const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/class')
      .then((response) => response.json())
      .then((data) => {
        setClassOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching class options:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    let hasErrors = false;
    const newFormErrors = {
      classId: '',
      title: '',
      description: '',
      content: '',
      deadline: '',
    };

    if (formData.classId === '') {
      newFormErrors.classId = 'Required.';
      hasErrors = true;
    }

    if (formData.title.trim() === '') {
      newFormErrors.title = 'Required.';
      hasErrors = true;
    }

    if (formData.description.trim() === '') {
      newFormErrors.description = 'Required.';
      hasErrors = true;
    }

    if (formData.content.trim() === '') {
      newFormErrors.content = 'Required.';
      hasErrors = true;
    } else if (!isValidUrl(formData.content.trim())) {
      newFormErrors.content = 'Enter a valid link.';
      hasErrors = true;
    }

    if (formData.deadline.trim() === '') {
      newFormErrors.deadline = 'Required';
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(newFormErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Assignment created:', data);

        // Reset the form after submission if needed
        setFormData({
          classId: '',
          title: '',
          description: '',
          content: '',
          deadline: '',
        });
      } else {
        throw new Error('Failed to create assignment');
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const [selectedClass, setSelectedClass] = useState(null); // New state to track selected class

  const handleFolderClick = (className) => {
    setSelectedClass((prevSelectedClass) =>
      prevSelectedClass === className ? null : className
    );
  };
  return (
    <div className="coursecontorls">
      <h2 style={{ marginTop: '0vh', fontSize: '1rem', color: '#232323' }}>
        Add Assignments:
      </h2>
      <div className="addcourses">
        <form className="addc-form" onSubmit={handleSubmit}>
          <div className="addc-form-group">
            <label htmlFor="classId">Class:</label>
            <select
              id="classId"
              name="classId"
              value={formData.classId}
              onChange={handleChange}
            >
              <option value="">-- Select Class --</option>
              {classOptions.map((option) => (
                <option key={option.classId} value={option.classId}>
                  {option.className}
                </option>
              ))}
            </select>
            {formErrors.classId && (
              <span className="error">{formErrors.classId}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the title"
            />
            {formErrors.title && (
              <span className="error">{formErrors.title}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the description"
            ></textarea>
            {formErrors.description && (
              <span className="error">{formErrors.description}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter the drive link (URL)"
            />
            {formErrors.content && (
              <span className="error">{formErrors.content}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
            {formErrors.deadline && (
              <span className="error">{formErrors.deadline}</span>
            )}
          </div>
          <button type="submit" className="addc-btn">
            Add
          </button>
        </form>
      </div>
      
      
      
      <h2
        style={{
          marginTop: '2vh',
          fontSize: '1rem',
          color: '#232323',
          opacity: '0.5',
        }}
      >
        My Assignments:
      </h2>





      <div className="mycourses">
        {classOptions.map((option) => (
          <div
            key={option.classId}
            className="class-folder"
            onClick={() => handleFolderClick(option.className)}
          >
            <img src={folder} width={120} height={120} alt="logocore" />
            <h1>{option.className}</h1>
          </div>
        ))}
      </div>



      {/* Render Assignmentlist component if a class is selected */}
      {selectedClass && <Assignmentlist selectedClass={selectedClass} />}



      
    </div>


  );
}
