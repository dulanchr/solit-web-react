import React from "react";
import "./courses.css";
import CourseContainer from "./CourseContainer";
import Footer from "../../components/Footer";
export default function App() {
  return (
    <>
      <div className="navbgc">
        <p>.</p>
      </div>

      <div className="PageTitle">
        <h1>Buy our top selling courses</h1>
      </div>
      <div className="containercr">
        <CourseContainer />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
