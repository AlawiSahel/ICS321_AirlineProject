import { FaUser } from "react-icons/fa";
import { PiLockFill } from "react-icons/pi";
import NavBar from "./../components/nav/NavBar.jsx";
import { HiMail } from "react-icons/hi";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Select from "react-select";

function SignUp() {
  const titleOptions = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Ms.", label: "Ms." },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "2.5rem", // Adjust height to match your other inputs
      borderRadius: "0.5rem", // Tailwind rounded-lg
      backgroundColor: "rgba(151, 134, 134, 0.5)", // Tailwind bg-[#53373750]
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Tailwind shadow-md
      border: "none",
      paddingLeft: "1rem", // Tailwind pl-4
      color: "white", // Placeholder text color
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: "bold", // Tailwind font-bold
      color: "white", // Tailwind text-white or any color you want
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure dropdown is above other elements
      color: "black", // Options text color
    }),
    option: (provided) => ({
      ...provided,
      color: "black", // Options text color
      backgroundColor: "white", // Option background color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white", // Selected value text color
    }),
  };

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,14}$/;

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });

      // Clear error message when input changes
      setErrorMessages({
        ...errorMessages,
        [name]: "",
      });
    } else {
      // Handle react-select change
      setFormData({
        ...formData,
        title: e.value,
      });

      // Clear error message for title
      setErrorMessages({
        ...errorMessages,
        title: "",
      });
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });

    // Clear error message when input changes
    setErrorMessages({
      ...errorMessages,
      phone: "",
    });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.firstName) {
      errors.firstName = "Please enter your first name";
      isValid = false;
    } else if (!nameRegex.test(formData.firstName)) {
      errors.firstName = "Name should contain only letters";
      isValid = false;
    }

    if (!formData.lastName) {
      errors.lastName = "Please enter your last name";
      isValid = false;
    } else if (!nameRegex.test(formData.lastName)) {
      errors.lastName = "Name should contain only letters";
      isValid = false;
    }

    if (!formData.title) {
      errors.title = "Please choose a title";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Please enter your email";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Please enter your password";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be 6-14 characters, contain at least one uppercase letter, one lowercase letter, and one number";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) {
      return;
    }
    try {
      let userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userType: "CUSTOMER",
      };
      console.log(JSON.stringify(userData));
      const response = await fetch("/api/airline/users/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Check if the response status is OK (200-299)
      if (response.ok) {
        localStorage.setItem("currentUser", JSON.stringify(formData.email));
        navigate("/");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="gradient-form h-full bg-white">
      <NavBar />
      <div className="container size-8/12 py-5 m-auto">
        <div className="flex flex-wrap h-full shadow-2xl rounded-lg items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-backGround shadow-lg light:bg-neutral-800">
              <div className="g-0">
                <div className="px-4 md:px-0 lg:w-full">
                  <div className="grid grid-cols-2 max-md:flex max-sm:flex">
                    <form
                      onSubmit={submitForm}
                      className="p-12 max-md:w-full max-sm:w-full gap-y-2 grid"
                    >
                      <div
                        className={`relative mb-4 bg-backGround ${errorMessages.title && "has-error"}`}
                        data-twe-input-wrapper-init
                      >
                        <Select
                          name="title"
                          id="title"
                          options={titleOptions}
                          styles={customSelectStyles}
                          placeholder="Title"
                          value={
                            titleOptions.find(
                              (option) => option.value === formData.title
                            ) || ""
                          }
                          onChange={(option) =>
                            handleChange({
                              target: { name: "title", value: option.value },
                            })
                          }
                          className="w-full"
                          required
                        />
                        {errorMessages.title && (
                          <span className="text-red-500 text-xs mt-1">
                            {errorMessages.title}
                          </span>
                        )}
                      </div>

                      <div
                        className={`relative mb-4 bg-backGround ${errorMessages.firstName && "has-error"}`}
                        data-twe-input-wrapper-init
                      >
                        <input
                          type="text"
                          className={`pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear peer-focus:text-primary motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${errorMessages.firstName && "border-red-500"}`}
                          id="firstName"
                          name="firstName"
                          placeholder=""
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="firstName"
                          className={`absolute text-base dark:peer-focus:text-primary text-white duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${formData.firstName && "text-primary"}`}
                        >
                          <FaUser className="text-primary" /> First Name
                        </label>
                        {errorMessages.firstName && (
                          <span className="text-red-500 text-xs mt-1">
                            {errorMessages.firstName}
                          </span>
                        )}
                      </div>
                      <div
                        className={`relative mb-4 bg-backGround ${errorMessages.lastName && "has-error"}`}
                        data-twe-input-wrapper-init
                      >
                        <input
                          type="text"
                          className={`pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear peer-focus:text-primary motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${errorMessages.lastName && "border-red-500"}`}
                          id="lastName"
                          name="lastName"
                          placeholder=""
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="lastName"
                          className={`absolute text-base dark:peer-focus:text-primary text-white duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${formData.lastName && "text-primary"}`}
                        >
                          <FaUser className="text-primary" /> Last Name
                        </label>
                        {errorMessages.lastName && (
                          <span className="text-red-500 text-xs mt-1">
                            {errorMessages.lastName}
                          </span>
                        )}
                      </div>
                      <div
                        className={`relative mb-4 bg-backGround ${errorMessages.email && "has-error"}`}
                        data-twe-input-wrapper-init
                      >
                        <input
                          type="email"
                          className={`pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear peer-focus:text-primary motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${errorMessages.email && "border-red-500"}`}
                          id="email"
                          name="email"
                          placeholder=""
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="email"
                          className={`absolute text-base dark:peer-focus:text-primary text-white duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${formData.email && "text-primary"}`}
                        >
                          <HiMail className="text-primary" /> Email
                        </label>
                        {errorMessages.email && (
                          <span className="text-red-500 text-xs mt-1">
                            {errorMessages.email}
                          </span>
                        )}
                      </div>

                      <div
                        className={`relative mb-4 bg-backGround ${errorMessages.phone && "has-error"}`}
                        data-twe-input-wrapper-init
                      >
                        <div className="pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear peer-focus:text-primary motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary">
                          <PhoneInput
                            className="phone-input w-full"
                            id="phone"
                            name="phone"
                            defaultCountry="SA"
                            placeholder=""
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            style={{
                              backgroundColor: "#53373750",
                              border: "none",
                              color: "black",
                              borderRadius: "0.5rem",
                              padding: "0.42rem 1.5rem",
                              outline: "none",
                              transition: "all 0.2s ease-linear",
                            }}
                          />
                        </div>
                        <label
                          htmlFor="phone"
                          className={`absolute text-base dark:peer-focus:text-primary text-white duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${formData.phone && "text-primary"}`}
                        >
                          <FaPhoneAlt className="text-primary" /> Phone Number
                        </label>
                        {errorMessages.phone && (
                          <span className="text-red-500 text-xs mt-1">
                            {errorMessages.phone}
                          </span>
                        )}
                      </div>

                      <div
                        className={`relative mb-4 bg-backGround ${errorMessages.password && "has-error"}`}
                        data-twe-input-wrapper-init
                      >
                        <input
                          type="password"
                          className={`pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear peer-focus:text-primary motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${errorMessages.password && "border-red-500"}`}
                          id="password"
                          name="password"
                          placeholder=""
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="password"
                          className={`absolute text-base dark:peer-focus:text-primary text-white duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${formData.password && "text-primary"}`}
                        >
                          <PiLockFill className="text-primary" /> Password
                        </label>
                        {errorMessages.password && (
                          <span className="text-red-500 text-xs mt-1">
                            {errorMessages.password}
                          </span>
                        )}
                      </div>
                      <div
                        className={`relative mb-4 bg-backGround ${errorMessages.confirmPassword && "has-error"}`}
                        data-twe-input-wrapper-init
                      >
                        <input
                          type="password"
                          className={`pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear peer-focus:text-primary motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${errorMessages.confirmPassword && "border-red-500"}`}
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder=""
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="confirmPassword"
                          className={`absolute text-base dark:peer-focus:text-primary text-white duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${formData.confirmPassword && "text-primary"}`}
                        >
                          <PiLockFill className="text-primary" /> Confirm
                          Password
                        </label>
                        {errorMessages.confirmPassword && (
                          <span className="text-red-500 text-xs mt-1">
                            {errorMessages.confirmPassword}
                          </span>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="hover:scale-105 my-4 inline-block w-full rounded-lg px-6 pb-1 pt-1 text-base font-bold leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-primary"
                      >
                        Sign Up
                      </button>
                      <div className="flex items-center justify-center text-center">
                        <p className="mb-0 me-2 text-black">
                          Do have an account?{" "}
                          <a
                            className="text-primary no-underline"
                            href="SignIn"
                          >
                            <br />
                            Login
                          </a>
                        </p>
                      </div>
                    </form>
                    <div className="text-center rounded-lg max-sm:hidden max-md:hidden">
                      <div className="rounded-lg h-full w-100 bg-cover bg-no-repeat bg-center bg-[url('src/assets/background.svg')]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
