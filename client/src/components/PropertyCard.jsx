import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const PropertyCard = ({ property, isAuthenticated }) => {

  const navigate = useNavigate();

  const [showExtraInfo, setShowExtraInfo] = useState(false);


  const toggleExtraInfo = () => {
    setShowExtraInfo(!showExtraInfo);
  };

  return (
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        <div className="flex-shrink-0 w-full" style={{ height: "200px" }}>
          <div className="aspect-w-16 aspect-h-9">
            <img
              className="object-cover w-full h-full"
              src={property.photos[0]} // Assuming the first photo represents the property
              alt={property.title}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        </div>
      </div>
      <div className="p-6 ">
        <div className="mb-3 flex items-center justify-center">
          <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
            {property.title}
          </h5>
        </div>
        <p className="block font-sans text-base leading-relaxed text-gray-700 antialiased">
        <span className="font-medium">Address:</span>
        </p>
        <p className="block font-sans text-base leading-relaxed text-gray-700 antialiased ">
          {property.address}
        </p>
        <p className="block font-sans text-base leading-relaxed text-gray-700 antialiased">
          <span className="font-medium">Price Per Night:</span>
        </p>
        <p className="block font-sans text-base leading-relaxed text-gray-700 antialiased">
          ₹{property.price}
        </p>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
        
        </div>
      </div>
      <div className="p-6 pt-3">
        <button
          className="block w-full select-none rounded-lg text-white bg-gradient-to-r from-pink-600 to-red-400 hover:from-purple-600 hover:to-cyan-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={() => {
            if(isAuthenticated){
              navigate( `/booking/${property._id}`) 
            }
            else{
              toast.error("You are not logged in")
            } 
          }}
        >
          Book this Property
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
