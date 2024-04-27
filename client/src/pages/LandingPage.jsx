import React from 'react';
import Navbar from '../components/Navbar';
import LandingIntro from './LandingIntro';
import Footer from '../components/Footer';
import AllProperties from '../components/AllProperties';
import horizontalLineImg from '../assets/hr .png'; // Import the image for the horizontal line

const LandingPage = ({ isAuthenticated }) => {
  return (
    <div>
      <Navbar />
      <LandingIntro />
      {/* Replace the <hr> element with an <img> element */}
      <img src={horizontalLineImg} alt="Horizontal Line" className="mx-auto my-4" />
      <div className='h-20'></div>
      <AllProperties isAuthenticated={isAuthenticated} />
      <Footer />
    </div>
  );
};

export default LandingPage;
