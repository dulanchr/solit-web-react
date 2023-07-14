import React from 'react'
import './classes.css'
import ClassContainer from './ClassContainer'
import TeacherContainer from './TeacherContainer'
import Footer from '../../components/Footer'


export default function Classes() {
  return (
    <><div className='navbgc'><p>.</p></div>
    <div className='caption2'>
        <h1>Classes by SOLIT</h1>
      </div>
    <div className="containercr">
      <ClassContainer/>
      <TeacherContainer/>
    </div>
    <div>
     <Footer/>
   </div>
    
    </>
  )
}
