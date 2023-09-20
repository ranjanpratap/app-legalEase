import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import "./Search.css"

export default function Search() {
  const [data, setdata] = useState(null);
  console.log(data);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/alladvocates?validity=true`);

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

    // Fetch data when the component mounts
    getData();
  }, []); // The empty array [] means this effect runs once when the component mounts

  const [selectedAdvo, setSelectedAdvo] = useState(null);
  if (data) {
    const selectedAdvoTemplate = (option, props) => {
      if (option) {
        return (
          <div className="flex-align-center">
            <img
              alt={option.name}
              src={option.img}
              className={`mr-2 flag flag-${option.code.toLowerCase()}`}
              style={{ width: "18px" }}
            />
            <div className="margin-left-10">{option.name}</div>
          </div>
        );
      }

      return <span>{props.placeholder}</span>;
    };

    const advoOptionTemplate = (option) => {
      if (option) {
        return (
          <div className="flex-align-center">
            <img
              alt={option.name}
              src={option.img}
              className={`mr-2 flag flag-${option.code.toLowerCase()}`}
              style={{ width: "18px" }}
            />
            <div className="margin-left-10">{option.name}</div>
          </div>
        );
      }
    };

    return (
      <div className="card flex justify-content-center">
        <Dropdown
          value={selectedAdvo}
          onChange={(e) => setSelectedAdvo(e.value)}
          options={data}
          optionLabel="name"
          placeholder="Select your lawyer"
          filter
          valueTemplate={selectedAdvoTemplate}
          itemTemplate={advoOptionTemplate}
          className="w-full md:w-14rem"
          style={{width:"250px"}}
        />
      </div>
    );
  } else {
    return <div className="loading">Loading</div>;
  }
}
