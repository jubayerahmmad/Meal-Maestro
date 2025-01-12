import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectiontTtle/SectionTitle";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}`);
      //   console.log(data);
      return data;
    },
  });
  if (isLoading) return <Loader />;
  // console.log(payments);
  return (
    <div>
      <Helmet>
        <title>Customer Dashboard</title>
      </Helmet>
      <SectionTitle
        heading={"Payment history"}
        subHeading={"At a Glance"}
      ></SectionTitle>

      <div className="w-10/12 mx-auto mt-4">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead className="bg-orange-500 text-white ">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Price</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments?.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{payment.email}</td>
                  <td>${payment.price}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.date.split("T")[0]}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
