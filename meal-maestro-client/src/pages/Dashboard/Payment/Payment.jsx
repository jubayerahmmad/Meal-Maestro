import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectiontTtle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Payment_PK); // publishable key
const Payment = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>Customer Dashboard</title>
      </Helmet>
      <SectionTitle heading={"Payment"} subHeading={"Pay Now"} />

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
