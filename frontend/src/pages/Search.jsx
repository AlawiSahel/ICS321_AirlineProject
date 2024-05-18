import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/nav/NavBar.jsx";
import Footer from "../components/footer/Footer.jsx";
import BookListing from "../components/bookListing/BookListing.jsx";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BooksList() {
  const [booksShown, setBooksShown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOfferTypes, setSelectedOfferTypes] = useState([]);
  const [sortMethod, setSortMethod] = useState("");
  const query = useQuery();
  const searchQuery = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      search: searchQuery,
      sort: sortMethod,
      offerType: selectedOfferTypes.join(","),
    }).toString();

    fetch(`http://localhost:5000/api/v1/books?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        const bookComponents = data.data.books.map((book) => (
          <BookListing
            key={book._id}
            bookId={book._id}
            bookTitle={book.title}
            bookImageUrl={book.image}
            bookSummary={book.description}
            bookOfferType={book.offerType}
            bookSeller={book.seller}
            bookPrice={book.price}
            bookCondition={book.bookCondition}
            bookDate={book.listingDate}
            bookAvailable={book.offerStatus}
            bookAuthor={book.author}
          />
        ));
        setBooksShown(bookComponents);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch books:", error);
        setLoading(false);
      });
  }, [searchQuery, selectedOfferTypes, sortMethod]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOfferTypes((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((type) => type !== value);
      }
    });
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  return (
    <>
      <NavBar />
      <div className="p-12 min-h-screen mb-10">
        {!searchQuery ? (
          <h1>No search query provided.</h1>
        ) : (
          <>
            <h1 className="inline">
              Search Results for "{searchQuery}" ({booksShown.length})
            </h1>
            <div>
              <label>Sort by:</label>
              <select
                onChange={handleSortChange}
                className="p-2 rounded-md text-white bg-primary ml-4"
              >
                <option value="">Select</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
                <option value="dateAsc">Date (Oldest to Newest)</option>
                <option value="dateDesc">Date (Newest to Oldest)</option>
              </select>
            </div>
            <div>
              Filter by Status:
              <label>
                <input
                  type="checkbox"
                  value="forRent"
                  onChange={handleCheckboxChange}
                />{" "}
                For Rent
              </label>
              <label>
                <input
                  type="checkbox"
                  value="forSale"
                  onChange={handleCheckboxChange}
                />{" "}
                For Sale
              </label>
              <label>
                <input
                  type="checkbox"
                  value="forExchange"
                  onChange={handleCheckboxChange}
                />{" "}
                For Exchange
              </label>
            </div>
            {loading ? (
              <p>Loading books...</p>
            ) : (
              <div>
                {booksShown.length > 0 ? (
                  booksShown
                ) : (
                  <p>No books found matching your criteria.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
