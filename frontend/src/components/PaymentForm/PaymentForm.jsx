import React from "react";

const PaymentForm = ({ onPay }) => {
  const handlePay = () => {
    // Handle payment logic here
    onPay();
  };

  return (
    <div className="payment-form-container p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Card Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="1234 1234 1234 1234"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expiry Date</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="MM/YY"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CVV</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="123"
          />
        </div>
        <button
          type="button"
          onClick={handlePay}
          className="w-full text-xl font-bold bg-primary text-white px-6 py-3 rounded-full border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-primary hover:bg-opacity-75"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
