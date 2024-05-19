import NavBar from "./../components/nav/NavBar.jsx";
import Footer from "./../components/footer/Footer.jsx";
import { HiMail } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");

  let username = localStorage.getItem("currentUser");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/airline/users/userDetails?email=${username}`
        );
        if (response.ok) {
          const data = await response.json();
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setPhone(data.phone);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const logout = () => {
    localStorage.clear();
    navigate(`/Signin`);
  };

  const saveUserData = async () => {
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);

    if (password) {
      formData.append("password", password);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/updateUser`,
        {
          method: "PATCH",
          body: formData, // No need to set Content-Type manually
        }
      );
      if (response.ok) {
        console.log("User data updated successfully");
        alert("User Updated");
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="flex min-h-screen ">
        <div id="left" className="bg-secondaryBackground w-3/5 p-10">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-gray-1500 font-poppins">My Personal Profile</h1>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <label
                    htmlFor="first-name"
                    className="text-base dark:peer-focus:text-primary text-primary px-2"
                  >
                    <FaUser className="text-primary" /> First Name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    value={firstName}
                    className="bg-backGround block w-full rounded-md border border-primary px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChangeFirstName}
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="last-name"
                    className="text-base dark:peer-focus:text-primary text-primary px-2"
                  >
                    <FaUser className="text-primary" /> Last Name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    value={lastName}
                    className="bg-backGround block w-full rounded-md border border-primary px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChangeLastName}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <label
                    htmlFor="mail"
                    className="text-base dark:peer-focus:text-primary text-primary px-2"
                  >
                    <HiMail className="text-primary" /> Email
                  </label>
                  <input
                    type="email"
                    name="mail"
                    id="mail"
                    value={email}
                    className="bg-backGround block w-full rounded-md border border-primary px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="number"
                    className="text-base dark:peer-focus:text-primary text-primary px-2"
                  >
                    <BsFillTelephoneFill className="text-primary" /> Phone
                  </label>
                  <input
                    type="tel"
                    name="number"
                    id="number"
                    value={phone}
                    className="bg-backGround block w-full rounded-md border border-primary px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <h1 className="text-gray-1500">Change Password</h1>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="mt-2 col-span-2">
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="bg-backGround block w-full rounded-md border border-primary px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter new password"
                />
              </div>

              <div className="sm:col-span-1">
                <div className="mt-2">
                  <input
                    type="button"
                    value="Save Information"
                    id="save"
                    className="bg-primary block w-full rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onClick={saveUserData}
                  />
                </div>
              </div>
              <div className="h-4" />
              <div className="sm:col-span-1">
                <div className="mt-2">
                  <input
                    type="button"
                    value="Log Out"
                    id="delete"
                    onClick={logout}
                    className="bg-danger border border-black block max-w-4xl w-full rounded-md py-1.5 text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="right"
          className="bg-offWhite w-2/5 p-10 items-center"
          // style={{ width: "40%", padding: "20px" }}
        >
          <div className="sm:col-span-4">
            <div className="h-36" />

            <div className="mt-2">
              <input
                type="button"
                onClick={() => navigate("/booksList")}
                value="All Listed Books"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="bg-primary block w-full rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="h-4" />

            <div className="mt-4">
              <Link to={`/seller?username=${username}`}>
                <input
                  type="button"
                  value="Personal Seller Page"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="bg-primary block w-full rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
