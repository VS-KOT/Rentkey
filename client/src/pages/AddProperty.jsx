import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotoUploader";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const InputHeading = ({ text }) => {
  return (
    <label htmlFor="title" className="font-semibold text-2xl">
      {text}
    </label>
  );
};

const InputDesc = ({ text, isRequired }) => {
  return (
    <p className="text-gray-500 text-sm font-semibold mb-1">
      {text}
      {isRequired && (
        <sup>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="red"
            className="w-2 h-2 inline-block"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
              clipRule="evenodd"
            />
          </svg>
        </sup>
      )}
    </p>
  );
};

const AddPlacePage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [maxGuests, setMaxGuests] = useState(0); // Setting initial value to 0
  const [price, setPrice] = useState(0); // Setting initial value to 0

  const handleMaxGuestsChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < 0) {
      // Display error message or prevent setting the value
      toast.error("Maximum guests cannot be less than 0");
    } else {
      setMaxGuests(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < 0) {
      // Display error message or prevent setting the value
      toast.error("Price cannot be less than 0");
    } else {
      setPrice(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://rentkey-server.onrender.com/place/addNewPlace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          maxGuests,
          price,
        }),
      });
      if (response.ok) {
        toast.success("Place added successfully");
        console.log("Place added successfully");
        // Reset form fields after successful submission
        setTitle("");
        setAddress("");
        setAddedPhotos([]);
        setDescription("");
        setPerks([]);
        setExtraInfo("");
        setMaxGuests(0);
        setPrice(0);
        // Delay page reload to ensure toast is displayed
        setTimeout(() => {
          window.location.reload();
        }, 1500); // Adjust the delay time as needed (e.g., 1500 milliseconds)
      } else {
        console.error("Error adding place");
      }
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="px-2 md:px-8 mt-10" onSubmit={handleSubmit}>
        <InputHeading text="Title" />
        <InputDesc
          text={
            "Title for your place, should be short and catchy as in advertisement"
          }
          isRequired={true}
        />
        <input
          type="text"
          placeholder="title, for example: My lovely Villa"
          className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <InputHeading text="Address" />
        <InputDesc text={"Address to this place"} isRequired={true} />
        <input
          type="text"
          placeholder="Address"
          id="address"
          className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <InputHeading text="Photos" />
        <InputDesc text={"more = better"} isRequired={true} />
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        <InputHeading text={"Description"} />
        <InputDesc text={"Description of the place"} isRequired={true} />
        <textarea
          rows={5}
          className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="font-semibold text-2xl">Perks</label>
        <InputDesc text={"Select all the perks of your place"} isRequired={true} />
        <Perks perks={perks} setPerks={setPerks} />

        <InputHeading text={"Extra Info"}  />
        <InputDesc text={"house rules, etc"} isRequired={true} />
        <textarea
          rows={5}
          className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          required
        />
        <div className="flex flex-col w-full gap-x-16 md:flex-row">
          <div className="w-full md:w-1/2">
            <h3 className="mt-2 mb-1 font-semibold text-xl">Maximum guests</h3>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Maximum capacity of place for staying of guests at a same time
            </p>
            <input
              type="number"
              className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
              value={maxGuests}
              onChange={handleMaxGuestsChange}
              required
              min={0} // Minimum value set to 0
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="mt-2 mb-1 font-semibold text-xl">Price per night</h3>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Try to give reasonable price considering all the factors.(in
              Rupees)
            </p>
            <input
              type="number"
              value={price}
              className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
              onChange={handlePriceChange}
              min={0} // Minimum value set to 0
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-600 to-red-400 hover:from-purple-600 hover:to-cyan-400 w-1/2 rounded-2xl text-white py-2 font-semibold text-xl mt-10 mb-5 hover:scale-95 transition-all mx-auto block"
        >
          Save Your Place
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddPlacePage;
