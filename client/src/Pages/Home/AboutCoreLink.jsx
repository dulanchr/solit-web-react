import React from 'react'
import './aboutcorelink.css'
import laptop from '../images/laptop.png';

export default function AboutCoreLink() {
  return (
    <>       
    <div className='about-us-container'>
      <div className='about-us-image'>
        <img src={laptop} width={500} alt='hero' />
      </div>
      <div className='about-us-content'>
        <h3 className='section-title'>About CORE,</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus libero a neque molestie, a aliquet dui
          pellentesque. Mauris ac metus id est pharetra gravida...
        </p>
        <p>
          Fusce vestibulum sapien elit, et finibus lectus bibendum in. Praesent sit amet nisi id arcu vehicula
          molestie. Integer sagittis sem vitae semper aliquet. Vestibulum consectetur justo et mauris blandit lacinia.
          Nulla tincidunt iaculis eros, nec facilisis lacus tincidunt ut...
          Fusce vestibulum sapien elit, et finibus lectus bibendum in. Praesent sit amet nisi id arcu vehicula
          molestie. 
        </p>
        <div className="hero-btn-1 mr-20 p-relative z-index-1">
          <a href="/login" className="tp-btn2 br-10">
          <span>Read More ➔</span>
          <div className="transition"></div>
          </a>

        </div>
      </div>
    </div>

    </>
  )
}
