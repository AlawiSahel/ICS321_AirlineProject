import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import Seller from "./pages/Seller.jsx";

// pages
import Chat from "./pages/Chat.jsx";
import BookDescription from "./pages/BookDescription.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import NewOffer from "./pages/NewOffer.jsx";
import Search from "./pages/Search.jsx"; // Import the updated Search component
import ManageFlight from "./pages/ManageFlight.jsx"; // Import ManageFlight

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "bookDescription",
    element: <BookDescription />,
  },
  {
    path: `/Chat/`,
    element: <Chat />,
  },
  {
    path: "seller",
    element: <Seller />,
  },
  {
    path: "signIn",
    element: <SignIn />,
  },
  {
    path: "signUp",
    element: <SignUp />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "newOffer",
    element: <NewOffer />,
  },
  {
    path: "search",
    element: <Search />, // Ensure this uses the updated Search component
  },
  {
    path: "manage-flight/:flightId", // Add route for managing flight
    element: <ManageFlight />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
