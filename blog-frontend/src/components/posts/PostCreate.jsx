import { useState } from "react";
import axios from "axios"; // Install axios using npm or yarn (npm install axios)
import { useNavigate } from "react-router-dom";
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
      const response = await axios.post("http://localhost:3000/posts/create", {
        title,
        text,
        isPublished,
      });

      if (response.status !== 201) {
        setErrors(response.data.errors); // Set validation errors from backend
        return;
      }

      const data = response.data;
      setMessage("Post submitted successfully!"); // Set success message
      // Handle successful creation (e.g., redirect)
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-20">
      {errors && errors.length > 0 && (
        <div className="mb-4 text-sm text-red-500">
          {errors.map((error) => (
            <p key={error.msg}>{error.msg}</p>
          ))}
        </div>
      )}
      {message && <p className="mb-4 text-sm text-green-500">{message}</p>}
      <PostForm onSubmit={handleSubmit} /> {/* Pass onSubmit prop */}
    </div>
  );
};

export default PostCreate;
