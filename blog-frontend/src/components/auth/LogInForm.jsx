import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../AuthProvider";

const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]); // Clear previous errors on submission
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      if (!data.token) {
        setErrors(["Invalid email or password"]);
      } else {
        // Handle successful login
        console.log("Login successful:");
        localStorage.setItem("jwtToken", data.token);
        setIsLoggedIn(true);
        setUser(data.user);
        navigate("/log-in-success");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(["Login failed"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-20">
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-auto flex-col items-center justify-center gap-5"
      >
        <div className="flex">
          <h1 className="text-5xl font-bold uppercase">Login</h1>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="input input-bordered w-full max-w-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="block text-sm font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="input input-bordered w-full max-w-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
