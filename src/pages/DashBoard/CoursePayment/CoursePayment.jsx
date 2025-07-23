// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import React from "react";
// import PaymentForm from "./PaymentForm";

// const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
// const CoursePayment = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm></PaymentForm>
//     </Elements>
//   );
// };

// export default CoursePayment;

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key); //  env variable

const CoursePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default CoursePayment;
