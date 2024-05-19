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
        let airportOptions = [];

        if (inputValue) {
          const airportResponse = await axios.get(
            `https://api.api-ninjas.com/v1/airports?name=${inputValue}`,
            {
              headers: {
                "X-Api-Key": "sEB49VPiu5jM8byTSs976w==HSHXHcAbEiNhH8JF",
              },
            }
          );

          const cityResponse = await axios.get(
            `https://api.api-ninjas.com/v1/airports?city=${inputValue}`,
            {
              headers: {
                "X-Api-Key": "sEB49VPiu5jM8byTSs976w==HSHXHcAbEiNhH8JF",
              },
            }
          );

          airportOptions = [...airportResponse.data, ...cityResponse.data].map(
            (airport) => ({
              value: airport,
              label: `${airport.name} (${airport.city})`,
            })
          );

          // Remove duplicate entries
          airportOptions = airportOptions.filter(
            (option, index, self) =>
              index ===
              self.findIndex((t) => t.value.iata === option.value.iata)
          );
        }

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
