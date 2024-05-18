import { useDebugValue, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

function NavBar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const newData = JSON.parse(localStorage.getItem("currentUser"));
    setUserData(newData);
  }, [localStorage.getItem("currentUser")]);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (userData != null) {
      navigate("/Profile");
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
              <img src="src/assets/logo.svg" alt="Logo" className="h-14" />
            </a>
          </div>
          <div className="flex items-center gap-8">
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
