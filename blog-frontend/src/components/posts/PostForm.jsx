import { useState } from "react";
import { Link } from "react-router-dom";

const PostForm = ({ onSubmit, initialValues = {} }) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [text, setText] = useState(initialValues.text || "");
  const [isPublished, setIsPublished] = useState(
    initialValues.isPublished || false,
  );

  const isUpdating = Object.keys(initialValues).length !== 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, text, isPublished });
    setTitle("");
    setText("");
    setIsPublished(false); // Reset form state after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-auto flex-col items-center justify-center gap-5" // Combine relevant classes
    >
      <div className="flex">
        <h1 className="text-5xl font-bold uppercase">
          {isUpdating ? "Update" : "Create"} Post
        </h1>{" "}
        {/* Mix classes */}
      </div>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          className="input input-bordered w-full max-w-xs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group space-x-4">
        <label htmlFor="text">Text:</label>
        <textarea
          name="text"
          id="text"
          className="textarea textarea-bordered w-full max-w-xs"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="isPublished" className="">
          Publish Now:
          <input
            type="checkbox"
            name="isPublished"
            id="isPublished"
            className="checkbox translate-x-4 translate-y-2"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      </div>
      <button type="submit" className="btn">
        {isUpdating ? "Update Post" : "Create Post"}
      </button>
      <Link to="/posts" className="btn">
        Back to Posts{" "}
      </Link>
    </form>
  );
};

export default PostForm;
