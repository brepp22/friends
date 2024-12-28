import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'


export default function Landing() {

    
    return (
        <div className="landing">

          <div className="landing-logo">
            <img src="connectlogo.png" alt="French Bulldog" />
            <p>
  PetConnect is a fun, mock social media platform designed to celebrate our furry, feathery, and scaly friends! Here's what you can do: <br />
  <strong>Discover Pets:</strong> Browse adorable pet profiles and learn more about them. <br />
  <strong>Show Your Love:</strong> Like your favorite pets and see them featured in your profile. <br />
  <strong>Join the Conversation:</strong> Leave comments to share your thoughts or interact with other pet lovers.
</p>


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
            <p></p>
        </div>
        </div>
        </div>
      );
    }