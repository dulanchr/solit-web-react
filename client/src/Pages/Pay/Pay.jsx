import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./pay.css";
import paypal from "../images/paypal.png";
import applepay from "../images/apple-pay.png";
import googlepay from "../images/google-pay.png";
import emailjs from "@emailjs/browser";

export default function Pay() {
  const form = useRef();
  const { id: courseId } = useParams();
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [getCoursedata, setgetCoursedata] = useState({
    courselink: "",
  });
  const [PaymentData, setPaymentData] = useState({
    courselink: "",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // Define an async function to fetch course data
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getcoursedata/${courseId}`
        );
        const courseData = response.data; // Assuming the response contains the course data
        setgetCoursedata({ courselink: courseData.courselink });
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    // Call the function to fetch course data
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    // Define an async function to fetch payment data
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/payment/${courseId}`
        );
        const paymentData = response.data; // Assuming the response contains the payment data
        setPaymentData({ usercode: paymentData.usercode });
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    // Call the function to fetch payment data
    fetchPaymentData();
  }, [courseId]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  // Move the sendAcceptEmail function outside of the handleSubmit function
  const sendAcceptEmail = () => {
    const params = {
      course_link: "www.google.com",
      user_code: "IeWyibw",
      user_email: formData.email,
      signup_link: `http://localhost:3000/signup`, // Use PaymentData.usercode here
    };
    emailjs
      .send("service_5695pgu", "template_sjxvtxk", params, "k3ZSYx6meJP6rONrM")
      .then((result) => {
        console.log(result.text);
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const { email, cardNumber, expiryDate, cvv } = formData;
    if (!email) {
      setFormErrors({ ...formErrors, email: "Please enter your email." });
      return;
    }

    if (!cardNumber) {
      setFormErrors({
        ...formErrors,
        cardNumber: "Please enter your card number.",
      });
      return;
    }

    if (!expiryDate) {
      setFormErrors({
        ...formErrors,
        expiryDate: "Please enter the expiry date.",
      });
      return;
    }

    if (!cvv) {
      setFormErrors({ ...formErrors, cvv: "Please enter the CVV." });
      return;
    }

    // Validate card number
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      setFormErrors({
        ...formErrors,
        cardNumber: "Invalid card number. Check again.",
      });
      return;
    }

    // Validate expiry date
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryDateRegex.test(expiryDate)) {
      setFormErrors({
        ...formErrors,
        expiryDate:
          "Invalid expiry date. Please enter a valid date in the format MM/YY.",
      });
      return;
    }

    // Validate CVV
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
      setFormErrors({
        ...formErrors,
        cvv: "Invalid CVV. Please enter a valid 3-digit CVV number.",
      });
      return;
    }

    try {
      // Simulate successful payment
      setPaymentSuccess(true);

      // Move the sendAcceptEmail function call here
      sendAcceptEmail();

      const response = await axios.post("http://localhost:3001/payment", {
        email: formData.email,
        courseId: courseId,
      });

      const usercode = response.data.payment.usercode;
      console.log("Usercode:", usercode);

      // Set the usercode state with the received payment ID
      setFormData({ ...formData, usercode: usercode });
    } catch (error) {
      console.error("Error sending payment details:", error);
    }
  };

  const handleOkClick = () => {
    setPaymentSuccess(false);
    navigate(`/signup/${formData.usercode}`);
  };

  const handleBackClick = () => {
    setPaymentSuccess(false);
    navigate("/courses"); // Navigate to "/courses" when the button is clicked
  };

  return (
    <>
      <div className="navbgc">
        <p>.</p>
      </div>
      <div className="paymentpage">
        <div className="modal">
          <form className="form-pay" onSubmit={handleSubmit}>
            <div className="payment--options">
              <button name="paypal" type="button">
                <img
                  src={paypal}
                  width={50}
                  alt="pay"
                  style={{ marginTop: "0vh" }}
                />
              </button>
              <button name="apple-pay" type="button">
                <img
                  src={applepay}
                  width={50}
                  alt="pay"
                  style={{ marginTop: "0.5vh" }}
                />
              </button>
              <button name="google-pay" type="button">
                <img
                  src={googlepay}
                  width={50}
                  alt="pay"
                  style={{ marginTop: "0.5vh" }}
                />
              </button>
            </div>
            <div className="separator">
              <hr className="line" />
              <p>or pay using credit card</p>
              <hr className="line" />
            </div>
            <div className="credit-card-info--form">
              <div className="input_container">
                <label htmlFor="email_field" className="input_label">
                  Email Address
                </label>
                <input
                  id="email_field"
                  className="input_field"
                  type="email"
                  name="email"
                  title="Email Address"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="error">{formErrors.email}</p>
                )}
              </div>
              <div className="input_container">
                <label htmlFor="card_number_field" className="input_label">
                  Card Number
                </label>
                <input
                  id="card_number_field"
                  className="input_field"
                  type="text"
                  name="cardNumber"
                  title="Card Number"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                {formErrors.cardNumber && (
                  <p className="error">{formErrors.cardNumber}</p>
                )}
              </div>
              <div className="input_container">
                <label htmlFor="expiry_date_field" className="input_label">
                  Expiry Date / CVV
                </label>
                <div className="split">
                  <input
                    id="expiry_date_field"
                    className="input_field"
                    type="text"
                    name="expiryDate"
                    title="Expiry Date"
                    placeholder="01/23"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                  <input
                    id="cvv_field"
                    className="input_field"
                    type="number"
                    name="cvv"
                    title="CVV"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.expiryDate && (
                  <p className="error">{formErrors.expiryDate}</p>
                )}
                {formErrors.cvv && <p className="error">{formErrors.cvv}</p>}
              </div>
            </div>
            <button className="purchase--btn" type="submit">
              Checkout
            </button>
          </form>
        </div>
      </div>
      {paymentSuccess && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>Payment Successful!</p>
              <h1>
                <i class="fi fi-rr-envelope-download"></i>
              </h1>
              <>
                You will be updated with an email. Check your inbox to access
                the files & for more details on CORE membership.
              </>
              <p>Thank you for the purchase!</p>
              <button onClick={handleOkClick}>Sign Up</button>
              <button onClick={handleBackClick}>More Courses</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
