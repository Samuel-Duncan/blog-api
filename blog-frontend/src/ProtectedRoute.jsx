import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken"); // Check for token in local storage

  if (!token) {
    return <Navigate to="/log-in" replace />; // Redirect to login if no token
  }

  return children; // Render child component if token exists
};

export default ProtectedRoute;
