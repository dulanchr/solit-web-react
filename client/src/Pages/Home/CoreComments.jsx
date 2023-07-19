import React, { useState, useEffect } from 'react';
import './corecomments.css';
import { Carousel } from '3d-react-carousal';
import leftArrow from '../images/left-arrow.png';
import rightArrow from '../images/right-arrow.png';

const CoreComments = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Fetch data from the API (replace 'http://localhost:3001' with your actual API URL)
    fetch('http://localhost:3001/reviewcard')
      .then((response) => response.json())
      .then((data) => setSlides(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='carouselcards'>
      <h1>Ask from the best of the CORE, in this term.</h1>

      <Carousel
        slides={slides.map((slide, index) => (
          <div key={index}>
            <div className="slide-content">
              <img src={slide.image} alt={`Slide ${index + 1}`} />
              <div className="slide-para">
                <p>{slide.reviewtext}</p>
                <h3>{slide.Student.firstname} {slide.Student.lastname}</h3>
                <span>
                  {slide.Student.Classes.map((classItem, classIndex) => (
                    <React.Fragment key={classIndex}>
                      {classIndex === 0 ? `${classItem.className}, Grade ${classItem.grade}` : `, ${classItem.className}`}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>
        ))}
        autoplay={false}
        interval={9000}
        showArrows={true}
        arrowLeft={<img src={leftArrow} alt="Left Arrow" />}
        arrowRight={<img src={rightArrow} alt="Right Arrow" />}
      />
    </div>
  );
};

export default CoreComments;
