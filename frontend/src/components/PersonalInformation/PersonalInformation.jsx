import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "react-date-picker/dist/DatePicker.css";
import axios from "axios";
import "./../OrderDetails/style.css";

const documentTypeOptions = [
  { value: "PASSPORT", label: "Passport ID" },
  { value: "GOVID", label: "Government ID" },
];

const titleOptions = [
  { value: "Mr", label: "Mr." },
  { value: "Ms", label: "Ms." },
  { value: "Mss", label: "Mss." },
];

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "2.5rem",
    borderRadius: "9999px",
    backgroundColor: "rgba(151, 134, 134, 0.5)",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "none",
    paddingLeft: "1rem",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontWeight: "bold",
    color: "#a2a1a1",
  }),
};

const PersonalInformation = ({ updateFormData, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    phone: "",
    dateOfBirth: new Date(),
    nationality: "",
    email: "",
    membershipID: "",
    documentType: "",
    documentID: "",
    documentExpiryDate: new Date(),
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryOptions = response.data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    updateFormData(localFormData);
  }, [localFormData, updateFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handlePhoneChange = (value) => {
    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      phone: value,
    }));
  };

  const inputClassName =
    "pl-5 w-full h-10 placeholder-white placeholder-opacity-50 rounded-full bg-lightBrown50 shadow-md border-none resize-none focus:outline-none text-white";
  const labelClassName = "w-1/4 text-left text-primary font-bold";

  return (
    <div className="container m-10 p-0">
      <div className="flex flex-col justify-center items-center gap-10 lg:justify-start lg:items-start lg:flex-row">
        <div className="flex flex-col justify-start items-center p-0">
          <div className="flex flex-col space-y-6 w-full p-10 bg-white rounded-xl shadow-xl">
            <h1 className="text-2xl font-bold text-primary text-left mb-5">
              Personal Information
            </h1>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>First Name</label>
              <div className="flex-grow ml-5">
                <input
                  className={inputClassName}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={localFormData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Last Name</label>
              <div className="flex-grow ml-5">
                <input
                  className={inputClassName}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={localFormData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Title</label>
              <div className="flex-grow ml-5">
                <Select
                  name="title"
                  options={titleOptions}
                  styles={customSelectStyles}
                  placeholder="Select Title"
                  value={titleOptions.find(
                    (option) => option.value === localFormData.title
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange("title", selectedOption)
                  }
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Phone</label>
              <div className="flex-grow ml-5">
                <PhoneInput
                  className={inputClassName}
                  name="phone"
                  placeholder="Phone"
                  value={localFormData.phone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Date of Birth</label>
              <div className="flex-grow ml-5">
                <DatePicker
                  className={inputClassName}
                  value={localFormData.dateOfBirth}
                  onChange={(date) => handleDateChange("dateOfBirth", date)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Nationality</label>
              <div className="flex-grow ml-5">
                <Select
                  name="nationality"
                  options={countries}
                  styles={customSelectStyles}
                  placeholder="Select Nationality"
                  value={countries.find(
                    (option) => option.value === localFormData.nationality
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange("nationality", selectedOption)
                  }
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Email</label>
              <div className="flex-grow ml-5">
                <input
                  className={inputClassName}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={localFormData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Membership ID</label>
              <div className="flex-grow ml-5">
                <input
                  className={inputClassName}
                  type="text"
                  name="membershipID"
                  placeholder="Membership ID"
                  value={localFormData.membershipID}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Document Type</label>
              <div className="flex-grow ml-5">
                <Select
                  name="documentType"
                  options={documentTypeOptions}
                  styles={customSelectStyles}
                  placeholder="Select Document Type"
                  value={documentTypeOptions.find(
                    (option) => option.value === localFormData.documentType
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange("documentType", selectedOption)
                  }
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Document ID</label>
              <div className="flex-grow ml-5">
                <input
                  className={inputClassName}
                  type="text"
                  name="documentID"
                  placeholder="Document ID"
                  value={localFormData.documentID}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className={labelClassName}>Document Expiry Date</label>
              <div className="flex-grow ml-5">
                <DatePicker
                  className={inputClassName}
                  value={localFormData.documentExpiryDate}
                  onChange={(date) =>
                    handleDateChange("documentExpiryDate", date)
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
