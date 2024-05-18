import { FaUser } from "react-icons/fa";
import { PiLockFill } from "react-icons/pi";
import NavBar from "./../components/nav/NavBar.jsx";
import { HiMail } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,14}$/;

  const handleChange = (e) => {
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
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (formData.name === "") {
      errors.name = "Please enter your name";
      isValid = false;
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Name should contain only letters";
      isValid = false;
    }

    if (formData.username === "") {
      errors.username = "Please enter your username";
      isValid = false;
    }

    if (formData.email === "") {
      errors.email = "Please enter your email";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formData.password === "") {
      errors.password = "Please enter your password";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be 6-14 characters, contain at least one uppercase letter, one lowercase letter, and one number";
      isValid = false;
    }

    if (formData.confirmPassword === "") {
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
      // If the form data is valid, send it to the backend
      // adjust the path to the correct server endpoint
      // await axios.post("http://localhost:5000/api/v1/users", formData);

      let userData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      fetch("http://localhost:5000/api/v1/users/signup", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            localStorage.setItem("currentUser", JSON.stringify(userData));
            console.log(data);

            navigate("/");
          }
          alert(data.message, "userRegister");
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="gradient-form h-full  bg-white">
        <NavBar />
        <div className="container size-8/12 py-5 m-auto ">
          <div className="flex flex-wrap h-full shadow-2xl rounded-lg items-center justify-center text-neutral-800 dark:text-neutral-200 ">
            <div className="w-full ">
              <div className=" block rounded-lg   bg-backGround shadow-lg light:bg-neutral-800 ">
                <div className="g-0 ">
                  <div className="px-4 md:px-0 lg:w-full">
                    <div className="">
                      <div className="grid grid-cols-2  max-md:flex max-sm:flex ">
                        <form
                          onSubmit={submitForm}
                          className=" p-12  max-md:w-full max-sm:w-full gap-y-2 grid"
                        >
                          {/* the input for the name */}
                          <div
                            className={`relative mb-4  bg-backGround ${
                              errorMessages.name && "has-error"
                            }`}
                            data-twe-input-wrapper-init
                          >
                            <input
                              type="text"
                              className={`pl-1.5 peer  block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base  py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear  peer-focus:text-primary  motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${
                                errorMessages.name && "border-red-500"
                              }`}
                              id="name"
                              name="name"
                              placeholder=""
                              value={formData.name}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="name"
                              className={`absolute text-base dark:peer-focus:text-primary text-white  duration-200 transform -translate-y-4  scale-85 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
                                formData.name && "text-primary"
                              }`}
                            >
                              <FaUser className="text-primary" /> Name
                            </label>
                            {errorMessages.name && (
                              <span className="text-red-500 text-xs mt-1">
                                {errorMessages.name}
                              </span>
                            )}
                          </div>
                          {/* the input for the username */}
                          <div
                            className={`relative mb-4  bg-backGround ${
                              errorMessages.username && "has-error"
                            }`}
                            data-twe-input-wrapper-init
                          >
                            <input
                              type="text"
                              className={`pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base  py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear  peer-focus:text-primary  motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${
                                errorMessages.username && "border-red-500"
                              }`}
                              id="username"
                              name="username"
                              placeholder=""
                              value={formData.username}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="username"
                              className={`absolute text-base dark:peer-focus:text-primary text-white  duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
                                formData.username && "text-primary"
                              }`}
                            >
                              <FaUser className="text-primary" /> Username
                            </label>
                            {errorMessages.username && (
                              <span className="text-red-500 text-xs mt-1">
                                {errorMessages.username}
                              </span>
                            )}
                          </div>

                          {/* the input for the email */}
                          <div
                            className={`relative mb-4  bg-backGround ${
                              errorMessages.email && "has-error"
                            }`}
                            data-twe-input-wrapper-init
                          >
                            <input
                              type="email"
                              className={`pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base  py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear  peer-focus:text-primary  motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${
                                errorMessages.email && "border-red-500"
                              }`}
                              id="email"
                              name="email"
                              placeholder=""
                              value={formData.email}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="email"
                              className={`absolute text-base dark:peer-focus:text-primary text-white  duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
                                formData.email && "text-primary"
                              }`}
                            >
                              <HiMail className="text-primary" /> Email
                            </label>
                            {errorMessages.email && (
                              <span className="text-red-500 text-xs mt-1">
                                {errorMessages.email}
                              </span>
                            )}
                          </div>

                          {/* the input for the password */}
                          <div
                            className={`relative mb-4  bg-backGround ${
                              errorMessages.password && "has-error"
                            }`}
                            data-twe-input-wrapper-init
                          >
                            <input
                              type="password"
                              className={` pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base  py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear  peer-focus:text-primary  motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${
                                errorMessages.password && "border-red-500"
                              }`}
                              id="password"
                              name="password"
                              placeholder=""
                              value={formData.password}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="password"
                              className={`absolute text-base dark:peer-focus:text-primary text-white  duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
                                formData.password && "text-primary"
                              }`}
                            >
                              <PiLockFill className="text-primary " /> Password
                            </label>
                            {errorMessages.password && (
                              <span className="text-red-500 text-xs mt-1">
                                {errorMessages.password}
                              </span>
                            )}
                          </div>
                          {/* the input for confirming the password */}
                          <div
                            className={`relative mb-4  bg-backGround ${
                              errorMessages.confirmPassword && "has-error"
                            }`}
                            data-twe-input-wrapper-init
                          >
                            <input
                              type="password"
                              className={`pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base  py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear  peer-focus:text-primary  motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${
                                errorMessages.confirmPassword &&
                                "border-red-500"
                              }`}
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder=""
                              value={formData.confirmPassword}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="confirmPassword"
                              className={`absolute text-base dark:peer-focus:text-primary text-white  duration-200 transform -translate-y-4 scale-85 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
                                formData.confirmPassword && "text-primary"
                              }`}
                            >
                              <PiLockFill className="text-primary " /> Confirm
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
                            className=" hover:scale-105 my-4 inline-block w-full rounded-lg px-6 pb-1 pt-1 text-base font-bold   leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-primary"
                          >
                            Sign Up
                          </button>
                          <div className="flex items-center  justify-center text-center">
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
                          <div className="rounded-lg h-full w-100 bg-cover   bg-no-repeat bg-center bg-[url('src/assets/background.svg')] " />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
