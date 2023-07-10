import './navbar.css'
import solitlogo from './img/logowhite.png';

function NavBar() {
  var scrollTimeout;

window.addEventListener("scroll", function() {
  clearTimeout(scrollTimeout);
  
  var navbg = document.querySelector(".navbg");
  var scrolled = window.scrollY > 0;
  
  if (scrolled) {
    navbg.classList.add("scrolled");
  } else {
    scrollTimeout = setTimeout(function() {
      navbg.classList.remove("scrolled");
    }, 200); // Delay removal of .scrolled class by 300ms
  }
});

  
  return (
      <>
      <nav className='navbg'>.</nav>
       <nav className="navbar">
        <div className="logo">
          <img src={solitlogo} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/classes">Classes</a></li>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/aboutus">About us</a></li>
        </ul>
        <a className="btn" href="/login">CORE</a>

      </nav>     
      
      </>

  );
}

export default NavBar;