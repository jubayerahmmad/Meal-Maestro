import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import Loader from "../components/Loader";

const Navbar = () => {
  const { user, logoutUser, loading } = useAuth();

  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  if (loading) return <Loader />;

  const navOptions = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/menu">Menu</NavLink>
      </li>
      <li>
        <NavLink to="/order/salads">Order</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logoutUser().then(() => {
      toast.success("User Logged Out");
    });
  };

  return (
    <div className="fixed w-full z-50 bg-opacity-60 text-white bg-black animate__animated animate__fadeInDown">
      <div className="navbar lg:w-10/12 mx-auto px-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="gap-4 px-2 py-1 text-black flex flex-col font-semibold dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-base lg:text-2xl">
            MEAL MAESTRO
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="text-2xl gap-4 px-4 py-2 flex font-semibold rounded-md">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end gap-2 items-center">
          {!isAdmin && (
            <Link to="dashboard/cart" className="rounded-full relative mx-2">
              <button>
                <FaShoppingCart size={36}></FaShoppingCart>
              </button>
              <span className="badge badge-secondary badge-sm absolute -right-2 -top-1">
                {cart.length}
              </span>
            </Link>
          )}
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      alt="Tailwind CSS Navbar component"
                      src={user.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink
                      to={`/dashboard/${isAdmin ? "adminHome" : "userHome"}`}
                      className="justify-between"
                    >
                      Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <button onClick={handleLogout} className="">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://i.ibb.co.com/KVqSkwf/silver-gradient-social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standin.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
