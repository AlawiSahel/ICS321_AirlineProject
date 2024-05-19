import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import AirportSelector from "./../airportSelector/airportSelector.jsx";
import PlaneSelector from "./../PlaneSelector/PlaneSelector.jsx";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import { FaExchangeAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const FlightForm = () => {
  const [departureCity, setDepartureCity] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureTime, setDepartureTime] = useState("10:00");
  const [arrivalTime, setArrivalTime] = useState("12:00");
  const [plane, setPlane] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      !departureCity ||
      !arrivalCity ||
      !departureDate ||
      !arrivalDate ||
      !departureTime ||
      !arrivalTime ||
      !plane
    ) {
      toast.error("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const requestData = {
      departureCity: departureCity?.value.city,
      arrivalCity: arrivalCity?.value.city,
      departureDate,
      arrivalDate,
      departureTime: formatTime(departureTime),
      arrivalTime: formatTime(arrivalTime),
      departureAirport: departureCity?.value.name,
      arrivalAirport: arrivalCity?.value.name,
      departureCountry: departureCity?.value.country,
      arrivalCountry: arrivalCity?.value.country,
      planeId: plane?.value,
    };

    try {
      const response = await axios.post(
        "/api/airline/flights/add",
        requestData
      );
      if (response.status === 200) {
        toast.success("Flight added successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000); // Navigate after 3 seconds
      }
    } catch (error) {
      toast.error("Error adding flight. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container m-10 p-0">
      <ToastContainer />
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
            type="button"
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
          className={`sm:mt-0 w-1/2 bg-primary text-secondaryBackground px-6 py-3 rounded-md border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-secondaryBackground hover:text-primary`}
          type="submit"
        >
          Submit Flight
        </button>
      </form>
    </div>
  );
};

export default FlightForm;
