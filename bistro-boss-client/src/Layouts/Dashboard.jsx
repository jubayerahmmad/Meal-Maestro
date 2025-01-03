import { useState } from "react";
import { FaCalendar, FaListCheck } from "react-icons/fa6";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { LuRatio } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const [cart] = useCart();

  return (
    <div>
      <div className="flex justify-between items-center sm:hidden px-4 py-2">
        <Link to="/">
          <h1 className="self-center text-center text-lg font-semibold whitespace-nowrap dark:text-white">
            Meal Maestro
          </h1>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          data-drawer-target="separator-sidebar"
          data-drawer-toggle="separator-sidebar"
          aria-controls="separator-sidebar"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg bg-gray-100  dark:text-gray-400"
        >
          <MdMenu size={24}></MdMenu>
        </button>
      </div>

      <aside
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-orange-200 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
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
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Reservation
                </span>
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
                <span className="flex-1 ms-3 whitespace-nowrap">
                  My Booking
                </span>
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
      </aside>

      <div className="p-4 sm:ml-64">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
