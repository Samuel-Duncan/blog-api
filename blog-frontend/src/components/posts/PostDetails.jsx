import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams(); // Access the captured post ID from the URL
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const deletePost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post.");
      }

      const data = await response.json();
      console.log("Delete response:", data);
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle errors (e.g., display error message)
    }
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("jwtToken");
    return !!token;
  };

  if (isLoading)
    return (
      <div>
        <span className="loading loading-bars loading-lg p-4"></span>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  if (!post) return <div>Post not found.</div>;

  return (
    <div className="space-y-4 px-4 py-4">
      <h1 className="text-3xl">{post.title}</h1>
      <p>{post.text}</p>
      {isLoggedIn() && (
        <div className="space-x-4">
          <Link to="/posts" className="btn">
            Back to Posts{" "}
          </Link>
          <Link to={`/posts/edit/${postId}`} className="btn">
            Edit Post{" "}
          </Link>
          <button
            className="btn btn-outline btn-error"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Delete Post
          </button>
        </div>
      )}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex justify-center align-middle">
          <button className="btn btn-outline btn-error" onClick={deletePost}>
            Confirm Delete{" "}
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default PostDetails;
