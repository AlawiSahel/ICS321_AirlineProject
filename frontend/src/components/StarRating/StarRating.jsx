import PropTypes from "prop-types";
import Star from "./Star.jsx";

function StarRating({ rating }) {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(roundedRating);
  const halfStars = roundedRating % 1 === 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} filled={true} />
      ))}
      {halfStars === 1 && <Star key="half" filled={"half"} />}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={index} filled={false} />
      ))}
      <span className="text-sm font-semibold text-yellow-600 ml-2">{`${rating.toFixed(
        1
      )}/5`}</span>
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
