import { useDebugValue, useRef, useState, useEffect } from "react";
import DropdownMenu from "../dropdown/DropDownMenu";
// import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const newData = JSON.parse(localStorage.getItem("currentUser"));
    setUserData(newData);
  }, [localStorage.getItem("currentUser")]);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?search=${searchTerm}`);
    }
  };

  const handleProfileClick = () => {
    if (userData != null) {
      navigate("/Profile");
    } else {
      navigate("/Signin");
    }
  };

  const handlePostOfferClick = () => {
    if (userData != null) {
      navigate("/newOffer");
    } else {
      navigate("/Signin");
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-2">
      <header className="bg-primary text-white">
        <nav
          style={{ width: "100%" }}
          className="flex justify-between mx-4 gap-2 "
        >
          <div className="flex flex-grow items-center gap-4 ">
            <a href="/" className="shrink-0 px-0">
              <img src="src/assets/logo.svg" alt="Logo" className="h-8" />
            </a>

            <div className="flex-grow max-w-lg  relative max-sm:hidden">
              <input
                type="search"
                className="w-full h-10 placeholder-Placeholder placeholder-bold pl-4 pr-3 rounded-full bg-plaster shadow-md border-none resize-none focus:outline-none text-gray-700"
                placeholder="Search Books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearch}
              />
            </div>
          </div>
          <div className="flex items-center pr-4 gap-4 ">
            {" "}
            {/* Adjusted gap between icons */}
            <button
              className="flex items-center gap-2 h-10  p-2 rounded-full border-none  bg-plaster "
              onClick={handlePostOfferClick}
            >
              <img src="src\assets\add.svg" alt="Post Offer" className="h-8" />{" "}
              {/* Icon height */}
              <span className="hidden sm:block text-primary font-bold">
                Post Offer
              </span>
            </button>
            <Link
              to={
                userData != null
                  ? `/Chat?user=${userData.username}&password=${userData.password}`
                  : `/Signin`
              }
              className="p-2"
            >
              <img
                src="src\assets\notficaiton.svg"
                alt="Notifications"
                className="h-8" // Icon height
              />
            </Link>
            <div>
              <div>
                <BsPersonCircle
                  onClick={handleProfileClick}
                  className="h-8 w-8 text-secondaryColor "
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="pr-6">
        <div className="flex-grow mx-1 shadow-2xl hidden max-sm:block w-full">
          <input
            type="search"
            className="w-full h-10 placeholder-Placeholder placeholder-bold pl-4 pr-3  rounded-full bg-white shadow-2xl  border-none resize-none focus:outline-none text-gray-700"
            placeholder="Search Books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
