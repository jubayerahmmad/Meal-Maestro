import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const Login = () => {
  const [disableLogin, setDisableLogin] = useState(true);
  const { state } = useLocation();

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const captchaRef = useRef();
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginUser(email, password)
      .then((result) => {
        console.log(result);
        navigate(`${state ? state : "/"}`);
        toast.success("Login Successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleValidateCaptcha = () => {
    const captchaValue = captchaRef.current.value;
    if (validateCaptcha(captchaValue)) {
      return setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Login - Meal Maestro</title>
      </Helmet>
      <div
        className={`w-[90%] md:w-[80%] lg:w-[35%] bg-[#fffefd] border-2 rounded-lg transition-all duration-300 mx-auto`}
      >
        <div className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
          <h1 className="text-[1.5rem] font-bold">Sign in to our platform</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-4">
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
            <label className="text-[1rem] font-[500] text-[#464646]">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
            />
          </div>

          {/* <div className="flex items-center justify-between w-full">
            <a href="" className="text-[#3B9DF8] font-[400] text-[1rem]">
              Forget Password
            </a>
          </div> */}

          <div>
            <label>
              <LoadCanvasTemplate />
            </label>
            <input
              type="text"
              name="captcha"
              ref={captchaRef}
              placeholder="Type The Captcha above"
              className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
            />
            <button
              type="button"
              onClick={handleValidateCaptcha}
              className="btn btn-xs w-fit my-2"
            >
              Validate
            </button>
          </div>

          <button
            type="submit"
            className={`py-2 px-4 w-full rounded-md ${
              disableLogin
                ? "bg-gray-100 text-gray-600"
                : "bg-[#3B9DF8] text-[#fff] font-bold"
            }`}
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center w-full pb-4">
          <p className="text-[1rem] font-[400] text-[#464646c]">
            Not have any account?{" "}
            <Link to="/register" className="text-[#3B9DF8] underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
