import React from "react";

const BookingSuccess = ({ ticketId }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-xl mb-6">Thank you for booking with us.</p>
        <div className="text-lg">
          <p>Your Ticket ID is:</p>
          <p className="text-3xl font-bold text-green-800 mt-2">{ticketId}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
