import React, { useState } from "react";
import ModifyFlightForm from "./ModifyFlightForm.jsx";

const ManageFlightSections = ({ flight }) => {
  const [activeSection, setActiveSection] = useState("modify");

  const renderSection = () => {
    switch (activeSection) {
      case "modify":
        return <ModifyFlightForm flight={flight} />;
      case "tickets":
      // return <ModifyTickets flight={flight} />;
      case "waitlist":
      // return <ShowWaitlist flight={flight} />;
      case "report":
      // return <GenerateReport flight={flight} />;
      default:
        return <ModifyFlightForm flight={flight} />;
    }
  };

  return (
    <div>
      <div className="mb-6 p-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold mb-2">
          Flight from {flight.departureCity} to {flight.arrivalCity}
        </h1>
        <p>
          <strong>Flight ID:</strong> {flight.id}
        </p>
        <p>
          <strong>Departure Airport:</strong> {flight.departureAirport}
        </p>
        <p>
          <strong>Arrival Airport:</strong> {flight.arrivalAirport}
        </p>
        <p>
          <strong>Plane:</strong> `{flight.plane.name} -
          {flight.plane.aircraft.model} - current airport:
          {flight.plane.currentAirport} - ID: {flight.plane.id}`
        </p>
      </div>
      <div className="tabs">
        <button
          className={`tab ${activeSection === "modify" ? "active" : ""}`}
          onClick={() => setActiveSection("modify")}
        >
          Modify Flight
        </button>
        <button
          className={`tab ${activeSection === "tickets" ? "active" : ""}`}
          onClick={() => setActiveSection("tickets")}
        >
          Modify Tickets
        </button>
        <button
          className={`tab ${activeSection === "waitlist" ? "active" : ""}`}
          onClick={() => setActiveSection("waitlist")}
        >
          Show Waitlist
        </button>
        <button
          className={`tab ${activeSection === "report" ? "active" : ""}`}
          onClick={() => setActiveSection("report")}
        >
          Generate Report
        </button>
      </div>
      <div className="tab-content">{renderSection()}</div>
    </div>
  );
};

export default ManageFlightSections;
