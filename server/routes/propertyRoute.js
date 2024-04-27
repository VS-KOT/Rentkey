const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

//we could have sorted the routes into diff files to make code clean



cloudinary.config({ 
    cloud_name: 'dffbzfpor', 
    api_key: '859736346787278', 
    api_secret: '3vjVw79zyZf5KIyjSOiWqGNnNuo' 
  });


  const upload = multer({ dest: 'uploads/' });

  router.post('/upload', upload.array('photos', 50), async (req, res) => {
    try {
      const uploadedFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        const { path } = req.files[i];
        const result = await cloudinary.uploader.upload(path, {
          folder: 'rentkey',
          resource_type: 'auto'
        });
        uploadedFiles.push(result.secure_url);
      }
      res.json(uploadedFiles);
    } catch (err) {
      console.error('Error uploading image to Cloudinary:', err);
      res.status(500).json({ error: 'Failed to upload images' });
    }
  });






  

router.get('/allProperties', async (req, res) => {

  try {
      // Assuming you have a model named Property and want to fetch all properties
      const properties = await Property.find();
      res.json(properties);
      } catch (err) {
          console.error('Error fetching properties:', err);
          res.status(500).json({ error: 'Failed to fetch properties' });
      }
  
})


router.get('/myProperties', authMiddleware, async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Assuming you have a model named Property and want to fetch properties for a specific user
    const properties = await Property.find({ owner: userId });

    res.json(properties);
} catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ error: 'Failed to fetch properties' });
}
})

// Backend route to handle DELETE request to delete a property by ID
router.delete('/delete/:propertyId', authMiddleware, async (req, res) => {
  try {
      const { propertyId } = req.params;
      // Assuming you have a model named Property
      await Property.findByIdAndDelete(propertyId);
      res.json({ message: 'Property deleted successfully' });
  } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ error: 'Failed to delete property' });
  }
});



// Route to add a new place
router.post('/addNewPlace', authMiddleware, async (req, res) => {
  try {
    const { title, address, photos, description, perks, extraInfo, maxGuests, price } = req.body;
    
    // Create a new property document
    const newProperty = new Property({
      owner: req.user._id, // Assuming you have a middleware to extract user information and attach it to the request object
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
      bookedDates: []
    });

    // Save the new property to the database
    await newProperty.save();

    res.status(201).json({ message: 'New property added successfully', property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







// Route to book a property
router.post("/booking/:placeId", authMiddleware, async (req, res) => {
  try {
    const { placeId } = req.params;
    
    // Find properties owned by the specified owner (placeId)
    const properties = await Property.find({ _id: placeId });

    res.status(200).json({ message: 'Properties belonging to the owner', properties });
  } catch (err) {
    console.error('Error retrieving properties:', err);
    res.status(500).json({ error: 'Failed to retrieve properties' });
  }
});




router.post('/mybooking', authMiddleware, async (req, res) => {
  try {
    const validUser = await User.findById(req.user._id); // Find the user by ID
    if (!validUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all bookings associated with the user
    const allBookings = await Booking.find({ user: validUser._id });

    // Populate the 'place' field in each booking to get property details
    await Booking.populate(allBookings, { path: 'place' });

    // Send the bookings with populated property details to the frontend
    return res.json(allBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});




router.delete('/mybooking', authMiddleware, async (req, res) => {
  try {
    const { placeId } = req.body;
    
  

    const deletedBooking = await Booking.findByIdAndDelete(placeId);


    if (!deletedBooking) {
      // If no booking was found with the given placeId
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Your booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});






// Function to check if the property is available for booking
const checkPropertyAvailability = (property, checkIn, checkOut) => {

  const { bookedDates } = property;
  const requestedDates = getDatesBetween(checkIn, checkOut);

  for (const bookedDate of bookedDates) {
    if (requestedDates.includes(bookedDate)) {
      return false; // Property is not available for booking
    }
  }

  return true; // Property is available for booking
};

// Function to calculate the total price based on the selected dates
const calculateTotalPrice = (pricePerNight, checkIn, checkOut) => {
  const nights = getDatesDifference(checkIn, checkOut);
  return pricePerNight * nights;
};

// Function to update booked dates for the property
const updateBookedDates = async (property, checkIn, checkOut) => {
  const newBookedDates = getDatesBetween(checkIn, checkOut);
  property.bookedDates.push(...newBookedDates);
  await property.save();
};

// Helper function to get all dates between two dates
const getDatesBetween = (startDate, endDate) => {

  const dates = [];
  let currentDate = new Date(startDate);
  const endDateObj = new Date(endDate);

  while (currentDate <= endDateObj) {
    dates.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};


const getDatesDifference = (startDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(startDate);
  const secondDate = new Date(endDate);

  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
};





// Route to book a property
router.post("/bookProperty/:placeId", authMiddleware, async (req, res) => {
  try {
    const { placeId } = req.params;

    // Ensure that placeId is valid
    if (!mongoose.Types.ObjectId.isValid(placeId)) {
      return res.status(400).json({ error: 'Invalid place ID' });
    }

    const { checkIn, checkOut, name, phone } = req.body;
    
    // Find the property by its ID
    const property = await Property.findById(placeId);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if the property is available for booking
    const isAvailable = checkPropertyAvailability(property, checkIn, checkOut);

    if (!isAvailable) {
      return res.status(400).json({ error: 'Selected dates are not available for booking' });
    }

    // Calculate the price based on the selected dates
    const totalPrice = calculateTotalPrice(property.price, checkIn, checkOut);

    // Create a new booking document
    const newBooking = new Booking({
      place: placeId,
      user: req.user._id,
      checkIn,
      checkOut,
      name,
      phone,
      price: totalPrice
    });

    const user = req.user._id;
    const validUser = await User.findById(user);

    validUser.bookedPlaces.push(placeId)
    await validUser.save();
    
    

    // Save the booking to the database
    await newBooking.save();

    // Update booked dates for the property
    await updateBookedDates(property, checkIn, checkOut);

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Error booking property:', error);
    res.status(500).json({ error: 'Failed to book property' });
  }
});




























module.exports = router;
