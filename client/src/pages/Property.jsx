import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
const Property = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://rentkey-server.onrender.com/place/myProperties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      setProperties(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteHandler = async (propertyId) => {
    try {
      const result = await Swal.fire({
        title: "Your Property will be deleted permanently!",
        text: "Are you sure to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#900",
        confirmButtonText: "Permanently Delete this Property!",
        cancelButtonText: "No, Don't delete  ",
      });

      if (result.isConfirmed) {
        await fetch(`https://rentkey-server.onrender.com/place/delete/${propertyId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        // Remove the deleted property from the state
        setProperties(
          properties.filter((property) => property._id !== propertyId)
        );

        Swal.fire(
          "Property Removed!",
          "Your Property is removed permanently!",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Property is not removed!");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <p className="mt-8 text-center text-lg text-gray-800">
        Enlist your property today to immerse yourself in the realm of
        residential leasing, offering unparalleled comfort and convenience
        without the necessity of venturing elsewhere, while securing an
        equitable agreement.
      </p>

      <div className="flex justify-center">
        <button
          className="mt-9 bg-gradient-to-r from-pink-600 to-red-400 hover:from-purple-600 hover:to-cyan-400 focus:ring-4 text-white font-medium px-5 py-2.5 text-center rounded-lg justify-center"
          onClick={() => navigate("/addProperty")}
        >
          Add new Property
        </button>
      </div>

      <h1 className="mt-20 text-3xl font-bold text-center">My Properties</h1>

      <div className="flex flex-wrap justify-center gap-10 mt-8 mb-10">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id}>
              <PropertyCard property={property} isAuthenticated={token} />
              <div className="flex justify-center mt-5">
                <button
                  className="bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 text-white font-medium px-5 py-2.5 text-center rounded-lg shadow-lg transition duration-300 ease-in-out"
                  onClick={() => deleteHandler(property._id)}
                >
                  Delete Property
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Nothing to show here</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Property;
