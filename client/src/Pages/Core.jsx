import React from 'react'
import './core.css'
import { useParams } from 'react-router-dom';
export default function Core() {
  let { userid } = useParams();
  return (
    <div className='coree'>
      {userid}
      
      Core
      
      </div>
  )
}
