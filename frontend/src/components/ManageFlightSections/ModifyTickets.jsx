import React, { useState, useEffect } from "react";
import axios from "axios";

const ModifyTickets = ({ tickets }) => {
  const [seatOptions, setSeatOptions] = useState({});
  const [updatedTickets, setUpdatedTickets] = useState(tickets);

  useEffect(() => {
    const fetchSeats = async (flightId) => {
      try {
        const response = await axios.get(
          `/api/airline/seats/flight/${flightId}`
        );
        const seatsData = response.data.reduce((acc, seat) => {
          if (seat.seatStatus === "AVAILABLE") {
            if (!acc[seat.seatClass]) acc[seat.seatClass] = [];
            acc[seat.seatClass].push(seat);
          }
          return acc;
        }, {});
        setSeatOptions(seatsData);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    if (tickets.length > 0) {
      fetchSeats(tickets[0].seat.flightId);
    }
  }, [tickets]);

  const handleSeatChange = async (ticket, newSeatNumber) => {
    const selectedSeat = seatOptions[ticket.seat.seatClass].find(
      (seat) => seat.seatNumber === newSeatNumber
    );

    if (selectedSeat) {
      try {
        const response = await axios.put(
          `/api/airline/tickets/${ticket.ticketNumber}/seat?flightId=${ticket.seat.flightId}&newSeatNumber=${newSeatNumber}`
        );
        if (response.status === 200) {
          // Update the ticket's seat in the state
          const updatedTickets = tickets.map((t) =>
            t.ticketNumber === ticket.ticketNumber
              ? { ...t, seat: selectedSeat }
              : t
          );
          setUpdatedTickets(updatedTickets);
          console.log("Seat updated successfully!");
        } else {
          console.error("Failed to update seat");
        }
      } catch (error) {
        console.error("Error updating seat:", error);
      }
    } else {
      console.error("Selected seat is not available in the same class");
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      const response = await axios.delete(`/api/airline/tickets/${ticketId}`);
      if (response.status === 200) {
        // Implement logic to remove ticket from state
        const updatedTickets = tickets.filter(
          (t) => t.ticketNumber !== ticketId
        );
        setUpdatedTickets(updatedTickets);
        console.log("Ticket deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Modify Tickets</h2>
      {updatedTickets.map((ticket) => (
        <div
          key={ticket.ticketNumber}
          className="mb-4 p-4 border border-gray-300 rounded-lg"
        >
          <p>
            <strong>Ticket Number:</strong> {ticket.ticketNumber}
          </p>
          <p>
            <strong>Passenger:</strong> {ticket.passenger.name}
          </p>
          <p>
            <strong>Seat:</strong> {ticket.seat.seatNumber} (
            {ticket.seat.seatClass})
          </p>
          <p>
            <strong>Price:</strong> ${ticket.price}
          </p>
          <p>
            <strong>Status:</strong> {ticket.status}
          </p>
          <div className="flex items-center">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md mr-4"
              onClick={() => handleDeleteTicket(ticket.ticketNumber)}
            >
              Delete Ticket
            </button>
            <select
              className="px-4 py-2 rounded-md border border-gray-300"
              onChange={(e) => handleSeatChange(ticket, e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select new seat
              </option>
              {seatOptions[ticket.seat.seatClass]?.map((seat) => (
                <option key={seat.seatNumber} value={seat.seatNumber}>
                  {seat.seatNumber}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModifyTickets;
