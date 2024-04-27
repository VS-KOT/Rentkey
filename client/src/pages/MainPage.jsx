import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ErrorPage from './ErrorPage';
import ForgotPassword from './ForgotPassword';
import Property from './Property';
import AddProperty from './AddProperty';
import BookingPage from './BookingPage';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import MyBookings from './MyBookings';
import ResetPassword from './ResetPassword';

const MainPage = () => {

  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<LandingPage isAuthenticated={isAuthenticated}/>}/>

        {!isAuthenticated ? <Route path={"/login"} element={<Login />} /> : <Route path={"/login"} element={<ErrorPage errormessage={'already logged in '} />} />}

        {!isAuthenticated ? <Route path={"/register"} element={<Register />} /> : <Route path={"/register"} element={<ErrorPage errormessage={'already logged in '} />} />}

        {isAuthenticated ? <Route path={'/dashboard'} element={<Dashboard/>} /> : <Route path={'/dashboard'} element={<ErrorPage errormessage={'not logged in'} />}/>}

        <Route path={'/aboutus'} element={<AboutUs/>}/>

        <Route path={'/contactus'} element={<ContactUs/>}/>

        <Route path={'/forgotpassword'} element={<ForgotPassword/>} /> 

        <Route path={'/property'} element={<Property/>}/>
        
        <Route path='/addProperty' element={<AddProperty/>}/>

        <Route path='/forgotpassword/reset' element={<ResetPassword/>}/>

        <Route path='/booking/:placeId' element={<BookingPage />} />

        {isAuthenticated ? <Route path={"/mybookings"} element={<MyBookings />} /> : <Route path={"/mybookings"} element={<ErrorPage errormessage={'You are not Logged in'} />} />}
      </Routes>
    </Router>
  );
};

export default MainPage;
