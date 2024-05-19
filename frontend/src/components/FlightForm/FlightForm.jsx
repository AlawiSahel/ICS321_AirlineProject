import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { TimePicker } from "react-time-picker";
import AirportSelector from "./../airportSelector/airportSelector.jsx";
import PlaneSelector from "./../PlaneSelector/PlaneSelector.jsx";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import { FaExchangeAlt } from "react-icons/fa";

const FlightForm = () => {
  const [departureCity, setDepartureCity] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureTime, setDepartureTime] = useState("10:00");
  const [arrivalTime, setArrivalTime] = useState("12:00");
  const [plane, setPlane] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      departureCity: departureCity?.value.city,
      arrivalCity: arrivalCity?.value.city,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      departureAirport: departureCity?.value.name,
      arrivalAirport: arrivalCity?.value.name,
      departureCountry: departureCity?.value.country,
      arrivalCountry: arrivalCity?.value.country,
      planeId: plane?.value,
    };

    console.log("Request Data: ", requestData);
    // Implement form submission logic
  };

  return (
    <div className="container m-10 p-0">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-primary text-left mb-5">
          Add Flight Details
        </h1>
        <div className="flex flex-row items-center mb-4 w-full">
          <div className="flex-grow mr-2">
            <AirportSelector
              value={departureCity}
              onChange={setDepartureCity}
              placeholder="Departure City"
            />
          </div>
          <button
            className="mx-2 p-2 bg-gray-200 rounded-full"
            onClick={() => {
              const temp = departureCity;
              setDepartureCity(arrivalCity);
              setArrivalCity(temp);
            }}
          >
            <FaExchangeAlt />
          </button>
          <div className="flex-grow ml-2">
            <AirportSelector
              value={arrivalCity}
              onChange={setArrivalCity}
              placeholder="Arrival City"
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
        </div>
        <div className="flex flex-row items-center mb-4 w-full">
          <div className="flex-grow mr-2">
            <TimePicker
              value={departureTime}
              onChange={setDepartureTime}
              className="w-full"
            />
          </div>
          <div className="flex-grow ml-2">
            <TimePicker
              value={arrivalTime}
              onChange={setArrivalTime}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-row items-center mb-4 w-full">
          <div className="flex-grow mr-2">
            <PlaneSelector
              value={plane}
              onChange={setPlane}
              placeholder="Select Plane"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-white font-bold py-2 px-4 rounded-full w-full max-w-xs"
        >
          Submit Flight
        </button>
      </form>
    </div>
  );
};

export default FlightForm;
