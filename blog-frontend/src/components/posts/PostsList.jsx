import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3000/posts");

        if (!response.ok) {
          throw new Error("Failed to fetch posts"); // Throw error for non-2xx responses
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-bars loading-lg px-4 py-4"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="space-y-4 px-4 py-4">
        <div className=" text-red-500">No posts found!</div>
        <Link to="/posts/create" className="btn">
          Create Post{" "}
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`} className="link link-primary">
              <h3>{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/posts/create" className="btn">
        Create Post{" "}
      </Link>
    </div>
  );
};

export default PostsList;
