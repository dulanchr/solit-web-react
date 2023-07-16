import React, { useState } from "react";
import './signup.css';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Perform validation
    if (email.trim() === '') {
      setError('Please enter your email.');
      return;
    }

    if (phoneNumber.trim() === '') {
      setError('Please enter your phone number.');
      return;
    }

    if (password.trim() === '') {
      setError('Please enter your password.');
      return;
    }

    if (confirmPassword.trim() === '') {
      setError('Please confirm your password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (parentPhoneNumber.trim() === '') {
      setError('Please enter your parent\'s telephone number.');
      return;
    }

    if (school.trim() === '') {
      setError('Please enter your school.');
      return;
    }

    if (grade.trim() === '') {
      setError('Please select your grade.');
      return;
    }

    if (gender.trim() === '') {
      setError('Please select your gender.');
      return;
    }

    // Simulated API call to post sign-up data to the server
    try {
      // Create a new user
      const userResponse = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (userResponse.ok) {
        // User creation successful, continue with student creation
        const user = await userResponse.json();

        // Create a new student
        const studentResponse = await fetch('http://localhost:3001/student', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName, // Use the firstName state value
            lastname: lastName, // Use the lastName state value
            fether: '0', // Set the default value to '0'
            rating: '0', // Set the default value to '0'
            gender,
            tel: phoneNumber,
            telparent: parentPhoneNumber,
            address: '', // Add the appropriate value here
            school,
            grade,
            userid: user.userid, // Associate the student with the newly created user
          }),
        });

        if (studentResponse.ok) {
          // Student creation successful
          setEmail('');
          setPhoneNumber('');
          setPassword('');
          setConfirmPassword('');
          setParentPhoneNumber('');
          setSchool('');
          setGrade('');
          setGender('');
          setFirstName(''); // Clear firstName state
          setLastName(''); // Clear lastName state
          setError('');
          navigate('/pay');
        } else {
          // Student creation failed, display error message
          setError('Sign-up failed. Please try again.1');
        }
      } else {
        // User creation failed, display error message
        setError('Sign-up failed. Please try again.2');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.3');
    }
  };

  return (
    <>
      <div className='signupbackground'>
        <div className='containercards2'>
          <div className="mission-section2">
            <h1>SignUp for our online Courses</h1>
            <h2> & be a CORE member!</h2>
          </div>
        </div>
        <div className='containercards7'>
          <div className="logincore">
            <div className="signup-area">
              <div className="containerS">
                <div className="tp-section__title-wrapper">
                  <h1 className="tp-section__title"></h1>
                </div>
                <div className="row">
                  <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                    <div className="sign__wrapper white-bg">
                      <div className="sign__header mb-35">
                        <div className="sign__in text-center">
                          <p>SignUp with your email</p>
                        </div>
                      </div>
                      <div className="sign__form">
                        <form onSubmit={handleSignUp}>
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
                            <h5>First Name</h5>
                            <div className="sign__input">
                              <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                              <i class="fi fi-rr-user"></i>
                            </div>
                          </div>
                          <div className="sign__input-wrapper mb-10">
                            <h5>Last Name</h5>
                            <div className="sign__input">
                              <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                              <i class="fi fi-rr-user"></i>
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
                              <i class="fi fi-rr-key"></i>
                            </div>
                          </div>
                          <div className="sign__input-wrapper mb-10">
                            <h5>Confirm Password</h5>
                            <div className="sign__input">
                              <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                              <i class="fi fi-sr-key"></i>
                            </div>
                          </div>
                          <div className="sign__input-wrapper mb-25">
                            <h5>Telephone Number</h5>
                            <div className="sign__input">
                              <input
                                type="text"
                                placeholder="+94"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                              <i class="fi fi-rr-phone-call"></i>
                            </div>
                          </div>
                          <div className="sign__input-wrapper mb-10">
                            <h5>Parent's Telephone Number</h5>
                            <div className="sign__input">
                              <input
                                type="text"
                                placeholder="Parent Telephone Number"
                                value={parentPhoneNumber}
                                onChange={(e) => setParentPhoneNumber(e.target.value)}
                              />
                              <i class="fi fi-sr-phone-call"></i>
                            </div>
                          </div>
                          <div className="sign__input-wrapper mb-10">
                            <h5>School</h5>
                            <div className="sign__input">
                              <input
                                type="text"
                                placeholder="School"
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                              />
                              <i class="fi fi-rr-bank"></i>
                            </div>
                          </div>
                          <div className="sign__input-wrapper mb-10">
                            <h5>Grade</h5>
                            <div className="sign__input">
                              <select
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                              >
                                <option value="">Select Grade</option>
                                {Array.from({ length: 8 }, (_, i) => i + 6).map((gradeOption) => (
                                  <option value={gradeOption} key={gradeOption}>{gradeOption}</option>
                                ))}

                              </select>
                              <i class="fi fi-rr-angle-small-down"></i>
                            </div>
                          </div>
                          <div className="sign__input-wrapper mb-10">
                            <h5>Gender</h5>
                            <div className="sign__input">
                              <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                              >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="not-specified">Not Specified</option>
                              </select>
                              <i class="fi fi-rr-angle-small-down"></i>
                            </div>
                          </div>
                          
                          {error && <p className="error">{error}</p>}
                          <div className="sign__action">
                            <div className="sign__agree"></div>
                          </div>
                          <button className="e-btn w-100" type="submit">
                            <span></span> Sign Up
                          </button>
                          <div className="sign__new text-center mt-20">
                            <p>
                              Already a member? <a href="/signup">Log In</a>
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
      </div>
    </>
  );
};

export default SignUp;
