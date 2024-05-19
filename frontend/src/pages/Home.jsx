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
  const [departureCity, setDepartureCity] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [seatClass, setSeatClass] = useState(null);

  const flightClasses = [
    { value: "guest", label: "Guest Class" },
    { value: "business", label: "Business Class" },
    { value: "first", label: "First Class" },
  ];

  const handleCitySwitch = () => {
    const temp = departureCity;
    setDepartureCity(arrivalCity);
    setArrivalCity(temp);
  };

  const handleSearch = () => {
    const requestData = {
      departureCity: departureCity?.value.city,
      arrivalCity: arrivalCity?.value.city,
      departureDate,
      arrivalDate,
      departureAirport: departureCity?.value.name,
      arrivalAirport: arrivalCity?.value.name,
      departureCountry: departureCity?.value.country,
      arrivalCountry: arrivalCity?.value.country,
      seatClass: seatClass?.value,
    };

    console.log("Request Data: ", requestData);
    // Implement search functionality
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
                value={seatClass}
                onChange={setSeatClass}
                placeholder="Class"
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
