import { BiLogOut } from "react-icons/bi";
import { FaCalendar, FaHome, FaShoppingCart } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { LuRatio } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
const Sidebar = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const [cart] = useCart();
  return (
    <div className={`w-full h-screen`} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-orange-200 dark:bg-gray-800">
        <div className="flex justify-between">
          <Link to="/">
            <h1 className="self-center text-center text-lg lg:text-xl xl:text-2xl font-semibold whitespace-nowrap dark:text-white mb-8">
              Meal Maestro <br /> Restaurant
            </h1>
          </Link>
          {/* <button
            className={`${sidebarOpen ? "" : "hidden"}`}
            onClick={() => setSidebarOpen(false)}
          >
            <RxCross2 size={28}></RxCross2>
          </button> */}
        </div>

        <ul className="space-y-2 font-medium">
          {/* User Nav */}
          <li>
            <NavLink
              to="home"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-orange-300 dark:hover:bg-gray-700 group"
            >
              <FaHome size={20}></FaHome>
              <span className="flex-1 ms-3 whitespace-nowrap">User Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reservation"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-orange-300 dark:hover:bg-gray-700 group"
            >
              <FaCalendar size={20}></FaCalendar>
              <span className="flex-1 ms-3 whitespace-nowrap">Reservation</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cart"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-orange-300 dark:hover:bg-gray-700 group"
            >
              <FaShoppingCart size={20}></FaShoppingCart>
              <span className="flex-1 ms-3 whitespace-nowrap">My Cart</span>
              <span className="badge badge-secondary badge-sm">
                {cart.length}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-orange-300 dark:hover:bg-gray-700 group"
            >
              <LuRatio size={20}></LuRatio>
              <span className="flex-1 ms-3 whitespace-nowrap">Reviews</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="bookings"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-orange-300 dark:hover:bg-gray-700 group"
            >
              <FaListCheck size={20}></FaListCheck>
              <span className="flex-1 ms-3 whitespace-nowrap">My Booking</span>
            </NavLink>
          </li>

          <div className="divider"></div>

          {/* Login logout button */}

          <li>
            <Link
              onClick={() => {
                logoutUser();
                navigate("/");
                toast.success("User Logged Out");
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-orange-300 dark:hover:bg-gray-700 group"
            >
              <BiLogOut size={20}></BiLogOut>
              <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
