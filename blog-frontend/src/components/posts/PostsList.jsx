import { useState, useEffect } from 'react';
import axios from 'axios';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          'http://localhost:3000/posts',
        );
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (posts.length === 0) {
    return <div>No posts found!</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
