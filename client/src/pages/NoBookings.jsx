import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Nobookingimg from '../assets/nobookings.jpg';

const NoBookings = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleExploreClick = () => {
    // Define the function to handle the button click
    navigate('/'); // Navigate to the landing page
  };

  return (
    <div className="flex flex-col items-center mt-8 h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-9">No Booked Properties Found</h2>
      <img src={Nobookingimg} alt="Empty Illustration" className="w-40 h-40 mt-8 mb-8 rounded-[8px] border-solid border-2 border-black bg-white p-1" />
      <p className="text-gray-600">You have not booked any properties yet. Start exploring and find your perfect stay!</p>
      <button
        onClick={handleExploreClick} // Attach the onClick event handler
        className="text-white bg-gradient-to-r from-pink-600 to-red-400 hover:from-purple-600 hover:to-cyan-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-7"
      >
        Start Exploring
      </button>
    </div>
  );
};

export default NoBookings;
