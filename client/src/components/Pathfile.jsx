import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Courses from "../Pages/Courses/Courses";
import Classes from "../Pages/Classes/Classes";
import Aboutus from "../Pages/Aboutus";
import Core from "../Pages/Core";
import SignUp from "../Pages/SignUp/Signup";
import Courses2 from "../Pages/Courses/Courses2";
import Pay from "../Pages/Pay/Pay";
import FeedTutor from "../Pages/DashboardTutor/FeedTutor";
import FeedStudent from "../Pages/DashboardStudent/FeedStudent";
import ImageUploader from "../Pages/ImageUploader";
import CourseContent from "../Pages/Courses/CourseContent";
import FeedAdmin from "../Pages/DashboardAdmin/FeedAdmin";
import ClassContent from "../Pages/Classes/ClassContent";
import TeacherContent from "../Pages/Classes/TeacherContent";
import PayStripe from "../Pages/Pay/PayStripe";
import PosteContent from "../Pages/DashboardTutor/PosteContent";

export default function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classcontent/:id" element={<ClassContent />} />
          <Route path="/teachercontent/:id" element={<TeacherContent />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/coursecontent/:id" element={<CourseContent />} />

          <Route path="/signupforcourses" element={<Courses2 />} />
          <Route path="/aboutus" element={<Aboutus />} />

          <Route path="/login" element={<Login />} />
          <Route path="/feedtutor/:id" element={<FeedTutor />} />
          <Route path="/feedstudent/:id" element={<FeedStudent />} />
          <Route path="/feedadmin/:id" element={<FeedAdmin />} />

          <Route path="/postecontent" element={<PosteContent />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/:usercode" element={<SignUp />} />

          <Route path="/core" element={<Core />} />
          <Route path="/pay/:id" element={<Pay />} />
          <Route path="/payment" element={<PayStripe />} />

          <Route path="/image" element={<ImageUploader />} />
        </Routes>
      </Router>
    </div>
  );
}
