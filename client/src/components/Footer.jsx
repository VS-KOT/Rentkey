import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-12"> {/* Reduced padding */}
      <div className="container mx-auto py-4 px-4"> {/* Reduced padding */}
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Rent Key</h2>
            <p className="text-sm">Designed & Developed by Vinayak Kotwala</p>
          </div>
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Links</h3>
            <ul className="list-none">
              <li><Link to="/" className="text-sm">Home</Link></li>
              <li><Link to="/aboutus" className="text-sm">About Us</Link></li>
              <li><Link to="/contactus" className="text-sm">Contact</Link></li>
            </ul>
          </div>
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Connect</h3>
            <ul className="list-none">
              <li><a href="https://facebook.com" className="text-sm" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" className="text-sm" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" className="text-sm" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 my-4" /> {/* Reduced margin */}
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} RentKey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
