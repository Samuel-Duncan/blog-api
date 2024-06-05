import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // ... existing code for clearing JWT token
    localStorage.removeItem("jwtToken");
    // Redirect to login page
    navigate("/log-in");
  };

  return (
    <div>
      {/* Your component content */}
      <button onClick={handleLogout} className="btn">
        Logout
      </button>
    </div>
  );
};

export default LogOutButton;
