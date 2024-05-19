import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ModifyFlightForm = ({ flight }) => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureTime, setDepartureTime] = useState("10:00");
  const [arrivalTime, setArrivalTime] = useState("12:00");
  const navigate = useNavigate();

  useEffect(() => {
    if (flight) {
      setDepartureDate(new Date(flight.departureDate));
      setArrivalDate(new Date(flight.arrivalDate));
      setDepartureTime(flight.departureTime);
      setArrivalTime(flight.arrivalTime);
    }
  }, [flight]);

  const validateForm = () => {
    if (!departureDate || !arrivalDate || !departureTime || !arrivalTime) {
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
      departureDate,
      arrivalDate,
      departureTime: formatTime(departureTime),
      arrivalTime: formatTime(arrivalTime),
    };

    try {
      const response = await axios.put(
        `/api/airline/flights/${flight.id}`,
        requestData
      );
      if (response.status === 200) {
        toast.success("Flight modified successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000); // Navigate after 3 seconds
      }
    } catch (error) {
      toast.error("Error modifying flight. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container m-10 p-0">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-primary text-left mb-5">
          Modify Flight Date and Time
        </h1>
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
        <button
          className={`sm:mt-0 w-1/2 bg-primary text-secondaryBackground px-6 py-3 rounded-md border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-secondaryBackground hover:text-primary`}
          type="submit"
        >
          Modify Flight
        </button>
      </form>
    </div>
  );
};

export default ModifyFlightForm;
