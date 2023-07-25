import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { useParams } from "react-router-dom";

const SignUp = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const { usercode } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    parentPhoneNumber: "",
    school: "",
    grade: "",
    gender: "",
    firstName: "",
    lastName: "",
    address: "",
    error: "",
  });

  const {
    email,
    phoneNumber,
    password,
    confirmPassword,
    parentPhoneNumber,
    school,
    grade,
    gender,
    firstName,
    lastName,
    address,
    error,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Perform validation
    if (email.trim() === "") {
      setFormData({ ...formData, error: "Please enter your email." });
      return;
    }

    if (phoneNumber.trim() === "") {
      setFormData({ ...formData, error: "Please enter your phone number." });
      return;
    }

    if (password.trim() === "") {
      setFormData({ ...formData, error: "Please enter your password." });
      return;
    }

    if (confirmPassword.trim() === "") {
      setFormData({ ...formData, error: "Please confirm your password." });
      return;
    }

    if (password !== confirmPassword) {
      setFormData({ ...formData, error: "Passwords do not match." });
      return;
    }

    if (parentPhoneNumber.trim() === "") {
      setFormData({
        ...formData,
        error: "Please enter your parent's telephone number.",
      });
      return;
    }

    if (school.trim() === "") {
      setFormData({ ...formData, error: "Please enter your school." });
      return;
    }

    if (grade.trim() === "") {
      setFormData({ ...formData, error: "Please select your grade." });
      return;
    }

    if (gender.trim() === "") {
      setFormData({ ...formData, error: "Please select your gender." });
      return;
    }

    try {
      // Simulated API call to post sign-up data to the server
      const userData = {
        email,
        password,
        validity: false, // Setting the validity to false for the new user
      };

      // Create a new user
      const userResponse = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!userResponse.ok) {
        setFormData({
          ...formData,
          error: "Sign-up failed. Please try again.",
        });
        return;
      }

      const userResult = await userResponse.json();

      const studentData = {
        firstname: firstName,
        lastname: lastName,
        gender,
        tel: phoneNumber,
        telparent: parentPhoneNumber,
        address,
        school,
        grade,
        userId: userResult.userId, // Associate the student with the newly created user
      };

      // Create a new student
      const studentResponse = await fetch("http://localhost:3001/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      if (studentResponse.ok) {
        // Requester and student creation successful
        setFormData({
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          parentPhoneNumber: "",
          school: "",
          grade: "",
          gender: "",
          firstName: "",
          lastName: "",
          address: "",
          error: "",
        });

        // Show the popup when the sign-up is successful
        setPopupVisible(true);
      } else {
        // Student creation failed, display error message
        setFormData({
          ...formData,
          error: "Sign-up failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setFormData({
        ...formData,
        error: "An error occurred. Please try again later.",
      });
    }
  };
  const handleOkClick = () => {
    // Close the popup and navigate to '/pay' when the button is clicked
    setPopupVisible(false);
    navigate("/courses");
  };

  return (
    <div className="signupbackground">
      <div className="containercards2">
        <div className="mission-section2">
          <h1>SignUp for our online Courses</h1>
          <h2> & be a CORE member!</h2>
        </div>
      </div>
      <div className="containercards7">
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
                              name="email"
                              value={email}
                              onChange={handleChange}
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
                              name="firstName"
                              value={firstName}
                              onChange={handleChange}
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
                              name="lastName"
                              value={lastName}
                              onChange={handleChange}
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
                              name="password"
                              value={password}
                              onChange={handleChange}
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
                              name="confirmPassword"
                              value={confirmPassword}
                              onChange={handleChange}
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
                              name="phoneNumber"
                              value={phoneNumber}
                              onChange={handleChange}
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
                              name="parentPhoneNumber"
                              value={parentPhoneNumber}
                              onChange={handleChange}
                            />
                            <i class="fi fi-sr-phone-call"></i>
                          </div>
                        </div>

                        <div className="sign__input-wrapper mb-10">
                          <h5>Address</h5>
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="Address"
                              name="address"
                              value={address}
                              onChange={handleChange}
                            />
                            <i class="fi fi-rr-marker"></i>
                          </div>
                        </div>

                        <div className="sign__input-wrapper mb-10">
                          <h5>School</h5>
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="School"
                              name="school"
                              value={school}
                              onChange={handleChange}
                            />
                            <i class="fi fi-rr-bank"></i>
                          </div>
                        </div>
                        <div className="sign__input-wrapper mb-10">
                          <h5>Grade</h5>
                          <div className="sign__input">
                            <select
                              value={grade}
                              onChange={handleChange}
                              name="grade"
                            >
                              <option value="">Select Grade</option>
                              {Array.from({ length: 8 }, (_, i) => i + 6).map(
                                (gradeOption) => (
                                  <option value={gradeOption} key={gradeOption}>
                                    {gradeOption}
                                  </option>
                                )
                              )}
                            </select>
                            <i class="fi fi-rr-angle-small-down"></i>
                          </div>
                        </div>
                        <div className="sign__input-wrapper mb-10">
                          <h5>Gender</h5>
                          <div className="sign__input">
                            <select
                              value={gender}
                              onChange={handleChange}
                              name="gender"
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="not-specified">
                                Not Specified
                              </option>
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

                      <div
                        className="popup-container"
                        style={{ display: isPopupVisible ? "block" : "none" }}
                      >
                        <div className="popup">
                          <div className="popup-content">
                            <p>Payment Successful!</p>
                            <h1>
                              <i className="fi fi-rr-envelope-download"></i>
                            </h1>
                            <>
                              You will be updated with an email. Check your
                              inbox to access the files & for more details on
                              CORE membership.
                            </>
                            <p>Thank you for the purchase!</p>
                            <button onClick={handleOkClick}>
                              More Courses
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
