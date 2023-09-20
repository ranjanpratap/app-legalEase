import React, { useState } from "react";
import "./Navbar.css";
import logo from "../images/legalease.png";
import Signup from "../signup/Signup";
import { Link } from 'react-router-dom';

import Login from "../login/Login";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalLogin = () => {
    setIsModalOpenLogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenLogin(false);
  };
  if (!sessionStorage.getItem("legalease")) {
    return (
      <div className="navbar">
        <div className="navbar_l">
          <img src={logo} className="navbar_logo" />
        </div>

        <div className="navbar_r">
          <div className="navbar_r_item">
            <button onClick={openModal} className="signup_btn">
              signup
            </button>
            <Signup isOpen={isModalOpen} onClose={closeModal} />
          </div>
          <div className="navbar_r_item">
            <button onClick={openModalLogin} className="signup_btn">
              login
            </button>
            <Login isOpen={isModalOpenLogin} onClose={closeModalLogin} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <div className="navbar_l">
          <img src={logo} className="navbar_logo" />
        </div>

        <div className="navbar_r">
          <div className="navbar_r_item">
            <Link to={"Client"}>

            <button onClick={""} className="signup_btn">
              Dashboard
            </button>         
            </Link>
            </div>
         
        </div>
      </div>
    );
  }

}

export default Navbar;
