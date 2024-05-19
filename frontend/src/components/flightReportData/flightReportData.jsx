import React from "react";

const flightReportData = {
  flightId: "1",
  departureCity: "Jeddah",
  arrivalCity: "Dammam",
  totalSeats: {
    FIRST: 10,
    BUSINESS: 20,
    ECONOMY: 100,
  },
  bookedSeats: {
    FIRST: 3,
    BUSINESS: 10,
    ECONOMY: 60,
  },
  availableSeats: {
    FIRST: 7,
    BUSINESS: 10,
    ECONOMY: 40,
  },
  totalPassengers: 73,
  extraLuggage: {
    total: 20,
    averagePerPassenger: 0.27,
  },
  revenue: 50000,
};

const FlightReport = () => {
  const {
    departureCity,
    arrivalCity,
    totalSeats,
    bookedSeats,
    availableSeats,
    totalPassengers,
    extraLuggage,
    revenue,
  } = flightReportData;

  return (
    <div className="flight-report-container p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Flight Report</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-lg">
            <strong>Departure City:</strong> {departureCity}
          </p>
          <p className="text-lg">
            <strong>Arrival City:</strong> {arrivalCity}
          </p>
          <p className="text-lg">
            <strong>Total Passengers:</strong> {totalPassengers}
          </p>
          <p className="text-lg">
            <strong>Total Revenue:</strong> ${revenue}
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold mb-4">Seat Information</h3>
          <p className="text-lg">
            <strong>First Class:</strong> {bookedSeats.FIRST} booked,{" "}
            {availableSeats.FIRST} available, {totalSeats.FIRST} total
          </p>
          <p className="text-lg">
            <strong>Business Class:</strong> {bookedSeats.BUSINESS} booked,{" "}
            {availableSeats.BUSINESS} available, {totalSeats.BUSINESS} total
          </p>
          <p className="text-lg">
            <strong>Economy Class:</strong> {bookedSeats.ECONOMY} booked,{" "}
            {availableSeats.ECONOMY} available, {totalSeats.ECONOMY} total
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-4">Extra Luggage Information</h3>
        <p className="text-lg">
          <strong>Total Extra Luggage:</strong> {extraLuggage.total}
        </p>
        <p className="text-lg">
          <strong>Average Extra Luggage per Passenger:</strong>{" "}
          {extraLuggage.averagePerPassenger}
        </p>
      </div>
    </div>
  );
};

export default FlightReport;
