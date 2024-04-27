import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const AllProperties = ({ isAuthenticated }) => {
  const [properties, setProperties] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/place/allProperties",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setProperties(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 ">
        All <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Properties</span>
      </h1>
    
      <div className="flex flex-wrap justify-center">
        {properties.map((property) => (
          <div key={property._id} className="mx-4 my-6 relative hover:scale-105 transition-transform duration-300">
            <PropertyCard property={property} isAuthenticated={isAuthenticated}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
