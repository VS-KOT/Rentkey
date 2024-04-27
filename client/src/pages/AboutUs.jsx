import React from 'react';
import Logo from '../assets/rentkeylogo.png';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  return (
    <div>
      <Navbar/>
      <div className="sm:flex items-center max-w-screen-xl">
        {/* Left Side with Image */}
        <div className="sm:w-1/2 p-10 flex justify-center">
          <div className="image object-center text-center">
            <img src={Logo} alt="About Us" className="h-[480px] w-[480px]" />
          </div>
        </div>
        {/* Right Side with Text */}
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">
              About <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Rentkey</span>
            </h2>
            <p className="text-gray-700">
            Welcome to my website! Rentkey believes in helping you finding the right rental
                property or tenant in an easy and stress-free experience. With this platform, I aim to simplify
                the rental process and help homeowners and renters find one another with ease . As homeowners ourselves, we know
                how important it is to find the right tenant for your property. That's why we've created a platform that
                makes it easy to showcase your property and connect with potential renters. I'll work with you
                to ensure that your property is presented in the best possible light and that you find the right tenant
                in no time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
