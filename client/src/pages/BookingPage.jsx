import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import "@fortawesome/fontawesome-free/css/all.css";

const BookingPage = () => {
  const { placeId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/place/booking/${placeId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setPropertyDetails(data.properties[0]);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [placeId, token]);

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-bold text-center mb-1 mt-5">
        Get This{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Property
        </span>
      </h1>
      {propertyDetails ? (
        <div className="bg-gray-300 bg-opacity-50 mr-6 ml-6 rounded-2xl mb-10 mt-10">
          <div className="flex w-full p-10">
            <Carousel slides={propertyDetails.photos} />
          </div>
          <div className="flex flex-wrap">
            <section className="w-1/2 p-5">
              <div className="p-6">
                <div className="mb-3 flex items-center ">
                  <i className="fas fa-solid fa-house text-transparent bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-2xl mb-2"></i>

                  <h5 className="ml-3  block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased justify-self-start">
                    Name of House :
                    <span className="font-serif text-md font-thin ">
                    {` `}{propertyDetails.title}
                    </span>
                    
                  </h5>
                </div>
                <div className="mb-3 flex items-center">
                  <i className="fas fa-light fa-route text-transparent bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-3xl mb-2"></i>

                  <h5 className="ml-3 block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased justify-self-start">
                    Address:
                    <span className="font-serif text-md font-thin ">
                    {` `}{propertyDetails.address}
                    </span> 
                  </h5>
                </div>
                <div className="mb-3 flex items-center ">
                  <i className="fas fa-light fa-paperclip text-transparent bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-3xl mb-2"></i>

                  <h5 className="ml-3 block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased justify-self-start">
                    Description of House :{" "}
                    <span className="font-serif text-md font-thin ">
                    {` `}  {propertyDetails.description}
                    </span>
                  </h5>
                </div>
                <div className="mb-3 flex items-center ">
                  <i className=" fas fa-light fa-circle-info text-transparent bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-3xl mb-2"></i>

                  <h5 className="ml-3 block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased justify-self-start">
                    Extra Information :
                    <span className="font-serif text-md font-thin ">
                    {` `}  {propertyDetails.extraInfo}
                    </span>
                  </h5>
                </div>
                <div className="mb-3 flex items-center ">
                  <i className=" fas fa-light fa-indian-rupee-sign text-transparent bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-2xl mb-2"></i>

                  <h5 className="ml-6 block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased justify-self-start">
                    Price Per Night :
                    <span className="font-serif text-md font-thin ">
                    {` `}  {propertyDetails.price}{" "}
                    </span>
                  </h5>
                </div>
                <div className="mb-3 flex items-center">
                  <i className=" fas fa-duotone fa-people-roof text-transparent bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-2xl mb-2"></i>

                  <h5 className="ml-3 block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased justify-self-start">
                    Max. Guest Allowed : 

                    <span className="font-serif text-md font-thin text-2xl ">
                    { ` `} {propertyDetails.maxGuests}
                    </span>
                   
                  </h5>
                </div>
                {/* Perks grid */}
                <div className="mb-3">
                  <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased justify-self-start">
                    Perks:
                  </h5>
                  <div className="grid grid-cols-3 gap-5 border-rounded text-center">
                    {propertyDetails.perks.map((perk, index) => (
                      <div key={index} className="relative">
                        <div className="ribbon absolute bottom-3 rounded-xl right-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.4)]">
                          <div className="clip-path-polygon-[0_0,_100%_0,_100%_calc(100%_-_16px),_40%_100%,_0_calc(100%_-_12px)] flex h-6 w-7 justify-center bg-white px-1 py-1 text-center text-lg font-bold text-white rounded-lg">
                            <svg
                              width="15px"
                              height="20px"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check fa-w-16"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              color="green"
                            >
                              <path
                                fill="currentColor"
                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded border-2 border-black mr-2 mb-2 w-auto">
                          {perk}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div></div>
              </div>
            </section>
            <section className="w-1/2 rounded-md  p-4">
              <BookingForm
                propertyId={placeId}
                price={propertyDetails.price}
                bookedDatesDatesFromBackend={propertyDetails.bookedDates}
                className="w-full"
              />
            </section>
          </div>
        </div>
      ) : (
        <p>Loading property details...</p>
      )}
      <Footer />
    </div>
  );
};

export default BookingPage;
