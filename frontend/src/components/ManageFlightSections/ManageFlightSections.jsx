import React, { useState } from "react";
import ModifyFlightForm from "./ModifyFlightForm.jsx";
import ModifyTickets from "./ModifyTickets.jsx";

const ManageFlightSections = ({ flight, tickets }) => {
  const [activeSection, setActiveSection] = useState("modify");

  const renderSection = () => {
    switch (activeSection) {
      case "modify":
        return <ModifyFlightForm flight={flight} />;
      case "tickets":
        return <ModifyTickets tickets={tickets} />;
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
          <strong>Plane:</strong> {flight.plane.name} -{" "}
          {flight.plane.aircraft.model} - current airport:{" "}
          {flight.plane.currentAirport} - ID: {flight.plane.id}
        </p>
      </div>
      <div className="tabs flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md text-white ${
            activeSection === "modify"
              ? "bg-primary"
              : "bg-secondaryColor hover:bg-form"
          } transition duration-300`}
          onClick={() => setActiveSection("modify")}
        >
          Modify Flight
        </button>
        <button
          className={`px-4 py-2 rounded-md text-white ${
            activeSection === "tickets"
              ? "bg-primary"
              : "bg-secondaryColor hover:bg-form"
          } transition duration-300`}
          onClick={() => setActiveSection("tickets")}
        >
          Modify Tickets
        </button>
        <button
          className={`px-4 py-2 rounded-md text-white ${
            activeSection === "waitlist"
              ? "bg-primary"
              : "bg-secondaryColor hover:bg-form"
          } transition duration-300`}
          onClick={() => setActiveSection("waitlist")}
        >
          Show Waitlist
        </button>
        <button
          className={`px-4 py-2 rounded-md text-white ${
            activeSection === "report"
              ? "bg-primary"
              : "bg-secondaryColor hover:bg-form"
          } transition duration-300`}
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
