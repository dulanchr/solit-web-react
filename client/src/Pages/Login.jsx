import React, { useState } from "react";
import "./login.css";
import logocore from "./images/logo-core.png";
import slogancore from "./images/slogan-core.png";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/login?email=${email}&password=${password}`
      );

      if (response.ok) {
        const { userType, user, accessToken } = await response.json();
        console.log("Received access token:", accessToken);
        localStorage.setItem("accessToken", accessToken);

        if (userType === "admin") {
          navigate(`/feedadmin/${user.userId}`); // Pass the user ID as a parameter
        } else if (userType === "tutor") {
          navigate(`/feedtutor/${user.userId}`); // Pass the user ID as a parameter
        } else if (userType === "student") {
          navigate(`/feedstudent/${user.userId}`); // Pass the user ID as a parameter
        } else {
          setError("Invalid user type");
        }

        // Clear input fields and error state
        setEmail("");
        setPassword("");
        setError("");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="superlogin">
        {/* Logo Section */}
        <div className="Lp-hero__section">
          <div className="containerL">
            <img src={logocore} width={40} alt="logocore" />
            <p>Welcome to,</p>
            <div className="para">
              <img src={slogancore} width={250} alt="logocore" />
              <p>By SOLIT</p>
            </div>
          </div>
        </div>

        {/* Card Section */}
        <div className="blokkencore">
          <h1>What is CORE?</h1>
          <p>"During the vibrant autumn season,"</p>
        </div>

        {/* Login Section */}
        <div className="logincore">
          <div className="signup-area">
            <div className="containerS">
              <div className="tp-section__title-wrapper">
                <h1 className="tp-section__title">Login to CORE!</h1>
              </div>
              <div className="row">
                <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                  <div className="sign__wrapper white-bg">
                    <div className="sign__header mb-35">
                      <div className="sign__in text-center">
                        <p>Log in with your email</p>
                      </div>
                    </div>
                    <div className="sign__form">
                      <form onSubmit={handleLogin}>
                        <div className="sign__input-wrapper mb-25">
                          <h5>Email</h5>
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="example@website.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <i className="fi fi-rr-envelope"></i>
                          </div>
                        </div>
                        <div className="sign__input-wrapper mb-10">
                          <h5>Password</h5>
                          <div className="sign__input">
                            <input
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className="fi fi-rr-key"></i>
                          </div>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="sign__action">
                          <div className="sign__agree"></div>
                          <div className="sign__forgot">
                            <a href="#">Forgot your password?</a>
                          </div>
                        </div>
                        <button className="e-btn w-100" type="submit">
                          <span></span> Log In
                        </button>
                        <div className="sign__new text-center mt-20">
                          <p>
                            New here? Be a member{" "}
                            <a href="/signupforcourses">Sign Up</a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
