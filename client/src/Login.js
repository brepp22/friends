import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialFormValues = {
  username: '', 
  password: '',
}



export default function Login({ setIsLoggedIn, setWelcomeMessage }) {
  const [values, setValues] = useState(initialFormValues);
  const [error, setError] = useState(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const navigate = useNavigate()

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  };

  const onSubmit = async (evt) => {
    evt.preventDefault()
    const endpoint = isRegistering ?
    'http://localhost:9000/api/register'
    : 'http://localhost:9000/api/login'
   
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: values.username, 
        password: values.password, }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(isRegistering){
          console.log('Registration successful:' , data)
          setIsRegistering(false)
          setError(null)
        } else if (data.token) {
          console.log('Login successful:', data)
          localStorage.setItem('token', data.token)
          setIsLoggedIn(true)
          setWelcomeMessage(`${data.message}! `)
          navigate('/friends')
        } else {
          console.error('Login failed:', data.message)
          setError('Invalid Credentials')
        }
      })
      .catch((error) => console.error('Error:', error))
  };

  const isDisabled = () => {
    const trimmedUsername = values.username.trim()
    const trimmedPassword = values.password.trim()
    return trimmedUsername.length < 3 || trimmedPassword.length < 3
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          className="login-input"
          id="username"
          type="text"
          placeholder="Username"
          value={values.username}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <input
          className="login-input"
          id="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={onChange}
          required
        />
      </div>
      <button disabled={isDisabled()} className="login-button" type="submit">
        {isRegistering ? 'Register' : 'Login'}
      </button>
      <div>
        <button 
          type = "button"
          className = 'login-button'
          onClick ={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
        </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
