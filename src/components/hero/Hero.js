import React from 'react'
import "./Hero.css"
import animationJSON from "../animations/hero_anime.json"
import Lottie  from 'lottie-react'
import {AiFillInstagram,AiFillLinkedin,AiFillTwitterSquare} from 'react-icons/ai'
import Navbar from '../navbar/Navbar'
function Hero() {
  return (
    <>
   
      <Navbar/>
    <div className='hero'>
        <div className='hero_l'>
          <div className='hero_l_text'>THE ONLY PLATFORM</div>
          <div className='hero_l_text'>FOR ALL</div>
          <div className='hero_l_text flow-container'>ADVOCACY</div>
          <div className='hero_l_text'>REQUIREMENTS</div>
          <div className='social_icons_wrap'>
            <AiFillInstagram className='social_icon'/>
            <AiFillLinkedin className='social_icon'/>
            <AiFillTwitterSquare className='social_icon'/>
            <span></span>
          </div>
        </div>
        <div className='hero_r'>
          <Lottie animationData={animationJSON} className="hero_img" loop={true}/>
        </div>
    </div>
    </>
  )
}

export default Hero