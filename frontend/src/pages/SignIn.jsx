import { FaUser } from "react-icons/fa";
import { PiLockFill } from "react-icons/pi";
import NavBar from "./../components/nav/NavBar.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
  });
  const usernameRegex = /^[^\s]+$/;

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

    if (formData.username === "") {
      errors.username = "Please enter your email";
      isValid = false;
    } else if (!usernameRegex.test(formData.username)) {
      errors.username = "Please enter a valid username";
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
      const response = await fetch(
        "http://localhost:5000/api/v1/users/signin",
        {
          method: "POST", // Use POST method here
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status == 200) {
          // Redirect to home page
        } else {
          localStorage.setItem("currentUser", JSON.stringify(formData));
          console.log(data);
          navigate("/");
          alert(data.message);
        }
      } else {
        alert("Sign In failed");
      }
    } catch (error) {
      alert("Sign In error:", error);
    }
  };

  return (
    <>
      <section className="gradient-form h-full bg-white">
        <NavBar />
        <div className="container size-6/12 py-20 m-auto max-sm:size-9/12 max-md:size-9/12 max-lg:size-9/12 ">
          <div className="flex flex-wrap h-full shadow-2xl  rounded-lg  items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className=" block rounded-lg  bg-backGround shadow-lg light:bg-neutral-800">
                <div className="g-0 ">
                  <div className="px-4 md:px-0 lg:w-">
                    <div className="">
                      <div className="grid grid-cols-2 max-md:flex max-sm:flex">
                        <form
                          onSubmit={submitForm}
                          className="p-12 max-md:p-4 my-auto max-md:w-full max-sm:w-full"
                        >
                          {/* the input for the email */}
                          <div className="relative mb-4 mt-6 ">
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
                              required
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

                          {/* the input for the password */}
                          <div className="relative mb-4  ">
                            <input
                              type="password"
                              className={`pl-1.5 peer block min-h-[auto] w-full rounded-lg bg-[#53373750] border-0 text-base  py-[0.42rem] leading-[1.6] outline-none transition-all duration-200 ease-linear  peer-focus:text-primary  motion-reduce:transition-none dark:text-black dark:autofill:shadow-autofill dark:peer-focus:text-primary ${
                                errorMessages.password && "border-red-500"
                              }`}
                              id="password"
                              name="password"
                              placeholder=""
                              value={formData.password}
                              onChange={handleChange}
                              required
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

                          <div className=" pb-1 pt-1 text-center">
                            <a href="" className="text-primary no-underline ">
                              Forgot password?
                            </a>

                            <input
                              className="hover:scale-105 my-4 inline-block w-full rounded-lg px-6 pb-1 pt-1 text-base font-bold   leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-primary"
                              type="submit"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                              value="Login"
                            ></input>
                          </div>

                          <div className="flex items-center  justify-center pb-6  text-center">
                            <p className="mb-0 me-2 text-black">
                              Do not have an account?{" "}
                              <a
                                className="text-primary no-underline"
                                href="SignUp"
                              >
                                <br />
                                create account
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

export default SignIn;
