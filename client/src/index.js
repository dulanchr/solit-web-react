import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import reportWebVitals from './reportWebVitals';

const stripePromise = loadStripe(
  "pk_test_51NZDIhKKyLhD2yiypFlna7TFjpZ3oaAhEtJtBLee8T7yJlh5tHeZMQb6MRfZcFCJ2EFGURgL5tA99Bcj3z05meFJ00tZvq6Nwu"
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
</React.StrictMode>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
