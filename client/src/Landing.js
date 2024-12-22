import React from 'react'
import './App.css'


export default function Landing() {

    
    return (
        <div className="landing">
          {/* Full-width image */}
          <div className="landing-banner">
            <img src="petconnectlanding.png" alt="French Bulldog" />
          </div>
      
          {/* Boxed images section */}
          <div className="function-landing">
            <div className="image-box">
              <img src="Login.png" alt="Login" />
            </div>
            <div className="image-box">
              <img src="Login.png" alt="Login" />
            </div>
            <div className="image-box">
              <img src="Login.png" alt="Login" />
            </div>
            <div className="image-box">
              <img src="Login.png" alt="Login" />
            </div>
          </div>
        </div>
      );
    }