
'use client'
import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./index.css";
import Layout from "../pages";
const Navbar = () => {

  const[showNavbar,setShowNavbar]=useState(false)
  const handleToggleNavbar=()=>{
    setShowNavbar(!showNavbar)
  }
  return (
    <>
    <div className="navbar">
    <FaBars className='nav-icon' onClick={handleToggleNavbar}/>
     
      <ul className={`nav-list ${showNavbar?"active":""}`}>
        <li className="nav-item ">
          <p>
            <Link href="/" className="link-item">
              Discover
            </Link>
          </p>
        </li>
        <li className="nav-item">
          <p>
            <Link href="/" className="link-item ">
              Following
            </Link>
          </p>
        </li>
        <li className="nav-item">
          <p>
            <Link href="/" className="link-item">
              Weather
            </Link>
          </p>
        </li>
        <li className="nav-item">
          <p>
            <Link href="/" className="link-item">
              Maps
            </Link>
          </p>
        </li>
        <li className="nav-item">
          <p>
            <Link href="/" className="link-item">
              Hourly
            </Link>
          </p>
        </li>
        <li className="nav-item">
          <p>
            <Link href="/" className="link-item">
              Monthly
            </Link>
          </p>
        </li>
        <li className="nav-item">
          <p>
            <Link href="/" className="link-item">
              Trends
            </Link>
          </p>
        </li>
        <li className="nav-item">
          <p>
            <Link href="/" className="link-item">
              Severe Weather
            </Link>
          </p>
        </li>
        <li className="nav-item">
          <p>
            <Link href="/" className="link-item">
              Air Quality
            </Link>
          </p>
        </li>
        <li className="nav-item ">
          <p>
            <Link href="/" className="link-item">
              3D Maps
            </Link>
          </p>
        </li>
      </ul>
      
    </div>
    </>
  );
};

export default Navbar;
