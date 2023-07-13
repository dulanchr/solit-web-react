import React from 'react';
import './aboutus.css';
import banner from './images/banneraboutus.png';


const AboutUs = () => {
  return (
    <>
      <div className='navbgc'>
        <p>.</p>
      </div>
      <div className="about-us">
      <h2>Welcome to </h2>
      </div>
      <div className="mission-section">
      
        <h1>SOLIT Institute of Higher Education</h1>
      </div>
      
      <div className='containercards2'>
        <div className="card">
          <div className="header">
            <div className="image">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path>
                </g>
              </svg>
            </div>
            <div className="content">
              <span className="title">Best Quality Graduate</span>
              <p className="message">Education also refers to the knowledge received through schooling instruction and to the institution of teaching as a whole. The main purpose of education is the integral development of a person</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="header">
            <div className="image">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path>
                </g>
              </svg>
            </div>
            <div className="content">
              <span className="title">Accredited Campus</span>
              <p className="message">Education also refers to the knowledge received through schooling instruction and to the institution of teaching as a whole. The main purpose of education is the integral development of a person</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="header">
            <div className="image">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path>
                </g>
              </svg>
            </div>
            <div className="content">
              <span className="title">Inspiring Student Life</span>
              <p className="message">Education also refers to the knowledge received through schooling instruction and to the institution of teaching as a whole. The main purpose of education is the integral development of a person</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className='containercards4'>
      
        <div className='containercards4'>
          <div class="card-container2">
            <div class="card2">
              <div class="img-content2">
              <img src={banner} width={1700} alt="aboutdescription" />
              </div>
              <div class="content2">
                <p class="heading2">Online Courses by SOLIT</p>
                <div className="content2para2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipii
                  voluptas ten mollitia pariatur odit, ab
                  minus ratione adipisci accusamus vel est excepturi laboriosam magnam
                  necessitatibus dignissimos molestias.
                  
                  Lorem ipsum dolor sit amet, consectetur adipii
                  voluptas ten mollitia pariatur odit, ab
                  minus ratione adipisci accusamus vel est excepturi laboriosam magnam
                  necessitatibus dignissimos molestias.

                  Lorem ipsum dolor sit amet, consectetur adipii
                  voluptas
                  
                </p>

                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="mission-section">
      
        <h2>Contact us, book your class!</h2>


        <div className='containercards3'>
        



        <div className="card2">
          <div className="header">
            
            <div className="content">
              <span className="title2">SOLIT, Hunumulla Classes</span>
              <p className="message2">Contact - 0768080352</p>
              <p className="message2">Maradagahamula Rd,</p>
              <p className="message2">Hunumulla</p>
              <p className="message2">Sri Lanka.</p>
            </div>
          </div>
        </div>


        <div className="card2">
          <div className="header">
            
            <div className="content">
              <span className="title2">SOLIT, Diulapitiya Classes</span>
              <p className="message2">Contact - 0768080352</p>
              <p className="message2">Negombo Rd,</p>
              <p className="message2">Diulapitiya</p>
              <p className="message2">Sri Lanka.</p>
            </div>
          </div>
        </div>


        
        </div>


      </div>



      <div className='containercards4'>
      
      <div className='containercards4'>
        <div class="card-container2">

        <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d730.6496583416051!2d79.99823296020249!3d7.247034859988332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x3ae2e6af63046707%3A0x6cf668d9919ebac9!2sB271!3m2!1d7.247001699999999!2d79.99804309999999!5e0!3m2!1sen!2slk!4v1689193780816!5m2!1sen!2slk" width="100%" height="400" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


        </div>

        <div class="card-container2">

       <span>.</span>


        </div>
      </div>
    </div>

      
    </>
  );
};

export default AboutUs;
