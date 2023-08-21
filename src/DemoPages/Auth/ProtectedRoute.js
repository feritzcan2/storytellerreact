import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../context/AuthContext";

const ProtectedRoute = ({ user, children }) => {
  var auth = isAuthenticated();

  if (!auth) {
    console.log("not authenticated");
    return <Redirect to="/login" replace />;
  }
  console.log(" authenticated");

  return children;
};
export default ProtectedRoute;
