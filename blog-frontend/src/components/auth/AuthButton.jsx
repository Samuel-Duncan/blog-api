import { Link } from "react-router-dom";

const AuthButton = ({ type = "sign up" }) => {
  const isSignUp = type === "sign up";

  return (
    // Add a return statement to render the JSX content
    <Link to={isSignUp ? "/sign-up" : "/log-in"}>
      {isSignUp ? "Sign Up" : "Log In"}
    </Link>
  );
};

export default AuthButton;
