import React, { useState } from 'react';
import './coursestab.css';
import CourseContainer from '../Courses/CourseContainer';

export default function CoursesTab() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    episodes: '',
    price: '',
    description: '',
    thumbnail: null,
    courselink: '',
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    category: '',
    episodes: '',
    price: '',
    description: '',
    courselink: '',
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      thumbnail: file,
    }));
  };

  const uploadThumbnail = async (thumbnailFile) => {
    if (!thumbnailFile) return null;

    const formData = new FormData();
    formData.append('thumbnail', thumbnailFile);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    const response = await fetch('http://localhost:3001/upload', requestOptions);
    const data = await response.json();

    if (response.ok) {
      return data.thumbnailUrl;
    } else {
      throw new Error('Failed to upload thumbnail');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    let hasErrors = false;
    const newFormErrors = {
      title: '',
      category: '',
      episodes: '',
      price: '',
      description: '',
      courselink: '',
    };

    if (formData.title.trim() === '') {
      newFormErrors.title = 'Required.';
      hasErrors = true;
    }

    if (formData.category.trim() === '') {
      newFormErrors.category = 'Required.';
      hasErrors = true;
    }

    if (formData.episodes.trim() === '') {
      newFormErrors.episodes = 'Required';
      hasErrors = true;
    } else if (!/^\d+$/.test(formData.episodes.trim())) {
      newFormErrors.episodes = 'Enter a valid number.';
      hasErrors = true;
    }

    if (formData.price.trim() === '') {
      newFormErrors.price = 'Required';
      hasErrors = true;
    } else if (!/^\d+$/.test(formData.price.trim())) {
      newFormErrors.price = 'Enter a valid price (integer only).';
      hasErrors = true;
    }

    if (formData.description.trim() === '') {
      newFormErrors.description = 'Required';
      hasErrors = true;
    }

    if (formData.courselink.trim() === '') {
      newFormErrors.courselink = 'Required';
      hasErrors = true;
    } else if (
      !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.courselink.trim())
    ) {
      newFormErrors.courselink = 'Enter a valid web link.';
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(newFormErrors);
      return;
    }

    const thumbnailUrl = await uploadThumbnail(formData.thumbnail);

    const courseData = {
      title: formData.title,
      category: formData.category,
      episodes: formData.episodes,
      price: formData.price,
      description: formData.description,
      thumbnail: thumbnailUrl,
      courselink: formData.courselink,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
    };

    fetch('http://localhost:3001/course', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('Data successfully submitted:', data);
        // Reset the form after submission if needed
        setFormData({
          title: '',
          category: '',
          episodes: '',
          price: '',
          description: '',
          courselink: '',
          thumbnail: null,
        });
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div className="coursecontorls">
      <h2 style={{ marginTop: '0vh', fontSize: '1rem', color: '#232323' }}>
        Add Courses:
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
              placeholder="Course Title"
            />
            {formErrors.title && (
              <span className="error">{formErrors.title}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Combined Mathematics">Combined Mathematics</option>
              <option value="O/L Science">O/L Science</option>
              <option value="ICT">ICT</option>
            </select>
            {formErrors.category && (
              <span className="error">{formErrors.category}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="episodes">Number of Episodes:</label>
            <input
              type="number"
              id="episodes"
              name="episodes"
              value={formData.episodes}
              onChange={handleChange}
              placeholder="23"
            />
            {formErrors.episodes && (
              <span className="error">{formErrors.episodes}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter the price"
            />
            {formErrors.price && (
              <span className="error">{formErrors.price}</span>
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
            <label htmlFor="courselink">Course Link:</label>
            <input
              type="text"
              id="courselink"
              name="courselink"
              value={formData.courselink}
              onChange={handleChange}
              placeholder="Enter the course link (URL)"
            />
            {formErrors.courselink && (
              <span className="error">{formErrors.courselink}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="thumbnail">Upload Thumbnail:</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
            />
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
        My Courses:
      </h2>

      <div className="mycourses">
        <CourseContainer />
      </div>
    </div>
  );
}
