import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className={`w-[90%] md:w-[80%] lg:w-[35%] bg-[#fffefd] border-2 rounded-lg transition-all duration-300 mx-auto`}
      >
        <div className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
          <h1 className="text-[1.5rem] font-bold">Sign in to our platform</h1>
        </div>

        <form className="flex flex-col gap-5 p-4">
          <div>
            <label
              htmlFor="email"
              className="text-[1rem] font-[500] text-[#464646]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="zenuilibrary@gmail.com"
              className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-[1rem] font-[500] text-[#464646]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="**********"
              className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <a href="#" className="text-[#3B9DF8] font-[400] text-[1rem]">
              Forget Password
            </a>
          </div>

          <button
            type="submit"
            className="py-2 px-4 w-full bg-[#3B9DF8] text-[#fff] rounded-md"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center w-full pb-4">
          <p className="text-[1rem] font-[400] text-[#464646c]">
            Not have any account?{" "}
            <a href="#" className="text-[#3B9DF8] underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
