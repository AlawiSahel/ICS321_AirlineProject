import { useState } from "react";
import Select from "react-select";
import { AiOutlineCalendar } from "react-icons/ai"; // Ensure you have react-icons installed

import { AiOutlineCamera } from "react-icons/ai";
import { useEffect } from "react";

import { popularBookGenres } from "../../constants/genres";
import { TagsInput } from "react-tag-input-component";

import DatePicker from "react-datepicker";
import { setYear, startOfYear } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
// import { set } from "../../../../backend/app";
// import { set } from "../../../../backend/app";

const orderTypeOptions = [
  { value: "forSale", label: "Sell" },
  { value: "forRent", label: "Rent" },
  { value: "forExchange", label: "Exchange" },
];

const bookConditionOptions = [
  { value: "new", label: "New" },
  { value: "likeNew", label: "Like New" },
  { value: "veryGood", label: "Very Good" },
  { value: "good", label: "Good" },
  { value: "poor", label: "Poor" },
];

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "2.5rem", // Adjust height to match your other inputs
    borderRadius: "9999px", // Tailwind rounded-full
    backgroundColor: "rgba(151, 134, 134, 0.5)", // Tailwind bg-plaster or any color you want
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Tailwind shadow-md
    border: "none",
    paddingLeft: "1rem", // Tailwind pl-4
  }),
  placeholder: (provided) => ({
    ...provided,
    fontWeight: "bold", // Tailwind font-bold
    color: "#a2a1a1", // Tailwind text-gray-500 or any color you want
  }),
  // Add more custom styles if needed
};

