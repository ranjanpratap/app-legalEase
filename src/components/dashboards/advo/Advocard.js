import React from 'react'
import "./Advo.css"
function Advocard(props) {
  return (
    <div className='advo-card'>
        <img src={props.img} className="advo-card-img"/>
        <div className='advo-card-b'>

        <div className='advo-card-head1'>{props.name}</div>
        <div className='advo-card-head2'>{props.jobtitle}</div>
        </div>
    </div>
  )
}

export default Advocard