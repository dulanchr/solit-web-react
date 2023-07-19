import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login'
import Courses from '../Pages/Courses/Courses'
import Classes from '../Pages//Classes/Classes'
import Aboutus from '../Pages/Aboutus'
import Core from '../Pages/Core'
import SignUp from '../Pages/SignUp/Signup'

import Courses2 from '../Pages/Courses/Courses2'
import Pay from '../Pages/Pay/Pay'
import FeedTutor from '../Pages/DashboardTutor/FeedTutor'
import FeedStudent from '../Pages/DashboardStudent/FeedStudent'
export default function 


() {
  return (
    <div>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/classes" element={<Classes/>}></Route>
        <Route path="/courses" element={<Courses/>}></Route>
        <Route path="/signupforcourses" element={<Courses2/>}></Route>
        <Route path="/aboutus" element={<Aboutus/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/core" element={<Core/>}></Route>
        <Route path="/pay" element={<Pay/>}></Route>


        <Route path="/feedtutor" element={<FeedTutor/>}></Route>
        <Route path="/feedstudent" element={<FeedStudent/>}></Route>
        


      </Routes>
    </Router>
  </div>
  )
}
