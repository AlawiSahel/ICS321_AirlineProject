import { useState } from "react";
import PropTypes from "prop-types";

const PostComment = ({ onNewComment }) => {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && rating !== 0) {
      onNewComment(commentText, rating);
      setCommentText(""); // Reset the comment text field
      setRating(0); // Reset the rating
      setHoverRating(0);
    }
  };

  return (
    <form
      className="bg-backGround p-4 rounded-lg shadow mt-4 flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center mb-4">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              key={index}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHoverRating(index)}
              onMouseLeave={() => setHoverRating(rating)}
              className="focus:outline-none"
              type="button"
            >
              <svg
                className={
                  hoverRating >= index ? "text-yellow-500" : "text-gray-300"
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 1.868a1 1 0 011.903 0l1.333 4.12a1 1 0 00.95.674h4.347a1 1 0 01.593 1.807l-3.512 2.512a1 1 0 00-.367 1.117l1.333 4.12a1 1 0 01-1.536 1.12l-3.513-2.512a1 1 0 00-1.167 0l-3.513 2.512a1 1 0 01-1.536-1.12l1.333-4.12a1 1 0 00-.367-1.117L2.314 8.469a1 1 0 01.593-1.807h4.347a1 1 0 00.95-.674l1.333-4.12z" />
              </svg>
            </button>
          );
        })}
      </div>

      <div>
        <textarea
          className="w-3/4 p-2 rounded-lg resize-none shadow-md border-none resize-none focus:outline-none text-gray-700 pl-4"
          placeholder="Write a comment ..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-lightBrown50 font-bold text-primary rounded-lg px-4 py-2 mt-2 float-right border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

PostComment.propTypes = {
  onNewComment: PropTypes.func.isRequired,
};

export default PostComment;
