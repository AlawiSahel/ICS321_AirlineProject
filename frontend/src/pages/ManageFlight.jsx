import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./../components/nav/NavBar.jsx";
import Footer from "./../components/footer/Footer.jsx";
import ManageFlightSections from "./../components/ManageFlightSections/ManageFlightSections.jsx";

export default function ManageFlight() {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await fetch(`/api/airline/flights/${flightId}`);
        if (response.ok) {
          const data = await response.json();
          setFlight(data);
        } else {
          console.error("Failed to fetch flight data");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
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
          <ManageFlightSections flight={flight} />
        ) : (
          <p>Flight not found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