const OrderDetails = () => {
  // states
  const [formData, setFormData] = useState({
    bookName: "",
    bookAuthor: "",
    bookDescription: "",
    bookGenre: [],
    numberOfPages: "",
    orderType: "",
    bookCondition: "",
    bookPrice: "",
    bookISBNs: [],
    publicationYear: "",
  });

  // State for the image file and its preview URL
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [selectedIsbns, setSelectedIsbns] = useState([]); // [isbn1, isbn2, ...]

  // handlers

  const handleYearChange = (date) => {
    setSelectedYear(date);
    // if it is a Date object, you can extract the year and not empty
    if (date && date instanceof Date) {
      const year = date.getFullYear();
      setFormData((prevFormData) => ({
        ...prevFormData,
        publicationYear: year,
      }));
    }
  };

  const handleISBNsChange = (newIsbn) => {
    setSelectedIsbns(newIsbn);
    setFormData({ ...formData, bookISBNs: newIsbn });
  };

  // Event handler for text inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      bookName: "",
      bookAuthor: "",
      bookDescription: "",
      bookGenre: [],
      numberOfPages: "",
      orderType: "",
      bookCondition: "",
      bookPrice: "",
      bookISBNs: [],
      publicationYear: "",
    });
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setSelectedYear(null);
    setSelectedIsbns([]);
  };

  const validateForm = () => {
    const errors = {};
    // Check for text length and required fields
    if (!formData.bookName || formData.bookName.length >= 100)
      errors.bookName =
        "Book name must be less than 100 characters and is required.";
    if (!formData.bookAuthor || formData.bookAuthor.length >= 100)
      errors.bookAuthor =
        "Author name must be less than 100 characters and is required.";
    if (formData.bookDescription && formData.bookDescription.length >= 500)
      errors.bookDescription = "Description must be less than 500 characters.";
    if (
      !formData.numberOfPages ||
      formData.numberOfPages <= 0 ||
      formData.numberOfPages > 10000
    )
      errors.numberOfPages =
        "Number of pages must be between 0 and 10,000 and is required.";
    if (
      !formData.bookPrice ||
      formData.bookPrice < 0 ||
      formData.bookPrice > 10000
    )
      errors.bookPrice = "Price must be between 0 and 10,000 and is required.";
    if (!formData.orderType) errors.orderType = "Order type is required.";
    if (!formData.bookCondition)
      errors.bookCondition = "Book condition is required.";
    if (!selectedFile) errors.image = "An image must be uploaded.";

    // Check for required array fields if they should not be empty
    if (!formData.bookGenre || formData.bookGenre.length === 0)
      errors.bookGenre = "At least one genre must be selected.";

    return errors;
  };

  // Event handler for file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for preview
    }
  };

  // Event handler for the select elements (for genres, order type, and book condition)
  const handleSelectChange = (name) => (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: selectedOption
        ? Array.isArray(selectedOption)
          ? selectedOption.map((option) => option.value)
          : selectedOption.value
        : "",
    }));
  };

  const handleGenreChange = (selectedOptions) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      bookGenre: selectedOptions || [], // or [] to reset to empty if nothing is selected
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errors = validateForm();
  //   if (Object.keys(errors).length > 0) {
  //     console.error("Validation errors:", errors);
  //     // Optionally display these errors in the UI
  //     return; // Stop the submission if there are errors
  //   }

  //   // Temporary section to test what the request will look like
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   };
  //   console.log("Prepared request for submission:", options);

  //   // Assuming the fetch will be uncommented for actual use
  //   // fetch("http://localhost:5000/api/v1/books/", options)
  //   //   .then(response => {
  //   //     if (!response.ok) {
  //   //       throw new Error("Network response was not ok");
  //   //     }
  //   //     return response.json(); // Assuming the response is JSON
  //   //   })
  //   //   .then(data => {
  //   //     console.log("Data successfully posted:", data);
  //   //   })
  //   //   .catch(error => {
  //   //     console.error("Error posting data:", error);
  //   //   });

  //   resetForm(); // Reset the form after successful validation and logging
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submission
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.error("Validation errors:", errors);
      // Optionally display these errors to the user
      return; // Stop the form submission if there are validation errors
    }

    // Prepare FormData to send files and text
    const data = new FormData();
    data.append("image", selectedFile); // Append file
    data.append("title", formData.bookName);
    console.log(formData.bookName);
    data.append("author", formData.bookAuthor);
    data.append("description", formData.bookDescription);

    // Extract only the 'value' properties from the genre array
    const genreValues = formData.bookGenre.map((genre) => genre.value);
    data.append("genre", JSON.stringify(genreValues)); // Genre is an array of values

    data.append("numberOfPages", formData.numberOfPages);
    data.append("offerType", formData.orderType);
    data.append("bookCondition", formData.bookCondition);
    data.append("price", formData.bookPrice);
    data.append("ISBN", JSON.stringify(formData.bookISBNs)); // ISBNs are an array
    data.append("publicationYear", formData.publicationYear); // Ensure this is a valid date

    //Get the username from local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const username = currentUser.username;
    data.append("username", username);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/v1/books/", {
        method: "POST",
        body: data,
        Authorization: `Bearer ${token}`,
        credentials: "include", // Include credentials for user identification
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      console.log("Data successfully posted:", result);
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const [iconSize, setIconSize] = useState(window.innerWidth < 640 ? 200 : 400);

  useEffect(() => {
    const handleResize = () => {
      setIconSize(window.innerWidth < 640 ? 200 : 400);
    };

    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cleanup preview URL to avoid memory leaks
  useEffect(() => {
    // This will be called before the component unmounts or when imagePreviewUrl changes
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const minYear = startOfYear(setYear(new Date(), 0)); // January 1, 0
  const maxYear = startOfYear(setYear(new Date(), 2050)); // January 1, 2050

  const inputClassName =
    "pl-5  w-full h-10 placeholder-white placeholder-opacity-50     rounded-full bg-lightBrown50 shadow-md border-none resize-none focus:outline-none text-white";

  const labelClassName = "w-1/4 text-left text-primary font-bold";

  const labelInput =
    "flex items-start flex-col  justify-center gap-5  lg:items-center lg:flex-row";
  return (
    <div className="container  m-10 p-0 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  justify-center items-center gap-10  lg:justify-start lg:items-start lg:flex-row      "
      >
        <div className="flex flex-col justify-start  items-center p-0 ">
          <div className=" bg-white rounded-lg shadow-md flex items-start justify-center overflow-hidden">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="object-cover h-200 w-96 rounded-lg"
              />
            ) : (
              <AiOutlineCamera className="text-gray-400 " size={iconSize} />
            )}
          </div>

          {/* Attach image button */}
          <label
            htmlFor="bookImage"
            required
            className="mt-4 inline-block bg-primary text-white py-2 px-6 rounded-full cursor-pointer text-lg leading-normal uppercase shadow-md hover:bg-primary-dark hover:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Attach Image
          </label>

          {/* Hidden file input */}
          <input
            id="bookImage"
            name="bookImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            required
          />

          {/* Display the file name */}
          {selectedFile && (
            <p className="text-sm text-gray-500 mt-2">{selectedFile.name}</p>
          )}
        </div>

        <div className=" flex  flex-col space-y-6 w-full   p-10 bg-white rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold text-primary text-left mb-5">
            Add Order Details
          </h1>

          <div className={labelInput}>
            <label className={labelClassName}>Book&apos;s Name</label>
            <div className="flex flex-row items-center w-full">
              <input
                className={inputClassName}
                name="bookName"
                placeholder="Enter book name"
                value={formData.bookName}
                maxLength="100"
                onChange={handleInputChange}
                required

                // Add the rest of your styling classes here
              />
            </div>
          </div>

          <div className={labelInput}>
            <label className={labelClassName}>Book&apos;s Author</label>
            <input
              className={inputClassName}
              type="text"
              placeholder="Enter book author"
              name="bookAuthor"
              value={formData.bookAuthor}
              onChange={handleInputChange}
              maxLength="100"
              required
            />
          </div>

          <div className={labelInput}>
            <label className={`${labelClassName} `}>
              Book&apos;s Description
            </label>
            <textarea
              className={`${inputClassName} pt-5 h-10 lg:h-20 `}
              name="bookDescription"
              placeholder="Enter book description"
              value={formData.bookDescription}
              onChange={handleInputChange}
              maxLength="500"
              required
            />
          </div>

          <div className={labelInput}>
            <label className={labelClassName}>Genre</label>
            <Select
              isMulti
              name="bookGenre"
              options={popularBookGenres}
              styles={customSelectStyles}
              value={formData.bookGenre}
              placeholder="Select book genre"
              onChange={handleGenreChange}
              className="w-full"
              required
            />
          </div>

          <div className={labelInput}>
            <label className={labelClassName}>Number of Pages</label>
            <input
              className={inputClassName}
              type="number"
              placeholder="Enter number of pages"
              name="numberOfPages"
              min="1"
              max="10000"
              maxLength="5"
              value={formData.numberOfPages}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={labelInput}>
            <label className={labelClassName}>Order Type</label>
            <Select
              name="orderType"
              options={orderTypeOptions}
              styles={customSelectStyles}
              placeholder="Select order type"
              value={
                orderTypeOptions.find(
                  (option) => option.value === formData.orderType
                ) || ""
              }
              onChange={handleSelectChange("orderType")}
              className="w-full"
              required
            />
          </div>

          <div className={labelInput}>
            <label className={labelClassName}>Book Condition</label>
            <Select
              name="bookCondition"
              options={bookConditionOptions}
              styles={customSelectStyles}
              placeholder="Select book condition"
              value={
                bookConditionOptions.find(
                  (option) => option.value === formData.bookCondition
                ) || ""
              }
              onChange={handleSelectChange("bookCondition")}
              className="w-full"
              required
            />
          </div>

          <div className={labelInput}>
            <label className={`${labelClassName} w-1/4`}>Book Price</label>
            <div className=" flex space-x-12 flex-row  flex-grow items-start justify-start w-full">
              <input
                className={`${inputClassName}  `}
                type="number"
                name="bookPrice"
                placeholder="Enter price"
                min="0"
                max="10000"
                maxLength="5"
                value={formData.bookPrice}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={labelInput}>
            <label className={`${labelClassName} w-1/4`}>
              Book ISBN(s) & Publication Year
            </label>
            <div className=" flex space-x-5 flex-row flex-grow items-center w-full">
              <TagsInput
                value={selectedIsbns}
                onChange={handleISBNsChange}
                name="isbns"
                placeHolder="Press Enter to add ISBN"
              />

              <span className="">
                <AiOutlineCalendar />
              </span>

              <div>
                <DatePicker
                  className={`${inputClassName} flex-grow w-full   `}
                  selected={selectedYear}
                  value={selectedYear}
                  onChange={handleYearChange}
                  showYearPicker
                  dateFormat="yyyy"
                  placeholderText="Select a year"
                  minDate={minYear}
                  maxDate={maxYear}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row lg:justify-end  justify-center  items-center p-5">
            <button
              onSubmit={handleSubmit}
              type="submit"
              className=" w-2/3 text-xl  font-bold bg-primary text-white px-6 py-3 rounded-full border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-primary  hover:bg-opacity-75"
            >
              Submit Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderDetails;
