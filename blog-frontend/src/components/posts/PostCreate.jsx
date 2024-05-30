import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostForm from "./PostForm";

const PostCreate = () => {
  const [errors, setErrors] = useState([]); // State for errors
  const [message, setMessage] = useState(null); // State for success message
  const navigate = useNavigate();

  const handleSubmit = async (postData) => {
    // Destructure postData if needed (assuming object from PostForm)
    const { title, text, isPublished } = postData;

    setErrors([]); // Clear previous errors on submission

    try {
      const response = await fetch("http://localhost:3000/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text, isPublished }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating post:", errorData);
        setErrors(errorData.errors);
        return;
      } else {
        const data = await response.json();

        setMessage(data.message);
        // Handle successful creation (e.g., redirect)
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-20">
      {errors && errors.length > 0 && (
        <div className="mb-4 text-sm text-red-500">
          {errors.map((error) => (
            <p key={error.msg}>{error.msg}</p>
          ))}
        </div>
      )}
      {message && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
          <Link to="/posts" className="btn">
            Back to Posts{" "}
          </Link>
        </div>
      )}
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default PostCreate;
