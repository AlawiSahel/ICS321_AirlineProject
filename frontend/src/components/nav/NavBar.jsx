import { useDebugValue, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../../assets/logo.svg";
function NavBar() {
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  let username = localStorage.getItem("currentUser");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/airline/users/userDetails?email=${username}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setIsAdmin(data.userType === "ADMIN");
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
    <div className="flex flex-col mb-2">
      <header className="bg-primary text-white w-full">
        <nav className="flex justify-between items-center px-12 py-2">
          <div className="flex items-center gap-8">
            <a href="/" className="shrink-0">
              <img src={logo} alt="Logo" className="h-14" />
            </a>
          </div>
          <div className="flex items-center gap-8">
            {isAdmin && (
              <button
                className="flex items-center gap-2 h-10 p-2 rounded-full border-none bg-plaster"
                onClick={handlePostOfferClick}
              >
                <img
                  src="src/assets/add.svg"
                  alt="Post Offer"
                  className="h-8"
                />
                <span className="hidden sm:block text-primary font-bold">
                  Post Offer
                </span>
              </button>
            )}

            <BsPersonCircle
              onClick={handleProfileClick}
              className="h-14 w-14 text-secondaryColor cursor-pointer"
            />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
