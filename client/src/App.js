import React, { useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Friends from './Friends'
import FriendForm from './FriendForm'
import Login from './Login'
import Landing from './Landing'
import Profile from './Profile'
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

  const handleLogout = () => {
    setIsLoggedIn(false)
    setWelcomeMessage('')
    setUsername('')
    localStorage.removeItem('token')
  } 

  return (
    <BrowserRouter>
        <nav className='nav'>
          <Link to ='/' className = 'home-nav'>Home</Link>
           <Link to='/login' className = 'login-nav'>Login </Link> 
           {isLoggedIn && (
           <Link to ="/profile" className = 'profile-nav'> Profile </Link>
           )}
           <Link to="/pets" className = 'pets-nav'>Pets</Link>
           {isLoggedIn && (
            <button className = 'nav-logout' onClick = {handleLogout}>
              Logout
            </button>
           )}
           
        </nav>

        <Routes>
          <Route path = '/' element ={
            <div>
            <Landing />
            </div>
           }/>
          <Route path = '/login' element = {
            <div className = 'loginForm'>
                <h1>  </h1>
              <Login setIsLoggedIn={setIsLoggedIn} setWelcomeMessage={setWelcomeMessage} setUsername={setUsername}/> 
              <p className='login-p'>
                <span>If you choose not to create an account you can login under the test account. </span> 
                <span>To do so please use Username: test and Password: helloworld01.</span>
                </p>
            </div>
            } />
            
            
           
          <Route path ='/pets' element ={
             isLoggedIn ? (
                <div className = 'friendsList' >
                <h1 style={{ textAlign: 'center'}}> </h1>
   
                <FriendForm
                username={username}
                values={formValues}
               
                />
           </div>
             ) : (
              <Navigate to ='/login' />
              
             )
       } />

       <Route path ='/profile' element = {
         isLoggedIn ? (
        <div className = 'profile'>
           <h3 className='welcome-message'>{welcomeMessage}!</h3>
          <Profile username={username} /> 
        </div>
         ) : (
          <Navigate to ='/login' />
         )
       } />
      

        </Routes>
   
    </BrowserRouter>
  )
}



