import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialFormValues = {
  username: '', 
  password: '',
}

export default function Login({ setIsLoggedIn }) {
  const [values, setValues] = useState(initialFormValues)
  const navigate = useNavigate()

  const onChange = evt => {
    const { id , value } = evt.target
    setValues({...values, [id] : value})
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    Login(values)
   
    // if (username === 'user' && password === 'pass') {
    //   setIsLoggedIn(true)
    //   localStorage.setItem('authToken', 'mockToken')
    //   navigate('/friends')
    // } else {
    //   setIsLoggedIn(false)
    //   navigate('/')
    // }
  }

  const isDisabled = () => {
    const trimmedUsername = values.username.trim()
    const trimmedPassword = values.password.trim()
    return trimmedUsername.length < 3 || trimmedPassword < 3
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
      <input
        className = "login-input"
        type="text"
        placeholder="Username"
        value={values.username}
        onChange={onChange}
        required
      /></div>
      <div>
      <input
        className = "login-input"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={onChange}
        required
      /></div>
      <button disabled = {isDisabled()} className="login-button" type="submit">Login</button>
    </form>
  )
}

