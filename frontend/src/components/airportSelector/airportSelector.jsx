// components/airportSelector/airportSelector.jsx
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const AirportSelector = ({ value, onChange, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAirports = async () => {
      setLoading(true);
      try {
        let response;
        if (inputValue) {
          response = await axios.get(
            `https://api.api-ninjas.com/v1/airports?name=${inputValue}`,
            {
              headers: {
                "X-Api-Key": "sEB49VPiu5jM8byTSs976w==HSHXHcAbEiNhH8JF",
              },
            }
          );
        } else {
          // For nearest airports, use user's geolocation (for example purposes, using a static location)
          const userLat = 26.420683; // Replace with actual user latitude
          const userLng = 50.088795; // Replace with actual user longitude
          response = await axios.get(
            `https://api.api-ninjas.com/v1/airports?lat=${userLat}&lng=${userLng}`,
            {
              headers: {
                "X-Api-Key": "sEB49VPiu5jM8byTSs976w==HSHXHcAbEiNhH8JF",
              },
            }
          );
        }

        const airportOptions = response.data.map((airport) => ({
          value: airport.city,
          label: `${airport.name} (${airport.city})`,
        }));
        setOptions(airportOptions);
      } catch (error) {
        console.error("Error fetching airports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
  }, [inputValue]);

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      onInputChange={setInputValue}
      placeholder={placeholder}
      className="w-full"
      isLoading={loading}
    />
  );
};

export default AirportSelector;
