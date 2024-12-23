import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'


export default function Landing() {

    
    return (
        <div className="landing">

          <div className="landing-banner">
            <img src="petconnectlanding01.png" alt="French Bulldog" />
          </div>
      
          <div className="function-landing">
            <div className="image-box">
            <Link to="/login">
                <img src="Login.png" alt="Login" />
            </Link>
            <Link to="/login">
                <img src="Register.png" alt="Register" />
            </Link>
            </div>
        </div>
        </div>
      );
    }