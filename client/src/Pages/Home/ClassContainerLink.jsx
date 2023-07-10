import React from 'react';
import './classcontainerlink.css';

import ClassContainer from '../Classes/ClassContainer';

export default function ClassConntainerLink() {
  return (
    <div className='classlink'>
        <div className='caption1'>
        <h1>Classes by SOLIT</h1>
      </div>   
          <div className="containercr3">
            <ClassContainer />
          </div>

          <div className="btncr3">
          <a href="/classes" className="tp-btn2 br-10">
          <span>See More Classes ➔</span>
          <div className="transition"></div>
          </a>
            
          </div>
    </div>

  );
}
