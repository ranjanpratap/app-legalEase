import React, { useEffect, useState } from "react";
import { Rating } from "primereact/rating";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";

import "../../filter/Filter.css";
import "./Advo.css";
import Advocard from "./Advocard";
import axios from "axios";
import logo from "../../images/legalease.png"
import Search from "../../search/Search";
import { Link } from "react-router-dom";
import ChatBot from "../../chatbot/Chatbot";

export default function Advo() {
  const [rating, setRating] = useState(null);
  const [value, setValue] = useState(null);
  const [data, setdata] = useState(null);
  const [expdata, setexpdata] = useState(null);
  const [ratingdata, setratingdata] = useState(null);

  const handlefilter = async () => {
    try {
      const response = await axios.get(
        `https://vast-dog-coat.cyclic.cloud/advocatefilter?expgt=${value[0]}&explt=${value[1]}&rgt=${rating}`
      );
      console.log(
        `https://vast-dog-coat.cyclic.cloud/advocatefilter?expgt=${value[0]}&explt=9&rgt=${rating}`
      );
      console.log(value, rating, response, "---->");
      // Check if the response contains data
      if (response.data) {
        setdata(response.data);
      } else {
        // Handle the case where no data is found
        setdata(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/alladvocates`);

        // Check if the response contains data
        if (response.data) {
          setdata(response.data);
        } else {
          // Handle the case where no data is found
          setdata(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getExpData = async () => {
      try {
        const response = await axios.get(
          `https://vast-dog-coat.cyclic.cloud/advocatefilterexp`
        );

        // Check if the response contains data
        if (response.data) {
          setexpdata(response.data);
        } else {
          // Handle the case where no data is found
          setexpdata(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getRatingData = async () => {
      try {
        const response = await axios.get(
          `https://vast-dog-coat.cyclic.cloud/advocatefilterratings`
        );

        // Check if the response contains data
        if (response.data) {
          setratingdata(response.data);
        } else {
          // Handle the case where no data is found
          setratingdata(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the component mounts

    getData();
    getExpData();
    getRatingData();
  }, []); // The empty array [] means this effect runs once when the component mounts

  if (data && ratingdata && expdata) {
    return (
      <div className="advo-dash-bg">
      <img src={logo} className="legalease-logo"/>
        <div className="filters-client-dash">
          <div className="wrap-all-filters">
            <Search />
            <div className="filter-advo">
              <div className="card flex justify-content-center">
                <Rating
                  value={rating}
                  onChange={(e) => setRating(e.value)}
                  cancel={false}
                />
              </div>
              <div className="card flex justify-content-center">
                <div className="w-14rem">
                  <InputText
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full"
                  />
                  <Slider
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    className="w-14rem"
                    range
                  />
                </div>
              </div>
              <div className="filter-apply" onClick={handlefilter}>
                FILTER
              </div>
            </div>
          </div>
        </div>
        <div className="advo-dashboard">
          <div className="advo-dash-sec-1">
            <div className="advo-dash-head1">Find out your advocate</div>
            <div className="client-dash-all-display">
              {data.map((e) => {
                return (
                  <Link to={`/dashboard/${btoa(e._source.RegistrationID)}`} style={{textDecoration:"none",color:"black"}}>

                  <Advocard
                    name={e._source.Name}
                    jobtitle={e._source.JobTitle}
                    img={e._source.Profile}
                    />
                    </Link>
                );
              })}
            </div>
          </div>
          <div className="advo-dash-sec-1">
            <div className="advo-dash-head1">Choose from experience</div>
            <div className="client-dash-all-display card-animation">
              {expdata.map((e) => {
                return (
                  <Link to={`/dashboard/${btoa(e._source.RegistrationID)}`} style={{textDecoration:"none",color:"black"}}>

                  <Advocard
                    name={e._source.Name}
                    jobtitle={e._source.JobTitle}
                    img={e._source.Profile}
                  />
                  </Link>
                );
              })}{" "}
            </div>
          </div>
          <div className="advo-dash-sec-1">
            <div className="advo-dash-head1">Looking for expertise</div>
            <div className="client-dash-all-display">
              {ratingdata.map((e) => {
                return (
                  <Link to={`/dashboard/${btoa(e._source.RegistrationID)}`} style={{textDecoration:"none",color:"black"}}>

                  <Advocard
                    name={e._source.Name}
                    jobtitle={e._source.JobTitle}
                    img={e._source.Profile}
                  />
                  </Link>
                );
              })}{" "}
            </div>
          </div>
        </div>
        <ChatBot/>
      </div>
    );
  } else {
    return <div className="loading">Loading</div>;
  }
}

// {
//     "RegistrationID": "p/453/2013",
//     "Name": "Bansi Lal",
//     "Field": "Criminal Lawyer",
//     "Experience": "10",
//     "Ratings": "4",
//     "Courts": "High Court",
//     "Profile": "https://www.kaanoon.com/uploads/profile/avatar/11290/large_Passport_Size_Photo.jpg",
//     "Email": "bansilal@example.com",
//     "Fees": "12,000",
//     "JobTitle": "Advocate",
//     "ContactNo": "8728102329"
// }
