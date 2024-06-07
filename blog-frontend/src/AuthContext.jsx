import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle login/logout logic (replace with your implementation)
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Update user data on login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null); // Clear user data on logout
  };

  // Check for existing token in local storage (optional)
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true); // Set initial login state based on token
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
