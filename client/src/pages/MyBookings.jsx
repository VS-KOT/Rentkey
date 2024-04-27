import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import NoBookings from "./NoBookings";

const BookingCard = ({ booking }) => {
  const token = localStorage.getItem("token");
  const handleCancelBooking = async () => {
    try {
      const response = await fetch("http://localhost:3000/place/mybooking", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ placeId: booking._id }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 mt-10 relative">
      <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        <div className="flex-shrink-0 w-full" style={{ height: "200px" }}>
          <div className="aspect-w-16 aspect-h-9">
            <img
              className="object-cover w-full h-full"
              src={booking.place.photos[0]} // Assuming the first photo represents the property
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-10 justify-center">
          {booking.place.title}
        </h2>
        <p>{booking.place.address}</p>
        <p>Check-in: {booking.checkIn}</p>
        <p>Check-out: {booking.checkOut}</p>
        <p>Price: {booking.price}</p>
      </div>
      <div className="flex align-center justify-center mt-20  ">
        <button
          onClick={handleCancelBooking}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 text-white font-medium px-5 py-2.5 text-center rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const token = localStorage.getItem("token");
  const [mybooking, setMybooking] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/place/mybooking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const jsonData = await response.json();
        setMybooking(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-center mb-0 mt-10 font-transparent">
          My Bookings
        </h1>
        {mybooking.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {/* Map through mybooking array and render BookingCard for each booking */}
            {mybooking.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <NoBookings />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
