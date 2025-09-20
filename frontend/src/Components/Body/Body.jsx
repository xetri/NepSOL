import React from 'react';
import { useNavigate } from 'react-router';

import './Body.css';

function Body() {
  const goto = useNavigate();

  return (
    <div className="hero-section">
      {/* Left side: Hero text */}
      <div className="hero-text">
        <h1>
          Turn your passion into sustainable income
        </h1>
        <p>
          Connect with supporters who believe in your work. Build a community
          that values your creativity and helps you thrive as a creator.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={
            () => {
              goto("/login")
            }}>Start Earning</button>
        </div>
      </div>
    </div>
  );
}

export default Body;

