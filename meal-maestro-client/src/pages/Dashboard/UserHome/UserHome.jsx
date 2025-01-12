import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <h2>Hi, Welcome Back {user?.name && user?.name}!</h2>
    </div>
  );
};

export default UserHome;
