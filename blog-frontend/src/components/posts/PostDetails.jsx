import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams(); // Access the captured post ID from the URL
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(`http://localhost:3000/posts/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post details"); // Throw error for non-2xx responses
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [postId]);

  if (isLoading)
    return (
      <div>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  if (!post) return <div>Post not found.</div>;

  return (
    <div className="px-4 py-2">
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <Link to="/posts" className="btn">
        Back to Posts{" "}
      </Link>
    </div>
  );
}

export default PostDetails;
