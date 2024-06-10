import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Assuming you use Fetch API for making requests

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]); // Clear previous errors on submission
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      // Handle successful signup (e.g., redirect to login page)
      navigate("/log-in");
    } catch (error) {
      console.error("Signup error:", error);
      setErrors(["Signup failed"]);
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
          <h1 className="text-5xl font-bold uppercase">Sign Up</h1>
        </div>
        <div className="form-group">
          <label htmlFor="firstName" className="block text-sm font-medium">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="input input-bordered w-full max-w-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="block text-sm font-medium">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="input input-bordered w-full max-w-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
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
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
