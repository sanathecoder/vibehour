import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  roleRequired,
}) => {
  const { user, role } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (
    roleRequired &&
    role !== roleRequired
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;