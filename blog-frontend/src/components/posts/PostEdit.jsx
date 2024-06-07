import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "./PostForm";

const PostEdit = () => {
  const { postId } = useParams(); // Get postId from URL
  const [post, setPost] = useState(null);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        console.error("Error fetching post:", await response.text());
        // Handle error (e.g., redirect to error page)
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (postData) => {
    setErrors([]); // Clear previous errors
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token from local storage

      if (!token) {
        throw new Error("Unauthorized: Missing JWT token");
      }

      const response = await fetch(
        `http://localhost:3000/posts/edit/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
          },
          body: JSON.stringify(postData),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error editing post:", errorData);
        setErrors(errorData.errors);
        return;
      } else {
        const data = await response.json();
        setMessage(data.message); // Handle success message
        navigate(`/posts/${postId}`); // Redirect back to posts list
      }
    } catch (error) {
      console.error("Error editing post:", error);
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
          <svg /* SVG icon for success */ />
          <span>{message}</span>
        </div>
      )}
      {post ? (
        <PostForm onSubmit={handleSubmit} initialValues={post} /> // Pass initial values from fetched post
      ) : (
        <span className="loading loading-bars loading-lg mx-auto px-4 py-4"></span>
      )}
    </div>
  );
};

export default PostEdit;
