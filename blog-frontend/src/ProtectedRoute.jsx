import UnauthorizedAccess from "./components/error/UnauthorizedAcess";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken"); // Check for token in local storage

  if (!token) {
    return <UnauthorizedAccess />; // Redirect to login if no token
  }

  return children; // Render child component if token exists
};

export default ProtectedRoute;
