import React, { useState } from 'react';
import './coursestab.css';
import Assignments from './Assignments';

export default function AssignmentsTab() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    deadline: '',
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    content: '',
    deadline: '',
  });

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
      title: '',
      description: '',
      content: '',
      deadline: '',
    };

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
      const response = await fetch('http://localhost:3001/assignments', {
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

  return (
    <div className="coursecontorls">
      <h2 style={{ marginTop: '0vh', fontSize: '1rem', color: '#232323' }}>
        Add Assignments:
      </h2>
      <div className="addcourses">
        <form className="addc-form" onSubmit={handleSubmit}>
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
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the description"
            />
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
        <Assignments />
      </div>
    </div>
  );
}
