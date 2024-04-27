import React, { useState } from 'react';
import { DatePicker, message } from 'antd';
const { RangePicker } = DatePicker;

const BookingForm = ({ propertyId, price, bookedDatesDatesFromBackend }) => {

  const token = localStorage.getItem('token')
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dates, setDates] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDateChange = (dates) => {
    setDates(dates);

    if (dates && dates.length === 2) {
      const startDate = dates[0];
      const endDate = dates[1];
      const daysDifference = Math.ceil((endDate - startDate + 1) / (1000 * 60 * 60 * 24));
      console.log("Days difference:", daysDifference);
      console.log("Price:", price);
      const calculatedPrice = daysDifference * price;
      console.log("Calculated price:", calculatedPrice);
      setTotalPrice(calculatedPrice);
    } else {
      setTotalPrice(0);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !dates.length) {
      message.error('Please fill all fields and select dates');
      return;
    }

    const [checkIn, checkOut] = dates;
    
    const bookingData = {
      checkIn: checkIn.format('YYYY-MM-DD'),
      checkOut: checkOut.format('YYYY-MM-DD'),
      name,
      phone: phoneNumber,
    };

    try {
      const response = await fetch(`http://localhost:3000/place/bookProperty/${propertyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.message || 'Booking successful');
        // Reset form fields after successful booking
        setName('');
        setPhoneNumber('');
        setDates([]);
        setTotalPrice(0);
      } else {
        const data = await response.json();
        message.error(data.error || 'Failed to book property');
      }
    } catch (error) {
      console.error('Error booking property:', error);
      message.error('Failed to book property');
    }
  };

  // Custom date rendering function
  const dateCellRender = (current) => {
    const formattedDate = current.format('YYYY-MM-DD');
  
    if (bookedDatesDatesFromBackend.includes(formattedDate)) {
      return <div className="ant-picker-cell-inner" style={{ color: 'red' }}>{current.date()}</div>;
    }
    return <div className="ant-picker-cell-inner">{current.date()}</div>;
  };

  return (
    <div>
      <div className="flex items-center justify-center shadow-bookings-form">
        <div className=" w-full  bg-white rounded-xl p-8">
          <form>
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 ">
                <div className="mb-5">
                  <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                    Select Date <span className="mb-3 block text-base font-small text-[#07074D]">(Dates in red represents property is already booked)</span>
                  </label>
                  <RangePicker
                    className="w-full"
                    style={{ borderRadius: '0.375rem' }}
                    onChange={handleDateChange}
                    value={dates}
                    dateRender={dateCellRender} // Apply custom date rendering
                  />
                </div>
              </div>
            </div>
            <div className='font-medium'>Total price: ₹ {totalPrice}</div>
            <div className='flex justify-center box-shadow'>
              <button
                className="block select-none text-white bg-gradient-to-r from-pink-600 to-red-400 hover:from-purple-600 hover:to-cyan-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleBooking}
              >
                Book property for ₹ {totalPrice}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
