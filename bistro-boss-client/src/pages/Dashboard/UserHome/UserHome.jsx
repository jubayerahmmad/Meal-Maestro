import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Hi, Welcome Back {user?.name && user?.name}!</h2>
    </div>
  );
};

export default UserHome;
