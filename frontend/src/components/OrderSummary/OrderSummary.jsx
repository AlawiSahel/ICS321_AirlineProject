import React from "react";

const OrderSummary = ({ flight, formData, price }) => {
  return (
    <div className="order-summary-container p-6 bg-white rounded-lg shadow-lg mb-6 w-full mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Order Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-lg">
            <strong>Flight:</strong> {flight.departureCity} to{" "}
            {flight.arrivalCity}
          </p>
          <p className="text-lg">
            <strong>Departure:</strong>{" "}
            {new Date(flight.departureDate).toLocaleDateString()} at{" "}
            {flight.departureTime}
          </p>
          <p className="text-lg">
            <strong>Arrival:</strong>{" "}
            {new Date(flight.arrivalDate).toLocaleDateString()} at{" "}
            {flight.arrivalTime}
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <p className="text-lg">
            <strong>Passenger:</strong> {formData.personalInfo.firstName}{" "}
            {formData.personalInfo.lastName}
          </p>
          <p className="text-lg">
            <strong>Seat:</strong> {formData.seatSelection.seatNumber}
          </p>
          <p className="text-lg">
            <strong>Extra Luggage:</strong> {formData.extraLuggage.extraLuggage}
          </p>
          <p className="text-lg font-bold">
            <strong>Total Price:</strong> ${price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
