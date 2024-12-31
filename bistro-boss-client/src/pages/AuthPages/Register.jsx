import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      console.log(result);
      toast.success("User Registration Successful");
      navigate("/");
    });
    reset();
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Register - Meal Maestro</title>
      </Helmet>
      <div
        className={`w-[90%] md:w-[80%] lg:w-[35%] bg-[#fffefd] border-2 border-orange-200 shadow-xl rounded-lg transition-all duration-300 mx-auto`}
      >
        <div className="w-full flex items-end p-4 justify-between border-b border-orange-300">
          <h1 className="text-[1.5rem] font-bold">Register to our platform</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-4"
        >
          <div>
            <label className="text-[1rem] font-[500] text-[#464646]">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="zenuilibrary@gmail.com"
              className="py-2 px-3 border border-orange-200 rounded-md w-full focus:outline-none mt-1 focus:border-orange-600"
            />
            {errors.name && (
              <span className="text-red-500 font-bold">
                This field is required
              </span>
            )}
          </div>
          <div>
            <label className="text-[1rem] font-[500] text-[#464646]">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="zenuilibrary@gmail.com"
              className="py-2 px-3 border border-orange-200 rounded-md w-full focus:outline-none mt-1 focus:border-orange-600"
            />
            {errors.email && (
              <span className="text-red-500 font-bold">
                This field is required
              </span>
            )}
          </div>

          <div>
            <label className="text-[1rem] font-[500] text-[#464646]">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /(?=.*[a-z])(?=.*[A-Z])/,
                  message:
                    "Password must include uppercase and lowercase character",
                },
              })}
              placeholder="enter password"
              className="py-2 px-3 border border-orange-200 rounded-md w-full focus:outline-none mt-1 focus:border-orange-600"
            />
            {errors.password && (
              <span className="text-red-500 font-bold">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="py-2 px-4 w-full bg-[#3B9DF8] text-[#fff] rounded-md"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-center w-full pb-4">
          <p className="text-[1rem] font-[400] text-[#464646c]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#3B9DF8] underline">
              Sign In / Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
