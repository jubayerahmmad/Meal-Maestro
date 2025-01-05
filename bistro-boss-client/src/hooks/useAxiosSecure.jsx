import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(function (request) {
    const token = localStorage.getItem("access-token");
    // console.log("req intercepted by interceptors");
    request.headers.authorization = `Bearer ${token}`;
    return request;
  }),
    (error) => {
      return Promise.reject(error);
    };

  // intercepts 401,403 status
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response.status);
      const status = error.response.status;
      if (status === 401 || status === 403) {
        logoutUser().then(() => {
          navigate("/login");
        });
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
