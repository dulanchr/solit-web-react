import React, { useEffect, useState } from "react";
import './login.css';
import logocore from './images/logo-core.png';
import slogancore from './images/slogan-core.png';




const Login = (props) => {


  const [UserData, setUserData] = useState([]);


  


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform validation
    if (email.trim() === '') {
      setError(<p className="error-message">Please enter your email.</p>);
      return;
    }

    if (password.trim() === '') {
      setError(<p className="error-message">Please enter your password</p>);
      return;
    }

    // Find the user in UserData array
    const user = UserData.find((user) => user.email === email && user.password === password);

    if (user) {
      window.location.href = '/core';

      // Clear input fields and error state
      setEmail('');
      setPassword('');
      setError('');
    } else {
      // Invalid email or password
      setError(<p className="error-message">Invalid email or password</p>);
    }
  };

  return (
    <> <div className='superlogin'>
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
        <p>
          "During the vibrant autumn season,"
        </p>
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
                          <i className="fal fa-envelope"></i>
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
                          
                        </div>
                      </div>
                      {error && <p className="error">{error}</p>}
                      <div className="sign__action">
                        <div className="sign__agree"></div>
                        <div className="sign__forgot">
                          <a href="#">Forgot your password?</a>
                        </div>
                      </div>
                      <button className="e-btn w-100" type="submit" >
                        <span></span> Log In
                      </button>

                      <div className="sign__new text-center mt-20">
                        <p>
                          New here? Be a member <a href="/signup">Sign Up</a>
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
    </>
  );
};

export default Login;
