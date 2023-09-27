import React, { useState, useEffect } from "react";
import axios from "axios";
import bg from "../../images/dash-bg.png";
import logo from "../../images/legalease.png";
import "./Client.css";
import { Calendar } from "primereact/calendar";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { MdOutlineVoiceChat } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import jwtDecode from 'jwt-decode';
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import { Link, useParams } from "react-router-dom";
import Videosdk from "../../videosdk/Videosdk";
import Chatengine from "../../chatengine/Chatengine";

function RegistrationData() {
  const [registrationID, setRegistrationId] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [dates, setDates] = useState([]);
  const [token, setToken] = useState(null);

  const [dateData, setDateData] = useState([]);

  const dateTemplate = (date) => {
    if (dateData) {
      for (let index = 0; index < dateData.length - 1; index += 2) {
        for (let idx = dateData[index]; idx <= dateData[index + 1]; idx++) {
          const element = idx;

          if (date.day == element) {
            return (
              <strong style={{ textDecoration: "line-through" }}>
                {date.day}
              </strong>
            );
          }
        }
      }
    }
    return date.day;
  };

  const Saveappointments = async () => {
    console.log(dates);
    const obj = {
      RegistrationID: registrationID,
      dates: [new Date(dates[0]).getDate(), new Date(dates[1]).getDate()],
    };
    console.log(obj);
    const resp = await axios.post(
      "https://vast-dog-coat.cyclic.cloud/saveappointments",
      obj
    );
    console.log("-->", resp);
  };

  useEffect(() => {
    const getId = async () => {
      const currentURL = window.location.href;
      const urlSegments = currentURL.split("/");
      const idSegment = urlSegments[urlSegments.length - 1];
      const idWithoutComma = idSegment.replace(",", "");
      const decodedId = decodeURIComponent(atob(idWithoutComma));
      setRegistrationId(decodedId);

      const token=sessionStorage.getItem("legalease")
      const decodedToken = jwtDecode(token);
      setToken(decodedToken.email);
      
    };

    getId(); // Call the function to get and set the ID

    const fetchData = async () => {
      try {
        // Fetch data only when the ID is available
        if (registrationID) {
          const response = await axios.get(
            `https://vast-dog-coat.cyclic.cloud/fetchRegistration?registrationID=${registrationID}`
          );

          if (response.data) {
            setRegistrationData(response.data);
          } else {
            setRegistrationData(null);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getData = async () => {
      try {
        // Fetch data only when the ID is available
        if (registrationID) {
          const response = await axios.get(
            `https://vast-dog-coat.cyclic.cloud/getappointments?registrationID=${registrationID}`
          );

          if (response.data) {
            setDateData(response.data.dates);
          } else {
            setDateData(null);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    getData();
  }, [registrationID]);

  if (registrationData) {

    return (
      <div className="client-dash">
        <img src={bg} className="client-dash-bg" />
        <div className="dash-nav-ele">
          <img src={logo} className="logo-dash" />
          <div className="home-text">RETURN TO HOME</div>
        </div>
        <div className="client-dash-u">
          <img
            src={
              registrationData.Profile

            }
            className="client-dash-img"
          />
          <div className="box-client-dash-img-r">
            <div className="box-client-head1">
              <BsSearch className="box-dash-icon-alt" />
              <span className="box-dash-txt-alt">
                Connect with {registrationData.Name}
              </span>
            </div>
            <div className="box-client-dash-img-r-icons" style={{display:"flex"}}>
              <Chatengine/>
              {/* <MdOutlineVoiceChat className="box-dash-icon" /> */}
              <Videosdk/>
            </div>
          </div>
        </div>
        <div className="client-dash-l">
          <div className="dash-card">
            <div className="dash-card-l-wrap">
              <div className="dash-card-head3">Experience</div>
              <div className="dash-card-head3 gray">{registrationData.Experience}+ yrs</div>
            </div>
            <div className="dash-card-l-wrap">
              <div className="dash-card-head3">Ratings</div>
              <div className="dash-card-head3 gray">{registrationData.Ratings}</div>
            </div>
            <div className="dash-card-l-wrap">
              <div className="dash-card-head3">Court</div>
              <div className="dash-card-head3 gray">{registrationData.Courts}</div>
            </div>
            <div className="dash-card-l-wrap">
              <div className="dash-card-head3">Email</div>
              <div className="dash-card-head3 gray">{registrationData.Email}</div>
            </div>
            <div className="dash-card-l-wrap">
              <div className="dash-card-head3">Contact</div>
              <div className="dash-card-head3 gray">{registrationData.ContactNo}</div>
            </div>
            <div className="dash-card-l-wrap">
              <div className="dash-card-head3">Fees</div>
              <div className="dash-card-head3 gray">{registrationData.Fees} INR</div>
            </div>
          </div>
          <div className="dash-card">
            <div className="dash-card-head1">{registrationData.Name}</div>
            <div className="dash-card-head2">{registrationData.JobTitle} ({registrationData.Field})</div>
            <div className="dash-card-body">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered
            </div>
          </div>
          
          <div className="dash-client-r-l">
          {token==registrationData.Email &&
            <div className="dash-card addwidth-to-dashcard">
              <div className="dash-card-head1">Confirm Your Availability</div>
              <div className="dash-calendar">
                <Calendar
                  value={dates}
                  onChange={(e) => setDates(e.value)}
                  selectionMode="range"
                  readOnlyInput
                />
                <div className="dash-card-btn" onClick={Saveappointments}>
                  Submit
                </div>
              </div>
            </div>
  }
  {token==registrationData.Email &&
            <div className="dash-card addwidth-to-dashcard">
              <div className="dash-card-head1">Check Available Dates</div>
              <div className="dash-calendar">
                <Calendar
                  value={dateData}
                  onChange={(e) => setDateData(e.value)}
                  dateTemplate={dateTemplate}
                />
              </div>
            </div>
  }

            <div className="dash-card addwidth-to-dashcard">
              <div className="dash-card-head1">Looking for someone else?</div>
              <div className="dash-card-btn">
              <Link to={"/client"} style={{textDecoration:"none",color:"white"}}>
Search More
</Link>
</div>
              <div className="dash-card-head2">OR</div>
              <div className="dash-card-head1 dash-card-btn2">
                <Link to={"/client"} style={{textDecoration:"none",color:"black"}}>

                Take help of our TChat
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="social_icon_footer-1">
          <div className="social_icon_footer-1-line"></div>

          <AiFillInstagram className="social_icon_footer-1-icon" />
          <AiFillLinkedin className="social_icon_footer-1-icon" />
          <AiFillTwitterSquare className="social_icon_footer-1-icon" />
          <div className="social_icon_footer-1-line"></div>
        </div>
      </div>
    );
  } else {
    <div className="loading">Loading</div>;
  }
}

export default RegistrationData;

// {
//   "RegistrationID": "p/440/2019",
//   "Name": "Mohan Bhadoria",
//   "Field": "Tax Lawyer",
//   "Experience": "4",
//   "Ratings": "4.5",
//   "Courts": "High Court",
//   "Profile": "https://www.kaanoon.com/uploads/profile/avatar/11290/large_Passport_Size_Photo.jpg",
//   "Email": "mohan.b@example.com",
//   "ContactNo": "9046683862",
//   "Fees": "4,000",
//   "JobTitle": "Advocate",
//   "Desc":`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
// }
