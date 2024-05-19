// components/planeSelector/PlaneSelector.jsx
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const PlaneSelector = ({ value, onChange, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlanes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/airline/planes");
        const planeOptions = response.data.map((plane) => ({
          value: plane.id,
          label: `${plane.name} - ${plane.aircraft.model} - current airport: ${plane.currentAirport} - ID: ${plane.id}`,
        }));
        setOptions(planeOptions);
      } catch (error) {
        console.error("Error fetching planes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, []);

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full"
      isLoading={loading}
    />
  );
};

export default PlaneSelector;
