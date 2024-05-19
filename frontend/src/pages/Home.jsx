import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./../components/nav/NavBar.jsx";
import Ad from "./../components/ad/Ad.jsx";
import Footer from "./../components/footer/Footer.jsx";
import DatePicker from "react-date-picker";
import { FaExchangeAlt } from "react-icons/fa";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import AirportSelector from "./../components/airportSelector/airportSelector.jsx";

function Home() {
  const [departureCity, setDepartureCity] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const navigate = useNavigate();

  const handleCitySwitch = () => {
    const temp = departureCity;
    setDepartureCity(arrivalCity);
    setArrivalCity(temp);
  };

  const handleSearch = async () => {
    const requestData = {
      departureCity: departureCity?.value.city,
      arrivalCity: arrivalCity?.value.city,
      departureDate: departureDate.toISOString().split("T")[0], // Ensure the date is in the correct format
      departureAirport: departureCity?.value.name,
      arrivalAirport: arrivalCity?.value.name,
      departureCountry: departureCity?.value.country,
      arrivalCountry: arrivalCity?.value.country,
    };

    try {
      const response = await fetch("/api/airline/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/search", {
          state: { flights: data, searchCriteria: requestData },
        });
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <NavBar />
      <div className="mb-20 min-h-screen p-10">
        <Ad />
        <div className="mt-10 flex flex-col items-center bg-white p-10 rounded-lg shadow-md w-full ">
          <div className="flex flex-row items-center mb-4 w-full">
            <div className="flex-grow mr-2">
              <AirportSelector
                value={departureCity}
                onChange={setDepartureCity}
                placeholder="From"
              />
            </div>
            <button
              className="mx-2 p-2 bg-gray-200 rounded-full"
              onClick={handleCitySwitch}
            >
              <FaExchangeAlt />
            </button>
            <div className="flex-grow ml-2">
              <AirportSelector
                value={arrivalCity}
                onChange={setArrivalCity}
                placeholder="To"
              />
            </div>
          </div>

          <div className="flex flex-row items-center mb-4 w-full">
            <div className="flex-grow mr-2">
              <DatePicker
                value={departureDate}
                onChange={setDepartureDate}
                className="w-full"
              />
            </div>
          </div>

          <button
            className={`sm:mt-0 w-1/2 bg-primary text-secondaryBackground px-6 py-3 rounded-md border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-secondaryBackground hover:text-primary`}
            onClick={handleSearch}
          >
            Search Flights
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
