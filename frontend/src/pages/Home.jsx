import NavBar from "./../components/nav/NavBar.jsx";
import Ad from "./../components/ad/Ad.jsx";
import GroupSlider from "./../components/slider/slider.jsx";
import BookCard from "./../components/bookCard/BookCard.jsx";
import Footer from "./../components/footer/Footer.jsx";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";

// const books = [
//   {
//     title: "1984",
//     subtitle: "A Novel by George Orwell",
//     offerType: "Selling",
//     condition: "Good",
//     newPrice: "$9.99",
//     oldPrice: "$12.99",
//     image:
//       "https://i.guim.co.uk/img/media/f51df963039740fa2cb5f1b6649e571a0d31579e/0_0_1355_2079/master/1355.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=0166526b8d4f5d40300085c26a427cea",
//   },
//   {
//     title: "To Kill a Mockingbird",
//     subtitle: "A Novel by Harper Lee",
//     offerType: "Borrowing",
//     condition: "Good",
//     newPrice: "$11.50",
//     oldPrice: "$14.99",
//     image: "https://m.media-amazon.com/images/I/91TCHkU6UrL._SY466_.jpg",
//   },
//   {
//     title: "The Hobbit",
//     subtitle: "A Novel by J.R.R. Tolkien",
//     offerType: "Swap",
//     condition: "Poor",
//     newPrice: "$8.00",
//     oldPrice: "$10.99",
//     image:
//       "https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium",
//   },
// ];

// http://localhost:5000/api/v1/books/

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/books/recommendations`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        setData(postsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForPosts();
  }, []);

  console.log(data);

  const books = data;

  console.log(books);

  return (
    // this code will be replaced by routes for all pages, but for now we keep it like this
    <div className="">
      <NavBar></NavBar>
      <div className="mb-20 min-h-screen p-10">
        <Ad></Ad>
        <div className="font-extrabold text-primary text-3xl mt-5 max-sm:text-2xl">
          Genres
        </div>

        <div className="mt-5 mb-5 p-4 mr-3 ml-3 rounded-lg gap-2 ">
          <GroupSlider />
        </div>

        <div className="font-extrabold text-primary text-3xl mt-5 max-sm:text-2xl mb-5">
          Recommendations
        </div>

        <div className="grid   gap-6 md:grid-cols-2 sm:grid-cols-1 max-sm:justify-center">
          {error ? (
            <>{error} please restart the page</>
          ) : loading ? (
            <ReactLoading
              type={"bars"}
              color={"#533737"}
              height={667}
              width={375}
            />
          ) : (
            data.data.books.map((book) => (
              <BookCard
                key={book._id}
                id={book._id}
                title={book.title}
                subtitle={book.description}
                offerType={book.offerType}
                condition={book.bookCondition}
                newPrice={book.price}
                oldPrice={book.oldPrice}
                image={book.image}
              />
            ))
          )}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Home;
