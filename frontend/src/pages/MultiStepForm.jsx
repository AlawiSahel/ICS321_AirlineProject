import React, { useState } from "react";
import StepWizard from "react-step-wizard";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

import SeatSelection from "./../components/SeatSelection/SeatSelection.jsx";
import PersonalInformation from "./../components/PersonalInformation/PersonalInformation.jsx";
import Payment from "./../components/Payment/Payment.jsx";
import NavBar from "./../components/nav/NavBar.jsx";
import Footer from "./../components/footer/Footer.jsx";
import ExtraLuggage from "./../components/ExtraLuggage/extraLuggage.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    seatSelection: {},
    extraLuggage: 0,
    payment: {},
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
    const requestData = {
      ...formData.personalInfo,
      ...formData.seatSelection,
      extraLuggage: formData.extraLuggage,
      ...formData.payment,
    };

    console.log("Request Data: ", requestData);

    // Placeholder for actual API call
    // try {
    //   await axios.post('http://localhost:8081/api/airline/flights/book', requestData);
    //   toast.success('Ticket booked successfully!');
    // } catch (error) {
    //   toast.error('Error booking ticket. Please try again.');
    //   console.error('Error:', error);
    // }
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
            formData={formData.seatSelection}
          />
        );
      case 3:
        return (
          <ExtraLuggage
            updateFormData={(data) => updateFormData("extraLuggage", data)}
            formData={formData.extraLuggage}
          />
        );
      case 4:
        return (
          <Payment
            updateFormData={(data) => updateFormData("payment", data)}
            formData={formData.payment}
          />
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
          {currentStep > 1 && (
            <button
              className="w-1/4 text-xl font-bold bg-gray-500 text-white px-6 py-3 rounded-full border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-primary hover:bg-opacity-75"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button
              className="w-1/4 text-xl font-bold bg-primary text-white px-6 py-3 rounded-full border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-primary hover:bg-opacity-75"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="w-1/4 text-xl font-bold bg-primary text-white px-6 py-3 rounded-full border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-primary hover:bg-opacity-75"
              onClick={handleFinalSubmit}
            >
              Submit
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
