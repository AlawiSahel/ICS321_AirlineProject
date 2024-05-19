import React, { useState } from "react";

const Payment = ({ updateFormData, formData }) => {
  const [payment, setPayment] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value,
    });
  };

  const handleNext = () => {
    updateFormData(payment);
  };

  return (
    <div>
      <h2>Payment</h2>
      <input
        name="cardNumber"
        value={payment.cardNumber}
        onChange={handleChange}
        placeholder="Card Number"
      />
      <input
        name="expiryDate"
        value={payment.expiryDate}
        onChange={handleChange}
        placeholder="Expiry Date"
      />
      <input
        name="cvv"
        value={payment.cvv}
        onChange={handleChange}
        placeholder="CVV"
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Payment;
