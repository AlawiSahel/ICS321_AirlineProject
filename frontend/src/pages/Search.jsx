import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/nav/NavBar.jsx";
import Footer from "../components/footer/Footer.jsx";
import FlightListing from "../components/flightListing/FlightListing.jsx";

export default function Search() {
  const location = useLocation();
  const [flightsShown, setFlightsShown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const username = localStorage.getItem("currentUser");
      if (username) {
        try {
          const response = await fetch(
            `/api/airline/users/userDetails?email=${username}`
          );
          if (response.ok) {
            const data = await response.json();
            setIsAdmin(data.userType === "ADMIN");
          } else {
            throw new Error("Request failed");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchAvailableSeats = async (flightId) => {
      try {
        const response = await fetch(
          `/api/airline/seats/available/${flightId}`
        );
        if (response.ok) {
          const data = await response.json();
          return data.filter((seat) => seat.seatStatus === "AVAILABLE").length;
        } else {
          console.error("Failed to fetch available seats");
          return 0;
        }
      } catch (error) {
        console.error("Error fetching available seats:", error);
        return 0;
      }
    };

    const fetchData = async () => {
      setLoading(true);

      await fetchUserData();

      if (location.state && location.state.flights) {
        const flights = location.state.flights;
        const updatedFlights = await Promise.all(
          flights.map(async (flight) => {
            const availableSeats = await fetchAvailableSeats(flight.id);
            return { ...flight, availableSeats };
          })
        );
        setFlightsShown(updatedFlights);
      }

      setLoading(false);
      setSearchCriteria(location.state.searchCriteria || {});
    };

    fetchData();
  }, [location.state]);

  const formattedDate = searchCriteria.departureDate
    ? new Date(searchCriteria.departureDate).toLocaleDateString()
    : "Invalid Date";

  return (
    <>
      <NavBar />
      <div className="p-12 min-h-screen mb-10">
        {loading ? (
          <p>Loading flights...</p>
        ) : (
          <div>
            {flightsShown.length > 0 ? (
              <>
                <h1 className="text-xl font-bold mb-4">
                  Found {flightsShown.length} flights from{" "}
                  {searchCriteria.departureCity} to {searchCriteria.arrivalCity}{" "}
                  on {formattedDate}.
                </h1>
                {flightsShown.map((flight) => (
                  <FlightListing
                    key={flight.id}
                    flight={flight}
                    userType={isAdmin ? "ADMIN" : "USER"}
                  />
                ))}
              </>
            ) : (
              <p>No flights found matching your criteria.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
