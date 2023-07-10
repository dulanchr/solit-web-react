import React from 'react';
import './corecomments.css';
import { Carousel } from '3d-react-carousal';
import image1 from '../images/profile.jpg';
import image2 from '../images/profile~2.jpg';
import image3 from '../images/profile~3.jpg';
import image4 from '../images/profile~4.jpg';
import image5 from '../images/profile~5.jpg';

import leftArrow from '../images/left-arrow.png';
import rightArrow from '../images/right-arrow.png';



const CoreComments = () => {

  let slides = [
    {
      image: image1,
      paragraph: 'Lorem ipsum dolor sitr adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      title: 'Goodwin Matthews',
      subtitle: 'Mathematics, Grade 10',
      width: '10px',
    },
    {
      image: image2,
      title: 'Goodwin Matthews',
      subtitle: 'Mathematics, Grade 10',
      paragraph: 'Lorem ipsum dolor sitr adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor ipiscing elit.',
      width: '100px',
    },
    {
      image: image3,
      title: 'Goodwin Matthews',
      subtitle: 'Mathematics, Grade 10',
      paragraph: 'Lorem ipsum dolor sitr adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ip\it.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      width: '100px',
    },
    {
      image: image4,
      title: 'Goodwin Matthews',
      subtitle: 'Mathematics, Grade 10',
      paragraph: 'Lorem ipsum dolor sitr adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectrem ipsum dolor sit amet, consectetur adipiscing elit.',
      width: '100px',
    },
    {
      image: image5,
      title: 'Goodwin Matthews',
      subtitle: 'Mathematics, Grade 10',
      paragraph: 'Proin id commodo leo. Aenean ultrices vestibulum est, ac sollicitudin nisl consequat sed.',
      width: '100px',
    },
  ];


  return (

    <div className='carouselcards'>
    <h1>Ask from the best of the CORE, </h1> <h1>  in this term.</h1> <h1></h1>

    
    <Carousel
        slides={slides.map((slide, index) => (
          <div key={index}>
            <div className="slide-content">
              <img src={slide.image} alt={`Slide ${index + 1}`} />
              <div className="slide-para">
                <p>{slide.paragraph}</p>
                <h3>{slide.title}</h3>
                <span>{slide.subtitle}</span>
              </div>
            </div>
          </div>
        ))}
        autoplay={false}
        interval={9000}
      />
      </div>
  );
};

export default CoreComments;
