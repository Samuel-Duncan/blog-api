import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
        user,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
