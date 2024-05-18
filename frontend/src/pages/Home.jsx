import NavBar from "./../components/nav/NavBar.jsx";
import Ad from "./../components/ad/Ad.jsx";
import Footer from "./../components/footer/Footer.jsx";
import { useState } from "react";
import DatePicker from "react-date-picker";
import Select from "react-select";
import { FaExchangeAlt } from "react-icons/fa";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import AirportSelector from "./../components/airportSelector/airportSelector.jsx";

function Home() {
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [flightClass, setFlightClass] = useState(null);

  const flightClasses = [
    { value: "guest", label: "Guest Class" },
    { value: "business", label: "Business Class" },
    { value: "first", label: "First Class" },
  ];

  const handleCitySwitch = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = () => {
    // Implement search functionality
  };

  return (
    <div className="">
      <NavBar />
      <div className="mb-20 min-h-screen p-10">
        <Ad />
        <div className="mt-10 flex flex-col items-center bg-white p-10 rounded-lg shadow-md w-full max-w-screen-lg">
          <div className="flex flex-row items-center mb-4 w-full">
            <div className="flex-grow mr-2">
              <AirportSelector
                value={fromCity}
                onChange={setFromCity}
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
                value={toCity}
                onChange={setToCity}
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
            <div className="flex-grow ml-2">
              <DatePicker
                value={arrivalDate}
                onChange={setArrivalDate}
                className="w-full"
              />
            </div>
            <div className="flex-grow ml-2">
              <Select
                options={flightClasses}
                value={flightClass}
                onChange={setFlightClass}
                placeholder="Class"
                className="w-full"
              />
            </div>
          </div>

          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full w-full max-w-xs"
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
