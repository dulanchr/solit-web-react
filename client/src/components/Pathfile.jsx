import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login'
import Courses from '../Pages/Courses/Courses'
import Classes from '../Pages//Classes/Classes'
import Aboutus from '../Pages/Aboutus'
import Core from '../Pages/Core'
import SignUp from '../Pages/SignUp/Signup'
import Pay from '../Pages/SignUp/Pay'
export default function 


() {
  return (
    <div>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/classes" element={<Classes/>}></Route>
        <Route path="/courses" element={<Courses/>}></Route>
        <Route path="/aboutus" element={<Aboutus/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/core" element={<Core/>}></Route>
        <Route path="/pay" element={<Pay/>}></Route>


      </Routes>
    </Router>
  </div>
  )
}
