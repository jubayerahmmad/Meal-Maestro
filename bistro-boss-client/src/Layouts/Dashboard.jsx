import { useState } from "react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaCalendar, FaHome, FaShoppingCart } from "react-icons/fa";
import { FaBars, FaListCheck } from "react-icons/fa6";
import { LuRatio } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart] = useCart();
  return (
    <div className="flex">
      <button
        onClick={() => setSidebarOpen(true)}
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <FaBars size={28}></FaBars>
      </button>
      {/* sidebar */}
      <div className="w-1/5">
        <div
          id="logo-sidebar"
          className={`w-full h-screen transition-transform ${
            sidebarOpen ? "" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-orange-200 dark:bg-gray-800">
            <div className="flex justify-between">
              <Link to="/">
                <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white mb-8">
                  Meal Maestro Restaurant
                </h1>
              </Link>
              <button
                className={`${sidebarOpen ? "" : "hidden"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <RxCross2 size={28}></RxCross2>
              </button>
            </div>

            <ul className="space-y-2 font-medium">
              {/* User Nav */}
              <li>
                <NavLink
                  to="home"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-orange-300 dark:hover:bg-gray-700 group"
                >
                  <FaHome size={20}></FaHome>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    User Home
                  </span>
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
                <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-orange-300 dark:hover:bg-gray-700 group">
                  <BiLogIn size={20}></BiLogIn>
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                </Link>
              </li>
              <li>
                <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-orange-300 dark:hover:bg-gray-700 group">
                  <BiLogOut size={20}></BiLogOut>

                  <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6 w-4/5 mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
