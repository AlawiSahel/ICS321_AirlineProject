import { Link } from "react-router-dom";

function BookCard({
  id,
  title,
  subtitle,
  offerType = "",
  condition,
  newPrice,
  oldPrice,
  image,
}) {
  // Function to dynamically truncate the summary to fill the container
  const truncateSummary = (summary, charLimit) => {
    if (summary.length > charLimit) {
      return summary.substring(0, charLimit) + "...";
    }
    return summary;
  };
  return (
    <>
      <div className="flex flex-row w-full max-sm:flex-col max-sm:shadow-bottom-lg">
        <div className="w-60 h-80">
          {image != null ? (
            <img
              className="object-cover w-full h-full rounded-2xl"
              src={image}
              alt="Failed to upload image"
            />
          ) : (
            <div className="object-cover w-full h-full rounded-2xl text-center pt-10 bg-slate-200">
              Failed to upload image
            </div>
          )}

          <div className="relative text-white bottom-14 rounded-b-2xl  p-4 font-bold bg-gray-400 h-12 bg-opacity-50">
            For {offerType.slice(3)}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start justify-between p-4">
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-bold text-fontColorDarkBlue line-clamp-1">
              {title}
            </div>
            <div className="text-fontColorDarkBlue text-opacity-40 line-clamp-1">
              {truncateSummary(subtitle, 26)}
            </div>
            <div className="flex flex-row gap-10 text-lg">
              <div className="text-fontColorDarkBlue">
                Price: {newPrice} SAR
              </div>
              <div className="line-through text-fontColorDarkBlue text-opacity-40">
                {oldPrice}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <div className=" text-lg text-fontColorDarkBlue">Condtion:</div>
              {condition != "Poor" ? (
                <div className="bg-green-500 text-white font-extrabold py-2 px-6 rounded shadow-2xl ">
                  {condition}
                </div>
              ) : (
                <div className="bg-yellow-500 text-white font-extrabold py-2 px-6 rounded shadow-2xl ">
                  {condition === null ? "" : condition}
                </div>
              )}
            </div>

            <Link to={`/bookDescription?id=${id}`}>
              <div className="bg-primary hover:bg-orange-400 text-center text-white font-extrabold py-2 px-6 rounded shadow-2xl">
                Show Details
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
