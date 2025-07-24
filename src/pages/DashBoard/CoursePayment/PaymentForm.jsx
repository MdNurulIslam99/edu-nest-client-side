import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { isPending, data: classInfo = {} } = useQuery({
    queryKey: ["allClasses", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`classes/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return "....loading";
  }

  const amount = classInfo.price;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // console.log("Payment succeeded!");

          await axiosSecure.post("/payment-success", {
            classId: id,
            transactionId: result.paymentIntent.id,
            amount: amount,
            userEmail: user.email,
            userName: user.displayName,
            date: new Date().toISOString(),
            status: "paid",
          });

          Swal.fire("Payment Successful!", "You are now enrolled!", "success");
          navigate("/dashboard/myEnrollClass");
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-200 p-6 rounded-xl shadow-md w-full max-w-md mx-auto mt-28 "
      >
        <CardElement className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"></CardElement>
        <button
          className="btn btn-primary text-white w-full"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
