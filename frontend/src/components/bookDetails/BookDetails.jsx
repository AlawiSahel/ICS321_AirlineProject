export default function BookDetails({
  bookTitle = "",
  bookId,
  bookAuthor = "",
  bookImageUrl = "",
  bookStatus = "",
  bookDetails = "",
  bookDate = "",
  bookSeller = "",
}) {
  return (
    <>
      <div id={bookId} className="p-4">
        <div className="bg-primary pl-8 pt-12 pb-12 flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
          <div className="sm:w-32 sm:h-32 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
            <img src={bookImageUrl} className="w-32 rounded-md" />
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <div className="flex ">
              <div className="text-white w-full">
                <span className=" text-1xl title-font font-bold mb-2">
                  {bookTitle}
                </span>
                <br />
                <span>{bookDate}</span>
                <br />
                <br />
                <span>{bookSeller}</span>
              </div>
              <div className="leading-relaxed text-white text-lg ml-5 mr-5">
                {bookDetails}
              </div>
            </div>
            {/* This is for status */}
            <div className="w-full  md:w-1/2 flex space-x-3">
              <div className="w-1/3 bg-bookStatus flex justify-center items-center h-8 mt-5 rounded-xl  text-primary">
                Title
              </div>
              <div className="w-1/3 bg-bookStatus flex justify-center items-center h-8 mt-5 rounded-xl text-primary">
                Title
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
