import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pay.css';
import paypal from '../images/paypal.png';
import applepay from '../images/apple-pay.png';
import googlepay from '../images/google-pay.png';

export default function Pay() {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const { email, cardNumber, expiryDate, cvv } = formData;
    if (!email || !cardNumber || !expiryDate || !cvv) {
      console.log('Please fill in all the required fields.');
      return;
    }

    // Validate card number
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      console.log('Invalid card number. Please enter a valid 16-digit card number.');
      return;
    }

    // Validate expiry date
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryDateRegex.test(expiryDate)) {
      console.log('Invalid expiry date. Please enter a valid date in the format MM/YY.');
      return;
    }

    // Validate CVV
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
      console.log('Invalid CVV. Please enter a valid 3-digit CVV number.');
      return;
    }

    // Send data to the server
    fetch('http://localhost:3001/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
        // Navigate to another page
        navigate('/another-page');
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className='navbgc'>
        <p>.</p>
      </div>
      <div className="paymentpage">
        <div className="modal">
          <form className="form-pay" onSubmit={handleSubmit}>
            <div className="payment--options">
              <button name="paypal" type="button">
                <img src={paypal} width={50} alt="pay" style={{ marginTop: '0vh' }} />
              </button>
              <button name="apple-pay" type="button">
                <img src={applepay} width={50} alt="pay" style={{ marginTop: '0.5vh' }} />
              </button>
              <button name="google-pay" type="button">
                <img src={googlepay} width={50} alt="pay" style={{ marginTop: '0.5vh' }} />
              </button>
            </div>
            <div className="separator">
              <hr className="line" />
              <p>or pay using credit card</p>
              <hr className="line" />
            </div>
            <div className="credit-card-info--form">
              <div className="input_container">
                <label htmlFor="email_field" className="input_label">Email Address</label>
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
              </div>
              <div className="input_container">
                <label htmlFor="card_number_field" className="input_label">Card Number</label>
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
              </div>
              <div className="input_container">
                <label htmlFor="expiry_date_field" className="input_label">Expiry Date / CVV</label>
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
              </div>
            </div>
            <button className="purchase--btn" type="submit">Checkout</button>
          </form>
        </div>
      </div>
    </>
  );
}
