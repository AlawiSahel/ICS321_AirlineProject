import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
const SeatSelection = ({ updateFormData, formData }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(
    formData.seatSelection.seatNumber || ""
  );
  const flightID = formData.flight.id;

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `/api/airline/seats/flight/${flightID}`
        ); // Use dynamic flightID
        const sortedSeats = response.data.sort((a, b) => {
          const classOrder = ["FIRST", "BUSINESS", "ECONOMY"];
          return (
            classOrder.indexOf(a.seatClass) - classOrder.indexOf(b.seatClass)
          );
        });
        setSeats(sortedSeats);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, []);

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat.seatNumber);
    updateFormData(seat);
  };

  const renderSeats = () => {
    return seats.map((seat) => (
      <div
        key={seat.seatNumber}
        className={`seat ${seat.seatClass.toLowerCase()} ${seat.seatStatus === "AVAILABLE" ? "available" : "unavailable"} ${selectedSeat === seat.seatNumber ? "selected" : ""}`}
        onClick={() =>
          seat.seatStatus === "AVAILABLE" && handleSeatSelect(seat)
        }
      >
        {seat.seatNumber}
        <div className="seat-class">{seat.seatClass}</div>
        <div className="seat-price">${seat.seatPrice}</div>
      </div>
    ));
  };

  return (
    <div className="seat-selection-container">
      <h2>Seat Selection</h2>
      <div className="seats-grid">{renderSeats()}</div>
    </div>
  );
};

export default SeatSelection;
