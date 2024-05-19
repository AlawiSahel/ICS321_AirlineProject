import React, { useState, useEffect } from "react";
import { FaSuitcase } from "react-icons/fa";
import "./style.css";
const ExtraLuggage = ({ updateFormData, formData }) => {
  const [extraLuggage, setExtraLuggage] = useState(formData.extraLuggage || 0);

  useEffect(() => {
    updateFormData({ extraLuggage });
  }, [extraLuggage, updateFormData]);

  const handleIncrease = () => {
    setExtraLuggage((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setExtraLuggage((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="extra-luggage-container">
      <h2>Extra Luggage</h2>
      <div className="luggage-controls">
        <button onClick={handleDecrease}>-</button>
        <span>{extraLuggage}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className="luggage-icons">
        {[...Array(extraLuggage)].map((_, index) => (
          <FaSuitcase key={index} className="luggage-icon" />
        ))}
      </div>
    </div>
  );
};

export default ExtraLuggage;
