import React from 'react'
import './assignments.css'
export default function Assignments() {
  return (
   <div className="assignmentcontainer">
        <div className="assignmentcard">
            <div className="assignmenttitle">
                <h1>Assignemt Title</h1>
            </div>
            <div className="assignmentsubtitle">
                <h2>Subject</h2>
                <h2>,</h2>
                <h2>Grade 10</h2>
            

            </div>
            <div className="assignmentcontent">
                <p>
                Please note that the code assumes you have the Sequelize models propePlease note that the code assumes you have the Sequelize models properly set up and imported. Adjust the path in the require statement const db = require('../path/to/your/models'); to match your file structure and provide the correct path to your Sequelize models.rly set up and imported. Adjust the path in the require statement const db = require('../path/to/your/models'); to match your file structure and provide the correct path to your Sequelize models.                </p>
            </div>

        </div>
    
   </div>
  )
}
