import React, { useState } from "react";
import "./Signup.css";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Button } from "primereact/button";

const Signup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [modal, setmodal] = useState(false);
  const [signupsuccess, setsignupsuccess] = useState(false);

  const checkStrongPassword = (value) => {
    // Implement your strong password validation logic here.
    // For example, you can check for length, special characters, and numbers.
    const isStrong =
      value.length >= 8 &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value) &&
      /\d/.test(value);
    setIsStrongPassword(isStrong);
  };

  const footerContent = (
    <div>
        <Button label="Close" icon="pi pi-check" onClick={() => setmodal(false)} autoFocus />
    </div>
);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.get(
      `https://vast-dog-coat.cyclic.cloud/getdetails?email=${email}&password=${password}`
    );
    if (resp.status == 201) {
      setsignupsuccess(true);
      setmodal(true);
    } else {
      setmodal(true);
    }
    console.log(resp);
    // Implement your signup logic here
    console.log(`Email: ${email}, Password: ${password}`);
    onClose();
  };

  return (
    <>
      <Dialog
        header="Header"
        visible={modal}
        position={'top-right'}
        style={{ width: "50vw" }}
        onHide={() => setmodal(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <p className="m-0">
          {signupsuccess?"Congratulations, Your sign-up to legalease is successfull":"Sorry, Your email is not registered in authorization database"
        }        </p>
      </Dialog>

      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content">
          <div className="header_modal_1">Take</div>
          <div className="header_modal_2">Your First</div>
          <div className="header_modal_3 flow-container">Step</div>
          <form onSubmit={handleSubmit}>
            <label className="signup_field email_modal_entry">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="signup_field">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkStrongPassword(e.target.value);
              }}
              required
            />
            <div
              className={`password-strength ${
                isStrongPassword ? "strong" : "weak"
              }`}
            >
              {isStrongPassword ? "Strong Password" : "Weak Password"}
            </div>

            <button type="submit">Sign Up</button>
          </form>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
