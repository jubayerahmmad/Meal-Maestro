import { FaGoogle } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        // console.log(result.user);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            toast.success("User Login Successful");
          }
          navigate("/");
        });
      })
      .then((err) => {
        // console.log(err);
      });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="btn btn-md btn-outline w-full"
      >
        <FaGoogle></FaGoogle> Google Login
      </button>
    </div>
  );
};

export default SocialLogin;
