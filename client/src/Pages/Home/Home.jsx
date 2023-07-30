import React from "react";
import "./home.css";
import mainimage from "../images/student03.png";

import bookshape from "../images/book-shape.png";
import circleshape from "../images/circle-shape.png";
import dotsshape from "../images/role-shape-2.png";
import lineshape from "../images/line-shape.png";
import linesshape from "../images/lines-shape.png";
import roleshape from "../images/role-shape.png";
import AboutCoreLink from "./AboutCoreLink";
import CoreComments from "./CoreComments";
import CoursesLink from "./CoursesLink";
import ClassesLink from "../Classes/ClassContainer";
import ClassContainer from "../Classes/ClassContainer";
import ClassConntainerLink from "./ClassContainerLink";
import TeacherContainer from "../Classes/TeacherContainer";
import Footer from "../../components/Footer";

export default function Head(props) {
  return (
    <>
      <div className="tp-hero__section pt-130 theme-bg p-relative fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="tp-hero__content pt-200">
                <span className="tp-hero__subtitle text-white mb-10"></span>
                <h3 className="tp-hero__title text-white mb-15">
                  SOLIT සමගින් ඉගෙනීමේ නව ක්‍රමයක් සොයා යන්න.
                </h3>
                <p className="text-white mb-45">
                  Presenting Academy, the tech school of the future.
                </p>
                <div className="tp-hero__btn-wrappper d-md-flex align-items-center">
                  <div className="hero-btn-1 mr-20 p-relative z-index-1">
                    <a href="/courses" className="tp-btn br-10">
                      <span>Explore Courses ➔</span>
                      <div className="transition"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="tp-hero__img">
                <img src={mainimage} width={500} alt="hero" />
              </div>
            </div>
          </div>
        </div>
        <div className="tp-hero__shapes">
          <div className="tp-hero__shapes-1">
            <img src={linesshape} width={40} alt="hero" />
          </div>
          {/* <div className="tp-hero__shapes-2">
            <img src={circleshape} width={30} alt="hero" />
          </div> */}
          <div className="tp-hero__shapes-3">
            <img src={dotsshape} width={30} alt="hero" />
          </div>
          <div className="tp-hero__shapes-4">
            <img src={lineshape} width={1000} alt="hero" />
          </div>
          <div className="tp-hero__shapes-5">
            <img src={bookshape} width={50} alt="hero" />
          </div>
          <div className="tp-hero__shapes-6">
            <img src={roleshape} width={30} alt="hero" />
          </div>
        </div>
      </div>
      <div className="blokken">
        <h1>SOLIT institute of higher education</h1>
        <p>
          "During the vibrant autumn season, the leaves transform into a
          mesmerizing tapestry of colors. Shades of crimson, gold, and orange
          paint the landscape, creating a breathtaking sight. The crisp air
          carries the scent of fallen leaves, while the gentle breeze rustles
          through the trees. It's a time of change and transition, as nature
          prepares for the winter ahead. The days grow shorter, and the nights
          become cooler, reminding us of the fleeting nature of time. As we
          embrace this season of transformation, we find solace in the beauty of
          nature and the cyclical rhythm of life.
        </p>
      </div>
      <ClassConntainerLink />
      <AboutCoreLink />
      {/* <CoreComments/> */}
      <CoursesLink />
      <TeacherContainer />

      <div>
        <Footer />
      </div>
    </>
  );
}
