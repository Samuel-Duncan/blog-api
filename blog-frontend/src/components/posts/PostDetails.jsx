import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { postId } = useParams(); // Access the captured post ID from the URL
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
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
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
    </div>
  );
}

export default PostDetails;
