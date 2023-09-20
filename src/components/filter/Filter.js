import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";

import "./Filter.css";
function Filter() {
  const [rating, setRating] = useState(null);
  const [value, setValue] = useState(null);
  console.log(rating,value)

  const handlefilter=async()=>{

  }
  return (
      <div className="filter-advo">
        <div className="card flex justify-content-center">
          <Rating
            value={rating}
            onChange={(e) => setRating(e.value)}
            cancel={false}
          />
        </div>
        <div className="card flex justify-content-center ">
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
        <div className="filter-apply" onClick={handlefilter}>FILTER</div>
      </div>
  );
}

export default Filter;
