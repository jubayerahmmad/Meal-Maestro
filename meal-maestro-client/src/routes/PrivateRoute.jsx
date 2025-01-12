import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={pathname}></Navigate>;
};

export default PrivateRoute;
