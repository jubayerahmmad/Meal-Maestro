import { MdDelete } from "react-icons/md";
import SectionTitle from "../../../components/SectiontTtle/SectionTitle";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const hanldeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-10/12 mx-auto">
      <SectionTitle
        heading={"Wanna Add more?"}
        subHeading={"My Cart"}
      ></SectionTitle>

      <div className="flex items-center justify-between my-6 text-3xl">
        <h3>Total Orders: {cart.length}</h3>
        <h3>Total Price : $ {totalPrice}</h3>
        <button className="btn btn-warning text-white">Pay</button>
      </div>

      <div className="">
        {cart && cart.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="table ">
                {/* head */}
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {cart.map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={item.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="font-bold">{item.name}</p>
                      </td>
                      <td>${item.price}</td>
                      <th>
                        <button
                          onClick={() => hanldeDelete(item._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          <MdDelete size={20}></MdDelete>
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center font-bold text-4xl my-12">
            You have not added any items to the cart yet!!
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
