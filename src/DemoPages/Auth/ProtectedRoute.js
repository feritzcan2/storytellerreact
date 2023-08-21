import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../context/AuthContext";

const ProtectedRoute = ({ user, children }) => {
  var auth = isAuthenticated();

  if (!auth) {
    return <Redirect to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;
