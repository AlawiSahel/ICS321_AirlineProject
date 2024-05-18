import PropTypes from "prop-types";

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <svg
            key={index}
            className={index <= rating ? "text-yellow-500" : "text-gray-300"}
            fill="currentColor"
            viewBox="0 0 20 20"
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 1.868a1 1 0 011.903 0l1.333 4.12a1 1 0 00.95.674h4.347a1 1 0 01.593 1.807l-3.512 2.512a1 1 0 00-.367 1.117l1.333 4.12a1 1 0 01-1.536 1.12l-3.513-2.512a1 1 0 00-1.167 0l-3.513 2.512a1 1 0 01-1.536-1.12l1.333-4.12a1 1 0 00-.367-1.117L2.314 8.469a1 1 0 01.593-1.807h4.347a1 1 0 00.95-.674l1.333-4.12z" />
          </svg>
        );
      })}
    </div>
  );
};

const Comment = ({ username, profilePic, date, content, rating }) => {
  return (
    <div className="bg-backGround p-4 rounded-lg shadow mb-2 flex xs:flex-row">
      {/* Profile Picture */}
      <img
        src={profilePic}
        alt={`${username}'s profile pic`}
        className="rounded-full h-10 w-10 xs:h-12 xs:w-12 mr-3"
      />
      {/* Comment Content */}
      <div className="flex flex-col xs:justify-center flex-grow">
        {/* Username and Star Rating */}
        <div className="flex items-center justify-between mb-1 xl:text-lg 2xl:text-xl">
          <span className="font-bold text-primary">{username}</span>
          {/* Star Rating Component */}
        </div>
        <StarRating rating={rating} />

        {/* Comment Text */}
        <p className="text-gray-700 text-sm xs:text-base xl:text-lg 2xl:text-xl  ">
          {content}
        </p>
        {/* Date */}
        <div className=" text-xs xs:text-sm text-gray-500 mt-1">
          {new Date(date).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Comment;
