import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
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
  return (
    <div className="fixed w-full z-50 bg-opacity-60 text-white bg-black">
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
          <ul className="text-3xl gap-10 px-4 py-2 flex font-semibold rounded-md">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-sm lg:btn-md text-white bg-orange-600 border-none hover:bg-orange-800">
            Login/Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
