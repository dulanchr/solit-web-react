import React from 'react'
import './footer.css'


export default function Footer() {
  return (
    <div>
        
    <footer>
      <div class="footer__area grey-bg">
         <div class="containerf">
            <div class="footer__top">
               <div class="row">
                  <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
                     <div class="footer__widget mb-50 footer-col-1">
                        <div class="footer__widget-logo mb-30">
                          <a href="index.html"><img src="assets/img/logo/logo.png" alt=""/></a>
                        </div>
                        <div class="footer__widget-content">
                           <p>SOLIT Education (Pvt) Ltd</p>
                           <p>Number 88/7, Badalgama Rd,</p>
                           <p>Hunumulla,Sri Lanka.</p>
                        </div>
                     </div>
                  </div>
                  <div class="col-xxl-2 col-xl-2 col-lg-3 col-6">
                     <div class="footer__widget mb-50 footer-col-2">
                        <h3 class="footer__widget-title">Information</h3>
                        <div class="footer__widget-content">
                           <ul>
                              <li><a href="/aboutus">About Us</a></li>
                              <li><a href="/classes">Classes</a></li>
                              <li><a href="/courses">Teachers</a></li>
                              <li><a href="/courses">Events</a></li>
                              <li><a href="/courses">Policies</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div class="col-xxl-3 col-xl-3 col-lg-3 col-6">
                     <div class="footer__widget mb-50 footer-col-3">
                        <h3 class="footer__widget-title">Online Courses</h3>
                        <div class="footer__widget-content">
                           <ul>
                              <li><a href="/courses">O/L Mathematics</a></li>
                              <li><a href="/courses">Combined Mathematics</a></li>
                              <li><a href="/courses">O/L Science</a></li>
                              <li><a href="/courses">Information Technology</a></li>
                              <li><a href="/courses">Tutorials</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  <div class="col-xxl-4 col-xl-4 col-lg-3 col-md-6">
                     <div class="footer__widget mb-50 footer-col-4">
                        <h3 class="footer__widget-title">Sign Up for Our Newsletter</h3>
                        <div class="footer__widget-content">
                           <div class="footer__subscribe">
                              <p>Receive weekly newsletter with educational,</p>
                              <p>popular books and much more!</p>
                              <form action="#">
                                 <div class="footer__subscribe-box">
                                    <div class="footer__subscribe-input">
                                       <input type="email" placeholder="Email address"/>
                                    </div>
                                    <button class="footer-sub-btn" type="submit">Subscribe</button>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="footer__bottom">
               <div class="row">
                  <div class="col-12">
                     <div class="footer__copyright text-center">
                        <p> © 2022 solit.edu, All Rights Reserved. Designed By <a href="https://www.behance.net/dulanchathuranga" target="_blank">dcmagic</a></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </footer>


    </div>
  )
}
