import { useState, useEffect } from "react";
import PostComment from "./../PostComment/PostComment.jsx";
import Comment from "./../Comments/Comments.jsx";

const CommentsSection = ({ seller }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!seller || !seller.comments || seller.comments.length === 0) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/v1/comments?commentIds=${seller.comments.join(",")}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const data = await response.json();
        setComments(data.data.comments);
        setError(null);
      } catch (err) {
        setError(err.message);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [seller]);

  // Function to handle new comment submission
  const handleNewComment = (content, rating) => {
    const newComment = {
      userName: "New User", // Replace with current user's username
      profilePic: "https://via.placeholder.com/40", // Replace with current user's profile picture
      date: new Date().toLocaleString("en-US"), // Current date and time
      content: content,
      rating: rating,
    };
    setComments([...comments, newComment]); // Add the new comment to the existing list
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 space-y-8 bg-lightBrown50 rounded-xl shadow-md">
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
      <PostComment onNewComment={handleNewComment} />
    </div>
  );
};

export default CommentsSection;
