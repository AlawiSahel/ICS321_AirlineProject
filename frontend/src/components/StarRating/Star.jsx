import PropTypes from "prop-types";

function Star({ filled }) {
  // Set the appropriate gradient fill based on the filled prop
  let fill;
  switch (filled) {
    case true:
      fill = "url(#starGradient)";
      break;
    case "half":
      // You need a separate gradient ID for the half star if you are rendering both full and half stars in the same component
      fill = "url(#halfStarGradient)";
      break;
    case false:
      fill = "none";
      break;
    default:
      fill = "none";
  }

  return (
    <svg
      className="w-6 h-6" // Removed text-yellow-400 to allow gradient fills
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#FFD700", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient
          id="halfStarGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="50%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
          <stop
            offset="50%"
            style={{ stopColor: "#fff", stopOpacity: 0, opacity: 0 }}
          />
        </linearGradient>
      </defs>
      <path
        fill={fill}
        stroke="#FFA500"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M12 17.27l-6.18 3.73 1.64-7.03-5.46-4.73 7.04-.73L12 2l2.96 6.54 7.04.73-5.46 4.73 1.64 7.03z"
      />
    </svg>
  );
}

Star.propTypes = {
  filled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
};

export default Star;
