import React, { useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom'
import Friends from './Friends'
import FriendForm from './FriendForm'
import Login from './Login'
import './App.css'

let id = 0 
const getId = () => ++id

const initialValues = {
  username: '',
  interests: '',
}


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formValues, setFormValues] = useState(initialValues) 
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [username, setUsername] = useState('')

  const updateForm = (inputName, inputValue) => {
   
    setFormValues({
      ...formValues,
      [inputName]: inputValue,
    })
  }




  return (
    <BrowserRouter>
        <nav className='nav'>
           <Link to='/'> Login </Link> 
           <Link to="/pets">Pets</Link>
        </nav>

        <Routes>
          <Route path = '/' element = {
            <div className = 'loginForm'>
                <h1> Welcome!  Login to See Available Pets ... </h1>
              <Login setIsLoggedIn={setIsLoggedIn} setWelcomeMessage={setWelcomeMessage} setUsername={setUsername}/> 
            </div>
            } />
            
            
           
          <Route path ='/pets' element ={
             isLoggedIn ? (
                <div className = 'friendsList' >
                <h3>{welcomeMessage}</h3>
                <h1 style={{ textAlign: 'center'}}> Available Pets </h1>
   
                <FriendForm
                username={username}
                values={formValues}
               
                />
           </div>
             ) : (
              <Navigate to ='/' />
             )
       } />
      
      
        </Routes>
   
    </BrowserRouter>
  )
}



