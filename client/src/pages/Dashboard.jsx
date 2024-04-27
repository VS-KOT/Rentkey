import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dashboard_Image from "../assets/bg2.jpg";

const Dashboard = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative flex flex-col justify-between min-h-screen">
        {/* Background image */}
        <img
          src={Dashboard_Image}
          className="absolute inset-0 w-full h-full object-cover transform scale-70 mt-10"
          alt="Dashboard Background"
        />

        {/* Content */}
        <Navbar />
        <div className="relative text-center text-gray-800 flex-grow">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6">{`Welcome ${firstName} ${lastName}`}</h1>
          <p className="text-lg md:text-xl lg:text-2xl mt-5">
            Explore your personalized dashboard to effortlessly manage your
            rental listings or find your perfect home sweet home!
          </p>
        </div>

        {/* Buttons */}
        <div className="absolute bottom-0 left-0 w-full text-center mb-8 justify-around">
          <button
            className="m-3 lg:mr-20 bg-gray-900 text-white border-2 border-[#e2d4a8] py-3 px-8 rounded-lg shadow-lg transition-all hover:shadow-bookings"
            onClick={() => {
              navigate("/mybookings");
            }}
          >
            My Bookings
          </button>

          <button
            className="m-5 lg:ml-15 bg-gray-900 text-white border-2 border-[#e2d4a8] py-3 px-8 rounded-lg shadow-lg transition-all hover:shadow-bookings"
            onClick={() => {
              navigate("/property");
            }}
          >
            My Properties
          </button>
          <button
            className="m-5 lg:ml-20 bg-gray-900 text-white border-2 border-[#e2d4a8] py-3 px-8 rounded-lg shadow-lg transition-all hover:shadow-bookings"
            onClick={() => {
              navigate("/");
            }}
          >
            All Properties
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
