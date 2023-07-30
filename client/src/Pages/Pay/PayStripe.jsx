import React, { useState } from "react";
import "./pay.css";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const PayStripe = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Fetch the payment intent client secret from the server-side endpoint
      const response = await fetch("http://localhost:3001/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000,
          currency: "usd",
          payment_method_types: ["card"],
        }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {},
        },
      });

      if (result.error) {
        // Handle error
        console.error("Payment failed:", result.error.message);
      } else {
        // Payment succeeded
        console.log("Payment succeeded:", result.paymentIntent);
      }
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "2px",
      borderRadius: "4px",
      // See all possible variables below
    },
  };

  const cardElementOptions = {
    style: appearance,
  };

  return (
    <div>
      <div className="navbgc">
        <p>.</p>
      </div>
      <div className="paymentpage">
        <form onSubmit={handleSubmit}>
          <CardElement options={cardElementOptions} />
          <button type="submit">Pay</button>
        </form>
      </div>
    </div>
  );
};

const PaymentWithStripe = () => {
  return (
    <Elements
      stripe={
        "pk_test_51NZDIhKKyLhD2yiypFlna7TFjpZ3oaAhEtJtBLee8T7yJlh5tHeZMQb6MRfZcFCJ2EFGURgL5tA99Bcj3z05meFJ00tZvq6Nwu"
      }
    >
      <PayStripe />
    </Elements>
  );
};

export default PaymentWithStripe;
