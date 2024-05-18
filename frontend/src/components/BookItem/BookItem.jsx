import PropTypes from "prop-types";
import "./../HorizontalBookSlider/style.css";
import { Link } from "react-router-dom";

const BookItem = ({
  bookTitle = "",
  bookId,
  bookImageUrl = "",
  bookOfferType = "",
  bookPrice = "",
  bookAvailable = false,
}) => {
  const tagClass = bookAvailable
    ? "text-green-600 bg-green-200 bg-opacity-75"
    : "text-gray-600 bg-gray-200 bg-opacity-75";

  return (
    <div className="flex flex-col items-center relative p-5 ">
      <Link to={`/bookDescription?id=${bookId}`}>
        <div className="relative w-48 h-72">
          {bookAvailable !== undefined && ( // Only render the tag if active prop is provided
            <div
              className={`absolute top-0 right-0 m-2 py-1 px-3 text-xs font-bold rounded-full ${tagClass}`}
            >
              {bookAvailable ? "Active" : "Expired"}
            </div>
          )}
          <img
            src={bookImageUrl}
            alt={bookTitle}
            className="object-cover object-center w-full h-full rounded-xl shadow-lg transition-opacity duration-300 ease-in-out group-hover:opacity-75"
          />
          <div className="absolute h-10 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-50 text-white text-sm flex items-center justify-center font-bold rounded-b-xl">
            For {bookOfferType.slice(3)}: {bookPrice} SAR
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="m-0 p-0 text-lg font-bold text-primary text-black no-underline">
            {bookTitle}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default BookItem;
