import React from 'react';
import notfound from "./assets/notfound.webp";
import "./index.css";

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <img className='not-found-image' src={notfound} alt='not found'/>
      <div className='not-found-title'>We could not find weather information for the location above</div>
    </div>
  )
}

export default NotFound