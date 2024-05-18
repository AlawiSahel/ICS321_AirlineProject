import { useDebugValue, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import StarRating from "./../StarRating/StarRating.jsx";
import { useNavigate } from "react-router-dom";
import { projectIP } from "./../../constants/chat.jsx";

function SellerHeader({ seller }) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const newData = JSON.parse(localStorage.getItem("currentUser"));
    setUserData(newData);
  }, []);

  const handleChatClick = () => {
    const url = "https://api.chatengine.io/chats/";

    const data = {
      title: "Chat with the seller",
      is_direct_chat: false,
    };

    const headers = {
      "Project-ID": projectIP,
      "User-Name": userData.username,
      "User-Secret": userData.password,
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);

        const url = `https://api.chatengine.io/chats/${responseData.id}/people/`;

        const headers = {
          "Project-ID": projectIP,
          "User-Name": userData.username,
          "User-Secret": userData.password,
          "Content-Type": "application/json",
        };

        const data = {
          username: seller.username,
        };

        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log("add user");
            navigate(
              `/Chat?user=${userData.username}&password=${userData.password}&username=${seller.username}`
            );
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <header className="bg-lightBrown50 rounded-xl shadow-md flex flex-col items-center sm:flex-row sm:justify-between">
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-4 p-3 xxs:p-4 xs:p-5 s:px-5 s:py-4 sm:py-5">
        <img
          src={seller.profileImage}
          alt={`${seller.name}'s profile`}
          className="w-16 h-16 rounded-full border-2 border-white mb-3 sm:mb-0 sm:w-20 sm:h-20"
        />
        <div>
          <h2 className="text-lg xxs:text-xl xs:text-2xl sm:text-3xl text-primary font-bold font-semibold m-0">
            {seller.name}
          </h2>
          <StarRating rating={seller.rating} />
          <div className="flex items-center justify-center sm:justify-start mt-2">
            <img
              className="w-4 h-4 xxs:w-5 xxs:h-5"
              src="/src/assets/loc.svg"
              alt="Location"
            />
            <span className="text-xs xxs:text-sm sm:text-md text-primary text-opacity-80 ml-2">
              {seller.address}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 xxs:p-4 xs:p-5 s:px-5 s:py-4 sm:py-5">
        <button
          className={`sm:mt-0 bg-secondaryBackground text-primary px-6 py-3 rounded-md border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none hover:bg-primary hover:text-secondaryBackground ${
            userData?.username === seller.username ? "hidden" : ""
          }`}
          onClick={handleChatClick}
        >
          <span className="font-bold text-md sm:text-lg">Start Chat</span>
        </button>
      </div>
    </header>
  );
}

SellerHeader.propTypes = {
  seller: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default SellerHeader;
