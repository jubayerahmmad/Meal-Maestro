import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectiontTtle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Payment_PK); // publishable key
const Payment = () => {
  return (
    <div>
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
