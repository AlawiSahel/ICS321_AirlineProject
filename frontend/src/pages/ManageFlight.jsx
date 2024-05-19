import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./../components/nav/NavBar.jsx";
import Footer from "./../components/footer/Footer.jsx";
import ManageFlightSections from "./../components/ManageFlightSections/ManageFlightSections.jsx";

export default function ManageFlight() {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const flightResponse = await fetch(`/api/airline/flights/${flightId}`);
        if (flightResponse.ok) {
          const flightData = await flightResponse.json();
          setFlight(flightData);
        } else {
          console.error("Failed to fetch flight data");
          navigate("/");
        }

        const ticketsResponse = await fetch(
          `/api/airline/tickets/getFlight/${flightId}`
        );
        if (ticketsResponse.ok) {
          const ticketsData = await ticketsResponse.json();
          setTickets(ticketsData);
        } else {
          console.error("Failed to fetch tickets data");
        }
      } catch (error) {
        console.error("Error fetching flight or tickets data:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [flightId, navigate]);

  return (
    <div className="">
      <NavBar />
      <main className="p-5 mb-10 min-h-screen">
        {loading ? (
          <p>Loading flight details...</p>
        ) : flight ? (
          <ManageFlightSections flight={flight} tickets={tickets} />
        ) : (
          <p>Flight not found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
