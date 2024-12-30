import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'


export default function Landing() {

    
    return (
        <div className="landing">

<div className="landing-logo">
  <img src="connectlogo.png" alt="PetConnect Logo" className="logo" />
  <div className="text-container">
    <p>
      PetConnect is a fun, mock social media platform designed to celebrate our furry, feathery, and scaly friends! 
      <p>Here's what you can do:</p>
    </p>
    <p><strong>Discover Pets:</strong> Browse adorable pet profiles and learn more about them.</p>
    <p><strong>Show Your Love:</strong> Like your favorite pets and see them featured in your profile.</p>
    <p><strong>Join the Conversation:</strong> Leave comments to share your thoughts or interact with other pet lovers.</p>
  </div>
          </div>
      
          <div className="function-landing">
            <div className="image-box">
            <Link to="/login">
                <img src="Login.png" alt="Login" />
            </Link>
            <Link to="/login">
                <img src="Register.png" alt="Register" />
            </Link>
            <Link to="/login">
                <img src="Connect.png" alt="Connect" />
            </Link>
            </div>
        <div className = 'footer'>
            <p>Check us out !</p>
        </div>
        </div>
        </div>
      );
    }