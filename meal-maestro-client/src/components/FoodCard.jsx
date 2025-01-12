import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";

const FoodCard = ({ item }) => {
  const { user } = useAuth();
  const [, refetch] = useCart();
  const { name, image, recipe, price, _id } = item;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleAddToCart = () => {
    // console.log(foodItem);
    if (user && user.email) {
      // save order details
      const cartItem = {
        foodId: _id,
        email: user?.email,
        name,
        image,
        price,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success(`${name} added to the Cart`);
        }
        //refetch the cart to show cart item count
        refetch();
      });
    } else {
      Swal.fire({
        title: "You're not Logged In",
        text: "You have to Login before Ordering food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: pathname });
        }
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="w-full" src={image} alt="food" />
      </figure>
      <p className="bg-black text-white absolute right-2 top-2 px-4 rounded-xl">
        {price}
      </p>
      <div className="p-6 text-center space-y-3">
        <h2 className="text-2xl mb-2 font-bold">{name}</h2>
        <p className="text-sm">{recipe}</p>
        <div className="mt-3">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline text-orange-600 bg-gray-200 hover:bg-orange-600 hover:border-none"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
