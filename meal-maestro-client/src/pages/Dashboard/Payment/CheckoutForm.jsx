import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice) {
      axiosSecure
        .post("/create-payment-intent", {
          price: totalPrice,
        })
        .then((res) => {
          // console.log(res.data);
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log(error);
      setError(error.message);
    } else {
      // console.log("Payment Method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName || user?.name || "Anonymous Participent",
          },
        },
      });

    if (confirmError) {
      // console.log(confirmError);
    } else {
      // console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        // save payment history to the db
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), // convert to utc format using moment js
          cartIds: cart.map((item) => item._id),
          foodIds: cart.map((item) => item.foodId),
          status: "Pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        // console.log(res.data);
        refetch();
        toast.success("PAYMENT SUCCESSFUL");
        navigate("/dashboard/payment-history");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm btn-warning"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <div className="flex justify-between">
          <p className="text-red-600 font-bold">{error}</p>
          <p>Transaction ID: {transactionId}</p>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
