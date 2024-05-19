import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StepWizard from "react-step-wizard";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import ExtraLuggage from "./../components/ExtraLuggage/extraLuggage.jsx";
import SeatSelection from "./../components/SeatSelection/SeatSelection.jsx";
import PersonalInformation from "./../components/PersonalInformation/PersonalInformation.jsx";
import PaymentForm from "./../components/PaymentForm/PaymentForm.jsx";
import NavBar from "./../components/nav/NavBar.jsx";
import Footer from "./../components/footer/Footer.jsx";
import OrderSummary from "./../components/OrderSummary/OrderSummary.jsx";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);
  const [ticketID, setTicketID] = useState(null); // State for storing the Ticket ID
  const location = useLocation();
  const flight = location.state?.flight || {};

  const [formData, setFormData] = useState({
    personalInfo: {},
    seatSelection: {},
    extraLuggage: { extraLuggage: 0 },
    payment: { ticketStatus: "WAITING" }, // Initialize with WAITING status
    flight: flight,
  });

  const updateFormData = (stage, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [stage]: data,
    }));
  };

  const handleNext = () => {
    console.log("Current Form Data:", formData);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    console.log("Current Form Data:", formData);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinalSubmit = async () => {
    const seatPrice = formData.seatSelection.seatPrice || 0;
    const extraLuggagePrice = (formData.extraLuggage.extraLuggage || 0) * 100;

    let fines = 0;
    try {
      const finesResponse = await axios.get(
        `/api/user/fines/${formData.personalInfo.userId}`
      );
      fines = finesResponse.data.fines || 0;
    } catch (error) {
      console.error("Error fetching fines:", error);
    }

    const total = seatPrice + extraLuggagePrice + fines;
    setTotalPrice(total);

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePaymentSubmit = async () => {
    try {
      // Update payment status to PAYED
      const updatedFormData = {
        ...formData,
        payment: {
          ...formData.payment,
          ticketStatus: "PAYED",
        },
      };

      const response = await axios.post(
        "/api/airline/tickets/book",
        updatedFormData
      );
      setTicketID(response.data); // Store the Ticket ID from the response
      toast.success("Ticket booked successfully!");
      console.log("Response Data:", response.data);
    } catch (error) {
      toast.error("Error booking ticket. Please try again.");
      console.error("Error:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformation
            updateFormData={(data) => updateFormData("personalInfo", data)}
            formData={formData.personalInfo}
          />
        );
      case 2:
        return (
          <SeatSelection
            updateFormData={(data) => updateFormData("seatSelection", data)}
            formData={formData}
          />
        );
      case 3:
        return (
          <ExtraLuggage
            updateFormData={(data) => updateFormData("extraLuggage", data)}
            formData={formData.extraLuggage.extraLuggage}
          />
        );
      case 4:
        return (
          <button
            className="w-1/4 text-xl font-bold bg-primary text-white px-6 py-3 rounded-full border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-primary hover:bg-opacity-75"
            onClick={handleFinalSubmit}
          >
            Go to Payment
          </button>
        );
      case 5:
        return (
          <>
            <OrderSummary
              flight={flight}
              formData={formData}
              price={totalPrice}
            />
            {!ticketID && <PaymentForm onPay={handlePaymentSubmit} />}
            {ticketID && (
              <div className="confirmation-message p-6 bg-green-100 rounded-lg shadow-lg text-center mt-6">
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-lg">Thank you for booking with us.</p>
                <p className="text-lg">Your Ticket ID is:</p>
                <p className="text-2xl font-bold text-green-800">{ticketID}</p>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow container mx-auto p-6">
        {renderStep()}
        <div className="flex justify-between mt-4">
          {currentStep > 1 && currentStep < 5 && (
            <button
              className="w-1/4 text-xl font-bold bg-gray-500 text-white px-6 py-3 rounded-full border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-primary hover:bg-opacity-75"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {currentStep < 4 && (
            <button
              className="w-1/4 text-xl font-bold bg-primary text-white px-6 py-3 rounded-full border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-primary hover:bg-opacity-75"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MultiStepForm;
