import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../AuthProvider";

const LogOutButton = (type = "notHeader") => {
  const { setIsLoggedIn, setUser, isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  const navigate = useNavigate();
  const isHeader = type === "header";
  const handleLogout = async () => {
    // ... existing code for clearing JWT token
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/log-in");
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
