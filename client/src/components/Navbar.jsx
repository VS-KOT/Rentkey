import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const Navbar = ({}) => {
  const isAuthenticated = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  return (
    <div className="bg-white h-20 top-0 flex items-center sticky z-50 text-black drop-shadow-lg">
      <div className="px-4 w-screen flex items-center p-1 justify-between lg:px-8 md:px-4">
        <div className="flex gap-1">
          <Link to="/">
            <img className="h-[80px] w-31 rounded-lg" src="\assets\rentkeylogo.png" alt="main logo" />
          </Link>

          {/* <a href="/" className="flex items-center justify-center">
            <p className="text-2xl font-cabin font-medium ">Rent Key</p>
            
          </a> */}
        </div>

        { !isAuthenticated ? <div>
          <div className="hidden md:flex text-md leading-6 font-semibold text-slate-700 dark:text-slate-200">
            <Link to="/login" className="mr-6 hover:underline">
              Login
            </Link>
            <Link to="/register" className="mr-6 hover:underline">
              Signup
            </Link>
          </div>
        </div> : <div>
          <Dropdown email={email}/>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
