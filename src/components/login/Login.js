import React, { useState } from "react";
import "./Login.css";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Button } from "primereact/button";

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [modal, setmodal] = useState(false);
  const [loginsuccess, setloginsuccess] = useState(false);
  const [passwordfail, setpasswordfail] = useState(false);

  const checkStrongPassword = (value) => {
    // Implement your strong password validation logic here.
    // For example, you can check for length, special characters, and numbers.
    const isStrong =
      value.length >= 8 &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value) &&
      /\d/.test(value);
    setIsStrongPassword(isStrong);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.get(
      `http://localhost:5000/jwttoken?email=${email}&password=${password}`
    );
    if (resp.status == 201) {
      setloginsuccess(true);
      sessionStorage.setItem("legalease", resp.data);
      setmodal(true);
    } else if (resp.status == 202) {
      setmodal(true);
      setpasswordfail(true);
    } else {
      setmodal(true);
    }
    console.log(resp);
    // Implement your signup logic here
    console.log(`Email: ${email}, Password: ${password}`);
    onClose();
  };

  const footerContent = (
    <div>
        <Button label="Close" icon="pi pi-check" onClick={() => setmodal(false)} autoFocus />
    </div>
);

  return (
    <>
      <Dialog
        header="Header"
        visible={modal}
        position={"top-right"}
        style={{ width: "50vw" }}
        onHide={() => setmodal(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <p className="m-0">
          {loginsuccess
            ? "Congratulations, Your login to legalease is successfull"
            : passwordfail?"You entered an incorrect password":"Your haven't signedup to legalease"}{" "}
        </p>
      </Dialog>
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content">
          <div className="header_modal_1">Target</div>
          <div className="header_modal_2">to Final</div>
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

            <button type="submit">Login</button>
          </form>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
