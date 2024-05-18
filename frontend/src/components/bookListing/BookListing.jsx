import React from "react";
import { Link } from "react-router-dom";

const BookListing = ({
  bookTitle = "",
  bookId,
  bookAuthor = "",
  bookImageUrl = "",
  bookOfferType = "",
  bookSummary = "",
  bookDate = null,
  bookSeller = "",
  bookPrice = "",
  bookCondition = "",
  bookAvailable = false,
}) => {
  // Format the date if it's not null
  const formattedDate = bookDate ? new Date(bookDate).toLocaleDateString() : "";

  // Function to dynamically truncate the summary to fill the container
  const truncateSummary = (summary, maxHeight = 80, lineHeight = 20) => {
    const maxLines = maxHeight / lineHeight; // Calculate how many lines fit in the given height
    const avgCharsPerLine = 50; // Rough estimate of average characters per line
    const charLimit = avgCharsPerLine * maxLines;

    if (summary.length > charLimit) {
      return summary.substring(0, charLimit) + "...";
    }
    return summary;
  };

  return (
    <>
      <div id={bookId} className="p-4">
        <div
          className={`bg-primary p-8 flex flex-col sm:flex-row items-center mx-auto border-b mb-10 border-gray-200 rounded-lg md:h-76`}
        >
          <div className="flex-shrink-0 w-full sm:w-48 sm:h-48 m-4 p-2">
            <img
              src={bookImageUrl}
              className="w-full h-full object-cover rounded-md"
              alt="Book cover"
              style={{ aspectRatio: "1 / 1" }}
            />
            <Link to={`/bookDescription?id=${bookId}`}>
              <div className="font-extrabold bg-bookStatus flex justify-center items-center rounded-xl text-primary px-2 py-1 w-full sm:w-auto">
                Show Details
              </div>
            </Link>
          </div>
          <div className="flex-grow text-center sm:text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-white text-xl title-font font-bold mb-2 truncate">
                  {bookTitle}
                </div>
                <div className="text-white truncate">{bookAuthor}</div>
                <div className="text-white mt-2 truncate">
                  Posted on: {formattedDate}
                </div>
                <div className="text-white truncate">Sold by: {bookSeller}</div>
              </div>
              <div
                className="text-white text-lg overflow-hidden"
                style={{ maxHeight: "80px" }}
              >
                {truncateSummary(bookSummary, 80)}
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <div className="bg-bookStatus flex justify-center items-center rounded-xl text-primary px-2 py-1 w-full sm:w-auto">
                For {bookOfferType.slice(3)}: {bookPrice} SAR
              </div>
              <div className="bg-bookStatus flex justify-center items-center rounded-xl text-primary px-2 py-1 w-full sm:w-auto">
                Condition: {bookCondition}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookListing;
