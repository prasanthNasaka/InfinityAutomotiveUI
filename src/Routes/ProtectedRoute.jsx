/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); 

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
