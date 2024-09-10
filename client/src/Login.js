import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialFormValues = {
  username: '', 
  password: '',
}



export default function Login({ setIsLoggedIn }) {
  const [values, setValues] = useState(initialFormValues);
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  };

  const onSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const response = await fetch('http://localhost:9000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token)
        setIsLoggedIn(true)
        navigate('/friends')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      setError('Invalid Credientials')
    }
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
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
