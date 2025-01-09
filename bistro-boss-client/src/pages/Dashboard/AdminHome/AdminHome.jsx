import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Hi, Welcome Back {user?.displayName && user?.displayName}!</h2>
    </div>
  );
};

export default AdminHome;
