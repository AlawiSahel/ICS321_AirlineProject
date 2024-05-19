import React from "react";
import { useNavigate } from "react-router-dom";

const FlightListing = ({ flight, userType }) => {
  const {
    id,
    departureCity,
    arrivalCity,
    departureTime,
    arrivalTime,
    departureDate,
    arrivalDate,
    departureAirport,
    arrivalAirport,
  } = flight;

  const navigate = useNavigate();

  const handleBookTicket = () => {
    navigate(`/flight`, { state: { flight } });
  };

  const handleModifyFlight = () => {
    navigate(`/manage-flight/${id}`);
  };

  return (
    <div className="p-4">
      <div
        className={`bg-primary p-8 flex flex-col sm:flex-row items-center mx-auto border-b mb-10 border-gray-200 rounded-lg md:h-76`}
      >
        <div className="flex-grow text-center sm:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-white text-xl title-font font-bold mb-2 truncate">
                Flight from {departureCity} to {arrivalCity}
              </div>
              <div className="text-white truncate">Flight ID: {id}</div>
              <div className="text-white truncate">
                Departure: {new Date(departureDate).toLocaleDateString()} at{" "}
                {departureTime}
              </div>
              <div className="text-white truncate">
                Arrival: {new Date(arrivalDate).toLocaleDateString()} at{" "}
                {arrivalTime}
              </div>
              <div className="text-white mt-2 truncate">
                Departure Airport: {departureAirport}
              </div>
              <div className="text-white truncate">
                Arrival Airport: {arrivalAirport}
              </div>
            </div>
          </div>
          {userType === "ADMIN" ? (
            <button
              onClick={handleModifyFlight}
              className="mt-4 px-4 py-2 bg-secondaryBackground text-primary rounded-md hover:bg-secondaryBackgroundDark transition duration-200 ease-in-out"
            >
              Manage Flight
            </button>
          ) : (
            <button
              onClick={handleBookTicket}
              className="mt-4 px-4 py-2 bg-secondaryBackground text-primary rounded-md hover:bg-secondaryBackgroundDark transition duration-200 ease-in-out"
            >
              Book Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightListing;
