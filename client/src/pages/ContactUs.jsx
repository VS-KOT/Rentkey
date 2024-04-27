import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import Navbar from '../components/Navbar';

const ContactUs = () => {
  return (
    <div> <Navbar/>
    <div className="max-h-screen mt-10 bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4">
            <div className="address details text-center">
              <i className="fas fa-map-marker-alt text-transparent bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-3xl mb-2"></i>
              <div className="topic text-lg font-semibold">Address</div>
              <div className="text-one text-sm">Chandrapur</div>
            </div>
            <div className="phone details text-center">
              <i className="fas fa-phone-alt text-transparent bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-3xl mb-2"></i>
              <div className="topic text-lg font-semibold">Phone</div>
              <div className="text-one text-sm">+91 XXX5656XX</div>
              <div className="text-two text-sm">+91 000XXX56X</div>
            </div>
            <div className="email details text-center">
              <i className="fas fa-envelope text-transparent bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-3xl mb-2"></i>
              <div className="topic text-lg font-semibold">Email</div>
              <div className="text-one text-sm">rent_keyoffiical@gmail.com</div>
              <div className="text-two text-sm">rentkeyinfo.@gmail.com</div>
            </div>
          </div>
          <div className="w-full md:w-3/4 md:pl-8">
            <div className="topic-tex text-black text-xl font-semibold mb-4">Send us a message</div>
            <p className="mb-4">If you have any work from me or any types of queries related to my rental website, you can send me a message from here. It's my pleasure to help you.</p>
            <form>
              <div className="input-box mb-4">
                <input className="w-full border rounded-md p-2" type="text" placeholder="Enter your name" />
              </div>
              <div className="input-box mb-4">
                <input className="w-full border rounded-md p-2" type="text" placeholder="Enter your email" />
              </div>
              <div className="input-box mb-4">
                <textarea className="w-full border rounded-md p-2" rows="5" placeholder="Enter your message here..."></textarea>
              </div>
              <div className="button">
                <input className="text-white bg-gradient-to-r from-pink-600 to-red-400 hover:from-purple-600 hover:to-cyan-400 border-1px font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-300" type="button" value="Send Now" />
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ContactUs;
