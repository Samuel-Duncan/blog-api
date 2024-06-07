import { useNavigate } from "react-router-dom";

const LogOutButton = (type = "notHeader") => {
  const navigate = useNavigate();
  const isHeader = type === "header";
  const handleLogout = async () => {
    // ... existing code for clearing JWT token
    localStorage.removeItem("jwtToken");
    navigate("log-in");
  };

  return (
    <div>
      {/* Your component content */}
      <button onClick={handleLogout} className={isHeader ? "btn" : ""}>
        Logout
      </button>
    </div>
  );
};

export default LogOutButton;
